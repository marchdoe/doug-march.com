import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const heroFold = css({
  minHeight: 'calc(100vh - 64px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingBottom: '10vh',
  paddingLeft: '6vw',
  paddingRight: '6vw',
  position: 'relative',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: 'black',
  fontSize: 'clamp(42px, 6.5vw, 96px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'heroPhrase',
  maxWidth: '88vw',
  textWrap: 'balance',
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
})

const heroPeriod = css({
  color: 'heroPunctuation',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'medium',
  color: 'heroAttribution',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
  marginTop: '32px',
})

const heroMeta = css({
  display: 'flex',
  gap: '24px',
  marginTop: '20px',
  flexWrap: 'wrap',
})

const heroMetaItem = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: 'medium',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
})

/* Signal fold */
const signalFold = css({
  minHeight: '80vh',
  background: 'bgSubtle',
  padding: '80px 6vw',
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
})

const signalSection = css({
  width: '88vw',
  maxWidth: '88vw',
  margin: '0 auto',
})

const signalEyebrow = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: 'semibold',
  color: 'accent',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
  marginBottom: '12px',
})

const signalItem = css({
  borderLeft: '2px solid',
  borderColor: 'borderAccent',
  paddingLeft: '20px',
  paddingTop: '4px',
  paddingBottom: '4px',
})

const signalHeadline = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(24px, 3vw, 32px)',
  lineHeight: 'snug',
  color: 'text',
})

const signalScore = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(20px, 2.5vw, 26px)',
  lineHeight: 'snug',
  color: 'text',
})

const signalDelta = css({
  color: 'accent',
  fontWeight: 'bold',
  marginLeft: '8px',
})

const signalBody = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginTop: '4px',
})

const signalMoonLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'medium',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
})

const signalBigNumber = css({
  fontFamily: 'display',
  fontWeight: 'black',
  fontSize: '28px',
  color: 'accent',
  lineHeight: 'snug',
})

const signalSmallTitle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: 'snug',
  marginTop: '2px',
})

const signalMusicName = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '18px',
  color: 'textSecondary',
  lineHeight: 'snug',
})

const signalGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '40px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

const leaderRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '6px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  fontVariantNumeric: 'tabular-nums',
})

const leaderScore = css({
  color: 'accent',
  fontWeight: 'semibold',
})

/* Work fold */
const workFold = css({
  padding: '80px 6vw',
})

const workInner = css({
  width: '88vw',
  maxWidth: '88vw',
  margin: '0 auto',
})

const sectionTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(28px, 4vw, 48px)',
  lineHeight: 'snug',
  color: 'text',
  letterSpacing: 'tight',
  marginBottom: '48px',
})

const featuredCard = css({
  borderLeft: '2px solid transparent',
  padding: '24px 0 24px 24px',
  marginBottom: '64px',
  transition: 'border-color 120ms ease',
  _hover: {
    borderLeftColor: 'accent',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const featuredTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(32px, 4vw, 56px)',
  lineHeight: 'snug',
  color: 'text',
  letterSpacing: 'tight',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: 'clamp(16px, 1.2vw, 18px)',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginTop: '16px',
})

const featuredLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'semibold',
  color: 'accent',
  marginTop: '20px',
  padding: '10px 0',
  minHeight: '44px',
  textDecoration: 'none',
  _hover: {
    color: 'accentDark',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    borderRadius: 'sm',
  },
})

const workGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '0',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

const workItem = css({
  borderTop: '1px solid',
  borderColor: 'border',
  padding: '24px 24px 24px 24px',
  borderLeft: '2px solid transparent',
  transition: 'border-left-color 120ms ease',
  _hover: {
    borderLeftColor: 'accent',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const workItemTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(18px, 2vw, 24px)',
  lineHeight: 'snug',
  color: 'text',
})

const workItemMeta = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: 'wide',
  marginTop: '4px',
})

const workItemLink = css({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  minHeight: '44px',
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    borderRadius: 'sm',
  },
})

/* Experiments fold */
const expFold = css({
  padding: '64px 6vw',
  borderTop: '1px solid',
  borderColor: 'borderStrong',
})

const expInner = css({
  width: '88vw',
  maxWidth: '88vw',
  margin: '0 auto',
})

const expEyebrow = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'semibold',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  marginBottom: '32px',
})

const expItem = css({
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '8px',
})

const expTitle = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '16px',
  color: 'text',
})

const expMeta = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
})

const expLink = css({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    borderRadius: 'sm',
  },
})

/* Footer */
const footerWrap = css({
  padding: '48px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  textDecoration: 'none',
  _hover: {
    color: 'accent',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    borderRadius: 'sm',
  },
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
})

function HomePage() {
  return (
    <>
      {/* Hero Fold */}
      <section className={heroFold}>
        <h1 className={heroPhrase}>
          Nurture the good qualities you want to have<span className={heroPeriod}>.</span>
        </h1>
        <p className={attribution}>— Paramahansa Yogananda</p>
        <div className={heroMeta}>
          <span className={heroMetaItem}>New Moon · 0%</span>
          <span className={heroMetaItem}>14.2 hrs daylight · May 16</span>
        </div>
      </section>

      {/* Signal Fold */}
      <section className={signalFold}>
        <div className={signalSection}>
          <div className={signalGrid}>
            {/* Sports */}
            <div>
              <p className={signalEyebrow}>Detroit Wins</p>
              <div className={signalItem} style={{ marginBottom: '24px' }}>
                <p className={signalHeadline}>
                  Pistons 115 · 94 <span className={signalDelta}>+21</span>
                </p>
              </div>
              <div className={signalItem}>
                <p className={signalScore}>
                  Tigers 3 · 2 <span className={signalDelta}>+1</span>
                </p>
              </div>
            </div>

            {/* PGA Leaderboard */}
            <div>
              <p className={signalEyebrow}>PGA Championship</p>
              <div className={signalItem}>
                <div className={leaderRow}>
                  <span>Maverick McNealy</span>
                  <span className={leaderScore}>−4</span>
                </div>
                <div className={leaderRow}>
                  <span>Alex Smalley</span>
                  <span className={leaderScore}>−4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={signalSection}>
          <div className={signalGrid}>
            {/* HN highlight */}
            <div>
              <p className={signalEyebrow}>Trending</p>
              <div className={signalItem}>
                <p className={signalBigNumber}>951</p>
                <p className={signalSmallTitle}>Project Gutenberg – keeps getting better</p>
              </div>
            </div>

            {/* Music */}
            <div>
              <p className={signalEyebrow}>Now Playing</p>
              <div className={signalItem}>
                <p className={signalMusicName}>Guided by Voices</p>
                <p className={signalMusicName} style={{ marginTop: '8px' }}>My Morning Jacket</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Fold */}
      <section className={workFold}>
        <div className={workInner}>
          <h2 className={sectionTitle}>Work</h2>

          {/* Featured project */}
          {featuredProject && (
            <div className={featuredCard}>
              <h3 className={featuredTitle}>{featuredProject.title}</h3>
              {featuredProject.problem && (
                <p className={featuredProblem}>{featuredProject.problem}</p>
              )}
              {featuredProject.externalUrl && (
                <a href={featuredProject.externalUrl} className={featuredLink}>
                  View Project →
                </a>
              )}
            </div>
          )}

          {/* Selected work grid */}
          <div className={workGrid}>
            {selectedWork.map((project) => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className={workItemLink}
              >
                <div className={workItem}>
                  <h3 className={workItemTitle}>{project.title}</h3>
                  <p className={workItemMeta}>{project.type} · {project.year}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Experiments Fold */}
      <section className={expFold}>
        <div className={expInner}>
          <p className={expEyebrow}>Experiments</p>
          {experiments.map((exp) => (
            <a
              key={exp.slug}
              href={`/work/${exp.slug}`}
              className={expLink}
            >
              <div className={expItem}>
                <span className={expTitle}>{exp.title}</span>
                <span className={expMeta}>{exp.type} · {exp.year}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={footerWrap}>
        <span className={footerText}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}