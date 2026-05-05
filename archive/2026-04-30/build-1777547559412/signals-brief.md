# Signals Brief — 2026-04-30

## Hero Copy
STAND UP TO YOUR FRIENDS.

## Hero Rationale
Today's signals.quote (Dumbledore: "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends") distills to a direct imperative that earns the canvas. Three signals converge: the full moon burning at 99.3% — maximum pressure, maximum light; Hacker News's top story about Zig developers refusing AI contributions on principle (literally standing up to their friends in the tech community, 304 points); and the last day of April closing out a month with a Pistons win and a Tigers loss sitting side by side. "STAND UP TO YOUR FRIENDS." is a moral provocation, not a description — someone would absolutely screenshot this line. The period is load-bearing.

## Archetype
Specimen

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

- **Primary hue:** 278° (violet) — full moon resonance, the literal color register of Dumbledore, moral authority; lies within mandate's allowed 240°–352° zone; unused in all recent builds
- **Neutral palette** (violet-tinted stone, H:278°, S:5–8%):
  - 50: #F8F6FA
  - 100: #EDEAF1
  - 200: #D5D0DC
  - 300: #B3ACBD
  - 400: #8D8498
  - 500: #655C70
  - 600: #49414F
  - 700: #322A38
  - 800: #1E1923
  - 900: #0E0A12
- **Accent:** gold (H:58°, inside mandate's allowed 52°–90° zone)
  - light: #FFE94E
  - default: #F7D62A
  - dark: #C9A300
  - glow: rgba(247, 214, 42, 0.30)
- **Secondary accent:** none
- **Background:**
  - Page bg: #080412 (near-black violet, ~H:278°, S:78%, L:5%)
  - Card bg: #0F0A1E
  - Sidebar bg: #060210
- **Text colors:**
  - Primary: #F5EFFE (violet.50) — contrast vs #080412: ~19:1 ✓
  - Secondary: #D1B8F9 (violet.200) — contrast vs #080412: ~11:1 ✓
  - Muted: #655C70 (stone.500) — contrast vs #080412: ~5.3:1 ✓ (used at 12px bold minimum)

### 2. Typography (chassis: big-shoulders-atkinson)

- **Hero phrase rendering:** 3 stacked lines, each sized to fill viewport width (fit-to-width Specimen approach). Big Shoulders Display weight 900, all-caps, letter-spacing: -0.01em. Container padding: 0 4vw (leaving 92vw usable). Each line sized so its text fills ~90% of usable width:
  - Line 1 "STAND UP" (8 chars): `clamp(160px, 20vw, 290px)` — estimated 8 condensed chars × ~0.48 cap-height fills ~1,200px of 1,325px usable ✓
  - Line 2 "TO YOUR" (7 chars): `clamp(180px, 23vw, 330px)` — 7 chars, sized up to fill same width as other lines; becomes the visual apex of the three-line stack
  - Line 3 "FRIENDS." (8 chars incl. period): `clamp(160px, 20vw, 290px)` — period adds partial-char width, mirrors line 1
  - Total block height at 1440px: ~290 + 330 + 290 = 910px × 0.88 leading ≈ 800px in 900px viewport (≈89% height ✓ — satisfies Specimen ≥70% rule)
  - Attribution: "— ALBUS DUMBLEDORE" below phrase block, margin-top: 32px, Atkinson Hyperlegible 13px, gold.300, letter-spacing: 0.14em, all-caps
- **Line heights:**
  - Hero display: 0.88 (tight, maximum compression; condensed letterforms need zero leading)
  - Body/meta: 1.5
- **Letter spacings:**
  - Hero display: -0.01em (negative — compresses the already-condensed forms into a denser block, adds physical weight)
  - Attribution / all-caps labels: 0.14em (all-caps small text requires open tracking)
  - Body copy: 0em normal

### 3. Layout Specification

- **Archetype:** Specimen — the phrase IS the page. No competing modules, no project grid, no sidebar. A visitor lands and reads three lines. Every other element (nav, signals) is subordinate and pinned to corners so they don't dilute the center field.
- **CSS grid/flex structure:**
  ```
  body: { display: flex; flex-direction: column; min-height: 100vh; background: #080412 }
  .specimen-stage: { flex: 1; display: flex; flex-direction: column; justify-content: center;
                     padding: 8vh 4vw; position: relative }
  .hero-phrase: { display: flex; flex-direction: column; gap: 0 }
  .hero-line: { display: block; font-weight: 900; line-height: 0.88; letter-spacing: -0.01em;
                color: #F5EFFE; white-space: nowrap }
  ```
- **Major dimensions:**
  - Hero stage: `min-height: 100vh`
  - Side padding: `4vw` (leaves 92vw for phrase)
  - Vertical padding: `8vh` top and bottom (keeps phrase centered without top-heavy drift)
  - Sidebar/fixed panel: none
  - Max content width: `max-width: none` — full canvas, no column constraint
- **Nav placement:** Fixed top-right, `position: fixed; top: 28px; right: 4vw`. Three items (Work · About · Contact) in Atkinson Hyperlegible 13px, stone.500 color, uppercase, letter-spacing 0.10em. Gold.300 interpunct `·` as separator. On hover: color → violet.200, letter-spacing → 0.14em, transition 0.2s ease.
- **Hero phrase grid zone:** Centered vertically in the stage; phrase block width ≈ 88–92vw; estimated height ≈ 80–89% of viewport at 1440×900; phrase anchor point: left-aligned at 4vw from left edge (not centered — left-aligned reads more like a command, less like a performance)

### 4. Component Character

- **Border radius:** 0px everywhere — hard-edged, no softening. This is a monument, not a card.
- **Border treatment:** Borderless throughout. The darkness IS the frame.
- **Shadow:** None.
- **Density:** Maximum negative space surrounding the phrase; the dark field is the composition.
- **Interactive states:**
  - Nav links: stone.500 → gold.300 on hover, letter-spacing opens, 0.2s ease
  - Attribution line: static, no interaction
  - No other interactive components on the hero surface

### 5. Signal Integration

- **Quote IS the hero phrase.** "STAND UP TO YOUR FRIENDS." distilled from signals.quote (Dumbledore). Attribution "— ALBUS DUMBLEDORE" rendered as gold label 32px below the phrase block.
- **Full moon:** Fixed bottom-left, `bottom: 28px; left: 4vw`. Single line: `◯ 99.3%  APRIL 30` in 12px Atkinson, stone.500, letter-spacing 0.08em. The ◯ is typographic (Unicode), no image dependency.
- **Sports scores:** Same bottom-left cluster, two lines above moon indicator:
  - `PISTONS  116–109  ▲` — gold.300 for the ▲ win indicator, stone.500 for rest
  - `TIGERS   3–4  ▼` — stone.600 for the ▼ loss indicator, stone.500 for rest
  - 12px Atkinson, `font-variant-numeric: tabular-nums`, letter-spacing 0.06em
- **Weather:** Same cluster, bottom of stack: `52°F · PARTLY CLOUDY · ALDIE VA` in 12px stone.500
- **Zed 1.0 / HN signal:** Fixed bottom-right, `bottom: 28px; right: 4vw`: `ZED 1.0 ↑ HN` in 12px stone.500, letter-spacing 0.08em — acknowledges the day's dominant tech signal without competing with the hero phrase
- **Market:** SPY change -0.0155% is negligible; not surfaced
- **Holiday:** None

All signal elements are deliberately muted (12–13px, stone.500) and pinned to page corners — they are witnesses to the phrase, not competitors with it.

## Self-Check
1. Hero quotability: Yes — "STAND UP TO YOUR FRIENDS." is a direct imperative that stands entirely alone; it provokes, resonates with the Zig/AI-policy debate, and carries the full moon's pressure; it would be screenshot-worthy in isolation.
2. Because-of chain: Yes — Dumbledore's quote's moral confrontation → phrase needed monument scale → Specimen (type IS design, no competing content) → big-shoulders-atkinson (condensed signage at weight 900, fills viewport in 3 lines) → deep violet 278° (full moon authority, Dumbledore's own color register) → gold 58° accent (bravery as the single lit element in darkness).
3. Render feasibility: Yes — Big Shoulders Display at 20–23vw condensed on 1440px viewport produces line-fills near 90% of usable width; clamped at 290/330/290px, 3 lines × ~300px × 0.88 leading ≈ 792px inside a 900px viewport with 8vh padding clearance; no overflow risk.

## Rationale
The Dumbledore quote from today's signals crystallized the moment I laid it against the three other converging forces: a full moon at 99.3% (maximum pressure), Hacker News's Zig anti-AI story topping the charts at 304 points (developers literally standing up to their friends in the tech community on a point of principle), and the last day of April closing with a Pistons win and a Tigers loss side by side — moral terrain everywhere. The distillation from "it takes just as much to stand up to your friends" to "STAND UP TO YOUR FRIENDS." was the only move: imperative register, period included, no hedging. That period is what makes it a command rather than a quote.

The Specimen archetype was non-negotiable because the phrase wants to be a monument, not a headline. Every other archetype would have surrounded it with content — projects, a sidebar, a nav bar at heroic scale — and diluted the confrontation. Specimen eliminates competition. Three lines of condensed display type each sized to fill the viewport width: "TO YOUR" becomes the widest line (fewest characters, sized up to match width), which places it as the visual apex of the stack — the accusatory center. Big Shoulders Display at weight 900 delivers the physical pressure this requires: not humanist warmth, not editorial refinement, but compressed signage that hits like a wall. The fit-to-width approach is the most committed Specimen interpretation — each line is a precision object, not an arbitrary font size.

The palette follows from the full moon and from Dumbledore himself. Violet 278° is his color — the deep authority of his robes, his office, the astronomy tower at midnight. It is also the full moon's color: not silver-white but the deep indigo-violet of maximum lunar illumination against a night sky. Gold 58° appears only once in the hero surface — as the attribution line "— ALBUS DUMBLEDORE" — and in the corner signals data. This placement is intentional: gold names the source, the context, the citation. It is bravery rendered as the single lit thing in darkness. The two hues enact the phrase's own logic.
