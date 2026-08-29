# Signals Brief — 2026-05-05

## Hero Copy
guided by voices

## Hero Rationale
Today's music signal lists Guided by Voices first in the feed — a band whose entire ethos is lo-fi, prolific, outsider, guided by instinct rather than convention. But the phrase doubles as a manifesto for the site itself: dougmar.ch literally redesigns itself daily by listening to environmental signals — it is, structurally, guided by voices. The phrase earns marquee scale because it works on both registers simultaneously. It's quotable, ambiguous, and resonant in isolation. The Awwwards nod to "THE NO-CODE SHADER" with its aggressive all-caps treatment confirms the typographic register. On a 79°F sunny Tuesday with Risk at 8/10, this is the line that wants to be loud.

## Archetype
Poster

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

**Primary hue — 350° (crimson-red)**
Crimson chosen because the phrase "guided by voices" carries emotional urgency — not anger, but aliveness. The 350° hue is well outside the forbidden 90°–240° zone. It reads as commitment, vitality, spring blood moving fast. The 79°F sunny day permits warmth; the Risk 8/10 calls for saturation, not restraint.

**Neutral palette — warm cream, tinted toward orange-red (~15° HSL)**
All neutrals carry a red-orange undertone so they cohere with the crimson and read as sun-bleached analog material rather than sterile white:
- 50: `#F9F2E8` — page background, primary canvas
- 100: `#F2E6D6` — card / strip background
- 200: `#E4CDB8` — borders, hairlines
- 300: `#CEB09A` — placeholder / decorative
- 400: `#B08C78`
- 500: `#8C6B58`
- 600: `#6A4E3C` — muted text (min WCAG AA on warm.50: ~6.0:1 ✓)
- 700: `#4E3428` — secondary text
- 800: `#341E16`
- 900: `#200E0A` — primary body text (~18:1 on warm.50 ✓)

**Accent color — crimson**
- light: `#F5808D`
- default: `#D91828`
- dark: `#880C1A` (hero phrase color — ~8.3:1 on warm.50 ✓)
- glow: `#FAB8C1`

**Secondary accent** — none. Crimson carries the page alone.

**Background**
- Page bg: `#F9F2E8`
- Card/strip bg: `#F2E6D6`
- Sidebar bg: `#F2E6D6`

**Text colors**
- Primary text: `#200E0A`
- Secondary text: `#4E3428`
- Muted text: `#6A4E3C`

---

### 2. Typography (chassis-derived)

**Hero phrase rendering — stacked, cascading alignment**

Big Shoulders Display (the display half of `big-shoulders-atkinson`) is all-caps by design. "guided by voices" becomes a three-word stack:

```
GUIDED     ← left-anchored, starts at 6vw
    BY     ← centered in viewport
   VOICES  ← right-anchored, ends at 94vw
```

This left/center/right cascade is the compositional move — the eye sweeps diagonally across the full canvas. All three words use the `display` chassis token.

- **GUIDED**: `clamp(100px, 26vw, 380px)`, weight 800, letter-spacing `-0.02em`, left-aligned from `6vw`
- **BY**: `clamp(40px, 8vw, 115px)`, weight 200 (ultra-light for weight contrast), letter-spacing `0.20em`, centered
- **VOICES**: `clamp(100px, 26vw, 380px)`, weight 800, letter-spacing `-0.02em`, right-aligned to `94vw`

At 1440px viewport: GUIDED/VOICES render at ~374px — each word spans approximately 78% of viewport width. BY renders at ~115px, centered, reading as a whispered hinge between two declarations.

**Line heights**
- Hero stack: `0.88` (tight, poster-mode — words nearly touch)
- Attribution line: `1.5`
- Bottom strip labels: `1.3`

**Letter spacings**
- Hero GUIDED/VOICES: `-0.02em` (tighten the condensed caps)
- Hero BY: `0.20em` (open tracking — the light weight needs air to hold its own)
- Small labels / signal data: `0.10em` (ALLCAPS legibility)

---

### 3. Layout Specification

**Archetype — Poster**
The phrase is three monosyllables that want to fill a room. The Poster archetype subordinates everything — navigation, projects, signal data — to corners and edges. Not used in the last 3 days (Specimen, Index, Stack were recent; Poster last appeared 9 days ago on 04-26 at a materially different scale and palette).

**CSS grid/flex structure**
```css
.page-root {
  position: relative;
  min-height: 100vh;
  background: #F9F2E8;
  overflow: hidden;
}

.corner-nav-left {
  position: fixed;
  top: 32px;
  left: 6vw;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
}

.corner-nav-right {
  position: fixed;
  top: 32px;
  right: 6vw;
  display: flex;
  gap: 24px;
  z-index: 10;
}

.hero-stage {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
}

.hero-word-row {
  display: flex;
  width: 100%;
  padding: 0 6vw;
}
.hero-word-row.guided  { justify-content: flex-start; }
.hero-word-row.by      { justify-content: center; }
.hero-word-row.voices  { justify-content: flex-end; }

.hero-attribution {
  text-align: center;
  margin-top: 24px;
  padding: 0 6vw;
}

.signal-strip {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: #F2E6D6;
  border-top: 1px solid #E4CDB8;
  display: flex;
  align-items: center;
  padding: 0 6vw;
  gap: 32px;
  z-index: 10;
}
```

**Major dimensions**
- Hero/featured area height: `100vh`
- Bottom signal strip: `48px` fixed
- Sidebar/panel: none (Poster archetype — no sidebar)
- Max content width: `none` — full canvas; side padding `0 6vw` on hero rows
- Section padding: hero rows `0 6vw`; attribution `0 6vw margin-top: 24px`

**Nav placement**
- Top-left corner (fixed): wordmark `dougmar.ch`, 12px, Atkinson Hyperlegible, warm.600, letter-spacing 0.10em
- Top-right corner (fixed): nav links `Work` / `About`, 13px, Atkinson Hyperlegible, warm.700, hover → crimson.500
- Bottom strip (fixed, 48px): signal data

**Hero phrase grid zone**
GUIDED occupies approximately `rows 1–3` of the flex column, spanning from `6vw` to `~84vw` (left-anchored). BY occupies center, spanning `40vw–60vw` approximately. VOICES occupies right, from `~20vw` to `94vw` (right-anchored). Collectively the three words occupy `82–88%` of viewport height (`≈738–792px` on 900px viewport), centered vertically.

---

### 4. Component Character

**Border radius** — `0px` everywhere. The poster aesthetic is completely flat. No rounding on links, strips, or any element.

**Border treatment** — single `1px solid #E4CDB8` (warm.200) hairline separating the signal strip from the hero canvas. No other borders.

**Shadow** — none. The palette contrast carries all weight.

**Density** — hyper-spacious in the hero zone (the three words float in a sea of warm cream); compact in the 48px signal strip (tight, dense, small type).

**Interactive states**
- Nav links: `color: #D91828` on hover, `0.15s ease` transition
- Signal strip links: `text-decoration: underline` on hover, crimson.500
- No hover state on hero phrase itself (it's display, not interactive)

---

### 5. Signal Integration

**Quote** ("It is our experiences that mold us into who we are...during times of adversity our true character will show" — Unknown)
Rendered as the attribution line below the three-word stack, centered: `"during times of adversity our true character will show"` — Atkinson Hyperlegible italic, 13px, warm.600, centered, 28px below VOICES. Set in quotes. The attribution is reduced to the second half of the sentence, which is the stronger fragment.

**Weather** (79°F, Sunny, Aldie VA) — signal strip, left cluster: `79° · Sunny` in Atkinson Hyperlegible 12px, warm.700, letter-spacing 0.10em

**Lunar phase** (waning gibbous, 78.9%) — signal strip: `◑ 79%` glyph + percentage, warm.600, 12px

**Music signal** — attribution line also carries: a faint eyebrow above the three-word stack, flush-right at `6vw`: `GUIDED BY VOICES · MAY 5` in Atkinson Hyperlegible, 10px, warm.400, letter-spacing 0.20em — the source and the date in a single compact label

**HN top story** ("Async Rust never left the MVP state" · 343 pts) — signal strip, center: `343 ↑ Async Rust never left the MVP state` truncated to 50 chars, Atkinson 12px, warm.700, linked, hover → crimson.500

**Market** (SPY −0.37%) — signal strip: `SPY −0.37%` in warm.600, 12px

**Mother's Day** (5 days away) — signal strip, right cluster: `Mother's Day in 5` in warm.500, 12px, italic

**Sports** — all Detroit teams in offseason; omitted from the strip (nothing to report)

**Golf** (Truist Championship, Scheduled) — signal strip: `Truist Championship · Scheduled` in warm.500, 11px, right of Mother's Day note — only if space permits

## Self-Check
1. Hero quotability: Yes — "guided by voices" works as a standalone proclamation that resonates on two registers (the band, the site's signal-driven architecture); someone would screenshot this line without context and find it compelling.
2. Because-of chain: Yes — the phrase's singular weight demanded Poster; Poster demanded condensed display at poster-scale, leading directly to big-shoulders-atkinson at 1.618; the phrase's urgency and the 79°F sunny day demanded crimson on warm cream; the palette and archetype together dictated the left/center/right cascade layout that fills the full canvas.
3. Render feasibility: Yes — Big Shoulders Display at 26vw (≈374px on 1440px viewport) renders GUIDED and VOICES at ~78% width each; BY at 8vw (≈115px) centered as a hinge; total stacked height ~84% of 900px viewport; no overflow, no collapse.

## Rationale
The hero phrase found itself at the intersection of two signals that rarely overlap: today's music feed (Guided by Voices, top of the list) and the structural premise of the site itself (a portfolio that literally redesigns daily based on environmental signals — it is, architecturally, guided by voices). The phrase works because it refuses to collapse to a single meaning. It's a band name, a design philosophy, and a quiet declaration of method all at once. The phrase had to be loud today not because of volume but because of resonance.

The phrase's singularity dictated the Poster archetype — one dominant thing filling the viewport, everything else demoted to edges. But a standard centered-text Poster would be too easy. The compositional move — GUIDED left-anchored, BY centered and light, VOICES right-anchored — creates a diagonal sweep across the full canvas, the three words occupying a kinetic arc rather than a static stack. The eye is pulled from left to center to right, tracing the grammar of the phrase as a physical journey across the page. Big Shoulders Display at weight 800 for GUIDED/VOICES and weight 200 for BY makes BY feel like a whispered hinge between two declarations, a visual pause before the landing. The 1.618 ratio of the chassis is essential: at 26vw on a 1440px viewport, each word spans ~78% of the canvas.

The palette answers the weather directly: 79°F and sunny in May asks for warmth, not darkness. The site has run deep violet (April 30) and cobalt (April 28) and spring green (April 27) — crimson on warm cream is the one direction completely untouched. Crimson at 350° (outside the 90°–240° forbidden zone) on warm cream (`#F9F2E8`, tinted toward orange-red at ~15° HSL) reads like a concert announcement printed on sun-bleached analog paper. The neutrals share the red-orange undertone so the entire canvas feels cohesive rather than imposed — even the hairline borders and muted signal text belong to the same warm family. The bottom signal strip (48px, fixed) holds all the environmental data — weather, lunar phase, HN score, market, Mother's Day note — compressed into a single dense band so it never competes with the three words above it. The poster earns its silence.
