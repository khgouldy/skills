# Eval: prototype

Guards *a throwaway runnable artifact for one design question*, including the
case where two or three competing sketches should be compared. Parallel agents
with a graft step is `arena`. Independent critiques of a decision is
`cross-critique`. Interrogating a plan in words is `grilling`.

## Should fire
- "does this state model feel right? mock it up"
- "what should this screen look like — show me a few options"
- "I'm not sure how this interaction should work — sketch a few options"
- "no precedent for this architecture choice; try two approaches before we commit"
- "sanity-check the flow before we build it"

## Should NOT fire
- "arena this — spin up several agents and graft the best" — _expected: arena_
- "pressure-test this irreversible decision with independent critiques" — _expected: cross-critique_
- "grill me on this plan before we build" — _expected: grilling_
- "just implement the pattern we already use elsewhere" — _expected: none_
- "build the settings page for production" — _expected: none_
