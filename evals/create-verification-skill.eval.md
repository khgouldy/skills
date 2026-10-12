# Eval: create-verification-skill

Guards *building a project's reusable verification skill* vs a one-off check.
Both verification skills are user-invoked; this sheet records the boundary for
humans and routing docs. `create-verification-skill` is for a repo with no
scripted way to launch and drive the app. Upkeep of an existing one is
`maintain-verification-skill`. One UI check is `control-ui`. Deciding whether
evidence matches the claim is `prove-the-outcome`.

## Should fire
- "make a verification skill for this repo"
- "teach agents how to run, drive, and debug this app"
- "there's no scripted way to prove the mobile flow works — build one"
- "create a feature map so agents can navigate the app like a user"

## Should NOT fire
- "the feature map is out of date, audit it" — _expected: maintain-verification-skill_
- "run the daily verification upkeep" — _expected: maintain-verification-skill_
- "screenshot the login page before and after" — _expected: control-ui_
- "tests are green so we're done, right?" — _expected: prove-the-outcome_
- "write a failing test first" — _expected: tdd_
