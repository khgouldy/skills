# Eval: recon-before-action

Guards the "how do I get this data / approach this integration?" cluster. Fires
when *choosing the approach* before building — the speed hierarchy + complexity
gate. The should-NOT cases are about *building the pipeline once the approach is
chosen* (`building-data-pipelines`).

## Should fire
- "I need to pull all the records out of this vendor's system, what's the fastest way?"
- "should I script this or build a real pipeline? it's about 30 rows"
- "we need to integrate with their API to sync customers — where do I start?"
- "how should I extract this dataset, scrape it?"
- "before I write code, what's the cheapest way to get this data?"

## Should NOT fire
- "the pipeline appends duplicates on every re-run, how do I make it idempotent?" — _expected: building-data-pipelines_
- "two threads race when I parallelize the fetch" — _expected: finding-concurrency-bugs_
- "this extract query is scanning the whole table in BigQuery" — _expected: bigquery-superpowers_
- "write the staging model for this source" — _expected: writing-dbt-models_
- "add freshness checks to the landed data" — _expected: data-quality-checks_
