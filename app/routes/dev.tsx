// app/routes/dev.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { readSignals, saveOverrides } from '../server/signals'
import { readArchive, type ArchiveEntry } from '../server/archive'

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
  page: { padding: '28px 32px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '13px', color: '#1e293b', maxWidth: '960px' } as React.CSSProperties,
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' } as React.CSSProperties,
  title: { fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 } as React.CSSProperties,
  meta: { fontSize: '12px', color: '#94a3b8', marginTop: '3px' } as React.CSSProperties,
  badge: { display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '4px 10px', fontSize: '11px', fontWeight: 500 } as React.CSSProperties,
  signalsGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px' } as React.CSSProperties,
  signalCard: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' } as React.CSSProperties,
  signalLabel: { fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#94a3b8', marginBottom: '6px' },
  signalMain: { fontSize: '12px', fontWeight: 500, color: '#1e293b', lineHeight: '1.4' } as React.CSSProperties,
  signalSub: { fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: '1.3' } as React.CSSProperties,
  overridesRow: { display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'flex-end' } as React.CSSProperties,
  fieldGroup: { display: 'flex', flexDirection: 'column' as const, gap: '5px' },
  fieldLabel: { fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#94a3b8' },
  select: { border: '1px solid #e2e8f0', borderRadius: '6px', padding: '7px 10px', fontSize: '12px', color: '#1e293b', background: '#fff', fontFamily: 'inherit', minWidth: '160px' } as React.CSSProperties,
  textarea: { border: '1px solid #e2e8f0', borderRadius: '6px', padding: '7px 10px', fontSize: '12px', color: '#1e293b', background: '#fff', fontFamily: 'inherit', resize: 'none' as const, height: '56px', width: '340px' } as React.CSSProperties,
  saveBtn: { background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '7px 14px', fontSize: '12px', fontWeight: 500, color: '#475569', cursor: 'pointer', height: '34px' } as React.CSSProperties,
}

// ─── Component ────────────────────────────────────────────────────────────────

function DevPanel() {
  const { signals: initialSignals, archive } = Route.useLoaderData()
  const signals = initialSignals as Signals

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

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

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

    const es = new EventSource(`/api/pipeline?dryRun=${dryRun}&mock=true`)
    esRef.current = es

    es.onmessage = (e) => {
      const event = JSON.parse(e.data) as
        | { type: 'log'; line: string }
        | { type: 'done'; success: boolean; error?: string }

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

      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Daily Redesign</h1>
          <div style={s.meta}>{today}</div>
        </div>
        <div style={s.badge}>dev server running</div>
      </div>

      {/* Signals */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#94a3b8' }}>Signals</div>
        <div style={{ fontSize: '11px', color: '#cbd5e1' }} data-testid="signals-date">{signals.date}</div>
      </div>
      <div style={s.signalsGrid} data-testid="signals-grid">
        <SignalCard label="Weather" icon="🌨️"
          main={signals.weather?.location ?? '—'}
          sub={signals.weather ? `${signals.weather.conditions} · ${signals.weather.feel}` : ''} />
        <SignalCard label="Sports" icon="🏀"
          main={signals.sports?.[0] ? `${signals.sports[0].team}` : '—'}
          sub={signals.sports?.[0]?.result ?? ''} />
        <SignalCard label="Golf" icon="⛳"
          main={signals.golf?.[0]?.slice(0, 30) ?? '—'}
          sub={signals.golf?.[1] ?? ''} />
        <SignalCard label="GitHub" icon="⭐"
          main={signals.github_trending?.[0]?.repo ?? '—'}
          sub={`${signals.github_trending?.[0]?.stars?.toLocaleString() ?? '?'} stars`} />
        <SignalCard label="News" icon="📰"
          main={signals.news?.[0]?.slice(0, 40) ?? '—'}
          sub={signals.news?.[1]?.slice(0, 40) ?? ''} />
      </div>

      {/* Overrides */}
      <div style={s.overridesRow}>
        <div style={s.fieldGroup}>
          <div style={s.fieldLabel}>Mood Override</div>
          <select style={s.select} value={moodOverride} onChange={e => setMoodOverride(e.target.value)} data-testid="mood-override-input">
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
            onChange={e => setNotes(e.target.value)}
            placeholder="Optional extra context, e.g. 'I just got a hole in one'"
          />
        </div>
        <button style={s.saveBtn} onClick={handleSaveOverrides} disabled={savingOverrides} data-testid="save-overrides-btn">
          {savingOverrides ? 'Saving...' : 'Save overrides'}
        </button>
      </div>

      {/* Run */}
      <RunSection
        pipelineStatus={pipelineStatus}
        dryRun={dryRun}
        onDryRunChange={setDryRun}
        onRun={handleRun}
        archive={archive as ArchiveEntry[]}
      />

      {/* Progress / Result */}
      {pipelineStatus === 'running' && (
        <ProgressSection phases={phases} logLines={logLines} attemptNum={attemptNum} logEndRef={logEndRef} />
      )}
      {pipelineStatus === 'success' && result && (
        <SuccessSection
          brief={result.brief ?? ''}
          timestamp={result.timestamp ?? ''}
          attemptNum={attemptNum}
          archive={archive as ArchiveEntry[]}
        />
      )}
      {pipelineStatus === 'error' && result && (
        <ErrorSection error={result.error ?? 'Unknown error'} onRetry={handleRun} />
      )}

    </div>
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

function RunSection({ pipelineStatus, dryRun, onDryRunChange, onRun, archive }: {
  pipelineStatus: PipelineStatus
  dryRun: boolean
  onDryRunChange: (v: boolean) => void
  onRun: () => void
  archive: ArchiveEntry[]
}) {
  const lastRun = archive[0]
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
      <button
        onClick={onRun}
        disabled={pipelineStatus === 'running'}
        data-testid="run-pipeline-btn"
        style={{ background: pipelineStatus === 'running' ? '#818cf8' : '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', fontWeight: 600, cursor: pipelineStatus === 'running' ? 'default' : 'pointer' }}
      >
        {pipelineStatus === 'running' ? '⏳ Running...' : '▶ Run Pipeline'}
      </button>
      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
        <input type="checkbox" checked={dryRun} onChange={e => onDryRunChange(e.target.checked)} />
        Dry run (no commit)
      </label>
      {lastRun && (
        <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#94a3b8' }}>
          Last run: <strong style={{ color: '#475569' }}>{lastRun.date}</strong> · <em>{lastRun.brief.slice(0, 50)}…</em>
        </div>
      )}
    </div>
  )
}

function ProgressSection({ phases, logLines, attemptNum, logEndRef }: { phases: Phase[]; logLines: string[]; attemptNum: number; logEndRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '10px 14px', fontSize: '12px', fontWeight: 600, color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
        <span>Pipeline · Attempt {attemptNum} of 3</span>
        <span style={{ color: '#f59e0b' }}>● running</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
        {/* Phase tracker */}
        <div style={{ padding: '14px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '9px' }}>
          {phases.map(p => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <PhaseDot status={p.status} />
              <span style={{ fontSize: '11px', color: p.status === 'pending' ? '#cbd5e1' : p.status === 'done' ? '#94a3b8' : '#0f172a', fontWeight: p.status === 'active' ? 600 : 400, textDecoration: p.status === 'done' ? 'line-through' : 'none' }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>
        {/* Log pane */}
        <div style={{ background: '#0f172a', padding: '14px', fontFamily: 'Courier New, monospace', fontSize: '11px', lineHeight: '1.7', color: '#94a3b8', minHeight: '180px', maxHeight: '220px', overflowY: 'auto' }}>
          {logLines.map((line, i) => (
            <div key={i} style={{ color: line.includes('===') || line.includes('calling Claude') ? '#fbbf24' : '#64748b' }}>{line}</div>
          ))}
          <span style={{ color: '#fbbf24' }}>▌</span>
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  )
}

function PhaseDot({ status }: { status: 'pending' | 'active' | 'done' }) {
  const base = { width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' } as React.CSSProperties
  if (status === 'done') return <div style={{ ...base, background: '#22c55e', color: 'white' }}>✓</div>
  if (status === 'active') return <div style={{ ...base, background: '#f59e0b' }} />
  return <div style={{ ...base, background: '#e2e8f0' }} />
}

function SuccessSection({ brief, timestamp, attemptNum, archive }: {
  brief: string
  timestamp: string
  attemptNum: number
  archive: ArchiveEntry[]
}) {
  const today = new Date().toISOString().slice(0, 10)
  return (
    <div style={{ border: '1px solid #bbf7d0', borderRadius: '8px', background: '#f0fdf4', overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #bbf7d0' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>✓</div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>Build passed · committed</div>
          <div style={{ fontSize: '12px', color: '#16a34a', fontStyle: 'italic' }}>"{brief}"</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '11px', color: '#86efac', textAlign: 'right' as const }}>
          {timestamp} · {attemptNum} attempt{attemptNum !== 1 ? 's' : ''}
        </div>
        <button
          onClick={() => window.open('http://localhost:3000', '_blank')}
          style={{ background: '#166534', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 12px', fontSize: '11px', fontWeight: 500, cursor: 'pointer', flexShrink: 0 }}
        >
          Open site ↗
        </button>
      </div>
      <div style={{ padding: '10px 16px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#86efac', marginBottom: '8px' }}>Recent designs</div>
        {archive.map((entry, i) => {
          const isToday = entry.date === today
          return (
            <div key={entry.date} style={{ display: 'flex', gap: '10px', padding: '6px 0', borderBottom: i < archive.length - 1 ? '1px solid #dcfce7' : 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: isToday ? 700 : 600, color: isToday ? '#166534' : '#16a34a', minWidth: '85px' }}>
                {entry.date}{isToday ? ' ✦' : ''}
              </span>
              <span style={{ fontSize: '11px', color: isToday ? '#166534' : '#4ade80', fontStyle: 'italic', fontWeight: isToday ? 600 : 400 }}>{entry.brief}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ErrorSection({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div style={{ border: '1px solid #fecaca', borderRadius: '8px', background: '#fef2f2', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <div style={{ color: '#dc2626', fontSize: '18px', flexShrink: 0 }}>✕</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#991b1b', marginBottom: '4px' }}>Pipeline failed</div>
        <div style={{ fontSize: '11px', color: '#b91c1c', fontFamily: 'monospace' }}>{error}</div>
      </div>
      <button
        onClick={onRetry}
        style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', padding: '7px 14px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', flexShrink: 0 }}
      >
        Retry
      </button>
    </div>
  )
}
