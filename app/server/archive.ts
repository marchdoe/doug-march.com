// app/server/archive.ts
'use server'
import { createServerFn } from '@tanstack/react-start'
import { _readArchiveHandler, _readResponsiveMetrics } from './archive-impl'
import { _readArchiveDetail } from './archive-detail-impl'
export type { ArchiveEntry } from './archive-impl'
export type { ArchiveDetail } from './archive-detail-impl'
export type { ResponsiveMetrics } from './archive-impl'

export const readArchive = createServerFn({ method: 'GET' })
  .handler(() => _readArchiveHandler())

export const readArchiveDetail = createServerFn({ method: 'GET' })
  .inputValidator((d: unknown) => {
    const s = String(d)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) throw new Error('Invalid date format')
    return s
  })
  .handler(async ({ data: date }) => {
    return _readArchiveDetail(date)
  })

export const readResponsiveMetrics = createServerFn({ method: 'GET' })
  .inputValidator((d: unknown) => {
    const obj = d as { date?: unknown; buildId?: unknown }
    const date = String(obj?.date ?? '')
    const buildId = String(obj?.buildId ?? '')
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid date format')
    if (!/^\d+$/.test(buildId)) throw new Error('Invalid buildId format')
    return { date, buildId }
  })
  .handler(async ({ data }) => {
    return _readResponsiveMetrics(data.date, data.buildId)
  })
