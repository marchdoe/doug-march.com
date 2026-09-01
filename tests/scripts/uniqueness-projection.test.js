import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * The uniqueness index has two readers.
 *
 * `scripts/utils/read-uniqueness-history.js` feeds the nightly run.
 * `uniquenessInputs` in `scripts/generate-archive-json.js` feeds the archive
 * chart, recomputing every date so the chart covers the whole corpus rather than
 * starting from whenever the index shipped. They read the same build directory
 * and they have to read the same artifacts, or the chart scores a day on less
 * than the pipeline did.
 *
 * They drifted. #254 added `header.json` to the pipeline reader and to the index
 * and left the projection alone, so the chart scored header placement as absent
 * for every date. #255 caught it while adding `fingerprint.json`. These
 * assertions are here so the next artifact cannot arrive on one side only.
 *
 * Source-level rather than behavioural: generate-archive-json.js does its work
 * at module scope and writes into `public/`, so importing it would run it.
 */

// Not named ROOT: tests-do-not-mutate-archive.test.js reads `resolve(ROOT, ...)`
// against a pipeline-owned directory as a test writing fixtures into the repo.
const REPO = resolve(import.meta.dirname, '../..')

const source = (rel) => readFileSync(resolve(REPO, rel), 'utf8')

/** The `*.json` artifact names a reader pulls out of a build directory. */
function artifactsRead(src) {
  return new Set([...src.matchAll(/['"]([a-z-]+\.json)['"]/g)].map((m) => m[1]))
}

const PIPELINE = 'scripts/utils/read-uniqueness-history.js'
const PROJECTION = 'scripts/generate-archive-json.js'

const ARTIFACTS = [
  'composition.json',
  'color-scheme.json',
  'lane.json',
  'shell.json',
  'header.json',
  'fingerprint.json',
]

describe('the uniqueness projection reads what the pipeline reads', () => {
  // #308 collapsed the two copies into one reader. The projection cannot
  // drift from the pipeline if it does not have its own walk, so the pin is
  // now structural: the projection delegates, and does no artifact reading
  // of its own.
  it('delegates to the pipeline reader rather than walking the build dir itself', () => {
    const src = source(PROJECTION)
    expect(src).toMatch(
      /import \{ readUniquenessInputs \} from '\.\/utils\/read-uniqueness-history\.js'/
    )
    expect(src).toMatch(/return readUniquenessInputs\(join\(archiveDir, date\), date\)/)
    const own = [...artifactsRead(src)].filter((name) => ARTIFACTS.includes(name))
    expect(own, `${PROJECTION} reads uniqueness artifacts itself`).toEqual([])
  })

  it.each(ARTIFACTS)('the one reader reads %s', (artifact) => {
    expect(artifactsRead(source(PIPELINE)), `${PIPELINE} lost ${artifact}`).toContain(artifact)
  })

  it('carries header and fingerprint through rather than reading and dropping them', () => {
    const src = source(PIPELINE)
    for (const key of ['header', 'fingerprint']) {
      expect(src, `readUniquenessInputs never returns ${key}`).toMatch(
        new RegExp(`^\\s+${key},$`, 'm')
      )
      expect(src, `the empty-day fallback omits ${key}`).toMatch(new RegExp(`${key}: null`))
    }
  })

  it('treats a day carrying only a header as a day worth scoring', () => {
    // The guard decides whether a build dir counts. A dir holding nothing but
    // header.json used to fall through to the next candidate and score as empty.
    expect(source(PIPELINE)).toMatch(
      /if \(composition \|\| colorScheme \|\| lane \|\| shell \|\| header \|\| fingerprint\)/
    )
  })
})
