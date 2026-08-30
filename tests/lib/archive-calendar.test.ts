import { describe, expect, it } from 'vitest'

import {
  cellLabel,
  cellsFor,
  daysInMonth,
  densestMonth,
  firstWeekday,
  hrefFor,
  inkFor,
  monthLabel,
  monthsSpanned,
  stateFor,
  swatchFor,
} from '../../app/lib/archive-calendar'
import type { ArchiveIndexEntry } from '../../app/types/archive-record'

function entry(date: string, over: Partial<ArchiveIndexEntry> = {}): ArchiveIndexEntry {
  return {
    date,
    era: 'grammar',
    brief: 'A brief.',
    legacyArchetype: null,
    chassis: 'spectral-albert',
    buildId: '1',
    attempts: 1,
    moodWord: 'candlelit',
    primaryHue: { h: 35, s: 95, l: 48, name: 'amber gold' },
    hasScreenshot: false,
    pages: 9,
    cost: null,
    rating: null,
    ...over,
  }
}

describe('date arithmetic', () => {
  it('counts days, leap year included', () => {
    expect(daysInMonth('2026-02')).toBe(28)
    expect(daysInMonth('2024-02')).toBe(29)
    expect(daysInMonth('2026-06')).toBe(30)
    expect(daysInMonth('2026-07')).toBe(31)
  })

  it('finds the weekday the month opens on', () => {
    // 2026-06-01 is a Monday.
    expect(firstWeekday('2026-06')).toBe(1)
  })

  it('labels a month for a human', () => {
    expect(monthLabel('2026-06')).toBe('June 2026')
  })
})

describe('monthsSpanned', () => {
  it('includes months with no builds, so the run reads as continuous', () => {
    const entries = [entry('2026-03-12'), entry('2026-06-28')]
    expect(monthsSpanned(entries)).toEqual(['2026-03', '2026-04', '2026-05', '2026-06'])
  })

  it('crosses a year boundary', () => {
    expect(monthsSpanned([entry('2026-11-30'), entry('2027-01-02')])).toEqual([
      '2026-11',
      '2026-12',
      '2027-01',
    ])
  })

  it('is empty when nothing has been built', () => {
    expect(monthsSpanned([])).toEqual([])
  })
})

describe('densestMonth', () => {
  it('opens on the fullest month, not the newest', () => {
    // August has one build; June has three. June opens.
    const entries = [
      entry('2026-06-01'),
      entry('2026-06-02'),
      entry('2026-06-03'),
      entry('2026-08-23'),
    ]
    expect(densestMonth(entries)).toBe('2026-06')
  })

  it('compares proportion of the month, not raw count', () => {
    // 20 of 28 in February beats 21 of 31 in July.
    const feb = Array.from({ length: 20 }, (_, i) =>
      entry(`2026-02-${String(i + 1).padStart(2, '0')}`)
    )
    const jul = Array.from({ length: 21 }, (_, i) =>
      entry(`2026-07-${String(i + 1).padStart(2, '0')}`)
    )
    expect(densestMonth([...feb, ...jul])).toBe('2026-02')
  })

  it('has nothing to open when there is nothing', () => {
    expect(densestMonth([])).toBeNull()
  })
})

describe('cell state and destination', () => {
  it('sends a day with a preserved design to the design', () => {
    const e = entry('2026-06-28', { pages: 9 })
    expect(stateFor(e)).toBe('built')
    expect(hrefFor(e)).toBe('/archive/2026-06-28/')
  })

  it('sends a record-only day to the explainer, because there is no design to open', () => {
    // 2026-03-12, 03-14 and 03-15 have a record and no capture.
    const e = entry('2026-03-12', { pages: 0 })
    expect(stateFor(e)).toBe('record')
    expect(hrefFor(e)).toBe('/how/2026-03-12')
  })

  it('treats a day with no entry as dead', () => {
    expect(stateFor(undefined)).toBe('empty')
  })
})

describe('swatchFor', () => {
  it('uses the recorded hue', () => {
    expect(swatchFor(entry('2026-06-28'))).toBe('hsl(35 95% 48%)')
  })

  it('falls back to a neutral on the dates with no color recorded', () => {
    expect(swatchFor(entry('2026-03-20', { primaryHue: null }))).toBe('#3a3a42')
  })
})

describe('inkFor', () => {
  const ink = (h: number, s: number, l: number) => inkFor(entry('x', { primaryHue: { h, s, l } }))

  it('puts dark ink on a saturated yellow-green, where lightness alone fails', () => {
    // The prototype's `l > 55` rule chose white here and it was unreadable.
    expect(ink(75, 90, 50)).toBe('#0e0e10')
    expect(ink(60, 100, 50)).toBe('#0e0e10')
  })

  it('puts light ink on a deep blue', () => {
    expect(ink(220, 80, 30)).toBe('#f2f2f4')
  })

  it('puts dark ink on a pale ground', () => {
    expect(ink(35, 60, 88)).toBe('#0e0e10')
  })

  it('puts light ink on near-black', () => {
    expect(ink(0, 0, 6)).toBe('#f2f2f4')
  })

  it('defaults to light ink when no color was recorded', () => {
    expect(inkFor(entry('x', { primaryHue: null }))).toBe('#f2f2f4')
    expect(inkFor(null)).toBe('#f2f2f4')
  })
})

describe('cellsFor', () => {
  it('pads the grid so the 1st lands on its weekday', () => {
    const cells = cellsFor('2026-06', [])
    // June 1 2026 is a Monday, so one blank for Sunday.
    expect(cells.slice(0, 1)).toEqual([null])
    expect(cells[1]).toMatchObject({ day: 1, date: '2026-06-01', state: 'empty' })
    expect(cells).toHaveLength(1 + 30)
  })

  it('marks each day with what the archive has for it', () => {
    const cells = cellsFor('2026-06', [
      entry('2026-06-02', { pages: 9 }),
      entry('2026-06-03', { pages: 0 }),
    ])
    const byDay = new Map(cells.filter(Boolean).map((c) => [c?.day, c]))
    expect(byDay.get(2)).toMatchObject({ state: 'built' })
    expect(byDay.get(3)).toMatchObject({ state: 'record' })
    expect(byDay.get(4)).toMatchObject({ state: 'empty', entry: null })
  })
})

describe('cellLabel', () => {
  it('prefers the day’s mood word', () => {
    expect(cellLabel(entry('x', { moodWord: 'candlelit' }))).toBe('candlelit')
  })

  it('falls back to the archetype in the prose era, where there was no mood', () => {
    expect(cellLabel(entry('x', { moodWord: null, legacyArchetype: 'Poster' }))).toBe('Poster')
  })

  it('says nothing rather than something invented', () => {
    expect(cellLabel(entry('x', { moodWord: null, legacyArchetype: null }))).toBeNull()
  })
})
