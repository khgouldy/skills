# Eval: cross-critique

User-invoked. Guards *stress-testing a high-stakes decision* with independent
critiques vs plan grilling, design-space exploration, or multi-candidate
implementation (`arena`). Fires on irreversible/uncertain *choices*; not on
"build me options" or "interrogate my plan one question at a time."

## Should fire
- "pressure-test this architecture decision — what am I missing?"
- "red-team this irreversible call before I commit"
- "dispatch independent critiques of this choice and synthesize"
- "high-stakes: should we migrate now or not? stress-test both sides"

## Should NOT fire
- "grill me on this plan one question at a time" — _expected: grilling_
- "build 2–3 prototypes and compare" — _expected: exhaust-the-design-space_
- "arena this API design across several agents" — _expected: arena_
- "write ADRs while we grill the plan" — _expected: grill-with-docs_
- "what could this change break elsewhere?" — _expected: blast-radius_
