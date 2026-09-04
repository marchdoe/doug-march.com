#!/usr/bin/env node
/**
 * `pnpm taste` — record a reaction to a local canary run in
 * `signals/taste.md`'s "Local canary notes" section. #454.
 *
 * `scripts/canary.js` prints the exact invocation of this at the end of
 * every shipped, non-mock run, with `--evidence` already filled in — the
 * owner only ever has to type the sentence.
 *
 * Usage:
 *   pnpm taste --evidence docs/evidence/canary/2026-09-04-1532 "your reaction"
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { isMain } from './utils/cli.js'
import {
  compositionLabel,
  findEvidenceDate,
  findShippedBuildDir,
  readDesignIdentity,
} from './utils/design-identity.js'
import { ROOT } from './utils/file-manager.js'
import {
  appendTasteNote,
  renderTasteNoteEntry,
  SECTION_HEADING,
  TasteFileShapeError,
} from './utils/taste-note.js'
import { MAX_TASTE_MEMORY_BYTES } from './utils/taste-memory.js'

function usage() {
  return [
    'Usage: pnpm taste --evidence <docs/evidence/canary/DATE-HHMM> "<your reaction>"',
    '',
    'Appends a dated entry to signals/taste.md, "Local canary notes" section,',
    "carrying the run's hero phrase, chassis and composition alongside your",
    'sentence, verbatim. --evidence is a canary evidence dir (printed by',
    'pnpm pipeline:canary on a shipped run).',
  ].join('\n')
}

function parseArgs(argv) {
  let evidence = null
  let file = null
  const rest = []
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--evidence') {
      evidence = argv[++i]
    } else if (argv[i] === '--file') {
      file = argv[++i]
    } else {
      rest.push(argv[i])
    }
  }
  return { evidence, file, sentence: rest.join(' ').trim() }
}

/**
 * @param {string[]} argv `process.argv.slice(2)`
 * @param {{ root?: string, log?: (s: string) => void, error?: (s: string) => void }} [options]
 * @returns {number} process exit code
 */
export function main(argv, { root = ROOT, log = console.log, error = console.error } = {}) {
  const { evidence, file, sentence } = parseArgs(argv)
  if (!evidence || !sentence) {
    error(usage())
    return 2
  }

  const evidenceDir = path.resolve(root, evidence)
  const date = findEvidenceDate(evidenceDir)
  if (!date) {
    error(`[taste] no archive/<date> found under ${evidenceDir} — is this a canary evidence dir?`)
    return 1
  }

  const buildDir = findShippedBuildDir(evidenceDir)
  const identity = buildDir
    ? readDesignIdentity(buildDir)
    : { heroCopy: null, chassisId: null, composition: null }

  const entryText = renderTasteNoteEntry({
    date,
    heroCopy: identity.heroCopy,
    chassisId: identity.chassisId,
    compositionColumns: compositionLabel(identity.composition),
    sentence,
    evidencePath: path.relative(root, evidenceDir),
  })

  const targetFile = file ? path.resolve(root, file) : path.join(root, 'signals', 'taste.md')

  let result
  try {
    result = appendTasteNote({ filePath: targetFile, entryText })
  } catch (err) {
    if (err instanceof TasteFileShapeError) {
      error(`[taste] refusing to write — ${err.message}`)
      return 1
    }
    throw err
  }

  if (result.status === 'duplicate') {
    log(
      `[taste] already recorded in ${SECTION_HEADING} — skipped (${path.relative(root, targetFile)})`
    )
    return 0
  }

  log(`[taste] appended to ${SECTION_HEADING} in ${path.relative(root, targetFile)}`)
  log(`  ${entryText}`)

  const bytes = Buffer.byteLength(readFileSync(targetFile, 'utf8').trim(), 'utf8')
  if (bytes > MAX_TASTE_MEMORY_BYTES) {
    log(
      `[taste] warning: ${path.relative(root, targetFile)} is ${(bytes / 1024).toFixed(1)}KB, ` +
        `over the ${MAX_TASTE_MEMORY_BYTES / 1024}KB prompt cap — content past the cap is dropped ` +
        `from every Art Director prompt (scripts/utils/taste-memory.js). Trim the file to get this note seen.`
    )
  }

  return 0
}

if (isMain(import.meta.url)) {
  process.exit(main(process.argv.slice(2)))
}
