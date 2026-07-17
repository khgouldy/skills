---
name: grilling-frontend-prototyping
description: Use when converging on frontend look-and-feel by iterating live UI variants instead of abstract Q&A — "grill the design with prototypes", "show me options and interrogate", visual taste decisions, or a wayfinder/prototype ticket that names this flow.
disable-model-invocation: true
---

# Grilling + Frontend Prototyping

A [grilling](../../productivity/grilling/SKILL.md) session where every question
is asked with **prototypes, not paragraphs**. Compose the
[prototype](../prototype/SKILL.md) skill's UI branch: verdicts come from what the
user *sees*, not from description alone.

## How to run it

1. Run grilling as usual — **one question at a time**, recommended answer each
   time, depth-first down the decision tree. Prefer exploring the codebase over
   asking what the code already answers.

2. For each design question, build **~5 radically different prototypes** of *that*
   question into **one live mocked app**:
   - Prefer a **single standalone HTML file** updated in place each round when
     you're not embedded in an app (fastest feedback; Artifact / preview tool if
     available).
   - Prefer the UI-branch process in [prototype/ui.md](../prototype/ui.md) when
     the host app exists — real chrome and real data beat a vacuum.

3. Include a **floating, bottom-right, draggable picker** that names each design.
   ←/→ (and on-screen arrows) switch variants and restyle the mock live. When
   the surface has meaningful states (inbox full vs empty, logged-in vs out),
   add picker controls that toggle those states too.

4. Walk the **visual design tree** with each verdict zooming in one level:
   overall composition → component groups → individual components — until the
   feature is designed in enough detail that a real implementation wouldn't be
   guessing layout or hierarchy.

5. When a branch of the tree is settled, **lock it** (note the winning direction)
   and move to the next unresolved branch. Don't rebuild settled levels from
   scratch unless the user reopens them.

## When to stop

Stop when you could implement the UI without inventing structure — hierarchy,
primary affordances, empty/error/loading states, and the key component-level
choices are decided. Capture winners the way [prototype](../prototype/SKILL.md)
describes (verdict on the ticket; throwaway branch for the full set if useful).

## Pairs with

- [prototype](../prototype/SKILL.md) — the engine for one-shot logic or UI
  prototypes outside a grilling loop
- [grill-with-docs](../../productivity/grill-with-docs/SKILL.md) — same grilling
  discipline, but decisions land as ADRs/glossary instead of visual variants

---

_Inspired by will-ness-ai's grilling-frontend-prototyping skill
(https://github.com/will-ness-ai/skills), which composes Matt Pocock's grilling +
prototype ideas. Prose is our own._
