# Owner Panel Restyle — Design

**Date:** 2026-07-21
**Status:** Approved (visual direction and mockups signed off via brainstorming companion)
**Prior art:** `2026-07-20-production-owner-panel-design.md` (the panel being restyled)

## Problem

The production owner panel at `/panel` shipped functionally complete but visually
unstyled: default browser buttons and textareas, a bare tab strip with no
active-state indication, no spacing system, no visual hierarchy. It also has two
theme-leak bugs — `borderColor: 'currentColor'` (ArchiveTab) and `fontSize: 'sm'`
(ArchiveTab, WeightsTab) resolve against the site's daily-changing theme, which
violates the panel's own theme-proof rule.

## Goal

Make the panel look and feel like a designed product while improving usability of
the daily rating flow, on both phone and desktop. Frontend-only: no API,
middleware, or behavior changes.

## Decisions made during brainstorming

1. **Optimize for:** looks and usability equally.
2. **Devices:** phone and desktop with equal weight; thumb-friendly controls.
3. **Visual direction:** "Clean utility" — light, neutral, dashboard-quiet.
   Rejected: dark mission-control, warm editorial ledger.
4. **Structure:** keep the current four-tab layout exactly (Rate / Archive /
   Weights / Run). Rejected: adding a status header with run pill and unrated
   badge.

## Visual system

The panel remains **theme-proof**: raw CSS values only, never site theme tokens,
because the pipeline redesigns the site's tokens daily. The panel's identity is
permanent and independent.

- **Palette:** white surfaces on `#fafafa` page; zinc grays (`#f4f4f5` fills,
  `#e4e4e7` borders, `#d4d4d8` input borders, `#71717a` muted text,
  `#3f3f46` secondary text, `#18181b` ink/accent); `#16a34a` success,
  `#dc2626` error. No other hues.
- **Type:** `system-ui` stack (unchanged), 16px base; scale 11px uppercase
  labels / 12–13px secondary / 14px body / 17px page title. Tabular numerals
  for slider values.
- **Shape:** 8px radius on controls, 12px on the sheet card; `0 1px 3px
  rgba(0,0,0,.06)` card shadow, `0 1px 2px rgba(0,0,0,.08)` active-tab shadow.

## Architecture

One new file: **`app/components/panel/styles.ts`** — the panel's mini design
system. Exports Panda `cva()`/`css()` recipes built from the palette above:

- `sheet` — white card that wraps the whole panel
- `segTabs` / `segTab` — segmented control (gray track, white active pill)
- `fieldLabel` — 11px uppercase label
- `textArea` — bordered input with visible focus ring
- `button` — variants: `primary` (ink), `secondary` (outlined)
- `gradeButton` — 44px square, selected = ink fill + white text
- `badge` — grade chip, variants: `graded` (green), `none` (gray)
- `statusDot` — 8px dot, variants: success/failure/running

The five existing files (`panel.tsx`, `RateTab.tsx`, `ArchiveTab.tsx`,
`WeightsTab.tsx`, `RunTab.tsx`) consume these recipes and drop their ad-hoc
`css()` calls. The two theme-leak bugs disappear as a side effect because every
color and font size becomes an explicit raw value.

## Per-component treatment

- **panel.tsx:** page gets `#fafafa` background; content in the `sheet` card,
  640px max-width, centered; `Tabs.List` becomes the segmented control using
  Base UI's `data-selected` styling hook.
- **RateTab:** date heading ("July 20 · 2026-07-20"); labeled grade group with
  44px buttons; labeled textareas; full-width primary submit; success/error
  lines in status colors. "Also unrated" list becomes secondary buttons.
- **ArchiveTab:** rows separated by `#f4f4f5` hairlines; date (semibold) +
  grade `badge` + archetype (muted) on one line; brief and ✓/✗/→ rating notes
  as muted secondary lines.
- **WeightsTab:** label + tabular-nums value row above each slider; styled
  track (4px, `#e4e4e7`) with ink fill and white bordered thumb (16px visual,
  ≥44px hit area); description as muted caption; primary save button.
- **RunTab:** latest run in an outlined summary box with `statusDot` + status
  text + timestamp + GitHub link; styled checkbox row; primary trigger button.

## Responsive & accessibility

- Single centered column; behaves identically from 360px to desktop.
- All touch targets ≥44px (grade buttons, tab hits, slider thumb hit area,
  buttons).
- Keep existing aria attributes (`aria-pressed` grade group, `role="alert"`
  errors, slider labels); every interactive element gets a visible
  `:focus-visible` ring (`2px solid #18181b`, offset 2).

## Error handling

Unchanged — same states and messages as today, restyled (errors in `#dc2626`
with `role="alert"`, success in `#16a34a`).

## Testing & verification

- Existing vitest suite stays green (`pnpm vitest run` after panda codegen).
- No new unit tests required (no logic changes); if recipe variants warrant it,
  a snapshot-free class-presence test is acceptable but optional.
- **Definition of done:** run the panel locally, exercise all four tabs, and
  capture screenshots at ~375px and ~1280px widths confirming the mockup look;
  verify against the production daily theme that no daily-theme values leak in.

## Out of scope

- API/middleware/backend changes of any kind
- Status header, unrated badges, or any structural additions (explicitly
  rejected during brainstorming)
- Dark mode
- Site-facing pages, dev panel (`/dev`), or shared elements
