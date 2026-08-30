import { localDayOfYear, localMonthName, tzOf, zonedParts } from '../utils/local-time.js'

export const name = 'season'
export const timeout = 1000

export async function collect(profile, { now = new Date() } = {}) {
  const tz = tzOf(profile)
  const { month, day } = zonedParts(now, tz)

  let season
  if (month >= 3 && month <= 5) season = 'spring'
  else if (month >= 6 && month <= 8) season = 'summer'
  else if (month >= 9 && month <= 11) season = 'fall'
  else season = 'winter'

  return {
    data: {
      season,
      month,
      day,
      day_of_year: localDayOfYear(now, tz),
      month_name: localMonthName(now, tz),
    },
    meta: { source: 'derived', items: 1 },
  }
}
