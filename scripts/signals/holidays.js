export const name = 'holidays'
export const timeout = 1000

// Returns the Nth occurrence of a given weekday in a given month/year.
// weekday: 0=Sun, 1=Mon, ..., 6=Sat
// n: 1-based (1 = first, 2 = second, etc.)
function nthWeekdayOfMonth(year, month, weekday, n) {
  const d = new Date(year, month - 1, 1)
  let count = 0
  while (true) {
    if (d.getDay() === weekday) {
      count++
      if (count === n) return new Date(d)
    }
    d.setDate(d.getDate() + 1)
    if (d.getMonth() !== month - 1) return null // safety
  }
}

// Returns the last occurrence of a given weekday in a given month/year.
function lastWeekdayOfMonth(year, month, weekday) {
  const d = new Date(year, month, 0) // last day of month
  while (d.getDay() !== weekday) {
    d.setDate(d.getDate() - 1)
  }
  return new Date(d)
}

// Easter calculation using the Anonymous Gregorian algorithm.
function easterDate(year) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31) // 1-based
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

// Super Bowl is typically the first Sunday of February, but since 2004 it has
// been played on the first or second Sunday in February. We use 1st Sun Feb as
// a reasonable approximation.
function superBowlDate(year) {
  return nthWeekdayOfMonth(year, 2, 0, 1)
}

// MLB Opening Day is historically around the last Thursday of March or very
// early April. We approximate it as the last Thursday of March.
function openingDayDate(year) {
  return lastWeekdayOfMonth(year, 3, 4) // last Thursday of March
}

// Masters Tournament begins the second Thursday of April.
function mastersTournamentDate(year) {
  return nthWeekdayOfMonth(year, 4, 4, 2) // 2nd Thursday of April
}

// Build the full list of holidays for a given year.
function getHolidays(year) {
  return [
    { name: "New Year's Day", date: new Date(year, 0, 1) },
    { name: "Martin Luther King Jr. Day", date: nthWeekdayOfMonth(year, 1, 1, 3) },
    { name: "Super Bowl Sunday", date: superBowlDate(year) },
    { name: "Valentine's Day", date: new Date(year, 1, 14) },
    { name: "Presidents' Day", date: nthWeekdayOfMonth(year, 2, 1, 3) },
    { name: "St. Patrick's Day", date: new Date(year, 2, 17) },
    { name: "Opening Day (MLB)", date: openingDayDate(year) },
    { name: "Easter", date: easterDate(year) },
    { name: "Masters Tournament", date: mastersTournamentDate(year) },
    { name: "Mother's Day", date: nthWeekdayOfMonth(year, 5, 0, 2) },
    { name: "Memorial Day", date: lastWeekdayOfMonth(year, 5, 1) },
    { name: "Juneteenth", date: new Date(year, 5, 19) },
    { name: "Father's Day", date: nthWeekdayOfMonth(year, 6, 0, 3) },
    { name: "Independence Day", date: new Date(year, 6, 4) },
    { name: "Labor Day", date: nthWeekdayOfMonth(year, 9, 1, 1) },
    { name: "Columbus Day", date: nthWeekdayOfMonth(year, 10, 1, 2) },
    { name: "Halloween", date: new Date(year, 9, 31) },
    { name: "Veterans Day", date: new Date(year, 10, 11) },
    { name: "Thanksgiving", date: nthWeekdayOfMonth(year, 11, 4, 4) },
    { name: "Christmas", date: new Date(year, 11, 25) },
  ].filter(h => h.date !== null)
}

// Returns YYYY-MM-DD string in local time.
function toDateString(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export async function collect(_profile) {
  const now = new Date()
  const todayStr = toDateString(now)
  const year = now.getFullYear()

  // Gather holidays for this year and next to handle year-boundary lookups.
  const holidays = [...getHolidays(year), ...getHolidays(year + 1)]

  // today: holiday name if today matches, otherwise null
  let today = null
  for (const h of holidays) {
    if (toDateString(h.date) === todayStr) {
      today = h.name
      break
    }
  }

  // upcoming: holidays within the next 7 days (excluding today), sorted by date
  const msPerDay = 24 * 60 * 60 * 1000
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const upcoming = holidays
    .map(h => {
      const holidayMidnight = new Date(h.date.getFullYear(), h.date.getMonth(), h.date.getDate())
      const daysAway = Math.round((holidayMidnight - todayMidnight) / msPerDay)
      return { name: h.name, date: toDateString(h.date), days_away: daysAway }
    })
    .filter(h => h.days_away > 0 && h.days_away <= 7)
    .sort((a, b) => a.days_away - b.days_away)

  return {
    data: { today, upcoming },
    meta: { source: 'derived', items: upcoming.length + (today ? 1 : 0) },
  }
}
