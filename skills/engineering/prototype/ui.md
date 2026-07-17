# UI prototype

Generate **several radically different UI variations** on one surface, switchable
from a floating bar. The user flips variants in the browser, picks a winner (or
steals pieces), then throws the rest away.

If the question is logic/state rather than look-and-feel, use [logic.md](logic.md).

## When this is the right shape

- "What should this page look like?"
- "Show me a few dashboard options before we commit."
- "Try a different layout for settings."
- Anywhere the alternative is a day of comparing three vague mockups in your head.

## Prefer embedding in the real app

A UI is easiest to judge when it sits next to **real chrome, density, and data**.
A lonely throwaway route hides problems.

### Sub-shape A — existing page (default)

Variants render **on the same route**, gated by `?variant=`. Keep existing
fetching, params, and auth; only the rendered subtree swaps. Also use this when
the thing doesn't have a page yet but *would* live inside one (new dashboard
card, new settings section, new step in a flow).

### Sub-shape B — new throwaway route (last resort)

Only when there is truly no host page — a new top-level surface or a flow that
can't embed anywhere sensible. Follow the project's routing conventions; put
`prototype` in the path or filename. Same `?variant=` pattern.

Before choosing B: is there really no existing page this could live inside?

## Process

### 1. State the question and pick N

Default **3** variants. Cap at **5** — more becomes noise, not radical options.

One-line plan in a comment or nearby README:

> Three variants of settings, `?variant=` on existing `/settings`.

### 2. Generate structurally different variants

Each variant must disagree about **layout, hierarchy, or primary affordance** —
not just colors or copy. Three slightly tweaked card grids is wallpaper. If two
drafts look alike, redo one with an explicit constraint ("no card grid").

Use the project's component library and styling system. Export clear names
(`VariantA`, `VariantB`, …).

### 3. Wire a switcher

One component on the route reads the search param and mounts the active variant.
Keep data fetching above the switcher for sub-shape A.

### 4. Floating switcher bar

Fixed bottom-centre control, visually *not* part of the design under review:

- **← / →** cycle variants (wrap around)
- **Label** — key plus short name (`B — Sidebar layout`)
- Update the URL via the framework router so the choice is shareable and
  reload-stable
- Keyboard arrows cycle too; don't steal focus from inputs/textareas/contenteditable
- Hide in production builds (`NODE_ENV !== 'production'` or equivalent)

One shared switcher component for both sub-shapes.

### 5. Hand it over

Give the URL and `?variant=` keys. Best feedback sounds like: "header from B,
sidebar from C."

### 6. Capture and clean main

Record which variant won and why. Fold the winner into real code; move losers +
switcher to the throwaway branch (see [SKILL.md](SKILL.md)). Don't leave dead
variant components on main.

## Anti-patterns

- Variants that only change color or copy
- Over-sharing layout between variants (shared header is fine; shared layout
  defeats the point)
- Real mutations without stubs when the question is only visual
- Promoting prototype code to production without a proper rewrite
