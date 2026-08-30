import { hashString, hashToRange } from '../utils/deterministic-hash.js'
import { localDateString, tzOf } from '../utils/local-time.js'

export const name = 'music'
export const timeout = 1000

/**
 * A standing rotation, not an observation.
 *
 * The site presents its signals as what the day contained — the Tigers
 * score, the SPY close, the moon. This one is a list of six bands in
 * profile.yml, and until #244 it was a `Math.random()` shuffle of them,
 * printed beside the real signals as if it had happened too. The same date
 * rebuilt twice picked different bands, which made it the only collector
 * the archive could not reconstruct.
 *
 * Now the pick is a function of the date, the way `resolveRiskWeight`
 * derives the risk dial: rebuilding a day gives the same bands, and the
 * record can be regenerated from its inputs. The payload says what it is —
 * `rotation: true` — so the explainer and the Art Director can describe it
 * as taste rather than news. Whether it should become a real listening
 * signal (Last.fm) is the other half of #244, and a decision for the owner.
 */
export async function collect(profile, { now = new Date() } = {}) {
  const bands = profile?.music?.bands ?? []
  if (bands.length === 0) {
    return {
      data: { bands: [], rotation: true },
      meta: { source: 'profile', kind: 'rotation', items: 0 },
    }
  }

  const date = localDateString(now, tzOf(profile))
  const count = Math.min(bands.length, hashToRange(`music:${date}:count`, 2, 3))
  // Order the list by a per-day hash of each name and take the front. Every
  // band gets a fresh position each day, and the same day always sorts the
  // same way.
  const picked = [...bands]
    .sort((a, b) => hashString(`music:${date}:${a}`) - hashString(`music:${date}:${b}`))
    .slice(0, count)

  return {
    data: { bands: picked, rotation: true },
    meta: { source: 'profile', kind: 'rotation', items: picked.length },
  }
}
