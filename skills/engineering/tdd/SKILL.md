---
name: tdd
description: Use when implementing any feature or bugfix — drive the implementation test-first (red → green → refactor) rather than writing code and testing after. Especially when fixing a bug (write the failing test that reproduces it first) or building behavior with a clear input/output contract.
---

# Test-Driven Development

Write the test before the code. The test defines what "working" means, so you
write only the code needed to satisfy a real specification — and you get a
regression guard for free.

## The cycle

1. **Red.** Write one small test for behavior that doesn't exist yet. Run it.
   Watch it fail *for the reason you expect*. A test that passes immediately, or
   fails for the wrong reason, is testing nothing.

2. **Green.** Write the simplest code that makes the test pass. Not the elegant
   version, not the general version — the simplest one. Resist building ahead of
   the test.

3. **Refactor.** Now that the test pins the behavior, clean up the code *and* the
   test. The green test is your safety net for this step.

Repeat in small loops. Each loop adds one slice of behavior.

## For bugfixes specifically

Write a test that **reproduces the bug first** and fails. Then fix until it
passes. This proves you actually understood the bug, and the test stays as a
permanent guard against its return. Fixing a bug without first reproducing it in
a test is guessing.

## Discipline notes

- **One behavior per test.** A test that asserts five things tells you little
  when it fails.
- **Test behavior, not implementation.** Assert on observable outputs, not
  internal calls — otherwise every refactor breaks the test.
- **Watch it fail before you make it pass.** This is the step people skip, and
  it's the one that proves the test has teeth.
- **Don't write production code with no failing test demanding it.** If you can't
  write a test for it, you don't yet understand what you're building.

## When the oracle is hard

If you can't easily state the "correct answer" to assert against (common in data
transforms and scientific code), reach for
[metamorphic-testing](../metamorphic-testing/SKILL.md) — assert relationships
between inputs and outputs instead of exact values.

---

_Inspired by Matt Pocock's tdd skill (https://github.com/mattpocock/skills). Prose is our own._
