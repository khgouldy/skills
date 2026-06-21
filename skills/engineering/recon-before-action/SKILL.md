---
name: recon-before-action
description: Use before building any integration, automation, or data pipeline — choose the fastest viable way to get the data before writing code. Triggers include "pull data from", "sync X to Y", "scrape", "build a pipeline", "integrate with", "automate", or any task that moves or extracts data from a system.
---

# Recon Before Action

Before writing a line of integration code, walk a decision hierarchy and stop at
the first level that works. The fastest correct solution is almost never the
first one that comes to mind — it's the highest-leverage tool you haven't
checked yet.

## Speed hierarchy — check in order, stop at the first that works

| Level | Approach | When |
|---|---|---|
| 0 | **Existing tool** (MCP / CLI) | Always check first. Don't build what already exists. |
| 1 | **Bulk export / dump** | Warehouse extract, bucket download, vendor CSV, `pg_dump`. |
| 2 | **Cached / client-side state** | Data already landed locally or in storage — don't re-fetch. |
| 3 | **Bulk API endpoint** | One call with a high `limit`, then paginate. |
| 4 | **Per-record API** | Last-resort fetch — but parallelize, never loop sequentially. |
| 5 | **Scrape / parse** | HTML, PDF, raw files. The true last resort. |

Do not accept "can't get the data" until you've tried at least three levels.

## Complexity gate — size the task before engineering it

```
< 10 items   → inline script or do it by hand. No abstractions.
10–50 items  → simple script. No orchestrator, no framework.
50–500 items → script with error handling + logging.
500+ items   → real pipeline: orchestration, idempotency, observability.
```

If it runs once or twice, it's a script, not a pipeline. Don't build
infrastructure for throwaway work.

## Separate extract → transform → load

The source system is for extraction only. Get data out fast, process it
elsewhere.

1. **Extract** with the highest-level approach above.
2. **Land** to a file / storage / local DB — don't hold large sets only in memory.
3. **Transform** separately (filter, dedupe, enrich, validate).
4. **Load** to the destination.

Never run transform logic inside the extraction loop.

## Discover writes alongside reads

When reverse-engineering an API, capture in one pass: read *and* write
endpoints, auth pattern, rate limits, pagination style, and any bulk endpoint
(a bulk write saves 100× over individual updates).

## Parallelize per-record work

Independent per-item calls run concurrently (`asyncio.gather`, `Promise.all`),
in bounded groups — never sequentially. If you parallelize, also run
[finding-concurrency-bugs](../finding-concurrency-bugs/SKILL.md) on the result.

## Cache what worked

After solving a non-trivial integration, append a short note to a `PATTERNS.md`:
method/level used, endpoint, auth, pagination, rate limits, gotchas. Check
`PATTERNS.md` before starting recon next time.

---

_Original skill — distilled from Kevin's recon-before-action working protocol._
