#!/usr/bin/env bash
# Mirror Grok Bot user-created skills (box workflows dir) into grok-bot/, then commit.
# Allowlist copy: SKILL.md and other *.md docs only (no scripts, json, logs or state);
# dotfiles, env/key/pem files and symlinks are never copied.
set -euo pipefail
SRC="${1:-/home/box/agent-data/workflows}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/grok-bot"
cd "$ROOT"
branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$branch" = main ] || [ "$branch" = master ]; then
  echo "refusing to commit on $branch; create a branch first" >&2; exit 1
fi
[ -d "$SRC" ] || { echo "source not found: $SRC" >&2; exit 1; }
trap 'git reset -q -- grok-bot' ERR
mkdir -p "$DEST"
for d in "$SRC"/*/; do
  [ -f "$d/SKILL.md" ] || continue
  name="$(basename "$d")"
  mkdir -p "$DEST/$name"
  rsync -rt --no-links --prune-empty-dirs \
    --exclude '.*' --exclude '*.env*' --exclude '*.key' --exclude '*.pem' \
    --include '*/' --include '*.md' --exclude '*' \
    "$d" "$DEST/$name/"
done
git add grok-bot
if git diff --cached --quiet -- grok-bot; then echo "grok-bot/ already in sync"; exit 0; fi
git commit -m "chore(grok-bot): sync Grok Bot skills mirror" -m "Bead: none
Agent: grok-build" -- grok-bot
