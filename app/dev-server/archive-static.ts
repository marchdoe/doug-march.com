import { existsSync, readFileSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

// Serve preserved designs the way production does (#154).
//
// A preserved design's URL must end in a slash: every snapshot links its own
// pages document-relative (`about.html`, `work/*.html`), and the browser
// resolves those against the directory. Vite's static middleware does the
// opposite — it 307s `/archive/<date>/` to the slash-less form, which then
// falls through to the SPA and 404s. Vercel is configured to redirect the
// other way, so without this the two disagree.
//
// Installed before Vite's own middlewares so it wins the trailing slash, and
// on the preview server too — that is what `pnpm test:e2e` points at locally,
// and a route scheme that only holds in one of the three environments is not
// a scheme.

/**
 * `/archive/<date>` with or without its trailing slash. Exported so a test
 * can hold it against the `redirects` entry in vercel.json: the two encode
 * the same rule and used to be written independently.
 */
export const ARCHIVE_DATE_URL = /^\/archive\/(\d{4}-\d{2}-\d{2})(\/?)$/

/** The date pattern as vercel.json spells it, for the same test. */
export const VERCEL_DATE_SEGMENT = '\\d{4}-\\d{2}-\\d{2}'

export function archiveStaticMiddleware(roots: string[]) {
  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const match = ARCHIVE_DATE_URL.exec((req.url ?? '').split('?')[0])
    if (!match) return next()

    const [, date, trailingSlash] = match
    if (!trailingSlash) {
      res.writeHead(301, { Location: `/archive/${date}/` })
      return res.end()
    }

    const indexPath = roots.map((r) => resolve(r, date, 'index.html')).find((p) => existsSync(p))
    if (!indexPath) return next()
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    return res.end(readFileSync(indexPath))
  }
}

export function archiveStaticPlugin(): Plugin {
  const PUBLIC = resolve('public', 'archive')
  const DIST = resolve('dist', 'client', 'archive')

  // Whichever tree is authoritative for the server doing the serving comes
  // first. Under `vite dev` that is public/ — the pipeline and the seal script
  // write there, and a dist/ left over from an earlier build would otherwise
  // shadow every edit with stale bytes. Under `vite preview` the point is to
  // serve what the build produced, so dist/ wins.
  return {
    name: 'archive-static',
    configureServer(server) {
      server.middlewares.use(archiveStaticMiddleware([PUBLIC, DIST]))
    },
    configurePreviewServer(server) {
      server.middlewares.use(archiveStaticMiddleware([DIST, PUBLIC]))
    },
  }
}
