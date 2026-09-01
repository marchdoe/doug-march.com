/**
 * Deterministic surface gate.
 *
 * The screenshot critic looked at one viewport of one page — `/` at 1280x900,
 * above the fold. The #215 audit walked all eleven visitor-reachable surfaces
 * and found seven defects. Five of them were geometry: a page whose document
 * is wider than the screen it is being read on. `/experiments` ran 657px past
 * a 1440px viewport, which put the headline, the whole nav and every row's
 * metadata off the right edge.
 *
 * Geometry does not need a vision model. `scrollWidth > clientWidth` is a
 * measurement, not a judgement — it cannot hallucinate, it costs no tokens,
 * and it can therefore run over every route at every rung on every build
 * without touching the run's deadline budget. That is what this module does.
 * What it cannot see (a duplicated nav block, type set at the wrong scale)
 * stays the vision critic's job; see `screenshot-critic.js`.
 *
 * Findings are also rendered into a text block for the critic prompt, so the
 * model is told what the measurements say instead of being asked to eyeball
 * it from a downscaled JPEG.
 *
 * @module
 */

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ROOT } from './file-manager.js'
import { withPreviewServer } from './snapshot.js'

/**
 * Viewport rungs. Both are already on the ladder `archiver.js:311` defines for
 * responsive measurement, so this introduces no new numbers to reason about.
 *
 * The critic used to capture at 1280x900, which is not a rung on that ladder
 * and not a device anyone has; it now captures at 1440, the same width as the
 * mockup and the header crop. Every defect the audit found was
 * width-dependent, so the width that defines "reviewed" is doing real work.
 */
/**
 * When a block of prose stops being a phrase and starts being a wall.
 *
 * 2026-09-01's /about set a 340-character paragraph at 110px. It filled several
 * screens, and the owner's reaction was "notice how this takes up a ton of the
 * screen?" Every other running-copy block on that same build measured 14-16px,
 * so the boundary is not delicate: the next largest was 205 characters at 14px.
 *
 * Deliberately wide of both. A hero phrase is short and may be enormous; a
 * pull quote may be 180 characters at 48px and still be a design decision.
 * Only the combination — long AND huge — is the defect, because that is prose
 * nobody can read at a glance and nobody chose to set that way.
 */
export const RUNNING_COPY_MIN_CHARS = 180
export const RUNNING_COPY_MAX_PX = 48

export const VIEWPORT_RUNGS = [
  { name: 'mobile', width: 360, height: 640 },
  { name: 'desktop', width: 1440, height: 900 },
]

/** Both schemes. The theme init script reads `prefers-color-scheme`, so a
 *  scheme has to be set at page creation to be honoured — see captureScreenshot. */
export const COLOR_SCHEMES = ['light', 'dark']

/**
 * Sub-pixel slack. Layout arithmetic lands on fractional pixels (a 471.812px
 * column inside a 472px parent), and a rounding artefact is not a defect.
 * Anything at or under this is noise.
 */
export const OVERFLOW_TOLERANCE_PX = 1

/**
 * How many pages to measure at once. Four keeps one headless Chromium
 * comfortable on a CI runner while cutting the walk from over a minute to
 * roughly twenty seconds.
 */
export const GATE_CONCURRENCY = 4

/**
 * Routes this gate walks.
 *
 * `/work/<slug>` is expanded from the project list at call time rather than
 * hardcoded, so a project added to `projects.ts` is covered without anyone
 * remembering to add it here.
 *
 * @param {string} [root] - repo root, injectable for tests
 * @returns {Promise<Array<{ id: string, route: string }>>}
 */
export async function listGeneratedRoutes(root = ROOT) {
  const src = await readFile(path.join(root, 'app/content/projects.ts'), 'utf8')
  const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
  return [
    { id: 'home', route: '/' },
    { id: 'about', route: '/about' },
    { id: 'work-index', route: '/work' },
    { id: 'experiments', route: '/experiments' },
    ...slugs.map((s) => ({ id: `work-${s}`, route: `/work/${s}` })),
  ]
}

/**
 * Turn one raw measurement into zero or more findings.
 *
 * Split out from the browser work so the rules are unit-testable without
 * Playwright. Pure.
 *
 * @param {object} m - raw measurement from {@link measureRoute}
 * @param {{ tolerancePx?: number }} [opts]
 * @returns {Array<{ kind: string, severity: 'error'|'warning', detail: string }>}
 */
export function evaluateMeasurement(m, { tolerancePx = OVERFLOW_TOLERANCE_PX } = {}) {
  const findings = []

  if (m.error) {
    findings.push({ kind: 'unreachable', severity: 'error', detail: m.error })
    return findings
  }

  if (m.status !== 200) {
    findings.push({
      kind: 'status',
      severity: 'error',
      detail: `HTTP ${m.status}`,
    })
  }

  const over = m.scrollWidth - m.clientWidth
  if (over > tolerancePx) {
    findings.push({
      // A page marked `data-allow-x-overflow` has declared its horizontal
      // scroll deliberate, so it is reported without failing the gate. Nothing
      // sets it today; it exists so a design that genuinely wants a full-bleed
      // horizontal scroller has a way to say so rather than being told to
      // stop, or teaching everyone to ignore the gate.
      kind: 'overflow',
      severity: m.allowsXOverflow ? 'warning' : 'error',
      detail: `document is ${Math.round(over)}px wider than the ${m.clientWidth}px viewport (scrollWidth ${Math.round(m.scrollWidth)})`,
    })
  }

  // Running copy set at display size. The owner's words on the build that
  // prompted this: "notice how this takes up a ton of the screen?"
  if (
    m.worstCopy &&
    m.worstCopy.chars >= RUNNING_COPY_MIN_CHARS &&
    m.worstCopy.fontSizePx > RUNNING_COPY_MAX_PX
  ) {
    findings.push({
      kind: 'running-copy',
      severity: 'error',
      detail:
        `${m.worstCopy.chars} characters of running copy set at ${m.worstCopy.fontSizePx}px ` +
        `(over ${RUNNING_COPY_MAX_PX}px) — "${m.worstCopy.sample}..." . A paragraph at display ` +
        'size is a wall, not a hero. Set prose on the body step and give the display step a phrase.',
    })
  }

  if (m.consoleErrors?.length) {
    findings.push({
      kind: 'console',
      severity: 'warning',
      detail: m.consoleErrors.slice(0, 3).join(' | ').slice(0, 300),
    })
  }

  return findings
}

/**
 * Measure one route at one viewport in one colour scheme.
 *
 * @param {import('playwright').Browser} browser
 * @param {string} baseUrl
 * @param {{ id: string, route: string }} surface
 * @param {{ name: string, width: number, height: number }} viewport
 * @param {'light'|'dark'} scheme
 * @returns {Promise<object>} raw measurement
 */
export async function measureRoute(browser, baseUrl, surface, viewport, scheme) {
  const base = { id: surface.id, route: surface.route, viewport: viewport.name, scheme }
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: scheme,
  })
  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => consoleErrors.push(String(err)))

  try {
    const resp = await page.goto(`${baseUrl}${surface.route}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    })
    // Fonts change metrics, and metrics are the entire point of this gate.
    await page.waitForTimeout(900)
    const box = await page.evaluate(
      ({ minChars }) => {
        // Leaf elements only. A wrapper's textContent is the sum of its
        // children's, which would report a whole page as one giant block.
        let worstCopy = null
        for (const el of document.querySelectorAll('body *')) {
          if (el.children.length > 0) continue
          const text = (el.textContent || '').trim()
          if (text.length < minChars) continue
          const size = Number.parseFloat(getComputedStyle(el).fontSize)
          if (!Number.isFinite(size)) continue
          if (!worstCopy || size > worstCopy.fontSizePx) {
            worstCopy = {
              chars: text.length,
              fontSizePx: Math.round(size),
              sample: text.slice(0, 60),
            }
          }
        }
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          allowsXOverflow: document.body?.hasAttribute('data-allow-x-overflow') ?? false,
          worstCopy,
        }
      },
      { minChars: RUNNING_COPY_MIN_CHARS }
    )
    return { ...base, status: resp?.status() ?? null, ...box, consoleErrors }
  } catch (err) {
    return { ...base, error: err.message, consoleErrors }
  } finally {
    await page.close()
  }
}

/**
 * Walk every route at every rung in both schemes and return what is wrong.
 *
 * Reuses a preview server when the caller already has one (`port`), which is
 * the normal case inside the pipeline — the screenshot capture has one open.
 *
 * @param {{ port?: number, routes?: Array<{id:string,route:string}>,
 *          viewports?: typeof VIEWPORT_RUNGS, schemes?: string[] }} [opts]
 * @returns {Promise<{ findings: Array<object>, measured: number, errorCount: number }>}
 */
export async function runSurfaceGate({
  port,
  routes,
  viewports = VIEWPORT_RUNGS,
  schemes = COLOR_SCHEMES,
  concurrency = GATE_CONCURRENCY,
} = {}) {
  const { chromium } = await import('playwright')
  const surfaces = routes ?? (await listGeneratedRoutes())

  const jobs = []
  for (const surface of surfaces) {
    for (const viewport of viewports) {
      for (const scheme of schemes) jobs.push({ surface, viewport, scheme })
    }
  }

  return await withPreviewServer(
    async (baseUrl) => {
      let browser = null
      const findings = []
      let measured = 0
      try {
        browser = await chromium.launch({ headless: true })

        // Nearly all of a measurement is spent waiting — networkidle, then the
        // font settle. Serially that is over a minute for one build, against a
        // run that already enforces a deadline. Pages in one browser are
        // independent, so a small pool cuts the wall clock by roughly the
        // concurrency without changing a single number that comes back.
        let cursor = 0
        const worker = async () => {
          for (;;) {
            const job = jobs[cursor++]
            if (!job) return
            const m = await measureRoute(browser, baseUrl, job.surface, job.viewport, job.scheme)
            measured++
            for (const f of evaluateMeasurement(m)) {
              findings.push({
                surface: job.surface.route,
                viewport: job.viewport.name,
                width: job.viewport.width,
                scheme: job.scheme,
                ...f,
              })
            }
          }
        }
        await Promise.all(
          Array.from({ length: Math.min(concurrency, jobs.length) }, () => worker())
        )
      } finally {
        // Same reasoning as captureScreenshot: a throw mid-walk must not
        // orphan a headless Chromium, because the gate can run more than once
        // per build and the leaks accumulate.
        if (browser) await browser.close()
      }
      return {
        findings,
        measured,
        errorCount: findings.filter((f) => f.severity === 'error').length,
      }
    },
    { port }
  )
}

/**
 * Render findings as a text block for the screenshot critic's prompt.
 *
 * Deliberately text, not more image blocks: the measurements are already
 * exact, and describing them costs a few hundred tokens where a capture per
 * route would cost image blocks and wall-clock against a run that already
 * enforces a deadline.
 *
 * Identical findings across schemes are collapsed — a page that overflows in
 * light overflows in dark for the same reason, and saying it twice invites the
 * model to treat one defect as two.
 *
 * @param {Array<object>} findings
 * @returns {string} empty string when there is nothing to report
 */
export function formatFindingsForCritic(findings) {
  if (!findings?.length) return ''

  const byKey = new Map()
  for (const f of findings) {
    const key = `${f.surface}|${f.viewport}|${f.kind}|${f.detail}`
    if (!byKey.has(key)) byKey.set(key, { ...f, schemes: [] })
    byKey.get(key).schemes.push(f.scheme)
  }

  const lines = [...byKey.values()]
    // Errors first: the model should read the disqualifying facts before the
    // advisory ones.
    .sort((a, b) => (a.severity === b.severity ? 0 : a.severity === 'error' ? -1 : 1))
    .map((f) => {
      const schemes =
        f.schemes.length === COLOR_SCHEMES.length ? 'both schemes' : f.schemes.join(' + ')
      return `- [${f.severity}] ${f.surface} at ${f.width}px (${schemes}): ${f.detail}`
    })

  return [
    '## Measured layout faults',
    '',
    'These are measurements taken from the live render, not observations from the images below.',
    'They are exact. Do not re-litigate them against the screenshots, and do not count one fault',
    'twice because it appears at more than one viewport.',
    '',
    ...lines,
  ].join('\n')
}

/**
 * The error-severity findings a given owner can act on.
 *
 * This is what makes the gate a gate (#306): the orchestrator used to log
 * `errorCount`, push a verdict nobody read, and leave the revision decision
 * to the screenshot critic alone. A 657px overflow the critic could not see
 * shipped with a SHIP.
 *
 * @param {Array<object>} findings
 * @param {'react-engineer'|'human'} owner
 * @returns {Array<object>}
 */
export function faultsForOwner(findings, owner) {
  return (findings ?? []).filter(
    (f) => f.severity === 'error' && ownerForSurface(f.surface) === owner
  )
}

/**
 * Which agent can act on a finding.
 *
 * The revision loop routes every REVISE to `react-engineer`
 * (`design-agents.js`), which is right for the nightly components and wrong
 * for everything else. `/experiments` and `/work` are authored route files no
 * agent owns: feedback about them is a ticket for a human, not a prompt for a
 * model, and sending it to the engineer produces a confident edit to a file it
 * was never given.
 *
 * @param {string} surface - route path
 * @returns {'react-engineer'|'human'}
 */
export function ownerForSurface(surface) {
  // Kept as an explicit list rather than derived from MUTABLE_FILES, because
  // the mapping is route -> file and several routes share Layout/Sidebar.
  const generated = ['/', '/about']
  if (generated.includes(surface)) return 'react-engineer'
  if (surface.startsWith('/work/')) return 'react-engineer'
  return 'human'
}
