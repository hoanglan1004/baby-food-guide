#!/bin/bash
# 하윤이 이유식 전문가 봇 — tmux 세션으로 Claude Code 실행
# macOS LaunchAgent에서 호출하거나 수동 실행

SESSION="hayun-bot"
WORKDIR="/Users/yoonminho/baby-food-guide"

# 이미 세션이 있으면 종료
tmux has-session -t "$SESSION" 2>/dev/null && {
  echo "[$SESSION] 이미 실행 중"
  exit 0
}

# 새 tmux 세션 생성 + Claude Code 실행
tmux new-session -d -s "$SESSION" -c "$WORKDIR"
tmux send-keys -t "$SESSION" "claude" Enter

echo "[$SESSION] 봇 시작됨 — tmux attach -t $SESSION 으로 확인"
