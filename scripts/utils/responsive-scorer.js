import { chromium } from '@playwright/test'

const CHECKS = {
  horizontalScroll: () =>
    document.documentElement.scrollWidth > window.innerWidth,
  clippedElements: () => {
    const vw = window.innerWidth
    const out = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (r.right > vw + 1) {
        out.push({
          tag: el.tagName,
          text: (el.textContent || '').trim().slice(0, 50),
          right: Math.round(r.right),
        })
      }
    }
    return out
  },
  headerOverlap: () => {
    const header = document.querySelector('header') || document.querySelector('nav')
    if (!header) return []
    const kids = [...header.children].map(el => ({ el, r: el.getBoundingClientRect() }))
    const overlaps = []
    for (let i = 0; i < kids.length; i++) {
      for (let j = i + 1; j < kids.length; j++) {
        const a = kids[i].r, b = kids[j].r
        const xOverlap = !(a.right <= b.left || b.right <= a.left)
        const yOverlap = !(a.bottom <= b.top || b.bottom <= a.top)
        if (xOverlap && yOverlap) {
          overlaps.push({
            a: kids[i].el.tagName + (kids[i].el.className ? '.' + kids[i].el.className : ''),
            b: kids[j].el.tagName + (kids[j].el.className ? '.' + kids[j].el.className : ''),
          })
        }
      }
    }
    return overlaps
  },
  bodyTextSize: () => {
    const root = document.querySelector('main') || document.body
    let min = Infinity
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    let n
    while ((n = walker.nextNode())) {
      const text = (n.textContent || '').trim()
      if (text.length < 8) continue
      const parent = n.parentElement
      if (!parent) continue
      const fs = parseFloat(getComputedStyle(parent).fontSize)
      if (fs && fs < min) min = fs
    }
    if (min === Infinity) return { min: null, passing: true }
    return { min: Math.round(min * 10) / 10, passing: min >= 16 }
  },
  tapTargetFailures: (viewportWidth) => {
    if (viewportWidth > 768) return []
    const selectors = 'a[href], button, [role="button"], input[type="button"], input[type="submit"]'
    const out = []
    for (const el of document.querySelectorAll(selectors)) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (r.width < 44 || r.height < 44) {
        out.push({
          tag: el.tagName,
          text: (el.textContent || '').trim().slice(0, 30),
          w: Math.round(r.width),
          h: Math.round(r.height),
        })
      }
    }
    return out
  },
  lineLengthFailures: () => {
    // Approximate: chars per paragraph / rendered line count.
    // Rendered lines ≈ clientHeight / computed line-height.
    const out = []
    for (const p of document.querySelectorAll('p')) {
      const text = (p.textContent || '').trim()
      if (text.length < 100) continue
      const cs = getComputedStyle(p)
      const lh = parseFloat(cs.lineHeight) ||
                 (parseFloat(cs.fontSize) * 1.5)
      const lines = Math.max(1, Math.round(p.clientHeight / lh))
      const avgChars = text.length / lines
      if (avgChars > 75) {
        out.push({
          chars: text.length,
          lines,
          avgPerLine: Math.round(avgChars),
          excerpt: text.slice(0, 40),
        })
      }
    }
    return out
  },
}

/**
 * Count failures for a viewport's checks.
 */
function countFailures(checks) {
  let n = 0
  if (checks.horizontalScroll) n++
  if (Array.isArray(checks.clippedElements) && checks.clippedElements.length) n++
  if (Array.isArray(checks.headerOverlap) && checks.headerOverlap.length) n++
  if (checks.bodyTextSize && checks.bodyTextSize.passing === false) n++
  if (Array.isArray(checks.tapTargetFailures) && checks.tapTargetFailures.length) n++
  if (Array.isArray(checks.lineLengthFailures) && checks.lineLengthFailures.length) n++
  return n
}

/** failure count → 1..5 (inverted, capped at 4+ failures = 1) */
function scoreFromFailureCount(n) {
  if (n === 0) return 5
  if (n === 1) return 4
  if (n === 2) return 3
  if (n === 3) return 2
  return 1
}

/** Pick the first failing check type (for worstFailure reporting) */
function firstFailingCheck(checks) {
  if (checks.horizontalScroll) return 'horizontalScroll'
  if (checks.clippedElements?.length) return 'clippedElements'
  if (checks.headerOverlap?.length) return 'headerOverlap'
  if (checks.bodyTextSize?.passing === false) return 'bodyTextSize'
  if (checks.tapTargetFailures?.length) return 'tapTargetFailures'
  if (checks.lineLengthFailures?.length) return 'lineLengthFailures'
  return null
}

function formatFailureDetail(check, viewportResult) {
  const c = viewportResult.checks
  switch (check) {
    case 'horizontalScroll':
      return `document.scrollWidth exceeded viewport ${viewportResult.width}px`
    case 'clippedElements':
      return `${c.clippedElements.length} element(s) extended past the viewport (first: <${c.clippedElements[0].tag}>)`
    case 'headerOverlap':
      return `${c.headerOverlap.length} overlapping pair(s) in the header`
    case 'bodyTextSize':
      return `body text min ${c.bodyTextSize.min}px (floor 16px)`
    case 'tapTargetFailures':
      return `${c.tapTargetFailures.length} interactive element(s) below 44×44px`
    case 'lineLengthFailures':
      return `${c.lineLengthFailures.length} paragraph(s) over 75 chars per line`
    default:
      return 'unknown'
  }
}

/**
 * Score a URL across viewports.
 * Each check runs in the page context after setting viewport.
 *
 * @param {string} url
 * @param {Array<{name, width, height}>} viewports
 * @param {object} [opts]
 * @param {import('@playwright/test').Browser} [opts.browser] - optional
 *   externally-managed browser (tests reuse one; production launches its own)
 * @returns {Promise<object>} metrics
 */
export async function scoreResponsive(url, viewports, opts = {}) {
  const ownBrowser = !opts.browser
  const browser = opts.browser || (await chromium.launch({ headless: true }))

  try {
    const page = await browser.newPage()
    const viewportResults = {}

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(url, { waitUntil: 'load', timeout: 30000 })
      await page.waitForTimeout(300)

      const checks = {}
      for (const [name, fn] of Object.entries(CHECKS)) {
        // Pass viewport width as second arg — most checks ignore it.
        checks[name] = await page.evaluate(
          ([fnStr, vw]) => {
            // eslint-disable-next-line no-new-func
            const f = new Function('return ' + fnStr)()
            return f(vw)
          },
          [fn.toString(), vp.width]
        )
      }

      viewportResults[vp.name] = {
        width: vp.width,
        height: vp.height,
        checks,
        score: scoreFromFailureCount(countFailures(checks)),
      }
    }

    const overallScore = Math.min(
      ...Object.values(viewportResults).map(v => v.score)
    )

    let worstFailure = null
    const worstVp = Object.entries(viewportResults)
      .sort(([, a], [, b]) => a.score - b.score)[0]
    if (worstVp && worstVp[1].score < 5) {
      const [vpName, vpResult] = worstVp
      const check = firstFailingCheck(vpResult.checks)
      if (check) {
        worstFailure = {
          viewport: vpName,
          check,
          detail: formatFailureDetail(check, vpResult),
        }
      }
    }

    await page.close()
    return { viewports: viewportResults, overallScore, worstFailure }
  } finally {
    if (ownBrowser) await browser.close()
  }
}
