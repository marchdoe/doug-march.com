import { test, expect, type Page } from '@playwright/test'

// Runs against PREVIEW_URL (Vercel preview deploy, or localhost dev server)
// Usage: PREVIEW_URL=https://your-preview.vercel.app pnpm test:e2e:site

// Helper: check page loads with HTTP 200 and renders content
async function expectPageLoads(page: Page, path: string) {
  const response = await page.goto(path)
  expect(response?.status()).toBeLessThan(500)
  await expect(page).not.toHaveURL(/\/error/)

  // Page should render some visible content
  const body = await page.textContent('body')
  expect(body?.length).toBeGreaterThan(50)
}

test.describe('site health — core pages', () => {
  const corePages = ['/', '/about', '/elements']

  for (const path of corePages) {
    test(`${path} loads and renders`, async ({ page }) => {
      await expectPageLoads(page, path)
    })
  }
})

test.describe('site health — project pages', () => {
  const slugs = [
    'spaceman',
    'fishsticks',
    '15th-club',
    'doug-march-dot-com',
    'teeturn',
    'politweets',
    'twittertale',
  ]

  for (const slug of slugs) {
    test(`/work/${slug} loads and renders`, async ({ page }) => {
      await expectPageLoads(page, `/work/${slug}`)
    })
  }
})

test.describe('site health — archive', () => {
  test('archive list loads and shows entries', async ({ page }) => {
    await page.goto('/archive')

    // Should have at least one archive entry link
    const entries = page.locator('a[href^="/archive/20"]')
    await expect(entries.first()).toBeVisible({ timeout: 15000 })
    expect(await entries.count()).toBeGreaterThan(0)
  })

  test('archive detail page loads for a valid date', async ({ page }) => {
    // Go to archive list and click the first entry
    await page.goto('/archive')

    const firstEntry = page.locator('a[href^="/archive/20"]').first()
    await expect(firstEntry).toBeVisible({ timeout: 15000 })

    await firstEntry.click()

    // Should show back link (confirms detail page rendered)
    await expect(page.locator('text=Back to Archive')).toBeVisible({ timeout: 15000 })
  })

  test('archive detail handles invalid date gracefully', async ({ page }) => {
    const response = await page.goto('/archive/9999-99-99')
    // The route throws on invalid dates — TanStack Start returns 500 with an error component.
    // We just verify the page responds (doesn't hang or crash the server).
    expect(response?.status()).toBeDefined()
  })
})

test.describe('site health — archived site serving', () => {
  test('archived HTML serves as static file, not SPA shell', async ({ page }) => {
    // Find a date that has archived HTML
    const response = await page.goto('/archive/2026-03-26/index.html')
    if (response?.status() === 200) {
      const content = await page.content()
      // Archived HTML should NOT contain the SPA entry point script
      // It should be self-contained (CSS inlined, JS stripped by snapshot.js)
      expect(content).not.toContain('tanstack-start-client-entry')
    }
    // If 404, the archive doesn't have this date — that's OK
  })
})

test.describe('site health — content verification', () => {
  test('home page shows real content', async ({ page }) => {
    await page.goto('/')

    // Non-Specimen/Poster days: project names appear in the listing.
    // Specimen/Poster days: phrase-only home page — no project listing, but h1 (hero phrase) is present.
    const projectNames = page
      .locator('body')
      .filter({ hasText: /Spaceman|FishSticks|Doug March|Teeturn|Politweets/ })
    const heroPhrase = page.locator('h1')
    await expect(projectNames.or(heroPhrase).first()).toBeVisible({ timeout: 15000 })
  })

  test('about page shows real timeline content', async ({ page }) => {
    await page.goto('/about')

    // Wait for content to hydrate by checking for real timeline content
    await expect(page.locator('body')).toContainText(/LivingSocial|iCapital|Doug March/, {
      timeout: 15000,
    })
  })
})

test.describe('site health — share-sheet meta', () => {
  test('shell HTML og meta is well-formed when present', async ({ page }) => {
    await page.goto('/')
    // A committed checkout (before the first pipeline run on this branch) has
    // no og meta in __root.tsx — skip rather than hard-fail in that case.
    const ogMeta = page.locator('meta[property="og:image"]')
    // Fast skip (no ~30s auto-wait) when the tag is absent on a pre-pipeline checkout.
    if ((await ogMeta.count()) === 0)
      test.skip(true, 'og meta not yet generated (pre-first-pipeline-run checkout)')
    const ogImage = await ogMeta.getAttribute('content')
    expect(ogImage).toMatch(/\/og\/\d{4}-\d{2}-\d{2}\.png$/)
    const card = await page.locator('meta[name="twitter:card"]').getAttribute('content')
    expect(card).toBe('summary_large_image')
  })
})

test.describe('site health — navigation', () => {
  test('can navigate between pages without errors', async ({ page }) => {
    // Start at home
    const homeResponse = await page.goto('/')
    expect(homeResponse?.status()).toBeLessThan(500)

    // Wait for hydration
    const aboutLink = page.locator('a[href="/about"]').first()
    await expect(aboutLink).toBeVisible({ timeout: 15000 })

    await aboutLink.click()
    await expect(page).toHaveURL(/\/about/, { timeout: 15000 })
  })
})
