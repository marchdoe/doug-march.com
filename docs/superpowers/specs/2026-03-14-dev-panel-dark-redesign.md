# Dev Panel Dark Redesign — Design Spec

**Date:** 2026-03-14
**Status:** Approved
**Mockup:** `.superpowers/brainstorm/87585-1773526142/layout-dark.html`

---

## Overview

Redesign the signals section of the dev panel (`app/dev-panel.tsx`) to use a permanent dark theme matching the canonical site design. The dev panel should look like a dev tool — not like the daily site — and remain visually consistent regardless of the day's redesign.

---

## Design Language

Pulled directly from `themes/canonical/preset.ts`:

- **Font:** Space Mono (monospace throughout)
- **Backgrounds:** `#050C18` (page), `#070F1E` (cards), `#0A1828` (borders)
- **Text hierarchy:** `#D4E8F8` (primary), `#7AADC4` (secondary), `#3E6882` (dim), `#2D5070` (muted), `#0D2040` (ghost)
- **Accents:** `#00E5FF` (cyan — active/interactive), `#5CBE4A` (green — success/wins), `#4A8FD4` (blue — links/info), `#f97316` (orange — HN scores)
- **Labels:** Comment-style `// SIGNALS`, `// SPORTS` in uppercase with wide letter-spacing
- **Borders:** 1px solid `#0A1828`, dashed for missing/inactive sections

---

## Information Architecture

Five distinct zones, top to bottom:

### 1. Signals Header
Slim bar: `// SIGNALS` label, green health capsule (`12 / 17` with pulsing dot), collection latency in monospace, date right-aligned.

### 2. Atmosphere Strip
Single horizontal band for all 5 derived signals (season, day, sun, lunar, holidays). Background `#070F1E`, internal dividers `#0A1828`. Each cell shows:
- Tiny uppercase label (e.g., `SEASON`, `SUN`)
- Large bold value as hero text (e.g., `Spring`, `11.7h`, `Saturday`)
- Subtitle in muted color (e.g., `March · Day 73`, `06:30 ↑ 18:09 ↓`)

Color coding: green for season/holidays, cyan for weekend, blue for sun/lunar.

### 3. Quote Block
Blockquote with left border (`#2D5070`). Italic text in `#7AADC4`. Author in `#3E6882`. Subtle `DAILY QUOTE` label top-right in ghost color.

### 4. Live Data Cards (2×2 grid)
Four cards in two rows:

**Sports (scorecard):**
- Active team: green background tint, green dot, bold name, `W` badge pill, monospace score
- Off-season teams: gray dot, dim text, italic "off season"

**Golf (leaderboard):**
- Tournament name bold, status in cyan
- Position numbers, player names, scores in green monospace

**GitHub Trending:**
- Language-colored dots (like GitHub), repo names in blue (`#4A8FD4`)

**Hacker News:**
- Orange score numbers (bright→pale gradient by score), story titles

### 5. Bottom Row (2-col)
**Left:** Music (blue pill tags) + Books (empty state in ghost text)
**Right:** Missing Signals — dashed border, ghost colors, shows provider name + required env var name

---

## Scope

**File to modify:** `app/dev-panel.tsx` — the entire component (styles, types, rendering)

**What changes:**
- All inline styles updated to dark theme colors
- `Signals` type interface already dynamic (from previous work)
- `SignalsGrid` component replaced with the new zone-based layout
- `SignalCard` removed
- Header, overrides, run button, progress, success/error sections all re-themed
- Phase labels updated for 3-stage pipeline

**What doesn't change:**
- All state management, data fetching, SSE pipeline logic stays the same
- The `ProgressSection`, `SuccessSection`, `ErrorSection` keep their structure but get dark-themed
- Override controls (mood dropdown, notes textarea, save button) keep same behavior

---

## Non-Goals

- No new npm dependencies (Space Mono loaded via Google Fonts link in `dev-panel.html`)
- No component extraction — keep everything in one file (it's a standalone SPA)
- No changes to the API endpoints or data format
