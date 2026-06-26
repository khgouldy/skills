---
name: minimize-reader-load
description: Use when reviewing or shaping code that's hard to trace — too many indirections between a question and its answer, or too much hidden mutable state to hold in your head. Triggers include "this is hard to follow", "where does this value come from", a wrapper with one caller, an adapter with no second implementation, or a flat file full of globals.
---

# Minimize reader load

Maintainability is the work a reader does to understand the code. Code is read far
more than it's written, so reader load is the thing to optimize. Line count,
cyclomatic complexity, and "clean architecture" are proxies; this is the target.

Track two independent axes:

1. **Layers to trace** — how many indirections sit between the question and the
   answer.
2. **State to hold** — how much hidden or mutable context the reader must keep in
   their head.

They're independent. A flat file with 50 globals is as hard to reason about as a
6-layer adapter stack. Guard both.

**The pattern**

- **Collapse layers that don't earn their keep:** wrappers with one caller,
  adapters with no second implementation, indirection added for a future that
  never came. Inline them.
- **Shrink state scope:** prefer pure functions (return rather than mutate),
  locals over fields, fields over module state, module state over globals. Derive
  instead of syncing two copies.
- **Name the invariant at the boundary,** once, instead of re-checking it in every
  consumer.
- **Before adding a layer or a piece of state, ask:** does this reduce reader load
  somewhere else by at least as much as it adds here?

**The test:** can a new reader answer "where does X come from?" and "what can
change X?" in under 30 seconds? If not, cut layers or cut state.

---

_Inspired by `principle-minimize-reader-load` in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own._
