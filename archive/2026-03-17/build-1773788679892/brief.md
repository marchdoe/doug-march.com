# 2026-03-17

**Design Brief:** A crimson broadsheet rising against St. Patrick's Day — burgundy ink on dark stock, hairline rules instead of borders, and Syne's geometric tension stretched to 50px masthead weight while Work Sans keeps the columns readable.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Partly cloudy
**Feel:** undefined

## Claude's Rationale

The brief calls for a crimson-burgundy editorial palette on St. Patrick's Day — a deliberate subversion of expectation. The Broadsheet archetype demands chromatic heat and typographic density, so I've built the entire neutral scale from hue 350° with subtle warmth throughout. Syne's geometric editorial presence at large sizes mimics a print masthead letterform, while Work Sans provides a clean, readable body with enough weight variation for the density this layout requires. The Perfect Fourth (1.333) scale creates genuine drama between label copy (9px) and headline display (50px) — a 5.5× range that gives the broadsheet its vertical hierarchy.

The token system maps directly to the spec's intent: bgCard sits slightly lighter than bg, the crimson accent is unmodified at full saturation (not whispered away with opacity), and the gold secondary is reserved as an `accentGold` semantic token for the date stamp and metadata callouts only. Dark mode is the canonical base; light mode inverts with proper contrast ratios.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
- app/components/FeaturedProject.tsx
- app/components/ProjectRow.tsx
- app/components/SectionHead.tsx
- app/components/SelectedWork.tsx
- app/components/Experiments.tsx
- app/components/Bio.tsx
- app/components/Timeline.tsx
- app/components/Capabilities.tsx
- app/components/Personal.tsx
