export const name = 'day_of_week'
export const timeout = 1000

export async function collect(_profile) {
  const now = new Date()
  const dayIndex = now.getDay() // 0=Sun, 6=Sat
  const day = now.toLocaleString('en-US', { weekday: 'long' })
  const isWeekend = dayIndex === 0 || dayIndex === 6

  return {
    data: { day, is_weekend: isWeekend, day_index: dayIndex },
    meta: { source: 'derived', items: 1 },
  }
}
