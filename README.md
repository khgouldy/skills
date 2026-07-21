# skills

A personal library of [Claude Code](https://claude.com/claude-code) **skills** —
reusable units of agent behavior. Some are inspired by excellent public skill
repos (credited below); some are original, distilled from how I actually work.

A *skill* is a folder with a `SKILL.md` that Claude either fires automatically
(model-invoked) or that you run as a slash command (user-invoked). See
[`CONTEXT.md`](./CONTEXT.md) for the vocabulary and [`CLAUDE.md`](./CLAUDE.md)
for how to add one.

## Install

This repo is structured to become an installable plugin later. For now, use the
skills by symlinking or copying them into your Claude Code skills directory:

```bash
git clone https://github.com/khgouldy/skills.git
# copy individual skills into ~/.claude/skills/, e.g.
cp -r skills/skills/engineering/recon-before-action ~/.claude/skills/
# or symlink so git pull updates Claude immediately:
# ln -sfn "$(pwd)/skills/engineering/prototype" ~/.claude/skills/prototype
```

### Tracking upstream authors (Matt, etc.)

Inspired skills here are **rewrites**, not live mirrors. Pulling this repo does
not pull Matt Pocock's latest text.

To install and update an author's original skills into your agent:

```bash
npx skills@latest add mattpocock/skills -g -s prototype -s grilling -y
npx skills@latest add will-ness-ai/skills -g -s grilling-frontend-prototyping -y
# later:
npx skills update -g -y
```

Or use the author's Claude Code plugin (always-current, not meant for forking).
When you want a change reflected *in this library*, read upstream, fold the idea
into our prose, and bump the skill here.

## Catalog

### engineering
| Skill | What it does | Source |
|---|---|---|
| [recon-before-action](skills/engineering/recon-before-action/SKILL.md) | Pick the fastest viable way to get data/build an integration before writing code — a speed hierarchy + complexity gate. | original |
| [tdd](skills/engineering/tdd/SKILL.md) | Drive implementation test-first: red → green → refactor. | inspired by Matt Pocock |
| [diagnosing-bugs](skills/engineering/diagnosing-bugs/SKILL.md) | Find a bug's root cause through evidence before proposing any fix. | inspired by Matt Pocock |
| [finding-concurrency-bugs](skills/engineering/finding-concurrency-bugs/SKILL.md) | Hunt deadlocks, races, livelocks, and await-holding-lock defects. | inspired by Jeffrey |
| [metamorphic-testing](skills/engineering/metamorphic-testing/SKILL.md) | Test systems with no obvious "correct answer" by asserting input/output relationships. | inspired by Jeffrey |
| [create-pr](skills/engineering/create-pr/SKILL.md) | Open a reviewable PR: focused diff, self-review, a description a reviewer can act on. | inspired by Warp |
| [resolve-merge-conflicts](skills/engineering/resolve-merge-conflicts/SKILL.md) | Resolve conflicts by honoring both sides' intent — never blindly accept one side. | inspired by Warp |
| [fixing-and-merging-prs](skills/engineering/fixing-and-merging-prs/SKILL.md) | Take open PRs from red CI to merged without colliding with other agents. | original |
| [arena](skills/engineering/arena/SKILL.md) | Generate several candidates for one task in parallel, pick a base, graft the best parts of the rest into it. | inspired by pstack |
| [blast-radius](skills/engineering/blast-radius/SKILL.md) | Find what a change breaks *beyond its diff*, then prove the one safety-critical fact by running real code. | inspired by pstack |
| [why](skills/engineering/why/SKILL.md) | Recover the *rationale* behind code from git, tickets, docs, chat, and observability — cited, with confidence calibrated. | inspired by pstack |
| [deslop](skills/engineering/deslop/SKILL.md) | Strip AI tells from *code* in a diff: stray comments, defensive guards on trusted paths, `any` casts, deep nesting. | inspired by cursor-team-kit |
| [control-ui](skills/engineering/control-ui/SKILL.md) | Drive a real web/IDE/Electron UI locally to verify behavior with evidence — screenshots, snapshots, profiles, repros. | inspired by cursor-team-kit |
| [beadflow](skills/engineering/beadflow/SKILL.md) | Turn a prompt into delegated, tracked work: plan gate → beads epic → per-bead model-tier calibration → tiered dispatch and review. | original |
| [prototype](skills/engineering/prototype/SKILL.md) | Throwaway runnable artifact that answers one design question — logic TUI or multi-variant UI mock. | inspired by Matt Pocock |
| [grilling-frontend-prototyping](skills/engineering/grilling-frontend-prototyping/SKILL.md) | Grilling session where each question is asked with live UI prototypes, not words. | inspired by will-ness-ai / Matt Pocock |
| [improve-harness](skills/engineering/improve-harness/SKILL.md) | Improve the environment around a fixed model: baseline a job, find the earliest gap, make the smallest reversible intervention, fresh-rerun, retain/revise/remove. | inspired by Ryan Lopopolo / harness-engineering |
| [prove-the-outcome](skills/engineering/prove-the-outcome/SKILL.md) | Match evidence to the user/ops claim before calling work done — internal green is not enough. | inspired by Ryan Lopopolo / harness-engineering |
| [feedback-to-infrastructure](skills/engineering/feedback-to-infrastructure/SKILL.md) | Promote recurring corrections into the smallest durable owner and clean the failure class, not just the instance. | inspired by Ryan Lopopolo / harness-engineering |
| [authority-boundary](skills/engineering/authority-boundary/SKILL.md) | Separate capability (how) from authority (who/may) at merge, deploy, secrets, and other consequential boundaries. | inspired by Ryan Lopopolo / harness-engineering |

### productivity
| Skill | What it does | Source |
|---|---|---|
| [grilling](skills/productivity/grilling/SKILL.md) | Interrogate a plan relentlessly, one question at a time, until it's airtight. | inspired by Matt Pocock |
| [grill-with-docs](skills/productivity/grill-with-docs/SKILL.md) | A grilling session that captures decisions as ADRs and a glossary along the way. | inspired by Matt Pocock |
| [handoff](skills/productivity/handoff/SKILL.md) | Write a complete handoff doc so another session can pick up exactly where you left off. | inspired by Matt Pocock |
| [cross-critique](skills/productivity/cross-critique/SKILL.md) | Stress-test a high-stakes decision with independent critiques before committing. | inspired by Warp |
| [boil-the-ocean](skills/productivity/boil-the-ocean/SKILL.md) | Ship the complete, permanent solution — tests, docs, the real fix — not a workaround. | original |
| [unslop](skills/productivity/unslop/SKILL.md) | Strip AI tells from *prose* and add a human voice — docs, PRs, comments, reports. | inspired by pstack |
| [show-me-your-work](skills/productivity/show-me-your-work/SKILL.md) | Keep a reviewable decision-trail log (one TSV row per decision) for long or unattended work. | inspired by pstack |
| [whole-job](skills/productivity/whole-job/SKILL.md) | Own the full trajectory through proof, review, delivery, and post-verify — don't stop at "code written." | inspired by Ryan Lopopolo / harness-engineering |

### data
| Skill | What it does | Source |
|---|---|---|
| [writing-dbt-models](skills/data/writing-dbt-models/SKILL.md) | dbt craft: staging→intermediate→marts layering, ref/source, materializations, tests, docs. | original |
| [dbt-incremental-models](skills/data/dbt-incremental-models/SKILL.md) | Incremental correctness: unique_key, is_incremental(), late-arriving data, full-refresh. | original |
| [reviewing-sql](skills/data/reviewing-sql/SKILL.md) | Analytical SQL correctness: join fan-out, NULL semantics, GROUP BY grain, window dedup. | original |
| [data-quality-checks](skills/data/data-quality-checks/SKILL.md) | Validate pipeline output: counts, nullability, uniqueness, freshness, referential integrity. | original |
| [dimensional-modeling](skills/data/dimensional-modeling/SKILL.md) | Facts/dims, declaring the grain, keys, SCDs, additivity. | original |
| [building-data-pipelines](skills/data/building-data-pipelines/SKILL.md) | Extract→Land→Transform→Load separation, idempotency, backfills, watermarks. | original |
| [bigquery-superpowers](skills/data/bigquery-superpowers/SKILL.md) | Partition/cluster, prune bytes scanned, dry-run cost, bulk extract/load. | original |

### misc
| Skill | What it does | Source |
|---|---|---|
| [writing-great-skills](skills/misc/writing-great-skills/SKILL.md) | How to author a skill that triggers correctly and stays focused. | inspired by Matt Pocock |

### principles

Small, model-invoked *mental-model* skills that nudge a decision at the right
moment rather than running a procedure. They live under `engineering/` and
`productivity/` but read as a family.

| Skill | What it does | Source |
|---|---|---|
| [foundational-thinking](skills/engineering/foundational-thinking/SKILL.md) | Get the data structures right first; scaffold before features; isolate shared state. | inspired by pstack |
| [redesign-from-first-principles](skills/engineering/redesign-from-first-principles/SKILL.md) | Fold a new requirement in as if it had been there on day one — don't bolt it on. | inspired by pstack |
| [minimize-reader-load](skills/engineering/minimize-reader-load/SKILL.md) | Optimize for the reader: count layers to trace and state to hold; collapse and shrink both. | inspired by pstack |
| [exhaust-the-design-space](skills/engineering/exhaust-the-design-space/SKILL.md) | When the answer isn't obvious, build 2-3 alternatives and compare before committing. | inspired by pstack |
| [make-operations-idempotent](skills/engineering/make-operations-idempotent/SKILL.md) | Design operations to converge to the same end state across crashes, restarts, and retries. | inspired by pstack |
| [fix-root-causes](skills/engineering/fix-root-causes/SKILL.md) | Fix at the source; refuse guards that just silence a symptom. | inspired by pstack |
| [experience-first](skills/productivity/experience-first/SKILL.md) | Choose the consumer's experience over implementation convenience; ship fewer, more polished things. | inspired by pstack |

### harness (cross-cutting)

Environment-loop skills distilled from harness engineering. They sit in
`engineering/` and `productivity/` above but form a family: hold the worker
fixed, improve context/tools/authority/proof/feedback, close whole jobs.

| Skill | What it does | Source |
|---|---|---|
| [improve-harness](skills/engineering/improve-harness/SKILL.md) | Bounded baseline → gap → intervention → fresh rerun | harness-engineering |
| [prove-the-outcome](skills/engineering/prove-the-outcome/SKILL.md) | Claim-matched evidence at the real boundary | harness-engineering |
| [feedback-to-infrastructure](skills/engineering/feedback-to-infrastructure/SKILL.md) | Recurring pain → durable owner + class cleanup | harness-engineering |
| [whole-job](skills/productivity/whole-job/SKILL.md) | Lifecycle ownership through delivery | harness-engineering |
| [authority-boundary](skills/engineering/authority-boundary/SKILL.md) | Can vs may at consequential gates | harness-engineering |

## Work in progress

Experiments and drafts live in [`wip/`](./wip/) — outside `skills/`, so they
aren't auto-invoked or checked by CI until promoted. See
[`wip/README.md`](./wip/README.md) for the promotion flow.

## Evals

Trigger evals (does a skill fire when it should, and stay quiet otherwise?) live
in [`evals/`](./evals/). They measure the most objective property of a skill —
activation precision/recall — for the skills most likely to collide over the same
prompts. See [`evals/README.md`](./evals/README.md) for the format and scoring.

CI (`scripts/validate-skills.mjs`) checks SKILL.md frontmatter **and** the
invocation-dependency rule (a user-invoked skill must not invoke another
user-invoked skill).

## Thank Yous

This library stands on the shoulders of people who shared their skills openly.
We write our own prose, but the ideas, framing, and inspiration come from:

- **[Matt Pocock](https://github.com/mattpocock/skills)** — the structure of
  this repo (categories, `SKILL.md` convention, composable skills) and the
  grilling / TDD / diagnosing / handoff / writing-skills / prototype ideas all
  trace back to his excellent public skills repo.
- **[will-ness-ai](https://github.com/will-ness-ai/skills)** — the
  `grilling-frontend-prototyping` composition (grilling + live UI variants) is
  inspired by their fork of Matt's skills set.
- **Jeffrey** — concurrency-bug hunting and metamorphic testing are inspired by
  his skills catalog.
- **[Warp](https://github.com/warpdotdev/common-skills)** — the PR-creation,
  merge-conflict, and cross-critique skills are inspired by Warp's MIT-licensed
  common-skills repo.
- **[Lauren Tan (poteto)](https://github.com/cursor/plugins/tree/main/pstack)** —
  the `arena`, `blast-radius`, `why`, `unslop`, `show-me-your-work` skills and the
  whole **principles** family (foundational-thinking, redesign-from-first-principles,
  minimize-reader-load, exhaust-the-design-space, make-operations-idempotent,
  fix-root-causes, experience-first) are inspired by her MIT-licensed `pstack`
  plugin for Cursor.
- **[Cursor](https://github.com/cursor/plugins/tree/main/cursor-team-kit)** — the
  `deslop` and `control-ui` skills are inspired by Cursor's MIT-licensed
  `cursor-team-kit` plugin.
- **[Ryan Lopopolo](https://github.com/lopopolo/harness-engineering)** and the
  OpenAI [Harness engineering](https://openai.com/index/harness-engineering/)
  essay — the `improve-harness`, `prove-the-outcome`,
  `feedback-to-infrastructure`, `whole-job`, and `authority-boundary` skills
  distill ideas from that CC BY 4.0 corpus and related writing; prose here is
  our own rewrite for this library's skill shape.

If your work inspired a skill here and you'd like different (or no) attribution,
open an issue — happy to adjust.

## License

[MIT](./LICENSE) © 2026 Kevin Gould (par72)
