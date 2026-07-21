# Eval: create-pr

Guards *opening a reviewable PR* vs owning the full delivery lifecycle or
authority gates. `create-pr` fires when the work is ready to submit for review:
branch hygiene, focused diff, description a reviewer can act on. Driving through
CI/merge/post-verify is `whole-job`. Sweeping many open PRs is
`fixing-and-merging-prs`. Force/admin merge is `authority-boundary`.

## Should fire
- "open a PR for this branch"
- "raise a pull request with a description a reviewer can use"
- "submit this for review — focused diff and clear summary"
- "I've finished the feature; open the PR"
- "draft the PR description from this diff"

## Should NOT fire
- "own it through merge and post-deploy verify" — _expected: whole-job_
- "finalize all the open PRs and get CI green" — _expected: fixing-and-merging-prs_
- "just force merge, checks are flaky" — _expected: authority-boundary_
- "tests are green so the product claim is proven" — _expected: prove-the-outcome_
- "fix the merge conflicts on this branch first" — _expected: resolve-merge-conflicts_
