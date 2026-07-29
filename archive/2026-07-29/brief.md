# 2026-07-29

**Design Brief:** Front-page swagger — Woody Allen's confidence aphorism as a Spectral broadsheet lead, drenched in plum-black and hot magenta, the Tigers' 14–0 shutout pinned in the almanac column.

## Signals


## Claude's Rationale

The phrase decides everything. "Confidence is what you have before you understand the problem" is Woody Allen doing stand-up philosophy, and it is also the honest thesis of a site that rebuilds itself nightly on nerve alone. A witty, intellectual aphorism does not want to be screamed off a billboard — it wants to be *read* like the lead editorial on a front page. That is why the archetype is the Broadsheet (also the freshest in the seven-day rotation): masthead, giant headline banner, then dense columns where the day's signals become the paper's almanac. The chassis follows directly — spectral-albert, a transitional slab serif over a humanist sans, is the only pick that renders this line with dry op-ed authority rather than athletic shouting; its 1.333 ratio is explicitly sanctioned for exactly this kind of literary phrase.

Palette is the committed gesture the day's high risk-weight asks for. The mandate left only two open corridors; 328° magenta lands inside the 307–337° window and reads as pure swagger — confidence as pigment. Rather than hedge, I drench a plum-black canvas (`#1B0912`) in that hue, tint every neutral toward magenta so the columns read as one world at different depths, and light a single word — **Confidence** — in a luminous pink glow, with the Tigers' 14–0 shutout as the only other thing that lifts into accent. One hue, load-bearing, past 65% coverage, no second color hedging the edges.

Layout answers the owner's standing complaints head-on. Radii are zeroed everywhere — no rounded corners. The brand is unmistakably present via a stacked-md lockup anchored in the masthead (mono, cream, so it never reads as a gray box). The nav is a genuine newspaper masthead between hairline double-rules — a treatment nowhere in the recent rails/pills/spines/prompt-bars — and the footer is a quiet imprint rule, not the recent data strip or exit line. Crucially, the form is dictated by the content, not menu-picked: a front-page aphorism becomes a literal front page, its signals set as almanac columns, so the page reads as authored rather than templated.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Footer.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
- app/routes/og.tsx
