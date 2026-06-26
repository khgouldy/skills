---
name: make-operations-idempotent
description: Use when designing a command, lifecycle step, startup routine, or processing loop that runs amid crashes, restarts, and retries — make it converge to the same end state no matter how many times it runs or where a prior run died. Triggers include "what if this runs twice", "it breaks on restart", a setup/teardown step, a cron or queue worker, or a migration that might be re-run.
---

# Make operations idempotent

Design every state-mutating operation so it converges to the correct end state no
matter how many times it runs or where a previous run crashed. The two questions
to answer for any such operation: *what happens if this runs twice?* and *what
happens if the last run died halfway?*

Commands, lifecycle steps, and processing loops run in a world where crashes,
restarts, and retries are normal. If partial state changes the next run's outcome,
every restart becomes a debugging session.

**The pattern**

- **Converge on startup:** scan for existing state, clean stale artifacts, adopt
  live sessions rather than assuming a blank slate.
- **Clean up by content, not order:** compare by content equivalence, not by
  creation time or sequence.
- **Self-healing locks:** detect and clear stale locks (e.g. by checking whether
  the owning PID is still alive) instead of deadlocking on a crashed run's lock.
- **Idempotent scheduling:** failed work respawns cleanly; inputs regenerate
  rather than accumulate.

**The test**

1. What happens if this runs twice in a row?
2. What happens if the previous run crashed at *every* possible point?
3. Does re-execution converge to the same end state?

If any answer is "it depends on what state was left behind," the operation needs a
reconciliation step before it's safe.

Relevant to [building-data-pipelines](../../data/building-data-pipelines/SKILL.md),
where idempotent backfills and watermarks are the same idea applied to data.

---

_Inspired by `principle-make-operations-idempotent` in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own._
