# Dev Panel Layout Redesign — Design Spec

**Date:** 2026-03-16
**Status:** Approved (v2 — post review)

---

## Overview

The `/dev` route is the control panel for the daily redesign pipeline. It currently renders as a single scrollable page with signals, overrides, and the pipeline runner stacked vertically. This spec restructures it into a sidebar-navigated multi-pane layout while preserving the existing dark monospace design aesthetic exactly.

---

## Current State

The dev panel (`app/routes/dev.tsx`) is a single-page layout with these sections:
- Header: "// SIGNALS" with 16/17 badge and date
- 5-column signal summary row: Season, Day, Sun, Lunar, Upcoming
- Daily quote block
- Signal detail grid in 2-column pairs: Sports/Golf, GitHub Trending/Hacker News, Weather/News, Market/Product Hunt, Music/Books
- Overrides: Mood Override dropdown + Notes for Claude textarea
- Run Pipeline button + Dry run checkbox
- Progress tracker with 6 phases (when running)
- Success/Error panels

**Note:** The signal display in `dev.tsx` currently shows only Weather, Sports, Golf, GitHub, News as 5 cards (lines 196-211). The full signal grid shown in the screenshot (Season, Day, Sun, Lunar, Upcoming, Sports, Golf, GitHub, Hacker News, Weather, News, Market, Music, Books, Product Hunt) comes from a separate HTML-based dev panel. This spec preserves whichever signal display is current at implementation time — the layout restructure is independent of signal content.

**Design language:** Dark navy background, monospace font (Space Mono), `// SECTION` labels in uppercase muted color, cyan/green accents, data-dense cards with subtle borders, win/loss badges in green/red pills.

---

## What Changes

### Layout: Single page → Sidebar + Pane

Replace the single scrollable page with a two-column layout:

```
┌──────────────────────────────────────────────────┐
│  Header: doug-march.com · Dev Panel    [status]  │
├─────────────┬────────────────────────────────────┤
│             │                                    │
│  Pipeline   │                                    │
│  Archive    │        Active Pane Content          │
│  Prompt     │                                    │
│  Inspector  │                                    │
│             │                                    │
│─────────────│                                    │
│ ▶ Run       │                                    │
│   Pipeline  │                                    │
│             │                                    │
├─────────────┴────────────────────────────────────┤
```

This is a desktop-only dev tool. No responsive/mobile layout is required.

### Header

A persistent header bar at the top spanning full width:
- Left: Site name ("doug-march.com") + subtitle ("Daily Redesign · Dev Panel") in the existing monospace style
- Right: Status badge ("dev server running") + "Open Site ↗" link

### Sidebar Navigation

A persistent left sidebar (~180-200px) with:
- **Top section:** Pipeline, Archive, Prompt Inspector — standard nav items
- **Bottom section (separated by divider):** "▶ Run Pipeline" — navigates to the Run pane
- Active item highlighted with left border accent (cyan or green, matching existing accent colors)
- Uses the same monospace font and muted label style as the current design
- When the pipeline is running, the "▶ Run Pipeline" sidebar item shows a running indicator (amber dot or pulsing icon) visible from any pane

### State Management

All pipeline state (`pipelineStatus`, `phases`, `logLines`, `result`, `attemptNum`) lives in the parent `DevPanel` component, NOT inside any pane component. This ensures state survives pane switching — the user can navigate to Archive while the pipeline is running and come back to the Run pane without losing progress.

### Four Panes

Each sidebar nav item shows a different pane in the main content area:

#### 1. Pipeline (default/landing pane)

The current signals view, restructured to fit the pane:
- All signal cards and detail grids (whatever is present at implementation time)
- Quote block (if present)
- Overrides section (Mood Override dropdown + Notes textarea + Save button)
- Last run summary: date and brief from the most recent archive entry

This is everything currently on the page EXCEPT the Run button and progress/success/error panels.

#### 2. Archive

Design history browser:
- Section header: "// ARCHIVE" with entry count
- Each archived design as a row:
  - Date (bold, today highlighted with accent)
  - Design brief text (italic)
  - Metadata: changed file count (parsed from brief.md `## Files Changed` section)
  - Actions: "View Brief" (expands full rationale inline)
- Today's entry highlighted with subtle accent background
- Sorted by date descending

**Data model changes:** Extend `ArchiveEntry` in `archive-impl.ts` to include:
- `rationale: string` — parsed from `## Claude's Rationale` section in brief.md
- `filesChanged: string[]` — parsed from `## Files Changed` section in brief.md

Font information is NOT available in the archive (not stored in brief.md) and will not be shown.

"Restore" functionality (reverting to a past design) is a **future feature** — it requires archiving actual file snapshots, which is not currently done. The Archive pane in this spec does NOT include a Restore button.

#### 3. Prompt Inspector

**Placeholder pane for this spec.** Shows a message like "// PROMPT INSPECTOR — Available when agent swarm is active" with a brief description of what it will show.

This pane will be fully wired when the agent swarm (separate spec) is implemented. At that point it will show the prompts sent to each designer agent with token/byte counts. No implementation of prompt display is required in this spec.

#### 4. Run Pipeline (bottom nav item)

A dedicated pane for running and monitoring the pipeline:
- Header: "// RUN PIPELINE" with dry run checkbox and Run button
- Phase tracker showing current pipeline steps (use `INITIAL_PHASES` from existing code — these will update when the agent swarm is implemented)
- Live log output pane (dark background, monospace, auto-scroll)
- Success panel (brief, timestamp, "Open Site" button)
- Error panel (error message, retry button)

**Idle state (before any run):** Shows the Run button, dry run checkbox, phase tracker with all phases pending, and an empty log pane.

**Sidebar interaction:**
- Clicking "▶ Run Pipeline" in the sidebar **only navigates** to the Run pane. It does NOT trigger the pipeline.
- The pipeline is triggered only by clicking the "Run" button inside the Run pane. This prevents accidental triggers.
- If the pipeline is already running when the user clicks the sidebar item, it navigates to the pane showing current progress. It does NOT re-trigger.

---

## Design Constraints

### Preserve Exactly

- Dark navy/slate background colors
- Space Mono (or current monospace) font throughout
- `// SECTION` label pattern (uppercase, monospace, muted color)
- Signal card styling (dark cards, subtle borders, data-dense)
- Win/loss badge colors (green/red pills)
- Cyan/green accent colors for highlights and active states
- Progress dot indicators (green ✓, amber active, gray pending)
- Log pane styling (very dark background, monospace, amber highlights)
- All existing functionality (signals display, overrides, SSE pipeline runner)

### Do Not Change

- Server functions (`readSignals`, `saveOverrides`, `readArchive`)
- API route (`/api/-pipeline.ts`) — SSE pipeline runner
- Route path (`/dev`)
- Data loading pattern (TanStack Router loader)

---

## What Changes in Code

### Modified Files

- `app/routes/dev.tsx` — Restructure into sidebar layout with four panes. Extract pane content into sub-components. Add `activePane` state. Keep all existing styles, adding sidebar/layout structural styles. If the file exceeds ~600 lines, pane components may be extracted to co-located files (e.g., `app/routes/dev/-archive-pane.tsx`) using TanStack Router's `-` prefix convention.
- `app/server/archive-impl.ts` — Extend `_readArchiveHandler` to parse `rationale` and `filesChanged` from brief.md. Extend `ArchiveEntry` type to include these fields.

### New Files

None expected — pane extraction is optional based on file length.

---

## Non-Goals

- No design system changes (colors, fonts, spacing)
- No new routes or pages
- No changes to the pipeline runner logic
- No changes to signal collection or interpretation
- No Restore functionality in Archive (future feature)
- No Prompt Inspector implementation (placeholder only — wired with agent swarm)
- No mobile/responsive layout (desktop-only dev tool)
