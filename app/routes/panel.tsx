import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { Tabs } from '@base-ui/react/tabs'
import { css, cx } from '../../styled-system/css'
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
          <SectionAlert message={error} />
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
        <PanelTabs status={status} reload={load} />
      </div>
    </main>
  )
}

function SectionAlert({ message }: { message: string }) {
  return (
    <p role="alert" className={cx(errorText, css({ marginBottom: '12px' }))}>
      {message}
    </p>
  )
}

function RateSection({ status, reload }: { status: PanelStatus; reload: () => void }) {
  if (status.errors.unrated) return <SectionAlert message={status.errors.unrated} />
  return <RateTab unrated={status.unrated} onRated={reload} />
}

function WeightsSection({ status }: { status: PanelStatus }) {
  if (!status.weights)
    return <SectionAlert message={status.errors.weights ?? 'Weights unavailable'} />
  return <WeightsTab initial={status.weights} />
}

function RunSection({ status, reload }: { status: PanelStatus; reload: () => void }) {
  return (
    <>
      {status.errors.latestRun ? <SectionAlert message={status.errors.latestRun} /> : null}
      <RunTab latestRun={status.latestRun} onTriggered={reload} />
    </>
  )
}

/** Each tab renders its own section's error (#334); the rest of the panel stays live. */
function PanelTabs({ status, reload }: { status: PanelStatus; reload: () => void }) {
  return (
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
        <RateSection status={status} reload={reload} />
      </Tabs.Panel>
      <Tabs.Panel value="archive">
        <ArchiveTab />
      </Tabs.Panel>
      <Tabs.Panel value="weights">
        <WeightsSection status={status} />
      </Tabs.Panel>
      <Tabs.Panel value="run">
        <RunSection status={status} reload={reload} />
      </Tabs.Panel>
    </Tabs.Root>
  )
}
