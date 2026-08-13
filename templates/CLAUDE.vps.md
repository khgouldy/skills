# Global instructions — VPS (agent-hub control plane host)

This machine is the **rented Linux VPS that runs agent-hub** — the sole control
plane for the software factory (queue, schedule, policy, run system-of-record).
It is replaceable compute: durable state lives in Postgres (hourly-verified
backups) and the private R2 bucket, never only on this disk.

## Orient here first

| What | Where |
|---|---|
| agent-hub (control plane) | `/home/kg/projects/agent-hub` |
| Canonical factory plan (locked L1–L7) | `agent-hub/docs/software-factory.md` |
| Control-plane lock (hub is the only flywheel) | `agent-hub/docs/flywheel-control-plane.md` |
| Ratified fleet architecture + work list | `agent-hub/reports/factory/2026-08-13-system-of-record-synthesis.md` (§8) |
| bd 1.x server probe + migration runbook | `agent-hub/reports/factory/2026-08-13-bd-1.2.1-probe.md` |
| Product repos | `/home/kg/projects/rosterhq`, `/home/kg/projects/opa` (clone if missing) |
| Stack | systemd `agenthub-*` units; docker: postgres, hatchet, ntfy |

Each repo's own `CLAUDE.md`/`AGENTS.md` governs work inside it. Read it before
touching anything.

## Hard rules on this host

- **One control plane.** Never stand up a second scheduler/cron system beside
  agent-hub for work it already owns. New recurring work = an agent-hub job.
- **Never trigger GitHub Actions.** Minutes are org-shared. PRs open as drafts;
  each repo's own promote flow decides when CI runs.
- **The run/beads ledgers are authoritative.** agent-hub Postgres owns runs;
  the (Dolt-backed) beads ledger owns work-item state. Record outcomes there,
  not in ad-hoc files. JSONL exports are interchange, not truth — never
  hand-edit `issues.jsonl`.
- **Claims vs measurements.** An agent's report of "done/green" is a claim;
  only something the harness re-ran is a measurement. Only measurements close
  work. Keep the distinction in anything you write or report.
- **Work-item URI.** Every branch, commit (`Work-Item: <id>` trailer), PR
  title, run record, and archive object carries the bead/Linear id it serves.
  One id per unit of work.
- **Secrets** stay in the secret store / env; never in repos, crontabs, or
  archives. Coding agents never get private R2 keys (hub services only).
- **systemd/docker restarts** of shared services (`agenthub-*`, postgres,
  hatchet, dolt) affect every running agent — check for live runs first
  (`runs` table) and prefer draining over killing.
- Postgres backups are content-addressed with a `latest.json` pointer moved
  last; never "clean up" `backups/` by hand.

## Working style

- Prefer boring, verifiable steps; measure before and after state-changing
  commands. Silent skips are forbidden — if a job can't complete, record the
  failure and say so in one line.
- Track multi-session work in the beads ledger; comment evidence onto the
  bead; sync at session end.
- Ship on wrap-up: commit → push → **draft** PR; promotion and merge follow
  each repo's own gate discipline.
