# Seed: split

Two lanes anchor this archetype: Framer / Stripe (structural corporate tension) and a vibrant gradient-blob split in the spirit of consumer app launches. The pipeline deterministically picks one per day by date hash — the lane below is the only one injected into this prompt.

<!-- LANE:framer-stripe -->
**Lane: Framer / Stripe**

> Source: Framer / Stripe via VoltAgent/awesome-design-md (MIT). Paraphrased from public brand characteristics. Use as anchor reference, not copy target — borrow the rigor and reinterpret it through today's signals and brief.

## Atmosphere
Two halves in tension. One side is bold, saturated, gradient-lit — the other is quiet and structural. A fixed pane meets a scrollable one; identity sits on one side, content flows on the other. The split itself is the design statement.

## Color roles
- bg (left): #0A2540 or #111827 — deep, saturated, gradient-ready
- bg (right): #FFFFFF or #F6F9FC — quiet, structural
- text (on left): #FFFFFF — high contrast
- text (on right): #0A2540 — matches left bg as ink
- accent: #635BFF (Stripe indigo) or #0099FF (Framer blue) — used as gradient stop and on interactive marks
- gradient: linear-gradient(135deg, #635BFF, #00D4FF) — reserved for the bold pane

## Typography
- Display: "Inter" or "Sohne" 600–700, scale ratio 1.5
- Body: "Inter" 400, 16px, line-height 1.5
- Mono: "JetBrains Mono" or "IBM Plex Mono" for code snippets if relevant

## Component cues
- Buttons: pill (radius 24px) on bold side, square (radius 6px) on quiet side — different rules per pane
- Cards: quiet pane uses 1px borders with 12px radius, subtle drop; bold pane uses glass/translucent surfaces
- Nav: split — identity on bold pane, navigation on quiet pane, or vice versa

## Spatial rhythm
50/50 or 40/60 viewport division, often fixed on one side and scrollable on the other. Spacing differs per pane — bold pane uses larger gaps (32, 64, 96), quiet pane uses tighter rhythm (8, 16, 24). Each half has its own internal grid.

## Anti-patterns specific to this style
- DO NOT render a full-width layout — the split is the archetype
- DO NOT mirror styling across both panes — tension requires contrast in type, spacing, or color
- DO NOT use the gradient on both sides — it belongs only on the bold pane
- DO NOT stack the panes vertically on desktop — horizontal split is the identity
- DO NOT use identical card treatments across both panes

## Mobile strategy
Two halves become two stacked sections on mobile. The divider becomes a horizontal rule (or negative space between sections). Asymmetry carries via aspect-ratio difference — the dominant half gets more vertical space. Avoid flipping which half dominates between viewports.
<!-- /LANE -->

<!-- LANE:arc-browser -->
**Lane: Vibrant Gradient-Blob Split**

> Source: consumer app launch pages (Arc Browser and similar) — general genre characteristics of playful gradient-blob marketing pages, not a specific copyrighted layout. Use as anchor reference, not copy target.

## Atmosphere
Playful, saturated, almost toylike confidence — one half is a soft gradient-blob field with rounded organic shapes, the other half is clean functional white space. Feels like a consumer product launch, not enterprise software — the opposite temperament from the Framer/Stripe lane's structural fintech-corporate tension.

## Color roles
- bg (bold half): animated-feeling gradient field — e.g. linear-gradient(135deg, #FF6B9D, #C239B3, #7B2FF7)
- bg (quiet half): #FAFAFA — warm neutral, not stark white
- text (on bold half): #FFFFFF
- text (on quiet half): #17171A
- accent: #FF6B9D — highlight/glow on interactive marks on the quiet side
- border: none on the bold half; 1px #EAEAEA on the quiet half

## Typography
- Display: whatever the chassis provides at 600–700, scale ratio 1.5, rounded/soft numerals if the chassis has them
- Body: 400, 16px, line-height 1.5
- Mono: not used in this lane

## Component cues
- Buttons: fully rounded pill on both sides — bold-side buttons are translucent/glass, quiet-side buttons are solid filled
- Cards: quiet side uses soft-shadow floating cards (12–16px radius); bold side has no cards — organic blob shapes substitute for containers
- Nav: logo mark sits at the seam between the two halves, straddling both

## Spatial rhythm
45/55 split. Blob shapes on the bold side bleed slightly across the seam for tension. Quiet side uses a tight functional grid.

## Anti-patterns specific to this style
- DO NOT use a static flat color on the bold half — it must read as a gradient/blob field, not a color block
- DO NOT use sharp corners anywhere in this lane
- DO NOT make the quiet half feel corporate-cold — keep it warm neutral, not stark white
- DO NOT let the seam be a hard straight line — at least one shape crosses it

## Mobile strategy
The bold half becomes a shorter gradient band at the top (not a full section) with the hero phrase overlaid. The quiet half becomes the scrollable body beneath it — proportion inverts from desktop's 45/55 to roughly 25/75 so content isn't crowded out by the gradient band.
<!-- /LANE -->

## This is one lane

This seed describes ONE strong execution of this archetype — the default
lane, not the only one. If today's signals and brief call for a radically
different take (different palette family, inverted ground, another emotional
register), take it: justify the deviation in your rationale and execute it
with the same precision this seed demands. The anti-patterns above still
apply; the specific colors, faces, and measurements do not bind you.
