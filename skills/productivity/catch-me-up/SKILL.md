---
name: catch-me-up
description: Use when the user returns to a running session and asks where things stand — "status update?", "still WIP?", "where are we?", "anything waiting on me?", "what do you need from me?", "catch me up", /catch-me-up. Reports what changed since their last message and what is waiting on them, in plain words. Not for writing a prompt for a different session (handoff).
---

# Catch me up

Tell the user what happened in this session since the last message they wrote,
and what needs them. Background notifications and subagent reports are not
their messages. Assume they remember their last message and nothing after it.

## Gather first, and change nothing

Keep this turn read-only. Collect your own work since their message, what
subagents and background tasks reported, and the current state of every PR, CI
run, and worker this session touched. Check that state now; do not report it
from memory. Say which things are still running and which you could not check.

An **action item** is something only the user can do: a product choice, an
approval nobody has granted, an irreversible step, access you lack. Include one
that has been waiting since before their last message. Work you can still do
yourself is not an action item.

## Write the reply

1. **Open with the count.** "Two things need you" or "Nothing is waiting on
   you." If nothing happened and nothing waits, say so and stop.
2. **What happened**, most important first. Give each result and what it means
   for them. Skip steps that changed nothing. Use names they would recognize
   (the PR title, the feature) instead of labels you made up while working.
3. **What is left that you will do yourself**, in one line.
4. **Each action item**: the decision, why it matters now, the options and what
   each costs, your recommendation, and what happens if they do not answer.
   Write it so they can decide without opening anything.

Use a table when there are several PRs or workers. Never invent a number, and
link only to things that exist.

## Red flags

- A chronological story of the session
- "All good" with no PR number, check name, or command behind it
- An action item that is really work you could do
- Internal labels (T7, lane B, wave 2.5) with nothing to say what they are
- Starting new work in a turn that was only asked for status

---

_Inspired by Lauren Tan's ketchup skill in the MIT-licensed [pstack](https://github.com/cursor/plugins/tree/main/pstack) plugin for Cursor. Prose is our own._
