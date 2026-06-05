# Signals Brief — 2026-06-05

## Hero Copy
You have to let go at some point in order to move forward.

## Hero Rationale
The phrase arrives from today's `signals.quote` — unknown source, but the precision is earned. This portfolio redesigns itself every morning by releasing yesterday's decisions entirely; the phrase is not illustrating the portfolio, it IS the portfolio's operating principle stated plainly. Friday carries the weight: the last day of the work week before something is let go of and something else begins. The phrase earns marquee scale not from authorial authority but from the physical specificity of what it demands — and from the slight vertigo of reading it on a page that's already proving it true.

## Archetype
Scroll

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

**Primary hue:** H:155° — forest teal-green. Not the reflex cyan (180°) or lime (120°), but the specific dark-water green of June forest floors. In the mandate target of 145°–170° and completely absent from the last seven palettes. The drench strategy: the entire page lives inside this hue family at varying depth.

**Neutral palette** (tinted H:155°, chroma ~0.01):
- 50: `#F2FAF5`
- 100: `#E1F0E6`
- 200: `#C2D8C9`
- 300: `#98B8A0`
- 400: `#6A9474`
- 500: `#4A7053`
- 600: `#2E5038`
- 700: `#1A3321`
- 800: `#0D1F12`
- 900: `#060E09`

**Accent color** (teal, primary):
- Light: `#8CD9BA` (teal.200)
- Default: `#4EC49A` (teal.300) — contrast ~10.6:1 on page bg
- Dark: `#006D4D` (teal.600)
- Glow: `rgba(78, 196, 154, 0.12)`

**Secondary accent:** None — one committed hue family is the voice today.

**Background:**
- Page bg: `#060E09` (neutral.900) — near-black, teal-tinted
- Card bg: `#0D1F12` (neutral.800)
- Sidebar/elevated surface: `#1A3321` (neutral.700)

**Text colors:**
- Primary text: `#F2FAF5` (neutral.50) — contrast ~19:1 on page bg ✓
- Secondary text: `#98B8A0` (neutral.300) — ~8:1 ✓
- Muted text: `#6A9474` (neutral.400) — ~5.9:1 ✓ passes AA body

---

### 2. Typography (chassis-derived)

**Hero phrase rendering:** `display` token (Big Shoulders Display), weight 900, `clamp(44px, 6.5vw, 96px)`. Left-aligned within the 85vw column. The phrase wraps to 3–4 lines at desktop scale — intentional. Each line break is a breath, a pause before the next section of the instruction. Letter-spacing: `–0.03em`. The condensed geometry of Big Shoulders at weight 900 gives the phrase the weight of a printed directive — not inspirational-poster warm, but physical and declarative.

**Attribution line:** Atkinson Hyperlegible, 11px, all-caps, letter-spacing `0.14em`, `neutral.400` — "— UNKNOWN" sits 28px below the final word of the phrase, flush-left.

**Section headings:** Big Shoulders Display, weight 800, `clamp(28px, 3.5vw, 52px)`, letter-spacing `-0.02em`.

**Body text:** Atkinson Hyperlegible, 16px, weight 400, line-height 1.6 — accessibility-committed, no smaller than 16px anywhere body copy appears.

**Metadata / labels:** Atkinson, 11–12px, all-caps, letter-spacing `0.12em`, `neutral.400`.

**Line heights:**
- Hero phrase: `0.92`
- Section headings: `1.0`
- Body: `1.6` (light-on-dark compensation: +0.1 over typical 1.5)
- Captions: `1.4`

**Letter spacings:**
- Hero: `–0.03em`
- All-caps labels: `0.12–0.14em`
- Body: `0em`

---

### 3. Layout Specification

**Archetype:** Scroll. The single committed column IS the argument: you physically scroll forward through the page, releasing each fold as you advance, the archetype enacting the phrase before the phrase is even read. A Poster would let the quote rest on its own authority. Scroll makes you earn the forward motion.

**CSS structure (outer shell):**
```css
.scroll-root {
  width: 100%;
  max-width: none;
}
.scroll-column {
  width: 85vw;
  margin: 0 auto;
}
```

**Major dimensions:**

| Zone | Dimension |
|---|---|
| Nav bar | Fixed, `height: 56px`, `position: fixed; top: 0; left: 0; right: 0; z-index: 100` |
| Hero fold | `min-height: 100vh`, phrase sits at `padding-top: 30vh` |
| Work fold | `min-height: 95vh`, `padding: 96px 0` |
| About fold | `min-height: 80vh`, `padding: 80px 0` |
| Signals footer | `auto`, `padding: 64px 0` |
| Max content width | `none` — column stays at 85vw with viewport-relative padding |
| Side padding | `padding: 0 7.5vw` (effective column inset on each side) |

**Nav placement:** Fixed top bar, `background: rgba(6, 14, 9, 0.92)`, `backdrop-filter: blur(12px)`. Left: "Doug March" in Big Shoulders Display 18px weight 700. Right: "Work · About" in Atkinson 13px all-caps letter-spacing 0.1em, `neutral.300`. On scroll, nav bg transitions from transparent → `rgba(6,14,9,0.92)` over 120px.

**Hero phrase grid zone:** Single column, rows 1–4 of natural flow. The phrase begins at `padding-top: calc(56px + 28vh)` — approximately 28% down from top edge of viewport, putting the phrase slightly above vertical center (golden-ratio-ish). At 1440×900:
- Column width: ~1224px
- Phrase at 96px Big Shoulders condensed wraps to 3 lines, total height ~265px
- Phrase bottom edge sits at approx 65vh
- Attribution sits at ~70vh
- Scroll cue (↓ in teal.300) sits at ~88vh

---

### 4. Component Character

**Border radius:**
- Cards: `4px` (md) — nearly sharp, not rounded-friendly
- Buttons: `2px` (sm) — almost flush with the grid
- Tags/chips: `2px`
- Full pill: reserved for status dots only

**Border treatment:** Thin, `1px solid {border}` — neutral.700 in dark mode, very subtle. Cards in the Work fold use left-border accent: `3px solid {accent}` (teal.300) on hover.

**Shadow:** None in dark mode — depth through surface lightness. Elevated surfaces (modals, tooltips) use `background: neutral.700` rather than shadow. Cards in work grid: on hover, `background` shifts from neutral.800 → neutral.700 (one step lighter), with `border-left: 3px solid teal.300`.

**Density:** Spacious in the hero fold; snug in the work grid (compact project rows at ~72px height each, ruled with 1px neutral.700 separators).

**Interactive states:**
- Links: `color: teal.300` → `teal.200` on hover, no underline except body prose
- Work cards: background elevation + left-border accent on hover, `transition: all 150ms ease`
- Nav links: `neutral.300` → `neutral.50` on hover

---

### 5. Signal Integration

**Signals location:** A horizontal strip at absolute bottom of the hero fold (above fold break, ~88–96vh range), and a dedicated Signals section in the footer fold. Two tiers.

**Hero fold signal strip** (positioned at bottom of first fold, full column width):
- Flex row, `gap: 32px`, `align-items: center`
- Each signal: Atkinson 11px all-caps, letter-spacing 0.12em, `neutral.400`
- Items: `MOON ◑ 67%` · `MEMORIAL TOURNAMENT` · `JUNE 5 · FRIDAY` · `14.6H DAYLIGHT`

**Golf tournament display** (signals footer fold):
- "THE MEMORIAL TOURNAMENT" in Big Shoulders Display 22px, weight 700, `teal.300`
- Four-way tie subheading: "J.J. SPAUN · WYNDHAM CLARK · TOMMY FLEETWOOD · RYAN GERARD — ALL –5" in Atkinson 13px, `neutral.300`, letter-spacing 0.08em
- Presented as a single ruled row, not a card

**Quote display:** The `signals.quote` is the hero phrase — it IS the page. No secondary blockquote treatment. The attribution "— Unknown" below the phrase is its only formal acknowledgment.

**Awwwards signal:** "21 HRS ON THE MOON" as a labeled sidebar note in the footer signals section — label: "AWWWARDS · 2026", value: "21 Hrs On The Moon · Artemis Mission", Atkinson 12px, `neutral.400`. Sits adjacent to the golf row.

**HN signals:** In footer signals fold, three items in a ruled mini-list:
- "Changing How We Develop Ladybird" ↑332
- "Meta ADB on deprecated Portal devices" ↑233
- "Entanglement Builds Space-Time. Now 'Magic' Gives It Gravity." ↑26 — this one gets `teal.300` for the fragment "Magic" as a small nod to its strangeness.

**Music signal:** "GUIDED BY VOICES · TOBIN SPROUT · RADIOHEAD" as a footer metadata line, Atkinson 10px all-caps, `neutral.500`, letter-spacing 0.14em.

**Lunar phase:** `◑ LAST QUARTER · 67.3%` inline in the hero signal strip (see above). In footer, a larger treatment: `◑` at 18px `teal.300`, with "LAST QUARTER" label.

## Self-Check
1. Hero quotability: Yes — the phrase demands a response from the reader and applies directly to the portfolio's operational logic (daily release); it would be screenshotted for the sentiment, not as navigation copy.
2. Because-of chain: Yes — phrase demands physical, forward-motion energy → Scroll (scrolling forward enacts the instruction) → Big Shoulders at 900 weight (physical, declarative, not ornamental) → deep forest teal drench (depth before crossing, suspension before release) → single-column 100vh opening fold with no competing surface.
3. Render feasibility: Yes — Big Shoulders Display condensed at clamp(44px, 6.5vw, 96px) on an 85vw / ~1224px column at 1440px wraps the 60-char phrase to 3–4 lines at ~265px total height, fitting well within the 900px viewport with 28vh top offset.

## Rationale
The hero phrase arrived from `signals.quote` with its argument already complete: a portfolio that releases yesterday's entire visual identity to construct today's is the most literal possible enactment of "you have to let go at some point in order to move forward." The phrase doesn't describe the portfolio — it explains its mechanism. That self-referential precision, combined with Friday's end-of-week register (something is about to be released) and 14.6 hours of early-June light, made this the undeniable choice over the Awwwards headlines and the quantum gravity story from Hacker News.

The Scroll archetype followed without negotiation. Scrolling forward through a page — physically releasing each fold as you advance — IS the phrase's argument made structural. A Poster would put the quote on a pedestal and let it rest on its own authority. A Specimen would make it a typography exercise. Scroll makes the reader enact the instruction before they've finished reading it: the first fold is the declaration, and the only way to see the work is to let go of it and move. Big Shoulders Display at weight 900 was chosen for its physical, declarative register — condensed industrial type for an instruction about physical movement, not the warmth-for-warmth's-sake of Bricolage. At `clamp(44px, 6.5vw, 96px)` it hits marquee scale on 1440px without overwhelming the fold.

Deep forest teal at H:155° is the only hue family completely absent from the past seven palettes (38°, 252°, 200°, 305°, 78°, 3°, 115°) and sits squarely in the mandate's 145°–170° target — but more importantly, it is genuinely the correct color for this phrase on this day. Dark standing water before you cross it: `#060E09` as page background is almost black but unmistakably tinted toward life, toward growth, toward the particular green of early-summer water. The vivid teal accent `#4EC49A` surfaces at ~10.6:1 contrast — light breaking through canopy — giving every signal, link, and label a luminous presence that rewards forward motion through the page.
