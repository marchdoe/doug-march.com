import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { collect, name } from '../../scripts/signals/product-hunt.js'

describe('product-hunt provider', () => {
  beforeEach(() => {
    vi.stubEnv('PRODUCT_HUNT_TOKEN', 'test-token')
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it('returns top products', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          posts: {
            edges: [
              { node: { name: 'Cool App', tagline: 'Does cool stuff', votesCount: 500, url: 'https://www.producthunt.com/posts/cool-app' } },
              { node: { name: 'Nice Tool', tagline: 'A nice tool', votesCount: 300, url: 'https://www.producthunt.com/posts/nice-tool' } },
            ],
          },
        },
      }),
    })

    const result = await collect({})
    expect(name).toBe('product_hunt')
    expect(result.data.products).toHaveLength(2)
    expect(result.data.products[0].name).toBe('Cool App')
    expect(result.meta.source).toBe('producthunt.com')
  })

  it('throws if token not set', async () => {
    vi.stubEnv('PRODUCT_HUNT_TOKEN', '')
    await expect(collect({})).rejects.toThrow('PRODUCT_HUNT_TOKEN')
  })
})
