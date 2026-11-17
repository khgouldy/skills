---
name: dispatch-ready-beads
description: >-
  Use when asked to 'dispatch a few beads' or 'dispatch these beads <ids>' (or the loop has nothing it may pick
  up): pick a small batch of safe ready beads, write task files from a shared
  rules block, launch them as cheap jobs, and register them so the coordinator
  loop owns them.
---
# Dispatch ready beads

Generic recipe. Project specifics (machine, repo, task-file folder, rules file, caps, held list) live in the project bot's memory and its loop routine.

## Keeper first (keving, Nov 12, 2026)
On the Mac mini, `dispatch-ready fill` already tops up hwo and opa every 18 min. Before picking by hand, run `dispatch-ready explain --project P` to see why each ready bead would be picked or skipped. If you only want the keeper to fill now, run `dispatch-ready fill --project P` (add `--dry-run` to preview). Use the manual recipe below for named beads, for projects the keeper doesn't cover, or when the keeper skips a bead keving wants started.

## 0. Named beads
If keving names beads, use exactly those, still applying the step 2 overlap and hold checks, and report any he named that you held back.

## 1. Check state (one command)
- Fetch origin; note main's short sha.
- `bd ready` (top 20) plus `bd show` on the candidate beads.
- List running dispatch jobs for this project and compare against the project's job cap.

## 2. Pick 2 to 4 beads
Take a bead only when all of these are true:
- It is code work a job can finish headless (not ops, credentials, store or console steps, or a decision only the owner can make).
- It is not held, not urgent-owned elsewhere, and has no question pending with the owner.
- No running job already covers it.
- No two picked beads edit the same screens or files. Hold back the overlapping one and say why.
Prefer children of an epic the owner just prioritized, then bugs found in recent reviews.

## 3. Write the task files
- One file per bead, named `<bead-id>.md`, in the project's task folder.
- Use write-agent-prompt for the body. Body: bead id and title, `bd show` pointer, goal, concrete files, acceptance criteria, and the tests to add.
- Append the project's shared rules file verbatim (base-commit check, repo hard rules, gate commands, PR-not-draft, don't close the bead, report back PR/sha/tests).
- Mobile or UI beads: note that before/after screenshots are needed before merge.

## 4. Launch
- Launch each with the dispatcher in the background, using the default model (omit `--model`/`--effort`: Sonnet medium). Use Haiku only for read-only or single-file beads; never Opus/Fable high without keving's explicit OK (`--allow-high-effort`). Give the branch as `feat/<bead>-<slug>` or `fix/<bead>-<slug>`, base origin/main, and the docker slot only for backend-test jobs. Set a timeout.
- Confirm each job id appears in the dispatch folder.
- If a job ends `preflight_failed`, report the doctor's fix line instead of relaunching.

## 5. Register ownership
- Append one line per job to the project's owned-jobs ledger: job id, bead, branch, and the merge rule (auto-merge on green, or hold for screenshots or owner OK).
- The coordinator loop reads this ledger and treats those jobs as its own, so it reviews, fixes and merges them instead of skipping them as unknown.
- For hwo or opa, also run `dispatch-ready adopt --project P --bead B --job ID` so the keeper's chain reviews, fixes and merges the job when it ends. Without this, the chain leaves jobs it didn't start alone.

## 6. Report
One short message: which beads started and what each does, which were held back and why, and how each will merge.
