# Eval: grilling

Now model-invoked, so triggering accuracy matters. Fires when the user wants a
plan/design stress-tested *before* building — or uses a "grill" phrase. Should
stay quiet on requests to actually *build*, *debug*, or *document*.

## Should fire
- "grill me on this plan before I start"
- "poke holes in this design"
- "I want to stress-test this approach before we commit"
- "interrogate this — what am I not thinking about?"
- "before we build, push back on my assumptions here"

## Should NOT fire
- "go ahead and implement the plan we discussed" — _expected: none (just build)_
- "pressure-test this architecture decision with independent critiques" — _expected: cross-critique_
- "write up the decisions we made as ADRs while you grill me" — _expected: grill-with-docs_
- "why is this failing?" — _expected: diagnosing-bugs_
- "write a handoff so the next session can continue" — _expected: handoff_
