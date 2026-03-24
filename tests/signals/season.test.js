import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/season.js'

describe('season provider', () => {
  it('exports correct name', () => {
    expect(name).toBe('season')
  })

  it('returns season data based on current date', async () => {
    const result = await collect({})
    expect(result.data).toHaveProperty('season')
    expect(result.data).toHaveProperty('month')
    expect(result.data).toHaveProperty('day_of_year')
    expect(['spring', 'summer', 'fall', 'winter']).toContain(result.data.season)
    expect(result.meta.source).toBe('derived')
  })
})
