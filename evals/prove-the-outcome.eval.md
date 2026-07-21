# Eval: prove-the-outcome

Guards the boundary between *claim-matched evidence* and neighboring skills.
`prove-the-outcome` fires when internal green is about to be treated as done.
Driving a browser is `control-ui`; forward break analysis is `blast-radius`;
test-first implementation is `tdd`; complete solution vs workaround is
`boil-the-ocean`; full lifecycle ownership is `whole-job`.

## Should fire
- "tests are green so we're good — ship it"
- "I think we're done — unit tests pass, no need for a browser check"
- "should be fine to ship, build succeeded"
- "the upload finished, call it deployed"
- "looks secure enough from the pattern match"

## Should NOT fire
- "drive the browser and screenshot the checkout flow" — _expected: control-ui_
- "what else could this small shared-helper change break?" — _expected: blast-radius_
- "write a failing test before the fix" — _expected: tdd_
- "don't stop at a workaround, finish the permanent fix" — _expected: boil-the-ocean_
- "I fixed it locally, open the PR and get it merged" — _expected: whole-job_
- "open a PR with a good description" — _expected: create-pr_
- "just force merge, checks are flaky" — _expected: authority-boundary_
- "same missing proof gap every session — make it permanent" — _expected: feedback-to-infrastructure_
