import { useState, useRef, useEffect, useCallback } from 'react'

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

interface ArchiveEntry {
  date: string
  brief: string
}

type PipelineStatus = 'idle' | 'running' | 'success' | 'error' | 'cooldown'

interface Phase {
  label: string
  pattern: string
  status: 'pending' | 'active' | 'done'
  startedAt?: number
  finishedAt?: number
  durationMs?: number
}

const COOLDOWN_SECONDS = 10

function makePhases(): Phase[] {
  return [
    { label: 'Read signals',       pattern: '[1/4] Reading site context',    status: 'pending' },
    { label: 'Build prompt',       pattern: '[2/4] Building Claude prompt',  status: 'pending' },
    { label: 'Claude designing',   pattern: 'calling claude CLI',           status: 'pending' },
    { label: 'Write files',        pattern: 'writing files',                status: 'pending' },
    { label: 'Build & validate',   pattern: 'running pnpm build',           status: 'pending' },
    { label: 'Archive & done',     pattern: '=== Build passed!',            status: 'pending' },
  ]
}

function fmtDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
  const mins = Math.floor(ms / 60000)
  const secs = Math.round((ms % 60000) / 1000)
  return `${mins}m ${secs}s`
}

function fmtElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const mins = Math.floor(totalSec / 60)
  const secs = totalSec % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  page: { padding: '28px 32px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '13px', color: '#1e293b', maxWidth: '960px', background: '#fff', minHeight: '100vh' } as React.CSSProperties,
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

export function DevPanel() {
  const [signals, setSignals] = useState<Signals | null>(null)
  const [archive, setArchive] = useState<ArchiveEntry[]>([])
  const [loading, setLoading] = useState(true)

  const [moodOverride, setMoodOverride] = useState('')
  const [notes, setNotes] = useState('')
  const [savingOverrides, setSavingOverrides] = useState(false)

  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus>('idle')
  const [dryRun, setDryRun] = useState(false)
  const [phases, setPhases] = useState<Phase[]>(makePhases())
  const [logLines, setLogLines] = useState<string[]>([])
  const logAccumRef = useRef<string[]>([])
  const esRef = useRef<EventSource | null>(null)
  const logEndRef = useRef<HTMLDivElement>(null)
  const [attemptNum, setAttemptNum] = useState(1)
  const [result, setResult] = useState<{ brief?: string; timestamp?: string; error?: string; totalMs?: number } | null>(null)

  // Timing state
  const runStartRef = useRef(0)
  const [elapsedMs, setElapsedMs] = useState(0)
  const elapsedTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Cooldown state
  const [cooldownLeft, setCooldownLeft] = useState(0)
  const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  // ── Load initial data ──────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/dev-data')
      .then(r => r.json())
      .then(data => {
        setSignals(data.signals)
        setArchive(data.archive)
        setMoodOverride(data.signals?.mood_override ?? '')
        setNotes(data.signals?.notes ?? '')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // ── Cleanup ────────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      esRef.current?.close()
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current)
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current)
    }
  }, [])

  // ── Auto-scroll log pane ──────────────────────────────────────────────────
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logLines])

  // ── Start cooldown ────────────────────────────────────────────────────────
  const startCooldown = useCallback(() => {
    setCooldownLeft(COOLDOWN_SECONDS)
    setPipelineStatus('cooldown')
    cooldownTimerRef.current = setInterval(() => {
      setCooldownLeft(prev => {
        if (prev <= 1) {
          if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current)
          setPipelineStatus('idle')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  // ── Save overrides ────────────────────────────────────────────────────────
  const handleSaveOverrides = async () => {
    setSavingOverrides(true)
    try {
      await fetch('/api/dev-overrides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moodOverride: moodOverride || null, notes: notes || null }),
      })
    } finally {
      setSavingOverrides(false)
    }
  }

  // ── Run pipeline ──────────────────────────────────────────────────────────
  const handleRun = () => {
    const startTime = Date.now()
    runStartRef.current = startTime
    setPipelineStatus('running')
    setPhases(makePhases())
    setLogLines([])
    logAccumRef.current = []
    setAttemptNum(1)
    setResult(null)
    setElapsedMs(0)

    // Start elapsed timer (ticks every 250ms for smooth display)
    if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current)
    elapsedTimerRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startTime)
    }, 250)

    const es = new EventSource(`/api/pipeline?dryRun=${dryRun}&mock=true`)
    esRef.current = es

    es.onmessage = (e) => {
      const event = JSON.parse(e.data) as
        | { type: 'log'; line: string }
        | { type: 'done'; success: boolean; error?: string }

      if (event.type === 'log') {
        const line = event.line
        const now = Date.now()
        logAccumRef.current.push(line)
        setLogLines([...logAccumRef.current])

        if (line.includes('--- Attempt')) {
          const match = line.match(/Attempt (\d+)/)
          if (match) setAttemptNum(Number(match[1]))
          setPhases(prev => prev.map((p, i) =>
            i < 2 ? { ...p, status: 'done', finishedAt: now, durationMs: p.startedAt ? now - p.startedAt : undefined } :
            i === 2 ? { ...p, status: 'active', startedAt: now } :
            { ...p, status: 'pending' }
          ))
          return
        }

        setPhases(prev => {
          const matchIdx = prev.findIndex(p => line.includes(p.pattern))
          if (matchIdx === -1) return prev
          return prev.map((p, i) => {
            if (i < matchIdx) {
              if (p.status !== 'done') {
                return { ...p, status: 'done', finishedAt: now, durationMs: p.startedAt ? now - p.startedAt : undefined }
              }
              return p
            }
            if (i === matchIdx) return { ...p, status: 'active', startedAt: p.startedAt ?? now }
            return p
          })
        })
      }

      if (event.type === 'done') {
        es.close()
        const totalMs = Date.now() - startTime
        if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current)
        setElapsedMs(totalMs)

        if (event.success) {
          setPhases(prev => prev.map(p => ({
            ...p,
            status: 'done' as const,
            finishedAt: p.finishedAt ?? Date.now(),
            durationMs: p.durationMs ?? (p.startedAt ? Date.now() - p.startedAt : undefined),
          })))
          const briefLine = [...logAccumRef.current].reverse().find(l => l.includes('design_brief:'))
          const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          setPipelineStatus('success')
          setResult({ brief: briefLine?.split('design_brief: ')[1] ?? 'Run complete', timestamp, totalMs })
          fetch('/api/dev-data').then(r => r.json()).then(data => setArchive(data.archive))
        } else {
          setPipelineStatus('error')
          setResult({ error: event.error ?? 'Unknown error', totalMs })
        }
      }
    }

    es.onerror = () => {
      es.close()
      const totalMs = Date.now() - startTime
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current)
      setPipelineStatus('error')
      setResult({ error: 'Connection to pipeline server lost', totalMs })
    }
  }

  const isRunDisabled = pipelineStatus === 'running' || pipelineStatus === 'cooldown'

  if (loading) return <div style={s.page}><p style={{ color: '#94a3b8' }}>Loading...</p></div>
  if (!signals) return <div style={s.page}><p style={{ color: '#dc2626' }}>Failed to load signals</p></div>

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
        <div style={{ fontSize: '11px', color: '#cbd5e1' }}>{signals.date}</div>
      </div>
      <div style={s.signalsGrid}>
        <SignalCard label="Weather" icon="🌨️" main={signals.weather?.location ?? '—'} sub={signals.weather ? `${signals.weather.conditions} · ${signals.weather.feel}` : ''} />
        <SignalCard label="Sports" icon="🏀" main={signals.sports?.[0]?.team ?? '—'} sub={signals.sports?.[0]?.result ?? ''} />
        <SignalCard label="Golf" icon="⛳" main={signals.golf?.[0]?.slice(0, 30) ?? '—'} sub={signals.golf?.[1] ?? ''} />
        <SignalCard label="GitHub" icon="⭐" main={signals.github_trending?.[0]?.repo ?? '—'} sub={`${signals.github_trending?.[0]?.stars?.toLocaleString() ?? '?'} stars`} />
        <SignalCard label="News" icon="📰" main={signals.news?.[0]?.slice(0, 40) ?? '—'} sub={signals.news?.[1]?.slice(0, 40) ?? ''} />
      </div>

      {/* Overrides */}
      <div style={s.overridesRow}>
        <div style={s.fieldGroup}>
          <div style={s.fieldLabel}>Mood Override</div>
          <select style={s.select} value={moodOverride} onChange={e => setMoodOverride(e.target.value)}>
            <option value="">— none (Claude decides) —</option>
            <option value="dark">dark</option>
            <option value="celebratory">celebratory</option>
            <option value="tense">tense</option>
            <option value="playful">playful</option>
          </select>
        </div>
        <div style={s.fieldGroup}>
          <div style={s.fieldLabel}>Notes for Claude</div>
          <textarea style={s.textarea} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional extra context, e.g. 'I just got a hole in one'" />
        </div>
        <button style={s.saveBtn} onClick={handleSaveOverrides} disabled={savingOverrides}>
          {savingOverrides ? 'Saving...' : 'Save overrides'}
        </button>
      </div>

      {/* Run */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <button onClick={handleRun} disabled={isRunDisabled} style={{
          background: pipelineStatus === 'running' ? '#818cf8' : pipelineStatus === 'cooldown' ? '#94a3b8' : '#4f46e5',
          color: 'white', border: 'none', borderRadius: '8px', padding: '10px 24px',
          fontSize: '14px', fontWeight: 600, cursor: isRunDisabled ? 'default' : 'pointer',
          opacity: pipelineStatus === 'cooldown' ? 0.7 : 1,
        }}>
          {pipelineStatus === 'running' ? `⏳ Running... ${fmtElapsed(elapsedMs)}` :
           pipelineStatus === 'cooldown' ? `⏳ Cooldown ${cooldownLeft}s` :
           '▶ Run Pipeline'}
        </button>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
          <input type="checkbox" checked={dryRun} onChange={e => setDryRun(e.target.checked)} disabled={isRunDisabled} />
          Dry run (no commit)
        </label>
        {archive[0] && (
          <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#94a3b8' }}>
            Last run: <strong style={{ color: '#475569' }}>{archive[0].date}</strong> · <em>{archive[0].brief.slice(0, 50)}…</em>
          </div>
        )}
      </div>

      {/* Progress */}
      {pipelineStatus === 'running' && (
        <ProgressSection phases={phases} logLines={logLines} attemptNum={attemptNum} logEndRef={logEndRef} elapsedMs={elapsedMs} />
      )}
      {(pipelineStatus === 'success' || pipelineStatus === 'cooldown') && result && (
        <SuccessSection
          brief={result.brief ?? ''}
          timestamp={result.timestamp ?? ''}
          attemptNum={attemptNum}
          archive={archive}
          totalMs={result.totalMs ?? 0}
          phases={phases}
          onRunAgain={() => { startCooldown() }}
          cooldownLeft={cooldownLeft}
          isCooldown={pipelineStatus === 'cooldown'}
        />
      )}
      {pipelineStatus === 'error' && result && (
        <ErrorSection error={result.error ?? 'Unknown error'} totalMs={result.totalMs ?? 0} onRetry={handleRun} />
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

function ProgressSection({ phases, logLines, attemptNum, logEndRef, elapsedMs }: {
  phases: Phase[]; logLines: string[]; attemptNum: number;
  logEndRef: React.RefObject<HTMLDivElement | null>; elapsedMs: number
}) {
  // Estimate: Claude designing is ~60-90% of total time, ~2-5 min typical
  const activePhase = phases.find(p => p.status === 'active')
  const isClaudePhase = activePhase?.label === 'Claude designing'
  const claudeElapsed = isClaudePhase && activePhase.startedAt ? Date.now() - activePhase.startedAt : 0
  const estimatedClaudeMs = 120000 // ~2 min estimate
  const claudeProgress = isClaudePhase ? Math.min(95, (claudeElapsed / estimatedClaudeMs) * 100) : 0

  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '10px 14px', fontSize: '12px', fontWeight: 600, color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
        <span>Pipeline · Attempt {attemptNum} of 3</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '11px' }}>{fmtElapsed(elapsedMs)}</span>
          <span style={{ color: '#f59e0b' }}>● running</span>
        </div>
      </div>

      {/* Progress bar for Claude phase */}
      {isClaudePhase && (
        <div style={{ height: '3px', background: '#e2e8f0' }}>
          <div style={{
            height: '100%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            width: `${claudeProgress}%`, transition: 'width 0.5s ease',
          }} />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
        {/* Phase tracker with timings */}
        <div style={{ padding: '14px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '9px' }}>
          {phases.map(p => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <PhaseDot status={p.status} />
              <span style={{
                fontSize: '11px', flex: 1,
                color: p.status === 'pending' ? '#cbd5e1' : p.status === 'done' ? '#94a3b8' : '#0f172a',
                fontWeight: p.status === 'active' ? 600 : 400,
                textDecoration: p.status === 'done' ? 'line-through' : 'none',
              }}>{p.label}</span>
              {/* Duration badge */}
              {p.status === 'done' && p.durationMs != null && (
                <span style={{ fontSize: '9px', fontFamily: 'monospace', color: '#94a3b8', background: '#f1f5f9', padding: '1px 5px', borderRadius: '3px' }}>
                  {fmtDuration(p.durationMs)}
                </span>
              )}
              {/* Live timer for active phase */}
              {p.status === 'active' && p.startedAt && (
                <span style={{ fontSize: '9px', fontFamily: 'monospace', color: '#f59e0b', background: '#fffbeb', padding: '1px 5px', borderRadius: '3px' }}>
                  {fmtDuration(Date.now() - p.startedAt)}
                </span>
              )}
            </div>
          ))}

          {/* Estimated remaining */}
          {isClaudePhase && claudeElapsed > 5000 && (
            <div style={{ marginTop: '6px', padding: '6px 8px', background: '#fffbeb', borderRadius: '4px', fontSize: '10px', color: '#92400e' }}>
              Est. remaining: ~{fmtDuration(Math.max(0, estimatedClaudeMs - claudeElapsed))}
            </div>
          )}
        </div>

        {/* Log pane */}
        <div style={{ background: '#0f172a', padding: '14px', fontFamily: 'Courier New, monospace', fontSize: '11px', lineHeight: '1.7', color: '#94a3b8', minHeight: '180px', maxHeight: '220px', overflowY: 'auto' }}>
          {logLines.map((line, i) => (
            <div key={i} style={{ color: line.includes('===') || line.includes('calling claude') || line.includes('claude CLI') ? '#fbbf24' : '#64748b' }}>{line}</div>
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
  if (status === 'active') return <div style={{ ...base, background: '#f59e0b', animation: 'pulse 1.5s ease-in-out infinite' }}>
    <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
  </div>
  return <div style={{ ...base, background: '#e2e8f0' }} />
}

function SuccessSection({ brief, timestamp, attemptNum, archive, totalMs, phases, onRunAgain, cooldownLeft, isCooldown }: {
  brief: string; timestamp: string; attemptNum: number; archive: ArchiveEntry[];
  totalMs: number; phases: Phase[]; onRunAgain: () => void; cooldownLeft: number; isCooldown: boolean
}) {
  const today = new Date().toISOString().slice(0, 10)
  const siteUrl = window.location.origin
  return (
    <div style={{ border: '1px solid #bbf7d0', borderRadius: '8px', background: '#f0fdf4', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #bbf7d0' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>✓</div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>Build passed · committed</div>
          <div style={{ fontSize: '12px', color: '#16a34a', fontStyle: 'italic' }}>"{brief}"</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ textAlign: 'right' as const }}>
            <div style={{ fontSize: '11px', color: '#16a34a' }}>{timestamp}</div>
            <div style={{ fontSize: '10px', color: '#86efac' }}>Total: {fmtDuration(totalMs)} · {attemptNum} attempt{attemptNum !== 1 ? 's' : ''}</div>
          </div>
          <button onClick={() => window.open(siteUrl, '_blank')} style={{ background: '#166534', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 12px', fontSize: '11px', fontWeight: 500, cursor: 'pointer', flexShrink: 0 }}>Open site ↗</button>
        </div>
      </div>

      {/* Phase breakdown */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #dcfce7' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#86efac', marginBottom: '6px' }}>Step Timings</div>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {phases.map((p, i) => {
            const pct = p.durationMs && totalMs ? Math.max(3, (p.durationMs / totalMs) * 100) : 3
            const colors = ['#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#166534']
            return (
              <div key={p.label} title={`${p.label}: ${p.durationMs ? fmtDuration(p.durationMs) : '—'}`} style={{
                height: '20px', flex: `${pct} 0 0`, background: colors[i], borderRadius: '3px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '8px', color: i > 3 ? 'white' : '#166534', fontWeight: 600,
                overflow: 'hidden', whiteSpace: 'nowrap',
              }}>
                {pct > 8 ? (p.durationMs ? fmtDuration(p.durationMs) : '') : ''}
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          {phases.map(p => (
            <span key={p.label} style={{ fontSize: '8px', color: '#86efac' }}>{p.label.split(' ')[0]}</span>
          ))}
        </div>
      </div>

      {/* Recent designs */}
      <div style={{ padding: '10px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#86efac' }}>Recent designs</div>
          <button
            onClick={onRunAgain}
            disabled={isCooldown}
            style={{
              background: isCooldown ? '#86efac' : '#22c55e', color: 'white', border: 'none',
              borderRadius: '4px', padding: '3px 10px', fontSize: '10px', fontWeight: 600,
              cursor: isCooldown ? 'default' : 'pointer', opacity: isCooldown ? 0.6 : 1,
            }}
          >
            {isCooldown ? `Run again in ${cooldownLeft}s` : 'Run again'}
          </button>
        </div>
        {archive.map((entry, i) => {
          const isToday = entry.date === today
          return (
            <div key={entry.date + i} style={{ display: 'flex', gap: '10px', padding: '6px 0', borderBottom: i < archive.length - 1 ? '1px solid #dcfce7' : 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: isToday ? 700 : 600, color: isToday ? '#166534' : '#16a34a', minWidth: '85px' }}>{entry.date}{isToday ? ' ✦' : ''}</span>
              <span style={{ fontSize: '11px', color: isToday ? '#166534' : '#4ade80', fontStyle: 'italic', fontWeight: isToday ? 600 : 400 }}>{entry.brief}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ErrorSection({ error, totalMs, onRetry }: { error: string; totalMs: number; onRetry: () => void }) {
  return (
    <div style={{ border: '1px solid #fecaca', borderRadius: '8px', background: '#fef2f2', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <div style={{ color: '#dc2626', fontSize: '18px', flexShrink: 0 }}>✕</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#991b1b', marginBottom: '4px' }}>Pipeline failed <span style={{ fontWeight: 400, fontSize: '11px', color: '#b91c1c' }}>({fmtDuration(totalMs)})</span></div>
        <div style={{ fontSize: '11px', color: '#b91c1c', fontFamily: 'monospace' }}>{error}</div>
      </div>
      <button onClick={onRetry} style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', padding: '7px 14px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', flexShrink: 0 }}>Retry</button>
    </div>
  )
}
