/**
 * One answer to "what time is it where the site lives".
 *
 * The signal layer had three different answers. `collect-signals.js` stamped
 * `signals.date` from `new Date().toISOString()` — UTC. `day-of-week`,
 * `season` and `holidays` used the runner's local getters, which is UTC in
 * GitHub Actions and Eastern on Doug's laptop. `sun.js` derived its own offset
 * from longitude with `Math.round(lng / 15)`, which has no concept of DST.
 *
 * None of it showed up in the nightly, because a 04:50 Eastern run is the same
 * calendar day in UTC. It shows up on a `workflow_dispatch` in the evening: at
 * 23:30 Eastern the record says `date: <tomorrow>` while `day` says today.
 *
 * Everything here takes an explicit `now` so the callers can be tested against
 * a pinned instant instead of the wall clock.
 */

/** Where the site is. Overridable per-profile; this is the fallback. */
export const DEFAULT_TZ = 'America/New_York'

/** Read the tz out of a profile, falling back to the site's own zone. */
export function tzOf(profile) {
  return profile?.location?.tz ?? DEFAULT_TZ
}

const PART_FORMATTER = new Map()

function formatterFor(tz) {
  let f = PART_FORMATTER.get(tz)
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'long',
    })
    PART_FORMATTER.set(tz, f)
  }
  return f
}

/**
 * Calendar parts of `date` as seen in `tz`.
 *
 * @param {Date} date
 * @param {string} tz IANA zone name
 * @returns {{year:number,month:number,day:number,hour:number,minute:number,second:number,weekday:string}}
 */
export function zonedParts(date, tz = DEFAULT_TZ) {
  const parts = {}
  for (const p of formatterFor(tz).formatToParts(date)) {
    if (p.type !== 'literal') parts[p.type] = p.value
  }
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    // en-US hour12:false renders midnight as 24; normalise it.
    hour: Number(parts.hour) % 24,
    minute: Number(parts.minute),
    second: Number(parts.second),
    weekday: parts.weekday,
  }
}

/** `YYYY-MM-DD` as it reads in `tz` on that instant. */
export function localDateString(date, tz = DEFAULT_TZ) {
  const { year, month, day } = zonedParts(date, tz)
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/**
 * The zone's real UTC offset in hours at that instant, DST included.
 *
 * This is the number `sun.js` was approximating with `Math.round(lng / 15)`:
 * for Ashburn that gives -5 all year, but America/New_York is -4 from March to
 * November, so every sunrise and sunset it reported between those months was
 * an hour early.
 *
 * @returns {number} e.g. -4 during EDT, -5 during EST
 */
export function tzOffsetHours(date, tz = DEFAULT_TZ) {
  const p = zonedParts(date, tz)
  const asIfUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second)
  // Drop sub-second precision on both sides so the difference is exact.
  return (asIfUTC - Math.floor(date.getTime() / 1000) * 1000) / 3600000
}

/** Day of the year (1-366) as it reads in `tz`. */
export function localDayOfYear(date, tz = DEFAULT_TZ) {
  const { year, month, day } = zonedParts(date, tz)
  const start = Date.UTC(year, 0, 0)
  return Math.floor((Date.UTC(year, month - 1, day) - start) / 86400000)
}

/** Long month name as it reads in `tz` (e.g. "August"). */
export function localMonthName(date, tz = DEFAULT_TZ) {
  return new Intl.DateTimeFormat('en-US', { timeZone: tz, month: 'long' }).format(date)
}
