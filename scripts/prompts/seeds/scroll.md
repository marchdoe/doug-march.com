# Seed: scroll

Two lanes anchor this archetype: Apple (near-monochrome cinematic verticality) and a kinetic sport-brand scroll in the spirit of Nike launch pages. The pipeline deterministically picks one per day by date hash — the lane below is the only one injected into this prompt.

<!-- LANE:apple -->
**Lane: Apple**

> Source: Apple via VoltAgent/awesome-design-md (MIT). Paraphrased from public brand characteristics. Use as anchor reference, not copy target — borrow the rigor and reinterpret it through today's signals and brief.

## Atmosphere
Cinematic verticality. Each scroll reveals a full-viewport chapter, one idea per screen. Generous whitespace, photography-first, micro-typography in the margins. Sections breathe. The page feels like a quiet film reel.

## Color roles
- bg: #FBFBFD — near-white, slightly cool
- bg.section: #000000 or #1D1D1F — used for alternating hero sections
- text: #1D1D1F — ink, on light
- text (on dark): #F5F5F7 — on dark sections
- text.mid: #6E6E73 — captions and secondary copy
- accent: #0066CC — link blue, sparse use only
- border: rgba(0,0,0,0.08) — almost invisible

## Typography
- Display: "SF Pro Display" / "Inter Tight" 600–700, scale ratio 1.8, hero sizes 64–96px
- Body: "SF Pro Text" / "Inter" 400, 17px, line-height 1.47
- Mono: rarely; captions only if needed

## Component cues
- Buttons: pill (fully rounded), filled blue or ghost outline, 14–15px, medium weight
- Cards: full-bleed image blocks with centered title + subhead, no borders, no shadows
- Nav: fixed top, translucent blur background (backdrop-filter), condenses on scroll

## Spatial rhythm
Sections are 100vh or taller. Internal padding is generous: 80–160px vertical, 24–48px horizontal. Content centers on a narrow column (max-width ~980px). Scroll feels paced — no dense content blocks back-to-back.

## Anti-patterns specific to this style
- DO NOT render multi-column layouts — each section is one centered column
- DO NOT use serif display type
- DO NOT pack a viewport with more than one headline + one image + one caption
- DO NOT use harsh borders or drop shadows
- DO NOT use saturated color fills — palette stays near-monochrome with rare blue accent

## Mobile strategy
Already fluid by nature. Ensure signal marginalia (weather, scores, quotes) collapses to **inline** captions or small-caps labels, not floating pull-quotes. Don't place marginalia in the margin at 360px — there is no margin. Tuck them between content beats instead.
<!-- /LANE -->

<!-- LANE:nike -->
**Lane: Kinetic Sport Scroll**

> Source: sport-brand launch pages (Nike and similar) — general genre characteristics of kinetic, color-block athletic marketing, not a specific copyrighted layout. Use as anchor reference, not copy target.

## Atmosphere
Kinetic, high-contrast, motion-implied even in static images. Bold saturated color blocks punctuate an otherwise photography-driven vertical scroll — energy over minimalism, but still one idea per section. The opposite temperament from the Apple lane's quiet near-monochrome restraint.

## Color roles
- bg: #000000 primary, alternating with full-bleed saturated color-block sections (e.g. #FF4400 or #FFE600) between photo sections
- text (on black): #FFFFFF
- text (on color block): #000000 or #FFFFFF, whichever contrasts harder
- accent: the saturated color-block hue of the day, used as full section backgrounds, not small marks
- border: none

## Typography
- Display: whatever the chassis provides at 700–900, scale ratio 1.8, tight leading, often italic or slanted to imply motion
- Body: 400–500, 16px, line-height 1.4, frequently uppercase for captions/stats
- Mono: not used in this lane

## Component cues
- Buttons: solid fill, sharp or barely-rounded (4px), bold uppercase label, high contrast
- Cards: full-bleed photo/video blocks with a huge stat overlay (e.g. "26.2 MI") in one corner
- Nav: fixed top, high-contrast, condenses to icon-only on scroll

## Spatial rhythm
Sections are 100vh, alternating hard: photo section → solid-color stat section → photo section, so scroll feels like it's building energy rather than just showing images in sequence.

## Anti-patterns specific to this style
- DO NOT stay monochrome — at least one full-bleed saturated color-block section is required per scroll
- DO NOT use a serif typeface
- DO NOT shrink stat callouts — numbers should be huge and confident, never dainty
- DO NOT use pastel colors — saturation stays high throughout

## Mobile strategy
Color-block stat sections stay full-bleed and full-height (never shrink to a thin strip). Stat numbers scale via `clamp()` but keep their visual dominance — they should never read as smaller than the surrounding body text's weight would suggest.
<!-- /LANE -->

## This is one lane

This seed describes ONE strong execution of this archetype — the default
lane, not the only one. If today's signals and brief call for a radically
different take (different palette family, inverted ground, another emotional
register), take it: justify the deviation in your rationale and execute it
with the same precision this seed demands. The anti-patterns above still
apply; the specific colors, faces, and measurements do not bind you.
