#!/usr/bin/env bash
# Mirror Grok Bot user-created skills (box workflows dir) into grok-bot/, then commit.
# Copies SKILL.md only (never helpers, logs, state, dotfiles or symlinks) and warns
# about every other file it skips.
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
  d="${d%/}"
  name="$(basename "$d")"
  if [ -L "$d" ] || [ -L "$d/SKILL.md" ]; then echo "warn: skipping symlinked skill: $name" >&2; continue; fi
  [ -f "$d/SKILL.md" ] || continue
  mkdir -p "$DEST/$name"
  install -m 0644 "$d/SKILL.md" "$DEST/$name/SKILL.md"
  # Contract: stragglers are warned, not removed (deliberate: the sync never deletes; prune by hand).
  git ls-files -- "grok-bot/$name" | while read -r t; do
    [ "$t" = "grok-bot/$name/SKILL.md" ] || echo "warn: tracked non-SKILL.md file in mirror: $t" >&2
  done
  # Only SKILL.md is mirrored; warn loudly about anything else so helpers aren't silently lost.
  find "$d" -mindepth 1 ! -path "$d/SKILL.md" ! -type d -print | while read -r f; do
    echo "warn: not mirrored: $name/${f#"$d/"}" >&2
  done
done
git add grok-bot
if git diff --cached --quiet -- grok-bot; then echo "grok-bot/ already in sync"; exit 0; fi
git commit -m "chore(grok-bot): sync Grok Bot skills mirror" -m "Bead: none
Agent: grok-build" -- grok-bot
