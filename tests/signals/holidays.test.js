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

  it('counts days_away in the site zone, not the runner zone (#343)', async () => {
    // 21:00 Eastern on 2026-11-25 is already 2026-11-26 UTC — the date GitHub
    // Actions' own clock reads. Thanksgiving must still be "tomorrow" in
    // Eastern, not "today" by the runner's date.
    const originalTz = process.env.TZ
    process.env.TZ = 'UTC'
    try {
      const now = new Date('2026-11-26T02:00:00Z')
      const result = await collect(profile, { now })
      expect(result.data.today).toBeNull()
      const thanksgiving = result.data.upcoming.find((h) => /Thanksgiving/i.test(h.name))
      expect(thanksgiving).toBeDefined()
      expect(thanksgiving.days_away).toBe(1)
    } finally {
      if (originalTz === undefined) delete process.env.TZ
      else process.env.TZ = originalTz
    }
  })
})
