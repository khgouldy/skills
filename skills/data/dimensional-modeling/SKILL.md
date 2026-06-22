---
name: dimensional-modeling
description: Use when designing fact and dimension tables or a mart's schema — declare the grain, separate facts from dimensions, model keys correctly, and handle changing attributes over time. Triggers include "design the data model", "fact vs dimension", "what's the grain", "star schema", or modeling a reporting layer.
---

# Dimensional Modeling

Good marts start with one question answered out loud: **what is one row?** That's
the grain. Declare it first, model facts and dimensions around it, and most
downstream confusion disappears.

## Declare the grain first

The grain is the precise meaning of a single row — "one row per order line", "one
row per user per day". Decide it *before* writing SQL. Every column in the table
must be true at that grain; if a column is at a different grain, it belongs in a
different table. Mixed-grain tables are the root of double-counted metrics.

## Facts vs dimensions

- **Fact tables** record events/measurements at a grain: the numeric, additive
  stuff (amounts, counts, durations) plus foreign keys to dimensions. Facts are
  long and narrow, and they grow over time.
- **Dimension tables** describe the *things* a fact references — the who/what/
  where/when (customer, product, date). Wide, descriptive, relatively static.
  This is the context you slice and filter by.

Keep measures in facts and descriptive attributes in dimensions. A `fct_orders`
holds amounts and `customer_id`; the customer's name and segment live in
`dim_customers`.

## Keys

- Give dimensions a stable **primary key**; reference it from facts as a foreign
  key. Validate the relationship (`relationships` test).
- Prefer durable keys over keys that can be reused/recycled by the source.
- Conform dimensions: if "customer" means the same thing in two marts, model it
  *once* in a shared `dim_customers`, don't redefine it per mart.

## Changing attributes over time (SCDs)

When a dimension attribute changes (a customer moves to a new segment), decide
how much history you need:

- **Type 1 — overwrite.** Keep only the current value. Simplest; loses history.
- **Type 2 — new row per change**, with `valid_from`/`valid_to` (and a
  `is_current` flag). Preserves history so a fact joins to the attribute value
  that was true *at event time*. Use when "as-of" reporting matters.

Don't default to Type 2 everywhere — it's more machinery. Use it where historical
accuracy is actually required.

## Additivity — know how a measure rolls up

- **Additive** measures sum across every dimension (revenue).
- **Semi-additive** measures sum across some but not time (account balance — you
  don't sum balances across days).
- **Non-additive** measures (ratios, percentages) can't be summed at all —
  recompute them from additive components instead.

Getting this wrong is a quiet way to ship wrong totals.

## Pairs with

- [writing-dbt-models](../writing-dbt-models/SKILL.md) — `fct_`/`dim_` models are
  the mart layer this designs.
- [reviewing-sql](../reviewing-sql/SKILL.md) — grain mistakes and fan-out are the
  bugs that violate a declared grain.

---

_Original skill — distilled from Kevin's analytics-engineering practice._
