---
name: building-data-pipelines
description: Use when building an ingestion or ETL/ELT pipeline that moves data between systems — keep extraction, transformation, and loading separate, and make runs idempotent and backfillable. Triggers include "build a pipeline", "ingest data from X", "sync X to the warehouse", "ETL/ELT", or a scheduled job that extracts then transforms then loads.
---

# Building Data Pipelines

A pipeline you can re-run without fear, backfill cleanly, and reason about one
stage at a time is worth ten clever scripts. Two principles do most of the work:
**separate the stages**, and **make every run idempotent**.

## Separate Extract → Land → Transform → Load

The source system is for extraction only. Get data out fast, process it
elsewhere. Never run transformation logic inside the extraction loop.

1. **Extract** — pull raw data using the highest-leverage approach available
   (bulk export/dump > cached state > bulk API > per-record). See
   [recon-before-action](../../engineering/recon-before-action/SKILL.md) for the
   speed hierarchy; don't hand-roll pagination when a `bq extract` or vendor dump
   exists.
2. **Land** — write the raw extract to durable storage (object store, file, or a
   raw warehouse table) *before* transforming. Never hold a large dataset only in
   memory. Landed raw data is your replay buffer: you can re-transform without
   re-hitting the source.
3. **Transform** — filter, dedupe, enrich, validate in your processing layer
   (SQL/dbt/pandas) reading *from the landed data*, not from the source.
4. **Load** — write the finished result to its destination.

Keeping these separate means a transform bug doesn't force a re-extract, and a
source outage doesn't corrupt your marts.

## Make every run idempotent

Re-running the pipeline (after a failure, or on overlapping windows) must produce
the same result, not duplicates. This is a metamorphic relation — running twice
equals running once.

- **Upsert/merge on a key**, or replace-by-partition — never blind-append.
- **Use a watermark** (high-water mark on a load timestamp / sequence) to pull
  only new data, with a **lookback window** so late-arriving rows aren't missed.
  Combine with key-based upsert so re-seen rows update instead of duplicate (same
  discipline as [dbt-incremental-models](../dbt-incremental-models/SKILL.md)).
- **Make backfills first-class.** Parameterize the run by date/window so you can
  reprocess history with the same code path as the daily run. A pipeline that
  can't backfill is a pipeline that can't recover.

## Operational must-haves

- **Land raw, immutable.** Don't overwrite raw extracts; partition them by load
  date so you can always replay.
- **Validate at the boundary.** Run [data-quality-checks](../data-quality-checks/SKILL.md)
  on landing and before promotion; fail loud, quarantine bad batches.
- **Right-size the machinery.** Per [recon-before-action](../../engineering/recon-before-action/SKILL.md)'s
  complexity gate: a one-off pull is a script, not a Prefect flow. Don't build
  orchestration for work that runs twice.
- **Parallelize per-record work** in bounded groups (`asyncio.gather` /
  `Promise.all`), never sequentially — and if you do, check
  [finding-concurrency-bugs](../../engineering/finding-concurrency-bugs/SKILL.md).
- **Cache what worked.** After solving a non-trivial integration, append the
  method/endpoint/auth/pagination/gotchas to a `PATTERNS.md` so the next pipeline
  skips the recon.

## Red flags — STOP

- "I'll transform the rows as I page through the API" → **no.** Land first,
  transform from the landing zone.
- "It appends, so a re-run will just add the new rows" → **you'll duplicate.**
  Upsert on a key or replace the partition.
- "I'll backfill by editing the script for the old dates" → **parameterize it**
  so backfill and daily share one code path.

---

_Original skill — distilled from Kevin's Extract→Land→Transform→Load protocol._
