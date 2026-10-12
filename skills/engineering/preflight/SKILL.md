---
name: preflight
description: Use before starting work that will run long or unattended — orchestrating a wave of workers, an overnight run, a migration, a release — to check the machine and the accounts it depends on while the user is still present. Catches a hung container runtime, low disk or memory, expired CLI logins, and blocked endpoints before they strand the run. Not for debugging a failure that has already happened (diagnosing-bugs).
---

# Preflight

Long runs rarely die on the hard part. They die two hours in on an expired
login, a full disk, or a container runtime that stopped answering, and then sit
until the user comes back. Every one of those is checkable in a minute at the
start, when the user is still there to fix what only they can fix.

## Check what this run will touch

Work out which of these the job depends on, and check only those. Each check is
read-only and has a time limit, so a hung tool fails the check instead of
hanging you.

| Area | Check | Fails when |
|---|---|---|
| Disk | free space on the volumes the repo, worktrees, and containers use | less room than the run will write |
| Memory | free memory against the number of workers you plan to start | workers would push the machine into swap |
| Containers | the runtime answers a trivial command within a few seconds | it hangs or its data sits on a slow or missing volume |
| Services | the local stack's health endpoints | a required service is down or on an unexpected port |
| Logins | each CLI the run will call (git host, deploy, database, messaging) with a harmless read | any returns unauthorized |
| Secrets | the env var or secret name exists, without printing its value | a name the run needs is unset |
| Reachability | the real URLs the run will hit, from this machine | a firewall, challenge page, or rate limit answers instead of the app |
| Git | fetch works, the base branch is current, the tree is in the state you expect | stale base or stray changes |

If the repo has its own preflight or doctor script, run that first and add only
what it does not cover. If it has none and the run is one you will repeat, write
one and commit it.

## Then sort the results

- **Fix it yourself.** Free disk in scratch locations you own, start the local
  stack, fetch.
- **Shrink the plan.** Fewer parallel workers when memory is tight.
- **Needs the user.** Interactive logins, a missing secret, a firewall mode only
  they can change. Put all of these in one message, each with the exact command
  to run, before you start. Then begin whatever does not depend on them.

Report in a few lines: what passed, what you fixed, what you scaled down, and
what is waiting on the user.

## Red flags

- Starting a wave of workers without knowing free memory
- Finding out the deploy login expired at the deploy step
- A check that can hang forever
- Printing a secret to prove it exists
- Asking for one login now and discovering a second one an hour later

---

_Original. Written after a month of session logs showed the same handful of environment failures stopping long runs._
