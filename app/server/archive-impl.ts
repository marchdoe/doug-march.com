// app/server/archive-impl.ts
// Pure implementation — no server function wrappers, safe to import in tests
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import type { ArchiveRecord } from '../types/archive-record'

export const ARCHIVE_PATH = resolve(process.cwd(), 'archive')

export type ArchiveEntry = ArchiveRecord

/**
 * Read one day's record. The pipeline writes it at build time and
 * `scripts/backfill-archive-records.js` rebuilds history, so a date without one
 * is a date whose artifacts never produced a record — it is skipped rather than
 * re-derived here. Nothing in the app parses `brief.md` prose any more.
 */
export function _readArchiveRecord(date: string, archivePath = ARCHIVE_PATH): ArchiveRecord | null {
  const path = join(archivePath, date, 'record.json')
  if (!existsSync(path)) return null
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as ArchiveRecord
  } catch {
    return null
  }
}

export function _readArchiveHandler(archivePath = ARCHIVE_PATH): ArchiveEntry[] {
  if (!existsSync(archivePath)) return []

  return readdirSync(archivePath, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
    .map((d) => _readArchiveRecord(d.name, archivePath))
    .filter((r): r is ArchiveRecord => r !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export interface ResponsiveChecks {
  horizontalScroll?: boolean
  clippedElements?: Array<{ tag: string; text: string; right: number }>
  headerOverlap?: Array<{ a: string; b: string }>
  bodyTextSize?: { min: number | null; passing: boolean }
  tapTargetFailures?: Array<{ tag: string; text: string; w: number; h: number }>
  lineLengthFailures?: Array<{ chars: number; lines: number; avgPerLine: number; excerpt: string }>
}

export interface ResponsiveMetrics {
  buildId: string
  date: string
  archetype: string | null
  overallScore: number
  worstFailure: { viewport: string; check: string; detail: string } | null
  viewports: Record<
    string,
    {
      width: number
      height: number
      score: number
      checks: ResponsiveChecks
    }
  >
  usedInPromptFor?: string[]
}

/**
 * Read responsive-metrics.json for a given build. Returns null if missing or unparseable.
 */
export function _readResponsiveMetrics(
  date: string,
  buildId: string,
  archivePath = ARCHIVE_PATH
): ResponsiveMetrics | null {
  const p = join(archivePath, date, `build-${buildId}`, 'responsive-metrics.json')
  if (!existsSync(p)) return null
  try {
    return JSON.parse(readFileSync(p, 'utf8')) as ResponsiveMetrics
  } catch {
    return null
  }
}

/**
 * Read recent responsive-metrics.json files across archive dirs.
 * Returned newest-first (by date desc, then buildId desc), limited to `limit`.
 */
export function _readResponsiveHistory(
  limit = 30,
  archivePath = ARCHIVE_PATH
): ResponsiveMetrics[] {
  if (!existsSync(archivePath)) return []

  const dates = readdirSync(archivePath)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort()
    .reverse()

  const out: ResponsiveMetrics[] = []
  for (const date of dates) {
    const dateDir = join(archivePath, date)
    let builds: string[]
    try {
      builds = readdirSync(dateDir).filter((b) => b.startsWith('build-'))
    } catch {
      continue
    }
    builds.sort().reverse()
    for (const b of builds) {
      const p = join(dateDir, b, 'responsive-metrics.json')
      if (!existsSync(p)) continue
      try {
        out.push(JSON.parse(readFileSync(p, 'utf8')) as ResponsiveMetrics)
      } catch {
        /* skip invalid */
      }
      if (out.length >= limit) return out
    }
  }
  return out
}
