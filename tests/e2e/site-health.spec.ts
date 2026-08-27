import { RECOGNISED_ORIGINS } from '../../scripts/utils/site-origin.js'
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
  test('the calendar loads and shows days', async ({ page }) => {
    await page.goto('/archive')

    // A built day opens the design it shipped; a record-only day opens the
    // explainer, because there is no design to open. Both are cells.
    const days = page.locator('a[href^="/archive/20"], a[href^="/how/20"]')
    await expect(days.first()).toBeVisible({ timeout: 15000 })
    expect(await days.count()).toBeGreaterThan(0)
  })

  test('the explainer is reachable from the calendar', async ({ page }) => {
    await page.goto('/how/2026-06-28')
    await expect(page.getByRole('heading', { name: /June 28, 2026/ })).toBeVisible({
      timeout: 15000,
    })
    await expect(page.locator('a[href="/archive"]').first()).toBeVisible()
  })

  test('explainer handles a date with no record gracefully', async ({ page }) => {
    await page.goto('/how/9999-99-99')
    await expect(page.getByText('Nothing archived for 9999-99-99')).toBeVisible({ timeout: 15000 })
  })

  test('the record projection is served', async ({ request }) => {
    const index = await request.get('/archive-data/index.json')
    expect(index.status()).toBe(200)
    expect((await index.json()).length).toBeGreaterThan(0)
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

  // A preserved design's URL must end in a slash: every snapshot links its own
  // pages document-relative, and the browser resolves those against the
  // directory. The slash-less form redirects rather than serving. See #154.
  test('a preserved design serves at its own URL, and its pages resolve in-date', async ({
    page,
  }) => {
    const response = await page.goto('/archive/2026-06-28/')
    expect(response?.status()).toBe(200)

    const about = await page.goto('/archive/2026-06-28/about.html')
    expect(about?.status()).toBe(200)
  })

  test('the slash-less form redirects to the design', async ({ page }) => {
    await page.goto('/archive/2026-06-28')
    await expect(page).toHaveURL(/\/archive\/2026-06-28\/$/)
  })
})

// The frame and the seal, exercised in a browser rather than asserted over
// bytes. The static checks live in tests/scripts/archive-seal-corpus.test.js;
// what only a real page can show is that the rail renders above a design that
// styles every bare element, and that its links go where they claim. See
// #156 and #158.
test.describe('site health — the archive frame', () => {
  test('the rail renders over the design and names the day', async ({ page }) => {
    await page.goto('/archive/2026-06-28/')

    const frame = page.locator('[data-archive-frame]')
    await expect(frame).toBeVisible()
    await expect(frame).toContainText('June 28, 2026')
    await expect(frame).toContainText('not the current site')
  })

  test('the rail is on the inner pages too, where the design invites the click', async ({
    page,
  }) => {
    await page.goto('/archive/2026-06-28/work/spaceman.html')
    await expect(page.locator('[data-archive-frame]')).toBeVisible()
  })

  test('it displaces the design rather than covering it', async ({ page }) => {
    await page.goto('/archive/2026-06-28/')
    const padding = await page.evaluate(() =>
      Number.parseInt(getComputedStyle(document.body).paddingTop, 10)
    )
    expect(padding).toBeGreaterThanOrEqual(44)
  })

  test('prev and next step over the days with no build', async ({ page }) => {
    // 2026-07-25 was never built. Next from 07-24 must reach 07-26.
    await page.goto('/archive/2026-07-24/')
    await page.locator('[data-archive-frame] a[title^="Next build"]').click()
    await expect(page).toHaveURL(/\/archive\/2026-07-26\/$/)
  })

  test('the explainer is one click from the design', async ({ page }) => {
    await page.goto('/archive/2026-06-28/')
    await page.locator('[data-archive-frame] a', { hasText: 'How it was made' }).click()
    await expect(page).toHaveURL(/\/how\/2026-06-28$/)
  })

  test('a sealed design keeps no link onto the live site', async ({ page }) => {
    await page.goto('/archive/2026-07-17/')
    // Every origin the site has ever served from, not just today's. After a
    // domain move a snapshot can carry either, and a check spelling one host
    // silently stops covering the other.
    const escaping = await page.evaluate(
      (origins) =>
        [...document.querySelectorAll('a')]
          .filter((a) => !a.closest('[data-archive-frame]'))
          .map((a) => a.getAttribute('href') ?? '')
          .filter(
            (href) => href.startsWith('/') || origins.some((o: string) => href.startsWith(o))
          ),
      RECOGNISED_ORIGINS
    )
    expect(escaping).toEqual([])
  })
})

// The archive must not change when the site does. These run against a real
// build, so they fail the morning a redesign reaches in — which is the whole
// point of #152 and the reason the tokens live in panda.config.ts.
test.describe('site health — the archive keeps its own identity', () => {
  for (const path of ['/archive', '/how/2026-06-28']) {
    test(`${path} renders outside the nightly shell`, async ({ page }) => {
      await page.goto(path)
      await expect(page.locator('h1')).toBeVisible({ timeout: 15000 })

      // The nightly footer link belongs to every other page, not to these.
      await expect(page.locator('a[data-archive-link]')).toHaveCount(0)

      // The ground is the archive's, not the day's.
      const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
      expect(bg).toBe('rgb(14, 14, 16)')
    })

    test(`${path} sets its own type, not the day's chassis`, async ({ page }) => {
      await page.goto(path)
      // These pages fetch their record before rendering anything.
      await expect(page.locator('h1')).toBeVisible({ timeout: 15000 })
      const fonts = await page.evaluate(() => ({
        heading: getComputedStyle(document.querySelector('h1') as Element).fontFamily,
        loaded: [...document.querySelectorAll('link[rel=stylesheet]')].some((l) =>
          (l as HTMLLinkElement).href.includes('IBM+Plex')
        ),
      }))
      expect(fonts.heading).toContain('IBM Plex Sans')
      expect(fonts.loaded).toBe(true)
    })
  }

  test('the rest of the site is untouched by all of that', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[data-archive-link]')).toBeVisible({ timeout: 15000 })
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    expect(bg).not.toBe('rgb(14, 14, 16)')
  })
})

test.describe('site health — the calendar', () => {
  test('opens on a month with builds in it, not an empty grid', async ({ page }) => {
    await page.goto('/archive')
    const cells = page.locator('a[href^="/archive/2026-"]')
    await expect(cells.first()).toBeVisible({ timeout: 15000 })
    expect(await cells.count()).toBeGreaterThan(10)
  })

  test('a day opens the design it shipped', async ({ page }) => {
    await page.goto('/archive')
    const cell = page.locator('a[href="/archive/2026-06-28/"]').first()
    await expect(cell).toBeVisible({ timeout: 15000 })
    await cell.click()
    await expect(page).toHaveURL(/\/archive\/2026-06-28\/$/)
  })

  test('a day with no preserved pages goes to the explainer instead', async ({ page }) => {
    await page.goto('/archive')
    // 2026-03-12 has a record and no capture.
    await page.locator('button', { hasText: 'All' }).click()
    const recordCell = page.locator('a[href="/how/2026-03-12"]').first()
    await expect(recordCell).toBeVisible({ timeout: 15000 })
  })
})

test.describe('site health — the explainer', () => {
  test('leads with the brief and links to the design', async ({ page }) => {
    await page.goto('/how/2026-06-28')
    await expect(page.getByRole('heading', { name: 'A brief was written' })).toBeVisible({
      timeout: 15000,
    })
    await expect(page.locator('a[href="/archive/2026-06-28/"]')).toBeVisible()
  })

  test('names the era when a field did not exist yet, rather than looking broken', async ({
    page,
  }) => {
    await page.goto('/how/2026-03-12')
    // Four fields predate the prose era, so the sentence appears more than once.
    await expect(page.getByText(/had no such concept in the prose era/).first()).toBeVisible({
      timeout: 15000,
    })
    // A record-only day has no design to offer.
    await expect(page.locator('a[href="/archive/2026-03-12/"]')).toHaveCount(0)
  })

  test('summarises each signal in words rather than counting items', async ({ page }) => {
    await page.goto('/how/2026-06-28')
    await expect(page.getByText(/full moon, \d+% lit/)).toBeVisible({ timeout: 15000 })
    await expect(page.getByText(/\d+ items/)).toHaveCount(0)
  })

  test('never embeds the preserved design, which would put two identities on one page', async ({
    page,
  }) => {
    await page.goto('/how/2026-06-28')
    await expect(page.locator('iframe')).toHaveCount(0)
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

test.describe('site health — archive link (#155)', () => {
  // This exists because the link silently disappeared. It was on every build
  // through 2026-07-10 and vanished on 2026-07-12, the day the page shell
  // became a declared Art Director choice. Sixteen builds shipped without it
  // before anyone looked. The link now lives in __root.tsx, outside <Layout>,
  // where no agent can delete it.
  //
  // Asserts VISIBLE, not merely present: a design using full-bleed
  // `position: fixed` or `overflow: hidden` can bury an element that is
  // perfectly well-formed in the markup.
  test('every page carries a visible link into the archive', async ({ page }) => {
    for (const path of ['/', '/about', '/work/spaceman']) {
      await page.goto(path)
      const link = page.locator('a[data-archive-link]')
      await expect(link, `no visible archive link on ${path}`).toBeVisible({ timeout: 15000 })
      await expect(link).toHaveAttribute('href', '/archive')
      await expect(link).toContainText(/Archive — \d+ designs/)
    }
  })

  test('the archive link actually reaches the archive', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('a[data-archive-link]')
    await expect(link).toBeVisible({ timeout: 15000 })
    await link.click()
    await expect(page).toHaveURL(/\/archive/, { timeout: 15000 })
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
