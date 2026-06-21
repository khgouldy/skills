---
name: handoff
description: Use when wrapping up a work session that another session or person will pick up — writes a complete handoff doc so the next agent can continue without re-deriving context. Triggers include "write a handoff", "hand this off", "I'm running low on context", "summarize state for the next session".
disable-model-invocation: true
---

# Handoff

Write a self-contained handoff so the next session starts productive instead of
spending its first half re-discovering what you already know. Assume the reader
has zero memory of this conversation and cannot ask you follow-up questions.

## What a good handoff contains

1. **Goal.** What we're ultimately trying to accomplish, in one or two sentences.

2. **Current state.** What's done, what works, what's verified. Be honest about
   what's *not* yet working — a handoff that overstates progress wastes the next
   session's time.

3. **Next steps.** The concrete next actions, ordered. Specific enough to act on
   without guessing: which file, which function, which command.

4. **Key decisions already made (and why).** So the next session doesn't
   re-litigate settled choices. Capture the reasoning, not just the choice.

5. **Landmines.** Gotchas, dead ends already tried, flaky steps, anything
   non-obvious that cost you time — so it doesn't cost them time too.

6. **Where things live.** The files, branches, commands, and external resources
   in play. Use clickable `path:line` references.

## How to write it

- **Concrete over vague.** "Fix the auth bug" is useless; "the token refresh in
  `auth/session.ts:42` drops the cookie on cross-host redirect — see the failing
  test `session.test.ts:88`" is a handoff.
- **State, don't narrate.** The next reader needs the current picture, not a
  chronology of how you got here.
- **Verify your claims before writing them.** If you say tests pass, you ran
  them. A handoff built on unverified assertions sends the next session down a
  false trail.

Write it where the next session will find it — a doc in the repo, a PR
description, or a tracking ticket.

---

_Inspired by Matt Pocock's handoff skill (https://github.com/mattpocock/skills). Prose is our own._
