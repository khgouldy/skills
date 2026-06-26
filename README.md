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
```

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
  grilling / TDD / diagnosing / handoff / writing-skills ideas all trace back to
  his excellent public skills repo.
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

If your work inspired a skill here and you'd like different (or no) attribution,
open an issue — happy to adjust.

## License

[MIT](./LICENSE) © 2026 Kevin Gould (par72)
