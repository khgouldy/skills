# Eval: diagnosing-bugs

Guards the "why is this wrong/failing?" cluster. The job here is *general*
root-cause discipline; the should-NOT cases belong to more specific neighbors
(`reviewing-sql` for wrong query results, `finding-concurrency-bugs` for timing
bugs).

## Should fire
- "this test passes locally but fails in CI, can you figure out why?"
- "the app throws a NullPointerException on login — help me track it down"
- "something's wrong, the endpoint returns 500 intermittently, where do I start?"
- "I have a stack trace and no idea what's causing it"
- "the function returns the wrong value for some inputs, help me find the cause"

## Should NOT fire
- "the SUM in this query is double what it should be" — _expected: reviewing-sql_
- "two threads deadlock when I run this under load" — _expected: finding-concurrency-bugs_
- "this BigQuery query is slow and expensive" — _expected: bigquery-superpowers_
- "write a test for this function" — _expected: tdd_
- "the dbt incremental model is duplicating rows" — _expected: dbt-incremental-models_
