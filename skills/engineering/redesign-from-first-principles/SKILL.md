---
name: redesign-from-first-principles
description: Use when folding a new requirement into an existing design and you're tempted to bolt it on beside what's already there — a new flag, a special case, a parallel code path. Redesign as if the requirement had been known on day one. Triggers include "add support for X" to a mature module, "handle this new case too", or any change where the clean answer would have been a different shape from the start.
---

# Redesign from first principles

When integrating a new requirement, don't bolt it onto the existing design. Build
what you would have built if you'd known about the requirement on day one. The
result should look designed, not patched.

The bolt-on is always faster in the moment and always more expensive later: each
special case makes the system harder to reason about, and the next requirement
bolts onto *that*. Spend the time once.

- **Read all affected files first.** Understand the current design holistically
  before you touch it. You can't redesign what you've only skimmed.
- **Ask the day-one question.** "If we were writing this from scratch *with* this
  requirement, what shape would it have?" Build that shape.
- **Propagate the change everywhere.** Types, call sites, docs, examples, and the
  rationale comments all move to the new shape — not just the one function that
  prompted the change.
- **Think holistically, deliver incrementally.** Design the whole new shape, then
  land it in small, reviewable steps.

This is how you preserve option value when a design has to grow. Pairs with
[fix-root-causes](../fix-root-causes/SKILL.md) (a bolted-on special case is often
a symptom fix in disguise) and [foundational-thinking](../foundational-thinking/SKILL.md)
(remove the old shape and rebuild on it, don't keep both side by side).

---

_Inspired by `principle-redesign-from-first-principles` in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own._
