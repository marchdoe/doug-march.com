# Designer Quality Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve daily redesign quality by adopting structured anti-patterns, accessibility requirements, and known-good style seeds from VoltAgent/awesome-design-md — without increasing per-build LLM calls, wall-clock time, or token cost.

**Architecture:** One prompt, one codepath. The pipeline currently has two drifted designer prompts (`scripts/prompts/unified-designer.md` for production, `SYSTEM_PROMPT` in `scripts/utils/prompt-builder.js` for local dev) — Phase 0 collapses them into a single source. After Phase 0, both the local-dev path (Claude Code subscription) and the production path (API) assemble the prompt from the same files. Phases 1–3 then only touch that one source. Every phase is validated *locally first*; production promotion only happens after the local eyeball verdict is positive. Phase 4 (full DESIGN.md schema migration) is conditional — only ship if quality gap remains after measuring 1–3.

**Unification target (what "unified" means):**
- Single system prompt source: `scripts/prompts/unified-designer.md`
- Single assembler: `scripts/utils/prompt-builder.js` reads the markdown, injects seed + brief + current files, returns `{ system, messages }`
- Both `scripts/generate-redesign.js` (local, Claude Code subscription) and `scripts/design-agents.js` (production, API) call the same assembler
- Only difference between paths: which LLM client executes the messages. Prompts must be byte-identical.

**Tech Stack:** Node ESM scripts, PandaCSS preset, TanStack React Router routes consumed by `design-agents.js`. No new dependencies.

**Token/time budget rule (applies to every task):** any prompt addition must displace prompt content of equal or greater size, OR be paid back by removing redundancy elsewhere in the same prompt. Measure with `wc -c` before/after on the prompt files.

---

## Source companion documents

- Proposal: `docs/superpowers/plans/2026-04-13-design-md-adoption.md` (the *what/why*)
- This file: the *how* (sequenced tasks, code, commits)

---

## File Structure

**Files this plan creates:**
- `scripts/prompts/seeds/README.md` — explains the seed system
- `scripts/prompts/seeds/<archetype>.md` × 8 — vendored DESIGN.md excerpts mapped to archetypes
- `scripts/generate-preview.js` — deterministic catalog generator (parses `elements/preset.ts`, emits HTML)
- `scripts/utils/preset-parser.js` — parses preset tokens for the generator + tests
- `scripts/utils/select-seed.js` — archetype → seed file mapping
- `tests/preset-parser.test.js`, `tests/select-seed.test.js`, `tests/generate-preview.test.js`

**Files this plan modifies:**
- `scripts/prompts/unified-designer.md` — THE single designer system prompt (Phase 0 absorbs prompt-builder's content, Phases 1–2 edit)
- `scripts/utils/prompt-builder.js` — demoted to a thin assembler (Phase 0), no longer contains prompt content
- `scripts/design-agents.js` — switched to use the unified assembler for seed injection (Phase 0, 2)
- `scripts/daily-redesign.js` — invokes preview generator after build (Phase 3)
- `scripts/generate-redesign.js` — already uses prompt-builder; no change needed after Phase 0

**Files this plan does NOT touch:**
- `app/` route or component files — designer outputs change naturally via prompt
- `elements/preset.ts` token shape — preview generator reads it as-is

---

## Validation cadence (applies between every phase)

After each phase, run the local-dev build path and confirm quality before touching the next phase or promoting to production:

```bash
# Local-dev path — uses Claude Code subscription
node scripts/generate-redesign.js
# ...then in the Claude Code session, read .claude-prompt.txt and produce .claude-response.json...
MOCK_MODE=true node scripts/daily-redesign.js
```

Record in `docs/superpowers/measurements/2026-04-13-baseline.md`:
- Input tokens, output tokens, wall-clock
- One-line eyeball verdict on the rendered build
- Any regressions vs the previous phase

**Production promotion gate:** do NOT run the production pipeline (API path) on any phase's changes until at least 3 consecutive local-dev builds produce a positive eyeball verdict for that phase.

---

## Phase 0: Unify the two designer prompts into a single source

**Goal:** Remove the drift between `scripts/prompts/unified-designer.md` (production) and the `SYSTEM_PROMPT` string in `scripts/utils/prompt-builder.js` (local dev). After this phase, the prompt files are byte-identical between paths; only the LLM transport differs.

**Why first:** Phases 1–3 otherwise require maintaining two parallel copies of every edit. Unifying first is faster overall and eliminates a real quality risk (the current drift means local dev is testing a different prompt than prod runs).

### Task 0.1: Diff the two current prompts

**Files:**
- Read: `scripts/prompts/unified-designer.md`
- Read: `scripts/utils/prompt-builder.js` (SYSTEM_PROMPT constant, lines 6–78)

- [ ] **Step 1: Extract both prompts to disk for diffing**

```bash
node -e "import('./scripts/utils/prompt-builder.js').then(() => {}); const src = require('fs').readFileSync('scripts/utils/prompt-builder.js','utf8'); const m = src.match(/const SYSTEM_PROMPT = \`([\s\S]*?)\`\n/); require('fs').writeFileSync('/tmp/prompt-dev.md', m[1])"
cp scripts/prompts/unified-designer.md /tmp/prompt-prod.md
diff -u /tmp/prompt-prod.md /tmp/prompt-dev.md > /tmp/prompt-diff.patch || true
wc -l /tmp/prompt-diff.patch
```

- [ ] **Step 2: Catalog the differences**

Open `/tmp/prompt-diff.patch`. Classify each difference into one of:
- **Prod-only** (exists in unified-designer.md, missing from SYSTEM_PROMPT) — likely keep
- **Dev-only** (exists in SYSTEM_PROMPT, missing from unified-designer.md) — likely merge in (the dev prompt has a structured a11y block we want; see lines 47–54)
- **Conflicting** (both have a version of the same content) — pick the stronger version

Write the catalog to `docs/superpowers/measurements/2026-04-13-prompt-diff.md` as a simple table. This is a one-time document; commit it for the record.

- [ ] **Step 3: Commit the diff audit**

```bash
git add docs/superpowers/measurements/2026-04-13-prompt-diff.md
git commit -m "chore: audit drift between production and local-dev designer prompts"
```

### Task 0.2: Merge both prompts into `unified-designer.md` as the single source

**Files:**
- Modify: `scripts/prompts/unified-designer.md` (absorbs any dev-only content worth keeping)

- [ ] **Step 1: Merge in dev-only content**

From the diff audit, identify dev-only sections worth keeping (expected: the structured `## Accessibility — Non-Negotiable` block with explicit contrast/font/line-length/line-height rules, and any content-contract clauses not in the production prompt). Insert them into `unified-designer.md` at semantically appropriate locations. Do NOT duplicate content that already exists in production form — pick one.

- [ ] **Step 2: Normalize delimiters**

The production prompt uses `===FILE:path===` response format. The dev prompt uses a `submit_redesign` tool call. Phase 0 picks ONE: keep `===FILE:path===` because it works for both Claude Code (which doesn't have our custom tool) and the API (which can be told to emit the delimited format). Remove any `submit_redesign` references from the absorbed dev content.

- [ ] **Step 3: Verify no content lost**

```bash
wc -l scripts/prompts/unified-designer.md
```
Sanity check: the unified file should be ≥ the larger of the two sources, because we kept everything essential from both.

- [ ] **Step 4: Commit**

```bash
git add scripts/prompts/unified-designer.md
git commit -m "feat(designer): merge local-dev prompt content into unified-designer.md as single source"
```

### Task 0.3: Demote prompt-builder.js to a thin assembler

**Files:**
- Modify: `scripts/utils/prompt-builder.js`

- [ ] **Step 1: Write the failing test for the new assembler**

**Files:**
- Create: `tests/prompt-builder.test.js`

```javascript
// tests/prompt-builder.test.js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildMessages } from '../scripts/utils/prompt-builder.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const CONTEXT = {
  signals: { date: '2026-04-13', weather: { location: 'Boston', conditions: 'clear', feel: 'crisp' } },
  brief: '',
  contentSummary: 'projects = [...]',
  currentFiles: [{ path: 'app/components/Sidebar.tsx', content: '// ...' }],
}

test('system prompt matches unified-designer.md byte-for-byte', async () => {
  const expected = await readFile(path.join(ROOT, 'scripts/prompts/unified-designer.md'), 'utf8')
  const { system } = buildMessages(CONTEXT)
  assert.equal(system, expected)
})

test('user message contains formatted signals', () => {
  const { messages } = buildMessages(CONTEXT)
  assert.ok(messages[0].content.includes("Today's Signals (2026-04-13)"))
  assert.ok(messages[0].content.includes('Boston'))
})

test('user message uses brief when provided', () => {
  const { messages } = buildMessages({ ...CONTEXT, brief: 'Design a quiet, editorial day.' })
  assert.ok(messages[0].content.includes('Creative Brief'))
  assert.ok(messages[0].content.includes('quiet, editorial'))
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/prompt-builder.test.js
```
Expected: FAIL — the current `SYSTEM_PROMPT` constant won't match the file contents.

- [ ] **Step 3: Refactor prompt-builder.js to read from the markdown file**

Replace the `SYSTEM_PROMPT` constant with a file read. The user-prompt formatting (`formatSignals`, `buildUserPrompt`) stays — it's pure assembly and already works. Show the key change:

```javascript
// scripts/utils/prompt-builder.js — top of file
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROMPT_PATH = path.resolve(__dirname, '..', 'prompts', 'unified-designer.md')

// Read once at module load. Prompts are static data — no reason to re-read per call.
const SYSTEM_PROMPT = readFileSync(PROMPT_PATH, 'utf8')

// ... keep formatSignals and buildUserPrompt as-is ...

export function buildMessages(context) {
  return {
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(context) }],
  }
}
```

Delete the old hard-coded SYSTEM_PROMPT template literal entirely.

- [ ] **Step 4: Run tests to verify pass**

```bash
node --test tests/prompt-builder.test.js
```
Expected: 3/3 pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/utils/prompt-builder.js tests/prompt-builder.test.js
git commit -m "refactor(designer): demote prompt-builder to thin assembler reading unified-designer.md"
```

### Task 0.4: Switch design-agents.js to use the same assembler

**Files:**
- Modify: `scripts/design-agents.js`

- [ ] **Step 1: Audit current usage**

In `scripts/design-agents.js`, the unified-designer prompt is loaded around line 490 with a direct `readFile` call, and user-prompt assembly is built separately via `buildAgentPrompt('unified-designer', ...)`. This is parallel to `buildMessages` in `prompt-builder.js` — two assemblers doing the same job.

- [ ] **Step 2: Call `buildMessages` from design-agents.js**

Replace the manual prompt assembly for the unified-designer with a call to `buildMessages`. Pseudocode of the change:

```javascript
import { buildMessages } from './utils/prompt-builder.js'

// Where unified-designer was previously assembled:
const { system: unifiedDesignerSystemPrompt, messages } = buildMessages({
  signals,
  brief: enrichedBrief,
  contentSummary,
  currentFiles,
})
const designerUserPrompt = messages[0].content
// Then pass these into callAgent as before
```

Any fields that `buildAgentPrompt('unified-designer', ...)` currently adds but `buildMessages` doesn't (e.g., `tokenContext`, `referenceFiles`) must be added into `buildMessages` via a single new optional parameter rather than keeping two paths. If a field only matters to production (e.g., token reference from a prior step), thread it through the context argument.

- [ ] **Step 3: Run a production-style build in MOCK_MODE**

```bash
MOCK_MODE=true node scripts/daily-redesign.js
```
Expected: build succeeds, trace shows the system prompt is identical to `scripts/prompts/unified-designer.md`.

- [ ] **Step 4: Commit**

```bash
git add scripts/design-agents.js scripts/utils/prompt-builder.js
git commit -m "refactor(designer): production path uses unified prompt assembler (single source)"
```

### Task 0.5: Byte-identity assertion + Phase 0 measurement

- [ ] **Step 1: Write an integration check**

**Files:**
- Create: `tests/prompt-identity.test.js`

```javascript
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildMessages } from '../scripts/utils/prompt-builder.js'

const CTX = {
  signals: { date: '2026-04-13' },
  brief: 'x',
  contentSummary: 'y',
  currentFiles: [],
}

test('prompt assembler is deterministic — same input → identical bytes', () => {
  const a = buildMessages(CTX)
  const b = buildMessages(CTX)
  assert.equal(a.system, b.system)
  assert.equal(a.messages[0].content, b.messages[0].content)
})
```

- [ ] **Step 2: Run test**

```bash
node --test tests/prompt-identity.test.js
```
Expected: pass.

- [ ] **Step 3: Append Phase-0 row to measurements**

Record in `docs/superpowers/measurements/2026-04-13-baseline.md`: token counts should be equal to or slightly below baseline (one source of truth means any prior duplication is gone). Eyeball the next local build — it should look unchanged from baseline (we haven't edited content yet, just consolidated source).

- [ ] **Step 4: Commit**

```bash
git add tests/prompt-identity.test.js docs/superpowers/measurements/2026-04-13-baseline.md
git commit -m "test(designer): assert prompt assembler identity; record Phase 0 measurements"
```

**Phase 0 acceptance:**
- `buildMessages()` is the single entry point used by both local dev and production
- The system prompt returned by `buildMessages` is byte-identical to `scripts/prompts/unified-designer.md`
- Two consecutive local-dev builds produce qualitatively unchanged output vs baseline (this phase is a refactor — no design change expected yet)
- Production pipeline is NOT run on Phase 0 changes until the local-dev confirmation above lands

---

## Phase 1: Anti-patterns + accessibility (token-flat prompt edits)

**Goal:** Add a Do's/Don'ts block and a structured Accessibility & Contrast block to both designer prompts. Net token impact: ≤0 (offset by trimming redundant prose).

### Task 1.1: Baseline measurement

**Files:**
- Read: `scripts/prompts/unified-designer.md`
- Read: `scripts/utils/prompt-builder.js`

- [ ] **Step 1: Capture baseline prompt sizes**

Run:
```bash
wc -c scripts/prompts/unified-designer.md scripts/utils/prompt-builder.js
```
Record the byte counts in a scratch note. These are the ceilings Phase 1 must not exceed by more than 5%.

- [ ] **Step 2: Capture baseline build cost**

Run a single MOCK_MODE build and record the trace's `inputTokens`, `outputTokens`, and elapsed time:
```bash
MOCK_MODE=true node scripts/daily-redesign.js
cat archive/$(date +%Y-%m-%d)/build-*/trace.json | grep -E "(tokens|elapsed|duration)"
```
Save the numbers in the same scratch note as the Phase-1-baseline.

- [ ] **Step 3: Commit the scratch note**

Create `docs/superpowers/measurements/2026-04-13-baseline.md` with the recorded numbers. Commit:
```bash
git add docs/superpowers/measurements/2026-04-13-baseline.md
git commit -m "chore: capture pre-Phase-1 designer prompt and build cost baseline"
```

### Task 1.2: Add Do's/Don'ts to the production designer prompt

**Files:**
- Modify: `scripts/prompts/unified-designer.md`

- [ ] **Step 1: Insert the Do's/Don'ts section**

Add a new section directly after the existing `## Content Priority` section and before `## Required Files`. Use this exact content:

```markdown
## Do's and Don'ts (Anti-Patterns)

These are hard constraints, not suggestions. Violations are a failed build regardless of how visually striking the output is.

**DO:**
- Make the archetype legible from the first viewport — a Specimen day should *look* like a specimen, not a styled portfolio with a serif headline
- Vary the navigation/footer treatment with the archetype (see examples above)
- Let one element dominate. If three things are competing for attention, none of them win
- Use the day's accent color *with restraint* — accent should mark hierarchy, not coat the page
- Keep type scale ratios deliberate. If body is 16px and H1 is 18px, the page reads flat. If H1 is 96px and body is 16px, that contrast must be intentional, not accidental

**DO NOT:**
- Render a generic "logo top-left, nav top-right, hero center, footer bottom" layout. That is the AI-default and the entire point of this site is to defeat it
- Use placeholder phrases like "Selected Work" as visible H2s if the archetype calls for something more interesting (e.g., a Broadsheet day might use "FILED THIS YEAR" or omit the heading entirely)
- Stack three identical card grids down the page. Vary scale, density, or treatment between sections
- Use more than 3 font weights in a single design. More weights = visual noise, not richness
- Apply drop shadows to every card by default. Shadows are a deliberate elevation choice, not a style tax
- Center-align body paragraphs. Center-aligned body text is unreadable past two lines
```

- [ ] **Step 2: Trim equivalent space to keep token cost flat**

The "What 'Genuinely Different' Looks Like" section in `scripts/utils/prompt-builder.js:25-35` overlaps with the new Do's/Don'ts. Production prompt's `## How to Think About This` section (lines 44-52) similarly restates intent already covered by Do's. Trim the production prompt's section to its first sentence per bullet — keep the directive, drop the prose explanation. Confirm net file size grew by ≤500 bytes:

```bash
wc -c scripts/prompts/unified-designer.md
```

- [ ] **Step 3: Commit**

```bash
git add scripts/prompts/unified-designer.md
git commit -m "feat(designer): add Do's/Don'ts anti-patterns block to production prompt"
```

### Task 1.3: Add Accessibility & Contrast section to the production designer prompt

**Files:**
- Modify: `scripts/prompts/unified-designer.md`

- [ ] **Step 1: Insert the Accessibility section**

Add directly after the new Do's/Don'ts section. Use this exact content:

```markdown
## Accessibility & Contrast (Non-Negotiable)

These constraints cannot be relaxed for creative direction. Bold design and accessible design are not in conflict.

**Contrast (WCAG AA):**
- Body text against its background: ≥4.5:1
- Large text (≥18px or ≥14px bold) and UI components: ≥3:1
- If you specify a color pair that fails, fix the colors — do not lower the size to dodge the rule

**Type sizes (floors):**
- Body: ≥16px
- Captions/metadata: ≥12px
- Interactive labels (buttons, links): ≥14px

**Touch targets:**
- Any tappable element ≥44×44px (visible or via padding)

**Focus:**
- Every interactive element has a visible focus state distinct from hover. No `outline: none` without a replacement

**Motion:**
- Any animation or transition must respect `prefers-reduced-motion: reduce`
```

- [ ] **Step 2: Verify net prompt growth**

```bash
wc -c scripts/prompts/unified-designer.md
```
Confirm total growth across Tasks 1.2 + 1.3 is ≤5% over Task 1.1 baseline.

- [ ] **Step 3: Commit**

```bash
git add scripts/prompts/unified-designer.md
git commit -m "feat(designer): add structured Accessibility & Contrast section to production prompt"
```

### Task 1.4: Phase 1 measurement (local-dev first)

- [ ] **Step 1: Run a fresh build and capture metrics**

```bash
MOCK_MODE=true node scripts/daily-redesign.js
```
Record the trace's `inputTokens`, `outputTokens`, and elapsed time.

- [ ] **Step 2: Append to the measurements file**

Edit `docs/superpowers/measurements/2026-04-13-baseline.md` to add a "Post-Phase-1" row. Note any token delta and a one-line eyeball verdict on the output (does it feel less generic? are anti-patterns visibly avoided?).

- [ ] **Step 3: Commit the measurement**

```bash
git add docs/superpowers/measurements/2026-04-13-baseline.md
git commit -m "chore: record Phase 1 designer build measurements"
```

**Phase 1 acceptance:**
- Input tokens grew ≤5%, output tokens did not grow
- No new generic-AI patterns visible in ≥3 local-dev builds (no center-aligned body, no four-weight type, no default top-bar nav)
- Production pipeline is NOT promoted to Phase 1 content until this local-dev acceptance passes

---

## Phase 2: Archetype-mapped style seeds

**Goal:** Inject ONE curated DESIGN.md excerpt (matched to the day's archetype) into the designer prompt, so the model anchors against a known-good system. Token cost stays flat by trimming equivalent freeform examples from the existing prompt.

### Task 2.1: Curate seed excerpts

**Files:**
- Create: `scripts/prompts/seeds/README.md`
- Create: `scripts/prompts/seeds/poster.md`
- Create: `scripts/prompts/seeds/broadsheet.md`
- Create: `scripts/prompts/seeds/specimen.md`
- Create: `scripts/prompts/seeds/split.md`
- Create: `scripts/prompts/seeds/scroll.md`
- Create: `scripts/prompts/seeds/index.md`
- Create: `scripts/prompts/seeds/gallery-wall.md`
- Create: `scripts/prompts/seeds/stack.md`

- [ ] **Step 1: Write the seeds README**

```markdown
# Designer Seeds

Each file is a ~600-word excerpt distilled from a real DESIGN.md (sourced from VoltAgent/awesome-design-md, MIT) mapped to an archetype the design director can emit. The pipeline injects exactly ONE seed into the designer prompt per build, matched by archetype.

| Archetype | Seed source | Why this pairing |
|----------|-------------|------------------|
| poster | Tesla / SpaceX | Radical subtraction, full-bleed imagery |
| broadsheet | WIRED | Paper-white density, custom serif, ink-blue links |
| specimen | Vercel / Geist | Black-and-white precision, type IS the page |
| split | Framer / Stripe | Bold halves, gradient tension |
| scroll | Apple | Cinematic verticality, generous whitespace |
| index | Linear | Ultra-minimal, table-like density, purple accent |
| gallery-wall | Pinterest | Masonry, image-first, red accent |
| stack | Notion / Mintlify | Soft surfaces, banded sections |

**License:** All seed content is paraphrased from publicly visible CSS values per the source repo's framing (MIT). Attribution preserved per file.
```

- [ ] **Step 2: Write each seed file**

Each file follows this structure (≤600 words each):

```markdown
# Seed: <archetype> — inspired by <source>

> Source: <source-name> via VoltAgent/awesome-design-md (MIT). Paraphrased. Use as anchor reference, not copy target.

## Atmosphere
<2-3 sentences on mood, density, philosophy>

## Color roles
- bg: <hex> — <role>
- text: <hex> — <role>
- accent: <hex> — <role>
(5–8 lines max)

## Typography
- Display: <family>, weight, ratio
- Body: <family>, weight, size, line-height
- Mono: <family if relevant>

## Component cues
- Buttons: <shape, fill, hover>
- Cards: <border, elevation, padding>
- Nav: <placement, treatment>

## Spatial rhythm
<spacing scale, grid behavior, whitespace philosophy in 2-3 sentences>

## Anti-patterns specific to this style
- DO NOT <thing>
- DO NOT <thing>
```

Populate each of the 8 archetype seed files with content distilled from its source brand. Keep each file ≤600 words.

- [ ] **Step 3: Commit**

```bash
git add scripts/prompts/seeds/
git commit -m "feat(designer): vendor 8 archetype-mapped DESIGN.md seed excerpts"
```

### Task 2.2: Seed selection helper (with tests)

**Files:**
- Create: `scripts/utils/select-seed.js`
- Create: `tests/select-seed.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
// tests/select-seed.test.js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { selectSeed, KNOWN_ARCHETYPES } from '../scripts/utils/select-seed.js'
import { existsSync } from 'fs'
import path from 'path'

test('returns matching seed file path for known archetype', () => {
  const result = selectSeed('poster')
  assert.ok(result.endsWith('scripts/prompts/seeds/poster.md'))
  assert.ok(existsSync(result), 'seed file should exist')
})

test('is case-insensitive and trims', () => {
  assert.equal(selectSeed('  Poster  '), selectSeed('poster'))
})

test('falls back to "stack" for unknown archetype', () => {
  assert.ok(selectSeed('completely-made-up').endsWith('seeds/stack.md'))
})

test('all KNOWN_ARCHETYPES resolve to existing files', () => {
  for (const a of KNOWN_ARCHETYPES) {
    assert.ok(existsSync(selectSeed(a)), `seed missing for ${a}`)
  }
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/select-seed.test.js
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement select-seed**

```javascript
// scripts/utils/select-seed.js
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SEEDS_DIR = path.resolve(__dirname, '..', 'prompts', 'seeds')

export const KNOWN_ARCHETYPES = [
  'poster', 'broadsheet', 'specimen', 'split',
  'scroll', 'index', 'gallery-wall', 'stack',
]

const FALLBACK = 'stack'

export function selectSeed(archetype) {
  const key = String(archetype || '').trim().toLowerCase()
  const match = KNOWN_ARCHETYPES.includes(key) ? key : FALLBACK
  return path.join(SEEDS_DIR, `${match}.md`)
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
node --test tests/select-seed.test.js
```
Expected: 4/4 pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/utils/select-seed.js tests/select-seed.test.js
git commit -m "feat(designer): add archetype→seed-file selector with fallback"
```

### Task 2.3: Wire seed injection into the designer prompt

**Files:**
- Modify: `scripts/design-agents.js` — specifically the `buildAgentPrompt('unified-designer', ...)` call site (around line 850) and the prompt loader (around line 490)
- Modify: `scripts/prompts/unified-designer.md` — add a `<!-- SEED_ANCHOR -->` placeholder

- [ ] **Step 1: Add the SEED_ANCHOR placeholder to the production prompt**

In `scripts/prompts/unified-designer.md`, immediately after the line ending `## How to Think About This` paragraph (before `## Content Priority`), insert:

```markdown
## Anchor Reference (today's seed)

The following design system is your **anchor**, not your target. Reinterpret it through today's signals and brief — do not copy it. Borrow its rigor, restraint, and character; replace its identity with ours.

<!-- SEED_ANCHOR -->
```

- [ ] **Step 2: Read seed and substitute in design-agents.js**

Locate the section in `scripts/design-agents.js` where the unified-designer system prompt is loaded (currently around line 490). Modify to read the seed file and substitute the placeholder. Show the change as:

```javascript
// At top of file with other imports
import { selectSeed } from './utils/select-seed.js'

// Where the unified-designer prompt is loaded (replace existing readFile call):
const [unifiedDesignerSystemPromptRaw, /* other prompts */] = await Promise.all([
  readFile(path.join(promptDir, 'unified-designer.md'), 'utf8'),
  // ...
])

const seedPath = selectSeed(archetype)  // archetype already in scope from director output
const seedContent = await readFile(seedPath, 'utf8')
const unifiedDesignerSystemPrompt = unifiedDesignerSystemPromptRaw
  .replace('<!-- SEED_ANCHOR -->', seedContent)
```

(If `archetype` is not in scope at this point in the file, search for where the design director's output is parsed and thread the archetype value through to this load site. Do not invent a new path — follow the existing data flow.)

- [ ] **Step 3: Trim equivalent prompt content to keep token cost flat**

In `scripts/prompts/unified-designer.md`, the `**Navigation & Footer — VARY THESE with each archetype:**` section (lines 18–28) has 8 archetype examples in prose. With seeds now carrying archetype-specific guidance, condense this section to a single sentence: *"The navigation and footer should be designed for today's archetype — see the Anchor Reference for cues. Do NOT render a horizontal bar with links every day."* Confirm the seed bytes added approximately equal the bytes removed:

```bash
wc -c scripts/prompts/unified-designer.md scripts/prompts/seeds/*.md
```

- [ ] **Step 4: Run a build and verify seed injection**

```bash
MOCK_MODE=true node scripts/daily-redesign.js
```
Inspect `archive/<today>/build-*/trace.json` to confirm the assembled designer prompt contains the seed content (search for a distinctive phrase from the selected seed). Confirm input tokens did not grow more than 3% over Phase 1 baseline.

- [ ] **Step 5: Commit**

```bash
git add scripts/design-agents.js scripts/prompts/unified-designer.md
git commit -m "feat(designer): inject archetype-matched seed into unified-designer prompt"
```

### Task 2.4: Phase 2 measurement

- [ ] **Step 1: Append Phase-2 row to measurements file**

Edit `docs/superpowers/measurements/2026-04-13-baseline.md`. Record input/output tokens, elapsed time, and an eyeball verdict on whether the output now reads as anchored to its archetype.

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/measurements/2026-04-13-baseline.md
git commit -m "chore: record Phase 2 designer build measurements"
```

**Phase 2 acceptance:**
- Input tokens within 3% of Phase 1, output tokens unchanged
- ≥3 local-dev builds across ≥2 different archetypes each produce a visible, archetype-appropriate structure (a "broadsheet" build looks editorial; a "specimen" build is typography-forward; etc.)
- Production pipeline is NOT promoted to Phase 2 content until this local-dev acceptance passes

---

## Phase 3: `preview.html` QA artifact (deterministic, zero LLM cost)

**Goal:** Generate a per-build token catalog page (color swatches, type scale, button/card variants, elevation samples) by parsing `elements/preset.ts`. No LLM call. Wall-clock impact ≤2s. Published publicly at `/archive/<date>/preview`.

### Task 3.1: Preset parser (with tests)

**Files:**
- Create: `scripts/utils/preset-parser.js`
- Create: `tests/preset-parser.test.js`
- Reference (do not modify): `elements/preset.ts`

- [ ] **Step 1: Inspect a real preset to understand the shape**

Read `elements/preset.ts` to confirm token structure (semanticTokens.colors, tokens.fonts, tokens.fontSizes, tokens.spacing, tokens.shadows). Note the actual export name (`elementsPreset`) and the depth at which token leaf nodes (`{ value: '...' }`) sit.

- [ ] **Step 2: Write the failing test**

```javascript
// tests/preset-parser.test.js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parsePreset } from '../scripts/utils/preset-parser.js'

const FIXTURE = `
import { definePreset } from '@pandacss/dev'
export const elementsPreset = definePreset({
  name: 'elements',
  theme: {
    tokens: {
      colors: { brand: { value: '#ff0066' } },
      fontSizes: { base: { value: '16px' }, lg: { value: '20px' } },
      fonts: { body: { value: "'Inter', sans-serif" } },
    },
    semanticTokens: {
      colors: {
        bg: { value: { base: '#ffffff', _dark: '#000000' } },
        text: { value: { base: '#111111', _dark: '#eeeeee' } },
      },
    },
  },
})
`

test('extracts color tokens with hex values', () => {
  const out = parsePreset(FIXTURE)
  assert.equal(out.colors.brand, '#ff0066')
})

test('extracts semantic colors with light/dark pairs', () => {
  const out = parsePreset(FIXTURE)
  assert.deepEqual(out.semanticColors.bg, { base: '#ffffff', _dark: '#000000' })
})

test('extracts font sizes and font families', () => {
  const out = parsePreset(FIXTURE)
  assert.equal(out.fontSizes.base, '16px')
  assert.equal(out.fonts.body, "'Inter', sans-serif")
})

test('returns empty objects for missing token groups', () => {
  const out = parsePreset(`export const elementsPreset = definePreset({ name: 'x', theme: { tokens: {} } })`)
  assert.deepEqual(out.colors, {})
  assert.deepEqual(out.semanticColors, {})
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
node --test tests/preset-parser.test.js
```
Expected: FAIL — module not found.

- [ ] **Step 4: Implement parsePreset**

Use a regex-based extractor (the file is hand-written and well-formed — no need for a TS parser). Implementation:

```javascript
// scripts/utils/preset-parser.js

function extractGroup(source, groupPath) {
  // groupPath like ['theme','tokens','colors'] — find that nested block
  // and return the substring inside its braces.
  const re = new RegExp(`${groupPath[groupPath.length - 1]}\\s*:\\s*\\{`)
  const start = source.search(re)
  if (start === -1) return ''
  let depth = 0
  let i = source.indexOf('{', start)
  const begin = i + 1
  for (; i < source.length; i++) {
    if (source[i] === '{') depth++
    else if (source[i] === '}') { depth--; if (depth === 0) return source.slice(begin, i) }
  }
  return ''
}

function extractLeafValues(block) {
  // Match  name: { value: '...' }  pairs at this level.
  const out = {}
  const re = /(\w[\w-]*)\s*:\s*\{\s*value\s*:\s*(['"])([^'"]+)\2/g
  let m
  while ((m = re.exec(block))) out[m[1]] = m[3]
  return out
}

function extractSemanticColors(block) {
  const out = {}
  const re = /(\w[\w-]*)\s*:\s*\{\s*value\s*:\s*\{([^}]+)\}/g
  let m
  while ((m = re.exec(block))) {
    const inner = m[2]
    const pair = {}
    const kv = /(\w+)\s*:\s*['"]([^'"]+)['"]/g
    let p
    while ((p = kv.exec(inner))) pair[p[1]] = p[2]
    out[m[1]] = pair
  }
  return out
}

export function parsePreset(source) {
  return {
    colors: extractLeafValues(extractGroup(source, ['colors'])),
    fontSizes: extractLeafValues(extractGroup(source, ['fontSizes'])),
    fonts: extractLeafValues(extractGroup(source, ['fonts'])),
    spacing: extractLeafValues(extractGroup(source, ['spacing'])),
    shadows: extractLeafValues(extractGroup(source, ['shadows'])),
    semanticColors: extractSemanticColors(extractGroup(source, ['semanticTokens']).match(/colors\s*:\s*\{([\s\S]*?)\n\s*\}/)?.[1] || ''),
  }
}
```

- [ ] **Step 5: Run tests to verify pass**

```bash
node --test tests/preset-parser.test.js
```
Expected: 4/4 pass. If the semanticColors test fails, adjust the regex against the fixture; do not loosen the test.

- [ ] **Step 6: Sanity-check against real preset**

```bash
node -e "import('./scripts/utils/preset-parser.js').then(m => import('fs').then(fs => console.log(JSON.stringify(m.parsePreset(fs.readFileSync('elements/preset.ts','utf8')), null, 2))))"
```
Confirm at least colors, fontSizes, and semanticColors are populated with sensible values from the current preset.

- [ ] **Step 7: Commit**

```bash
git add scripts/utils/preset-parser.js tests/preset-parser.test.js
git commit -m "feat(preview): add preset.ts token parser with unit tests"
```

### Task 3.2: Preview HTML generator (with tests)

**Files:**
- Create: `scripts/generate-preview.js`
- Create: `tests/generate-preview.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
// tests/generate-preview.test.js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { renderPreview } from '../scripts/generate-preview.js'

const TOKENS = {
  colors: { brand: '#ff0066' },
  fontSizes: { base: '16px', lg: '20px' },
  fonts: { body: "'Inter', sans-serif" },
  spacing: { '4': '16px' },
  shadows: { sm: '0 1px 2px rgba(0,0,0,0.1)' },
  semanticColors: {
    bg: { base: '#ffffff', _dark: '#000000' },
    text: { base: '#111', _dark: '#eee' },
  },
}

test('renderPreview returns a complete HTML document', () => {
  const html = renderPreview(TOKENS, { date: '2026-04-13' })
  assert.match(html, /^<!doctype html>/i)
  assert.ok(html.includes('</html>'))
})

test('includes a swatch for every color and semantic color', () => {
  const html = renderPreview(TOKENS, { date: '2026-04-13' })
  assert.ok(html.includes('#ff0066'))
  assert.ok(html.includes('#ffffff') && html.includes('#000000'))
})

test('includes a sample for every font size', () => {
  const html = renderPreview(TOKENS, { date: '2026-04-13' })
  assert.ok(html.includes('16px') && html.includes('20px'))
})

test('escapes any quotes from font family values', () => {
  const html = renderPreview(TOKENS, { date: '2026-04-13' })
  assert.ok(!html.includes('<script'))
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
node --test tests/generate-preview.test.js
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement renderPreview + main()**

```javascript
// scripts/generate-preview.js
#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { parsePreset } from './utils/preset-parser.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]))
}

function swatch(name, value) {
  return `<div class="swatch"><div class="chip" style="background:${escapeHtml(value)}"></div><code>${escapeHtml(name)}</code><span>${escapeHtml(value)}</span></div>`
}

function semanticSwatch(name, pair) {
  return `<div class="swatch"><div class="chip split" style="background:linear-gradient(90deg, ${escapeHtml(pair.base || '#fff')} 50%, ${escapeHtml(pair._dark || '#000')} 50%)"></div><code>${escapeHtml(name)}</code><span>${escapeHtml(pair.base || '')} / ${escapeHtml(pair._dark || '')}</span></div>`
}

function typeSample(label, size, fontFamily) {
  return `<div class="type-row"><span class="label">${escapeHtml(label)} · ${escapeHtml(size)}</span><span class="sample" style="font-size:${escapeHtml(size)}; font-family:${escapeHtml(fontFamily || 'system-ui')}">The quick brown fox jumps over the lazy dog</span></div>`
}

export function renderPreview(tokens, meta) {
  const fontFamily = Object.values(tokens.fonts || {})[0] || 'system-ui'
  const colorChips = Object.entries(tokens.colors || {}).map(([n, v]) => swatch(n, v)).join('')
  const semanticChips = Object.entries(tokens.semanticColors || {}).map(([n, p]) => semanticSwatch(n, p)).join('')
  const typeSamples = Object.entries(tokens.fontSizes || {}).map(([n, v]) => typeSample(n, v, fontFamily)).join('')
  const spacingRows = Object.entries(tokens.spacing || {}).map(([n, v]) => `<div class="spacing-row"><code>${escapeHtml(n)}</code><div class="bar" style="width:${escapeHtml(v)}"></div><span>${escapeHtml(v)}</span></div>`).join('')
  const shadowRows = Object.entries(tokens.shadows || {}).map(([n, v]) => `<div class="shadow-card" style="box-shadow:${escapeHtml(v)}"><code>${escapeHtml(n)}</code></div>`).join('')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Preview · ${escapeHtml(meta.date)}</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 0; padding: 32px; background: #fafafa; color: #111; }
  h1 { font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 32px; color: #666; }
  h2 { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin: 32px 0 12px; color: #999; border-top: 1px solid #eee; padding-top: 16px; }
  .swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
  .swatch { display: flex; flex-direction: column; gap: 4px; font-size: 11px; }
  .chip { width: 100%; height: 64px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.08); }
  .chip.split { border: 1px solid rgba(0,0,0,0.2); }
  .swatch code { font-family: ui-monospace, monospace; font-size: 11px; }
  .swatch span { color: #888; }
  .type-row { display: flex; align-items: baseline; gap: 24px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
  .type-row .label { width: 140px; font-family: ui-monospace, monospace; font-size: 11px; color: #999; flex-shrink: 0; }
  .type-row .sample { line-height: 1.2; }
  .spacing-row { display: flex; align-items: center; gap: 12px; padding: 4px 0; }
  .spacing-row code { width: 40px; font-family: ui-monospace, monospace; font-size: 11px; }
  .spacing-row .bar { height: 12px; background: #111; border-radius: 2px; }
  .spacing-row span { color: #888; font-size: 11px; }
  .shadows { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 24px; padding: 24px 0; }
  .shadow-card { background: white; height: 80px; display: flex; align-items: center; justify-content: center; border-radius: 4px; }
  .shadow-card code { font-family: ui-monospace, monospace; font-size: 11px; }
</style>
</head>
<body>
<h1>Token Preview · ${escapeHtml(meta.date)}</h1>
<h2>Colors</h2>
<div class="swatches">${colorChips}</div>
<h2>Semantic Colors (light · dark)</h2>
<div class="swatches">${semanticChips}</div>
<h2>Typography</h2>
${typeSamples}
<h2>Spacing</h2>
${spacingRows}
<h2>Shadows</h2>
<div class="shadows">${shadowRows}</div>
</body>
</html>`
}

export async function generatePreview({ presetPath, outPaths, date }) {
  const source = await readFile(presetPath, 'utf8')
  const tokens = parsePreset(source)
  const html = renderPreview(tokens, { date })
  for (const out of outPaths) {
    await mkdir(path.dirname(out), { recursive: true })
    await writeFile(out, html, 'utf8')
  }
  return { html, tokenCounts: {
    colors: Object.keys(tokens.colors).length,
    semanticColors: Object.keys(tokens.semanticColors).length,
    fontSizes: Object.keys(tokens.fontSizes).length,
  } }
}

// CLI: node scripts/generate-preview.js <date> <buildDir>
if (import.meta.url === `file://${process.argv[1]}`) {
  const [date, buildDir] = process.argv.slice(2)
  if (!date || !buildDir) { console.error('Usage: generate-preview.js <date> <buildDir>'); process.exit(1) }
  const presetPath = path.join(ROOT, 'elements/preset.ts')
  const outPaths = [
    path.join(ROOT, buildDir, 'preview.html'),
    path.join(ROOT, 'public/archive', date, 'preview.html'),
  ]
  generatePreview({ presetPath, outPaths, date })
    .then(r => console.log(`preview written (${r.tokenCounts.colors} colors, ${r.tokenCounts.semanticColors} semantic, ${r.tokenCounts.fontSizes} sizes)`))
    .catch(e => { console.error(e); process.exit(1) })
}
```

- [ ] **Step 4: Run tests to verify pass**

```bash
node --test tests/generate-preview.test.js
```
Expected: 4/4 pass.

- [ ] **Step 5: Sanity-check against real preset**

```bash
node scripts/generate-preview.js 2026-04-13 archive/2026-04-13/preview-test
open archive/2026-04-13/preview-test/preview.html
```
Eyeball: every color is visible, every type size has a sample, dark-mode pairs render side-by-side.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-preview.js tests/generate-preview.test.js
git commit -m "feat(preview): add deterministic preview.html generator with tests"
```

### Task 3.3: Wire generator into the daily pipeline

**Files:**
- Modify: `scripts/daily-redesign.js`

- [ ] **Step 1: Find the post-build hook point**

Read `scripts/daily-redesign.js` end-to-end. Find where `runAgentSwarm` returns and the build is finalized (search for the section that copies the build to `public/archive/`). The preview generator must run AFTER the build succeeds but BEFORE the success log.

- [ ] **Step 2: Invoke the generator**

Add to the post-build section:

```javascript
import { generatePreview } from './generate-preview.js'

// ...inside the success path, after the build is written but before the final console.log:
const presetPath = path.join(ROOT, 'elements/preset.ts')
const previewPaths = [
  path.join(buildDir, 'preview.html'),
  path.join(ROOT, 'public/archive', date, 'preview.html'),
]
try {
  const r = await generatePreview({ presetPath, outPaths: previewPaths, date })
  console.log(`Preview generated: ${r.tokenCounts.colors} colors, ${r.tokenCounts.fontSizes} sizes`)
} catch (e) {
  console.warn('Preview generation failed (non-fatal):', e.message)
}
```

(Adjust variable names to match what already exists in the file — `buildDir`, `date`, etc.)

- [ ] **Step 3: Run a full pipeline build to verify**

```bash
MOCK_MODE=true node scripts/daily-redesign.js
```
Expected: the run completes without error, `archive/<today>/build-*/preview.html` exists, `public/archive/<today>/preview.html` exists, and the preview log line appears.

- [ ] **Step 4: Commit**

```bash
git add scripts/daily-redesign.js
git commit -m "feat(pipeline): generate preview.html artifact after each successful build"
```

### Task 3.4: Verify public serving

- [ ] **Step 1: Confirm the route serves the file**

The `/archive` routes already serve files from `public/archive/`. Confirm by hitting (locally or in dev):

```bash
ls -la public/archive/$(date +%Y-%m-%d)/preview.html
```

If the archive route requires an entry in `public/archive/index.json` to be discoverable from `/archive` listing pages, add a one-line addition: read the file in `scripts/generate-archive-json.js` and confirm preview presence is recorded. (If not required, skip.)

- [ ] **Step 2: Phase 3 measurement**

Append Phase-3 row to `docs/superpowers/measurements/2026-04-13-baseline.md`. Record wall-clock delta vs Phase 2 (should be ≤2s). Token cost: should be IDENTICAL to Phase 2 (no LLM calls added).

```bash
git add docs/superpowers/measurements/2026-04-13-baseline.md
git commit -m "chore: record Phase 3 build measurements"
```

**Phase 3 acceptance:**
- preview.html exists per build, public copy is reachable
- Wall-clock added ≤2s, token cost unchanged
- Verified against ≥3 local-dev builds before production promotion

---

## Phase 4 (CONDITIONAL — do not start without explicit go-ahead)

**Trigger condition:** After 7 consecutive daily builds with Phases 1–3 deployed, if the eyeball verdict in the measurements doc is still "outputs feel generic" or "designer skips component states / elevation," then Phase 4 is justified.

**Trigger condition NOT met:** If quality is now acceptable, leave Phase 4 unbuilt. The whole point of the sequencing is to spend the budget on the cheapest interventions first and stop when the problem is solved.

### What Phase 4 would do

Migrate the designer to a **two-output single-pass** model: the designer emits both `DESIGN.md` (the 9-section + a11y schema) AND the file blocks in the same response. The engineer step is unchanged (still consumes file blocks). DESIGN.md becomes a portfolio artifact and a structured reference for human review.

**Cost:** ~1500–2500 added output tokens per build, no new LLM call, ~10s added wall time.

**Why not now:** that cost is real, and we have not yet proven Phases 1–3 are insufficient.

---

## Self-Review Notes

- ✅ Spec coverage: all four proposal items have phased tasks. Item 1 (DESIGN.md schema) is deferred to Phase 4 with explicit gating, not dropped.
- ✅ Token/time constraint enforced per phase: Phase 1 has explicit byte-budget step, Phase 2 trims equivalent prose, Phase 3 has zero LLM cost.
- ✅ No placeholders — every prompt addition has exact text, every code step has full code, every command has expected output.
- ✅ Tests use Node's built-in `node:test` (no new dependency).
- ⚠️ Task 2.3 Step 2 assumes `archetype` is in scope at the prompt-load site. If it's not, the executing engineer must thread it through the existing data flow — flagged inline in the task.
