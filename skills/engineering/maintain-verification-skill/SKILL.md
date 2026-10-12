---
name: maintain-verification-skill
description: Use for the periodic upkeep of a project's verify-<app> skill and its feature map — "audit the verification skill", "the feature map is stale", /maintain-verification-skill, or as a scheduled daily pass. Reads every feature from source, drives every feature live, and ships at most one PR of proven corrections. Not for creating the skill in the first place, or for verifying one change.
disable-model-invocation: true
---

# Maintain a verification skill

A feature map is wrong a little more every time the app changes. This is the
upkeep pass for a project-local verification skill that has a feature map. The
unit of rigor is the feature: every feature file gets read against source and
exercised live.

## Finish with one outcome, and name it

- **clean**: every feature got source and live coverage and nothing needs
  changing. No branch, no PR.
- **changed**: one PR carries proven corrections to the docs, the harness, or
  the map.
- **blocked**: coverage could not finish, or a proven fix could not ship
  safely. Say exactly what stopped it.

## Edit only the verification skill

Touch its `SKILL.md`, its `features/`, and scripts it owns. Never edit product
code in this pass. When the map describes behavior the app no longer has, it is
either doc drift (fix the map) or a product regression (report it). Do not
rewrite the map to hide a regression.

## The pass

1. **Find the target.** The project skill with launch and drive sections and a
   feature map, usually `.claude/skills/verify-*/`. Several candidates: ask
   which. None: stop and say the project needs one created first.
2. **Index hygiene.** Compare the map's README against the files beside it. Fix
   missing, extra, duplicate, and dead entries.
3. **Source wave.** One read-only subagent per feature file, all at once. Each
   explains how the feature works from source, cites likely drift, and returns
   one short live recipe. They never drive the app and never edit files.
4. **Reconcile.** Merge overlapping recipes into as few app states as you can.
   Spot-check cited drift. Scan recent commits for user-facing surfaces the map
   lacks, and require a source path before calling one missing.
5. **Live pass.** Required even when source looks clean. You do all the
   driving, using the skill's own launch model. Exercise every feature once and
   hold three rules throughout:
   - Do not drive an instance you have not health-checked since it last did
     something surprising. Run doctor before the first drive and after any
     failed one. If doctor cannot see the failure, reset or relaunch.
   - Evidence captured so far survives every cleanup. Check its location; do
     not assume.
   - Nothing a drive started outlives its use. Clean up after failures too.

   A feature you cannot reach is `verified-unreachable` only with the concrete
   prerequisite (auth, entitlement, OS, external state) and the route you
   tried. If the map never mentioned that prerequisite, that is drift.
6. **Triage.** Wrong or missing user-side description: fix the map. Working
   behavior the harness cannot drive: fix the harness, then re-drive it live
   before shipping. Behavior that is actually broken: record it for the user and
   keep it out of this PR.
7. **Ship or stop.** For changed, re-read every changed file and open one PR.
   For clean or blocked, open nothing and report coverage honestly.

Keep run notes (features covered, unreachable prerequisites, confirmed drift,
outcome) in a scratch location. Do not commit them.

## Red flags

- Marking a feature covered from source alone
- "Fixing" the map to match a product bug
- Two PRs, or a PR that also touches product code
- A harness change that shipped without being driven live

---

_Inspired by Lauren Tan's maintain-verification-skill in the MIT-licensed [pstack](https://github.com/cursor/plugins/tree/main/pstack) plugin for Cursor. Prose is our own._
