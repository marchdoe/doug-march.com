#!/usr/bin/env node
/**
 * Seed agent fixtures from a build the pipeline already shipped.
 *
 * The alternative is `RECORD_FIXTURES=true` on a live run, which costs a
 * night's worth of model calls before anyone can begin refactoring the thing
 * the fixtures exist to make refactorable. The archive already holds what
 * each agent produced — the preset, the mockup, the critics' verdicts, the
 * declaration blocks, and (via the commit for that date) the engineer's
 * files. This reassembles those artifacts into the delimited responses the
 * parsers expect.
 *
 * What comes out is faithful in shape and true in content, but it is a
 * reconstruction, not a recording: `visual_spec` survives in trace.json only
 * as a 200-character preview, and builds from before #254 have no header
 * declaration at all, so both are marked in the fixture itself. For
 * exercising the swarm's control flow that is enough. For asserting on exact
 * model prose, record a real run.
 *
 * Usage: node scripts/build-fixtures-from-archive.js 2026-08-30
 */
import { readFileSync, existsSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { ROOT } from './utils/file-manager.js'
import { FIXTURE_DIR } from './utils/agent-fixtures.js'

const RECONSTRUCTED = '<!-- reconstructed from the archive; see build-fixtures-from-archive.js -->'

function readJson(file) {
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null
}

/** The build that shipped for a date: newest that is neither failed nor pre. */
function shippedBuildDir(date) {
  const dateDir = path.join(ROOT, 'archive', date)
  if (!existsSync(dateDir)) throw new Error(`No archive for ${date}`)
  const builds = readdirSync(dateDir)
    .filter(
      (b) => b.startsWith('build-') && !b.startsWith('build-failed-') && !b.startsWith('build-pre-')
    )
    .sort()
  if (builds.length === 0) throw new Error(`No shipped build under archive/${date}`)
  return path.join(dateDir, builds[builds.length - 1])
}

/** `key: value` lines, the shape every declaration block uses. */
const kvBlock = (obj) =>
  Object.entries(obj)
    .filter(([, v]) => v !== null && v !== undefined)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

/**
 * Pull one `## Heading` section out of brief.md.
 *
 * The lookahead ends on the next heading or the true end of the document.
 * `$` cannot be used for that here: the `m` flag needed to anchor the heading
 * also makes `$` match the end of every line, which cut every section down to
 * its first line. `(?![\\s\\S])` is end-of-input regardless of the flag.
 */
function briefSection(brief, heading) {
  const re = new RegExp(`^## ${heading}\\s*\\n([\\s\\S]*?)(?=\\n## |(?![\\s\\S]))`, 'm')
  return (re.exec(brief)?.[1] ?? '').trim()
}

/** A file as it stood in the commit that shipped this date. */
function fileAtDate(relPath, date) {
  try {
    const sha = execFileSync(
      'git',
      ['log', '-1', '--format=%H', `--until=${date}T23:59:59`, '--', relPath],
      { cwd: ROOT, encoding: 'utf8' }
    ).trim()
    if (!sha) return null
    return execFileSync('git', ['show', `${sha}:${relPath}`], { cwd: ROOT, encoding: 'utf8' })
  } catch {
    return null
  }
}

function write(agent, index, body) {
  const dir = path.join(FIXTURE_DIR, agent)
  mkdirSync(dir, { recursive: true })
  const file = path.join(dir, `${String(index).padStart(2, '0')}.txt`)
  writeFileSync(file, body, 'utf8')
  console.log(`  ${path.relative(ROOT, file)}  (${(body.length / 1024).toFixed(1)}KB)`)
}

function artDirector(build, date) {
  const trace = readJson(path.join(build, 'trace.json'))
  const ad = trace?.steps?.find((s) => s.name === 'art-director')?.output ?? {}
  const brief = readFileSync(path.join(build, 'brief.md'), 'utf8')
  const shell = readJson(path.join(build, 'shell.json')) ?? {}
  const header = readJson(path.join(build, 'header.json'))
  const composition = readJson(path.join(build, 'composition.json')) ?? {}
  const scheme = readJson(path.join(build, 'color-scheme.json'))
  const heroSource = readJson(path.join(build, 'hero-source.json'))
  const preset = readFileSync(path.join(build, 'preset.ts'), 'utf8')
  const rationale = briefSection(brief, "Claude's Rationale")

  // Builds before #254 kept nav in shell.json and declared no header at all.
  // A header the grammar accepts has to be synthesized, and is marked as such
  // so nobody reads these numbers as something the Art Director chose.
  const headerBlock = header
    ? kvBlock(header)
    : [
        '# synthesized: this build predates the HEADER declaration (#254)',
        kvBlock({
          placement: composition.shell_posture === 'marginal' ? 'right-margin' : 'top-bar',
          height_px: 72,
          mark_px: 40,
          wordmark_step: 'sm',
          wordmark_weight: 600,
          role_line: 'absent',
          nav_step: 'sm',
          nav_case: 'lower',
          nav: shell.nav ?? 'three lowercase links in the top-right margin',
        }),
      ].join('\n')

  const blocks = [
    `===HERO_COPY===\n${ad.hero_copy ?? ''}`,
    `===HERO_RATIONALE===\n${rationale || 'Reconstructed from the archived brief.'}`,
    heroSource?.source ? `===HERO_SOURCE===\nsource: ${heroSource.source}` : null,
    ad.archetype ? `===ARCHETYPE===\n${ad.archetype}` : null,
    `===CHASSIS_ID===\n${ad.chassisId ?? ''}`,
    // trace.json keeps a 200-char preview, never the whole spec.
    `===VISUAL_SPEC===\n${RECONSTRUCTED}\n${ad.specPreview ?? '### Specification\nReconstructed.'}`,
    `===SELF_CHECK===\n${ad.selfCheck ?? '1. Reconstructed from the archive.'}`,
    // Never persisted as an artifact; these are the defaults the gate accepts.
    `===MEASURABLES===\n# synthesized: not persisted by this build\n${kvBlock({
      canvas_utilization_min: 85,
      hero_scale: 'clamp(64px, 8.5vw, 136px)',
      color_coverage_min: 40,
    })}`,
    `===SHELL===\n${kvBlock({
      footer: shell.footer,
      brand_lockup: shell.brand_lockup,
      brand_color_mode: shell.brand_color_mode,
      ground_strategy: shell.ground_strategy,
    })}`,
    `===HEADER===\n${headerBlock}`,
    `===COMPOSITION===\n${kvBlock(composition)}`,
    `===COMPOSITION_RATIONALE===\n${rationale.slice(0, 600) || 'Reconstructed from the archived brief.'}`,
    scheme ? `===COLOR_SCHEME===\n${JSON.stringify(scheme, null, 2)}` : null,
    `===FILE:elements/preset.ts===\n${preset}`,
  ].filter(Boolean)

  write('art-director', 0, blocks.join('\n\n'))
  return { date }
}

function critics(build) {
  const verdicts = readJson(path.join(build, 'verdicts.json')) ?? []
  const seen = new Map()
  for (const v of verdicts) {
    const index = seen.get(v.critic) ?? 0
    seen.set(v.critic, index + 1)
    write(v.critic, index, `===VERDICT===\n${v.verdict}\n\n${v.feedback ?? ''}\n===END===`)
  }
  if (!seen.has('screenshot-critic')) {
    // Not every run reaches the screenshot gate, but a replay that does needs
    // an answer rather than a missing-fixture error.
    write('screenshot-critic', 0, `===VERDICT===\nAPPROVE\n\n${RECONSTRUCTED}\n===END===`)
  }
}

function mockupDesigner(build) {
  const mockupPath = path.join(build, 'mockup.html')
  if (!existsSync(mockupPath)) {
    console.log('  (no mockup.html in this build — skipping mockup-designer)')
    return
  }
  write(
    'mockup-designer',
    0,
    [
      `===FILE:mockup.html===\n${readFileSync(mockupPath, 'utf8')}`,
      `===INTERIOR_NOTES===\nInterior pages follow the home page's field split: the ledger column carries metadata, the gold field carries the title.`,
      `===RATIONALE===\n${RECONSTRUCTED}`,
    ].join('\n\n')
  )
}

function reactEngineer(build, date) {
  const brief = readFileSync(path.join(build, 'brief.md'), 'utf8')
  const changed = briefSection(brief, 'Files Changed')
    .split('\n')
    .map((l) => l.replace(/^-\s*/, '').trim())
    .filter((f) => f && f !== 'elements/preset.ts')

  const blocks = []
  const missing = []
  for (const file of changed) {
    const content = fileAtDate(file, date)
    if (content) blocks.push(`===FILE:${file}===\n${content}`)
    else missing.push(file)
  }
  if (missing.length) console.log(`  (no commit content for: ${missing.join(', ')})`)
  if (blocks.length === 0) throw new Error(`Could not recover any engineer file for ${date}`)

  blocks.push(`===RATIONALE===\n${RECONSTRUCTED}`)
  write('react-engineer', 0, blocks.join('\n\n'))
}

const date = process.argv[2]
if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error('Usage: node scripts/build-fixtures-from-archive.js <YYYY-MM-DD>')
  process.exit(1)
}

const build = shippedBuildDir(date)
console.log(`Rebuilding fixtures from ${path.relative(ROOT, build)}\n`)
artDirector(build, date)
mockupDesigner(build)
critics(build)
reactEngineer(build, date)
console.log(`\nDone. Run the pipeline against them with MOCK_MODE=true.`)
