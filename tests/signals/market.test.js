import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { collect, name } from '../../scripts/signals/market.js'

describe('market provider', () => {
  beforeEach(() => {
    vi.stubEnv('ALPHA_VANTAGE_API_KEY', 'test-key')
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it('returns market data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        'Global Quote': {
          '05. price': '450.25',
          '09. change': '2.50',
          '10. change percent': '0.56%',
        },
      }),
    })

    const result = await collect({})
    expect(name).toBe('market')
    expect(result.data.direction).toBe('up')
    expect(result.data.price).toBe('450.25')
    expect(result.meta.source).toBe('alphavantage.co')
  })

  it('throws if API key not set', async () => {
    vi.stubEnv('ALPHA_VANTAGE_API_KEY', '')
    await expect(collect({})).rejects.toThrow('ALPHA_VANTAGE_API_KEY')
  })
})
