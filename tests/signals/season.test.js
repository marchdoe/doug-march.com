import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/season.js'

const profile = { location: { lat: 39.0438, lng: -77.4874, tz: 'America/New_York' } }

describe('season provider', () => {
  it('exports correct name', () => {
    expect(name).toBe('season')
  })

  it('returns season data for a pinned date', async () => {
    const result = await collect(profile, { now: new Date('2026-08-30T12:00:00Z') })
    expect(result.data.season).toBe('summer')
    expect(result.data.month).toBe(8)
    expect(result.data.day).toBe(30)
    expect(result.data.month_name).toBe('August')
    expect(result.data.day_of_year).toBe(242)
  })

  it.each([
    ['2026-01-15T12:00:00Z', 'winter'],
    ['2026-04-15T12:00:00Z', 'spring'],
    ['2026-07-15T12:00:00Z', 'summer'],
    ['2026-10-15T12:00:00Z', 'fall'],
    ['2026-12-15T12:00:00Z', 'winter'],
  ])('%j falls in %j', async (iso, season) => {
    const result = await collect(profile, { now: new Date(iso) })
    expect(result.data.season).toBe(season)
  })

  it('rolls the month over at local midnight, not UTC midnight', async () => {
    // September in UTC, still 31 August in Ashburn.
    const result = await collect(profile, { now: new Date('2026-09-01T02:00:00Z') })
    expect(result.data.month).toBe(8)
    expect(result.data.day).toBe(31)
    expect(result.data.season).toBe('summer')
  })
})
