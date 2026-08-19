import { defineConfig, type Plugin } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'
import { spawn, spawnSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs'
import { config } from 'dotenv'
import * as yaml from 'js-yaml'

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

  // Localhost-only guard for all dev API endpoints. The Vite dev server
  // can bind to 0.0.0.0 (via --host), and these endpoints spawn processes
  // with live secrets. Anyone on the network could trigger pipeline runs
  // or write files without this check. DNS-rebinding attacks are also
  // possible without an explicit Origin check.
  const MAX_BODY_SIZE = 64 * 1024  // 64KB limit on request bodies

  function isLocalRequest(req: import('http').IncomingMessage): boolean {
    const addr = req.socket.remoteAddress
    if (!addr) return false
    // IPv4 localhost, IPv6 localhost, IPv4-mapped IPv6 localhost
    if (addr === '127.0.0.1' || addr === '::1' || addr === '::ffff:127.0.0.1') return true
    return false
  }

  function isAllowedOrigin(req: import('http').IncomingMessage): boolean {
    const origin = req.headers.origin || ''
    const host = req.headers.host || ''
    // No origin header means same-origin request (fetch from dev panel itself)
    if (!origin) return true
    try {
      const url = new URL(origin)
      // Allow any localhost:port origin
      return url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '::1'
    } catch {
      return false
    }
  }

  function guardRequest(req: import('http').IncomingMessage, res: import('http').ServerResponse): boolean {
    if (!isLocalRequest(req)) {
      res.writeHead(403, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Forbidden: dev API is localhost-only' }))
      return false
    }
    if (!isAllowedOrigin(req)) {
      res.writeHead(403, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Forbidden: invalid origin' }))
      return false
    }
    return true
  }

  // Read a request body with an enforced size cap to prevent unbounded
  // memory growth from a malicious or buggy client.
  function readBodyLimited(req: import('http').IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      let body = ''
      let total = 0
      req.on('data', (chunk) => {
        total += chunk.length
        if (total > MAX_BODY_SIZE) {
          reject(new Error(`Request body exceeds ${MAX_BODY_SIZE} bytes`))
          req.destroy()
          return
        }
        body += chunk.toString()
      })
      req.on('end', () => resolve(body))
      req.on('error', reject)
    })
  }

  return {
    name: 'pipeline-api',
    configureServer(server) {
      // Serve /dev as a standalone SPA page
      server.middlewares.use('/dev', (req, res, next) => {
        if (!guardRequest(req, res)) return
        if (req.url && req.url !== '/' && !req.url.startsWith('/?')) return next()
        const htmlPath = resolve('app/dev-panel.html')
        let html = readFileSync(htmlPath, 'utf8')
        server.transformIndexHtml('/dev', html).then(transformed => {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(transformed)
        }).catch(next)
      })

      // API: read signals + archive
      server.middlewares.use('/api/dev-data', (req, res) => {
        if (!guardRequest(req, res)) return
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
          const archive: Array<{ date: string; buildId: string; timestamp: number; brief: string; weights?: Record<string, number> }> = []
          if (existsSync(archiveDir)) {
            const dateDirs = readdirSync(archiveDir).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort().reverse()
            for (const dir of dateDirs) {
              const datePath = resolve('archive', dir)
              // Enumerate per-build subdirs (build-{timestamp})
              const buildDirs = readdirSync(datePath)
                .filter(d => /^build-\d+$/.test(d))
                .sort()
                .reverse()
              if (buildDirs.length > 0) {
                for (const buildDir of buildDirs) {
                  const buildJsonPath = resolve('archive', dir, buildDir, 'build.json')
                  const briefPath = resolve('archive', dir, buildDir, 'brief.md')
                  if (existsSync(buildJsonPath)) {
                    try {
                      const meta = JSON.parse(readFileSync(buildJsonPath, 'utf8'))
                      archive.push({ date: dir, buildId: meta.buildId, timestamp: meta.timestamp, brief: meta.brief, weights: meta.weights })
                    } catch {}
                  } else if (existsSync(briefPath)) {
                    // Legacy build dir without build.json
                    const md = readFileSync(briefPath, 'utf8')
                    const briefMatch = md.match(/\*\*Design Brief:\*\*\s*(.+)/)
                    const buildId = buildDir.replace('build-', '')
                    archive.push({ date: dir, buildId, timestamp: parseInt(buildId), brief: briefMatch?.[1] ?? '' })
                  }
                }
              } else {
                // Legacy date-only entry (no build subdirs)
                const briefPath = resolve('archive', dir, 'brief.md')
                if (existsSync(briefPath)) {
                  const md = readFileSync(briefPath, 'utf8')
                  const briefMatch = md.match(/\*\*Design Brief:\*\*\s*(.+)/)
                  archive.push({ date: dir, buildId: '', timestamp: 0, brief: briefMatch?.[1] ?? '' })
                }
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
      server.middlewares.use('/api/dev-overrides', async (req, res) => {
        if (!guardRequest(req, res)) return
        if (req.method !== 'POST') { res.writeHead(405); res.end(); return }
        try {
          const body = await readBodyLimited(req)
          const { moodOverride, notes } = JSON.parse(body)
          const signalsPath = resolve('signals/today.yml')
          const signals = yaml.load(readFileSync(signalsPath, 'utf8')) as Record<string, unknown>
          signals.mood_override = moodOverride ? String(moodOverride) : null
          if (notes) signals.notes = String(notes)
          writeFileSync(signalsPath, yaml.dump(signals, { lineWidth: 120 }), 'utf8')
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ ok: true }))
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: String(err) }))
        }
      })

      // API: re-collect signals
      server.middlewares.use('/api/collect-signals', (req, res) => {
        if (!guardRequest(req, res)) return
        try {
          console.log('[collect-signals] refreshing...')
          spawnSync('node', [resolve('scripts/collect-signals.js')], {
            cwd: resolve('.'),
            timeout: 15000,
            stdio: 'inherit',
          })
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ ok: true }))
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: String(err) }))
        }
      })

      // Pipeline process state — lives in the Vite server, survives HMR page reloads.
      // The child process is decoupled from any single SSE connection so that
      // Vite HMR (triggered when agents write files) doesn't kill the pipeline.
      let pipelineChild: ReturnType<typeof spawn> | null = null
      let pipelineLog: Array<{ type: string; line?: string; success?: boolean; error?: string }> = []
      let pipelineDone = false
      const pipelineListeners = new Set<(data: object) => void>()

      function broadcastPipeline(data: object) {
        pipelineLog.push(data as any)
        for (const listener of pipelineListeners) {
          try { listener(data) } catch {}
        }
      }

      // POST /api/pipeline/start — launch the pipeline (if not already running)
      server.middlewares.use('/api/pipeline/start', async (req, res) => {
        if (!guardRequest(req, res)) return
        if (req.method !== 'POST') { res.writeHead(405); res.end(); return }

        if (pipelineChild && !pipelineDone) {
          res.writeHead(409, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Pipeline already running' }))
          return
        }

        let body: string
        try {
          body = await readBodyLimited(req)
        } catch (err) {
          res.writeHead(413, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: String(err) }))
          return
        }

        let parsed: Record<string, unknown> = {}
        if (body) {
          try { parsed = JSON.parse(body) } catch {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'Invalid JSON' }))
            return
          }
        }
        const { dryRun = false, mock = true, weights = {} } = parsed as { dryRun?: boolean; mock?: boolean; weights?: Record<string, number> }

        // Reset state
        pipelineLog = []
        pipelineDone = false

        const pipelineEnv = {
          ...process.env,
          DRY_RUN: dryRun ? 'true' : 'false',
          MOCK_MODE: mock ? 'true' : 'false',
          WEIGHT_SIGNALS: String(weights.signals ?? 5),
          WEIGHT_INSPIRATION: String(weights.inspiration ?? 5),
          WEIGHT_RATINGS: String(weights.ratings ?? 5),
          WEIGHT_RISK: String(weights.risk ?? 5),
        }
        if (mock) delete pipelineEnv.ANTHROPIC_API_KEY

        pipelineChild = spawn('node', [scriptPath], {
          env: pipelineEnv,
          cwd: process.cwd(),
        })

        const handleData = (chunk: Buffer) => {
          const lines = chunk.toString().split('\n').filter((l: string) => l.trim())
          for (const line of lines) {
            if (line.startsWith('[TRACE] ')) {
              try {
                const step = JSON.parse(line.slice('[TRACE] '.length))
                broadcastPipeline({ type: 'trace', step })
              } catch {
                broadcastPipeline({ type: 'log', line })
              }
            } else {
              broadcastPipeline({ type: 'log', line })
            }
          }
        }

        pipelineChild.stdout!.on('data', handleData)
        pipelineChild.stderr!.on('data', handleData)

        pipelineChild.on('close', (code) => {
          if (pipelineDone) return
          pipelineDone = true
          broadcastPipeline({ type: 'done', success: code === 0, ...(code !== 0 ? { error: `Process exited with code ${code}` } : {}) })
          pipelineChild = null
        })

        pipelineChild.on('error', (err) => {
          if (pipelineDone) return
          pipelineDone = true
          broadcastPipeline({ type: 'done', success: false, error: err.message })
          pipelineChild = null
        })

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ok: true }))
      })

      // GET /api/pipeline — SSE stream. Replays buffered logs then streams live.
      // Clients can reconnect after HMR without losing the pipeline.
      server.middlewares.use('/api/pipeline', (req, res, next) => {
        // Only handle GET (SSE), let POST through to /start
        if (req.method !== 'GET') return next()
        if (!guardRequest(req, res)) return

        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        })

        const send = (data: object) => {
          try { res.write(`data: ${JSON.stringify(data)}\n\n`) } catch {}
        }

        // Replay buffered log so reconnecting clients catch up
        for (const entry of pipelineLog) {
          send(entry)
        }

        // If pipeline already finished, close immediately
        if (pipelineDone || !pipelineChild) {
          res.end()
          return
        }

        // Subscribe to live updates
        pipelineListeners.add(send)

        req.on('close', () => {
          pipelineListeners.delete(send)
          // Do NOT kill the child — let it finish independently
        })
      })

      // Serve archived site snapshots for the preview viewer
      server.middlewares.use('/api/archive-preview', (req, res, next) => {
        if (!guardRequest(req, res)) return
        // URL formats:
        //   /api/archive-preview/2026-03-20/build-123456/index.html  (per-build)
        //   /api/archive-preview/2026-03-16/index.html               (legacy date-level)
        const buildMatch = req.url?.match(/^\/(\d{4}-\d{2}-\d{2})\/(build-\d+)\/(.+)$/)
        const legacyMatch = !buildMatch && req.url?.match(/^\/(\d{4}-\d{2}-\d{2})\/(.+)$/)
        if (!buildMatch && !legacyMatch) { res.writeHead(404); res.end('Not found'); return }

        let fullPath: string
        let filePath: string
        if (buildMatch) {
          const [, date, buildDir, fp] = buildMatch
          filePath = fp
          fullPath = resolve('archive', date, buildDir, 'site', filePath)
        } else {
          const [, date, fp] = legacyMatch!
          filePath = fp
          fullPath = resolve('archive', date, 'site', filePath)
        }

        const archiveBase = resolve('archive')
        if (!fullPath.startsWith(archiveBase + '/')) {
          res.writeHead(403); res.end('Forbidden'); return
        }

        if (!existsSync(fullPath)) {
          res.writeHead(404)
          res.end('Snapshot not found')
          return
        }

        const content = readFileSync(fullPath, 'utf8')
        const ext = filePath.split('.').pop()
        const contentType = ext === 'html' ? 'text/html' : ext === 'css' ? 'text/css' : 'application/octet-stream'
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(content)
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
      spa: {},
    }),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
  ],
})
