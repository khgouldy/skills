---
name: reviewing-sql
description: Use when writing or reviewing analytical SQL and correctness matters — catch join fan-out, NULL-semantics traps, GROUP BY grain mistakes, and window/dedup bugs before they ship wrong numbers. Triggers include "review this query", "the totals look too high/low", duplicated rows after a join, or any non-trivial aggregation or window function.
---

# Reviewing SQL

Analytical SQL fails quietly: the query runs, returns a number, and the number
is wrong. There's no stack trace — just a metric that's inflated by a fan-out
join or deflated by a `NULL` no one accounted for. Review for the handful of
traps that produce *plausible* wrong answers.

## The traps, in order of how often they bite

1. **Join fan-out (the #1 cause of inflated metrics).** Joining to a table that
   has *more than one* matching row per key multiplies your rows — every
   downstream `SUM`/`COUNT` is now too high. Before trusting an aggregate after a
   join, confirm the grain: is the join one-to-one, or did it fan out? Aggregate
   the many-side to one row per key *before* joining, or `COUNT(DISTINCT ...)`.

2. **NULL semantics.**
   - `NULL = NULL` is **not true** — it's unknown. Equality and `IN` silently drop
     NULLs; use `IS [NOT] DISTINCT FROM` or `COALESCE`.
   - `NOT IN (subquery)` returns **zero rows** if the subquery contains a single
     NULL. Prefer `NOT EXISTS`.
   - Aggregates skip NULLs: `AVG` ignores them, `COUNT(col)` ≠ `COUNT(*)`.

3. **GROUP BY grain mistakes.** The grain of the result = the `GROUP BY` columns.
   Selecting a column that isn't in the group (and isn't aggregated) either errors
   or, worse, picks an arbitrary value. Be explicit about one row per *what*.

4. **Window function pitfalls.** `ROW_NUMBER()` for dedup needs a deterministic
   `ORDER BY` or you get nondeterministic results. Mind the frame: the default
   frame for `SUM() OVER (ORDER BY ...)` is a running total, not the group total —
   add `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` if you meant the
   whole partition.

5. **Dedup that drops real rows.** `DISTINCT` and `GROUP BY` collapse rows you may
   have wanted. `QUALIFY ROW_NUMBER() OVER (PARTITION BY key ORDER BY ts DESC) = 1`
   is the clean "latest row per key" — verify the partition and order are right.

6. **Filtering an outer join in the WHERE clause.** A `WHERE` predicate on the
   right table of a `LEFT JOIN` silently turns it into an inner join. Put the
   predicate in the `ON` clause if you want to keep the unmatched left rows.

## How to actually verify

- **Check row counts at each step.** If a join changes your row count and you
  didn't expect it to, stop — that's fan-out.
- **Spot-check the grain** with `select key, count(*) ... group by key having count(*) > 1`.
- **Reconcile against a known total.** Tie the result back to a number you trust
  from the source; a 2× discrepancy is usually fan-out, a slight shortfall is
  usually NULLs.

## Pairs with

- [diagnosing-bugs](../../engineering/diagnosing-bugs/SKILL.md) — when a number is
  wrong, reproduce and trace it rather than guessing.
- [data-quality-checks](../data-quality-checks/SKILL.md) — codify these checks as
  standing tests, not one-off reviews.

---

_Original skill — distilled from Kevin's analytics-engineering practice._
