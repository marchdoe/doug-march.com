// app/server/archive-impl.ts
// Pure implementation — no server function wrappers, safe to import in tests
import { readdirSync, readFileSync, existsSync } from 'fs'
import { resolve, join } from 'path'

export const ARCHIVE_PATH = resolve(process.cwd(), 'archive')

export interface ArchiveEntry {
  date: string
  brief: string
  rationale: string
  filesChanged: string[]
  archetype: string
  buildId: string
}

export function _readArchiveHandler(archivePath = ARCHIVE_PATH): ArchiveEntry[] {
  if (!existsSync(archivePath)) return []

  return readdirSync(archivePath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const dateDir = join(archivePath, d.name)

      // Read archetype
      const archetypePath = join(dateDir, 'archetype.txt')
      const archetype = existsSync(archetypePath)
        ? readFileSync(archetypePath, 'utf8').trim()
        : ''

      // Find latest build directory
      const builds = readdirSync(dateDir, { withFileTypes: true })
        .filter(b => b.isDirectory() && b.name.startsWith('build-'))
        .map(b => b.name)
        .sort()
        .reverse()
      const latestBuild = builds[0]
      const buildId = latestBuild?.replace('build-', '') ?? ''

      // Read brief.md from build dir if available, else from date dir
      const briefPath = latestBuild
        ? join(dateDir, latestBuild, 'brief.md')
        : join(dateDir, 'brief.md')
      if (!existsSync(briefPath)) return null
      const content = readFileSync(briefPath, 'utf8')
      const lines = content.split('\n')
      const dateLine = lines.find(l => l.startsWith('# '))
      const briefLine = lines.find(l => l.startsWith('**Design Brief:** '))
      if (!dateLine || !briefLine) return null

      // Parse rationale: text between "## Claude's Rationale" and "## Files Changed"
      let rationale = ''
      const rationaleStart = lines.findIndex(l => l.startsWith("## Claude's Rationale"))
      const filesChangedStart = lines.findIndex(l => l.startsWith('## Files Changed'))
      if (rationaleStart !== -1 && filesChangedStart !== -1) {
        rationale = lines.slice(rationaleStart + 1, filesChangedStart)
          .join('\n').trim()
      } else if (rationaleStart !== -1) {
        rationale = lines.slice(rationaleStart + 1).join('\n').trim()
      }

      // Parse filesChanged: lines starting with "- " after "## Files Changed"
      const filesChanged: string[] = []
      if (filesChangedStart !== -1) {
        for (let i = filesChangedStart + 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (line.startsWith('- ')) {
            filesChanged.push(line.slice(2).trim())
          }
        }
      }

      return {
        date: dateLine.slice(2).trim(),
        brief: briefLine.slice('**Design Brief:** '.length).trim(),
        rationale,
        filesChanged,
        archetype,
        buildId,
      }
    })
    .filter((e): e is ArchiveEntry => e !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
}
