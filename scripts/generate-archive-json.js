#!/usr/bin/env node

/**
 * Generate static JSON files for the archive feature.
 *
 * Produces:
 *   public/archive/index.json        — list of all archive entries
 *   public/archive/{date}/detail.json — per-date detail data
 *
 * Run as part of the build step so the SPA can fetch archive data
 * without server functions.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, join } from 'path'

const ROOT = resolve(import.meta.dirname, '..')
const ARCHIVE_PATH = resolve(ROOT, 'archive')
const PUBLIC_ARCHIVE = resolve(ROOT, 'public', 'archive')

function readSafe(p) {
  return existsSync(p) ? readFileSync(p, 'utf8') : ''
}

function generateIndex() {
  if (!existsSync(ARCHIVE_PATH)) return []

  return readdirSync(ARCHIVE_PATH, { withFileTypes: true })
    .filter(d => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
    .map(d => {
      const dateDir = join(ARCHIVE_PATH, d.name)

      const archetypePath = join(dateDir, 'archetype.txt')
      const archetype = existsSync(archetypePath)
        ? readFileSync(archetypePath, 'utf8').trim()
        : ''

      const builds = readdirSync(dateDir, { withFileTypes: true })
        .filter(b => b.isDirectory() && b.name.startsWith('build-'))
        .map(b => b.name)
        .sort()
        .reverse()
      const latestBuild = builds[0]
      const buildId = latestBuild?.replace('build-', '') ?? ''

      const briefPath = latestBuild
        ? join(dateDir, latestBuild, 'brief.md')
        : join(dateDir, 'brief.md')
      if (!existsSync(briefPath)) return null
      const content = readFileSync(briefPath, 'utf8')
      const lines = content.split('\n')
      const dateLine = lines.find(l => l.startsWith('# '))
      const briefLine = lines.find(l => l.startsWith('**Design Brief:** '))
      if (!dateLine || !briefLine) return null

      let rationale = ''
      const rationaleStart = lines.findIndex(l => l.startsWith("## Claude's Rationale"))
      const filesChangedStart = lines.findIndex(l => l.startsWith('## Files Changed'))
      if (rationaleStart !== -1 && filesChangedStart !== -1) {
        rationale = lines.slice(rationaleStart + 1, filesChangedStart).join('\n').trim()
      } else if (rationaleStart !== -1) {
        rationale = lines.slice(rationaleStart + 1).join('\n').trim()
      }

      const filesChanged = []
      if (filesChangedStart !== -1) {
        for (let i = filesChangedStart + 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (line.startsWith('- ')) filesChanged.push(line.slice(2).trim())
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
    .filter(e => e !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
}

function generateDetail(date) {
  const dateDir = join(ARCHIVE_PATH, date)
  if (!existsSync(dateDir)) return null

  const builds = readdirSync(dateDir, { withFileTypes: true })
    .filter(b => b.isDirectory() && b.name.startsWith('build-'))
    .map(b => b.name)
    .sort()
    .reverse()
  const latestBuild = builds[0]
  const buildDir = latestBuild ? join(dateDir, latestBuild) : null
  const buildId = latestBuild?.replace('build-', '') ?? ''

  const briefContent = buildDir
    ? readSafe(join(buildDir, 'brief.md'))
    : readSafe(join(dateDir, 'brief.md'))

  const signalsBrief = buildDir ? readSafe(join(buildDir, 'signals-brief.md')) : ''
  const preset = buildDir ? readSafe(join(buildDir, 'preset.ts')) : ''
  const trace = buildDir ? readSafe(join(buildDir, 'trace.json')) : ''
  const hasScreenshot = existsSync(join(PUBLIC_ARCHIVE, `${date}.png`))
  const archetype = readSafe(join(dateDir, 'archetype.txt')).trim()

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

  const filesChanged = []
  if (filesChangedStart !== -1) {
    for (let i = filesChangedStart + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('- ')) filesChanged.push(line.slice(2).trim())
    }
  }

  return {
    date, archetype, brief, signalsBrief, preset,
    rationale, filesChanged, hasScreenshot, buildId, trace,
  }
}

// Main
console.log('[generate-archive-json] Generating static archive data...')

const entries = generateIndex()
console.log(`  found ${entries.length} archive entries`)

// Write index.json
mkdirSync(PUBLIC_ARCHIVE, { recursive: true })
writeFileSync(
  join(PUBLIC_ARCHIVE, '_data.json'),
  JSON.stringify(entries),
  'utf8'
)
console.log('  wrote public/archive/_data.json')

// Write per-date detail.json
let detailCount = 0
for (const entry of entries) {
  const detail = generateDetail(entry.date)
  if (detail) {
    const dateDir = join(PUBLIC_ARCHIVE, entry.date)
    mkdirSync(dateDir, { recursive: true })
    writeFileSync(
      join(dateDir, '_detail.json'),
      JSON.stringify(detail),
      'utf8'
    )
    detailCount++
  }
}
console.log(`  wrote ${detailCount} detail.json files`)
console.log('[generate-archive-json] Done')
