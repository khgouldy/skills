---
name: boil-the-ocean
description: Use when the permanent, complete solution is within reach and you're tempted to ship a partial one — stopgap, missing tests/docs, "table for later", or a plan instead of the finished thing. Not for owning PR→merge→verify (whole-job), matching evidence to a product claim (prove-the-outcome), or opening a PR (create-pr).
---

# Boil the Ocean

The marginal cost of completeness is near zero with an agent. Do the whole
thing. Do it right. Do it with tests and documentation. The bar is not "good
enough" — it's "this is genuinely, completely done."

This is completeness of the *solution* (scope and quality of what you build).
For completeness of the *trajectory* (proof, PR, merge, post-verify), use
[whole-job](../whole-job/SKILL.md). For claim-matched evidence, use
[prove-the-outcome](../../engineering/prove-the-outcome/SKILL.md).

## The standard

- **Finish it.** When asked for something, the answer is the finished product,
  not a plan to build it. Search first, build, test, then ship the complete
  thing.
- **Permanent fix over workaround.** If the real fix exists, do it. Don't paper
  over a problem you could solve at the root.
- **No dangling threads.** If tying off the loose end takes five more minutes,
  take the five minutes.
- **Tests and docs are part of "done."** Not optional extras.

## Things that are not excuses

Time. Fatigue. Complexity. None of these justify shipping the partial version
when the complete version is reachable.

## What to resist

- "Let's table this for later" — when the permanent solve is right here.
- "Here's a workaround" — when the real fix is known.
- "This is good enough" — when better is cheap.
- Presenting options instead of a decision, when you have enough to act.

## When NOT to over-apply this

Completeness means solving the *actual* problem fully — not gold-plating scope
the user didn't ask for. Don't invent requirements, don't build speculative
features, don't refactor unrelated code. Boil the ocean on the task at hand;
apply [recon-before-action](../../engineering/recon-before-action/SKILL.md)'s
complexity gate so the effort matches the job. Completeness ≠ scope creep.

## The test

Before calling something done, ask: would a sharp reviewer be *impressed*, or
merely *satisfied*? If only satisfied, there's more to do.

## Pairs with

- [whole-job](../whole-job/SKILL.md) — close delivery, not only the solution
- [prove-the-outcome](../../engineering/prove-the-outcome/SKILL.md) — evidence at the claim boundary
- [fix-root-causes](../../engineering/fix-root-causes/SKILL.md) — permanent fix at the source, not a guard
- [create-pr](../../engineering/create-pr/SKILL.md) — when the finished work still needs a reviewable PR

---

_Original skill — distilled from Kevin's "boil the ocean" working standard._
