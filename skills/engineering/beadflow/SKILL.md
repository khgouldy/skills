---
name: beadflow
description: Use when the user wants a feature request or task turned into delegated, tracked implementation work — "beadflow this", "create beads and run them", "set this up for delegation", "plan, bead, and dispatch", or any ask to orchestrate implementation via the bd (beads) CLI with subagent executors.
---

# Beadflow

## Overview

Turn one prompt into shipped work: gate on planning, lock human decisions, create dependency-linked beads, **calibrate each executor's model to how fully the work is specified**, dispatch, and review only where mechanical gates leak.

Core principle: **capability follows plan fidelity**. A task whose code and tests are already written needs a transcriber, not a thinker. Spend intelligence on planning and review, not on mechanical execution.

## Phase 0 — Intake & bootstrap

1. Restate the goal in one sentence; identify the repo and branch.
2. `bd ready` to confirm beads works. If uninitialized: `bd init --prefix <repo>` — **from the main repository checkout, not a worktree** (bd refuses inside worktrees; the DB is shared).

## Phase 1 — Plan gate

Write a plan document ONLY when highly necessary. Predicate (any one → plan):

| Signal | Plan? |
|---|---|
| Touches ≥3 modules/apps, or schema migration, or new external service | Yes — **REQUIRED SUB-SKILL:** superpowers:writing-plans (real code + real tests per task) |
| Cross-task interfaces (task B consumes task A's signatures) | Yes |
| ≤2 files, no new interfaces, no migration | No — the bead description IS the spec: exact file paths, acceptance criteria, verification commands |

A plan that fully specifies code/tests is what lets Phase 4 assign cheap models. If you skip the plan, beads must carry that specification instead.

## Phase 2 — Human decisions

Collect only decisions that change the *shape* of the work (scope, product behavior, irreversible choices) — never implementation details.

- Use AskUserQuestion; put your recommendation FIRST, labeled "(Recommended)".
- User unavailable or doesn't answer → **choose the recommended option and proceed.** Never block.
- Every decision (asked or auto-chosen) is recorded verbatim as `LOCKED: <decision> — <rejected alternative + why>` in the epic description AND each affected bead. Executors must not re-litigate locked decisions.

## Phase 3 — Create beads

```bash
bd create "<feature>" --type epic -p 1 --silent -d "<goal + plan path + LOCKED decisions + PR grouping>" --design "<plan path>"
bd create "Task N: <name>" --parent $EPIC --deps <prereqs> -l tier:<model>,review:<mode>,pr:<group> --silent \
  -d "<what + key constraints + LOCKED decisions that bind it>" \
  --acceptance "<exact commands + expected results>"
```

- Dependencies encode build order — `bd ready` must show only genuinely unblocked work.
- Acceptance criteria are exact commands with expected output, never "tests pass".

## Phase 4 — Tier calibration

Assign per bead as labels (`tier:haiku|sonnet|sonnet-high|opus`, effort low/medium/high). Rubric:

| Bead nature | Tier / effort |
|---|---|
| Code + tests fully written in plan; paste-and-run | haiku / low |
| Verbatim content but multi-file ripple or validation gates | haiku–sonnet / medium |
| Adapt given code into existing files; reuse existing test fixtures | sonnet / medium |
| Version-sensitive APIs, async/failure-path threading, DI ripple, fixture invention | sonnet / high |
| Genuinely open design, security/PII invariants with no spec to transcribe | opus (rare — good planning removes most of these) |

Uniform tiers are a smell in both directions: all-opus wastes the planning you already did; all-haiku ignores adaptation risk. Justify each assignment in one line.

## Phase 5 — Dispatch

One subagent per bead (`model` param from its tier label), respecting `bd ready` order; parallelize only beads with no shared files. Dispatch prompt contract — include, in order:

1. The bead's full description + acceptance criteria, and the plan task text (or path + task number).
2. Interfaces block: exact signatures this task consumes/produces.
3. "Tests specified in the plan land **verbatim**. If a test cannot pass as written, STOP and report — do not weaken, skip, or delete assertions."
4. "Run these exact commands and paste their final output: `<commands>`."
5. "Mark the bead: `bd update <id> --status in_progress` at start, `bd close <id>` only after commands pass."

## Phase 6 — Tiered review

| Gate | When | Reviewer | Checks |
|---|---|---|---|
| Spot-check | After every haiku-tier bead, before dependents start | Orchestrator (you), diff-read | Matched plan verbatim; no unrelated files; claimed commands actually ran |
| Targeted | Only beads labeled `review:targeted` (failure-path logic, security/PII, version-sensitive APIs) | Strong model, plan in context | **Test fidelity FIRST** — any weakened/removed/skipped plan assertion — then implementation divergence |
| Boundary | At each PR-group boundary | Strong model over cumulative diff | Cross-task drift: naming/signature divergence between tasks, locked-decision violations, invariant grep (PII, no-op contracts) |
| Final | Before ship | Orchestrator | Full build/lint/test gate + acceptance-criteria traceability vs what landed |

Do NOT individually review mechanical beads beyond the spot-check — green specified-tests + CI is their gate. Review findings go back to the **original executor via SendMessage** (context intact); locked-decision conflicts escalate to the human, never get "fixed" by a reviewer.

Ship per repo wrap-up convention (commit, push, PR, CI-green loop), then `bd close $EPIC`.

## Red flags

- Writing a plan doc for a one-file change (the bead is the plan)
- Blocking on a question the recommendation already answers
- Every bead assigned the same tier
- Reviewing every bead individually, or skipping review on `review:targeted` beads
- An executor "adapting" a plan-specified test instead of stopping and reporting

---
_original — distilled from a live orchestration session (2026-07-10): implementation plan → beads epic → per-bead model-tier calibration → tiered dispatch and review. Tested RED/GREEN with subagent scenarios before deployment._
