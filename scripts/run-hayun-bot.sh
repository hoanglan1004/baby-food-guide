#!/bin/bash
# 하윤이 AI 영양사 — claude 실행 루프 (tmux 내부에서 실행됨)
#
# 텔레그램: @hayoon20151013_bot (하윤이 AI 이유식 전문 영양사)
#
# 핵심: bot/workspace/ 에서 실행하여 bkit 오버헤드 제거
# bkit이 있는 baby-food-guide/ 에서 실행하면 시스템 프롬프트만 160k+ 소모
# workspace에는 경량 CLAUDE.md만 있어 컨텍스트를 대화에 집중

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.local/bin:$HOME/.cargo/bin"

PROJECT_DIR="/Users/yoonminho/baby-food-guide"
LOG_FILE="$PROJECT_DIR/data/hayun-bot-session.log"

# 하윤 영양사 전용 텔레그램 채널 (CIO와 독립)
export TELEGRAM_STATE_DIR="$HOME/.claude/channels/telegram-hayun"

cd "$PROJECT_DIR"
mkdir -p "$PROJECT_DIR/data"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') | $1" | tee -a "$LOG_FILE"
}

while true; do
    log "하윤 영양사 봇 세션 시작 (workspace: $BOT_WORKSPACE)"

    claude --model sonnet \
           --name hayun-bot \
           --channels plugin:telegram@claude-plugins-official \
           --dangerously-skip-permissions

    EXIT_CODE=$?
    log "하윤 영양사 봇 세션 종료 (exit: $EXIT_CODE)"

    if [ $EXIT_CODE -eq 0 ]; then
        log "정상 종료. 30초 후 재시작..."
        sleep 30
    else
        log "비정상 종료. 10초 후 재시작..."
        sleep 10
    fi
done
