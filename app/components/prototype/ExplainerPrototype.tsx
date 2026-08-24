/**
 * PROTOTYPE — issue #159. Throwaway. Do not promote as-is.
 *
 * Three layouts for the explainer at /how/<date>, switchable via ?variant=.
 * Reads records built by scripts/proto-159-build-records.js, which implement
 * #153's schema against the real archive.
 *
 * Fixed neutral identity from the archive.* tokens added in #157. It does NOT
 * wear the day's identity — #152 reserves that for the preserved design.
 */
import { useEffect, useState } from 'react'
import { css } from '../../../styled-system/css'

export const EXPLAINER_VARIANTS: Record<string, string> = {
  A: 'Colour leads — hue as the hero',
  B: 'Spec sheet — two columns, metadata rail',
  C: 'Build order — the sequence that made the day',
}

export interface Record159 {
  date: string
  era: string
  buildId: string | null
  attempts: number
  brief: string | null
  rationale: string | null
  filesChanged: string[]
  legacyArchetype: string | null
  signals: Record<string, unknown> | null
  hero: { copy: string | null; rationale: string | null; source: string | null } | null
  chassis: string | null
  adBrief: Record<string, string> | null
  tokens: {
    colors: { ramps: Record<string, Record<string, string>>; semantic: Record<string, Record<string, string>> }
    spacing?: Record<string, string>
    fontWeights?: Record<string, string>
  } | null
  colorScheme: {
    primary_hue?: { h: number; s: number; l: number; name?: string }
    neutral_family?: { name?: string; tinted_toward?: string }
    mood_word?: string
    color_story?: string
    secondary_accent?: unknown
  } | null
  shell: Record<string, string> | null
  composition: Record<string, string> | null
  lane: { laneId?: string; register?: string } | null
  cost: { total_usd?: number; retries?: number; calls?: number } | null
}

const ERA_LABEL: Record<string, string> = {
  prose: 'Prose era — brief and archetype only',
  logged: 'Logged era — build metadata added',
  traced: 'Traced era — signals, tokens, and the Art Director brief added',
  'color-directed': 'Colour-directed era — a declared colour scheme added',
  'shell-directed': 'Shell-directed era — the page shell became a declared choice',
  grammar: 'Grammar era — composition tuple and aesthetic lane added',
}

// ------------------------------------------------------------------ helpers

const hueCss = (r: Record159) => {
  const p = r.colorScheme?.primary_hue
  return p ? `hsl(${p.h} ${p.s}% ${p.l}%)` : '#3a3a42'
}

function pretty(d: string) {
  return new Date(`${d}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/** One headline line per signal provider, so signals read as content not JSON. */
function signalLine(key: string, v: unknown): string | null {
  const o = v as Record<string, unknown>
  if (!o || typeof o !== 'object') return typeof v === 'string' ? v : null
  switch (key) {
    case 'quote':
      return o.text ? `“${o.text}” — ${o.author ?? 'unknown'}` : null
    case 'lunar':
      return `${o.phase ?? ''} · ${o.illumination ?? '?'}% illuminated`
    case 'sun':
      return `${o.sunrise ?? '?'} → ${o.sunset ?? '?'} · ${o.daylight_hours ?? '?'} hrs light`
    case 'season':
      return `${o.season ?? ''} · ${o.month_name ?? ''} ${o.day ?? ''} · day ${o.day_of_year ?? '?'} of the year`
    case 'day_of_week':
      return `${o.day ?? ''}${o.is_weekend ? ' · weekend' : ''}`
    case 'golf': {
      const leaders = (o.leaders as Array<Record<string, unknown>>) ?? []
      return `${o.tournament ?? 'tournament'} · ${o.status ?? ''}${leaders[0] ? ` · leader ${leaders[0].name ?? ''}` : ''}`
    }
    case 'hacker_news': {
      const s = (o.stories as Array<Record<string, unknown>>) ?? []
      return s[0] ? String(s[0].title ?? '') : null
    }
    default:
      return null
  }
}

/** Generic fallback: count what a provider carried. */
function signalCount(v: unknown): string {
  const o = v as Record<string, unknown>
  if (!o || typeof o !== 'object') return ''
  for (const val of Object.values(o)) {
    if (Array.isArray(val)) return `${val.length} item${val.length === 1 ? '' : 's'}`
  }
  return `${Object.keys(o).length} field${Object.keys(o).length === 1 ? '' : 's'}`
}

// ------------------------------------------------------------------ shared css

const page = css({
  minHeight: '100vh',
  background: 'archive.bg',
  color: 'archive.text',
  fontFamily: 'mono',
  paddingBottom: '120px',
})

const kicker = css({
  fontSize: '2xs',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'archive.dim',
})

const sectionHead = css({
  fontSize: '2xs',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'archive.dim',
  borderTop: '1px solid',
  borderColor: 'archive.line',
  paddingTop: '10px',
  marginBottom: '16px',
})

const prose = css({ fontSize: 'sm', lineHeight: '1.75', color: 'archive.text', maxWidth: '62ch', whiteSpace: 'pre-wrap' })
const dimProse = css({ fontSize: 'xs', lineHeight: '1.75', color: 'archive.dim', maxWidth: '62ch', whiteSpace: 'pre-wrap' })

const absent = css({
  fontSize: 'xs',
  color: 'archive.faint',
  fontStyle: 'italic',
  border: '1px dashed',
  borderColor: 'archive.lineSoft',
  padding: '12px 14px',
})

/** #159: a sparse day must read as "this predates the field", not as broken. */
function Absent({ what, era }: { what: string; era: string }) {
  return <p className={absent}>No {what}. The pipeline had no such concept in the {era} era.</p>
}

// ------------------------------------------------------------------ blocks

const rampRow = css({ display: 'flex', gap: '2px', marginBottom: '6px' })
const rampCell = css({ height: '30px', flex: 1, background: 'var(--c)' })
const rampName = css({ fontSize: '2xs', color: 'archive.dim', marginBottom: '4px', letterSpacing: '0.1em' })

function Tokens({ r }: { r: Record159 }) {
  if (!r.tokens) return <Absent what="token record" era={r.era} />
  const ramps = Object.entries(r.tokens.colors.ramps)
  return (
    <div>
      {ramps.map(([fam, stops]) => (
        <div key={fam}>
          <div className={rampName}>
            {fam} · {Object.keys(stops).length} stops
          </div>
          <div className={rampRow}>
            {Object.entries(stops).map(([k, hex]) => (
              <div key={k} className={rampCell} style={{ ['--c' as string]: hex }} title={`${fam}.${k} ${hex}`} />
            ))}
          </div>
        </div>
      ))}
      {ramps.length === 0 && <Absent what="colour ramps" era={r.era} />}
    </div>
  )
}

const tupleGrid = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', sm: 'repeat(2, 1fr)' },
  gap: '1px',
  background: 'archive.line',
  border: '1px solid',
  borderColor: 'archive.line',
})
const tupleCell = css({ background: 'archive.bg', padding: '10px 12px' })
const tupleKey = css({ fontSize: '2xs', color: 'archive.faint', letterSpacing: '0.12em', textTransform: 'uppercase' })
const tupleVal = css({ fontSize: 'xs', color: 'archive.text', marginTop: '4px' })

function KeyValues({ data }: { data: Record<string, unknown> }) {
  return (
    <div className={tupleGrid}>
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className={tupleCell}>
          <div className={tupleKey}>{k.replace(/_/g, ' ')}</div>
          <div className={tupleVal}>{typeof v === 'string' ? v : JSON.stringify(v)}</div>
        </div>
      ))}
    </div>
  )
}

const sigGrid = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
  gap: '10px',
})
const sigCard = css({
  border: '1px solid',
  borderColor: 'archive.lineSoft',
  padding: '12px 14px',
})
const sigName = css({ fontSize: '2xs', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'archive.faint' })
const sigBody = css({ fontSize: 'xs', color: 'archive.text', marginTop: '6px', lineHeight: '1.6' })

function Signals({ r }: { r: Record159 }) {
  if (!r.signals) return <Absent what="signal record" era={r.era} />
  const entries = Object.entries(r.signals).filter(([k]) => k !== 'date')
  return (
    <div className={sigGrid}>
      {entries.map(([k, v]) => (
        <div key={k} className={sigCard}>
          <div className={sigName}>{k.replace(/_/g, ' ')}</div>
          <div className={sigBody}>{signalLine(k, v) ?? signalCount(v)}</div>
        </div>
      ))}
    </div>
  )
}

// ------------------------------------------------------------------ Variant A

const aHero = css({
  background: 'var(--hue)',
  padding: { base: '48px 20px', md: '96px 48px 64px' },
  color: 'var(--ink)',
})
const aMood = css({
  fontSize: { base: '3xl', md: '6xl' },
  lineHeight: '0.95',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
})
const aBody = css({
  padding: { base: '32px 20px', md: '48px' },
  maxWidth: '900px',
  display: 'grid',
  gap: '40px',
})

function inkOn(r: Record159): string {
  const p = r.colorScheme?.primary_hue
  if (!p) return '#e8e8ea'
  const { h, s, l } = p
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    return l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
  }
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(f(0)) + 0.7152 * lin(f(8)) + 0.0722 * lin(f(4)) > 0.35 ? '#0e0e10' : '#f2f2f4'
}

function VariantA({ r }: { r: Record159 }) {
  return (
    <div>
      <div className={aHero} style={{ ['--hue' as string]: hueCss(r), ['--ink' as string]: inkOn(r) }}>
        <p className={kicker} style={{ color: 'inherit', opacity: 0.7 }}>
          {pretty(r.date)}
        </p>
        <h1 className={aMood} style={{ marginTop: 18 }}>
          {r.colorScheme?.mood_word ?? r.legacyArchetype ?? r.era}
        </h1>
        {r.colorScheme?.primary_hue?.name && (
          <p style={{ marginTop: 16, opacity: 0.8, fontSize: 13 }}>
            {r.colorScheme.primary_hue.name} · H{r.colorScheme.primary_hue.h}° S
            {r.colorScheme.primary_hue.s}% L{r.colorScheme.primary_hue.l}%
          </p>
        )}
      </div>
      <div className={aBody}>
        {r.colorScheme?.color_story && (
          <section>
            <div className={sectionHead}>Why this colour</div>
            <p className={prose}>{r.colorScheme.color_story}</p>
          </section>
        )}
        <section>
          <div className={sectionHead}>The brief</div>
          <p className={prose}>{r.brief ?? '—'}</p>
        </section>
        <section>
          <div className={sectionHead}>Tokens</div>
          <Tokens r={r} />
        </section>
        <section>
          <div className={sectionHead}>Signals that made it</div>
          <Signals r={r} />
        </section>
        <section>
          <div className={sectionHead}>Rationale</div>
          <p className={dimProse}>{r.rationale ?? '—'}</p>
        </section>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ Variant B

const bWrap = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: '260px 1fr' },
  gap: { base: '32px', md: '48px' },
  padding: { base: '32px 20px', md: '56px 48px' },
  maxWidth: '1180px',
})
const bRail = css({ display: 'grid', gap: '18px', alignContent: 'start' })
const bMeta = css({ borderTop: '1px solid', borderColor: 'archive.line', paddingTop: '8px' })
const bMetaK = css({ fontSize: '2xs', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'archive.faint' })
const bMetaV = css({ fontSize: 'xs', color: 'archive.text', marginTop: '5px', lineHeight: '1.5' })
const bMain = css({ display: 'grid', gap: '36px', minWidth: 0 })
const bChip = css({ display: 'inline-block', width: '14px', height: '14px', background: 'var(--hue)', verticalAlign: '-2px', marginRight: '8px' })

function Meta({ k, v }: { k: string; v: string | null | undefined }) {
  return (
    <div className={bMeta}>
      <div className={bMetaK}>{k}</div>
      <div className={bMetaV} style={v ? undefined : { opacity: 0.35, fontStyle: 'italic' }}>
        {v ?? 'not recorded'}
      </div>
    </div>
  )
}

function VariantB({ r }: { r: Record159 }) {
  return (
    <div className={bWrap}>
      <aside className={bRail}>
        <div>
          <p className={kicker}>How this was made</p>
          <h1 style={{ fontSize: 20, marginTop: 10, fontWeight: 400 }}>{pretty(r.date)}</h1>
        </div>
        <Meta k="Era" v={ERA_LABEL[r.era]} />
        <Meta
          k="Primary hue"
          v={r.colorScheme?.primary_hue?.name ? `${r.colorScheme.primary_hue.name}` : null}
        />
        <Meta k="Mood" v={r.colorScheme?.mood_word ?? null} />
        <Meta k="Chassis" v={r.chassis} />
        <Meta k="Lane" v={r.lane?.laneId ? `${r.lane.laneId} · ${r.lane.register ?? ''}` : null} />
        <Meta k="Legacy archetype" v={r.legacyArchetype} />
        <Meta k="Attempts" v={r.attempts > 1 ? `${r.attempts} builds` : '1 build'} />
        <Meta k="Files changed" v={r.filesChanged.length ? `${r.filesChanged.length} files` : null} />
      </aside>
      <div className={bMain}>
        <section>
          <div className={sectionHead}>The brief</div>
          <p className={prose}>
            {r.colorScheme?.primary_hue && <span className={bChip} style={{ ['--hue' as string]: hueCss(r) }} />}
            {r.brief ?? '—'}
          </p>
        </section>
        <section>
          <div className={sectionHead}>Composition</div>
          {r.composition ? <KeyValues data={r.composition} /> : <Absent what="composition tuple" era={r.era} />}
        </section>
        <section>
          <div className={sectionHead}>Shell</div>
          {r.shell ? <KeyValues data={r.shell} /> : <Absent what="declared shell" era={r.era} />}
        </section>
        <section>
          <div className={sectionHead}>Tokens</div>
          <Tokens r={r} />
        </section>
        <section>
          <div className={sectionHead}>Signals</div>
          <Signals r={r} />
        </section>
        <section>
          <div className={sectionHead}>Rationale</div>
          <p className={dimProse}>{r.rationale ?? '—'}</p>
        </section>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ Variant C

const cWrap = css({ maxWidth: '820px', padding: { base: '32px 20px', md: '56px 48px' } })
const cStep = css({
  position: 'relative',
  paddingLeft: { base: '28px', md: '40px' },
  paddingBottom: '40px',
  borderLeft: '1px solid',
  borderColor: 'archive.line',
})
const cDot = css({
  position: 'absolute',
  left: '-5px',
  top: '2px',
  width: '9px',
  height: '9px',
  borderRadius: '50%',
  background: 'var(--hue)',
})
const cNum = css({ fontSize: '2xs', letterSpacing: '0.2em', color: 'archive.faint', marginBottom: '8px' })
const cTitle = css({ fontSize: 'md', marginBottom: '14px', fontWeight: 400 })

function Step({
  n,
  title,
  hue,
  children,
}: {
  n: string
  title: string
  hue: string
  children: React.ReactNode
}) {
  return (
    <div className={cStep}>
      <span className={cDot} style={{ ['--hue' as string]: hue }} />
      <div className={cNum}>{n}</div>
      <h2 className={cTitle}>{title}</h2>
      {children}
    </div>
  )
}

function VariantC({ r }: { r: Record159 }) {
  const hue = hueCss(r)
  return (
    <div className={cWrap}>
      <p className={kicker}>How this was made</p>
      <h1 style={{ fontSize: 26, margin: '12px 0 8px', fontWeight: 400 }}>{pretty(r.date)}</h1>
      <p style={{ fontSize: 12, color: '#8a8a93', marginBottom: 44 }}>{ERA_LABEL[r.era]}</p>

      <Step n="01" title="The day arrived" hue={hue}>
        <Signals r={r} />
      </Step>
      <Step n="02" title="The Art Director read it" hue={hue}>
        {r.hero?.copy ? (
          <>
            <p className={prose} style={{ fontSize: 18, lineHeight: 1.4, marginBottom: 14 }}>
              “{r.hero.copy}”
            </p>
            <p className={dimProse}>{r.hero.rationale ?? ''}</p>
          </>
        ) : (
          <Absent what="Art Director brief" era={r.era} />
        )}
      </Step>
      <Step n="03" title="A colour was chosen" hue={hue}>
        {r.colorScheme ? (
          <>
            <p className={prose} style={{ marginBottom: 14 }}>{r.colorScheme.color_story}</p>
            <Tokens r={r} />
          </>
        ) : (
          <Absent what="declared colour scheme" era={r.era} />
        )}
      </Step>
      <Step n="04" title="A structure was declared" hue={hue}>
        {r.composition ? (
          <KeyValues data={r.composition} />
        ) : r.legacyArchetype ? (
          <p className={prose}>
            Archetype: <strong>{r.legacyArchetype}</strong>. The eight-name vocabulary this belongs to was
            replaced by the composition grammar on 2026-08-23.
          </p>
        ) : (
          <Absent what="declared structure" era={r.era} />
        )}
      </Step>
      <Step n="05" title="It was built" hue={hue}>
        <p className={prose} style={{ marginBottom: 12 }}>{r.brief ?? '—'}</p>
        <p className={dimProse}>{r.rationale ?? ''}</p>
      </Step>
    </div>
  )
}

// ------------------------------------------------------------------ entry

export function ExplainerPrototype({ date, variant }: { date: string; variant: string }) {
  const [r, setR] = useState<Record159 | null>(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    fetch(`/_proto-record/${date}.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => (d ? setR(d) : setMissing(true)))
      .catch(() => setMissing(true))
  }, [date])

  if (missing) return <div className={page} style={{ padding: 48 }}>No record for {date}.</div>
  if (!r) return <div className={page} />

  return (
    <div className={page}>
      {variant === 'A' && <VariantA r={r} />}
      {variant === 'B' && <VariantB r={r} />}
      {variant === 'C' && <VariantC r={r} />}
    </div>
  )
}
