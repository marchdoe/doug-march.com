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
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.waitForTimeout(300)

      const checks = {}
      for (const [name, fn] of Object.entries(CHECKS)) {
        checks[name] = await page.evaluate(fn)
      }

      viewportResults[vp.name] = {
        width: vp.width,
        height: vp.height,
        checks,
      }
    }

    await page.close()
    return { viewports: viewportResults }
  } finally {
    if (ownBrowser) await browser.close()
  }
}
