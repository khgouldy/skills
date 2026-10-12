# Eval: preflight

Guards *checking the environment before a long run* vs debugging after a
failure. `preflight` fires at the start of unattended or multi-worker work. A
failure that already happened is `diagnosing-bugs`. Choosing how to extract data
is `recon-before-action`. Launching and driving the app to prove a feature is a
project verification skill or `control-ui`.

## Should fire
- "orchestrate these twelve beads overnight"
- "before you dispatch the wave, make sure the machine can take it"
- "run the migration end to end while I'm away"
- "cut the release and deploy — I'll be offline for two hours"
- "is everything logged in and healthy before we start?"

## Should NOT fire
- "docker ps hangs — why?" — _expected: diagnosing-bugs_
- "the deploy failed with Unauthorized, fix it" — _expected: diagnosing-bugs_
- "pull the data from this vendor API" — _expected: recon-before-action_
- "screenshot the settings page to prove the fix" — _expected: control-ui_
- "rename this variable" — _expected: none_
