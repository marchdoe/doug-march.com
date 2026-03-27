#!/usr/bin/env node
/**
 * One-time script to copy existing archive site HTML and screenshots
 * to public/archive/ for static serving.
 *
 * Usage: node scripts/backfill-public-archive.js
 */

import { readdirSync, existsSync, cpSync, mkdirSync } from 'fs'
import { join } from 'path'

const ROOT = process.cwd()
const archiveDir = join(ROOT, 'archive')
const publicArchive = join(ROOT, 'public', 'archive')

mkdirSync(publicArchive, { recursive: true })

const dates = readdirSync(archiveDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
  .map(d => d.name)
  .sort()

for (const date of dates) {
  const dateDir = join(archiveDir, date)

  // Find latest build directory
  const builds = readdirSync(dateDir, { withFileTypes: true })
    .filter(b => b.isDirectory() && b.name.startsWith('build-'))
    .map(b => b.name)
    .sort()
    .reverse()

  const buildDir = builds[0] ? join(dateDir, builds[0]) : null

  // Copy screenshot
  const screenshotSrc = buildDir && join(buildDir, 'screenshot.png')
  if (screenshotSrc && existsSync(screenshotSrc)) {
    cpSync(screenshotSrc, join(publicArchive, `${date}.png`))
    console.log(`  ${date}: screenshot ✓`)
  }

  // Copy site HTML — prefer build dir, fall back to date-level site/
  const siteSrc = buildDir && existsSync(join(buildDir, 'site'))
    ? join(buildDir, 'site')
    : existsSync(join(dateDir, 'site'))
      ? join(dateDir, 'site')
      : null

  if (siteSrc) {
    const dest = join(publicArchive, date)
    cpSync(siteSrc, dest, { recursive: true })
    console.log(`  ${date}: site HTML ✓`)
  } else {
    console.log(`  ${date}: no site HTML`)
  }
}

console.log(`\nDone. ${dates.length} dates processed.`)
