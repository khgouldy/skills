# Eval: whole-job

Guards lifecycle ownership vs completeness-of-solution and vs claim evidence.
`whole-job` fires when the trajectory stops short of delivery/proof/closure.
Permanent fix vs workaround is `boil-the-ocean`. Claim-matched evidence alone is
`prove-the-outcome`. PR formatting is `create-pr`. Consequential permission is
`authority-boundary`.

## Should fire
- "I fixed it locally, you're done"
- "implementation is finished" (with no PR / no post-verify when shipping was the ask)
- "tests pass on my machine, someone else can merge"
- "skip waiting for CI, just land it"
- "the code change is in; deploy is out of scope" (when deploy was part of the outcome)

## Should NOT fire
- "don't ship a workaround when the real fix is right here" — _expected: boil-the-ocean_
- "tests are green so the user journey is fine" — _expected: prove-the-outcome_
- "open a PR with a good description" — _expected: create-pr_
- "force push to main to finish" — _expected: authority-boundary_
- "agents keep failing the same setup step" — _expected: improve-harness_
- "agents always stop before opening the PR — promote a guardrail" — _expected: feedback-to-infrastructure_
