# Signals Brief — 2026-07-12

## Hero Copy
START OVER
IN THE DARK

## Hero Rationale
Tonight's moon is a new moon — 2.1% illumination, day 28.17 of the cycle, the instant the lunar calendar wraps back to zero. That reset is the day's loudest signal and it's also this site's own operating principle: a portfolio that erases and rebuilds itself every morning. "Start over in the dark" fuses the moonless July night with the daily-rebuild ethos into one quotable imperative — a line you'd screenshot, not a description of the weather.

## Archetype
Specimen

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification
- **Primary hue** — 278° (violet). The only corridor left open by the mandate (269°–299°) and the exact color of a moonless summer night sky just after the light drains out — perfect for a new-moon brief.
- **Neutral palette (violet-tinted "night indigo")** — 50 `#f5f2fb`, 100 `#eae4f6`, 200 `#d3c9ea`, 300 `#b3a6d6`, 400 `#8d7cb8`, 500 `#6f5c9c`, 600 `#574780`, 700 `#423463`, 800 `#2b1f45`, 900 `#1a1030`
- **Accent color (luminous lavender)** — light `#c4aaff`, default `#a480ff`, dark `#7a45f0`, glow `rgba(164,128,255,0.45)`
- **Secondary accent** — none. Single committed accent carries the page.
- **Background** — page bg `#1a1030` (drenched violet, NOT black), card bg `#2b1f45`, sidebar/strip bg `#22143d`
- **Text colors** — primary `#ece6fb`, secondary `#b3a6d6`, muted `#8d7cb8`

### 2. Typography
- **Hero phrase rendering** — Bebas Neue (`display` token), uppercase, stacked in two big lines: "START OVER" / "IN THE DARK". Scale `clamp(72px, 14vw, 224px)`. It fills ≥72% of both canvas axes; the word "DARK" is set in accent lavender to make the last word glow while the rest reads in pale lavender-white.
- **Line heights** — hero `0.88`, subheads `1.05`, body `1.55` (bumped for light-on-dark), data strip `1.3`
- **Letter spacings** — hero `0.01em` (Bebas is already condensed), all-caps labels/kickers `0.14em`, body `0`, smallcaps `0.08em`

### 3. Layout Specification
- **Archetype** — Specimen. The phrase IS the design; giant condensed type occupies the field like text pressed against a night sky, everything else demoted to a thin lower data strip.
- **CSS grid structure** — `display: grid; grid-template-rows: auto 1fr auto; min-height: 100vh`. Middle row is a single full-bleed type stage using `display: grid; place-content: center start`.
- **Major dimensions**:
  - Hero/type stage: `min-height: 78vh`
  - No sidebar. `max-width: none`; side padding `padding: clamp(40px, 6vw, 96px)`
  - Top nav bar height ~72px; bottom data strip height ~120px
  - Section spacing driven by 24px vertical rhythm multiples
- **Nav placement** — thin top bar: brand lockup left, three inline links (Work · About · Index) right, `letter-spacing: 0.14em`, uppercase, 13px Plex.
- **Hero phrase grid zone** — occupies rows 1–3 / columns 1–10 of the middle stage, left-aligned, intended footprint ~86vw wide × ~62vh tall.

### 4. Component Character
- **Border radius** — cards `4px`, buttons `2px`, tags `full` (pill) only for the lunar chip
- **Border treatment** — hairline borders in `violet.700` (`#423463`), 1px; the data strip separated by a single top border.
- **Shadow** — none; depth comes from surface lightness (card `#2b1f45` sits above bg `#1a1030`).
- **Density** — spacious in the type stage, compact in the bottom data strip.
- **Interactive states** — nav links and project rows shift text to accent `#c4aaff` on hover with a `0.15s` transition; no underlines except an accent baseline that grows on hover.

### 5. Signal Integration
- **Where signal elements live** — a single bottom data strip spanning full width, three columns.
- **Sports scores** — Genesis Scottish Open in the left column of the strip: "SCOTTISH OPEN · IN PROGRESS" kicker in muted violet, then "TOM KIM −14" with the score set in accent lavender tabular numerals, followed by "Min Woo Lee −13 · Fitzpatrick −13 · McIlroy −12".
- **Quote** — no quote signal today; the hero phrase is a composed signal-headline, not a quote.
- **Lunar (primary signal)** — center column, a pill chip: "◐ NEW MOON · 2% LIT · DAY 28" in `violet.700` border pill with accent text — the conceptual anchor tied to the hero phrase.
- **Music** — right column footnote: "ON REPEAT — Guided by Voices · Tobin Sprout" in secondary violet.
- **Holiday elements** — none today.

## Self-Check
1. Hero quotability: Yes — "Start over in the dark" is an imperative that stands alone and screenshots cleanly.
2. Because-of chain: Yes — new-moon reset → darkness/renewal → Specimen type-as-night-sky → Bebas condensed marquee → drenched violet with a single lavender glow.
3. Render feasibility: Yes — two short stacked lines in Bebas at clamp(72px,14vw,224px) fit 1440×900 without overflow.
4. Canvas floor feasible: Yes — giant two-line type + full-width bottom strip fills ≥72% easily.

## Rationale
The day gave me a moonless sky — a new moon at 2.1% illumination sitting on day 28.17 of its cycle, the exact instant the lunar calendar rolls back to zero. That reset rhymes precisely with what this site does every morning: it wipes itself clean and rebuilds. "Start over in the dark" is the composed headline that holds both truths at once — the literal dark of a moonless July night and the imperative a daily-rebuilding portfolio lives by. It's quotable in isolation, which is the whole test.

Because the phrase IS the day, the archetype had to be Specimen: type pressed against a night field, filling both axes, with everything else — nav, signals — demoted to slim edges. Bebas Neue (bebas-plex) is the honest chassis here; it's condensed and declarative enough to stack "START OVER / IN THE DARK" at 224px without shouting into parody, and IBM Plex Sans keeps the bottom data strip legible and quiet. It's also a chassis I haven't leaned on recently, and Specimen hasn't appeared in the last week — fit and variance align.

The palette is dictated by the mandate corridor (only 269°–299° open) and by the brief simultaneously: 278° violet is the color of a sky with no moon in it. Rather than repeat the recent near-void-black pattern, I drenched the canvas in a real saturated violet (`#1a1030` bg, `#2b1f45` cards) so the page reads as a colored night, not black. A single luminous lavender accent (`#a480ff`) lights only the word "DARK" and the primary signal chip — the last light in the sky, the crescent that's coming back. One accent, fully committed, no hedging neutrals.
