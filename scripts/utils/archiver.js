import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { ROOT } from './file-manager.js'
import { captureSnapshot } from './snapshot.js'

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
export async function archive(date, signals, rationale, designBrief, changedFiles) {
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
  console.log(`  archived to archive/${dateStr}/build-${buildId}/brief.md`)

  // Also save/overwrite the top-level brief.md as the "latest" for backwards compatibility
  // (the dev panel and Design Director read archive/{date}/brief.md)
  const latestBriefPath = path.join(dir, 'brief.md')
  await writeFile(latestBriefPath, content, 'utf8')

  // Capture static HTML snapshot into the build directory (non-blocking)
  try {
    await captureSnapshot(dateStr, buildId)
  } catch (err) {
    console.warn(`  snapshot failed (non-blocking): ${err.message}`)
  }
}
