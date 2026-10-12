# Eval: feedback-to-infrastructure

Guards the promote-the-lesson skill against single-bug debugging and one-off
harness experiments. Fires when a correction is *recurring* and should become
durable environment. One bug's root cause is `diagnosing-bugs` /
`diagnosing-bugs`. A full baseline→rerun environment loop is `improve-harness`.

## Should fire
- "we keep telling agents never to use library Y"
- "same review comment on the third PR this week"
- "document this so the next agent doesn't re-learn it"
- "every run I have to re-explain our revenue definition"
- "turn this one-off lint lesson into something permanent"

## Should NOT fire
- "the login handler NPE — find the root cause" — _expected: diagnosing-bugs_
- "don't just null-check it, fix why it's null" — _expected: diagnosing-bugs_
- "run a harness experiment on why agents can't complete checkout" — _expected: improve-harness_
- "write a new skill from scratch for authoring quality" — _expected: writing-great-skills_
- "clean the AI comments out of this diff" — _expected: deslop_
- "tests are green so the user journey is fine" — _expected: definition-of-done_
- "I fixed it locally, someone else can merge" — _expected: definition-of-done_
- "just force merge past the checks" — _expected: authority-boundary_
- "don't ship a workaround when the real fix is right here" — _expected: definition-of-done_
