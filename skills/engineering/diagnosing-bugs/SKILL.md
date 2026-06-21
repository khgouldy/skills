---
name: diagnosing-bugs
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing a fix — find the root cause through evidence first instead of guessing. Triggers include "why is this failing", "this isn't working", a stack trace, or a flaky/intermittent failure.
---

# Diagnosing Bugs

Find the root cause before you touch anything. The fastest path to a real fix is
to understand the failure, not to start changing code and hope. A fix applied to
a symptom you don't understand usually moves the bug rather than removing it.

## The method

1. **Reproduce it reliably.** A bug you can't trigger on demand, you can't fix
   with confidence. Find the smallest, most consistent reproduction. For
   intermittent failures, narrow the conditions until it's reliable.

2. **Read the actual error.** The full message, the full stack trace, the line it
   points to. Don't skim it and pattern-match to a guess — the evidence is
   usually right there.

3. **Form one hypothesis at a time.** "I think X causes this because Y." State it
   explicitly so you can test it.

4. **Test the hypothesis cheaply.** A log line, a breakpoint, a one-line probe.
   Let the evidence confirm or kill the hypothesis before you write a fix.
   Change one thing at a time so you know what moved the needle.

5. **Trace to the root, not the symptom.** Keep asking "but why did *that*
   happen?" until you reach the actual cause. The first thing that looks wrong is
   often a downstream effect.

6. **Fix the root, then prove it.** Apply the fix, confirm the reproduction now
   passes, and confirm you didn't break anything adjacent. Ideally capture the
   reproduction as a regression test (see [tdd](../tdd/SKILL.md)).

## Anti-patterns

- **Shotgun debugging** — changing several things at once. Now you don't know
  which one mattered, or what new problem you introduced.
- **Fixing the symptom** — silencing the error without understanding it.
- **Trusting your guess over the evidence** — the stack trace beats your hunch.
- **Declaring it fixed without reproducing the fix** — evidence before
  assertions, always. Re-run the reproduction and watch it pass.

---

_Inspired by Matt Pocock's diagnosing-bugs skill (https://github.com/mattpocock/skills). Prose is our own._
