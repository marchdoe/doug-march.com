import { localDayOfYear, tzOf, tzOffsetHours } from '../utils/local-time.js'

export const name = 'sun'
export const timeout = 1000

// Convert degrees to radians
function toRad(deg) {
  return (deg * Math.PI) / 180
}

// Convert radians to degrees
function toDeg(rad) {
  return (rad * 180) / Math.PI
}

// Format decimal hours as "HH:MM"
function formatTime(decimalHours) {
  const totalMinutes = Math.round(decimalHours * 60)
  const h = Math.floor(totalMinutes / 60) % 24
  const m = totalMinutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export async function collect(profile, { now = new Date() } = {}) {
  // The profile is required in practice — collect-signals always passes it.
  // The coordinate fallbacks duplicated signals/profile.yml, so a move would
  // have had to be made in two places.
  const lat = profile?.location?.lat ?? 39.0438
  const lng = profile?.location?.lng ?? -77.4874
  const tz = tzOf(profile)

  const dayOfYear = localDayOfYear(now, tz)

  // Solar declination (degrees)
  const declination = 23.45 * Math.sin(toRad((360 / 365) * (dayOfYear - 81)))

  // Hour angle at sunrise/sunset: cos(H) = -tan(lat) * tan(dec)
  const cosH = -Math.tan(toRad(lat)) * Math.tan(toRad(declination))

  let sunriseUTC, sunsetUTC, daylightHours

  if (cosH > 1) {
    // Sun never rises (polar night)
    sunriseUTC = 12
    sunsetUTC = 12
    daylightHours = 0
  } else if (cosH < -1) {
    // Sun never sets (midnight sun)
    sunriseUTC = 0
    sunsetUTC = 24
    daylightHours = 24
  } else {
    const H = toDeg(Math.acos(cosH)) // hour angle in degrees

    // Each 15 degrees of hour angle = 1 hour
    const halfDayHours = H / 15

    // Equation of time correction (minutes) — approximate
    const B = toRad((360 / 365) * (dayOfYear - 81))
    const eotMinutes = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B)

    // Longitude correction: local solar noon differs from UTC noon by lng/15 hours
    const longitudeOffsetHours = lng / 15

    // Solar noon in UTC hours
    const solarNoonUTC = 12 - longitudeOffsetHours - eotMinutes / 60

    sunriseUTC = solarNoonUTC - halfDayHours
    sunsetUTC = solarNoonUTC + halfDayHours
    daylightHours = halfDayHours * 2
  }

  // The zone's real offset, not one guessed from longitude.
  // Math.round(lng / 15) gives -5 for Ashburn every day of the year, but
  // America/New_York is -4 from March to November — so every sunrise and
  // sunset reported in those months was an hour early. Checked against a
  // 2026-08-30 sunrise of 06:41 EDT, which the old code called 05:42.
  const localOffsetHours = tzOffsetHours(now, tz)
  const sunriseLocal = (((sunriseUTC + localOffsetHours) % 24) + 24) % 24
  const sunsetLocal = (((sunsetUTC + localOffsetHours) % 24) + 24) % 24

  return {
    data: {
      sunrise: formatTime(sunriseLocal),
      sunset: formatTime(sunsetLocal),
      daylight_hours: Math.round(daylightHours * 10) / 10,
    },
    meta: { source: 'derived', items: 1 },
  }
}
