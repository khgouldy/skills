# Eval: exhaust-the-design-space

Guards the *principle* of comparing 2–3 alternatives before committing vs the
mechanized multi-agent `arena`, decision red-teaming (`cross-critique`), and
throwaway single-question `prototype`. Fires when the shape is novel and the
first draft would lock in the wrong answer — without requiring parallel-agent
machinery.

## Should fire
- "I'm not sure how this interaction should work — sketch a few options"
- "build 2–3 competing approaches and compare before we commit"
- "no precedent for this architecture choice; explore the design space"
- "the feel matters more than the logic — try a few variants side by side"

## Should NOT fire
- "arena this — spin up several agents and graft the best" — _expected: arena_
- "pressure-test this irreversible decision with independent critiques" — _expected: cross-critique_
- "throwaway runnable mock to answer one design question" — _expected: prototype_
- "grill me on this plan before we build" — _expected: grilling_
- "just implement the pattern we already use elsewhere" — _expected: none_
