import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/lunar.js'

describe('lunar provider', () => {
  it('returns moon phase', async () => {
    const result = await collect({})
    expect(name).toBe('lunar')
    expect(result.data).toHaveProperty('phase')
    expect(result.data).toHaveProperty('illumination')
    expect(['new moon','waxing crescent','first quarter','waxing gibbous','full moon','waning gibbous','last quarter','waning crescent']).toContain(result.data.phase)
    expect(result.data.illumination).toBeGreaterThanOrEqual(0)
    expect(result.data.illumination).toBeLessThanOrEqual(1)
  })
})
