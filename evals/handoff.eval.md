# Eval: handoff

Guards *writing the starting prompt for a different session* vs running the
work from this one. `handoff` fires when the user wants a prompt, starter, or
handoff another agent will begin from, or when context is running out
mid-task. Planning, beading, and dispatching executors now is `beadflow`. A
decision trail for a human reviewer is `show-me-your-work`. Explaining why code
is the way it is belongs to `why`.

## Should fire
- "write me a short prompt for another agent to handle those follow up beads"
- "write a copy-pastable concise starter for the next agent session"
- "write a prompt I can copy and paste and a handoff doc the prompt points to"
- "now write the prompt for the other agent to orchestrate the rest of the waves"
- "give me the short prompt to kick off the development"
- "I'm running low on context — hand this off"
- "summarize state for the next session"

## Should NOT fire
- "dispatch those beads to sonnet agents and review when they're done" — _expected: beadflow_
- "create beads for the follow-ups and keep going" — _expected: beadflow_
- "keep a decision log I can review after the migration" — _expected: show-me-your-work_
- "why did we pick Railway over Supabase here?" — _expected: why_
- "open a PR for this branch" — _expected: create-pr_
- "tighten this prompt so it reads less like AI" — _expected: unslop_
- "status update?" — _expected: none_
- "tell me the prompt you just made again" — _expected: none_
