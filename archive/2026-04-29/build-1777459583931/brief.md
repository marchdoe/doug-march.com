# 2026-04-29

**Design Brief:** Violet-tinted void meets near-white in a columnar portfolio where full moon clarity drives ~19:1 contrast, spring moss accents appear only when earned through interaction, and three audience-specific columns (creative direction, technical depth, context) replace sidebar patterns—edited, not decorated.

## Signals


## Claude's Rationale

The full moon (96.5% illumination) and its demand for maximum clarity architect the entire token system. Hue 280° (cool violet) tints all neutrals at 5–8% saturation—imperceptible warmth, unifying the palette through a single hue family rather than temperature shifts. The result: #09080B page background against #F0EDF6 near-white text creates ~19:1 contrast, matching the high-visibility environment of a full moon night and mirroring the brief's "lucid" mood. Spring moss green (H 140°, S ~31%) is deployed with deliberate constraint—full saturation appears exactly once per viewport (the 2px accent rule above featured work), everywhere else reduced to interaction states or disabled opacity. This restraint honors both the spring signal and the full moon's monochromatic discipline. The broadsheet archetype (three columns segmented by audience role) organizes information with editorial clarity and density appropriate to Wednesday's midweek focus. No shadows, no gradients—instead, hairline dividers (1px), precise letter-spacing (7-value scale from −0.025em to +0.15em), and breathing room in line-height (1.05–1.85) echo Radiohead's geometric accuracy and Guided by Voices' raw, unadorned intentionality.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
