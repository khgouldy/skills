---
name: deslop
description: Use when cleaning AI-generated slop out of *code* in a branch or diff — stray or redundant comments, defensive try/catch and null checks on trusted paths, `any` casts that only paper over type errors, needless deep nesting. Triggers include "clean up this diff", "deslop this branch", "remove the AI cruft", or a self-review pass before opening a PR. For prose tells (docs, comments-as-writing), use unslop instead.
---

# Deslop

Clean the AI tells out of code introduced in a branch. Review the diff against the
base branch and strip what an experienced engineer wouldn't have written, without
changing behavior.

This is the code counterpart to [unslop](../../productivity/unslop/SKILL.md): unslop
fixes *prose* tells, deslop fixes *code* tells.

## What to cut

- **Redundant or out-of-style comments** — narration of what the next line plainly
  does, or comments that don't match the file's local convention.
- **Defensive checks on trusted paths** — try/catch and null guards wrapped around
  code that, in this codebase, can't actually fail that way. (If a check is load-
  bearing, keep it — see [fix-root-causes](../fix-root-causes/SKILL.md): a guard
  that silences a real bug is itself slop.)
- **`any` casts that only bypass a type error.** Find the real type instead.
- **Needless deep nesting.** Flatten with early returns and guard clauses.
- **Anything inconsistent with the surrounding code** — naming, structure, error
  handling that doesn't match the file it lives in.

## Guardrails

- **Keep behavior unchanged** unless you're fixing a clear bug, and call that out
  separately if you do.
- **Minimal, focused edits** over broad rewrites. Deslop is cleanup, not a
  redesign.
- **Match the surrounding code**, not an abstract ideal. The standard is "what fits
  this file," not "what I'd write greenfield."
- Keep the final summary to a sentence or two.

---

_Inspired by the `deslop` skill in Cursor's [cursor-team-kit](https://github.com/cursor/plugins/tree/main/cursor-team-kit). Prose is our own._
