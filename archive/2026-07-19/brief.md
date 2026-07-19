# 2026-07-19

**Design Brief:** Fluoro-magenta sports-page Broadsheet — Jordan's "THERE ARE NO SHORTCUTS." stenciled white across risograph pink, ink-plum columns ruling in the live Open leaderboard and a 7–0 Tigers box score under a nameplate masthead.

## Signals


## Claude's Rationale

The day's quote arrived pre-stenciled: Michael Jordan's "There are no shortcuts in life." Stripped to its marquee — THERE ARE NO SHORTCUTS — it is a locker-room decal, quotable in isolation and thematically load-bearing for a site that refuses to reuse yesterday's build and grinds out a new one every dawn. The two sports signals are the corroborating evidence: The Open still in progress with Sam Burns grinding to −10, and a Tigers 7–0 shutout — both wins assembled one clean stroke, one clean inning at a time. A phrase that lives on the front page of a sports section wants the front page of a sports section, so the whole composition becomes one: a Broadsheet, fresh against three straight days of Stack/Specimen/Poster and the honest home for a banner headline riding above dense, ruled columns of the day's proof.

Big Shoulders Display carries the banner — the most athletic, muscular, signage-grade face in the catalog (1.618 ratio), condensed enough to hold "THERE ARE NO / SHORTCUTS." across the full sheet as a knockout two-liner without tipping into overflow, while Atkinson Hyperlegible keeps the leaderboard, box score, and lede columns crisp and tabular. The color mandate scorched nearly the whole wheel and left only the 309°–343° window clean; instead of hedging into a timid pink I read it at full commitment as risograph fluoro-magenta poster stock — 332°, 100% saturation — the boldest possible reading for an 8/10 risk day. One color drenches the entire sheet (coverage ~72%); ink-plum neutrals (tinted toward the same 332°) handle rules, column dividers, and the knockout blocks that host the leader row and the giant Tigers "7".

Layout is pure newspaper: a 64px ink masthead nameplate carries the horizontal-md lockup (single-color, inheriting ink via currentColor), a centered dateline, and inline caps nav — a top-bar treatment unused in the last three shells and native to the form. Below it, the fluoro banner; below that, three ruled columns holding the full Jordan lede, THE OPEN — LIVE, and the Tigers box with music and almanac. A single folio bar closes the page with edition, moon/sun almanac, and build note — distinct from the recently-used data-strip and caption-band footers. Flat, hard-ruled, radius-zero: a print object, not a template.

## Files Changed

- elements/preset.ts
- app/components/Sidebar.tsx
- app/components/Layout.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
- app/routes/og.tsx
