---
name: control-ui
description: Use when you need to drive and inspect a real web, IDE, or Electron UI locally to verify behavior with evidence — reproducing a UI bug that depends on real focus/keyboard/scroll/render, capturing screenshots or accessibility snapshots, taking before/after visual diffs, or grabbing console/network logs, CPU profiles, or heap snapshots. Triggers include "verify this in the browser", "screenshot the UI", "repro this UI bug", or "profile the page".
---

# Control UI

Drive a real UI locally and verify behavior with evidence, not assertion. Reuse
the repo's own harness first; assemble a temporary one only if there isn't one.

## What it's for

- Reproducing UI bugs that depend on real browser focus, keyboard input,
  scrolling, resizing, or rendering — things unit tests can't see.
- Verifying visual or accessibility changes with screenshots and snapshots.
- Capturing console logs, network logs, CPU profiles, traces, or heap snapshots.
- Producing before/after evidence for a fix, the kind of runtime proof
  [blast-radius](../blast-radius/SKILL.md) asks for.

## Setup

1. Start the app with the repo's documented dev command.
2. Discover existing harnesses first: Playwright/Cypress **test** suites, Storybook, browser
   scripts, Electron launch scripts, snapshot tooling. Prefer those over anything
   new. For a live agent-driven browser, use **BetterWright** (MCP `browser` tool or
   `betterwright run`) — not Playwright MCP.
3. For a web app, connect to the local URL with the existing tooling.
4. For Electron/Chromium, launch with `--remote-debugging-port=<port>` and connect
   over CDP.
5. Select the page by a **stable app marker** (a root selector, landmark, or
   product-specific `data-*`), not tab order.
6. Target elements by accessibility role, label, or stable `data-*` — not pixel
   coordinates.

## Minimal web probe

A one-off live probe uses BetterWright (persistent session, proof screenshot):

```bash
betterwright run -c "await page.goto('http://127.0.0.1:<port>'); await page.getByRole('button', { name: /submit/i }).click(); return screenshot({kind: 'proof', name: 'ui-after'})"
```

Inspect the image path in `artifacts` before claiming the UI changed. Don't add
Playwright as a project dependency just for a probe. Repo Playwright/Cypress
**test** files stay as CI/E2E. For Electron, attach over CDP with BetterWright's
provider option, then pick the right page by a stable app-root selector (if none
matches, print titles/URLs instead of guessing).

## Interaction loop

1. Snapshot or screenshot **before** acting.
2. Choose a target from the latest page structure.
3. Do exactly **one** structural action: click, type, keypress, drag, scroll,
   navigate, or resize.
4. Snapshot/screenshot again.
5. Verify the expected state change.
6. Save before/after artifacts when the user asked for proof.

## When to drop to raw CDP

Only when higher-level APIs aren't enough: CPU profiles / traces / paint flashing
(perf), heap snapshots + forced GC (leaks), request blocking / throttling / logs
(network), viewport and color-scheme / reduced-motion emulation (rendering),
console streaming and exception capture (debugging).

## Guardrails

- Don't reuse stale element references after navigation or a structural change.
- Avoid coordinate clicks unless a fresh screenshot was taken immediately before.
- Keep test data local and disposable; clean up dev servers, debug sessions, and
  temp profiles when done.
- Don't hard-code selectors, ports, or script paths from another repo — discover
  this repo's markers.
- Don't store screenshots or heap snapshots from privacy-sensitive workspaces
  without the user's explicit agreement.

---

_Inspired by the `control-ui` skill in Cursor's [cursor-team-kit](https://github.com/cursor/plugins/tree/main/cursor-team-kit). Prose is our own; example code adapted._
