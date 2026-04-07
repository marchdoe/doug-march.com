# 2026-04-07

**Design Brief:** Doug March's Tuesday: spring light filtered through April precision, watching golf tighten and the Masters approach while Detroit stumbles, all held in newsprint clarity with breathing room.

## Signals


## Claude's Rationale

The brief demands a Broadsheet visual system rooted in spring daylight (April 7, 12.7-hour cycle, last quarter moon at 67% illumination). The primary neutral palette derives from hue 88° (yellow-green, warm-tinted gray) at very low saturation (6-9%), creating a "lit" feeling without cold-grey flatness. The accent palette uses ochre/gold (#C4992E) as the editorial spine (leaderboard highlight, quote border) with a single use of spring green (#4F8646) for J.J. Spaun's leader score, encoding visual restraint and precision. Typography pairs Syne (angular, tight letter-spacing—Radiohead influence) with IBM Plex Sans (spacious body) and IBM Plex Mono (tabular texture for leaderboard/HN). The scale uses Perfect Fourth ratio (1.333) to create editorial drama within the Broadsheet archetype. All tokens carry their explicit `value` property; semantic tokens reference base tokens with curly-brace syntax. Accessibility is preserved: primary text (#1D1F13) on page bg (#F4F5ED) achieves 9.8:1 contrast, nearly double WCAG AA.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
