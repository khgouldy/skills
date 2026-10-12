---
name: definition-of-done
description: Use before calling work done, and whenever you are about to stop short — a workaround or partial fix while the real one is in reach, "tests are green so we're good", "build passed" or "upload finished" standing in for the user-facing result, implementation finished but no PR, CI or review left hanging, or "someone else can merge". Three gates: finished, proven, delivered. Not for writing the PR itself (create-pr) or deciding whether you may cross a boundary (authority-boundary).
---

# Definition of done

Work is done when it passes three gates, in order. Most false "done" reports
pass the first and skip the other two.

## 1. Finished: the whole solution

- **The finished thing, not a plan for it.** Search, build, test, then hand
  over the result.
- **The permanent fix over the workaround** when the real fix is known and
  reachable.
- **No dangling threads.** If tying it off takes five more minutes, take them.
  Fix what you find along the way instead of filing it for later.
- **Tests and docs are part of the change**, not follow-ups.

Completeness means solving the actual problem fully. It does not mean inventing
requirements, building speculative features, or refactoring code nobody asked
about.

## 2. Proven: evidence at the claim's boundary

Say the claim in one sentence: who experiences what, from which starting state.
Then get evidence where that person or system will rely on it.

| Claim | Evidence that counts |
|---|---|
| UI behavior | The real journey, driven in the running app, with the resulting state |
| API contract | Request and response against the surface the client actually calls |
| Data transform | Schema, provenance, and reconciled counts or keys |
| Deploy or release | The validated artifact running, plus a post-deploy health check |
| Security finding | A reproducer, the conditions it needs, and what it does not show |
| Business-state change | The approval, the receipt, and the observed postcondition |

Internal green still matters. It does not stand in for the row above.

| Proxy | What it proved |
|---|---|
| Unit tests pass | The units, not the journey |
| Build passed | It compiles, not that it runs correctly |
| Upload finished | The upload, not a healthy deployment |
| All tasks closed | Each passed alone, not the merged result |
| A worker says it succeeded | That it said so |

Check that the suite ran at all. A filter, a skipped job, or a duplicate test
name can make "0 failures" mean "0 tests".

Collect the evidence yourself: launch the app, drive it, read the logs. Do not
ask a person to click through something you can observe. Attach the minimum
packet to whatever you hand back:

1. The claim, in one sentence.
2. One artifact that matches it: command output, screenshot, log, health check.
3. What is still unproved. If that part is load-bearing, get it or narrow the
   claim.

## 3. Delivered: through the normal path, then checked

One owner carries the work to the point where the outcome is real.

1. Self-review the diff and fix what you find before anyone else reads it.
2. Open or update the PR. Respond to CI failures and review findings; neither
   is optional.
3. Merge, release, or deploy through the repo's protected path when you have
   been granted that step. "Merge" never means an admin bypass or skipped
   checks. If the step is not granted, say exactly which decision you need.
4. After delivery, verify the result where it will be experienced: the deployed
   page, the live endpoint, the installed build.

Analysis, an experiment, or a decision not to build can also be the finished
job. Close those with the evidence and recommendation that were asked for. Do
not invent a PR for them.

## Red flags

- "Tests pass" as the only sentence under a user-facing claim
- "Fixed locally" with no PR
- A workaround shipped while the real fix sat in view
- "Let's table this for later" about something five minutes away
- Options presented where you had enough to decide
- Weakening a check or skipping a flaky test to reach green
- Rounding "unproven" up to "fine"

## Before you hand back

- Is the accepted outcome evidenced, or only the patch?
- What is still unproved? Name it.
- What needs a human decision next? Name the exact decision.

## Pairs with

- [create-pr](../../engineering/create-pr/SKILL.md) for the PR itself
- [authority-boundary](../../engineering/authority-boundary/SKILL.md) for can versus may at merge, deploy, and secrets
- [never-block-on-the-human](../never-block-on-the-human/SKILL.md) for proceeding inside what is already granted
- [control-ui](../../engineering/control-ui/SKILL.md) for driving a real UI to collect the evidence
- [diagnosing-bugs](../../engineering/diagnosing-bugs/SKILL.md) for finding the root cause the permanent fix needs

---

_Merges three earlier skills: boil-the-ocean (original, from Kevin's working standard) and whole-job and prove-the-outcome (inspired by Ryan Lopopolo's [harness-engineering](https://github.com/lopopolo/harness-engineering) writing and the OpenAI [Harness engineering](https://openai.com/index/harness-engineering/) essay). Prose is our own._
