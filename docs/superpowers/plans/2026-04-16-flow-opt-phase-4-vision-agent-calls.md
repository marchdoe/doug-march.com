# Flow Optimization — Phase 4: Vision-Enabled Agent Calls Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire Director and Unified Designer to consume the reference manifest from Phase 3 as **actual images** (vision input), not just text descriptions. Preserves free-local-dev by gracefully falling back to text-only references when `ANTHROPIC_API_KEY` is absent.

**Architecture:** The existing `callClaudeCLI()` path routes everything through the `claude` CLI binary (Max plan auth in local dev, API key in CI). The CLI's image support is inconsistent across versions, so we introduce a parallel `callClaudeSDK()` function using `@anthropic-ai/sdk` directly. Vision-enabled agents try the SDK path when an API key is available; otherwise fall back to CLI with text-only manifest. Text-only agents (Interpret Signals, Token Designer, Spec Critic) stay on the CLI path unchanged.

**Tech Stack:** `@anthropic-ai/sdk` (already installed), `fs/promises` for base64 encoding, Vitest with SDK mocking.

**Related:** Prerequisite: Phase 3 (`2026-04-16-flow-opt-phase-3-reference-manifest.md`). Optional dependency: Phase 2 (colorMandate is injected as text, independent of vision).

**Important context from project memory:**
- Local dev intentionally has no `ANTHROPIC_API_KEY` in `.env` (prevents accidental local API charges; uses Max plan via CLI auth).
- Production CI injects `ANTHROPIC_API_KEY` from GitHub Secrets.
- The vision-enabled path requires an API key. Local-dev runs will silently lose vision input and fall back to text-only references — this is intentional and documented below.

---

## File Structure

**New files:**
- `scripts/utils/claude-sdk.js` — exports `callClaudeSDK(agentName, systemPrompt, messages, opts)` where `messages` is an array of Anthropic content blocks (text + image). Returns the concatenated assistant text.
- `scripts/utils/vision-router.js` — exports `callAgentWithVision({ agentName, systemPrompt, userText, images, model, ...opts })`: tries SDK if `process.env.ANTHROPIC_API_KEY` is set; else logs warning and falls back to `callClaudeCLI` with `userText` only (images dropped).
- `tests/utils/claude-sdk.test.js` — unit tests with SDK mocked via `vi.mock('@anthropic-ai/sdk', ...)`
- `tests/utils/vision-router.test.js` — tests for the routing decision (API key present → SDK; absent → CLI fallback)

**Modified files:**
- `scripts/design-agents.js` — replace Director and Unified Designer call sites to use `callAgentWithVision` with the manifest's top-N images

---

## Task 1: Implement callClaudeSDK — vision-capable agent caller

**Files:**
- Create: `scripts/utils/claude-sdk.js`
- Create: `tests/utils/claude-sdk.test.js`

- [ ] **Step 1: Write failing tests**

Create `tests/utils/claude-sdk.test.js`:

```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock the SDK at module boundary
const createMock = vi.fn()
vi.mock('@anthropic-ai/sdk', () => {
  return {
    default: class Anthropic {
      constructor(opts) { this.opts = opts }
      messages = { create: createMock }
    },
  }
})

import { callClaudeSDK } from '../../scripts/utils/claude-sdk.js'

describe('callClaudeSDK', () => {
  beforeEach(() => {
    createMock.mockReset()
  })

  it('concatenates text content blocks from a successful response', async () => {
    createMock.mockResolvedValue({
      content: [
        { type: 'text', text: 'Hello ' },
        { type: 'text', text: 'world.' },
      ],
      stop_reason: 'end_turn',
      usage: { input_tokens: 100, output_tokens: 10 },
    })
    const result = await callClaudeSDK('test-agent', 'you are a test', [
      { role: 'user', content: [{ type: 'text', text: 'hi' }] },
    ], { apiKey: 'sk-test' })
    expect(result).toBe('Hello world.')
    expect(createMock).toHaveBeenCalledOnce()
    const args = createMock.mock.calls[0][0]
    expect(args.system).toBe('you are a test')
    expect(args.messages[0].content[0].text).toBe('hi')
  })

  it('passes model + max_tokens through to SDK', async () => {
    createMock.mockResolvedValue({ content: [{ type: 'text', text: 'ok' }], stop_reason: 'end_turn', usage: {} })
    await callClaudeSDK('x', 'sys', [{ role: 'user', content: [{ type: 'text', text: 'p' }] }], {
      apiKey: 'sk-test', model: 'claude-sonnet-4-6', maxTokens: 8192,
    })
    const args = createMock.mock.calls[0][0]
    expect(args.model).toBe('claude-sonnet-4-6')
    expect(args.max_tokens).toBe(8192)
  })

  it('propagates SDK errors', async () => {
    createMock.mockRejectedValue(new Error('rate_limit'))
    await expect(
      callClaudeSDK('x', 'sys', [{ role: 'user', content: [{ type: 'text', text: 'p' }] }], { apiKey: 'sk-test' })
    ).rejects.toThrow(/rate_limit/)
  })

  it('throws if apiKey is missing', async () => {
    await expect(
      callClaudeSDK('x', 'sys', [{ role: 'user', content: [{ type: 'text', text: 'p' }] }], {})
    ).rejects.toThrow(/apiKey/i)
  })
})
```

- [ ] **Step 2: Run tests to verify failure**

Run: `pnpm vitest run tests/utils/claude-sdk.test.js`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement claude-sdk.js**

Create `scripts/utils/claude-sdk.js`:

```javascript
import Anthropic from '@anthropic-ai/sdk'

/**
 * Call Claude via the official Anthropic SDK. Use this when the caller
 * needs to pass structured content blocks (text + image) that the `claude`
 * CLI cannot reliably carry.
 *
 * Requires an ANTHROPIC_API_KEY (passed in opts.apiKey). Local-dev paths
 * that use Max plan auth should route through callClaudeCLI instead.
 *
 * @param {string} agentName - label for logs
 * @param {string} systemPrompt
 * @param {Array<{role:'user'|'assistant', content: Array<{type:string, text?:string, source?:object}>}>} messages
 * @param {{ apiKey: string, model?: string, maxTokens?: number, timeoutMs?: number }} opts
 * @returns {Promise<string>} concatenated assistant text
 */
export async function callClaudeSDK(agentName, systemPrompt, messages, opts = {}) {
  const { apiKey, model = 'claude-sonnet-4-6', maxTokens = 16384, timeoutMs = 1800000 } = opts

  if (!apiKey) throw new Error('callClaudeSDK requires opts.apiKey')

  const client = new Anthropic({ apiKey, timeout: timeoutMs })

  console.log(`  [${agentName}] calling Anthropic SDK (model=${model})...`)
  const res = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages,
  })

  // Concatenate text-type content blocks
  const text = (res.content || [])
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('')

  const usage = res.usage || {}
  console.log(`  [${agentName}] SDK completed (input=${usage.input_tokens}, output=${usage.output_tokens}, stop=${res.stop_reason})`)
  return text
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `pnpm vitest run tests/utils/claude-sdk.test.js`
Expected: PASS (4 tests)

- [ ] **Step 5: Run full suite**

Run: `pnpm vitest run`
Expected: 262/262 pass (258 from previous phases + 4 from this task)

- [ ] **Step 6: Commit**

```bash
git add scripts/utils/claude-sdk.js tests/utils/claude-sdk.test.js
git commit -m "feat(pipeline): callClaudeSDK for vision-capable multimodal agent calls"
```

---

## Task 2: Implement vision-router with CLI fallback

**Files:**
- Create: `scripts/utils/vision-router.js`
- Create: `tests/utils/vision-router.test.js`

- [ ] **Step 1: Write failing tests**

Create `tests/utils/vision-router.test.js`:

```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest'

const sdkMock = vi.fn()
const cliMock = vi.fn()

vi.mock('../../scripts/utils/claude-sdk.js', () => ({ callClaudeSDK: sdkMock }))
vi.mock('../../scripts/utils/claude-cli.js', () => ({ callClaudeCLI: cliMock }))

import { callAgentWithVision } from '../../scripts/utils/vision-router.js'

describe('callAgentWithVision', () => {
  beforeEach(() => {
    sdkMock.mockReset()
    cliMock.mockReset()
    delete process.env.ANTHROPIC_API_KEY
  })

  it('uses SDK path when ANTHROPIC_API_KEY is set and images are provided', async () => {
    process.env.ANTHROPIC_API_KEY = 'sk-test'
    sdkMock.mockResolvedValue('sdk response')

    const result = await callAgentWithVision({
      agentName: 'director',
      systemPrompt: 'sys',
      userText: 'user text',
      images: [{ path: '/tmp/fake.png', mediaType: 'image/png', base64: 'AAAA' }],
      model: 'claude-sonnet-4-6',
    })

    expect(result).toBe('sdk response')
    expect(sdkMock).toHaveBeenCalledOnce()
    expect(cliMock).not.toHaveBeenCalled()

    const sdkArgs = sdkMock.mock.calls[0]
    const messages = sdkArgs[2]
    // user message should include 1 image block + 1 text block
    expect(messages[0].content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'image' }),
        expect.objectContaining({ type: 'text', text: 'user text' }),
      ])
    )
  })

  it('falls back to CLI text-only when ANTHROPIC_API_KEY is absent', async () => {
    cliMock.mockResolvedValue('cli response')

    const result = await callAgentWithVision({
      agentName: 'director',
      systemPrompt: 'sys',
      userText: 'user text',
      images: [{ path: '/tmp/fake.png', mediaType: 'image/png', base64: 'AAAA' }],
    })

    expect(result).toBe('cli response')
    expect(cliMock).toHaveBeenCalledOnce()
    expect(sdkMock).not.toHaveBeenCalled()
    // CLI gets the userText alone (no images can be passed through)
    const cliArgs = cliMock.mock.calls[0]
    expect(cliArgs[2]).toBe('user text')
  })

  it('uses CLI path (not SDK) even with API key when images array is empty', async () => {
    process.env.ANTHROPIC_API_KEY = 'sk-test'
    cliMock.mockResolvedValue('cli response')

    const result = await callAgentWithVision({
      agentName: 'director',
      systemPrompt: 'sys',
      userText: 'user text',
      images: [],
    })

    expect(result).toBe('cli response')
    expect(cliMock).toHaveBeenCalledOnce()
    expect(sdkMock).not.toHaveBeenCalled()
  })

  it('falls back to CLI when SDK throws', async () => {
    process.env.ANTHROPIC_API_KEY = 'sk-test'
    sdkMock.mockRejectedValue(new Error('sdk boom'))
    cliMock.mockResolvedValue('cli fallback')

    const result = await callAgentWithVision({
      agentName: 'director',
      systemPrompt: 'sys',
      userText: 'user text',
      images: [{ path: '/tmp/fake.png', mediaType: 'image/png', base64: 'AAAA' }],
    })

    expect(result).toBe('cli fallback')
    expect(sdkMock).toHaveBeenCalledOnce()
    expect(cliMock).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run tests/utils/vision-router.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement vision-router.js**

Create `scripts/utils/vision-router.js`:

```javascript
import { callClaudeSDK } from './claude-sdk.js'
import { callClaudeCLI } from './claude-cli.js'

/**
 * Route a vision-capable agent call. Uses the Anthropic SDK (multimodal)
 * when ANTHROPIC_API_KEY is available and images are provided; otherwise
 * (or on SDK failure) falls back to the CLI with text-only input.
 *
 * @param {object} args
 * @param {string} args.agentName
 * @param {string} args.systemPrompt
 * @param {string} args.userText
 * @param {Array<{ path: string, mediaType: string, base64: string, caption?: string }>} args.images
 * @param {string} [args.model='claude-sonnet-4-6']
 * @param {number} [args.timeoutMs]
 * @param {number} [args.stallTimeoutMs]
 * @param {number} [args.maxTokens]
 * @returns {Promise<string>}
 */
export async function callAgentWithVision(args) {
  const {
    agentName,
    systemPrompt,
    userText,
    images = [],
    model = 'claude-sonnet-4-6',
    timeoutMs,
    stallTimeoutMs,
    maxTokens,
  } = args

  const apiKey = process.env.ANTHROPIC_API_KEY
  const canUseSDK = Boolean(apiKey) && images.length > 0

  if (canUseSDK) {
    try {
      const content = []
      for (const img of images) {
        content.push({
          type: 'image',
          source: { type: 'base64', media_type: img.mediaType, data: img.base64 },
        })
        if (img.caption) {
          content.push({ type: 'text', text: `(Reference: ${img.caption})` })
        }
      }
      content.push({ type: 'text', text: userText })

      return await callClaudeSDK(
        agentName,
        systemPrompt,
        [{ role: 'user', content }],
        { apiKey, model, maxTokens, timeoutMs }
      )
    } catch (err) {
      console.warn(`  [${agentName}] SDK call failed (${err.message}); falling back to CLI text-only.`)
      // fall through
    }
  } else if (images.length > 0 && !apiKey) {
    console.warn(`  [${agentName}] ANTHROPIC_API_KEY not set; ${images.length} reference image(s) will NOT be sent (text-only fallback).`)
  }

  // CLI fallback: text-only. `callClaudeCLI` signature:
  // callClaudeCLI(agentName, systemPrompt, promptText, options)
  return await callClaudeCLI(agentName, systemPrompt, userText, {
    model,
    timeoutMs,
    stallTimeoutMs,
  })
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run tests/utils/vision-router.test.js`
Expected: PASS (4 tests)

- [ ] **Step 5: Run full suite**

Run: `pnpm vitest run`
Expected: PASS 266/266

- [ ] **Step 6: Commit**

```bash
git add scripts/utils/vision-router.js tests/utils/vision-router.test.js
git commit -m "feat(pipeline): vision-router with API-key SDK path and CLI text-only fallback"
```

---

## Task 3: Load manifest + encode images into memory

**Files:**
- Create: `scripts/utils/reference-loader.js`
- Create: `tests/utils/reference-loader.test.js`

- [ ] **Step 1: Write failing tests**

Create `tests/utils/reference-loader.test.js`:

```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdir, writeFile, rm } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { loadManifestImages } from '../../scripts/utils/reference-loader.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TMP = path.resolve(__dirname, '../../.tmp-reference-loader-test')

describe('loadManifestImages', () => {
  beforeEach(async () => {
    await mkdir(TMP, { recursive: true })
  })
  afterEach(async () => {
    await rm(TMP, { recursive: true, force: true })
  })

  it('loads images referenced by a manifest and returns { path, mediaType, base64, caption }', async () => {
    const imgPath = path.join(TMP, 'ref1.png')
    const pngBytes = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
    await writeFile(imgPath, pngBytes)

    const manifest = {
      references: [
        { imagePath: imgPath, url: 'https://x', description: 'first', tags: {}, score: 5 },
        { imagePath: null, url: 'https://y', description: 'missing', tags: {}, score: 3, fetchError: '404' },
      ],
    }

    const loaded = await loadManifestImages(manifest, { max: 5 })
    expect(loaded).toHaveLength(1)
    expect(loaded[0].mediaType).toBe('image/png')
    expect(loaded[0].base64).toBe(pngBytes.toString('base64'))
    expect(loaded[0].caption).toBe('first')
  })

  it('respects max limit', async () => {
    const files = []
    for (let i = 0; i < 3; i++) {
      const p = path.join(TMP, `ref${i}.png`)
      await writeFile(p, Buffer.from([0x89, 0x50, 0x4e, 0x47, i]))
      files.push(p)
    }
    const manifest = {
      references: files.map((p, i) => ({ imagePath: p, description: `#${i}`, tags: {}, score: 10 - i })),
    }
    const loaded = await loadManifestImages(manifest, { max: 2 })
    expect(loaded).toHaveLength(2)
  })

  it('returns empty array for empty manifest', async () => {
    const loaded = await loadManifestImages({ references: [] }, {})
    expect(loaded).toEqual([])
  })

  it('infers mediaType from file extension', async () => {
    const jpgPath = path.join(TMP, 'ref.jpg')
    await writeFile(jpgPath, Buffer.from([0xff, 0xd8, 0xff]))
    const manifest = { references: [{ imagePath: jpgPath, description: 'j', tags: {}, score: 1 }] }
    const loaded = await loadManifestImages(manifest, {})
    expect(loaded[0].mediaType).toBe('image/jpeg')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run tests/utils/reference-loader.test.js`
Expected: FAIL — module doesn't exist.

- [ ] **Step 3: Implement reference-loader.js**

Create `scripts/utils/reference-loader.js`:

```javascript
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const EXT_TO_MEDIATYPE = {
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
}

/**
 * Read references manifest entries that have a local imagePath,
 * load the bytes, and return an array of { path, mediaType, base64, caption }
 * suitable for passing to callAgentWithVision.
 *
 * @param {{ references: Array<{ imagePath: string|null, description: string }> }} manifest
 * @param {{ max?: number }} opts
 * @returns {Promise<Array<{ path: string, mediaType: string, base64: string, caption: string }>>}
 */
export async function loadManifestImages(manifest, opts = {}) {
  const max = opts.max ?? 5
  const out = []

  if (!manifest?.references) return out

  for (const ref of manifest.references) {
    if (!ref.imagePath) continue
    if (!existsSync(ref.imagePath)) continue
    if (out.length >= max) break

    const ext = path.extname(ref.imagePath).toLowerCase()
    const mediaType = EXT_TO_MEDIATYPE[ext]
    if (!mediaType) continue

    try {
      const buf = await readFile(ref.imagePath)
      out.push({
        path: ref.imagePath,
        mediaType,
        base64: buf.toString('base64'),
        caption: ref.description || '',
      })
    } catch {
      // skip unreadable image; don't fail loading
    }
  }
  return out
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run tests/utils/reference-loader.test.js`
Expected: PASS (4 tests)

- [ ] **Step 5: Run full suite**

Run: `pnpm vitest run`
Expected: PASS 270/270

- [ ] **Step 6: Commit**

```bash
git add scripts/utils/reference-loader.js tests/utils/reference-loader.test.js
git commit -m "feat(pipeline): reference-loader reads manifest + encodes images for vision calls"
```

---

## Task 4: Wire Director through vision-router

**Files:**
- Modify: `scripts/design-agents.js`

- [ ] **Step 1: Find the Director call site**

Run: `grep -n "callClaudeCLI.*director\|design-director" /Users/dougmarch/Projects/dougmarch/scripts/design-agents.js | head -10`

Identify the line where Director is invoked via `callClaudeCLI` and the line where its user prompt is assembled.

- [ ] **Step 2: Import new helpers near the top of the file**

Add imports near the top of `scripts/design-agents.js`:

```javascript
import { callAgentWithVision } from './utils/vision-router.js'
import { loadManifestImages } from './utils/reference-loader.js'
import { readFile as fsReadFile } from 'fs/promises'
import { existsSync as fsExistsSync } from 'fs'
```

(Skip any import that already exists.)

- [ ] **Step 3: Load manifest once at pipeline start**

Near where `colorMandate` is computed (from Phase 2), add manifest loading:

```javascript
  // Load the references manifest once — consumed by Director and Unified Designer.
  let referenceImages = []
  const manifestPath = path.join(ROOT, 'signals/today.references.json')
  if (fsExistsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(await fsReadFile(manifestPath, 'utf8'))
      referenceImages = await loadManifestImages(manifest, { max: 5 })
      console.log(`  loaded ${referenceImages.length} reference image(s) from manifest`)
    } catch (err) {
      console.warn(`  [references] failed to load manifest: ${err.message}`)
    }
  } else {
    console.warn(`  [references] ${manifestPath} not found; vision inputs disabled for this run`)
  }
```

- [ ] **Step 4: Replace the Director call site**

Locate the existing Director call. It should look something like:

```javascript
  const directorResponse = await callClaudeCLI('design-director', directorSystemPrompt, directorUserPrompt, { model: 'sonnet', ... })
```

Replace it with:

```javascript
  const directorResponse = await callAgentWithVision({
    agentName: 'design-director',
    systemPrompt: directorSystemPrompt,
    userText: directorUserPrompt,
    images: referenceImages,
    model: 'claude-sonnet-4-6',
    timeoutMs: 600000,
    stallTimeoutMs: 900000,
  })
```

(Adjust the model string to whatever the existing code uses; the key change is the call shape.)

- [ ] **Step 5: Run the test suite to ensure no regressions**

Run: `pnpm vitest run`
Expected: PASS — tests mock the router / cli; real API is not called.

- [ ] **Step 6: Commit**

```bash
git add scripts/design-agents.js
git commit -m "feat(pipeline): route Design Director through vision-router with reference images"
```

---

## Task 5: Wire Unified Designer through vision-router

**Files:**
- Modify: `scripts/design-agents.js`

- [ ] **Step 1: Find the Unified Designer call site**

Run: `grep -n "callClaudeCLI.*unified\|unified-designer" /Users/dougmarch/Projects/dougmarch/scripts/design-agents.js | head -10`

- [ ] **Step 2: Replace the Unified Designer call**

Locate the call. It should look something like:

```javascript
  const unifiedResponse = await callClaudeCLI('unified-designer', unifiedSystemPrompt, unifiedUserPrompt, {
    model: 'sonnet',
    timeoutMs: 1800000,
    stallTimeoutMs: 1500000,
    extraCliArgs: [...],
  })
```

Replace with:

```javascript
  const unifiedResponse = await callAgentWithVision({
    agentName: 'unified-designer',
    systemPrompt: unifiedSystemPrompt,
    userText: unifiedUserPrompt,
    images: referenceImages,
    model: 'claude-sonnet-4-6',
    timeoutMs: 1800000,
    stallTimeoutMs: 1500000,
  })
```

Note: the existing call may pass `extraCliArgs` like `--fallback-model haiku`. The SDK path doesn't honor CLI args; those are lost when the SDK path is taken. Document this in a comment above the call:

```javascript
  // Note: SDK path does not honor extraCliArgs (e.g. --fallback-model).
  // CLI fallback (when no ANTHROPIC_API_KEY) gets the defaults from the router.
  // Production CI always has the key, so SDK is the primary path there.
```

- [ ] **Step 3: Run full suite**

Run: `pnpm vitest run && pnpm build`
Expected: PASS, clean build

- [ ] **Step 4: Commit**

```bash
git add scripts/design-agents.js
git commit -m "feat(pipeline): route Unified Designer through vision-router with reference images"
```

---

## Task 6: Integration smoke test (mocked end-to-end)

**Files:**
- Create: `tests/integration/vision-flow.test.js`

- [ ] **Step 1: Write the integration test**

Create `tests/integration/vision-flow.test.js`:

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mkdir, writeFile, rm } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TMP = path.resolve(__dirname, '../../.tmp-vision-flow')

const sdkMock = vi.fn()
vi.mock('../../scripts/utils/claude-sdk.js', () => ({ callClaudeSDK: sdkMock }))

import { callAgentWithVision } from '../../scripts/utils/vision-router.js'
import { loadManifestImages } from '../../scripts/utils/reference-loader.js'

describe('vision flow — loader → router (SDK path)', () => {
  beforeEach(async () => {
    process.env.ANTHROPIC_API_KEY = 'sk-test-integration'
    await mkdir(TMP, { recursive: true })
    sdkMock.mockReset()
  })

  afterEach(async () => {
    delete process.env.ANTHROPIC_API_KEY
    await rm(TMP, { recursive: true, force: true })
  })

  it('loads manifest images, sends them to SDK, returns the assistant text', async () => {
    const imgPath = path.join(TMP, 'ref.png')
    const bytes = Buffer.from([0x89, 0x50, 0x4e, 0x47])
    await writeFile(imgPath, bytes)

    const manifest = {
      references: [
        { imagePath: imgPath, description: 'sparse editorial poster', tags: {}, score: 9 },
      ],
    }

    const images = await loadManifestImages(manifest, { max: 5 })
    expect(images).toHaveLength(1)

    sdkMock.mockResolvedValue('agent text')

    const result = await callAgentWithVision({
      agentName: 'test',
      systemPrompt: 'sys',
      userText: 'user',
      images,
    })

    expect(result).toBe('agent text')
    expect(sdkMock).toHaveBeenCalledOnce()
    const messages = sdkMock.mock.calls[0][2]
    // Expect: 1 image block + 1 caption text + 1 user text = 3 content blocks
    expect(messages[0].content).toHaveLength(3)
    expect(messages[0].content[0].type).toBe('image')
    expect(messages[0].content[0].source.media_type).toBe('image/png')
    expect(messages[0].content[1].type).toBe('text')
    expect(messages[0].content[1].text).toMatch(/sparse editorial poster/)
    expect(messages[0].content[2].text).toBe('user')
  })
})
```

- [ ] **Step 2: Run the test**

Run: `pnpm vitest run tests/integration/vision-flow.test.js`
Expected: PASS (1 test)

- [ ] **Step 3: Run full suite**

Run: `pnpm vitest run`
Expected: PASS 271/271

- [ ] **Step 4: Commit**

```bash
git add tests/integration/vision-flow.test.js
git commit -m "test(pipeline): integration smoke — manifest load through vision-router to SDK"
```

---

## Phase 4 completion criteria

- [ ] `scripts/utils/claude-sdk.js` with 4 tests
- [ ] `scripts/utils/vision-router.js` with 4 tests (SDK path, CLI fallback on no key, CLI on empty images, CLI fallback on SDK error)
- [ ] `scripts/utils/reference-loader.js` with 4 tests
- [ ] Director + Unified Designer routed through `callAgentWithVision` with manifest images
- [ ] Integration test: loader → router → SDK with mocked SDK
- [ ] Local-dev (no API key) falls back to text-only with warning; does NOT hard-fail
- [ ] 13 new tests (271 total); `pnpm build` clean
- [ ] Six commits, each conventionally messaged

## Known limitations (explicit non-goals)

- **Vision input is disabled in local dev** — local runs use the Max-plan CLI auth path, which doesn't support multimodal. This is intentional to preserve free-local-dev. Production CI has the key and gets full vision.
- **extraCliArgs (like `--fallback-model haiku`) are ignored on the SDK path.** If fallback models matter in production, we'd need to implement SDK-side fallback separately. Out of scope here.
- **No cost-tracking for SDK calls yet.** The SDK's `usage.input_tokens` / `usage.output_tokens` is logged but not aggregated. Monitoring is Phase 5's concern.
