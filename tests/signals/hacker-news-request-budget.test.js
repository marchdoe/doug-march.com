/**
 * #344: the provider races collect-signals.js's own timeout of 10s against
 * two sequential rounds — top stories, then five items via Promise.all — so
 * each request needs its own deadline that leaves room for both rounds
 * inside the provider's one budget. This is split from hacker-news.test.js
 * because it needs to see what fetchJson was actually called with, not just
 * the response shape.
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import { collect, REQUEST_TIMEOUT_MS, timeout } from '../../scripts/signals/hacker-news.js'
import * as signalFetch from '../../scripts/utils/signal-fetch.js'

describe('hacker-news provider request budget', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('still races the collector against a 10s provider budget', () => {
    expect(timeout).toBe(10000)
  })

  it('gives every request less than half the provider budget', async () => {
    const spy = vi.spyOn(signalFetch, 'fetchJson').mockImplementation(async (url) => {
      if (url.includes('topstories')) return [1001, 1002, 1003, 1004, 1005]
      const id = url.match(/item\/(\d+)/)?.[1]
      return {
        id: Number(id),
        title: `Story ${id}`,
        url: `https://example.com/${id}`,
        score: 100,
        by: 'user',
      }
    })

    await collect({})

    // Top stories + 5 items = 6 calls.
    expect(spy).toHaveBeenCalledTimes(6)
    for (const [, options] of spy.mock.calls) {
      expect(options.timeoutMs).toBe(REQUEST_TIMEOUT_MS)
      expect(options.timeoutMs).toBeLessThan(timeout / 2)
    }
  })
})
