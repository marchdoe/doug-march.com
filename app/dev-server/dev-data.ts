import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'
import * as yaml from 'js-yaml'
import { _readSignalsHandler } from '../server/signals-impl'
import type { Weights } from '../types/panel'
import { guardRequest, sendJson } from './guards'

// GET /api/dev-data — today's signals, the archive listing, and collection meta.

/**
 * One archived build as the panel lists it. Declared here, where it is
 * produced; dev-panel.tsx imports the type rather than redeclaring it (#216).
 */
export interface ArchiveEntry {
  date: string
  buildId: string
  timestamp: number
  brief: string
  weights?: Weights
  rationale?: string
  filesChanged?: string[]
}

/**
 * Pull the rationale and files-changed sections out of a build's brief.md
 * for the panel's expandable archive entries.
 */
export function parseBriefSections(md: string): { rationale: string; filesChanged: string[] } {
  const lines = md.split('\n')
  const rationaleStart = lines.findIndex((l) => l.startsWith("## Claude's Rationale"))
  const filesStart = lines.findIndex((l) => l.startsWith('## Files Changed'))
  let rationale = ''
  if (rationaleStart !== -1 && filesStart !== -1) {
    rationale = lines
      .slice(rationaleStart + 1, filesStart)
      .join('\n')
      .trim()
  }
  const filesChanged: string[] = []
  if (filesStart !== -1) {
    for (const l of lines.slice(filesStart + 1)) {
      const m = l.match(/^-\s+(.+)$/)
      if (m) filesChanged.push(m[1].trim())
    }
  }
  return { rationale, filesChanged }
}

/** Walk archive/ newest first, one entry per build (plus legacy date-only days). */
export function readArchiveListing(archiveDir: string): ArchiveEntry[] {
  const archive: ArchiveEntry[] = []
  if (!existsSync(archiveDir)) return archive

  const dateDirs = readdirSync(archiveDir)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort()
    .reverse()

  for (const dir of dateDirs) {
    const datePath = resolve(archiveDir, dir)
    const buildDirs = readdirSync(datePath)
      .filter((d) => /^build-\d+$/.test(d))
      .sort()
      .reverse()

    if (buildDirs.length === 0) {
      // Legacy date-only entry (no build subdirs)
      const briefPath = resolve(datePath, 'brief.md')
      if (existsSync(briefPath)) {
        const md = readFileSync(briefPath, 'utf8')
        const briefMatch = md.match(/\*\*Design Brief:\*\*\s*(.+)/)
        archive.push({ date: dir, buildId: '', timestamp: 0, brief: briefMatch?.[1] ?? '' })
      }
      continue
    }

    for (const buildDir of buildDirs) {
      const buildJsonPath = resolve(datePath, buildDir, 'build.json')
      const briefPath = resolve(datePath, buildDir, 'brief.md')
      if (existsSync(buildJsonPath)) {
        try {
          const meta = JSON.parse(readFileSync(buildJsonPath, 'utf8'))
          const sections = existsSync(briefPath)
            ? parseBriefSections(readFileSync(briefPath, 'utf8'))
            : { rationale: '', filesChanged: [] }
          archive.push({
            date: dir,
            buildId: meta.buildId,
            timestamp: meta.timestamp,
            brief: meta.brief,
            weights: meta.weights,
            ...sections,
          })
        } catch {
          /* a malformed build.json loses that build, not the listing */
        }
      } else if (existsSync(briefPath)) {
        // Legacy build dir without build.json
        const md = readFileSync(briefPath, 'utf8')
        const briefMatch = md.match(/\*\*Design Brief:\*\*\s*(.+)/)
        const buildId = buildDir.replace('build-', '')
        archive.push({
          date: dir,
          buildId,
          timestamp: Number.parseInt(buildId, 10),
          brief: briefMatch?.[1] ?? '',
        })
      }
    }
  }
  return archive
}

export function devDataHandler(req: IncomingMessage, res: ServerResponse): void {
  if (!guardRequest(req, res)) return
  try {
    const signalsPath = resolve('signals/today.yml')

    // Auto-collect signals if today.yml doesn't exist. spawnSync (no shell)
    // with a 15s timeout blocks the first request (~1s typically) but only
    // fires once — after that the file exists and this path is skipped.
    if (!existsSync(signalsPath)) {
      console.log('[dev-data] today.yml missing — auto-collecting signals...')
      const result = spawnSync('node', [resolve('scripts/collect-signals.js')], {
        cwd: resolve('.'),
        timeout: 15000,
        stdio: 'inherit',
      })
      if (result.status !== 0) {
        console.error('[dev-data] auto-collect failed (exit code %d)', result.status)
      }
    }

    const signals = existsSync(signalsPath) ? _readSignalsHandler(signalsPath) : null
    const archive = readArchiveListing(resolve('archive'))

    const metaPath = resolve('signals/today.meta.yml')
    const meta = existsSync(metaPath)
      ? (yaml.load(readFileSync(metaPath, 'utf8')) as Record<string, unknown>)
      : null

    sendJson(res, 200, { signals, archive, meta })
  } catch (err) {
    sendJson(res, 500, { error: String(err) })
  }
}
