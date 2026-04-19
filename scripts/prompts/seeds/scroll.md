# Seed: scroll — inspired by Apple

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
