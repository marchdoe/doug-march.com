# 2026-03-19

**Design Brief:** Obsidian panels barely distinguishable from each other, a single amber ember keeping vigil in the void — the new moon's architecture, holding Fed anxiety on one side and Opening Day optimism on the other, divided by a one-pixel hairline that is the only thing separating now from what comes next.

## Signals

### Weather
**Location:** Aldie, Virginia
**Conditions:** Partly cloudy
**Feel:** undefined

## Claude's Rationale

The palette is built from a single hue decision: 230° indigo-black with suppressed saturation (5–8%), producing surfaces that read as obsidian with latent depth rather than neutral grey. The amber accent at 35° is the precise opposite move — warm, singular, used exactly once per panel to signal either market anxiety (left, amber on the loss percentage) or approaching spring (right, amber on the Opening Day counter). The pairing of Syne at weight 300 with Work Sans at weight 300 keeps both fonts in the same tonal register — light-footed but structurally present — so the hierarchy comes from size and spacing, not weight contrast. This restraint is intentional: the brief asks for engineering-drawing precision, not typographic showmanship.

Dark mode is the base (no condition required) since `base` maps to neutral.900 (#080B15) and the THEME_INIT_SCRIPT adds `.light` or `.dark` to `<html>` — semantic tokens flip on `_light`. The spacing scale covers every value used in the layout spec (4, 8, 12, 16, 24, 32, 40, 48, 64px). Border radius is effectively zero throughout with a 2px token reserved for buttons. No shadows exist in this system — depth comes entirely from the four background value steps, as the Obsidian Assembly reference demands.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
