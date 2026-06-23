# A/B Eval: building-data-pipelines

**Skill under test:** [skills/data/building-data-pipelines/SKILL.md](../../skills/data/building-data-pipelines/SKILL.md)

Measures whether the skill makes the model design for **idempotency and
backfill** unprompted — the things that separate a robust pipeline from a script
that breaks on the first re-run.

## Task (identical for both arms)

> Write a plan for a daily job that pulls yesterday's orders from a vendor API
> and loads them into our warehouse `orders` table. Keep it simple but
> production-ready.

**What good looks like:** the plan makes re-runs safe (upsert/merge on a key or
replace-by-partition, **not** blind append), uses a watermark with a lookback for
late-arriving rows, parameterizes the run date so backfills use the same code
path, and lands raw before transforming.

## Rubric (for the blind judge)

- **[critical]** Makes re-runs idempotent (upsert/merge on key, or
  replace-by-partition) rather than appending — names the duplicate risk.
- Handles late-arriving data (lookback window + key-based upsert).
- Parameterizes the run by date so backfill = the daily path.
- Separates extract → land → transform (lands raw before transforming).

Score each response **0–5**.

## Pass criterion

Treatment mean ≥ control mean + 1.0 over ≥ 3 runs; treatment should raise
idempotency/backfill unprompted more reliably than control.
