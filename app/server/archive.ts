// app/server/archive.ts
'use server'
import { createServerFn } from '@tanstack/react-start'
import { _readArchiveHandler } from './archive-impl'
export type { ArchiveEntry } from './archive-impl'

export const readArchive = createServerFn({ method: 'GET' })
  .handler(() => _readArchiveHandler())
