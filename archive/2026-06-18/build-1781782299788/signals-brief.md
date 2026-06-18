# Signals Brief — 2026-06-18

## Hero Copy
The harder you work, the harder it is to surrender.

## Hero Rationale
The Lombardi quote arrived in `signals.quote` already formatted for this moment: a Thursday mid-June, peak daylight at 14.7 hours, U.S. Open leaders refusing to blink at even par, Tigers absorbing a 2-4 loss and playing again tomorrow. This phrase is not aspirational decoration — it is an operating instruction. A portfolio that rebuilds itself every single morning from raw signal data is literally doing what the quote commands. The line passes the screenshot test without contest: strip away all context, the quote stands alone as a declaration. "Surrender" carries genuine weight; the word earns the scale.

## Archetype
Specimen

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

**Primary hue:** H:203°, cerulean — midpoint of the 192°–215° mandate corridor; steel blue at peak saturation; reads as sky at altitude, compressed confidence.

**Neutral palette — midnight (tinted H:203°):**
- 50:  #F0F7FB
- 100: #DDEDF5
- 200: #BACFE0
- 300: #8DAEC8
- 400: #5F8EAF
- 500: #3C6E8E
- 600: #244F6A
- 700: #163549
- 800: #0D1F2E
- 850: #0A1622
- 900: #060E17
- 950: #030810

**Accent cerulean:**
- light:   #7DC8F0
- default: #2AB8F5
- dark:    #0869A0
- glow:    rgba(42, 184, 245, 0.30)

**Secondary accent:** None. One hue, fully committed.

**Background:**
- page bg:    #060E17 (midnight.900)
- card bg:    #0A1622 (midnight.850)
- sidebar bg: #0D1F2E (midnight.800)

**Text colors:**
- primary text:   #F0F7FB (midnight.50)
- secondary text: #8DAEC8 (midnight.300)
- muted text:     #3C6E8E (midnight.500)

**Contrast checks:**
- Primary text (#F0F7FB) on page bg (#060E17): ~18.2:1 ✓
- Accent (#2AB8F5) on page bg (#060E17): ~9.8:1 ✓ (display size)
- Secondary text (#8DAEC8) on page bg (#060E17): ~5.6:1 ✓

---

### 2. Typography

**Hero phrase rendering:** Big Shoulders Display (chassis `display` token), uppercase, broken across three lines:
```
THE HARDER YOU WORK,
THE HARDER IT IS TO
SURRENDER.
```
Lines 1–2: `font-size: clamp(52px, 7.8vw, 112px)`. Line 3 "SURRENDER.": `font-size: clamp(72px, 11.5vw, 165px)` — larger to use the narrower character count as mass. Lines 1–2 letter-spacing: `-0.02em`. "SURRENDER." letter-spacing: `0.12em` to stretch it toward full usable width. The asymmetry between line 3 and lines 1–2 is intentional — the word is the thesis, it earns more height.

Attribution line: `— Vince Lombardi` in Atkinson Hyperlegible, small caps, 13px, cerulean.500, `letter-spacing: 0.15em`, positioned 24px below "SURRENDER." left-aligned to the text block.

**Line heights:**
- Hero (all-caps display): `0.88`
- Body / signal data: `1.55`
- Tight labels: `1.1`

**Letter spacings:**
- Hero lines 1–2: `-0.02em`
- Hero line 3 (SURRENDER.): `0.12em`
- Attribution / small caps: `0.15em`
- Body: `0.01em`

---

### 3. Layout Specification

**Archetype — Specimen:** The Lombardi quote needs no image, no sidebar, no competing column. The condensed weight of Big Shoulders Display at this scale IS the composition. The void around the letters generates the pressure. Any supporting structure would dilute the declaration.

**CSS structure:**
```css
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  max-width: none;
}

.nav-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 5vw;
  border-bottom: 1px solid midnight.700;
}

.quote-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5vh 5vw;
  min-height: 76vh;
}

.signal-footer {
  height: 90px;
  padding: 0 5vw;
  display: flex;
  align-items: center;
  gap: 32px;
  border-top: 1px solid midnight.700;
}
```

**Major dimensions:**
- Page: `min-height: 100vh; max-width: none`
- Nav strip: `height: 48px; padding: 0 5vw`
- Quote stage: `flex: 1; min-height: 76vh; padding: 5vh 5vw`
- Signal footer: `height: 90px; padding: 0 5vw`
- Side padding: `5vw` (≈72px at 1440) — narrow enough to let type breathe the full canvas

**Nav placement:** Minimal top strip, 48px; `doug-march` wordmark left in Atkinson 12px small-caps cerulean; right side: current date + waxing crescent moon glyph (🌒) + illumination pct, all in muted text at 11px.

**Hero phrase grid zone:** Vertical center of `.quote-stage`, text block left-aligned at `5vw` margin, spanning approximately columns 1–11 of a 12-column notional grid. Lines 1–2 fill ~75–82% of usable width; "SURRENDER." at wider tracking fills ~78% of usable width. Total type block height on 900px viewport: approximately 580–640px (≥70% of available height after nav). No centering on x-axis — left-aligned type reads as a statement, not a decoration.

---

### 4. Component Character

**Border radius:** `0px` (none) everywhere. Sharp edges, architectural. A question with rounded corners would undermine the authority of an answer with none.

**Border treatment:** `1px solid midnight.700` for nav and footer dividers; `1px solid cerulean.700` for signal data cards. No decorative borders on the quote itself.

**Shadow:** None on type elements. Cerulean glow on the accent dot/badge: `box-shadow: 0 0 16px rgba(42, 184, 245, 0.25)`.

**Density:** Maximally spacious around the quote; compact in the signal footer strip. The contrast between the void of the quote stage and the dense signal footer reinforces hierarchy — the declaration above, the evidence below.

**Interactive states:** Links: `color: cerulean.300` on hover, `transition: color 200ms ease`. No underlines on nav labels; underline only on in-text hyperlinks.

---

### 5. Signal Integration

**Signal footer layout:** Single horizontal strip, `height: 90px`, `padding: 0 5vw`, items left-to-right separated by `32px` gaps with `1px solid midnight.700` vertical dividers between groups.

**U.S. Open leaderboard:** Compact 5-row inline table — `Leader: E` in cerulean text (5 players tied). Label "U.S. OPEN" in `letter-spacing: 0.15em` small caps, muted. The five names listed vertically in a tight `11px` stack. Note: 15th Club (golf AI project) referenced as a small `→ 15th Club` link below the leaderboard — today's leaderboard is this project's domain.

**Tigers score:** `DET 2 · 4` in `11px` Atkinson, muted text. Loss indicated by opacity reduction on the DET side.

**Juneteenth:** Small rectangular badge — `1px solid cerulean.700`, text: `Juneteenth ↑ tomorrow`, `11px`, cerulean.300. Positioned in the footer strip near right side.

**Quote treatment:** The Lombardi quote IS the hero phrase at Specimen scale. Attribution line `— Vince Lombardi` is styled in small caps Atkinson, `13px`, cerulean.500, immediately below "SURRENDER." at `24px` gap.

**Moon phase:** 🌒 `16.8%` in nav right, `11px` muted — waxing crescent, cycle day 4. The moon is building; the quote commands the same.

**HN spike (Midjourney Medical, 834):** Listed in signal footer as `HN ↑834 — Midjourney Medical` in `10px` muted text. The medical AI story is the day's signal spike and earns its small moment.

## Self-Check
1. Hero quotability: Yes — "The harder you work, the harder it is to surrender." is Vince Lombardi; it is poster-worthy, quotable in absolute isolation, screenshot-ready without any surrounding context.
2. Because-of chain: Yes — Lombardi's athletic/competitive declaration → Specimen (type as monument) → Big Shoulders (condensed athletic signage weight) → cerulean on midnight (unyielding steel against void; the 192°–215° mandate corridor perfectly matches the sky-at-horizon quality the phrase needs).
3. Render feasibility: Yes — Big Shoulders Display is a condensed font; three lines at clamp(52px, 7.8vw, 112px) and clamp(72px, 11.5vw, 165px) fit within a 90vw usable width at 1440px, and the three-line block with attribution fills approximately 72–76% of viewport height on a 900px display after nav and footer strips.

## Rationale
The Lombardi quote from `signals.quote` locked in immediately because it does the portfolio's own work in fourteen words. Doug March's site reads raw YAML at sunrise and builds a new face — that is exactly what "the harder you work, the harder it is to surrender" describes. Thursday, June 18: peak summer, 14.7 hours of daylight, a U.S. Open leaderboard frozen at even par with five men refusing to blink, a Tigers loss absorbed and tomorrow already scheduled. The phrase does not need the context to land; it lands harder without it.

The Specimen archetype follows because this declaration does not want curation, it wants space. A Broadsheet would surround it with competing columns. A Poster would frame it like a precious object. A Specimen makes the type the entire visual argument — the words at massive condensed scale, the void doing the work of emphasis, the negative space measured in the same unit as the letterforms. Big Shoulders Display is the only chassis appropriate for the energy: "dramatic, athletic, signage" are its listed moods, and Vince Lombardi invented the athletic signage tradition. The 1.618 scale ratio clears the marquee threshold without forcing the phrase into parody. Atkinson Hyperlegible in the attribution and signal data stays out of the way — it is legibility infrastructure, not a design statement.

The cerulean at H:203° honors the color mandate's 192°–215° corridor while choosing the one hue that earns the phrase's weight. Steel blue — the color of sky at maximum altitude on the longest days of the year, the color of a clean radio signal, the color of midnight before it becomes black — on near-void midnight ink creates a design that looks like a dispatch from somewhere deep in the working hours. The Specimen has no imagery because no image competes with the declaration. The signal footer at the bottom — U.S. Open at even par, Tigers 2-4, Juneteenth tomorrow, HN medical AI spike — exists not as decoration but as evidence: here is the world the phrase was spoken into today.
