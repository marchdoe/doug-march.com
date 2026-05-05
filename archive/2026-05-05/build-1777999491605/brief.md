# 2026-05-05

**Design Brief:** A three-word diagonal cascade in Big Shoulders condensed at 78% canvas width — crimson on sun-aged cream, the phrase pinning left, center, and right simultaneously, voices heard in full.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Sunny
**Feel:** undefined

## Claude's Rationale

The hero phrase found itself at the intersection of two signals that rarely overlap: today's music feed (Guided by Voices, top of the list) and the structural premise of the site itself (a portfolio that literally redesigns daily based on environmental signals — it is, architecturally, guided by voices). The phrase works because it refuses to collapse to a single meaning. It's a band name, a design philosophy, and a quiet declaration of method all at once. The phrase had to be loud today not because of volume but because of resonance.

The phrase's singularity dictated the Poster archetype — one dominant thing filling the viewport, everything else demoted to edges. But a standard centered-text Poster would be too easy. The compositional move — GUIDED left-anchored, BY centered and light, VOICES right-anchored — creates a diagonal sweep across the full canvas, the three words occupying a kinetic arc rather than a static stack. The eye is pulled from left to center to right, tracing the grammar of the phrase as a physical journey across the page. Big Shoulders Display at weight 800 for GUIDED/VOICES and weight 200 for BY makes BY feel like a whispered hinge between two declarations, a visual pause before the landing. The 1.618 ratio of the chassis is essential: at 26vw on a 1440px viewport, each word spans ~78% of the canvas.

The palette answers the weather directly: 79°F and sunny in May asks for warmth, not darkness. The site has run deep violet (April 30) and cobalt (April 28) and spring green (April 27) — crimson on warm cream is the one direction completely untouched. Crimson at 350° (outside the 90°–240° forbidden zone) on warm cream (`#F9F2E8`, tinted toward orange-red at ~15° HSL) reads like a concert announcement printed on sun-bleached analog paper. The neutrals share the red-orange undertone so the entire canvas feels cohesive rather than imposed — even the hairline borders and muted signal text belong to the same warm family. The bottom signal strip (48px, fixed) holds all the environmental data — weather, lunar phase, HN score, market, Mother's Day note — compressed into a single dense band so it never competes with the three words above it. The poster earns its silence.

## Files Changed

- elements/preset.ts
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
