# 2026-04-15

**Design Brief:** A literary technologist's portfolio assembled in the quiet of a new moon spring evening — warm linen, dark sage, and Playfair Display's bracketed serifs holding space between the unglamorous work of showing up and the long daylight still ahead.

## Signals


## Claude's Rationale

This system builds on the Visual Specification's Stack archetype with a warm amber-sand neutral foundation (H:55°) anchored by a sage green accent (H:112°). The palette encodes the new moon's restraint — no pure black, no pure white, every stop hue-tinted — while the Perfect Fourth type scale gives Playfair Display room to command at 50px without overwhelming Source Sans 3's humanist body text at 16px. The Stack's band-based density model drives spacing: 96px major band padding signals the 13-hour daylight openness, while the tight 1.05 line-height on display type and generous 1.62 on body create the "assembled but deliberate" personality the GBV/MMJ signals call for.

The semantic token layer maps cleanly to the six band contexts — dark band text (`#EEE8D8`), light band text (`#2D2820`), sage accent, honey-gold secondary — so component authors never reach for raw hex values. The honey-gold is confined to its signal role (footer Tigers notation, dark-band links) and never bleeds into the primary content register.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/components/Footer.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
