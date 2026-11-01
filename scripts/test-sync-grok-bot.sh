#!/usr/bin/env bash
# Fixture test for sync-grok-bot.sh: only a real SKILL.md is copied; tracked stragglers are warned, not removed (by design).
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
mkdir -p grok-bot/good grok-bot/gone && echo old > grok-bot/good/helper.py && echo old > grok-bot/gone/SKILL.md
git add grok-bot && git -c user.name=t -c user.email=t@t commit -q --no-verify -m seed
export GIT_AUTHOR_NAME=t GIT_AUTHOR_EMAIL=t@t GIT_COMMITTER_NAME=t GIT_COMMITTER_EMAIL=t@t
if ! bash scripts/sync-grok-bot.sh "$T/src" >/dev/null 2>"$T/err"; then cat "$T/err"; echo "FAIL: sync exited non-zero"; exit 1; fi
got="$(cd grok-bot/good && find . -type f -o -type l | LC_ALL=C sort -f | tr '\n' ' ')"
[ "$got" = "./helper.py ./SKILL.md " ] || { echo "FAIL: mirrored files: $got"; exit 1; }
grep -q "not mirrored: good/.env" "$T/err" || { echo "FAIL: no warning for .env"; exit 1; }
grep -q "skipping symlinked skill: linked" "$T/err" || { echo "FAIL: symlink not skipped"; exit 1; }
! grep -q "not mirrored: good/SKILL.md" "$T/err" || { echo "FAIL: false warning on SKILL.md"; exit 1; }
grep -q "tracked non-SKILL.md file in mirror: grok-bot/good/helper.py" "$T/err" || { echo "FAIL: no straggler warning"; exit 1; }
grep -q "skill no longer on box (not removed): grok-bot/gone" "$T/err" || { echo "FAIL: no removed-skill warning"; exit 1; }
[ -f grok-bot/gone/SKILL.md ] || { echo "FAIL: removed skill was deleted"; exit 1; }
echo "PASS sync-grok-bot"
