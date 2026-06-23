# Eval: dbt-incremental-models

Guards the dbt-modeling cluster. Fires specifically on *incremental* concerns
(unique_key, is_incremental(), late data, full-refresh drift) — not general dbt
model authoring (`writing-dbt-models`).

## Should fire
- "make this dbt model incremental, the full rebuild takes 40 minutes"
- "my incremental model is duplicating rows on re-run"
- "late-arriving events aren't showing up in the incremental table"
- "should I set a unique_key on this incremental model?"
- "the incremental build and a --full-refresh give different results"

## Should NOT fire
- "set up the staging → marts layering for this source" — _expected: writing-dbt-models_
- "what materialization should a low-volume lookup table use?" — _expected: writing-dbt-models_
- "design the grain and keys for this fact table" — _expected: dimensional-modeling_
- "add not_null and relationships tests to this model" — _expected: data-quality-checks (or writing-dbt-models)_
- "this query's totals are inflated by a join" — _expected: reviewing-sql_
