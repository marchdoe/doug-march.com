# Signals Brief — 2026-07-19

## Hero Copy
THERE ARE NO SHORTCUTS.

## Hero Rationale
Straight from `signals.quote` — Michael Jordan: "If you do the work you get rewarded. There are no shortcuts in life." The back half is the quotable one: a flat, undeniable declaration that reads like a locker-room stencil. It rhymes perfectly with a portfolio that tears itself down and rebuilds from scratch every single morning, and the day is stacked with proof of the grind — The Open in progress (Sam Burns clawing to −10) and the Tigers' 7–0 shutout, wins earned inning by inning, hole by hole. The line is the front-page banner of a sports section, so the whole page becomes one.

## Archetype
Broadsheet

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification
- **Primary hue** — 332° (fluoro magenta / hot risograph pink). Chosen because the color mandate leaves only the 309°–343° window clean after a week that burned nearly the whole wheel; rather than fight it, I read it as fluoro-ink poster stock — the boldest, most athletic reading of that corridor, exactly on-brief for an 8/10 risk day.
- **Neutral palette** (ink plum, tinted toward 332°):
  - 50 `#fbf3f6`
  - 100 `#f2e6ec`
  - 200 `#e0cbd7`
  - 300 `#c3a4b6`
  - 400 `#96738a`
  - 500 `#6b4d60`
  - 600 `#4a3242`
  - 700 `#31212c`
  - 800 `#1f131a`
  - 900 `#150a0f`
- **Primary (magenta) scale:**
  - 50 `#fff0f6` · 100 `#ffdbe9` · 200 `#ffb8d3` · 300 `#ff8bb6` · 400 `#ff5f9c` · 500 `#ff3d86` · 600 `#e51f6b` · 700 `#b81456` · 800 `#7d0d3b` · 900 `#470722`
- **Accent color** — light `#ff5f9c`, default `#ff3d86` (the field), dark `#b81456`, glow `rgba(255,61,134,0.55)`.
- **Secondary accent** — none. One color carries the page.
- **Background** — page bg `#ff3d86` (fluoro field); card/panel bg `#150a0f` (ink-plum knockout blocks for the leaderboard/box-score); masthead band bg `#150a0f`.
- **Text colors** — primary text `#150a0f` (ink plum on pink); secondary text `#31212c`; muted text `#4a3242`; knockout text on ink blocks `#fff0f6`.

### 2. Typography
- **Hero phrase rendering** — Big Shoulders Display at the largest chassis step via `clamp(64px, 11vw, 168px)`, all-caps, set as a two-line full-width banner ("THERE ARE NO / SHORTCUTS.") in knockout white `#fff0f6` directly on the fluoro field, spanning the full masthead-to-body gutter. It is the front-page nameplate headline: everything below is body columns.
- **Line heights** — hero `0.85`; sub-heads `1.0`; body (Atkinson) `1.5`; leaderboard rows `1.35`.
- **Letter spacings** — hero `-0.02em`; section eyebrows/labels `0.12em` (all-caps); body `0`; tabular scores `0.01em`.

### 3. Layout Specification
- **Archetype** — Broadsheet. A sports-section front page is the literal home of an earned-grind headline; the banner sits atop dense, ruled columns carrying the day's live proof (golf, baseball, the manifesto). Fresh against the last three days (Stack/Specimen/Poster).
- **CSS grid/flex structure** — outer: `display: grid; grid-template-rows: auto auto 1fr auto` (masthead / banner / column body / folio). Column body: `display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 0;` with 2px ink vertical rules between columns.
- **Major dimensions**:
  - Masthead band: full-width, height `64px`, ink-plum `#150a0f`.
  - Banner headline zone: `min-height: 34vh`, full-bleed on the pink field.
  - Column body: `min-height: 52vh`.
  - Max content width: `max-width: none`; side padding `clamp(24px, 5vw, 72px)`.
  - Vertical rhythm on 24px multiples; column gap rules 2px ink.
- **Nav placement** — masthead **top bar / nameplate**: brand lockup left, dateline "SUNDAY · JULY 19 2026 · LATE EDITION" center, three inline caps links (WORK · ABOUT · INDEX) right, all within the 64px ink band, knockout text.
- **Hero phrase grid zone** — row 2, full width (columns 1–3 spanning), occupying the ~34vh banner directly under the masthead; renders ~150px at 1440px, two lines, left-aligned to the content margin.

### 4. Component Character
- **Border radius** — 0 everywhere (cards, buttons, tags). Hard newspaper rules only.
- **Border treatment** — bordered: 2px solid `border` token (ink plum `#150a0f`) as column rules and block outlines; a 4px ink rule under the masthead.
- **Shadow** — none. Flat riso print.
- **Density** — dense/compact columns (Broadsheet ≥80% fill); tight leaderboard rows.
- **Interactive states** — links: on `_hover`, ink text flips to knockout inside a fluoro-magenta fill sweep (invert). Score rows: leader row gets a solid ink-block fill with knockout numerals.

### 5. Signal Integration
- **Where signal elements live** — column body. Column 1 (lead): the full Jordan quote as the lede paragraph + attribution, then the capabilities/manifesto run-on. Column 2: "THE OPEN — LIVE." Column 3: "TIGERS 7, VISITORS 0" box + music + lunar/sun.
- **Sports scores** — leaderboard in Atkinson tabular-nums, ink on pink; the leader (Sam Burns −10) sits in a solid ink-plum block with knockout `−10`. Golf sub-head "THE OPEN — LIVE" in caps eyebrow. Tigers 7–0 set as an oversized box-score numeral block (`7` huge in Big Shoulders, knockout on an ink panel).
- **Quote** — the quote IS the hero; the marquee banner ("THERE ARE NO SHORTCUTS.") is its punch line, and the full two-sentence Jordan quote runs as the column-1 lede with "— Michael Jordan" attribution.
- **Holiday elements** — none today (holidays null).
- **Other signals** — music (The War on Drugs · Wet Leg) as a small caps "ON THE WIRE" list in column 3; lunar (waxing crescent, 30%) and sun (05:04 / 19:28, 14.4h) as a two-line almanac footer item in the folio bar.

## Self-Check
1. Hero quotability: Yes — "THERE ARE NO SHORTCUTS." is a standalone stencil, screenshot-ready without any surrounding copy.
2. Because-of chain: Yes — flat declaration → sports-page Broadsheet → athletic condensed Big Shoulders → mandate-forced magenta read as fluoro poster stock → full-width banner over ruled columns.
3. Render feasibility: Yes — the phrase breaks cleanly to two lines at clamp(64,11vw,168) in a condensed face across a 1440px banner without overflow.
4. Canvas floor feasible: Yes — masthead + 34vh banner + three dense ruled columns + folio easily exceed 80% fill and the pink field covers ~100% for color.

## Rationale
The day's quote arrived pre-stenciled: Michael Jordan's "There are no shortcuts in life." Stripped to its marquee — THERE ARE NO SHORTCUTS — it is a locker-room decal, quotable in isolation and thematically load-bearing for a site that refuses to reuse yesterday's build and grinds out a new one every dawn. The two sports signals are the corroborating evidence: The Open still in progress with Sam Burns grinding to −10, and a Tigers 7–0 shutout — both wins assembled one clean stroke, one clean inning at a time. A phrase that lives on the front page of a sports section wants the front page of a sports section, so the whole composition becomes one: a Broadsheet, fresh against three straight days of Stack/Specimen/Poster and the honest home for a banner headline riding above dense, ruled columns of the day's proof.

Big Shoulders Display carries the banner — the most athletic, muscular, signage-grade face in the catalog (1.618 ratio), condensed enough to hold "THERE ARE NO / SHORTCUTS." across the full sheet as a knockout two-liner without tipping into overflow, while Atkinson Hyperlegible keeps the leaderboard, box score, and lede columns crisp and tabular. The color mandate scorched nearly the whole wheel and left only the 309°–343° window clean; instead of hedging into a timid pink I read it at full commitment as risograph fluoro-magenta poster stock — 332°, 100% saturation — the boldest possible reading for an 8/10 risk day. One color drenches the entire sheet (coverage ~72%); ink-plum neutrals (tinted toward the same 332°) handle rules, column dividers, and the knockout blocks that host the leader row and the giant Tigers "7".

Layout is pure newspaper: a 64px ink masthead nameplate carries the horizontal-md lockup (single-color, inheriting ink via currentColor), a centered dateline, and inline caps nav — a top-bar treatment unused in the last three shells and native to the form. Below it, the fluoro banner; below that, three ruled columns holding the full Jordan lede, THE OPEN — LIVE, and the Tigers box with music and almanac. A single folio bar closes the page with edition, moon/sun almanac, and build note — distinct from the recently-used data-strip and caption-band footers. Flat, hard-ruled, radius-zero: a print object, not a template.
