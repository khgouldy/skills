---
name: writing-dbt-models
description: Use when writing or restructuring dbt models — layer staging→intermediate→marts, reference sources and upstream models correctly, pick the right materialization, and add tests + docs. Triggers include "write a dbt model", "add a staging model", a `.sql` file under `models/`, ref()/source() usage, or `dbt run`/`dbt build`.
---

# Writing dbt Models

A dbt project is only as maintainable as its layering. Build models in clear
tiers, never reach around `ref()`/`source()`, and let each layer do exactly one
job. The goal is that anyone can trace a number in a mart back to its raw source
through named, tested steps.

## The layers (build in this order)

1. **Staging (`stg_<source>__<entity>`)** — one model per source table. Rename
   columns to the project's conventions, cast types, and apply only light,
   non-destructive cleaning. No joins, no business logic, no aggregation. This is
   the *only* layer that reads from `source()`.
2. **Intermediate (`int_<entity>_<verb>`)** — the messy middle: joins,
   fan-out/fan-in, reusable building blocks that aren't themselves a deliverable.
   Keep them ephemeral or views; they exist to keep marts readable.
3. **Marts (`fct_<...>` / `dim_<...>`)** — the things consumers actually query.
   One clear grain per model (see [dimensional-modeling](../dimensional-modeling/SKILL.md)).

## Referencing — never reach around the DAG

- Read raw data **only** through `source()`, and only in staging.
- Read every other model through `ref()` — never hardcode a schema/table name.
  `ref()` is what builds the dependency graph; a hardcoded table is invisible to
  dbt and breaks lineage, ordering, and `dbt build`.

## Materialization — match it to the model's job

| Materialization | Use when |
|---|---|
| **view** | Lightweight transforms, staging, low query volume. Cheap to build, recomputed on read. |
| **table** | Marts queried often where read speed matters and a full rebuild is acceptable. |
| **incremental** | Large/append-mostly fact tables where full rebuilds are too slow/expensive — see [dbt-incremental-models](../dbt-incremental-models/SKILL.md). |
| **ephemeral** | Intermediate glue you don't want to persist; inlined as a CTE. |

Default to views in staging and tables in marts; reach for incremental only when
rebuild cost forces it.

## Tests and docs are part of the model, not an afterthought

- In the model's `.yml`: add `not_null` and `unique` on keys, `relationships`
  for foreign keys, and `accepted_values` where a column is an enum.
- Declare **source freshness** so stale upstream data fails loudly.
- Write a one-line `description` for the model and its key columns — the docs site
  and downstream consumers both read it.

## Style that keeps models reviewable

- **CTEs, top to bottom, one idea each.** Import refs at the top, transform in the
  middle, one final `select`. No deeply nested subqueries.
- **Select columns explicitly** in marts; avoid `select *` past staging so schema
  changes don't silently propagate.
- **Push logic upstream once, not into every mart.** If three marts compute the
  same thing, it belongs in an intermediate model.

## Pairs with

- [reviewing-sql](../reviewing-sql/SKILL.md) — the correctness traps to check
  inside each model.
- [data-quality-checks](../data-quality-checks/SKILL.md) — validating the output
  beyond dbt's built-in tests.

---

_Original skill — distilled from Kevin's dbt practice._
