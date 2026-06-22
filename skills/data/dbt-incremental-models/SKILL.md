---
name: dbt-incremental-models
description: Use when building or debugging a dbt incremental model — getting unique_key, is_incremental() filters, late-arriving data, and full-refresh behavior right. Triggers include "make this incremental", "incremental model is duplicating/missing rows", `materialized='incremental'`, `{{ this }}`, or a slow full-rebuild you want to avoid.
---

# dbt Incremental Models

Incremental models trade a full rebuild for processing only new/changed rows.
That tradeoff is where dbt's subtlest bugs live: silent duplicates, missed
late-arriving rows, and "works on full-refresh, wrong on incremental." Get the
three moving parts right — the filter, the key, and the merge.

## When to even use it

Only when a full rebuild is genuinely too slow or too expensive. A `table`
materialization that rebuilds in seconds is simpler and less bug-prone. Reach for
incremental on large, append-mostly fact tables. (Run the complexity gate from
[recon-before-action](../../engineering/recon-before-action/SKILL.md): don't add
incremental machinery to a small model.)

## The three things you must get right

1. **The incremental filter** — gate new rows with `is_incremental()`:
   ```sql
   {% if is_incremental() %}
     where _loaded_at > (select max(_loaded_at) from {{ this }})
   {% endif %}
   ```
   The filter must reference `{{ this }}` (the existing table). On the first run
   `is_incremental()` is false and the model builds in full.

2. **`unique_key`** — set it so dbt can update existing rows instead of blindly
   inserting. Without it, a reprocessed row is *appended*, not replaced → silent
   duplicates. The key must be genuinely unique at the model's grain (a single
   column or a list).

3. **`incremental_strategy`** — `merge` (default on most warehouses) updates
   matched keys and inserts the rest; `insert_overwrite` (great on BigQuery)
   replaces whole partitions. Choose deliberately and, for partition-based
   strategies, declare `partition_by`.

## The two failure modes to design against

- **Late-arriving / updated data.** A strict `>` on a load timestamp misses rows
  that arrive after a later one. Use a **lookback window**
  (`where _loaded_at > (select max(_loaded_at) from {{ this }}) - interval 3 day`)
  combined with a `unique_key` so re-seen rows update rather than duplicate.
- **Drift between incremental and full-refresh output.** The model must produce
  the *same* result whether built incrementally or with `--full-refresh`. If they
  differ, your incremental logic is wrong. This is exactly a metamorphic
  relation — see [data-quality-checks](../data-quality-checks/SKILL.md) and
  [metamorphic-testing](../../engineering/metamorphic-testing/SKILL.md).

## Operational discipline

- Keep `--full-refresh` *able to rebuild correctly* at any time — it's your
  escape hatch when an incremental run goes wrong.
- A schema change (new column) usually needs a full-refresh or `on_schema_change`
  config; incremental runs won't add columns by default.
- Test it the way it runs: build once full, then run incremental on fresh data,
  then diff against a from-scratch full-refresh of the same window.

---

_Original skill — distilled from Kevin's dbt practice._
