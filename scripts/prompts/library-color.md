# Color Reference Library

## Palette Construction

Every palette starts with ONE decision: the primary hue (0-360 on the color wheel). Everything else derives from it.

### Step 1: Choose a primary hue from the brief
- Warm spring → coral (15°), amber (35°), warm green (90°)
- Cool winter → ice blue (200°), slate (220°), violet (270°)
- Energetic → electric blue (210°), hot pink (330°), vivid green (150°)
- Earthy → terracotta (20°), olive (80°), burnt sienna (25°)
- Moody → deep indigo (240°), burgundy (345°), forest (160°)

### Step 2: Build the neutral scale from the hue
Take your primary hue, drop saturation to 5-10%, and build a 9-step scale:
```
50:  very light (L:95, S:5)    — page backgrounds in light mode
100: light (L:90, S:6)         — card backgrounds, subtle fills
200: medium-light (L:80, S:7)  — borders in light mode
300: medium (L:65, S:8)        — disabled text, subtle borders
400: mid (L:50, S:10)          — placeholder text
500: medium-dark (L:35, S:10)  — secondary text
600: dark (L:25, S:8)          — body text in light mode
700: very dark (L:15, S:7)     — headings in light mode
800: near-black (L:8, S:6)     — backgrounds in dark mode
900: black (L:4, S:5)          — deep backgrounds
```

### Step 3: Build the accent (2-4 shades)
Keep the primary hue, high saturation (60-80%), and build 3-4 stops:
```
light:   S:50, L:70  — tinted backgrounds, hover states
DEFAULT: S:70, L:50  — buttons, links, active states
dark:    S:80, L:35  — pressed states, emphasis
glow:    S:60, L:50, A:0.1  — subtle tint overlays
```

### Step 4: Optional secondary accent
Pick a hue 120-180° from your primary (complementary or triadic):
- Primary coral (15°) → secondary teal (180°)
- Primary blue (210°) → secondary amber (35°)
- Primary green (150°) → secondary violet (300°)

Use the secondary accent sparingly — for signal elements, badges, or alerts only.

## Dark Mode vs Light Mode

**Dark mode (default for this site):**
- Background: neutral 800-900
- Text: neutral 50-200
- Cards: neutral 700-800 (slightly lighter than bg)
- Borders: neutral 600 or accent at 10% opacity
- Accent: slightly lighter/more saturated than light mode version

**Light mode:**
- Background: neutral 50 or white
- Text: neutral 600-700
- Cards: white with neutral 200 border
- Accent: slightly darker than dark mode version

## Color Rules

- **Never use pure black (#000) or pure white (#fff).** Always tint toward your hue.
- **Accent at full saturation in only ONE place per viewport.** Everything else is desaturated or at reduced opacity.
- **Text on dark backgrounds: minimum 4.5:1 contrast ratio.** Check: light neutral (L:85+) on dark neutral (L:15-) always passes.
- **Don't use more than 3 distinct hues.** Primary neutral + primary accent + optional secondary accent.
- **Opacity-based variants are fragile.** Prefer solid colors derived from the same hue family.
