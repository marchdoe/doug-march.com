# Signals Brief — 2026-06-17

## Hero Copy
Wisdom is doing now what you are going to be happy with later on.

## Hero Rationale
The Joyce Meyer quote from today's signals arrives on a waxing crescent day 3 (9.7% illumination, energy building from fresh cycle), two days before Juneteenth — a date that is itself about the long reckoning between actions taken and freedom realized. For a portfolio that makes daily decisions about craft and construction, this quote is its operating logic made visible: every project in the index below is evidence that this principle was acted on. The Bebas Neue display in vivid violet on a near-black canvas renders it as a declaration, not a suggestion.

## Archetype
Index

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

**Primary hue** — H:292° (violet), sits dead-center in the mandated 275°–320° open corridor. This is the hue of twilight foresight and ultraviolet signal: warm enough to feel alive, cool enough to feel deliberate. Not the AI-default purple (H:260°), not magenta (H:320°) — the specific reading of H:292° is pre-storm sky.

**Neutral palette** — violet-tinted dark scale ("ink"), H:270°, chroma 0.008–0.012:
- 50: `#F0ECFF`
- 100: `#E2DCFF`
- 200: `#C8BAEA`
- 300: `#A898D0`
- 400: `#7970A8`
- 500: `#544A78`
- 600: `#382B58`
- 700: `#261A44`
- 800: `#160E30`
- 900: `#0A0618`

**Accent color** (vivid violet, H:292°):
- Light: `#DF8FFF`
- Default: `#CC55F5`
- Dark: `#8A10B8`
- Glow: `rgba(204, 85, 245, 0.20)`

**Secondary accent** — none. Single dominant accent.

**Background**:
- Page bg: `#0A0618` (ink.900, near-black violet-tinted)
- Card/column bg: `#160E30` (ink.800)
- Masthead bg: `#160E30` (ink.800, one step off canvas)
- Sidebar bg: N/A (Index has no sidebar)

**Text colors**:
- Primary text: `#F0ECFF` (ink.50 — near-white violet-tinted)
- Secondary text: `#C8BAEA` (ink.200)
- Muted text: `#7970A8` (ink.400, passes 4.75:1 on #0A0618)

**Contrast audit**:
- Hero phrase `#CC55F5` on `#0A0618`: 6.06:1 ✓ (AA for body and large text)
- Body `#F0ECFF` on `#0A0618`: ~17.9:1 ✓
- Secondary `#C8BAEA` on `#160E30`: ~8.1:1 ✓
- Muted `#7970A8` on `#0A0618`: ~4.75:1 ✓

---

### 2. Typography (chassis-derived: bebas-plex)

**Hero phrase rendering** — `display` token (Bebas Neue), `clamp(48px, 6.5vw, 88px)`. At 1440px: renders at 88px. Line height: 0.92. Letter spacing: -0.01em. Uppercase by default with Bebas. The 15-word quote wraps to 3 natural lines at 1440px (usable width ~1266px after 6vw padding):
- Line 1: "WISDOM IS DOING NOW WHAT"
- Line 2: "YOU ARE GOING TO BE"
- Line 3: "HAPPY WITH LATER ON."

Color: `#CC55F5` (vivid.default). Attribution "— Joyce Meyer" follows in IBM Plex Sans, 15px, #C8BAEA, right-aligned to the quote block.

**Column headers** — Bebas Neue, 18px, letter-spacing: 0.12em, color: `#CC55F5`. All caps, borderBottom 1px solid `#CC55F5`.

**Catalog row entries** — IBM Plex Sans, 14px, line-height: 1.5, color: `#F0ECFF`. Metadata (year, category tags): 12px, color: `#7970A8`, tabular-nums.

**Nav items** — IBM Plex Sans, 13px, letter-spacing: 0.06em, uppercase, color: `#C8BAEA`.

**Line heights**:
- Hero quote: 0.92
- Column headers: 1.0
- Catalog rows: 1.5
- Body/signals: 1.5

**Letter spacings**:
- Hero phrase: -0.01em
- Column headers: 0.12em
- Nav/labels: 0.06em
- Body: 0em

---

### 3. Layout Specification

**Archetype** — Index. The wisdom declaration serves as a masthead over a four-column dense catalog that is itself the proof of the quote: every project, career entry, capability, and today's signal exists because action was taken. The catalog says "here is what was done"; the masthead says "here is why."

**CSS grid/flex structure**:

```
/* Outer layout */
display: grid;
grid-template-rows: auto 1fr;
min-height: 100vh;
max-width: none;

/* Masthead band */
display: flex;
flex-direction: column;
padding: 0 6vw;
background: #160E30;

/* Nav row within masthead */
display: flex;
justify-content: space-between;
align-items: center;
height: 48px;
border-bottom: 1px solid #261A44;

/* Catalog grid */
display: grid;
grid-template-columns: 1.2fr 1fr 1fr 0.9fr;
gap: 0;
border-top: 2px solid #CC55F5;
padding: 0 6vw 96px;
background: #0A0618;
```

**Major dimensions**:
- Masthead height: `auto` (~340px at 1440px: 48px nav + ~250px quote + 24px attribution + 16px padding)
- Quote block: `clamp(48px, 6.5vw, 88px)` across 3 lines = ~243px at 88px with lh:0.92
- Catalog grid: begins at ~340px from top, scrolls to full content height
- Max content width: `none` — edge-to-edge canvas, 6vw padding each side
- Column padding: `padding: 32px 28px 32px 0` per column
- Section padding: `padding: 0 6vw 96px`
- Row height: 36px (8px top/bottom padding + 20px text height)
- Column rule (between columns): `1px solid #261A44`

**Nav placement** — top bar within the masthead band. Full-width, 48px tall, flex row. Left: "DOUG MARCH" in Bebas Neue 22px, tracking 0.1em, color `#CC55F5`. Right: "WORK · ABOUT · CONTACT" in IBM Plex Sans 13px uppercase tracking 0.06em, color `#C8BAEA`.

**Hero phrase grid zone** — spans full width of the masthead band (columns 1–4 conceptually), below the nav row. Padding: 24px 0 20px 0 within the masthead. Attribution line: right-aligned, 15px IBM Plex Sans italic, color `#C8BAEA`, 8px below quote block.

**Violet rule** — 2px solid `#CC55F5` — bridges masthead and catalog. Acts as the hinge between declaration and evidence.

---

### 4. Component Character

**Border radius** — none (`0px`) for all structural elements. Index = catalog precision = no rounding.

**Border treatment** — exclusively `1px solid #261A44` for row separators (ink.700). Column headers get `1px solid #CC55F5` (accent). Outer masthead gets `2px solid #CC55F5` at base.

**Shadow** — none. Depth comes from layered background colors (masthead `#160E30` vs. catalog `#0A0618`).

**Density** — compact. Row padding: 8px vertical. No decorative whitespace inside the catalog. The masthead is spacious (the quote needs room to declare itself); the catalog below is tightly wound.

**Interactive states** — project name rows: `color: #CC55F5` on hover, transition 120ms ease. Nav items: letter-spacing widens from 0.06em to 0.09em on hover, color `#F0ECFF`. Row bg on hover: `background: #160E30`.

---

### 5. Signal Integration

**Signal column** — Column 4 of the catalog grid is dedicated to today's signals, header: "TODAY" in Bebas 18px tracking 0.12em violet. Each signal is a row entry.

**Sports scores** — Tigers LOSS 2–4: row format: "⚾ DET TIGERS" (secondary text, IBM Plex 13px) + "2–4 L" (right-aligned, vivid.dark `#8A10B8`, tabular-nums, 13px). The loss is marked with a faint red-adjacent: use `#C8BAEA` for the score, small "L" in `#7970A8` muted.

**Golf** — U.S. Open row: "⛳ U.S. OPEN" + "SCHEDULED" in muted text.

**Quote display** — The Joyce Meyer quote IS the hero phrase, rendered at full Bebas Neue display scale in the masthead. Attribution "— Joyce Meyer" is a secondary IBM Plex Sans italic line beneath.

**HN stories** — Two rows in Signals column: "↑1372 RUNNING LOCAL MODELS IS GOOD NOW" (wraps to 2 lines at compact width; 12px, color `#C8BAEA`) and "↑813 GRAPHENEOS → ANDROID 17" (12px muted). Score rendered in `#CC55F5` accent, story title in secondary text.

**Lunar phase** — "🌙 WAXING CRESCENT 9.7%" in Signals column, row at compact 12px.

**Juneteenth** — Highlighted row with left-border treatment: `border-left: 2px solid #CC55F5; padding-left: 6px`. Text: "JUNETEENTH — 2 DAYS" in `#F0ECFF` 13px. This is the only visually elevated row in the Signals column.

**Music** — "♫ TOBIN SPROUT / MY MORNING JACKET" at 12px muted, bottom of Signals column.

**Daylight** — "☀ 14.7h — 04:48 → 19:33" in Signals column at 12px muted.

## Self-Check
1. Hero quotability: Yes — "Wisdom is doing now what you are going to be happy with later on." is a complete standalone declaration by a named author; it functions as a poster inscription, not a UI label or descriptive heading.
2. Because-of chain: Yes — the quote's declarative tone (catalog of evidence) demanded Index; Index's catalog aesthetic demanded bebas-plex; the building-energy of waxing crescent + Juneteenth proximity demanded vivid-forward violet in the open 275–320° mandate window; the layout places the quote as masthead and four catalog columns as evidence.
3. Render feasibility: Yes — Bebas Neue at clamp(48px, 6.5vw, 88px) renders the 58-character quote across 3 lines at ~243px height on a 1440px canvas with 6vw padding; at no viewport does it overflow the masthead or collapse below 48px.

## Rationale
The Joyce Meyer quote arrived already formatted for this portfolio's register: it's not aspirational decoration but an operating instruction. A site that reads raw YAML at sunrise and composes a new design face is literally doing now what it will be happy with later. The waxing crescent at day 3 (9.7% illumination) is the calendar counterweight — the month's energy is building, not peaking, and wisdom at that moment is about the decision made before the light arrives. Juneteenth in two days adds historical mass: that date is itself the proof that actions taken matter later, that the accounting eventually comes. The quote earns its scale.

The Index archetype is the only structural honest response to this phrase. A Poster would set the quote on a pedestal with nothing around it. An Index treats the quote as a masthead — a declaration above a full inventory — and then assembles the proof: every project Doug built, every career entry, every capability, every signal from today's world. The four-column catalog below the violet rule is the evidence that wisdom was, in fact, acted on. The layout is an argument, not a frame. The archetype choice leads directly to the chassis: `bebas-plex` is catalogued for Index specifically because Bebas Neue's condensed authority fills a full-width masthead without needing to shout, and IBM Plex Sans's precise humanist geometry makes 14px catalog rows legible at maximum density.

The color decision is structural. The open mandate corridor — 275°–320° — after seven consecutive builds through lime, crimson, chartreuse, teal, amber, indigo, and cyan, left precisely one unvisited family: violet. H:292° deep violet is not the default purple of training data (H:260°) nor the default pink-magenta (H:310°) — it sits at the twilight edge of visible spectrum, the hue of something seen before it is fully understood. On near-black `#0A0618` ink, the vivid `#CC55F5` hero phrase at 6.06:1 contrast reads as a signal blazing in the dark, which is exactly the register this quote deserves on a Wednesday in June with 14.7 hours of daylight and Juneteenth two days out.
