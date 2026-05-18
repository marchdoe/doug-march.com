# Signals Brief — 2026-05-18

## Hero Copy
DON'T LET THE FEAR OF LOSING BE GREATER THAN THE EXCITEMENT OF WINNING.

## Hero Rationale
The signal quote from Robert Kiyosaki arrives on a Monday with precise convergence: the Pistons got blown out 94–125, the Tigers fell 1–4, and yet Aaron Rai just claimed the PGA Championship at -9 — one winner standing, the fear absorbed and filed. Day 2.5 of a new lunar cycle, 14.2 hours of spring daylight, the week starting fresh. The quote is a direct address to this exact morning. It's the sentence you tape above a desk; it earns marquee scale because it names the choice that every portfolio project represents. The Kiyosaki attribution grounds it without softening it.

## Archetype
Poster

## Chassis
anton-inter-tight

## Visual Specification
### 1. Color Specification

**Primary hue:** H:35° (amber-gold). The color mandate's permitted window is 15°–42°; H:35° lands at the warm center of that band. This is trophy gold, hazard tape, the specific amber of a scoreboard flipping to CHAMPION.

**Neutral palette (stone, amber-tinted H:30°):**
- 50: #FAF8F4
- 100: #EDE8E0
- 200: #D6CFC4
- 300: #B8AFA3
- 400: #928880
- 500: #706760
- 600: #544C46
- 700: #3A3430
- 800: #252018
- 900: #161210
- 950: #0E0A06

**Accent color:**
- light: #FFD49A (amber.200)
- default: #E87C08 (amber.500)
- dark: #C56206 (amber.600)
- glow: rgba(232, 124, 8, 0.25)

**Secondary accent:** None. Single committed accent.

**Background:**
- Page bg: #0E0A06 (stone.950 — near-black, amber-tinted midnight)
- Card bg: #161210 (stone.900)
- Sidebar bg: #0E0A06

**Text colors:**
- Hero phrase: #FFB85A (amber.300 — golden, 9.9:1 contrast on bg)
- Primary text: #FFECD0 (amber.100 — warm cream, 16:1 contrast)
- Secondary text: #B8AFA3 (stone.300)
- Muted text: #706760 (stone.500)
- Attribution / label: #928880 (stone.400)

---

### 2. Typography

**Hero phrase rendering:** Anton (display token, sourced from `anton-inter-tight` chassis). Rendered at `clamp(52px, 7.5vw, 108px)` across 5 poster lines in color #FFB85A. The phrase breaks as:

```
LINE 1: DON'T LET THE FEAR
LINE 2: OF LOSING BE
LINE 3: GREATER THAN
LINE 4: THE EXCITEMENT
LINE 5: OF WINNING.
```

Line 5 ("OF WINNING.") receives the emphatic terminal period — the period renders in amber.500 (#E87C08), slightly warmer/deeper than the main golden text, making the full stop the single chromatic accent event. The phrase is uppercase, tracking normal (Anton is already condensed — no additional letter-spacing needed). The block is left-aligned at 6vw from left edge; vertical placement: centered at 48vh.

**Line heights:**
- Hero (Anton): 0.9 (tight, poster compression — lines nearly touch for maximum density)
- Body (Inter Tight): 1.55
- Labels / captions: 1.2

**Letter spacings:**
- Hero: 0em (Anton reads at natural weight)
- Body: 0.01em
- Labels / smallcaps: 0.1em (wide, for Inter Tight at 11–12px)
- Attribution: 0.12em, all-caps

---

### 3. Layout Specification

**Archetype:** Poster. The phrase fills the viewport as a physical object — not centered on a field, but flush to the left-edge grid column (6vw padding) so it reads as a declaration rather than a caption. The dark ground is not a background; it's the absence of anything except the phrase.

**CSS grid/flex structure:**
```css
body {
  display: grid;
  grid-template-rows: 48px 1fr 56px;
  min-height: 100vh;
  padding: 0;
}
/* Row 1: nav strip */
/* Row 2: hero zone */
/* Row 3: signal strip */
```

**Major dimensions:**
- Hero area: `min-height: calc(100vh - 104px)` (full viewport minus nav + strip)
- Signal strip: `height: 56px` — fixed bottom band
- Nav strip: `height: 48px` — fixed top
- Max content width: `none` — full bleed edge to edge
- Hero padding: `padding: 0 6vw` — viewport-relative only
- No max-width constraint on any element

**Nav placement:** Top strip, full-width, 48px tall. Logo "DOUG MARCH" in Inter Tight 11px, letter-spacing 0.18em, all-caps, color stone.300 — flush left at 6vw. Navigation links (Work, About) flush right at 6vw, same spec. The nav sits in a transparent band; no border, no background.

**Hero phrase grid zone:** Rows 2 of the 3-row grid. Within that zone the phrase block is positioned at `padding-top: 14vh`, left-aligned. The 5-line cascade occupies roughly 80% viewport height at the specified scale on a 900px tall viewport — remaining 20vh is breathing room below the phrase before the signal strip.

**Attribution line:** "— ROBERT KIYOSAKI" in Inter Tight 11px, stone.400, all-caps, wide tracking, positioned `margin-top: 28px` below "OF WINNING." — flush left, same 6vw indent.

---

### 4. Component Character

**Border radius:**
- Cards: 0 (none — hard poster edges)
- Buttons: 2px (sm — nearly square)
- Tags/labels: 0

**Border treatment:** Borderless on the main poster. Signal strip separated by a single 1px rule in stone.800 (#252018). No card borders.

**Shadow:** None. The midnight ground does all elevation work — anything lifted uses amber glow (rgba(232, 124, 8, 0.12) for hover states only).

**Density:** Spacious. The poster breathes — the only density is in the signal strip, which packs score tokens in a single tight row.

**Interactive states:**
- Nav links on hover: color transition to amber.400, 180ms ease
- Signal items on hover: text brightens to amber.300, underline appears in amber.600
- All transitions: 180ms ease

---

### 5. Signal Integration

**PGA Championship (lead signal):** Signal strip, far right. "PGA CHAMPION / AARON RAI  −9" in two micro-lines — "PGA CHAMPION" in Inter Tight 9px, stone.400, wide-tracked label; "AARON RAI  −9" in Inter Tight 13px bold, amber.400. This is the triumph anchor of the strip — receives the brightest color.

**Sports losses:** Signal strip, center-left. Two inline tokens:
- "PISTONS  94–125" — Inter Tight 11px, stone.400 (loss = muted)
- "TIGERS  1–4" — same spec. A hairline rule (stone.700) separates the two.
- Both are deliberate understatement — the losses are filed, not featured.

**Quote treatment:** The Kiyosaki quote IS the hero phrase. No separate blockquote or pull-quote element. Attribution sits as a subordinate line immediately below "OF WINNING." in the poster zone.

**Lunar signal:** Signal strip, far left: waxing crescent symbol (☽) + "2.5D / 6.9%" in Inter Tight 9px, stone.500. Day 2.5 into the new cycle — new beginnings filed quietly.

**Monday / date:** Signal strip, immediately right of lunar: "MON 18 MAY 2026 / 14.2H DAYLIGHT" in Inter Tight 9px, stone.400, wide tracking. Contextual anchoring.

**HN top story:** Not surfaced in the main poster (would dilute the phrase). If the downstream implementation includes an expandable signals drawer, "Where Are the Vibecoded Photoshops?" (112) belongs there — self-referential provocation appropriate to this site.

**Music:** My Morning Jacket / Radiohead / Guided by Voices — available as a hover-reveal tooltip on the signal strip date element. Not surface-level; these are ambient.

## Self-Check
1. Hero quotability: Yes — "Don't let the fear of losing be greater than the excitement of winning" is a widely-cited motivational phrase that stands as a complete argument in isolation; at Anton scale across five poster lines it's something a visitor would photograph.
2. Because-of chain: Yes — Kiyosaki's dialectic (fear/excitement) → Poster archetype (one argument fills the frame) → Anton/Inter Tight (condensed declaration weight, not editorial warmth) → championship amber on midnight stone (trophy gold as the only light source in the void) → left-aligned cascade layout (a declaration posted on a wall, not a headline centered on a magazine cover).
3. Render feasibility: Yes — Anton at clamp(52px, 7.5vw, 108px) across five lines, the longest being "DON'T LET THE FEAR" (18 chars in condensed Anton ≈ 1,080px at 108px scale), fits inside a 1440px viewport at 6vw side padding with ~180px margin per side.

## Rationale
The hero phrase arrived from Robert Kiyosaki's quote in today's signal feed, but it earned its place through convergence, not reflex. The Pistons were blown out 94–125. The Tigers fell 1–4. And yet Aaron Rai claimed the PGA Championship at -9, one winner standing across a weekend where Detroit absorbed its losses quietly. The phrase is the conceptual architecture for all three results simultaneously: fear accounted for, excitement chosen. For a portfolio site built on iterative risk-taking — Spaceman in 2018, FishSticks in 2025, 15th Club in 2025, this site rebuilding itself daily — the quote reads as both visitor instruction and product manifesto. The waxing crescent at day 2.5 of a new cycle and 14.2 hours of spring daylight confirm the timing: this is the right Monday for it.

The Poster archetype was the only honest container. The phrase contains a complete philosophical argument — a comparison, a negation, a recommendation — and it doesn't need the company of projects and signals sharing its canvas at scale. Poster contracts the entire portfolio rationale to one statement and lets every other element (nav, signal strip, attribution) be footnote. The phrase sits flush-left at 6vw, not centered, because declarations are posted on walls, not floated in white space. Anton's condensed capitals at clamp(52px, 7.5vw, 108px) across five lines creates the correct physical register: this is a sign in a locker room, a poster above a desk, not a magazine headline. The terminal period on "OF WINNING." renders in amber.500 — slightly darker, more saturated than the golden amber.300 of the phrase body — so the full stop arrives as a deliberate color event, not punctuation.

The amber-gold palette was both mandated and conceptually exact. The color mandate's permitted window (15°–42°) is the precise hue family of championship gold, trophy brass, and hazard amber. H:35° at high saturation against near-black stone.950 (#0E0A06) creates a luminous isolation — the phrase floats in darkness like a lit sign, not a page. Five consecutive designs have lived in the dark (ocean-void, night-olive, cordovan, night-violet) or swung to warm paper; amber-on-midnight is neither. It's the gold that doesn't need warmth to feel alive, because it has its own light source.
