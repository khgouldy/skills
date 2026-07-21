# Eval: tdd

Guards *test-first implementation* (red → green → refactor) vs debugging,
proving a product claim, or completeness theater. Fires when implementing a
feature/fix and tests should lead. Finding an unknown cause first is
`diagnosing-bugs`. "Tests are green so the user journey works" is
`prove-the-outcome`. Metamorphic relations when no oracle exists is
`metamorphic-testing`.

## Should fire
- "write a failing test before you implement the fix"
- "drive this feature test-first — red, green, refactor"
- "add the regression test first, then make it pass"
- "TDD this: start from the contract, not the code"
- "I'm implementing the parser — tests first"

## Should NOT fire
- "this endpoint returns 500, help me find the cause" — _expected: diagnosing-bugs_
- "tests are green, ready to merge / user journey is fine" — _expected: prove-the-outcome_
- "just add a retry so the flaky test passes" — _expected: fix-root-causes_
- "no correct output to assert — use input/output relationships" — _expected: metamorphic-testing_
- "don't ship a workaround; finish the permanent fix" — _expected: boil-the-ocean_
