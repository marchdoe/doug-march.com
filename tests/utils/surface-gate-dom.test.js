/**
 * The DOM half of the surface gate, against real Chromium.
 *
 * evaluateMeasurement's tests feed it a pre-built worstCopy, so they prove
 * the threshold and never the extraction (#321). This proves the extraction,
 * including the case that slipped through: a paragraph carrying one inline
 * element was skipped entirely by the leaf-only walk (#307).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { chromium } from '@playwright/test'
import { RUNNING_COPY_MIN_CHARS, collectSurfaceMetrics } from '../../scripts/utils/surface-gate.js'

const LONG =
  'I work at the intersection of product and engineering, mostly on things that ship to people who did not ask for them and have to like them anyway. '.repeat(
    3
  )

async function measure(browser, html) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  try {
    await page.setContent(`<!doctype html><html><body>${html}</body></html>`)
    return await page.evaluate(collectSurfaceMetrics, { minChars: RUNNING_COPY_MIN_CHARS })
  } finally {
    await page.close()
  }
}

describe('collectSurfaceMetrics', () => {
  let browser
  beforeAll(async () => {
    browser = await chromium.launch({ headless: true })
  })
  afterAll(async () => {
    await browser?.close()
  })

  it('measures a paragraph that carries a link', async () => {
    // 2026-09-01's /about paragraph, with the one <a> the Art Director is
    // likely to put in it. The leaf-only walk measured the <a> alone.
    const { worstCopy } = await measure(
      browser,
      `<p style="font-size:110px">${LONG} <a href="/work">See the work</a>.</p>`
    )
    expect(worstCopy).not.toBeNull()
    expect(worstCopy.fontSizePx).toBe(110)
    expect(worstCopy.chars).toBeGreaterThan(RUNNING_COPY_MIN_CHARS)
  })

  it('measures a paragraph with emphasis and a line break', async () => {
    const { worstCopy } = await measure(
      browser,
      `<p style="font-size:64px">${LONG}<br><em>${LONG}</em> <strong>and more</strong></p>`
    )
    expect(worstCopy?.fontSizePx).toBe(64)
  })

  it('still measures a plain leaf paragraph', async () => {
    const { worstCopy } = await measure(browser, `<p style="font-size:110px">${LONG}</p>`)
    expect(worstCopy?.fontSizePx).toBe(110)
  })

  it('does not report a wrapper of block children as one giant block', async () => {
    // The wrapper's textContent is the sum of its paragraphs. Measuring it
    // would flag every page as a running-copy block at the wrapper's size.
    const { worstCopy } = await measure(
      browser,
      `<div style="font-size:120px"><p style="font-size:16px">${LONG}</p><p style="font-size:16px">${LONG}</p></div>`
    )
    expect(worstCopy?.fontSizePx).toBe(16)
  })

  it('leaves a short hero phrase alone however large', async () => {
    const { worstCopy } = await measure(
      browser,
      `<h1 style="font-size:200px"><span>97.7,</span> still summer.</h1>`
    )
    expect(worstCopy).toBeNull()
  })

  it('reports document overflow and the opt-out attribute', async () => {
    const wide = await measure(browser, `<div style="width:2000px;height:10px"></div>`)
    expect(wide.scrollWidth).toBeGreaterThan(wide.clientWidth)
    expect(wide.allowsXOverflow).toBe(false)

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    try {
      await page.setContent(
        '<!doctype html><html><body data-allow-x-overflow><p>x</p></body></html>'
      )
      const out = await page.evaluate(collectSurfaceMetrics, { minChars: RUNNING_COPY_MIN_CHARS })
      expect(out.allowsXOverflow).toBe(true)
    } finally {
      await page.close()
    }
  })
})
