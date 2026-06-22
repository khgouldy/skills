---
name: cross-critique
description: Use when a decision is high-stakes or genuinely uncertain and you want it stress-tested before committing — dispatch independent critiques of a proposed choice, then synthesize. Triggers include "pressure-test this decision", "what am I missing", "red-team this", choosing between architectures, or any irreversible call worth a second and third opinion.
disable-model-invocation: true
---

# Cross-Critique

Sharpen a decision by attacking it from several independent angles *before* you
commit, then synthesize what survives. A single line of reasoning has blind
spots; multiple independent critiques expose the ones you can't see from inside
your own argument.

## When it's worth it

For reversible, low-stakes calls, just decide. Reach for cross-critique when the
decision is **expensive to undo** or **genuinely uncertain**: architecture
choices, data-model commitments, anything where being wrong costs days.

## How to run it

1. **State the proposal crisply.** One clear statement of the decision and the
   reasoning behind it. Vague proposals get vague critiques.

2. **Dispatch independent critics — give each a distinct lens.** Don't ask three
   agents the same question; redundant critics find redundant problems. Assign
   different angles, e.g.:
   - **Correctness / logic** — where does the reasoning not hold?
   - **Risk / failure modes** — how does this go wrong in production, at scale,
     at 3am?
   - **Cost / simplicity** — is there a materially cheaper or simpler option that
     gets 90% of the value?
   - **The opposite** — argue the strongest case for the alternative we're
     rejecting.

   Run them independently so they don't anchor on each other.

3. **Demand specifics, not vibes.** A critique that says "seems risky" is noise.
   Each critic should name a concrete failure, a concrete cheaper alternative, or
   a concrete flawed assumption.

4. **Synthesize — don't just average.** Read the critiques and decide what
   actually changes your mind. Some objections are decisive; some are
   theoretical. The output is a *sharper decision* (possibly the original one,
   now better-justified), not a tally of votes.

## Output

A short writeup: the decision, the objections that mattered, how they changed
(or didn't change) the call, and the residual risks you're knowingly accepting.
That record is itself valuable — it's the "why" a future
[handoff](../handoff/SKILL.md) or ADR needs.

---

_Inspired by Warp's cross-critique skill (https://github.com/warpdotdev/common-skills). Prose is our own._
