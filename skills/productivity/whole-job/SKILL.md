---
name: whole-job
description: Use when the trajectory stops short of closing the outcome — implementation done but no PR, CI/review abandoned, or merge/deploy treated as someone else's job when you can drive the protected path. Triggers include "I fixed it locally", "someone else can merge", skipping CI, or handoff before post-verify. Not for claim-matched evidence alone (prove-the-outcome), permanent-fix vs workaround (boil-the-ocean), or just opening a PR (create-pr).
---

# Whole job

One primary trajectory owns the outcome end to end: recover intent, investigate,
implement, prove, handle review and CI, deliver through the protected path, and
verify the result where it will be experienced.

Humans still provide direction, judgment, and consequential authority. You own
everything inside that envelope until the accepted outcome is evidenced — not
until the patch merely exists.

This is *lifecycle ownership*:

| Neighbor | Use instead when |
|---|---|
| [boil-the-ocean](../boil-the-ocean/SKILL.md) | Partial *solution* (workaround, missing tests/docs) while the permanent fix is in reach |
| [prove-the-outcome](../../engineering/prove-the-outcome/SKILL.md) | Internal green is faking the user/ops claim |
| [create-pr](../../engineering/create-pr/SKILL.md) | Need a reviewable PR artifact, not full delivery ownership |
| [authority-boundary](../../engineering/authority-boundary/SKILL.md) | Can vs may at merge/deploy/secrets |

## Sparse prompt, high bar

Recover the outcome behind a sparse request. The prompt may name little; the
repository, product behavior, history, and acceptance norms still define "good."
Inspect discoverable facts before asking a person to repeat them. Ask when the
missing answer changes product intent, accepts consequential risk, or requires
authority you do not have.

Keep durable intent focused on **outcome, acceptance bar, and authority
boundary**. Phase-specific rules belong in repo routes, tools, and checks so
they surface when relevant — not as a forever checklist stuffed into the user
message.

## Prefer one owner trajectory

You are the integration point. Subagents and parallel helpers earn their cost
for independent evidence (parallel discovery, adversarial review). Integrate
their results; do not fragment responsibility for closure.

Decompose into dependency-aware, independently provable pieces when the work is
large — still keep one owner for the complete result. Plans are executable
context; they are not the shipped artifact.

## Lifecycle checklist

**Software delivery** (when the outcome is a merged/shipped change and authority
allows):

1. Retrieve relevant context and name the accepted outcome
2. Reproduce or inspect current behavior
3. Implement the root correction (not a symptom patch)
4. Update generated artifacts and public contracts
5. Run focused and system-level proof at the claim boundary
6. Self-review; fix material issues before asking a human
7. Open or update the PR; respond to material review and CI failures
8. Obtain required approval
9. Merge, release, or deploy via the **normal protected path**
10. Verify the user-visible or operational result after delivery

**Non-shipping jobs** (analysis, experiment, decision): close with the
evidence and recommendation the ask required — do not invent a PR or deploy
theater. Still name what was not done and who owns any follow-up.

Stop early only when blocked on judgment or authority you do not have — and say
exactly what is blocked.

## Let the outcome choose the artifact

The job might finish as analysis, an instrumented experiment, a procedure
change, a decision *not* to build, or working software. Give yourself the
evidence and the desired outcome; do not invent a backend, dashboard, or
framework the claim never required.

## Delivery is part of the job

"Merge" means complete the repository's protected workflow — wait for required
checks, address material failures and conflicts, enter the real merge path. It
does not mean admin bypass to satisfy the verb.

If the outcome includes release or deploy: follow the **same validated
artifact**, observe the running system, and stay with failures until the
promised boundary is verified or clearly handed off with evidence.

## Spend human attention where it belongs

Use autonomy to clear known work. Escalate for zero-to-one definition, hard
interface taste, and consequential tradeoffs. Do not smuggle unresolved product
judgment into a routine queue by pretending it was mechanical.

## Anti-patterns

- Stopping at a local green test with no PR, proof packet, or delivery path
- Treating review/CI as optional theater
- Admin-merge or force paths when the protected path is the real job
- Over-constraining method in the prompt while under-specifying the outcome bar
- Spawning many agents with no single owner for integration and closure
- Building intermediate tools when direct analysis already answers the question

## Before you hand back

- Is the accepted outcome evidenced, or only the intermediate patch?
- What is still unproved (name it)?
- What requires human authority next (name the exact decision)?
- Would a fresh session need you to re-explain anything that should live in the repo?

---

_Inspired by Ryan Lopopolo's harness-engineering thesis on whole-job ownership ([lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) `docs/whole-job`) and the OpenAI [Harness engineering](https://openai.com/index/harness-engineering/) essay. Prose is our own._
