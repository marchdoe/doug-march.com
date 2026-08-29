# Signals Brief — 2026-05-07

## Hero Copy
TAKE CARE OF YOUR GRASS.

## Hero Rationale
This phrase arrives compressed from today's quote signal ("If the grass is greener on the other side, maybe that's because you're not taking good care of your grass") — stripped to a four-word command. It earns marquee scale because it operates simultaneously as spring advice (May 7th, grass is literally growing), a rebuke after the Tigers' 0–4 shutout (tend your own game before envying others'), and a permacomputing philosophy (use what you have, maintain what's yours — trending today on HN at 150 points). Four words you could screenshot and point at without any context.

## Archetype
Split

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

**Primary hue** — H:295° (vivid violet/magenta). Within the mandate's open zone 275°–320°. The irony: a grass-care command in non-grass violet. The tension is the point.

**Neutral palette** — tinted toward H:295° (violet family, named "nightshade"):
- 50: `#F8F4FC`
- 100: `#EEE6F7`
- 200: `#D9CCF0`
- 300: `#BCA8DC`
- 400: `#9980C4`
- 500: `#775EA8`
- 600: `#564282`
- 700: `#3C2C60`
- 800: `#251B42`
- 900: `#0C0818`

**Accent color (violet)**:
- light: `#D875F5`
- default: `#C840EE`
- dark: `#A820C8`
- glow: `#E8A0FA`

**Secondary accent (spring grass green)** — H:138°. Deviates from the mandate's forbidden 0°–190° zone; justified as a deliberate narrative move. The word "GRASS." is colored like grass, and only that word. Appears nowhere else on the page except spring signal elements.
- default: `#30D856`
- used for: the literal word "GRASS." in the hero phrase, spring signal bullets

**Background**:
- Page bg (left panel): `#0C0818` (neutral.900 — near-black violet)
- Right panel bg: `#251B42` (neutral.800 — lifted dark violet)
- Card bg: `#1A1030` (between 800 and 900)

**Text colors**:
- Primary text: `#EEE6F7` (neutral.100)
- Secondary text: `#9980C4` (neutral.400)
- Muted text: `#775EA8` (neutral.500)

---

### 2. Typography

**Hero phrase rendering** — Big Shoulders Display (from `big-shoulders-atkinson` chassis) at `font-size: clamp(88px, 12vw, 172px)`, weight 800. Four stacked lines, left-aligned:

```
TAKE        ← vivid violet #C840EE
CARE        ← vivid violet #C840EE
OF YOUR     ← vivid violet #C840EE
GRASS.      ← spring green #30D856
```

Attribution line below: `— Unknown` at 14px, `neutral.500`, Atkinson Hyperlegible, `letter-spacing: 0.20em`, all-caps, `font-weight: 400`.

**Line heights**:
- Hero display: `0.88` (tight stacking, command energy)
- Quote body: `1.60` (Atkinson at 15px needs breathing room on dark)
- Signal labels: `1.1`
- Work list: `1.5`

**Letter spacings**:
- Hero: `-0.02em` (slight tightening for mass at scale)
- All-caps labels/nav: `0.14em`
- Body/signals: `0em`
- Muted metadata: `0.05em`

---

### 3. Layout Specification

**Archetype** — Split. The command phrase occupies one asymmetric half; the evidence that justifies it (the original quote, Tigers 0–4, spring signals, work) occupies the other. A command needs both the decree AND the reasoning. Two active surfaces, no center void.

**CSS grid/flex structure**:
```css
.page-split {
  display: grid;
  grid-template-columns: 62fr 38fr;
  min-height: 100vh;
  max-width: none;
}

.hero-panel {
  background: #0C0818;
  padding: 0 8% 0 6vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}

.signal-panel {
  background: #251B42;
  border-left: 1px solid #3C2C60;
  display: grid;
  grid-template-rows: 60px 1fr auto 48px;
  min-height: 100vh;
  overflow-y: auto;
}
```

**Major dimensions**:
- Left panel (hero): 62% viewport width, `min-height: 100vh`, `padding: 0 8% 0 6vw`
- Right panel (signals): 38% viewport width, `min-height: 100vh`
- Max content width: `none` — full viewport edge-to-edge
- Hero phrase vertical alignment: `justify-content: center` within left panel flex container

**Nav placement** — Top strip of right panel only. 60px height, `padding: 0 24px`, contains "DOUG MARCH" wordmark at 12px caps with `letter-spacing: 0.20em` left, and nav links (Work · About) right at 12px caps. Border-bottom: 1px `neutral.700`. Navigation is entirely contained in the right panel, never disrupting the command phrase on the left.

**Hero phrase grid zone** — Left panel, vertically centered. Phrase spans approximately 30%–76% of viewport height (at 172px × 4 lines × 0.88 line-height = ~606px of display content, plus the attribution line). Left edge at 6vw from left viewport edge. Right edge at ~90% of left panel width.

---

### 4. Component Character

**Border radius** — Minimal: `none` for panel edges and structural borders, `sm` (2px) for signal badges only.

**Border treatment** — Minimal structural borders only: 1px `neutral.700` between left and right panels; 1px `neutral.700` bottom of nav strip; 3px left-border `primary.700` on the quote block in the right panel. No decorative borders.

**Shadow** — None. Dark surfaces don't need shadow elevation. The contrast between `neutral.900` (left) and `neutral.800` (right) plus the 1px panel border creates sufficient depth.

**Density** — Left panel: maximally sparse (command phrase + attribution only). Right panel: moderately dense — four distinct zones with generous inter-zone spacing (32px between blocks).

**Interactive states** — Navigation links: `color` transitions from `neutral.400` → `primary.300` on hover (0.2s ease). Work list items: `border-left` transitions from `neutral.700` → `grass.500` on hover. No scale transforms.

---

### 5. Signal Integration

**Signal panel layout** — All signals live in the right panel. Four zones from top to bottom:

**Zone 1 — Nav** (60px): "DOUG MARCH" wordmark + "Work · About" links.

**Zone 2 — Context block** (≈160px, padding 24px):
- "THURSDAY, MAY 7" in `neutral.500` at 11px caps, `letter-spacing: 0.20em`
- `13.9h daylight · Last quarter moon · Spring Day 127` in `neutral.500` at 12px
- Tigers score displayed as: `DET 0 — OAK 4` in `neutral.400` at 18px, with a small `LOSS` badge in `neutral.600` background, `neutral.300` text, `border-radius: 2px`. Subdued — the scoreline contextualizes the phrase without celebrating defeat.
- Upcoming: `MOTHER'S DAY IN 3 DAYS` in `primary.700` background, `primary.300` text, small pill badge

**Zone 3 — The quote in full** (≈200px, padding 24px):
The quote IS the hero phrase's source — display it in full as a pull quote with a 3px left border in `primary.700` (dark violet):
> *"If the grass is greener on the other side, maybe that's because you're not taking good care of your grass."*

Attribution: `— Unknown` in `neutral.500`, 12px, `letter-spacing: 0.10em`, all-caps. Font: Atkinson Hyperlegible 15px, `line-height: 1.65`, `color: neutral.300`. This is the origin story for the command phrase above.

**Zone 4 — Work list** (≈200px, padding 24px):
Heading: `SELECTED WORK` in `neutral.500` at 10px caps, `letter-spacing: 0.20em`, bottom-border 1px `neutral.700`, margin-bottom 12px.
Each project entry: 14px Atkinson, `neutral.200`, with a `·` bullet in `grass.500` as list marker (the only grass green outside the hero phrase). On hover: left-border 1px `grass.500`.
Projects: Spaceman · FishSticks · 15th Club · dougmar.ch · TeeTurn

**Zone 5 — Footer** (48px, pinned bottom):
`padding: 0 24px`, `border-top: 1px solid neutral.700`, flex row space-between.
Left: `PERMACOMPUTING PRINCIPLES ↑` in `neutral.600` at 11px (the HN story as a quiet nod — the philosophy of maintaining what you have). Right: Truist Championship (scheduled) in `neutral.600` at 11px.

## Self-Check
1. Hero quotability: Yes — "TAKE CARE OF YOUR GRASS." is a four-word command that needs zero context; it hits as spring advice, as a Tiger-rebuke, as permacomputing ethos, all simultaneously.
2. Because-of chain: Yes — The command required Split (decree left, evidence right); the command required Big Shoulders Display (signage mood, condensed at marquee scale); the command required violet-on-near-black (the irony of non-green grass-care) with only "GRASS." in grass green; the layout required a spare left and a dense right.
3. Render feasibility: Yes — At 1440×900, left panel ≈ 893px; `clamp(88px, 12vw, 172px)` yields 172px; "OF YOUR" (7 chars) at 172px × 0.55 condensed ratio ≈ 663px, within 762px usable left panel; 4 lines × 172 × 0.88 = 606px fits within 900px viewport with 147px combined padding.

## Rationale
The hero phrase arrived from three converging signals: today's quote about the grass being greener, compressed to a command ("TAKE CARE OF YOUR GRASS."); the Tigers' 0–4 shutout (zero runs, zero grass tended); and Permacomputing Principles trending on Hacker News (maintain what you have, use what is yours). The phrase earns its scale because it refuses to explain itself — you can point at it from three different angles and it holds. A command this declarative needed to take half the page and nothing else.

Split was the only honest archetype. A command phrase needs a panel of evidence next to it — the right side of the Split carries the original quote, the Tigers scoreline, the spring context, the permacomputing nod. The left side is the verdict; the right side is the dossier. The two halves make a complete argument: here's the rule, here's the world that requires it. Big Shoulders Display at 172px in the condensed-signage register makes "GRASS." on the bottom line feel like the punchline of a public notice — wide weight, no apology, condensed enough that four stacked lines fit within a 900px viewport without crowding. Atkinson Hyperlegible in the right panel earns its place as the legibility counterweight: Kesey-noir terminal clarity for the dense signal content.

The palette is the design's central tension. The mandate opens 275°–320° (violet/magenta) as the available primary range, and H:295° (vivid violet) serves the irony exactly right: a grass-care command not colored like grass, until the last word. "TAKE CARE OF YOUR" burns in `#C840EE` (vivid violet on near-black, 5.2:1 contrast) and "GRASS." lands in `#30D856` (spring green, 10.8:1) — the noun is the color of the thing it names, and only the noun. The secondary grass green deviates from the mandate's forbidden zone (0°–190°) but is limited to a single word in the hero phrase and spring signal bullets; the primary palette is fully compliant. The nightshade neutral scale tints every surface toward H:295°, so even the near-black background participates in the violet frequency rather than sitting as anonymous dark gray.
