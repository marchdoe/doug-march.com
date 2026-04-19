// app/routes/dev.tsx
import { createFileRoute, notFound, Outlet, useMatch } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { readSignals, saveOverrides } from '../server/signals'
import { readArchive, readArchiveDetail, type ArchiveEntry } from '../server/archive'

export const Route = createFileRoute('/dev')({
  beforeLoad: () => {
    // The dev panel is a local-only admin interface. It reads archive
    // and signal data, spawns the pipeline, and saves overrides. None
    // of that should be reachable in production.
    if (import.meta.env.PROD) {
      throw notFound()
    }
  },
  loader: async () => {
    const [signals, archive] = await Promise.all([
      readSignals(),
      readArchive(),
    ])
    return { signals, archive }
  },
  component: DevPanel,
})

// ─── Types ────────────────────────────────────────────────────────────────────

interface Signals {
  date: string
  weather?: { location: string; conditions: string; feel: string }
  sports?: Array<{ team: string; result: string; notes?: string }>
  golf?: string[]
  github_trending?: Array<{ repo: string; description: string; stars?: number }>
  news?: string[]
  mood_override?: string | null
  notes?: string | null
}

type PipelineStatus = 'idle' | 'running' | 'success' | 'error'
type PaneName = 'pipeline' | 'archive' | 'inspector' | 'run'

interface Phase {
  label: string
  pattern: string
  status: 'pending' | 'active' | 'done'
}

const INITIAL_PHASES: Phase[] = [
  { label: 'Read signals',    pattern: '[1/4] Reading site context', status: 'pending' },
  { label: 'Build prompt',    pattern: '[2/4] Building Claude prompt', status: 'pending' },
  { label: 'Claude thinking', pattern: 'calling Claude API', status: 'pending' },
  { label: 'Write files',     pattern: 'writing files', status: 'pending' },
  { label: 'Build & validate',pattern: 'running pnpm build', status: 'pending' },
  { label: 'Archive & commit',pattern: '=== Build passed!', status: 'pending' },
]

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  // Layout shell
  page: {
    fontFamily: '"Space Mono", "Courier New", monospace',
    fontSize: '13px',
    color: '#e0e6ed',
    background: '#0e1117',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  } as React.CSSProperties,
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    borderBottom: '1px solid #1e2633',
    background: '#0e1117',
    flexShrink: 0,
  } as React.CSSProperties,
  layout: {
    display: 'grid',
    gridTemplateColumns: '190px 1fr',
    flex: 1,
    overflow: 'hidden',
  } as React.CSSProperties,
  sidebar: {
    background: '#0e1117',
    borderRight: '1px solid #1e2633',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '8px',
    overflow: 'hidden',
  } as React.CSSProperties,
  navItem: {
    padding: '10px 20px',
    fontSize: '12px',
    fontFamily: '"Space Mono", monospace',
    color: '#6b7b8d',
    cursor: 'pointer',
    borderLeft: '2px solid transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'none',
    border: 'none',
    borderLeftWidth: '2px',
    borderLeftStyle: 'solid' as const,
    borderLeftColor: 'transparent',
    width: '100%',
    textAlign: 'left' as const,
  } as React.CSSProperties,
  navItemActive: {
    color: '#22d3ee',
    borderLeftColor: '#22d3ee',
    background: 'rgba(34,211,238,0.05)',
  } as React.CSSProperties,
  content: {
    overflow: 'auto',
    padding: '24px 28px',
  } as React.CSSProperties,

  // Existing component styles (dark theme)
  title: { fontSize: '15px', fontWeight: 700, color: '#e0e6ed', margin: 0, fontFamily: '"Space Mono", monospace' } as React.CSSProperties,
  meta: { fontSize: '12px', color: '#6b7b8d', marginTop: '0' } as React.CSSProperties,
  badge: { display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '20px', padding: '4px 10px', fontSize: '11px', fontWeight: 500, fontFamily: '"Space Mono", monospace' } as React.CSSProperties,
  sectionLabel: { fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#6b7b8d', fontFamily: '"Space Mono", monospace' },
  signalsGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px' } as React.CSSProperties,
  signalCard: { background: '#151b23', border: '1px solid #1e2633', borderRadius: '8px', padding: '12px' } as React.CSSProperties,
  signalLabel: { fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#6b7b8d', marginBottom: '6px', fontFamily: '"Space Mono", monospace' },
  signalMain: { fontSize: '12px', fontWeight: 500, color: '#e0e6ed', lineHeight: '1.4' } as React.CSSProperties,
  signalSub: { fontSize: '11px', color: '#8b98a5', marginTop: '2px', lineHeight: '1.3' } as React.CSSProperties,
  overridesRow: { display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'flex-end' } as React.CSSProperties,
  fieldGroup: { display: 'flex', flexDirection: 'column' as const, gap: '5px' },
  fieldLabel: { fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#6b7b8d', fontFamily: '"Space Mono", monospace' },
  select: { border: '1px solid #1e2633', borderRadius: '6px', padding: '7px 10px', fontSize: '12px', color: '#e0e6ed', background: '#151b23', fontFamily: '"Space Mono", monospace', minWidth: '160px' } as React.CSSProperties,
  textarea: { border: '1px solid #1e2633', borderRadius: '6px', padding: '7px 10px', fontSize: '12px', color: '#e0e6ed', background: '#151b23', fontFamily: '"Space Mono", monospace', resize: 'none' as const, height: '56px', width: '340px' } as React.CSSProperties,
  saveBtn: { background: '#151b23', border: '1px solid #1e2633', borderRadius: '6px', padding: '7px 14px', fontSize: '12px', fontWeight: 500, color: '#8b98a5', cursor: 'pointer', height: '34px', fontFamily: '"Space Mono", monospace' } as React.CSSProperties,
}

// ─── Component ────────────────────────────────────────────────────────────────

function DevPanel() {
  const loaderData = Route.useLoaderData()
  const childMatch = useMatch({ from: '/dev/responsive', shouldThrow: false })
  if (childMatch) return <Outlet />
  return <DevPanelBody loaderData={loaderData} />
}

function DevPanelBody({ loaderData }: { loaderData: ReturnType<typeof Route.useLoaderData> }) {
  const { signals: initialSignals, archive } = loaderData
  const signals = initialSignals as Signals

  const [activePane, setActivePane] = useState<PaneName>('pipeline')
  const [traceSteps, setTraceSteps] = useState<any[]>([])

  const [moodOverride, setMoodOverride] = useState<string>(signals.mood_override ?? '')
  const [notes, setNotes] = useState<string>(signals.notes ?? '')
  const [savingOverrides, setSavingOverrides] = useState(false)

  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus>('idle')
  const [dryRun, setDryRun] = useState(false)
  const [phases, setPhases] = useState<Phase[]>(INITIAL_PHASES)
  const [logLines, setLogLines] = useState<string[]>([])
  const logAccumRef = useRef<string[]>([])
  const esRef = useRef<EventSource | null>(null)
  const logEndRef = useRef<HTMLDivElement>(null)
  const [attemptNum, setAttemptNum] = useState(1)
  const [result, setResult] = useState<{ brief?: string; timestamp?: string; error?: string } | null>(null)

  // ── EventSource cleanup on unmount ──────────────────────────────────────────
  useEffect(() => {
    return () => { esRef.current?.close() }
  }, [])

  // ── Auto-scroll log pane ────────────────────────────────────────────────────
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logLines])

  // ── Save overrides ──────────────────────────────────────────────────────────
  const handleSaveOverrides = async () => {
    setSavingOverrides(true)
    try {
      await saveOverrides({ data: { moodOverride: moodOverride || null, notes: notes || null } })
    } finally {
      setSavingOverrides(false)
    }
  }

  // ── Run pipeline ────────────────────────────────────────────────────────────
  const handleRun = () => {
    setPipelineStatus('running')
    setPhases(INITIAL_PHASES)
    setLogLines([])
    logAccumRef.current = []
    setAttemptNum(1)
    setResult(null)
    setTraceSteps([])

    const es = new EventSource(`/api/pipeline?dryRun=${dryRun}&mock=true`)
    esRef.current = es

    es.onmessage = (e) => {
      const event = JSON.parse(e.data) as
        | { type: 'log'; line: string }
        | { type: 'done'; success: boolean; error?: string }
        | { type: 'trace'; step: any }

      if (event.type === 'trace') {
        setTraceSteps(prev => [...prev, event.step])
        return
      }

      if (event.type === 'log') {
        const line = event.line
        logAccumRef.current = [...logAccumRef.current, line]
        setLogLines([...logAccumRef.current])

        if (line.includes('--- Attempt')) {
          const match = line.match(/Attempt (\d+)/)
          if (match) setAttemptNum(Number(match[1]))
          setPhases(prev => prev.map((p, i) =>
            i < 2 ? { ...p, status: 'done' } :
            i === 2 ? { ...p, status: 'active' } :
            { ...p, status: 'pending' }
          ))
          return
        }

        setPhases(prev => {
          const matchIdx = prev.findIndex(p => line.includes(p.pattern))
          if (matchIdx === -1) return prev
          return prev.map((p, i) => {
            if (i < matchIdx) return { ...p, status: 'done' }
            if (i === matchIdx) return { ...p, status: 'active' }
            return p
          })
        })
      }

      if (event.type === 'done') {
        es.close()
        if (event.success) {
          setPhases(prev => prev.map(p => ({ ...p, status: 'done' })))
          const briefLine = [...logAccumRef.current].reverse().find(l => l.includes('design_brief:'))
          const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          setPipelineStatus('success')
          setResult({ brief: briefLine?.split('design_brief: ')[1] ?? 'Run complete', timestamp })
        } else {
          setPipelineStatus('error')
          setResult({ error: event.error ?? 'Unknown error' })
        }
      }
    }

    es.onerror = () => {
      es.close()
      setPipelineStatus('error')
      setResult({ error: 'Connection to pipeline server lost' })
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={s.page}>

      {/* Top Bar */}
      <div style={s.topBar}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <span style={s.title}>doug-march.com</span>
          <span style={s.meta}>Daily Redesign &middot; Dev Panel</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={s.badge}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
            dev server running
          </div>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '12px', color: '#22d3ee', textDecoration: 'none', fontFamily: '"Space Mono", monospace' }}
          >
            Open Site &#8599;
          </a>
        </div>
      </div>

      {/* Layout: Sidebar + Content */}
      <div style={s.layout}>

        {/* Sidebar */}
        <nav style={s.sidebar}>
          <div style={{ flex: 1 }}>
            <SidebarItem
              label="Pipeline"
              icon="\u25B6"
              active={activePane === 'pipeline'}
              onClick={() => setActivePane('pipeline')}
            />
            <SidebarItem
              label="Archive"
              icon="\u2630"
              active={activePane === 'archive'}
              onClick={() => setActivePane('archive')}
            />
            <SidebarItem
              label="Prompt Inspector"
              icon="\u{1F50D}"
              active={activePane === 'inspector'}
              onClick={() => setActivePane('inspector')}
            />
          </div>
          <div style={{ borderTop: '1px solid #1e2633', paddingTop: '8px', paddingBottom: '8px' }}>
            <SidebarItem
              label="Run Pipeline"
              icon="\u2699"
              active={activePane === 'run'}
              onClick={() => setActivePane('run')}
              trailing={pipelineStatus === 'running' ? (
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
              ) : undefined}
            />
          </div>
        </nav>

        {/* Content */}
        <div style={s.content}>
          {activePane === 'pipeline' && (
            <PipelinePane
              signals={signals}
              archive={archive as ArchiveEntry[]}
              moodOverride={moodOverride}
              notes={notes}
              savingOverrides={savingOverrides}
              onMoodOverrideChange={setMoodOverride}
              onNotesChange={setNotes}
              onSaveOverrides={handleSaveOverrides}
            />
          )}
          {activePane === 'archive' && (
            <ArchivePane archive={archive as ArchiveEntry[]} />
          )}
          {activePane === 'inspector' && (
            <InspectorPane traceSteps={traceSteps} archive={archive as ArchiveEntry[]} />
          )}
          {activePane === 'run' && (
            <RunPane
              pipelineStatus={pipelineStatus}
              dryRun={dryRun}
              onDryRunChange={setDryRun}
              onRun={handleRun}
              phases={phases}
              logLines={logLines}
              attemptNum={attemptNum}
              result={result}
              logEndRef={logEndRef}
              archive={archive as ArchiveEntry[]}
            />
          )}
        </div>

      </div>
    </div>
  )
}

// ─── Sidebar Item ─────────────────────────────────────────────────────────────

function SidebarItem({ label, icon, active, onClick, trailing }: {
  label: string
  icon: string
  active: boolean
  onClick: () => void
  trailing?: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...s.navItem,
        ...(active ? s.navItemActive : {}),
      }}
    >
      <span style={{ fontSize: '11px' }}>{icon}</span>
      <span>{label}</span>
      {trailing && <span style={{ marginLeft: 'auto' }}>{trailing}</span>}
    </button>
  )
}

// ─── Pipeline Pane ────────────────────────────────────────────────────────────

function PipelinePane({ signals, archive, moodOverride, notes, savingOverrides, onMoodOverrideChange, onNotesChange, onSaveOverrides }: {
  signals: Signals
  archive: ArchiveEntry[]
  moodOverride: string
  notes: string
  savingOverrides: boolean
  onMoodOverrideChange: (v: string) => void
  onNotesChange: (v: string) => void
  onSaveOverrides: () => void
}) {
  const lastRun = archive[0]
  return (
    <>
      {/* Section: Signals */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
        <div style={s.sectionLabel}>// SIGNALS</div>
        <div style={{ fontSize: '11px', color: '#6b7b8d', fontFamily: '"Space Mono", monospace' }} data-testid="signals-date">{signals.date}</div>
      </div>
      <div style={s.signalsGrid} data-testid="signals-grid">
        <SignalCard label="Weather" icon="\u{1F326}\uFE0F"
          main={signals.weather?.location ?? '\u2014'}
          sub={signals.weather ? `${signals.weather.conditions} \u00b7 ${signals.weather.feel}` : ''} />
        <SignalCard label="Sports" icon="\u{1F3C0}"
          main={signals.sports?.[0] ? `${signals.sports[0].team}` : '\u2014'}
          sub={signals.sports?.[0]?.result ?? ''} />
        <SignalCard label="Golf" icon="\u26F3"
          main={signals.golf?.[0]?.slice(0, 30) ?? '\u2014'}
          sub={signals.golf?.[1] ?? ''} />
        <SignalCard label="GitHub" icon="\u2B50"
          main={signals.github_trending?.[0]?.repo ?? '\u2014'}
          sub={`${signals.github_trending?.[0]?.stars?.toLocaleString() ?? '?'} stars`} />
        <SignalCard label="News" icon="\u{1F4F0}"
          main={signals.news?.[0]?.slice(0, 40) ?? '\u2014'}
          sub={signals.news?.[1]?.slice(0, 40) ?? ''} />
      </div>

      {/* Section: Overrides */}
      <div style={{ ...s.sectionLabel, marginBottom: '10px' }}>// OVERRIDES</div>
      <div style={s.overridesRow}>
        <div style={s.fieldGroup}>
          <div style={s.fieldLabel}>Mood Override</div>
          <select style={s.select} value={moodOverride} onChange={e => onMoodOverrideChange(e.target.value)} data-testid="mood-override-input">
            <option value="">— none (Claude decides) —</option>
            <option value="dark">dark</option>
            <option value="celebratory">celebratory</option>
            <option value="tense">tense</option>
            <option value="playful">playful</option>
          </select>
        </div>
        <div style={s.fieldGroup}>
          <div style={s.fieldLabel}>Notes for Claude</div>
          <textarea
            style={s.textarea}
            value={notes}
            onChange={e => onNotesChange(e.target.value)}
            placeholder="Optional extra context, e.g. 'I just got a hole in one'"
          />
        </div>
        <button style={s.saveBtn} onClick={onSaveOverrides} disabled={savingOverrides} data-testid="save-overrides-btn">
          {savingOverrides ? 'Saving...' : 'Save overrides'}
        </button>
      </div>

      {/* Section: Last Run */}
      {lastRun && (
        <>
          <div style={{ ...s.sectionLabel, marginBottom: '10px' }}>// LAST RUN</div>
          <div style={{ background: '#151b23', border: '1px solid #1e2633', borderRadius: '8px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#e0e6ed' }}>{lastRun.date}</span>
              <span style={{ fontSize: '12px', color: '#6b7b8d', fontStyle: 'italic', marginLeft: '12px' }}>{lastRun.brief.slice(0, 80)}{lastRun.brief.length > 80 ? '\u2026' : ''}</span>
            </div>
            {lastRun.filesChanged && lastRun.filesChanged.length > 0 && (
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#6b7b8d', fontFamily: '"Space Mono", monospace' }}>
                {lastRun.filesChanged.length} files
              </span>
            )}
          </div>
        </>
      )}
    </>
  )
}

// ─── Archive Pane ─────────────────────────────────────────────────────────────

function ArchivePane({ archive }: { archive: ArchiveEntry[] }) {
  const [expandedDate, setExpandedDate] = useState<string | null>(null)
  const today = new Date().toISOString().slice(0, 10)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
        <div style={s.sectionLabel}>// ARCHIVE</div>
        <div style={{ fontSize: '11px', color: '#6b7b8d', fontFamily: '"Space Mono", monospace' }}>{archive.length} entries</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {archive.map((entry) => {
          const isToday = entry.date === today
          const isExpanded = expandedDate === entry.date
          return (
            <div key={entry.date}>
              <div
                style={{
                  background: isToday ? 'rgba(34,211,238,0.05)' : '#151b23',
                  border: '1px solid',
                  borderColor: isToday ? 'rgba(34,211,238,0.15)' : '#1e2633',
                  borderRadius: isExpanded ? '8px 8px 0 0' : '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: isExpanded ? '0' : '6px',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 600, color: isToday ? '#22d3ee' : '#e0e6ed', minWidth: '95px', fontFamily: '"Space Mono", monospace' }}>
                  {entry.date}
                </span>
                <span style={{ fontSize: '12px', color: isToday ? '#8b98a5' : '#6b7b8d', fontStyle: 'italic', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {entry.brief}
                </span>
                {entry.filesChanged.length > 0 && (
                  <span style={{ fontSize: '11px', color: '#6b7b8d', fontFamily: '"Space Mono", monospace', flexShrink: 0 }}>
                    {entry.filesChanged.length} files
                  </span>
                )}
                {entry.rationale && (
                  <button
                    onClick={() => setExpandedDate(isExpanded ? null : entry.date)}
                    style={{
                      background: 'none',
                      border: '1px solid #1e2633',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      fontSize: '10px',
                      color: isExpanded ? '#22d3ee' : '#6b7b8d',
                      cursor: 'pointer',
                      fontFamily: '"Space Mono", monospace',
                      flexShrink: 0,
                    }}
                  >
                    {isExpanded ? 'Hide Brief' : 'View Brief'}
                  </button>
                )}
              </div>
              {isExpanded && entry.rationale && (
                <div style={{
                  background: '#0a0e14',
                  border: '1px solid',
                  borderColor: isToday ? 'rgba(34,211,238,0.15)' : '#1e2633',
                  borderTop: 'none',
                  borderRadius: '0 0 8px 8px',
                  padding: '14px 16px',
                  marginBottom: '6px',
                }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.07em', color: '#6b7b8d', marginBottom: '8px', fontFamily: '"Space Mono", monospace' }}>
                    Claude's Rationale
                  </div>
                  <div style={{ fontSize: '12px', color: '#8b98a5', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                    {entry.rationale}
                  </div>
                  {entry.filesChanged.length > 0 && (
                    <>
                      <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.07em', color: '#6b7b8d', marginTop: '14px', marginBottom: '6px', fontFamily: '"Space Mono", monospace' }}>
                        Files Changed
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {entry.filesChanged.map(f => (
                          <span key={f} style={{ fontSize: '11px', color: '#22d3ee', background: 'rgba(34,211,238,0.08)', padding: '2px 8px', borderRadius: '3px', fontFamily: '"Space Mono", monospace' }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

// ─── Inspector Pane ───────────────────────────────────────────────────────────

function InspectorPane({ traceSteps, archive }: { traceSteps: any[], archive: ArchiveEntry[] }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [savedTrace, setSavedTrace] = useState<any[] | null>(null)
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set())

  const loadTrace = async (date: string) => {
    setSelectedDate(date)
    try {
      const detail = await readArchiveDetail({ data: date })
      if (detail?.trace) {
        const parsed = JSON.parse(detail.trace)
        setSavedTrace(parsed.steps || [])
      } else {
        setSavedTrace([])
      }
    } catch {
      setSavedTrace([])
    }
  }

  const displaySteps = selectedDate ? (savedTrace || []) : traceSteps
  const isLive = !selectedDate && traceSteps.length > 0

  const toggleStep = (idx: number) => {
    setExpandedSteps(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  return (
    <>
      <div style={{ ...s.sectionLabel, marginBottom: '16px' }}>// PROMPT INSPECTOR</div>

      {/* Date selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => { setSelectedDate(null); setSavedTrace(null) }}
          style={{
            ...s.saveBtn,
            ...(selectedDate === null ? { color: '#22d3ee', borderColor: '#22d3ee' } : {}),
          }}
        >
          Live
        </button>
        {archive.slice(0, 10).map(entry => (
          <button
            key={entry.date}
            onClick={() => loadTrace(entry.date)}
            style={{
              ...s.saveBtn,
              ...(selectedDate === entry.date ? { color: '#22d3ee', borderColor: '#22d3ee' } : {}),
            }}
          >
            {entry.date}
          </button>
        ))}
      </div>

      {/* Live indicator */}
      {isLive && (
        <div style={{ ...s.badge, marginBottom: '16px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }} />
          streaming {traceSteps.length} steps
        </div>
      )}

      {/* Steps */}
      {displaySteps.length === 0 ? (
        <div style={{ ...s.signalCard, textAlign: 'center' as const, padding: '40px' }}>
          <div style={{ fontSize: '13px', color: '#6b7b8d' }}>
            {selectedDate
              ? 'No trace data available for this build.'
              : 'Run the pipeline to see trace data here.'}
          </div>
        </div>
      ) : (
        displaySteps.map((step: any, i: number) => (
          <TraceStepCard
            key={i}
            step={step}
            index={i}
            expanded={expandedSteps.has(i)}
            onToggle={() => toggleStep(i)}
          />
        ))
      )}
    </>
  )
}

function TraceStepCard({ step, index, expanded, onToggle }: {
  step: any, index: number, expanded: boolean, onToggle: () => void
}) {
  const phaseColors: Record<number, string> = {
    0: '#6b7b8d',
    1: '#22d3ee',
    2: '#a78bfa',
    3: '#f59e0b',
    4: '#4ade80',
  }
  const phaseNames: Record<number, string> = {
    0: 'SETUP',
    1: 'DIRECTION',
    2: 'TOKENS',
    3: 'DESIGN',
    4: 'VALIDATION',
  }
  const color = phaseColors[step.phase] || '#6b7b8d'

  return (
    <div
      style={{
        background: '#151b23',
        border: '1px solid #1e2633',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '8px',
        cursor: 'pointer',
        borderLeft: `3px solid ${color}`,
      }}
      onClick={onToggle}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '9px', color, fontWeight: 700,
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.05em',
            background: `${color}15`,
            padding: '2px 6px',
            borderRadius: '3px',
          }}>
            {phaseNames[step.phase] || `P${step.phase}`}
          </span>
          <span style={{ fontSize: '13px', color: '#e0e6ed', fontWeight: 600 }}>
            {step.name}
          </span>
          {step.durationMs > 0 && (
            <span style={{ fontSize: '11px', color: '#6b7b8d' }}>
              {step.durationMs > 60000
                ? `${(step.durationMs / 60000).toFixed(1)}m`
                : step.durationMs > 1000
                ? `${(step.durationMs / 1000).toFixed(1)}s`
                : `${step.durationMs}ms`}
            </span>
          )}
        </div>
        <span style={{ fontSize: '11px', color: '#6b7b8d' }}>
          {expanded ? '▾' : '▸'}
        </span>
      </div>

      {expanded && (
        <div style={{ marginTop: '12px' }}>
          {step.input && Object.keys(step.input).length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#6b7b8d', fontFamily: '"Space Mono", monospace', marginBottom: '4px' }}>INPUT</div>
              <pre style={{
                fontSize: '11px', color: '#8b98a5', background: '#0e1117',
                padding: '8px', borderRadius: '4px', overflow: 'auto',
                maxHeight: '200px', whiteSpace: 'pre-wrap' as const, margin: 0,
                fontFamily: '"Space Mono", monospace',
              }}>
                {JSON.stringify(step.input, null, 2)}
              </pre>
            </div>
          )}
          {step.output && Object.keys(step.output).length > 0 && (
            <div>
              <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#6b7b8d', fontFamily: '"Space Mono", monospace', marginBottom: '4px' }}>OUTPUT</div>
              <pre style={{
                fontSize: '11px', color: '#8b98a5', background: '#0e1117',
                padding: '8px', borderRadius: '4px', overflow: 'auto',
                maxHeight: '300px', whiteSpace: 'pre-wrap' as const, margin: 0,
                fontFamily: '"Space Mono", monospace',
              }}>
                {JSON.stringify(step.output, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Run Pane ─────────────────────────────────────────────────────────────────

function RunPane({ pipelineStatus, dryRun, onDryRunChange, onRun, phases, logLines, attemptNum, result, logEndRef, archive }: {
  pipelineStatus: PipelineStatus
  dryRun: boolean
  onDryRunChange: (v: boolean) => void
  onRun: () => void
  phases: Phase[]
  logLines: string[]
  attemptNum: number
  result: { brief?: string; timestamp?: string; error?: string } | null
  logEndRef: React.RefObject<HTMLDivElement | null>
  archive: ArchiveEntry[]
}) {
  return (
    <>
      <div style={{ ...s.sectionLabel, marginBottom: '16px' }}>// RUN PIPELINE</div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={onRun}
          disabled={pipelineStatus === 'running'}
          data-testid="run-pipeline-btn"
          style={{
            background: pipelineStatus === 'running' ? '#1e2633' : '#22d3ee',
            color: pipelineStatus === 'running' ? '#6b7b8d' : '#0e1117',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: pipelineStatus === 'running' ? 'default' : 'pointer',
            fontFamily: '"Space Mono", monospace',
          }}
        >
          {pipelineStatus === 'running' ? 'Running...' : 'Run Pipeline'}
        </button>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7b8d', fontFamily: '"Space Mono", monospace' }}>
          <input type="checkbox" checked={dryRun} onChange={e => onDryRunChange(e.target.checked)} />
          Dry run (no commit)
        </label>
      </div>

      {/* Progress tracker - always visible */}
      <ProgressSection phases={phases} logLines={logLines} attemptNum={attemptNum} logEndRef={logEndRef} />

      {/* Success panel */}
      {pipelineStatus === 'success' && result && (
        <SuccessSection
          brief={result.brief ?? ''}
          timestamp={result.timestamp ?? ''}
          attemptNum={attemptNum}
          archive={archive}
        />
      )}

      {/* Error panel */}
      {pipelineStatus === 'error' && result && (
        <ErrorSection error={result.error ?? 'Unknown error'} onRetry={onRun} />
      )}
    </>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SignalCard({ label, icon, main, sub }: { label: string; icon: string; main: string; sub: string }) {
  return (
    <div style={s.signalCard}>
      <div style={s.signalLabel}>{label}</div>
      <div style={{ fontSize: '20px', marginBottom: '5px' }}>{icon}</div>
      <div style={s.signalMain}>{main}</div>
      {sub && <div style={s.signalSub}>{sub}</div>}
    </div>
  )
}

function ProgressSection({ phases, logLines, attemptNum, logEndRef }: { phases: Phase[]; logLines: string[]; attemptNum: number; logEndRef: React.RefObject<HTMLDivElement | null> }) {
  const isRunning = phases.some(p => p.status === 'active')
  return (
    <div style={{ border: '1px solid #1e2633', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
      <div style={{ background: '#151b23', borderBottom: '1px solid #1e2633', padding: '10px 14px', fontSize: '12px', fontWeight: 600, color: '#8b98a5', display: 'flex', justifyContent: 'space-between', fontFamily: '"Space Mono", monospace' }}>
        <span>Pipeline &middot; Attempt {attemptNum} of 3</span>
        {isRunning && <span style={{ color: '#f59e0b' }}>&#9679; running</span>}
        {!isRunning && phases.every(p => p.status === 'done') && <span style={{ color: '#4ade80' }}>&#9679; complete</span>}
        {!isRunning && phases.every(p => p.status === 'pending') && <span style={{ color: '#6b7b8d' }}>&#9679; idle</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
        {/* Phase tracker */}
        <div style={{ padding: '14px', borderRight: '1px solid #1e2633', display: 'flex', flexDirection: 'column', gap: '9px' }}>
          {phases.map(p => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <PhaseDot status={p.status} />
              <span style={{ fontSize: '11px', color: p.status === 'pending' ? '#3d4a5c' : p.status === 'done' ? '#6b7b8d' : '#e0e6ed', fontWeight: p.status === 'active' ? 600 : 400, textDecoration: p.status === 'done' ? 'line-through' : 'none', fontFamily: '"Space Mono", monospace' }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>
        {/* Log pane */}
        <div style={{ background: '#0a0e14', padding: '14px', fontFamily: '"Space Mono", monospace', fontSize: '11px', lineHeight: '1.7', color: '#6b7b8d', minHeight: '180px', maxHeight: '280px', overflowY: 'auto' }}>
          {logLines.length === 0 && (
            <div style={{ color: '#3d4a5c' }}>Waiting for pipeline to start...</div>
          )}
          {logLines.map((line, i) => (
            <div key={i} style={{ color: line.includes('===') || line.includes('calling Claude') ? '#fbbf24' : '#6b7b8d' }}>{line}</div>
          ))}
          {logLines.length > 0 && <span style={{ color: '#22d3ee' }}>&#9612;</span>}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  )
}

function PhaseDot({ status }: { status: 'pending' | 'active' | 'done' }) {
  const base = { width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' } as React.CSSProperties
  if (status === 'done') return <div style={{ ...base, background: '#22c55e', color: 'white' }}>&#10003;</div>
  if (status === 'active') return <div style={{ ...base, background: '#f59e0b' }} />
  return <div style={{ ...base, background: '#1e2633' }} />
}

function SuccessSection({ brief, timestamp, attemptNum, archive }: {
  brief: string
  timestamp: string
  attemptNum: number
  archive: ArchiveEntry[]
}) {
  const today = new Date().toISOString().slice(0, 10)
  return (
    <div style={{ border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', background: 'rgba(34,197,94,0.05)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(34,197,94,0.15)' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>&#10003;</div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#4ade80' }}>Build passed &middot; committed</div>
          <div style={{ fontSize: '12px', color: '#6b7b8d', fontStyle: 'italic' }}>"{brief}"</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '11px', color: '#4ade80', textAlign: 'right' as const, fontFamily: '"Space Mono", monospace' }}>
          {timestamp} &middot; {attemptNum} attempt{attemptNum !== 1 ? 's' : ''}
        </div>
        <button
          onClick={() => window.open('http://localhost:3000', '_blank')}
          style={{ background: '#22c55e', color: '#0e1117', border: 'none', borderRadius: '5px', padding: '5px 12px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', flexShrink: 0, fontFamily: '"Space Mono", monospace' }}
        >
          Open site &#8599;
        </button>
      </div>
      <div style={{ padding: '10px 16px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#6b7b8d', marginBottom: '8px', fontFamily: '"Space Mono", monospace' }}>Recent designs</div>
        {archive.map((entry, i) => {
          const isToday = entry.date === today
          return (
            <div key={entry.date} style={{ display: 'flex', gap: '10px', padding: '6px 0', borderBottom: i < archive.length - 1 ? '1px solid rgba(34,197,94,0.1)' : 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: isToday ? 700 : 600, color: isToday ? '#22d3ee' : '#4ade80', minWidth: '85px', fontFamily: '"Space Mono", monospace' }}>
                {entry.date}{isToday ? ' *' : ''}
              </span>
              <span style={{ fontSize: '11px', color: isToday ? '#e0e6ed' : '#6b7b8d', fontStyle: 'italic', fontWeight: isToday ? 600 : 400 }}>{entry.brief}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ErrorSection({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div style={{ border: '1px solid rgba(220,38,38,0.3)', borderRadius: '8px', background: 'rgba(220,38,38,0.05)', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <div style={{ color: '#ef4444', fontSize: '18px', flexShrink: 0 }}>&#10005;</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#ef4444', marginBottom: '4px' }}>Pipeline failed</div>
        <div style={{ fontSize: '11px', color: '#f87171', fontFamily: '"Space Mono", monospace' }}>{error}</div>
      </div>
      <button
        onClick={onRetry}
        style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '7px 14px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', flexShrink: 0, fontFamily: '"Space Mono", monospace' }}
      >
        Retry
      </button>
    </div>
  )
}
