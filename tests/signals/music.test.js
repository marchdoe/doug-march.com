import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/music.js'

describe('music provider', () => {
  it('returns a random subset of bands from profile', async () => {
    const profile = { music: { bands: ['Radiohead', 'Wet Leg', 'My Morning Jacket', 'The War on Drugs'] } }
    const result = await collect(profile)
    expect(name).toBe('music')
    expect(result.data.bands.length).toBeGreaterThanOrEqual(2)
    expect(result.data.bands.length).toBeLessThanOrEqual(3)
    result.data.bands.forEach(b => expect(profile.music.bands).toContain(b))
  })

  it('returns empty if no bands in profile', async () => {
    const result = await collect({ music: { bands: [] } })
    expect(result.data.bands).toEqual([])
  })
})
