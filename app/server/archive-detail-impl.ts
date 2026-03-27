// app/server/archive-detail-impl.ts
// Pure implementation — no server function wrappers, safe to import in tests
import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'
import { ARCHIVE_PATH } from './archive-impl'

export interface ArchiveDetail {
  date: string
  archetype: string
  brief: string
  signalsBrief: string
  preset: string
  rationale: string
  filesChanged: string[]
  hasScreenshot: boolean
  buildId: string
}

export function _readArchiveDetail(date: string, archivePath = ARCHIVE_PATH): ArchiveDetail | null {
  const dateDir = join(archivePath, date)
  if (!existsSync(dateDir)) return null

  const readSafe = (p: string) => existsSync(p) ? readFileSync(p, 'utf8') : ''

  // Find latest build directory
  const builds = readdirSync(dateDir, { withFileTypes: true })
    .filter(b => b.isDirectory() && b.name.startsWith('build-'))
    .map(b => b.name)
    .sort()
    .reverse()
  const latestBuild = builds[0]

  // Fall back to top-level date dir for older builds without build-* dirs
  const buildDir = latestBuild ? join(dateDir, latestBuild) : null
  const buildId = latestBuild?.replace('build-', '') ?? ''

  const briefContent = buildDir
    ? readSafe(join(buildDir, 'brief.md'))
    : readSafe(join(dateDir, 'brief.md'))

  const signalsBrief = buildDir ? readSafe(join(buildDir, 'signals-brief.md')) : ''
  const preset = buildDir ? readSafe(join(buildDir, 'preset.ts')) : ''
  const hasScreenshot = buildDir ? existsSync(join(buildDir, 'screenshot.png')) : false
  const archetype = readSafe(join(dateDir, 'archetype.txt')).trim()

  // Parse brief.md
  const lines = briefContent.split('\n')
  const briefLine = lines.find(l => l.startsWith('**Design Brief:** '))
  const brief = briefLine?.slice('**Design Brief:** '.length).trim() ?? ''

  let rationale = ''
  const rationaleStart = lines.findIndex(l => l.startsWith("## Claude's Rationale"))
  const filesChangedStart = lines.findIndex(l => l.startsWith('## Files Changed'))
  if (rationaleStart !== -1 && filesChangedStart !== -1) {
    rationale = lines.slice(rationaleStart + 1, filesChangedStart).join('\n').trim()
  } else if (rationaleStart !== -1) {
    rationale = lines.slice(rationaleStart + 1).join('\n').trim()
  }

  const filesChanged: string[] = []
  if (filesChangedStart !== -1) {
    for (let i = filesChangedStart + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('- ')) filesChanged.push(line.slice(2).trim())
    }
  }

  return {
    date, archetype, brief, signalsBrief, preset,
    rationale, filesChanged, hasScreenshot, buildId,
  }
}
