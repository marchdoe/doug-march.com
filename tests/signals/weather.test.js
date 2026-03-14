import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { collect, name } from '../../scripts/signals/weather.js'

describe('weather provider', () => {
  beforeEach(() => {
    vi.stubEnv('WEATHER_API_KEY', 'test-key')
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it('returns weather data from API', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        location: { name: 'Ashburn', region: 'Virginia' },
        current: {
          condition: { text: 'Partly cloudy' },
          temp_f: 72,
          temp_c: 22,
          humidity: 45,
          wind_mph: 8,
          wind_dir: 'NW',
          feelslike_f: 70,
        },
      }),
    })

    const profile = { location: { zip: '20105' } }
    const result = await collect(profile)
    expect(name).toBe('weather')
    expect(result.data.conditions).toBe('Partly cloudy')
    expect(result.data.temp_f).toBe(72)
    expect(result.meta.source).toBe('weatherapi.com')
  })

  it('throws if API key not set', async () => {
    vi.stubEnv('WEATHER_API_KEY', '')
    await expect(collect({ location: { zip: '20105' } })).rejects.toThrow('WEATHER_API_KEY')
  })
})
