import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { collect, name } from '../../scripts/signals/hacker-news.js'

describe('hacker-news provider', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns top stories from HN API', async () => {
    // Mock the top stories endpoint
    fetch.mockImplementation((url) => {
      if (url.includes('topstories')) {
        return Promise.resolve({
          ok: true,
          json: async () => [1001, 1002, 1003, 1004, 1005, 1006],
        })
      }
      // Mock individual story endpoints
      const id = url.match(/item\/(\d+)/)?.[1]
      return Promise.resolve({
        ok: true,
        json: async () => ({
          id: Number(id),
          title: `Story ${id}`,
          url: `https://example.com/${id}`,
          score: 100 + Number(id),
          by: `user${id}`,
        }),
      })
    })

    const result = await collect({})
    expect(name).toBe('hacker_news')
    expect(result.data.stories).toHaveLength(5)
    expect(result.data.stories[0]).toHaveProperty('title')
    expect(result.data.stories[0]).toHaveProperty('url')
    expect(result.data.stories[0]).toHaveProperty('score')
    expect(result.meta.source).toBe('hacker-news.firebaseio.com')
  })
})
