# 2026-06-30

**Design Brief:** Electric verdure drench on the first fold — four imperatives in Anton at wall scale hammered into the vivid green, then deep forest dark for the work and signals below, Nightingale's manifesto given the banner it deserves on the last day of June.

## Signals


## Claude's Rationale

The hero phrase arrived without competition from Earl Nightingale's quote in today's signals. "Build. Work. Dream. Create." is four monosyllabic imperatives separated by full stops — the grammar of a manifesto, not a sentence. Each word is a complete command. The rhythm accelerates (one syllable, one syllable, one syllable, two syllables, full stop). On the last day of June, with risk weight at 8/10, this phrase earns marquee scale not through drama but through conviction — it is the exact philosophy of a maker's portfolio rendered as pure language.

Stack was the only archetype that could honor the phrase's grammar without flattening it. The four imperatives ARE four bands: each word gets its own moment, its own vertical territory, its own line. The layout enacts what the words say. Anton at `clamp(6.5rem, 13.5vw, 15rem)` — from the `anton-inter-tight` chassis, which explicitly names Stack in its archetype affinities — renders each word at ~194px on 1440px wide. Four lines at 0.88 line-height stack to ~683px, fitting cleanly in the hero band's content area. Below the hero band, two dark forest bands carry the work catalog and signal data, creating maximum visual contrast between the vivid green first fold and the deep content that follows.

The color mandate forced the choice and the choice is exactly right: H:117° is the only open corridor (102°–125°) after six builds, and it is also the precise color of midsummer growth — chlorophyll, field, alive. The vivid green drench at `#19D413` against the deep forest near-black `#011509` of the content bands creates the Stack's "each band is a distinct moment" requirement structurally, not decoratively. Contrast ratios: imperatives on hero band 10.4:1, body text on dark 20.6:1, accent on dark 13.9:1 — all significantly above WCAG AA. The golf result (Hovland wins at −22) and Tigers victory (7−3) surface in the signals band beneath, earning their own Inter Tight treatment without competing with the phrase above.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
