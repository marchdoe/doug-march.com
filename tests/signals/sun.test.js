import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/sun.js'

describe('sun provider', () => {
  it('returns sunrise and sunset times', async () => {
    const profile = { location: { lat: 39.0438, lng: -77.4874 } }
    const result = await collect(profile)
    expect(name).toBe('sun')
    expect(result.data).toHaveProperty('sunrise')
    expect(result.data).toHaveProperty('sunset')
    expect(result.data).toHaveProperty('daylight_hours')
    expect(result.data.daylight_hours).toBeGreaterThan(0)
    expect(result.data.daylight_hours).toBeLessThan(24)
  })
})
