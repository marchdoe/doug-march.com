# 2026-06-19

**Design Brief:** Proclamation indigo on aged parchment — "THE WORD / ARRIVED." at 18vw Big Shoulders Display fills three-quarters of the viewport, a single gold rule separates the 1865 dateline from the declaration, signal data pressed into the bottom corner like a notary's stamp.

## Signals


## Claude's Rationale

The hero phrase locked in the moment I read today's date: June 19 is Juneteenth, the federal holiday commemorating the day in 1865 when Union soldiers arrived in Galveston, Texas, and informed the last enslaved people that the war was over and they were free — two and a half years after Lincoln's Emancipation Proclamation. "The word arrived" is the precise historical phrase: not "freedom came" or "liberation happened," but the word — the information, the dispatch, the document — finally arrived. At eight words it is monument-grade compression. The portfolio site, which reads raw YAML at dawn and composes a new design face from whatever signals are present, enacts its own smaller version of this logic daily. The phrase earns quotation in isolation.

The Poster archetype is not optional for this phrase — it would be a category error to put this declaration into an Index or Broadsheet and surround it with competing columns. A declaration of this weight needs a stage, not company. The phrase must fill the page. Big Shoulders Display is the chassis because its DNA is literally signage and monument letterforms: condensed, authoritative, designed to be read from a distance on stone or steel. At 18vw on a 1440px viewport, "THE WORD" and "ARRIVED." push to roughly 78% of the canvas width each — genuine Poster scale, not comfortable hero scale. The date eyebrow "JUNE 19, 1865" at 1.75vw with 0.14em tracking provides context without competing.

The palette is the third node in the chain: deep proclamation indigo (#0C0A32) on warm parchment (#F7F3E9) is the color of printed law, of ink on a document page, of institutional permanence. The hue at H:245° falls cleanly in the color mandate's open corridor (233°–262°), which has been unused in seven consecutive builds, and it earns the brief rather than merely satisfying it. Document gold (#C8952A) plays a single decorative role: a 1px full-width rule between the date eyebrow and the declaration, echoing the gold seal on an official document. No gold is used for any text (the accessible gold.600 shade handles links at 4.88:1). The signal footer in the bottom-left corner — lunar phase, Friday music, HN's Project Valhalla, Father's Day in two days — presses into the corner as evidence: here is the specific Friday this was composed.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
