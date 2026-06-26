---
name: exhaust-the-design-space
description: Use when a novel interaction or architectural decision has no precedent in the codebase and the right answer isn't obvious — build 2-3 competing prototypes and compare them side by side before committing. Triggers include "I'm not sure how this should work", a new UI interaction with no prior art, an architecture choice with several viable approaches, or a design where the feel matters more than the logic. Not for mechanical work with an established pattern.
---

# Exhaust the design space

When a decision has no established precedent and the right answer isn't obvious,
explore several concrete alternatives before you implement. Building the wrong
thing costs more than building two throwaway sketches.

**The rule:** when the answer isn't obvious, build 2-3 competing prototypes or
sketches, compare them side by side, and only then commit. The comparison teaches
you things no amount of up-front reasoning will — you see the shape after you've
felt the alternatives.

**When it applies**

- Novel UI interactions with no prior art in the codebase.
- Architectural choices with multiple genuinely viable approaches.
- Product/design decisions where the experience depends on feel, not logic.

**When it doesn't**

- Mechanical implementation where the pattern is already established.
- Bug fixes or refactors with a clear target state.
- Changes where the constraints dictate a single viable approach.

For a mechanized version of this — fan out the alternatives to parallel agents,
then graft the best parts together — pair with [arena](../arena/SKILL.md).

---

_Inspired by `principle-exhaust-the-design-space` in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own._
