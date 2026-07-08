# Signals Brief — 2026-07-08

## Hero Copy
Follow the man who seeks the truth; run from the man who has found it.

## Hero Rationale
The Havel quote in today's signals is not merely a proverb — it's a diagnostic tool. Set against today's Hacker News front page (AI agents leaking private repos, firmware backdoors, obfuscated code on retail t-shirts), it reads as exact commentary: the people who got "got" were the ones who stopped questioning. For a portfolio site that rebuilds itself every morning from uncertainty rather than templates, the phrase is also autobiography. The semicolon does the structural work — two opposed imperatives, maximum economy, zero explanation. Someone would absolutely screenshot this line.

## Archetype
Broadsheet

## Chassis
spectral-albert

## Visual Specification
### 1. Color Specification

- **Primary hue** — H:105° (yellow-green / chartreuse). This is the sole open corridor in the mandate (102°–128°). Chartreuse at this angle reads as the phosphor-green of a terminal in standby: emissive, alert, deliberate. Against a deep near-black it reads as signal, not decoration.
- **Neutral palette** — Green-tinted neutrals. Hue cast is faint (chroma ≈ 0.008 in OKLCH terms) but sufficient to make the dark surfaces feel intentional rather than dead.
  - 50: #f2f4f0 | 100: #e4e8e1 | 200: #c8d1c3 | 300: #a8b4a2 | 400: #7d8c77 | 500: #566452 | 600: #3e4b3a | 700: #2c362a | 800: #1c241a | 900: #0e1510
- **Accent color** — lime.400 (#76e035) as default; lime.300 (#9ef070) as glow; lime.600 (#3fa50d) as dark/light-mode default.
- **Secondary accent** — None. Single committed accent; no warmth introduced.
- **Background** — Page bg: #0e1510 (neutral.900). Card bg: #1c241a (neutral.800). No sidebar in this layout.
- **Text colors** — Primary text: #f2f4f0 (neutral.50, contrast ~17:1 on bg). Secondary: #a8b4a2 (neutral.300, ~9:1). Muted: #566452 (neutral.500, ~4.5:1 threshold — used only for metadata labels, never body prose).

### 2. Typography (spectral-albert chassis)

- **Hero phrase rendering** — Spectral Display, Italic, `clamp(2rem, 3.6vw, 5.2rem)`, color: neutral.50. The quote occupies the full left column (60% of canvas width ≈ 864px at 1440px), breaking naturally into 4–5 lines with `line-height: 1.1`. The semicolon mid-phrase is structural; no editorial intervention on the line breaks — let Spectral's tall x-height carry the weight.
- **Attribution** — Albert Sans, `0.875rem`, all-small-caps via `font-variant-caps: all-small-caps`, `letter-spacing: 0.12em`, color: lime.400 (#76e035). Rendered as: `— VÁCLAV HAVEL` flush left under the quote block.
- **Masthead** — Albert Sans Bold, `0.75rem`, uppercase, `letter-spacing: 0.18em`. Full-width rule above and below.
- **Column heads** — Albert Sans Medium, `0.75rem`, uppercase, `letter-spacing: 0.15em`, color: neutral.300.
- **Body / list text** — Albert Sans Regular, `1rem`, `line-height: 1.55`.
- **Line heights** — Hero: 1.1 (snug). Body: 1.55 (normal). Labels: 1.2.
- **Letter spacings** — Hero: -0.01em (Spectral's tight naturals). Body: 0. All-caps labels: 0.15–0.20em.

### 3. Layout Specification

- **Archetype** — Broadsheet. The Havel quote's two-clause binary structure (follow/run; seeks/found) is inherently two-column: the left column is the assertion, the right is the evidence. A Broadsheet layout packs the day's signals into the remaining columns without diminishing the central phrase — newspaper density as the form of argument.
- **CSS grid/flex structure** — Full-width, no max-width:
  ```
  display: grid;
  grid-template-rows: 48px 1px auto 1px 64px;  /* masthead | rule | content | rule | footer */
  padding: 0;
  ```
  Content row:
  ```
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;  /* ~55% / ~22% / ~22% */
  padding: 0 5vw;
  column-gap: 4vw;
  ```
- **Major dimensions**:
  - Masthead: `height: 48px`, full-width, `padding: 0 5vw`
  - Content area: `min-height: calc(100vh - 112px)` (fills below masthead, above footer)
  - Hero column (col 1): `padding-top: 64px`, quote block `margin-bottom: 32px`
  - Signal columns (cols 2–3): `padding-top: 40px`
  - Max content width: `none` — viewport-relative padding only (`padding: 0 5vw`)
  - Vertical rule between col 1 and col 2: `width: 1px`, `background: neutral.700`
  - Vertical rule between col 2 and col 3: same
- **Nav placement** — Inline in masthead, full-width top bar. Left side: "DOUG MARCH" in Albert Sans Bold, `0.75rem`, uppercase. Right side: nav links (Work, About, Contact) in Albert Sans, `0.75rem`, `letter-spacing: 0.1em`. Center: date and day "WEDNESDAY — JULY 8, 2026" in Albert Sans Light, `0.75rem`, uppercase.
- **Hero phrase grid zone** — Column 1 (of 3), starting at row 1 of content grid, full height. Quote block occupies approximately 300–380px of vertical space at target render size. Below it: 24px rule, attribution, then a secondary editorial note (3–4 lines of Havel bio context in Albert Sans at 0.9rem).

### 4. Component Character

- **Border radius** — All: 0px (`radii.none`). Newspaper zero-radius throughout.
- **Border treatment** — Rule-based, not box-based. `1px solid neutral.700` horizontal rules between masthead/content/footer. `1px solid neutral.700` vertical rules between columns (pseudo-elements or explicit div elements).
- **Shadow** — None. Depth comes from contrast between surfaces, not elevation.
- **Density** — High. Column 2 and 3 use `font-size: 0.9rem` for list items to pack more data. Column heads use tight uppercase tracking to read as section labels.
- **Interactive states** — Links: color transition from neutral.300 → lime.400 on hover (`transition: color 180ms ease`). No underline in default state; underline on hover. Project entries: lime.400 left-border (3px) appears on hover.

### 5. Signal Integration

- **Quote IS the hero** — The Havel quote renders at marquee scale in column 1, attributed in lime.400 small-caps. No other treatment needed — it earns its full left column.
- **HN stories** — Column 2, under head "DISPATCHES". Top 3 stories listed: headline in neutral.50, score in lime.400 `font-variant-numeric: tabular-nums`, author in neutral.400. "GitLost" leads; "Tenda backdoor" second; "ZFS NAS" third. The top two are editorially resonant with the Havel theme (false certainty, hidden vulnerabilities).
- **Tigers 6–2 W** — Column 3, under head "LAST NIGHT". "DET 6 · 2" in Albert Sans Bold, lime.400 accent on the "6". Result in neutral.50, date in neutral.400.
- **Genesis Scottish Open** — Under Tigers: "GENESIS SCOTTISH OPEN" — "Scheduled / No leaders yet" in neutral.400 italic.
- **Lunar signal** — Last quarter, 31.4% illumination. Noted in footer band: "☽ LAST QUARTER 31%" in neutral.500, `0.75rem`.
- **Music** — Column 3 bottom: "LISTENING: Guided by Voices · Wet Leg" in neutral.400, `0.8rem`.
- **Daylight** — Footer: "14.6 hrs · ☀ 04:56–19:33" in neutral.500.

## Self-Check
1. Hero quotability: Yes — "Follow the man who seeks the truth; run from the man who has found it." is Václav Havel at his most poster-ready: paradox in 19 words, a binary imperative with zero hedging, quotable entirely without context.
2. Because-of chain: Yes — the quote's literary-political weight demands Spectral's editorial gravitas (chassis); its two-clause binary structure maps directly to Broadsheet's multi-column architecture (archetype); the hacker/security HN stories make H:105° chartreuse-terminal exact rather than arbitrary (palette); the left-dominant column hierarchy serves the quote's primary mass while packing evidence into the right two columns (layout).
3. Render feasibility: Yes — Spectral Italic at clamp(2rem, 3.6vw, 5.2rem) in a 55%-wide left column at 1440px (≈792px) renders the full 75-character quote in 4–5 natural lines at ~72px per line, total block height ≈340px, well within 100vh without overflow or sub-marquee collapse.

## Rationale
The Havel quote arrived pre-formed — "Follow the man who seeks the truth; run from the man who has found it." is already a poster in 19 words. On a Wednesday in July 2026, when the top Hacker News stories are about an AI agent leaking private repos by being tricked into false certainty, and a firmware backdoor hidden in consumer hardware, the quote reads as annotation. The "man who has found it" is the AI agent convinced it has permission; it's the Tenda firmware developer who stopped questioning their own code. For this portfolio, which rebuilds itself from environmental uncertainty every morning rather than from a fixed template, the quote is also self-portrait: this site doesn't know what it is until the signals arrive.

Broadsheet was the only honest archetype. The quote's binary structure — two opposed imperatives divided by a semicolon — is architecturally two-column. A Broadsheet layout gives the left 55% of the canvas to the declaration in Spectral Italic at marquee editorial scale, and packs the right two columns with the day's evidence: GitLost and the Tenda backdoor in a "DISPATCHES" column, the Tigers' 6–2 win and the Scottish Open alongside Guided by Voices and Wet Leg in the "LAST NIGHT" column. The Broadsheet form turns the Havel quote into a newspaper front page, where the editorial is surrounded by the news that prompted it. Spectral's transitional slab-serif letterforms carry the literary gravitas this quote demands — it is not a blunt poster phrase, it is a considered warning from a playwright who survived the certainty of totalitarians.

Chartreuse at H:105° is simultaneously mandate-correct and thematically precise. The narrow open corridor (102°–128°) points toward yellow-green, and that hue has a specific cultural meaning: it is the color of a phosphor terminal in standby mode, the green the screen becomes when the system is waiting to be queried rather than issuing commands. Against neutral.900 (#0e1510 — a deep ink-black with a barely perceptible green cast), the lime.400 accent (#76e035) reads as emissive signal. The near-white primary text (#f2f4f0) achieves approximately 17:1 contrast on the background. The zero border-radius throughout gives the layout the no-nonsense quality of typeset newsprint — no softening of corners, no decorative radius. This is a page that takes the quote seriously.
