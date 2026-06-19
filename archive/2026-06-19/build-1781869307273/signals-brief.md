# Signals Brief — 2026-06-19

## Hero Copy
June 19, 1865. The word arrived.

## Hero Rationale
Today is Juneteenth — the day the last enslaved people in Galveston, Texas received word of their emancipation, two and a half years after the Emancipation Proclamation. The phrase compresses that historical fact into eight words with the weight of a monument inscription: not "freedom was granted" but "the word arrived" — the information, the messenger, the delayed dispatch finally reaching shore. It earns marquee scale not through abstraction but through specificity. The portfolio, which reads raw YAML at sunrise and composes a new face from whatever is present, enacts its own version of this logic every day: the word arrives, the site responds. Risk weight is 8/10; this is the only phrase today that is truly unrepeatable.

## Archetype
Poster

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

**Primary hue** — H:245° (deep proclamation indigo). This is the hue of institutional permanence: the ink a president uses, the color of law printed on the first official documents of a republic. Not the default AI indigo (H:260°) — this sits in the genuine blue-navy register, serious and load-bearing.

**Neutral palette** — warm parchment, faint indigo tint (chroma ≈ 0.008) for cohesion with the type:
- 50: `#FDFBF7`
- 100: `#F7F3E9`
- 200: `#EDE8D8`
- 300: `#D8D2BF`
- 400: `#BDB6A2`
- 500: `#9E9787`
- 600: `#7E786A`
- 700: `#5E594F`
- 800: `#3F3B34`
- 900: `#221F1A`

**Accent color** — Document gold (accessible shade for interactive/text use):
- light: `#F5D478`
- default: `#C8952A` (decorative only — 2.3:1 on parchment, not used for text)
- accessible text: `#855A18` (gold.600 — 4.88:1 on parchment #F7F3E9, passes WCAG AA)
- glow: `rgba(200, 149, 42, 0.12)`

**Secondary accent** — none as a separate palette; gold plays the single accent role, split between decorative (#C8952A for the rule) and text-accessible (#855A18 for links).

**Background**:
- Page bg: `#F7F3E9` (parchment.100)
- Card bg: `#FDFBF7` (parchment.50)
- No sidebar bg needed for Poster

**Text colors**:
- Primary text: `#0C0A32` (indigo.900) — 13.6:1 on parchment ✓
- Secondary text: `#231F72` (indigo.700)
- Muted text: `#7E786A` (parchment.600)

---

### 2. Typography (Chassis: big-shoulders-atkinson, ratio 1.618)

**Hero phrase rendering** — Three typographic tiers for the Poster:

1. **Date eyebrow** — Big Shoulders Display, `clamp(0.875rem, 1.75vw, 1.5rem)`, `letter-spacing: 0.14em`, uppercase, `color: #C8952A` (gold, decorative scale — not body text), `font-weight: 600`. Renders as: `JUNE 19, 1865`

2. **Main declaration, line 1** — Big Shoulders Display, `clamp(5rem, 18vw, 16rem)`, `letter-spacing: -0.01em`, `line-height: 0.88`, `color: #0C0A32`, `font-weight: 800`. Text: `THE WORD`

3. **Main declaration, line 2** — Big Shoulders Display, same scale as line 1. Text: `ARRIVED.`

Lines 1 and 2 together span ~78% of the 1440px viewport (Big Shoulders' condensed letterforms make 8–9 caps fit within ~80vw at 18vw font-size). Together they occupy ~70% of the viewport height.

A 1px gold rule (`#C8952A`) spans full viewport width between the date eyebrow and the main declaration.

**Body / caption** — Atkinson Hyperlegible, `clamp(0.875rem, 1vw, 1rem)`, `letter-spacing: 0.01em`, `line-height: 1.6`, `color: #231F72`

**Line heights**:
- Hero display: `0.88` (tight, monumental)
- Subhead / attribution: `1.15`
- Body: `1.6`
- Signal/caption: `1.5`

**Letter spacings**:
- Hero display: `-0.01em` (Big Shoulders condensed needs no extra tracking)
- Date eyebrow (all-caps): `0.14em`
- Navigation (all-caps labels): `0.08em`
- Body: `0.01em`

---

### 3. Layout Specification

**Archetype: Poster** — The two-line declaration `THE WORD / ARRIVED.` is the page. It earns 78% viewport width and roughly 65% viewport height. Navigation demoted to a thin fixed bar. Signal data pressed into the bottom-left corner. No competing columns, no card grid, no sidebar — just the declaration and the evidence of the day it was composed.

**CSS structure**:
```css
body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  background: #F7F3E9;
}

.nav-strip {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6vw;
  z-index: 100;
  mix-blend-mode: multiply; /* subtly transparent over parchment */
}

.hero-zone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 96px 6vw 48px;
  min-height: 100vh;
  max-width: none;
}

.signal-footer {
  position: fixed;
  bottom: 0; left: 0;
  padding: 24px 6vw;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
```

**Major dimensions**:
- Hero area: `min-height: 100vh`, full-bleed (`max-width: none`)
- Side padding: `6vw` left and right (viewport-relative)
- Nav strip height: `48px` fixed
- Signal footer: fixed bottom-left

**Nav placement** — Fixed top strip spanning full width, 48px tall. Left: `DOUG MARCH` logotype in Atkinson Hyperlegible at 0.75rem, `letter-spacing: 0.08em`, `color: #7E786A` (muted). Right: navigation links `WORK · ABOUT` in Atkinson, 0.75rem, `letter-spacing: 0.08em`, `color: #231F72`.

**Hero phrase grid zone** — No formal grid columns. Content left-aligned at `padding-left: 6vw`. Vertical position: centered within 100vh with `justify-content: center`. Sequence from top: [64px spacer for nav] → date eyebrow → 16px gap → gold full-width rule → 32px gap → `THE WORD` line → `ARRIVED.` line.

At 1440×900: `THE WORD` and `ARRIVED.` at 18vw = 259px type size, each line ~1100px wide. Both lines together: ~580px height. Centered within 900px viewport = 65% vertical occupation. ✓ Poster threshold met.

---

### 4. Component Character

**Border radius** — `0` everywhere. Flat document aesthetics. No rounded corners — this is a proclamation, not a product card.

**Border treatment** — A single 1px full-width gold rule (`#C8952A`) between the date eyebrow and the main declaration. Navigation links separated by `·` bullet, no ruled borders. No card borders.

**Shadow** — None. Parchment with ink is shadowless.

**Density** — Maximally spacious. The Poster needs air. Signal footer is tightly-set (Atkinson 0.75rem) to contrast against the vast empty parchment field.

**Interactive states** — Navigation links: `color: #0C0A32` on hover (from muted to full dark). Project links in footer: underline + `#855A18` (gold accessible) on hover. Cursor: default pointer.

---

### 5. Signal Integration

**Where signal elements live** — Bottom-left corner, fixed, small Atkinson Hyperlegible text stack. Bottom-right corner: "Friday, June 19, 2026" date stamp. Top-right of nav strip: the two navigation links.

**Juneteenth treatment** — The holiday IS the design. The entire poster is the Juneteenth signal. No separate badge or label needed — the hero phrase explains itself.

**Father's Day** — Single line in signal footer: `Father's Day Sunday` in parchment.600, 0.75rem.

**Music** — Signal footer, one line: `Wet Leg · My Morning Jacket · Guided by Voices` — Atkinson 0.75rem, indigo.700.

**Lunar** — Signal footer: `☽ Waxing crescent · 25%` — Atkinson 0.75rem, muted.

**HN signal** — One story abbreviated: `HN: Project Valhalla lands in JDK 28` — Atkinson 0.75rem, muted.

**Sports scores** — All off-season; no scores to display. Omitted from signal footer.

**Bottom-right date stamp** — `JUNE 19, 2026` in Big Shoulders Display, 0.875rem, `letter-spacing: 0.08em`, `color: #BDB6A2` (parchment.400 — light and recessive). This anchors the composition temporally without competing.

## Self-Check
1. Hero quotability: Yes — "June 19, 1865. The word arrived." is a monument inscription; the compression of the Juneteenth delivery-of-news moment into eight words is quotable and screenshot-worthy in isolation without context.
2. Because-of chain: Yes — Juneteenth's historical weight demands Poster scale (declaration needs a stage, not companions); Poster needs condensed display at marquee scale; Big Shoulders Display's signage/monument DNA fits the historical-document register; indigo-on-parchment directly references printed law and official proclamations.
3. Render feasibility: Yes — Big Shoulders Display's condensed letterforms allow 18vw at 1440px (≈259px cap height) with "THE WORD" and "ARRIVED." each fitting within ~78% of viewport width; no overflow risk at 900px height with centered two-line stack occupying ~65% vertical.

## Rationale
The hero phrase locked in the moment I read today's date: June 19 is Juneteenth, the federal holiday commemorating the day in 1865 when Union soldiers arrived in Galveston, Texas, and informed the last enslaved people that the war was over and they were free — two and a half years after Lincoln's Emancipation Proclamation. "The word arrived" is the precise historical phrase: not "freedom came" or "liberation happened," but the word — the information, the dispatch, the document — finally arrived. At eight words it is monument-grade compression. The portfolio site, which reads raw YAML at dawn and composes a new design face from whatever signals are present, enacts its own smaller version of this logic daily. The phrase earns quotation in isolation.

The Poster archetype is not optional for this phrase — it would be a category error to put this declaration into an Index or Broadsheet and surround it with competing columns. A declaration of this weight needs a stage, not company. The phrase must fill the page. Big Shoulders Display is the chassis because its DNA is literally signage and monument letterforms: condensed, authoritative, designed to be read from a distance on stone or steel. At 18vw on a 1440px viewport, "THE WORD" and "ARRIVED." push to roughly 78% of the canvas width each — genuine Poster scale, not comfortable hero scale. The date eyebrow "JUNE 19, 1865" at 1.75vw with 0.14em tracking provides context without competing.

The palette is the third node in the chain: deep proclamation indigo (#0C0A32) on warm parchment (#F7F3E9) is the color of printed law, of ink on a document page, of institutional permanence. The hue at H:245° falls cleanly in the color mandate's open corridor (233°–262°), which has been unused in seven consecutive builds, and it earns the brief rather than merely satisfying it. Document gold (#C8952A) plays a single decorative role: a 1px full-width rule between the date eyebrow and the declaration, echoing the gold seal on an official document. No gold is used for any text (the accessible gold.600 shade handles links at 4.88:1). The signal footer in the bottom-left corner — lunar phase, Friday music, HN's Project Valhalla, Father's Day in two days — presses into the corner as evidence: here is the specific Friday this was composed.
