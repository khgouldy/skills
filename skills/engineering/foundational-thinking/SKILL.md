---
name: foundational-thinking
description: Use before writing logic — when choosing the core types and data structures, sequencing scaffold-vs-feature work, or asking what concurrent actors share. Get the data shape right first so the downstream code becomes obvious. Triggers include "design the data model", "what types should this use", "what order should I build this in", or reaching for an abstraction before the structure is settled.
---

# Foundational thinking

Get the data structures right before writing logic. The right shape makes the
downstream code obvious; the wrong shape makes every function fight it. A
data-structure change made late is a rewrite; made early it's often a one-line
diff. Structural decisions protect option value, code-level decisions protect
simplicity, and over-engineering is usually a premature decision that closes a
door you didn't need to close yet.

**Data structures first.** Define the core types early, trace every access
pattern, and pick structures that match the dominant paths. At the code level,
DRY the *structure* (types and data models should converge), not every line —
three similar statements still beat a premature abstraction. Prefer explicit over
clever; test behavior and edge cases, not line counts.

**Subtract before you scaffold.** Remove dead weight first, then lay foundations
on the simpler base.

**Scaffold first.** If something helps every later phase, do it first. Ask "does
every subsequent phase benefit from this existing?" CI, linting, test
infrastructure, and shared types are scaffold — set them up before features, write
tests before fixes. Keep commits small and single-purpose.

**Concurrency corollary.** Before sharing state between actors, ask "what happens
if another actor modifies this concurrently?" If the answer isn't "nothing,"
isolate the state.

Pairs with [redesign-from-first-principles](../redesign-from-first-principles/SKILL.md)
(when the foundation has to change to fit a new requirement) and
[finding-concurrency-bugs](../finding-concurrency-bugs/SKILL.md) (when shared
state is already in play).

---

_Inspired by `principle-foundational-thinking` in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own._
