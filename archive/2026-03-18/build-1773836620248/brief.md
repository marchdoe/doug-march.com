# 2026-03-18

**Design Brief:** Warm near-black bands stack like editorial sections in a magazine printed on amber-tinted stock, punctuated by a single cream inversion and a measured amber accent that marks every structural moment without decoration.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Partly cloudy
**Feel:** undefined

## Claude's Rationale

This system is built around amber/terracotta at 32° — the maximum chromatic distance from the last three days' blue-violet, steel-slate, and yellow-green families. The palette runs from warm near-black (#0E0B08) through a nine-step hue-tinted neutral scale to cream (#F6F3EF), with a single amber accent (#D4851F) that carries all structural punctuation: left borders, score wins, hover states, nav transitions. The secondary dusty rose (#7A3F56) is kept strictly scoped to loss indicators. Syne 800 at hero scale has an architectural compression that earns the weight, while Work Sans 300–400 provides maximum contrast in register — one font that feels built, one that disappears into service.

The Stack archetype demanded a full band-aware token set: five distinct background tokens (bgBand1–bgBand4 + bg) map directly to the layout's contrast sequence, with Band 3's cream preserved in dark mode as an always-light editorial inversion. All spacing derives from the defined scale. No shadows. No radius. Borders are hairlines only.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
- app/components/Sidebar.tsx
- app/components/FeaturedProject.tsx
- app/components/ProjectRow.tsx
- app/components/SectionHead.tsx
- app/components/SelectedWork.tsx
- app/components/Experiments.tsx
- app/components/Bio.tsx
- app/components/Timeline.tsx
- app/components/Capabilities.tsx
- app/components/Personal.tsx
