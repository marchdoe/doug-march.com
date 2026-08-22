import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { Tabs } from '@base-ui/react/tabs'
import {
  page,
  sheet,
  pageTitle,
  segTabs,
  segTab,
  errorText,
  mutedText,
} from '../components/panel/styles'
import { fetchStatus, type PanelStatus } from '../components/panel/api'
import { RateTab } from '../components/panel/RateTab'
import { ArchiveTab } from '../components/panel/ArchiveTab'
import { WeightsTab } from '../components/panel/WeightsTab'
import { RunTab } from '../components/panel/RunTab'

export const Route = createFileRoute('/panel')({
  component: PanelPage,
})

function PanelPage() {
  const [status, setStatus] = useState<PanelStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    fetchStatus()
      .then(setStatus)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load')
      })
  }, [])
  useEffect(load, [load])

  if (error) {
    return (
      <main className={page}>
        <div className={sheet}>
          <h1 className={pageTitle}>Owner Panel</h1>
          <p role="alert" className={errorText}>
            {error}
          </p>
        </div>
      </main>
    )
  }
  if (!status) {
    return (
      <main className={page}>
        <div className={sheet}>
          <h1 className={pageTitle}>Owner Panel</h1>
          <p className={mutedText}>Loading…</p>
        </div>
      </main>
    )
  }

  return (
    <main className={page}>
      <div className={sheet}>
        <h1 className={pageTitle}>Owner Panel</h1>
        <Tabs.Root defaultValue="rate">
          <Tabs.List className={segTabs}>
            <Tabs.Tab value="rate" className={segTab}>
              Rate
            </Tabs.Tab>
            <Tabs.Tab value="archive" className={segTab}>
              Archive
            </Tabs.Tab>
            <Tabs.Tab value="weights" className={segTab}>
              Weights
            </Tabs.Tab>
            <Tabs.Tab value="run" className={segTab}>
              Run
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="rate">
            <RateTab unrated={status.unrated} onRated={load} />
          </Tabs.Panel>
          <Tabs.Panel value="archive">
            <ArchiveTab />
          </Tabs.Panel>
          <Tabs.Panel value="weights">
            <WeightsTab initial={status.weights} />
          </Tabs.Panel>
          <Tabs.Panel value="run">
            <RunTab latestRun={status.latestRun} onTriggered={load} />
          </Tabs.Panel>
        </Tabs.Root>
      </div>
    </main>
  )
}
