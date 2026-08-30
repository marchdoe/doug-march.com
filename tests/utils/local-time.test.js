/**
 * The signal layer used to hold three different answers to "what day is it".
 * These pin the one it holds now.
 */
import { describe, it, expect } from 'vitest'
import {
  DEFAULT_TZ,
  localDateString,
  localDayOfYear,
  localMonthName,
  tzOf,
  tzOffsetHours,
  zonedParts,
} from '../../scripts/utils/local-time.js'

const NY = 'America/New_York'

describe('tzOffsetHours', () => {
  // The number sun.js was approximating as Math.round(lng / 15), which gives
  // -5 for Ashburn every day of the year.
  it('is -4 during Eastern Daylight Time', () => {
    expect(tzOffsetHours(new Date('2026-08-30T12:00:00Z'), NY)).toBe(-4)
  })

  it('is -5 during Eastern Standard Time', () => {
    expect(tzOffsetHours(new Date('2026-01-15T12:00:00Z'), NY)).toBe(-5)
  })

  it('switches at the spring-forward boundary', () => {
    // 2026-03-08: 2am EST becomes 3am EDT at 07:00 UTC.
    expect(tzOffsetHours(new Date('2026-03-08T06:00:00Z'), NY)).toBe(-5)
    expect(tzOffsetHours(new Date('2026-03-08T08:00:00Z'), NY)).toBe(-4)
  })

  it('switches back at the fall-back boundary', () => {
    // 2026-11-01: 2am EDT becomes 1am EST at 06:00 UTC.
    expect(tzOffsetHours(new Date('2026-11-01T05:00:00Z'), NY)).toBe(-4)
    expect(tzOffsetHours(new Date('2026-11-01T07:00:00Z'), NY)).toBe(-5)
  })
})

describe('localDateString', () => {
  it('reports the local day when UTC has already rolled over', () => {
    expect(localDateString(new Date('2026-08-31T02:00:00Z'), NY)).toBe('2026-08-30')
  })

  it('agrees with UTC during the working day', () => {
    expect(localDateString(new Date('2026-08-30T12:00:00Z'), NY)).toBe('2026-08-30')
  })

  it('pads single-digit months and days', () => {
    expect(localDateString(new Date('2026-01-05T17:00:00Z'), NY)).toBe('2026-01-05')
  })
})

describe('zonedParts', () => {
  it('normalises midnight to hour 0 rather than 24', () => {
    expect(zonedParts(new Date('2026-08-30T04:00:00Z'), NY).hour).toBe(0)
  })

  it('names the weekday', () => {
    expect(zonedParts(new Date('2026-08-30T12:00:00Z'), NY).weekday).toBe('Sunday')
  })
})

describe('localDayOfYear and localMonthName', () => {
  it('counts the day of the year', () => {
    expect(localDayOfYear(new Date('2026-08-30T12:00:00Z'), NY)).toBe(242)
    expect(localDayOfYear(new Date('2026-01-01T12:00:00Z'), NY)).toBe(1)
  })

  it('names the month locally', () => {
    // Still August in Ashburn, already September in UTC.
    expect(localMonthName(new Date('2026-09-01T02:00:00Z'), NY)).toBe('August')
  })
})

describe('tzOf', () => {
  it('reads the zone from the profile', () => {
    expect(tzOf({ location: { tz: 'Europe/Berlin' } })).toBe('Europe/Berlin')
  })

  it('falls back to the site zone', () => {
    expect(tzOf({})).toBe(DEFAULT_TZ)
    expect(tzOf(undefined)).toBe(DEFAULT_TZ)
  })
})
