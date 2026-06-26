---
name: blast-radius
description: Use when you want to know what a change could break *beyond its own diff* before it ships — a small change you don't fully trust, a touched function with many callers, an edit to shared/serialized state. Triggers include "what could this break", "blast radius of X", "is this safe to merge", or reviewing a diff whose ripple effects aren't obvious.
disable-model-invocation: true
---

# Blast radius

Find what a change breaks *somewhere else*, before it ships. Listing the callers
isn't the job — a grep does that in a second. The job is the breakage grep won't
show you: the JSON shape an API returns, a DB column, a wire format another
service parses, a feature flag, code three hops downstream, a teardown ordering.

## Don't trust your own writeup

A blast-radius writeup that *sounds* right is worthless. It reads as convincing
whether or not it's true — that's the trap. So don't hand back the prose. Find the
one or two facts the change's safety actually depends on, and **prove them by
running code**. Words are where you start, not what you ship.

### The confidence ladder

For each fact the change's safety rests on, get it as far down this list as is
cheap, and say where it stopped:

1. **You asserted it.** Worthless on its own.
2. **You pointed at the line.** A real `file:line`, or the library's own source.
3. **You showed the bad case can't happen.** You walked the failure path step by
   step and it doesn't reach.
4. **You ran it.** A script or test that calls the *real* code and fails loud if
   you're wrong.
5. **You reproduced it in the running system.**

Any safety fact you can't get to step 4, say so out loud — don't write it up as
settled. Step 4 is usually one small script that imports the same library the app
ships and calls the exact function you're worried about.

## Steps

1. **Read the change.** The diff, the symbols it adds/changes/deletes, and what
   it now does differently — including the part the diff doesn't spell out.
2. **Find the one fact it's safe because of.** Most scary-looking changes are
   safe because of a single fact ("this only drops already-dead cache entries and
   does nothing else"). Find it. If it holds, most of the scary cases die at once.
   Spend your time here, not on a long list of maybes.
3. **Look where grep stops.** Read the source of the library you call, and check
   its pinned version and any local patch. Work out *when* things run (microtasks,
   unmount/teardown, render frameworks' scheduling). Follow what a symbol search
   misses: serialized data, DB columns, wire formats, another language reading the
   same bytes, flags, downstream consumers.
4. **Be honest about each risk.** Give each a real probability and a real cost.
   Keep the ones you confirmed; list the ones you checked and *cleared*
   separately. Cite a real `file:line` — a search that finds nothing is still an
   answer — and never invent a caller or an API.
5. **Prove the one fact.** Write the script or test, run it, paste what happened.
   If you can't prove it cheaply, mark it **unproven**. Don't round up.
6. **For a big or wide change, run it as an arena.** Ask several models the same
   question and merge the answers — different models catch different real bugs.
   (See [arena](../arena/SKILL.md).)

## What to hand back

- **What it does** — including the non-obvious part.
- **The one fact it's safe because of** — stated, with the ladder step it reached
  and the proof. If you couldn't prove it, write **unproven**.
- **Risks** — only the real ones. Each names how it breaks, the `file:line`, how
  likely / how bad, and how to check. Paste proof for the ones that matter.
- **Cleared** — what you checked and why it's fine.
- **Before you merge** — the cheapest test or repro that catches the real bug,
  including the script you wrote.

Write it up cleanly (see [unslop](../../productivity/unslop/SKILL.md)), cite real
code, and strip anything private before it goes anywhere public.

Pairs with [diagnosing-bugs](../diagnosing-bugs/SKILL.md) (which traces a bug
*backward* to root cause; blast-radius reasons *forward* from a change to its
fallout).

---

_Inspired by the `blast-radius` skill in Lauren Tan's (poteto) [pstack](https://github.com/cursor/plugins/tree/main/pstack). Prose is our own; adapted for Claude Code._
