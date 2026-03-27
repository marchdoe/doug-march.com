import { mkdir, writeFile, readFile, copyFile, readdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { ROOT } from './file-manager.js'
import { captureSnapshot } from './snapshot.js'

/**
 * Copy key archive artifacts to public/archive/ for static serving.
 * - Screenshot → public/archive/{date}.png
 * - Site HTML  → public/archive/{date}/index.html, about.html, work/*.html
 */
async function copyToPublic(dateStr, buildDir) {
  const publicBase = path.join(ROOT, 'public', 'archive')

  // Copy screenshot if it exists
  const screenshotSrc = path.join(buildDir, 'screenshot.png')
  if (existsSync(screenshotSrc)) {
    await mkdir(publicBase, { recursive: true })
    await copyFile(screenshotSrc, path.join(publicBase, `${dateStr}.png`))
    console.log(`  copied screenshot to public/archive/${dateStr}.png`)
  }

  // Copy site HTML if it exists
  const siteSrc = path.join(buildDir, 'site')
  if (existsSync(siteSrc)) {
    const publicSiteDir = path.join(publicBase, dateStr)
    await mkdir(path.join(publicSiteDir, 'work'), { recursive: true })
    const entries = await readdir(siteSrc, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.html')) {
        await copyFile(path.join(siteSrc, entry.name), path.join(publicSiteDir, entry.name))
      } else if (entry.isDirectory() && entry.name === 'work') {
        const workEntries = await readdir(path.join(siteSrc, 'work'))
        for (const w of workEntries) {
          if (w.endsWith('.html')) {
            await copyFile(path.join(siteSrc, 'work', w), path.join(publicSiteDir, 'work', w))
          }
        }
      }
    }
    console.log(`  copied site HTML to public/archive/${dateStr}/`)
  }
}

/**
 * Format a signals object as readable markdown sections.
 * @param {object} signals
 * @returns {string}
 */
function formatSignalsMarkdown(signals) {
  const lines = []

  if (signals.weather) {
    lines.push('### Weather')
    lines.push(`**Location:** ${signals.weather.location}`)
    lines.push(`**Conditions:** ${signals.weather.conditions}`)
    lines.push(`**Feel:** ${signals.weather.feel}`)
    lines.push('')
  }

  if (signals.sports && signals.sports.length > 0) {
    lines.push('### Sports')
    for (const s of signals.sports) {
      lines.push(`- **${s.team}:** ${s.result}${s.notes ? ` — ${s.notes}` : ''}`)
    }
    lines.push('')
  }

  if (signals.golf && signals.golf.length > 0) {
    lines.push('### Golf')
    for (const g of signals.golf) {
      lines.push(`- ${g}`)
    }
    lines.push('')
  }

  if (signals.github_trending && signals.github_trending.length > 0) {
    lines.push('### GitHub Trending')
    for (const repo of signals.github_trending) {
      lines.push(`- **${repo.repo}** — ${repo.description}`)
      if (repo.why_interesting) {
        lines.push(`  *${repo.why_interesting}*`)
      }
    }
    lines.push('')
  }

  if (signals.news && signals.news.length > 0) {
    lines.push('### News')
    for (const n of signals.news) {
      lines.push(`- ${n}`)
    }
    lines.push('')
  }

  if (signals.mood_override) {
    lines.push(`### Mood Override`)
    lines.push(`\`${signals.mood_override}\``)
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * Write an archive entry for the day's redesign.
 *
 * Creates `archive/YYYY-MM-DD/brief.md` with:
 * - Design brief (one-liner)
 * - Signals (formatted)
 * - Claude's rationale
 * - List of changed files
 *
 * @param {string} date - e.g. "2026-03-12"
 * @param {object} signals - parsed YAML signals
 * @param {string} rationale - Claude's rationale text
 * @param {string} designBrief - one-sentence design brief
 * @param {string[]} changedFiles - list of relative file paths that were written
 */
export async function archive(date, signals, rationale, designBrief, changedFiles, weights = {}) {
  const dateStr = date instanceof Date ? date.toISOString().slice(0, 10) : String(date)
  const buildId = String(Date.now())
  const dir = path.join(ROOT, 'archive', dateStr)
  const buildDir = path.join(dir, `build-${buildId}`)
  await mkdir(buildDir, { recursive: true })

  const content = [
    `# ${dateStr}`,
    '',
    `**Design Brief:** ${designBrief}`,
    '',
    '## Signals',
    '',
    formatSignalsMarkdown(signals),
    '## Claude\'s Rationale',
    '',
    rationale,
    '',
    '## Files Changed',
    '',
    changedFiles.map((f) => `- ${f}`).join('\n'),
    '',
  ].join('\n')

  // Save brief to the build-specific directory
  const briefPath = path.join(buildDir, 'brief.md')
  await writeFile(briefPath, content, 'utf8')

  // Save build metadata (weights, timestamp, brief) for the archive UI
  const buildMeta = {
    buildId,
    date: dateStr,
    timestamp: parseInt(buildId),
    brief: designBrief,
    weights: {
      signals: weights.signals ?? 5,
      inspiration: weights.inspiration ?? 5,
      ratings: weights.ratings ?? 5,
      risk: weights.risk ?? 5,
    },
  }
  await writeFile(path.join(buildDir, 'build.json'), JSON.stringify(buildMeta, null, 2), 'utf8')
  console.log(`  archived to archive/${dateStr}/build-${buildId}/`)

  // Save the interpreted signals brief if it exists
  const signalsBriefSrc = path.join(ROOT, 'signals', 'today.brief.md')
  if (existsSync(signalsBriefSrc)) {
    try {
      const signalsBrief = await readFile(signalsBriefSrc, 'utf8')
      await writeFile(path.join(buildDir, 'signals-brief.md'), signalsBrief, 'utf8')
    } catch { /* signals brief read failed — non-blocking */ }
  }

  // Save the design tokens preset
  const presetSrc = path.join(ROOT, 'elements', 'preset.ts')
  if (existsSync(presetSrc)) {
    try {
      const preset = await readFile(presetSrc, 'utf8')
      await writeFile(path.join(buildDir, 'preset.ts'), preset, 'utf8')
    } catch { /* preset read failed — non-blocking */ }
  }

  // Also save/overwrite the top-level brief.md as the "latest" for backwards compatibility
  // (the Design Director reads archive/{date}/brief.md)
  const latestBriefPath = path.join(dir, 'brief.md')
  await writeFile(latestBriefPath, content, 'utf8')

  // Capture static HTML snapshot into the build directory (non-blocking)
  try {
    await captureSnapshot(dateStr, buildId)
  } catch (err) {
    console.warn(`  snapshot failed (non-blocking): ${err.message}`)
  }

  // Capture a thumbnail screenshot into the build directory (best-effort)
  try {
    const { spawnSync } = await import('child_process')
    const net = await import('net')
    const portOpen = await new Promise(resolve => {
      const sock = new net.Socket()
      sock.setTimeout(2000)
      sock.once('connect', () => { sock.destroy(); resolve(true) })
      sock.once('error', () => resolve(false))
      sock.once('timeout', () => { sock.destroy(); resolve(false) })
      sock.connect(5173, '127.0.0.1')
    })
    if (portOpen) {
      const screenshotPath = path.join(buildDir, 'screenshot.png')
      const result = spawnSync('node', [
        path.join(ROOT, 'scripts', 'capture-reference.js'),
        '--port=5173',
        `--output=${screenshotPath}`,
      ], { timeout: 45000 })
      if (result.status === 0) {
        console.log(`  screenshot saved to build-${buildId}/screenshot.png`)
      } else {
        console.warn(`  screenshot capture failed (non-blocking)`)
      }
    } else {
      console.log(`  dev server not running, skipping screenshot`)
    }
  } catch (err) {
    console.warn(`  screenshot failed (non-blocking): ${err.message}`)
  }

  // Copy artifacts to public/ for static serving
  try {
    await copyToPublic(dateStr, buildDir)
  } catch (err) {
    console.warn(`  public copy failed (non-blocking): ${err.message}`)
  }
}
