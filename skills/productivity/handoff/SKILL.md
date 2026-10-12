---
name: handoff
description: Use when the user asks for a prompt or handoff that a different agent or session will start from — "write me a prompt for the next agent", "copy-paste prompt", "short prompt to kick off the next wave", "starter for the next session", "hand this off" — or when you are running low on context mid-task. Writes the handoff to a file and replies with a one-line launcher. Not for dispatching executors from this session (beadflow), or for a decision log a reviewer reads afterwards (show-me-your-work).
---

# Handoff

Produce two things: a **handoff file** the next session reads, and a
**launcher** the user pastes to start it. The reader has no memory of this
conversation and cannot ask you anything.

## 1. Write the file

Put it where this repo already keeps plans (`plans/`, `docs/**/plans/`, or
wherever earlier handoffs live), named `YYYY-MM-DD-<slug>-prompt.md`. If the
user asked for something to paste and nothing else, skip the file and put the
whole prompt in the reply.

Write it as instructions to the next agent, in this order. Drop a section that
would be empty.

1. **Role and goal.** Who the reader is (orchestrator, implementer, reviewer)
   and the outcome that ends the job, in two sentences.
2. **Read first.** The exact files, tickets, and commands that hold the detail:
   `bd show <id>`, the plan doc, the PR. Point at them. Do not copy their
   contents into the prompt; a copy goes stale and doubles the reading.
3. **State.** What is merged, what is open, what is verified, each with the
   branch, PR number, or command that proves it. Say plainly what is *not*
   working yet.
4. **Locked decisions.** Copied word for word, each with its reason, under a
   line that says they are not to be reopened.
5. **Questions for the human.** Everything that needs the user's judgment, as
   multiple choice with your recommendation. Tell the reader to get these
   answered first and then run straight through without stopping.
6. **Next steps.** Ordered and specific: which bead, which file, which command.
7. **Authority.** What the reader may do without asking (commit, push, open a
   draft PR, merge, deploy) and what it may not. Repeat only what the user has
   actually granted.
8. **Done means.** The observable result and the command or artifact that
   proves it. "All beads closed" is not a result.
9. **Landmines.** Dead ends already tried, flaky steps, guards that reject the
   obvious command and the form that works.

## 2. Reply with the launcher

End your reply with the launcher in a code block, plus where to run it from:

```
read @plans/2026-10-09-db-move-phase-2-prompt.md — this is your prompt
```

Start the next session in a fresh context, not this one: the point of the file
is that the long conversation does not have to be carried forward.

## Rules

- **Match the length asked for.** "Short prompt" means a few sentences that
  point at the beads and docs. Write the nine sections only when the state
  really lives nowhere else.
- **State, not story.** The reader needs the current picture, not how you got
  there.
- **Verify before you write.** If the file says tests pass or a PR merged, you
  checked in this session. Mark anything you did not check as unverified.
- **Never include secrets.** Name the env var or the secret store instead.

## Red flags

- The prompt restates a bead, ticket, or plan the reader could open
- A claim of "done" or "green" with no PR number or command beside it
- Open questions buried in the middle where the reader hits them an hour in
- A launcher that only works from a directory you did not name
- Continuing the next wave in this session because writing the handoff felt like
  overhead

---

_Inspired by Matt Pocock's handoff skill (https://github.com/mattpocock/skills). Prose is our own; the file-plus-launcher shape comes from reviewing a month of our own session logs._
