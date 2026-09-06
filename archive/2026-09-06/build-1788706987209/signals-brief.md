# Signals Brief — 2026-09-06

## Hero Copy
6–0. Shutout.

## Hero Rationale
The Tigers closed out September 5 with a clean 6–0 shutout — the one signal today that is pure, unambiguous triumph, and the exact register the owner marked as a gold standard (the 2026-09-01 trophy-gold scoreboard). A shutout is a two-part fact — the runs you scored and the zero you allowed — so the phrase carries its own structure onto the page. It beats the Yoko Ono quote both on freshness (the last four heroes lean quote-heavy) and on fit: a self-rebuilding portfolio wants to state a win, not muse.

## Archetype
reads like a stadium scoreboard split into thesis and box score

## Composition
columns: two-asymmetric
axis: horizontal
symmetry: left-weighted
hero_zone: edge-bound
density: measured
rhythm: syncopated
shell_posture: marginal
field_ratio: balanced

## Composition Rationale
A shutout is inherently two-part — the runs and the zero — so the page splits: a gold scoreboard field (left-weighted, edge-bound) carries the score, and a chalk box-score column answers it as evidence, echoing the owner's fairway-Split gold standard. I moved off the mandate's `mirrored` symmetry, `lower-third` hero and `none` shell: mirroring would flatten the thesis/evidence argument, the score wants the left field not a low band, and `none` would drop the brand the owner has repeatedly demanded — so a marginal right-margin header keeps the mark present without a top bar. Syncopated rhythm is the off-beat cadence of stat rows against the single giant number.

## Chassis
alfa-rubik

## Visual Specification
### 1. Color Specification
- **Primary hue** — 62° (golden yellow). Triumph asks for one saturated, load-bearing hue; gold is the color of a win. It sits inside the mandated 40–80° corridor and lands ~16° off the nearest recent primaries (46°, 78°) — the freshest spot the narrow corridor allows, justified below.
- **Neutral palette (warm chalk, tinted toward gold):** 50 `#f7f3e8`, 100 `#efe9d7`, 200 `#ded6bd`, 300 `#c4ba99`, 400 `#9c9270`, 500 `#6f6750`, 600 `#514a38`, 700 `#383324`, 800 `#232016`, 900 `#14120b`
- **Accent (gold):** light `#edc933`, default `#cf9f0d`, dark `#a87f0a`, glow `#e8bc16`
- **Secondary accent** — none. One hue carries the page.
- **Background** — page bg `#f4efe1` (warm paper), card/surface `#fcfaf1`, scoreboard panel (field) `#e8bc16`
- **Text colors** — primary `#1b1810`, secondary `#514a38`, muted/faint `#635b44`; on the gold field, ink `#1e1905` and muted-on-field `#574508`

### 2. Typography (alfa-rubik)
- **Hero phrase rendering** — "6–0. Shutout." set in the `display` face (Alfa Slab One) at the `hero` ramp step, a fluid clamp topping out at 177px on desktop. The numerals "6–0" carry the marquee, bound to the left edge of the gold panel; "Shutout." drops to its own baseline in `2xl`, small-caps feel via weight.
- **Type treatment** — `hero` for the score; `xl`/`2xl` for the box-score section heads ("BOX SCORE", "ON ROTATION"); `base` Rubik for evidence rows and prose (measure capped 60–66ch, leading held ~1.55); `sm` small-caps Rubik for stat labels; `xs` for the footer imprint. Mid-register `lg` standfirst under the score spends the middle of the scale.

### 3. Layout Specification
- **Composition** — two-asymmetric / horizontal / left-weighted / edge-bound / measured / syncopated / marginal / balanced. The scoreboard split lets the score dominate as a field while the box score answers it as evidence — the two halves need each other, exactly like the owner's fairway-Split gold standard.
- **CSS grid structure** — `display: grid; grid-template-columns: 1.4fr 1fr; min-height: 100vh;` Left = gold scoreboard field; right = warm chalk evidence column.
- **Major dimensions**: hero field `min-height: 100vh`; evidence column ~`42%`; `max-width: none`; left panel padding `clamp(48px, 6vw, 112px)`, right column padding `clamp(40px, 4vw, 72px)`; vertical rhythm on the chassis spacing base.
- **Nav placement** — right-margin header at the top of the evidence column: stacked brand lockup, three small-caps links beneath, one hairline rule. No top bar.
- **Hero phrase grid zone** — left panel, edge-bound: "6–0" occupies rows 1–3 flush to the left padding at clamp(110px→177px); "Shutout." rows 3–4 beneath; a `lg` standfirst ("Detroit Tigers · Sept 5") rows 4–5.

### 4. Component Character
- **Border radius** — cards/buttons/tags `0`; only the circular mark is round (`full`). Owner dislikes rounded corners — honored.
- **Border treatment** — hairline `border` on paper, `borderStrong` for the section break above the box score; `fieldBorder` for rules inside the gold panel.
- **Shadow** — none. Depth is value, not shadow.
- **Density** — measured; generous gutters, tabular rows tight within their group.
- **Interactive states** — links: dark text with a hairline underline that thickens to `accentAlt` on hover; no color-swap that could fail contrast.

### 5. Signal Integration
- **Where signals live** — the entire right column is a literal box score / stat sheet.
- **Sports scores** — the shutout IS the hero: "6–0" at marquee scale on gold; the full line "DET 6 · OPP 0 — final" heads the box score as the top stat row in tabular Rubik.
- **The quote** — Yoko Ono's line ("Some people are old at 18 and some are young at 90.") sits as a quiet pull-line footnote at the base of the evidence column, `textMuted`, not competing with the score.
- **Holiday** — Labor Day (tomorrow) is a small dated flag row: "LABOR DAY · SEP 7".
- **Music** — clearly labeled "ON ROTATION — Wet Leg · My Morning Jacket" as taste, in the lower evidence block, never beside the score as an event.
- **Other signals** — weather (Sunny 71.8°F), moon (waning crescent, 21%), market (SPY 770.19 ▾0.39%, in `textMuted`), AQI (Good) each get a tabular stat row.

## Self-Check
1. Hero quotability: Yes — "6–0. Shutout." is a screenshot-able triumph, not descriptive body copy.
2. Because-of chain: Yes — the two-part score drove the two-asymmetric split, the athletic/celebratory register drove alfa-rubik, triumph drove the single gold hue, and edge-bound left-weighting puts the score where it dominates.
3. Render feasibility: Yes — alfa-rubik tops at 177px; "6–0" is four glyphs, comfortably inside a 58%-wide panel at 1440.
4. Canvas floor feasible: Yes — a full-height gold panel plus a filled evidence column clears 80% of a 1440×900 viewport.

## Rationale
The phrase is the win: "6–0. Shutout." It is the single unambiguous triumph in today's signals, and it happens to be the exact register the owner named a gold standard — the trophy-gold scoreboard. A shutout is structurally two facts (runs scored, zero allowed), and that duality dictates the composition: a two-asymmetric horizontal split where a left-weighted gold field states the score and a chalk-paper column answers with the day's box score. The score is edge-bound to the left, dominant, the way a final number owns a scoreboard.

The chassis follows the register, not the ladder. A shutout is physical and celebratory, so I reached for alfa-rubik — Alfa Slab One renders "6–0" as a fat trophy numeral at 177px, and Rubik (a rounded grotesk that shares the display's warmth and roundness) sets clean tabular stat rows, answering the standing complaint that display and body must share a skeleton. It has never shipped in the tracked window, so it is fresh against the condensed-caps trio I was warned not to default to.

Palette commits to one hue at volume. Triumph wants a single saturated color, and gold is the win — 62°, inside the 40–80° corridor, and ~16° off the nearest recent primaries (46°, 78°), the freshest spot the narrow corridor permits; I accept the sub-60° repetition margin because the corridor is only 40° wide and the forbidden zones close everything else. The ground is split-field (fresh against the recent duotone/dark-void/drench run) — gold scoreboard against warm chalk evidence. Because the evidence column is neutral paper, the mark's original green-and-blue finally has somewhere to sit, so brand_color_mode is original (nearly never used in 17 builds). The header is a right-margin stacked lockup atop the box score — brand present, no top bar, no rounded corners — and every signal, from the moon to Labor Day to the Wet Leg / My Morning Jacket rotation, lands as a labeled stat row beneath the score.
