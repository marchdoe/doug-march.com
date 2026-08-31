import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { collect, name, requiresApiKey } from '../../scripts/signals/product-hunt.js'

const tokenResponse = { ok: true, status: 200, json: async () => ({ access_token: 'minted-abc' }) }

const postsResponse = {
  ok: true,
  status: 200,
  json: async () => ({
    data: {
      posts: {
        edges: [
          {
            node: {
              name: 'Cool App',
              tagline: 'Does cool stuff',
              votesCount: 500,
              url: 'https://www.producthunt.com/posts/cool-app',
            },
          },
          {
            node: {
              name: 'Nice Tool',
              tagline: 'A nice tool',
              votesCount: 300,
              url: 'https://www.producthunt.com/posts/nice-tool',
            },
          },
        ],
      },
    },
  }),
}

describe('product-hunt provider', () => {
  beforeEach(() => {
    vi.stubEnv('PRODUCT_HUNT_CLIENT_ID', 'test-id')
    vi.stubEnv('PRODUCT_HUNT_CLIENT_SECRET', 'test-secret')
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it('returns top products', async () => {
    fetch.mockResolvedValueOnce(tokenResponse).mockResolvedValueOnce(postsResponse)

    const result = await collect({})
    expect(name).toBe('product_hunt')
    expect(result.data.products).toHaveLength(2)
    expect(result.data.products[0].name).toBe('Cool App')
    expect(result.meta.source).toBe('producthunt.com')
  })

  it('mints a token from the client credentials and sends it as the bearer', async () => {
    fetch.mockResolvedValueOnce(tokenResponse).mockResolvedValueOnce(postsResponse)

    await collect({})

    const [tokenCall, queryCall] = fetch.mock.calls
    expect(tokenCall[0]).toBe('https://api.producthunt.com/v2/oauth/token')
    expect(JSON.parse(tokenCall[1].body)).toEqual({
      client_id: 'test-id',
      client_secret: 'test-secret',
      grant_type: 'client_credentials',
    })
    expect(queryCall[0]).toBe('https://api.producthunt.com/v2/api/graphql')
    expect(queryCall[1].headers.authorization).toBe('Bearer minted-abc')
  })

  it('declares both halves of the credential so a partial config skips', () => {
    expect(requiresApiKey).toEqual(['PRODUCT_HUNT_CLIENT_ID', 'PRODUCT_HUNT_CLIENT_SECRET'])
  })

  it('names the token exchange when the credentials are rejected', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 401, json: async () => ({}) })

    // The old failure read "Cannot read properties of undefined" and named
    // nothing; a rejected credential has to say which call it was.
    await expect(collect({})).rejects.toThrow('producthunt.com token exchange responded with 401')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('names Product Hunt when the query answers 200 with a GraphQL error', async () => {
    fetch.mockResolvedValueOnce(tokenResponse).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: null, errors: [{ error: 'invalid_oauth_token' }] }),
    })

    await expect(collect({})).rejects.toThrow('producthunt.com returned an unexpected shape')
  })
})
