import { defineConfig, devices } from '@playwright/test'

const DEV_PORT = 3001
const DEV_URL = `http://localhost:${DEV_PORT}`
const PREVIEW_PORT = Number(process.env.PREVIEW_PORT || 4173)

// A PREVIEW_URL supplied from outside (a Vercel deploy) means something else is
// already serving the site, so Playwright must not start a server of its own.
// Otherwise it runs `vite preview` itself — CI used to background that command
// and `sleep 5`, which is a race dressed up as a wait.
const externalPreview = Boolean(process.env.PREVIEW_URL)

// The dev-panel project drives `vite dev` and the /dev route, which is local
// tooling and not deployed. It stays out of the default CI run; a job that
// wants it sets E2E_DEV=1, and then the dev server and the project both
// come in regardless of CI.
const includeDevProject = !process.env.CI || process.env.E2E_DEV === '1'
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
  ...(includeDevProject ? [devServer] : []),
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
    ...(includeDevProject
      ? [
          {
            name: 'dev-panel',
            testMatch: ['**/dev-panel.spec.ts', '**/dev-responsive-trend.spec.ts'],
            use: {
              ...devices['Desktop Chrome'],
              baseURL: DEV_URL,
            },
          },
        ]
      : []),
  ],
})
