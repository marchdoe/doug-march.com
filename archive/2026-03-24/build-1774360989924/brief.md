# 2026-03-24

**Design Brief:** A page divided at 42% illumination — cold hemisphere and lit crescent sharing a spine, the moon's face held still while the season negotiates.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Sunny
**Feel:** undefined

## Claude's Rationale

The 42/58 lunar split demanded a design system built around duality rather than a single palette. I chose two distinct neutral families — cold (hue 222°, steel blue) and warm (hue 45°, amber-parchment) — each with full 50–900 shade scales, so the left and right panels can function as completely independent visual worlds while sharing the same token architecture. The accent is deliberately singular: spring amber-orange (hue 32°) reserved exclusively for Opening Day, the one element allowed to feel eager. Sage appears only for market data. Three hues total, with one doing almost all the emotional work.

Spectral pairs with Oswald on the principle of posture contrast: Spectral reclines (high stroke contrast, editorial weight), Oswald inclines (condensed, upright, forward-leaning). The Perfect Fourth scale (1.333) gives enough drama for the xl/2xl display sizes without the extremes of a Perfect Fifth. All semantic tokens are anchored to dark mode (cold panel as baseline), with `_light` overrides for the warm panel. The no-border philosophy is baked into the token architecture — no shadow tokens, zero-radius defaults, and the panel division exists only as background collision.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
