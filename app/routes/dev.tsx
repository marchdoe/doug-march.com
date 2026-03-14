// app/routes/dev.tsx
import { createFileRoute } from '@tanstack/react-router'
import { readSignals } from '../server/signals'
import { readArchive } from '../server/archive'

export const Route = createFileRoute('/dev')({
  loader: async () => {
    const [signals, archive] = await Promise.all([
      readSignals(),
      readArchive(),
    ])
    return { signals, archive }
  },
  component: DevPanel,
})

function DevPanel() {
  const { signals, archive } = Route.useLoaderData()

  return (
    <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif', maxWidth: '900px' }}>
      <h1>Daily Redesign</h1>
      <pre style={{ fontSize: '11px' }}>{JSON.stringify({ signals, archive }, null, 2)}</pre>
    </div>
  )
}
