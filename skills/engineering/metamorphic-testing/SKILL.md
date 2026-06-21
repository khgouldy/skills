---
name: metamorphic-testing
description: Use when testing a system where you can't easily state the "correct" output to assert against — data transforms, ML/statistical code, optimizers, simulations, complex queries. Assert relationships between inputs and outputs (metamorphic relations) instead of exact expected values.
---

# Metamorphic Testing

Some systems have no easy oracle: you can't write `assert output == expected`
because computing the expected answer is as hard as the system under test. Data
pipelines, ML models, search ranking, numerical solvers — you often can't say
what the *right* answer is, but you can say how the answer *must change* (or not
change) when you change the input. That relationship is a **metamorphic
relation**, and it's a test.

## The idea

Instead of "input X → output Y", you assert "if I transform the input this way,
the output must relate to the original output this way." You never need to know
the absolute correct answer — only the invariant.

## Useful relations to look for

- **Idempotence** — applying the operation twice equals applying it once.
  Deduplication, normalization, sorting: `f(f(x)) == f(x)`.
- **Permutation invariance** — reordering the input doesn't change the result.
  A sum, a count, a set-valued result shouldn't depend on row order.
- **Monotonicity** — adding data can only increase (or only decrease) some
  output. Filtering more can't return *more* rows; a count over a superset can't
  shrink.
- **Scaling / additivity** — `f(a ∪ b)` relates predictably to `f(a)` and
  `f(b)`; doubling every weight doubles the total.
- **Inverse round-trip** — encode then decode, serialize then parse: you get the
  original back. `decode(encode(x)) == x`.
- **Equivalence under irrelevant change** — renaming a column, reformatting a
  date, or reordering independent filters shouldn't change the result.

## How to apply it

1. **Pick the relations that must hold** for your system. Write them down as
   plain statements first.
2. **Generate inputs**, ideally randomized (property-based testing pairs
   beautifully with this — let a generator produce the inputs and check the
   relation across many of them).
3. **Run the original and the transformed input**, then assert the relation
   between their outputs — not the outputs themselves.
4. **When a relation fails, you've found a real bug** without ever needing the
   ground-truth answer.

## Why it fits data work especially

ETL and analytics are exactly where the oracle problem bites: you can't
hand-compute the right output of a 10-step transform over a million rows, but
"dedup is idempotent", "filtering then counting ≤ counting", and "row order
doesn't change the aggregate" are all things you *can* guarantee. Those guarantees
catch the silent corruption that exact-value tests never get written for.

## Pairs with

- [tdd](../tdd/SKILL.md) — when the exact-value oracle is easy, assert it
  directly; reach for metamorphic relations when it isn't.

---

_Inspired by Jeffrey's metamorphic-testing skill. Prose is our own._
