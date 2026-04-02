"""하윤이 이유식 - 텔레그램 매일 아침 브리핑 스케줄러

hayuni-play/scheduler.py 패턴을 그대로 따름:
- 30초마다 시간 체크 → 정해진 시간에 브리핑 전송
- tmux 세션(hayun-bot)으로 AI 브리핑 생성 (파일 기반 IPC)
- 실패 시 claude -p 폴백 → 최종 폴백 정적 메시지
"""

import json
import os
import subprocess
import sys
import time
import traceback
from datetime import date, datetime
from pathlib import Path

import requests
from dotenv import load_dotenv


def log(msg):
    """즉시 flush되는 로그 (LaunchAgent 환경에서도 파일에 바로 기록)"""
    print(f"[{datetime.now():%H:%M:%S}] {msg}", flush=True)


load_dotenv(Path(__file__).parent / ".env")

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
BABY_BIRTHDAY = date.fromisoformat(os.getenv("BABY_BIRTHDAY", "2025-10-13"))
ALARM_HOUR = int(os.getenv("ALARM_HOUR", "7"))
ALARM_MINUTE = int(os.getenv("ALARM_MINUTE", "0"))

PROJECT_DIR = Path(__file__).parent
MEMORY_FILE = PROJECT_DIR / "bot" / "memory.json"
DATA_JS = PROJECT_DIR / "js" / "data.js"
TMUX_SESSION = "hayun-bot"
CLAUDE_BIN = "/opt/homebrew/bin/claude"

# 브리핑 전용 IPC 파일 (봇 대화와 충돌 방지)
BRIEFING_Q_FILE = PROJECT_DIR / ".briefing-question.txt"
BRIEFING_A_FILE = PROJECT_DIR / ".briefing-answer.txt"

WEEKDAYS_KR = ["월", "화", "수", "목", "금", "토", "일"]


def make_youtube_link(ingredient, months):
    """식재료별 유튜브 검색 링크 생성"""
    from urllib.parse import quote_plus

    query = f"{months}개월 이유식 {ingredient} 레시피 만들기"
    return f"https://www.youtube.com/results?search_query={quote_plus(query)}"


def load_memory():
    if MEMORY_FILE.exists():
        return json.loads(MEMORY_FILE.read_text(encoding="utf-8"))
    return {}


def get_month_age(today=None):
    """월령 계산 (months, days, total_days)"""
    today = today or date.today()
    months = (today.year - BABY_BIRTHDAY.year) * 12 + (
        today.month - BABY_BIRTHDAY.month
    )
    days = today.day - BABY_BIRTHDAY.day
    if days < 0:
        months -= 1
        days += 30
    total_days = (today - BABY_BIRTHDAY).days
    return months, days, total_days


def get_stage_and_week(months, total_days):
    """현재 단계와 주차 계산"""
    # 이유식 시작일 = 생후 6개월 (약 180일)
    weaning_start_days = 180
    days_since_start = total_days - weaning_start_days
    if days_since_start < 0:
        return None, 0

    week = days_since_start // 7 + 1

    if months <= 6:
        stage = "초기"
    elif months <= 8:
        stage = "중기"
    elif months <= 11:
        stage = "후기"
    else:
        stage = "완료기"

    return stage, week


def is_tmux_alive():
    result = subprocess.run(
        ["tmux", "has-session", "-t", TMUX_SESSION], capture_output=True
    )
    return result.returncode == 0


def ask_claude_tmux(prompt, timeout_sec=300):
    """tmux Claude Code 세션으로 AI 브리핑 생성"""
    BRIEFING_A_FILE.write_text("", encoding="utf-8")
    BRIEFING_Q_FILE.write_text(prompt, encoding="utf-8")

    cmd = (
        f"Read {BRIEFING_Q_FILE} 파일을 읽고 그 안의 지시대로 실행해. "
        f"결과만 {BRIEFING_A_FILE}에 Write해."
    )
    subprocess.run(["tmux", "send-keys", "-t", TMUX_SESSION, cmd, "Enter"])

    for _ in range(timeout_sec):
        time.sleep(1)
        if BRIEFING_A_FILE.exists():
            answer = BRIEFING_A_FILE.read_text(encoding="utf-8").strip()
            if answer and len(answer) > 20:
                return answer
    return None


def ask_claude_pipe(prompt):
    """claude -p 직접 호출 (tmux 폴백)"""
    env = os.environ.copy()
    env["DISABLE_AUTOUPDATER"] = "1"
    try:
        result = subprocess.run(
            [CLAUDE_BIN, "-p", "--model", "sonnet", "--dangerously-skip-permissions"],
            input=prompt,
            capture_output=True,
            text=True,
            timeout=180,
            cwd="/tmp",
            env=env,
        )
        if result.returncode == 0 and result.stdout.strip():
            answer = result.stdout.strip()
            for marker in ["─────", "📊 bkit", "Feature Usage", "SessionEnd"]:
                if marker in answer:
                    answer = answer[: answer.index(marker)].strip()
            return answer
    except Exception as e:
        log(f"claude -p 실패: {e}")
    return None


def build_ai_prompt(months, days, total_days, stage, week):
    """AI 브리핑 생성용 프롬프트"""
    today = date.today()
    weekday = WEEKDAYS_KR[today.weekday()]
    date_str = f"{today.month}월 {today.day}일"

    memory = load_memory()
    allergies = memory.get("growth", {}).get("allergyAlerts", [])
    dislikes = memory.get("growth", {}).get("preferences", {}).get("dislikes", [])
    history = memory.get("recommendations", {}).get("history", [])

    memory_hint = ""
    if allergies:
        items = ", ".join(a.get("ingredient", "") for a in allergies)
        memory_hint += f"\n알레르기 기록 (절대 추천 금지): {items}"
    if dislikes:
        memory_hint += f"\n거부한 식재료: {', '.join(dislikes)}"
    if history:
        last = history[-1]
        memory_hint += f"\n어제 추천: {last.get('recommended', '없음')}"

    return f"""하윤이 이유식 아침 브리핑을 만들어줘.

기본 정보:
- 하윤이: 생후 {months}개월 {days}일 (총 {total_days}일)
- 현재 단계: {stage} 이유식
- 이유식 {week}주차
- 날짜: {date_str} ({weekday}){memory_hint}

실행 순서:
1. Read {DATA_JS} 에서 WEEKLY_PLANS 확인
2. {stage} {week}주차에 해당하는 주간 식단 찾기 (예: initial_w{min(week, 8)})
3. 오늘 요일({weekday})에 맞는 식단 선택
4. WebSearch로 "이유식 [오늘의 식재료] 레시피 만들기" 검색 → 유튜브 링크 1개 찾기

아래 형식으로 브리핑 작성 (plain text, 마크다운 없이):

🌅 하윤이 이유식 — {date_str} ({weekday})
━━━━━━━━━━━━━━━━━━━━━━━━

👶 생후 {months}개월 {days}일 · {stage} {week}주차

🍚 오늘의 이유식
├ 오전 10시: [식단명]
├ 양: [적정량]
└ [새 식재료면 "새로운 도전!" / 어제 거부했으면 대체 추천]

👩‍🍳 요리법
[3-4줄 간단 조리법]
📺 참고: [유튜브 링크]

💡 팁
[{months}개월 아기에게 맞는 실용적 팁 1개]

━━━━━━━━━━━━━━━━━━━━━━━━
답장으로 무엇이든 물어보세요

주의사항:
- 알레르기 기록이 있는 식재료는 절대 추천하지 마
- 유튜브 링크는 실제 검색 결과에서 가져와
- 톤은 따뜻하고 실용적으로
"""


def build_pre_weaning_message(months, days, total_days):
    """이유식 시작 전 메시지 (6개월 미만)"""
    today = date.today()
    weekday = WEEKDAYS_KR[today.weekday()]
    start_date = date(
        BABY_BIRTHDAY.year + (BABY_BIRTHDAY.month + 5) // 12,
        (BABY_BIRTHDAY.month + 5) % 12 + 1,
        BABY_BIRTHDAY.day,
    )
    days_left = (start_date - today).days

    return f"""🌅 하윤이 이유식 — {today.month}월 {today.day}일 ({weekday})
━━━━━━━━━━━━━━━━━━━━━━━━

👶 생후 {months}개월 {days}일 ({total_days}일째)

🍼 아직 이유식 시작 전이에요!
이유식은 생후 6개월(약 180일)부터 시작합니다.

⏰ 이유식 시작까지 약 {max(days_left, 0)}일 남았어요

💡 지금 준비할 것
• 이유식 조리 도구 (미음기, 체, 냄비)
• 실리콘 수저 + 흡착 그릇
• 쌀가루 (첫 이유식용)

━━━━━━━━━━━━━━━━━━━━━━━━
궁금한 점은 언제든 물어보세요"""


def build_static_briefing(months, days, total_days, stage, week):
    """AI 실패 시 정적 브리핑"""
    today = date.today()
    weekday = WEEKDAYS_KR[today.weekday()]

    return f"""🌅 하윤이 이유식 — {today.month}월 {today.day}일 ({weekday})
━━━━━━━━━━━━━━━━━━━━━━━━

👶 생후 {months}개월 {days}일 · {stage} {week}주차

🍚 오늘의 이유식
AI 브리핑 생성에 실패했어요.
텔레그램에서 "오늘 뭐 먹여?" 라고 물어보시면
맞춤 식단을 알려드릴게요!

━━━━━━━━━━━━━━━━━━━━━━━━
답장으로 무엇이든 물어보세요"""


def build_message():
    """아침 브리핑 메시지 생성 (AI 우선, 정적 폴백)"""
    months, days, total_days = get_month_age()

    # 6개월 미만: 시작 전 메시지
    if months < 6:
        log(f"하윤이 {months}개월 {days}일 — 이유식 시작 전")
        return build_pre_weaning_message(months, days, total_days)

    stage, week = get_stage_and_week(months, total_days)
    log(f"하윤이 {months}개월 {days}일, {stage} {week}주차")

    # AI 브리핑 시도
    prompt = build_ai_prompt(months, days, total_days, stage, week)
    answer = None

    if is_tmux_alive():
        log("tmux 세션으로 AI 브리핑 생성 시도...")
        try:
            answer = ask_claude_tmux(prompt)
        except Exception as e:
            log(f"tmux 에러: {e}\n{traceback.format_exc()}")

    if not answer:
        log("claude -p 폴백 시도...")
        try:
            answer = ask_claude_pipe(prompt)
        except Exception as e:
            log(f"claude -p 에러: {e}\n{traceback.format_exc()}")

    if answer:
        log(f"AI 브리핑 완성 ({len(answer)}자)")
        return answer

    log("정적 브리핑으로 전환")
    return build_static_briefing(months, days, total_days, stage, week)


def send_telegram(text):
    """텔레그램 메시지 전송"""
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {"chat_id": CHAT_ID, "text": text}

    resp = requests.post(url, json=payload, timeout=10)
    if resp.status_code == 200:
        log("알림 전송 성공")
    else:
        log(f"전송 실패: {resp.status_code} {resp.text}")
    return resp


def run_once():
    """한 번 실행"""
    try:
        msg = build_message()
        send_telegram(msg)
    except Exception as e:
        log(f"run_once 실패: {e}\n{traceback.format_exc()}")
        try:
            send_telegram(f"⚠️ 하윤이 이유식 브리핑 생성 실패\n에러: {e}")
        except Exception:
            pass


def run_scheduler():
    """매일 정해진 시간에 알림 전송"""
    log(f"스케줄러 시작 — 매일 {ALARM_HOUR:02d}:{ALARM_MINUTE:02d} 알림 전송")
    last_sent = None

    while True:
        now = datetime.now()
        today = now.date()

        if now.hour == ALARM_HOUR and now.minute == ALARM_MINUTE and last_sent != today:
            log("알림 전송 시작...")
            run_once()
            last_sent = today

        time.sleep(30)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        log("테스트 전송...")
        run_once()
    else:
        run_scheduler()
