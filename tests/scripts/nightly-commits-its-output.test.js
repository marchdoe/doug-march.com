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
const ROLLBACK = path.join(ROOT, '.github', 'workflows', 'rollback.yml')
const src = readFileSync(WORKFLOW, 'utf8')
const rollbackSrc = readFileSync(ROLLBACK, 'utf8')

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

describe('the nightly agrees with the pipeline about which day it is', () => {
  // #338: the push step derived TODAY with `date -u` while every archive path
  // is keyed on signals.date, the Eastern day. Between 20:00 and 23:59
  // Eastern, which is when a /panel-triggered run lands, the site was staged
  // and the day's record was not, and the run reported success.
  it('never derives the day from UTC', () => {
    expect(src).not.toMatch(/\$\(date -u/)
    expect(src).not.toMatch(/toISOString\(\)\.slice\(0, 10\)/)
  })

  it('reads the day the pipeline published, with the Eastern clock as the fallback', () => {
    expect(src).toMatch(/- name: Run daily redesign\s*\n\s*id: redesign/)
    const push = src.slice(src.indexOf('Push changes'), src.indexOf('Open today'))
    expect(push).toMatch(/RUN_DATE: \$\{\{ steps\.redesign\.outputs\.date \}\}/)
    expect(push).toMatch(/TODAY="\$\{RUN_DATE:-\$\(TZ=America\/New_York date \+%Y-%m-%d\)\}"/)
    const rating = src.slice(src.indexOf('Open today'), src.indexOf('Upload failure'))
    expect(rating).toMatch(/RUN_DATE: \$\{\{ steps\.redesign\.outputs\.date \}\}/)
    expect(rating).toMatch(/process\.env\.RUN_DATE/)
  })

  it('has the pipeline publish signals.date, the day every archive path is keyed on', async () => {
    const { publishRunDate } = await import('../../scripts/daily-redesign.js')
    const { mkdtempSync, readFileSync } = await import('node:fs')
    const { tmpdir } = await import('node:os')
    const path = await import('node:path')
    const out = path.join(mkdtempSync(path.join(tmpdir(), 'gh-output-')), 'output')
    expect(publishRunDate({ date: '2026-09-01' }, out)).toBe('2026-09-01')
    expect(readFileSync(out, 'utf8')).toBe('date=2026-09-01\n')
  })

  it('publishes nothing that is not a date', async () => {
    const { publishRunDate } = await import('../../scripts/daily-redesign.js')
    const { mkdtempSync, existsSync } = await import('node:fs')
    const { tmpdir } = await import('node:os')
    const path = await import('node:path')
    const out = path.join(mkdtempSync(path.join(tmpdir(), 'gh-output-')), 'output')
    publishRunDate({ date: 'today; rm -rf /' }, out)
    expect(existsSync(out)).toBe(false)
  })
})

describe('what the nightly links to', () => {
  it('points the rating issue at where the screenshot is actually written', async () => {
    // #154 moved the day's screenshot from public/archive/<date>.png to
    // public/archive-data/<date>.png. The staging loop was eventually
    // updated; this URL was not, so every rating issue rendered a broken
    // image — and the rating loop is the only taste signal the Art Director
    // gets back. Pinned to the archiver's own constant rather than a literal.
    const { PUBLIC_SCREENSHOT_DIR } = await import('../../scripts/utils/archiver.js')
    expect(src).toContain(`main/${PUBLIC_SCREENSHOT_DIR}/\${today}.png`)
    // biome-ignore lint/suspicious/noTemplateCurlyInString: asserting on the literal text the workflow YAML contains, not interpolating
    expect(src).not.toContain('main/public/archive/${today}.png')
  })

  it('resolves dates in the failure issue in JS, not in a dead shell substitution', () => {
    // `$(date -u +%Y-%m-%d)` inside a JS template literal is never expanded;
    // the issue body showed the literal text. Scoped to the github-script
    // block — a shell substitution in the push step is correct there.
    const notify = src.slice(src.indexOf('Notify on failure'))
    expect(notify).not.toMatch(/\$\(date /)
    expect(notify).toMatch(
      /new Date\(\)\.toLocaleDateString\('en-CA', \{ timeZone: 'America\/New_York' \}\)/
    )
  })

  it('points the failure issue at diagnostics that outlive the runner', () => {
    // The notice used to send you to `archive/<date>/build-failed-*/trace.json`.
    // Nothing ever put that file anywhere you could reach: `Push changes`
    // excludes build-failed-* from main on purpose, so the trace died with the
    // job and #283 sent a reader to a path that has never existed.
    const notify = src.slice(src.indexOf('Notify on failure'))
    expect(notify).not.toMatch(/archive\/\$\{[^}]*\}\/build-failed-\*/)
    expect(notify).toContain('artifact')
  })

  it('uploads the diagnostics under the name the failure issue cites', () => {
    // The issue body names an artifact. If the two ever drift apart the notice
    // is a dead pointer again, which is the whole bug this pair guards.
    const upload = src.slice(src.indexOf('Upload failure diagnostics'))
    expect(upload).toContain('actions/upload-artifact')
    expect(upload).toMatch(/name:\s*build-failed-\$\{\{\s*github\.run_id\s*\}\}/)
    expect(upload).toContain('build-failed-*/')
    expect(upload).toContain('last-build-output.txt')

    const notify = src.slice(src.indexOf('Notify on failure'))
    // biome-ignore lint/suspicious/noTemplateCurlyInString: asserting on the literal text the workflow YAML contains, not interpolating
    expect(notify).toContain('build-failed-${context.runId}')
  })

  it('collects the diagnostics before it opens the issue that links them', () => {
    expect(src.indexOf('Upload failure diagnostics')).toBeLessThan(src.indexOf('Notify on failure'))
  })
})

describe('the DST guard', () => {
  it('decides from the cron entry that fired, not the hour it arrived', () => {
    // Reading `date +%-H` meant routine queue lag (the header documents
    // 17-31 minutes) pushed the run past the hour it was checking for, so
    // both entries were dropped and the day produced no build at all.
    expect(src).toContain('github.event.schedule')
    expect(src).not.toMatch(/hour=\$\(TZ=America\/New_York date/)
  })

  it('schedules both entries for 00:15 in New York', () => {
    // 00:15 EDT is 04:15 UTC; 00:15 EST is 05:15 UTC. Just past midnight is
    // the earliest moment that is unambiguously the new day, and it leaves
    // five to six hours of slack for a scheduler that has delivered late
    // since the 2026-08-26 Actions outage (#193). The pairing below is what
    // stops the wrong one running out of season.
    expect(src).toContain("- cron: '15 4 * * *'")
    expect(src).toContain("- cron: '15 5 * * *'")
    for (const old of ["cron: '50 8", "cron: '50 9", "cron: '0 9 ", "cron: '0 10 "]) {
      expect(src).not.toContain(old)
    }
  })

  it('pairs each cron entry with the season it belongs to', () => {
    expect(src).toContain("'15 4 * * *|EDT' | '15 5 * * *|EST'")
    expect(src).toContain("'15 4 * * *|EST' | '15 5 * * *|EDT'")
  })

  it('runs rather than skips when the schedule is unrecognised', () => {
    // A missed morning is visible on a site whose premise is a daily rebuild;
    // a duplicate queues behind the concurrency group.
    expect(src).toMatch(/::warning::unrecognised schedule/)
  })
})

describe('the rollback workflow', () => {
  it('restores the same files the pipeline is allowed to write', async () => {
    // The hardcoded list had drifted to 16 of 18 — og.tsx and
    // chassis-preset.ts were left standing against a restored preset.ts.
    // Reading MUTABLE_FILES at runtime is what stops it drifting again.
    const { MUTABLE_FILES } = await import('../../scripts/utils/site-context.js')
    expect(rollbackSrc).toContain('m.MUTABLE_FILES')
    for (const file of MUTABLE_FILES) {
      expect(rollbackSrc).not.toMatch(
        new RegExp(`git checkout[^\\n]*${file.replace(/[.$]/g, '\\$&')}`)
      )
    }
  })

  it('refuses to roll back a guessed file list', () => {
    expect(rollbackSrc).toMatch(/could not read MUTABLE_FILES/)
  })

  it('fails loudly when the rollback does not leave the runner', () => {
    expect(rollbackSrc).toMatch(/pushed" != "true"/)
    expect(rollbackSrc).toMatch(/::error::push failed/)
  })
})
