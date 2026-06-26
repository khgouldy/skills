# Eval: fix-root-causes

Guards the boundary inside the debugging cluster. `fix-root-causes` is the
*principle* — fire it when someone is about to silence a symptom (a guard, a
try/catch, a special-case) instead of fixing the cause. The *investigation
process* of locating the cause is `diagnosing-bugs`; *why the code is shaped this
way* is `why`.

## Should fire
- "just add a null check so it stops throwing"
- "wrap this in a try/catch so the page doesn't crash"
- "the test is flaky, can we add a retry to make it pass?"
- "special-case this one input so the bug goes away"
- "it works if I clear the cache file every time — let's just clear it on boot"

## Should NOT fire
- "the app throws a NullPointerException on login, help me track it down" — _expected: diagnosing-bugs_
- "why was this guard added in the first place?" — _expected: why_
- "two threads deadlock under load" — _expected: finding-concurrency-bugs_
- "write a failing test for this bug first" — _expected: tdd_
- "what could removing this guard break elsewhere?" — _expected: blast-radius_
