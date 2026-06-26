# Eval: why

Guards the "why is it like this?" cluster. `why` is about *motivation, intent, and
historical rationale* — the forces that shaped the code. The should-NOT cases
belong to neighbors that chase a live defect (`diagnosing-bugs`), fix at the source
(`fix-root-causes`), or analyze a change's forward fallout (`blast-radius`).

## Should fire
- "why was this retry limit set to 3 — what's the reasoning?"
- "why did we pick Postgres over DynamoDB for this service?"
- "what constraints led to this module being structured this way?"
- "why does this function special-case empty strings — was that deliberate?"
- "dig up the rationale behind this threshold, there must be a ticket or PR"

## Should NOT fire
- "this endpoint returns 500 intermittently, help me find the cause" — _expected: diagnosing-bugs_
- "it crashes on null here, just trace it to the root and fix it properly" — _expected: fix-root-causes_
- "what could this refactor break elsewhere before I merge?" — _expected: blast-radius_
- "walk me through what this function actually does step by step" — _expected: none (plain explanation)_
- "the SUM in this query is double what it should be" — _expected: reviewing-sql_
