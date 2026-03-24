# 2026-03-20

**Design Brief:** A page split at the equinox: obsidian infrastructure on the left, winter-stone world-news on the right, one amber seam running floor to ceiling as the only chromatic presence — two temperatures, one line, nothing resolves.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Partly cloudy
**Feel:** undefined

## Claude's Rationale

The Split: Obsidian | Stone calls for a design system built around structural duality — not a decorative choice but an architectural statement. Hue 205° ("deep water under ice") creates dark neutrals that read as genuinely submerged rather than merely shadowed, entirely different from the 212–235° cluster of the prior week. The gymnasium floor amber at 38° appears exactly once per viewport, doing maximum work as the seam border that divides the page into two climatic zones. Barlow Condensed paired with IBM Plex Sans is a precision instrument: compressed letterforms that behave like structural members (not decoration), backed by a body typeface with native tabular numerals — essential for score tables and leaderboard data. All border radii are zero. This design does not offer softness.

The Perfect Fourth scale (1.333) gives editorial drama appropriate for the extreme type range — from 9px seam footnotes to 67px hero declarations. The globalCss sets IBM Plex Sans as the body baseline with `font-feature-settings: "tnum"` globally, ensuring every number on the page lines up in columns without intervention. Semantic tokens handle the dark-panel-as-default architecture; raw stone and panel tokens give engineers the precise color values they need to build the split layout without guesswork.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
