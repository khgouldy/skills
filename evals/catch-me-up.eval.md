# Eval: catch-me-up

Guards *reporting where this session stands* vs handing work to another session.
`catch-me-up` fires when the user comes back and asks for status or what is
waiting on them. A prompt for a fresh session is `handoff`. A decision log for
review after the fact is `show-me-your-work`.

## Should fire
- "status update?"
- "still WIP?"
- "what question do I need to answer?"
- "anything left to do here?"
- "catch me up — what happened while I was out?"
- "tell me concisely what you're waiting on me for"

## Should NOT fire
- "write a short prompt so another agent can pick this up" — _expected: handoff_
- "summarize state for the next session" — _expected: handoff_
- "keep a decision log for this migration" — _expected: show-me-your-work_
- "why was this built this way?" — _expected: why_
- "any beads left on the list to do?" — _expected: none_
