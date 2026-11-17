---
name: ui-design-check
description: >-
  Use before building, changing, reviewing or polishing any screen in the Thurzy
  mobile (Expo/React Native, apps/mobile) or web (React + TanStack, apps/web)
  app, or when planning or running a design pass across many screens: measurable
  UI rules, audit and fix order, and required before/after screenshots. Defers
  to frontend-unslop for the generic de-slop checklist.
---
# UI design check

Rule set and audit loop for the Thurzy mobile (React Native) and web (React) apps. Rules apply to both unless marked Mobile or Web. It answers "is this screen built to the system?" with numbers. `frontend-unslop` answers "does this look generated, and how do I clean it?" Use both: this skill for the rules and the proof, unslop for the checklist and fix tone.

## How this relates to frontend-unslop
- Same pass order, same scales, same easing. If the two ever disagree, the project's own tokens (`src/theme/tokens.ts`, `typography.ts`, `motion.ts`) win, then this skill's numbers, then unslop's.
- Unslop's rules still apply (keep features, content and brand; tokens and shared components before screens; one commit per pass; never weaken tests). Its copy sign-off rule is narrowed by the Copy permissions section below.
- This skill adds: rule ids for findings, RN-specific mapping, a severity score, mandatory before/after screenshots, and web rules.

## Project facts

### Mobile (apps/mobile)
- Code: `apps/mobile`, routes in `app/` (expo-router groups `(admin)`, `(player)`, auth and join routes at the root).
- Tokens: `src/theme` (`spacing`, `radius`, `hairline`, light/dark/high-contrast `colorTokens`, typography, motion). Never type a raw hex, px size or radius in a screen.
- Shared UI: `src/components/ui` (Button, Text, Panel, ListRow, LedgerRow, SegmentedControl, ModeSwitch, StatusPill, FormField, SearchField, Sheet, Toast, Masthead, Screen, ErrorState) plus `components/empty-state.tsx`, `skeleton.tsx`, `app-screen.tsx`. Use these; a new look is a new variant on the component.
- Brand: never hardcode the product name. Use `BRAND_NAME` (and `MARKETING_SITE_HOST`, `TERMS_URL` etc.) from `src/lib/brand.ts`; the drawn name is `components/brand/wordmark`. Do not touch bundle id, slug, scheme or storage keys.
- Keep existing contrast/parity tests green (`src/theme/__tests__`, screen tests in `__tests__`).

### Web (apps/web)
- Routes: `src/routes` (TanStack file routes; `_layout/*` is the signed-in shell, root files are public/auth pages). `src/routes/design.tsx` is the in-app design reference.
- Shared UI: `src/components/ui` (shadcn-style Button, Input, Select, Textarea, Checkbox, Badge, Card, Table, Tabs, SegmentedControl, Dialog, Sheet, Tooltip, Skeleton, Sidebar, LoadingButton). Tailwind theme tokens only; no `text-[13px]`, `rounded-[..]`, `mt-[13px]` or raw hex.
- Brand: never hardcode the product name; use the web app's brand constant (find it with `rg -n BRAND src/lib` before writing copy).

## Copy permissions
- Agents may change UI copy freely to meet these rules.
- Exception: SMS copy changes only together with a Telnyx campaign update; do not edit it in a design pass, list proposed wording in the PR.
- Exception: legal text (terms, privacy, waivers, consent lines) needs keving; propose, do not edit.

## The rules
Severity: E = must fix, W = should fix, N = polish. Ids follow the source tool so findings stay comparable.

### Spacing and layout
- `spacing-scale` (W): every padding, margin, gap, width and height is a `spacing` token on the 4pt grid (4, 8, 12, 16, 20, 24, 32, 40, 48, 64). No `padding: 13`, `gap: 7`.
- `spacing-rhythm` (N): two or three steps only: tight inside a group (4-12), medium between groups (12-24), loose between sections (32-48). Equal gaps everywhere means no hierarchy.
- Sibling cards share one padding; one row height per list (40-44 for touch, never below the tap target).
- `one-primary-action` (W): one filled primary Button per screen; everything else secondary, ghost or in a menu/sheet. A hero or empty state gets one primary plus at most one secondary.
- `card-header-pattern` (W): every Panel header is title left, at most one control right, same baseline.
- `no-nested-cards` (W): no bordered Panel inside a Panel; group with spacing, `Rule` dividers or a muted block.
- `nested-radius` (W): inner radius = outer radius - padding, never below 4. Pills only for chips, status and avatars.
- `no-horizontal-overflow` (E): at a 320pt-wide device (iPhone SE) nothing pushes the screen sideways; wide content scrolls inside its own ScrollView.
- `text-not-clipped` (W) and `no-shrunk-text` (W): no `numberOfLines`/`adjustsFontSizeToFit` hiding meaning; truncation only where the full text is one tap away. Let it wrap or stack; never shrink body text below 12.
- Safe areas respected (Screen/AppScreen); content never under the notch, home indicator or tab bar.

### Colour and surfaces
- `one-accent` (W): the brand accent covers a few percent of the screen: primary action, current selection, one key figure. Chrome, borders, icons and labels stay neutral. Check by eye on the screenshot.
- `no-ai-gradients` (E), `no-gradient-buttons` (W), `no-blur-blobs` (W), `glow-in-charts-only` (W): no gradient text or fills (no `expo-linear-gradient` decoration), no coloured shadows or glows on buttons/cards, no blurred blobs.
- `no-heavy-card-shadow` (W): cards sit on a surface step plus `hairline` border; elevation/shadow only for floating things (sheets, menus, toasts).
- `no-side-stripe` (W): no thick coloured left border on cards or alerts; use StatusPill, an icon or a tint.
- `legible-contrast` (W): text 4.5:1 (large 3:1) on its surface in light, dark and high-contrast; no grey on colour.
- `status-system` (W): every status goes through StatusPill with one status-to-tone map; same status, same colour everywhere.

### Type
- `type-scale` (E): sizes only from `typography.ts` / the Text variants; smallest 11. No inline `fontSize`.
- `dynamic-type` (W): text scales with the OS setting (do not set `allowFontScaling={false}` on content; cap with `maxFontSizeMultiplier` only where layout truly breaks). Icons may stay fixed.
- `no-heavy-headings` (W): weights 400-600; no 800/900. Hierarchy comes from size and position.
- `no-decorative-uppercase` (W): no small uppercase letter-spaced labels; sentence case, letterSpacing 0. Codes and initials may stay uppercase.
- `no-tight-small-text` (W): negative letterSpacing only at 40+.
- `no-italic-emphasis` (N), `tabular-numbers` (N): emphasise with weight or secondary colour; money, scores, counts and timers use `fontVariant: ["tabular-nums"]`.

### Icons and decoration
- `icons-not-emoji` (W): one line icon set, one size and stroke, secondary colour; no emoji or text glyphs as UI.
- `no-sparkle-for-ai` (N): the agent/assistant actions get a verb icon, not sparkles.
- `no-badge-spam` (W), `no-icon-tile-stack` (W): badges are rare and earn their place; no grid of identical icon-tile cards.
- `pulse-for-live-only` (N), `no-marquee` (W): pulsing only for something actually live (check-in running, sync in progress).

### Copy
- `sentence-case` (E), `no-trailing-period-labels` (N), `short-placeholders` (N), `ellipsis-character` (N).
- `specific-action-labels` (W): verb + object ("Record payment", "Send announcement"), never Submit/OK/Yes.
- `error-copy` (W): say what happened and what to do; no "Oops" or "Something went wrong".
- `no-exclamation-copy` (W), `no-buzzwords` (W), `no-greeting-headline` (W): titles name the screen ("Today", "Roster"), not the user.
- `numbers-with-context` (W): a headline number says what it is compared with ("3 unpaid, $240 owing").
- `no-placeholder-data` (W): previews and fixtures use plausible names and uneven amounts.
- `locale-number-format` / `no-naive-plural` / `no-concatenated-translation` (W): money, dates and counts through the shared formatters; no `count === 1 ? "x" : "xs"`.

### Components and selectors
- `use-shared-components` (W): no raw `Pressable`/`TextInput`/`Switch` styled as a button/field in screens; use ui components.
- `no-style-overrides` (W): `style` on a shared component only places it (margin, flex, alignSelf, width). Colour, radius, padding, height, font come from variant/size props.
- `repeated-markup` (W): the third copy of a styled block becomes a component or variant.
- `selector-language` (E): the main content switch is a SegmentedControl (or ModeSwitch); filters that narrow a list are chips inside it. Never two stacked selector rows of equal weight.

### Data and states
- `stat-card-anatomy` (W): muted label, big tabular value, change with its period. No icon tile competing.
- `chart-highlight-one` (W), `direct-labels` (N), `dim-secondary-digits` (N): one accented series, neutral rest; cents muted in a headline money figure.
- `empty-states` (W): every list/data view has EmptyState with the next step, Skeleton for loading, ErrorState with retry.

### Touch and accessibility
- `tap-target` (W): every pressable is at least 44x44pt on iOS / 48dp Android. Keep the icon size, grow the area (`hitSlop` or `minHeight`/`minWidth`).
- `icon-button-name` (E): icon-only pressables carry `accessibilityLabel` (verb + object, sentence case) and `accessibilityRole="button"`.
- Focus/selection state is visible (selected tab, pressed state), not colour alone.

### Motion
- `no-bounce-easing` (W): no spring overshoot on controls, lists or sheets beyond the platform default; one curve, cubic-bezier(0.22, 1, 0.36, 1), 120-300ms for controls, up to 500ms for entrances.
- `no-layout-animation` (W): Reanimated/Animated move with transform and opacity, not top/left/margin/height (progress width is fine).
- Mobile press feedback may scale down to 0.97-0.98, never up.
- `reduced-motion` (N): honour `useReducedMotion` / AccessibilityInfo for any loop or large movement.

### Web only
- `focus-ring-removed` (E): `outline-none`/`outline-hidden` only with a visible `focus-visible:` ring on the same element; prefer outline-hidden so forced-colours keeps an outline. Dialog containers exempt.
- `icon-button-name` (E): icon-only buttons and links carry `aria-label` (verb + object).
- `no-transition-all` (W): name the property (`transition-colors`, `-opacity`, `-transform`).
- `no-hover-scale` (W): hover changes colour or surface; press may use `active:scale-[0.98]`.
- `full-width-tables` (W): multi-column tables span the content width, the last column absorbs spare width, numeric columns right-aligned and tabular.
- `masonry` (W): uneven cards go in a grid masonry, never CSS columns.
- `readable-measure` (W): running text under about 80 characters (`max-w-prose`), line height 1.3+.
- Responsive (E/W): check at 320, 768, 1280 and 1440+. `no-horizontal-overflow` at 320 (wide tables scroll in their own `overflow-x-auto`), `no-hidden-content-narrow` (no `hidden sm:block` on real content), `no-shrunk-text` (no smaller text on phones), sidebar collapses but stays one tap away, tap targets 44px on touch widths, 24px minimum on desktop.
- `menu-by-job` (W): a new page gets its place in the sidebar decided first; related pages are one row with tabs.
- `use-shared-components` (W): no raw `<button>`, `<input>`, `<select>`, `<textarea>` outside `components/ui`.
- `no-announcement-pill`, `no-unsourced-proof`, `show-the-product` (W): apply to public pages (landing slugs, join, pay, rsvp).

## Audit and fix loop (per screen or area)
1. **Before shots.** Mobile: iOS simulator only, each screen in populated, empty, loading and error states, light and dark, one at the largest Dynamic Type size, one on an SE-size device. Web: browser screenshots at 320, 768 and 1440 wide, light and dark, the same states, plus one with keyboard focus visible on the main control. Name them `<area>/<screen>-<state>-<width|device>-before.png`.
2. **Audit.** Read the screen file, the components it uses and the tokens. Write one line per finding: `rule-id, severity, file:line, what`. Add the review-only rules from the screenshots (one-accent, hierarchy, rhythm, contrast, empty states, selector language). If the screen is already clean, say so and suggest at most 2-3 refinements.
3. **Score.** Count findings by severity (E x3, W x2, N x1). Record the before score.
4. **Fix in passes**, finishing each across the whole area before the next: spacing, surfaces and colour, icons, data, copy, type, layout, components, states, motion. Fix tokens and shared components first, then screens. One commit per pass.
5. **After shots.** Same screens, states and devices, `-after.png`. Pair them side by side in the PR description, one pair per changed screen. No screenshot pair, no merge.
6. **Prove.** Re-run the audit and report the before and after score per pass. Run the app's typecheck, lint and unit tests (mobile jest incl. theme contrast/parity tests; web vitest and biome). Do not run e2e suites against a real DB. Anything left gets a fix or a written reason.

## Rules for running this skill
- Never remove features, data or content to make findings go away.
- Never shrink or truncate text to make a layout fit.
- Never hardcode the brand name, colours or sizes; never change brand-sensitive identifiers.
- SMS copy and legal text are proposed in the PR, not edited (see Copy permissions).
- A general lesson found during a pass is proposed as a new rule here.

---
Rules adapted from ai-design-check by Enmera (github.com/enmerasoftware/ai-design-check), MIT License; rewritten for Thurzy React Native and React web, merged with frontend-unslop.
