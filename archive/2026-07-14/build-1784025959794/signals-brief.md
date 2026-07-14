# Signals Brief — 2026-07-14

## Hero Copy
It is better to point out your own mistakes than have somebody else do it.

## Hero Rationale
Warren Buffett's line is today's `signals.quote`, and it lands as autobiography for a portfolio that tears itself down and rebuilds every morning — a site that publishes its own corrections in public. It's quotable stripped of context (it circulates as a standalone Buffett maxim) and it rhymes with the day's honest self-reports: the Tigers owning a 0–5 shutout, a new moon at 0.2% resetting the ledger to zero. With risk dialed to 8/10, a plain-spoken imperative about candor wants blunt, billboard candor — not decoration.

## Archetype
Split

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification
- **Primary hue** — 233° cobalt/ultramarine. The color mandate leaves only the 225°–247° corridor open (all warm and violet zones are forbidden after the recent run), and cobalt is thematically exact: the blue of correction ink, of an honest cold read. Committed as a full-field drench.
- **Neutral palette (Indigo Slate, tinted toward blue):**
  - 50 `#f6f6fb`
  - 100 `#ecedf5`
  - 200 `#d9dbe8`
  - 300 `#b9bcce`
  - 400 `#8e91a8`
  - 500 `#6a6d84`
  - 600 `#4e5167`
  - 700 `#3a3d50`
  - 800 `#24263a`
  - 900 `#14162b`
- **Accent color (Electric Sky, secondary/emphasis blue):** light `#a9c3ff` · default `#6f9bff` · dark `#4f7aff` · glow `rgba(111,155,255,0.45)`
- **Secondary accent** — Electric Sky is the *only* secondary; used to light the single emphasized phrase "OWN MISTAKES" and the primary signal marker. No warm accent (mandate + coherence).
- **Background** — page bg `#2437d8` (cobalt drench) · right-panel/card bg `#14162b` (deep indigo slate) · inset chip bg `#24263a`
- **Text colors** — primary text (on cobalt) cream `#f4f1e6` · secondary text `#c9cffb` · muted text `#9299d8`; on the dark right panel: primary `#f4f1e6`, muted `#8e91a8`

### 2. Typography
- **Hero phrase rendering** — Bebas Neue (`display`) all-caps, set on the left half as a stacked 5–6 line block via `clamp(64px, 9vw, 132px)`. Condensed proportions let all 14 words fill the column without overflow. "OWN MISTAKES" flips to Electric Sky `#6f9bff`; everything else is cream. Attribution "— WARREN BUFFETT" set small-caps IBM Plex Sans beneath.
- **Line heights** — hero 0.90; panel headings 1.1; body/ledger 1.5; light-on-dark body bumped to 1.55.
- **Letter spacings** — hero 0.005em (Bebas is already tight); all-caps labels/eyebrows 0.12em; body 0.01em.

### 3. Layout Specification
- **Archetype** — Split. The quote's structure is inherently oppositional ("your own mistakes" vs "somebody else"), so two active asymmetric halves carry it: left = the giant confession in cobalt, right = a dark indigo ledger of the day's honest self-reports. No center void; both surfaces are full-bleed color.
- **CSS grid/flex structure** — `display: grid; grid-template-columns: 1.6fr 1fr; min-height: 100vh;` collapses to single column below 900px.
- **Major dimensions:**
  - Hero (left) area: `min-height: 100vh`, full-bleed cobalt, `padding: clamp(48px, 6vw, 104px)`.
  - Right ledger panel: the `1fr` column, deep-indigo `#14162b`, `padding: clamp(40px, 4vw, 72px) clamp(32px, 3vw, 56px)`.
  - Max content width: `max-width: none` (full canvas); side padding is viewport-relative as above.
  - Section spacing inside panel: 32px between ledger rows, 48px between groups.
- **Nav placement** — floating pills, top-right of the LEFT (cobalt) half: a horizontal cluster of 3 caps pills (WORK · ABOUT · INDEX), each ~`padding: 8px 18px`, `border-radius: full`, cream 1px border, translucent cobalt fill. Sits at `top: 40px; right: 40px`.
- **Hero phrase grid zone** — left column, occupying vertical rows from ~18vh to ~88vh, left-aligned; intended footprint ≈ 55vw × 62vh at 1440×900.

### 4. Component Character
- **Border radius** — cards/panels 0 (sharp, typeset); nav pills `full`; chips 2px. The ledger reads as a ruled ledger, not soft cards.
- **Border treatment** — bordered: hairline rules between ledger rows using `neutral.700` (`#3a3d50`); nav pills bordered in cream at 40% via `border`.
- **Shadow** — none. Depth comes from the cobalt/indigo lightness split, not shadow.
- **Density** — left half spacious (one dominant block); right half compact (ruled ledger).
- **Interactive states** — nav pills invert on hover (cream fill, cobalt text, 150ms); ledger rows shift their leading marker to Electric Sky on hover.

### 5. Signal Integration
- **Where signal elements live** — the right indigo panel, titled "POINTED OUT TODAY," a vertical ruled ledger.
- **Sports scores** — Tigers loss framed as the honest self-report: row reads "TIGERS 0–5 · L" with the score in Bebas at ~40px cream and "L" tagged in muted; Genesis Scottish Open below it — "TOM KIM −17 · FINAL" with −17 in Electric Sky as the day's one triumph marker.
- **Quote display** — the Buffett quote IS the hero; attribution "— WARREN BUFFETT" is the small-caps line beneath the marquee, no blockquote chrome.
- **New moon** — a chip at the top of the ledger: "NEW MOON · 0.2%" with a hollow disc glyph, muted cream — the emptied ledger.
- **Music** — a single ledger line "ON: GUIDED BY VOICES · MY MORNING JACKET · RADIOHEAD" in muted caps.
- **Season/sun** — footer baseline stamp: "SUMMER · 14.5H DAYLIGHT · JUL 14 2026."
- **Holiday** — none today; omitted.

## Self-Check
1. Hero quotability: Yes — a standalone Buffett maxim, screenshot-ready without any surrounding copy.
2. Because-of chain: Yes — candid imperative → Split (oppositional structure) → Bebas condensed (fits 14 words at billboard scale, declarative) → cobalt corrective-ink drench (only open mandate corridor) → left confession / right ledger.
3. Render feasibility: Yes — Bebas condensed at clamp(64–132px) stacks the quote across ~6 lines within a 55vw column at 1440×900 without overflow.
4. Canvas floor feasible: Yes — full-bleed cobalt left + full-bleed indigo right = 100% colored canvas, far above the Split 65% floor.

## Rationale
The day handed me a finished object: Buffett's "It is better to point out your own mistakes than have somebody else do it." For a portfolio that demolishes and rebuilds itself every morning — publishing its own revisions in the open — this is less a quote than a mission statement. It's quotable in isolation, and the day's other signals are all honest self-reports waiting to be pinned to it: the Tigers owning a 0–5 loss, a new moon resetting the count to zero, Tom Kim's clean −17 as the one thing that went right.

Because the phrase is structurally oppositional — *your own* against *somebody else* — the Split archetype was the only honest form: a giant cobalt confession on the left, a dark indigo ledger of the day's admissions on the right, both halves full-bleed and active, no center void. Split also hasn't appeared in the recent rotation, so fit and variance align. Bebas Neue (bebas-plex) carries the fourteen-word line at billboard scale without overflow — condensed, all-caps, plainly declarative, the register of candor rather than warmth — while IBM Plex Sans keeps the ledger and attribution quietly legible. A single emphasized "OWN MISTAKES" in Electric Sky is the one place the field brightens.

The color mandate left only the 225°–247° corridor open, and cobalt at 233° turned out to be exactly right rather than a constraint: it is corrective-ink blue, the pen you drag across your own draft. After a week of near-void dark canvases I pivoted to a fully drenched, mid-light cobalt field with warm cream type — alive, committed, IKB-adjacent — pushing color coverage past 70%. The shell moves are all fresh against the mandate: floating pills top-right (not the recent left spine or top bar), a single baseline stamp (not the recent colophon or data strip), and a `horizontal-md` mono lockup inheriting cream via `currentColor` so the mark sits cleanly on the cobalt without reinvention.
