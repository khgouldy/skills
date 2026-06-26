---
name: arena
description: Use when one attempt at a non-trivial artifact would lock in the wrong shape and you want to explore the design space before committing — generate several independent candidates for the same task, pick the strongest as a base, and graft the best parts of the rest into it. Triggers include "arena this", "throw it in the arena", "try a few approaches and pick the best", or a risky design where the first draft would anchor everything after it.
disable-model-invocation: true
---

# Arena

Fan out several independent attempts at the same task. Read every candidate in
full. Pick the strongest as the base. Graft the best ideas from the losers into
it. Verify the result. One attempt anchors you to the first shape that compiles;
an arena lets you see the shape *after* you've seen the alternatives.

Use it for work where the shape is uncertain and expensive to change later: an
API design, a tricky refactor, a data model, a hard algorithm. Skip it for work
with one obvious shape — the fan-out is pure overhead there.

## Phases

Open a todo with one item per phase before launching anything. The arena runs
mostly on its own, and the list keeps a phase from silently vanishing.

### 1. Frame

Every candidate gets the same prompt, so the prompt *is* the contract. Get it
right before spawning.

- **State the artifact** each candidate must produce.
- **Derive a rubric** — 3–6 concrete, gradeable criteria. Concrete:
  "adds a `--dry-run` flag that skips all writes." Vague: "code is correct." The
  rubric is *your* tool for picking later; the candidates never see it.
- **Pick the runners.** Use different models where you have them — diversity is
  the whole point, since different models fail in different places. The same
  model N times is fine when the work is generation-bound rather than
  judgment-sensitive.
- **Assign separate output paths.** Each candidate writes to its own location —
  a git worktree where possible, otherwise a scratch dir like
  `arena/candidate-<n>/`. N candidates writing to one path is shared mutable
  state and will corrupt the run.

### 2. Fan out

Dispatch all candidates in one message so they run concurrently. Each gets the
task, any shared grounding, its own output path, and an instruction to produce
**both the artifact and a short rationale**. The rationale is mandatory: it names
the alternatives the candidate weighed and what it rejected. Without it you can't
tell whether a candidate's structure is principled or accidental, which makes the
graft step guesswork. If a candidate produces nothing, proceed with the rest and
note the dropout.

### 3. Judge (optional but recommended)

After every candidate is done, dispatch one read-only judge — on a different
model from yours where possible. It sees the rubric and the candidates by path,
scores each criterion, and recommends a base with reasons. Spawn it only *after*
the candidates finish; a judge that reads half-written output reports phantom
dropouts.

### 4. Pick a base

Read every candidate end to end before picking — skimming surfaces only the one
that *looks* most familiar. Score each against the rubric criterion by criterion,
not on holistic feel. Compare with the judge: agreement confirms the pick;
disagreement means one of you is biased or the rubric was ambiguous, so read both
rationales before deciding. Prefer the candidate a future maintainer can extend
most easily without breaking invariants — when two feel tied, take the smaller
surface area or the cleaner boundary. Record the pick and why.

### 5. Graft

Walk each losing candidate once more for the one or two things worth porting in
(it's rarely more than that). Fold each graft in **by hand** so the result stays
coherent under a single mental model — don't paste mechanically. Record what was
grafted from where, and **what was rejected and why**. The rejection notes are
the highest-signal part of the record: future readers learn from what you
considered and dropped.

When candidates **converge** on the same shape, that's strong agreement — ship
the consensus, no graft needed. When they **wildly diverge**, the frame was
under-specified — reframe and re-run rather than averaging the divergence.

### 6. Verify

The synthesized artifact earns no pass for being a synthesis. Hold it to the same
scrutiny as any other output — run it, test it, prove it. If verification
surfaces something the arena missed, either the frame was wrong (reframe, re-run)
or a candidate caught it and you missed the graft (go back to step 5). Don't
paper over.

## Output

One synthesized artifact, plus a short note alongside it naming the base, the
grafts (with their source candidate), the rejections, any dropouts, and the
verification result.

Pairs with [blast-radius](../blast-radius/SKILL.md) (a wide, risky change is a
good arena candidate) and [cross-critique](../../productivity/cross-critique/SKILL.md)
(arena explores *implementations*; cross-critique stress-tests a single
*decision*).

---

_Inspired by the `arena` skill in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own; model-specific and Cursor-specific details adapted for Claude Code._
