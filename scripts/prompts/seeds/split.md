# Seed: split — inspired by Framer / Stripe

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
