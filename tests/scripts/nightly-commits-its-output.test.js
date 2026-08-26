/**
 * The nightly must commit everything the nightly produces.
 *
 * The daily workflow stages an explicit list of paths rather than `git add -A`,
 * which is deliberate — `archive/<date>/build-failed-*` and `build-pre-*` must
 * never reach main. The cost of that precision is that moving an output path
 * silently stops it being committed, with no error anywhere: the run succeeds,
 * the push succeeds, and the file is simply gone.
 *
 * That happened. #154 moved the day's screenshot from
 * `public/archive/<date>.png` to `public/archive-data/<date>.png`. The old path
 * was covered incidentally by `public/archive/`; the new one was covered by
 * nothing, so from that commit onward no screenshot would ever have been
 * committed again. Nothing failed. It was found by reading the workflow.
 *
 * This asserts the staging list covers every directory the pipeline writes to,
 * and that the exclusions it relies on still hold.
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const WORKFLOW = path.join(ROOT, '.github', 'workflows', 'daily-redesign.yml')
const src = readFileSync(WORKFLOW, 'utf8')

/**
 * Everything a successful run writes that has to survive to main, and what
 * writes it. A path added here without being added to the workflow fails.
 */
const OUTPUTS = [
  ['elements/', "the day's preset and chassis preset"],
  ['app/components/', "the React Engineer's components"],
  ['app/routes/', 'the routes, including __root.tsx regenerated from template'],
  ['public/archive/', 'the sealed, framed snapshot of the day (#156, #158)'],
  ['public/archive-data/', 'the screenshot and viewport captures (#154)'],
  ['public/og/', 'the share card'],
  ['signals/today.references.md', 'the references the run consumed'],
]

/**
 * The paths in the `for p in … ; do git add "$p"` loop, and nothing else.
 *
 * Matching against the whole file is not good enough: the first version of
 * this test did that, and it kept passing when the path was deleted from the
 * loop, because the comment above the loop explaining the path still mentioned
 * it. A test that a comment can satisfy is not a test.
 */
function stagedLoopPaths() {
  const m = /for p in ([^;]+); do/.exec(src)
  if (!m) return []
  return m[1].trim().split(/\s+/)
}

describe('the daily workflow stages', () => {
  const staged = stagedLoopPaths()

  it('has a staging loop to read', () => {
    expect(staged.length).toBeGreaterThan(0)
  })

  it.each(OUTPUTS)('%s — %s', (outputPath) => {
    expect(staged).toContain(outputPath)
  })

  it("carries the day's record, not only its prose", () => {
    // record.json is the canonical record (#153). Its absence is not fatal —
    // the projection rebuilds from brief.md and the build dir — but the cache
    // then never persists.
    expect(src).toMatch(/git add "archive\/\$TODAY\/record\.json"/)
    expect(src).toMatch(/git add "archive\/\$TODAY\/brief\.md"/)
    expect(src).toMatch(/git add "archive\/\$TODAY\/archetype\.txt"/)
  })

  it('still refuses to commit failure and snapshot temp dirs', () => {
    // The whole reason the list is explicit rather than `git add -A`.
    expect(src).toMatch(/build-\[0-9\]\*/)
    expect(src).not.toMatch(/git add\s+-A/)
    expect(src).not.toMatch(/git add\s+archive\/\$TODAY\s*$/m)
  })
})

describe('the push', () => {
  it('checks out over SSH, because the ruleset has no actor for the bot', () => {
    // github-actions[bot] cannot be added to a personal-account repository
    // ruleset's bypass list; deploy keys can. See the comment on the step.
    expect(src).toMatch(/ssh-key:\s*\$\{\{\s*secrets\.DEPLOY_KEY\s*\}\}/)
    expect(src).not.toMatch(/- uses: actions\/checkout@v\d+\s*\n\s*with:\s*\n\s*token:/)
  })

  it('still fails loudly when the commit does not leave the runner', () => {
    // A for-loop's exit status is its last command, which once let a run
    // report success while nothing was pushed.
    expect(src).toMatch(/pushed" != "true"/)
    expect(src).toMatch(/::error::push failed/)
  })
})
