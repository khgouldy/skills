# Eval: arena

Guards the "explore multiple options" cluster. `arena` is the *mechanized
technique* — generate several full candidates in parallel, pick a base, graft the
rest. It's user-invoked, so this eval is mostly about distinguishing it from its
neighbors when a human reaches for it. `exhaust-the-design-space` is the
*principle* (build 2-3 sketches, no parallel-agent machinery); `cross-critique`
stress-tests a single *decision* rather than producing competing *artifacts*.

## Should fire
- "arena this — spin up a few versions and merge the best parts"
- "try three independent implementations of this parser and pick the strongest"
- "throw this design at several agents and synthesize the result"
- "I don't trust one draft of this API; generate a few and combine them"

## Should NOT fire
- "should I build 2-3 prototypes before committing to this interaction?" — _expected: exhaust-the-design-space_
- "pressure-test this architecture decision, what am I missing?" — _expected: cross-critique_
- "red-team this irreversible call before I commit" — _expected: cross-critique_
- "what could this change break elsewhere?" — _expected: blast-radius_
- "these two tasks are independent, run them in parallel" — _expected: none / dispatching parallel agents_
