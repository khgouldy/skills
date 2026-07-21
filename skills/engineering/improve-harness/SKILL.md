---
name: improve-harness
description: Use when agents keep failing the same way, you keep re-explaining the same facts, or you want to improve the *environment* around a fixed model rather than retrying the task — baseline one job, find the earliest gap, make the smallest reversible change at its owner, then fresh-rerun. Triggers include "improve the harness", "agents keep getting this wrong", "why do I keep re-explaining this", "the model can do it but our setup can't", or a repeated human relay of context/tools/proof.
disable-model-invocation: true
---

# Improve harness

Hold the model and coding agent fixed. Improve what sits around them: context,
tools, authority, proof, and feedback. One bounded job, one intervention, one
fresh rerun that decides whether to keep it.

This is an environment loop, not a feature implementation. If the bug is in
product code and the environment already makes the job legible, fix the code
with ordinary engineering skills instead.

## Job contract (write this first)

```text
Target and revision:
Fixed model / agent config:
Representative job:
Accepted outcome:
Evidence that proves the outcome:
Authority envelope (what this run may change):
Budget and stop conditions:
Suspected gap (one sentence):
```

Pick a job small enough to rerun and important enough to exercise the gap.
"Make agents better" is not a job. "Create a scam check from a pasted SMS and
land a completed verdict without me pasting logs" is.

## 1. Observe the baseline

Run a fresh trajectory when safe and authorized. Otherwise inspect a recent
collaboration with known state and outcome. Record observables, not vibes:

- was the outcome accepted?
- what proof did the worker produce?
- which context was available, retrieved, and relevant?
- which tools were discovered, invoked, and interpreted correctly?
- where did a human relay facts, tool output, decomposition, or recovery?
- retries, latency, abandoned paths, avoidable review cycles
- authority friction or unintended access

Separate **missing capability** from **poor discovery**, **missing fact** from
**poor routing**, and **worker limitation** from **environment gap**. One failed
run is not enough to blame the model.

## 2. Locate the earliest failed handoff

Trace the symptom upstream to the first point the trajectory lacked what the job
required. Classify the gap:

| Class | Meaning |
|---|---|
| **Context** | Information absent, stale, overloaded, or never retrieved |
| **Capability** | Operation missing, or hard to discover / invoke / interpret / repair / verify |
| **Domain ownership** | Competing representations, or no type/API/state machine owns the invariant |
| **Authority** | Can vs may confused; missing approval, audit, or recovery boundary |
| **Proof** | Internal green while the user/ops claim stayed untested |
| **Feedback / delivery** | Lesson or artifact identity failed to survive the trajectory |
| **Worker limitation** | Still unreliable after the job is legible and operable (needs repeated evidence) |

One failed trajectory cannot establish a worker limitation. Leave it open until
comparable reruns separate variance from environment gaps.

## 3. State one intervention hypothesis

Name the smallest reversible change at the earliest owner:

```text
If <intervention> is added at <authoritative owner>, then the fixed worker will
<observable behavioral change> on <representative job>, because <mechanism>.

Evidence that would support this:
Evidence that would weaken this:
Expected carrying cost and owner:
```

Prefer interventions that remove human relay or make an invariant legible at its
source: shorter root route, canonical example, typed boundary, actionable
diagnostic, domain tool, authority gate, real-system test, or runbook with
explicit recovery. New machinery must earn its maintenance cost.

## 4. Implement and verify at the claim boundary

Confirm mutation authority. Keep the diff narrow enough that the hypothesis
stays intelligible. Verify both layers:

1. Target-native checks that protect internal contracts
2. The user or operational journey that establishes the accepted outcome

Collect the evidence the worker should produce in ordinary operation. Do not
weaken a grader to make a run pass. Do not promote uncorroborated self-report
into policy.

## 5. Fresh-rerun

Same job class, same model/agent config, same authority envelope, materially
equivalent external state. **New session.** Isolated starting state so the rerun
does not inherit help from the implementation conversation.

Confirm the intervention was available, retrieved or invoked, and relevant. A
success that never touched the change is not evidence about the change.

Compare baseline vs rerun on:

- accepted outcome and claim-matched proof
- human relay, steering, review cycles
- elapsed time and retries
- authority and recovery behavior
- new failure modes or displaced complexity
- maintenance and latency cost of the intervention

## 6. Retain, revise, or remove

| Decision | When |
|---|---|
| **Retain** | Job closes, intervention was actually used, mechanism matches evidence, gain beats carrying cost |
| **Revise** | Gap location was right but the interface is still hard to retrieve or use |
| **Remove** | Adds noise, duplicates a better owner, or repeatedly fails to help |

When target-local evidence may already supply the behavior, temporarily withhold
the intervention and rerun before keeping it.

Record the decision where the target keeps architecture or operational history:
owner, evidence, follow-up, and the condition under which to retire it.

## Compact result record

```text
Job and accepted outcome:
Baseline evidence:
Earliest failed handoff + owner:
Intervention + expected mechanism:
Verification performed:
Fresh-rerun evidence:
Decision: retain | revise | remove
Durable owner and lesson:
Known limits:
```

One before/after is a bounded operational claim, not a general treatment effect.

## Anti-patterns

- Fixing product code when the environment is what failed (or vice versa)
- Changing model/provider mid-loop and calling it a harness result
- Widening permissions so the job "works"
- Adding a long instruction manual instead of a route to the owner
- Declaring the model incapable after one noisy run
- Shipping the intervention without a fresh session that actually used it

## Pairs with

- [prove-the-outcome](../prove-the-outcome/SKILL.md) — claim-matched evidence on baseline and rerun
- [feedback-to-infrastructure](../feedback-to-infrastructure/SKILL.md) — when the gap is a recurring correction to promote
- [authority-boundary](../authority-boundary/SKILL.md) — when the failed handoff is can vs may
- [whole-job](../../productivity/whole-job/SKILL.md) — when the gap is stopping before delivery/proof
- [why](../why/SKILL.md) — when recovering intent before intervening

---

_Inspired by Ryan Lopopolo's harness-engineering corpus ([lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering), esp. the improve-harness playbook) and the OpenAI [Harness engineering](https://openai.com/index/harness-engineering/) essay. Prose is our own._
