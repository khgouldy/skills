# Eval: boil-the-ocean

Guards completeness-of-*solution* vs lifecycle ownership and claim evidence.
`boil-the-ocean` fires when a permanent fix is within reach and a workaround /
partial ship / "table for later" is tempting. Owning PR→merge→verify is
`whole-job`. Matching evidence to the user claim is `prove-the-outcome`. Fixing
at the source of a bug (not a guard) is `fix-root-causes`.

## Should fire
- "don't ship a workaround when the real fix is right here"
- "let's table the tests and docs for later"
- "this is good enough — hand back the plan instead of finishing"
- "leave the dangling edge case; we can clean it up next sprint"
- "here's a stopgap that unblocks us" (when the permanent solve is cheap and known)

## Should NOT fire
- "I fixed it locally, open the PR and get it merged" — _expected: whole-job_
- "tests are green so the user journey is fine" — _expected: prove-the-outcome_
- "just add a null check so it stops throwing" — _expected: fix-root-causes_
- "agents keep failing the same setup step" — _expected: improve-harness_
- "open a PR with a focused description" — _expected: create-pr_
- "just force merge, checks are flaky" — _expected: authority-boundary_
- "every agent leaves tests for later — make that impossible" — _expected: feedback-to-infrastructure_
