# Signals Brief — 2026-06-04

## Hero Copy
Nothing external to you has any power over you.

## Hero Rationale
Today's `signals.quote` delivers an Emerson line that is already in the exact register this portfolio demands. "Nothing external to you has any power over you." is a declaration of pure internal authority — and for a portfolio that reinvents itself every morning by reading the world and then ignoring what isn't useful, it's operationally true. The phrase needs no framing, no attribution to land, no context — any visitor reading it on a Thursday in June, looking at a page that was different yesterday, is already standing inside its proof. Risk 8/10 says make it loud and mean it.

## Archetype
Poster

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification
- **Primary hue** — H:38° (amber/gold); the only open zone in the color mandate (33°–48°), and genuinely the correct choice: it is the exact hue of late-afternoon summer light on June 4 with 14.6 hours of daylight, of torchlight and old manuscript — Emerson's transcendentalism rendered as warmth, not as cold industrial command
- **Neutral palette** (amber-tinted stone, H:35°):
  - 50: `#FAF8F3`
  - 100: `#F4EEE0`
  - 200: `#E6D9C2`
  - 300: `#D2C0A0`
  - 400: `#B5A07A`
  - 500: `#8A7558`
  - 600: `#685538`
  - 700: `#493A22`
  - 800: `#2D2210`
  - 900: `#1A1408`
- **Accent color**:
  - light: `#FFE08A`
  - default: `#FFCA3A`
  - dark: `#C07000`
  - glow: `rgba(255, 202, 58, 0.20)`
- **Secondary accent** — none; one amber voice carries the page; a second accent would introduce exactly the "external" thing the phrase dismisses
- **Background**:
  - page bg: `#211000` (amber.900 — deep amber-walnut, near-black with a warm cast; not a dead black)
  - card bg: `#3F1D00` (amber.800 — dark amber brown)
  - sidebar bg: `#1A1408` (stone.900 — slightly cooler dark)
- **Text colors**:
  - primary text: `#FFE08A` (amber.200 — luminous gold, ≈14:1 contrast on page bg)
  - secondary text: `#FFCA3A` (amber.300 — bright amber, ≈10:1 contrast)
  - muted text: `#C07000` (amber.500 — medium amber, ≈5.5:1 contrast — used only for large/display text ≥18px)

### 2. Typography (chassis-derived)
- **Hero phrase rendering** — `display` token at `clamp(58px, 11vw, 162px)`, Bricolage Grotesque weight 800, four-line break, left-aligned from `6vw`:
  ```
  NOTHING
  EXTERNAL TO YOU
  HAS ANY POWER
  OVER YOU.
  ```
  The cascade from a short first line to longer middle lines back to shorter last line creates a visual mass — a monolithic block of internal authority. Total phrase height at 162px × 0.88 leading ≈ 570px, consuming ~78% of the 760px remaining hero zone. Attribution `— RALPH WALDO EMERSON` sits 32px below line 4 in small-caps amber.400 at `0.875rem`.
- **Line heights** — hero: `0.88` (lines almost touch, fusing into a single object); attribution: `1.4`; signal strip: `1.4`; body text elsewhere: `1.55`
- **Letter spacings** — hero: `-0.02em` (optical compression at display scale); attribution: `0.12em` (spaced small-caps against the tight hero above); signal labels: `0.08em`; body: `0em`

### 3. Layout Specification
- **Archetype** — Poster: a single declaration fills ~78% of the viewport, demoting every other element to the periphery. This enacts the phrase — on a page where "nothing external has any power," the type IS the power, and everything else (nav, signals, attribution) is marginal by design.
- **CSS grid/flex structure**:
  ```css
  body {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 60px 1fr 80px;
    max-width: none;
  }
  .nav { grid-row: 1; padding: 0 6vw; display: flex; align-items: center; justify-content: space-between; }
  .hero { grid-row: 2; display: flex; flex-direction: column; justify-content: center; padding: 0 6vw; }
  .signal-strip { grid-row: 3; padding: 0 6vw; display: flex; align-items: center; gap: 32px; border-top: 1px solid #6B3400; }
  ```
- **Major dimensions**:
  - Hero/featured area: `grid-row: 2` fills `calc(100vh - 140px)` — phrase block vertically centered within
  - Nav height: `60px`
  - Signal strip height: `80px`
  - Max content width: `none` — full canvas; all spacing via `padding: 0 6vw`
  - Side padding: `6vw` both sides (≈86px at 1440px)
  - Section spacing: `0` between hero lines (tight mass); `32px` margin-top on attribution below phrase
- **Nav placement** — top bar, `height: 60px`, `padding: 0 6vw`; site name/logo in amber.500 far-left at `0.875rem` weight 500; nav links (Work, About) in amber.500 far-right at `0.875rem`; both intentionally muted so they don't compete with the phrase below
- **Hero phrase grid zone** — occupies the vertical center of row 2; left edge at `6vw` (left-aligned); four lines each at `clamp(58px, 11vw, 162px)` with `line-height: 0.88`; rightmost extent is content-driven (the phrase does not need to justify to right margin — natural left-alignment gives the declaration its authority)

### 4. Component Character
- **Border radius** — `0px` throughout; no softening anywhere on this poster treatment
- **Border treatment** — nearly borderless; single `1px` rule in `amber.700` (#6B3400) at the top of the signal strip only; nothing else
- **Shadow** — none; the chromatic contrast between `#211000` and `#FFE08A` does all the work; shadows would cheapen it
- **Density** — maximally spacious in the hero zone; the phrase owns the page and nothing crowds it; signal strip is compact (single row, `0.75–0.875rem`) to stay peripheral
- **Interactive states** — nav links and signal links: hover moves from amber.500 to amber.200 (`#FFE08A`) with no underline; the page won't let external things make noise — transitions are `color 0.15s ease` only

### 5. Signal Integration
- **Signal elements live** in the bottom strip (80px, full width minus 6vw padding), a single horizontal row separated by the amber.700 top border
- **Tigers 7–2 (WIN)** — `DET 7 · 2` in amber.200 weight 600 tabular-nums at `0.875rem`; label `W` in amber.300 at `0.75rem` — positioned first in the strip
- **Moon** — `◑ 76.8%` in amber.500 at `0.75rem`; the waning gibbous nearly three-quarters lit, sitting quietly in the strip
- **HN top story** — `"They're made out of weights"` in amber.400 at `0.75rem`, truncated to 40 chars, with score `755` in amber.300; this story about AI/LLM architecture is quietly resonant on a page generated by AI signals — the page IS made out of weights
- **Daylight** — `☀ 14.6h` in amber.500 at `0.75rem`; the June 4 sun context
- **Quote attribution** — `— RALPH WALDO EMERSON` in amber.400 at `0.875rem`, letter-spacing `0.12em`, rendered as small-caps (`font-variant-caps: all-small-caps`), positioned `32px` below the last hero line — this is the annotation, not the declaration; the declaration stands above it without needing the name

## Self-Check
1. Hero quotability: Yes — "Nothing external to you has any power over you." is a complete philosophical declaration by Emerson that earns marquee scale entirely on its own; isolated from any context it remains forceful, specific, and screenshot-worthy.
2. Because-of chain: Yes — phrase is a declaration of internal authority → Poster (the declaration IS the entire page, everything external pushed to margins, enacting the phrase structurally) → bricolage-manrope (Emerson wrote warm American philosophy, not industrial signage; Bricolage's humanist warmth over Bebas's cold weight) → amber drench (H:38° open mandate zone, torchlit summer warmth, internal power made chromatic) → four-line type mass fills 78% of viewport with nav and signals demoted to the periphery.
3. Render feasibility: Yes — Bricolage Grotesque weight 800 at clamp(58px, 11vw, 162px) across 4 lines at line-height 0.88 on 1440×900 produces a hero block of approximately 570px, comfortably within the ~760px hero zone after subtracting nav (60px) and signal strip (80px), with 95px to spare for the attribution line.

## Rationale
The hero phrase arrived from `signals.quote` fully formed — Emerson's "Nothing external to you has any power over you" is a declaration that earns marquee scale because it is simultaneously a philosophical position, a portfolio thesis, and a design brief. A site that redesigns itself every morning by reading the world and then choosing its own response is the literal enactment of this sentence. The phrase doesn't describe Doug's work; it describes the stance his work requires. That self-referential precision is what makes it poster-worthy rather than decorative.

The Poster archetype followed from the phrase without negotiation. If the declaration is that external things have no power, then a Poster — where one thing consumes the page and everything else is demoted to the edges — is the only structurally honest layout. A broadsheet would imply equivalence between the phrase and the scores. A gallery wall would position the phrase next to other things. The Poster makes the phrase the *only* thing that has power on the page, rendering the layout and the content identical arguments. Bricolage Grotesque at weight 800 was chosen over Bebas or Big Shoulders because Emerson didn't write factory warnings or stadium signage — he wrote warm, muscular American philosophy. The font's variable weight and humanist construction carry the philosophical register without the industrial coldness that a condensed all-caps display face would impose.

Amber gold at H:38° is the only open hue in the color mandate (33°–48°) but it is also genuinely the correct color for this phrase on this day. Deep amber-walnut darkness (`#211000`) holding luminous gold text (`#FFE08A`) is the visual register of old books, candlelit manuscripts, and the long June light (14.6 hours on the fourth). The Tigers' 7–2 win, the waning gibbous at 76.8%, and the HN story about AI being "made out of weights" — a quietly resonant note on a page that is itself made out of weights — all find their home in the 80px signal strip at the bottom, peripheral and small, because the phrase above them has already settled the question of what matters.
