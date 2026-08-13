# Eval: building-data-pipelines

Guards *designing/building the pipeline* vs *choosing how to get the data*.
`building-data-pipelines` fires when extract→land→transform→load shape,
idempotency, watermarks, or backfills are the job. Choosing the fastest approach
before writing code is `recon-before-action`. Analytical SQL correctness is
`reviewing-sql`. Warehouse cost is `bigquery-superpowers`.

## Should fire
- "build a pipeline that syncs vendor orders into the warehouse every hour"
- "the pipeline appends duplicates on every re-run — make it idempotent"
- "design the extract/land/transform/load split for this feed"
- "how do I backfill last month without double-counting?"
- "ETL job keeps reprocessing the same watermark window"

## Should NOT fire
- "before I write code, what's the cheapest way to get this data?" — _expected: recon-before-action_
- "this revenue total doubled after I added a join" — _expected: reviewing-sql_
- "this extract scans 2 TB in BigQuery" — _expected: bigquery-superpowers_
- "write the dbt staging model for the landed table" — _expected: writing-dbt-models_
- "add freshness and uniqueness checks on the output" — _expected: data-quality-checks_
