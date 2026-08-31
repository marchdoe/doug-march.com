import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { archiveStaticPlugin, browserStorageContextStub, devPanelPlugin } from './app/dev-server'

// The dev panel's HTTP surface — /dev, its data endpoints, the pipeline
// runner — lives in app/dev-server/. This file is the Vite config.

export default defineConfig({
  plugins: [
    archiveStaticPlugin(),
    devPanelPlugin(),
    browserStorageContextStub(),
    tanstackStart({
      srcDirectory: 'app',
      spa: {},
    }),
    // React Refresh runtime for dev mode. Without this, TanStack Start's dev
    // client entry 500s (/@react-refresh unresolved) and every TanStack route
    // renders shell-only under `vite dev` — the "blank content area" noted in
    // the 2026-08-05 deps-update evidence. Production builds were unaffected.
    react(),
  ],
})
