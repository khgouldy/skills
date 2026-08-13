# Eval: finding-concurrency-bugs

Guards *concurrency defects* (deadlocks, races, livelocks, await-held locks) vs
general debugging. Intermittent failures that are *not* timing/shared-state
shaped stay with `diagnosing-bugs`. Flaky tests being silenced with retries is
`fix-root-causes`. Parallel agent dispatch is not this skill.

## Should fire
- "two threads deadlock when I run this under load"
- "intermittent data race on this shared map"
- "hangs only under concurrent requests — suspect a lock"
- "we're awaiting while holding a mutex and it freezes"
- "works with one worker, fails with four — race?"

## Should NOT fire
- "the app throws NPE on login, help me track it down" — _expected: diagnosing-bugs_
- "the test is flaky, add a retry so CI passes" — _expected: fix-root-causes_
- "this revenue query returns double after a join" — _expected: reviewing-sql_
- "these two independent tasks, run them in parallel" — _expected: none / dispatch_
- "what could this lock-ordering change break elsewhere?" — _expected: blast-radius_
