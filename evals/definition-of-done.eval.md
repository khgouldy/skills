# Eval: definition-of-done

Guards the three ways work gets called done too early: a partial solution, a
proxy standing in for the claim, and a trajectory that stops before delivery.
`definition-of-done` fires on all three. Writing the PR is `create-pr`. Whether
you may cross a boundary is `authority-boundary`. Driving a UI to collect the
evidence is `control-ui`. Finding the cause a real fix needs is
`diagnosing-bugs`.

## Should fire
- "don't ship a workaround when the real fix is right here"
- "let's table the tests and docs for later"
- "tests are green so we're good — ship it"
- "the upload finished, call it deployed"
- "should be fine to ship, build succeeded"
- "I fixed it locally, you're done"
- "tests pass on my machine, someone else can merge"
- "all the beads are closed, so the epic is done"

## Should NOT fire
- "open a PR with a good description" — _expected: create-pr_
- "just force merge, checks are flaky" — _expected: authority-boundary_
- "drive the browser and screenshot the checkout flow" — _expected: control-ui_
- "just add a null check so it stops throwing" — _expected: diagnosing-bugs_
- "write a failing test before the fix" — _expected: tdd_
- "what else could this shared-helper change break?" — _expected: blast-radius_
- "agents keep stopping before the PR — make that impossible" — _expected: feedback-to-infrastructure_
- "should I ask before fixing my own review findings?" — _expected: never-block-on-the-human_
