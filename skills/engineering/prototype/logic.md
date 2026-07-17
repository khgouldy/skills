# Logic prototype

A tiny interactive terminal app that drives a state model by hand. Use when the
question is about **business logic, transitions, or data shape** — things that
look fine on paper and only feel wrong when you push real cases through them.

If the question is "what should this look like?", use [ui.md](ui.md) instead.

## When this is the right shape

- "Does this state machine handle X then Y?"
- "Can this data model represent the case where…?"
- "I want to feel the API before writing the real one."
- Anywhere the user should **press keys and watch state change**.

## Process

### 1. State the question

Before code: one paragraph at the top of the file or a short README — what
state model, what question. A logic prototype aimed at the wrong question is
pure waste.

### 2. Match the host project

Use the project's language, package manager, and runtime. Don't introduce a new
stack just for the prototype. If there's no obvious runtime (docs-only repo),
ask.

### 3. Isolate liftable logic

Put the bit that answers the question behind a small pure interface you could
drop into the real codebase later. The TUI is throwaway; the module should not
be.

Good shapes (pick for the *question*, not for the TUI):

- **Reducer** — `(state, action) => state` for discrete events over one value
- **State machine** — explicit states and legal transitions
- **Pure functions** over a plain data type when there's no ambient "current" state
- **Small class/module** only when the logic truly owns ongoing internal state

No I/O, no terminal codes, no `console.log` for control flow inside the logic
module. The TUI imports and calls; nothing flows the other way.

### 4. Build the smallest full-frame TUI

Lightweight terminal UI: on every tick, clear the screen and re-render one
stable frame (not an ever-growing scrollback).

Each frame, in order:

1. **Current state** — pretty-printed, one field per line or formatted JSON.
   Bold field names; dim secondary context (ids, timestamps).
2. **Key map** at the bottom — e.g. `[a] add  [d] delete  [t] tick  [q] quit`.

Loop: init state → render → read one key/line → dispatch → re-render until quit.
The whole frame should fit on one screen.

### 5. One command to run

Add a script to the existing task runner. If there isn't one, put the exact
command at the top of the prototype README.

### 6. Hand it over

Give the run command. Interesting moments sound like "wait, that shouldn't be
possible" or "I assumed X would be different" — those are bugs in the *idea*.
Add actions if the user asks; prototypes evolve.

### 7. Capture

Lift the validated reducer/machine/functions into the real module. Park the TUI
shell on the throwaway branch per [SKILL.md](SKILL.md). Write down the verdict.

## Anti-patterns

- Adding tests (if it needs tests, it's not a prototype)
- Wiring the real database unless persistence *is* the question
- Generalizing for hypothetical futures
- Mixing logic and TUI so nothing ports cleanly
- Shipping the TUI shell to production
