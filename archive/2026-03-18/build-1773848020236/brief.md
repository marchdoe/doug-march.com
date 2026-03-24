# 2026-03-18

**Design Brief:** Midnight blue ink on warm cream newsprint — the cold March air before the equinox, the broadsheet still folded on the table, the warmth coming from inside, not yet from the sun.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Partly cloudy
**Feel:** undefined

## Claude's Rationale

The brief calls for a broadsheet newspaper archetype on the Wednesday before the spring equinox — cold March air, cream newsprint, midnight blue ink. The palette leans into that specific temperature tension: warm cream backgrounds (hue ~40°) against cool blue-ink neutrals (220°), with a single crimson accent that earns its presence sparingly, exactly as a masthead rule or a sports score win does in a real paper. Playfair Display at 700/900 is the only typographic choice that makes a grid read as broadsheet rather than landing page — the high contrast thick-thin strokes carry editorial authority at a glance. Source Sans 3 recedes into pure service at body size and never competes.

This is a light-mode-first design, which alone creates maximum departure from the dark-mode archive. The `base` semantic token values are the light/cream values; `_dark` overrides push to ink-blue backgrounds for completeness without compromising the primary use case. Zero border-radius, zero shadows, hairline-only structure, and compact density are locked at the token level to enforce the document-not-app character throughout.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/routes/work.$slug.tsx
