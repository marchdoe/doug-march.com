export const name = 'season'
export const timeout = 1000

export async function collect(_profile) {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-12
  const day = now.getDate()
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)

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
      day_of_year: dayOfYear,
      month_name: now.toLocaleString('en-US', { month: 'long' }),
    },
    meta: { source: 'derived', items: 1 },
  }
}
