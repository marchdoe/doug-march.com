# Signals Brief — 2026-05-12

## Hero Copy
PUT ON THE GLASSES.

## Hero Rationale
Today's 262-point Hacker News story is a "They Live (1988) inspired Adblocker" — the film where a drifter puts on sunglasses and sees the hidden command words buried in every advertisement: OBEY. CONSUME. MARRY AND REPRODUCE. For a portfolio site that redesigns itself daily by reading hidden environmental signals, the phrase is structurally ironic: the design IS the act of putting on the glasses. The command works in three registers simultaneously — film reference, design philosophy ("see what others don't"), and meta-commentary on the AI signal-reading mechanism underneath this page — and it holds all three readings without explanation. The period is a full stop: command, not suggestion.

## Archetype
Poster

## Chassis
big-shoulders-atkinson

## Visual Specification
### 1. Color Specification

**Primary hue:** H:120°, the phosphor green of a monochrome terminal screen. Sits squarely within the mandated 110°–133° window. This is not a coincidence — the They Live aesthetic, old monitor glow, and the permitted hue range all converge at the same frequency.

**Neutral palette** (tinted H:118° for atmospheric cohesion):
- 50: `#EDFCEC`
- 100: `#D1E8D0`
- 200: `#AFCBAE`
- 300: `#89AD88`
- 400: `#648764`
- 500: `#486748`
- 600: `#344E34`
- 700: `#223522`
- 800: `#141E14`
- 900: `#090E09`

**Accent color:**
- light: `#6DD26D`
- default: `#3EC63E`
- dark: `#1E8E1E`
- glow: `rgba(62, 198, 62, 0.28)`

**Secondary accent:** None. One phosphor frequency. Monochrome commitment is the voice.

**Background:**
- Page bg: `#090E09` (near-black terminal void)
- Card bg: `#141E14`
- Sidebar bg: `#0D110D`

**Text colors:**
- Primary: `#EDFCEC` (near-white with green cast)
- Secondary: `#89AD88` (neutral.300, muted sage)
- Muted: `#648764` (neutral.400, dim terminal)

---

### 2. Typography

**Hero phrase rendering:** Two-line composition at Big Shoulders Display (the `display` chassis token):
- Line 1: "PUT ON THE" — `clamp(52px, 7.8vw, 112px)`, color `#D1E8D0` (neutral.100), letter-spacing `0.12em` (ALL-CAPS signage tracking)
- Line 2: "GLASSES." — `clamp(88px, 13.5vw, 194px)`, color `#3EC63E` (green.400, full phosphor), letter-spacing `0.08em`

The two-line stagger creates a setup/punchline structure: the command accumulates on line 1, then "GLASSES." lands in the brand color at twice the scale — the chromatic event is also the syntactic punchline.

Below the two lines, a thin attribution: `— They Live, 1988` at Atkinson Hyperlegible `13px`, color `#648764`, letter-spacing `0.14em` ALL-CAPS.

**Line heights:**
- Hero: `0.88` (tight, stacked signage — the lines sit as one mass)
- Subtext / body: `1.5`
- Signal strip: `1.2`

**Letter spacings:**
- Hero ALL-CAPS (line 1): `0.12em`
- Hero punchline (line 2): `0.08em`
- Body / body labels: `0.01em`
- Signal smallcaps / metadata: `0.14em`

---

### 3. Layout Specification

**Archetype:** Poster. The command phrase occupies the full viewport as a single dominant presence. Nothing competes. Navigation is demoted to the two far corners; a signal strip occupies the bottom edge. The design argument is: you came here, you found the glasses, here is what they say today.

**CSS grid/flex structure:**
```
display: grid;
grid-template-rows: 56px 1fr 48px;
grid-template-columns: 1fr;
min-height: 100vh;
max-width: none;
```
- Row 1: top nav bar (56px)
- Row 2: hero content (flex-grow, vertically centered)
- Row 3: signal strip (48px, fixed to bottom)

**Major dimensions:**
- Hero/featured area: `min-height: calc(100vh - 104px)`, content vertically centered in the cell
- Max content width: `none` — full viewport, no body max-width
- Side padding: `padding-left: 6vw; padding-right: 6vw`
- Hero text block is left-aligned at 6vw from left edge, NOT centered — the mass of condensed type left-anchored reads as signage, not typographic decoration
- Section padding: hero block sits at vertical center (using flexbox `align-items: center`)

**Nav placement:** Top bar, `height: 56px`, full-width, `padding: 0 6vw`. Left side: "DOUG MARCH" in Atkinson Hyperlegible `13px` letter-spacing `0.16em` color `#648764`. Right side: "WORK" and "ABOUT" links in same treatment, hover state switches to `#3EC63E`. No border on nav — the void is the container.

**Hero phrase grid zone:** Rows 2, full column span, left-aligned at 6vw. "PUT ON THE" renders at ~112px on 1440px viewport spanning ~70% of content width. "GLASSES." renders at ~194px spanning ~85% of content width. Total text block height ~280px, centered within the ~740px hero row. The imbalance (line 1 narrower, line 2 wider) creates a rightward lean — the eye is pulled through the text mass.

Below the two lines: 32px gap, then attribution line `— They Live, 1988` in `#648764`.

---

### 4. Component Character

**Border radius:** `0px` throughout — hard terminal edges, zero softness. The grid is a CRT screen.

**Border treatment:** Borderless except for the signal strip top edge: `border-top: 1px solid #223522` (neutral.700). No card borders. No decorative rules.

**Shadow:** None. The terminal aesthetic is flat — depth comes from value contrast, not shadows.

**Density:** Maximum spare. One phrase, two nav labels, one signal strip. Nothing else exists until scroll.

**Interactive states:**
- Nav links: on hover, color shifts from `#648764` → `#3EC63E` with `transition: color 150ms ease`
- Project links (below fold in signal strip): hover shows `text-decoration: underline` in `#3EC63E`
- No button elements above fold

---

### 5. Signal Integration

**Signal strip (bottom band, 48px, `background: #090E09`, `border-top: 1px solid #223522`):**
- Left zone: "TRUIST CHAMPIONSHIP · REITAN −15" in Atkinson Hyperlegible `12px`, `#3EC63E`, letter-spacing `0.12em`
- Center zone: "DET 103 · OPP 112" in `#486748` (muted, loss)
- Right zone: "🌘 13% · SPRING · MAY 12" in `#648764`
- All three zones in the same strip, separated by `·` dividers in `#223522`

**Golf score styling:** Reitan −15 in phosphor green accent — the tournament winner gets the color. All other scores appear in neutral.500 in sub-fold sections.

**The hero phrase AS signal:** The phrase itself IS the signal. "PUT ON THE GLASSES." directly references the They Live adblocker HN story. No other banner or callout needed — the page is the signal.

**Below-fold content (scroll):** After the full-viewport poster, a secondary section holds projects as a sparse index — project name in Big Shoulders Display `32px` green.400, year and category in Atkinson Hyperlegible `13px` neutral.400, separated by 1px neutral.800 hairlines. No cards, no images — the work names read as a terminal directory listing.

**The Kesey Signal (Awwwards):** Acknowledged via the terminal aesthetic throughout — the near-black void, phosphor green, zero chrome — the whole design IS a Kesey Signal tribute without naming it.

## Self-Check
1. Hero quotability: Yes — "PUT ON THE GLASSES." works as a standalone poster line, a film reference, and a design manifesto fragment; someone would screenshot this without needing context.
2. Because-of chain: Yes — the command register of the phrase required Poster (one phrase, full viewport); the signage command scale required big-shoulders-atkinson (condensed, poster-tagged, 1.618 ratio); the They Live / terminal aesthetic required phosphor green H:120° on near-black; the monochrome commitment required zero secondary accent.
3. Render feasibility: Yes — Big Shoulders Display at clamp(88px, 13.5vw, 194px) for "GLASSES." renders at ~194px on 1440×900 with the 8-character word spanning ~82% of usable content width; two lines total ~280px height fitting comfortably in a 740px hero zone.

## Rationale
The hero phrase arrived fully formed from a single Hacker News story: someone built an ad-blocker inspired by John Carpenter's 1988 film They Live, where a pair of sunglasses reveals hidden commands embedded in every surface — OBEY, CONSUME, STAY ASLEEP. For a portfolio site that rebuilds its own design daily by reading environmental signal feeds, the phrase "PUT ON THE GLASSES." carries structural irony at every level: the design is literally produced by reading hidden signals, and the visitor is being invited to see the mechanism. The phrase is quotable in isolation, works as film reference and as design philosophy, and earns its command register without explanation.

The Poster archetype is the only honest container for a command this self-sufficient. A command doesn't need evidence around it — it needs a void large enough to land in. The near-full-viewport hero plants the two-line phrase left-anchored (signage register, not editorial centering), with "PUT ON THE" at ~112px in near-white and "GLASSES." at ~194px in phosphor green. The shift in both scale and color between lines one and two is the design's single compositional event: you read through the setup and arrive at the punch word lit in the one hue that matters. The Big Shoulders Display chassis was mandatory — the condensed signage register of Big Shoulders is exactly the visual language of public notices and warning signs, which is precisely what the They Live aesthetic requires. Atkinson Hyperlegible handles all supporting text (nav, attribution, signal strip) with clinical legibility.

Phosphor green H:120° is a serendipitous alignment: the color mandate's permitted window (110°–133°) happens to be the exact frequency of 1980s monochrome CRT screens — the medium in which hidden messages would first have been "seen." The near-black `#090E09` background tinted subtly toward H:118° means even the void participates in the terminal atmosphere. There is no secondary accent, no warmth, no hedging: one chromatic event, one command, one frequency. The signal strip at the bottom carries Kristoffer Reitan's −15 Truist win in the same phosphor green (the golf score earns the color), while the Pistons loss and lunar data sit in progressively dimmer neutrals. The design reads as: the signal has been received, the glasses are on, here is what they show you today.
