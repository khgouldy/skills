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
| [fixing-and-merging-prs](skills/engineering/fixing-and-merging-prs/SKILL.md) | Take open PRs from red CI to merged without colliding with other agents. | original |

### productivity
| Skill | What it does | Source |
|---|---|---|
| [grilling](skills/productivity/grilling/SKILL.md) | Interrogate a plan relentlessly, one question at a time, until it's airtight. | inspired by Matt Pocock |
| [grill-with-docs](skills/productivity/grill-with-docs/SKILL.md) | A grilling session that captures decisions as ADRs and a glossary along the way. | inspired by Matt Pocock |
| [handoff](skills/productivity/handoff/SKILL.md) | Write a complete handoff doc so another session can pick up exactly where you left off. | inspired by Matt Pocock |
| [boil-the-ocean](skills/productivity/boil-the-ocean/SKILL.md) | Ship the complete, permanent solution — tests, docs, the real fix — not a workaround. | original |

### misc
| Skill | What it does | Source |
|---|---|---|
| [writing-great-skills](skills/misc/writing-great-skills/SKILL.md) | How to author a skill that triggers correctly and stays focused. | inspired by Matt Pocock |

## Thank Yous

This library stands on the shoulders of people who shared their skills openly.
We write our own prose, but the ideas, framing, and inspiration come from:

- **[Matt Pocock](https://github.com/mattpocock/skills)** — the structure of
  this repo (categories, `SKILL.md` convention, composable skills) and the
  grilling / TDD / diagnosing / handoff / writing-skills ideas all trace back to
  his excellent public skills repo.
- **Jeffrey** — concurrency-bug hunting and metamorphic testing are inspired by
  his skills catalog.

If your work inspired a skill here and you'd like different (or no) attribution,
open an issue — happy to adjust.

## License

[MIT](./LICENSE) © 2026 Kevin Green (par72)
