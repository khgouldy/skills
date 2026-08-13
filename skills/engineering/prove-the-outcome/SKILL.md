---
name: prove-the-outcome
description: Use when internal green (unit tests, build, upload) is about to stand in for the user or operational claim — match evidence to that claim. Triggers include "tests are green so we're good", "build passed, ship it", "upload finished, call it deployed", or equating coverage/CI with the real outcome. Not for opening a PR (create-pr), owning merge/delivery (whole-job), or finishing a partial solution (boil-the-ocean).
---

# Prove the outcome

A change is complete when evidence shows the promised result where a user,
operator, or dependent system will rely on it. Green unit tests prove unit
tests. Map each claim to evidence at that claim's boundary.

This is the *claim → evidence* discipline — not PR hygiene, not lifecycle
ownership, not "finish the permanent fix."

| Neighbor | Use instead when |
|---|---|
| [control-ui](../control-ui/SKILL.md) | You need to *drive* a real UI to collect evidence |
| [blast-radius](../blast-radius/SKILL.md) | "What else could this break?" |
| [tdd](../tdd/SKILL.md) | Implementing test-first |
| [create-pr](../create-pr/SKILL.md) | Opening the PR artifact |
| [whole-job](../../productivity/whole-job/SKILL.md) | Trajectory stopped before delivery/closure |
| [boil-the-ocean](../../productivity/boil-the-ocean/SKILL.md) | Workaround / partial ship when the real fix is in reach |

## Name the claim before you collect evidence

Write, briefly:

- who or what experiences the outcome
- starting state and inputs that matter
- visible behavior and side effects that must occur
- invariants that must remain true
- how success differs from a plausible imitation
- what remains outside this claim

Small is fine. Vague is not.

## Match evidence to the claim

| Claim | Evidence at the claim boundary |
|---|---|
| Browser / UI behavior | Real journey with semantic and rendered state |
| API contract | Request/response against the live or staged surface the client uses |
| Generated content | Source-to-output comparison and freshness |
| Data transform | Schema, provenance, reconciliation of counts/keys |
| Security impact | Reproducer, bounded exploitability, regression coverage |
| Deploy / release | Validated artifact running + post-deploy health |
| Consequential remote change | Staged canary, cutover, recovery, post-check |
| Business-state mutation | Required approval, receipt, observed postcondition |
| Analytical conclusion | Reproducible transform; conclusions supported by the data |

Internal properties (types, unit tests, lints, builds) still matter. They do not
substitute for the row above when that is the job being claimed.

## Do not let proxies steal the claim

| Proxy | What it actually proved |
|---|---|
| Coverage % | Lines executed, not the journey |
| "Build passed" | Compile/link, not runtime behavior |
| "Uploaded artifact" | Upload succeeded, not healthy deployment |
| Vulnerability-shaped pattern | Suspicion, not impact |
| Policy self-consistency | Doc agrees with itself, not with the live source |
| Agent self-report | Telemetry, not acceptance |

If you only have a proxy, say so. Narrow the claim or get the missing evidence.

## Attach a proof packet

**Minimum packet** (always):

1. Claim in one sentence
2. One claim-matched artifact (command output, screenshot, log, recon, health check)
3. What remains unproved

**Full packet** when asking for review or shipping something consequential:

1. Intended outcome and affected boundary
2. Material design and risk decisions
3. Exact tests and journeys that ran (commands, not vibes)
4. Screenshots, logs, traces, diffs, or reproducers that carry the claim
5. Known limits and unproved behavior
6. Identity of the artifact proposed for delivery (when shipping)

More evidence helps only when it changes confidence. Compress the trajectory;
don't dump the session.

## Agent access beats human relay

Prefer launching the app, driving the UI, reading logs/metrics/traces, and
inspecting side effects yourself. A person should not paste proof the agent can
observe directly. If the harness lacks that access, name it as a harness gap
(see [improve-harness](../improve-harness/SKILL.md)) rather than silently
shrinking the claim.

## Security and high-consequence claims

Prove impact or exploitability for every security finding you report. State the
conditions under which a reproducer works and what it does **not** establish.
Speculative "looks unsafe" output is not a completed security job.

Scale proof burden with consequence: typo < parser migration < remote upgrade <
production cutover.

## Anti-patterns

- "Tests pass" as the only sentence under a user-facing claim
- Rebuilding in a privileged job so the deployed bytes aren't the validated ones
- Asking a human to click through what you could automate
- Rounding "unproven" up to "fine"
- Weakening a grader or skipping a flaky check to declare victory

## Before you say done

1. Restate the claim in one sentence.
2. List the evidence that matches *that* claim.
3. List what remains unproved.
4. If the unproved part is load-bearing, get it or narrow the claim.

---

_Inspired by Ryan Lopopolo's harness-engineering thesis on proof ([lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) `docs/proof`) and the OpenAI [Harness engineering](https://openai.com/index/harness-engineering/) essay. Prose is our own._
