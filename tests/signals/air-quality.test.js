import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { collect, name } from '../../scripts/signals/air-quality.js'

describe('air-quality provider', () => {
  beforeEach(() => {
    vi.stubEnv('WEATHER_API_KEY', 'test-key')
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it('returns air quality data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        current: {
          air_quality: { 'us-epa-index': 1 },
          uv: 5,
        },
        forecast: { forecastday: [{ day: { uv: 5 } }] },
      }),
    })

    const profile = { location: { zip: '20105' } }
    const result = await collect(profile)
    expect(name).toBe('air_quality')
    expect(result.data.aqi_index).toBe(1)
    expect(result.data.air_quality_label).toBe('Good')
    expect(result.data.uv_index).toBe(5)
  })
})
