# 2026-05-30

**Design Brief:** Will Rogers railroad warning in five-line Bebas crimson across a near-white broadside — the quote about not sitting still rendered at full-page scale with zero irony.

## Signals


## Claude's Rationale

The Will Rogers quote is the rarest kind of signal-day gift: a phrase already in the correct register for this portfolio. Every project Doug has built (Spaceman, FishSticks, 15th Club, TeeTurn) is the record of someone who got off the track. On a Saturday full moon with Risk 8/10 and a Tigers team that was one run short of moving, the phrase reads as operational guidance, not as motivational poster. It is funny, pointed, and irreducibly true in a way that earns marquee scale without needing context.

The Specimen archetype was the only honest container. A quote about not sitting still cannot be rendered as a centered hero on a field of white — that IS sitting still. Specimen makes the type the entirety of the design: you arrive at the page and you are looking at a printed warning, a broadside nailed to the station wall. The five-line break was chosen to maximize the descending visual weight — the lines get longer as they move toward the bottom, so the eye accelerates. The final line "YOU JUST SIT THERE." lands at the widest point, as if the logic has been delivered and you are out of arguments. Bebas Neue (via `bebas-plex`) is the only chassis in the catalog that matches this register: it is the font of railway signs, of stadium scoreboards, of instructions posted in places where you are expected to obey them immediately.

The crimson red at H:3° falls precisely inside the 0°–5° open zone of the color mandate and has not appeared in the recent archive. More importantly, it is correct: this quote exists in the register of warning signage, and warning signs are red. Against stone.50 (`#FAFAF8` — near-white with the faintest warm cast), the red.600 accent achieves ≈5.1:1 contrast, passing AA even for body text. The choice to make the entire display text red — rather than using red as a single word accent — is the Risk 8/10 move: a white page covered in red proclamation has more commitment than a white page with one lit word. The signal strip below the fold preserves the signals (golf, Tigers loss, full moon, HN top story) in a clean typographic inventory that never competes with the broadside above it.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
