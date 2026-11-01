#!/usr/bin/env bash
# Mirror Grok Bot user-created skills (box workflows dir) into grok-bot/, then commit.
set -euo pipefail
SRC="${1:-/home/box/agent-data/workflows}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/grok-bot"
[ -d "$SRC" ] || { echo "source not found: $SRC" >&2; exit 1; }
mkdir -p "$DEST"
for d in "$SRC"/*/; do
  [ -f "$d/SKILL.md" ] || continue
  name="$(basename "$d")"
  mkdir -p "$DEST/$name"
  rsync -a --exclude '.library-fingerprint' "$d" "$DEST/$name/"
done
cd "$ROOT"
git add grok-bot
if git diff --cached --quiet -- grok-bot; then echo "grok-bot/ already in sync"; exit 0; fi
git commit -m "chore(grok-bot): sync Grok Bot skills mirror" -- grok-bot
