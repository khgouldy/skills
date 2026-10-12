---
name: prototype
description: Use when a design question needs a throwaway, runnable artifact — "does this state model feel right?", "what should this UI look like?", "I'm not sure how this should work", "sanity-check the flow before we build it" — and when a novel interaction or architecture choice has no precedent in the codebase, so two or three competing sketches should be compared before committing. Builds a logic TUI or multi-variant UI mock; not for production code or for work with an established pattern.
---

# Prototype

A prototype is **throwaway code that answers one design question**. The question
picks the shape; everything else is scaffolding you delete (or park on a
throwaway branch) once you know the answer.

## When one sketch is not enough

If the decision has no precedent in the codebase and the answer is not obvious,
build two or three competing prototypes and compare them side by side before
committing. That covers a new UI interaction with no prior art, an architecture
choice with several workable approaches, and anything where the feel matters
more than the logic. Skip it for mechanical work, for a fix with a clear target
state, and where the constraints leave one viable approach. To run the
alternatives as parallel agents and graft the best parts together, use
[arena](../arena/SKILL.md).

## Pick a branch

Figure out what is actually being decided — from the prompt, nearby code, or by
asking once:

| Question | Branch |
|---|---|
| "Does this logic / state model / API surface feel right?" | [logic.md](logic.md) — tiny interactive terminal app over a pure module |
| "What should this look like?" | [ui.md](ui.md) — several radically different UI variants, switchable live |

Those produce different artifacts. Picking the wrong branch wastes the whole
exercise. If the question is ambiguous and nobody is around to ask, default from
context (backend module → logic; page/component → UI) and state that assumption
at the top of the prototype.

## Rules for both branches

1. **Throwaway and marked as such.** Put the code near where the real feature
   will live so context is obvious, but name it so a casual reader sees
   `prototype`, not production. For UI routes, follow the project's existing
   routing conventions — don't invent a new top-level tree.
2. **One command to run.** Hook into the project's task runner (`pnpm <name>`,
   `python <path>`, `make …`). The user should not have to remember a path.
3. **No persistence by default.** State stays in memory. If the *question* is
   about persistence, use a scratch DB or a file named so it screams
   `PROTOTYPE — wipe me`.
4. **Skip the polish.** No tests, no error handling beyond "it runs," no
   abstractions for a future that may never come.
5. **Surface the state.** After every action (logic) or on every variant switch
   (UI), show the full relevant state so the user can see what changed.
6. **Capture when done.** Fold the validated decision into real code. Keep the
   prototype itself as a primary source on a **throwaway branch** (not main),
   and leave a pointer from the ticket/PR. Record the *verdict* — which option
   won and why — in the issue or a commit. Main keeps only what you actually
   ship.

## Red flags — STOP

- Shipping the prototype path into production without a rewrite
- Prototyping "everything" instead of one question
- Logic and TUI/UI shell fused so nothing is liftable
- UI variants that only change color or copy (that's a tweak, not a prototype)

## Pairs with

- [grilling](../../productivity/grilling/SKILL.md) — stress-test a plan in words
- [grilling-frontend-prototyping](../grilling-frontend-prototyping/SKILL.md) —
  grilling where each question is asked with live UI variants

---

_Inspired by Matt Pocock's prototype skill (https://github.com/mattpocock/skills) and by `principle-exhaust-the-design-space` in Lauren Tan's [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own._
