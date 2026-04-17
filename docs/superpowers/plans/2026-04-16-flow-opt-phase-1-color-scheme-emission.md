# Flow Optimization — Phase 1: Color Scheme Emission Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Token Designer emits a structured `===COLOR_SCHEME===` block; the pipeline parses it, archives it per build, and runs warn-only validation (color-vs-preset consistency, coffee-shop detector).

**Architecture:** Extend the existing delimiter parser in `scripts/design-agents.js` to extract a new COLOR_SCHEME block as JSON. Add archive step to write `color-scheme.json` alongside `preset.ts`. Create `scripts/utils/color-validation.js` with pure helper functions. Wire validation calls into the pipeline after the Token Designer phase — warnings only, no hard-fails.

**Tech Stack:** Node.js ESM, Vitest, PandaCSS archive format (unchanged).

**Related:** `docs/superpowers/specs/2026-04-16-flow-optimization-design.md`

---

## File Structure

**New files:**
- `scripts/utils/color-validation.js` — pure helpers: `detectCoffeeShopPalette(scheme)`, `validateSchemeAgainstPreset(scheme, presetSrc)`, `hexToHsl(hex)`
- `tests/utils/color-validation.test.js` — unit tests for the helpers above
- `tests/scripts/design-agents-color-scheme.test.js` — parser extension tests + integration tests for archive write

**Modified files:**
- `scripts/design-agents.js` — extend `parseDelimiterResponse` to extract `color_scheme`; after Token Designer call, parse & persist scheme, run validation, log warnings
- `scripts/prompts/token-designer.md` — add COLOR_SCHEME block to Response Format; add two worked example schemes (one vibrant, one restrained)
- `scripts/utils/archiver.js` — extend `archive()` signature to accept optional `colorScheme` object; write `color-scheme.json` when present
- `tests/scripts/design-agents.test.js` — existing file, will get additional parser tests appended

---

## Task 1: Extend parseDelimiterResponse to extract COLOR_SCHEME

**Files:**
- Modify: `scripts/design-agents.js` (around line 191, the `parseDelimiterResponse` function)
- Test: `tests/scripts/design-agents-color-scheme.test.js` (new file)

- [ ] **Step 1: Write the failing test**

Create `tests/scripts/design-agents-color-scheme.test.js`:

```javascript
import { describe, it, expect } from 'vitest'
import { parseDelimiterResponse } from '../../scripts/design-agents.js'

describe('parseDelimiterResponse — COLOR_SCHEME block', () => {
  it('extracts a well-formed COLOR_SCHEME JSON block', () => {
    const response = `===RATIONALE===
Ocean blue for clarity.

===DESIGN_BRIEF===
Crisp winter morning on the coast.

===COLOR_SCHEME===
{
  "primary_hue": { "h": 215, "s": 70, "l": 50, "name": "ocean blue" },
  "secondary_accent": null,
  "neutral_family": { "tinted_toward": "blue", "name": "slate" },
  "mood_word": "crisp",
  "color_story": "Winter clarity — slate neutrals, ocean accent for emphasis."
}

===FILE:elements/preset.ts===
export const elementsPreset = {}
`
    const parsed = parseDelimiterResponse(response)
    expect(parsed.color_scheme).toBeDefined()
    expect(parsed.color_scheme.primary_hue.h).toBe(215)
    expect(parsed.color_scheme.mood_word).toBe('crisp')
    expect(parsed.color_scheme.secondary_accent).toBeNull()
  })

  it('returns color_scheme as undefined when block is missing', () => {
    const response = `===RATIONALE===
no scheme
===FILE:elements/preset.ts===
x
`
    const parsed = parseDelimiterResponse(response)
    expect(parsed.color_scheme).toBeUndefined()
  })

  it('returns color_scheme as null-sentinel when block is present but JSON is malformed', () => {
    const response = `===RATIONALE===
x
===COLOR_SCHEME===
{ this is not valid json
===FILE:elements/preset.ts===
x
`
    const parsed = parseDelimiterResponse(response)
    // When present but unparseable, we return an explicit parse-error marker
    // so callers can distinguish "agent didn't emit" from "agent emitted garbage"
    expect(parsed.color_scheme).toEqual({ __parse_error: true, raw: expect.any(String) })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/scripts/design-agents-color-scheme.test.js -t "COLOR_SCHEME block"`
Expected: FAIL — `color_scheme` is undefined because the parser doesn't yet extract it.

- [ ] **Step 3: Implement the parser extension**

In `scripts/design-agents.js`, modify the `parseDelimiterResponse` function. After the `design_brief` extraction block (~line 214), add:

```javascript
  let color_scheme
  const schemeMatch = withSentinel.match(/^===COLOR_SCHEME===\s*\n([\s\S]*?)(?=^===)/m)
  if (schemeMatch) {
    const raw = schemeMatch[1].trim()
    try {
      color_scheme = JSON.parse(raw)
    } catch {
      color_scheme = { __parse_error: true, raw }
    }
  }

  // Also update the filePattern lookahead so COLOR_SCHEME is a terminator:
```

Update the `filePattern` regex on line ~197 to include COLOR_SCHEME as a lookahead terminator:

```javascript
  const filePattern = /^===FILE:([^=\n]+)===\s*\n([\s\S]*?)(?=^===FILE:|^===RATIONALE===|^===DESIGN_BRIEF===|^===COLOR_SCHEME===|^===END_SENTINEL===)/gm
```

Update the `return` statement:

```javascript
  return { files, rationale, design_brief, color_scheme }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/scripts/design-agents-color-scheme.test.js -t "COLOR_SCHEME block"`
Expected: PASS (3 tests)

- [ ] **Step 5: Run full test suite to ensure no regressions**

Run: `pnpm vitest run`
Expected: PASS 223/223 (was 220/220, +3 from this task)

- [ ] **Step 6: Commit**

```bash
git add scripts/design-agents.js tests/scripts/design-agents-color-scheme.test.js
git commit -m "feat(pipeline): parse ===COLOR_SCHEME=== block from Token Designer output"
```

---

## Task 2: Update Token Designer prompt to emit COLOR_SCHEME

**Files:**
- Modify: `scripts/prompts/token-designer.md`

- [ ] **Step 1: Add COLOR_SCHEME block to the Response Format section**

In `scripts/prompts/token-designer.md`, find the "Response Format" section near the bottom (~line 101). Replace the entire section with:

```markdown
## Response Format

Respond using this exact delimiter format. Write the COMPLETE file contents after each ===FILE:path=== marker. No JSON wrapping on the file content, no code fences — just the delimiters and raw file content.

===RATIONALE===
1-2 paragraphs explaining your creative choices

===DESIGN_BRIEF===
One evocative sentence for the archive

===COLOR_SCHEME===
{
  "primary_hue": { "h": <0-360>, "s": <0-100>, "l": <0-100>, "name": "<short name>" },
  "secondary_accent": null | { "h": ..., "s": ..., "l": ..., "name": "..." },
  "neutral_family": { "tinted_toward": "<hue family>", "name": "<short name>" },
  "mood_word": "<single word>",
  "color_story": "<one sentence>"
}

===FILE:elements/preset.ts===
...full file content here (no fonts, no fontSizes)...
```

- [ ] **Step 2: Add two worked example color schemes at end of prompt**

Append to `scripts/prompts/token-designer.md`:

```markdown

## Worked Example Color Schemes

Two reference examples showing the quality and specificity expected in the `===COLOR_SCHEME===` block. Pick the one closer to the day's mood; adapt — don't copy.

**Example A — Vibrant (for an energetic or celebratory brief):**

```json
{
  "primary_hue": { "h": 345, "s": 80, "l": 55, "name": "hot magenta" },
  "secondary_accent": { "h": 50, "s": 90, "l": 60, "name": "citrus yellow" },
  "neutral_family": { "tinted_toward": "magenta", "name": "rosewood" },
  "mood_word": "kinetic",
  "color_story": "Magenta demanding attention, yellow punctuating emphasis — rosewood neutrals keep it warm, not clinical."
}
```

**Example B — Restrained (for a literary, editorial, or reflective brief):**

```json
{
  "primary_hue": { "h": 215, "s": 65, "l": 45, "name": "deep teal" },
  "secondary_accent": null,
  "neutral_family": { "tinted_toward": "teal", "name": "graphite" },
  "mood_word": "considered",
  "color_story": "Deep teal as a single strong gesture against graphite neutrals — no second accent, so the teal carries all the weight."
}
```

Your `color_story` must be specific to the day's brief and signals. Not "a vibrant palette" — something like "last frost palette: slate fading to ice-white, one amber accent for the morning light."
```

- [ ] **Step 3: Verify the prompt still builds correctly**

Run: `pnpm vitest run`
Expected: PASS — existing tests still pass because prompt content doesn't affect JS tests.

- [ ] **Step 4: Commit**

```bash
git add scripts/prompts/token-designer.md
git commit -m "feat(pipeline): Token Designer prompt emits COLOR_SCHEME + worked examples"
```

---

## Task 3: Extend archiver to persist color-scheme.json

**Files:**
- Modify: `scripts/utils/archiver.js`
- Test: `tests/scripts/archiver-color-scheme.test.js` (new file)

- [ ] **Step 1: Write the failing test**

Create `tests/scripts/archiver-color-scheme.test.js`:

```javascript
import { describe, it, expect, afterEach } from 'vitest'
import { readFile, rm } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'
import { archive } from '../../scripts/utils/archiver.js'
import { ROOT } from '../../scripts/utils/file-manager.js'

describe('archive() — color scheme persistence', () => {
  let createdDir = null

  afterEach(async () => {
    if (createdDir && existsSync(createdDir)) {
      await rm(createdDir, { recursive: true, force: true })
    }
  })

  it('writes color-scheme.json when colorScheme is provided', async () => {
    const date = '2099-01-01'
    const signals = { date, weather: 'test' }
    const scheme = {
      primary_hue: { h: 200, s: 70, l: 50, name: 'test blue' },
      secondary_accent: null,
      neutral_family: { tinted_toward: 'blue', name: 'slate' },
      mood_word: 'crisp',
      color_story: 'Test.',
    }

    await archive(date, signals, 'rationale', 'brief', [], {}, scheme)

    const dir = path.join(ROOT, 'archive', date)
    createdDir = dir
    const { readdirSync } = await import('fs')
    const buildDirs = readdirSync(dir).filter((f) => f.startsWith('build-'))
    expect(buildDirs.length).toBeGreaterThan(0)

    const schemePath = path.join(dir, buildDirs[0], 'color-scheme.json')
    expect(existsSync(schemePath)).toBe(true)
    const contents = JSON.parse(await readFile(schemePath, 'utf8'))
    expect(contents.primary_hue.h).toBe(200)
    expect(contents.mood_word).toBe('crisp')
  })

  it('does not write color-scheme.json when colorScheme is omitted', async () => {
    const date = '2099-01-02'
    await archive(date, { date }, 'r', 'b', [], {})

    const dir = path.join(ROOT, 'archive', date)
    createdDir = dir
    const { readdirSync } = await import('fs')
    const buildDirs = readdirSync(dir).filter((f) => f.startsWith('build-'))
    const schemePath = path.join(dir, buildDirs[0], 'color-scheme.json')
    expect(existsSync(schemePath)).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/scripts/archiver-color-scheme.test.js`
Expected: FAIL — `archive()` signature doesn't accept a colorScheme arg yet; file isn't written.

- [ ] **Step 3: Extend the archive() function**

In `scripts/utils/archiver.js`, modify the `archive` function signature and body:

Change the function signature (line ~120):

```javascript
export async function archive(date, signals, rationale, designBrief, changedFiles, weights = {}, colorScheme = null) {
```

After the `preset.ts` write block (~line 183), add a new block:

```javascript
  // Save the color scheme JSON artifact, if provided
  if (colorScheme && !colorScheme.__parse_error) {
    try {
      await writeFile(
        path.join(buildDir, 'color-scheme.json'),
        JSON.stringify(colorScheme, null, 2),
        'utf8'
      )
    } catch (err) {
      console.warn(`  warning: could not write color-scheme.json: ${err.message}`)
    }
  }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/scripts/archiver-color-scheme.test.js`
Expected: PASS (2 tests)

- [ ] **Step 5: Run full test suite**

Run: `pnpm vitest run`
Expected: PASS 225/225

- [ ] **Step 6: Commit**

```bash
git add scripts/utils/archiver.js tests/scripts/archiver-color-scheme.test.js
git commit -m "feat(archive): persist color-scheme.json per build when provided"
```

---

## Task 4: Create color-validation.js helpers

**Files:**
- Create: `scripts/utils/color-validation.js`
- Test: `tests/utils/color-validation.test.js`

- [ ] **Step 1: Write failing tests**

Create `tests/utils/color-validation.test.js`:

```javascript
import { describe, it, expect } from 'vitest'
import {
  hexToHsl,
  detectCoffeeShopPalette,
  validateSchemeAgainstPreset,
} from '../../scripts/utils/color-validation.js'

describe('hexToHsl', () => {
  it('converts pure red', () => {
    const hsl = hexToHsl('#ff0000')
    expect(hsl.h).toBe(0)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })
  it('converts pure white', () => {
    const hsl = hexToHsl('#ffffff')
    expect(hsl.l).toBe(100)
  })
  it('handles 3-char hex', () => {
    const hsl = hexToHsl('#f00')
    expect(hsl.h).toBe(0)
  })
  it('returns null on invalid hex', () => {
    expect(hexToHsl('not-a-hex')).toBeNull()
  })
})

describe('detectCoffeeShopPalette', () => {
  it('warns on warm low-saturation palette (olive-on-stone)', () => {
    const scheme = {
      primary_hue: { h: 30, s: 40, l: 50, name: 'amber' },
      neutral_family: { tinted_toward: 'warm' },
    }
    // Simulated: neutral saturation <8%, warm hue (10-50°), accent sat <50%
    const preset = `colors: { neutral: { 500: { value: '#8A7F70' } } }`
    const result = detectCoffeeShopPalette(scheme, preset)
    expect(result.ok).toBe(false)
    expect(result.warnings[0]).toMatch(/coffee-shop/i)
  })

  it('passes on vibrant palette', () => {
    const scheme = {
      primary_hue: { h: 340, s: 85, l: 55, name: 'magenta' },
      neutral_family: { tinted_toward: 'magenta' },
    }
    const preset = `colors: { neutral: { 500: { value: '#8E7085' } } }`
    const result = detectCoffeeShopPalette(scheme, preset)
    expect(result.ok).toBe(true)
    expect(result.warnings).toEqual([])
  })
})

describe('validateSchemeAgainstPreset', () => {
  it('passes when preset accent hex matches scheme primary_hue', () => {
    // HSL(215, 70, 50) ≈ #2673BF
    const scheme = { primary_hue: { h: 215, s: 70, l: 50, name: 'ocean' } }
    const preset = `
      colors: {
        accent: {
          DEFAULT: { value: '#2673BF' }
        }
      }
    `
    const result = validateSchemeAgainstPreset(scheme, preset)
    expect(result.ok).toBe(true)
  })

  it('warns when accent hex differs from stated primary_hue by >15°', () => {
    const scheme = { primary_hue: { h: 30, s: 70, l: 50, name: 'amber' } }
    const preset = `
      colors: {
        accent: {
          DEFAULT: { value: '#2673BF' }
        }
      }
    `
    const result = validateSchemeAgainstPreset(scheme, preset)
    expect(result.ok).toBe(false)
    expect(result.warnings[0]).toMatch(/stated hue.*actual hue/i)
  })

  it('passes silently when preset has no extractable accent', () => {
    const scheme = { primary_hue: { h: 30, s: 70, l: 50, name: 'amber' } }
    const preset = `// empty`
    const result = validateSchemeAgainstPreset(scheme, preset)
    expect(result.ok).toBe(true) // no evidence = no warning
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run tests/utils/color-validation.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Create `scripts/utils/color-validation.js`**

```javascript
/**
 * Pure helpers for validating a Token Designer COLOR_SCHEME block against
 * the emitted preset.ts. All helpers return { ok: boolean, warnings: string[] }.
 * Never fail the build — warnings only.
 */

/**
 * Convert a hex color (#rgb, #rrggbb, with or without #) to HSL.
 * @param {string} hex
 * @returns {{ h: number, s: number, l: number } | null}
 */
export function hexToHsl(hex) {
  if (typeof hex !== 'string') return null
  const clean = hex.replace(/^#/, '')
  let r, g, b
  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16)
    g = parseInt(clean[1] + clean[1], 16)
    b = parseInt(clean[2] + clean[2], 16)
  } else if (clean.length === 6) {
    r = parseInt(clean.slice(0, 2), 16)
    g = parseInt(clean.slice(2, 4), 16)
    b = parseInt(clean.slice(4, 6), 16)
  } else {
    return null
  }
  if ([r, g, b].some((v) => Number.isNaN(v))) return null

  const rN = r / 255, gN = g / 255, bN = b / 255
  const max = Math.max(rN, gN, bN), min = Math.min(rN, gN, bN)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rN: h = ((gN - bN) / d + (gN < bN ? 6 : 0)); break
      case gN: h = ((bN - rN) / d + 2); break
      case bN: h = ((rN - gN) / d + 4); break
    }
    h *= 60
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

/**
 * Shortest angular distance between two hues (0-360°).
 * @param {number} a
 * @param {number} b
 * @returns {number} distance in degrees, 0-180
 */
export function hueDistance(a, b) {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

/**
 * Extract the accent DEFAULT hex from a preset.ts source string.
 * Best-effort regex; returns null if not found.
 * @param {string} presetSrc
 * @returns {string | null}
 */
export function extractAccentHex(presetSrc) {
  // Match: accent: { ... DEFAULT: { value: '#RRGGBB' } }
  // or:    accent: { DEFAULT: { value: '#RRGGBB' } }
  const match = presetSrc.match(/accent\s*:\s*\{[^}]*?DEFAULT\s*:\s*\{\s*value:\s*['"](#[0-9a-f]{3,6})['"]/i)
  return match ? match[1] : null
}

/**
 * Warn if the palette matches the "coffee-shop" pattern — warm low-saturation
 * neutrals + warm hue (10-50°) + muted accent. Heuristic only.
 *
 * @param {object} scheme
 * @param {string} presetSrc
 * @returns {{ ok: boolean, warnings: string[] }}
 */
export function detectCoffeeShopPalette(scheme, presetSrc) {
  const warnings = []
  if (!scheme || !scheme.primary_hue) return { ok: true, warnings }

  const { h, s } = scheme.primary_hue
  const warmHue = h >= 10 && h <= 50
  const mutedAccent = s < 50

  // Check neutral saturation via preset (extract neutral.500)
  const neutralMatch = presetSrc.match(/neutral\s*:\s*\{[^}]*?500\s*:\s*\{\s*value:\s*['"](#[0-9a-f]{3,6})['"]/i)
  let neutralLowSat = false
  if (neutralMatch) {
    const hsl = hexToHsl(neutralMatch[1])
    if (hsl && hsl.s < 8) neutralLowSat = true
  }

  if (warmHue && mutedAccent && neutralLowSat) {
    warnings.push(
      `coffee-shop palette detected: warm hue (${h}°) + muted accent (s=${s}) + low-saturation neutral. Consider a more vibrant palette next run.`
    )
  }

  return { ok: warnings.length === 0, warnings }
}

/**
 * Warn if the preset's actual accent hex, converted to HSL, differs from the
 * scheme's stated primary_hue by more than 15° (hue distance).
 *
 * @param {object} scheme
 * @param {string} presetSrc
 * @returns {{ ok: boolean, warnings: string[] }}
 */
export function validateSchemeAgainstPreset(scheme, presetSrc) {
  const warnings = []
  if (!scheme || !scheme.primary_hue) return { ok: true, warnings }

  const accentHex = extractAccentHex(presetSrc)
  if (!accentHex) return { ok: true, warnings } // no evidence; silent

  const actualHsl = hexToHsl(accentHex)
  if (!actualHsl) return { ok: true, warnings }

  const dist = hueDistance(scheme.primary_hue.h, actualHsl.h)
  if (dist > 15) {
    warnings.push(
      `COLOR_SCHEME stated hue ${scheme.primary_hue.h}° (${scheme.primary_hue.name}) ` +
      `but actual hue from preset accent is ${actualHsl.h}° (distance ${dist}°).`
    )
  }
  return { ok: warnings.length === 0, warnings }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run tests/utils/color-validation.test.js`
Expected: PASS (9 tests)

- [ ] **Step 5: Run full test suite**

Run: `pnpm vitest run`
Expected: PASS 234/234

- [ ] **Step 6: Commit**

```bash
git add scripts/utils/color-validation.js tests/utils/color-validation.test.js
git commit -m "feat(pipeline): color-scheme validation helpers (coffee-shop detector + preset-consistency)"
```

---

## Task 5: Wire validation + archival into pipeline

**Files:**
- Modify: `scripts/design-agents.js` — after Token Designer returns, parse scheme, log warnings, pass scheme through to archive call

- [ ] **Step 1: Find the Token Designer call site + archive call site**

Run: `grep -n "tokenResult\|parseDelimiterResponse\|archive(" /Users/dougmarch/Projects/dougmarch/scripts/design-agents.js | head -20`

Note the line where `tokenResult = parseDelimiterResponse(...)` happens and the line where `archive(...)` is called.

- [ ] **Step 2: After Token Designer parse, run validation and log warnings**

In `scripts/design-agents.js`, find the block where Token Designer output is parsed (search for the variable receiving `parseDelimiterResponse` after the Token Designer call). Immediately after that assignment, add:

```javascript
  // Validate the emitted color scheme against the preset. Warnings only.
  if (tokenResult.color_scheme && !tokenResult.color_scheme.__parse_error) {
    const { detectCoffeeShopPalette, validateSchemeAgainstPreset } = await import('./utils/color-validation.js')
    const presetSrc = tokenResult.files.find((f) => f.path === 'elements/preset.ts')?.content || ''

    const consistency = validateSchemeAgainstPreset(tokenResult.color_scheme, presetSrc)
    if (!consistency.ok) {
      for (const w of consistency.warnings) console.warn(`[color-scheme] ${w}`)
    }

    const rut = detectCoffeeShopPalette(tokenResult.color_scheme, presetSrc)
    if (!rut.ok) {
      for (const w of rut.warnings) console.warn(`[color-scheme] ${w}`)
    }
  } else if (tokenResult.color_scheme && tokenResult.color_scheme.__parse_error) {
    console.warn('[color-scheme] Token Designer emitted ===COLOR_SCHEME=== but JSON was unparseable; continuing.')
  } else {
    console.warn('[color-scheme] Token Designer did not emit ===COLOR_SCHEME===; palette monitoring will not fire for this build.')
  }
```

- [ ] **Step 3: Thread color_scheme into the archive() call**

Find the `archive(` call in `scripts/design-agents.js` (the call near the end of the pipeline that writes the day's archive). Change it from:

```javascript
  await archive(date, signals, rationale, designBrief, changedFiles, weights)
```

to:

```javascript
  await archive(date, signals, rationale, designBrief, changedFiles, weights, tokenResult.color_scheme ?? null)
```

- [ ] **Step 4: Run full test suite to verify no regressions**

Run: `pnpm vitest run`
Expected: PASS 234/234 (no new tests; this is pure wiring that integration-tests would exercise end-to-end)

- [ ] **Step 5: Run the build to ensure the wiring doesn't break compile**

Run: `pnpm build`
Expected: clean build, no new warnings

- [ ] **Step 6: Commit**

```bash
git add scripts/design-agents.js
git commit -m "feat(pipeline): validate + archive Token Designer COLOR_SCHEME with warn-only policy"
```

---

## Task 6: End-to-end smoke test (mocked)

**Files:**
- Test: `tests/scripts/design-agents-color-scheme.test.js` (extend the file from Task 1)

- [ ] **Step 1: Add an integration test that exercises the full extract + validate path**

Append to `tests/scripts/design-agents-color-scheme.test.js`:

```javascript
import { detectCoffeeShopPalette, validateSchemeAgainstPreset } from '../../scripts/utils/color-validation.js'

describe('color scheme end-to-end (parse + validate)', () => {
  it('flags a coffee-shop palette when parser output + preset agree on warm-muted', () => {
    const response = `===RATIONALE===
third olive palette in a week
===COLOR_SCHEME===
{
  "primary_hue": { "h": 30, "s": 40, "l": 50, "name": "amber" },
  "secondary_accent": null,
  "neutral_family": { "tinted_toward": "warm", "name": "stone" },
  "mood_word": "cozy",
  "color_story": "Third coffee-shop palette in a row."
}
===FILE:elements/preset.ts===
export const elementsPreset = { theme: { tokens: { colors: {
  neutral: { 500: { value: '#8A7F70' } },
  accent: { DEFAULT: { value: '#8C6B44' } }
}}}}
`
    const parsed = parseDelimiterResponse(response)
    expect(parsed.color_scheme).toBeDefined()

    const preset = parsed.files.find((f) => f.path === 'elements/preset.ts').content
    const rut = detectCoffeeShopPalette(parsed.color_scheme, preset)
    expect(rut.ok).toBe(false)
    expect(rut.warnings[0]).toMatch(/coffee-shop/i)
  })

  it('lets a vibrant palette through without warnings', () => {
    const response = `===RATIONALE===
electric day
===COLOR_SCHEME===
{
  "primary_hue": { "h": 345, "s": 85, "l": 55, "name": "magenta" },
  "secondary_accent": { "h": 50, "s": 90, "l": 60, "name": "citrus" },
  "neutral_family": { "tinted_toward": "magenta", "name": "rosewood" },
  "mood_word": "kinetic",
  "color_story": "Magenta demanding attention."
}
===FILE:elements/preset.ts===
export const x = { theme: { tokens: { colors: {
  neutral: { 500: { value: '#6D4D62' } },
  accent: { DEFAULT: { value: '#DF2668' } }
}}}}
`
    const parsed = parseDelimiterResponse(response)
    const preset = parsed.files.find((f) => f.path === 'elements/preset.ts').content
    const rut = detectCoffeeShopPalette(parsed.color_scheme, preset)
    const consistency = validateSchemeAgainstPreset(parsed.color_scheme, preset)
    expect(rut.ok).toBe(true)
    expect(consistency.ok).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `pnpm vitest run tests/scripts/design-agents-color-scheme.test.js`
Expected: PASS (5 tests in this file now)

- [ ] **Step 3: Full regression check**

Run: `pnpm vitest run && pnpm build`
Expected: all tests pass, build clean

- [ ] **Step 4: Commit**

```bash
git add tests/scripts/design-agents-color-scheme.test.js
git commit -m "test(pipeline): end-to-end color-scheme parse + validate smoke tests"
```

---

## Phase 1 completion criteria

- [ ] `parseDelimiterResponse` extracts `color_scheme` with error-sentinel on bad JSON
- [ ] Token Designer prompt includes COLOR_SCHEME format + two worked examples
- [ ] `archive()` writes `color-scheme.json` when provided
- [ ] `color-validation.js` exports `hexToHsl`, `hueDistance`, `extractAccentHex`, `detectCoffeeShopPalette`, `validateSchemeAgainstPreset`
- [ ] Pipeline wiring logs warnings only (no hard-fails)
- [ ] All existing 220 tests still pass; phase adds ~14 new tests → 234 total
- [ ] `pnpm build` clean, no new panda warnings
- [ ] Five commits, each conventionally messaged
