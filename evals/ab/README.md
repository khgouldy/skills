# evals/ab — measuring behavioral *lift*

Trigger evals (one level up, in [`../`](../README.md)) ask *"does the skill
fire?"* These ask the harder question: **once it fires, does following it
actually produce a better answer?** That's "Level 2" — behavioral lift.

There's no golden output for "a good SQL review," so we don't assert exact
answers. Instead we **A/B the skill** and let a judge score the difference.

## The method

For a skill `S`, a task `T`, and a rubric `R`:

1. **Control arm** — an agent does `T` with no skill. Produces answer `A`.
2. **Treatment arm** — an agent does `T` with `S`'s `SKILL.md` injected as
   guidance. Produces answer `B`.
3. **Blind judge** — a third agent sees `T`, `R`, and both answers in
   randomized/anonymized order, scores each against `R`, and reports which is
   better and by how much.
4. **Repeat** `N` times (both arms are stochastic). Report the score
   distribution and how often treatment wins — not a single sample.

**Lift** = mean(treatment score) − mean(control score). A skill earns its place
when lift is positive and consistent. A skill with ~zero lift is either wrong,
ignored, or redundant with what the model already does.

## Keeping it honest

- **Blind the judge.** Never tell it which answer used the skill; randomize order.
- **Identical task both arms.** The *only* difference is the injected skill.
- **Rubric tied to the skill's claims.** If `reviewing-sql` claims to catch
  fan-out, the rubric must reward catching fan-out — otherwise you're measuring
  something else.
- **Don't rig the task.** Pick realistic tasks where the skill *might* help, not
  ones only its exact words can solve.
- **Variance is data.** If treatment wins 5/5, that's strong; 3/5 is weak. One
  run proves the harness, not the skill.
- **Target the model's frontier.** A task the base model already aces floors
  *both* arms at the top score → lift ≈ 0, telling you nothing about the skill.
  Measure lift on tasks the model gets wrong ~half the time (subtler traps, a
  weaker/cheaper model, harder inputs) — that's where a skill earns its keep. A
  zero-lift result on an easy task means "task too easy," not "skill worthless."

## File format

One `<skill>.ab.md` per skill under test:

```markdown
# A/B Eval: <skill-name>

**Skill under test:** skills/<category>/<name>/SKILL.md

## Task (identical for both arms)
<the prompt both agents receive>

## Rubric (for the blind judge)
- [critical] <the core thing a good answer must do>
- <secondary criteria>
Score each response 0–5.

## Pass criterion
<e.g. treatment mean ≥ control mean + 1.0 over ≥3 runs>
```

## How to run

- **In-session:** spawn a control agent + a treatment agent (skill injected) on
  the task, then a blind judge. Repeat for variance.
- **Automated:** the `skill-creator` skill benchmarks skill performance with
  variance analysis — point it at a skill to compare with/without behavior.

## Seeded evals

Skills with concrete, judgeable behaviors where lift is demonstrable:

- `reviewing-sql` — does it catch a hidden join fan-out?
- `recon-before-action` — does it pick the highest-leverage extraction approach?
- `building-data-pipelines` — does it design for idempotency/backfill unprompted?
