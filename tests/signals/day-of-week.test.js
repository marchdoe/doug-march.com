import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/day-of-week.js'

describe('day-of-week provider', () => {
  it('returns day name and metadata', async () => {
    const result = await collect({})
    expect(name).toBe('day_of_week')
    expect(result.data).toHaveProperty('day')
    expect(result.data).toHaveProperty('is_weekend')
    expect(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']).toContain(result.data.day)
    expect(typeof result.data.is_weekend).toBe('boolean')
  })
})
