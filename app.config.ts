import { defineConfig } from '@tanstack/start/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { devtools } from '@tanstack/devtools-vite'

export default defineConfig({
  vite: {
    plugins: [
      devtools(),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
    ],
  },
})
