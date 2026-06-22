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

### productivity
| Skill | What it does | Source |
|---|---|---|
| [grilling](skills/productivity/grilling/SKILL.md) | Interrogate a plan relentlessly, one question at a time, until it's airtight. | inspired by Matt Pocock |
| [grill-with-docs](skills/productivity/grill-with-docs/SKILL.md) | A grilling session that captures decisions as ADRs and a glossary along the way. | inspired by Matt Pocock |
| [handoff](skills/productivity/handoff/SKILL.md) | Write a complete handoff doc so another session can pick up exactly where you left off. | inspired by Matt Pocock |
| [cross-critique](skills/productivity/cross-critique/SKILL.md) | Stress-test a high-stakes decision with independent critiques before committing. | inspired by Warp |
| [boil-the-ocean](skills/productivity/boil-the-ocean/SKILL.md) | Ship the complete, permanent solution — tests, docs, the real fix — not a workaround. | original |

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

## Work in progress

Experiments and drafts live in [`wip/`](./wip/) — outside `skills/`, so they
aren't auto-invoked or checked by CI until promoted. See
[`wip/README.md`](./wip/README.md) for the promotion flow.

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

If your work inspired a skill here and you'd like different (or no) attribution,
open an issue — happy to adjust.

## License

[MIT](./LICENSE) © 2026 Kevin Green (par72)
