import { createFileRoute, notFound } from '@tanstack/react-router'
import { ResponsiveTrend } from '../components/responsive-trend'
import { readResponsiveHistory } from '../server/archive'

export const Route = createFileRoute('/dev/responsive')({
  beforeLoad: () => {
    if (import.meta.env.PROD) {
      throw notFound()
    }
  },
  loader: async () => ({
    history: await readResponsiveHistory({ data: { limit: 30 } }),
  }),
  component: ResponsivePage,
})

function ResponsivePage() {
  const { history } = Route.useLoaderData()
  return (
    <div style={{ padding: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: '#0e1014', color: '#dce0e6', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 14, marginBottom: 16 }}>Responsive — last 30 builds</h1>
      <ResponsiveTrend history={history} />
    </div>
  )
}
