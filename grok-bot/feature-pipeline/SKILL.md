---
name: feature-pipeline
description: >-
  When the user wants a large feature planned by a strong model, broken into
  beads/tasks with dependencies, and delivered one bead at a time by dispatched
  coding agents (or asks to check, resume or report such a run), before you
  write a planning brief or dispatch anything.
---
# Feature pipeline: plan → beads → sequential delivery

Use the host's `feature-run` tool (docs: `~/GrokBot/docs/feature-pipeline.md`, templates: `~/GrokBot/templates/feature-pipeline/`). Don't hand-roll briefs, bead lists or dispatch loops.

## Steps
1. `feature-run doctor --repo <repo>`: fix anything not ok first (origin remote, base resolves, dispatcher, templates).
2. Write the feature description from the template `feature.md` (goal, scope, out of scope, constraints, done-when). Collect files the planner must read (`--context`) and repo rules (`--rules-file`).
3. `feature-run plan <slug> --repo <repo> --desc-file <md> [--model fable] [--context ...]`. It runs in the background and notifies "Plan ready". Tell the user, then stop.
4. Review: read `plan.md` and `beads.json` on `plan/<slug>`. Show the user the bead list (key, title, size, model, dependencies) and open questions. Wait for their go-ahead unless they asked for `--auto-run`. Edit with `feature-run import <slug> --file <edited.json> --force`.
5. `feature-run run <slug> [--integration chain|stack|main] [--model M]`. It runs one bead at a time through the dispatcher. Never dispatch beads yourself in parallel with it.
6. On a block notification: `feature-run status <slug>`, read that bead's job result/log, tell the user the reason, then follow the notification: `resume <slug> --retry KEY` (fresh job), `--resume-job KEY --prompt "..."` (same session), `--skip KEY`, or `--mark-done KEY --commit SHA` after a human did it.
7. When done: `feature-run report <slug>`; send the user the report with PR links.

## Rules
- Rehearse with `--dry-run` (plus `--simulate B2=timeout,...`) when trying a new repo or template change.
- Never merge, push to main, or commit `.beads/`. The runner and humans own merges and tracker status.
- Don't loosen dispatch caps or the memory gate, and don't raise parallelism to go faster.
- Don't use `--verify host` on repos whose test commands touch real data; leave the gate to the agent there.
- Model per bead: heavy models (fable/opus) only for design-heavy beads; default/sonnet for the rest. Use exactly the model and effort the user names.
- If beads already exist in the tracker, use `feature-run adopt` instead of re-planning, after checking no other routine is shepherding them.
