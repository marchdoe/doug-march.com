// app/server/archive.ts
'use server'
import { createServerFn } from '@tanstack/react-start'
import { devOnly } from './dev-only'
import { DATE_RE, BUILD_ID_RE } from './archive-paths'
import { _readArchiveHandler, _readResponsiveMetrics, _readResponsiveHistory } from './archive-impl'
import { _readArchiveDetail } from './archive-detail-impl'
export type { ArchiveEntry } from './archive-impl'
export type { TraceDetail } from './archive-detail-impl'
export type { ResponsiveMetrics } from './archive-impl'

// The validators are named exports so they can be tested. Inline in the
// createServerFn chain they were unreachable from a test, and they were the
// only thing standing between a caller-supplied string and a filesystem path
// — the impls themselves validated nothing. They now validate too, so this is
// the outer of two gates rather than the only one.

export function validateDateInput(d: unknown): string {
  const s = String(d)
  if (!DATE_RE.test(s)) throw new Error('Invalid date format')
  return s
}

export function validateMetricsInput(d: unknown): { date: string; buildId: string } {
  const obj = d as { date?: unknown; buildId?: unknown }
  const date = String(obj?.date ?? '')
  const buildId = String(obj?.buildId ?? '')
  if (!DATE_RE.test(date)) throw new Error('Invalid date format')
  if (!BUILD_ID_RE.test(buildId)) throw new Error('Invalid buildId format')
  return { date, buildId }
}

export function validateHistoryInput(d: unknown): { limit: number } {
  const obj = d as { limit?: unknown }
  const limit = typeof obj?.limit === 'number' ? obj.limit : 30
  if (!Number.isInteger(limit)) throw new Error('limit must be an integer')
  if (limit < 1 || limit > 200) throw new Error('limit must be 1..200')
  return { limit }
}

export const readArchive = createServerFn({ method: 'GET' }).handler(
  devOnly(() => _readArchiveHandler())
)

export const readArchiveDetail = createServerFn({ method: 'GET' })
  .inputValidator(validateDateInput)
  .handler(devOnly(async ({ data: date }: { data: string }) => _readArchiveDetail(date)))

export const readResponsiveMetrics = createServerFn({ method: 'GET' })
  .inputValidator(validateMetricsInput)
  .handler(
    devOnly(async ({ data }: { data: { date: string; buildId: string } }) =>
      _readResponsiveMetrics(data.date, data.buildId)
    )
  )

export const readResponsiveHistory = createServerFn({ method: 'GET' })
  .inputValidator(validateHistoryInput)
  .handler(
    devOnly(async ({ data }: { data: { limit: number } }) => _readResponsiveHistory(data.limit))
  )
