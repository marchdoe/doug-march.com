import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '4',
})

const sectionWrap = css({
  marginBottom: '6',
})

const projectRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  paddingTop: '3',
  paddingBottom: '3',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const projectTitle = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  fontWeight: 'medium',
  color: 'text',
  textDecoration: 'none',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
})

const projectMeta = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  letterSpacing: '0.05em',
  whiteSpace: 'nowrap',
  marginLeft: '4',
})

const leaderRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  paddingTop: '2',
  paddingBottom: '2',
})

const leaderName = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  color: 'text',
})

const leaderScore = css({
  fontFamily: 'body',
  fontSize: '1rem',
  fontWeight: 'medium',
  color: 'accent',
  fontVariantNumeric: 'tabular-nums',
})

const signalLine = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: 'loose',
})

const signalStrip = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4',
  marginTop: '3',
})

const featuredWrap = css({
  marginBottom: '6',
  padding: '4',
  background: 'bgCard',
  borderRadius: 'sm',
})

const featuredTitle = css({
  fontFamily: 'body',
  fontSize: '1.125rem',
  fontWeight: 'semibold',
  color: 'text',
  marginBottom: '2',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  color: 'textSecondary',
  lineHeight: 'normal',
  marginBottom: '3',
  maxWidth: '65ch',
})

const featuredLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
})

const hnCallout = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  letterSpacing: '0.05em',
  marginTop: '4',
  fontStyle: 'italic',
})

const footerWrap = css({
  marginTop: '8',
  paddingTop: '4',
  borderTop: '1px solid',
  borderColor: 'borderSubtle',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
})

const archiveLink = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
})

function HomePage() {
  const leaderboard = [
    { name: 'Scheffler', pos: 'T1', score: '−21' },
    { name: 'Hovland', pos: 'T1', score: '−21' },
    { name: 'Morikawa', pos: 'T3', score: '−20' },
  ]

  return (
    <>
      {/* Golf Leaderboard */}
      <div className={sectionWrap}>
        <p className={sectionLabel}>Travelers Championship · In Progress</p>
        {leaderboard.map((p) => (
          <div key={p.name} className={leaderRow}>
            <span className={leaderName}>{p.pos} {p.name}</span>
            <span className={leaderScore}>{p.score}</span>
          </div>
        ))}
      </div>

      {/* Featured Project */}
      {featuredProject && (
        <div className={featuredWrap}>
          <p className={sectionLabel}>Featured</p>
          <h2 className={featuredTitle}>{featuredProject.title}</h2>
          {featuredProject.problem && (
            <p className={featuredProblem}>{featuredProject.problem}</p>
          )}
          {featuredProject.externalUrl && (
            <a href={featuredProject.externalUrl} className={featuredLink}>
              Visit Project ↗
            </a>
          )}
        </div>
      )}

      {/* Selected Work */}
      <div className={sectionWrap}>
        <p className={sectionLabel}>Selected Work</p>
        {selectedWork.map((p) => (
          <div key={p.slug} className={projectRow}>
            <a href={`/work/${p.slug}`} className={projectTitle}>
              {p.title}
            </a>
            <span className={projectMeta}>{p.type} · {p.year}</span>
          </div>
        ))}
      </div>

      {/* Experiments */}
      <div className={sectionWrap}>
        <p className={sectionLabel}>Experiments</p>
        {experiments.map((p) => (
          <div key={p.slug} className={projectRow}>
            <a
              href={p.externalUrl || `/work/${p.slug}`}
              className={projectTitle}
            >
              {p.title}
            </a>
            <span className={projectMeta}>{p.type} · {p.year}</span>
          </div>
        ))}
      </div>

      {/* HN callout */}
      <p className={hnCallout}>#HN 545 → ATS can't grade its own output</p>

      {/* Signals strip */}
      <div className={signalStrip}>
        <span className={signalLine}>DET 5 · 7 OPP</span>
        <span className={signalLine} style={{ color: '#52C896' }}>● Full Moon</span>
        <span className={signalLine}>Independence Day −5 Days</span>
        <span className={signalLine}>♫ War on Drugs · GbV · Radiohead</span>
      </div>

      {/* Footer */}
      <div className={footerWrap}>
        <span className={footerText}>© 2026</span>
        <a href="/archive" className={archiveLink}>Archive</a>
      </div>
    </>
  )
}