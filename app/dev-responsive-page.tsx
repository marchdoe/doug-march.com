import { useEffect, useState } from 'react'
import { ResponsiveTrend } from './components/responsive-trend'
import { readResponsiveHistory, type ResponsiveMetrics } from './server/archive'

/**
 * The /dev/responsive page.
 *
 * Mounted by dev-responsive-entry.tsx under the dev server's own HTTP
 * surface (app/dev-server/index.ts), the same way /dev mounts DevPanel — not
 * a router route. A route file here built a chunk (route definition, loader,
 * server-fn client runtime) that Vite bundled and modulepreloaded on every
 * production page even though its beforeLoad refused to render (#328); this
 * way the page, and the import of readResponsiveHistory it needs, exist only
 * where `vite dev`'s configureServer runs, never in a production build.
 */
export function DevResponsivePage() {
  const [history, setHistory] = useState<ResponsiveMetrics[]>([])

  useEffect(() => {
    readResponsiveHistory({ data: { limit: 30 } }).then(setHistory)
  }, [])

  return (
    <div
      style={{
        padding: 16,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 12,
        background: '#0e1014',
        color: '#dce0e6',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ fontSize: 14, marginBottom: 16 }}>Responsive — last 30 builds</h1>
      <ResponsiveTrend history={history} />
    </div>
  )
}
