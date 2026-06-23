import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const heroFold = css({
  minHeight: 'calc(100vh - 48px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 6vw',
  width: '100%',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(48px, 9vw, 130px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'accent',
  textWrap: 'balance',
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
})

const attribution = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '13px',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
  marginTop: '40px',
})

const foldDivider = css({
  width: '100%',
  height: '1px',
  background: 'border',
  border: 'none',
})

const pullFold = css({
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '96px 6vw',
  width: '100%',
})

const pullText = css({
  fontFamily: 'display',
  fontWeight: 'light',
  fontSize: 'clamp(22px, 2.6vw, 38px)',
  lineHeight: '1.35',
  color: 'textSecondary',
  maxWidth: '52ch',
})

const pullAttrib = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '13px',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
  marginTop: '32px',
})

const signalFold = css({
  minHeight: '60vh',
  padding: '96px 6vw',
  width: '100%',
})

const signalGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '48px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr',
    gap: '64px',
  },
})

const eyebrow = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '11px',
  color: 'accentDark',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
  marginBottom: '12px',
})

const signalCard = css({
  marginBottom: '32px',
})

const playerName = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '22px',
  lineHeight: 'snug',
  color: 'text',
})

const bigScore = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '28px',
  color: 'accent',
  fontVariantNumeric: 'tabular-nums',
  marginLeft: '12px',
})

const leaderRow = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '13px',
  color: 'text',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '1.85',
})

const leaderScore = css({
  color: 'textSecondary',
  marginLeft: '8px',
})

const footnote = css({
  fontFamily: 'body',
  fontWeight: 'light',
  fontStyle: 'italic',
  fontSize: '13px',
  color: 'textMuted',
  marginTop: '8px',
})

const tigerCard = css({
  borderLeft: '3px solid',
  borderColor: 'accent',
  paddingLeft: '16px',
})

const tigerScore = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '20px',
  color: 'text',
  lineHeight: 'snug',
})

const tigerMeta = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '14px',
  color: 'textSecondary',
  marginTop: '4px',
})

const lunarWrap = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const lunarText = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: 'loose',
})

const hnItem = css({
  marginBottom: '12px',
})

const hnTitle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.5',
})

const hnScore = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '13px',
  color: 'accentDark',
  marginLeft: '6px',
})

const hnSecondary = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textMuted',
  lineHeight: '1.5',
})

const musicText = css({
  fontFamily: 'body',
  fontWeight: 'light',
  fontStyle: 'italic',
  fontSize: '13px',
  color: 'textMuted',
  marginTop: '24px',
})

const workFold = css({
  minHeight: '60vh',
  padding: '96px 6vw',
  width: '100%',
})

const featuredWrap = css({
  marginBottom: '80px',
})

const featuredTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(32px, 4vw, 56px)',
  lineHeight: 'snug',
  color: 'text',
  marginBottom: '16px',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '17px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '60ch',
  marginBottom: '24px',
})

const featuredLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  borderBottom: '1px solid transparent',
  transition: 'border-color 150ms ease, color 150ms ease',
  padding: '12px 0',
  display: 'inline-block',
  '&:hover': {
    color: 'accentBright',
    borderBottomColor: 'accentBright',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const workRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '20px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  borderLeft: '3px solid transparent',
  paddingLeft: '16px',
  marginLeft: '-16px',
  transition: 'border-left-color 200ms ease',
  '&:hover': {
    borderLeftColor: 'accent',
  },
  flexWrap: 'wrap',
  gap: '4px 16px',
})

const workTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(18px, 2vw, 28px)',
  lineHeight: 'snug',
  color: 'text',
})

const workMeta = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '14px',
  color: 'textMuted',
  whiteSpace: 'nowrap',
})

const workLink = css({
  textDecoration: 'none',
  display: 'block',
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const expFold = css({
  padding: '96px 6vw',
  width: '100%',
})

const expRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '16px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  flexWrap: 'wrap',
  gap: '4px 16px',
})

const expTitle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '16px',
  color: 'text',
})

const expMeta = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textMuted',
})

const footerWrap = css({
  padding: '48px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '12px',
})

const footerText = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textMuted',
  textDecoration: 'none',
  '&:hover': { color: 'textSecondary' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function HomePage() {
  return (
    <div style={{ width: '100%' }}>
      {/* FOLD 1: Hero phrase */}
      <section className={heroFold} aria-label="Hero">
        <h1 className={heroPhrase}>
          Watch what you say,<br />
          and whatever you say,<br />
          practice it.
        </h1>
        <p className={attribution}>— Soyen Shaku</p>
      </section>

      <hr className={foldDivider} />

      {/* FOLD 2: Quote echo */}
      <section className={pullFold} aria-label="Reflection">
        <p className={pullText}>
          Watch what you say, and whatever you say, practice it. Every redesign is an act of practice — saying something with design, then saying it again, differently, tomorrow.
        </p>
        <p className={pullAttrib}>— Soyen Shaku</p>
      </section>

      <hr className={foldDivider} />

      {/* FOLD 3: Signals */}
      <section className={signalFold} aria-label="Signals">
        <div className={signalGrid}>
          {/* Left column: Sports */}
          <div>
            {/* U.S. Open */}
            <div className={signalCard}>
              <p className={eyebrow}>U.S. Open — Final</p>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span className={playerName}>Wyndham Clark</span>
                <span className={bigScore}>−4</span>
              </div>
              <div style={{ marginTop: '12px' }}>
                <div className={leaderRow}>Clark<span className={leaderScore}>−4</span></div>
                <div className={leaderRow}>Burns<span className={leaderScore}>−3</span></div>
                <div className={leaderRow}>Kim<span className={leaderScore}>−1</span></div>
                <div className={leaderRow}>Poston<span className={leaderScore}>E</span></div>
                <div className={leaderRow}>Mitchell<span className={leaderScore}>E</span></div>
              </div>
              <p className={footnote}>Clark holds for the second time.</p>
            </div>

            {/* Tigers */}
            <div className={signalCard}>
              <p className={eyebrow}>Jun 22</p>
              <div className={tigerCard}>
                <div className={tigerScore}>Tigers 5 · 3</div>
                <p className={tigerMeta}>Detroit takes another at home</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Lunar */}
            <div className={signalCard}>
              <p className={eyebrow}>Lunar Phase</p>
              <div className={lunarWrap}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="8" stroke="#A30047" strokeWidth="1" />
                  <path d="M9 1a8 8 0 010 16" fill="#A30047" opacity="0.3" />
                </svg>
                <span className={lunarText}>First Quarter · 66%</span>
              </div>
            </div>

            {/* HN */}
            <div className={signalCard}>
              <p className={eyebrow}>Hacker News</p>
              <div className={hnItem}>
                <span className={hnTitle}>Steam Machine launches today</span>
                <span className={hnScore}>1612</span>
              </div>
              <div className={hnItem}>
                <span className={hnSecondary}>Crypto in 2026: Oh, This Is the Bad Place</span>
              </div>
            </div>

            {/* Music */}
            <div className={signalCard}>
              <p className={eyebrow}>Listening</p>
              <p className={musicText}>Radiohead · Tobin Sprout</p>
            </div>
          </div>
        </div>
      </section>

      <hr className={foldDivider} />

      {/* FOLD 4: Featured + Selected Work */}
      <section className={workFold} aria-label="Work">
        <p className={eyebrow}>Featured</p>
        {featuredProject && (
          <div className={featuredWrap}>
            <h2 className={featuredTitle}>{featuredProject.title}</h2>
            {featuredProject.problem && (
              <p className={featuredProblem}>{featuredProject.problem}</p>
            )}
            {featuredProject.externalUrl && (
              <a
                href={featuredProject.externalUrl}
                className={featuredLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {featuredProject.title} ↗
              </a>
            )}
          </div>
        )}

        <p className={eyebrow}>Selected Work</p>
        {selectedWork.map((project) => (
          <a
            key={project.slug}
            href={`/work/${project.slug}`}
            className={workLink}
          >
            <div className={workRow}>
              <span className={workTitle}>{project.title}</span>
              <span className={workMeta}>{project.type} · {project.year}</span>
            </div>
          </a>
        ))}
      </section>

      <hr className={foldDivider} />

      {/* FOLD 5: Experiments */}
      <section className={expFold} aria-label="Experiments">
        <p className={eyebrow}>Experiments</p>
        {experiments.map((exp) => (
          <a
            key={exp.slug}
            href={`/work/${exp.slug}`}
            className={workLink}
          >
            <div className={expRow}>
              <span className={expTitle}>{exp.title}</span>
              <span className={expMeta}>{exp.type} · {exp.year}</span>
            </div>
          </a>
        ))}
      </section>

      {/* Footer */}
      <footer className={footerWrap}>
        <span className={footerText}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </div>
  )
}