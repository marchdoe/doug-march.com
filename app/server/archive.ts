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
  .validator((date: string) => date)
  .handler(async ({ data: date }) => {
    return _readArchiveDetail(date)
  })
