# Signals Brief — 2026-09-02

## Hero Copy
Simplicity is the glory of expression.

## Hero Rationale
Walt Whitman's line arrives from `signals.quote` on a clear, calm, 78°F September day, and for a site whose entire premise is tearing itself down and rebuilding nightly, "simplicity is the glory of expression" is both a design creed and a dare to prove it in the layout itself. It is quotable in complete isolation, it names the exact virtue a poster of restraint tries to earn, and it hasn't been said here before. The recent-quote flag shows only one prior quote day and no streak, so the lane is open, and this line is plainly the strongest thing in today's data — the Tigers' 2–15 blowout and a down market are both negatives that would fight the mandated warm-sunny palette, so they belong in the margins, not the marquee.

## Archetype
a poster that argues its own thesis — restraint as the loud move

## Composition
columns: single
axis: vertical
symmetry: broken
hero_zone: full-bleed
density: sparse
rhythm: interrupted
shell_posture: folded-into-hero
field_ratio: type-dominant

## Composition Rationale
I moved `columns` off the suggested `three` to `single` because a single aphorism wants to be one object at poster scale, not chopped into newspaper measure — three columns would contradict the very word "simplicity." I kept `vertical`, `broken`, `sparse`, `interrupted`, `type-dominant` from the mandate's start, and used `broken` as the load-bearing gesture: the closing clause drops and indents so the one violation of symmetry becomes "the glory of expression." I moved `hero_zone` from `interleaved` to `full-bleed` (a threaded hero fights a poster) and `shell_posture` from `none` to `folded-into-hero`, because the owner's standing complaint demands the real brand mark be present — folding it into the hero keeps the mark visible without adding a nav band. No axis lands on a recently-used value, so I did not need the Max-Risk License; the risk here is spent on committing to restraint — a quiet drench with one flourish — rather than on a rule-break.

## Chassis
hanken-solo

## Visual Specification
### 1. Color Specification
- **Primary hue** — 78°, a sunlit acid-yellow. The color mandate targets 40–80° warm-sunny; the recency-avoid list swallows most of the warm arc up to 76°, and 08-30 already spent 46° gold, so I land at 78° — the clean edge of the target, a brighter, more electric yellow than the recent gold, and a literal echo of a clear 78°F afternoon.
- **Neutral palette (olive-yellow tinted)** — 50 `#FAF9EE`, 100 `#EFEDD9`, 200 `#DAD5B8`, 300 `#BDB68E`, 400 `#969067`, 500 `#726C44`, 600 `#524D2C`, 700 `#38341C`, 800 `#232010`, 900 `#141207`
- **Yellow scale (h≈78)** — 50 `#FBFCE6`, 100 `#F4F9C6`, 200 `#E7F191`, 300 `#DBEA5F`, 400 `#CFDE33`, 500 `#B6C81C`, 600 `#96A612`, 700 `#71800E`, 800 `#4C560B`, 900 `#2A3007`
- **Accent color** — light `#DBEA5F`, default (deep olive-yellow ink for marks/fills) `#4C560B`, dark `#2A3007`, glow `#71800E`
- **Secondary accent** — none. One hue carries the page.
- **Background** — page bg (drench field) `#CFDE33`; card/surface `#E7F191`; dark knockout plane (field) `#17140A`
- **Text colors** — primary `#141207`, secondary `#38341C`, muted/faint `#524D2C`; reversed on the dark plane: `#D4E24A` (ink) and `#96A612` (muted)

### 2. Typography (chassis: hanken-solo — one humanist grotesk, three weights)
- **Hero phrase rendering** — the phrase is set in the `hero` ramp step (fluid clamp, ~96px at 1440), full-bleed, `text-wrap: balance`, at the display weight. hanken-solo is deliberately the quiet end of the loudness ladder: Whitman is a literary line that does not want shouting, and a single-voice grotesk *is* simplicity rendered as type. Critically it also answers the 09-01 complaint — display and body are the same skeleton, so nothing reads as a headline pasted onto a default page.
- **Type treatment** — four steps, real contrast: `hero` for the phrase; a mid-register `xl`/`lg` standfirst line directly under it (the attribution + one editorial gloss) so the page spends the middle of the scale instead of jumping title→caption; `base` for the single body line; `xs` uppercase tracked (+0.08em) for the nav and colophon micro-labels. Leading and tracking come from the chassis ramp per step; I set no line-height values.

### 3. Layout Specification
- **Composition** — `single / vertical / broken / full-bleed / sparse / interrupted / folded-into-hero / type-dominant`. A single quotable statement wants to be one object at viewport scale, not a newspaper of columns; the broken symmetry is the one flourish — the last clause "of expression." hangs on its own dropped, indented baseline, so the *break in the grid is literally the glory of expression*.
- **CSS grid/flex structure** — `display: grid; grid-template-rows: auto 1fr auto; min-height: 100vh;` full-bleed single column. The middle row centers the phrase block; brand folds into the top row, colophon into the bottom.
- **Major dimensions**:
  - Hero/featured area: the phrase block occupies the centered `1fr` row, ~64vh of breathing field around it
  - No sidebar
  - Max content width: `none` — full-bleed drench, side padding `clamp(24px, 6vw, 96px)`
  - Section padding: vertical rhythm from the chassis spacing base; generous `clamp(48px, 10vh, 140px)` top/bottom air (sparse)
- **Nav placement** — folded into the hero, a single baseline line beneath the phrase: `WORK · ABOUT · CONTACT`, three uppercase micro-links, dot-separated, no band, no pills, no border.
- **Hero phrase grid zone** — the centered row, columns full-width, roughly rows 2 of 3; intended render ~96px on desktop across 2–3 balanced lines, the final clause dropped and indented.

### 4. Component Character
- **Border radius** — `0` on every surface (cards, links, colophon tile). Only the circular brand mark is round, from its own geometry. Directly answers the standing rounded-corners complaint.
- **Border treatment** — hairlines only where needed: `border` (`#96A612`) as faint rules on the yellow field, `borderStrong` (`#232010`) for the one emphatic divide above the colophon.
- **Shadow** — none. Depth comes from the value jump between yellow field and dark knockout plane, never from shadow.
- **Density** — spacious/sparse; the field does the work.
- **Interactive states** — nav links: on `_hover`, ink shifts to the deep accent `#4C560B` and gains a 2px underline offset 6px. No motion beyond a 120ms color transition.

### 5. Signal Integration
- **Where signal elements live** — a quiet stacked colophon tile, bottom-left, in `textMuted`/`textFaint`. The poster stays uncluttered; the day's facts are a footnote, not furniture.
- **Sports scores** — Tigers `2–15 L` set small in `textFaint`, deliberately demoted — a blowout loss has no business shouting on a page about grace.
- **Quote** — the quote IS the hero phrase; attribution "— Walt Whitman" sits in the standfirst directly under it.
- **Holiday** — Labor Day flagged as one micro line in the colophon: `Labor Day · in 5`.
- **Music** — Radiohead / Tobin Sprout given a single rotation line, `on rotation ·` prefix, so it never reads as an event beside the score.
- **Other signals** — clear/78° (the color's own source, noted `clear · 78°`), SPY `−0.69%` in faint tabular figures, last-quarter moon `◑ 64%`, all in the colophon stack.

## Self-Check
1. Hero quotability: Yes — "Simplicity is the glory of expression." is a complete, screenshot-worthy aphorism, not a body-copy opener.
2. Because-of chain: Yes — simplicity → single-column sparse poster → single-voice grotesk (hanken) → one-hue drench → phrase centered full-bleed with the one broken clause as the flourish.
3. Render feasibility: Yes — six words at ~96px across 2–3 balanced lines fits 1440×900 full-bleed with air to spare; hanken's hero clamp is built for exactly this quiet-marquee scale.
4. Canvas floor feasible: Yes — a full-bleed yellow drench plus centered marquee, baseline nav and corner colophon comfortably fills 70% of the viewport.

## Rationale
The phrase decides everything. "Simplicity is the glory of expression." is Whitman handing a self-rebuilding portfolio its own creed on a clear, quiet September day — a line that only earns its weight if the page enacts it rather than merely quoting it. So the composition is a single full-bleed column, sparse to the point of stillness, one statement at viewport scale with nothing to argue against it. The single deliberate move — the broken symmetry, where the closing clause drops and indents onto its own baseline — is the page's only flourish, and it maps exactly onto the sentence: the one place structure breaks is where "expression" happens.

Chassis follows the register, not the loudness ladder. A literary aphorism about simplicity should not be screamed off a condensed billboard, so I passed over the recently-overused condensed and expressive display faces for hanken-solo — one humanist grotesk in three weights. It is the quiet end of the marquee range by design, and that restraint is the point; a single-voice family is *simplicity rendered as type*, and it directly answers the 09-01 complaint that display and body must share a skeleton, because here they are the same face at different weights.

Palette commits to one hue at volume. The mandate points warm-sunny 40–80°; recency has already spent the warm gold at 46°, and the avoid-list closes the arc up to 76°, so I take the clean edge at 78° — a brighter, more electric acid-yellow that reads as a sunlit clear day and stands apart from the recent gold. The ground strategy is drench (breaking the recent split-field): yellow floods 75%+ of the field, dark olive-ink knockout planes carry the reversed micro-type, and the brand folds into the hero as a single-color mark because a drench is exactly the day the mono mark is the honest answer. The Tigers' 2–15 loss and the down market live as demoted footnotes in a bottom-left colophon, where negatives belong on a page about grace — and the whole thing is a fully-compliant maximum-risk day whose risk is spent on the nerve to withhold, not on a rule-break.
