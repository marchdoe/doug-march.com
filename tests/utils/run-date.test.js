import { describe, it, expect } from 'vitest'
import { runDate } from '../../scripts/utils/run-date.js'

describe('runDate', () => {
  it("is the collector's local day when there is one", () => {
    expect(runDate({ date: '2026-08-30' })).toBe('2026-08-30')
  })

  it('falls back to a YYYY-MM-DD when signals carry no date', () => {
    for (const signals of [{}, { date: '' }, null, undefined]) {
      expect(runDate(signals)).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })
})
