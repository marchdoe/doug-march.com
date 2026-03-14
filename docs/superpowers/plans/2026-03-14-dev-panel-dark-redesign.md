# Dev Panel Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the dev panel to a permanent dark theme matching the canonical site design, with improved information architecture for the signals section.

**Architecture:** Single file rewrite of `app/dev-panel.tsx`. All inline styles updated to dark palette (Space Mono, navy backgrounds, cyan/green/blue accents). Signals section restructured from flat grid into 5 zones: header, atmosphere strip, quote, live data cards, profile+missing. All state management and SSE logic untouched.

**Tech Stack:** React (inline styles), Space Mono font (Google Fonts link in dev-panel.html)

**Spec:** `docs/superpowers/specs/2026-03-14-dev-panel-dark-redesign.md`
**Mockup:** `.superpowers/brainstorm/87585-1773526142/layout-dark.html`

---

## Pre-flight: Codebase Context

**File to modify:** `app/dev-panel.tsx` (standalone SPA component)
**Font link file:** `app/dev-panel.html` (needs Space Mono added)
**Repo root:** `/Users/dougmarch/Projects/dougmarch`
**Branch:** `phase-1`
**Dev server:** `pnpm dev` then navigate to `http://localhost:<port>/dev`

**Key constraint:** This is a standalone SPA served by vite middleware — it does NOT use PandaCSS or the styled-system. All styles are inline React `style` objects.

---

## Chunk 1: Dark Theme Foundation + Signals Redesign

### Task 1: Add Space Mono font to dev-panel.html

**Files:**
- Modify: `app/dev-panel.html`

- [ ] **Step 1: Add the Google Fonts link for Space Mono**

Add to `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Commit**

```bash
git add app/dev-panel.html
git commit -m "feat: add Space Mono font to dev panel HTML"
```

### Task 2: Rewrite dev-panel.tsx with dark theme and new signals layout

**Files:**
- Modify: `app/dev-panel.tsx`

This is the main task. The file keeps all existing state management, data fetching, SSE pipeline logic, and event handlers. What changes: all styles, the signals rendering, and theming of overrides/run/progress/success/error sections.

- [ ] **Step 1: Replace the style constants**

Replace the entire `const s = { ... }` block with dark-themed styles. Key colors from canonical preset:
- Page background: `#050C18`
- Card background: `#070F1E`
- Borders: `#0A1828`
- Primary text: `#D4E8F8`
- Secondary text: `#7AADC4`
- Dim text: `#3E6882`
- Muted text: `#2D5070`
- Ghost text: `#0D2040`
- Cyan accent: `#00E5FF`
- Green: `#5CBE4A`
- Blue: `#4A8FD4`
- Font: `'Space Mono', monospace`

All styles should use this palette. The existing style object keys can change — they're only used within this file.

- [ ] **Step 2: Replace the SignalsGrid component with zone-based layout**

Remove the existing `SignalsGrid` component and its helpers (`PROVIDER_ICONS`, `PROVIDER_ORDER`, `formatProviderData`). Replace with these new components:

**`AtmosphereStrip`** — renders the 5 derived signals (season, day_of_week, sun, lunar, holidays) in a single horizontal band. Each cell: tiny uppercase label, large bold value, muted subtitle. Uses the provider data from `signals` prop and `meta` prop for latency.

**`QuoteBlock`** — renders the quote signal as a blockquote with left border.

**`LiveDataCards`** — 2×2 grid containing:
- `SportsCard` — scorecard layout. Active teams (have a game result) get green highlight row with W/L badge + monospace score. Off-season teams dimmed.
- `GolfCard` — tournament name, status, leaderboard with position/name/score.
- `GitHubCard` — language dots + repo names as blue links.
- `HackerNewsCard` — orange score numbers (fading heat) + story titles.

**`BottomRow`** — 2-col: music (blue pill tags) + books (left), missing signals with dashed border + env var names (right).

Each component receives `signals: Signals` and `meta: Meta | null` as props and extracts what it needs.

- [ ] **Step 3: Update the header section**

Replace the header JSX in the `DevPanel` return with:
- Title: `DAILY REDESIGN` in bold `#D4E8F8`, uppercase
- Date: below title in `#3E6882`, uppercase with wide letter-spacing
- Badge: `DEV SERVER` with pulsing cyan dot, cyan border/text on dark background

- [ ] **Step 4: Update the signals section**

Replace the signals rendering between `{/* Signals */}` and `{/* Overrides */}` with:
```tsx
<SignalsHeader meta={meta} date={signals.date} />
<AtmosphereStrip signals={signals} />
<QuoteBlock signals={signals} />
<LiveDataCards signals={signals} meta={meta} />
<BottomRow signals={signals} meta={meta} />
```

- [ ] **Step 5: Re-theme the overrides section**

Update mood dropdown, notes textarea, and save button to dark theme:
- Labels: `#2D5070`, 8px uppercase
- Inputs: `#070F1E` background, `#0A1828` border, `#7AADC4` text
- Save button: `#0A1828` background, `#3E6882` text

- [ ] **Step 6: Re-theme the run pipeline section**

- Run button: cyan glow background (`rgba(0,229,255,0.1)`), cyan border, cyan text
- Dry run label: `#3E6882`
- Last run text: `#2D5070`

- [ ] **Step 7: Re-theme ProgressSection**

- Outer border: `#0A1828`
- Header bar: `#070F1E` background
- Phase tracker: dark background, phase dots use green (done), cyan (active), `#0D2040` (pending)
- Log pane: already dark (`#0f172a`) — adjust to `#050C18`
- Running indicator text: cyan

- [ ] **Step 8: Re-theme SuccessSection**

- Border: green tint (`rgba(92,190,74,0.2)`)
- Background: `#070F1E`
- Success text: `#5CBE4A`
- Timing bars: green shades
- Open site button: `#5CBE4A` background
- Archive list: green text hierarchy

- [ ] **Step 9: Re-theme ErrorSection**

- Border: `rgba(239,68,68,0.2)`
- Background: `#070F1E`
- Error text: `#ef4444`
- Retry button: `#ef4444` background

- [ ] **Step 10: Verify in browser**

Start dev server, navigate to `/dev`, verify:
1. Dark theme renders correctly
2. All signal data displays in the right zones
3. Overrides controls work (mood dropdown, notes, save)
4. Run pipeline button is clickable
5. No React errors in console

```bash
pnpm dev
# Navigate to http://localhost:<port>/dev
```

- [ ] **Step 11: Commit**

```bash
git add app/dev-panel.tsx
git commit -m "feat: dev panel dark redesign — canonical theme, zone-based signals layout"
```

### Task 3: Visual verification and polish

- [ ] **Step 1: Run existing tests**

```bash
pnpm vitest run
```

Expected: all tests pass (dev panel has no unit tests — this verifies nothing else broke).

- [ ] **Step 2: Run the signal collector to populate fresh data**

```bash
node scripts/collect-signals.js
```

- [ ] **Step 3: Reload dev panel and verify all zones**

Check each zone has real data:
- Atmosphere strip shows current season/day/sun/lunar/holidays
- Quote displays
- Sports shows team results
- Golf shows leaderboard with actual scores
- GitHub shows trending repos
- HN shows stories with scores
- Music shows band pills
- Missing signals shows env var names

- [ ] **Step 4: Fix any visual issues and commit**

```bash
git add app/dev-panel.tsx
git commit -m "fix: dev panel visual polish"
```
