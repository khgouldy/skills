---
name: fix-root-causes
description: Use when you're tempted to silence a symptom rather than fix the cause — adding a nil/null check to stop a crash, wrapping a flaky call in try/catch, special-casing the one input that breaks. The principle: trace every problem to its root and fix it there. Triggers include "just add a guard so it stops crashing", "wrap it in a try/catch", or a fix that makes the error go away without explaining why it happened.
---

# Fix root causes

When debugging, don't paper over symptoms. Trace every problem to its root cause
and fix it there. Symptom fixes accumulate: each workaround makes the system
harder to reason about, and the real bug is still in there waiting. Root-cause
fixes are slower up front and cheaper over the life of the code.

This is the *principle* — fix at the source, refuse the band-aid. For the
step-by-step investigation that finds the cause, use
[diagnosing-bugs](../diagnosing-bugs/SKILL.md).

**The pattern**

- **Reproduce first.** If you can't reproduce it, you can't verify your fix.
- **Ask "why" until you hit the root.** The first answer is usually a symptom of a
  deeper one.
- **Resist the guard reflex.** Adding a nil check to silence a crash treats the
  symptom; ask why the value was nil and fix *that*.
- **Fix the pattern, not the instance.** Grep for the same shape elsewhere and fix
  every occurrence, not just the one that bit you.
- **When stuck, instrument — don't guess.** Add logging, read the actual error,
  let evidence point at the cause.

**Restart bugs: suspect state before code.** Code doesn't change between runs;
state does. When something "fails after restart," suspect stale persistent state
first — config, caches, lock files, serialized state. If clearing a state file
restores the behavior, the real fix is state validation, not a code change.

---

_Inspired by `principle-fix-root-causes` in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own._
