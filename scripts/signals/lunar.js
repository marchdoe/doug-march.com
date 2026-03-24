export const name = 'lunar'
export const timeout = 1000

// January 6, 2000 was a known new moon (UTC)
const KNOWN_NEW_MOON = new Date('2000-01-06T00:00:00Z')
const SYNODIC_PERIOD = 29.53059 // days

export async function collect(_profile) {
  const now = new Date()
  const msSinceRef = now - KNOWN_NEW_MOON
  const daysSinceRef = msSinceRef / 86400000

  const daysIntoCycle = ((daysSinceRef % SYNODIC_PERIOD) + SYNODIC_PERIOD) % SYNODIC_PERIOD

  // Phase angle in radians (0 = new moon, π = full moon, 2π = back to new)
  const phaseAngle = (daysIntoCycle / SYNODIC_PERIOD) * 2 * Math.PI

  // Illumination: 0 at new moon, 1 at full moon, 0 again at next new moon
  const illumination = (1 - Math.cos(phaseAngle)) / 2

  // Map days into cycle to one of 8 named phases
  const fraction = daysIntoCycle / SYNODIC_PERIOD // 0–1
  let phase
  if (fraction < 0.0625)       phase = 'new moon'
  else if (fraction < 0.1875)  phase = 'waxing crescent'
  else if (fraction < 0.3125)  phase = 'first quarter'
  else if (fraction < 0.4375)  phase = 'waxing gibbous'
  else if (fraction < 0.5625)  phase = 'full moon'
  else if (fraction < 0.6875)  phase = 'waning gibbous'
  else if (fraction < 0.8125)  phase = 'last quarter'
  else if (fraction < 0.9375)  phase = 'waning crescent'
  else                          phase = 'new moon'

  return {
    data: {
      phase,
      illumination: Math.round(illumination * 1000) / 1000,
      days_into_cycle: Math.round(daysIntoCycle * 100) / 100,
    },
    meta: { source: 'derived', items: 1 },
  }
}
