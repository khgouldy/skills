---
name: beadflow
description: Use when the user wants a feature request or task turned into delegated, tracked implementation work — "beadflow this", "create beads and run them", "set this up for delegation", "plan, bead, and dispatch", or any ask to orchestrate implementation via the bd (beads) CLI with subagent executors.
---

# Beadflow

## Overview

Turn one prompt into shipped work: plan, **write the acceptance contract before any bead exists**, lock human decisions, create dependency-linked beads, calibrate each executor to how fully the work is specified, dispatch, review, then prove the contract on the merged tree.

Two principles carry the rest.

**Capability follows plan fidelity.** A task whose code and tests are already written needs a transcriber, not a thinker. Spend intelligence on planning and review, not on mechanical execution.

**Define the proof before the work.** Agents report success confidently whether or not they succeeded, so an executor's claim is never evidence. Decide what would prove each outcome, and how, before writing a single bead. Everything downstream is bookkeeping against that contract.

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

A plan that fully specifies code/tests is what lets Phase 5 assign cheap models. If you skip the plan, beads must carry that specification instead.

## Phase 2 — Acceptance contract

**Before any bead exists.** Write the list of observable outcomes that will be
true when this epic is done, and how each one gets proved. Beads are then derived
from this contract, not the other way round.

```
AC-1  <observable outcome, in the user's or operator's terms>
      Proof:  <exact command, test path, or artifact>
      Level:  1-4 (below)
      Beads:  (filled in at Phase 4)
```

| Level | Proof | Example in OPA |
|---|---|---|
| 1 | Automated test that fails on regression, runs in the gate | a `*.spec.ts` assertion |
| 2 | Command run once, output recorded on the bead | `npm run verify:ios:launch`, a migration dry run |
| 3 | Observable artifact a reviewer inspects | `scripts/qa` walker screenshots + judge, `npm run eval:ci` results |
| 4 | Attestation plus reviewed diff | docs, comments |

Push every line as far up the ladder as it will go. Level 4 requires a named
reviewer who is not the author. A line you cannot get past level 4 is a goal, not
an acceptance criterion: either restate it as something observable or drop it,
but do not let it ride as if it were checkable.

**Proof-as-code.** Where the level is 1, commit the failing test to the epic
branch *before* dispatching any bead. The proof is then version controlled, and
an executor weakening it shows up in a diff instead of passing silently. This is
the single highest-leverage step in the whole flow.

**Audit the contract against the beads, both directions** (after Phase 4):
a contract line with no bead is a hole in the plan; a bead tracing to no contract
line is scope creep. Do this before dispatching, when it is still free.

**The epic is done when every contract line's proof has passed on the merged
tree** — not when every bead is closed. Beads closing means the gate went green N
times in N separate worktrees. Nobody has run the contract on the integrated
result until Phase 7 does.

## Phase 3 — Human decisions

Collect only decisions that change the *shape* of the work (scope, product behavior, irreversible choices) — never implementation details.

- Use AskUserQuestion; put your recommendation FIRST, labeled "(Recommended)".
- User unavailable or doesn't answer → **choose the recommended option and proceed.** Never block.
- Every decision (asked or auto-chosen) is recorded verbatim as `LOCKED: <decision> — <rejected alternative + why>` in the epic description AND each affected bead. Executors must not re-litigate locked decisions.

## Phase 4 — Create beads

```bash
bd create "<feature>" --type epic -p 1 --silent -d "<goal + plan path + LOCKED decisions + PR grouping>" --design "<plan path>"
bd create "Task N: <name>" --parent $EPIC --deps <prereqs> -l tier:<model>,review:<mode>,pr:<group> --silent \
  -d "<what + key constraints + LOCKED decisions that bind it>" \
  --acceptance "<exact commands + expected results>"
```

- Dependencies encode build order — `bd ready` must show only genuinely unblocked work.
- Acceptance criteria are exact commands with expected output, never "tests pass".

### What goes in the bead

The bead is the whole interface to the executor. Carry intent, locations,
contracts and tests; do NOT carry implementation bodies.

```
WHY:        goal in 1-2 sentences, so a blocked executor decides correctly
WHERE:      exact file paths — the highest-value field; without it the
            executor burns turns (and your tokens) searching
INTERFACES: exact signatures this bead produces or consumes. The coordination
            points: a different name here breaks the dependent bead.
TESTS:      verbatim. Land as written or STOP and report.
LOCKED:     settled decisions + rejected alternative + why
ACCEPTANCE: exact command, and what its output must be
SCOPE:      paths it may touch, as prose — reviewed, not enforced
```

Implementation bodies stay out because a diff goes stale the moment a sibling
bead lands, and a diff that no longer applies is unfixable without the intent.
The planner also writes blind, with no typechecker and no test run; the executor
has both.

Tests are the exception because a test is the specification and the verification
at once. Paraphrasing it drops the precision that made it worth writing, and it
is pinned to behavior rather than code structure, so it does not drift.

If you cannot write a bead this way, the design is still unsettled and it belongs
to the planner (Phase 5).

## Phase 5 — Tier calibration

Assign per bead as labels (`tier:haiku|sonnet|sonnet-high|opus|grok`, effort low/medium/high). Rubric:

| Bead nature | Tier / effort |
|---|---|
| Code + tests fully written in plan; paste-and-run | haiku / low |
| Verbatim content but multi-file ripple or validation gates | haiku–sonnet / medium |
| Adapt given code into existing files; reuse existing test fixtures | sonnet / medium |
| Version-sensitive APIs, async/failure-path threading, DI ripple, fixture invention | sonnet / high |
| Genuinely open design, security/PII invariants with no spec to transcribe | opus (rare — good planning removes most of these) |

**`tier:grok`** routes a bead to a non-Anthropic executor where the repo has one
(in OPA: `scripts/grok-dispatch.sh`, see its header). This is a billing decision.
Implementation bills to a separate subscription while Anthropic spend stays on
planning and review.

**Route by verification asymmetry, not difficulty.** You cannot assess difficulty
before the work is done. Ask instead: *can I write a command that exits non-zero
if and only if this bead is wrong?*

| Answer | Route | Because |
|---|---|---|
| No | Planner keeps it | Verifying the executor costs what doing it costs |
| Yes, and WHERE/INTERFACES/TESTS are all writable | Executor | The gate is the review, so checking costs one command |
| Yes, but you cannot name the paths it touches | Split it until you can | You do not understand it well enough to delegate it |

Writing the executable acceptance command is what makes a bead delegable, and the
same act is what makes delegating it safe.

Default effort to `medium`: a bead that pins WHERE and INTERFACES and lands its
tests verbatim leaves only implementation open. That also makes effort a signal.
Consistently weak `medium` output means the beads are underspecified, and raising
it to `high` fixes the run while hiding that.

Do not wire per-bead path allowlists. A denied edit does not stop a goal-directed
executor, it displaces it: blocked from `libs/shared-types` it defines the type
locally in the app instead, and the gate goes green over a boundary violation. An
out-of-scope edit is loud in a diff review, a displaced one is silent. Keep SCOPE
as prose and let the review catch it. A short fixed deny list on paths no executor
should touch (migrations, CI workflows, env files) is different: it almost never
binds, and when it binds that is the right answer.

Uniform tiers are a smell in both directions: all-opus wastes the planning you already did; all-haiku ignores adaptation risk. Justify each assignment in one line.

## Phase 6 — Dispatch

One executor per bead, respecting `bd ready` order; parallelize only beads with no
shared files. Anthropic tiers dispatch as a subagent (`model` param from the tier
label). `tier:grok` beads dispatch through the repo's own dispatcher instead — in
OPA, `npm run grok:dispatch -- run <bead-id> [--base <feature-branch>]`, which
provisions the worktree, carries the contract below, verifies the gate and owns the
`bd close`. Run `--help` and read the script header rather than reconstructing its
flags here. Dispatch prompt contract — include, in order:

1. The bead's full description + acceptance criteria, and the plan task text (or path + task number).
2. Interfaces block: exact signatures this task consumes/produces.
3. "Tests specified in the plan land **verbatim**. If a test cannot pass as written, STOP and report — do not weaken, skip, or delete assertions."
4. "Run these exact commands and paste their final output: `<commands>`."
5. "Mark the bead: `bd update <id> --status in_progress` at start, `bd close <id>` only after commands pass."

## Phase 7 — Review

Two different questions get asked about finished work, and they need different
reviewers. Conflating them is why review gets skipped.

**Fidelity — did the executor do what the bead said?** Answerable from the bead
and the diff alone, so give the reviewer nothing else: a fresh subagent, no plan,
no epic, no conversation history. The blindness is the point. An orchestrator
reviewing its own bead supplies the missing spec from memory without noticing,
and reads the diff charitably against intent it never wrote down. A blind
reviewer cannot, so an ambiguous bead surfaces as "I cannot tell from this" —
which is the finding. Use a different vendor than the executor where you have
one; a Grok reviewer shares Grok's blind spots.

**Integration — was this the right thing to ask for, and does it compose?**
Needs the plan, the epic and the locked decisions, so only the orchestrator can
do it. Run it over the cumulative diff at each PR-group boundary, not per bead.

| Gate | When | Reviewer | Checks |
|---|---|---|---|
| Fidelity | Every bead, before dependents start | Fresh subagent, given only bead + diff | Test fidelity first (any weakened, removed or skipped assertion), then whether the diff does what the bead says and only that |
| Integration | Each PR-group boundary | Orchestrator, cumulative diff | Naming and signature drift between beads, locked-decision violations, invariant grep (PII, no-op contracts) |
| Final | Before ship | Orchestrator | Full build/lint/test gate, acceptance criteria traced against what landed |

Findings go back to the original executor with its context intact: `SendMessage`
for a subagent, `grok:dispatch -- feedback <bead-id> "<findings>"` for a
`tier:grok` bead, which resumes that bead's session. Locked-decision conflicts
escalate to the human; a reviewer never "fixes" one.

A `tier:grok` bead reaching `closed` means only that its gate exited 0. Fidelity
review is still owed, and a closed bead is still unmerged.

## Phase 8 — Integration and proof

Bead branches are not the deliverable. Each one passed its gate alone, in its own
worktree, against the base it started from; nothing has yet run on the combination.

1. Merge every bead branch into the epic branch. Conflicts here are the first
   honest signal that two beads disagreed.
2. Re-run the **full acceptance contract** on that merged tree. Every AC line,
   every level. This is the only run that counts.
3. Record each line's result against its AC id. An unproved line blocks the epic
   even when all its beads are closed.
4. One PR from the epic branch to main, per repo convention (draft, local gate,
   promote). Then `bd close $EPIC`.

If a contract line fails here, the bead that owned it reopens. Do not patch the
integration branch directly: the fix belongs where the review trail is.

## Red flags

- Beads created before the acceptance contract exists
- An acceptance criterion that no command or artifact can settle
- "All beads closed" reported as "done" without a contract run on the merged tree
- An executor's own claim of success accepted as the proof
- Writing a plan doc for a one-file change (the bead is the plan)
- Blocking on a question the recommendation already answers
- Every bead assigned the same tier
- An executor "adapting" a plan-specified test instead of stopping and reporting

---
_original — distilled from a live orchestration session (2026-07-10): implementation plan → beads epic → per-bead model-tier calibration → tiered dispatch and review. Tested RED/GREEN with subagent scenarios before deployment._
