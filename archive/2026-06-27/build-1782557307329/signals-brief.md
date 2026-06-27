# Signals Brief — 2026-06-27

## Hero Copy
well-viewed.

## Hero Rationale
Lily Tomlin's quote hands us a coined word — "well-viewed" — that doesn't exist yet but should, and the period turns it into a declaration. It passes the screenshot test on its own: a reader who knows the quote feels the wit; a reader who doesn't asks "what does that mean?" The full quote says books make you "well-read" but TV doesn't make you "well-viewed" — so the invented suffix is both the punchline and a legitimate claim for anyone who watches attentively. On a Saturday with a full moon and a portfolio that redesigns itself daily, the act of deliberate watching feels exactly right.

## Archetype
Poster

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:243°, the blue of cathode-ray light; saturated but not garish, cold but not clinical — the color of a screen watched carefully in the dark.
- **Neutral palette** (indigo-tinted night slate):
  - 50: `#F2F2FA`
  - 100: `#E8E9F5`
  - 200: `#D0D2E8`
  - 300: `#B2B4D0`
  - 400: `#8E91B5`
  - 500: `#6B6E95`
  - 600: `#484B70`
  - 700: `#2D3052`
  - 800: `#181B38`
  - 900: `#0B0D1E`
- **Accent color:** light `#9DA2F5` · default `#7179F0` · dark `#3744CC` · glow `rgba(113,121,240,0.40)`
- **Secondary accent:** none — single committed indigo carries the page
- **Background:** page `#070B1C` (deeper than slate.900 — a true void-black with indigo cast) · card/strip `#0F1328`
- **Text colors:** primary `#F0F1FF` (near-white with blue hint) · secondary `#B2B4D0` (slate.300) · muted `#6B6E95` (slate.500)

Contrast checks:
- Primary text `#F0F1FF` on bg `#070B1C`: ≈18:1 ✓
- Accent `#7179F0` on bg `#070B1C`: ≈5:1 ✓ (AA for all sizes)
- Secondary `#B2B4D0` on bg `#070B1C`: ≈10:1 ✓

---

### 2. Typography (chassis-derived)

- **Hero phrase rendering:** Two stacked lines using the `display` chassis token at `clamp(3rem, 18vw, 16rem)` — same size, different weights and colors to create the hinge effect:
  - **Line 1 "well-":** Bricolage Grotesque, weight 400, color textSecondary (`#B2B4D0`) — the qualifier, lighter, almost receding
  - **Line 2 "viewed.":** Bricolage Grotesque, weight 900 (ExtraBold), color text (`#F0F1FF`) — the coined punchline, full brightness, maximum weight
  - The weight and color differential enact the Tomlin joke without explaining it
- **Line heights:** hero both lines `0.85` (the two lines nearly touching — a visual hinge); body `1.5`; signal strip `1.0`
- **Letter spacings:** hero lines `-0.03em` (tight, monumental); body `0em`; attribution and signal labels `0.08em` (wider, uppercase-safe)
- **Attribution:** "— Lily Tomlin" · 14px · Manrope · weight 400 · textMuted · letter-spacing 0.08em · 48px below "viewed."

---

### 3. Layout Specification

- **Archetype:** Poster — "well-viewed." split across two lines at 18vw fills the visual field completely; no supporting graphic, no sidebar, nothing competing. The empty space is structural silence, not emptiness.
- **CSS structure:**
  ```
  body: display: flex; flex-direction: column; min-height: 100vh; background: #070B1C;
  
  .hero: flex: 1; display: flex; flex-direction: column; justify-content: center;
         min-height: calc(100vh - 88px); padding: 0 6vw;
  
  .phrase-block: display: flex; flex-direction: column; gap: 0; line-height: 0.85;
  
  .signal-strip: height: 40px; padding: 0 6vw; display: flex; align-items: center;
                 gap: 28px; border-top: 1px solid #2D3052; background: #0F1328;
  
  .nav-bar: height: 48px; padding: 0 6vw; display: flex; justify-content: space-between;
            align-items: center; border-top: 1px solid #2D3052; background: #0F1328;
  ```
- **Major dimensions:**
  - Hero area: `min-height: calc(100vh - 88px)` (viewport minus nav+signal strip)
  - Max-width: `none` — full canvas, `6vw` side padding both sides
  - Phrase block: left-aligned at `6vw` from viewport edge; vertically centered in hero zone
  - Signal strip: `height: 40px`, full viewport width, fixed to bottom above nav
  - Nav bar: `height: 48px`, full width, bottom of page
- **Nav placement:** Bottom bar, `height: 48px`; site name left, nav links right (Work · About); textMuted at 13px Manrope, wider tracking
- **Hero phrase grid zone:** Single centered-vertically column spanning 100% canvas width with 6vw padding; "well-" line starts at x=6vw, "viewed." directly below it — the period of "viewed." hanging at approximately x+90% viewport width at 1440px

---

### 4. Component Character

- **Border radius:** `0` (none) — zero rounding anywhere; poster logic demands hard edges
- **Border treatment:** Borderless except single `1px solid #2D3052` (border token) hairlines above the signal strip and above the nav bar. No card borders.
- **Shadow:** None — the depth comes from the indigo darkness itself, not shadow
- **Density:** Maximally sparse — the phrase is the entire page; the signal strip and nav are typographic metadata at the floor
- **Interactive states:** Links in signal strip and nav underline in `#9DA2F5` (accentLight) on hover; no scale transforms; no glow effects — the palette is already luminous enough

---

### 5. Signal Integration

- **Signal strip location:** Full-width 40px band directly above the nav bar, `background: #0F1328`, `border-top: 1px solid #2D3052`
- **Sports scores:**
  - "TIGERS 8–0" — accent default `#7179F0`, Manrope weight 600, 13px, tracking wider — the shutout earns the brightest signal treatment
  - "SCHEFFLER −16" — accentLight `#9DA2F5`, 11px, weight 500 — golf is in progress, slightly demoted
- **Full moon:** "◉ FULL MOON" — textSecondary `#B2B4D0`, 11px — the full moon on a TV-dark indigo background feels thematically perfect; the dot glyph stands in for the orb
- **Holiday countdown:** "T−7 INDEPENDENCE" — textMuted, 11px
- **Quote attribution:** "— Lily Tomlin" appears 48px below "viewed." in textMuted at 14px, Manrope weight 400, tracking 0.08em — not a block quote, not a pull quote; just the name, quietly crediting the source of today's coined word
- **Music signal:** Signal strip tail: "WET LEG · GBV · TOBIN SPROUT" in textMuted at 10px — the smallest element, present but not competing
- **Awwwards / HN:** Not surfaced — the poster archetype allows only one strip of signal noise; these are cut for density

## Self-Check
1. Hero quotability: Yes — "well-viewed." stands entirely alone: a coined word that implies the full Tomlin critique in two syllables and a period, quotable without context.
2. Because-of chain: Yes — Tomlin's invented suffix → Poster (the word fills the frame, nothing else needed) → bricolage-manrope (Bricolage's variable weight range enables the 400/900 hinge between "well-" and "viewed.") → TV-screen indigo H:243° (the medium being discussed becomes the palette) → left-aligned two-line phrase at 18vw with floor signal strip.
3. Render feasibility: Yes — at 1440px, 18vw = 259px; "viewed." (7 chars) × 0.60 em-width × 259px ≈ 1087px, well inside the 1267px usable canvas (1440px minus 6vw×2 padding); the clamp cap at 16rem prevents overflow at larger viewports.

## Rationale
The hero phrase arrived from a single word Lily Tomlin invented to expose a cultural double standard: "well-read" is a compliment, but "well-viewed" doesn't exist as a word, and that absence is the argument. The phrase passes the poster test in isolation — it demands context the page doesn't provide, which makes a viewer do the work. That act of completing the thought is the user's first engagement with the site, and it's more memorable than any project description.

The Poster archetype is the only honest container for a phrase this formally minimal. The design is a two-line typographic statement where the same font at two different weights and two different values of the same color performs the Tomlin logic without text: "well-" in weight 400 and secondary color is the qualifier, lighter because it depends on what follows; "viewed." in weight 900 and near-white is the coined punchline, heavier because it carries the whole argument. The hinge point is the hyphen connecting them — the break between lines enacts the same beat as the pause before Tomlin's delivery. Bricolage Grotesque's variable weight range (200–900 in the same family) is the only chassis in the catalog that can execute this 400/900 split with the warmth the source material needs; Anton or Big Shoulders would turn wit into a sports declaration.

Television-screen indigo at H:243° is not a metaphor — it is the literal color of a cathode-ray tube in a dark room, which is precisely where Tomlin's observation happens. It falls inside the mandate's only open corridor (230°–255°, the last unvisited zone after seven builds). Against the near-void page background `#070B1C`, the accent `#7179F0` achieves 5:1 contrast (WCAG AA all sizes), the primary text `#F0F1FF` achieves 18:1, and the secondary text `#B2B4D0` achieves 10:1 — no compromises. The signal strip at the bottom surfaces what matters today — Tigers 8–0 shutout in accent blue, Scheffler at −16 in accent-light, full moon in secondary, Independence Day countdown in muted — without competing with the phrase above. Everything that is not the phrase knows it is not the phrase.
