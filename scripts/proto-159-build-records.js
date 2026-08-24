#!/usr/bin/env node
/**
 * PROTOTYPE — issue #159. Throwaway, but a real first pass at #153's backfill.
 *
 * Builds record.json per #153's schema for every archived date and writes them
 * to public/_proto-record/ so the explainer prototype can read them.
 *
 * Doubles as a test of whether #153's decisions survive all 123 dates.
 * Run: node scripts/proto-159-build-records.js
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const ARCH = 'archive'
const OUT = 'public/_proto-record'

/** #153: era comes from this table, not from observing which files are present. */
const ERAS = [
  { id: 'grammar', from: '2026-08-23' },
  { id: 'shell-directed', from: '2026-07-12' },
  { id: 'color-directed', from: '2026-04-18' },
  { id: 'traced', from: '2026-03-29' },
  { id: 'logged', from: '2026-03-20' },
  { id: 'prose', from: '2026-03-12' },
]
const eraFor = (d) => ERAS.find((e) => d >= e.from)?.id ?? 'prose'

/** What each era is expected to carry, so a missing-but-expected file is an anomaly. */
const EXPECTED = {
  prose: ['brief.md'],
  logged: ['brief.md', 'build.json'],
  traced: ['brief.md', 'build.json', 'trace.json', 'signals-brief.md', 'preset.ts'],
  'color-directed': ['brief.md', 'build.json', 'trace.json', 'signals-brief.md', 'preset.ts', 'color-scheme.json'],
  'shell-directed': ['brief.md', 'build.json', 'trace.json', 'signals-brief.md', 'preset.ts', 'color-scheme.json', 'shell.json'],
  grammar: ['brief.md', 'build.json', 'trace.json', 'signals-brief.md', 'preset.ts', 'color-scheme.json', 'shell.json', 'composition.json', 'lane.json'],
}

const readJSON = (p) => {
  try {
    return JSON.parse(readFileSync(p, 'utf8'))
  } catch {
    return null
  }
}
const readText = (p) => {
  try {
    return readFileSync(p, 'utf8')
  } catch {
    return null
  }
}

/** #153: parse signals-brief.md by heading, handling both format eras. */
function parseAdBrief(md) {
  if (!md) return null
  const out = {}
  const re = /^##\s+(.+?)\s*$/gm
  const marks = [...md.matchAll(re)]
  for (let i = 0; i < marks.length; i++) {
    const key = marks[i][1]
      .replace(/\s*\(.*?\)\s*$/, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase())
    const start = marks[i].index + marks[i][0].length
    const end = i + 1 < marks.length ? marks[i + 1].index : md.length
    const body = md.slice(start, end).trim()
    if (body) out[key] = body
  }
  return Object.keys(out).length ? out : null
}

/** #153: parse preset.ts into a token record. Colour ramps + semantic aliases. */
function parsePreset(ts) {
  if (!ts) return null
  const tokens = { colors: { ramps: {}, semantic: {} } }

  const tokIdx = ts.indexOf('tokens: {')
  const semIdx = ts.indexOf('semanticTokens')
  const rampSeg = tokIdx >= 0 ? ts.slice(tokIdx, semIdx > tokIdx ? semIdx : undefined) : ''

  // family: { 50: { value: '#RRGGBB' }, ... }
  const famRe = /['"]?([\w-]+)['"]?:\s*\{((?:[^{}]|\{[^{}]*\})*?)\}/g
  let m
  while ((m = famRe.exec(rampSeg))) {
    const fam = m[1]
    if (['colors', 'tokens', 'value', 'spacing', 'radii', 'fontWeights', 'lineHeights', 'letterSpacings'].includes(fam)) continue
    const stops = {}
    // Stop keys appear both bare (50:) and quoted ('50':) across eras.
    const stopRe = /['"]?([\w.-]+)['"]?:\s*\{\s*value:\s*'([^']+)'/g
    let s
    while ((s = stopRe.exec(m[2]))) stops[s[1]] = s[2]
    if (Object.keys(stops).length >= 2) tokens.colors.ramps[fam] = stops
  }

  if (semIdx >= 0) {
    const semSeg = ts.slice(semIdx)
    const aliasRe = /(\w+):\s*\{\s*value:\s*(?:\{([^}]*)\}|'([^']+)')/g
    let a
    while ((a = aliasRe.exec(semSeg))) {
      const name = a[1]
      if (name === 'colors' || name === 'semanticTokens') continue
      if (a[3]) tokens.colors.semantic[name] = { base: a[3] }
      else {
        const pairs = {}
        for (const [, k, v] of a[2].matchAll(/(\w+):\s*'([^']+)'/g)) pairs[k] = v
        if (Object.keys(pairs).length) tokens.colors.semantic[name] = pairs
      }
    }
  }

  for (const scale of ['spacing', 'radii', 'fontWeights', 'lineHeights', 'letterSpacings']) {
    const i = ts.indexOf(`${scale}: {`)
    if (i < 0) continue
    const seg = ts.slice(i, i + 1400)
    const vals = {}
    for (const [, k, v] of seg.matchAll(/(['"]?[\w.-]+['"]?):\s*\{\s*value:\s*'([^']+)'/g)) {
      vals[k.replace(/['"]/g, '')] = v
    }
    if (Object.keys(vals).length) tokens[scale] = vals
  }

  return Object.keys(tokens.colors.ramps).length || Object.keys(tokens.colors.semantic).length ? tokens : null
}

function briefFields(md) {
  if (!md) return {}
  const lines = md.split('\n')
  const brief = lines.find((l) => l.startsWith('**Design Brief:** '))
  const rStart = lines.findIndex((l) => l.startsWith("## Claude's Rationale"))
  const fStart = lines.findIndex((l) => l.startsWith('## Files Changed'))
  const rationale =
    rStart !== -1 ? lines.slice(rStart + 1, fStart !== -1 ? fStart : undefined).join('\n').trim() : ''
  const filesChanged = []
  if (fStart !== -1) {
    for (const l of lines.slice(fStart + 1)) {
      const t = l.trim()
      if (t.startsWith('- ')) filesChanged.push(t.slice(2).trim())
    }
  }
  return {
    brief: brief ? brief.slice('**Design Brief:** '.length).trim() : null,
    rationale: rationale || null,
    filesChanged,
  }
}

if (existsSync(OUT)) rmSync(OUT, { recursive: true })
mkdirSync(OUT, { recursive: true })

const dates = readdirSync(ARCH)
  .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
  .sort()

const index = []
const anomalies = []

for (const date of dates) {
  const dir = join(ARCH, date)
  const builds = readdirSync(dir)
    .filter((b) => b.startsWith('build-'))
    .sort()
  const latest = builds[builds.length - 1]
  const bdir = latest ? join(dir, latest) : dir
  const pick = (f) => (existsSync(join(bdir, f)) ? join(bdir, f) : join(dir, f))

  const era = eraFor(date)
  const trace = readJSON(pick('trace.json'))
  const signalsStep = trace?.steps?.find((s) => s.name === 'signals-loaded')
  const adBrief = parseAdBrief(readText(pick('signals-brief.md')))
  const archetypeRaw = readText(join(dir, 'archetype.txt'))?.trim() || null

  const record = {
    date,
    era,
    generatedAt: null, // stamped by the caller; scripts here stay deterministic
    buildId: latest ? latest.replace('build-', '') : null,
    attempts: builds.length || 1,
    ...briefFields(readText(pick('brief.md')) ?? readText(join(dir, 'brief.md'))),
    // #153: the 8-name vocabulary only; today's free prose is dropped, not kept as a 9th
    legacyArchetype: archetypeRaw && archetypeRaw.length < 24 ? archetypeRaw : null,
    signals: signalsStep?.output ?? null,
    hero: adBrief
      ? {
          copy: adBrief.heroCopy ?? null,
          rationale: adBrief.heroRationale ?? null,
          source: readJSON(pick('hero-source.json'))?.source ?? null,
        }
      : null,
    chassis: adBrief?.chassis ?? null,
    adBrief,
    tokens: parsePreset(readText(pick('preset.ts'))),
    colorScheme: readJSON(pick('color-scheme.json')),
    shell: readJSON(pick('shell.json')),
    verdicts: readJSON(pick('verdicts.json')),
    composition: readJSON(pick('composition.json')),
    lane: readJSON(pick('lane.json')),
    cost: readJSON(pick('cost.json')),
  }

  // #153: flag any date whose artifacts disagree with its era.
  const missing = EXPECTED[era].filter((f) => !existsSync(pick(f)) && !existsSync(join(dir, f)))
  if (missing.length) anomalies.push({ date, era, missing })

  writeFileSync(join(OUT, `${date}.json`), JSON.stringify(record), 'utf8')
  index.push({
    date,
    era,
    brief: record.brief,
    hue: record.colorScheme?.primary_hue ?? null,
    filled: [
      record.signals && 'signals',
      record.tokens && 'tokens',
      record.colorScheme && 'colour',
      record.shell && 'shell',
      record.composition && 'composition',
      record.lane && 'lane',
      record.adBrief && 'brief',
      record.cost && 'cost',
    ].filter(Boolean),
  })
}

writeFileSync(join(OUT, 'index.json'), JSON.stringify(index), 'utf8')

const byEra = {}
for (const r of index) byEra[r.era] = (byEra[r.era] ?? 0) + 1
console.log(`wrote ${index.length} records to ${OUT}`)
console.log('by era:', byEra)
const cov = {}
for (const r of index) for (const f of r.filled) cov[f] = (cov[f] ?? 0) + 1
console.log('field coverage:', cov)
console.log(`anomalies (artifacts disagree with era): ${anomalies.length}`)
for (const a of anomalies) console.log(`  ${a.date} [${a.era}] missing ${a.missing.join(', ')}`)
