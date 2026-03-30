#!/bin/bash
# 하윤이 AI 영양사 — claude 실행 루프 (tmux 내부에서 실행됨)
#
# 텔레그램: @hayoon20151013_bot (하윤이 AI 이유식 전문 영양사)

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
    log "하윤 영양사 봇 세션 시작"

    claude --model sonnet \
           --name hayun-bot \
           --effort high \
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
