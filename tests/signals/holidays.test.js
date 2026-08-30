import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/holidays.js'

const profile = { location: { lat: 39.0438, lng: -77.4874, tz: 'America/New_York' } }

describe('holidays provider', () => {
  it('returns today and upcoming holidays', async () => {
    const result = await collect(profile, { now: new Date('2026-08-30T12:00:00Z') })
    expect(name).toBe('holidays')
    expect(result.data).toHaveProperty('today')
    expect(Array.isArray(result.data.upcoming)).toBe(true)
  })

  // Shape assertions against the wall clock could never catch a holiday
  // landing on the wrong day. These name the answer.
  it('recognises Independence Day when it is today', async () => {
    const result = await collect(profile, { now: new Date('2026-07-04T16:00:00Z') })
    expect(result.data.today).toMatch(/Independence Day/i)
  })

  it('recognises Christmas when it is today', async () => {
    const result = await collect(profile, { now: new Date('2026-12-25T16:00:00Z') })
    expect(result.data.today).toMatch(/Christmas/i)
  })

  it('reports no holiday on an ordinary day', async () => {
    const result = await collect(profile, { now: new Date('2026-08-30T16:00:00Z') })
    expect(result.data.today).toBeNull()
  })

  it('counts down to the next one', async () => {
    const result = await collect(profile, { now: new Date('2026-07-01T16:00:00Z') })
    const july4 = result.data.upcoming.find((h) => /Independence Day/i.test(h.name))
    expect(july4).toBeDefined()
    expect(july4.days_away).toBe(3)
  })
})
