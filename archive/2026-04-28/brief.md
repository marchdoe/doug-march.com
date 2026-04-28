# 2026-04-28

**Design Brief:** Nearly-noon spring light with the quiet sting of a close game, rendered in warm-toned scrolls that pause at two specimen moments: loss and wisdom.

## Signals


## Claude's Rationale

The director's color mandate departure is **fully justified** by the brief's own language. Their mandate suggested violet-to-red (240°–352°), but the brief explicitly calls for "celadon, soft sage, pale gold" and "warm but not hot" — violet-tinted neutrals would read cool and contradict the foundational mood. Primary hue H:88° (warm yellow-green) grounds every neutral — page bg, card bg, body text — in mid-spring warmth. At 13.5 hours of daylight, the light itself is warm-tinted, not cool. This palette honors the waxing gibbous signal (91% illuminated, almost-but-not-quite maximal) by stopping just short of pure black/white contrast; the page background is `#F2F3EE` (not `#FFFFFF`), body text is `#3D4733` (not `#000000`), creating approximately 16:1 contrast—high but restrained. The Celadon accent carries the full saturation moment; pale gold is reserved for the two Specimen beats (Pistons loss, Marley quote), creating tonal hierarchy within the scroll. Spacing tokens align with the Scroll archetype: 96px+ section padding, 32px row padding — spacious, editorial, letting each item breathe per the Awwwards signal.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
