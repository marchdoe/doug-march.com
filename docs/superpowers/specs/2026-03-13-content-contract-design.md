# Content Contract Design

**Date:** 2026-03-13
**Status:** Approved
**Branch:** feature/daily-redesign-phase1

---

## Problem

The daily redesign pipeline gives Claude full freedom to rewrite component files. Without constraints, Claude can accidentally break prop interfaces, drop data fields, or skip entire sections of the site. The pipeline needs a structural guarantee: the right sections always exist, and all content always surfaces — regardless of what the design looks like that day.

## Goal

Define a content contract that:
- Guarantees required sections appear in every redesign
- Ensures all content keys are rendered (nothing silently dropped)
- Gives Claude maximum design freedom within those constraints
- Is enforced at the component level, not just the prompt level

---

## About Page Direction

The About page is being redesigned alongside the contract work. Current state: a 200-line monolithic route with hardcoded bio copy and inline styled components.

**Intent:** Showcase excellence without pitching. The page answers the implicit questions — "how do we hire this person," "how do we collaborate," "what gap do they fill" — through the quality and clarity of the content, not through explicit CTAs.

**Core differentiator to communicate:** Doug operates at both ends of the design/engineering handoff problem. He ensures fidelity (what was designed is what gets built) and feasibility (what gets designed is actually buildable). Not a generalist — someone who has gone deep in both.

**The person behind the work:** Avid golfer (4 holes in one), Michigan native (Lions, Tigers, Pistons, Red Wings fan), spent the past year going deep on AI as a force multiplier in product work.

**Tone:** Confident, not a pitch. No CTAs. The daily redesign story is not on this page — it lives in the archive for curious visitors to discover.

---

## Content Files

### Existing (unchanged)
- `app/content/projects.ts` — project data (off-limits)
- `app/content/timeline.ts` — career timeline + capabilities

### New
**`app/content/about.ts`** — four exports:

```ts
identity: {
  name: string           // "Doug March"
  role: string           // "Designer & Developer"
  statement: string      // 2-3 sentence bio (written by Doug, locked)
}

timeline: TimelineEntry[] // re-exported from timeline.ts (or kept here)

capabilities: string[]    // re-exported from timeline.ts (or kept here)

personal: {
  holesInOne: number      // 4
  sport: string           // "golf"
  teams: string[]         // ["Lions", "Tigers", "Pistons", "Red Wings"]
  currentFocus: string    // "Using AI as a force multiplier in product work"
}
```

---

## Sections Manifest

Required sections in every redesign. Claude cannot skip or remove these.

### Home (`/`)
| Section | Component | Must render |
|---|---|---|
| Featured project | `FeaturedProject` | title, problem, link |
| Selected work | `SelectedWork` | each project: title, type, year, link |
| Experiments | `Experiments` | each project: title, type, year, link |

### About (`/about`)
| Section | Component | Must render |
|---|---|---|
| Bio | `Bio` | identity statement |
| Career history | `Timeline` | each entry: year, role, company, description |
| Capabilities | `Capabilities` | all capability strings |
| Personal | `Personal` | holes in one, teams, current focus |

### Shell (every page)
| Section | Component | Must render |
|---|---|---|
| Navigation | `Sidebar` | name, role, nav links |

---

## Component Architecture

### Direct imports (no props for content data)
Components import their own data directly from `app/content/`. Eliminates prop interface breakage — Claude redesigns the component, never the data contract.

```ts
// Before (brittle)
export function ProjectRow({ project, index }: Props) { ... }

// After (contract-safe)
import { selectedWork } from '../content/projects'
export function SelectedWork() { ... }
```

### New components extracted from `about.tsx`
| File | Renders |
|---|---|
| `app/components/Bio.tsx` | Identity statement from `about.ts` |
| `app/components/Timeline.tsx` | Timeline entries from `timeline.ts` (data stays where it lives) |
| `app/components/Capabilities.tsx` | Capabilities list from `timeline.ts` (data stays where it lives) |
| `app/components/Personal.tsx` | Personal facts from `about.ts` |

`about.tsx` becomes a thin route that assembles these four components.

### Mutable files list update
Add to `scripts/utils/site-context.js`:
- `app/components/Bio.tsx`
- `app/components/Timeline.tsx`
- `app/components/Capabilities.tsx`
- `app/components/Personal.tsx`

---

## Prompt Contract Enforcement

New section added to the system prompt in `scripts/utils/prompt-builder.js`:

```
## Content Contract

Every redesign must include all required sections. Do not remove or
rename component exports.

Home:  FeaturedProject, SelectedWork, Experiments
About: Bio, Timeline, Capabilities, Personal
All:   Sidebar with name, role, and nav links

Each component imports its own data directly from app/content/.
Do not change import paths or remove data keys from renders.
You may change everything about presentation — layout, typography,
order, interaction — but every key must appear.
```

---

## Out of Scope

- Archive UI (Phase 3 — future)
- Auto-populating signals (Phase 2 — future)
- Sidebar identity content moving to a content file (hardcoded strings are identity, not content — leave as-is)
