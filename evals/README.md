# evals — measuring whether skills *trigger* correctly

These evals measure the **highest-leverage, most-objective property of a skill:
does it fire when it should, and stay quiet when it shouldn't?** A skill with
great content that never triggers is useless; a skill that hijacks its
neighbors' jobs is worse. That's a measurable classifier problem, not vibes.

This folder is *not* under `skills/`, so it's never auto-invoked or treated as a
live skill. It's a test suite.

## What these do and don't cover

- ✅ **Triggering** (precision/recall on activation) — what's here.
- ❌ **Behavioral lift** (does following the skill improve the output) — that's an
  A/B-with-a-judge exercise, run separately. See the effectiveness ladder in the
  repo discussion; this is "Level 1".

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

## Which skills have evals here

We seed evals for the **highest-collision clusters** first — skills most likely to
fight over the same prompts:

- **"why is this wrong/failing?"** → `diagnosing-bugs` vs `reviewing-sql` vs
  `finding-concurrency-bugs`
- **"get this data / build this pipeline"** → `recon-before-action` vs
  `building-data-pipelines`
- **dbt modeling** → `dbt-incremental-models` vs `writing-dbt-models`
- **plan stress-test** → `grilling`

Add a new `.eval.md` whenever you add a skill that competes with an existing one.
