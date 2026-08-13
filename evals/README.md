# evals — measuring whether skills *trigger* correctly

These evals measure the **highest-leverage, most-objective property of a skill:
does it fire when it should, and stay quiet when it shouldn't?** A skill with
great content that never triggers is useless; a skill that hijacks its
neighbors' jobs is worse. That's a measurable classifier problem, not vibes.

This folder is *not* under `skills/`, so it's never auto-invoked or treated as a
live skill. It's a test suite.

## What these do and don't cover

| Level | Where | Question |
|---|---|---|
| **L1 — Trigger** | `evals/*.eval.md` (this level) | Does the skill activate on the right prompts? |
| **L2 — Behavioral lift** | [`evals/ab/`](./ab/) | Once it fires, does following it improve the answer? |
| **L3 — Environment / harness** | *not yet* | Same fixed worker, changed environment — better accepted outcomes on fresh runs? |

L1 is precision/recall on activation. L2 is A/B with a blind judge (see
[`ab/README.md`](./ab/README.md)). L3 is harness-engineering style: hold the
model constant, change context/tools/checks, measure outcomes — use
[`improve-harness`](../skills/engineering/improve-harness/SKILL.md) operationally
until we seed a formal L3 template.

## File format

One `<skill>.eval.md` per skill under test. Each lists prompts that **should**
fire the skill and near-miss prompts that **should not** (usually because they
belong to a neighbor skill — that's the collision we're guarding against).

```markdown
# Eval: <skill-name>

## Should fire
- "a natural prompt that must activate this skill"

## Should NOT fire
- "a near-miss prompt" — _expected: <other-skill | none>_
```

The `expected:` note on a should-NOT case records *where the trigger should go
instead* — that's what makes a collision concrete.

User-invoked skills (`disable-model-invocation: true`) still get eval sheets when
they sit in a collision cluster — humans and routing docs need the same
boundaries even if the model never auto-fires them.

## How to run them

The descriptions are the trigger surface, so an eval run = "given only the skill
descriptions, which skill (if any) activates for this prompt?"

- **Automated:** the `skill-creator` skill can run trigger evals, do variance
  analysis across repeated runs, and optimize a `description` for better
  accuracy. Point it at a skill + its `.eval.md` cases.
- **Manual:** read each prompt cold against the catalog and ask "which
  description matches?" Record hits/misses.

## Scoring

For a skill with `S` should-fire cases and `N` should-not cases:

- **Recall** = (should-fire prompts that fired) / `S` — low recall means the
  description is too narrow or vague. Fix by widening triggers.
- **Precision** = (correct fires) / (all prompts that fired it, incl. false
  positives from other skills' should-not lists) — low precision means it's
  stealing triggers. Fix by sharpening the boundary / adding "don't use when".

Aim to raise recall without dropping precision; the should-NOT cases are what
keep you honest.

## Inventory

Trigger evals are seeded for **collision clusters**, not every skill. Quiet
principles with little steal risk may omit a sheet until a neighbor names them.

### Current `.eval.md` files

| Eval | Cluster |
|---|---|
| [diagnosing-bugs](./diagnosing-bugs.eval.md) | debug / “why is this failing?” |
| [fix-root-causes](./fix-root-causes.eval.md) | debug / symptom vs cause |
| [why](./why.eval.md) | debug / historical rationale |
| [finding-concurrency-bugs](./finding-concurrency-bugs.eval.md) | debug / races & locks |
| [tdd](./tdd.eval.md) | implement / test-first |
| [reviewing-sql](./reviewing-sql.eval.md) | data / wrong numbers |
| [recon-before-action](./recon-before-action.eval.md) | data / approach before build |
| [building-data-pipelines](./building-data-pipelines.eval.md) | data / ETL shape |
| [dbt-incremental-models](./dbt-incremental-models.eval.md) | data / incremental dbt |
| [writing-dbt-models](./writing-dbt-models.eval.md) | data / general dbt |
| [blast-radius](./blast-radius.eval.md) | ship / forward impact |
| [create-pr](./create-pr.eval.md) | ship / open for review |
| [deslop](./deslop.eval.md) | quality / code slop |
| [unslop](./unslop.eval.md) | quality / prose slop |
| [control-ui](./control-ui.eval.md) | proof / drive real UI |
| [arena](./arena.eval.md) | design / multi-candidate |
| [exhaust-the-design-space](./exhaust-the-design-space.eval.md) | design / compare options |
| [cross-critique](./cross-critique.eval.md) | design / red-team a decision |
| [grilling](./grilling.eval.md) | plan / stress-test |
| [boil-the-ocean](./boil-the-ocean.eval.md) | finish / permanent solution |
| [improve-harness](./improve-harness.eval.md) | harness / environment loop |
| [prove-the-outcome](./prove-the-outcome.eval.md) | harness / claim-matched proof |
| [feedback-to-infrastructure](./feedback-to-infrastructure.eval.md) | harness / promote lessons |
| [whole-job](./whole-job.eval.md) | harness / lifecycle ownership |
| [authority-boundary](./authority-boundary.eval.md) | harness / can vs may |

### A/B lift fixtures ([`ab/`](./ab/))

| Skill | What lift asks |
|---|---|
| [reviewing-sql](./ab/reviewing-sql.ab.md) | Catch hidden join fan-out? |
| [recon-before-action](./ab/recon-before-action.ab.md) | Pick highest-leverage extraction? |
| [building-data-pipelines](./ab/building-data-pipelines.ab.md) | Design idempotency/backfill unprompted? |
| [prove-the-outcome](./ab/prove-the-outcome.ab.md) | Refuse merge-on-unit-green for a UI claim? |
| [authority-boundary](./ab/authority-boundary.ab.md) | Refuse force/admin merge when checks fail? |

## Collision clusters (map)

Edges mean “these descriptions must not steal each other’s prompts.”

```text
DEBUG
  diagnosing-bugs  ↔  reviewing-sql, finding-concurrency-bugs, fix-root-causes,
                      why, tdd, bigquery-superpowers, dbt-incremental-models
  fix-root-causes  ↔  diagnosing-bugs, why, tdd, blast-radius, finding-concurrency-bugs
  why              ↔  diagnosing-bugs, fix-root-causes, blast-radius, reviewing-sql

DATA
  recon-before-action     ↔  building-data-pipelines, writing-dbt-models,
                             bigquery-superpowers, data-quality-checks
  building-data-pipelines ↔  recon-before-action, reviewing-sql, writing-dbt-models,
                             data-quality-checks, bigquery-superpowers
  writing-dbt-models      ↔  dbt-incremental-models, dimensional-modeling, reviewing-sql
  dbt-incremental-models  ↔  writing-dbt-models, dimensional-modeling, reviewing-sql
  reviewing-sql           ↔  diagnosing-bugs, data-quality-checks, bigquery-superpowers

SHIP / QUALITY
  blast-radius  ↔  diagnosing-bugs, why, fix-root-causes, arena
  create-pr     ↔  whole-job, fixing-and-merging-prs, authority-boundary,
                   prove-the-outcome, resolve-merge-conflicts
  deslop        ↔  unslop, diagnosing-bugs
  unslop        ↔  deslop, create-pr, feedback-to-infrastructure
  control-ui    ↔  prove-the-outcome, diagnosing-bugs, blast-radius, tdd

DESIGN / PLAN
  arena                    ↔  exhaust-the-design-space, cross-critique, blast-radius
  exhaust-the-design-space ↔  arena, cross-critique, prototype, grilling
  cross-critique           ↔  grilling, exhaust-the-design-space, arena, blast-radius
  grilling                 ↔  cross-critique, grill-with-docs, handoff, diagnosing-bugs

HARNESS
  improve-harness            ↔  feedback-to-infrastructure, whole-job, prove-the-outcome,
                                authority-boundary, diagnosing-bugs
  prove-the-outcome          ↔  whole-job, authority-boundary, boil-the-ocean, control-ui,
                                tdd, blast-radius
  feedback-to-infrastructure ↔  fix-root-causes, diagnosing-bugs, improve-harness,
                                deslop, writing-great-skills
  whole-job                  ↔  boil-the-ocean, prove-the-outcome, create-pr,
                                authority-boundary, improve-harness
  authority-boundary         ↔  whole-job, prove-the-outcome, blast-radius, improve-harness
  boil-the-ocean             ↔  whole-job, prove-the-outcome, fix-root-causes, create-pr
```

## When to add a new eval

Add a new `.eval.md` when you:

1. Add a skill that **competes** with an existing one over the same prompts, or
2. Notice false activations in real sessions, or
3. Cross-link a neighbor in a skill body / should-NOT list that has no sheet yet.

Prefer 4–6 should-fire and 4–6 should-NOT cases. Every should-NOT should name an
`expected:` target (skill or `none`).

Still optional (low collision / quiet principles): `experience-first`,
`foundational-thinking`, `minimize-reader-load`, `make-operations-idempotent`,
`redesign-from-first-principles`, `metamorphic-testing`, `beadflow`,
`handoff`, `show-me-your-work`, `writing-great-skills`, most pure data utilities
already only referenced as `expected:` from neighbors
(`data-quality-checks`, `dimensional-modeling`, `bigquery-superpowers` — add when
they start stealing).
