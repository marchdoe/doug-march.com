# Token Designer Review — 2026-04-16

Scope: improve reliability AND visual quality of the token-designer phase, accounting
for the in-flight "fonts chassis" change that pulls all typography out of this
agent's surface area.

---

## 1. Prompt audit (`scripts/prompts/token-designer.md`)

**The prompt is doing two jobs poorly: token authoring and `__root.tsx`
file-preservation surgery.** After the chassis change, the second job vanishes
entirely. ~70 lines (lines 31-89, 128-130, 145-152) become dead weight or
contradictions the moment the orchestrator owns __root.tsx.

Concrete cuts to make at chassis-merge time:

- **Lines 28, 31-90** — typography rules, `__root.tsx` preservation,
  Google Fonts URL contract, `THEME_INIT_SCRIPT`. Delete entirely. The
  agent should not even know `__root.tsx` exists.
- **Lines 128-130** — external URL restriction. Delete; only relevant when the
  agent writes the Google Fonts link.
- **Lines 145-152** — `import type` for React types. Irrelevant to a file
  that exports a single PandaCSS preset object.
- **Lines 138-143** — fonts/fontSizes circular-reference warning. Delete; if
  the agent doesn't author fonts, it can't create the circular ref.
- **Line 33-37** — collapse "Your Files" to a single bullet: `elements/preset.ts`.
- **Response Format** (156-168) — drop the `===FILE:app/routes/__root.tsx===`
  block. Down to one file.

After cuts, the prompt is ~80 lines. It can probably be ~60.

**What's vague or weak in the surviving content:**

- **Line 5 ("Color Philosophy")** is the best paragraph in the file but
  lonely — it's followed by a generic "color restraint" bullet (line 26) that
  contradicts the vibrancy mandate. "Let one accent color do the work" + "build
  a full shade scale" reads as conservative when the opening sentence promised
  vibrancy. Pick a side. I'd rewrite line 26 as: "One dominant accent at full
  saturation. A second accent only if the brief demands signal contrast (alert,
  status, complementary mood). Neutrals must be tinted toward the accent's
  hue family — never grey."
- **Lines 11-21 archetype table** — "Spacing guidance" column is generic
  ("Tight between lines, generous around sections"). Specimen and Index get
  numeric guidance; the rest don't. Either give all rows numbers or drop
  the spacing column from this table and let `library-layout.md` carry it.
- **Lines 41-43 accessibility** — "Body text color against background must
  meet WCAG AA" is true but un-actionable. The agent is picking from `neutral.50`
  through `neutral.900` for `bg` and `text`; the prompt should say
  "When `bg` is from {50,100,200}, `text` must be from {600,700,800,900}.
  When `bg` is from {700,800,900}, `text` must be from {50,100,200}." That's
  a deterministic check the agent can self-verify before responding.
- **Line 26** also contradicts the new world: it mandates a 50-900 scale "for
  your primary neutral", but library-color.md (loaded into the same prompt)
  also dictates a 9-step scale with specific L/S values. Pick one source of
  truth — I'd cut the duplicate from token-designer.md and let library-color.md own it.

**What's redundant:** lines 91-126 (globalCss token reference syntax) and
lines 134-141 (circular references) duplicate or expand on the same idea —
"reference tokens by name with `{curly.brace}` syntax." Compress to one
canonical example block.

**What to add (positive guidance):**

- An explicit "semantic token contract" — exact list of names downstream
  components require: `bg`, `bgCard`, `bgSubtle`, `text`, `textSecondary`,
  `textMuted`, `border`, `borderStrong`, `accent`, `accentLight`, `accentDark`.
  These are the names already in `elements/preset.ts` and are de facto
  required. The prompt names some of these only obliquely.
- A worked example of a single complete `colors` block in the response style
  the agent is expected to output. Haiku does much better with one good
  example than three abstract rules.
- A self-check the agent must perform before emitting:
  "Before responding, confirm: (a) `accent` differs from `bg` by at least one
  hue family, (b) `text` and `bg` shades pass the contrast pairing rule above,
  (c) every semantic token resolves to a raw token defined in `theme.tokens.colors`."

---

## 2. Code audit (`scripts/design-agents.js`)

**Brittle spots:**

- **Lines 318-345 parser fallback chain** is the source of the
  `build-failed-1776095917955` failure: the model emitted a chatty preamble
  ("I'll start by checking for applicable skills...") and never reached
  `===FILE:`. The parser falls through `===FILE:` → JSON → cleaned JSON →
  brace-extracted JSON, then throws. None of those branches recover from
  preamble text. Cheap fix: before falling through, search for
  `===FILE:` anywhere in the response (not just at line start) and slice from
  there. Cheaper fix: amend the system-prompt postscript at line 297 with
  "Begin your response with `===RATIONALE===`. Any text before that delimiter
  will be discarded." Then the parser can hard-skip preamble.
- **Line 297** — the "no JSON, no markdown code fences" reminder is appended
  to *every* call. After the chassis change you can also append a one-line
  positive instruction: "First line of your response must be `===RATIONALE===`."
  This is the single highest-leverage fix for parse failures.
- **Lines 814-832 fixRootTsx fixup** — DELETE entirely after chassis. The
  whole "best-effort regex surgery on __root.tsx" comment is admitting the
  approach is fragile. Once the orchestrator templates __root.tsx
  deterministically from the chassis, this code path is gone.
- **Lines 803-809 file verification** — `hasRoot` check goes away too.
  The verification becomes `if (!hasPreset) throw...`. Simpler.
- **Lines 845-871 codegen retry** — only one retry, then bail. Reasonable, but
  the retry sends back the *same* prompt with error appended. For codegen
  errors specifically (which are usually one of ~5 known shapes — circular
  refs, undefined token reference, malformed value, missing `definePreset`
  import, invalid condition syntax) it would be worth pattern-matching
  the error and prepending a targeted hint. e.g. if error contains
  "circular reference", prepend "FIX: a semanticToken references itself or
  another semanticToken. Every semanticToken must resolve to a raw
  `theme.tokens.colors.*` value via `{curly.brace}` syntax."
- **Smoke-check failure (`build-failed-1776102588129`)**: "no .css bundles".
  This is downstream of an empty/broken preset that codegen accepted but
  Vite didn't emit CSS for. Codegen success is not a sufficient gate; the
  retry path runs codegen but never validates that `globalCss` actually
  produces output. Worth adding a post-codegen check: `styled-system/styles.css`
  must exist and be > N bytes. If not, treat as a failure and retry with
  "your preset produced no CSS — check that `globalCss` is non-empty and
  uses valid token references."

**Edge cases not handled:**

- Agent emits `===FILE:elements/preset.ts===` twice (e.g. with rationale
  in between). `parseDelimiterResponse` will keep the second one — fine, but
  silent. Worth a warning log.
- Agent returns rationale alone, no files. `hasPreset` is false, throws
  immediately. This is correct behavior but the error message
  ("Token Designer missing required files. Got: ") is unhelpful when the
  list is empty. Include `tokenResult.rationale?.slice(0, 200)` in the error.
- `originalBackup` is restored on failure (line 799), but if the codegen
  retry path fails, line 868 calls `cleanupOrphans` *and then* `restore`.
  These are correct but the call ordering should be commented — easy place
  for someone to break the cleanup contract.

**Simplifications post-chassis:**

- `TOKEN_FILES` constant (`scripts/utils/site-context.js:31-34`) collapses
  from 2 entries to 1. Worth renaming to `PRESET_FILE` (singular).
- `FILE_OWNERSHIP` map (line 45) loses an entry.
- The whole `tokenBackup` filtered restore (lines 850-854) becomes a single
  `originalBackup.get('elements/preset.ts')` lookup.

---

## 3. Design quality recommendations

**Haiku produces beige.** The 04-14 successful preset is olive on stone — a
perfectly safe brown/green palette. Look at the raw colors: `#FAF7F2`,
`#F5EFE6`, `#E8DBC9`. That's the third coffee-shop in a row. The "favor
vibrancy by default" mandate is being ignored because nothing in the prompt
*forces* a deviation when the signals would allow one.

What would help, in priority order:

1. **Inject the day's signals (weather mood, headline mood) directly into
   the color step**, not just into the brief. e.g. "Today's mood is
   `crisp-october-blue`. Your primary hue MUST be in 195-225° unless the
   archetype explicitly contraindicates." The director can compute this
   from signals and pass it as a structured `colorMandate` field.
2. **Forbid the last 3 days' primary hues.** Trivial to compute from
   archived presets. Forces the palette space open. "Recent primaries:
   80° (olive), 25° (terracotta), 35° (amber). Pick a hue >60° away from
   all three." This single change probably doubles the visual variety.
3. **Two worked example palettes in the prompt** — one vibrant, one
   restrained — showing exact hex values, semantic mappings, and a
   one-line rationale. Haiku mirrors examples more reliably than it
   follows abstract rules.
4. **Constrain count, don't just suggest it**: "Output MUST contain
   exactly: 1 neutral scale (10 stops) + 1 accent scale (3-4 stops) +
   optionally 1 secondary accent (2-3 stops, only if the brief justifies
   signal contrast). Total color tokens in [13, 17]." A bounded range
   produces tighter systems than "2-3 colors plus neutrals."
5. **Require a one-sentence "color story"** at the top of the rationale:
   "Bone-white page over deep ink, with a single brass accent for links."
   This forces the agent to commit to a concept before listing hexes.
6. **Spacing scale variety** — currently every preset emits the same Tailwind
   ladder (4/8/12/16/20/24/32...). If the archetype is Specimen or Poster,
   force a more dramatic ratio (4/8/16/32/64/128). If Index, force tighter
   (2/4/8/12/16/24/32). The archetype table on lines 11-21 hints at this
   but doesn't enforce it.

---

## 4. Context-load audit

The token-designer system prompt is currently:
`token-designer.md (168 lines) + library-typography.md (47 lines) + library-color.md (68 lines)`.
After chassis: `token-designer.md (~60 lines) + library-color.md (68 lines)`.

- **`library-typography.md`** — DROP from token-designer load entirely once
  chassis ships. The file is genuinely useful but for the chassis catalog
  authors, not for an agent that no longer touches fonts.
- **`library-color.md`** — KEEP and lean on it harder. It's the single most
  useful piece of context for this agent. The HSL ladder on lines 14-27
  is gold; the prompt should reference it explicitly: "Use the L/S
  values in library-color.md Step 2 as your starting point — adjust for
  the specific hue but stay within ±5L of those targets."
- **`library-layout.md`** and **`library-components.md`** — already not
  loaded for token-designer. Correct. Don't add them.
- **`design-system-reference.md`** — also not loaded for token-designer
  currently (only loaded into unified-designer at line 514). Correct.
  This file is component-API-focused; it would distract here.

Net change: token-designer system prompt drops from ~283 lines to
~128 lines. Roughly 55% smaller. Haiku will follow the remaining
instructions more reliably.

---

## 5. What I'd ship first

Three changes, in priority order:

1. **Force the response to start with `===RATIONALE===`.** One-line addition
   to `callAgent`'s postscript (line 297) and one-line guard in the parser
   (slice from first `===FILE:` or `===RATIONALE===` occurrence, not
   line-start match). Eliminates the entire class of "chatty preamble"
   parse failures (`build-failed-1776095917955`). Lowest risk, biggest
   reliability win.

2. **Inject a `colorMandate` (hue range + forbidden recent hues) from the
   Director into the token-designer brief.** Computed from the archived
   preset history. Token-designer must justify its primary hue against the
   mandate in the rationale. This is the single biggest visual-quality
   lever — it breaks the beige rut without sacrificing coherence.

3. **Trim the prompt to the post-chassis surface area in one PR**: drop
   the typography section, the entire `__root.tsx` preservation block,
   the external URL restriction, the React import-type rule, the
   typography-circular-reference warning, and `library-typography.md`
   from the system prompt. Add the explicit semantic-token contract list
   and the contrast-pairing self-check. Same PR can delete `fixRootTsx`,
   the `hasRoot` check, and the file-2-of-2 logic in dispatch. ~150
   lines of prompt and ~40 lines of JS deleted; surface area for failure
   shrinks proportionally.

The first ships in an afternoon. The second is a half-day if the
archive-reading helper exists. The third is a chassis-merge-day cleanup —
do it in the same PR as the chassis to keep the system in a coherent state.
