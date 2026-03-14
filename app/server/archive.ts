// app/server/archive.ts
import { createServerFn } from '@tanstack/react-start'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { resolve, join } from 'path'

const ARCHIVE_PATH = resolve(process.cwd(), 'archive')

export interface ArchiveEntry {
  date: string
  brief: string
}

// Exported for unit testing — pure logic without the server function wrapper
export function _readArchiveHandler(archivePath = ARCHIVE_PATH): ArchiveEntry[] {
  if (!existsSync(archivePath)) return []

  return readdirSync(archivePath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const briefPath = join(archivePath, d.name, 'brief.md')
      if (!existsSync(briefPath)) return null
      const lines = readFileSync(briefPath, 'utf8').split('\n')
      const dateLine = lines.find(l => l.startsWith('# '))
      const briefLine = lines.find(l => l.startsWith('**Design Brief:** '))
      if (!dateLine || !briefLine) return null
      return {
        date: dateLine.slice(2).trim(),
        brief: briefLine.slice('**Design Brief:** '.length).trim(),
      }
    })
    .filter((e): e is ArchiveEntry => e !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10)
}

// Server function — never bundled to the client
export const readArchive = createServerFn({ method: 'GET' })
  .handler(() => _readArchiveHandler())
