import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { Tabs } from '@base-ui/react/tabs'
import { css } from '../../styled-system/css'
import { fetchStatus, type PanelStatus } from '../components/panel/api'
import { RateTab } from '../components/panel/RateTab'
import { ArchiveTab } from '../components/panel/ArchiveTab'
import { WeightsTab } from '../components/panel/WeightsTab'
import { RunTab } from '../components/panel/RunTab'

// Theme-proof reset: /panel inherits the site's daily-changing theme tokens
// (fonts, colors, type scale), which the pipeline redesigns every day. Raw
// CSS values here (not theme tokens) keep the panel legible and stable
// regardless of what today's theme looks like.
const panelReset = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#1a1a1a',
  backgroundColor: '#ffffff',
} as const

export const Route = createFileRoute('/panel')({
  component: PanelPage,
})

function PanelPage() {
  const [status, setStatus] = useState<PanelStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    fetchStatus().then(setStatus).catch((err: unknown) => {
      setError(err instanceof Error ? err.message : 'Failed to load')
    })
  }, [])
  useEffect(load, [load])

  if (error) return <main className={css(panelReset, { padding: '8' })}>{error}</main>
  if (!status) return <main className={css(panelReset, { padding: '8' })}>Loading…</main>

  return (
    <main className={css(panelReset, { maxWidth: '640px', margin: '0 auto', padding: '6' })}>
      <h1 className={css({ fontSize: '24px', marginBottom: '4' })}>Owner Panel</h1>
      <Tabs.Root defaultValue="rate">
        <Tabs.List className={css({ display: 'flex', gap: '4', marginBottom: '6' })}>
          <Tabs.Tab value="rate">Rate</Tabs.Tab>
          <Tabs.Tab value="archive">Archive</Tabs.Tab>
          <Tabs.Tab value="weights">Weights</Tabs.Tab>
          <Tabs.Tab value="run">Run</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="rate"><RateTab unrated={status.unrated} onRated={load} /></Tabs.Panel>
        <Tabs.Panel value="archive"><ArchiveTab /></Tabs.Panel>
        <Tabs.Panel value="weights"><WeightsTab initial={status.weights} /></Tabs.Panel>
        <Tabs.Panel value="run"><RunTab latestRun={status.latestRun} onTriggered={load} /></Tabs.Panel>
      </Tabs.Root>
    </main>
  )
}
