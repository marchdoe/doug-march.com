# 2026-04-03

**Design Brief:** A light-mode Gallery Wall for spring's long daylight and the full moon's clarity—sage neutrals and structured sans-serif restraint, where each portfolio piece breathes separately and the rust accent appears only where it matters most.

## Signals


## Claude's Rationale

Doug's portfolio demands a light-mode design system that uses restraint as its primary tool—clear spatial hierarchy, high contrast for legibility and moonlit drama, and a typographic voice that favors angular precision over warmth. The sage-olive neutral palette (hue 92°) grounds the design in early-April freshness without saturation, while the rust accent (#C26535) appears structurally only once (the quote's vertical rule), preventing visual chaos. The Perfect Fourth scale (1.333) with Switzer headings and IBM Plex Sans body creates the brief's "angular Radiohead energy"—tight tracking in functional text, open breathing in paragraphs. Semantic tokens map the neutral scale to readable roles (bg, text.secondary, text.muted, border), enabling consistent Gallery Wall placement of projects without tonal guesswork. The spacing scale is anchored to 4px, respecting the spec's explicit dimensions (20px gaps, 24px whitespace rows, 40–80px section padding).

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
