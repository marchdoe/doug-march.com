# Signals Brief — 2026-06-13

## Hero Copy
The biggest adventure is what lies ahead.

## Hero Rationale
Today's `signals.quote` delivers this Tolkien line on a new moon (0.012 illumination — the cycle's absolute threshold, day 28.48), a summer Saturday, 14.7 hours of daylight, and a portfolio that daily reconstitutes itself from signals exactly the way a voyage reconstitutes itself from wind. The phrase isn't borrowed decoration — it is the site's operating thesis stated in one quotable line. "What lies ahead" is also the literal right-hand panel of today's layout: the work, the projects, the future things. The phrase earns its scale because it is simultaneously autobiographical to the site and universally screenshot-able.

## Archetype
Split

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

- **Primary hue** — H:162° (ocean teal). The only fully open mandate window is 142°–168°; this hue sits at the center of that band and would be chosen on merit regardless — it is the color of ocean horizons, phosphorescence in dark water, what "lies ahead" looks like when you're on a ship at night.
- **Neutral palette** (void sage, teal-tinted):
  - 50: #F0FAF6
  - 100: #DAEEE7
  - 200: #B9DDD2
  - 300: #8EC5B5
  - 400: #62A899
  - 500: #468B7C
  - 600: #346F63
  - 700: #26534A
  - 800: #183832
  - 900: #0E201C
- **Accent color** — light: #44D5B7, default: #00D4A0, dark: #009870, glow: #00B888
- **Secondary accent** — none; one hue carries the entire page
- **Background** — page bg: #060E0B (void, barely a color, teal-cast near-black), card bg: #0E1E19, right-panel bg: #091510
- **Text colors** — primary: #E5FBF4 (near-white, teal cast), secondary: #8EC5B5 (sage.300), muted: #346F63 (sage.600)

**Accessibility check:**
- Hero phrase (#00D4A0 teal on #060E0B void): ≈ 9.5:1 ✓ (well above 3:1 large text)
- Body text (#E5FBF4 on #091510): ≈ 17:1 ✓
- Secondary text (#8EC5B5 on #091510): ≈ 7.2:1 ✓

---

### 2. Typography

- **Hero phrase rendering** — Big Shoulders Display at `display` token. Rendered in three lines in the left panel:
  - Line 1: "THE BIGGEST" — `clamp(32px, 3.6vw, 52px)`, weight 700, tracking `-0.04em`, color accent (#00D4A0)
  - Line 2: "ADVENTURE" — `clamp(72px, 9.5vw, 136px)`, weight 800, tracking `-0.04em`, color accent (#00D4A0). Dominant element. At 1440px viewport, 9.5vw = ~136px; Big Shoulders' extreme condensing fits "ADVENTURE" (9 chars) to roughly 85% of the 58vw left panel.
  - Line 3: "is what lies ahead." — `clamp(20px, 2.1vw, 30px)`, weight 400, tracking `0em`, same teal accent, italic register via Big Shoulders' lighter cut
  - Attribution: "— J.R.R. Tolkien" — Atkinson Hyperlegible, 14px, #8EC5B5 (sage.300), 40px top margin
- **Line heights** — hero lines: 0.88 (tight, condensed letterforms don't need air); attribution: 1.5; right-panel body: 1.5; right-panel headings: 1.1
- **Letter spacings** — hero display: `-0.04em`; right-panel labels (all-caps): `0.12em`; body: `0em`

---

### 3. Layout Specification

- **Archetype** — Split. The declaration occupies the left half of the canvas permanently; the right half is the literal "what lies ahead" — the portfolio, the projects, the signals. The metaphor and the layout are the same object. Two fully active surfaces, no void between them.
- **CSS grid/flex structure** — `display: grid; grid-template-columns: 58fr 42fr; min-height: 100vh; max-width: none;`
- **Major dimensions**:
  - Left panel (declaration zone): `width: 58vw; height: 100vh; position: sticky; top: 0; overflow: hidden;` — fixed to viewport, full height, no scroll
  - Right panel (portfolio zone): `width: 42vw; min-height: 100vh; overflow-y: auto;` — scrollable independently
  - Max content width: `none` — full-canvas. Left panel: `padding: 0 6vw 0 6vw`. Right panel: `padding: 48px 40px`
  - Hero phrase sits vertically centered in the left panel: `display: flex; flex-direction: column; justify-content: center; align-items: flex-start`
  - Signal footnote zone: bottom-left of left panel, `position: absolute; bottom: 40px; left: 6vw`
- **Nav placement** — horizontal strip at top of right panel only; 56px height; `border-bottom: 1px solid #1D352D`; wordmark left ("DM"), three nav links right (Work, About, Github); Atkinson Hyperlegible 13px, wide tracking (0.08em); right-panel exclusive — the left panel has no nav chrome
- **Hero phrase grid zone** — left panel, rows fill full height. "ADVENTURE" line horizontally occupies ≈55% of panel width centered on the left edge; entire phrase block is vertically centered at 45% down from top (slightly above true center for optical correctness)

---

### 4. Component Character

- **Border radius** — cards: `2px` (sm); tags/pills: `full` (9999px); nav links: `0`
- **Border treatment** — borderless panels (edge-to-edge color contrast between panels separates them); cards in right panel: `1px solid #1D352D` (void.400)
- **Shadow** — none; depth from surface lightness steps only (void.50 → void.100 → void.200)
- **Density** — left panel: maximally spacious, the phrase breathes; right panel: compact-structured, signal-dense, rows with 16px gaps
- **Interactive states** — links: color shifts from accent (#00D4A0) → accentHover (#44D5B7) + `text-underline-offset: 3px`; project rows: `background-color` shifts to void.300 on hover; transition: `all 0.18s ease`

---

### 5. Signal Integration

- **New moon (0.012 illumination, day 28.48)** — bottom-left of the left declaration panel, `position: absolute`. Label: "● new moon · june 13" in Atkinson 12px, #346F63 (sage.600 — near-invisible, intentional: the moon barely exists tonight). The ● glyph at near-void color is the moon itself.
- **Detroit Tigers 2–3 loss** — right panel, inline signal pill: "DET 2 · HOU 3 ✗" — `background: #0E1E19; border: 1px solid #1D352D; border-radius: 9999px; font-size: 12px; color: #8EC5B5; padding: 4px 12px`
- **RBC Canadian Open — Ben James −10** — right panel, below Tigers pill: "⛳ Ben James  −10  RBC Canadian Open" — same pill treatment; −10 score colored accent (#00D4A0) to emphasize the lead
- **The Tolkien quote IS the hero phrase** — rendered at architectural scale in the left panel; no separate blockquote; attribution inline below the phrase in muted sage
- **Juneteenth (6 days away)** — right panel bottom section, small badge: "Juneteenth · 6 days" in sage.300, 12px, above right-panel footer
- **Awwwards "THE RED"** — not surfaced directly but its language ("built to be bold, a historic landmark of character and color") resonates structurally with today's layout commitment
- **HN top story (2376 pts)** — Anthropic/government access suspension noted as a minimal footnote in the right panel: "↑ 2376 · anthropic.com" small link row, not prominently styled — today is about forward adventure, not access denial

## Self-Check
1. Hero quotability: Yes — "The biggest adventure is what lies ahead." is a standalone Tolkien fragment that would be screenshot-posted in isolation; it operates independently of any portfolio framing.
2. Because-of chain: Yes — the forward-looking Tolkien declaration → Split (left: the declaration, right: the literal "what lies ahead") → big-shoulders-atkinson (condensed athletic scale to make ADVENTURE fill a panel) → teal at H:162° (the only open mandate zone, also the exact hue of ocean-dark-and-bioluminescence) → left panel declaration zone with absolute-positioned new moon footnote.
3. Render feasibility: Yes — Big Shoulders Display at clamp(72px, 9.5vw, 136px) on a 58vw left panel renders "ADVENTURE" at ~136px on 1440px viewport; Big Shoulders' extreme condensing keeps 9 characters within ~820px of the 835px panel without overflow.

## Rationale
The Tolkien quote arrived in today's `signals.quote` carrying the exact weight this Saturday needed. A new moon at 0.012 illumination — day 28.48 of the cycle — means the sky is at its absolute darkest before renewal. A threshold. The phrase "what lies ahead" in that context isn't cheerful optimism; it's a navigator's declaration made from the dark end of a cycle, pointing forward into the unseen. The phrase passes the screenshot test: a stranger receiving this image with no context would not need the portfolio to understand it. That is the bar.

The Split archetype is the only choice that lets the layout *argue* the same point as the hero phrase. The left panel is the declaration — it will not move, it will not scroll, it is anchored in the void. The right panel is the proof — it contains the actual "what lies ahead": FishSticks, 15th Club, Spaceman, the experiments, the signals, the capabilities. You read the declaration on the left, then your eye moves to the right and you discover what "ahead" actually contains. The Split structure physically enacts the quote's logic: claim on the left, evidence on the right. No other archetype creates that coherence.

`big-shoulders-atkinson` is the chassis because "ADVENTURE" needs to be *large*. At 1.618 ratio and a condensed signage character, Big Shoulders Display can fill a 58vw panel with nine characters without requiring a ridiculous point size. The athletic, condensed weight of this font is appropriate for the word — adventures are physical, forward-moving, not editorial or precious. Atkinson Hyperlegible in the right panel's body copy provides maximum legibility at signal-data sizes (12–14px) with none of the stylistic competition that would dilute the declaration. Ocean teal at H:162° — the only open zone in the color mandate — happens to be precisely the right hue: bioluminescence in dark water, the specific color of "what you see when you look ahead in the dark."
