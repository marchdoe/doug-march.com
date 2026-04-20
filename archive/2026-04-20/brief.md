# 2026-04-20

**Design Brief:** Eucalyptus sage foundation with warm clay metadata accents, light-mode morning clarity, zero ornament — typography and negative space as sole design instruments.

## Signals


## Claude's Rationale

The brief provides exhaustively detailed specifications for a light-mode Specimen portfolio with eucalyptus sage as the dominant neutral system. The design tokens operationalize a rigorously constrained palette: a 10-step sage neutral family (H:158°, S:5–10%) governing all backgrounds and secondary text, paired with a single clay accent (H:18°, S:70%, reserved for project metadata and callouts only). The color mandate to avoid zones 0°–112° is honored at H:158°, which sits 33° eastward of the recent Apr 17 position (H:125°) and maintains the required 76° separation from Apr 18 (H:82°). All spacing derives from an 8px base scale (4, 8, 16, 24, 32... 128px), and typography tokens mirror the Perfect Fourth ratio specified: line heights (0.90–1.75) and letter spacings (−0.03em to +0.14em) support the archetype's typographic-only hierarchy. The waxing crescent signal (17% illumination) is baked into the shadow opacity (0.05 max) and border colors (neutral-200 rather than neutral-300), creating a softened-light aesthetic without harshness. Light mode is the sole mode; semantic tokens map to page backgrounds, card surfaces, footer inversions, and text hierarchies that support the specified asymmetric 12-column work grid and hero-centric layout.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
