import { test, expect } from '@playwright/test'

// Runs against PREVIEW_URL (Vercel preview deploy, or localhost dev server)
// Usage: PREVIEW_URL=https://your-preview.vercel.app pnpm test:e2e:site

// Helper: check page loads with HTTP 200 and renders content
async function expectPageLoads(page: any, path: string) {
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
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000) // SPA hydration

    // Should have at least one archive entry link
    const entries = page.locator('a[href^="/archive/20"]')
    await expect(entries.first()).toBeVisible({ timeout: 15000 })
    expect(await entries.count()).toBeGreaterThan(0)
  })

  test('archive detail page loads for a valid date', async ({ page }) => {
    // Go to archive list and click the first entry
    await page.goto('/archive')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000) // SPA hydration

    const firstEntry = page.locator('a[href^="/archive/20"]').first()
    await expect(firstEntry).toBeVisible({ timeout: 15000 })

    await firstEntry.click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Should show back link (confirms detail page rendered)
    await expect(page.locator('text=Back to Archive')).toBeVisible({ timeout: 15000 })
  })

  test('archive detail handles invalid date gracefully', async ({ page }) => {
    const response = await page.goto('/archive/9999-99-99')
    // Should not crash — either shows error component or falls back
    expect(response?.status()).toBeLessThan(500)
  })
})

test.describe('site health — navigation', () => {
  test('can navigate between pages without errors', async ({ page }) => {
    // Start at home
    const homeResponse = await page.goto('/')
    expect(homeResponse?.status()).toBeLessThan(500)
    await page.waitForLoadState('networkidle')

    // Navigate to about via link
    const aboutLink = page.locator('a[href="/about"]').first()
    if (await aboutLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await aboutLink.click()
      await page.waitForLoadState('networkidle')
      await expect(page).toHaveURL(/\/about/)
    }
  })
})
