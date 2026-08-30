import { tzOf, zonedParts } from '../utils/local-time.js'

export const name = 'day_of_week'
export const timeout = 1000

const DAY_INDEX = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
}

export async function collect(profile, { now = new Date() } = {}) {
  // Read the weekday in the site's timezone rather than the runner's. CI runs
  // in UTC, so an evening workflow_dispatch reported tomorrow's day next to
  // today's date.
  const { weekday } = zonedParts(now, tzOf(profile))
  const dayIndex = DAY_INDEX[weekday]

  return {
    data: { day: weekday, is_weekend: dayIndex === 0 || dayIndex === 6, day_index: dayIndex },
    meta: { source: 'derived', items: 1 },
  }
}
