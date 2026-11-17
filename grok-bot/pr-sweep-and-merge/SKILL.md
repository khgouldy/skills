---
name: pr-sweep-and-merge
description: Use when keving asks to sweep, check or merge open PRs. List open PRs per repo, check CI and roborev, dispatch fixes for failures, and merge only what is green and allowed by the repo's merge policy.
---
# PR sweep and merge

1. For each repo: `gh pr list --state open`. For each PR check CI, roborev on HEAD (`roborev review HEAD --wait` if none), draft state, and mergeability.
2. Green CI, roborev pass, not a draft, and the repo's policy allows it (read AGENTS.md "Git, PRs and merging"): `gh pr merge --squash`.
3. Never `--admin`, never force-push, never bypass required checks. chi-sweep merges, docs/agent-instruction PRs in hwo, and anything on a repo's hold list wait for keving.
4. CI or roborev red: dispatch one fix job per PR (bead-dispatch-sop). Don't fix it yourself.
5. Report in one table: merged (link and sha), waiting on keving (why), fixing (job id).
