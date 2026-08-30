/**
 * The helper the collectors used to hand-roll nineteen times.
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { USER_AGENT, fetchJson, fetchText, signalFetch } from '../../scripts/utils/signal-fetch.js'

afterEach(() => vi.unstubAllGlobals())

const ok = (body, init = {}) =>
  new Response(typeof body === 'string' ? body : JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
    ...init,
  })

describe('signalFetch', () => {
  it('sends one user agent for every collector', async () => {
    const mock = vi.fn().mockResolvedValue(ok({}))
    vi.stubGlobal('fetch', mock)
    await signalFetch('https://example.com')
    expect(mock.mock.calls[0][1].headers['user-agent']).toBe(USER_AGENT)
  })

  it('always attaches a signal, even when the caller passes none', async () => {
    // The orchestrator's abort was decorative because no collector forwarded
    // it and none set a timeout of its own.
    const mock = vi.fn().mockResolvedValue(ok({}))
    vi.stubGlobal('fetch', mock)
    await signalFetch('https://example.com')
    expect(mock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal)
  })

  it('aborts when the caller’s signal aborts', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((_u, init) =>
        init.signal.aborted
          ? Promise.reject(Object.assign(new Error('aborted'), { name: 'AbortError' }))
          : Promise.resolve(ok({}))
      )
    )
    const ac = new AbortController()
    ac.abort()
    await expect(signalFetch('https://example.com', { signal: ac.signal })).rejects.toThrow()
  })
})

describe('fetchJson', () => {
  it('names the source when the status is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 503 })))
    await expect(fetchJson('https://example.com', { source: 'ESPN golf' })).rejects.toThrow(
      /ESPN golf responded with 503/
    )
  })

  it('names the source when the body is not JSON', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('<html>', { status: 200 })))
    await expect(fetchJson('https://example.com', { source: 'newsapi.org' })).rejects.toThrow(
      /newsapi.org returned a body that is not JSON/
    )
  })

  it('rejects a 200 whose shape is wrong, instead of a TypeError downstream', async () => {
    // GraphQL answers errors with HTTP 200 and an `errors` array, so
    // `json.data.posts.edges` threw "Cannot read properties of undefined" and
    // the recorded reason never named Product Hunt.
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(ok({ errors: [{ message: 'nope' }] })))
    await expect(
      fetchJson('https://example.com', {
        source: 'producthunt.com',
        expect: (v) => Array.isArray(v?.data?.posts?.edges),
      })
    ).rejects.toThrow(/producthunt.com returned an unexpected shape/)
  })

  it('returns the body when it matches', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(ok({ articles: [1] })))
    await expect(
      fetchJson('https://example.com', { expect: (v) => Array.isArray(v.articles) })
    ).resolves.toEqual({ articles: [1] })
  })
})

describe('fetchText', () => {
  it('returns the body for the scrapers', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('<article>', { status: 200 })))
    await expect(fetchText('https://example.com')).resolves.toBe('<article>')
  })

  it('names the source on failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 429 })))
    await expect(
      fetchText('https://example.com', { source: 'github.com/trending' })
    ).rejects.toThrow(/github.com\/trending responded with 429/)
  })
})
