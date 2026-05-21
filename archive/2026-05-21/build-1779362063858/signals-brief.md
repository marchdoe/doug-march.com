# Signals Brief — 2026-05-21

## Hero Copy
EXCESSIVE KINDNESS ELIMINATES RESPECT.

## Hero Rationale
The Euripides quote delivers two claims; the first (anger causes fear) is familiar. The second — that excessive kindness eliminates respect — is the counterintuitive half, the one that lands like a verdict. Lifted and isolated, it reads as founding philosophy for a portfolio site: standards over accommodation, quality over niceness. It's quotable without context, specific enough to provoke, and implicitly frames every entry in the catalog below it — this is why the work meets the bar it meets.

## Archetype
Index

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:350° — pompeian crimson, the open zone in the color mandate (322°–360°); the hue of authority, passion, and stated standards. The alignment between mandate and concept is not coincidental.
- **Neutral palette (ink family, tinted toward H:350°):**
  - 50: `#F5EEF0` — warm cream with a faint rose cast
  - 100: `#E6D5DA`
  - 200: `#C4A5AE`
  - 300: `#9E7580`
  - 400: `#7A5260`
  - 500: `#5C3442`
  - 600: `#421A28`
  - 700: `#2C0E1A`
  - 800: `#1A060F`
  - 900: `#0D0307` — near-black with deep crimson undertone
- **Accent color (crimson scale):**
  - Light: `#FF7F97` (crimson.300)
  - Default: `#F54D6E` (crimson.400) — contrast vs bg: ~6:1 ✓
  - Dark: `#B01530` (crimson.600)
  - Glow: `#FFB0BC` (crimson.200)
- **Secondary accent:** None
- **Background:**
  - Page bg: `#0D0307` (ink.900)
  - Card bg: `#1A060F` (ink.800)
  - Sidebar bg: `#0D0307` (ink.900)
- **Text colors:**
  - Primary text: `#F5EEF0` (ink.50) — contrast vs bg: 17.8:1 ✓
  - Secondary text: `#C4A5AE` (ink.200) — contrast vs bg: ~7.2:1 ✓
  - Muted text: `#7A5260` (ink.400) — contrast vs bg: ~3.1:1, used only for decorative metadata at 14px+ bold

---

### 2. Typography (Bebas Neue display / IBM Plex Sans body)

- **Hero phrase rendering:** Two intentional lines on the `display` token — "EXCESSIVE KINDNESS" / "ELIMINATES RESPECT." at `clamp(56px, 8.5vw, 122px)`, flush left, zero side margins (sits directly against the 6vw page inset). The "." terminal is rendered in a separate `<span>` colored crimson.400 (`#F54D6E`) — the only chromatic event in the H1. The full phrase is set in Bebas Neue at natural letter-spacing (0.02em) — Bebas' condensed rhythm already provides the pressure; no tracking adjustment needed.
- **Attribution line:** "— EURIPIDES · 484–406 BC" in IBM Plex Sans, 13px, letter-spacing 0.14em, color crimson.400 (#F54D6E). Contrast 6:1 at 13px = acceptable for smallcaps-weight label; if below 4.5:1 threshold, bump to crimson.300.
- **Line heights:**
  - Hero: `0.88` — the two lines stack tight, almost touching, which creates a monolith
  - Catalog entries: `1.35` — dense but legible
  - Body/section text: `1.5`
- **Letter spacings:**
  - Hero: `0.02em` (Bebas Neue's inherent condensed rhythm)
  - Section labels / column headers: `0.22em` (widest) — IBM Plex Sans all-caps at 11px
  - Catalog metadata: `0.05em` (wide)
  - Body text: `0em`
- **Column headers ("SELECTED WORK", "TIMELINE", "TODAY"):** IBM Plex Sans 11px, `font-weight: 500`, letter-spacing 0.22em, color crimson.400, all-caps

---

### 3. Layout Specification

- **Archetype:** Index — dense catalog at full canvas. The portfolio IS a catalog; Euripides' statement about standards becomes the monumental header for the directory beneath it. Every entry carries equal weight. The page reads as a contents page, not a collection of hero moments.

- **CSS structure:**
  ```
  /* Outer page shell */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 6vw;
  max-width: none;
  
  /* Top bar (nav) */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid ink.700;
  
  /* Hero zone */
  padding-top: 48px;
  padding-bottom: 32px;
  
  /* Catalog grid */
  display: grid;
  grid-template-columns: 44fr 31fr 25fr;
  gap: 0;
  border-top: 1px solid crimson.700;
  ```

- **Major dimensions:**
  - Hero/featured area height: `min-height: 28vh` — enough for two lines of Bebas at 8.5vw + attribution + padding
  - Sidebar/fixed panel: None — Index is full-canvas, no sidebar
  - Max content width: `max-width: none`; side padding `6vw` left and right
  - Hero padding: `padding: 48px 0 32px 0` within the 6vw inset
  - Catalog row padding: `padding: 10px 0` per entry
  - Section column gap: vertical 1px `ink.700` dividers between the three columns

- **Nav placement:** Top bar, full width, `height: 48px`, `border-bottom: 1px solid ink.700`. Left: "DOUGLAS MARCH" in IBM Plex Sans 13px, letter-spacing 0.12em. Right: "WORK · ABOUT" in IBM Plex Sans 12px, letter-spacing 0.12em, color ink.300. This bar lives above the hero zone.

- **Hero phrase grid zone:** Full width (both catalog columns spanning all three), `rows 1–2`. Lines break intentionally:
  - Row 1: "EXCESSIVE KINDNESS" at `clamp(56px, 8.5vw, 122px)`, line-height 0.88
  - Row 2: "ELIMINATES RESPECT" + crimson period at same scale
  - Row 3: Attribution "— EURIPIDES · 484–406 BC" in IBM Plex Sans 13px, crimson.400, flush right to the text block

- **Catalog structure (three columns, no outer padding between columns):**
  - **Column 1 (44%) — SELECTED WORK:** Each entry formatted as: `[01] FISHSTICKS .............. SAAS / 2025`. Sequential number in ink.400 monospaced tabular, 12px. Project name in ink.50 IBM Plex Sans 14px. Dot leader in ink.600. Type/year in ink.300, 12px, tabular nums, letter-spacing 0.05em. Thin 0.5px `ink.700` rule between each entry.
  - **Column 2 (31%) — TIMELINE:** Same row format but with career entries. Year on left, role/company descriptor right-aligned. Same treatment.
  - **Column 3 (25%) — TODAY:** Signal entries — Tigers 2–3 L, OpenAI disproves geometry conjecture, waxing crescent 30%, 14.3h daylight, Memorial Day in 4 days. Each as a single dense line in IBM Plex Sans 13px.
  - Column dividers: 1px `ink.700` vertical rule between columns (no gap, ruled border)

- **Capabilities band:** Below the three-column catalog, full-width band with `border-top: 1px solid ink.700`. Dense horizontal flow of capability tokens in IBM Plex Sans 13px, ink.300, letter-spacing 0.05em, separated by ` · ` spacers.

---

### 4. Component Character

- **Border radius:** `0px` everywhere — the Index archetype is architectural and angular; rounded corners contradict the catalog register
- **Border treatment:** Ruled lines only — 1px horizontal rules between entries (ink.700), 1px column dividers (ink.700), 1px crimson.700 rule between hero and catalog, 1px accent rule between nav and hero. No cards.
- **Shadow:** None — this palette is too dark for shadow depth; surface contrast is achieved through the `ink.800` card bg vs `ink.900` page bg only where necessary
- **Density:** Compact — catalog entries at 10px top/bottom padding, 14px font size, maximum rows per column visible without scrolling
- **Interactive states:** On hover, catalog entry text flips from ink.50 to crimson.400 with the dot leader disappearing (text-decoration underline in crimson.400 appears instead). Transition: 0.15s ease. Nav links: ink.300 → crimson.400 on hover.

---

### 5. Signal Integration

- **Where signal elements live:** Entirely in the "TODAY" catalog column (Column 3). They are formatted as index entries, indistinguishable in typographic treatment from any other catalog column — signals are part of the archive, not a sidebar or banner.
- **Tigers 2–3 L:** Rendered as: `DETROIT TIGERS ........ 2–3 L` — the loss gets no special color treatment; it's a filed fact, not a headline. Year: 2026. The spareness of catalog format makes a loss read as data, not disaster.
- **OpenAI geometry conjecture disproved:** Rendered as: `AN AI MODEL DISPROVES ......... HN #1` — condensed to catalog form. This is the day's most significant signal (1,203 upvotes) and earns the top position in the TODAY column.
- **GitHub breach:** Second entry: `3,800 REPOS BREACHED ......... SECURITY`
- **Waxing crescent, 30.4%:** `WAXING CRESCENT ........... DAY 5.49`
- **14.3h daylight:** `14.3H DAYLIGHT .............. SPRING`
- **Memorial Day:** `MEMORIAL DAY .............. T–4 DAYS`
- **Quote treatment:** The Euripides quote IS the hero phrase — it occupies the full hero zone at Bebas Neue marquee scale. The attribution ("— EURIPIDES · 484–406 BC") lives below the phrase in IBM Plex Sans. The quote is not repeated in the catalog.
- **Music signal (Guided by Voices, My Morning Jacket):** Filed in TODAY column as: `GBV · MY MORNING JACKET ........ LISTENING`
- **CJ Cup Byron Nelson:** `CJ CUP BYRON NELSON ......... SCHEDULED` — no leaders yet, just the status

## Self-Check
1. Hero quotability: Yes — "EXCESSIVE KINDNESS ELIMINATES RESPECT." is Euripides standing alone; it would stop a scroll, generate a screenshot, and works as a portfolio manifesto without its first clause.
2. Because-of chain: Yes — the classical statement demanded a catalog/index archetype (the portfolio IS a directory under a declared standard), which demanded bebas-plex (condensed declarative catalog chassis), which demanded pompeian crimson (the only mandate-permitted hue family, landing precisely on the color of authority and passion the phrase carries).
3. Render feasibility: Yes — Bebas Neue at clamp(56px, 8.5vw, 122px) breaks across two intentional lines ("EXCESSIVE KINDNESS" / "ELIMINATES RESPECT."), each approximately 18–19 condensed glyphs at ~58px wide at max size = ~1100px max, well within the 1267px content width at 1440px viewport with 6vw side padding.

## Rationale
The Euripides quote offered two clauses. The first — "anger exceeding limits causes fear" — is a familiar warning, the kind of thing that appears on motivational calendars. The second — "excessive kindness eliminates respect" — is the harder, less comfortable truth, and it's the one worth posting at marquee scale on a portfolio site. Isolated and printed in cream on near-black, it functions simultaneously as personal standard, client message, and implicit explanation for why the work passes a bar. It is quotable without its first clause. It earns the space.

The Index archetype follows necessarily from the phrase. A catalog exists to demonstrate that standards were maintained across an entire body of work — not just once, in a single featured project, but in every numbered entry. When the monumental header declares "EXCESSIVE KINDNESS ELIMINATES RESPECT," the catalog beneath it is the evidence: here is the work produced under that standard, filed row by row, without editorial selection bias or showcase hierarchy. Every project gets the same typographic weight as every signal, every timeline entry, every capability — because the statement applies to all of it equally. Bebas Neue at condensed display scale is the only chassis that can carry Euripides at that register without tipping into irony; it's the typeface of posted notices and authority documents, not advertising copy.

The pompeian crimson palette (H:350°) was both mandated and inevitable. The color mandate's open window — 322° to 360° — is precisely the hue family of classical Roman authority: wax seals, senatorial robes, the color of things that have already decided they're correct. Against ink.900 (#0D0307), a near-black ground with the faintest rose undertone, the cream text achieves 17.8:1 contrast while the crimson.400 accent at #F54D6E reaches 6:1 — sufficient for body-text use, let alone the 13px attribution line. The single chromatic event in the hero phrase — the terminal period of "RESPECT." rendered in crimson.400 — is not decoration. It is the color of the judgment being passed, landing as a full stop in the one hue that costs something to look at.
