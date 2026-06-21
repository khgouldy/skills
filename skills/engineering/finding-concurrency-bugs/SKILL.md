---
name: finding-concurrency-bugs
description: Use when hunting or fixing concurrency defects — deadlocks, data races, livelocks, and locks held across an await point. Triggers include intermittent/non-deterministic failures, hangs under load, "works locally fails in prod", or any code using threads, async tasks, locks, or shared mutable state.
---

# Finding Concurrency Bugs

Concurrency bugs are the ones that pass every time you run them and fail in
production at 3am. They don't yield to "run it again" — they yield to reasoning
about *what runs at the same time as what, and what they share*.

## The classes of bug

- **Data race** — two tasks touch the same mutable state without synchronization,
  and at least one writes. The result depends on timing.
- **Deadlock** — tasks wait on each other in a cycle; nothing proceeds. Classic
  cause: two locks acquired in opposite orders by two paths.
- **Livelock** — tasks keep reacting to each other and making no progress (e.g.
  both back off, retry, collide, back off again).
- **Await-holding-lock** — holding a lock across an `await`/yield point. The task
  suspends *with the lock held*, and another task blocks (or the same task
  re-enters and deadlocks).
- **Lost update / check-then-act** — read a value, decide based on it, write — but
  something changed in between. The TOCTOU gap.

## How to find them

1. **Map the shared state.** List every piece of mutable state reachable from
   more than one task/thread. Unshared state has no concurrency bug; focus only
   on what's shared.

2. **For each shared item, ask: what's the synchronization?** A lock, a queue, an
   atomic, immutability, confinement to one task. If the answer is "nothing" or
   "it happens to be fine," that's a suspect.

3. **Check lock ordering.** Wherever two or more locks are held at once, confirm
   every path acquires them in the *same* order. Inconsistent ordering is a
   deadlock waiting for the right interleaving.

4. **Scan every `await`/blocking call for held locks.** A lock acquired before an
   `await` and released after is held across the suspension. Shrink the critical
   section so it doesn't span the await, or use an async-aware lock deliberately.

5. **Find check-then-act gaps.** Any "read, then act on what you read" on shared
   state is suspect unless the read and act are atomic together.

## How to fix them

- **Shrink shared mutable state.** The cheapest fix is making state unshared or
  immutable so there's nothing to race.
- **Make critical sections small and await-free.** Hold locks for the minimum,
  never across I/O.
- **Impose a global lock order** and document it, so future code can't reintroduce
  the cycle.
- **Prefer higher-level primitives** — a queue, a channel, an actor — over hand-
  rolled lock choreography when the logic gets hairy.

## Verifying the fix

These bugs hide from single runs. Stress the suspect path: many iterations, high
concurrency, injected delays at the suspicious interleaving point. A fix you
can't make fail under stress is more trustworthy than one that "didn't repro."
Pairs with [diagnosing-bugs](../diagnosing-bugs/SKILL.md) for the root-cause
discipline.

---

_Inspired by Jeffrey's deadlock-finder-and-fixer skill. Prose is our own._
