# Signals Brief — 2026-08-30

## Hero Copy
Select a busy man.

## Hero Rationale
From `signals.quote` — Elbert Hubbard's "If you want work well done, select a busy man; the other kind has no time." Compressed to its imperative head, it becomes a poster command that is also this site's own confession: a portfolio that demolishes and rebuilds itself every single night is the busy man — never idle, always making. The full aphorism's two-part structure (the choice, then the reason) hands me the composition for free.

## Archetype
A busy man's ledger, split against a gold marquee.

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
The aphorism is two-part — a command and its reason — so I moved off the mandate's `masonry` start to `two-asymmetric`, letting the gold thesis field weigh left and the dark consequence/ledger answer right. I moved `sparse`→`measured` because the right panel must carry the day's full ledger of signals (the busy man's evidence), and `footer-only`→`marginal` for a fresh, clean margin nav (avoiding every recent masthead/spine/rail). I kept `horizontal` — the eye genuinely crosses the divide from claim to proof.

## Chassis
unbounded-figtree

## Visual Specification
### 1. Color Specification
- **Primary hue** — 46° (industry gold). Inside the allowed 39°–87° corridor; gold reads as value, energy, and productivity — the pigment of work well done. One dominant accent, no second hue.
- **Neutral palette** (warm amber-tinted sand): 50 `#FAF7EF`, 100 `#F1EBDA`, 200 `#E2D8BF`, 300 `#C9BB97`, 400 `#A38F63`, 500 `#7A6A41`, 600 `#574B2C`, 700 `#3A311C`, 800 `#221D10`, 900 `#16130B`
- **Accent color** — light `#F7CB3F`, default `#F4B90A`, dark `#DA9E00`, glow `#FADF7E`
- **Secondary accent** — none.
- **Background** — page bg (dark right field) `#16130B`; gold field (left) `#F4B90A`; ledger card bg `#221D10`
- **Text colors** — on dark: primary `#FAF7EF`, secondary `#C9BB97`, muted `#A38F63`; on gold field: ink `#16130B` (all hero + brand type)

### 2. Typography
- **Hero phrase rendering** — Unbounded (`display`) black weight, reversed as ink on the gold field, set as a stacked knockout "SELECT / A BUSY / MAN." Scale `clamp(64px, 8.5vw, 136px)`. It fills the left panel edge-to-edge; the consequence clause ("the other kind / has no time.") answers it across the divide in the dark panel at `clamp(24px, 3vw, 40px)` gold-on-dark.
- **Line heights** — hero `0.92`, deck `1.05`, body `1.5`, ledger `1.35`
- **Letter spacings** — hero `-0.01em`, body `0`, smallcaps labels `0.08em`

### 3. Layout Specification
- **Composition** — `two-asymmetric / horizontal / left-weighted / edge-bound / measured / syncopated / marginal / balanced`. The aphorism is inherently two-part, so the page splits: the gold thesis field (the busy man) weighs left; the dark evidence field (his ledger, and the idle "other kind") answers right. The eye travels horizontally across the divide, off-beat between command and consequence.
- **CSS grid structure** — `display: grid; grid-template-columns: 1.35fr 1fr; min-height: 100vh` (single column stack under 860px: gold field first, ledger below).
- **Major dimensions**:
  - Hero/gold field: `min-height: 100vh`, full-bleed left, padding `clamp(32px, 5vw, 72px)`
  - Ledger panel width: the `1fr` right column, `~42%` at desktop
  - Max content width: `none` — the split is full-bleed; side padding `clamp(32px,5vw,72px)`
  - Section padding: `48px` vertical rhythm inside the ledger
- **Nav placement** — marginal: three lowercase links stacked in the top-right margin of the dark ledger panel, no band, no pills, no border. Brand horizontal-md top-left of the gold field.
- **Hero phrase grid zone** — left column, rows spanning full height, occupying ~58% of the 1440×900 viewport at `clamp(64px,8.5vw,136px)`.

### 4. Component Character
- **Border radius** — `0` everywhere (cards, links, ledger rows). No rounded corners.
- **Border treatment** — hairline `1px` `#3A311C` rules separating ledger rows; a single `2px` ink seam on the gold/dark divide.
- **Shadow** — none. Flat split fields; depth from color contrast, not shadow.
- **Density** — measured: sparse, monumental left; tidy tabular ledger right.
- **Interactive states** — nav/links shift to gold `#F4B90A` with a 1px gold underline on hover; ledger rows brighten border to `#574B2C`.

### 5. Signal Integration
- **Where signals live** — the dark right panel IS the busy man's ledger: a running column of everything the day is doing.
- **Sports scores** — Tigers **W 2–1** as a ledger row, the "W" and score in gold `#F4B90A`, tabular numerals; Detroit label in small-caps sand.
- **Golf** — TOUR Championship leaderboard block: Hovland **−15** leading in gold, Gerard −14, Scott/Åberg/Scheffler −12 in secondary sand, tabular-aligned.
- **The quote** — IS the hero phrase; the full Hubbard line and "— Elbert Hubbard" attribution set small beneath the consequence clause in the dark panel.
- **Other signals** — weather (Sunny 84°F, a small gold sun tick), waning gibbous 88% (a dim gold arc), SPY −0.23% muted, music (My Morning Jacket · Guided by Voices) as a ledger footnote, HN "No AI Fridays" as a wry one-line marginal note. Build stamp + season fold into the ledger foot.
- **Holiday** — none today.

## Self-Check
1. Hero quotability: Yes — "Select a busy man." is a standalone imperative aphorism, screenshot-worthy on its own.
2. Because-of chain: Yes — the two-part quote drove the split composition, the split drove split-field ground, gold drove the industrious palette, Unbounded drove the confident marquee.
3. Render feasibility: Yes — three stacked words at ≤136px Unbounded fit the ~820px gold field on 1440×900 without overflow.
4. Canvas floor feasible: Yes — two full-height color fields plus a filled ledger clear 80% utilization easily.

## Rationale
The phrase is an order: "Select a busy man." Elbert Hubbard's line is a command with a reason attached, and it happens to describe this site exactly — a portfolio too busy to sit still, rebuilt nightly. Because the aphorism is structurally two-part (the choice, then "the other kind has no time"), the composition wants to argue with itself across a divide, not stack down a column. So the page splits: a `two-asymmetric` grid with a gold thesis field weighing left and a dark evidence panel answering right — echoing the owner's beloved fairway Split gold standard without copying its green or its subject.

Chassis follows the register of the phrase, not habit. This is a confident imperative, not an editorial murmur and not another condensed billboard — the last weeks leaned on Anton, Bebas, and Spectral, so I reached past them for `unbounded-figtree` (1.500), whose blocky wide geometric caps render "SELECT / A BUSY / MAN" as a monumental modern knockout while Figtree keeps the ledger tabular and clean. Palette is the committed gesture: 46° industry gold sits squarely inside the allowed 39°–87° corridor and reads as the pigment of a working day — value, energy, daylight. It is load-bearing, flooding the left field as ink-on-gold and glinting through the ledger's leaders; warm sand neutrals tint everything toward the same amber so both halves read as one world.

Layout answers the standing complaints head-on. Radii are zero on every surface. The brand is unmistakably present — the real circular mark in horizontal-md, single-color ink, top-left of the gold field. The nav is genuinely fresh against seven days of mastheads, spines, rails and pills: a quiet marginal stack in the ledger's top-right corner. And the form is dictated by content, not menu-picked — the dark panel is literally the busy man's ledger, where the Tigers' 2–1 win, Hovland's −15 at East Lake, the moon, the market, and the music become the evidence that today, too, the work got done.
