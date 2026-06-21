# Signals Brief — 2026-06-21

## Hero Copy
The best thing to hold onto in life is each other.

## Hero Rationale
Today is both Father's Day and the Summer Solstice — two signals that arrive together once a year and both point toward the same emotional register: warmth, permanence, the people who hold the calendar still. Audrey Hepburn's line from `signals.quote` is already written for today. Stripped of all context, it earns a screenshot — it is eleven words that don't need a holiday label to land, but land harder when the reader knows the date. No signal-derived headline about solstice hours can compete: June 20 already used "THE LONGEST DAY." and this phrase is more alive. It is the line the day was looking for.

## Archetype
Split

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

**Primary hue:** H:158° (teal-green) — falls cleanly in the mandate's open corridor 145°–173°. Summer water, deep shade, earned by the solstice and the emotional temperature of the quote.

**Neutral palette (teal-stone, faint teal cast):**
- 50: #F7F5F3
- 100: #EEEAE5
- 200: #DDD7D1
- 300: #C2BBBA
- 400: #9F9694
- 500: #7D7472
- 600: #5D5452
- 700: #413C3A
- 800: #29221F
- 900: #141110

**Accent color:**
- Light: #38B5A3
- Default: #0A7165
- Dark: #063D37
- Glow: rgba(14, 148, 130, 0.20)

**Secondary accent:** None.

**Background:**
- Page bg (right panel): #F7F3ED (warm cream)
- Card bg: #FDFAF5
- Left panel / hero bg: #063D37 (teal.700, deep)

**Text colors:**
- Primary (right panel): #1C1914 (cream.900) — contrast ~16.9:1 on cream ✓
- Secondary: #5D5452 (stone.600)
- Muted: #7D7472 (stone.500)
- Hero text on teal: #F7F3ED (cream.100) — contrast ~11.75:1 on #063D37 ✓
- Accent on cream: #0A7165 (teal.500) — contrast ~5.5:1 ✓

---

### 2. Typography

**Hero phrase rendering:** `display` chassis token (Bricolage Grotesque Bold), `font-size: clamp(3rem, 6vw, 6rem)`, `line-height: 1.1` (snug), `letter-spacing: -0.02em`. Natural word-wrap across 4 lines: "The best thing / to hold onto / in life is / each other." — fills the left panel vertically from mid-point upward, leaving breathing room for eyebrow above and attribution below. Color: `textHero` (#F7F3ED).

**Eyebrow above quote:** Manrope 500, `clamp(0.625rem, 0.9vw, 0.75rem)`, `letter-spacing: 0.18em`, all-caps, cream.300 (#D9CDBF). Content: "FATHER'S DAY · JUNE 21, 2026 · SUMMER SOLSTICE". Margin-bottom: 1.5rem.

**Attribution below quote:** Manrope 400 italic, `clamp(0.875rem, 1.2vw, 1rem)`, `letter-spacing: 0.02em`, cream.400 (#C0B0A0). Content: "— Audrey Hepburn". Margin-top: 2rem.

**Body text (right panel):** Manrope Regular 400, `1rem (16px)`, `line-height: 1.5`, `color: text` (#1C1914).

**Section labels:** Manrope 600, `0.6875rem`, `letter-spacing: 0.12em`, all-caps, stone.500 (#7D7472).

**Nav:** Manrope 500, `0.875rem`, stone.600 (#5D5452). Site name: Manrope 700, `0.875rem`, cream.900 (#1C1914).

**Score data:** Manrope 700, `1.125rem`, teal.400 (#0E9482) for leading scores.

---

### 3. Layout Specification

**Archetype: Split** — Two asymmetric full-height panels spanning the complete canvas. The left panel is purely the declaration: no nav, no chrome, just deep teal and the phrase. The right panel carries everything else: navigation, selected work, today's signals. The compositional metaphor is the phrase itself — two halves holding each other.

**CSS grid/flex structure:**
```css
display: grid;
grid-template-columns: 3fr 2fr;
min-height: 100vh;
```

**Major dimensions:**
- Left panel (60% vw): `min-height: 100vh`, `padding: 80px 6vw`, deep teal background `#063D37`, display:flex, flex-direction:column, justify-content:center
- Right panel (40% vw): `min-height: 100vh`, `padding: 64px 5vw`, cream background `#F7F3ED`, display:flex, flex-direction:column
- Max content width: `max-width: none` on both panels (full viewport, no centering constraint)
- Side padding: left `6vw`, right `5vw` — viewport-relative
- Section gap in right panel: `40px` between nav, project list, and signal strip

**Nav placement:** Top of the right panel, inline. "doug march" in Manrope Bold 14px (#1C1914) + nav links "Work" and "About" in Manrope Medium 14px (stone.600), stacked vertically or inline row, flush left. No nav in left panel.

**Hero phrase grid zone:** Left panel only, vertically centered. Quote occupies rows 2–5 of a notional 7-row vertical rhythm — roughly from 25% to 72% of panel height, with eyebrow above at 20% and attribution at 76%. Left edge: `6vw`. Quote text spans full panel width minus `12vw` total horizontal padding.

---

### 4. Component Character

**Border radius:** Cards: 4px (`md`); buttons: 2px (`sm`); tags: `9999px` (`full`). Left panel: none (full bleed).

**Border treatment:** Borderless on left panel. Right panel: single `1px solid` in `border` (#DDD7D1) as horizontal rule between sections. No box borders on project rows.

**Shadow:** Left panel: none. Right panel cards: `box-shadow: 0 1px 4px rgba(6, 61, 55, 0.07)` — barely present, teal-tinted shadow.

**Density:** Spacious on left (declaration breathes at 6vw padding). Moderate compact on right (three sections — nav, work list, signals — must coexist within 40% viewport).

**Interactive states:** Project titles on right panel: hover shifts color from `#1C1914` to `#0A7165` (accent), `transition: color 0.2s ease`. Nav links: same. Left panel has no interactive elements except the full-panel anchor if desired.

---

### 5. Signal Integration

**Father's Day + Summer Solstice:** Named directly in the left panel eyebrow — "FATHER'S DAY · JUNE 21, 2026 · SUMMER SOLSTICE" — giving the Hepburn quote its time-stamp without crowding the declaration.

**Quote is the hero phrase:** The Hepburn line occupies the full left panel at 6vw font-size. No blockquote chrome — raw type at marquee scale.

**U.S. Open leaderboard (right panel, signals section):** Header "U.S. OPEN · IN PROGRESS" in 11px all-caps Manrope, stone.400, `letter-spacing: 0.12em`. Below: compact list — "CLARK  −7" in Manrope 700 18px, teal.400 for score. "SCHEFFLER  −1", "THEEGALA  −1", "T. KIM  −1" in 14px, stone.600. Scores in teal.400.

**Detroit Tigers:** Inline badge after leaderboard — "DET 4 – 1 WIN" — Manrope 600, 13px, teal.500 for score figures.

**Lunar phase:** First quarter (◑) symbol + "First Quarter · 45%" in 12px Manrope, stone.400. Bottom of signals strip.

**Music signals:** "NOW LISTENING — Tobin Sprout · The War on Drugs · Wet Leg" in 11px Manrope, stone.400, `letter-spacing: 0.06em`, at very bottom of right panel.

**Hacker News:** Most-notable story "Loupe — 311 pts" shown as a single line after the Tigers score, 12px stone.400.

## Self-Check
1. Hero quotability: Yes — "The best thing to hold onto in life is each other." is a standalone Hepburn line that earns a screenshot on any day; on Father's Day and the Summer Solstice it carries double-weight without needing explanation.
2. Because-of chain: Yes — warmth of the phrase on Father's Day dictates the Split (two halves holding each other), which dictates Bricolage Grotesque (warm, expressive, brand-driven — not the aggressive condensed DNA of a sports quote), which dictates teal-on-cream (summer water stillness, mandate-compliant 145°–173° corridor, cool enough to feel like solstice shade, alive enough to carry the emotional register).
3. Render feasibility: Yes — Bricolage Grotesque Bold at `clamp(3rem, 6vw, 6rem)` on a 60vw left panel (864px at 1440) word-wraps the 11-word quote across 4 natural lines with no overflow; `line-height: 1.1` at 96px = 105px per line × 4 = ~420px, well within a 100vh panel with 80px vertical padding.

## Rationale
The hero phrase arrived from `signals.quote` on a day that doubles as both Father's Day and the Summer Solstice — a convergence that loads Audrey Hepburn's eleven words with everything the calendar has. "The best thing to hold onto in life is each other" doesn't need the holiday context to earn a poster; it earns one on its own. But today, the date makes it resonate at a different register. Every other choice followed.

The Split archetype is the only honest structural response to a phrase about holding. Two active halves — deep teal left, warm cream right — with no dead center, no ornamental void, both panels load-bearing. The left panel is the declaration: nothing competes with the quote on dark teal, no nav, no chrome, just Bricolage Grotesque Bold at marquee scale and the eyebrow datestamp. The right panel is the evidence: work, signals, the U.S. Open leaderboard, Father's Day afternoon, the Tigers 4-1 win, the first-quarter moon at 45%. The two halves hold the page together the way the phrase says they should. Bricolage Grotesque was chosen over the condensed-signage options (Anton, Big Shoulders, Bebas) specifically because the quote is warm and human, not declarative or aggressive — Bricolage's variable-weight expressiveness and open apertures are the right typographic body language for Hepburn.

The palette is both mandate-earned and thematically precise. The open corridor (145°–173°) after seven consecutive builds through amber, indigo, cerulean, violet, lime, crimson, and chartreuse left exactly one family unvisited: teal-green. H:158° is not a generic "teal" design cliché — it is the specific color of summer shade, of water at peak daylight, of something still and cool inside the longest day. At #063D37 on the left panel, it reads as depth and permanence. At #0A7165 on the cream field, it reads as the color of something alive. The warm cream (#F7F3ED) right panel was not chosen for neutrality — it is the color of old paper, afternoon light, the domestic warmth that Father's Day reaches for.
