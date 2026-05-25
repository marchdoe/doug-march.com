# Signals Brief — 2026-05-25

## Hero Copy
You only have this moment.

## Hero Rationale
The Dan Millman quote's closing fragment arrives on Memorial Day — a holiday constructed from the irreversible absence of people who no longer have moments. Stripped of the quote's gentler preamble and left alone, "You only have this moment." shifts from wellness aphorism to existential statement: the irreducible specificity of being present, now, while others no longer are. It is quotable without attribution, and on this particular Monday it earns its weight without explanation.

## Archetype
Scroll

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:245° (indigo). The permitted zone is 235°–260°; indigo at 245° is ceremonial, deep, and sky-register — the exact color of a long late-spring evening tilting into dark. It is neither corporate blue nor referential violet, but something between: the color of something about to be finished.
- **Neutral palette (tinted toward H:245°, chroma ~0.008):**
  - 50: `#F4F4FA`
  - 100: `#E5E5F0`
  - 200: `#C7C7DC`
  - 300: `#A6A6C8`
  - 400: `#7676A4`
  - 500: `#4F4F78`
  - 600: `#353554`
  - 700: `#212135`
  - 800: `#141425`
  - 900: `#07071A`
- **Accent color (indigo):**
  - light: `#8896FF`
  - default: `#5C70FF`
  - dark: `#2438D4`
  - glow: `rgba(92,112,255,0.28)`
- **Secondary accent:** none
- **Background:**
  - page bg: `#07071A`
  - card bg: `#141425`
  - section bg (alternating): `#0D0D22`
- **Text colors:**
  - primary: `#F4F4FA`
  - secondary: `#A6A6C8`
  - muted: `#7676A4`

### 2. Typography

- **Hero phrase rendering:** Bricolage Grotesque (`display` token), weight 800, `clamp(84px, 11.5vw, 158px)`. Mixed case. Three-line break: "You only / have this / moment." — the word "moment" rendered in `indigo.400` (`#5C70FF`) while "You only" and "have this" are in `ink.50` (`#F4F4FA`). The period returns to `ink.50`. This color-codes the concept without shouting.
- **Line heights:** hero: `0.88`; section heads: `1.05`; lead text: `1.4`; body: `1.65`; meta/signal: `1.3`
- **Letter spacings:** hero: `-0.025em`; section heads: `-0.015em`; body: `0em`; label/smallcaps: `0.08em`; signal data (tabular): `0.02em`
- Attribution below hero phrase: "— Dan Millman · Memorial Day, 2026" in Manrope weight 400, `clamp(11px, 1.1vw, 14px)`, `ink.400`, letter-spacing `0.08em`, small-caps variant.

### 3. Layout Specification

- **Archetype:** Scroll — the phrase's instruction ("this moment") maps to the archetype's architecture: the page is a temporal sequence. The first fold is the present moment; everything that follows (the work, the signals, the about) is the evidence of moments already seized. Single committed column, cinematic vertical pacing.
- **CSS structure:**
  - `body`: `display: flex; flex-direction: column; align-items: center`
  - Hero section: `width: 100vw; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0 6vw`
  - Content sections: `width: 100%; max-width: none; padding: 96px 8vw` (full canvas, viewport-relative padding)
  - Max content width: `none` — viewport-relative only
- **Major dimensions:**
  - Hero fold: `min-height: 100vh`
  - Work section folds: `min-height: 80vh` each
  - Signal / footer band: `min-height: 40vh`
  - Section padding: `96px 8vw` top/bottom and sides
- **Nav placement:** Fixed minimal bar, 60px tall, pinned top. `background: transparent` until 20px scroll, then `background: ink.900/88 + backdrop-filter: blur(12px)`. Logo (Doug March) left-anchored; nav links (Work · About · Contact) right-anchored, Manrope 500 13px letter-spacing `0.06em` ink.300.
- **Hero phrase grid zone:** Vertically centered in the full 100vh fold. Phrase block: `width: 90vw`, left-aligned (not centered — more designed). Attribution 32px below last line. Fold bottom: a single 1px `ink.700` rule spans `94vw`.

### 4. Component Character

- **Border radius:** cards: `4px`; buttons: `2px`; tags: `full`
- **Border treatment:** Borderless by default; `1px solid ink.700` as divider / card underline only
- **Shadow:** None. Depth from surface color gradation (`ink.900` → `ink.800` → `ink.700` as elevation rises).
- **Density:** Spacious. One concept per fold. Generous `96px` section top-padding; tight inter-element spacing within a block (`8px`–`24px`).
- **Interactive states:** `accent` color on link hover; project cards: `background` shifts from `ink.800` to `ink.700`, border-bottom becomes `indigo.600`; transition `200ms ease`.

### 5. Signal Integration

- **Where signal elements live:** A dedicated signal band in the final fold — "Today's Frequency" section, full-width, `min-height: 40vh`, background `ink.800`. Laid out as a sparse horizontal strip with four signal nodes separated by thin vertical `ink.600` rules.
- **Golf score styling:** Wyndham Clark −30 in Bricolage Grotesque weight 700, `clamp(28px, 3vw, 42px)`, `ink.50`. Label "CJ CUP Byron Nelson · Final" in Manrope 400 12px `ink.400` above. The −30 rendered with the minus sign in `indigo.400` and the number in `ink.50` — tabular numerals.
- **Quote display:** The quote IS the hero phrase. Attribution rendered in the hero fold below the phrase: "— Dan Millman · Memorial Day, 2026" in `ink.400`, 13px, small-caps, letter-spacing `0.08em`. No blockquote element — the phrase lives at display scale.
- **Memorial Day treatment:** The holiday label appears twice: in the hero attribution, and as a standalone eyebrow in the signal band — "Memorial Day 2026" in `indigo.300`, small-caps, 11px, letter-spacing `0.12em`.
- **Tigers loss (3–5):** Signal band node: "Tigers" label `ink.400`; score "3–5" in Manrope 600 `ink.300`; a small "L" tag in `ink.600` background with `ink.300` text, border-radius `full`. Low visual prominence — it's a loss, it belongs to the day's muted register.
- **Lunar waxing gibbous (71.8%):** A thin crescent arc SVG in `indigo.400` at 20px, positioned in the signal band alongside the moon phase label.
- **Music signals:** The War on Drugs · Wet Leg — in `ink.500`, 11px, letter-spacing `0.06em`, footnote-scale at the signal band bottom edge.

## Self-Check
1. Hero quotability: Yes — "You only have this moment." on Memorial Day 2026 is screenshot-worthy as an isolated fragment; the holiday context transforms a wellness aphorism into a memorial statement without requiring the page to explain it.
2. Because-of chain: Yes — the phrase's quiet solemnity and temporal instruction demanded Scroll (one idea per fold, the page as sequence-in-time), which demanded bricolage-manrope (warm + expressive, tagged for Scroll, not the condensed-shout register of Anton or Big Shoulders), which demanded indigo at H:245° (ceremony, depth, late-May sky at golden hour), which demanded single-column cinematic layout where each fold is itself a moment.
3. Render feasibility: Yes — Bricolage Grotesque weight 800 at clamp(84px, 11.5vw, 158px) over three lines ("You only / have this / moment.") occupies ~55vh at 1440×900, well within the hero fold's 100vh budget with room for attribution and breathing margin above/below.

## Rationale
"You only have this moment." is Dan Millman's final fragment from today's signal quote, and it arrives on Memorial Day — a holiday about the permanent absence of people who no longer have moments. That convergence lifts the fragment from a wellness aphorism into something heavier: a statement about the irreducible specificity of being alive now, on this specific May Monday, while others are honored precisely because they are not. The phrase does not require explanation or attribution to land; it earns its marquee scale on its own.

The Scroll archetype is the only honest container for a phrase making a temporal claim. "This moment" is not a poster slogan to be stared at — it is an instruction about sequence. The page enacts the instruction: the first fold is the present moment in full (the phrase at 158px maximum, weight 800 Bricolage Grotesque, mixed case, the word "moment" in indigo blue), and every subsequent fold is a moment already seized — the work, the signals, the signals of others who showed up (-30, Wyndham Clark, dominant). The scroll itself is the argument: you arrive at the present, and then you move through what presence produced. Bricolage Grotesque at weight 800 is the right chassis because it is expressive and warm without being authoritative-institutional — it is the font of things said by a human, not posted by an organization.

The indigo palette at H:245° sits cleanly inside the mandated 235°–260° window and carries precisely the right register: the deep blue of the late-May sky at 19:19, the moment the light fails, the color of ceremony without grief. Against near-black ink.900 (#07071A), the indigo.400 accent (#5C70FF) achieves 5.3:1 contrast — AA compliant even as body text — and on the hero phrase, where it colors only the single word "moment," it glows without competing with the surrounding ink.50 type. The neutral ink family's H:245° tint keeps the dark surfaces alive across all five folds of the page; pure black would have read as a void rather than a depth.
