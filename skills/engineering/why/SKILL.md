---
name: why
description: Use when the question is about *motivation and intent* behind code, not what it does — "why is this built this way", "why did we pick Y over Z", design rationale, the reason behind a regression or a postmortem, or the origin of a magic threshold. Investigates history across source control, tickets, docs, chat, and observability, then returns a cited read on the decision and its tradeoffs. Not for runtime behavior (how it works) or for chasing a live defect's root cause.
---

# Why

Investigate the *motivation and intent* behind code. Why was it built this way?
What edge cases were considered? What product, business, or operational
constraints shaped it? What alternatives were rejected, and why? This answers the
forces that led to the code's shape — distinct from *what it does* (a walkthrough)
and from *why it's failing right now* (that's [diagnosing-bugs](../diagnosing-bugs/SKILL.md)).

## Why it takes real work

The answer is scattered, and you can't predict from the question alone which
source holds it. Historical context lives across roughly seven categories:

1. **Source control** — git log, blame, the commit that introduced it, the PR.
2. **Issue / ticket tracker** — the ticket that motivated it, linked discussion.
3. **Long-form docs** — design docs, ADRs, RFCs, wikis.
4. **Real-time chat** — the Slack/thread where it was hashed out.
5. **Observability** — metrics/traces showing the operational pressure behind it.
6. **Error / exception tracking** — the incident that forced the change.
7. **Product analytics** — the data that justified a threshold or tradeoff.

So **query the sources you have in parallel**, then synthesize. The default is
coverage, not minimalism. A **null result from a searched source is first-class
evidence** about how the decision was made (or wasn't) — report it alongside the
positive findings, don't silently drop it.

## Posture

Work like a detective reconstructing a case from fragmentary records.

- **Evidence before narrative.** Collect the pieces first, then see what story
  they support. Never pick a story and recruit the evidence that fits it.
- **Cite everything.** Every claim points at a real source: a commit SHA, a PR
  number, a `file:line`, a ticket ID, a doc link, a chat permalink. An assertion
  with no citation is a guess, and you must label it as one.
- **Calibrate confidence.** Say how sure you are and why. "Confirmed by the PR
  description" is not "inferred from the commit timing." Distinguish them.
- **When the record is thin, say so.** A short, honest "the rationale isn't
  recorded anywhere I can find; here's the strongest inference and its basis"
  beats a confident fabrication.

## Steps

1. **Pin down the question.** The exact symbol, line, decision, or threshold
   whose rationale you're after. Get a `file:line` or commit anchor.
2. **Enumerate available sources** from the seven categories above — whatever
   this environment actually exposes (git locally; trackers, docs, chat, and
   observability via their CLIs or connected tools).
3. **Investigate in parallel.** Dispatch one investigator per source category
   when the search is broad; each returns cited findings *and* explicit nulls.
4. **Synthesize.** Assemble the timeline, name the decision and the alternatives
   rejected, attach each claim to its evidence, and calibrate confidence.

## Output

A cited read on the decision: what was chosen, what was rejected and why, the
constraints that shaped it, and the residual tradeoffs — each line backed by a
real source, with confidence marked and gaps named honestly. That writeup is
exactly the rationale a future [handoff](../../productivity/handoff/SKILL.md) or
ADR needs.

---

_Inspired by the `why` skill in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own; the MCP-enumeration mechanics are generalized for Claude Code._
