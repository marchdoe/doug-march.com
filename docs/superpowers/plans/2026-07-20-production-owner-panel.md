# Production Owner Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A basic-auth-protected `/panel` route on doug-march.com where Doug rates the daily design, browses the archive, adjusts creative weights, and triggers pipeline runs — all proxied to GitHub so the existing pipeline intake is untouched.

**Architecture:** Vercel Edge (Routing) Middleware enforces HTTP Basic Auth on `/panel` and `/api/panel/*`. Four Vercel serverless functions under `api/panel/` call the GitHub REST API with a fine-grained PAT: ratings become YAML comments on the daily `Rate:` issue (parsed by the existing `scripts/collect-ratings.js` harvest), weights become GitHub Actions repository variables, runs use `workflow_dispatch`. The SPA gains one new TanStack Router route (`/panel`) with four tabs.

**Tech Stack:** TypeScript (strict), Vercel serverless functions (web-standard `Request`/`Response` handlers), `@vercel/functions` (middleware `next()`), `@base-ui-components/react` (Tabs/Slider), PandaCSS `css()`, Vitest.

**Spec:** `docs/superpowers/specs/2026-07-20-production-owner-panel-design.md`

## Global Constraints

- Package manager: **pnpm** only.
- TypeScript strict; **no `any`** — use `unknown` and narrow (casting parsed JSON to `Record<string, unknown>` is acceptable).
- Styling: PandaCSS `css()` imported from `styled-system/css` (relative path); **no inline `style` props, no Tailwind**.
- Components: Base UI primitives first (`@base-ui-components/react`).
- GitHub repo: `marchdoe/doug-march.com`. Workflow file: `daily-redesign.yml`. Rating issue label: `daily-rating`. Issue title format: `Rate: YYYY-MM-DD` (regex in harvest: `/Rate:\s*(\d{4}-\d{2}-\d{2})/`).
- Env var names (Vercel): `PANEL_USER`, `PANEL_PASSWORD`, `GH_PANEL_TOKEN`.
- Repo variable names: `WEIGHT_SIGNALS`, `WEIGHT_INSPIRATION`, `WEIGHT_RATINGS`, `WEIGHT_RISK` (defaults 5/5/5/8 — must match `scripts/design-agents.js:421-424`).
- The daily pipeline rewrites only `app/components/Layout.tsx`, `app/components/Sidebar.tsx`, `app/routes/{index,about,work.$slug,og}.tsx` — new panel files are safe, but do NOT add panel code to those files.
- Work on branch `feat/owner-panel` off `main`. Run `pnpm fallow --summary` before opening the PR.
- Files in `api/` starting with `_` are NOT deployed as functions (Vercel convention) — shared code goes in `api/_lib/`.
- Vitest runs in node environment by default; the one component test uses a `// @vitest-environment jsdom` pragma.

## File Structure

| File | Responsibility |
|---|---|
| `middleware.ts` (repo root) | Edge middleware: basic-auth gate for `/panel` + `/api/panel/*` |
| `api/_lib/auth.ts` | Parse/verify `Authorization: Basic` header (constant-time), 401/`requireAuth` helpers |
| `api/_lib/http.ts` | `json()` response helper |
| `api/_lib/rating-format.ts` | Build the YAML comment `collect-ratings.js` parses |
| `api/_lib/github.ts` | GitHub REST client: issues, variables, workflow dispatch/runs |
| `api/panel/rate.ts` | `POST` — comment/create the day's `Rate:` issue |
| `api/panel/status.ts` | `GET` — unrated issues + current weights + latest run |
| `api/panel/weights.ts` | `PUT` — upsert the four repo variables |
| `api/panel/run.ts` | `POST` — `workflow_dispatch` |
| `app/routes/panel.tsx` | Route shell: loads status, renders Base UI Tabs |
| `app/components/panel/api.ts` | Typed client fetch helpers + shared panel types |
| `app/components/panel/RateTab.tsx` | Grade + notes form, unrated backlog |
| `app/components/panel/ArchiveTab.tsx` | Archive list with grades (reads static JSON) |
| `app/components/panel/WeightsTab.tsx` | Four sliders + save |
| `app/components/panel/RunTab.tsx` | Trigger button + latest run status |
| `scripts/utils/ratings.js` | (modify) add `readRatingForDate` export; reuse in `readRecentRatings` |
| `scripts/generate-archive-json.js` | (modify) include rating in `_data.json` + `_detail.json` |
| `.github/workflows/daily-redesign.yml` | (modify) read `WEIGHT_*` from repo variables with fallbacks |

---

### Task 1: Branch, dependencies, auth helper + middleware

**Files:**
- Create: `api/_lib/auth.ts`, `middleware.ts`
- Test: `tests/api/auth.test.ts`
- Modify: `package.json` (via pnpm add)

**Interfaces:**
- Consumes: nothing.
- Produces: `checkBasicAuth(header: string | null, user: string, pass: string): boolean`; `unauthorized(): Response`; `requireAuth(request: Request): Response | null` (null = authorized; a `Response` = return it as-is). Later tasks import these from `../_lib/auth`.

- [ ] **Step 1: Branch + install deps**

```bash
git checkout -b feat/owner-panel
pnpm add @vercel/functions @base-ui-components/react
git add package.json pnpm-lock.yaml
git commit -m "chore(panel): add @vercel/functions and @base-ui-components/react"
```

- [ ] **Step 2: Write the failing test**

Create `tests/api/auth.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { checkBasicAuth, requireAuth, unauthorized } from '../../api/_lib/auth'

const header = (user: string, pass: string) => `Basic ${btoa(`${user}:${pass}`)}`

describe('checkBasicAuth', () => {
  it('accepts correct credentials', () => {
    expect(checkBasicAuth(header('doug', 's3cret'), 'doug', 's3cret')).toBe(true)
  })
  it('rejects wrong password', () => {
    expect(checkBasicAuth(header('doug', 'wrong'), 'doug', 's3cret')).toBe(false)
  })
  it('rejects wrong user', () => {
    expect(checkBasicAuth(header('bob', 's3cret'), 'doug', 's3cret')).toBe(false)
  })
  it('rejects missing header', () => {
    expect(checkBasicAuth(null, 'doug', 's3cret')).toBe(false)
  })
  it('rejects non-Basic scheme', () => {
    expect(checkBasicAuth('Bearer abc', 'doug', 's3cret')).toBe(false)
  })
  it('rejects malformed base64', () => {
    expect(checkBasicAuth('Basic %%%not-base64%%%', 'doug', 's3cret')).toBe(false)
  })
  it('rejects payload without colon', () => {
    expect(checkBasicAuth(`Basic ${btoa('nocolon')}`, 'doug', 's3cret')).toBe(false)
  })
  it('handles password containing colons', () => {
    expect(checkBasicAuth(header('doug', 'a:b:c'), 'doug', 'a:b:c')).toBe(true)
  })
})

describe('unauthorized', () => {
  it('returns 401 with WWW-Authenticate challenge', () => {
    const res = unauthorized()
    expect(res.status).toBe(401)
    expect(res.headers.get('www-authenticate')).toBe('Basic realm="owner panel"')
  })
})

describe('requireAuth', () => {
  beforeEach(() => {
    process.env.PANEL_USER = 'doug'
    process.env.PANEL_PASSWORD = 's3cret'
  })
  it('returns null when authorized', () => {
    const req = new Request('https://x/api/panel/status', { headers: { authorization: header('doug', 's3cret') } })
    expect(requireAuth(req)).toBeNull()
  })
  it('returns 401 Response when unauthorized', () => {
    const req = new Request('https://x/api/panel/status')
    expect(requireAuth(req)?.status).toBe(401)
  })
  it('returns 503 when env is not configured', () => {
    delete process.env.PANEL_USER
    const req = new Request('https://x/api/panel/status')
    expect(requireAuth(req)?.status).toBe(503)
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `pnpm test tests/api/auth.test.ts`
Expected: FAIL — cannot resolve `../../api/_lib/auth`

- [ ] **Step 4: Implement `api/_lib/auth.ts`**

Constant-time comparison is hand-rolled (no `node:crypto`) because the middleware may execute on the Edge runtime:

```typescript
/** Constant-time string comparison — length leak only, never content. */
function safeEqual(a: string, b: string): boolean {
  let diff = a.length === b.length ? 0 : 1
  const len = Math.max(a.length, b.length)
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0)
  }
  return diff === 0
}

export function checkBasicAuth(header: string | null, user: string, pass: string): boolean {
  if (!header || !header.startsWith('Basic ')) return false
  let decoded: string
  try {
    decoded = atob(header.slice(6))
  } catch {
    return false
  }
  const idx = decoded.indexOf(':')
  if (idx === -1) return false
  return safeEqual(decoded, `${user}:${pass}`)
}

export function unauthorized(): Response {
  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="owner panel"' },
  })
}

/** Returns null when the request is authorized, otherwise the Response to send. */
export function requireAuth(request: Request): Response | null {
  const user = process.env.PANEL_USER
  const pass = process.env.PANEL_PASSWORD
  if (!user || !pass) return new Response('Panel auth not configured', { status: 503 })
  return checkBasicAuth(request.headers.get('authorization'), user, pass) ? null : unauthorized()
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test tests/api/auth.test.ts`
Expected: PASS (12 tests)

- [ ] **Step 6: Create `middleware.ts` at repo root**

```typescript
import { next } from '@vercel/functions'
import { checkBasicAuth, unauthorized } from './api/_lib/auth'

export const config = {
  matcher: ['/panel', '/panel/:path*', '/api/panel/:path*'],
}

export default function middleware(request: Request): Response {
  const user = process.env.PANEL_USER
  const pass = process.env.PANEL_PASSWORD
  if (!user || !pass) return new Response('Panel auth not configured', { status: 503 })
  if (!checkBasicAuth(request.headers.get('authorization'), user, pass)) {
    return unauthorized()
  }
  return next()
}
```

- [ ] **Step 7: Commit**

```bash
git add api/_lib/auth.ts middleware.ts tests/api/auth.test.ts
git commit -m "feat(panel): basic-auth helper + edge middleware gate for /panel and /api/panel"
```

---

### Task 2: Rating comment formatter (round-trips through the harvest parser)

**Files:**
- Create: `api/_lib/rating-format.ts`, `api/_lib/http.ts`
- Test: `tests/api/rating-format.test.ts`

**Interfaces:**
- Consumes: `parseRatingFromIssue(issue)` exported by `scripts/collect-ratings.js` (test-only import).
- Produces: `type Grade = 'A' | 'B' | 'C' | 'D'`; `interface RatingInput { grade: Grade; worked: string; didnt: string; try: string }`; `formatRatingComment(r: RatingInput): string`; `json(data: unknown, status?: number): Response`.

- [ ] **Step 1: Write the failing test**

Create `tests/api/rating-format.test.ts`. The round-trip against the real harvest parser is the load-bearing test — if `formatRatingComment` output ever stops parsing, tomorrow's build silently loses the rating:

```typescript
import { describe, it, expect } from 'vitest'
import { formatRatingComment } from '../../api/_lib/rating-format'
// Real harvest parser — the round-trip target.
import { parseRatingFromIssue } from '../../scripts/collect-ratings.js'

const issueWith = (comment: string) => ({
  title: 'Rate: 2026-07-20 — "Breadboard-amber Poster"',
  body: '',
  comments: [{ body: comment }],
})

describe('formatRatingComment', () => {
  it('round-trips through parseRatingFromIssue', () => {
    const comment = formatRatingComment({
      grade: 'B',
      worked: 'the amber drench',
      didnt: 'cramped sidebar',
      try: 'bigger hero type',
    })
    const parsed = parseRatingFromIssue(issueWith(comment))
    expect(parsed).toEqual({
      date: '2026-07-20',
      grade: 'B',
      worked: 'the amber drench',
      didnt: 'cramped sidebar',
      try: 'bigger hero type',
    })
  })

  it('survives double quotes and newlines in notes', () => {
    const comment = formatRatingComment({
      grade: 'A',
      worked: 'the "drench" was\ngreat',
      didnt: '',
      try: '',
    })
    const parsed = parseRatingFromIssue(issueWith(comment))
    expect(parsed?.grade).toBe('A')
    expect(parsed?.worked).toBe("the 'drench' was great")
  })

  it('round-trips empty notes', () => {
    const comment = formatRatingComment({ grade: 'D', worked: '', didnt: '', try: '' })
    const parsed = parseRatingFromIssue(issueWith(comment))
    expect(parsed).toEqual({ date: '2026-07-20', grade: 'D', worked: '', didnt: '', try: '' })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/api/rating-format.test.ts`
Expected: FAIL — cannot resolve `../../api/_lib/rating-format`

- [ ] **Step 3: Implement `api/_lib/rating-format.ts`**

Constraints from `parseRatingFromIssue` (scripts/collect-ratings.js:15-33): values are single-line (`^...$` per line), surrounding quotes are stripped, inner double quotes would corrupt the strip — so newlines collapse to spaces and `"` becomes `'`:

```typescript
export type Grade = 'A' | 'B' | 'C' | 'D'

export interface RatingInput {
  grade: Grade
  worked: string
  didnt: string
  try: string
}

function clean(value: string): string {
  return value.replace(/\s+/g, ' ').replace(/"/g, "'").trim()
}

/** Build the YAML-fenced comment that scripts/collect-ratings.js harvests. */
export function formatRatingComment(r: RatingInput): string {
  return [
    '```yaml',
    `grade: ${r.grade}`,
    `worked: "${clean(r.worked)}"`,
    `didnt: "${clean(r.didnt)}"`,
    `try: "${clean(r.try)}"`,
    '```',
  ].join('\n')
}
```

- [ ] **Step 4: Implement `api/_lib/http.ts`**

```typescript
export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test tests/api/rating-format.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add api/_lib/rating-format.ts api/_lib/http.ts tests/api/rating-format.test.ts
git commit -m "feat(panel): rating comment formatter with harvest round-trip test"
```

---

### Task 3: GitHub REST client

**Files:**
- Create: `api/_lib/github.ts`
- Test: `tests/api/github.test.ts`

**Interfaces:**
- Consumes: `process.env.GH_PANEL_TOKEN`.
- Produces (all exported from `../_lib/github`):
  - `class GitHubError extends Error { status: number }`
  - `interface RatingIssue { number: number; date: string; title: string; url: string }`
  - `listOpenRatingIssues(): Promise<RatingIssue[]>`
  - `findOpenRatingIssue(date: string): Promise<RatingIssue | null>`
  - `commentOnIssue(issueNumber: number, body: string): Promise<void>`
  - `createRatingIssue(date: string, body: string): Promise<RatingIssue>`
  - `interface Weights { signals: number; inspiration: number; ratings: number; risk: number }`
  - `getWeights(): Promise<Weights>`
  - `setWeights(w: Weights): Promise<void>`
  - `dispatchRun(dryRun: boolean): Promise<void>`
  - `interface RunInfo { status: string; conclusion: string | null; url: string; createdAt: string }`
  - `latestRun(): Promise<RunInfo | null>`

- [ ] **Step 1: Write the failing test**

Create `tests/api/github.test.ts` (mock global `fetch`; assert URLs, methods, payloads, and 404-upsert behavior):

```typescript
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import {
  listOpenRatingIssues, findOpenRatingIssue, commentOnIssue, createRatingIssue,
  getWeights, setWeights, dispatchRun, latestRun, GitHubError,
} from '../../api/_lib/github'

const fetchMock = vi.fn()

function jsonRes(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })
}

beforeEach(() => {
  process.env.GH_PANEL_TOKEN = 'test-token'
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
})
afterEach(() => vi.unstubAllGlobals())

describe('listOpenRatingIssues', () => {
  it('maps issues and extracts dates from titles', async () => {
    fetchMock.mockResolvedValueOnce(jsonRes([
      { number: 82, title: 'Rate: 2026-07-20 — "Breadboard"', html_url: 'https://github.com/x/82' },
      { number: 99, title: 'unrelated title', html_url: 'https://github.com/x/99' },
    ]))
    const issues = await listOpenRatingIssues()
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://api.github.com/repos/marchdoe/doug-march.com/issues?labels=daily-rating&state=open&per_page=30'
    )
    expect(issues).toEqual([{ number: 82, date: '2026-07-20', title: 'Rate: 2026-07-20 — "Breadboard"', url: 'https://github.com/x/82' }])
  })
  it('sends the token as a Bearer header', async () => {
    fetchMock.mockResolvedValueOnce(jsonRes([]))
    await listOpenRatingIssues()
    const init = fetchMock.mock.calls[0][1] as RequestInit
    expect(new Headers(init.headers).get('authorization')).toBe('Bearer test-token')
  })
  it('throws GitHubError on non-2xx', async () => {
    fetchMock.mockResolvedValueOnce(jsonRes({ message: 'bad' }, 500))
    await expect(listOpenRatingIssues()).rejects.toBeInstanceOf(GitHubError)
  })
  it('throws when GH_PANEL_TOKEN is missing', async () => {
    delete process.env.GH_PANEL_TOKEN
    await expect(listOpenRatingIssues()).rejects.toBeInstanceOf(GitHubError)
  })
})

describe('findOpenRatingIssue', () => {
  it('returns the issue matching the date, else null', async () => {
    const payload = [{ number: 82, title: 'Rate: 2026-07-20 — "x"', html_url: 'u' }]
    fetchMock.mockResolvedValue(jsonRes(payload))
    expect((await findOpenRatingIssue('2026-07-20'))?.number).toBe(82)
    expect(await findOpenRatingIssue('2026-07-19')).toBeNull()
  })
})

describe('commentOnIssue / createRatingIssue', () => {
  it('POSTs the comment body', async () => {
    fetchMock.mockResolvedValueOnce(jsonRes({}, 201))
    await commentOnIssue(82, 'hello')
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.github.com/repos/marchdoe/doug-march.com/issues/82/comments')
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body as string)).toEqual({ body: 'hello' })
  })
  it('creates a labeled issue titled Rate: {date}', async () => {
    fetchMock.mockResolvedValueOnce(jsonRes({ number: 90, title: 'Rate: 2026-07-19', html_url: 'u' }, 201))
    const issue = await createRatingIssue('2026-07-19', 'body')
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.github.com/repos/marchdoe/doug-march.com/issues')
    expect(JSON.parse(init.body as string)).toEqual({ title: 'Rate: 2026-07-19', body: 'body', labels: ['daily-rating'] })
    expect(issue).toEqual({ number: 90, date: '2026-07-19', title: 'Rate: 2026-07-19', url: 'u' })
  })
})

describe('getWeights', () => {
  it('reads the four variables, defaulting missing ones', async () => {
    fetchMock.mockImplementation((url: string) => {
      if (url.endsWith('/WEIGHT_SIGNALS')) return Promise.resolve(jsonRes({ name: 'WEIGHT_SIGNALS', value: '7' }))
      return Promise.resolve(jsonRes({ message: 'Not Found' }, 404))
    })
    expect(await getWeights()).toEqual({ signals: 7, inspiration: 5, ratings: 5, risk: 8 })
  })
})

describe('setWeights', () => {
  it('PATCHes existing variables and POSTs missing ones', async () => {
    fetchMock.mockImplementation((url: string, init?: RequestInit) => {
      if (init?.method === 'PATCH' && url.endsWith('/WEIGHT_RISK')) return Promise.resolve(jsonRes({ message: 'Not Found' }, 404))
      return Promise.resolve(new Response(null, { status: 204 }))
    })
    await setWeights({ signals: 5, inspiration: 5, ratings: 9, risk: 8 })
    const posts = fetchMock.mock.calls.filter(([, init]) => (init as RequestInit)?.method === 'POST')
    expect(posts).toHaveLength(1)
    expect(JSON.parse((posts[0][1] as RequestInit).body as string)).toEqual({ name: 'WEIGHT_RISK', value: '8' })
  })
})

describe('dispatchRun / latestRun', () => {
  it('dispatches the workflow with string inputs', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }))
    await dispatchRun(true)
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.github.com/repos/marchdoe/doug-march.com/actions/workflows/daily-redesign.yml/dispatches')
    expect(JSON.parse(init.body as string)).toEqual({ ref: 'main', inputs: { dry_run: 'true' } })
  })
  it('returns the latest run info or null', async () => {
    fetchMock.mockResolvedValueOnce(jsonRes({ workflow_runs: [{ status: 'completed', conclusion: 'success', html_url: 'u', created_at: 't' }] }))
    expect(await latestRun()).toEqual({ status: 'completed', conclusion: 'success', url: 'u', createdAt: 't' })
    fetchMock.mockResolvedValueOnce(jsonRes({ workflow_runs: [] }))
    expect(await latestRun()).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/api/github.test.ts`
Expected: FAIL — cannot resolve `../../api/_lib/github`

- [ ] **Step 3: Implement `api/_lib/github.ts`**

```typescript
const API = 'https://api.github.com'
const REPO = 'marchdoe/doug-march.com'
const WORKFLOW = 'daily-redesign.yml'

export class GitHubError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = 'GitHubError'
  }
}

async function gh(path: string, init: RequestInit = {}): Promise<unknown> {
  const token = process.env.GH_PANEL_TOKEN
  if (!token) throw new GitHubError('GH_PANEL_TOKEN not configured', 503)
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'x-github-api-version': '2022-11-28',
      ...(init.body ? { 'content-type': 'application/json' } : {}),
    },
  })
  if (res.status === 204) return null
  if (!res.ok) throw new GitHubError(`GitHub ${init.method ?? 'GET'} ${path} → ${res.status}`, res.status)
  return res.json()
}

export interface RatingIssue {
  number: number
  date: string
  title: string
  url: string
}

const DATE_RE = /Rate:\s*(\d{4}-\d{2}-\d{2})/

export async function listOpenRatingIssues(): Promise<RatingIssue[]> {
  const raw = (await gh(`/repos/${REPO}/issues?labels=daily-rating&state=open&per_page=30`)) as Array<Record<string, unknown>>
  const issues: RatingIssue[] = []
  for (const issue of raw) {
    const title = typeof issue.title === 'string' ? issue.title : ''
    const date = DATE_RE.exec(title)?.[1]
    if (!date || typeof issue.number !== 'number' || typeof issue.html_url !== 'string') continue
    issues.push({ number: issue.number, date, title, url: issue.html_url })
  }
  return issues
}

export async function findOpenRatingIssue(date: string): Promise<RatingIssue | null> {
  const issues = await listOpenRatingIssues()
  return issues.find((i) => i.date === date) ?? null
}

export async function commentOnIssue(issueNumber: number, body: string): Promise<void> {
  await gh(`/repos/${REPO}/issues/${issueNumber}/comments`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  })
}

export async function createRatingIssue(date: string, body: string): Promise<RatingIssue> {
  const raw = (await gh(`/repos/${REPO}/issues`, {
    method: 'POST',
    body: JSON.stringify({ title: `Rate: ${date}`, body, labels: ['daily-rating'] }),
  })) as Record<string, unknown>
  return {
    number: raw.number as number,
    date,
    title: raw.title as string,
    url: raw.html_url as string,
  }
}

export interface Weights {
  signals: number
  inspiration: number
  ratings: number
  risk: number
}

// Names + defaults must match scripts/design-agents.js:421-424.
const WEIGHT_VARS: Array<{ key: keyof Weights; name: string; fallback: number }> = [
  { key: 'signals', name: 'WEIGHT_SIGNALS', fallback: 5 },
  { key: 'inspiration', name: 'WEIGHT_INSPIRATION', fallback: 5 },
  { key: 'ratings', name: 'WEIGHT_RATINGS', fallback: 5 },
  { key: 'risk', name: 'WEIGHT_RISK', fallback: 8 },
]

export async function getWeights(): Promise<Weights> {
  const weights: Weights = { signals: 5, inspiration: 5, ratings: 5, risk: 8 }
  await Promise.all(
    WEIGHT_VARS.map(async ({ key, name, fallback }) => {
      try {
        const raw = (await gh(`/repos/${REPO}/actions/variables/${name}`)) as Record<string, unknown>
        const parsed = parseInt(String(raw.value), 10)
        weights[key] = Number.isNaN(parsed) ? fallback : parsed
      } catch (err) {
        if (err instanceof GitHubError && err.status === 404) {
          weights[key] = fallback
          return
        }
        throw err
      }
    })
  )
  return weights
}

export async function setWeights(w: Weights): Promise<void> {
  await Promise.all(
    WEIGHT_VARS.map(async ({ key, name }) => {
      const payload = JSON.stringify({ name, value: String(w[key]) })
      try {
        await gh(`/repos/${REPO}/actions/variables/${name}`, { method: 'PATCH', body: payload })
      } catch (err) {
        if (err instanceof GitHubError && err.status === 404) {
          await gh(`/repos/${REPO}/actions/variables`, { method: 'POST', body: payload })
          return
        }
        throw err
      }
    })
  )
}

export async function dispatchRun(dryRun: boolean): Promise<void> {
  await gh(`/repos/${REPO}/actions/workflows/${WORKFLOW}/dispatches`, {
    method: 'POST',
    body: JSON.stringify({ ref: 'main', inputs: { dry_run: String(dryRun) } }),
  })
}

export interface RunInfo {
  status: string
  conclusion: string | null
  url: string
  createdAt: string
}

export async function latestRun(): Promise<RunInfo | null> {
  const raw = (await gh(`/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?per_page=1`)) as Record<string, unknown>
  const runs = raw.workflow_runs as Array<Record<string, unknown>>
  const run = runs[0]
  if (!run) return null
  return {
    status: String(run.status),
    conclusion: run.conclusion === null ? null : String(run.conclusion),
    url: String(run.html_url),
    createdAt: String(run.created_at),
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test tests/api/github.test.ts`
Expected: PASS (10 tests)

- [ ] **Step 5: Commit**

```bash
git add api/_lib/github.ts tests/api/github.test.ts
git commit -m "feat(panel): GitHub REST client for issues, variables, and workflow runs"
```

---

### Task 4: The four endpoints

**Files:**
- Create: `api/panel/rate.ts`, `api/panel/status.ts`, `api/panel/weights.ts`, `api/panel/run.ts`
- Test: `tests/api/endpoints.test.ts`

**Interfaces:**
- Consumes: everything from Tasks 1–3 (`requireAuth`, `json`, `formatRatingComment`, `RatingInput`, `Grade`, and all `github.ts` exports).
- Produces HTTP contracts the UI (Task 7) calls:
  - `POST /api/panel/rate` body `{ date?: string; grade: string; worked?: string; didnt?: string; try?: string }` → `200 { ok: true, issueUrl: string }` | `400 { error }` | `502 { error }`
  - `GET /api/panel/status` → `200 { unrated: RatingIssue[], weights: Weights, latestRun: RunInfo | null }`
  - `PUT /api/panel/weights` body `Weights` → `200 { ok: true }` | `400 { error }`
  - `POST /api/panel/run` body `{ dry_run?: boolean }` → `200 { ok: true }`

No `vercel.json` change is needed: Vercel serves `api/` functions from the filesystem before applying rewrites, so the `/(.*)` → `/_shell.html` catch-all does not swallow them.

- [ ] **Step 1: Write the failing test**

Create `tests/api/endpoints.test.ts`:

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('../../api/_lib/github', () => ({
  GitHubError: class GitHubError extends Error {
    constructor(message: string, readonly status: number) { super(message) }
  },
  findOpenRatingIssue: vi.fn(),
  commentOnIssue: vi.fn(),
  createRatingIssue: vi.fn(),
  listOpenRatingIssues: vi.fn(),
  getWeights: vi.fn(),
  setWeights: vi.fn(),
  dispatchRun: vi.fn(),
  latestRun: vi.fn(),
}))

import * as github from '../../api/_lib/github'
import { POST as ratePost } from '../../api/panel/rate'
import { GET as statusGet } from '../../api/panel/status'
import { PUT as weightsPut } from '../../api/panel/weights'
import { POST as runPost } from '../../api/panel/run'

const auth = { authorization: `Basic ${btoa('doug:s3cret')}` }
const post = (url: string, body: unknown, headers: Record<string, string> = auth) =>
  new Request(url, { method: 'POST', headers: { ...headers, 'content-type': 'application/json' }, body: JSON.stringify(body) })

beforeEach(() => {
  process.env.PANEL_USER = 'doug'
  process.env.PANEL_PASSWORD = 's3cret'
  vi.clearAllMocks()
})

describe('POST /api/panel/rate', () => {
  it('rejects unauthenticated requests', async () => {
    const res = await ratePost(post('https://x/api/panel/rate', { grade: 'A' }, {}))
    expect(res.status).toBe(401)
  })
  it('rejects invalid grade', async () => {
    const res = await ratePost(post('https://x/api/panel/rate', { grade: 'F' }))
    expect(res.status).toBe(400)
  })
  it('rejects malformed date', async () => {
    const res = await ratePost(post('https://x/api/panel/rate', { grade: 'A', date: 'yesterday' }))
    expect(res.status).toBe(400)
  })
  it('comments on the existing open issue', async () => {
    vi.mocked(github.findOpenRatingIssue).mockResolvedValue({ number: 82, date: '2026-07-20', title: 't', url: 'issue-url' })
    const res = await ratePost(post('https://x/api/panel/rate', { date: '2026-07-20', grade: 'B', worked: 'w', didnt: 'd', try: 't' }))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true, issueUrl: 'issue-url' })
    const [num, body] = vi.mocked(github.commentOnIssue).mock.calls[0]
    expect(num).toBe(82)
    expect(body).toContain('grade: B')
    expect(body).toContain('```yaml')
  })
  it('creates the issue when none is open for that date', async () => {
    vi.mocked(github.findOpenRatingIssue).mockResolvedValue(null)
    vi.mocked(github.createRatingIssue).mockResolvedValue({ number: 90, date: '2026-07-19', title: 't', url: 'new-url' })
    const res = await ratePost(post('https://x/api/panel/rate', { date: '2026-07-19', grade: 'C' }))
    expect(await res.json()).toEqual({ ok: true, issueUrl: 'new-url' })
    expect(github.commentOnIssue).not.toHaveBeenCalled()
  })
  it('maps GitHubError to 502 with a human message', async () => {
    vi.mocked(github.findOpenRatingIssue).mockRejectedValue(new github.GitHubError('GitHub GET x → 500', 500))
    const res = await ratePost(post('https://x/api/panel/rate', { grade: 'A' }))
    expect(res.status).toBe(502)
    expect((await res.json() as { error: string }).error).toContain('GitHub')
  })
})

describe('GET /api/panel/status', () => {
  it('aggregates unrated issues, weights, and latest run', async () => {
    vi.mocked(github.listOpenRatingIssues).mockResolvedValue([])
    vi.mocked(github.getWeights).mockResolvedValue({ signals: 5, inspiration: 5, ratings: 5, risk: 8 })
    vi.mocked(github.latestRun).mockResolvedValue(null)
    const res = await statusGet(new Request('https://x/api/panel/status', { headers: auth }))
    expect(await res.json()).toEqual({
      unrated: [],
      weights: { signals: 5, inspiration: 5, ratings: 5, risk: 8 },
      latestRun: null,
    })
  })
})

describe('PUT /api/panel/weights', () => {
  it('validates integers 0-10', async () => {
    const req = new Request('https://x/api/panel/weights', {
      method: 'PUT', headers: { ...auth, 'content-type': 'application/json' },
      body: JSON.stringify({ signals: 11, inspiration: 5, ratings: 5, risk: 8 }),
    })
    expect((await weightsPut(req)).status).toBe(400)
  })
  it('saves valid weights', async () => {
    const req = new Request('https://x/api/panel/weights', {
      method: 'PUT', headers: { ...auth, 'content-type': 'application/json' },
      body: JSON.stringify({ signals: 3, inspiration: 5, ratings: 9, risk: 8 }),
    })
    expect((await weightsPut(req)).status).toBe(200)
    expect(github.setWeights).toHaveBeenCalledWith({ signals: 3, inspiration: 5, ratings: 9, risk: 8 })
  })
})

describe('POST /api/panel/run', () => {
  it('dispatches with dry_run flag', async () => {
    const res = await runPost(post('https://x/api/panel/run', { dry_run: true }))
    expect(res.status).toBe(200)
    expect(github.dispatchRun).toHaveBeenCalledWith(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/api/endpoints.test.ts`
Expected: FAIL — cannot resolve `../../api/panel/rate`

- [ ] **Step 3: Implement `api/panel/rate.ts`**

```typescript
import { requireAuth } from '../_lib/auth'
import { json } from '../_lib/http'
import { formatRatingComment, type Grade } from '../_lib/rating-format'
import { findOpenRatingIssue, commentOnIssue, createRatingIssue, GitHubError } from '../_lib/github'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const GRADE_RE = /^[A-D]$/

export async function POST(request: Request): Promise<Response> {
  const denied = requireAuth(request)
  if (denied) return denied

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }
  const b = (body ?? {}) as Record<string, unknown>

  const grade = typeof b.grade === 'string' ? b.grade.trim().toUpperCase() : ''
  if (!GRADE_RE.test(grade)) return json({ error: 'grade must be A, B, C, or D' }, 400)

  const date = typeof b.date === 'string' && b.date ? b.date : new Date().toISOString().slice(0, 10)
  if (!DATE_RE.test(date)) return json({ error: 'date must be YYYY-MM-DD' }, 400)

  const str = (v: unknown) => (typeof v === 'string' ? v : '')
  const comment = formatRatingComment({
    grade: grade as Grade,
    worked: str(b.worked),
    didnt: str(b.didnt),
    try: str(b.try),
  })

  try {
    const existing = await findOpenRatingIssue(date)
    if (existing) {
      await commentOnIssue(existing.number, comment)
      return json({ ok: true, issueUrl: existing.url })
    }
    const created = await createRatingIssue(date, comment)
    return json({ ok: true, issueUrl: created.url })
  } catch (err) {
    if (err instanceof GitHubError) return json({ error: `GitHub error (${err.status}) — try again` }, 502)
    throw err
  }
}
```

- [ ] **Step 4: Implement `api/panel/status.ts`**

```typescript
import { requireAuth } from '../_lib/auth'
import { json } from '../_lib/http'
import { listOpenRatingIssues, getWeights, latestRun, GitHubError } from '../_lib/github'

export async function GET(request: Request): Promise<Response> {
  const denied = requireAuth(request)
  if (denied) return denied
  try {
    const [unrated, weights, run] = await Promise.all([listOpenRatingIssues(), getWeights(), latestRun()])
    return json({ unrated, weights, latestRun: run })
  } catch (err) {
    if (err instanceof GitHubError) return json({ error: `GitHub error (${err.status}) — try again` }, 502)
    throw err
  }
}
```

- [ ] **Step 5: Implement `api/panel/weights.ts`**

```typescript
import { requireAuth } from '../_lib/auth'
import { json } from '../_lib/http'
import { setWeights, GitHubError, type Weights } from '../_lib/github'

const KEYS: Array<keyof Weights> = ['signals', 'inspiration', 'ratings', 'risk']

export async function PUT(request: Request): Promise<Response> {
  const denied = requireAuth(request)
  if (denied) return denied

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }
  const b = (body ?? {}) as Record<string, unknown>

  const weights = {} as Weights
  for (const key of KEYS) {
    const v = b[key]
    if (typeof v !== 'number' || !Number.isInteger(v) || v < 0 || v > 10) {
      return json({ error: `${key} must be an integer 0-10` }, 400)
    }
    weights[key] = v
  }

  try {
    await setWeights(weights)
    return json({ ok: true })
  } catch (err) {
    if (err instanceof GitHubError) return json({ error: `GitHub error (${err.status}) — try again` }, 502)
    throw err
  }
}
```

- [ ] **Step 6: Implement `api/panel/run.ts`**

```typescript
import { requireAuth } from '../_lib/auth'
import { json } from '../_lib/http'
import { dispatchRun, GitHubError } from '../_lib/github'

export async function POST(request: Request): Promise<Response> {
  const denied = requireAuth(request)
  if (denied) return denied

  let body: unknown
  try {
    body = await request.json()
  } catch {
    body = {}
  }
  const dryRun = (body as Record<string, unknown> | null)?.dry_run === true

  try {
    await dispatchRun(dryRun)
    return json({ ok: true })
  } catch (err) {
    if (err instanceof GitHubError) return json({ error: `GitHub error (${err.status}) — try again` }, 502)
    throw err
  }
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `pnpm test tests/api/`
Expected: PASS — all four endpoint suites plus Tasks 1–3 suites still green

- [ ] **Step 8: Commit**

```bash
git add api/panel/ tests/api/endpoints.test.ts
git commit -m "feat(panel): rate/status/weights/run serverless endpoints"
```

---

### Task 5: Workflow reads weights from repository variables

**Files:**
- Modify: `.github/workflows/daily-redesign.yml:26-33` (the job `env:` block)

**Interfaces:**
- Consumes: repo variables written by `setWeights` (Task 3).
- Produces: `WEIGHT_SIGNALS`, `WEIGHT_INSPIRATION`, `WEIGHT_RATINGS`, `WEIGHT_RISK` env vars for every step — read by `scripts/design-agents.js:421-424`.

- [ ] **Step 1: Edit the env block**

Replace (keeping the existing comment about risk 8 above it):

```yaml
    env:
      # Risk 8 is the new default after the 2026-04-28 iter-3 finding:
      # iter-3's drenched terracotta Specimen happened at risk 8 and was
      # the gold standard. Risk 7 sat noticeably below that. The Art
      # Director's hero-phrase-first methodology benefits from a higher
      # risk floor — committed gestures, not hedges.
      WEIGHT_RISK: '8'
```

with:

```yaml
    env:
      # Creative weights come from repo variables so the owner panel can
      # adjust them (PUT /api/panel/weights → GitHub Actions variables).
      # Fallbacks preserve the pre-panel defaults; risk 8 per the
      # 2026-04-28 iter-3 finding (drenched terracotta Specimen was the
      # gold standard — committed gestures, not hedges).
      WEIGHT_SIGNALS: ${{ vars.WEIGHT_SIGNALS || '5' }}
      WEIGHT_INSPIRATION: ${{ vars.WEIGHT_INSPIRATION || '5' }}
      WEIGHT_RATINGS: ${{ vars.WEIGHT_RATINGS || '5' }}
      WEIGHT_RISK: ${{ vars.WEIGHT_RISK || '8' }}
```

- [ ] **Step 2: Validate the YAML parses**

Run: `node -e "import('js-yaml').then(y => import('fs').then(fs => { y.default.load(fs.readFileSync('.github/workflows/daily-redesign.yml','utf8')); console.log('yaml ok') }))"`
Expected: `yaml ok`

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/daily-redesign.yml
git commit -m "feat(ci): read creative weights from repo variables with pre-panel fallbacks"
```

---

### Task 6: Ratings in archive JSON

**Files:**
- Modify: `scripts/utils/ratings.js` (add `readRatingForDate`, reuse in `readRecentRatings`)
- Modify: `scripts/generate-archive-json.js` (include `rating` in index entries and detail)
- Test: `tests/scripts/archive-json-rating.test.js`

**Interfaces:**
- Consumes: `archive/{date}/rating-{ts}.json` files (existing harvest output).
- Produces: `readRatingForDate(archiveDir: string, date: string): { grade, worked, didnt, try } | null` exported from `scripts/utils/ratings.js`; every entry in `public/archive/_data.json` and every `public/archive/{date}/_detail.json` gains a `rating` field (object or `null`).

- [ ] **Step 1: Write the failing test**

Create `tests/scripts/archive-json-rating.test.js` (plain JS, matching the other `tests/scripts/` files):

```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { readRatingForDate, readRecentRatings } from '../../scripts/utils/ratings.js'

let dir

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'archive-'))
})
afterEach(() => rmSync(dir, { recursive: true, force: true }))

const writeRating = (date, ts, data) => {
  mkdirSync(join(dir, date), { recursive: true })
  writeFileSync(join(dir, date, `rating-${ts}.json`), JSON.stringify(data))
}

describe('readRatingForDate', () => {
  it('returns the newest valid rating for a date', () => {
    writeRating('2026-07-12', 1, { grade: 'C', worked: 'old', didnt: '', try: '' })
    writeRating('2026-07-12', 2, { grade: 'B', worked: 'new', didnt: '', try: '' })
    expect(readRatingForDate(dir, '2026-07-12')).toEqual({ grade: 'B', worked: 'new', didnt: '', try: '' })
  })
  it('skips malformed grades and returns null when nothing is valid', () => {
    writeRating('2026-07-12', 1, { grade: 'Z' })
    expect(readRatingForDate(dir, '2026-07-12')).toBeNull()
  })
  it('returns null for a date with no directory', () => {
    expect(readRatingForDate(dir, '2026-01-01')).toBeNull()
  })
})

describe('readRecentRatings (still works after refactor)', () => {
  it('returns newest-first ratings across dates', () => {
    writeRating('2026-07-11', 1, { grade: 'A', worked: '', didnt: '', try: '' })
    writeRating('2026-07-12', 1, { grade: 'B', worked: '', didnt: '', try: '' })
    const out = readRecentRatings(dir)
    expect(out.map((r) => r.grade)).toEqual(['B', 'A'])
    expect(out[0].date).toBe('2026-07-12')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/scripts/archive-json-rating.test.js`
Expected: FAIL — `readRatingForDate` is not exported

- [ ] **Step 3: Add `readRatingForDate` to `scripts/utils/ratings.js` and refactor**

Add above `readRecentRatings`:

```javascript
/**
 * Newest valid rating for one date dir, or null.
 * @returns {{ grade: string, worked: string, didnt: string, try: string } | null}
 */
export function readRatingForDate(archiveDir, date) {
  const dirPath = path.join(archiveDir, date)
  let files
  try {
    files = readdirSync(dirPath).filter((f) => /^rating-\d+\.json$/.test(f)).sort().reverse()
  } catch { return null }
  for (const f of files) {
    try {
      const r = JSON.parse(readFileSync(path.join(dirPath, f), 'utf8'))
      const grade = typeof r.grade === 'string' ? r.grade.trim().toUpperCase() : ''
      if (!/^[A-D]$/.test(grade)) continue // legacy or malformed
      return { grade, worked: r.worked || '', didnt: r.didnt || '', try: r.try || '' }
    } catch { /* ignore malformed */ }
  }
  return null
}
```

Then replace the inner file-loop of `readRecentRatings` so both share one code path (the whole function body becomes):

```javascript
export function readRecentRatings(archiveDir, { lookbackDays = 10 } = {}) {
  if (!existsSync(archiveDir)) return []
  let dateDirs
  try {
    dateDirs = readdirSync(archiveDir)
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .reverse()
      .slice(0, lookbackDays)
  } catch { return [] }
  const out = []
  for (const dateDir of dateDirs) {
    // At most ONE rating per date — newest file wins (see readRatingForDate).
    const rating = readRatingForDate(archiveDir, dateDir)
    if (rating) out.push({ date: dateDir, ...rating })
  }
  return out
}
```

- [ ] **Step 4: Run tests — new file plus existing ratings consumers**

Run: `pnpm test tests/scripts/`
Expected: PASS, including the pre-existing `design-agents` and `collect-ratings` suites (the refactor must not change `readRecentRatings` behavior)

- [ ] **Step 5: Include ratings in `scripts/generate-archive-json.js`**

Add the import at the top:

```javascript
import { readRatingForDate } from './utils/ratings.js'
```

In `generateIndex()`, add `rating` to the returned entry object (alongside `archetype`, `buildId`):

```javascript
      return {
        date: dateLine.slice(2).trim(),
        brief: briefLine.slice('**Design Brief:** '.length).trim(),
        rationale,
        filesChanged,
        archetype,
        buildId,
        rating: readRatingForDate(ARCHIVE_PATH, d.name),
      }
```

In `generateDetail(date)`, add `rating` to the returned object:

```javascript
  return {
    date, archetype, brief, signalsBrief, preset,
    rationale, filesChanged, hasScreenshot, buildId, trace,
    rating: readRatingForDate(ARCHIVE_PATH, date),
  }
```

- [ ] **Step 6: Verify generation end-to-end**

Run: `node scripts/generate-archive-json.js && node -e "import('fs').then(fs => { const d = JSON.parse(fs.readFileSync('public/archive/_data.json','utf8')); const rated = d.filter(e => e.rating); console.log('entries:', d.length, 'rated:', rated.length, rated[0]?.date, rated[0]?.rating?.grade) })"`
Expected: `rated` ≥ 1 (2026-07-12 has a harvested rating) with its grade printed

- [ ] **Step 7: Commit**

```bash
git add scripts/utils/ratings.js scripts/generate-archive-json.js tests/scripts/archive-json-rating.test.js
git commit -m "feat(archive): include owner ratings in static archive JSON"
```

---

### Task 7: Panel UI

**Files:**
- Create: `app/components/panel/api.ts`, `app/components/panel/RateTab.tsx`, `app/components/panel/ArchiveTab.tsx`, `app/components/panel/WeightsTab.tsx`, `app/components/panel/RunTab.tsx`, `app/routes/panel.tsx`
- Test: `tests/app/rate-tab.test.tsx`

**Interfaces:**
- Consumes: the HTTP contracts from Task 4; `public/archive/_data.json` entries (now with `rating`, Task 6); Base UI `Tabs` and `Slider`; `css()` from `styled-system/css`.
- Produces: `/panel` route (auto-registered by TanStack Router file-based routing — run `pnpm dev` once or `pnpm build` to regenerate `app/routeTree.gen.ts`).

**Before writing components, invoke the `base-ui` and `pandacss` skills** for exact primitive APIs and styling conventions — the JSX below is the intended shape; adjust prop names to the installed Base UI version if they differ.

- [ ] **Step 1: Write `app/components/panel/api.ts`** (types + fetch helpers; browser re-sends cached basic-auth credentials on same-origin fetches)

```typescript
export interface RatingIssue {
  number: number
  date: string
  title: string
  url: string
}

export interface Weights {
  signals: number
  inspiration: number
  ratings: number
  risk: number
}

export interface RunInfo {
  status: string
  conclusion: string | null
  url: string
  createdAt: string
}

export interface PanelStatus {
  unrated: RatingIssue[]
  weights: Weights
  latestRun: RunInfo | null
}

export interface RatingSubmission {
  date: string
  grade: 'A' | 'B' | 'C' | 'D'
  worked: string
  didnt: string
  try: string
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { ...(init?.body ? { 'content-type': 'application/json' } : {}), ...init?.headers },
  })
  const data: unknown = await res.json().catch(() => null)
  if (!res.ok) {
    const message = (data as { error?: string } | null)?.error ?? `Request failed (${res.status})`
    throw new Error(message)
  }
  return data as T
}

export const fetchStatus = () => request<PanelStatus>('/api/panel/status')
export const submitRating = (r: RatingSubmission) =>
  request<{ ok: true; issueUrl: string }>('/api/panel/rate', { method: 'POST', body: JSON.stringify(r) })
export const saveWeights = (w: Weights) =>
  request<{ ok: true }>('/api/panel/weights', { method: 'PUT', body: JSON.stringify(w) })
export const triggerRun = (dryRun: boolean) =>
  request<{ ok: true }>('/api/panel/run', { method: 'POST', body: JSON.stringify({ dry_run: dryRun }) })
```

- [ ] **Step 2: Write the failing component test**

Create `tests/app/rate-tab.test.tsx`:

```tsx
// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

vi.mock('../../app/components/panel/api', () => ({
  submitRating: vi.fn().mockResolvedValue({ ok: true, issueUrl: 'https://github.com/x/82' }),
}))

import { submitRating } from '../../app/components/panel/api'
import { RateTab } from '../../app/components/panel/RateTab'

const unrated = [
  { number: 82, date: '2026-07-20', title: 'Rate: 2026-07-20 — "Breadboard"', url: 'u' },
  { number: 81, date: '2026-07-19', title: 'Rate: 2026-07-19 — "Fluoro"', url: 'u' },
]

describe('RateTab', () => {
  beforeEach(() => vi.clearAllMocks())

  it('submits the selected grade and notes for the newest unrated day', async () => {
    render(<RateTab unrated={unrated} onRated={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: 'B' }))
    fireEvent.change(screen.getByLabelText(/worked/i), { target: { value: 'amber drench' } })
    fireEvent.click(screen.getByRole('button', { name: /submit rating/i }))
    await waitFor(() => expect(submitRating).toHaveBeenCalledWith({
      date: '2026-07-20',
      grade: 'B',
      worked: 'amber drench',
      didnt: '',
      try: '',
    }))
  })

  it('disables submit until a grade is chosen', () => {
    render(<RateTab unrated={unrated} onRated={() => {}} />)
    expect(screen.getByRole('button', { name: /submit rating/i })).toBeDisabled()
  })

  it('lists older unrated days', () => {
    render(<RateTab unrated={unrated} onRated={() => {}} />)
    expect(screen.getByText(/2026-07-19/)).toBeTruthy()
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `pnpm test tests/app/rate-tab.test.tsx`
Expected: FAIL — cannot resolve `../../app/components/panel/RateTab`

- [ ] **Step 4: Implement `app/components/panel/RateTab.tsx`**

Props contract: `{ unrated: RatingIssue[]; onRated: () => void }`. The first (newest) unrated entry is the active form target; a date picker row lets Doug switch to an older one. Grade buttons A–D (plain `<button>`s — no Base UI primitive needed for a button row), three labeled `<textarea>`s, submit button disabled until a grade is selected. On success: show the returned `issueUrl` as a link and call `onRated()`. On error: render the message inline under the submit button. All styling via `css()` from `../../../styled-system/css` — for example:

```tsx
import { useState } from 'react'
import { css } from '../../../styled-system/css'
import { submitRating, type RatingIssue } from './api'

const field = css({ display: 'flex', flexDirection: 'column', gap: '1', marginBottom: '3' })

export function RateTab({ unrated, onRated }: { unrated: RatingIssue[]; onRated: () => void }) {
  const [activeDate, setActiveDate] = useState(unrated[0]?.date ?? '')
  const [grade, setGrade] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [worked, setWorked] = useState('')
  const [didnt, setDidnt] = useState('')
  const [tryNext, setTryNext] = useState('')
  const [state, setState] = useState<{ kind: 'idle' } | { kind: 'busy' } | { kind: 'done'; url: string } | { kind: 'error'; message: string }>({ kind: 'idle' })

  if (unrated.length === 0 && state.kind !== 'done') {
    return <p>Nothing waiting for a rating. 🎉</p>
  }

  const submit = async () => {
    if (!grade || !activeDate) return
    setState({ kind: 'busy' })
    try {
      const res = await submitRating({ date: activeDate, grade, worked, didnt, try: tryNext })
      setState({ kind: 'done', url: res.issueUrl })
      onRated()
    } catch (err) {
      setState({ kind: 'error', message: err instanceof Error ? err.message : 'Failed' })
    }
  }

  return (
    <section>
      <h2 className={css({ fontSize: 'lg', marginBottom: '3' })}>Rate {activeDate}</h2>
      <div role="group" aria-label="grade" className={css({ display: 'flex', gap: '2', marginBottom: '4' })}>
        {(['A', 'B', 'C', 'D'] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGrade(g)}
            aria-pressed={grade === g}
            className={css({
              width: '12', height: '12', fontSize: 'xl', cursor: 'pointer',
              border: '2px solid', borderColor: grade === g ? 'currentColor' : 'transparent',
            })}
          >
            {g}
          </button>
        ))}
      </div>
      <label className={field}>
        What worked
        <textarea value={worked} onChange={(e) => setWorked(e.target.value)} rows={2} />
      </label>
      <label className={field}>
        What didn't
        <textarea value={didnt} onChange={(e) => setDidnt(e.target.value)} rows={2} />
      </label>
      <label className={field}>
        Try next
        <textarea value={tryNext} onChange={(e) => setTryNext(e.target.value)} rows={2} />
      </label>
      <button type="button" disabled={!grade || state.kind === 'busy'} onClick={submit}>
        {state.kind === 'busy' ? 'Submitting…' : 'Submit rating'}
      </button>
      {state.kind === 'done' && <p>Saved — <a href={state.url}>view issue</a>. Harvested on the next run.</p>}
      {state.kind === 'error' && <p role="alert">{state.message}</p>}
      {unrated.length > 1 && (
        <aside className={css({ marginTop: '6' })}>
          <h3>Also unrated</h3>
          <ul>
            {unrated.filter((i) => i.date !== activeDate).map((i) => (
              <li key={i.number}>
                <button type="button" onClick={() => setActiveDate(i.date)}>{i.date}</button>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test tests/app/rate-tab.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 6: Implement the remaining tabs**

`app/components/panel/WeightsTab.tsx` (verify Slider part names against the base-ui skill — this is the intended structure):

```tsx
import { useState } from 'react'
import { Slider } from '@base-ui-components/react/slider'
import { css } from '../../../styled-system/css'
import { saveWeights, type Weights } from './api'

const ROWS: Array<{ key: keyof Weights; label: string; desc: string }> = [
  { key: 'signals', label: 'Signals', desc: 'How much daily signals steer content' },
  { key: 'inspiration', label: 'Inspiration', desc: 'How much references steer style' },
  { key: 'ratings', label: 'Ratings', desc: 'How much past feedback influences decisions' },
  { key: 'risk', label: 'Risk', desc: 'How bold the design gestures get' },
]

export function WeightsTab({ initial }: { initial: Weights }) {
  const [weights, setWeights] = useState<Weights>(initial)
  const [state, setState] = useState<'idle' | 'busy' | 'saved' | string>('idle')

  const save = async () => {
    setState('busy')
    try {
      await saveWeights(weights)
      setState('saved')
    } catch (err) {
      setState(err instanceof Error ? err.message : 'Failed')
    }
  }

  return (
    <section>
      {ROWS.map(({ key, label, desc }) => (
        <div key={key} className={css({ marginBottom: '5' })}>
          <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
            <label htmlFor={`weight-${key}`}>{label}</label>
            <span>{weights[key]}</span>
          </div>
          <Slider.Root
            id={`weight-${key}`}
            min={0}
            max={10}
            step={1}
            value={weights[key]}
            onValueChange={(value) => setWeights((w) => ({ ...w, [key]: value as number }))}
          >
            <Slider.Control className={css({ display: 'flex', alignItems: 'center', height: '5' })}>
              <Slider.Track className={css({ height: '1', width: '100%', backgroundColor: 'currentColor', opacity: 0.2 })}>
                <Slider.Indicator className={css({ backgroundColor: 'currentColor' })} />
                <Slider.Thumb className={css({ width: '4', height: '4', borderRadius: 'full', backgroundColor: 'currentColor' })} />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
          <p className={css({ fontSize: 'sm', opacity: 0.7 })}>{desc}</p>
        </div>
      ))}
      <button type="button" disabled={state === 'busy'} onClick={save}>
        {state === 'busy' ? 'Saving…' : 'Save weights'}
      </button>
      {state === 'saved' && <p>Saved — applies to the next run.</p>}
      {state !== 'idle' && state !== 'busy' && state !== 'saved' && <p role="alert">{state}</p>}
    </section>
  )
}
```

`app/components/panel/RunTab.tsx`:

```tsx
import { useState } from 'react'
import { css } from '../../../styled-system/css'
import { triggerRun, type RunInfo } from './api'

export function RunTab({ latestRun, onTriggered }: { latestRun: RunInfo | null; onTriggered: () => void }) {
  const [dryRun, setDryRun] = useState(false)
  const [state, setState] = useState<'idle' | 'busy' | 'dispatched' | string>('idle')

  const trigger = async () => {
    setState('busy')
    try {
      await triggerRun(dryRun)
      setState('dispatched')
      onTriggered()
    } catch (err) {
      setState(err instanceof Error ? err.message : 'Failed')
    }
  }

  return (
    <section>
      <h2 className={css({ fontSize: 'lg', marginBottom: '3' })}>Latest run</h2>
      {latestRun ? (
        <p className={css({ marginBottom: '5' })}>
          <a href={latestRun.url}>{latestRun.status}{latestRun.conclusion ? ` — ${latestRun.conclusion}` : ''}</a>
          {' '}({new Date(latestRun.createdAt).toLocaleString()})
        </p>
      ) : (
        <p className={css({ marginBottom: '5' })}>No runs found.</p>
      )}
      <label className={css({ display: 'flex', gap: '2', alignItems: 'center', marginBottom: '4' })}>
        <input type="checkbox" checked={dryRun} onChange={(e) => setDryRun(e.target.checked)} />
        Dry run (build + verify, no commit)
      </label>
      <button type="button" disabled={state === 'busy'} onClick={trigger}>
        {state === 'busy' ? 'Dispatching…' : 'Trigger build'}
      </button>
      {state === 'dispatched' && <p>Dispatched — refresh status in a minute.</p>}
      {state !== 'idle' && state !== 'busy' && state !== 'dispatched' && <p role="alert">{state}</p>}
    </section>
  )
}
```

`app/components/panel/ArchiveTab.tsx` (same `_data.json` the public archive route reads, now with `rating` from Task 6):

```tsx
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { css } from '../../../styled-system/css'

interface ArchiveEntry {
  date: string
  brief: string
  archetype: string
  rating: { grade: string; worked: string; didnt: string; try: string } | null
}

export function ArchiveTab() {
  const [entries, setEntries] = useState<ArchiveEntry[] | null>(null)

  useEffect(() => {
    fetch('/archive/_data.json')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: ArchiveEntry[]) => setEntries(data))
      .catch(() => setEntries([]))
  }, [])

  if (!entries) return <p>Loading…</p>

  return (
    <ul className={css({ listStyle: 'none', padding: 0 })}>
      {entries.map((e) => (
        <li key={e.date} className={css({ marginBottom: '4', paddingBottom: '4', borderBottom: '1px solid', borderColor: 'currentColor' })}>
          <div className={css({ display: 'flex', gap: '3', alignItems: 'baseline' })}>
            <Link to="/archive/$date" params={{ date: e.date }}>{e.date}</Link>
            <span className={css({ fontWeight: 'bold' })}>{e.rating?.grade ?? '—'}</span>
            <span className={css({ fontSize: 'sm', opacity: 0.7 })}>{e.archetype}</span>
          </div>
          <p className={css({ fontSize: 'sm' })}>{e.brief}</p>
          {e.rating && (e.rating.worked || e.rating.didnt || e.rating.try) && (
            <p className={css({ fontSize: 'sm', opacity: 0.8 })}>
              {e.rating.worked && <>✓ {e.rating.worked} </>}
              {e.rating.didnt && <>✗ {e.rating.didnt} </>}
              {e.rating.try && <>→ {e.rating.try}</>}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
```

`app/routes/panel.tsx` — route shell:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { Tabs } from '@base-ui-components/react/tabs'
import { css } from '../../styled-system/css'
import { fetchStatus, type PanelStatus } from '../components/panel/api'
import { RateTab } from '../components/panel/RateTab'
import { ArchiveTab } from '../components/panel/ArchiveTab'
import { WeightsTab } from '../components/panel/WeightsTab'
import { RunTab } from '../components/panel/RunTab'

export const Route = createFileRoute('/panel')({
  component: PanelPage,
})

function PanelPage() {
  const [status, setStatus] = useState<PanelStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    fetchStatus().then(setStatus).catch((err: unknown) => {
      setError(err instanceof Error ? err.message : 'Failed to load')
    })
  }, [])
  useEffect(load, [load])

  if (error) return <main className={css({ padding: '8' })}>{error}</main>
  if (!status) return <main className={css({ padding: '8' })}>Loading…</main>

  return (
    <main className={css({ maxWidth: '640px', margin: '0 auto', padding: '6' })}>
      <h1 className={css({ fontSize: '2xl', marginBottom: '4' })}>Owner Panel</h1>
      <Tabs.Root defaultValue="rate">
        <Tabs.List className={css({ display: 'flex', gap: '4', marginBottom: '6' })}>
          <Tabs.Tab value="rate">Rate</Tabs.Tab>
          <Tabs.Tab value="archive">Archive</Tabs.Tab>
          <Tabs.Tab value="weights">Weights</Tabs.Tab>
          <Tabs.Tab value="run">Run</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="rate"><RateTab unrated={status.unrated} onRated={load} /></Tabs.Panel>
        <Tabs.Panel value="archive"><ArchiveTab /></Tabs.Panel>
        <Tabs.Panel value="weights"><WeightsTab initial={status.weights} /></Tabs.Panel>
        <Tabs.Panel value="run"><RunTab latestRun={status.latestRun} onTriggered={load} /></Tabs.Panel>
      </Tabs.Root>
    </main>
  )
}
```

Note: `/panel` deliberately does NOT use the daily-redesigned `Layout`/`Sidebar` components — it is a standalone page so the pipeline's daily restyle can't break it.

- [ ] **Step 7: Regenerate the route tree and verify the build**

Run: `pnpm build`
Expected: build succeeds; `app/routeTree.gen.ts` now includes `/panel`; no PandaCSS or TS errors

- [ ] **Step 8: Verify locally in the browser**

Run: `pnpm dev`, open `http://localhost:5173/panel`.
Expected: panel renders (API calls fail locally — no Vercel functions in `vite dev` — so the page shows its error state for status; that's acceptable here. Real API verification happens in Task 8 on a preview deploy.) Take a screenshot of the rendered error-state page to confirm the route + tabs shell render.

- [ ] **Step 9: Commit**

```bash
git add app/routes/panel.tsx app/components/panel/ app/routeTree.gen.ts tests/app/rate-tab.test.tsx
git commit -m "feat(panel): /panel route with rate, archive, weights, and run tabs"
```

---

### Task 8: Deploy, configure secrets, end-to-end verification, PR

**Files:** none created — configuration + verification.

**Interfaces:**
- Consumes: everything above, deployed to a Vercel preview.
- Produces: verified feature + PR.

- [ ] **Step 1: Full test suite + fallow**

```bash
pnpm test
pnpm fallow --summary
```
Expected: all suites pass; fallow summary clean. Fix anything it flags before proceeding.

- [ ] **Step 2: Configure Vercel env vars (needs Doug or `vercel` CLI auth)**

Create a fine-grained GitHub PAT at https://github.com/settings/personal-access-tokens/new — repository access: only `marchdoe/doug-march.com`; permissions: **Issues: Read and write, Variables: Read and write, Actions: Read and write**. Then:

```bash
vercel env add PANEL_USER production   # e.g. doug
vercel env add PANEL_PASSWORD production
vercel env add GH_PANEL_TOKEN production
vercel env add PANEL_USER preview
vercel env add PANEL_PASSWORD preview
vercel env add GH_PANEL_TOKEN preview
```

If the `vercel` CLI isn't linked, STOP and ask Doug to add the three vars (production + preview) in the Vercel dashboard instead.

- [ ] **Step 3: Push branch and open a draft PR**

```bash
git push -u origin feat/owner-panel
gh pr create --draft --title "feat: production owner panel (basic auth + rate/archive/weights/run)" --body "$(cat <<'EOF'
Implements docs/superpowers/specs/2026-07-20-production-owner-panel-design.md

- Basic-auth edge middleware for /panel + /api/panel/*
- Serverless endpoints proxying GitHub (rating issue comments, repo variables, workflow_dispatch)
- /panel route: Rate / Archive / Weights / Run tabs
- daily-redesign.yml reads WEIGHT_* from repo variables (pre-panel fallbacks)
- Archive JSON now includes owner ratings

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Wait for the Vercel preview deployment URL on the PR.

- [ ] **Step 4: Manual E2E on the preview URL (screenshots at every step)**

1. Open `{preview}/panel` in a fresh/incognito window → expect the browser's basic-auth prompt; cancel → 401 page. **Screenshot.**
2. Reload, enter credentials → panel renders with real status data (unrated list shows the current open `Rate:` issues). **Screenshot.**
3. Confirm the public site is untouched: `{preview}/` and `{preview}/archive` load with no auth prompt. **Screenshot.**
4. Submit a real rating for the oldest unrated day (use an honest grade — it feeds tomorrow's build). Verify the YAML comment landed: `gh issue view <number> --comments`. **Screenshot of both.**
5. Change one weight (e.g. ratings 5 → 6), save, then verify: `gh variable list` shows `WEIGHT_RATINGS=6`. Change it back if not wanted. **Screenshot.**
6. Trigger a run with dry-run ON, then verify: `gh run list --workflow daily-redesign.yml --limit 1` shows a fresh `workflow_dispatch` run. **Screenshot.**
7. Check the Archive tab shows the 2026-07-12 grade badge.

- [ ] **Step 5: Report + finish**

Post the verification evidence (screenshots + command output) on the PR, mark it ready for review, and hand back to Doug per superpowers:finishing-a-development-branch. Production env vars must exist in Vercel before merge (Step 2) or `/panel` returns 503 on doug-march.com.

---

## Self-Review Notes

- **Spec coverage:** auth/middleware (Task 1), rating write path with harvest round-trip (Tasks 2–4), status/weights/run endpoints (Tasks 3–4), workflow vars (Task 5), archive JSON grades (Task 6), four-tab UI (Task 7), env/secrets + manual E2E from the spec's testing section (Task 8). Out-of-scope items from the spec remain untouched.
- **Known judgment calls:** `unrated` in `/api/panel/status` is the list of open `daily-rating` issues (an open issue ⇔ not yet harvested ⇔ unrated) — no extra bookkeeping needed. `dry_run` is sent as the string `'true'`/`'false'` because the GitHub REST dispatch API requires string input values.
- **Type consistency check:** `RatingIssue`, `Weights`, `RunInfo` are defined once in `api/_lib/github.ts` and mirrored (structurally, client-side) in `app/components/panel/api.ts` — field names match (`createdAt`, `latestRun`, `unrated`).
