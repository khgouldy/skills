#!/usr/bin/env bash
# bootstrap-vps.sh — set up ~/.claude on a Linux host from this repo.
#
#   bash scripts/bootstrap-vps.sh            # link skills + install CLAUDE.md if absent
#   bash scripts/bootstrap-vps.sh --force    # also replace an existing ~/.claude/CLAUDE.md (backs it up)
#
# Idempotent. Does not touch repo checkouts, systemd, or agent-hub itself.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLAUDE_DIR="$HOME/.claude"
FORCE=0
[[ "${1:-}" == "--force" ]] && FORCE=1

command -v node >/dev/null || { echo "error: node is required (link-skills.mjs)" >&2; exit 1; }

mkdir -p "$CLAUDE_DIR/skills"

echo "==> linking skills into $CLAUDE_DIR/skills"
node "$REPO_DIR/scripts/link-skills.mjs"

TARGET="$CLAUDE_DIR/CLAUDE.md"
if [[ -f "$TARGET" && $FORCE -eq 0 ]]; then
  echo "==> $TARGET exists — left untouched (use --force to replace; it will be backed up)"
else
  if [[ -f "$TARGET" ]]; then
    cp "$TARGET" "$TARGET.bak.$(date +%Y%m%d%H%M%S)"
    echo "==> backed up existing CLAUDE.md"
  fi
  cp "$REPO_DIR/templates/CLAUDE.vps.md" "$TARGET"
  echo "==> installed VPS global CLAUDE.md -> $TARGET"
fi

echo
echo "Done. Sanity checks:"
echo "  ls -la $CLAUDE_DIR/skills | head          # symlinks into this repo"
echo "  head -5 $TARGET"
echo
echo "Keep fresh with: git -C $REPO_DIR pull && bash $REPO_DIR/scripts/bootstrap-vps.sh"
