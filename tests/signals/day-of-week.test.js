import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/day-of-week.js'

const profile = { location: { lat: 39.0438, lng: -77.4874, tz: 'America/New_York' } }

describe('day-of-week provider', () => {
  it('returns day name and metadata', async () => {
    const result = await collect(profile, { now: new Date('2026-08-27T16:00:00Z') })
    expect(name).toBe('day_of_week')
    expect(result.data.day).toBe('Thursday')
    expect(result.data.day_index).toBe(4)
    expect(result.data.is_weekend).toBe(false)
  })

  it('knows a Saturday is the weekend', async () => {
    const result = await collect(profile, { now: new Date('2026-08-29T16:00:00Z') })
    expect(result.data.day).toBe('Saturday')
    expect(result.data.is_weekend).toBe(true)
  })

  // The reason this provider takes a timezone at all. CI runs in UTC, so an
  // evening workflow_dispatch used to report tomorrow's weekday beside
  // today's date.
  it('reads the weekday in the site timezone, not the runner timezone', async () => {
    // 22:00 Sunday in Ashburn is already Monday in UTC.
    const now = new Date('2026-08-31T02:00:00Z')
    expect(now.toISOString().slice(0, 10)).toBe('2026-08-31')
    const result = await collect(profile, { now })
    expect(result.data.day).toBe('Sunday')
    expect(result.data.is_weekend).toBe(true)
  })
})
