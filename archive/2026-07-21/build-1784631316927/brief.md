# 2026-07-21

**Design Brief:** Electric-violet 80/20 Split — Brian Tracy's "EIGHTY PERCENT ON TOMORROW" knocked out huge in Bebas across a drenched violet field, Fox's winning −10 pulsing lilac, and yesterday demoted to a violet-black sliver.

## Signals


## Claude's Rationale

The day handed me a working thesis, not a decoration: Brian Tracy's instruction to spend eighty percent of your attention on the opportunities of tomorrow rather than the problems of yesterday. On a portfolio that tears itself down and rebuilds every morning — a machine designed to look forward — that is the mission statement, so I distilled it to the marquee "EIGHTY PERCENT ON TOMORROW." The phrase is quotable in isolation and, crucially, it carries its own geometry: an 80/20 ratio.

That ratio is why the composition is a Split and nothing else. The canvas divides `4fr 1fr` — the dominant violet field is TOMORROW and carries the marquee, the day's realized win (Ryan Fox taking The Open at −10, that number lit in lilac), and a clean inline nav; the narrow sliver is YESTERDAY, demoted, holding the completed Tigers box score, the music, the moon, and a small colophon. The phrase's arithmetic literally becomes the layout, which keeps the archetype content-driven rather than template-applied — directly answering yesterday's note about layouts feeling like a menu pick. Bebas Neue (bebas-plex, 1.500, Split-tagged and fresh against a rotation dominated by Anton and Big Shoulders) renders the two-line knockout at up to 160px inside the wide panel without overflow, while IBM Plex Sans keeps the attribution, scores, and sliver data crisp and tabular.

Color obeyed the mandate and the metaphor at once: recent palettes scorched the wheel and left only the 264°–301° corridor clean, and 276° electric violet is exactly the forward-tilting twilight tone this optimism wants — echoed, conveniently, by tonight's first-quarter moon. I drenched the 80% panel in saturated violet with luminous near-white type (coverage north of 62%), tinted every neutral toward the same hue so the violet-black sliver reads as the same world in shadow, and reserved a single lilac pulse for only two things: the word "TOMORROW" and Fox's winning −10. The shell stays deliberately clean — a bandless inline top row (brand horizontal-sm in single-color white via currentColor, three caps links) fixes the messy-header complaint — and the footer folds into the base of the yesterday sliver as a quiet colophon, fresh against the recent BOM/folio/ledger treatments.

## Files Changed

- elements/preset.ts
- app/components/Nav.tsx
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
- app/routes/og.tsx
