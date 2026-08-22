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
    const res = await ratePost(post('https://x/api/panel/rate', { grade: 'A' }))
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
