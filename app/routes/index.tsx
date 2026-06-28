import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const galleryGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto auto',
  gap: '12px',
  minHeight: 'calc(100vh - 80px)',
  paddingBottom: '32px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '3fr 1fr',
    gridTemplateRows: '1fr 180px',
  },
})

const quoteBlock = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '24px',
  minHeight: '50vh',
  '@media (min-width: 768px)': {
    padding: '40px',
    minHeight: '0',
  },
})

const heroText = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(2.5rem, 5.5vw, 6.5rem)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  textTransform: 'uppercase',
  color: 'text',
  maxWidth: '100%',
  textWrap: 'balance',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'normal',
  color: 'textMuted',
  marginTop: '24px',
  letterSpacing: 'wide',
})

const moonLabel = css({
  position: 'absolute',
  bottom: '24px',
  right: '24px',
  fontFamily: 'body',
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  '@media (min-width: 768px)': {
    bottom: '40px',
    right: '40px',
  },
})

const rightPanel = css({
  background: 'bgCard',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  overflow: 'hidden',
  '@media (min-width: 768px)': {
    padding: '24px',
  },
})

const tourneyName = css({
  fontFamily: 'body',
  fontSize: '0.5625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4px',
})

const tourneyRound = css({
  fontFamily: 'body',
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '20px',
})

const leaderRow = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const playerName = css({
  fontFamily: 'body',
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textSecondary',
})

const playerNameMuted = css({
  fontFamily: 'body',
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const leadScore = css({
  fontFamily: 'display',
  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
  fontWeight: 'bold',
  color: 'accent',
  lineHeight: '1',
})

const secondScore = css({
  fontFamily: 'display',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: 'textSecondary',
  lineHeight: '1',
})

const smallScore = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'semibold',
  color: 'textMuted',
})

const bottomBand = css({
  gridColumn: '1 / -1',
  borderTop: '1px solid',
  borderColor: 'borderSubtle',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '24px',
  padding: '20px 0 0',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '3fr 2fr',
    padding: '20px 0 0',
  },
})

const projectsSection = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.5625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '12px',
})

const projectRow = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  padding: '6px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  _last: { borderBottom: 'none' },
})

const projectTitle = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  fontWeight: 'medium',
  color: 'textSecondary',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  _hover: { color: 'accent', opacity: 1 },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
})

const projectMeta = css({
  fontFamily: 'body',
  fontSize: '0.625rem',
  fontWeight: 'semibold',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const signalsSection = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  justifyContent: 'flex-start',
})

const signalLine = css({
  fontFamily: 'body',
  fontSize: '0.5625rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const tigerScore = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'normal',
  color: 'textMuted',
})

const featuredBlock = css({
  marginBottom: '8px',
})

const featuredTitle = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  fontWeight: 'semibold',
  color: 'text',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  _hover: { color: 'accent', opacity: 1 },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textMuted',
  lineHeight: 'normal',
  marginTop: '2px',
})

function HomePage() {
  return (
    <div className={galleryGrid}>
      {/* QUOTE BLOCK — dominant */}
      <div className={quoteBlock}>
        <h1 className={heroText}>
          We can spend our whole lives escaping from the monsters of our minds.
        </h1>
        <p className={attribution}>— Pema Chodron</p>
        <span className={moonLabel} aria-label="Full moon at 99.2% illumination">● FULL MOON 99.2%</span>
      </div>

      {/* GOLF LEADERBOARD — right panel */}
      <aside className={rightPanel} aria-label="Golf leaderboard">
        <p className={tourneyName}>Travelers Championship</p>
        <p className={tourneyRound}>Sunday · Final Round</p>

        <div className={leaderRow}>
          <span className={playerName}>Hovland</span>
          <span className={leadScore}>-20</span>
        </div>
        <div className={leaderRow}>
          <span className={playerName}>Scheffler</span>
          <span className={secondScore}>-19</span>
        </div>
        <div className={leaderRow}>
          <span className={playerNameMuted}>Cantlay</span>
          <span className={smallScore}>-15</span>
        </div>
        <div className={leaderRow}>
          <span className={playerNameMuted}>Bhatia</span>
          <span className={smallScore}>-15</span>
        </div>
        <div className={leaderRow} style={{ borderBottom: 'none' }}>
          <span className={playerNameMuted}>Lowry</span>
          <span className={smallScore}>-13</span>
        </div>
      </aside>

      {/* BOTTOM BAND — projects + signals */}
      <div className={bottomBand}>
        <div className={projectsSection}>
          <span className={sectionLabel}>Selected Work</span>

          {featuredProject && (
            <div className={featuredBlock}>
              <a
                href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                className={featuredTitle}
              >
                {featuredProject.title}
              </a>
              {featuredProject.problem && (
                <p className={featuredProblem}>{featuredProject.problem}</p>
              )}
            </div>
          )}

          {selectedWork.map((p) => (
            <div key={p.slug} className={projectRow}>
              <a href={`/work/${p.slug}`} className={projectTitle}>
                {p.title}
              </a>
              <span className={projectMeta}>{p.type} · {p.year}</span>
            </div>
          ))}
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

        <div className={signalsSection}>
          <p className={signalLine}>DET Tigers</p>
          <p className={tigerScore}>6–8 L · Sat 6.27</p>

          <p className={signalLine} style={{ marginTop: '12px' }}>Independence Day in 6 Days</p>

          <p className={signalLine} style={{ marginTop: '12px' }}>
            Wet Leg · My Morning Jacket
          </p>

          <a href="/archive" className={css({
            fontFamily: 'body',
            fontSize: '0.5625rem',
            fontWeight: 'semibold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            textDecoration: 'none',
            marginTop: 'auto',
            paddingTop: '16px',
            _hover: { color: 'textSecondary', opacity: 1 },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
          })}>Archive</a>
        </div>
      </div>
    </div>
  )
}