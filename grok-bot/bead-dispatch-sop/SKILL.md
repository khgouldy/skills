---
name: bead-dispatch-sop
description: >-
  Standard operating procedure for any project bot that has coding work to do in
  a repo: never write code yourself or through subagents; create beads, dispatch
  agent-dispatch jobs (default Sonnet medium), let roborev review, then merge and
  close.
---
# Bead dispatch SOP

**Rule:** bots coordinate. They never write, fix or review code themselves, and never through their own subagents or executors. All code changes come from dispatched jobs.

## 1. Create the beads
- Use one epic per initiative and one bead per area or domain, not one bead per small detail.
- Each bead lists its items, the file paths, its acceptance criteria, and its dependencies (`bd dep`).
- Trunk-based by default (keving, Oct 30, 2026): each bead branches from origin/main and merges straight to main. Feature branches and stacked PRs are the exception, used only when keving asks for them.

## 2. Dispatch the jobs (on the Mac mini or the Air)
- Run `agent-dispatch` from `~/GrokBot/bin`.
- Pick the model (keving, Nov 12, 2026):
  - Default: omit `--model`/`--effort`; Claude jobs run Sonnet at medium effort on both Macs.
  - Haiku (`--model haiku --effort low`) only for read-only or single-file jobs.
  - Opus/Fable only for planning or design, at low or medium effort. agent-dispatch lowers Opus/Fable high/xhigh/max to medium unless you pass `--allow-high-effort`; use that only when keving explicitly asks.
  - free/cheap: `--tier free|cheap` still maps to `~/GrokBot/etc/models.env`.
- Every job runs `agent-dispatch doctor` as a preflight. A job that fails it ends with `run_status: preflight_failed` and says what to fix; fix that, don't re-dispatch blindly. Run `agent-dispatch doctor` on the Mac itself when it looks unhealthy.
- agent-dispatch's generated prompt already requires: DISPATCH-DONE only as the last line, then stop; `gh run watch`/`timeout` instead of sleep loops; paging or grepping big files; targeted tests first, then the full suite once. Repeat these if you write a task file yourself.
- Plan-only jobs don't need a Docker slot.
- Respect the concurrency caps in `dispatch-limits.env`, plus any per-project cap.
- The job prompt must:
  - check the base commit first
  - stay within the bead's scope
  - name the PR base branch
  - use only the repo's test and gate commands
  - include the repo's hard rules (no gate skips, no force-push, no destructive DB commands)
  - require this GitHub PR description pattern (keving, Nov 9, 2026; all projects): lead with a short human-approved opener (what the PR is for; a screenshot is fine); put the full agent-written description in a collapsed `<details><summary>` block, with the summary set to the model name and effort level; keep the longer text in the PR, hidden until expanded. Source: https://simonwillison.net/2026/Nov/9/details-summary/. `agent-dispatch` injects this into the generated prompt; still include it if you write a task file or brief yourself.
- **No duplicate jobs:** before re-dispatching a bead, check for a running or queued job for it and cancel the queued copy.
- **Keeper (keving, Nov 12, 2026: "we dont like idle work"):** on the Mac mini, `~/GrokBot/bin/dispatch-ready fill` runs every 18 min (launchd `com.kg.dispatch-ready`). It fills empty slots for hwo and opa (up to 3 each, jobs on both Macs counted), and skips the epics in each project's `skip_parents`, mobile/native beads, and UI Tuner (Ben Franklin's keeper owns it). Before you dispatch by hand, run `dispatch-ready status` or `dispatch-ready explain --project P` so you don't double-fill. To hand a job you launched to the chain, run `dispatch-ready adopt --project P --bead B --job ID`. Config and kill switches: `~/GrokBot/etc/dispatch-ready.json`.

## 3. Review
- roborev reviews every commit automatically.
- Read the roborev verdict; don't run your own review.
- Thinner loop (keving, Nov 12, 2026): add a separate Sonnet review job only when the diff hits the project's risk paths (hwo `review_policy: risk`). Re-review only after a HIGH finding is fixed. Turn MEDIUM and LOW findings into follow-up beads instead of more rounds on the same PR.
- Have every job rebase onto origin/main before its last push (put it in the task file or rules file), so the merge doesn't wait on a stale base.

## 4. The fix-up loop
- When CI fails or roborev reports a real finding, dispatch a new cheap job on the same branch.
- Its prompt quotes the failure or finding and limits the job to that fix.
- Never patch the code yourself.
- If a job stalls for about 45 minutes or more, cancel it and re-dispatch.
- Read `outcome` in result.json, not just `status`. `success_with_question` means the work finished (DISPATCH-DONE) but the agent raised a question (`question` field): answer it or pass it to keving; don't re-dispatch. `cost.usd` is the job's API list-price equivalent.

## 5. Merge and close
- Merge once CI is green and roborev is clean, following the project's merge rules.
- Never use `--admin`. Never force-push.
- Anything touching product, security, native or OTA, legal text or SMS copy waits for the owner's explicit OK. Auth and money PRs don't wait for keving (Nov 12, 2026): they merge on green after one clean Sonnet risk review, like other risk-path PRs.
- Merge each bead to main as soon as CI is green and roborev is clean. Don't keep draft PRs or add extra review rounds. Releases, deploys, EAS/OTA builds and anything keving explicitly held still need him. Never use --admin or force-push.
- Close a bead only when its work is on main.
- The chain merges for you (keving, Nov 12, 2026). `dispatch-ready chain` runs every 2 min and also when each job ends. It merges with `gh pr merge --squash --match-head-commit` once CI is green and roborev is clean. feature-run beads use the same gate (`dispatch-ready merge-check`). It never merges chi-sweep, anything prod/release/deploy, or a PR whose head changed. Anything it won't merge goes to `~/GrokBot/state/dispatch-ready/holds.jsonl`. Read the holds and act on them (verify and close ALREADY-DONE beads, pass owner-only items to keving). Don't merge held PRs by hand around the hold.

## 6. Report
- Report status with merge SHAs, job IDs, and anything held for the owner. Include each job's outcome and cost.usd.
- Read-only digests on the Mini (Nov 12, 2026):
  - `~/GrokBot/bin/decisions-list` writes `reports/decisions-YYYY-MM-DD.md` (holds, waiting approvals, jobs that need a person, PR counts).
  - `~/GrokBot/bin/pr-sweep` writes `reports/pr-sweep-YYYY-MM-DD.md` (stale >48 h and Dependabot PRs in Par72-Org and khgouldy).
  - `~/GrokBot/bin/approvals-pending` writes `reports/approvals-*.md` (escalated tool calls on both Macs).
  Point keving at these instead of rebuilding the lists by hand.
