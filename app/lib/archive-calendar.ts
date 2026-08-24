/**
 * Calendar arithmetic and cell decisions — #157.
 *
 * Kept out of the component because these are the parts with real answers:
 * which month opens, what a cell links to, and whether its ink is black or
 * white. The last one is not a matter of taste and was wrong in the prototype.
 */

import type { ArchiveIndexEntry } from '../types/archive-record'

export type CellState = 'built' | 'record' | 'empty'

export interface Cell {
  date: string
  day: number
  state: CellState
  entry: ArchiveIndexEntry | null
}

export const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const

/**
 * Stable keys for the weekday header.
 *
 * The initials repeat — two S and two T — so the letters cannot key a list.
 */
export const WEEKDAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const

/** `2026-06` for a date or a month key. */
export const monthOf = (date: string) => date.slice(0, 7)

export function daysInMonth(ym: string): number {
  const [y, m] = ym.split('-').map(Number)
  return new Date(y, m, 0).getDate()
}

/** Weekday the 1st falls on, 0 = Sunday, used to pad the grid. */
export function firstWeekday(ym: string): number {
  const [y, m] = ym.split('-').map(Number)
  return new Date(y, m - 1, 1).getDay()
}

export function monthLabel(ym: string): string {
  const [y, m] = ym.split('-').map(Number)
  return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/** Every month between the first and last build, including ones with no builds. */
export function monthsSpanned(entries: ArchiveIndexEntry[]): string[] {
  if (entries.length === 0) return []
  const sorted = [...entries].map((e) => e.date).sort()
  const [startY, startM] = monthOf(sorted[0]).split('-').map(Number)
  const [endY, endM] = monthOf(sorted[sorted.length - 1])
    .split('-')
    .map(Number)

  const out: string[] = []
  for (let y = startY, m = startM; y < endY || (y === endY && m <= endM); ) {
    out.push(`${y}-${String(m).padStart(2, '0')}`)
    m += 1
    if (m > 12) {
      m = 1
      y += 1
    }
  }
  return out
}

/**
 * The month with the highest proportion of days built.
 *
 * The calendar opens here rather than on the newest month, which is usually a
 * few days in and reads as an empty grid — today's month is 1 of 31.
 */
export function densestMonth(entries: ArchiveIndexEntry[]): string | null {
  if (entries.length === 0) return null
  const counts = new Map<string, number>()
  for (const e of entries) counts.set(monthOf(e.date), (counts.get(monthOf(e.date)) ?? 0) + 1)

  let best: string | null = null
  let bestRatio = -1
  for (const [ym, n] of [...counts].sort(([a], [b]) => a.localeCompare(b))) {
    const ratio = n / daysInMonth(ym)
    if (ratio > bestRatio) {
      bestRatio = ratio
      best = ym
    }
  }
  return best
}

/**
 * Where a cell goes.
 *
 * A day with preserved pages opens the design it shipped. A day with a record
 * and no capture has no design to open, so it goes to the explainer — which is
 * the whole reason `pages` is carried in the index.
 */
export function hrefFor(entry: ArchiveIndexEntry): string {
  return entry.pages > 0 ? `/archive/${entry.date}/` : `/how/${entry.date}`
}

export function stateFor(entry: ArchiveIndexEntry | undefined): CellState {
  if (!entry) return 'empty'
  return entry.pages > 0 ? 'built' : 'record'
}

/** `hsl(...)` for a day's hue, or a neutral for the 31 dates with no colour recorded. */
export function swatchFor(entry: ArchiveIndexEntry): string {
  if (!entry.primaryHue) return '#3a3a42'
  const { h, s, l } = entry.primaryHue
  return `hsl(${h} ${s}% ${l}%)`
}

/**
 * Black or white ink over a day's hue, by relative luminance.
 *
 * Lightness is the wrong measure and the prototype used it: `l > 55` puts white
 * on saturated yellow-greens, where it is unreadable. This converts HSL to sRGB,
 * linearises, and weights by WCAG coefficients, which gets 2026-06-08 and
 * 2026-06-24 right.
 */
export function inkFor(entry: ArchiveIndexEntry | null): string {
  const LIGHT = '#f2f2f4'
  const DARK = '#0e0e10'
  if (!entry?.primaryHue) return LIGHT

  const { h, s, l } = entry.primaryHue
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100)
  const channel = (n: number) => {
    const k = (n + h / 30) % 12
    return l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
  }
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const L = 0.2126 * linear(channel(0)) + 0.7152 * linear(channel(8)) + 0.0722 * linear(channel(4))
  return L > 0.35 ? DARK : LIGHT
}

/** One month's grid: leading blanks, then every day of the month. */
export function cellsFor(ym: string, entries: ArchiveIndexEntry[]): (Cell | null)[] {
  const byDate = new Map(entries.map((e) => [e.date, e]))
  const pad = firstWeekday(ym)
  const total = daysInMonth(ym)

  const cells: (Cell | null)[] = Array.from({ length: pad }, () => null)
  for (let day = 1; day <= total; day += 1) {
    const date = `${ym}-${String(day).padStart(2, '0')}`
    const entry = byDate.get(date)
    cells.push({ date, day, state: stateFor(entry), entry: entry ?? null })
  }
  return cells
}

/** What a cell says under its number: the day's mood, else its archetype. */
export function cellLabel(entry: ArchiveIndexEntry): string | null {
  return entry.moodWord ?? entry.legacyArchetype ?? null
}
