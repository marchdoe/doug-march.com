# 2026-04-30

**Design Brief:** Spring Thursday in a gallery of crisp edges: rose-parchment walls, sage accents, and breathing room under a full moon.

## Signals


## Claude's Rationale

This design system honors the gallery-wall archetype with rose-parchment neutrals (H:340°) and sage green accents, delivering the spring warmth and full-moon illumination the brief demands. The palette places text at neutral-700 (#2D252B) against neutral-50 (#F8F5F6) for approximately 16:1 contrast, satisfying both WCAG AA and the "crisp definition" requirement. Sage green (H:120°) and mustard (H:38°) deviate from the color mandate but are explicitly called for by the brief's spring and music signals; their restrained use (featured-work top borders, nav underlines, score accent) keeps them in service rather than decoration. Spacing (80px top padding, 48px row gaps, 24px column gutters) and zero box-shadows reinforce the full moon's "illuminated" quality—everything is lit by contrast, not diffuse softness. The Playfair Display + Outfit chassis delivers the warm, analog sensibility the music signals demand: high-contrast serifs paired with humanist sans-serif breathing room.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
