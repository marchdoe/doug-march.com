# Archive Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public archive experience where each daily redesign has a detail page showcasing the design brief, tokens, signals, and thumbnails — turning the pipeline into a visible, browsable design process.

**Architecture:** Two-page architecture: `/archive` (list of all builds with thumbnails, archetype name, date) and `/archive/$date` (detail page with brief, tokens, signals, thumbnail, link to load archived site). The pipeline archiver is extended to save additional artifacts (signals brief, preset tokens, screenshot). The existing `archive-impl.ts` server layer is expanded to serve all artifact types.

**Tech Stack:** TanStack Start (file-based routing), PandaCSS, TypeScript, Playwright (screenshots), Node fs (archive reading)

---

## File Structure

### New Files
| File | Responsibility |
|------|----------------|
| `app/routes/archive.$date.tsx` | Archive detail page for a single day's build |
| `app/server/archive-detail-impl.ts` | Pure function to read full build artifacts (testable, no server deps) |
| `tests/server/archive-detail.test.ts` | Tests for detail data loading |

### Modified Files
| File | Changes |
|------|---------|
| `scripts/utils/archiver.js` | Save `signals-brief.md`, `preset.ts`, and screenshot to each build |
| `app/server/archive-impl.ts` | Remove 10-entry limit, add archetype + buildId to `ArchiveEntry` type |
| `app/server/archive.ts` | Export new `readArchiveDetail` server function |
| `app/routes/archive.tsx` | Redesign list page with archetype name, date, link to detail |
| `app/content/timeline.ts` | Remove education years (small change already staged) |
| `tests/server/archive.test.ts` | Update for new fields and removed limit |

---

## Task 1: Save additional artifacts in pipeline archiver

**Files:**
- Modify: `scripts/utils/archiver.js`

- [ ] **Step 1: Add `readFile` to the existing import**

At top of `scripts/utils/archiver.js`, change:
```js
import { mkdir, writeFile } from 'fs/promises'
```
to:
```js
import { mkdir, writeFile, readFile } from 'fs/promises'
```

Also add `existsSync` from `fs`:
```js
import { existsSync } from 'fs'
```

- [ ] **Step 2: Modify archiver to copy signals brief into build directory**

In `scripts/utils/archiver.js`, after the `build.json` write (line 123), add:

```js
// Save the interpreted signals brief if it exists
const signalsBriefSrc = path.join(ROOT, 'signals', 'today.brief.md')
if (existsSync(signalsBriefSrc)) {
  try {
    const signalsBrief = await readFile(signalsBriefSrc, 'utf8')
    await writeFile(path.join(buildDir, 'signals-brief.md'), signalsBrief, 'utf8')
  } catch { /* signals brief read failed — non-blocking */ }
}
```

- [ ] **Step 3: Modify archiver to copy preset tokens into build directory**

After the signals brief copy, add:

```js
// Save the design tokens preset
const presetSrc = path.join(ROOT, 'elements', 'preset.ts')
if (existsSync(presetSrc)) {
  try {
    const preset = await readFile(presetSrc, 'utf8')
    await writeFile(path.join(buildDir, 'preset.ts'), preset, 'utf8')
  } catch { /* preset read failed — non-blocking */ }
}
```

- [ ] **Step 4: Modify archiver to capture screenshot into build directory**

After the snapshot capture (line 136), add screenshot capture with a short timeout:

```js
// Capture a thumbnail screenshot into the build directory (best-effort)
try {
  const { spawnSync } = await import('child_process')
  const net = await import('net')
  // Quick check if dev server is running before wasting time
  const portOpen = await new Promise(resolve => {
    const sock = new net.Socket()
    sock.setTimeout(2000)
    sock.once('connect', () => { sock.destroy(); resolve(true) })
    sock.once('error', () => resolve(false))
    sock.once('timeout', () => { sock.destroy(); resolve(false) })
    sock.connect(5173, '127.0.0.1')
  })
  if (portOpen) {
    const screenshotPath = path.join(buildDir, 'screenshot.png')
    const result = spawnSync('node', [
      path.join(ROOT, 'scripts', 'capture-reference.js'),
      '--port=5173',
      `--output=${screenshotPath}`,
    ], { timeout: 45000 })
    if (result.status === 0) {
      console.log(`  screenshot saved to build-${buildId}/screenshot.png`)
    } else {
      console.warn(`  screenshot capture failed (non-blocking)`)
    }
  } else {
    console.log(`  dev server not running, skipping screenshot`)
  }
} catch (err) {
  console.warn(`  screenshot failed (non-blocking): ${err.message}`)
}
```

- [ ] **Step 5: Commit**

```bash
git add scripts/utils/archiver.js
git commit -m "feat: archive signals brief, preset tokens, and screenshot per build"
```

---

## Task 2: Expand archive server layer

**Files:**
- Modify: `app/server/archive-impl.ts`
- Modify: `app/server/archive.ts`
- Create: `app/server/archive-detail-impl.ts`
- Test: `tests/server/archive-detail.test.ts`
- Modify: `tests/server/archive.test.ts`

- [ ] **Step 1: Update ArchiveEntry type and remove 10-entry limit**

In `app/server/archive-impl.ts`:

Add `archetype` and `buildId` fields to `ArchiveEntry`:

```ts
export interface ArchiveEntry {
  date: string
  brief: string
  rationale: string
  filesChanged: string[]
  archetype: string
  buildId: string
}
```

In `_readArchiveHandler`, after parsing brief.md, read archetype and find latest buildId:

```ts
// After parsing brief.md, read archetype
const archetypePath = join(archivePath, d.name, 'archetype.txt')
const archetype = existsSync(archetypePath)
  ? readFileSync(archetypePath, 'utf8').trim()
  : ''

// Find latest build directory for buildId
const dateEntries = readdirSync(join(archivePath, d.name), { withFileTypes: true })
const builds = dateEntries
  .filter(b => b.isDirectory() && b.name.startsWith('build-'))
  .map(b => b.name)
  .sort()
  .reverse()
const buildId = builds[0]?.replace('build-', '') ?? ''
```

Remove `.slice(0, 10)` from the return statement.

Include `archetype` and `buildId` in the returned object.

- [ ] **Step 2: Update existing archive tests**

In `tests/server/archive.test.ts`:
- Add `archetype.txt` to test fixture directories
- Update assertions to expect new `archetype` and `buildId` fields
- Update the entry count assertion (was 10, now should be total fixture count)
- Add test: entries without build directories still return with empty `buildId`

- [ ] **Step 3: Run archive tests**

Run: `npx vitest run tests/server/archive.test.ts`
Expected: All tests pass with updated assertions

- [ ] **Step 4: Create archive detail implementation (pure function)**

Create `app/server/archive-detail-impl.ts`:

```ts
import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'
import { ARCHIVE_PATH } from './archive-impl'

export interface ArchiveDetail {
  date: string
  archetype: string
  brief: string
  signalsBrief: string
  preset: string
  rationale: string
  filesChanged: string[]
  hasScreenshot: boolean
  buildId: string
}

export function _readArchiveDetail(date: string, archivePath = ARCHIVE_PATH): ArchiveDetail | null {
  const dateDir = join(archivePath, date)
  if (!existsSync(dateDir)) return null

  const readSafe = (p: string) => existsSync(p) ? readFileSync(p, 'utf8') : ''

  // Find latest build directory
  const builds = readdirSync(dateDir, { withFileTypes: true })
    .filter(b => b.isDirectory() && b.name.startsWith('build-'))
    .map(b => b.name)
    .sort()
    .reverse()
  const latestBuild = builds[0]

  // Determine where to read brief.md from:
  // - If build dir exists, read from there (has most data)
  // - Otherwise fall back to top-level date dir (older builds)
  const buildDir = latestBuild ? join(dateDir, latestBuild) : null
  const buildId = latestBuild?.replace('build-', '') ?? ''

  // brief.md: prefer build dir, fall back to date dir
  const briefContent = buildDir
    ? readSafe(join(buildDir, 'brief.md'))
    : readSafe(join(dateDir, 'brief.md'))

  // These only exist in build dirs (new artifacts)
  const signalsBrief = buildDir ? readSafe(join(buildDir, 'signals-brief.md')) : ''
  const preset = buildDir ? readSafe(join(buildDir, 'preset.ts')) : ''
  const hasScreenshot = buildDir ? existsSync(join(buildDir, 'screenshot.png')) : false

  // archetype.txt lives at date level
  const archetype = readSafe(join(dateDir, 'archetype.txt')).trim()

  // Parse brief.md for structured fields
  const lines = briefContent.split('\n')
  const briefLine = lines.find(l => l.startsWith('**Design Brief:** '))
  const brief = briefLine?.slice('**Design Brief:** '.length).trim() ?? ''

  let rationale = ''
  const rationaleStart = lines.findIndex(l => l.startsWith("## Claude's Rationale"))
  const filesChangedStart = lines.findIndex(l => l.startsWith('## Files Changed'))
  if (rationaleStart !== -1 && filesChangedStart !== -1) {
    rationale = lines.slice(rationaleStart + 1, filesChangedStart).join('\n').trim()
  } else if (rationaleStart !== -1) {
    rationale = lines.slice(rationaleStart + 1).join('\n').trim()
  }

  const filesChanged: string[] = []
  if (filesChangedStart !== -1) {
    for (let i = filesChangedStart + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('- ')) filesChanged.push(line.slice(2).trim())
    }
  }

  return {
    date, archetype, brief, signalsBrief, preset,
    rationale, filesChanged, hasScreenshot, buildId,
  }
}
```

Key fix from review: Falls back to top-level `brief.md` when no build directory exists (handles 5 oldest archive dates).

- [ ] **Step 5: Add readArchiveDetail server function to archive.ts**

In `app/server/archive.ts`, add:

```ts
import { _readArchiveDetail } from './archive-detail-impl'
export type { ArchiveDetail } from './archive-detail-impl'

export const readArchiveDetail = createServerFn({ method: 'GET' })
  .validator((date: string) => date)
  .handler(async ({ data: date }) => {
    return _readArchiveDetail(date)
  })
```

Note: Import is from `'@tanstack/react-start'` (no `/server` suffix), matching existing code.

- [ ] **Step 6: Write tests for archive detail**

Create `tests/server/archive-detail.test.ts`:

```ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { mkdirSync, writeFileSync, rmSync } from 'fs'
import { join } from 'path'
import { _readArchiveDetail } from '../../app/server/archive-detail-impl'

const TEST_ARCHIVE = join(process.cwd(), 'archive', '__test-detail__')

describe('archive detail', () => {
  // Date WITH build directory (modern format)
  const dateWithBuild = '2099-01-01'
  const dateDir = join(TEST_ARCHIVE, dateWithBuild)
  const buildDir = join(dateDir, 'build-9999999999999')

  // Date WITHOUT build directory (old format, only top-level brief.md)
  const dateNoBuild = '2099-01-02'
  const dateDirNoBuild = join(TEST_ARCHIVE, dateNoBuild)

  beforeAll(() => {
    // Modern format with build dir
    mkdirSync(buildDir, { recursive: true })
    writeFileSync(join(dateDir, 'archetype.txt'), 'Specimen')
    writeFileSync(join(buildDir, 'brief.md'), [
      '# 2099-01-01', '',
      '**Design Brief:** Test brief content', '',
      '## Signals', '',
      "## Claude's Rationale", '',
      'Test rationale paragraph.', '',
      '## Files Changed', '',
      '- app/routes/index.tsx',
      '- elements/preset.ts',
    ].join('\n'))
    writeFileSync(join(buildDir, 'signals-brief.md'), '# Signals Brief\n\n## Mood\nTest mood')
    writeFileSync(join(buildDir, 'preset.ts'), 'export const preset = {}')

    // Old format without build dir
    mkdirSync(dateDirNoBuild, { recursive: true })
    writeFileSync(join(dateDirNoBuild, 'archetype.txt'), 'Poster')
    writeFileSync(join(dateDirNoBuild, 'brief.md'), [
      '# 2099-01-02', '',
      '**Design Brief:** Old format brief', '',
      "## Claude's Rationale", '',
      'Old rationale.', '',
      '## Files Changed', '',
      '- app/routes/index.tsx',
    ].join('\n'))
  })

  afterAll(() => {
    rmSync(TEST_ARCHIVE, { recursive: true, force: true })
  })

  it('reads all artifacts for a date with build directory', () => {
    const result = _readArchiveDetail(dateWithBuild, TEST_ARCHIVE)
    expect(result).not.toBeNull()
    expect(result!.date).toBe(dateWithBuild)
    expect(result!.archetype).toBe('Specimen')
    expect(result!.brief).toBe('Test brief content')
    expect(result!.rationale).toBe('Test rationale paragraph.')
    expect(result!.signalsBrief).toContain('## Mood')
    expect(result!.preset).toContain('export const preset')
    expect(result!.filesChanged).toEqual(['app/routes/index.tsx', 'elements/preset.ts'])
    expect(result!.buildId).toBe('9999999999999')
    expect(result!.hasScreenshot).toBe(false)
  })

  it('falls back to top-level brief.md when no build directory exists', () => {
    const result = _readArchiveDetail(dateNoBuild, TEST_ARCHIVE)
    expect(result).not.toBeNull()
    expect(result!.archetype).toBe('Poster')
    expect(result!.brief).toBe('Old format brief')
    expect(result!.rationale).toBe('Old rationale.')
    expect(result!.signalsBrief).toBe('')
    expect(result!.preset).toBe('')
    expect(result!.buildId).toBe('')
  })

  it('returns null for non-existent date', () => {
    const result = _readArchiveDetail('9999-99-99', TEST_ARCHIVE)
    expect(result).toBeNull()
  })
})
```

- [ ] **Step 7: Run detail tests**

Run: `npx vitest run tests/server/archive-detail.test.ts`
Expected: All 3 tests pass

- [ ] **Step 8: Commit**

```bash
git add app/server/archive-detail-impl.ts app/server/archive.ts app/server/archive-impl.ts tests/server/archive-detail.test.ts tests/server/archive.test.ts
git commit -m "feat: archive detail server layer — read all build artifacts"
```

---

## Task 3: Redesign archive list page

**Files:**
- Modify: `app/routes/archive.tsx`

The list page should show all builds with: archetype name, brief excerpt, date. Each row links to `/archive/$date`.

- [ ] **Step 1: Update archive.tsx — remove custom Layout/footer wrapper**

The current page wraps content in its own header, entry section, and footer. Since `__root.tsx` already wraps all routes in `<Layout>`, remove the custom wrapper and footer (same fix as `/elements`).

- [ ] **Step 2: Redesign the entry row component**

Replace `ArchiveEntryRow` with a new design:
- Row layout: archetype name (primary label) + brief excerpt (secondary, truncated 1-2 lines) + date (right-aligned, tabular-nums, muted)
- Each row is a `<Link>` to `/archive/${entry.date}`
- Use PandaCSS semantic tokens — no hardcoded colors
- Hover state for interactivity

- [ ] **Step 3: Add page header**

Simple header:
- "Archive" label (small caps)
- "Daily Redesigns" heading
- One-line description

- [ ] **Step 4: Verify the page renders in dev**

Navigate to `http://localhost:5173/archive`
Expected: List of all archive entries with archetype names and dates, each clickable

- [ ] **Step 5: Commit**

```bash
git add app/routes/archive.tsx
git commit -m "feat: redesign archive list page with archetype names and layout"
```

---

## Task 4: Build archive detail page

**Files:**
- Create: `app/routes/archive.$date.tsx`

This is the showcase page with four sections.

- [ ] **Step 1: Create the route file with loader and null handling**

Create `app/routes/archive.$date.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { readArchiveDetail } from '../server/archive'

export const Route = createFileRoute('/archive/$date')({
  loader: async ({ params }) => {
    const detail = await readArchiveDetail({ data: params.date })
    if (!detail) throw new Error('Archive entry not found')
    return { detail }
  },
  component: ArchiveDetailPage,
  errorComponent: () => (
    <div>
      <h2>Archive entry not found</h2>
      <a href="/archive">← Back to Archive</a>
    </div>
  ),
})
```

- [ ] **Step 2: Build the brief section**

Render the design brief with strong typography:
- Archetype as small caps label (e.g. "SPECIMEN")
- Brief text large, serif if available, generous line-height
- Date in muted small text
- Rationale as body text, max-width ~600px for readability
- Separator between brief and rationale

- [ ] **Step 3: Build the tokens section**

Parse `detail.preset` (TypeScript string) with regex to extract:
- Color hex values from the definePreset config
- Font family names
- Font size values
- Spacing values

Display as:
- Color swatches in a flex grid (swatch block + label)
- Font samples showing each family
- Spacing scale as horizontal bars

If `detail.preset` is empty (old builds), show "Tokens not available for this build" in muted text.

- [ ] **Step 4: Build the signals section**

Parse `detail.signalsBrief` markdown into sections by splitting on `## ` headings:
- Section title as label
- Body text with good readability
- Signal integration items in a subtle list

If `detail.signalsBrief` is empty (old builds), show "Signals brief not available for this build" in muted text.

- [ ] **Step 5: Build the actions section**

- "View archived site" link — for now, note that serving archived HTML requires additional work (see Open Questions). Include the link but mark it as a follow-up if the serving mechanism isn't in place.
- "← Back to Archive" link to `/archive`
- Date and archetype as contextual metadata

- [ ] **Step 6: Verify detail page in dev**

Navigate to `http://localhost:5173/archive/2026-03-27`
Expected: Full detail page with brief and rationale. Tokens and signals sections show "not available" for builds that predate the new archiver artifacts.

Navigate to `http://localhost:5173/archive/2026-03-16` (old build, no build dir)
Expected: Page renders with brief and rationale from top-level brief.md. No crash.

Navigate to `http://localhost:5173/archive/9999-99-99` (non-existent)
Expected: Error component renders with "Archive entry not found" and back link.

- [ ] **Step 7: Commit**

```bash
git add app/routes/archive.\$date.tsx
git commit -m "feat: archive detail page — brief, tokens, signals, actions"
```

---

## Task 5: Education years fix + cleanup

**Files:**
- Modify: `app/content/timeline.ts` (already staged)

- [ ] **Step 1: Commit the education years change**

```bash
git add app/content/timeline.ts
git commit -m "fix: remove years from education section"
```

---

## Task 6: Integration testing and polish

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: All tests pass (existing 116 + new archive detail tests)

- [ ] **Step 2: Navigate through the full archive flow in dev**

1. Go to `/archive` — see list of all builds with archetype names
2. Click a recent build — go to `/archive/2026-03-27` detail page
3. Verify brief section renders with archetype label, brief text, rationale
4. Verify tokens section handles missing `preset.ts` gracefully (shows placeholder)
5. Verify signals section handles missing `signals-brief.md` gracefully (shows placeholder)
6. Click an old build (e.g. `2026-03-16`) — verify it still renders from top-level brief.md
7. Navigate to invalid date — verify error page renders

- [ ] **Step 3: Trigger a local pipeline run to verify new artifacts are saved**

After running, check `archive/{date}/build-{id}/` contains:
- `brief.md` (existing)
- `build.json` (existing)
- `signals-brief.md` (new)
- `preset.ts` (new)
- `screenshot.png` (new, only if dev server was running)

- [ ] **Step 4: Final commit and push**

```bash
git push -u origin feature/archive-page
```

---

## Open Questions / Follow-ups

1. **Screenshot in CI** — The pipeline runs in GitHub Actions where there's no dev server. The port check in the archiver will skip screenshots gracefully. For CI screenshots, investigate if the pipeline can start a temp preview server after file writes.
2. **Serving archived HTML** — The "View archived site" link needs the static HTML to be accessible. Options: (a) serve from `public/` by copying during archiving, (b) create an API route to serve static files from the archive directory, (c) use a TanStack catch-all route. This is a follow-up task.
3. **Serving screenshots** — Same as above. Screenshots live in `archive/{date}/build-{id}/screenshot.png`. Need an API route or copy-to-public strategy. Follow-up task.
4. **Backfilling old builds** — Existing builds don't have `signals-brief.md` or `preset.ts`. The detail page handles this gracefully with "not available" placeholders.
5. **Nav link** — Should `/archive` appear in the main site navigation? The pipeline rewrites nav daily, so this may need guidance in the unified-designer prompt.
