---
name: bead-dispatch-sop
description: >-
  Standard operating procedure for any project bot that has coding work to do in
  a repo: never write code yourself or through subagents; create beads, dispatch
  cheap low-effort agent-dispatch jobs, let roborev review, then merge and
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
- Pick the cheapest tier that fits:
  - free/cheap: `--tier free|cheap`, which maps to the models in `~/GrokBot/etc/models.env`
  - Claude: `--model haiku --effort low`
- Plan-only jobs don't need a Docker slot.
- Respect the concurrency caps in `dispatch-limits.env`, plus any per-project cap.
- The job prompt must:
  - check the base commit first
  - stay within the bead's scope
  - name the PR base branch
  - use only the repo's test and gate commands
  - include the repo's hard rules (no gate skips, no force-push, no destructive DB commands)
- **No duplicate jobs:** before re-dispatching a bead, check for a running or queued job for it and cancel the queued copy.

## 3. Review
- roborev reviews every commit automatically.
- Read the roborev verdict; don't run your own review.

## 4. The fix-up loop
- When CI fails or roborev reports a real finding, dispatch a new cheap job on the same branch.
- Its prompt quotes the failure or finding and limits the job to that fix.
- Never patch the code yourself.
- If a job stalls for about 45 minutes or more, cancel it and re-dispatch.

## 5. Merge and close
- Merge once CI is green and roborev is clean, following the project's merge rules.
- Never use `--admin`. Never force-push.
- Anything touching product, money, auth, security, native or OTA, legal text or SMS copy waits for the owner's explicit OK.
- Merge each bead to main as soon as CI is green and roborev is clean. Don't keep draft PRs or add extra review rounds. Releases, deploys, EAS/OTA builds and anything keving explicitly held still need him. Never use --admin or force-push.
- Close a bead only when its work is on main.

## 6. Report
- Report status with merge SHAs, job IDs, and anything held for the owner.
