import { describe, it, expect } from 'vitest'
import { collect, name } from '../../scripts/signals/music.js'

const profile = {
  music: { bands: ['Radiohead', 'Wet Leg', 'My Morning Jacket', 'The War on Drugs'] },
}
const at = (iso) => ({ now: new Date(iso) })

describe('music provider', () => {
  it('picks two or three bands from the profile', async () => {
    const result = await collect(profile, at('2026-08-30T12:00:00Z'))
    expect(name).toBe('music')
    expect(result.data.bands.length).toBeGreaterThanOrEqual(2)
    expect(result.data.bands.length).toBeLessThanOrEqual(3)
    for (const b of result.data.bands) expect(profile.music.bands).toContain(b)
  })

  it('is a function of the date: the same day rebuilt picks the same bands', async () => {
    // Until #244 this was Math.random(), so a day rebuilt twice disagreed
    // with itself and the archive could not reconstruct it.
    const a = await collect(profile, at('2026-08-30T04:00:00Z'))
    const b = await collect(profile, at('2026-08-30T23:00:00Z'))
    expect(a.data.bands).toEqual(b.data.bands)
  })

  it('varies across days rather than always returning the same bands', async () => {
    const picks = new Set()
    for (let d = 1; d <= 20; d++) {
      const r = await collect(profile, at(`2026-08-${String(d).padStart(2, '0')}T12:00:00Z`))
      picks.add(r.data.bands.join('|'))
    }
    expect(picks.size).toBeGreaterThan(1)
  })

  it('says what it is: a rotation, not an observation', async () => {
    const result = await collect(profile, at('2026-08-30T12:00:00Z'))
    expect(result.data.rotation).toBe(true)
    expect(result.meta).toMatchObject({ source: 'profile', kind: 'rotation' })
  })

  it('returns empty if no bands in profile', async () => {
    const result = await collect({ music: { bands: [] } })
    expect(result.data.bands).toEqual([])
    expect(result.data.rotation).toBe(true)
  })
})
