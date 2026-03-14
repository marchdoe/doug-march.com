import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/holidays.js'

describe('holidays provider', () => {
  it('returns today and upcoming holidays', async () => {
    const result = await collect({})
    expect(name).toBe('holidays')
    expect(result.data).toHaveProperty('today')    // null or holiday name
    expect(result.data).toHaveProperty('upcoming')  // array of { name, date, days_away }
    expect(Array.isArray(result.data.upcoming)).toBe(true)
  })
})
