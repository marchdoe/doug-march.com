// app/server/archive-detail-impl.ts
// Pure implementation — no server function wrappers, safe to import in tests
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ARCHIVE_PATH, _readArchiveRecord } from './archive-impl'
import type { ArchiveRecord } from '../types/archive-record'

/**
 * A day's record plus the one thing the record deliberately drops: the raw
 * trace. The dev panel's step inspector replays it, and #153 keeps it out of the
 * record because storing 12KB of agent conversation per date was most of the
 * old `_detail.json`'s weight.
 */
export interface ArchiveDetail extends ArchiveRecord {
  trace: string
  hasScreenshot: boolean
}

export function _readArchiveDetail(date: string, archivePath = ARCHIVE_PATH): ArchiveDetail | null {
  const record = _readArchiveRecord(date, archivePath)
  if (!record) return null

  const dateDir = join(archivePath, date)
  const buildDir = record.buildId ? join(dateDir, `build-${record.buildId}`) : dateDir

  const tracePath = join(buildDir, 'trace.json')
  const trace = existsSync(tracePath) ? readFileSync(tracePath, 'utf8') : ''

  const hasScreenshot = existsSync(join(buildDir, 'screenshot.png'))

  return { ...record, trace, hasScreenshot }
}
