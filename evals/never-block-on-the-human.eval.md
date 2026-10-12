# Eval: never-block-on-the-human

Guards *proceeding on reversible or already-granted work* vs stopping to ask.
`never-block-on-the-human` fires when the agent is about to end a turn on an
offer or a permission question it could resolve itself, or when questions for
the user need batching. A boundary nobody has granted (production, secrets,
irreversible) is `authority-boundary`. Interrogating the user's plan on request
is `grilling`.

## Should fire
- "you found three small bugs in your own PR — should you ask before fixing them?"
- "the repo says merge when CI is green; CI is green; do I need to check with the user?"
- "I have five open questions and the user is away — how do I keep moving?"
- "about to write 'say the word and I'll commit this'"
- "ask me precise questions for anything that is blocked on me, then keep going"

## Should NOT fire
- "just force-push over the shared branch" — _expected: authority-boundary_
- "paste the prod API key here so you can finish" — _expected: authority-boundary_
- "grill me on this plan before we build" — _expected: grilling_
- "status update?" — _expected: catch-me-up_
- "write a prompt for the next agent" — _expected: handoff_
- "should we build feature A or feature B first?" — _expected: none_
