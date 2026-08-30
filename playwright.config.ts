import { defineConfig, devices } from '@playwright/test'

const DEV_PORT = 3001
const DEV_URL = `http://localhost:${DEV_PORT}`
const PREVIEW_PORT = Number(process.env.PREVIEW_PORT || 4173)

// A PREVIEW_URL supplied from outside (a Vercel deploy) means something else is
// already serving the site, so Playwright must not start a server of its own.
// Otherwise it runs `vite preview` itself — CI used to background that command
// and `sleep 5`, which is a race dressed up as a wait.
const externalPreview = Boolean(process.env.PREVIEW_URL)
const PREVIEW_URL = process.env.PREVIEW_URL || `http://localhost:${PREVIEW_PORT}`

// `vite preview` serves dist/, so a run needs a build first — CI builds in the
// step before, and locally `pnpm build` is the prerequisite.
const previewServer = {
  command: `pnpm exec vite preview --port ${PREVIEW_PORT}`,
  port: PREVIEW_PORT,
  reuseExistingServer: !process.env.CI,
  timeout: 120000,
}

const devServer = {
  command: `pnpm exec vite --port ${DEV_PORT}`,
  port: DEV_PORT,
  reuseExistingServer: true,
  timeout: 60000,
}

const webServer = [
  ...(externalPreview ? [] : [previewServer]),
  // Dev server is only for the dev-panel project, which does not run in CI.
  ...(process.env.CI ? [] : [devServer]),
]

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    trace: 'on-first-retry',
  },
  webServer: webServer.length ? webServer : undefined,
  projects: [
    {
      name: 'site-health',
      testMatch: '**/site-health.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: PREVIEW_URL,
      },
    },
    // Dev-panel tests are local-only — the /dev route is infrastructure, not deployed
    ...(process.env.CI
      ? []
      : [
          {
            name: 'dev-panel',
            testMatch: [
              '**/dev-panel.spec.ts',
              '**/dev-responsive-panel.spec.ts',
              '**/dev-responsive-trend.spec.ts',
            ],
            use: {
              ...devices['Desktop Chrome'],
              baseURL: DEV_URL,
            },
          },
        ]),
  ],
})
