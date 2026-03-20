# 2026-03-18

**Design Brief:** A type specimen sheet encountered at 3am under a new moon — letterforms emerge from near-total darkness, blue-violet cold pressing through the studio glass, Cormorant Garamond hairlines barely visible, IBM Plex Mono holding the data in institutional rows.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Partly cloudy
**Feel:** undefined

## Claude's Rationale

The brief calls for a type specimen sheet encountered in a cold studio at first light — a new moon night so dark the palette must literally honor near-zero illumination. I chose Cormorant Garamond for headings because its extreme hairline-to-thick stroke contrast reads like cold letterpress ink on dark vellum at 54–81px, while IBM Plex Mono for body reinforces the code-literate, institutional personality the HN signals demand. The 228° blue-violet hue family (versus yesterday's 212° steel-slate) reads bruised and pre-dawn — almost violet, not grey. The page background #070914 goes three stops below neutral-900 to honor the 0.3% lunar illumination. The Perfect Fifth (1.500) typographic scale is justified by the Specimen archetype's sparse layout — only a handful of elements exist on each page, so the dramatic jumps from 7px attribution text to 81px display names earn their extremity.

The semantic token structure maps directly to the brief's three text registers: primary (#BBC1D8 — deliberately suppressed from harsh white), secondary (#5E6488), and muted (#373C5A — barely legible by design). The single ghost green (#3D6E54) and secondary violet (#604EA0) live as raw tokens rather than semantic aliases — they are too contextually specific (one element each) to semanticize. Every spacing value derives from the defined scale; border radii are universally zero to honor the specimen sheet's rectilinear, letterpress quality.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
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
