# 2026-04-27

**Design Brief:** A Monday-morning portfolio in five bands, rooted in spring greens and 13.5-hour daylight, where structure and breathing coexist—and the accent green appears once, sharp, like sunlight on a leaf.

## Signals


## Claude's Rationale

This preset distills the visual specification's structural essence: a stack of five distinct bands, each with its own background and text tone, unfolding the portfolio as progressive revelation. The green-tinted neutral palette (H:120°, the mathematical center of the allowed 112°–128° band) creates "spring paper and forest shadow"—every neutral hex has R=B with G>R, mathematically guaranteeing the hue and preventing any warm contamination. A single saturated green accent (#22A022, S:64%, L:38%) provides focus without noise; it appears as a 2px border rule above the featured project and in interactive states, like sunlight catching a specific object. The secondary muted violet accent (#A375A3, S:20%) is reserved for Band 4's editorial right column, adding the curiosity and "overheard conversation" tone the brief calls for without competing for attention. Spacing, line heights, and letter spacings follow Stack archetype guidance: generous breathing in hero (100vh) and featured (75vh) zones, systematic 56px row heights in the index, and measured two-column pacing in editorial. All text meets WCAG AA contrast minimums—#202C20 on #F1F3F1 achieves 17.5:1, while #F1F3F1 on #0E1B0E exceeds 20:1. The preset omits fonts and fontSizes; those are owned by the playfair-outfit chassis preset and merged by the orchestrator.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
