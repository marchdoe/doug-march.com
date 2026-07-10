## Brand Contract

The brand is a fixed mark with constrained variation. It must be recognizable
every single day. It participates in the design without being reinvented by it.

### The mark

- Source: `app/assets/logo.svg` (original colors), `app/assets/logo-mono.svg`
  (single-color variant; inherits `currentColor`).
- The mark's geometry is untouchable. Never redraw, distort, crop, rotate the
  glyph shapes, or substitute another mark.

### Lockup variants (choose exactly one per day)

| id | composition |
|---|---|
| `mark-only-sm` | mark alone, 24–32px |
| `mark-only-md` | mark alone, 40–56px |
| `horizontal-sm` | mark + "Doug March" on one line, mark 20–28px |
| `horizontal-md` | mark + "Doug March" on one line, mark 32–48px |
| `stacked-md` | mark above "Doug March", centered, mark 40–56px |
| `stacked-lg` | mark above "Doug March", centered, mark 64–96px |

The name is always set in the day's display or body face — the wordmark is
typographic, not a fixed image. Orientation (horizontal vs stacked) may follow
the day's nav treatment.

### Color — exactly two modes

1. `original` — the mark's own colors, as authored in `logo.svg`.
2. `single-color` — `logo-mono.svg`, inheriting exactly ONE existing text or
   accent token from today's preset via `currentColor`.

No other treatment is permitted: no gradients over the mark, no per-shape
recolors, no opacity tricks, no outlines. Pick the mode that sits better on
today's palette.

### Declaration and enforcement

- The Art Director declares `brand_lockup` and `brand_color_mode` in the
  `===SHELL===` block.
- The Mockup Designer must execute the declared lockup exactly.
- The Mockup Critic verifies the declared lockup and mode are visible in the
  rendered mockup.
