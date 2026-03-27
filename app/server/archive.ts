// app/server/archive.ts
'use server'
import { createServerFn } from '@tanstack/react-start'
import { _readArchiveHandler } from './archive-impl'
import { _readArchiveDetail } from './archive-detail-impl'
export type { ArchiveEntry } from './archive-impl'
export type { ArchiveDetail } from './archive-detail-impl'

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
