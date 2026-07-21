---
name: feedback-to-infrastructure
description: Use when the same correction, review comment, or human relay keeps recurring — promote the lesson into the smallest durable owner (doc, skill, type, lint, test, architecture) and clean up the population, not just the instance. Triggers include "we keep telling agents this", "document this so it doesn't happen again", the same review note twice, repeated steering mid-task, or turning a one-off fix into a permanent guardrail.
---

# Feedback to infrastructure

Recurring corrections are harness gaps. Fix the instance if you must, then put
the governing principle where the next trajectory will hit it — preferably so
the bad shape becomes hard or impossible.

This is the *promote the lesson* ladder. For a single bug's root cause, use
[fix-root-causes](../fix-root-causes/SKILL.md) and
[diagnosing-bugs](../diagnosing-bugs/SKILL.md). For a full baseline→rerun
environment experiment, use [improve-harness](../improve-harness/SKILL.md).

## Recover the failure class, not the line

A one-line fix leaves every sibling defect intact. When steering or review
repeats:

1. Reconstruct the promised outcome and the observed failure.
2. Name the principle behind the correction (not only the local edit).
3. Search the repo for other instances of the same class.
4. Separate harness gap from stochastic variance, bad task framing, and external failure.
5. Choose an intervention that covers the class without forbidding legitimate exceptions.

"Slop" often means a missing nonfunctional requirement — quality bar, taste,
risk, polish — that never became retrievable context or a merge gate. Recover
the requirement; don't only scold the prose.

## Promotion ladder (cheapest durable owner that works)

Match maturity and consequence:

| Intervention | Use when |
|---|---|
| Prompt / task reframing | Outcome or framing is still being discovered |
| Routing doc, example, or skill | Stable knowledge must appear at a decision point |
| Reviewer / checklist | Judgment is qualitative or still gaining nuance |
| Type, API, or domain tool | Correct use can be made natural; misuse hard |
| Lint, test, or policy check | Deterministic invariant should block recurrence |
| Architecture or migration | Wrong owner or dependency direction keeps regenerating defects |

Progression in practice: **steer once → write it down → review for judgment →
encode settled invariants → fix the domain model when the shape is wrong.**

Add nuance only when a coarse rule starts to overfit. Remove downstream defenses
when a better upstream owner makes them redundant.

## Encode so later agents inherit it

Code and docs are prompts for future runs. A weak pattern left in the tree
becomes precedent. A durable principle needs two paths:

1. **Forward** — put the invariant at its earliest semantic owner.
2. **Backward** — find and migrate the existing population (enable the rule,
   fix the violations, add coverage that keeps it dead).

Prefer mechanical enforcement with **descriptive** failure messages the model
can act on. A silent or cryptic gate trains workarounds.

## Where the lesson should live

| Signal | Prefer |
|---|---|
| "Always use X library / never Y" | Repo guardrail next to the decision (lint, CODEOWNERS, ARCHITECTURE note) |
| Recurring procedural how-to | Skill (approach) or runbook (versioned steps + rollback) |
| Implicit quality bar | Example of good + check that rejects the bad shape |
| Wrong abstraction regenerating bugs | Type/API redesign, not another validator on the old shape |
| Decision trapped in chat/Slack | Promote to the layer whose future work it governs; link provenance |

Leave volatile facts in their authoritative systems (DB, tracker, vault). Promote
**decisions and invariants**, not live state snapshots.

## Keep review convergent

Reviewer output is evidence, not an infinite loop. Bias toward merge for
non-material nits; require authors to fix, defer with rationale, or push back.
Severity thresholds and a stopping rule keep feedback from bullying the change
into scope creep.

## Corroborate before promoting

Agent self-reports (mistakes, learnings, desires) are telemetry for the harness
builder — not policy. Compare them to the trajectory, diff, checks, and outcome
before encoding anything. Uncorroborated complaints do not become permanent
rules.

## After you promote

- Confirm the next fresh session can retrieve or hit the new owner without you.
- If possible, show one sibling instance the new owner would have caught.
- Note carrying cost and who maintains it.
- Schedule retirement: when would this control become redundant?

## Anti-patterns

- Fixing only the named function when the principle applies repo-wide
- Stacking validators on a missing domain model
- Turning one noisy failure into a global ban
- Leaving the lesson in chat while the repo still teaches the old way
- Promoting self-report without trajectory evidence
- Infinite review cycles with no acceptance policy

## Pairs with

- [fix-root-causes](../fix-root-causes/SKILL.md) — refuse symptom band-aids on the instance
- [deslop](../deslop/SKILL.md) / [unslop](../../productivity/unslop/SKILL.md) — clean the artifact; this skill hardens the environment so slop recurs less
- [writing-great-skills](../../misc/writing-great-skills/SKILL.md) — when the right owner is a skill
- [redesign-from-first-principles](../redesign-from-first-principles/SKILL.md) — when the class exposes the wrong shape
- [improve-harness](../improve-harness/SKILL.md) — when you need a measured environment experiment

---

_Inspired by Ryan Lopopolo's harness-engineering thesis on feedback ([lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) `docs/feedback`) and the OpenAI [Harness engineering](https://openai.com/index/harness-engineering/) essay. Prose is our own._
