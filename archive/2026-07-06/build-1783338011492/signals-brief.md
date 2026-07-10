# Signals Brief — 2026-07-06

## Hero Copy
Guided by voices.

## Hero Rationale
Today's music signal lists "Guided by Voices" first among the three bands — and Tobin Sprout, also listed, is the co-founding second guitarist of that same Dayton, Ohio band. The phrase appears twice in the data without being named once, which is exactly how a signal worth elevating works. "Guided by voices" also describes the methodology of this site itself: a portfolio that rebuilds each morning by reading environmental inputs, plural and ambient, and letting those voices shape the day. On a Monday in early July, with the site's creative risk dial at 8/10, a quiet three-word declaration that works simultaneously as a band name, a creative philosophy, and a self-description earns its marquee.

## Archetype
Scroll

## Chassis
bricolage-manrope

## Visual Specification
### 1. Color Specification

**Primary hue:** H:28° (amber-orange). This is the sole mandate corridor (5°–42°) and it is precisely correct: concert poster amber, July heat at hour 14 of sunlight, the color of incandescence. Not decorative warmth — structural warmth.

**Neutral palette (amber-tinted stone):**
- 50: `#FAF5EE`
- 100: `#F0E8D8`
- 200: `#DED0B8`
- 300: `#BCA882`
- 400: `#93785A`
- 500: `#6C5135`
- 600: `#4A3320`
- 700: `#2E1D0E`
- 800: `#1C1008`
- 900: `#100904`
- 950: `#090503`

**Accent color:**
- Light: `#FFD9A8`
- Default: `#FF9330`
- Dark: `#BE5400`
- Glow: `rgba(255, 147, 48, 0.25)`

**Secondary accent:** None.

**Background:**
- Page bg: `#100904` (stone.900 — deep amber-black, the dark room the concert plays in)
- Card bg: `#1C1008` (stone.800)
- Surface bg: `#2E1D0E` (stone.700)

**Text colors:**
- Primary: `#FFEFD8` (amber.100 — warm cream, ~16:1 on page bg)
- Secondary: `#FFB862` (amber.300 — golden, ~8:1 on page bg)
- Muted: `#93785A` (stone.400 — mid-brown, secondary signal text)

---

### 2. Typography

**Hero phrase rendering:** Bricolage Grotesque (`display` chassis token), set at `clamp(4.5rem, 9.5vw, 13.5rem)`. "Guided by voices." renders left-aligned at the left rail of the scroll column. At 1440px, 9.5vw ≈ 137px — the phrase breaks naturally across two lines:

```
Guided
by voices.
```

The period is kept on the second line, not orphaned. Font weight: 800 (Bricolage Grotesque is variable; push to max expressive weight). Color: `#FFEFD8`. The text-shadow: `0 0 80px rgba(255,147,48,0.15)` — imperceptible at a glance, felt as warmth.

**Line heights:**
- Hero phrase: `0.9` (tight — the two lines hug)
- Section headings: `1.1`
- Body/card: `1.55` (bumped above standard 1.5 for warm-on-dark compensation)
- Signal strip: `1.4`

**Letter spacings:**
- Hero phrase: `-0.03em` (Bricolage at max weight needs slight optical compression)
- All-caps labels: `0.10em`
- Body: `0em` (default — Manrope is well-spaced natively)
- Muted metadata: `0.04em`

---

### 3. Layout Specification

**Archetype:** Scroll. One committed column, cinematic vertical pacing. The phrase "Guided by voices." does not want a poster's static authority — it wants to lead you somewhere, to pull you down through something. A Scroll is a guided experience. The archetype is the meaning.

**CSS structure:** Single-column layout, all sections stacked:
```css
.scroll-root {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.scroll-section {
  width: 100%;
  padding: 0 6vw;
}
```

**Major dimensions:**
- Hero fold: `min-height: 100svh`, `display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 10vh`
- Body text sections: `max-width: 72ch` within the column
- Hero phrase zone: unconstrained width (no max-width), full `calc(100vw - 12vw)` span
- Nav bar: fixed top, `height: 52px`, transparent over fold 1, transitions to `background: rgba(16,9,4,0.92)` on scroll
- Section padding: `96px 6vw` for project sections; `64px 6vw` for signal strip

**Nav placement:** Fixed top bar spanning full viewport width. Left: "DM" logomark in amber.300. Right: nav links ("work", "about", "contact") in stone.300, `font-size: 0.8125rem`, letter-spacing: `0.08em`, all-caps. On hover: color shifts to amber.400.

**Hero phrase grid zone:** Fold 1. The phrase occupies the bottom-left of the fold, anchored at `padding-bottom: 10vh`. Above it (at top-left): the dateline — "Mon 06 July 2026" in all-caps amber.500 at `0.75rem / wider`. Below the phrase: two-line attribution in stone.400 at `0.875rem`:

```
Guided by Voices, est. Dayton OH
with Tobin Sprout · My Morning Jacket
```

This makes the source explicit without explanation.

---

### 4. Component Character

**Border radius:** Cards: `4px` (md). Buttons: `2px` (sm). Tags/chips: `full`. Hero and section containers: `0px`.

**Border treatment:** Borderless cards by default. A single `1px solid stone.700` top-border rule separates major scroll sections — functions as a horizontal divider, not a box. No box-shadow borders on cards.

**Shadow:** Minimal. Cards: `0 2px 12px rgba(0,0,0,0.4)` — visible only on hover. Hero text: `0 0 80px rgba(255,147,48,0.15)` glow (warmth, not drama). No pronounced drop shadows.

**Density:** Spacious between major folds (96px vertical gap); compact within signal clusters (8–16px between items).

**Interactive states:** Links and project cards → `color: amber.300` on hover, `transition: color 0.18s ease`. Project cards → `border-color: stone.600 → amber.700` on hover, `background: stone.800 → stone.700` on hover. Nav items → amber.400 on hover with `letter-spacing` staying constant (no layout shift).

---

### 5. Signal Integration

**Fold 1 — Hero + Attribution:**
- Dateline top-left: "MON 06 JULY 2026" — stone.400, 12px, widest letter-spacing
- Hero phrase: two-line Bricolage Grotesque at full scale
- Attribution below phrase: "— Guided by Voices, est. Dayton OH / My Morning Jacket · Tobin Sprout" in stone.400 at 14px — quietly makes the source legible

**Fold 2 (after hero) — Signal Dispatch band:**
A full-width `stone.800` band, `padding: 32px 6vw`. Three items inline:
1. **Tigers:** "DET 6 · 3 CIN" — amber.300, tabular-nums, `font-size: 0.9375rem`, result badge "W" in amber.400 background
2. **Golf:** "Gotterup −20 · JD Classic Final" — stone.300, same size
3. **Moon:** "↓ Last Quarter · 52% lit" — stone.400, italicized
Items separated by `stone.700` 1px vertical rules. All on one line at desktop, stacked at mobile.

**Fold 3 — Featured Project:**
15th Club (AI golf platform) surfaced as featured — it rhymes with Gotterup winning the John Deere Classic. Full-width card with project title at `display` scale, amber.400 accent rule above the description.

**Fold 4 — Selected Work:**
Three project cards in a CSS grid: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`, `gap: 24px`. Each card: stone.800 bg, top amber rule, title in Bricolage at `1.25rem`, year + type in stone.400 small-caps.

**Quote treatment:** The hero phrase IS the signal. No separate blockquote. The attribution below the phrase performs the citation role.

## Self-Check
1. Hero quotability: Yes — "Guided by voices." functions as both a band name from today's music signal and a three-word creative philosophy; it stands alone as a poster, earns a screenshot without context, and doubles as the site's own daily methodology.
2. Because-of chain: Yes — phrase is ambient/contemplative → Scroll (guided, led through, cinematic) → bricolage-manrope (expressive variable warmth, tagged for Scroll) → amber H:28° (concert-poster heat, mandate-compliant, summer incandescence) → left-anchored bottom-of-fold placement (arrival, not announcement).
3. Render feasibility: Yes — Bricolage Grotesque variable at clamp(4.5rem, 9.5vw, 13.5rem) renders "Guided / by voices." across two lines within a 88vw column at 1440px without overflow; the 1.500 scale ratio and variable-weight axis handle marquee scale cleanly.

## Rationale
The hero phrase arrived as convergence, not selection: "Guided by Voices" is the first band in today's music signal, and Tobin Sprout — also listed — is the co-founding guitarist of that same group. The phrase appears twice in today's data without either instance explaining the other, which is how a genuinely resonant signal presents itself. Beyond the band reference, "Guided by voices" is an accurate description of this site's daily operation: it reads environmental signals, plural and ambient, and is shaped by what it hears. On a Monday in early July, with creative risk at 8/10 and the mandate wide open, a three-word phrase that carries autobiography, philosophy, and musical provenance in one breath earns its marquee.

The Scroll archetype follows from the phrase's logic rather than from variance-avoidance. "Guided by voices" implies movement, progression, being led through something — the antithesis of a poster's static declaration. A Scroll is a guided experience: the phrase anchors the bottom of fold 1, and the page pulls you forward. Bricolage Grotesque's expressive variable weight axis makes it the right display engine — not Anton's blunt condensed authority, not Big Shoulders' athletic signage bark, but a genuinely warm, expressive display face that can carry "Guided by voices." with the soft conviction of someone who actually believes it. Manrope's body handling is clean without being cold.

Amber at H:28° is both the mandate's only open corridor and the only honest answer to "what color is a Guided by Voices show in Dayton, Ohio?" — concert poster amber, July heat at hour 14 of daylight, the color the light goes when incandescent. Against the near-void `#100904` background (amber-tinted stone at its darkest), the `#FFEFD8` headline cream achieves approximately 16:1 contrast and the amber.400 accent reads as a lit element against dark space. The source attribution below the hero phrase — "— Guided by Voices, est. Dayton OH / My Morning Jacket · Tobin Sprout" — completes the signal loop without explaining it, letting the phrase lead and the evidence follow.
