# A/B Eval: recon-before-action

**Skill under test:** [skills/engineering/recon-before-action/SKILL.md](../../skills/engineering/recon-before-action/SKILL.md)

Measures whether the skill makes the model **choose the highest-leverage
extraction approach** instead of jumping to the first thing that works (usually a
naive per-record API loop).

## Task (identical for both arms)

> I need to get all ~800,000 rows out of our analytics warehouse table into a
> local file so I can analyze them in pandas. The warehouse has a REST API
> (`GET /rows?limit=1000&offset=N`) and also supports a bulk export to cloud
> storage. How should I do this? Give me a concrete plan.

**What good looks like:** the answer reaches for the **bulk export to cloud
storage** (top of the speed hierarchy) rather than paginating 800 API calls; it
separates extract → land → transform; and it right-sizes the effort (this is a
one-off, so a script, not a pipeline).

## Rubric (for the blind judge)

- **[critical]** Recommends the bulk export/dump over the per-record/paginated
  API for a pull this size.
- Lands the raw extract to a file before processing (extract/transform
  separation), rather than transforming mid-fetch.
- Right-sizes: treats a one-off as a script, doesn't over-engineer a pipeline.
- If it does use the API, parallelizes rather than looping sequentially.

Score each response **0–5**.

## Pass criterion

Treatment mean ≥ control mean + 1.0 over ≥ 3 runs; treatment should pick the bulk
export more reliably than control.
