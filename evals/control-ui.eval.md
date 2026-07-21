# Eval: control-ui

Guards *driving a real UI for evidence* vs *claim-matched proof discipline* and
generic debugging. `control-ui` fires when you need to operate a local web/IDE/
Electron surface — screenshots, a11y snapshots, repros, profiles. Knowing that
green unit tests aren't enough is `prove-the-outcome`. Finding a non-UI root
cause is `diagnosing-bugs`.

## Should fire
- "drive the browser and screenshot the checkout flow"
- "verify this in the real UI, not just unit tests"
- "repro this focus/keyboard bug with accessibility snapshots"
- "take before/after screenshots of the settings page"
- "profile the page — grab console and network while I click through"

## Should NOT fire
- "tests are green, ready to merge" — _expected: prove-the-outcome_
- "the API returns 500 intermittently, find the cause" — _expected: diagnosing-bugs_
- "what could this shared helper change break elsewhere?" — _expected: blast-radius_
- "write a failing test before implementing the fix" — _expected: tdd_
- "clean the AI comments out of this component" — _expected: deslop_
