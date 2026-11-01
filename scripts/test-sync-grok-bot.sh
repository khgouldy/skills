#!/usr/bin/env bash
# Fixture test for sync-grok-bot.sh: only a real SKILL.md may land in the mirror.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
T="$(mktemp -d)"
mkdir -p "$T/src/good/sub" "$T/src/linked" "$T/repo/scripts"
echo ok > "$T/src/good/SKILL.md"
for f in .env state.json helper.py sub/notes.md; do echo x > "$T/src/good/$f"; done
echo secret > "$T/outside.md"; ln -s "$T/outside.md" "$T/src/linked/SKILL.md"
cp "$HERE/sync-grok-bot.sh" "$T/repo/scripts/"
cd "$T/repo"
git init -q && git checkout -qb test
git -c user.name=t -c user.email=t@t commit -q --allow-empty --no-verify -m seed
export GIT_AUTHOR_NAME=t GIT_AUTHOR_EMAIL=t@t GIT_COMMITTER_NAME=t GIT_COMMITTER_EMAIL=t@t
bash scripts/sync-grok-bot.sh "$T/src" >/dev/null 2>"$T/err" || true; cat "$T/err" >&2
got="$(cd grok-bot && find . -type f -o -type l | sort | tr '\n' ' ')"
[ "$got" = "./good/SKILL.md " ] || { echo "FAIL: mirrored files: $got"; exit 1; }
grep -q "not mirrored: good/.env" "$T/err" || { echo "FAIL: no warning for .env"; exit 1; }
grep -q "skipping symlinked skill: linked" "$T/err" || { echo "FAIL: symlink not skipped"; exit 1; }
! grep -q "not mirrored: good/SKILL.md" "$T/err" || { echo "FAIL: false warning on SKILL.md"; exit 1; }
echo "PASS sync-grok-bot"
