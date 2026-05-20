# Signals Brief — 2026-05-20

## Hero Copy
CONTENT WITH MEDIOCRITY.

## Hero Rationale
Andrew Carnegie's signal quote contains one devastating fragment: the condition of the unmotivated — "content with mediocrity, no matter how impressive their other talents." Compressed to three words and a period, it becomes a direct accusation, not a quotation. On a Wednesday in mid-May, with the Tigers dropping another one-run game and Memorial Day five days out, the phrase functions simultaneously as a portfolio manifesto (this site was built against this condition), a visitor challenge, and an environmental reckoning. The period lands as a verdict, not punctuation.

## Archetype
Split

## Chassis
bebas-plex

## Visual Specification
### 1. Color Specification

- **Primary hue:** H:118° — precisely within the mandated 102°–132° permitted window; the green of new leaves in mid-May, not a soft sage but a committed, slightly electric spring green.
- **Neutral palette (green-tinted, H:118°):**
  - 50: `#F2F5F1`
  - 100: `#E2EAE0`
  - 200: `#C4D4C0`
  - 300: `#9DB498`
  - 400: `#728F6B`
  - 500: `#527049`
  - 600: `#3C5435`
  - 700: `#283C22`
  - 800: `#182616`
  - 900: `#0D170A`
  - 950: `#080E07`
- **Accent color:**
  - light: `#93E040`
  - default: `#5DC43A`
  - dark: `#3FAA24`
  - glow: none (hard edges, no glow)
- **Secondary accent:** none
- **Background:**
  - Page / left panel bg: `#080E07` (near-black, green-tinted)
  - Right panel bg: `#5DC43A` (saturated spring green — accent IS the surface)
  - Signal strip bg: `#0D170A`
  - Card bg: `#182616`
- **Text colors:**
  - Primary text (on dark): `#EEF7EA` — cream-green, not pure white
  - Secondary text: `#9DB498`
  - Muted text: `#527049`
  - Primary text (on green panel): `#080E07` — near-black on bright green

---

### 2. Typography

- **Hero phrase rendering:** Phrase is architecturally split across the two panels. Left panel carries "CONTENT WITH" as a two-line stack at `clamp(54px, 6.5vw, 100px)`, Bebas Neue (via `bebas-plex` display token), letter-spacing 0.04em, line-height 0.92, cream `#EEF7EA`. Right panel carries "MEDIOCRITY." as a single oversize line at `clamp(58px, 7vw, 108px)`, same Bebas Neue, line-height 0.92, near-black `#080E07`. The architectural split bisecting "CONTENT WITH" and "MEDIOCRITY." is itself the compositional argument — condition in darkness, the thing exposed in spring light.
- **Attribution:** Below "CONTENT WITH" in left panel — "— Andrew Carnegie" in IBM Plex Sans 12px, neutral.400 `#728F6B`, letter-spacing 0.08em. Not emphasized; the fragment has already done the work.
- **Navigation:** IBM Plex Sans 13px, cream `#EEF7EA`, letter-spacing 0.12em, all-caps labels, top-left of left panel.
- **Signal data:** IBM Plex Sans 12–13px, dark text `#0D170A` on green panel, or cream `#9DB498` on dark if mirrored.
- **Line heights:** Hero: 0.92 (condensed Bebas, tight stack); Body/signals: 1.5; Labels: 1.15
- **Letter spacings:** Hero Bebas: 0.04em; Navigation all-caps: 0.12em; Body prose: 0; Data labels: 0.08em

---

### 3. Layout Specification

- **Archetype:** Split — the two-word confrontation maps directly to the panel division. "CONTENT WITH" arrives in darkness (the condition of the unmotivated); "MEDIOCRITY." lands exposed in full-saturation spring green (the thing). The split is not arbitrary — it is the grammatical structure of the phrase made spatial.
- **CSS grid/flex structure:** `display: grid; grid-template-columns: 45vw 55vw; min-height: 100vh; max-width: none;`
- **Major dimensions:**
  - Full viewport: `min-height: 100vh`, `max-width: none` — edge-to-edge, no centering
  - Left panel: `width: 45vw`, padding `6vw 4vw 5vw 6vw`, bg `#080E07`
  - Right panel: `width: 55vw`, padding `5vw 6vw 5vw 5vw`, bg `#5DC43A`
  - Signal strip: bottom band on right panel, `padding: 24px 0`, uses `border-top: 1px solid rgba(8,14,7,0.25)`
  - No max-width on any container; side breathing via viewport-relative padding (5–6vw)
- **Nav placement:** Left panel, top-left corner, fixed within the panel top. Three links: "Work" · "About" · "doug-march.com" — IBM Plex Sans 13px, all-caps, letter-spacing 0.12em, cream text, no underline, chevron-separated.
- **Hero phrase grid zone:**
  - Left panel: "CONTENT WITH" occupies vertical center (~row 3–6 of 10 implicit rows), fills ~80% of panel width; "CONTENT" and "WITH" on separate lines due to natural line break at Bebas scale.
  - Right panel: "MEDIOCRITY." single line vertically centered at 45vh from top, fills ~80% of panel width.

---

### 4. Component Character

- **Border radius:** Cards: `0px` — no rounding anywhere. Buttons: `0px`. Tags: `0px`. Hard edges are the voice.
- **Border treatment:** Minimal hairline — `border-top: 1px solid` using `border` semantic token `#283C22` on dark surfaces; `rgba(8,14,7,0.2)` on green surfaces.
- **Shadow:** None. Depth comes entirely from the dark/light panel contrast. No drop shadows, no card shadows.
- **Density:** Sparse. The hero panels have generous vertical breathing; signal data below is compact (line-height 1.5, 12px).
- **Interactive states:** Nav links — hover shifts text to `#5DC43A` (accent) on dark side, `#EEF7EA` on green side. No transforms, no shadows on hover. Transition: `color 150ms ease`.

---

### 5. Signal Integration

- **Where signal elements live:** Right panel, below "MEDIOCRITY." in a bottom-anchored signal cluster — stacked rows of small IBM Plex Sans data, dark text on the green surface. Left panel carries only the phrase, attribution, and nav.
- **Sports scores:** "TIGERS 3–4" — label in 11px all-caps IBM Plex Sans, the score in 13px medium weight, preceded by a `▼` loss indicator in neutral.700 `#283C22`. Not emphasized — the Tigers lost and it belongs as environmental data, not a featured element.
- **Quote treatment:** The Carnegie fragment IS the hero phrase. Attribution sits two lines below "WITH" in left panel — `— Andrew Carnegie, 1896` — at 12px, neutral.400, not in the spotlight.
- **Lunar phase:** "◐ Waxing crescent · 21%" — small signal row on right panel, 12px, dark text. The growing crescent rhymes with the confrontational phrase: something building.
- **Memorial Day:** "Memorial Day — 5 days" listed in signal cluster; small label treatment, no special color.
- **HN top story:** "Gemini 3.5 Flash" with 812 pts — one signal row, truncated to 40 chars, linked. The AI-model signal is appropriate context for a portfolio that includes AI projects.
- **Daylight reading:** "14.3h daylight · Sunrise 4:58" — one quiet data row at bottom of signal cluster.
- **Signal cluster layout:** Right panel bottom, `position: absolute; bottom: 5vw; left: 5vw` — a vertical stack of 5–6 signal rows, each 28px tall, dark text on green.

## Self-Check
1. Hero quotability: Yes — "CONTENT WITH MEDIOCRITY." is a three-word gut-punch from Carnegie compressed to maximum confrontation; stands alone as an accusation and portfolio manifesto, screenshot-worthy in isolation.
2. Because-of chain: Yes — Carnegie fragment → Split (left=dark condition, right=green exposure, the split IS the syntax) → bebas-plex (declarative catalog register, catalog-tagged for Split) → H:118° spring green (mandated 102°–132° window, mid-May, confrontational saturation) → full-viewport no-max-width split, signal cluster bottom-anchored in the green panel.
3. Render feasibility: Yes — Bebas Neue at clamp(54px, 6.5vw, 100px) on 1440px = ~93px; "CONTENT WITH" stacks two lines across 45vw (648px), "MEDIOCRITY." (11 condensed chars at ~60px each = ~660px) fits in 55vw (792px) with 5vw padding.

## Rationale
The Carnegie quote fragment "CONTENT WITH MEDIOCRITY." earned today's marquee because it does something most hero phrases can't: it functions as both an accusation and a declaration simultaneously. Strip the sentence of its subject and antecedent, and what remains is a confrontation. For a portfolio site built on iterative risk (Spaceman 2018, FishSticks 2025, 15th Club 2025, daily-rebuilding site), the phrase reads as founding philosophy — and on a Wednesday in mid-May with the Tigers down another one-run game, it also reads as the morning's verdict on yesterday. The period renders as finality, not punctuation.

The Split archetype was inevitable once the phrase was chosen. "CONTENT WITH" and "MEDIOCRITY." have a syntactic relationship — qualifier and noun — that maps exactly onto two active panels. The left panel carries the condition in near-darkness; the right panel exposes the thing in full spring-green light. The architectural bisection IS the argument: you can see what mediocrity looks like when it's illuminated. Every other archetype would have presented the phrase as a quotation. Split presents it as a spatial fact. The bebas-plex chassis was chosen because Bebas Neue is the catalog-declarative register — not the warning-sign aggression of Big Shoulders, not the literary weight of a serif — and it's explicitly tagged for Split in the catalog. At display scale with 0.04em tracking, Bebas Neue reads as a posted verdict, not a shouted headline.

The H:118° spring-green palette was both mandated (102°–132° permitted zone) and conceptually exact. The color of new leaves in the third week of May is not a soft sage or a muted olive — it's the aggressive, slightly electric green of something actively growing, which is the precise counterweight to the phrase's subject. Against six consecutive designs spanning amber, ocean-void, cerulean, violet, olive, and teal, a full-saturation spring green with a near-black dark half is the sharpest available break. The right panel doesn't just complement the phrase — it performs it: this is what mediocrity looks like when you can't hide from the light.
