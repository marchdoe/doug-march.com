import { useState, useRef, useEffect, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

// Signals is now a dynamic bag — each key is a provider name with arbitrary data
type Signals = Record<string, unknown> & {
  date: string
  mood_override?: string | null
  notes?: string | null
}

interface MetaSource {
  status: 'ok' | 'error' | 'skipped'
  source?: string
  reason?: string
  latency_ms: number
  items?: number
}

interface Meta {
  collected_at: string
  duration_ms: number
  providers_total: number
  providers_ok: number
  providers_failed: number
  sources: Record<string, MetaSource>
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
    { label: 'Collect signals',    pattern: 'Stage 1: Collect',             status: 'pending' },
    { label: 'Interpret signals',  pattern: 'Stage 2: Interpret',           status: 'pending' },
    { label: 'Read context',       pattern: '[1/4] Reading site context',   status: 'pending' },
    { label: 'Claude designing',   pattern: 'calling claude CLI',           status: 'pending' },
    { label: 'Write & build',      pattern: 'writing files',                status: 'pending' },
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

// ─── Dark Theme Styles ────────────────────────────────────────────────────────

const c = {
  pageBg: '#050C18',
  cardBg: '#070F1E',
  border: '#0A1828',
  primary: '#D4E8F8',
  secondary: '#7AADC4',
  dim: '#6A9DB5',
  muted: '#4E7A94',
  ghost: '#3A6080',
  cyan: '#00E5FF',
  green: '#5CBE4A',
  blue: '#4A8FD4',
  orange: '#f97316',
  font: "'Space Mono', monospace",
}

const s = {
  page: {
    padding: '28px 32px',
    fontFamily: c.font,
    fontSize: '13px',
    color: c.primary,
    maxWidth: '960px',
    background: c.pageBg,
    minHeight: '100vh',
  } as React.CSSProperties,
  overridesRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    alignItems: 'flex-end',
  } as React.CSSProperties,
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
  },
  fieldLabel: {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '.1em',
    color: c.dim,
  },
  select: {
    border: `1px solid ${c.border}`,
    borderRadius: '4px',
    padding: '7px 10px',
    fontSize: '12px',
    color: c.primary,
    background: c.cardBg,
    fontFamily: c.font,
    minWidth: '160px',
  } as React.CSSProperties,
  textarea: {
    border: `1px solid ${c.border}`,
    borderRadius: '4px',
    padding: '7px 10px',
    fontSize: '12px',
    color: c.primary,
    background: c.cardBg,
    fontFamily: c.font,
    resize: 'none' as const,
    height: '56px',
    width: '340px',
  } as React.CSSProperties,
  saveBtn: {
    background: c.cardBg,
    border: `1px solid ${c.border}`,
    borderRadius: '4px',
    padding: '7px 14px',
    fontSize: '12px',
    fontWeight: 700,
    color: c.dim,
    cursor: 'pointer',
    height: '34px',
    fontFamily: c.font,
  } as React.CSSProperties,
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DevPanel() {
  const [signals, setSignals] = useState<Signals | null>(null)
  const [meta, setMeta] = useState<Meta | null>(null)
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

  // ── Load initial data ──────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/dev-data')
      .then(r => r.json())
      .then(data => {
        setSignals(data.signals)
        setMeta(data.meta ?? null)
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

  if (loading) return <main style={s.page}><p style={{ color: c.dim }}>Loading...</p></main>
  if (!signals) return <main style={s.page}><p style={{ color: '#ef4444' }}>Failed to load signals</p></main>

  return (
    <main style={s.page}>
      <PulseStyle />

      {/* Zone 1: Signals Header */}
      <SignalsHeader meta={meta} date={signals.date} />

      {/* Zone 2: Atmosphere Strip */}
      <AtmosphereStrip signals={signals} />

      {/* Zone 3: Quote Block */}
      <QuoteBlock signals={signals} />

      {/* Zone 4: Live Data Cards */}
      <LiveDataCards signals={signals} meta={meta} />

      {/* Zone 5: Bottom Row */}
      <BottomRow signals={signals} meta={meta} />

      {/* Overrides */}
      <div style={{ ...s.overridesRow, marginTop: '24px' }}>
        <div style={s.fieldGroup}>
          <label htmlFor="mood-override" style={s.fieldLabel}>Mood Override</label>
          <select id="mood-override" style={s.select} value={moodOverride} onChange={e => setMoodOverride(e.target.value)}>
            <option value="">-- none (Claude decides) --</option>
            <option value="dark">dark</option>
            <option value="celebratory">celebratory</option>
            <option value="tense">tense</option>
            <option value="playful">playful</option>
          </select>
        </div>
        <div style={s.fieldGroup}>
          <label htmlFor="notes-claude" style={s.fieldLabel}>Notes for Claude</label>
          <textarea id="notes-claude" style={s.textarea} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional extra context, e.g. 'I just got a hole in one'" />
        </div>
        <button style={s.saveBtn} onClick={handleSaveOverrides} disabled={savingOverrides}>
          {savingOverrides ? 'Saving...' : 'Save overrides'}
        </button>
      </div>

      {/* Run */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <button onClick={handleRun} disabled={isRunDisabled} style={{
          background: pipelineStatus === 'running' ? c.muted : pipelineStatus === 'cooldown' ? c.ghost : c.cyan,
          color: pipelineStatus === 'running' || pipelineStatus === 'cooldown' ? c.dim : c.pageBg,
          border: 'none',
          borderRadius: '4px',
          padding: '10px 24px',
          fontSize: '13px',
          fontWeight: 700,
          fontFamily: c.font,
          cursor: isRunDisabled ? 'default' : 'pointer',
          opacity: pipelineStatus === 'cooldown' ? 0.7 : 1,
          letterSpacing: '.05em',
        }}>
          {pipelineStatus === 'running' ? `RUNNING... ${fmtElapsed(elapsedMs)}` :
           pipelineStatus === 'cooldown' ? `COOLDOWN ${cooldownLeft}s` :
           'RUN PIPELINE'}
        </button>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: c.dim, fontFamily: c.font }}>
          <input type="checkbox" checked={dryRun} onChange={e => setDryRun(e.target.checked)} disabled={isRunDisabled} />
          Dry run (no commit)
        </label>
        {archive[0] && (
          <div style={{ marginLeft: 'auto', fontSize: '11px', color: c.muted, fontFamily: c.font }}>
            Last run: <strong style={{ color: c.dim }}>{archive[0].date}</strong> · <em style={{ color: c.muted }}>{archive[0].brief.slice(0, 50)}...</em>
          </div>
        )}
      </div>

      {/* Progress */}
      {pipelineStatus === 'running' && (
        <ProgressSection phases={phases} logLines={logLines} attemptNum={attemptNum} logEndRef={logEndRef} elapsedMs={elapsedMs} />
      )}
      <div role="status" aria-live="polite">
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
      </div>
      <div role="alert">
        {pipelineStatus === 'error' && result && (
          <ErrorSection error={result.error ?? 'Unknown error'} totalMs={result.totalMs ?? 0} onRetry={handleRun} />
        )}
      </div>
    </main>
  )
}

// ─── Pulse Animation ──────────────────────────────────────────────────────────

function PulseStyle() {
  return (
    <style>{`
      @keyframes pulse-dot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      button:focus-visible, select:focus-visible, textarea:focus-visible, input:focus-visible {
        outline: 2px solid #00E5FF;
        outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
      }
    `}</style>
  )
}

// ─── Zone 1: Signals Header ──────────────────────────────────────────────────

function SignalsHeader({ meta, date }: { meta: Meta | null; date: string }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
      padding: '8px 0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h2 style={{
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.12em',
          color: c.dim,
          fontFamily: c.font,
          margin: 0,
        }}>
          // SIGNALS
        </h2>

        {meta && (
          <>
            {/* Health capsule */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(92,190,74,0.08)',
              border: `1px solid rgba(92,190,74,0.2)`,
              borderRadius: '20px',
              padding: '3px 10px',
              fontSize: '11px',
              fontWeight: 700,
              color: c.green,
              fontFamily: c.font,
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: c.green,
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              {meta.providers_ok} / {meta.providers_total}
            </span>

            {/* Latency */}
            <span style={{
              fontSize: '11px',
              fontFamily: c.font,
              color: c.muted,
            }}>
              {meta.duration_ms}ms
            </span>
          </>
        )}
      </div>

      <span style={{
        fontSize: '11px',
        fontFamily: c.font,
        color: c.muted,
      }}>
        {date}
      </span>
    </div>
  )
}

// ─── Zone 2: Atmosphere Strip ────────────────────────────────────────────────

function AtmosphereStrip({ signals }: { signals: Signals }) {
  const season = signals.season as { season?: string; month_name?: string; day_of_year?: number } | undefined
  const dayOfWeek = signals.day_of_week as { day?: string; is_weekend?: boolean } | undefined
  const sun = signals.sun as { sunrise?: string; sunset?: string; daylight_hours?: number } | undefined
  const lunar = signals.lunar as { phase?: string; illumination?: number } | undefined
  const holidays = signals.holidays as { today?: string; upcoming?: Array<{ name: string; days_away: number }> } | undefined

  const upcomingHoliday = holidays?.today
    ? { name: holidays.today, sub: 'Today!' }
    : holidays?.upcoming?.[0]
      ? { name: holidays.upcoming[0].name, sub: `in ${holidays.upcoming[0].days_away} day${holidays.upcoming[0].days_away !== 1 ? 's' : ''}` }
      : null

  const cellStyle: React.CSSProperties = {
    flex: 1,
    padding: '12px 16px',
    minWidth: 0,
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '9px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '.12em',
    color: c.muted,
    marginBottom: '4px',
    fontFamily: c.font,
  }

  const subStyle: React.CSSProperties = {
    fontSize: '10px',
    color: c.dim,
    marginTop: '2px',
    fontFamily: c.font,
  }

  return (
    <div style={{
      display: 'flex',
      background: c.cardBg,
      border: `1px solid ${c.border}`,
      borderRadius: '4px',
      marginBottom: '12px',
      overflow: 'hidden',
    }}>
      {/* Season */}
      <div style={cellStyle}>
        <div style={labelStyle}>SEASON</div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: c.green, fontFamily: c.font }}>
          {season?.season ?? '--'}
        </div>
        <div style={subStyle}>
          {season?.month_name ?? '--'} · Day {season?.day_of_year ?? '--'}
        </div>
      </div>

      <div style={{ width: '1px', background: c.border }} />

      {/* Day */}
      <div style={cellStyle}>
        <div style={labelStyle}>DAY</div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: c.primary, fontFamily: c.font }}>
          {dayOfWeek?.day ?? '--'}
        </div>
        <div style={{ ...subStyle, color: dayOfWeek?.is_weekend ? c.cyan : c.dim }}>
          {dayOfWeek?.is_weekend ? 'Weekend' : 'Weekday'}
        </div>
      </div>

      <div style={{ width: '1px', background: c.border }} />

      {/* Sun */}
      <div style={cellStyle}>
        <div style={labelStyle}>SUN</div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: c.secondary, fontFamily: c.font }}>
          {sun?.daylight_hours ?? '--'}h
          <span style={{ fontSize: '11px', fontWeight: 400, color: c.dim, marginLeft: '4px' }}>daylight</span>
        </div>
        <div style={subStyle}>
          {sun?.sunrise ?? '--'} ↑ {sun?.sunset ?? '--'} ↓
        </div>
      </div>

      <div style={{ width: '1px', background: c.border }} />

      {/* Lunar */}
      <div style={cellStyle}>
        <div style={labelStyle}>LUNAR</div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: c.blue, fontFamily: c.font }}>
          {lunar?.phase ?? '--'}
        </div>
        <div style={{ ...subStyle, color: '#3A7FC4' }}>
          {lunar?.illumination != null ? `${Math.round(lunar.illumination * 100)}% illuminated` : '--'}
        </div>
      </div>

      <div style={{ width: '1px', background: c.border }} />

      {/* Holidays */}
      <div style={cellStyle}>
        <div style={labelStyle}>UPCOMING</div>
        {upcomingHoliday ? (
          <>
            <div style={{ fontSize: '14px', fontWeight: 700, color: c.green, fontFamily: c.font }}>
              {upcomingHoliday.name}
            </div>
            <div style={{ ...subStyle, color: c.green }}>
              {upcomingHoliday.sub}
            </div>
          </>
        ) : (
          <div style={{ fontSize: '14px', fontWeight: 700, color: c.muted, fontFamily: c.font }}>
            None nearby
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Zone 3: Quote Block ─────────────────────────────────────────────────────

function QuoteBlock({ signals }: { signals: Signals }) {
  const quote = signals.quote as { text?: string; author?: string } | undefined

  if (!quote?.text) return null

  return (
    <div style={{
      position: 'relative',
      borderLeft: `2px solid ${c.muted}`,
      padding: '14px 18px',
      marginBottom: '12px',
      background: 'transparent',
    }}>
      <span style={{
        position: 'absolute',
        top: '6px',
        right: '0',
        fontSize: '9px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.12em',
        color: c.ghost,
        fontFamily: c.font,
      }}>
        DAILY QUOTE
      </span>
      <div style={{
        fontSize: '13px',
        fontStyle: 'italic',
        color: c.secondary,
        lineHeight: '1.6',
        fontFamily: c.font,
        marginBottom: '6px',
        paddingRight: '80px',
      }}>
        "{quote.text}"
      </div>
      <div style={{
        fontSize: '11px',
        fontWeight: 700,
        color: c.dim,
        fontFamily: c.font,
      }}>
        -- {quote.author}
      </div>
    </div>
  )
}

// ─── Zone 4: Live Data Cards ─────────────────────────────────────────────────

function LiveDataCards({ signals, meta }: { signals: Signals; meta: Meta | null }) {
  const cardStyle: React.CSSProperties = {
    background: c.cardBg,
    border: `1px solid ${c.border}`,
    borderRadius: '4px',
    padding: '14px',
    overflow: 'hidden',
  }

  const headerStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '.12em',
    color: c.dim,
    fontFamily: c.font,
    marginBottom: '10px',
    marginTop: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const metaStyle: React.CSSProperties = {
    fontSize: '9px',
    color: c.muted,
    fontFamily: c.font,
    fontWeight: 400,
    letterSpacing: '0',
    textTransform: 'none',
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px',
      marginBottom: '12px',
    }}>
      {/* Sports Card */}
      <SportsCard signals={signals} cardStyle={cardStyle} headerStyle={headerStyle} metaStyle={metaStyle} />

      {/* Golf Card */}
      <GolfCard signals={signals} cardStyle={cardStyle} headerStyle={headerStyle} />

      {/* GitHub Card */}
      <GitHubCard signals={signals} cardStyle={cardStyle} headerStyle={headerStyle} />

      {/* Hacker News Card */}
      <HackerNewsCard signals={signals} cardStyle={cardStyle} headerStyle={headerStyle} />

      {/* Weather + Air Quality Card */}
      <WeatherCard signals={signals} cardStyle={cardStyle} headerStyle={headerStyle} />

      {/* News Card */}
      <NewsCard signals={signals} cardStyle={cardStyle} headerStyle={headerStyle} />

      {/* Market Card */}
      <MarketCard signals={signals} cardStyle={cardStyle} headerStyle={headerStyle} />
    </div>
  )
}

function SportsCard({ signals, cardStyle, headerStyle, metaStyle }: {
  signals: Signals
  cardStyle: React.CSSProperties
  headerStyle: React.CSSProperties
  metaStyle: React.CSSProperties
}) {
  const sports = signals.sports as { teams?: Array<{ name: string; league?: string; last_game?: string; result: string; score?: string }> } | undefined
  const teams = sports?.teams ?? []

  return (
    <div style={cardStyle}>
      <h3 style={headerStyle}>
        <span>// SPORTS</span>
        <span style={metaStyle}>{teams.length} teams</span>
      </h3>
      {teams.map((team, i) => {
        const isActive = team.result !== 'off season'
        const isWin = team.result?.toLowerCase() === 'w' || team.result?.toLowerCase() === 'win'
        return (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 6px',
            borderRadius: '3px',
            background: isActive ? 'rgba(92,190,74,0.06)' : 'transparent',
            marginBottom: '2px',
          }}>
            <span style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: isActive ? c.green : c.ghost,
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '11px',
              fontWeight: isActive ? 700 : 400,
              color: isActive ? c.primary : c.muted,
              fontFamily: c.font,
              flex: 1,
            }}>
              {team.name}
            </span>
            {isActive ? (
              <>
                {team.result && (
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    background: isWin ? c.green : '#ef4444',
                    color: isWin ? c.pageBg : '#fff',
                    padding: '1px 6px',
                    borderRadius: '3px',
                    fontFamily: c.font,
                  }}>
                    {team.result}
                  </span>
                )}
                {team.score && (
                  <span style={{
                    fontSize: '11px',
                    fontFamily: c.font,
                    color: c.green,
                    fontWeight: 700,
                  }}>
                    {team.score}
                  </span>
                )}
              </>
            ) : (
              <span style={{
                fontSize: '10px',
                fontStyle: 'italic',
                color: c.muted,
                fontFamily: c.font,
              }}>
                off season
              </span>
            )}
          </div>
        )
      })}
      {teams.length === 0 && (
        <div style={{ fontSize: '11px', color: c.muted, fontFamily: c.font }}>No teams</div>
      )}
    </div>
  )
}

function GolfCard({ signals, cardStyle, headerStyle }: {
  signals: Signals
  cardStyle: React.CSSProperties
  headerStyle: React.CSSProperties
}) {
  const golf = signals.golf as { tournament?: string; status?: string; leaders?: Array<{ name: string; position?: string; score: string }> } | undefined

  return (
    <div style={cardStyle}>
      <h3 style={headerStyle}>
        <span>// GOLF</span>
      </h3>
      {golf?.tournament ? (
        <>
          <div style={{
            fontSize: '12px',
            fontWeight: 700,
            color: c.primary,
            fontFamily: c.font,
            marginBottom: '2px',
          }}>
            {golf.tournament}
          </div>
          <div style={{
            fontSize: '10px',
            color: c.cyan,
            fontFamily: c.font,
            marginBottom: '8px',
          }}>
            {golf.status}
          </div>
          {(golf.leaders ?? []).map((leader, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '3px 0',
            }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: i < 3 ? c.cyan : c.dim,
                fontFamily: c.font,
                minWidth: '20px',
              }}>
                {leader.position ?? (i + 1)}
              </span>
              <span style={{
                fontSize: '11px',
                color: c.primary,
                fontFamily: c.font,
                flex: 1,
              }}>
                {leader.name}
              </span>
              <span style={{
                fontSize: '11px',
                fontFamily: c.font,
                color: c.green,
                fontWeight: 700,
              }}>
                {leader.score}
              </span>
            </div>
          ))}
          {(!golf.leaders || golf.leaders.length === 0) && (
            <div style={{ fontSize: '11px', color: c.muted, fontFamily: c.font }}>No leaders yet</div>
          )}
        </>
      ) : (
        <div style={{ fontSize: '11px', color: c.muted, fontFamily: c.font }}>No tournament</div>
      )}
    </div>
  )
}

function GitHubCard({ signals, cardStyle, headerStyle }: {
  signals: Signals
  cardStyle: React.CSSProperties
  headerStyle: React.CSSProperties
}) {
  const github = signals.github as { repos?: Array<{ name: string; description?: string; language?: string; stars?: number }> } | undefined
  const repos = github?.repos ?? []

  const langColors: Record<string, string> = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
    Rust: '#dea584', Go: '#00ADD8', Java: '#b07219', Ruby: '#701516',
    'C++': '#f34b7d', C: '#555555', Swift: '#F05138', Kotlin: '#A97BFF',
    Dart: '#00B4AB', Shell: '#89e051', HTML: '#e34c26', CSS: '#563d7c',
  }

  return (
    <div style={cardStyle}>
      <h3 style={headerStyle}>
        <span>// GITHUB TRENDING</span>
      </h3>
      {repos.map((repo, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '3px 0',
        }}>
          {repo.language && (
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: langColors[repo.language] ?? c.dim,
              flexShrink: 0,
            }} />
          )}
          <span style={{
            fontSize: '11px',
            color: c.blue,
            fontFamily: c.font,
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {repo.name}
          </span>
          {repo.stars != null && (
            <span style={{
              fontSize: '9px',
              color: c.dim,
              fontFamily: c.font,
            }}>
              {repo.stars.toLocaleString()}
            </span>
          )}
        </div>
      ))}
      {repos.length === 0 && (
        <div style={{ fontSize: '11px', color: c.muted, fontFamily: c.font }}>No data</div>
      )}
    </div>
  )
}

function HackerNewsCard({ signals, cardStyle, headerStyle }: {
  signals: Signals
  cardStyle: React.CSSProperties
  headerStyle: React.CSSProperties
}) {
  const hn = signals.hacker_news as { stories?: Array<{ title: string; url?: string; score: number; by?: string }> } | undefined
  const stories = hn?.stories ?? []

  return (
    <div style={cardStyle}>
      <h3 style={headerStyle}>
        <span>
          <span style={{ color: c.orange, fontWeight: 700, marginRight: '4px' }}>Y</span>
          HACKER NEWS
        </span>
      </h3>
      {stories.map((story, i) => {
        // Brighten scores for high values, fade for lower
        const scoreOpacity = Math.min(1, 0.7 + (story.score / 500) * 0.3)
        return (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            padding: '3px 0',
          }}>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              color: c.orange,
              fontFamily: c.font,
              minWidth: '32px',
              textAlign: 'right',
              opacity: scoreOpacity,
            }}>
              {story.score}
            </span>
            <span style={{
              fontSize: '11px',
              color: c.primary,
              fontFamily: c.font,
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {story.title}
            </span>
          </div>
        )
      })}
      {stories.length === 0 && (
        <div style={{ fontSize: '11px', color: c.muted, fontFamily: c.font }}>No stories</div>
      )}
    </div>
  )
}

function WeatherCard({ signals, cardStyle, headerStyle }: {
  signals: Signals
  cardStyle: React.CSSProperties
  headerStyle: React.CSSProperties
}) {
  const weather = signals.weather as { location?: string; conditions?: string; temp_f?: number; humidity?: number; wind_mph?: number; wind_dir?: string; feels_like_f?: number } | undefined
  const aq = signals.air_quality as { aqi_index?: number; uv_index?: number; air_quality_label?: string } | undefined

  if (!weather && !aq) return <CardError cardStyle={cardStyle} headerStyle={headerStyle} label="// WEATHER" reason="WEATHER_API_KEY not set" />

  return (
    <div style={cardStyle}>
      <h3 style={headerStyle}><span>// WEATHER</span></h3>
      {weather && (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '22px', fontWeight: 700, color: c.primary, fontFamily: c.font }}>
              {Math.round(weather.temp_f ?? 0)}°F
            </span>
            <span style={{ fontSize: '11px', color: c.dim, fontFamily: c.font }}>
              {weather.conditions}
            </span>
          </div>
          <div style={{ fontSize: '10px', color: c.muted, fontFamily: c.font, lineHeight: '1.8' }}>
            <div>Feels like {Math.round(weather.feels_like_f ?? 0)}°F · {weather.humidity}% humidity</div>
            <div>Wind {weather.wind_mph} mph {weather.wind_dir}</div>
            <div style={{ color: c.dim, marginTop: '2px' }}>{weather.location}</div>
          </div>
        </>
      )}
      {aq && (
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', gap: '12px', fontSize: '10px', fontFamily: c.font }}>
            <span>
              <span style={{ color: c.muted }}>AQI </span>
              <span style={{ color: aq.aqi_index === 1 ? c.green : aq.aqi_index === 2 ? '#eab308' : '#ef4444', fontWeight: 700 }}>
                {aq.air_quality_label}
              </span>
            </span>
            <span>
              <span style={{ color: c.muted }}>UV </span>
              <span style={{ color: (aq.uv_index ?? 0) <= 2 ? c.green : (aq.uv_index ?? 0) <= 5 ? '#eab308' : '#ef4444', fontWeight: 700 }}>
                {aq.uv_index}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function NewsCard({ signals, cardStyle, headerStyle }: {
  signals: Signals
  cardStyle: React.CSSProperties
  headerStyle: React.CSSProperties
}) {
  const news = signals.news as { headlines?: Array<{ title: string; source?: string }> } | undefined

  if (!news) return <CardError cardStyle={cardStyle} headerStyle={headerStyle} label="// NEWS" reason="NEWS_API_KEY not set" />

  const headlines = news.headlines ?? []

  return (
    <div style={cardStyle}>
      <h3 style={headerStyle}><span>// NEWS</span></h3>
      {headlines.map((h, i) => (
        <div key={i} style={{
          padding: '3px 0',
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px',
        }}>
          <span style={{ fontSize: '11px', color: c.primary, fontFamily: c.font, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {h.title}
          </span>
          {h.source && (
            <span style={{ fontSize: '9px', color: c.muted, fontFamily: c.font, flexShrink: 0 }}>
              {h.source}
            </span>
          )}
        </div>
      ))}
      {headlines.length === 0 && (
        <div style={{ fontSize: '11px', color: c.muted, fontFamily: c.font }}>No headlines</div>
      )}
    </div>
  )
}

function MarketCard({ signals, cardStyle, headerStyle }: {
  signals: Signals
  cardStyle: React.CSSProperties
  headerStyle: React.CSSProperties
}) {
  const market = signals.market as { symbol?: string; price?: string; change?: string; change_percent?: string; direction?: string } | undefined

  if (!market) return <CardError cardStyle={cardStyle} headerStyle={headerStyle} label="// MARKET" reason="ALPHA_VANTAGE_API_KEY not set" />

  const isUp = market.direction === 'up'
  const isDown = market.direction === 'down'
  const dirColor = isUp ? c.green : isDown ? '#ef4444' : c.dim
  const arrow = isUp ? '▲' : isDown ? '▼' : '—'

  return (
    <div style={cardStyle}>
      <h3 style={headerStyle}><span>// MARKET</span></h3>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
        <span style={{ fontSize: '9px', fontWeight: 700, color: c.muted, fontFamily: c.font }}>{market.symbol}</span>
        <span style={{ fontSize: '20px', fontWeight: 700, color: c.primary, fontFamily: c.font }}>
          ${parseFloat(market.price ?? '0').toFixed(2)}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontSize: '14px', color: dirColor }}>{arrow}</span>
        <span style={{ fontSize: '13px', fontWeight: 700, color: dirColor, fontFamily: c.font }}>
          {market.change} ({market.change_percent})
        </span>
      </div>
    </div>
  )
}

function CardError({ cardStyle, headerStyle, label, reason }: {
  cardStyle: React.CSSProperties
  headerStyle: React.CSSProperties
  label: string
  reason: string
}) {
  return (
    <div style={{ ...cardStyle, borderColor: 'rgba(239,68,68,0.2)', opacity: 0.6 }}>
      <h3 style={headerStyle}><span>{label}</span></h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
        <span style={{ fontSize: '11px', color: '#f87171', fontFamily: c.font, fontWeight: 700 }}>API unavailable</span>
      </div>
      <div style={{ fontSize: '9px', color: c.muted, fontFamily: c.font, marginTop: '4px' }}>{reason}</div>
    </div>
  )
}

// ─── Zone 5: Bottom Row ──────────────────────────────────────────────────────

function BottomRow({ signals, meta }: { signals: Signals; meta: Meta | null }) {
  const music = signals.music as { bands?: string[] } | undefined
  const books = signals.books as { currently_reading?: string[] } | undefined

  // Compute missing signals from meta
  const missingProviders = meta
    ? Object.entries(meta.sources)
        .filter(([, src]) => src.status === 'error' || src.status === 'skipped')
        .map(([name, src]) => ({ name, reason: src.reason }))
    : []

  const halfCardStyle: React.CSSProperties = {
    background: c.cardBg,
    border: `1px solid ${c.border}`,
    borderRadius: '4px',
    padding: '14px',
    flex: 1,
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '.12em',
    color: c.dim,
    fontFamily: c.font,
    marginBottom: '10px',
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px',
      marginBottom: '24px',
    }}>
      {/* Left half: Music + Books */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* Music */}
        <div style={halfCardStyle}>
          <h3 style={{ ...labelStyle, marginTop: 0 }}>// MUSIC</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {(music?.bands ?? []).map((band, i) => (
              <span key={i} style={{
                fontSize: '10px',
                background: 'rgba(74,143,212,0.12)',
                color: c.blue,
                padding: '3px 8px',
                borderRadius: '10px',
                fontFamily: c.font,
              }}>
                {band}
              </span>
            ))}
            {(!music?.bands || music.bands.length === 0) && (
              <span style={{ fontSize: '11px', color: c.muted, fontFamily: c.font }}>No bands</span>
            )}
          </div>
        </div>

        {/* Books */}
        <div style={halfCardStyle}>
          <h3 style={{ ...labelStyle, marginTop: 0 }}>// BOOKS</h3>
          {(books?.currently_reading ?? []).length > 0 ? (
            (books!.currently_reading!).map((book, i) => (
              <div key={i} style={{
                fontSize: '11px',
                color: c.primary,
                fontFamily: c.font,
                padding: '2px 0',
              }}>
                {book}
              </div>
            ))
          ) : (
            <div style={{ fontSize: '11px', color: c.muted, fontFamily: c.font, fontStyle: 'italic' }}>
              nothing currently
            </div>
          )}
        </div>
      </div>

      {/* Right half: Missing Signals */}
      <div style={{
        border: `1px dashed ${c.border}`,
        borderRadius: '4px',
        padding: '14px',
      }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.12em',
          color: c.muted,
          fontFamily: c.font,
          marginBottom: '10px',
        }}>
          MISSING SIGNALS
        </div>
        {missingProviders.length > 0 ? (
          missingProviders.map((mp, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '2px 0',
            }}>
              <span style={{
                fontSize: '10px',
                color: c.muted,
                fontFamily: c.font,
              }}>
                {mp.name.replace(/_/g, ' ')}
              </span>
              <span style={{
                fontSize: '9px',
                color: c.muted,
                fontFamily: c.font,
              }}>
                {mp.reason?.slice(0, 30) ?? 'unknown'}
              </span>
            </div>
          ))
        ) : (
          <div style={{ fontSize: '11px', color: c.dim, fontFamily: c.font, fontStyle: 'italic' }}>
            All signals healthy
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Progress / Success / Error Sub-components ───────────────────────────────

function ProgressSection({ phases, logLines, attemptNum, logEndRef, elapsedMs }: {
  phases: Phase[]; logLines: string[]; attemptNum: number;
  logEndRef: React.RefObject<HTMLDivElement | null>; elapsedMs: number
}) {
  const activePhase = phases.find(p => p.status === 'active')
  const isClaudePhase = activePhase?.label === 'Claude designing'
  const claudeElapsed = isClaudePhase && activePhase.startedAt ? Date.now() - activePhase.startedAt : 0
  const estimatedClaudeMs = 120000
  const claudeProgress = isClaudePhase ? Math.min(95, (claudeElapsed / estimatedClaudeMs) * 100) : 0

  return (
    <div style={{
      border: `1px solid ${c.border}`,
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '16px',
    }}>
      <div style={{
        background: c.cardBg,
        borderBottom: `1px solid ${c.border}`,
        padding: '10px 14px',
        fontSize: '11px',
        fontWeight: 700,
        color: c.dim,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: c.font,
      }}>
        <span>// PIPELINE · Attempt {attemptNum} of 3</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontFamily: c.font, color: c.muted, fontSize: '11px' }}>{fmtElapsed(elapsedMs)}</span>
          <span style={{ color: c.cyan }}>● running</span>
        </div>
      </div>

      {/* Progress bar for Claude phase */}
      {isClaudePhase && (
        <div style={{ height: '2px', background: c.border }}>
          <div style={{
            height: '100%',
            background: `linear-gradient(90deg, ${c.cyan}, ${c.blue})`,
            width: `${claudeProgress}%`,
            transition: 'width 0.5s ease',
          }} />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
        {/* Phase tracker */}
        <div style={{
          padding: '14px',
          borderRight: `1px solid ${c.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '9px',
          background: c.cardBg,
        }}>
          {phases.map(p => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <PhaseDot status={p.status} />
              <span style={{
                fontSize: '10px',
                flex: 1,
                fontFamily: c.font,
                color: p.status === 'pending' ? c.muted : p.status === 'done' ? c.muted : c.primary,
                fontWeight: p.status === 'active' ? 700 : 400,
                textDecoration: p.status === 'done' ? 'line-through' : 'none',
              }}>{p.label}</span>
              {p.status === 'done' && p.durationMs != null && (
                <span style={{
                  fontSize: '9px',
                  fontFamily: c.font,
                  color: c.muted,
                  background: c.border,
                  padding: '1px 5px',
                  borderRadius: '3px',
                }}>
                  {fmtDuration(p.durationMs)}
                </span>
              )}
              {p.status === 'active' && p.startedAt && (
                <span style={{
                  fontSize: '9px',
                  fontFamily: c.font,
                  color: c.cyan,
                  background: 'rgba(0,229,255,0.08)',
                  padding: '1px 5px',
                  borderRadius: '3px',
                }}>
                  {fmtDuration(Date.now() - p.startedAt)}
                </span>
              )}
            </div>
          ))}

          {isClaudePhase && claudeElapsed > 5000 && (
            <div style={{
              marginTop: '6px',
              padding: '6px 8px',
              background: 'rgba(0,229,255,0.06)',
              border: `1px solid rgba(0,229,255,0.12)`,
              borderRadius: '4px',
              fontSize: '9px',
              color: c.cyan,
              fontFamily: c.font,
            }}>
              Est. remaining: ~{fmtDuration(Math.max(0, estimatedClaudeMs - claudeElapsed))}
            </div>
          )}
        </div>

        {/* Log pane */}
        <div style={{
          background: '#020810',
          padding: '14px',
          fontFamily: c.font,
          fontSize: '10px',
          lineHeight: '1.8',
          color: c.muted,
          minHeight: '180px',
          maxHeight: '220px',
          overflowY: 'auto',
        }}>
          {logLines.map((line, i) => (
            <div key={i} style={{
              color: line.includes('===') || line.includes('calling claude') || line.includes('claude CLI')
                ? c.cyan
                : c.muted,
            }}>{line}</div>
          ))}
          <span style={{ color: c.cyan }}>_</span>
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  )
}

function PhaseDot({ status }: { status: 'pending' | 'active' | 'done' }) {
  const base = {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px',
    fontFamily: c.font,
  } as React.CSSProperties

  if (status === 'done') return (
    <div style={{ ...base, background: c.green, color: c.pageBg }}>
      <span style={{ lineHeight: 1 }}>+</span>
    </div>
  )
  if (status === 'active') return (
    <div style={{ ...base, background: c.cyan, animation: 'pulse 1.5s ease-in-out infinite' }} />
  )
  return <div style={{ ...base, background: c.border, border: `1px solid ${c.ghost}` }} />
}

function SuccessSection({ brief, timestamp, attemptNum, archive, totalMs, phases, onRunAgain, cooldownLeft, isCooldown }: {
  brief: string; timestamp: string; attemptNum: number; archive: ArchiveEntry[];
  totalMs: number; phases: Phase[]; onRunAgain: () => void; cooldownLeft: number; isCooldown: boolean
}) {
  const today = new Date().toISOString().slice(0, 10)
  const siteUrl = window.location.origin

  return (
    <div style={{
      border: `1px solid rgba(92,190,74,0.3)`,
      borderRadius: '4px',
      background: 'rgba(92,190,74,0.04)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderBottom: `1px solid rgba(92,190,74,0.15)`,
      }}>
        <div style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: c.green,
          color: c.pageBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 700,
          flexShrink: 0,
          fontFamily: c.font,
        }}>+</div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: c.green, fontFamily: c.font }}>
            Build passed -- committed
          </div>
          <div style={{ fontSize: '11px', color: c.secondary, fontStyle: 'italic', fontFamily: c.font }}>
            "{brief}"
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ textAlign: 'right' as const }}>
            <div style={{ fontSize: '10px', color: c.green, fontFamily: c.font }}>{timestamp}</div>
            <div style={{ fontSize: '9px', color: c.dim, fontFamily: c.font }}>
              Total: {fmtDuration(totalMs)} · {attemptNum} attempt{attemptNum !== 1 ? 's' : ''}
            </div>
          </div>
          <button onClick={() => window.open(siteUrl, '_blank')} style={{
            background: c.green,
            color: c.pageBg,
            border: 'none',
            borderRadius: '4px',
            padding: '5px 12px',
            fontSize: '10px',
            fontWeight: 700,
            cursor: 'pointer',
            flexShrink: 0,
            fontFamily: c.font,
            letterSpacing: '.05em',
          }}>OPEN SITE</button>
        </div>
      </div>

      {/* Phase breakdown */}
      <div style={{ padding: '10px 16px', borderBottom: `1px solid rgba(92,190,74,0.1)` }}>
        <div style={{
          fontSize: '9px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.12em',
          color: c.dim,
          marginBottom: '6px',
          fontFamily: c.font,
        }}>Step Timings</div>
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
          {phases.map((p, i) => {
            const pct = p.durationMs && totalMs ? Math.max(3, (p.durationMs / totalMs) * 100) : 3
            const greens = [
              'rgba(92,190,74,0.15)',
              'rgba(92,190,74,0.25)',
              'rgba(92,190,74,0.35)',
              'rgba(92,190,74,0.50)',
              'rgba(92,190,74,0.65)',
              c.green,
            ]
            return (
              <div key={p.label} title={`${p.label}: ${p.durationMs ? fmtDuration(p.durationMs) : '--'}`} style={{
                height: '18px',
                flex: `${pct} 0 0`,
                background: greens[i],
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                color: i > 3 ? c.pageBg : c.green,
                fontWeight: 700,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                fontFamily: c.font,
              }}>
                {pct > 8 ? (p.durationMs ? fmtDuration(p.durationMs) : '') : ''}
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          {phases.map(p => (
            <span key={p.label} style={{ fontSize: '9px', color: c.muted, fontFamily: c.font }}>{p.label.split(' ')[0]}</span>
          ))}
        </div>
      </div>

      {/* Recent designs */}
      <div style={{ padding: '10px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '.12em',
            color: c.dim,
            fontFamily: c.font,
          }}>Recent designs</div>
          <button
            onClick={onRunAgain}
            disabled={isCooldown}
            style={{
              background: isCooldown ? c.muted : c.green,
              color: c.pageBg,
              border: 'none',
              borderRadius: '4px',
              padding: '3px 10px',
              fontSize: '9px',
              fontWeight: 700,
              cursor: isCooldown ? 'default' : 'pointer',
              opacity: isCooldown ? 0.6 : 1,
              fontFamily: c.font,
              letterSpacing: '.05em',
            }}
          >
            {isCooldown ? `RUN AGAIN IN ${cooldownLeft}s` : 'RUN AGAIN'}
          </button>
        </div>
        {archive.map((entry, i) => {
          const isToday = entry.date === today
          return (
            <div key={entry.date + i} style={{
              display: 'flex',
              gap: '10px',
              padding: '5px 0',
              borderBottom: i < archive.length - 1 ? `1px solid ${c.border}` : 'none',
            }}>
              <span style={{
                fontSize: '10px',
                fontWeight: isToday ? 700 : 400,
                color: isToday ? c.green : c.dim,
                minWidth: '85px',
                fontFamily: c.font,
              }}>
                {entry.date}{isToday ? ' *' : ''}
              </span>
              <span style={{
                fontSize: '10px',
                color: isToday ? c.secondary : c.muted,
                fontStyle: 'italic',
                fontWeight: isToday ? 700 : 400,
                fontFamily: c.font,
              }}>
                {entry.brief}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ErrorSection({ error, totalMs, onRetry }: { error: string; totalMs: number; onRetry: () => void }) {
  return (
    <div style={{
      border: `1px solid rgba(220,38,38,0.3)`,
      borderRadius: '4px',
      background: 'rgba(220,38,38,0.06)',
      padding: '16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
    }}>
      <div style={{ color: '#ef4444', fontSize: '16px', flexShrink: 0, fontFamily: c.font, fontWeight: 700 }}>X</div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 700,
          color: '#ef4444',
          marginBottom: '4px',
          fontFamily: c.font,
        }}>
          Pipeline failed
          <span style={{ fontWeight: 400, fontSize: '10px', color: '#f87171', marginLeft: '6px' }}>
            ({fmtDuration(totalMs)})
          </span>
        </div>
        <div style={{ fontSize: '10px', color: '#f87171', fontFamily: c.font }}>{error}</div>
      </div>
      <button onClick={onRetry} style={{
        background: '#ef4444',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '7px 14px',
        fontSize: '11px',
        fontWeight: 700,
        cursor: 'pointer',
        flexShrink: 0,
        fontFamily: c.font,
        letterSpacing: '.05em',
      }}>RETRY</button>
    </div>
  )
}
