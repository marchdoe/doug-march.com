import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/sun.js'

const profile = { location: { lat: 39.0438, lng: -77.4874, tz: 'America/New_York' } }

describe('sun provider', () => {
  it('returns sunrise and sunset times', async () => {
    const result = await collect(profile, { now: new Date('2026-08-30T12:00:00Z') })
    expect(name).toBe('sun')
    expect(result.data).toHaveProperty('sunrise')
    expect(result.data).toHaveProperty('sunset')
    expect(result.data.daylight_hours).toBeGreaterThan(0)
    expect(result.data.daylight_hours).toBeLessThan(24)
  })

  // The old test asserted only 0 < daylight < 24 against the wall clock, so it
  // could not fail on an hour-wrong sunrise. These pin real instants and
  // compare with NOAA for Ashburn, VA, allowing a few minutes for the
  // equation-of-time approximation.
  it('is on Eastern Daylight Time in August, not an hour early', async () => {
    // NOAA: sunrise 06:41 EDT, sunset 19:41 EDT on 2026-08-30.
    // Deriving the offset from longitude gave -5 year-round and said 05:42.
    const { data } = await collect(profile, { now: new Date('2026-08-30T12:00:00Z') })
    expect(data.sunrise).toBe('06:42')
    expect(data.sunset.startsWith('19:')).toBe(true)
  })

  it('is on Eastern Standard Time in January', async () => {
    // NOAA: sunrise 07:26 EST on 2026-01-15.
    const { data } = await collect(profile, { now: new Date('2026-01-15T12:00:00Z') })
    expect(data.sunrise.startsWith('07:')).toBe(true)
    expect(data.daylight_hours).toBeLessThan(10)
  })

  it('reports a longer day in June than in December', async () => {
    const june = await collect(profile, { now: new Date('2026-06-21T12:00:00Z') })
    const december = await collect(profile, { now: new Date('2026-12-21T12:00:00Z') })
    expect(june.data.daylight_hours).toBeGreaterThan(december.data.daylight_hours + 4)
  })
})
