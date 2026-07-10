# 2026-07-05

**Design Brief:** Electric indigo split at 62/38 — "IF YOU'RE A BUTTON, YOU HAVE ONE JOB." in Bebas Neue at wall scale against solid phosphor-blue, the void-dark right panel dense with golf leaders at −16, a Tigers shutout, and Radiohead.

## Signals


## Claude's Rationale

The phrase arrives from HN's second-highest story of the day — a UX article with 236 points titled "If you're a button, you have one job." — and it is already a design manifesto in nine words. No compression needed. The period is forensic. Bebas Neue will uppercase every letter, giving it the quality of a warning label or a specification, which is exactly the register. For a portfolio site that rebuilds itself every morning to communicate a single day's proposition, the phrase is also a self-portrait: this page has one job.

The Split archetype follows because the phrase IS an architecture, not just a statement. The left panel (62% of canvas) becomes the button: solid electric indigo (#4F5FFF), the phrase in white Bebas Neue at clamp(2.5rem, 5vw, 6.5rem), nothing else but a hairline attribution at the base. The right panel (38%) is everything the button is not: date, navigation, projects, golf leaders at −16, the Tigers' Independence Day shutout, Radiohead and Wet Leg and Tobin Sprout. The asymmetry enacts the argument. bebas-plex is the only chassis in the catalog explicitly tagged for Split with a declarative/editorial mood; its Bebas Neue display face is maximal condensed authority without the athletic bluster of Big Shoulders or the blunt weight of Anton.

Electric indigo at H:238° is the sole open corridor in the color mandate (230°–255°), and it is also exactly the right answer: it is the hue of a phosphor screen running at full brightness, of a circuit board under UV, of a CRT in a dark room. "One job" executed in this color feels urgent without alarm. White text on #4F5FFF achieves 4.78:1 contrast, meeting WCAG AA for all text sizes the hero phrase can render at. The right panel's near-void #0C0D1A creates maximum contrast between the two halves, making the seam between button and context feel like a power switch.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
