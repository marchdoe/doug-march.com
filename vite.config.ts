import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

// @tanstack/start-storage-context uses AsyncLocalStorage (Node-only) and has no browser
// export conditions. Alias it to a no-op stub for the client build so the /dev route
// doesn't crash in the browser. SSR builds use the real package (Node provides async_hooks).
function browserStorageContextStub() {
  const stubPath = resolve('./app/stubs/start-storage-context.ts')
  return {
    name: 'browser-storage-context-stub',
    resolveId(id: string, _importer: string | undefined, opts: { ssr?: boolean } = {}) {
      if (!opts.ssr && id === '@tanstack/start-storage-context') {
        return stubPath
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    browserStorageContextStub(),
    tanstackStart({
      srcDirectory: 'app',
    }),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
  ],
})
