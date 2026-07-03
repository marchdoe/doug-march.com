# Signals Brief — 2026-07-03

## Hero Copy
Less is more.

## Hero Rationale
Today's `signals.quote` delivers Robert Browning's five-word manifesto at a moment when the rest of the signals are quiet — the Tigers lost 4–10, the John Deere Classic is mid-round without a transcendent story, no cultural flashpoint on HN. Into that contemplative Friday-before-a-holiday quiet, "Less is more." lands as the exact design instruction, portfolio credo, and self-description this page earns: it demands marquee scale, requires no context, and works as an accusation aimed equally at the design and the viewer. Tomorrow is Independence Day. The phrase fits the pause before the noise.

## Archetype
Specimen

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

- **Primary hue** — H:285° (violet-purple). The color mandate's sole open corridor is 273°–305°; 285° is its center. Violet is thematically exact: the color of twilight before a national holiday, a waning gibbous moon at 81.4% illumination, the quiet after a 4–10 loss. Not aggressive, not warm — contemplative and committed.
- **Neutral palette** (tinted toward H:285°):
  - 50: #F4F0FA (near-white lavender)
  - 100: #E8E1F5
  - 200: #CFC5E8
  - 300: #B0A3D0
  - 400: #8E7FB5
  - 500: #6E6095
  - 600: #52467A
  - 700: #382F5C
  - 800: #211A3D
  - 900: #0D0812 (near-void violet-black)
- **Accent color** — bright lavender violet:
  - light: #C084FF (dark-mode use — contrast vs. bg #0D0812: 7.83:1 ✓)
  - default: #9B40FF
  - dark: #6A1FBF (light-mode use)
  - glow: #9B40FF33
- **Secondary accent** — none. The phrase is the whole story.
- **Background**:
  - Page bg: #0D0812 (neutral.900 — near-void violet-black)
  - Card bg: #211A3D (neutral.800)
  - Sidebar bg: #211A3D (neutral.800, unused in this archetype)
- **Text colors**:
  - Primary text: #F4F0FA (neutral.50 — contrast on bg: 18.3:1 ✓)
  - Secondary text: #B0A3D0 (neutral.300 — contrast on bg: 8.84:1 ✓)
  - Muted text / signal strip: #8E7FB5 (neutral.400 — contrast on bg: 5.78:1 ✓ at 14px+)

### 2. Typography (chassis: big-shoulders-atkinson)

- **Hero phrase rendering** — Big Shoulders Display at maximum weight (900), three lines stacked left-aligned, CSS `text-transform: uppercase`:
  - Line 1: LESS
  - Line 2: IS
  - Line 3: MORE.
  - Scale: `clamp(8rem, 18vw, 26rem)` — at 1440px viewport this renders at ~259px font-size; three lines at 0.88 line-height stack to ~684px total height (76% of a 900px viewport)
  - Left-aligned at `padding-left: 8vw`
  - Color: neutral.50 (#F4F0FA)
- **Line heights**:
  - Hero phrase: 0.88 (tight — lines nearly touch, creating a monumental stack)
  - Signal strip: 1.5 (normal)
  - Nav: 1.1 (snug)
- **Letter spacings**:
  - Hero phrase: -0.01em (slight negative tracking on the condensed face at display scale)
  - Signal strip labels: 0.08em (wide — uppercase labels need breathing room)
  - Nav links: 0.05em (wide)

### 3. Layout Specification

- **Archetype** — Specimen. "Less is more." at wall scale IS the design. No other content earns comparable visual weight. The phrase occupies 76% of viewport height as three stacked display words; everything else is infrastructure.
- **CSS grid structure**:
  ```
  display: grid;
  grid-template-rows: 60px 1fr 48px;
  min-height: 100vh;
  max-width: none;
  padding: 0;
  ```
- **Major dimensions**:
  - Hero phrase area: `1fr` (all remaining viewport height between nav and signal strip)
  - Nav row: 60px, positioned as an overlay in the top-right corner
  - Signal strip: 48px, full-width bottom row, `border-top: 1px solid #211A3D`
  - Max content width: none — full canvas, no constraint
  - Hero phrase left margin: `padding-left: 8vw`; phrase extends naturally rightward; right 30–50% of canvas is intentional void
- **Nav placement** — minimal top-right corner label: "Doug March" at 14px (Atkinson Hyperlegible), three nav links at 14px all-caps with 0.08em letter-spacing. Nav should read as a small footnote in the corner, not a structural band. `position: absolute; top: 0; right: 0; padding: 20px 8vw`.
- **Hero phrase grid zone** — middle row (1fr), `display: flex; align-items: center`. Phrase block left-aligned at 8vw. On 1440×900: three words (LESS / IS / MORE.) stacked at ~259px font-size, occupying roughly 520px × 684px of the left canvas — the right 40% is void. The void carries the argument.

### 4. Component Character

- **Border radius** — 0px everywhere. The Specimen demands zero decoration.
- **Border treatment** — borderless. No cards, no containers, no rules except the single 1px `neutral.800` line above the signal strip.
- **Shadow** — none. Not a single drop shadow. The type floats on the void.
- **Density** — maximally sparse. Three words, a corner nav, a signal strip. The void is load-bearing.
- **Interactive states** — nav links: `transition: color 200ms ease` to accent (#C084FF) on hover. No other interactive decoration needed on this page.

### 5. Signal Integration

- **Signal strip** — 48px horizontal band at viewport bottom, full-width, `padding: 0 8vw`. All text: Atkinson Hyperlegible at 14px, neutral.400 (#8E7FB5), `letter-spacing: 0.05em; text-transform: uppercase`. Items separated by `·` (middle dot):
  - `DET 4 · CLE 10 — TIGERS L`
  - `JOHN DEERE CLASSIC: GLOVER −8 IN PROGRESS`
  - `🌔 MOON 81%`
  - `INDEPENDENCE DAY TOMORROW`
  - `VIRGINIA BANS GEOLOCATION DATA`
- **Sports scores** — Tigers L 4–10 in neutral.400 all-caps at 14px, signal strip only. No color treatment for the loss; it fits the phrase ("less" was not done tonight, and it showed).
- **Quote display** — "Less is more." IS the hero phrase. Attribution "— R. Browning" does NOT appear in the hero zone. If signal strip space allows, a final strip item in neutral.500 italic: `"LESS IS MORE." — R. BROWNING`.
- **Holiday elements** — `INDEPENDENCE DAY TOMORROW` in the signal strip, styled identically to other strip items. No bunting, no stars, no red-white-blue. The restraint IS the holiday treatment.
- **Music** — `♫ WAR ON DRUGS · RADIOHEAD · MY MORNING JACKET` in neutral.500 at 13px at the trailing end of the signal strip, rendered as a quiet ambient footnote.

## Self-Check
1. Hero quotability: Yes — "Less is more." (Browning/Mies) is a six-word complete thought poster-worthy in isolation, requiring no portfolio context, with a period that is load-bearing.
2. Because-of chain: Yes — the phrase's radical minimalism mandated Specimen (type IS design) → Big Shoulders Display (the only chassis tagged for Specimen that delivers condensed words at 76% viewport height) → void-violet palette (mandate-compliant 273°–305° corridor, thematically exact for moonlit-eve-of-holiday contemplation) → void-dark background with no card surfaces so the phrase floats alone.
3. Render feasibility: Yes — Big Shoulders Display at clamp(8rem, 18vw, 26rem) renders three stacked words at ~259px on 1440×900, producing a ~684px-tall type block (76% viewport height) well within the 1fr hero row after a 60px nav and 48px signal strip consume 108px of the 900px canvas.

## Rationale
The hero phrase arrived without competition. Today's signals are quiet in the way a day before a national holiday is always quiet — the Tigers dropped 4–10, the John Deere Classic is grinding through its mid-round with Glover and Blair sharing the lead at −8 without drama, and the Hacker News front page offers civic weight (Virginia bans geolocation data, 815 points) but no single cultural rupture. Into that stillness, Robert Browning's "Less is more." lands as the exact line this portfolio surface wants on a contemplative summer Friday: it is simultaneously a design instruction, a critical position, and an honest self-description of a page that rebuilds itself from scratch every morning. It passes every poster test — someone would screenshot these three words in isolation. The period is intentional and load-bearing.

Specimen was the only honest archetype. The Specimen archetype commits fully: typography IS the design, and anything surrounding the type is infrastructure, not content. Three single words stacked at wall scale — LESS / IS / MORE., rendered uppercase — in Big Shoulders Display at clamp(8rem, 18vw, 26rem) produce a roughly 684px type block on a 900px-tall viewport, claiming 76% of the canvas for the phrase alone. The right 30–50% of the canvas is void. That void IS the argument: the phrase has room because the constraint is the idea, not because the designer ran out of content. Big Shoulders Display, tagged for Specimen in the chassis catalog with "dramatic, poster, condensed, signage" mood tags, is the only chassis capable of stacking three words across 76% of viewport height without either shrinking below impact or overflowing at 1440px wide. Atkinson Hyperlegible handles the signal strip at 14px, legible as the finest of footnotes.

The color mandate left precisely one door open: 273°–305°, the violet-purple corridor, after six consecutive builds occupied every other quadrant of the wheel. H:285° is not a compliance concession — it is thematically correct. Violet is the color of the 81.4% waning gibbous moon on the eve of Independence Day, the color of the quiet hour before something larger begins. Against near-void violet-black (#0D0812), the near-white lavender (#F4F0FA) phrase achieves 18.3:1 contrast and appears to emit from within the dark field rather than sit on top of it. The bright lavender accent (#C084FF) at 7.83:1 handles all supporting navigation and signal-strip text without competing with the hero. Everything else — the Tigers loss, the tournament leaderboard, the approaching holiday, the week's biggest civil-liberties story — is demoted to a single 48px all-caps Atkinson strip at the bottom edge. Browning's phrase does not share the stage.
