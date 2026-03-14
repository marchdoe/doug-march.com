import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { collect, name } from '../../scripts/signals/quote.js'

describe('quote provider', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns a quote from the API', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ q: 'The only way to do great work is to love what you do.', a: 'Steve Jobs' }],
    })

    const result = await collect({})
    expect(name).toBe('quote')
    expect(result.data.text).toBe('The only way to do great work is to love what you do.')
    expect(result.data.author).toBe('Steve Jobs')
    expect(result.meta.source).toBe('zenquotes.io')
  })

  it('throws on API failure', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 })
    await expect(collect({})).rejects.toThrow()
  })
})
