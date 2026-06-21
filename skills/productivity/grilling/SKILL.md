---
name: grilling
description: Use when the user wants to stress-test a plan or design before building it, or uses any "grill" trigger phrase ("grill me", "poke holes", "interrogate this plan"). Surfaces hidden assumptions and unresolved decisions one question at a time.
disable-model-invocation: true
---

# Grilling

Interrogate the plan relentlessly until you and the user share one clear picture
of what's being built and why. The goal is to find the cracks *now* — the
unstated assumption, the undecided edge case, the dependency nobody named —
while they're cheap to fix.

## How to run it

1. **One question at a time.** Ask a single question, wait for the answer, then
   ask the next. A wall of questions is overwhelming and gets shallow answers.

2. **Always offer your recommended answer.** Don't just ask "what should happen
   when X?" — ask, and then say what *you'd* do and why. The user reacts faster
   to a concrete proposal than to an open prompt.

3. **Walk the decision tree depth-first.** Each answer opens new branches and
   resolves dependencies between decisions. Follow them down before jumping to
   an unrelated topic.

4. **If the codebase can answer it, go look.** Don't ask the user something a
   quick read of the code or docs would settle. Explore, then ask only what's
   genuinely undecided.

5. **Hunt for the uncomfortable questions.** The valuable ones are the
   assumptions the user is treating as settled but hasn't justified: scope
   boundaries, failure modes, data shape, who the user is, what "done" means.

## When to stop

Stop when there are no unresolved branches left — when you could write the spec
yourself and the user would agree with every line. Then write it down.

## Pairs well with

- [grill-with-docs](../grill-with-docs/SKILL.md) — same interrogation, but it
  captures the decisions as ADRs and a glossary as you go.

---

_Inspired by Matt Pocock's grilling skill (https://github.com/mattpocock/skills). Prose is our own._
