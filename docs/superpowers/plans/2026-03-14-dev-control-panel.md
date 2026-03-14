# Dev Control Panel + TanStack Start Migration — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate doug-march.com from a TanStack Router SPA to TanStack Start, then build a `/dev` control panel for triggering and monitoring the daily redesign pipeline.

**Architecture:** TanStack Start (Vinxi-based) replaces the pure Vite SPA setup, adding server functions and API routes. Server functions (`createServerFn`) handle reading/writing signals and reading the archive. A Fetch API SSE handler streams child process stdout/stderr to the browser in real time. The `/dev` route loads initial data via the TanStack Router loader and uses an `EventSource` for live pipeline progress.

**Tech Stack:** TanStack Start, Vinxi, `createServerFn`, Web Streams API (`ReadableStream` + `TextEncoder`), `EventSource`, `js-yaml`, React 19, Vitest

**Spec:** `docs/superpowers/specs/2026-03-14-dev-control-panel-design.md`

---

## File Map

### Migration

| File | Action | Responsibility |
|------|--------|----------------|
| `app.config.ts` | Create | TanStack Start config — replaces `vite.config.ts` |
| `app/router.tsx` | Create | `createRouter()` factory shared by client + server entry |
| `app/client.tsx` | Create | Client hydration entry point |
| `app/ssr.tsx` | Create | SSR render entry point |
| `app/routes/__root.tsx` | Modify | Add `<Scripts />` for client-side JS injection during SSR |
| `package.json` | Modify | Add `@tanstack/start`, `vinxi`; move `js-yaml` to deps; remove `@tanstack/router-plugin`; update build scripts |
| `vite.config.ts` | Delete | Replaced by `app.config.ts` |
| `scripts/utils/prompt-builder.js` | Modify | Add `notes` section to `formatSignals()` |

### Dev Panel

| File | Action | Responsibility |
|------|--------|----------------|
| `app/server/signals.ts` | Create | `readSignals` and `saveOverrides` server functions + testable handler exports |
| `app/server/archive.ts` | Create | `readArchive` server function + testable handler export |
| `app/routes/api/pipeline.ts` | Create | SSE API route — spawns pipeline child process, streams output |
| `app/routes/dev.tsx` | Create | `/dev` control panel — loader, signals, overrides, run, progress, archive |

### Tests

| File | Action |
|------|--------|
| `tests/scripts/prompt-builder.test.js` | Create |
| `tests/server/signals.test.ts` | Create |
| `tests/server/archive.test.ts` | Create |

---

## Chunk 1: TanStack Start Migration

### Task 1: Update package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install TanStack Start and Vinxi**

```bash
cd /Users/dougmarch/Projects/dougmarch/.worktrees/daily-redesign-phase1
pnpm add @tanstack/start vinxi
```

Expected: both added to `dependencies` in `package.json`.

- [ ] **Step 2: Move js-yaml to dependencies (required for server bundle at runtime)**

```bash
pnpm add js-yaml
```

`js-yaml` is currently in `devDependencies`. Adding it to `dependencies` ensures Vinxi bundles it into the server output.

- [ ] **Step 3: Remove @tanstack/router-plugin (TanStack Start subsumes it)**

```bash
pnpm remove @tanstack/router-plugin
```

- [ ] **Step 4: Update build scripts**

Edit the `scripts` block in `package.json`:

```json
"dev":     "panda codegen && vinxi dev --port 3000",
"build":   "panda codegen && vinxi build",
"preview": "vinxi preview"
```

Leave `test`, `codegen`, and `codegen:watch` unchanged.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: migrate to TanStack Start — update dependencies and scripts"
```

---

### Task 2: Create app.config.ts and delete vite.config.ts

**Files:**
- Create: `app.config.ts`
- Delete: `vite.config.ts`

TanStack Start uses `defineConfig` from `@tanstack/start/config`. This wraps Vite internally. **Do NOT add `tanstackRouter` to the plugins array** — Start handles it automatically and adding it explicitly will cause duplicate plugin errors. **Do NOT add `viteReact`** — Start handles React via Vinxi. Keep `tsconfigPaths` and `devtools`.

- [ ] **Step 1: Create app.config.ts**

```ts
// app.config.ts
import { defineConfig } from '@tanstack/start/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { devtools } from '@tanstack/devtools-vite'

export default defineConfig({
  vite: {
    plugins: [
      devtools(),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
    ],
  },
})
```

- [ ] **Step 2: Delete vite.config.ts**

```bash
git rm vite.config.ts
```

- [ ] **Step 3: Commit**

```bash
git add app.config.ts
git commit -m "chore: add app.config.ts (TanStack Start), remove vite.config.ts"
```

---

### Task 3: Create entry files

**Files:**
- Create: `app/router.tsx`
- Create: `app/client.tsx`
- Create: `app/ssr.tsx`

TanStack Start needs three entry points. **Verify import paths against the installed `@tanstack/start` version** — the package exports `@tanstack/start/client` and `@tanstack/start/server`. If any import fails at runtime, check `node_modules/@tanstack/start/package.json` `exports` field for the correct subpath.

- [ ] **Step 1: Create app/router.tsx**

```tsx
// app/router.tsx
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
```

- [ ] **Step 2: Create app/client.tsx**

```tsx
// app/client.tsx
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/start/client'
import { createRouter } from './router'

const router = createRouter()

hydrateRoot(document, <StartClient router={router} />)
```

- [ ] **Step 3: Create app/ssr.tsx**

```tsx
// app/ssr.tsx
import { createStartHandler, defaultStreamHandler } from '@tanstack/start/server'
import { createRouter } from './router'

export default createStartHandler({
  createRouter,
})(defaultStreamHandler)
```

- [ ] **Step 4: Commit**

```bash
git add app/router.tsx app/client.tsx app/ssr.tsx
git commit -m "chore: add TanStack Start entry files (router, client, ssr)"
```

---

### Task 4: Update __root.tsx for SSR

**Files:**
- Modify: `app/routes/__root.tsx`

TanStack Start requires a `<Scripts />` component in the root layout to inject the client-side JS bundle during SSR. Without it, React hydration won't happen and the page will be static.

- [ ] **Step 1: Add Scripts import**

In `app/routes/__root.tsx`, add this import after the existing imports:

```tsx
import { Scripts } from '@tanstack/start/client'
```

- [ ] **Step 2: Add `<Scripts />` to RootComponent**

Find the `RootComponent` function (currently lines 35–42). Update it:

Before:
```tsx
function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  )
}
```

After:
```tsx
function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <Scripts />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/routes/__root.tsx
git commit -m "chore: add <Scripts /> to root layout for SSR hydration"
```

---

### Task 5: Smoke test the migration

No code to write — verify the migration works end-to-end.

- [ ] **Step 1: Run the dev server**

```bash
cd /Users/dougmarch/Projects/dougmarch/.worktrees/daily-redesign-phase1
pnpm dev
```

Expected: Server starts on `localhost:3000`. Open in a browser. Verify:
- Home page renders with sidebar and project list
- `/about` page loads
- `/elements` page loads
- Dark/light theme toggle works

If you see `Cannot find module '@tanstack/start/client'` — check `node_modules/@tanstack/start/package.json` `exports` and adjust the import subpath in `app/client.tsx` and `app/routes/__root.tsx`.

If the dev server starts but the page is blank — `<Scripts />` injection may need a different component. Check TanStack Start docs for the correct SSR root setup for your installed version.

- [ ] **Step 2: Run a production build**

```bash
pnpm build
```

Expected: Build completes. Vinxi outputs to `.output/` (not `dist/`). No TypeScript or PandaCSS errors.

---

### Task 6: Add `notes` to prompt-builder.js (TDD)

**Files:**
- Modify: `scripts/utils/prompt-builder.js`
- Create: `tests/scripts/prompt-builder.test.js`

- [ ] **Step 1: Create tests directory**

```bash
mkdir -p tests/scripts
```

- [ ] **Step 2: Write the failing test**

Create `tests/scripts/prompt-builder.test.js`:

```js
// tests/scripts/prompt-builder.test.js
import { describe, it, expect } from 'vitest'
import { buildMessages } from '../../scripts/utils/prompt-builder.js'

const baseContext = {
  signals: {
    date: '2026-03-14',
    weather: { location: 'Chicago', conditions: 'Sunny', feel: 'warm' },
  },
  contentSummary: 'Projects: foo.',
  currentFiles: [],
}

describe('buildMessages — notes field', () => {
  it('includes notes section when signals.notes is set', () => {
    const context = {
      ...baseContext,
      signals: { ...baseContext.signals, notes: 'I just got a hole in one!' },
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content
    expect(prompt).toContain('### Notes from site owner')
    expect(prompt).toContain('I just got a hole in one!')
  })

  it('omits notes section when signals.notes is null', () => {
    const context = {
      ...baseContext,
      signals: { ...baseContext.signals, notes: null },
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content
    expect(prompt).not.toContain('### Notes from site owner')
  })

  it('omits notes section when signals.notes is absent', () => {
    const { messages } = buildMessages(baseContext)
    const prompt = messages[0].content
    expect(prompt).not.toContain('### Notes from site owner')
  })
})
```

- [ ] **Step 3: Run to verify it fails**

```bash
pnpm test tests/scripts/prompt-builder.test.js
```

Expected: FAIL — "### Notes from site owner" not found in prompt.

- [ ] **Step 4: Add notes section to formatSignals()**

In `scripts/utils/prompt-builder.js`, find the end of `formatSignals()`. After the `mood_override` block (which ends around line 97 with `lines.push('')`) and before `return lines.join('\n')`, insert:

```js
  if (signals.notes) {
    lines.push('### Notes from site owner')
    lines.push(signals.notes)
    lines.push('')
  }
```

- [ ] **Step 5: Run to verify it passes**

```bash
pnpm test tests/scripts/prompt-builder.test.js
```

Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add scripts/utils/prompt-builder.js tests/scripts/prompt-builder.test.js
git commit -m "feat: add notes field to signals prompt for dev panel override"
```

---

## Chunk 2: Server Functions

### Task 7: readSignals and saveOverrides (TDD)

**Files:**
- Create: `app/server/signals.ts`
- Create: `tests/server/signals.test.ts`

Export both the server functions (for use in React components) and underscore-prefixed handler functions (for unit testing without the `createServerFn` wrapper).

- [ ] **Step 1: Create tests directory**

```bash
mkdir -p tests/server tests/fixtures
```

- [ ] **Step 2: Write the failing tests**

Create `tests/server/signals.test.ts`:

```ts
// tests/server/signals.test.ts
import { describe, it, expect, afterEach } from 'vitest'
import { writeFileSync, unlinkSync, readFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'
import { _readSignalsHandler, _saveOverridesHandler } from '../../app/server/signals.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FIXTURES_DIR = resolve(__dirname, '../fixtures')
const TEST_PATH = resolve(FIXTURES_DIR, 'test-signals.yml')

const sample = {
  date: '2026-03-14',
  weather: { location: 'Chicago', conditions: 'Sunny', feel: 'warm' },
  sports: [],
  mood_override: null,
  notes: null,
}

function writeYaml(data: object) {
  mkdirSync(FIXTURES_DIR, { recursive: true })
  writeFileSync(TEST_PATH, yaml.dump(data), 'utf8')
}

afterEach(() => {
  try { unlinkSync(TEST_PATH) } catch { /* ok */ }
})

describe('_readSignalsHandler', () => {
  it('returns parsed YAML', () => {
    writeYaml(sample)
    const result = _readSignalsHandler(TEST_PATH)
    expect(result.date).toBe('2026-03-14')
    expect((result.weather as Record<string, string>).location).toBe('Chicago')
  })
})

describe('_saveOverridesHandler', () => {
  it('writes mood_override', () => {
    writeYaml(sample)
    _saveOverridesHandler({ moodOverride: 'dark', notes: null }, TEST_PATH)
    const out = yaml.load(readFileSync(TEST_PATH, 'utf8')) as Record<string, unknown>
    expect(out.mood_override).toBe('dark')
  })

  it('clears mood_override when null', () => {
    writeYaml({ ...sample, mood_override: 'dark' })
    _saveOverridesHandler({ moodOverride: null, notes: null }, TEST_PATH)
    const out = yaml.load(readFileSync(TEST_PATH, 'utf8')) as Record<string, unknown>
    expect(out.mood_override).toBeNull()
  })

  it('writes notes', () => {
    writeYaml(sample)
    _saveOverridesHandler({ moodOverride: null, notes: 'Hole in one!' }, TEST_PATH)
    const out = yaml.load(readFileSync(TEST_PATH, 'utf8')) as Record<string, unknown>
    expect(out.notes).toBe('Hole in one!')
  })

  it('clears notes when null', () => {
    writeYaml({ ...sample, notes: 'old note' })
    _saveOverridesHandler({ moodOverride: null, notes: null }, TEST_PATH)
    const out = yaml.load(readFileSync(TEST_PATH, 'utf8')) as Record<string, unknown>
    expect(out.notes).toBeNull()
  })

  it('preserves other fields', () => {
    writeYaml(sample)
    _saveOverridesHandler({ moodOverride: 'dark', notes: 'hi' }, TEST_PATH)
    const out = yaml.load(readFileSync(TEST_PATH, 'utf8')) as Record<string, unknown>
    expect(out.date).toBe('2026-03-14')
  })
})
```

- [ ] **Step 3: Run to verify it fails**

```bash
pnpm test tests/server/signals.test.ts
```

Expected: FAIL — cannot find module `../../app/server/signals.js`.

- [ ] **Step 4: Create app/server/signals.ts**

```ts
// app/server/signals.ts
import { createServerFn } from '@tanstack/start'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import yaml from 'js-yaml'

const SIGNALS_PATH = resolve(process.cwd(), 'signals/today.yml')

// Exported for unit testing — pure logic without the server function wrapper
export function _readSignalsHandler(path = SIGNALS_PATH): Record<string, unknown> {
  const content = readFileSync(path, 'utf8')
  return yaml.load(content) as Record<string, unknown>
}

export function _saveOverridesHandler(
  data: { moodOverride: string | null; notes: string | null },
  path = SIGNALS_PATH
): void {
  const content = readFileSync(path, 'utf8')
  const signals = yaml.load(content) as Record<string, unknown>
  signals.mood_override = data.moodOverride ?? null
  signals.notes = data.notes || null
  writeFileSync(path, yaml.dump(signals), 'utf8')
}

// Server functions — never bundled to the client
export const readSignals = createServerFn({ method: 'GET' })
  .handler(() => _readSignalsHandler())

export const saveOverrides = createServerFn({ method: 'POST' })
  .validator((d: unknown) => d as { moodOverride: string | null; notes: string | null })
  .handler(({ data }) => {
    _saveOverridesHandler(data)
    return { ok: true }
  })
```

**Note on `createServerFn` API:** If `createServerFn({ method: 'GET' })` fails with a type error, check the installed version — some releases use `createServerFn('GET', handler)` (positional args) instead of the chained `.handler()` form. Check `node_modules/@tanstack/start/dist/` or the package changelog.

- [ ] **Step 5: Run to verify it passes**

```bash
pnpm test tests/server/signals.test.ts
```

Expected: PASS (6 tests).

- [ ] **Step 6: Commit**

```bash
git add app/server/signals.ts tests/server/signals.test.ts
git commit -m "feat: add readSignals and saveOverrides server functions"
```

---

### Task 8: readArchive server function (TDD)

**Files:**
- Create: `app/server/archive.ts`
- Create: `tests/server/archive.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/server/archive.test.ts`:

```ts
// tests/server/archive.test.ts
import { describe, it, expect, afterEach } from 'vitest'
import { mkdirSync, writeFileSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { _readArchiveHandler } from '../../app/server/archive.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FIXTURES_DIR = resolve(__dirname, '../fixtures/archive')

function writeArchiveEntry(date: string, brief: string) {
  const dir = resolve(FIXTURES_DIR, date)
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    resolve(dir, 'brief.md'),
    `# ${date}\n\n**Design Brief:** ${brief}\n\n## Signals\n`,
    'utf8'
  )
}

afterEach(() => {
  try { rmSync(FIXTURES_DIR, { recursive: true }) } catch { /* ok */ }
})

describe('_readArchiveHandler', () => {
  it('returns empty array when archive dir does not exist', () => {
    const result = _readArchiveHandler('/nonexistent/path')
    expect(result).toEqual([])
  })

  it('returns parsed entries sorted descending by date', () => {
    writeArchiveEntry('2026-03-12', 'Whiteout Protocol')
    writeArchiveEntry('2026-03-14', 'Post-blizzard brutalism')
    writeArchiveEntry('2026-03-13', 'Spring thaw')
    const result = _readArchiveHandler(FIXTURES_DIR)
    expect(result).toHaveLength(3)
    expect(result[0].date).toBe('2026-03-14')
    expect(result[1].date).toBe('2026-03-13')
    expect(result[2].date).toBe('2026-03-12')
  })

  it('extracts brief text correctly', () => {
    writeArchiveEntry('2026-03-14', 'Post-blizzard brutalism: heavy type, cold grays')
    const result = _readArchiveHandler(FIXTURES_DIR)
    expect(result[0].brief).toBe('Post-blizzard brutalism: heavy type, cold grays')
  })

  it('skips entries with missing brief.md', () => {
    mkdirSync(resolve(FIXTURES_DIR, '2026-03-14'), { recursive: true })
    // no brief.md written
    const result = _readArchiveHandler(FIXTURES_DIR)
    expect(result).toHaveLength(0)
  })

  it('returns at most 10 entries', () => {
    for (let i = 1; i <= 12; i++) {
      writeArchiveEntry(`2026-03-${String(i).padStart(2, '0')}`, `Design ${i}`)
    }
    const result = _readArchiveHandler(FIXTURES_DIR)
    expect(result).toHaveLength(10)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
pnpm test tests/server/archive.test.ts
```

Expected: FAIL — cannot find module `../../app/server/archive.js`.

- [ ] **Step 3: Create app/server/archive.ts**

```ts
// app/server/archive.ts
import { createServerFn } from '@tanstack/start'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { resolve, join } from 'path'

const ARCHIVE_PATH = resolve(process.cwd(), 'archive')

export interface ArchiveEntry {
  date: string
  brief: string
}

// Exported for unit testing — pure logic without the server function wrapper
export function _readArchiveHandler(archivePath = ARCHIVE_PATH): ArchiveEntry[] {
  if (!existsSync(archivePath)) return []

  return readdirSync(archivePath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const briefPath = join(archivePath, d.name, 'brief.md')
      if (!existsSync(briefPath)) return null
      const lines = readFileSync(briefPath, 'utf8').split('\n')
      const dateLine = lines.find(l => l.startsWith('# '))
      const briefLine = lines.find(l => l.startsWith('**Design Brief:** '))
      if (!dateLine || !briefLine) return null
      return {
        date: dateLine.slice(2).trim(),
        brief: briefLine.slice('**Design Brief:** '.length).trim(),
      }
    })
    .filter((e): e is ArchiveEntry => e !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10)
}

// Server function — never bundled to the client
export const readArchive = createServerFn({ method: 'GET' })
  .handler(() => _readArchiveHandler())
```

- [ ] **Step 4: Run to verify it passes**

```bash
pnpm test tests/server/archive.test.ts
```

Expected: PASS (5 tests).

- [ ] **Step 5: Run all tests**

```bash
pnpm test
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add app/server/archive.ts tests/server/archive.test.ts
git commit -m "feat: add readArchive server function"
```

---

## Chunk 3: SSE API Route

### Task 9: Pipeline SSE API route

**Files:**
- Create: `app/routes/api/pipeline.ts`

This route streams the pipeline child process output as Server-Sent Events. The `ReadableStream` is constructed with a `start` controller that wires up the child process events. `TextEncoder` converts strings to `Uint8Array` for the stream.

- [ ] **Step 1: Create the directory**

```bash
mkdir -p /Users/dougmarch/Projects/dougmarch/.worktrees/daily-redesign-phase1/app/routes/api
```

- [ ] **Step 2: Create app/routes/api/pipeline.ts**

```ts
// app/routes/api/pipeline.ts
import { createAPIFileRoute } from '@tanstack/start/api'
import { spawn } from 'child_process'
import { resolve } from 'path'

const SCRIPT_PATH = resolve(process.cwd(), 'scripts/daily-redesign.js')
const encoder = new TextEncoder()

function sseEvent(data: object): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
}

export const APIRoute = createAPIFileRoute('/api/pipeline')({
  GET: async ({ request }) => {
    const url = new URL(request.url)
    const dryRun = url.searchParams.get('dryRun') === 'true'

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response('ANTHROPIC_API_KEY not set', { status: 500 })
    }

    const stream = new ReadableStream({
      start(controller) {
        const child = spawn('node', [SCRIPT_PATH], {
          env: { ...process.env, DRY_RUN: dryRun ? 'true' : 'false' },
          cwd: process.cwd(),
        })

        const handleData = (chunk: Buffer) => {
          const lines = chunk.toString().split('\n').filter(l => l.trim())
          for (const line of lines) {
            controller.enqueue(sseEvent({ type: 'log', line }))
          }
        }

        child.stdout.on('data', handleData)
        child.stderr.on('data', handleData)

        child.on('close', (code) => {
          if (code === 0) {
            controller.enqueue(sseEvent({ type: 'done', success: true }))
          } else {
            controller.enqueue(sseEvent({ type: 'done', success: false, error: `Process exited with code ${code}` }))
          }
          controller.close()
        })

        child.on('error', (err) => {
          controller.enqueue(sseEvent({ type: 'done', success: false, error: err.message }))
          controller.close()
        })
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  },
})
```

**Note on `createAPIFileRoute`:** This is the TanStack Start API route pattern. If this import fails, check `@tanstack/start` exports — some versions export it from `@tanstack/start` directly rather than `@tanstack/start/api`. Adjust the import accordingly.

- [ ] **Step 3: Verify the route is accessible**

Start the dev server (`pnpm dev`) and run:

```bash
curl -N "http://localhost:3000/api/pipeline?dryRun=true"
```

Two valid outcomes:
- If `ANTHROPIC_API_KEY` is set in `.env` — you'll see SSE log lines streaming (`data: {"type":"log",...}`), followed by `data: {"type":"done",...}`. This confirms the route is working. Press Ctrl-C to stop.
- If `ANTHROPIC_API_KEY` is not set — you'll see `500 ANTHROPIC_API_KEY not set`. Add the key to `.env` or proceed knowing the full flow needs a key.

If you see a `404`, the API route is not being picked up — confirm `app/routes/api/pipeline.ts` exists and that TanStack Start is serving API routes from `app/routes/api/`.

- [ ] **Step 4: Commit**

```bash
git add app/routes/api/pipeline.ts
git commit -m "feat: add SSE pipeline API route (/api/pipeline)"
```

---

## Chunk 4: /dev Control Panel UI

### Task 10: Route skeleton with loader data

**Files:**
- Create: `app/routes/dev.tsx`

Create the route with its loader (server-side data fetch) and a minimal component that verifies data loads.

- [ ] **Step 1: Create app/routes/dev.tsx (skeleton)**

```tsx
// app/routes/dev.tsx
import { createFileRoute } from '@tanstack/react-router'
import { readSignals } from '../server/signals'
import { readArchive } from '../server/archive'

export const Route = createFileRoute('/dev')({
  loader: async () => {
    const [signals, archive] = await Promise.all([
      readSignals(),
      readArchive(),
    ])
    return { signals, archive }
  },
  component: DevPanel,
})

function DevPanel() {
  const { signals, archive } = Route.useLoaderData()

  return (
    <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif', maxWidth: '900px' }}>
      <h1>Daily Redesign</h1>
      <pre style={{ fontSize: '11px' }}>{JSON.stringify({ signals, archive }, null, 2)}</pre>
    </div>
  )
}
```

- [ ] **Step 2: Verify the route works**

Run `pnpm dev`, navigate to `http://localhost:3000/dev`. Expected: page renders, JSON dump shows signals and archive data. If `signals` is null/undefined, check that `readSignals` server function and `signals/today.yml` are reachable. If `archive` is empty array, that's expected if no archive entries exist yet.

- [ ] **Step 3: Commit skeleton**

```bash
git add app/routes/dev.tsx
git commit -m "feat: add /dev route skeleton with loader"
```

---

### Task 11: Header, signals cards, and overrides form

**Files:**
- Modify: `app/routes/dev.tsx`

Replace the skeleton with the full header + signals section + overrides form. Uses plain inline styles (not PandaCSS) since this is a dev tool and is not part of the daily redesign mutable files.

- [ ] **Step 1: Replace DevPanel with full header and signals section**

Replace the entire content of `app/routes/dev.tsx` with:

```tsx
// app/routes/dev.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { readSignals, saveOverrides } from '../server/signals'
import { readArchive, type ArchiveEntry } from '../server/archive'

export const Route = createFileRoute('/dev')({
  loader: async () => {
    const [signals, archive] = await Promise.all([
      readSignals(),
      readArchive(),
    ])
    return { signals, archive }
  },
  component: DevPanel,
})

// ─── Types ────────────────────────────────────────────────────────────────────

interface Signals {
  date: string
  weather?: { location: string; conditions: string; feel: string }
  sports?: Array<{ team: string; result: string; notes?: string }>
  golf?: string[]
  github_trending?: Array<{ repo: string; description: string; stars?: number }>
  news?: string[]
  mood_override?: string | null
  notes?: string | null
}

type PipelineStatus = 'idle' | 'running' | 'success' | 'error'

interface Phase {
  label: string
  pattern: string
  status: 'pending' | 'active' | 'done'
}

const INITIAL_PHASES: Phase[] = [
  { label: 'Read signals',    pattern: '[1/4] Reading site context', status: 'pending' },
  { label: 'Build prompt',    pattern: '[2/4] Building Claude prompt', status: 'pending' },
  { label: 'Claude thinking', pattern: 'calling Claude API', status: 'pending' },
  { label: 'Write files',     pattern: 'writing files', status: 'pending' },
  { label: 'Build & validate',pattern: 'running pnpm build', status: 'pending' },
  { label: 'Archive & commit',pattern: '=== Build passed!', status: 'pending' },
]

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  page: { padding: '28px 32px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '13px', color: '#1e293b', maxWidth: '960px' } as React.CSSProperties,
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' } as React.CSSProperties,
  title: { fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 } as React.CSSProperties,
  meta: { fontSize: '12px', color: '#94a3b8', marginTop: '3px' } as React.CSSProperties,
  badge: { display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '4px 10px', fontSize: '11px', fontWeight: 500 } as React.CSSProperties,
  signalsGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px' } as React.CSSProperties,
  signalCard: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' } as React.CSSProperties,
  signalLabel: { fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#94a3b8', marginBottom: '6px' },
  signalMain: { fontSize: '12px', fontWeight: 500, color: '#1e293b', lineHeight: '1.4' } as React.CSSProperties,
  signalSub: { fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: '1.3' } as React.CSSProperties,
  overridesRow: { display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'flex-end' } as React.CSSProperties,
  fieldGroup: { display: 'flex', flexDirection: 'column' as const, gap: '5px' },
  fieldLabel: { fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#94a3b8' },
  select: { border: '1px solid #e2e8f0', borderRadius: '6px', padding: '7px 10px', fontSize: '12px', color: '#1e293b', background: '#fff', fontFamily: 'inherit', minWidth: '160px' } as React.CSSProperties,
  textarea: { border: '1px solid #e2e8f0', borderRadius: '6px', padding: '7px 10px', fontSize: '12px', color: '#1e293b', background: '#fff', fontFamily: 'inherit', resize: 'none' as const, height: '56px', width: '340px' } as React.CSSProperties,
  saveBtn: { background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '7px 14px', fontSize: '12px', fontWeight: 500, color: '#475569', cursor: 'pointer', height: '34px' } as React.CSSProperties,
}

// ─── Component ────────────────────────────────────────────────────────────────

function DevPanel() {
  const { signals: initialSignals, archive } = Route.useLoaderData()
  const signals = initialSignals as Signals

  const [moodOverride, setMoodOverride] = useState<string>(signals.mood_override ?? '')
  const [notes, setNotes] = useState<string>(signals.notes ?? '')
  const [savingOverrides, setSavingOverrides] = useState(false)

  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus>('idle')
  const [dryRun, setDryRun] = useState(false)
  const [phases, setPhases] = useState<Phase[]>(INITIAL_PHASES)
  const [logLines, setLogLines] = useState<string[]>([])
  const logAccumRef = useRef<string[]>([])  // ref for stale-closure-safe access in EventSource handlers
  const [attemptNum, setAttemptNum] = useState(1)
  const [result, setResult] = useState<{ brief?: string; timestamp?: string; error?: string } | null>(null)

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  // ── Save overrides ──────────────────────────────────────────────────────────
  const handleSaveOverrides = async () => {
    setSavingOverrides(true)
    try {
      await saveOverrides({ moodOverride: moodOverride || null, notes: notes || null })
    } finally {
      setSavingOverrides(false)
    }
  }

  // ── Run pipeline ────────────────────────────────────────────────────────────
  const handleRun = () => {
    setPipelineStatus('running')
    setPhases(INITIAL_PHASES)
    setLogLines([])
    logAccumRef.current = []  // reset ref so done handler sees fresh log lines
    setAttemptNum(1)
    setResult(null)

    const es = new EventSource(`/api/pipeline?dryRun=${dryRun}`)

    es.onmessage = (e) => {
      const event = JSON.parse(e.data) as
        | { type: 'log'; line: string }
        | { type: 'done'; success: boolean; error?: string }

      if (event.type === 'log') {
        const line = event.line
        logAccumRef.current = [...logAccumRef.current, line]
        setLogLines([...logAccumRef.current])

        // Retry detection — reset phases to "Claude thinking" as active, prior phases done
        if (line.includes('--- Attempt')) {
          const match = line.match(/Attempt (\d+)/)
          if (match) setAttemptNum(Number(match[1]))
          setPhases(prev => prev.map((p, i) =>
            i < 2 ? { ...p, status: 'done' } :
            i === 2 ? { ...p, status: 'active' } :
            { ...p, status: 'pending' }
          ))
          return
        }

        // Phase advancement — find the matched phase, mark all prior as done, matched as active
        setPhases(prev => {
          const matchIdx = prev.findIndex(p => line.includes(p.pattern))
          if (matchIdx === -1) return prev
          return prev.map((p, i) => {
            if (i < matchIdx) return { ...p, status: 'done' }
            if (i === matchIdx) return { ...p, status: 'active' }
            return p
          })
        })
      }

      if (event.type === 'done') {
        es.close()
        if (event.success) {
          setPhases(prev => prev.map(p => ({ ...p, status: 'done' })))
          // Use ref (not state) to get all accumulated log lines — state is stale in this closure
          const briefLine = [...logAccumRef.current].reverse().find(l => l.includes('design_brief:'))
          const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          setPipelineStatus('success')
          setResult({ brief: briefLine?.split('design_brief: ')[1] ?? 'Run complete', timestamp })
        } else {
          setPipelineStatus('error')
          setResult({ error: event.error ?? 'Unknown error' })
        }
      }
    }

    es.onerror = () => {
      es.close()
      setPipelineStatus('error')
      setResult({ error: 'Connection to pipeline server lost' })
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={s.page}>

      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Daily Redesign</h1>
          <div style={s.meta}>{today}</div>
        </div>
        <div style={s.badge}>dev server running</div>
      </div>

      {/* Signals */}
      <div style={s.signalsGrid}>
        <SignalCard label="Weather" icon="🌨️"
          main={signals.weather?.location ?? '—'}
          sub={signals.weather ? `${signals.weather.conditions} · ${signals.weather.feel}` : ''} />
        <SignalCard label="Sports" icon="🏀"
          main={signals.sports?.[0] ? `${signals.sports[0].team}` : '—'}
          sub={signals.sports?.[0]?.result ?? ''} />
        <SignalCard label="Golf" icon="⛳"
          main={signals.golf?.[0]?.slice(0, 30) ?? '—'}
          sub={signals.golf?.[1] ?? ''} />
        <SignalCard label="GitHub" icon="⭐"
          main={signals.github_trending?.[0]?.repo ?? '—'}
          sub={`${signals.github_trending?.[0]?.stars?.toLocaleString() ?? '?'} stars`} />
        <SignalCard label="News" icon="📰"
          main={signals.news?.[0]?.slice(0, 40) ?? '—'}
          sub={signals.news?.[1]?.slice(0, 40) ?? ''} />
      </div>

      {/* Overrides */}
      <div style={s.overridesRow}>
        <div style={s.fieldGroup}>
          <div style={s.fieldLabel}>Mood Override</div>
          <select style={s.select} value={moodOverride} onChange={e => setMoodOverride(e.target.value)}>
            <option value="">— none (Claude decides) —</option>
            <option value="dark">dark</option>
            <option value="celebratory">celebratory</option>
            <option value="tense">tense</option>
            <option value="playful">playful</option>
          </select>
        </div>
        <div style={s.fieldGroup}>
          <div style={s.fieldLabel}>Notes for Claude</div>
          <textarea
            style={s.textarea}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Optional extra context, e.g. 'I just got a hole in one'"
          />
        </div>
        <button style={s.saveBtn} onClick={handleSaveOverrides} disabled={savingOverrides}>
          {savingOverrides ? 'Saving...' : 'Save overrides'}
        </button>
      </div>

      {/* Run */}
      <RunSection
        pipelineStatus={pipelineStatus}
        dryRun={dryRun}
        onDryRunChange={setDryRun}
        onRun={handleRun}
        archive={archive as ArchiveEntry[]}
      />

      {/* Progress / Result */}
      {pipelineStatus === 'running' && (
        <ProgressSection phases={phases} logLines={logLines} attemptNum={attemptNum} />
      )}
      {pipelineStatus === 'success' && result && (
        <SuccessSection
          brief={result.brief ?? ''}
          timestamp={result.timestamp ?? ''}
          attemptNum={attemptNum}
          archive={archive as ArchiveEntry[]}
        />
      )}
      {pipelineStatus === 'error' && result && (
        <ErrorSection error={result.error ?? 'Unknown error'} onRetry={handleRun} />
      )}

    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SignalCard({ label, icon, main, sub }: { label: string; icon: string; main: string; sub: string }) {
  return (
    <div style={s.signalCard}>
      <div style={s.signalLabel}>{label}</div>
      <div style={{ fontSize: '20px', marginBottom: '5px' }}>{icon}</div>
      <div style={s.signalMain}>{main}</div>
      {sub && <div style={s.signalSub}>{sub}</div>}
    </div>
  )
}

function RunSection({ pipelineStatus, dryRun, onDryRunChange, onRun, archive }: {
  pipelineStatus: PipelineStatus
  dryRun: boolean
  onDryRunChange: (v: boolean) => void
  onRun: () => void
  archive: ArchiveEntry[]
}) {
  const lastRun = archive[0]
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
      <button
        onClick={onRun}
        disabled={pipelineStatus === 'running'}
        style={{ background: pipelineStatus === 'running' ? '#818cf8' : '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', fontWeight: 600, cursor: pipelineStatus === 'running' ? 'default' : 'pointer' }}
      >
        {pipelineStatus === 'running' ? '⏳ Running...' : '▶ Run Pipeline'}
      </button>
      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
        <input type="checkbox" checked={dryRun} onChange={e => onDryRunChange(e.target.checked)} />
        Dry run (no commit)
      </label>
      {lastRun && (
        <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#94a3b8' }}>
          Last run: <strong style={{ color: '#475569' }}>{lastRun.date}</strong> · <em>{lastRun.brief.slice(0, 50)}…</em>
        </div>
      )}
    </div>
  )
}

function ProgressSection({ phases, logLines, attemptNum }: { phases: Phase[]; logLines: string[]; attemptNum: number }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '10px 14px', fontSize: '12px', fontWeight: 600, color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
        <span>Pipeline · Attempt {attemptNum} of 3</span>
        <span style={{ color: '#f59e0b' }}>● running</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
        {/* Phase tracker */}
        <div style={{ padding: '14px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '9px' }}>
          {phases.map(p => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <PhaseDot status={p.status} />
              <span style={{ fontSize: '11px', color: p.status === 'pending' ? '#cbd5e1' : p.status === 'done' ? '#94a3b8' : '#0f172a', fontWeight: p.status === 'active' ? 600 : 400, textDecoration: p.status === 'done' ? 'line-through' : 'none' }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>
        {/* Log pane */}
        <div style={{ background: '#0f172a', padding: '14px', fontFamily: 'Courier New, monospace', fontSize: '11px', lineHeight: '1.7', color: '#94a3b8', minHeight: '180px', maxHeight: '220px', overflowY: 'auto' }}>
          {logLines.map((line, i) => (
            <div key={i} style={{ color: line.includes('===') || line.includes('calling Claude') ? '#fbbf24' : '#64748b' }}>{line}</div>
          ))}
          <span style={{ color: '#fbbf24' }}>▌</span>
        </div>
      </div>
    </div>
  )
}

function PhaseDot({ status }: { status: 'pending' | 'active' | 'done' }) {
  const base = { width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' } as React.CSSProperties
  if (status === 'done') return <div style={{ ...base, background: '#22c55e', color: 'white' }}>✓</div>
  if (status === 'active') return <div style={{ ...base, background: '#f59e0b' }} />
  return <div style={{ ...base, background: '#e2e8f0' }} />
}

function SuccessSection({ brief, timestamp, attemptNum, archive }: {
  brief: string
  timestamp: string
  attemptNum: number
  archive: ArchiveEntry[]
}) {
  const today = new Date().toISOString().slice(0, 10)
  return (
    <div style={{ border: '1px solid #bbf7d0', borderRadius: '8px', background: '#f0fdf4', overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #bbf7d0' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>✓</div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>Build passed · committed</div>
          <div style={{ fontSize: '12px', color: '#16a34a', fontStyle: 'italic' }}>"{brief}"</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '11px', color: '#86efac', textAlign: 'right' as const }}>
          {timestamp} · {attemptNum} attempt{attemptNum !== 1 ? 's' : ''}
        </div>
        <button
          onClick={() => window.open('http://localhost:3000', '_blank')}
          style={{ background: '#166534', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 12px', fontSize: '11px', fontWeight: 500, cursor: 'pointer', flexShrink: 0 }}
        >
          Open site ↗
        </button>
      </div>
      <div style={{ padding: '10px 16px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#86efac', marginBottom: '8px' }}>Recent designs</div>
        {archive.map((entry, i) => {
          const isToday = entry.date === today
          return (
            <div key={entry.date} style={{ display: 'flex', gap: '10px', padding: '6px 0', borderBottom: i < archive.length - 1 ? '1px solid #dcfce7' : 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: isToday ? 700 : 600, color: isToday ? '#166534' : '#16a34a', minWidth: '85px' }}>
                {entry.date}{isToday ? ' ✦' : ''}
              </span>
              <span style={{ fontSize: '11px', color: isToday ? '#166534' : '#4ade80', fontStyle: 'italic', fontWeight: isToday ? 600 : 400 }}>{entry.brief}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ErrorSection({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div style={{ border: '1px solid #fecaca', borderRadius: '8px', background: '#fef2f2', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <div style={{ color: '#dc2626', fontSize: '18px', flexShrink: 0 }}>✕</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#991b1b', marginBottom: '4px' }}>Pipeline failed</div>
        <div style={{ fontSize: '11px', color: '#b91c1c', fontFamily: 'monospace' }}>{error}</div>
      </div>
      <button
        onClick={onRetry}
        style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', padding: '7px 14px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', flexShrink: 0 }}
      >
        Retry
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Verify the full panel renders**

Run `pnpm dev`, navigate to `http://localhost:3000/dev`. Verify:
- Header shows title and date
- 5 signal cards populate with data from `signals/today.yml`
- Mood override dropdown and notes textarea are editable
- "Save overrides" writes to `signals/today.yml` (check file after saving)
- "Run Pipeline" button is visible

- [ ] **Step 3: Test the pipeline run (dry run)**

Check the dry run checkbox, click "Run Pipeline". Expected:
- Button changes to "⏳ Running..."
- Phase dots advance as log lines appear
- Log pane scrolls with timestamped lines
- After ~2 minutes, transitions to success or error state

- [ ] **Step 4: Commit**

```bash
git add app/routes/dev.tsx
git commit -m "feat: add /dev control panel UI (signals, overrides, run, progress, archive)"
```

---

### Task 12: Final commit and push

- [ ] **Step 1: Run all tests one final time**

```bash
pnpm test
```

Expected: all tests pass.

- [ ] **Step 2: Run a production build to confirm nothing is broken**

```bash
pnpm build
```

Expected: exits 0, no TypeScript or PandaCSS errors.

- [ ] **Step 3: Push to remote**

```bash
git push origin feature/daily-redesign-phase1
```

---

## Appendix: Troubleshooting

**`@tanstack/start/client` not found:** Check `node_modules/@tanstack/start/package.json` → `exports` field. The subpath may be `./client` vs `/client`. Adjust imports in `app/client.tsx` and `app/routes/__root.tsx`.

**`createServerFn` type errors:** The `.handler()` chained API was introduced in a specific version. Older versions use `createServerFn('GET', async () => {...})`. Check the installed version and adjust.

**`createAPIFileRoute` not found:** Try importing from `@tanstack/start` directly (not `@tanstack/start/api`). Some versions export it from the main package.

**Vinxi build output is in `.output/` not `dist/`:** This is expected. The daily redesign pipeline uses `pnpm build` only for validation — it doesn't care about the output directory.

**Phase tracker not advancing:** Add `console.log` in the `onmessage` handler to verify the SSE events are arriving and that `line.includes(pattern)` matches. Compare exact log strings from `daily-redesign.js` with the patterns in `INITIAL_PHASES`.
