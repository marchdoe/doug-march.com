# 2026-03-18

**Design Brief:** Wine-dark bands and amber precision: a full-width Stack where every horizontal zone is a world unto itself, alternating between deep near-black luxury and one shocking cream inversion, all held together by the warmth of a single gold accent running like a thread through the dark.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Partly cloudy
**Feel:** undefined

## Claude's Rationale

The Stack archetype demands a token system built for maximum band-to-band contrast — not subtle variations but full inversions. The neutral scale is derived from hue 345° (wine/burgundy), a deliberate departure from the recent run of blue-green-olive palettes. The amber accent at hue 40° sits nearly opposite on the wheel, creating the love-and-logic tension the spec calls for: warm gold against cool-dark wine. The semantic token set distinguishes between dark-band and light-band contexts explicitly, so components can reference `textOnLight` vs `text` without touching raw hex values. Syne's architectural geometry at large weights carries the hero band; Work Sans disappears into pure service at body scale. Every token name maps directly to a Band-specification detail in the visual spec — no orphaned tokens, no guesswork downstream.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/routes/work.$slug.tsx
