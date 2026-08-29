import { REPO } from '../../api/_lib/github'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import {
  listOpenRatingIssues,
  findOpenRatingIssue,
  commentOnIssue,
  createRatingIssue,
  getWeights,
  setWeights,
  dispatchRun,
  latestRun,
  GitHubError,
} from '../../api/_lib/github'

const fetchMock = vi.fn()

function jsonRes(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

beforeEach(() => {
  process.env.GH_PANEL_TOKEN = 'test-token'
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
})
afterEach(() => vi.unstubAllGlobals())

describe('listOpenRatingIssues', () => {
  it('maps issues and extracts dates from titles', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonRes([
        {
          number: 82,
          title: 'Rate: 2026-07-20 — "Breadboard"',
          html_url: 'https://github.com/x/82',
        },
        { number: 99, title: 'unrelated title', html_url: 'https://github.com/x/99' },
      ])
    )
    const issues = await listOpenRatingIssues()
    expect(fetchMock.mock.calls[0][0]).toBe(
      `https://api.github.com/repos/${REPO}/issues?labels=daily-rating&state=open&per_page=30`
    )
    expect(issues).toEqual([
      {
        number: 82,
        date: '2026-07-20',
        title: 'Rate: 2026-07-20 — "Breadboard"',
        url: 'https://github.com/x/82',
      },
    ])
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
    fetchMock.mockImplementation(() => Promise.resolve(jsonRes(payload)))
    expect((await findOpenRatingIssue('2026-07-20'))?.number).toBe(82)
    expect(await findOpenRatingIssue('2026-07-19')).toBeNull()
  })
})

describe('commentOnIssue / createRatingIssue', () => {
  it('POSTs the comment body', async () => {
    fetchMock.mockResolvedValueOnce(jsonRes({}, 201))
    await commentOnIssue(82, 'hello')
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe(`https://api.github.com/repos/${REPO}/issues/82/comments`)
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body as string)).toEqual({ body: 'hello' })
  })
  it('creates a labeled issue titled Rate: {date}', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonRes({ number: 90, title: 'Rate: 2026-07-19', html_url: 'u' }, 201)
    )
    const issue = await createRatingIssue('2026-07-19', 'body')
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe(`https://api.github.com/repos/${REPO}/issues`)
    expect(JSON.parse(init.body as string)).toEqual({
      title: 'Rate: 2026-07-19',
      body: 'body',
      labels: ['daily-rating'],
    })
    expect(issue).toEqual({ number: 90, date: '2026-07-19', title: 'Rate: 2026-07-19', url: 'u' })
  })
})

describe('getWeights', () => {
  it('reads the four variables, defaulting missing ones', async () => {
    fetchMock.mockImplementation((url: string) => {
      if (url.endsWith('/WEIGHT_SIGNALS'))
        return Promise.resolve(jsonRes({ name: 'WEIGHT_SIGNALS', value: '7' }))
      return Promise.resolve(jsonRes({ message: 'Not Found' }, 404))
    })
    expect(await getWeights()).toEqual({ signals: 7, inspiration: 5, ratings: 5, risk: 8 })
  })
})

describe('setWeights', () => {
  it('PATCHes existing variables and POSTs missing ones', async () => {
    fetchMock.mockImplementation((url: string, init?: RequestInit) => {
      if (init?.method === 'PATCH' && url.endsWith('/WEIGHT_RISK'))
        return Promise.resolve(jsonRes({ message: 'Not Found' }, 404))
      return Promise.resolve(new Response(null, { status: 204 }))
    })
    await setWeights({ signals: 5, inspiration: 5, ratings: 9, risk: 8 })
    const posts = fetchMock.mock.calls.filter(
      ([, init]) => (init as RequestInit)?.method === 'POST'
    )
    expect(posts).toHaveLength(1)
    expect(JSON.parse((posts[0][1] as RequestInit).body as string)).toEqual({
      name: 'WEIGHT_RISK',
      value: '8',
    })
  })
})

describe('dispatchRun / latestRun', () => {
  it('dispatches the workflow with string inputs', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }))
    await dispatchRun(true)
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe(
      `https://api.github.com/repos/${REPO}/actions/workflows/daily-redesign.yml/dispatches`
    )
    expect(JSON.parse(init.body as string)).toEqual({ ref: 'main', inputs: { dry_run: 'true' } })
  })
  it('returns the latest run info or null', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonRes({
        workflow_runs: [
          { status: 'completed', conclusion: 'success', html_url: 'u', created_at: 't' },
        ],
      })
    )
    expect(await latestRun()).toEqual({
      status: 'completed',
      conclusion: 'success',
      url: 'u',
      createdAt: 't',
    })
    fetchMock.mockResolvedValueOnce(jsonRes({ workflow_runs: [] }))
    expect(await latestRun()).toBeNull()
  })
})
