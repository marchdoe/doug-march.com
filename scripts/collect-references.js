#!/usr/bin/env node

/**
 * Reference Collector — selects curated references + trending design signals
 * for the Design Director based on brief text keyword matching.
 *
 * Usage:
 *   node scripts/collect-references.js                  # reads today.brief.md, writes today.references.md
 *   node scripts/collect-references.js --brief <path>   # custom brief path
 *
 * Exports collectReferences(briefText) for programmatic use.
 */

import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const REFERENCES_PATH = path.join(ROOT, 'references/index.yml')
const SIGNALS_PATH = path.join(ROOT, 'signals/today.yml')
const BRIEF_PATH = path.join(ROOT, 'signals/today.brief.md')
const OUTPUT_PATH = path.join(ROOT, 'signals/today.references.md')

// --- Scoring ---

const SCORE_WEIGHTS = {
  composition: 3,
  mood: 2,
  density: 1,
}

function scoreReference(ref, briefLower) {
  let score = 0
  const tags = ref.tags ?? {}
  for (const [dimension, weight] of Object.entries(SCORE_WEIGHTS)) {
    const value = tags[dimension]
    if (value && briefLower.includes(value.toLowerCase())) {
      score += weight
    }
  }
  return score
}

function selectCuratedReferences(references, briefText) {
  const briefLower = briefText.toLowerCase()
  const scored = references
    .map((ref) => ({ ...ref, score: scoreReference(ref, briefLower) }))
    .filter((ref) => ref.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
  return scored
}

// --- Formatting ---

function formatCuratedSection(refs) {
  if (!refs.length) return ''
  const lines = ['## Curated References', '']
  for (const ref of refs) {
    const tags = ref.tags ?? {}
    const tagStr = [tags.composition, tags.mood, tags.density].filter(Boolean).join(' / ')
    lines.push(`### ${ref.description ?? ref.file}`)
    if (ref.url) lines.push(`- **Source**: ${ref.url}`)
    if (ref.file) lines.push(`- **File**: \`references/${ref.file}\``)
    lines.push(`- **Tags**: ${tagStr}`)
    lines.push(`- **Match score**: ${ref.score}`)
    lines.push('')
  }
  return lines.join('\n')
}

function formatTrendingSection(signals) {
  const sections = []

  const dribbble = signals?.dribbble?.trending
  if (Array.isArray(dribbble) && dribbble.length > 0) {
    const lines = ['## Dribbble Trending', '']
    for (const shot of dribbble) {
      const title = shot.title ?? 'Untitled'
      const url = shot.url ?? ''
      const author = shot.author ?? shot.designer ?? ''
      lines.push(`- **${title}**${author ? ` by ${author}` : ''}${url ? ` — ${url}` : ''}`)
    }
    lines.push('')
    sections.push(lines.join('\n'))
  }

  const awwwards = signals?.awwwards?.sites_of_the_day
  if (Array.isArray(awwwards) && awwwards.length > 0) {
    const lines = ['## Awwwards Sites of the Day', '']
    for (const site of awwwards) {
      const title = site.title ?? site.name ?? 'Untitled'
      const url = site.url ?? ''
      const desc = site.description ?? ''
      lines.push(`- **${title}**${url ? ` — ${url}` : ''}`)
      if (desc) lines.push(`  ${desc}`)
    }
    lines.push('')
    sections.push(lines.join('\n'))
  }

  return sections.join('\n')
}

// --- Main ---

export async function collectReferences(briefText) {
  const parts = []
  let hasCurated = false
  let hasTrending = false

  // Layer 1: Curated Library
  if (existsSync(REFERENCES_PATH)) {
    try {
      const raw = await readFile(REFERENCES_PATH, 'utf8')
      const doc = yaml.load(raw)
      const refs = doc?.references
      if (Array.isArray(refs) && refs.length > 0) {
        const selected = selectCuratedReferences(refs, briefText)
        if (selected.length > 0) {
          parts.push(formatCuratedSection(selected))
          hasCurated = true
        }
      }
    } catch (err) {
      console.warn(`  [curated] skipped: ${err.message}`)
    }
  }

  // Layer 2: Trending Design Signals
  if (existsSync(SIGNALS_PATH)) {
    try {
      const raw = await readFile(SIGNALS_PATH, 'utf8')
      const signals = yaml.load(raw)
      const trending = formatTrendingSection(signals)
      if (trending) {
        parts.push(trending)
        hasTrending = true
      }
    } catch (err) {
      console.warn(`  [trending] skipped: ${err.message}`)
    }
  }

  if (parts.length === 0) return null

  const date = new Date().toISOString().slice(0, 10)
  const header = `# Design References — ${date}\n\n`
  const summary = `> Sources: ${[hasCurated && 'curated library', hasTrending && 'trending signals'].filter(Boolean).join(', ')}\n\n`

  return header + summary + parts.join('\n')
}

// --- CLI ---

if (process.argv[1] && process.argv[1].endsWith('collect-references.js')) {
  const briefFlag = process.argv.indexOf('--brief')
  const briefPath = briefFlag !== -1 ? process.argv[briefFlag + 1] : BRIEF_PATH

  if (!existsSync(briefPath)) {
    console.error(`Brief not found: ${briefPath}`)
    process.exit(1)
  }

  console.log('Collecting design references...')
  const briefText = await readFile(briefPath, 'utf8')
  const output = await collectReferences(briefText)

  if (!output) {
    console.log('No references found. Skipping output.')
    process.exit(0)
  }

  await writeFile(OUTPUT_PATH, output, 'utf8')
  console.log(`Written: signals/today.references.md`)
}
