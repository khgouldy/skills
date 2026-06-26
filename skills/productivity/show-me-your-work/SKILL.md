---
name: show-me-your-work
description: Use when a human will review long-running, unattended, or multi-phase work after the fact and needs to trust the result without rerunning it or reading the whole transcript — keep a reviewable decision trail. Triggers include "keep a decision log", "show your work", a big migration or cross-language port, an autonomous/loop run, or any work where confidence has to be shown rather than assumed.
disable-model-invocation: true
---

# Show me your work

For work a human reviews after the fact, a decision trail lets them reconstruct
what was decided, why, and on what evidence — without rerunning the work or
reading the whole transcript. Keep one canonical log so the trail is consistent
and a future agent can find it.

## The format

A single TSV file, one row per decision. TSV because GitHub renders it as a
sortable table, `column -s$'\t' -t` and spreadsheets read it, and a row appends
with one command. Cells stay single-line; evidence is a pointer, not prose.

Copy `references/decision-log-template.tsv` (just the header) to start a clean
log. Columns:

- **ts** — ISO-8601 timestamp; the timeline axis.
- **phase** — the phase or workstream.
- **decision** — what was chosen or done, one line.
- **why** — the reason in plain words (e.g. `explored options first, this was a
  one-way door`).
- **evidence** — a link or path that proves it: commit SHA, PR number,
  `file:line`, or a path to an artifact, trace, or screenshot. Never a paragraph.
- **result** — the outcome: `tests green`, `reverted`, `pixel-diff 0`,
  `INCONCLUSIVE`, `open`.

Illustration only — don't copy these rows into a real log:

```
ts	phase	decision	why	evidence	result
2026-05-24T09:02:00Z	frame	counted the work first, ~100 components	wanted the size before a long run	commit 3a9f1c2	found 5 things to sort out first
2026-05-24T09:40:00Z	harness	snapshotted the old UI before touching it	so we can diff old vs new	scripts/snapshot.sh	120 baseline screenshots
2026-05-24T11:15:00Z	widget	ported widget styles, no visual change	keep it small and identical	commit 7c21e0a	pixel-diff 0, tests pass
2026-05-24T12:30:00Z	widget	threw out a helper's work, screenshots were blank	checked real files, not its summary	worktree reset	reverted, tightened instructions
```

## Logging a row

Write each entry the way you'd tell a teammate what you did — plain words,
concrete actions, no jargon (the [unslop](../unslop/SKILL.md) standard applies to
log text too). A reviewer should understand each row without decoding it.

Use the helper so rows stay well-formed:
`scripts/log.sh <logfile> <phase> <decision> <why> <evidence> <result>`. It
stamps `ts`, writes the header on first use, strips stray tabs/newlines, and
prefixes any cell starting with `=`, `+`, `-`, or `@` with a single quote so that
generated or user-supplied text (a PR title, a filename) can't execute as a
formula when a reviewer opens the log in a spreadsheet.

Log **decision points and checkpoints, not every action**: a fork chosen, a unit
completed with its verification result, a pivot or revert with its trigger, a
blocker surfaced, a gate fixed. For loop runs, one row per iteration. Skip the
trivial and self-evident.

## Where it lives

By default the log is a working artifact, **not committed**: keep it at
`decisions.tsv` in the work dir (or `.audit/<task-slug>.tsv` when several efforts
run at once) and leave it out of git. The local log keeps the run honest and can
be discarded after.

Commit it only when the work is ambitious enough that a reviewer needs the trail
to trust the result — a large cross-language port, a multi-week migration,
anything where confidence has to be shown. A committed log renders as a table in
the PR.

## Rules

- **One row = one decision or checkpoint.** If it won't fit on one line, the
  decision isn't crisp yet.
- **Append-only.** A wrong call gets a *new* row that supersedes it. Never edit or
  delete history.
- **Prefer evidence from committed scripts** over hand-made one-offs, so a
  reviewer can re-run it.

## Before handing back

- **Audit the log against what actually happened.** Every row maps to a real
  action; every evidence pointer resolves and shows what the row claims; a fork
  or abandoned approach that shaped the work but isn't logged is a gap — add it.
  Fix the log, not the story.
- **Cross-check with fresh eyes.** Where you can, have an independent reviewer
  (a subagent on a different model is ideal) read the trail and flag what the user
  should still scrutinize: decisions with weak evidence, verification steps
  claimed without proof, choices that look risky in hindsight. Self-review is not
  a substitute for the eyes you can't bring yourself.

Pairs with [handoff](../handoff/SKILL.md) (the decision trail is exactly the
"why" a handoff doc needs to bring the next session up to speed).

---

_Inspired by the `show-me-your-work` skill in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose, template, and logger are our own adaptation; Cursor-specific transcript paths generalized for Claude Code._
