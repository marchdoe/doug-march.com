import { defineConfig, type Plugin } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'
import { spawn, spawnSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs'
import { config } from 'dotenv'
import yaml from 'js-yaml'

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

// SSE endpoint for the /dev pipeline runner. Spawns scripts/daily-redesign.js
// and streams stdout/stderr as SSE events. Only active in dev mode.
function pipelineApiPlugin(): Plugin {
  config() // load .env
  const scriptPath = resolve('scripts/run-pipeline.js')

  return {
    name: 'pipeline-api',
    configureServer(server) {
      // Serve /dev as a standalone SPA page
      server.middlewares.use('/dev', (req, res, next) => {
        if (req.url && req.url !== '/' && !req.url.startsWith('/?')) return next()
        const htmlPath = resolve('app/dev-panel.html')
        let html = readFileSync(htmlPath, 'utf8')
        server.transformIndexHtml('/dev', html).then(transformed => {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(transformed)
        }).catch(next)
      })

      // API: read signals + archive
      server.middlewares.use('/api/dev-data', (_req, res) => {
        try {
          const signalsPath = resolve('signals/today.yml')

          // Auto-collect signals if today.yml doesn't exist.
          // Uses spawnSync (no shell) with a 15s timeout. This blocks the first
          // /api/dev-data request (~1s typically) but only fires once — after that
          // the file exists and this path is skipped.
          if (!existsSync(signalsPath)) {
            console.log('[dev-data] today.yml missing — auto-collecting signals...')
            const result = spawnSync('node', [resolve('scripts/collect-signals.js')], {
              cwd: resolve('.'),
              timeout: 15000,
              stdio: 'inherit',
            })
            if (result.status !== 0) {
              console.error('[dev-data] auto-collect failed (exit code %d)', result.status)
            }
          }

          let signals: Record<string, unknown> | null = null
          if (existsSync(signalsPath)) {
            const raw = readFileSync(signalsPath, 'utf8')
            signals = yaml.load(raw) as Record<string, unknown>
            if (signals.date instanceof Date) {
              signals.date = (signals.date as Date).toISOString().slice(0, 10)
            }
          }

          const archiveDir = resolve('archive')
          const archive: Array<{ date: string; brief: string }> = []
          if (existsSync(archiveDir)) {
            const dirs = readdirSync(archiveDir).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort().reverse()
            for (const dir of dirs) {
              const briefPath = resolve('archive', dir, 'brief.md')
              if (existsSync(briefPath)) {
                const md = readFileSync(briefPath, 'utf8')
                const briefMatch = md.match(/\*\*Design Brief:\*\*\s*(.+)/)
                archive.push({ date: dir, brief: briefMatch?.[1] ?? '' })
              }
            }
          }

          // Read signal collection meta if available
          const metaPath = resolve('signals/today.meta.yml')
          let meta = null
          if (existsSync(metaPath)) {
            const metaRaw = readFileSync(metaPath, 'utf8')
            meta = yaml.load(metaRaw) as Record<string, unknown>
          }

          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ signals, archive, meta }))
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: String(err) }))
        }
      })

      // API: save overrides to signals YAML
      server.middlewares.use('/api/dev-overrides', (req, res) => {
        if (req.method !== 'POST') { res.writeHead(405); res.end(); return }
        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', () => {
          try {
            const { moodOverride, notes } = JSON.parse(body)
            const signalsPath = resolve('signals/today.yml')
            let content = readFileSync(signalsPath, 'utf8')
            content = content.replace(/^mood_override:.*$/m, `mood_override: ${moodOverride ? `"${moodOverride}"` : 'null'}`)
            if (notes) {
              if (content.includes('notes:')) {
                content = content.replace(/^notes:.*$/m, `notes: "${notes}"`)
              } else {
                content += `\nnotes: "${notes}"\n`
              }
            }
            writeFileSync(signalsPath, content, 'utf8')
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: String(err) }))
          }
        })
      })

      // SSE: run pipeline
      // In local mode (mock=true): uses `claude` CLI with Max plan subscription
      // In production mode: uses Anthropic API directly
      server.middlewares.use('/api/pipeline', (req, res) => {
        const url = new URL(req.url ?? '', `http://${req.headers.host}`)
        const dryRun = url.searchParams.get('dryRun') === 'true'
        const useMock = url.searchParams.get('mock') !== 'false'

        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        })

        const send = (data: object) => {
          res.write(`data: ${JSON.stringify(data)}\n\n`)
        }

        // Both modes use the same pipeline script — MOCK_MODE controls
        // whether it calls claude CLI (Max plan) or the Anthropic API
        const pipelineEnv = { ...process.env, DRY_RUN: dryRun ? 'true' : 'false', MOCK_MODE: useMock ? 'true' : 'false' }
        // Strip API key in mock mode so claude CLI uses Max plan subscription
        if (useMock) delete pipelineEnv.ANTHROPIC_API_KEY

        const child = spawn('node', [scriptPath], {
          env: pipelineEnv,
          cwd: process.cwd(),
        })

        const handleData = (chunk: Buffer) => {
          const lines = chunk.toString().split('\n').filter((l: string) => l.trim())
          for (const line of lines) {
            send({ type: 'log', line })
          }
        }

        child.stdout.on('data', handleData)
        child.stderr.on('data', handleData)

        child.on('close', (code) => {
          send({ type: 'done', success: code === 0, ...(code !== 0 ? { error: `Process exited with code ${code}` } : {}) })
          res.end()
        })

        child.on('error', (err) => {
          send({ type: 'done', success: false, error: err.message })
          res.end()
        })

        req.on('close', () => {
          child.kill()
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [
    pipelineApiPlugin(),
    browserStorageContextStub(),
    tanstackStart({
      srcDirectory: 'app',
    }),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
  ],
})
