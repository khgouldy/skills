# Eval: blast-radius

Guards the "impact of a change" cluster. `blast-radius` reasons *forward* from a
change to what it could break elsewhere, and proves the one safety-critical fact
by running code. `diagnosing-bugs` reasons *backward* from an existing failure to
its cause; `why` recovers rationale.

## Should fire
- "what could this change break elsewhere before I merge it?"
- "blast radius of removing this field from the response payload?"
- "this diff looks small but I don't trust it — what depends on this behavior?"
- "I changed the cache eviction logic; what downstream could this affect?"
- "is it safe to delete this method? who really depends on it?"

## Should NOT fire
- "the endpoint already returns 500 intermittently, find the cause" — _expected: diagnosing-bugs_
- "why was this eviction logic written this way?" — _expected: why_
- "just add a guard so it stops crashing" — _expected: fix-root-causes_
- "generate a few implementations and merge the best" — _expected: arena_
- "review this PR for code quality" — _expected: none / create-pr_
