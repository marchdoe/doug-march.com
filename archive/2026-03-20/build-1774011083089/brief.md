# 2026-03-20

**Design Brief:** A proclamation made quietly at dawn in a coat you probably still need — deep indigo field lit from one edge by crescent-thin amber, the date scaled to architecture, Dumbledore's threshold wisdom floating beneath a single warm rule.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Partly cloudy
**Feel:** undefined

## Claude's Rationale

Spring equinox as threshold declaration: the palette is deep indigo-235° (astronomical twilight, just past midnight rather than before dawn) with a single warm amber-38° accent — the one stone of early light that hasn't committed to color yet. The crescent moon's 7.5% illumination is structural rather than decorative: the radial gradient places a dim warm edge at the upper-right corner, fading to the deep indigo field, so the page reads as lit from one narrow source and dark everywhere else. Cormorant Garamond at weight 300 with wide tracking gives the equinox date that wide-horizon quality the brief demands — the extreme letterSpacing.wider at 0.14em requires the lightest weight or strokes crowd each other. Lora grounds the Dumbledore quote in warmth and authority without competing. The Perfect Fourth scale (1.333) creates enough drama for the Poster archetype's extreme size range, from 9px caption metadata to 67px callout type.

The restraint is the design: one warm hue against one cold field, no secondary accents, no shadows, no card borders within the poster viewport. Dark mode is the default — `base` tokens carry dark values, `_light` overrides. The amber rule (`border-top: 1px solid #C89028`, 200px wide, centered) is the single deliberate structural warm element — the equinox as hinge, marked in the only warm light available.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
