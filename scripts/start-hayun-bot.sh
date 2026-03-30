#!/bin/bash
# 하윤이 AI 영양사 — 상주 세션 시작 (tmux 진입점)

SESSION_NAME="hayun-bot"
PROJECT_DIR="/Users/yoonminho/baby-food-guide"

mkdir -p "$PROJECT_DIR/data"

if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo "하윤 영양사 봇 이미 실행 중"
    echo "  접속: tmux attach -t $SESSION_NAME"
    exit 0
fi

tmux new-session -d -s "$SESSION_NAME" -c "$PROJECT_DIR" \
    "$PROJECT_DIR/scripts/run-hayun-bot.sh"

echo "하윤 영양사 봇 상주 세션 시작됨"
echo "  접속:  tmux attach -t $SESSION_NAME"
echo "  종료:  tmux kill-session -t $SESSION_NAME"
