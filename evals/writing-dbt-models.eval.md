# Eval: writing-dbt-models

Guards *general dbt authoring* (layers, ref/source, materializations, tests/docs)
vs *incremental-specific* correctness. Incremental unique_key / late data /
full-refresh drift is `dbt-incremental-models`. Grain and facts/dims design is
`dimensional-modeling`. Raw SQL correctness review is `reviewing-sql`.

## Should fire
- "set up staging → intermediate → marts for this source"
- "write a dbt staging model that uses source() correctly"
- "what materialization should a low-volume lookup table use?"
- "add tests and docs when I create this model"
- "restructure these models so marts don't select from raw"

## Should NOT fire
- "make this model incremental; full rebuild takes 40 minutes" — _expected: dbt-incremental-models_
- "incremental is duplicating rows / late events missing" — _expected: dbt-incremental-models_
- "design the grain and keys for the orders fact" — _expected: dimensional-modeling_
- "this query's totals are inflated by a join" — _expected: reviewing-sql_
- "build the hourly ETL that lands the files" — _expected: building-data-pipelines_
