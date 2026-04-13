# 2026-04-13

**Design Brief:** A Monday morning in sage and still water — Specimen scale with Broadsheet bones, lit by overcast April light and a crescent barely showing its edge.

## Signals


## Claude's Rationale

This palette is built on H:105° sage green — the hue of April foliage filtered through overcast morning light. The neutral scale runs from `#F2F4EF` (sage-tinted paper) through `#202B1D` (dark sage-charcoal), never touching pure black. The accent teal (`#2B8880`) reads as still water or new growth — present but restrained, honoring the waning crescent's 9.9% illumination. Syne at extreme Specimen scale (clamp 80–160px) carries the lo-fi, considered personality of the music rotation; DM Sans recedes cleanly at body size so the type gap does all the hierarchical work. The Perfect Fourth scale (1.333) adds enough editorial drama for a Specimen archetype without becoming theatrical.

The Specimen-with-Broadsheet-undertones structure is embedded in the tokens: section spacing runs 96px for major breaks, 48px for secondary, and 24px for list items — spacious macro with tight micro. Row height tokens (48px) and the dual max-width system (1100px specimen / 720px body) encode the Broadsheet's information discipline. Border radius is 0px everywhere meaningful; no shadows exist in this system. The waning crescent lives in every color decision: primary text at `#202B1D` instead of near-black, accent saturation pulled back, no gradients, no drama.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
