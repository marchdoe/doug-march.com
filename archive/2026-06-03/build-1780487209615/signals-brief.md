# Signals Brief — 2026-06-03

## Hero Copy
CONCENTRATE THE MIND

## Hero Rationale
From today's signals.quote: Buddha's instruction "concentrate the mind on the present moment" yields its best fragment in the imperative core — three words that function as both command and thesis for a portfolio built from focused, deliberate work. Wednesday mid-week, a Tigers 8–0 blowout requiring no second-guessing, 14.6 hours of daylight pressing you into the present — the phrase earns its scale not as a meditation cliché but as operational instruction. Risk 8/10 demands this be rendered without apology: full drench, monumental type, nothing decorative.

## Archetype
Specimen

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:252° — deep indigo-violet. Falls squarely within the open mandate zone (230°–275°). Not in any recent palette (previous: 200°, 305°, 78°, 3°, 115°, 158°, 35°). The color of concentrated thought, deep focus, pre-dawn blue: it doesn't ask permission.
- **Neutral palette** (indigo-tinted throughout — zero dead grey):
  - 50: `#F2F1FF`
  - 100: `#E8E6FF`
  - 200: `#D0CDEE`
  - 300: `#A8A4C8`
  - 400: `#7A759A`
  - 500: `#544F70`
  - 600: `#3B3758`
  - 700: `#27234A`
  - 800: `#17143A`
  - 900: `#0A0820`
- **Accent color:**
  - Light: `#C8C4FF` (indigo.200)
  - Default: `#8C80FF` (indigo.400) — 5.6:1 on bg ✓
  - Dark: `#5245E0` (indigo.600)
  - Glow: `rgba(140, 128, 255, 0.20)`
- **Secondary accent:** None — one accent, maximum commitment
- **Background:**
  - Page bg: `#0A0820` (stone.900 — deep indigo-black)
  - Card bg: `#17143A` (stone.800)
  - Sidebar/surface bg: `#27234A` (stone.700)
- **Text colors:**
  - Primary text: `#F0EFFF` — 17.5:1 on page bg ✓
  - Secondary text: `#A8A4C8` — 8.1:1 on page bg ✓
  - Muted text: `#7A759A` — 4.5:1 on page bg ✓ (used only for signals/captions, ≥12px)

---

### 2. Typography (chassis: big-shoulders-atkinson)

- **Hero phrase rendering:** Big Shoulders Display at display scale, two-line asymmetric composition:
  - Line 1 "CONCENTRATE": `font-size: clamp(80px, 11.5vw, 166px)`, left-aligned, `letter-spacing: -0.02em`, `line-height: 0.88`, `font-weight: 900`, color `#F0EFFF`
  - Line 2 "THE MIND": `font-size: clamp(100px, 15vw, 216px)`, right-aligned (flush to right edge of 90vw content zone), same tracking/weight, color `#F0EFFF`
  - The asymmetric diagonal — top-left anchor, bottom-right anchor — creates compositional tension without decoration; the phrase enters from the left, exits to the right
  - Estimated render at 1440px: "CONCENTRATE" ≈ 1050px wide (73% viewport), "THE MIND" ≈ 1120px wide (78% viewport); combined vertical span ≈ 520px (58% of 900px viewport) — headline band occupies dominant visual mass with signal bar below
- **Line heights:** `0.88` for hero display; `1.1` for section headings; `1.5` for body; `1.75` for pull quotes
- **Letter spacings:** `-0.02em` for hero display; `0em` for body; `0.10em` for signal labels (small-caps, uppercase bursts); `0.20em` for masthead nav links

---

### 3. Layout Specification

- **Archetype:** Specimen — typography IS the design; "CONCENTRATE THE MIND" rendered at near-full-viewport scale IS the entire first-fold experience; Atkinson Hyperlegible handles all supporting text below; no decorative graphics, no hero images, no illustration — the command stands alone
- **CSS structure:**
  ```
  body: display: flex; flex-direction: column; min-height: 100vh
  
  .hero: position: relative; min-height: 92vh; display: flex;
         flex-direction: column; justify-content: center;
         padding: 0 5vw; overflow: hidden
  
  .hero-line-1: position: absolute; top: 22vh; left: 5vw;
                text-align: left
  
  .hero-line-2: position: absolute; bottom: 18vh; right: 5vw;
                text-align: right
  
  .signal-bar: position: absolute; bottom: 0; left: 0; right: 0;
               height: 8vh; min-height: 64px; display: flex;
               align-items: center; padding: 0 5vw;
               border-top: 1px solid #27234A
  
  .below-fold: max-width: none; padding: 80px 5vw
  ```
- **Major dimensions:**
  - Hero/featured area: `min-height: 92vh`
  - Max content width: `max-width: none` — full canvas; side padding `5vw`
  - Nav height: `48px` — minimal fixed top bar
  - Signal bar: `8vh / min 64px` — bottom of hero zone
  - Below-fold sections: section padding `80px 5vw`
- **Nav placement:** Fixed top bar, `height: 48px`, full width, transparent over hero (no backdrop), `z-index: 100`. Left: site name `DOUG MARCH` in Big Shoulders Display at `14px`, `letter-spacing: 0.20em`, `color: #7A759A`. Right: nav links `WORK · ABOUT` in Atkinson Hyperlegible `12px`, `letter-spacing: 0.10em`. On scroll past hero, background transitions to `#0A0820` with `border-bottom: 1px solid #27234A`.
- **Hero phrase grid zone:** "CONCENTRATE" occupies the upper 45% of hero height from left edge; "THE MIND" occupies the lower 45% of hero height flush to right edge; the diagonal axis from top-left to bottom-right spans approximately 85% of hero width and 70% of hero height combined

---

### 4. Component Character

- **Border radius:** `0` everywhere — zero curvature reinforces the hard, unambiguous command register; no rounded cards, no pill buttons
- **Border treatment:** `1px solid #27234A` (stone.700) — nearly invisible separators; present structurally, not decoratively
- **Shadow:** None — depth comes from the indigo luminosity scale; `#17143A` cards read as lifted against `#0A0820` bg without any shadow
- **Density:** Spacious in the hero (the command needs silence around it); compact below the fold (projects and signals in tight typographic inventory)
- **Interactive states:** Nav links: `color: #ACA3FF` on hover (accentLight), no underline; project tiles: `border-bottom: 1px solid #8C80FF` appears on hover; all transitions `0.15s ease`

---

### 5. Signal Integration

- **Signal elements placement:** Compressed single-line signal bar at the base of the hero zone (absolute bottom, above the fold boundary), `height: 8vh`
- **Sports scores:** Tigers 8–0 rendered as `TIGERS 8–0` in `font-family: Big Shoulders Display; font-size: 11px; letter-spacing: 0.20em; color: #ACA3FF (indigo.300)` — the win formatted as a dispatch headline, the blowout requiring no embellishment
- **Quote display:** The Buddha source appears in the signal bar as `— BUDDHA` in Atkinson Hyperlegible `10px`, `letter-spacing: 0.15em`, `color: #544F70 (stone.500)` — the phrase itself IS the hero; the attribution is a footnote, not a feature
- **Lunar:** Waning gibbous rendered as `◑ 84.9%` in the signal bar
- **Signal bar full content:** One horizontal flex row, items separated by `·`:
  `TIGERS 8–0 · ◑ 84.9% · MEMORIAL TBD · 14.6 HRS DAYLIGHT · 3 JUN 2026 · — BUDDHA`
  All in `font-size: 11px; letter-spacing: 0.20em; text-transform: uppercase; color: #544F70`, with `#ACA3FF` accent on the Tigers score only
- **Awwwards reference:** The "21 Hrs On The Moon" site is a signal resonance with today's phrase — concentrated attention applied to a single 21-hour window. No direct visual treatment needed; the design inherits its spirit.

## Self-Check
1. Hero quotability: Yes — "CONCENTRATE THE MIND" is a standalone imperative, photographable without any context, taken from Buddha but operating independently as portfolio/life instruction.
2. Because-of chain: Yes — command-register phrase → Specimen (type IS the command, nothing else needed) → Big Shoulders Display (condensed signage font built for public commands at scale) → deep indigo drench H:252° (the color of concentrated thought, zero distraction) → asymmetric diagonal two-line layout (phrase enters top-left, exits bottom-right, mimicking the directed attention the words demand).
3. Render feasibility: Yes — Big Shoulders Display condensed at clamp(80px, 11.5vw, 166px) / clamp(100px, 15vw, 216px) on 1440×900 produces lines of ~1050px and ~1120px respectively without overflow, filling dominant visual mass above the fold.

## Rationale
"CONCENTRATE THE MIND" arrives from Buddha via today's signals.quote — but it earns the hero slot not because it's a famous line but because it's the correct instruction for this page. A portfolio that redesigns itself daily is a demonstration of concentrated attention applied to the present moment. The phrase is already doing the work; it doesn't need framing or context. The Tigers won 8–0 with nothing to argue about, the waning gibbous is still 84.9% lit, June is pressing its full 14.6 hours of daylight into the day — everything in the signals is a proof of presence, not abstraction. Risk 8/10 says go loud and mean it.

The Specimen archetype was the only honest container. A Poster would put the phrase on a pedestal and let it rest on its reputation. A Stack would surround it with content that dilutes the command. Specimen makes you answer for the phrase: you arrive and there is nothing on the page except two enormous lines of type and a single row of signals at the bottom. You cannot look away from the instruction because there is nothing else to look at. Big Shoulders Display is the correct chassis — it is the typeface of railway platforms and stadium decks and factory notices, designed to communicate a command at distance and volume. The 1.618 ratio delivers the marquee scale the phrase demands. Atkinson Hyperlegible handles all supporting text with clinical clarity beneath.

Deep indigo at H:252° is the only color available in the mandate zone (230°–275°) that hasn't been touched in the recent archive, and it is genuinely the right choice rather than a tactical mandate-fill. Indigo is the color of pre-dawn concentration — the hour when you are awake before the noise begins, before the past or future intrude. The full-drench strategy (background is deep indigo-black `#0A0820`, phrase is near-white `#F0EFFF`, every neutral tinted toward the same violet-blue family) means you arrive on the page already inside the hue. The phrase doesn't float on a field — it emerges from the same chromatic world as the darkness around it, as if it was always there and the page simply let you see it.
