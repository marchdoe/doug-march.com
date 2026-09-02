import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('../../api/_lib/github', () => ({
  GitHubError: class GitHubError extends Error {
    constructor(
      message: string,
      readonly status: number
    ) {
      super(message)
    }
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
  new Request(url, {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

beforeEach(() => {
  process.env.PANEL_USER = 'doug'
  process.env.PANEL_PASSWORD = 's3cret'
  vi.clearAllMocks()
})

describe('POST /api/panel/rate', () => {
  it('rejects unauthenticated requests', async () => {
    const res = await ratePost(
      post('https://x/api/panel/rate', { grade: 'A', date: '2026-07-20' }, {})
    )
    expect(res.status).toBe(401)
  })
  it('rejects invalid grade', async () => {
    const res = await ratePost(post('https://x/api/panel/rate', { grade: 'F', date: '2026-07-20' }))
    expect(res.status).toBe(400)
  })
  it('rejects malformed date', async () => {
    const res = await ratePost(post('https://x/api/panel/rate', { grade: 'A', date: 'yesterday' }))
    expect(res.status).toBe(400)
  })
  it('comments on the existing open issue', async () => {
    vi.mocked(github.findOpenRatingIssue).mockResolvedValue({
      number: 82,
      date: '2026-07-20',
      title: 't',
      url: 'issue-url',
    })
    const res = await ratePost(
      post('https://x/api/panel/rate', {
        date: '2026-07-20',
        grade: 'B',
        worked: 'w',
        didnt: 'd',
        try: 't',
      })
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true, issueUrl: 'issue-url' })
    const [num, body] = vi.mocked(github.commentOnIssue).mock.calls[0]
    expect(num).toBe(82)
    expect(body).toContain('grade: B')
    expect(body).toContain('```yaml')
  })
  it('creates the issue when none is open for that date', async () => {
    vi.mocked(github.findOpenRatingIssue).mockResolvedValue(null)
    vi.mocked(github.createRatingIssue).mockResolvedValue({
      number: 90,
      date: '2026-07-19',
      title: 't',
      url: 'new-url',
    })
    const res = await ratePost(post('https://x/api/panel/rate', { date: '2026-07-19', grade: 'C' }))
    expect(await res.json()).toEqual({ ok: true, issueUrl: 'new-url' })
    expect(github.commentOnIssue).not.toHaveBeenCalled()
  })
  it('maps GitHubError to 502 with a human message', async () => {
    vi.mocked(github.findOpenRatingIssue).mockRejectedValue(
      new github.GitHubError('GitHub GET x → 500', 500)
    )
    const res = await ratePost(post('https://x/api/panel/rate', { grade: 'A', date: '2026-07-20' }))
    expect(res.status).toBe(502)
    expect(((await res.json()) as { error: string }).error).toContain('GitHub')
  })
})

describe('GET /api/panel/status', () => {
  it('aggregates unrated issues, weights, and latest run', async () => {
    vi.mocked(github.listOpenRatingIssues).mockResolvedValue([])
    vi.mocked(github.getWeights).mockResolvedValue({
      signals: 5,
      inspiration: 5,
      ratings: 5,
      risk: 8,
    })
    vi.mocked(github.latestRun).mockResolvedValue(null)
    const res = await statusGet(new Request('https://x/api/panel/status', { headers: auth }))
    expect(await res.json()).toEqual({
      unrated: [],
      weights: { signals: 5, inspiration: 5, ratings: 5, risk: 8 },
      latestRun: null,
      errors: {},
    })
  })
})

describe('PUT /api/panel/weights', () => {
  it('validates integers 0-10', async () => {
    const req = new Request('https://x/api/panel/weights', {
      method: 'PUT',
      headers: { ...auth, 'content-type': 'application/json' },
      body: JSON.stringify({ signals: 11, inspiration: 5, ratings: 5, risk: 8 }),
    })
    expect((await weightsPut(req)).status).toBe(400)
  })
  it('saves valid weights', async () => {
    const req = new Request('https://x/api/panel/weights', {
      method: 'PUT',
      headers: { ...auth, 'content-type': 'application/json' },
      body: JSON.stringify({ signals: 3, inspiration: 5, ratings: 9, risk: 8 }),
    })
    expect((await weightsPut(req)).status).toBe(200)
    expect(github.setWeights).toHaveBeenCalledWith({
      signals: 3,
      inspiration: 5,
      ratings: 9,
      risk: 8,
    })
  })
})

describe('POST /api/panel/run', () => {
  it('dispatches with dry_run flag', async () => {
    const res = await runPost(post('https://x/api/panel/run', { dry_run: true }))
    expect(res.status).toBe(200)
    expect(github.dispatchRun).toHaveBeenCalledWith(true)
  })
})

describe('guards apply to every endpoint, not just rate', () => {
  // Verified missing before #217: 401 coverage existed only for rate, so
  // status, weights and run could have lost their auth check silently.
  const anon = (url: string, method: string) =>
    new Request(url, {
      method,
      headers: { 'content-type': 'application/json' },
      ...(method === 'GET' ? {} : { body: '{}' }),
    })

  it.each([
    ['status', statusGet, 'GET'],
    ['weights', weightsPut, 'PUT'],
    ['run', runPost, 'POST'],
  ] as Array<[string, (r: Request) => Promise<Response>, string]>)(
    '%s rejects an unauthenticated request',
    async (name, handler, method) => {
      const res = await handler(anon(`https://x/api/panel/${name}`, method))
      expect(res.status).toBe(401)
    }
  )

  it.each([
    ['weights', weightsPut, 'PUT'],
    ['run', runPost, 'POST'],
  ] as Array<[string, (r: Request) => Promise<Response>, string]>)(
    '%s rejects a malformed JSON body with 400',
    async (name, handler, method) => {
      const res = await handler(
        new Request(`https://x/api/panel/${name}`, {
          method,
          headers: { ...auth, 'content-type': 'application/json' },
          body: 'not json{',
        })
      )
      expect(res.status).toBe(400)
      expect(((await res.json()) as { error: string }).error).toContain('Invalid JSON')
    }
  )

  it('run no longer dispatches on a body it could not parse', async () => {
    // The original swallowed the parse failure and dispatched anyway — a
    // workflow run that costs money and writes to main.
    await runPost(
      new Request('https://x/api/panel/run', {
        method: 'POST',
        headers: { ...auth, 'content-type': 'application/json' },
        body: '{{{',
      })
    )
    expect(github.dispatchRun).not.toHaveBeenCalled()
  })

  it('status maps a GitHubError to 502 when every section fails', async () => {
    const boom = new github.GitHubError('GitHub GET x → 500', 500)
    vi.mocked(github.listOpenRatingIssues).mockRejectedValue(boom)
    vi.mocked(github.getWeights).mockRejectedValue(boom)
    vi.mocked(github.latestRun).mockRejectedValue(boom)
    const res = await statusGet(new Request('https://x/api/panel/status', { headers: auth }))
    expect(res.status).toBe(502)
  })

  it('status keeps the sections that succeeded when one GitHub read fails (#334)', async () => {
    vi.mocked(github.listOpenRatingIssues).mockResolvedValue([
      { number: 1, date: '2026-09-01', title: 'Rate: 2026-09-01', url: 'https://x/1' },
    ])
    vi.mocked(github.getWeights).mockRejectedValue(
      new github.GitHubError('GitHub GET x → 403', 403)
    )
    vi.mocked(github.latestRun).mockResolvedValue(null)
    const res = await statusGet(new Request('https://x/api/panel/status', { headers: auth }))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      unrated: [{ number: 1, date: '2026-09-01', title: 'Rate: 2026-09-01', url: 'https://x/1' }],
      weights: null,
      latestRun: null,
      errors: { weights: 'GitHub error (403) — try again' },
    })
  })

  it('status reports a non-GitHub failure per section without leaking its message', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(github.listOpenRatingIssues).mockRejectedValue(new TypeError('boom'))
    vi.mocked(github.getWeights).mockResolvedValue({
      signals: 5,
      inspiration: 5,
      ratings: 5,
      risk: null,
    })
    vi.mocked(github.latestRun).mockResolvedValue(null)
    const res = await statusGet(new Request('https://x/api/panel/status', { headers: auth }))
    expect(res.status).toBe(200)
    expect(((await res.json()) as { errors: Record<string, string> }).errors).toEqual({
      unrated: 'Internal error',
    })
  })

  it('turns a non-GitHubError into JSON 500, not an HTML crash page', async () => {
    // These used to be rethrown, so the panel's res.json() got Vercel's
    // generic HTML error page and showed "Request failed (500)".
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(github.listOpenRatingIssues).mockRejectedValue(new TypeError('boom'))
    vi.mocked(github.getWeights).mockRejectedValue(new TypeError('boom'))
    vi.mocked(github.latestRun).mockRejectedValue(new TypeError('boom'))
    const res = await statusGet(new Request('https://x/api/panel/status', { headers: auth }))
    expect(res.status).toBe(500)
    expect(res.headers.get('content-type')).toContain('application/json')
    expect(((await res.json()) as { error: string }).error).toBe('Internal error')
  })

  it('accepts risk: null at the endpoint, not just in the client', async () => {
    const res = await weightsPut(
      new Request('https://x/api/panel/weights', {
        method: 'PUT',
        headers: { ...auth, 'content-type': 'application/json' },
        body: JSON.stringify({ signals: 5, inspiration: 5, ratings: 5, risk: null }),
      })
    )
    expect(res.status).toBe(200)
    expect(github.setWeights).toHaveBeenCalledWith({
      signals: 5,
      inspiration: 5,
      ratings: 5,
      risk: null,
    })
  })
})

describe('rate input bounds', () => {
  it('requires a date rather than defaulting to UTC today', async () => {
    const res = await ratePost(post('https://x/api/panel/rate', { grade: 'A' }))
    expect(res.status).toBe(400)
    expect(((await res.json()) as { error: string }).error).toContain('date is required')
  })

  it('rejects a date-shaped string that is not a real date', async () => {
    const res = await ratePost(post('https://x/api/panel/rate', { grade: 'A', date: '2026-13-45' }))
    expect(res.status).toBe(400)
  })

  it('rejects a note long enough for GitHub to 422 on', async () => {
    const res = await ratePost(
      post('https://x/api/panel/rate', {
        grade: 'A',
        date: '2026-07-20',
        worked: 'x'.repeat(2001),
      })
    )
    expect(res.status).toBe(400)
    expect(((await res.json()) as { error: string }).error).toContain('worked')
  })

  it('accepts a note at the cap', async () => {
    vi.mocked(github.findOpenRatingIssue).mockResolvedValue({
      number: 1,
      date: '2026-07-20',
      title: 't',
      url: 'u',
    })
    const res = await ratePost(
      post('https://x/api/panel/rate', {
        grade: 'A',
        date: '2026-07-20',
        worked: 'x'.repeat(2000),
      })
    )
    expect(res.status).toBe(200)
  })
})
