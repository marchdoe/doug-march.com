# Signals Brief — 2026-07-09

## Hero Copy
Do not be so open-minded that your brains fall out.

## Hero Rationale
The Chesterton quote from today's signals arrives pre-formed as a poster: 14 words, a named author, and a punchline ending in "your brains fall out" — visceral, funny, irreversible. At 8/10 creative risk with the open corridor pointing exclusively toward the neglected rose-magenta zone (315°–358°), the quote earns ALL CAPS treatment in Big Shoulders Display, where "BRAINS FALL OUT." across a near-void dark field becomes an image, not merely text. The phrase has a secondary resonance for a portfolio site that reinvents itself daily from environmental signals — seeking truth rather than asserting it.

## Archetype
Poster

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:330° (hot rose-magenta). Only open corridor after mandate exclusions (315°–358°). Rose-magenta is precisely the register for Chesterton's wit-as-warning: provocative, pointed, slightly dangerous.
- **Neutral palette (void-rose, H:330° tinted):**
  - 50: #FEF3F8 | 100: #FAEAF4 | 200: #F0CAE0 | 300: #D4A0BB | 400: #A8728F | 500: #7D4A68 | 600: #572D4A | 700: #38172E | 800: #220B1B | 900: #130009
- **Accent color (hot magenta, H:330°, full saturation):**
  - Light: #FF5AA4 | Default: #E8006B | Dark: #920043 | Glow: rgba(232, 0, 107, 0.25)
- **Secondary accent:** None — one committed color, not two.
- **Background:** Page bg: #130009 | Card bg: #220B1B | Sidebar bg: #130009
- **Text colors:** Primary text: #FEF3F8 | Secondary text: #F0CAE0 | Muted text: #A8728F

**Contrast verification:**
- Primary text (#FEF3F8) on page bg (#130009): ≈ 18.7:1 ✓
- Accent (#E8006B) on page bg (#130009): ≈ 4.56:1 ✓ (just clears WCAG AA at 4.5:1)
- All body text ≥ 1rem (16px); attribution ≥ 0.875rem at bold weight.

---

### 2. Typography (chassis-derived)

- **Hero phrase rendering:** `display` chassis token, `clamp(3.5rem, 9vw, 11rem)`, weight 900 (Black), ALL CAPS, left-aligned, line-height 0.88. At 1440px the clamp caps at 11rem (176px). Four natural line breaks: "DO NOT BE SO" / "OPEN-MINDED" / "THAT YOUR" / "BRAINS FALL OUT." — four lines × 176px × 0.88 ≈ 619px vertical span, filling ~75% of the 900px viewport after nav and signal strip.
- **Attribution:** "— GILBERT CHESTERTON" at 0.875rem, weight 700, tracking `0.12em`, right-aligned, rendered in accent (#E8006B), approximately 1.5rem below the final phrase line.
- **Line heights:** Hero: 0.88 | Subheads/labels: 1.1 | Body: 1.5
- **Letter spacings:** Hero ALL CAPS: 0.01em (slight positive for condensed signage legibility) | Labels/smallcaps: 0.08em | Signal strip: 0.06em | Body: 0em

---

### 3. Layout Specification

- **Archetype:** Poster — the Chesterton phrase IS the design. One dominant typographic element fills 70–80% of the viewport; navigation, attribution, and all signals are demoted to thin edge zones. No center void, no balancing act — the phrase is the architecture.

- **CSS grid/flex structure:**
  ```
  Page: display: grid; grid-template-rows: 56px 1fr 48px; min-height: 100vh; max-width: none;
  Hero zone: display: flex; flex-direction: column; justify-content: center; padding: 80px 5vw 48px;
  Signal strip: display: flex; align-items: center; justify-content: space-between; padding: 0 5vw;
  ```

- **Major dimensions:**
  - Nav strip: `height: 56px`, `position: absolute`, `top: 0`, `width: 100%`, transparent background
  - Hero/poster area: `grid-row: 1 / 3` (spans nav + main rows), `min-height: calc(100vh - 48px)`, `padding: 80px 5vw 48px`
  - Signal strip: `height: 48px`, `grid-row: 3`, `border-top: 1px solid #38172E`
  - Max content width: `none`; side padding: `5vw` (72px at 1440px)
  - No max-width constraint anywhere — full canvas Poster

- **Nav placement:** Absolute overlay, transparent; left side: "DOUG MARCH" in 0.75rem weight 700 all-caps tracking wide; right side: "WORK · ABOUT" in 0.75rem weight 400, muted color. Nav does not interrupt the poster field — it floats over it.

- **Hero phrase grid zone:** Occupies full canvas width (5vw inset both sides), starting at approximately 80px from top. Phrase flows across 4 lines, occupying rows row 1–4 of the text block. At 1440×900 this is approximately 619px of vertical text + 80px top padding = 699px from page top, with the attribution approximately 40px below the final line.

---

### 4. Component Character

- **Border radius:** `0px` throughout — zero-radius hard edges match the phrase's declarative, uncompromising quality. No softening.
- **Border treatment:** Borderless everywhere except the signal strip top edge: `1px solid #38172E` (neutral.700). Zero decorative borders in the poster field.
- **Shadow:** None — contrast between cream text and void background IS the composition.
- **Density:** Deliberately two modes: the poster field is extravagantly spacious (the phrase breathes in near-void); the signal strip is compact and compressed (48px, everything crammed in).
- **Interactive states:** Nav link hover → magenta.300 (#FF5AA4), transition 0.15s ease. Signal link hover → same. No underlines on hover in the poster field (too decorative).

---

### 5. Signal Integration

- **Quote:** IS the hero phrase. Full poster scale, Big Shoulders Display Black, ALL CAPS, left-aligned, cream on void. The signal and the design are the same object.
- **Attribution display:** "— GILBERT CHESTERTON" in magenta.500 (#E8006B), right-aligned, 0.875rem bold, tracked 0.12em, approximately 40px below the terminal line of the phrase. The magenta creates a visual exclamation point — the only non-cream element in the poster field.
- **Sports scores (signal strip, bottom):** "TIGERS · 6–1 ✓" — magenta dot for win indicator, neutral.50 for score text, 0.75rem bold, left zone of strip.
- **Golf (signal strip):** "WIESBERGER −6 · SCOTTISH OPEN" — neutral.200, 0.75rem, center-left zone.
- **Lunar (signal strip):** "☽ 22% · WANING" — muted (neutral.400), 0.75rem, decorative atmospheric detail.
- **Music (signal strip, far right):** "WET LEG · THE WAR ON DRUGS" — muted (neutral.400), 0.75rem, trailing edge.
- Every signal is deliberately compressed into the 48px strip — none of it competes with the poster field above. The strip is a data exhaust, the poster is the argument.

## Self-Check
1. Hero quotability: Yes — "Do not be so open-minded that your brains fall out." ends in a visceral punchline; it is screenshot-and-post material from Gilbert Chesterton, not a description of the page.
2. Because-of chain: Yes — the phrase demanded a Poster (phrase IS the design), which required a 1.618-ratio condensed signage chassis (big-shoulders-atkinson), which earned the only-open-corridor rose-magenta drench on near-void, which collapsed all other elements to a single 48px signal strip.
3. Render feasibility: Yes — Big Shoulders Display at clamp(3.5rem, 9vw, 11rem) × 4 lines × 0.88 line-height ≈ 619px; with 80px top padding + 56px nav + 48px strip = 803px total, within 900px viewport height with no overflow.

## Rationale
The Chesterton quote arrived as today's clearest signal: "Do not be so open-minded that your brains fall out" is already a finished object — a maxim, a warning, a punchline. It requires nothing from the surrounding design except scale and a field to land in. Placing it at ALL CAPS marquee scale in Big Shoulders Display Weight 900 across a near-void rose-black background turns the phrase into something closer to a roadside billboard than a web page — which is exactly the register it wants. The Poster archetype was the only honest answer: the phrase IS the design, so everything else (nav, signals, attribution) gets demoted to thin edge zones.

Big Shoulders Display was chosen because the phrase's quality is declarative-condensed: it has authority, not warmth, and Big Shoulders' condensed signage letterforms carry it without irony. The 1.618 modular ratio ensures the chassis scale can render the phrase at genuinely marquee dimensions without tipping into parody. Atkinson Hyperlegible handles all auxiliary copy cleanly without competing. The chassis pairing is also affinity-tagged for Poster, making it the unambiguous selection within the brief.

The rose-magenta palette (H:330°) occupies the only open corridor in the color mandate (315°–358°) and is thematically precise: hot magenta is the color of a neon sign in a dark bar, a lit object against unlit space. It amplifies the Chesterton quote's wit-as-warning quality — provocative, pointed, slightly unnerving. The near-void background (#130009) at 18.7:1 contrast gives the cream phrase the quality of emitted light. The single accent point (the magenta attribution line "— GILBERT CHESTERTON" below the phrase) serves as a visual period — the only non-cream element in the poster field, landing like a signature on a manifesto.
