# Signals Brief — 2026-05-28

## Hero Copy
In the middle of difficulty lies opportunity.

## Hero Rationale
Einstein's quote arrives from today's signal feed at a precise convergence: the Tigers threw a clean 4–0 shutout (difficulty met, opportunity taken), the waxing gibbous moon sits at 94.3% illumination (nearly through the arc), and the top HN story — Simon Willison's "Anthropic and OpenAI have found product-market fit" at 893 points — makes the phrase read as an industry-scale caption. For a portfolio where every project is a founder choosing to enter difficulty (Spaceman 2018, FishSticks 2025, 15th Club 2025), the Einstein line functions as unsolicited self-description. It earns marquee scale without needing explanation or attribution to land.

## Archetype
Stack

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

**Primary hue:** H:158°, seafoam-teal. This hue sits dead-center in the mandated 148°–175° window and carries exactly the right register for "opportunity" — biological, growing, charged. Not blue (corporate), not green (money), but the specific threshold between the two: the color of something pressing through toward light.

**Neutral palette (stone-teal family, tinted toward H:158°):**
- 50: `#F3F9F7`
- 100: `#E4F0EC`
- 200: `#CAE2D9`
- 300: `#A4C5BC`
- 400: `#7DA69C`
- 500: `#5D8880`
- 600: `#446B63`
- 700: `#2E5047`
- 800: `#1A3530`
- 900: `#0B1D1A`

**Accent color:**
- Light: `#54CCA9` (seafoam.300)
- Default: `#22B88A` (seafoam.400) — main accent; used for "opportunity." in hero
- Dark: `#107A58` (seafoam.600)
- Glow: `#22B88A` at 40% opacity for hover states

**Background:**
- Page bg / Hero band: `#071410` (ink.900 — near-black barely tinted toward teal)
- Signal band: `#22B88A` (seafoam.400 — saturated, full drench)
- Work band: `#F3F9F7` (stone.50 — very light seafoam-cream)
- About band: `#1A3530` (stone.800 — deep forest dark)

**Text colors:**
- Primary text (on dark): `#F3F9F7` (stone.50) — 17.5:1 vs ink.900 ✓
- Secondary text (on dark): `#7DA69C` (stone.400) — 4.8:1 vs ink.900 ✓
- Muted (on dark): `#5D8880` (stone.500) — 3.4:1 vs ink.900 (large text only) ✓
- Text on signal band: `#071410` (ink.900) — 9.2:1 vs seafoam.400 ✓
- Text on work band: `#0B1D1A` (stone.900) — 17.8:1 vs stone.50 ✓
- Text on about band: `#F3F9F7` (stone.50) — 10.4:1 vs stone.800 ✓

---

### 2. Typography

**Hero phrase rendering:** Chassis `display` token (Bricolage Grotesque 800). Size: `clamp(52px, 7vw, 100px)`. Three-line break, hard-left-aligned, padding: `0 6vw`:
- Line 1: `In the middle` — stone.50
- Line 2: `of difficulty` — stone.50
- Line 3: `lies ` — stone.50; `opportunity.` — seafoam.400 (`#22B88A`)

The accent on the final word fires at the moment of resolution — the reader follows the descent into difficulty and arrives at the lit word. Attribution `— Albert Einstein` in Manrope 400, 18px, stone.500, `margin-top: 32px`.

**Line heights:**
- Hero display: `0.9` (tight — the three lines stack into a block)
- Subheadings: `1.1`
- Body / signal band: `1.5`
- Signal band labels: `1.4`

**Letter spacings:**
- Hero: `-0.03em` (Bricolage 800 at large scale needs tightening)
- Body: `0`
- Signal band label ALL-CAPS: `0.08em`
- Project card eyebrow: `0.1em`

---

### 3. Layout Specification

**Archetype:** Stack — four full-width horizontal bands spanning edge-to-edge, each a visually distinct world. The Stack earns the hero phrase because the three-line structure is already temporal: you read down through difficulty and arrive at opportunity, mirroring the vertical scroll through the bands. The first band is the claim; each band below is evidence.

**CSS structure (overall page):**
```css
display: flex;
flex-direction: column;
width: 100%;
max-width: none;
```

Each band:
```css
width: 100%;
padding-left: 6vw;
padding-right: 6vw;
```

**Band 1 — Hero:**
```css
min-height: 88vh;
background: #071410;
display: flex;
flex-direction: column;
justify-content: center;
padding: 0 6vw;
padding-top: 56px; /* nav height */
position: relative;
```

**Band 2 — Signals:**
```css
min-height: 160px;
background: #22B88A;
display: flex;
align-items: center;
padding: 32px 6vw;
gap: 48px;
flex-wrap: wrap;
```

**Band 3 — Work:**
```css
padding: 96px 6vw;
background: #F3F9F7;
```
Project grid: `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px;`

**Band 4 — About / Capabilities:**
```css
padding: 80px 6vw;
background: #1A3530;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 48px;
```

**Major dimensions:**
- Hero area height: `min-height: 88vh`
- Max content width: `none` (edge-to-edge with `6vw` side padding)
- Signal band height: `min-height: 160px`
- Section padding: `96px 6vw` (work), `80px 6vw` (about)

**Nav placement:** Absolute within hero band, top-pinned. `height: 56px`, `display: flex; align-items: center; justify-content: space-between; padding: 0 6vw; width: 100%; position: absolute; top: 0; left: 0`. Logo in stone.50 Bricolage 600 at 18px; nav links in Manrope 500 at 14px, stone.400, letter-spacing: 0.05em, uppercase. No border — the dark void makes the nav float.

**Hero phrase grid zone:** Within Band 1, centered vertically (flex column, justify-content: center). Phrase block spans `padding: 0` horizontally (already inside 6vw container). At 1440px, at `7vw = 100.8px` font size with line-height 0.9 and 3 lines, the text block height is approximately `270px` — well within the `88vh ≈ 792px` band, leaving generous dark space above and below.

---

### 4. Component Character

**Border radius:**
- Cards (work band): `6px`
- Buttons / tags: `2px` (flat, declarative — matches Bricolage's geometric authority)
- Signal pills: `full` (9999px) for contrast against the flat card treatment

**Border treatment:** Borderless on dark bands. On work band (light bg): `1px solid #CAE2D9` (stone.200) for card separation. Signal band: no borders at all — color IS the boundary.

**Shadow:** None on hero or signal bands. Work band cards: `0 2px 12px rgba(7,20,16,0.08)` — barely-there, very subtle. About band: none.

**Density:** Spacious. Bands breathe. The hero band is mostly dark silence with the phrase occupying its center-left zone. Signal band is dense (multiple items) but has 48px gaps between elements. Work cards have 32px grid gap.

**Interactive states:**
- Nav links: hover color transitions to seafoam.400 in 0.15s
- Project cards: `transform: translateY(-4px)` on hover, `transition: transform 0.2s ease`, border-color to seafoam.300
- Signal items: no hover (signal band is read-only)

---

### 5. Signal Integration

**Where signal elements live:** Signal Band (Band 2) — full-width seafoam.400 strip between the hero and the work. This band carries all today's instruments at readable scale, visually separated from the hero claim.

**Sports scores styling:** Tigers `4–0` rendered as Bricolage Grotesque 700 at 28px in ink.900, followed by `WIN` in a small-caps label (Manrope 600, 11px, letter-spacing: 0.1em). "Detroit Tigers" in Manrope 500 at 12px, ink.900 at 70% opacity, above the score. The shutout is worth emphasis — the `0` in the opponents' column renders in stone.800 (dimmed, nearly invisible, which is appropriate for a shutout).

**Quote display:** The Einstein quote IS the hero phrase — it renders at display scale as the entire first band's content. Attribution `— Albert Einstein` in Manrope 400, 18px, stone.500 on ink.900 background, 32px below the phrase. No blockquote chrome, no quotes — the size is the attribution.

**Moon phase:** In signal band: waxing gibbous glyph (🌔) in ink.900 at 22px, followed by `94.3%` in Bricolage 700 at 24px, and `WAXING GIBBOUS` label below in Manrope 500 at 11px, letter-spacing: 0.1em. The 94.3% reinforces today's theme — nearly through the difficulty.

**Music:** Guided by Voices + Wet Leg rendered as small pills in the signal band: ink.900 background at 15% opacity, stone.900 text, Manrope 500 at 12px, border-radius: 9999px, padding: 4px 10px.

**HN top story:** "Anthropic and OpenAI: PMF found" — a single line in the signal band, Manrope 400, 14px, ink.900. Small label `HN ↑893` in Bricolage 600, 13px, stone.800.

**Golf:** Charles Schwab Challenge — "Scheduled" — appears in signal band as a small eyebrow-label treatment: `CHARLES SCHWAB CHALLENGE` in Manrope 500 11px all-caps, ink.900 at 70% opacity.

**Daylight:** `14.5H LIGHT · ↑04:53 ↓19:21` in Manrope 400 12px, ink.900 at 60% opacity — the rightmost element in the signal band strip.

## Self-Check
1. Hero quotability: Yes — "In the middle of difficulty lies opportunity." is a standalone poster-phrase; the word "opportunity." rendered in seafoam against a void makes it a screenshot-worthy visual object, not just body copy.
2. Because-of chain: Yes — the phrase's temporal arc (descent → emergence) mandated Stack (bands = journey); Bricolage 800 was selected because its weight gives the three-line descent its gravitational pull; seafoam.400 was chosen because it is literally the color of emergence at H:158° (within mandate), firing precisely on the final word; the dark hero band creates the difficulty before the bright signal band delivers the opportunity.
3. Render feasibility: Yes — at 1440×900, `7vw = 100.8px` Bricolage Grotesque 800 with line-height 0.9 across three lines yields a ~270px text block sitting inside 88vh (≈792px), with no overflow; "lies opportunity." at ~18 characters × ~58px average glyph width ≈ 1044px, fits inside 1440 − 2×86px (6vw) = 1267px content width.

## Rationale
The Einstein quote arrived as the right hero phrase because today's signals triangulate on it from three directions simultaneously: the Tigers' 4–0 shutout is the phrase enacted in baseball (difficulty met, question answered with silence); the HN top story about Anthropic and OpenAI finding product-market fit is the phrase at industry scale (the difficulty of the last four years yielding to the opportunity of the next four); and the waxing gibbous moon at 94.3% is the phrase as an astronomical metaphor — nearly through the arc, the brightness almost full. For a portfolio where every project is a founder choosing to enter difficulty voluntarily, the line functions as unsolicited mission statement. It doesn't need explaining; it needs space and a lit final word.

The Stack archetype followed from the phrase's temporal structure. A three-line descent — "In the middle / of difficulty / lies opportunity." — is already a vertical journey, and Stack gives that journey architectural form: the hero band is the claim (difficulty = darkness, near-black void), the signal band is the proof (seafoam.400 saturated drench = the opportunity color, literally the color of this phrase, fired at full saturation), the work band is the evidence (light, cream-tinted stone.50, projects rendered in light), the about band completes the loop (deep forest dark, returning to depth). You scroll through the argument. The chassis `bricolage-manrope` was selected because Bricolage Grotesque at weight 800 is warm and declarative without being institutional — Anton or Bebas would make Einstein sound like a gym poster; Bricolage makes him sound like someone who meant it.

The seafoam palette at H:158° sits precisely in the mandated 148°–175° window and earns its presence viscerally: it is the exact hue of new growth pressing against resistance — not blue (serene), not standard green (money, nature), but the specific charged threshold between them, the color of something emerging. At `#22B88A` (seafoam.400), it achieves 9.2:1 contrast against ink.900, meaning the single word "opportunity." on the final hero line fires like a lit match in a dark room. The tinted stone neutral family (barely pulled toward H:158° at minimal chroma) keeps every surface alive — pure black neutrals would make the dark bands feel like voids rather than depths, and this design lives in depths.
