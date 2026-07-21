---
name: create-pr
description: Use when opening a pull request for completed work — clean branch, focused diff, description a reviewer can act on. Triggers include "open a PR", "raise a pull request", "submit this for review". Not for owning merge/CI/post-verify (whole-job), claim-matched product proof (prove-the-outcome), force/admin merge (authority-boundary), or sweeping many open PRs (fixing-and-merging-prs).
---

# Create PR

A pull request is a request for someone's time. Make the diff easy to review and
the description answer the reviewer's questions before they ask. The goal is a PR
that gets approved fast because it's *clear*, not because the reviewer gave up.

## Before opening

1. **Branch off the right base.** Never open a PR from your default branch; cut a
   focused branch if you aren't on one. Rebase onto the latest base so the diff
   shows only your change, not unrelated drift.

2. **Make the diff tell one story.** A PR should do one thing. If it's carrying
   an unrelated refactor or a drive-by fix, split it — reviewers approve small
   focused PRs and stall on sprawling ones.

3. **Self-review the diff first.** Read your own `git diff` end to end before
   anyone else does. Strip debug prints, stray TODOs, commented-out code, and
   accidental file changes. Most review round-trips are things you'd have caught
   yourself.

4. **Verify it actually works.** Run the build and the tests. Don't outsource
   "does this even run" to your reviewer — evidence before assertions.

## The description

Write it so a reviewer with zero context can review confidently:

- **What & why** — the change in a sentence, and the problem it solves. Link the
  issue/ticket.
- **How** — the approach and any non-obvious decisions or trade-offs (the things
  a reviewer would otherwise flag).
- **Testing** — what you did to verify it: tests added, commands run, manual
  checks. Be honest about what's *not* covered.
- **Risk / rollout** — anything that needs care to deploy, migrate, or revert.

Keep it tight. A reviewer reads the description to know *where to look hardest*,
not to read an essay.

## Opening it

- Use the repo's PR template if one exists.
- Mark it **draft** if it isn't ready for real review yet — don't make people
  review a moving target.
- Title: imperative and specific (`Fix token drop on cross-host redirect`), not
  `updates` or `wip`.

## Pairs with

- [fixing-and-merging-prs](../fixing-and-merging-prs/SKILL.md) — take open PRs
  from red CI to merged (fleet-safe).
- [whole-job](../../productivity/whole-job/SKILL.md) — when the outcome includes
  owning through merge and post-verify, not only opening the PR.
- [prove-the-outcome](../prove-the-outcome/SKILL.md) — attach claim-matched
  evidence in the PR before calling the product claim done.
- [authority-boundary](../authority-boundary/SKILL.md) — protected path, not
  force/admin bypass.
- [resolve-merge-conflicts](../resolve-merge-conflicts/SKILL.md) — when the PR
  falls behind its base.
- [unslop](../../productivity/unslop/SKILL.md) — if the description reads as
  machine-generated.

---

_Inspired by Warp's create-pr skill (https://github.com/warpdotdev/common-skills). Prose is our own._
