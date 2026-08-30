import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { extractAccentHex } from '../../scripts/utils/color-validation.js'

// extractAccentHex used to be a regex. It now goes through preset-parser.js,
// whose header explains why regexes silently dropped whole months of history.
// This test runs both over every archived preset and requires the parser to
// find at least everything the regex found, and to agree wherever both do.
// It is the evidence that the swap lost nothing — and it will catch a night
// whose preset the parser cannot read.

// Located the way archive-seal-corpus.test.js finds its corpus. Read-only:
// this test opens presets and writes nothing.
const ARCHIVE = path.resolve(import.meta.dirname, '../../archive')

const LEGACY_REGEX = /accent\s*:\s*\{[^}]*?DEFAULT\s*:\s*\{\s*value:\s*['"](#[0-9a-f]{3,6})['"]/i

function archivedPresets() {
  if (!existsSync(ARCHIVE)) return []
  const out = []
  for (const date of readdirSync(ARCHIVE)) {
    const dateDir = path.join(ARCHIVE, date)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !statSync(dateDir).isDirectory()) continue
    for (const build of readdirSync(dateDir)) {
      const preset = path.join(dateDir, build, 'preset.ts')
      if (build.startsWith('build-') && existsSync(preset)) out.push(preset)
    }
  }
  return out
}

describe('extractAccentHex over the archived corpus', () => {
  const presets = archivedPresets()

  it.skipIf(presets.length === 0)('reads at least every preset the old regex could', () => {
    let regexHits = 0
    let parserHits = 0
    const disagreements = []
    const regexOnly = []
    for (const file of presets) {
      const src = readFileSync(file, 'utf8')
      const viaRegex = src.match(LEGACY_REGEX)?.[1]?.toLowerCase() ?? null
      const viaParser = extractAccentHex(src)?.toLowerCase() ?? null
      if (viaRegex) regexHits++
      if (viaParser) parserHits++
      if (viaRegex && !viaParser) regexOnly.push(path.relative(ARCHIVE, file))
      if (viaRegex && viaParser && viaRegex !== viaParser) {
        disagreements.push(`${path.relative(ARCHIVE, file)}: regex ${viaRegex} parser ${viaParser}`)
      }
    }
    expect(regexOnly, 'presets the regex read and the parser did not').toEqual([])
    expect(disagreements).toEqual([])
    expect(parserHits).toBeGreaterThanOrEqual(regexHits)
  })
})
