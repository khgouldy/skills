---
name: frontend-unslop
description: >-
  When auditing, cleaning up, or polishing a React Native/Expo app screen or a
  React web dashboard so it stops looking generic or AI-generated (gradients,
  glows, emoji icons, uppercase tracked labels, uneven spacing, shouty copy,
  pulsing loaders), use this checklist and fix guidance.
---
# Frontend unslop

Fix the craft and keep the product. Features, content, section order, brand colors and approved copy stay. Every size, color, word and motion becomes deliberate. Chrome stays quiet. Richness goes into one or two content moments per screen.

## How to run it
1. Find the files that render the screen and the theme/token files. Prefer existing tokens over new values.
2. Audit: walk the checklist and write one line per finding with `file:line`.
3. Rate it. Heavy slop: run every pass. Light slop: fix only the findings and keep the brand. No slop: say so, suggest at most 2–3 refinements with exact values, change nothing.
4. Fix in pass order: spacing, color, icons, copy, type, layout, details, states, motion. Finish one pass before the next.
5. Verify with the project's typecheck, lint and tests (including contrast tests). Re-run the checklist.
6. Report findings, what changed per pass, and anything left as a suggestion.

If copy needs sign-off, do not edit strings. List proposed wording in the report or PR instead.

The full checklist (spacing, color, icons, copy, type, layout, details, states, motion) and the fix guidance are in the reference copy at /workspace/design/unslop/SKILL.md on the shared box. Read it in full before auditing.

## Core rules (summary)
- Spacing: a 4pt grid (4, 8, 12, 16, 20, 24, 32, 40, 48, 64), no one-off values, consistent sibling sizes, and space that shows grouping.
- Color: one neutral ramp, three text roles, one rare accent, contrast at least 4.5:1 (or the project's stricter target), no gradients, glows or glass, hairline borders.
- Icons: one line icon set at one size and stroke, no emoji icons, no ✨ for AI.
- Copy: titles name the context, no exclamation marks, hype words, trailing periods on labels, or hype badges, and never a hardcoded brand name.
- Type: one family plus at most one partner, weights 400/500 (600 rare), sentence case, no tracked uppercase, tabular numbers, Dynamic Type respected.
- Layout: keep the sections. Web: a full-viewport shell. Native: safe areas and 44pt touch targets. One primary action per view.
- Details: radius by size, one main chart, quiet meta, visible focus states.
- States: every data view has an empty, a loading (skeleton) and an error-with-retry state.
- Motion: no looping decoration and no transition-all. Animate only color, opacity and transform. One easing, cubic-bezier(0.22, 1, 0.36, 1), at 120–500ms. Respect reduce-motion.

## Fix guidance
- Fix tokens and shared components before patching individual screens.
- Keep the real brand colors and fonts.
- Don't swap one trend for another.
- Don't invent features or data.
- Use one commit per pass.
- Never weaken tests to get a change through.

---
Adapted from [unslop](https://github.com/heydamir/unslop) by Damir Sokolovsky (@heydamir), CC BY 4.0. Changes: condensed into an audit checklist for React Native/Expo and React web dashboards. Added native, empty/loading/error-state and copy-sign-off rules. Removed landing-hero, image-generation, visual-effects, story-video and snapshot-script material.
