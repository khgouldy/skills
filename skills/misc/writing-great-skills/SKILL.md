---
name: writing-great-skills
description: Use when authoring a new skill or improving an existing one — how to write a skill that triggers at the right moment, stays focused on one job, and tells the agent what to do clearly. Triggers include "write a skill", "this skill isn't firing", "improve this skill", "the description isn't triggering".
disable-model-invocation: true
---

# Writing Great Skills

A skill is only useful if it fires at the right moment and then gives clear,
followable instructions. Most weak skills fail at one of those two things: a
vague description that never triggers, or a bloated body that tries to do
everything.

## The description is the trigger — make it earn its place

For model-invoked skills, the `description` is the *only* thing the agent sees
when deciding whether to use the skill. Treat it as the trigger surface, not a
summary.

- **Lead with "Use when…"** Describe the *situation* that should activate it, not
  what the skill is about.
- **Name concrete triggers.** Phrases the user might say, error shapes, file
  types, task patterns. Specificity is what makes the agent recognize the moment.
- **Draw the boundary.** If a skill is easily confused with a neighbor, say when
  *not* to use it.

A description like "helps with testing" never fires. "Use when you can't state
the correct output to assert against — data transforms, ML, optimizers" fires
exactly when it should.

## One skill, one job

If a skill does two things, it triggers ambiguously and reads confusingly. Split
it, or make it a thin **composition** that chains two focused skills. Small,
sharp skills compose; big general ones collide.

## The body: tell the agent what to do

- **Imperative and concrete.** "Reproduce the bug first," not "bugs should
  generally be reproduced."
- **Scale to complexity.** A two-line directive is a perfectly good skill if the
  job is simple. Don't pad.
- **Show the failure modes.** A short "anti-patterns" or "red flags" list often
  does more than the happy-path instructions — it catches the agent mid-mistake.
- **Reference, don't duplicate.** Link sibling skills instead of copying their
  content.

## Choose the invocation mode deliberately

- **Model-invoked** (default, no flag) for discipline that should kick in
  automatically — testing, debugging, recon.
- **User-invoked** (`disable-model-invocation: true`) for things that should only
  run on explicit request — interactive sessions, doc generation, anything
  expensive or intrusive.

Each model-invoked description is loaded into the agent's context so it can match
against it — they cost tokens. Don't mark a skill model-invoked just because you
can; do it when autonomous discovery is worth the context.

## The composition trap — user-invoked can't reach user-invoked

A user-invoked skill is hidden from the agent (its description is excluded from
the manifest). So:

- A user-invoked skill **can** invoke a model-invoked one.
- A user-invoked skill **cannot** invoke another user-invoked one — the agent
  can't see the target, and the instruction dangles silently.

When you build a user-invoked *wrapper* that composes a reusable *engine*, make
the engine **model-invoked**. A "pairs with" link for the reader is just docs and
doesn't count — only an actual "run this skill" instruction is a dependency.

## Before you ship it

- Does the description make the trigger moment unmistakable?
- Does it do exactly one thing?
- Could an agent follow the body without already knowing the answer?
- Is the provenance noted and the README catalog updated?

---

_Inspired by Matt Pocock's writing-great-skills skill (https://github.com/mattpocock/skills). Prose is our own._
