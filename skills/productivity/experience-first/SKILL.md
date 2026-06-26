---
name: experience-first
description: Use when a product, UX, or feature-scope tradeoff comes up and implementation convenience is pulling against the experience of whoever consumes the work. Choose delight; ship fewer polished things over more rough ones. Triggers include "should we add this option/feature too", "this is easier to build if we expose X", scope debates, or deciding how much to polish. The consumer can be an end user, an API caller, or the next maintainer.
---

# Experience first

The product is the experience. Every technical decision either helps it or hurts
it. When implementation convenience conflicts with the experience of the person
who consumes the work, choose the experience.

- **Say no to a thousand things.** Every feature, control, and option must earn
  its place. The default answer is no.
- **Ship less, ship better.** A polished experience with three features beats a
  rough one with ten.
- **Prototype before committing.** Design decisions are cheaper to get wrong in
  throwaway HTML than in production code.
- **Sweat the details.** Transitions, alignment, spacing, feedback, error states —
  the details *are* the experience.
- **Tighten the core loop.** Every feature either serves the central workflow or
  gets out of its way.

**Who the user is.** Whoever consumes the work. For a UI, the end user. For a
library or internal API, the colleague who imports it. For any code, the engineer
who maintains it next. Weigh their experience the same way, and explain impact
from their seat.

Foundations serve the experience, not the other way around:
[foundational-thinking](../../engineering/foundational-thinking/SKILL.md) governs
the *sequence* of work; this principle governs the *target*.

---

_Inspired by `principle-experience-first` in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own._
