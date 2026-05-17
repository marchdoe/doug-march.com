# Signals Brief — 2026-05-17

## Hero Copy
WE CAN LEARN TO SURF.

## Hero Rationale
Dan Millman's quote arrived in today's signal feed and the last six words earn their own sentence. Sunday + new moon (day 1.47 of a new cycle, 2.4% illumination) + mid-May spring with 14.2 hours of daylight: this is structurally a beginning, not a continuation. The phrase works as portfolio manifesto — Doug March as someone who reads the environment and adapts — and it becomes serendipitously perfect when the color mandate forces the palette into the deep ocean-indigo band (235°–262°). The wave metaphor and the available hues arrived at the same destination independently. A period at the end makes it declaration, not suggestion.

## Archetype
Specimen

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

**Primary hue** — H:245° (deep ocean indigo). The color mandate permits only 235°–262°, which landed directly on the blue-indigo range of open-ocean depth. No creative deviation needed — the constraint IS the concept.

**Neutral palette** (tinted toward H:245°, very low chroma, named "void"):
- 50:  #F2F2FF
- 100: #E0E0F8
- 200: #BEBEDD
- 300: #9494BB
- 400: #686898
- 500: #444472
- 600: #2C2C54
- 700: #1A1A38
- 800: #0E0E24
- 900: #060616

**Accent color** (foam indigo, H:245° lifted high):
- light: #DDDDF8
- default: #8E8EE8
- dark: #4444CC
- glow: rgba(142,142,232,0.18)

**Secondary accent**: none. One chromatic frequency, fully committed.

**Background**:
- Page bg: #060616 (void.900 — the ocean at absolute depth)
- Card bg: #0E0E24 (void.800)
- Sidebar bg: #0E0E24

**Text colors**:
- Primary text: #F2F2FF (void.50 — foam white, near-white with indigo cast)
- Secondary text: #9494BB (void.300)
- Muted text: #686898 (void.400)

---

### 2. Typography (chassis-derived)

**Hero phrase rendering** — `display` token at three cascade sizes using `clamp()`:
- Line 1 "WE CAN" — `clamp(44px, 7vw, 112px)`, weight 700, tracking `-0.04em`
- Line 2 "LEARN TO" — `clamp(60px, 9.5vw, 148px)`, weight 700, tracking `-0.04em`
- Line 3 "SURF." — `clamp(88px, 14vw, 220px)`, weight 700, tracking `-0.04em`, the period in #8E8EE8 (foam.400 accent)

All three lines left-aligned at `padding-left: 6vw`. The cascade reads as a wave building — each line taller than the last, the monosyllable "SURF." arriving at maximum scale with the chromatic event of the accented period.

**Line heights**:
- Hero lines: `0.88` (tight — the condensed display letterforms compress vertically)
- Body/signal: `1.5`
- Labels: `1.1`

**Letter spacings**:
- Hero: `-0.04em` (tight — counters Big Shoulders' natural openness at display scale)
- Body: `0em`
- Smallcaps/labels: `0.1em` (wider — needed for short uppercase labels)
- Attribution line: `0.05em`

---

### 3. Layout Specification

**Archetype** — Specimen. The phrase is the design. No sidebar, no competing panels — the type occupies 85%+ of the viewport canvas. The Specimen archetype lets Big Shoulders Display do the one thing it does best: fill a wall with the weight of a public declaration.

**CSS grid/flex structure**:
```
display: grid;
grid-template-rows: 64px 1fr 72px;
grid-template-columns: 1fr;
min-height: 100vh;
max-width: none;
```
- Row 1: nav bar
- Row 2: hero phrase zone (fills all remaining space)
- Row 3: signal strip

**Major dimensions**:
- Hero/featured area height: `calc(100vh - 64px - 72px)` (fills between nav and signal strip)
- Max content width: `none` — full canvas, `padding: 0 6vw`
- Nav height: `64px`
- Signal strip height: `72px`
- Section padding: `6vw` horizontal throughout

**Nav placement** — full-width top bar, `64px` tall:
```
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 6vw;
border-bottom: 1px solid void.700 (#1A1A38);
```
Left: "DOUG MARCH" in Atkinson Hyperlegible, 13px, `letter-spacing: 0.1em`, void.300
Right: nav links (Work, About, Contact) in Atkinson, 13px, void.400, hover → void.50

**Hero phrase grid zone** — occupies the full `1fr` row. Within it:
```
display: flex;
flex-direction: column;
justify-content: center;
padding: 0 6vw;
gap: 0;
```
The three lines stack with `line-height: 0.88`, creating a tight cascade. Vertically centered in the row, sits roughly 10vh from vertical center to feel weighted (surfer's low center of gravity).

---

### 4. Component Character

**Border radius** — `none` throughout. Specimen mode: no rounded softness. The type is the form.

**Border treatment** — minimal: only the nav bottom rule (1px, void.700) and signal strip top rule (1px, void.700). No card borders.

**Shadow** — none. The dark ground provides all depth.

**Density** — maximally spacious in the hero zone (the phrase breathes in the dark ocean). Compact in the signal strip (small labels, tight rows).

**Interactive states**:
- Nav links: `color` transition 150ms; hover moves from void.400 → void.50
- Signal items: no hover state (read-only data)
- Project mentions if any: subtle underline on hover in foam.400

---

### 5. Signal Integration

**Where signal elements live** — exclusively in the 72px signal strip at the bottom of the viewport. Full-width, `display: flex; align-items: center; gap: 48px; padding: 0 6vw;`. Separated from hero by a 1px void.700 rule.

**Golf (PGA Championship)** — leftmost signal item. Label: "PGA" in void.400, 11px, `letter-spacing: 0.1em`. Score: "Smalley –6" in void.50, 13px, foam.400 for the "–6". No decoration.

**Tigers loss** — "DET 1–2" in void.300, 13px. The "L" indicator in void.400 muted — a quiet loss, not dramatized.

**Lunar** — "● NEW MOON" in void.400, 11px. The bullet character (●) in foam.400.

**Hacker News** — "ZEROSTACK 403↑" in void.400, 11px. "403↑" in void.300.

**Quote attribution** — rightmost, flush right: "— DAN MILLMAN" in Atkinson, 11px, void.500, `letter-spacing: 0.05em`. This anchors where the hero phrase came from without explaining it.

**Music** — not in the signal strip (too much for the strip). Suppressed today in service of the Specimen discipline.

## Self-Check
1. Hero quotability: Yes — "WE CAN LEARN TO SURF." is a complete declarative sentence from a named author that stands alone as a poster, a manifesto, and a life stance; someone would screenshot this line.
2. Because-of chain: Yes — phrase (waves/surfing) demanded Specimen (type fills the canvas like a wave face), Specimen demanded Big Shoulders Display (condensed athletic signage at poster scale), phrase+archetype demanded deep ocean indigo H:245° (the only open color window perfectly intersects the metaphor), palette demanded the three-cascade left-anchored layout where "SURF." arrives at maximum scale with the one chromatic event.
3. Render feasibility: Yes — Big Shoulders Display condensed at clamp(88px,14vw,220px) on 1440×900 renders "SURF." at ~202px in a single word with natural glyph width well inside 94vw; the three-line cascade fits comfortably in calc(100vh - 136px) without overflow.

## Rationale
The hero phrase arrived from Dan Millman's signal quote and earned its place at the exact convergence of three independent streams: the new moon (day 1.47 of a new cycle — a structural beginning), Sunday in mid-May (the longest-daylight stretch of the year building), and a color mandate that — through the process of eliminating the last six builds' primary hues — opened a window of exactly 235°–262°, which is the precise frequency of deep ocean water. The wave metaphor and the available palette arrived at the same destination without coordination. That kind of serendipity gets to be the hero.

The Specimen archetype was the only honest container for this phrase. A Poster could have done it, but Poster implies a designed field around the type — a relationship between type and surface. Specimen eliminates that relationship: the type IS the surface. At three cascade scales ("WE CAN" → "LEARN TO" → "SURF." at 14vw), the phrase reads as a wave building from the left margin and cresting at the bottom line. Each line is taller than the last. The monosyllable "SURF." — the payload of the whole sentence — arrives at maximum scale with the only chromatic event on the page: a foam-indigo period. Big Shoulders Display condensed was mandatory; this is the typeface of signage, of public declarations, of things printed on walls, and "WE CAN LEARN TO SURF." needs to feel less like a caption and more like something chiseled.

The palette does no work except hold the void. Deep ocean indigo (#060616 to #F2F2FF) is a single frequency sustained across the entire canvas — no warmth, no competing colors, no neutralization. The forbidden zones created by six consecutive builds eliminated every other hue family, and what remained was the ocean. The single accent event (foam.400 #8E8EE8 on the period of "SURF.") functions as the foam at the crest of a breaking wave: the only moment of color, and it lands on punctuation rather than a letter, so it reads as emphasis on the sentence itself rather than decoration of a glyph.
