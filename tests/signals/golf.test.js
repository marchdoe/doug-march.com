import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { collect, name } from '../../scripts/signals/golf.js'

describe('golf provider', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns tournament data from ESPN', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        events: [{
          name: 'The Masters',
          status: { type: { description: 'In Progress' } },
          competitions: [{
            competitors: [
              { athlete: { displayName: 'Scottie Scheffler' }, status: { position: { displayName: '1' } }, score: { displayValue: '-12' } },
              { athlete: { displayName: 'Rory McIlroy' }, status: { position: { displayName: '2' } }, score: { displayValue: '-8' } },
            ],
          }],
        }],
      }),
    })

    const result = await collect({})
    expect(name).toBe('golf')
    expect(result.data.tournament).toBe('The Masters')
    expect(result.data.leaders.length).toBeGreaterThanOrEqual(1)
  })

  it('handles no active tournament', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ events: [] }),
    })

    const result = await collect({})
    expect(result.data.tournament).toBeNull()
    expect(result.data.leaders).toEqual([])
  })
})
