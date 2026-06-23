# Eval: reviewing-sql

Guards the "the numbers are wrong" sub-cluster. Fires on analytical-SQL
correctness (fan-out, NULLs, grain, windows) — *not* generic crashes
(`diagnosing-bugs`) or standing data tests (`data-quality-checks`).

## Should fire
- "this revenue total looks way too high after I added the join"
- "review this query — I think the GROUP BY grain is off"
- "my LEFT JOIN is dropping rows and I don't know why"
- "the COUNT is lower than expected, could NULLs be the issue?"
- "is this window function deduping correctly? the ORDER BY worries me"

## Should NOT fire
- "the query throws a syntax error" — _expected: diagnosing-bugs_
- "add a uniqueness test so this can't regress" — _expected: data-quality-checks_
- "this query scans 2 TB and costs too much" — _expected: bigquery-superpowers_
- "design the fact and dimension tables for orders" — _expected: dimensional-modeling_
- "make this model incremental" — _expected: dbt-incremental-models_
