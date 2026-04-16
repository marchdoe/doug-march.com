# Flow Optimization — Phase 3: Reference Manifest & Image Cache Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend `scripts/collect-references.js` to fetch reference images (from Awwwards URLs and user-curated paths) into a local content-addressable cache and emit a structured JSON manifest consumable by downstream agents as multimodal context.

**Architecture:** New helper module `scripts/utils/reference-cache.js` handles URL hashing, HTTP fetching with timeouts, and cache reads/writes. `collect-references.js` orchestrates: score references (existing logic), fetch top-N images to cache, emit `signals/today.references.json`. The legacy `signals/today.references.md` is still written for human readability. No agent calls yet — this plan is pure plumbing.

**Tech Stack:** Node.js ESM built-in `fetch` (Node 18+), `crypto` for SHA-1 URL hashing, Vitest. Cache dir `references/cache/` is gitignored.

**Related:** `docs/superpowers/specs/2026-04-16-flow-optimization-design.md`. This plan is a prerequisite for Phase 4 (vision-enabled agent calls).

---

## File Structure

**New files:**
- `scripts/utils/reference-cache.js` — exports `hashUrl(url)`, `fetchAndCacheImage(url, cacheDir, opts)`, `readCachedImage(imagePath)`
- `tests/utils/reference-cache.test.js` — unit tests using mocked `fetch`

**Modified files:**
- `scripts/collect-references.js` — after scoring refs, fetch selected ref images to cache, emit JSON manifest alongside existing markdown
- `.gitignore` — add `references/cache/`

**New runtime artifacts (gitignored):**
- `references/cache/<sha1>.{png,jpg,webp}` — cached reference images
- `signals/today.references.json` — structured manifest

---

## Task 1: Create gitignore entry for cache directory

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Verify current .gitignore contents**

Run: `cat /Users/dougmarch/Projects/dougmarch/.gitignore | grep -i "references\|cache"`

- [ ] **Step 2: Add cache directory to .gitignore**

Append to `.gitignore`:

```
# Reference image cache (fetched from external sources; content-addressable, non-portable)
references/cache/
```

- [ ] **Step 3: Verify the entry is in place**

Run: `grep "references/cache" /Users/dougmarch/Projects/dougmarch/.gitignore`
Expected: line present.

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: gitignore references/cache/ directory"
```

---

## Task 2: Write reference-cache helper module with tests

**Files:**
- Create: `scripts/utils/reference-cache.js`
- Create: `tests/utils/reference-cache.test.js`

- [ ] **Step 1: Write failing tests**

Create `tests/utils/reference-cache.test.js`:

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { readFile, rm, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { hashUrl, fetchAndCacheImage, readCachedImage } from '../../scripts/utils/reference-cache.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TMP = path.resolve(__dirname, '../../.tmp-reference-cache-test')

describe('hashUrl', () => {
  it('produces a stable SHA-1 hex digest', () => {
    const a = hashUrl('https://example.com/a.png')
    const b = hashUrl('https://example.com/a.png')
    expect(a).toBe(b)
    expect(a).toMatch(/^[a-f0-9]{40}$/)
  })

  it('produces different hashes for different URLs', () => {
    expect(hashUrl('https://example.com/a.png')).not.toBe(hashUrl('https://example.com/b.png'))
  })
})

describe('fetchAndCacheImage', () => {
  beforeEach(async () => {
    await mkdir(TMP, { recursive: true })
  })
  afterEach(async () => {
    await rm(TMP, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  it('downloads an image to the cache on first call', async () => {
    const fakePng = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 1, 2, 3])
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      headers: new Map([['content-type', 'image/png']]),
      arrayBuffer: async () => fakePng.buffer.slice(fakePng.byteOffset, fakePng.byteOffset + fakePng.byteLength),
    })))
    const url = 'https://example.com/img.png'
    const result = await fetchAndCacheImage(url, TMP)
    expect(result.imagePath).toMatch(/\.png$/)
    expect(existsSync(result.imagePath)).toBe(true)
    expect(result.hash).toMatch(/^[a-f0-9]{40}$/)
    expect(result.contentType).toBe('image/png')
  })

  it('returns cached image on second call (no re-fetch)', async () => {
    const fakePng = Buffer.from([0x89, 0x50, 0x4e, 0x47])
    const fetchMock = vi.fn(async () => ({
      ok: true,
      status: 200,
      headers: new Map([['content-type', 'image/png']]),
      arrayBuffer: async () => fakePng.buffer.slice(fakePng.byteOffset, fakePng.byteOffset + fakePng.byteLength),
    }))
    vi.stubGlobal('fetch', fetchMock)
    const url = 'https://example.com/cached.png'
    const r1 = await fetchAndCacheImage(url, TMP)
    const r2 = await fetchAndCacheImage(url, TMP)
    expect(r1.imagePath).toBe(r2.imagePath)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('rejects non-2xx responses', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: false, status: 404, headers: new Map(), arrayBuffer: async () => new ArrayBuffer(0),
    })))
    await expect(fetchAndCacheImage('https://example.com/missing.png', TMP)).rejects.toThrow(/404/)
  })

  it('rejects unsupported content types', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true, status: 200,
      headers: new Map([['content-type', 'text/html']]),
      arrayBuffer: async () => new ArrayBuffer(10),
    })))
    await expect(fetchAndCacheImage('https://example.com/page.html', TMP)).rejects.toThrow(/content-type/i)
  })

  it('rejects images above maxSizeBytes', async () => {
    const big = Buffer.alloc(10 * 1024 * 1024) // 10 MB
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true, status: 200,
      headers: new Map([['content-type', 'image/png'], ['content-length', String(big.length)]]),
      arrayBuffer: async () => big.buffer.slice(big.byteOffset, big.byteOffset + big.byteLength),
    })))
    await expect(
      fetchAndCacheImage('https://example.com/huge.png', TMP, { maxSizeBytes: 1 * 1024 * 1024 })
    ).rejects.toThrow(/too large/i)
  })
})

describe('readCachedImage', () => {
  it('returns null for nonexistent path', async () => {
    const result = await readCachedImage('/nonexistent/path.png')
    expect(result).toBeNull()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run tests/utils/reference-cache.test.js`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement reference-cache.js**

Create `scripts/utils/reference-cache.js`:

```javascript
import { createHash } from 'crypto'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync, readdirSync } from 'fs'
import path from 'path'

const DEFAULT_TIMEOUT_MS = 15000
const DEFAULT_MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB
const ALLOWED_CONTENT_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

/**
 * SHA-1 hash of a URL — stable cache key.
 */
export function hashUrl(url) {
  return createHash('sha1').update(url).digest('hex')
}

/**
 * Fetch an image URL and cache it to disk under `cacheDir/<sha1>.<ext>`.
 * Idempotent: if a cached file exists for the URL's hash, returns it without
 * re-fetching.
 *
 * @param {string} url
 * @param {string} cacheDir
 * @param {{ timeoutMs?: number, maxSizeBytes?: number }} opts
 * @returns {Promise<{ imagePath: string, hash: string, contentType: string }>}
 */
export async function fetchAndCacheImage(url, cacheDir, opts = {}) {
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const maxSizeBytes = opts.maxSizeBytes ?? DEFAULT_MAX_SIZE_BYTES

  const hash = hashUrl(url)

  if (!existsSync(cacheDir)) {
    await mkdir(cacheDir, { recursive: true })
  }

  // Check for any existing cached file for this hash
  const existing = readdirSync(cacheDir).find((f) => f.startsWith(hash + '.'))
  if (existing) {
    const ext = path.extname(existing).slice(1)
    const ct = Object.entries(ALLOWED_CONTENT_TYPES).find(([, e]) => e === ext)?.[0] ?? 'image/*'
    return {
      imagePath: path.join(cacheDir, existing),
      hash,
      contentType: ct,
    }
  }

  // Fetch with timeout
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  let res
  try {
    res = await fetch(url, { signal: ctrl.signal })
  } finally {
    clearTimeout(timer)
  }

  if (!res.ok) throw new Error(`fetch ${url} returned ${res.status}`)

  const contentType = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase()
  const ext = ALLOWED_CONTENT_TYPES[contentType]
  if (!ext) throw new Error(`unsupported content-type "${contentType}" for ${url}`)

  const declaredLength = Number(res.headers.get('content-length') || 0)
  if (declaredLength > maxSizeBytes) {
    throw new Error(`image at ${url} too large (declared ${declaredLength} > max ${maxSizeBytes})`)
  }

  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length > maxSizeBytes) {
    throw new Error(`image at ${url} too large (${buf.length} > max ${maxSizeBytes})`)
  }

  const imagePath = path.join(cacheDir, `${hash}.${ext}`)
  await writeFile(imagePath, buf)
  return { imagePath, hash, contentType }
}

/**
 * Read a cached image from disk as a buffer. Returns null if not present.
 * @param {string} imagePath
 * @returns {Promise<Buffer|null>}
 */
export async function readCachedImage(imagePath) {
  if (!existsSync(imagePath)) return null
  return await readFile(imagePath)
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run tests/utils/reference-cache.test.js`
Expected: PASS (9 tests)

- [ ] **Step 5: Run full suite**

Run: `pnpm vitest run`
Expected: PASS (Phase 1+2+3 so far: 257)

- [ ] **Step 6: Commit**

```bash
git add scripts/utils/reference-cache.js tests/utils/reference-cache.test.js
git commit -m "feat(pipeline): reference image cache with URL-hash keys + fetch validation"
```

---

## Task 3: Extend collect-references.js to fetch + emit manifest

**Files:**
- Modify: `scripts/collect-references.js`

- [ ] **Step 1: Read the current shape of collect-references.js**

Run: `cat /Users/dougmarch/Projects/dougmarch/scripts/collect-references.js`

Note:
- The existing `collectReferences(briefText)` function that returns scored references
- Where the markdown output is written (path: `signals/today.references.md`)
- How top-N selection happens

- [ ] **Step 2: Add manifest-emission logic**

At the top of `scripts/collect-references.js`, add import:

```javascript
import { fetchAndCacheImage } from './utils/reference-cache.js'
```

Near the existing `OUTPUT_PATH` constant, add:

```javascript
const CACHE_DIR = path.join(ROOT, 'references/cache')
const MANIFEST_PATH = path.join(ROOT, 'signals/today.references.json')
const MAX_IMAGES_IN_MANIFEST = 5
```

- [ ] **Step 3: Implement the manifest-builder function**

Add this function above the main exported function:

```javascript
/**
 * Fetch reference images (best-effort) and build a structured manifest.
 * Individual image-fetch failures are logged and that ref is omitted from
 * the manifest — never causes a hard failure.
 *
 * @param {Array<{file?: string, url?: string, description: string, tags: object, score: number}>} refs
 * @returns {Promise<{ references: Array<{ imagePath: string|null, url: string|null, description: string, tags: object, score: number, fetchError?: string }> }>}
 */
async function buildManifest(refs) {
  const manifest = { references: [] }
  const top = refs.slice(0, MAX_IMAGES_IN_MANIFEST)

  for (const ref of top) {
    const entry = {
      imagePath: null,
      url: ref.url ?? null,
      description: ref.description,
      tags: ref.tags ?? {},
      score: ref.score ?? 0,
    }

    // Case A: user-curated file in references/ directory
    if (ref.file) {
      const localPath = path.join(ROOT, 'references', ref.file)
      if (existsSync(localPath)) {
        entry.imagePath = localPath
        manifest.references.push(entry)
        continue
      }
      entry.fetchError = `local file references/${ref.file} not found`
    }

    // Case B: URL from awwwards or elsewhere
    if (ref.url) {
      try {
        const result = await fetchAndCacheImage(ref.url, CACHE_DIR)
        entry.imagePath = result.imagePath
      } catch (err) {
        entry.fetchError = err.message
      }
    }

    manifest.references.push(entry)
  }

  return manifest
}
```

- [ ] **Step 4: Wire manifest emission into the main flow**

Find the main run function (likely `async function main()` at the bottom of the file or the default export). After the existing markdown is written, add manifest emission:

```javascript
  // Build + write the structured manifest (consumed by Director and
  // Unified Designer via Phase 4 vision plumbing).
  try {
    const manifest = await buildManifest(scoredRefs) // or whatever the scored array is called
    await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8')
    const cached = manifest.references.filter((r) => r.imagePath).length
    console.log(`  wrote ${MANIFEST_PATH} (${cached}/${manifest.references.length} images cached)`)
  } catch (err) {
    console.warn(`  warning: failed to build references manifest: ${err.message}`)
  }
```

(Replace `scoredRefs` with the actual variable name holding the scored-and-sorted references in the current file. Grep for `.slice(0, 5)` or similar to find it.)

- [ ] **Step 5: Run the collector end-to-end (smoke)**

Run: `node scripts/collect-references.js`
Expected: produces `signals/today.references.md` AND `signals/today.references.json`; the JSON should parse; at least some entries should have `imagePath` populated (Awwwards URLs that the script pulls).

- [ ] **Step 6: Verify the manifest JSON is well-formed**

Run: `node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync('signals/today.references.json', 'utf8')), null, 2).slice(0, 500))"`
Expected: valid JSON printed.

- [ ] **Step 7: Commit**

```bash
git add scripts/collect-references.js
git commit -m "feat(pipeline): emit signals/today.references.json with cached image paths"
```

---

## Task 4: Unit test the manifest builder with mocked fetch

**Files:**
- Test: extend `tests/utils/reference-cache.test.js` OR create `tests/scripts/collect-references-manifest.test.js`

- [ ] **Step 1: Write integration test for buildManifest**

If `buildManifest` is not exported yet, export it from `scripts/collect-references.js`:

```javascript
export { buildManifest }
```

Create `tests/scripts/collect-references-manifest.test.js`:

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { rm, mkdir, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildManifest } from '../../scripts/collect-references.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')

describe('buildManifest', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('handles mixed local + URL refs, reports fetch errors per-entry', async () => {
    // Create a fake local reference file
    const localDir = path.join(ROOT, 'references')
    if (!existsSync(localDir)) await mkdir(localDir, { recursive: true })
    const localFile = 'test-ref-' + Date.now() + '.png'
    const localPath = path.join(localDir, localFile)
    await writeFile(localPath, Buffer.from([0x89, 0x50, 0x4e, 0x47]))

    // Mock fetch to fail once and succeed once
    let calls = 0
    vi.stubGlobal('fetch', vi.fn(async () => {
      calls++
      if (calls === 1) {
        return { ok: false, status: 404, headers: new Map(), arrayBuffer: async () => new ArrayBuffer(0) }
      }
      return {
        ok: true, status: 200,
        headers: new Map([['content-type', 'image/png']]),
        arrayBuffer: async () => Buffer.from([0x89, 0x50, 0x4e, 0x47]).buffer,
      }
    }))

    const refs = [
      { file: localFile, description: 'local', tags: {}, score: 10 },
      { url: 'https://example.com/fail.png', description: 'will fail', tags: {}, score: 9 },
      { url: 'https://example.com/ok.png', description: 'will succeed', tags: {}, score: 8 },
    ]

    const manifest = await buildManifest(refs)
    expect(manifest.references).toHaveLength(3)
    expect(manifest.references[0].imagePath).toBe(localPath)
    expect(manifest.references[1].fetchError).toMatch(/404/)
    expect(manifest.references[1].imagePath).toBeNull()
    expect(manifest.references[2].imagePath).toMatch(/\.png$/)

    // Cleanup
    await rm(localPath, { force: true })
  })
})
```

- [ ] **Step 2: Run the test**

Run: `pnpm vitest run tests/scripts/collect-references-manifest.test.js`
Expected: PASS (1 test)

- [ ] **Step 3: Run full suite**

Run: `pnpm vitest run`
Expected: PASS 258/258

- [ ] **Step 4: Commit**

```bash
git add scripts/collect-references.js tests/scripts/collect-references-manifest.test.js
git commit -m "test(pipeline): buildManifest mixed local+URL with per-entry fetch errors"
```

---

## Phase 3 completion criteria

- [ ] `.gitignore` excludes `references/cache/`
- [ ] `scripts/utils/reference-cache.js` exports `hashUrl`, `fetchAndCacheImage`, `readCachedImage`
- [ ] Fetch rejects non-2xx, unsupported content types, oversized images
- [ ] `collect-references.js` emits `signals/today.references.json` alongside markdown
- [ ] Individual image-fetch failures degrade gracefully (per-entry `fetchError`, no pipeline failure)
- [ ] 10 new tests (258 total); `pnpm build` clean
- [ ] Four commits, each conventionally messaged
