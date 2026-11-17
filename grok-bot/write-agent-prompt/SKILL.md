---
name: write-agent-prompt
description: Use when keving asks for a prompt for another agent or a dispatch job. Produces a self-contained task prompt with base commit, scope, gates and report format.
---
# Write an agent prompt

Include, in under one page:
- Repo and absolute worktree path; base `origin/main` sha; bead id and title.
- The goal in one sentence; exact files in scope and out of scope.
- Hard rules: dev mode or not per the repo's AGENTS.md, reuse running services, no simulators unless needed, small PR, no `--admin`, no force-push, no `--no-verify`.
- Gate commands from the repo's AGENTS.md; run targeted tests first and the full suite once.
- PR description: short human-approved opener, agent write-up in a collapsed `<details>` block whose summary is the model and effort.
- Done criteria: tests added, PR not draft, roborev clean.
- Report line, last line only, then stop: `DISPATCH-DONE pr=<url> sha=<sha> tests=<summary>`.
Quote keving's words where they set scope.
