---
name: data-quality-checks
description: Use when validating the output of a pipeline, table, or model — assert row counts, nullability, uniqueness, freshness, and referential integrity so bad data fails loudly instead of flowing downstream. Triggers include "add data quality checks", "validate this table", "is this data trustworthy", or before promoting a dataset to production.
---

# Data Quality Checks

Bad data is worse than no data: a broken pipeline gets noticed, but silently
wrong data flows into dashboards and decisions for weeks. Add checks that **fail
loudly at the boundary** — right where data lands or a model materializes — so
problems stop before they propagate.

## The core checks (start here)

- **Volume / row count.** Did we get roughly the expected number of rows? A run
  that loads 0 rows (or 10× the usual) is almost always a bug, not a data trend.
  Check absolute floors *and* deviation from the recent norm.
- **Uniqueness.** The primary/business key is unique at the declared grain. The
  single most common data bug is an unexpected duplicate from a fan-out join — see
  [reviewing-sql](../reviewing-sql/SKILL.md).
- **Nullability.** Columns that must be populated aren't NULL. Especially keys,
  timestamps, and anything used in a join or filter.
- **Freshness.** The newest record is recent enough. A pipeline that "succeeds"
  but loads yesterday's data is a stale-data incident waiting to happen.
- **Referential integrity.** Every foreign key resolves to a row in the parent —
  no orphan facts pointing at missing dimensions.
- **Range / domain.** Values are in their valid range (no negative prices, no
  future birthdays, enums within their accepted set).

## Think in invariants, not just thresholds

The strongest checks are **relationships that must always hold**, regardless of
the data's size or content — these are metamorphic relations
([metamorphic-testing](../../engineering/metamorphic-testing/SKILL.md)):

- Re-running an idempotent transform changes nothing (`f(f(x)) == f(x)`).
- Filtering more rows can't *increase* a count.
- A roll-up's total equals the sum of its parts.
- Row order never changes an aggregate.

These catch the silent corruption that fixed thresholds miss.

## Where and how to run them

- **At the boundary.** Check on landing (raw → staging) and on materializing key
  marts — fail the run there, before downstream consumers read it.
- **Use the tools you already have.** dbt tests (`not_null`, `unique`,
  `relationships`, `accepted_values`, freshness), warehouse `ASSERT`, or a thin
  validation step in the pipeline. Don't hand-roll what dbt tests already express.
- **Fail loud, fail early.** A failing check should stop promotion and alert —
  not log a warning nobody reads. Quarantine bad batches rather than letting them
  merge.
- **Make checks part of "done."** A new model ships with its tests, the same way
  code ships with [tdd](../../engineering/tdd/SKILL.md). An untested table is an
  unverified claim.

## Pairs with

- [reviewing-sql](../reviewing-sql/SKILL.md) — the bugs these checks catch.
- [building-data-pipelines](../building-data-pipelines/SKILL.md) — where in the
  flow to place them.

---

_Original skill — distilled from Kevin's data-engineering practice._
