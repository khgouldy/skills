# Eval: improve-harness

User-invoked playbook for *environment* improvement under a fixed worker.
Fires when the failure is the harness (context, tools, authority, proof routes),
not a one-off product bug. Promoting a recurring lesson without a full
baseline→rerun experiment is `feedback-to-infrastructure`. Single-bug root cause
is `diagnosing-bugs` / `fix-root-causes`. Completing delivery is `whole-job`.

## Should fire
- "improve the harness — agents keep failing checkout the same way"
- "why do I keep re-explaining our revenue definition to every session?"
- "the model can do it but our setup can't; baseline and intervene"
- "run a harness experiment: smallest change, then fresh rerun"
- "humans keep pasting logs the agent should be able to read itself"

## Should NOT fire
- "same review comment third PR this week — make it permanent" — _expected: feedback-to-infrastructure_
- "login NPE, find and fix the root cause" — _expected: diagnosing-bugs_ / fix-root-causes
- "I fixed it locally; own merge and verify" — _expected: whole-job_
- "tests green so the claim is proven" — _expected: prove-the-outcome_
- "force merge past flaky checks" — _expected: authority-boundary_
