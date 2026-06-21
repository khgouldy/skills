---
name: grill-with-docs
description: Use when stress-testing a plan that you also want to leave a paper trail for — runs a grilling session and captures the decisions as ADRs and a glossary as they're settled. Triggers include "grill this and write it up", "interrogate the design and document it".
disable-model-invocation: true
---

# Grill With Docs

A grilling session that produces durable documentation as a side effect. Same
relentless one-question-at-a-time interrogation, but every resolved decision and
every newly-defined term gets written down so the rationale survives the
conversation.

## How to run it

1. Run a [grilling](../grilling/SKILL.md) session as normal — one question at a
   time, recommended answer each time, depth-first down the decision tree.

2. **As each significant decision is settled, capture it as an ADR** (Architecture
   Decision Record). A lightweight ADR is enough:
   - **Context** — what forced the decision.
   - **Decision** — what we chose.
   - **Consequences** — what this costs us and rules out.

3. **As new domain terms appear, add them to a glossary.** Any noun the team
   would otherwise define inconsistently — capture one agreed definition.

4. Keep the docs in the repo (e.g. `docs/adr/` and `docs/glossary.md`) so the
   next person — or the next session — inherits the reasoning, not just the
   outcome.

## Why bother

A plan that's only in chat history evaporates. ADRs answer "why did we do it
this way?" months later, and a shared glossary stops two people meaning two
things by the same word.

---

_Inspired by Matt Pocock's grill-with-docs skill (https://github.com/mattpocock/skills). Prose is our own._
