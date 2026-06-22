---
name: bigquery-superpowers
description: Use when writing, optimizing, or paying for BigQuery — partition and cluster tables, prune scanned bytes, estimate cost with a dry run, and pick the right way to get data in and out. Triggers include "this BigQuery query is expensive/slow", "bq extract", "partition this table", "reduce slot/bytes scanned", or any non-trivial BQ SQL or load/export.
---

# BigQuery Superpowers

BigQuery bills (and largely performs) on **bytes scanned**, not rows returned.
Almost every optimization is really one question: *how do I make this query read
less data?* Master partitioning, clustering, and pruning, and the cost/latency
takes care of itself.

## Know the cost before you run it

- **Dry-run everything non-trivial.** `bq query --dry_run` (or the SDK's dry-run
  flag) reports bytes that *will* be scanned — for free, before you spend a cent.
  Make this a reflex on any query over a large table.
- **`SELECT *` is the cardinal sin.** BigQuery is columnar; scanning all columns
  reads everything. Select only the columns you need — it directly cuts bytes
  scanned and cost.

## Partition and cluster — the two biggest levers

- **Partitioning** splits a table by a column (usually a date/timestamp, or
  ingestion time). A query that filters on the partition column scans only the
  matching partitions — *partition pruning*. Partition large fact/event tables by
  their primary date and **always filter on it**. Require a partition filter
  (`require_partition_filter`) so nobody accidentally scans the whole history.
- **Clustering** sorts data within partitions by up to four columns. Filters and
  aggregations on clustered columns read fewer blocks. Cluster on the columns you
  most often filter/join by (high-cardinality keys benefit most).

Together: partition by date, cluster by your common filter keys. This is the
default shape for a big BQ table.

## Make filters prunable

- Filter on the **raw partition column**, not a function of it. `WHERE ts >=
  '2026-01-01'` prunes; `WHERE DATE(ts) = ...` or `WHERE FORMAT_DATE(...)` can
  defeat pruning. Keep the partition column bare on the left of the predicate.
- Filter **early and on the partition/cluster keys** before joining or
  aggregating.

## Query patterns that save money

- Materialize expensive intermediate results instead of recomputing them across
  many queries.
- Avoid `SELECT *` in `WITH` CTEs that feed large joins — carry only needed
  columns through.
- For repeated dashboard queries, consider a scheduled/materialized result rather
  than re-scanning raw tables each load.
- Mind join fan-out — it scans and produces more than you think (see
  [reviewing-sql](../reviewing-sql/SKILL.md)).

## Getting data in and out (the recon hierarchy, BQ edition)

- **Bulk export beats per-row reads.** To pull a large result out, `bq extract`
  (or `EXPORT DATA`) to GCS and download, rather than paging the API row by row —
  the top of the [recon-before-action](../../engineering/recon-before-action/SKILL.md)
  speed hierarchy.
- **Load via batch, not streaming, for bulk.** Batch loads from GCS are free and
  fast; streaming inserts cost money and are for low-latency needs only.
- **Use `insert_overwrite` by partition** for idempotent loads — replace a whole
  day's partition rather than merging row by row (pairs with
  [building-data-pipelines](../building-data-pipelines/SKILL.md)
  and [dbt-incremental-models](../dbt-incremental-models/SKILL.md)).

## Red flags — STOP

- "I'll just `SELECT *` to see the data" → on a big table that's a real bill. Add
  `LIMIT`? **No — `LIMIT` doesn't reduce bytes scanned.** Select fewer columns and
  filter the partition instead.
- "The query filters on the date, so it's pruned" → only if the filter is on the
  bare partition column. Verify with a dry run.
- "I'll page the API to export 50M rows" → `bq extract` to GCS instead.

---

_Original skill — distilled from Kevin's BigQuery practice._
