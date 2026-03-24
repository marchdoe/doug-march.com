import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { collect, name } from '../../scripts/signals/sports.js'

describe('sports provider', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns team results from ESPN', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        events: [{
          competitions: [{
            competitors: [
              { team: { displayName: 'Detroit Lions' }, score: '24', winner: true, homeAway: 'home' },
              { team: { displayName: 'Chicago Bears' }, score: '17', winner: false, homeAway: 'away' },
            ],
            status: { type: { completed: true } },
          }],
          name: 'Chicago Bears at Detroit Lions',
          date: '2026-03-10T00:00Z',
        }],
      }),
    })

    const profile = {
      sports: {
        teams: [{ name: 'Detroit Lions', league: 'NFL' }],
      },
    }
    const result = await collect(profile)
    expect(name).toBe('sports')
    expect(result.data.teams).toHaveLength(1)
    expect(result.data.teams[0].name).toBe('Detroit Lions')
  })

  it('handles empty teams gracefully', async () => {
    const result = await collect({ sports: { teams: [] } })
    expect(result.data.teams).toEqual([])
  })
})
