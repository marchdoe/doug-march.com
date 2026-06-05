import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const scrollColumn = css({
  width: '85vw',
  maxWidth: 'none',
  margin: '0 auto',
})

const heroSection = css({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  paddingTop: 'calc(56px + 28vh)',
  position: 'relative',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: 900,
  fontSize: 'clamp(44px, 6.5vw, 96px)',
  lineHeight: '0.92',
  letterSpacing: '-0.03em',
  color: 'heroText',
  maxWidth: '100%',
  textWrap: 'balance',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'textMuted',
  marginTop: '28px',
})

const signalStrip = css({
  position: 'absolute',
  bottom: 'clamp(48px, 8vh, 96px)',
  left: 0,
  right: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '32px',
  fontFamily: 'body',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textMuted',
})

const scrollCue = css({
  position: 'absolute',
  bottom: 'clamp(16px, 3vh, 40px)',
  left: '50%',
  transform: 'translateX(-50%)',
  color: 'accent',
  fontSize: '20px',
  fontFamily: 'body',
  animation: 'pulse 2s ease-in-out infinite',
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
})

const sectionDivider = css({
  width: '100%',
  height: '1px',
  background: 'border',
  margin: '0',
})

/* ── Featured ── */

const featuredSection = css({
  padding: '96px 0',
  minHeight: '95vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const eyebrow = css({
  fontFamily: 'body',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'textMuted',
  marginBottom: '24px',
})

const featuredTitle = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(28px, 3.5vw, 52px)',
  lineHeight: '1.0',
  letterSpacing: '-0.02em',
  color: 'text',
  marginBottom: '20px',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '32px',
})

const featuredLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
  transition: 'color 150ms ease, border-color 150ms ease',
  _hover: {
    color: 'accentLight',
    borderColor: 'accentLight',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

/* ── Work Grid ── */

const workSection = css({
  padding: '96px 0',
})

const sectionHeading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(28px, 3.5vw, 52px)',
  lineHeight: '1.0',
  letterSpacing: '-0.02em',
  color: 'text',
  marginBottom: '48px',
})

const workRow = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto auto',
  alignItems: 'center',
  gap: '16px',
  padding: '20px 12px',
  borderTop: '1px solid',
  borderColor: 'border',
  transition: 'background 150ms ease, border-left 150ms ease',
  borderLeft: '3px solid transparent',
  textDecoration: 'none',
  color: 'text',
  minHeight: '72px',
  _hover: {
    background: 'bgElevated',
    borderLeftColor: 'accent',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '-2px',
  },
  '&:last-child': {
    borderBottom: '1px solid',
    borderBottomColor: 'border',
  },
})

const workRowMobile = css({
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
    padding: '16px 12px',
  },
})

const workTitle = css({
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: 'clamp(18px, 2vw, 24px)',
  letterSpacing: '-0.01em',
  lineHeight: '1.1',
})

const workType = css({
  fontFamily: 'body',
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textMuted',
})

const workYear = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.08em',
  color: 'textSecondary',
  fontVariantNumeric: 'tabular-nums',
})

/* ── Experiments ── */

const experimentsSection = css({
  padding: '80px 0',
})

const expRow = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto auto',
  alignItems: 'center',
  gap: '16px',
  padding: '16px 12px',
  borderTop: '1px solid',
  borderColor: 'border',
  textDecoration: 'none',
  color: 'text',
  transition: 'background 150ms ease',
  _hover: {
    background: 'bgElevated',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '-2px',
  },
  '&:last-child': {
    borderBottom: '1px solid',
    borderBottomColor: 'border',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const expTitle = css({
  fontFamily: 'body',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '1.3',
})

/* ── Signals Footer ── */

const signalsFooter = css({
  padding: '64px 0',
  borderTop: '1px solid',
  borderColor: 'border',
})

const signalsGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '48px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '32px',
  },
})

const signalBlock = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

const signalLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'textMuted',
})

const signalValue = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.08em',
  color: 'textSecondary',
  lineHeight: '1.5',
})

const signalTournament = css({
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: '22px',
  color: 'accent',
  letterSpacing: '-0.01em',
  lineHeight: '1.1',
})

const hnItem = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
  lineHeight: '1.5',
  padding: '8px 0',
  borderTop: '1px solid',
  borderColor: 'borderSubtle',
  '&:first-of-type': {
    borderTop: 'none',
  },
})

const hnPoints = css({
  color: 'textMuted',
  fontSize: '11px',
  marginLeft: '8px',
})

const magicText = css({
  color: 'accent',
})

const lunarIcon = css({
  fontSize: '18px',
  color: 'accent',
  marginRight: '8px',
})

const musicLine = css({
  fontFamily: 'body',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'textDisabled',
  marginTop: '48px',
})

const footerBar = css({
  padding: '32px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.06em',
})

const archiveLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: '0.06em',
  _hover: {
    color: 'textSecondary',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const pulseKeyframes = css({
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
    '50%': { opacity: 0.4, transform: 'translateX(-50%) translateY(6px)' },
  },
})

function HomePage() {
  return (
    <div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); } 50% { opacity: 0.4; transform: translateX(-50%) translateY(6px); } }`}</style>

      {/* ═══ HERO ═══ */}
      <section className={heroSection}>
        <div className={scrollColumn}>
          <h1 className={heroPhrase}>
            You have to let go at some point in order to move forward.
          </h1>
          <p className={attribution}>— Unknown</p>
        </div>
        <div className={`${scrollColumn} ${signalStrip}`}>
          <span>◑ Last Quarter · 67%</span>
          <span>Memorial Tournament</span>
          <span>June 5 · Friday</span>
          <span>14.6h Daylight</span>
        </div>
        <div className={scrollCue} aria-hidden="true">↓</div>
      </section>

      {/* ═══ FEATURED ═══ */}
      <div className={scrollColumn}>
        <div className={sectionDivider} />
      </div>
      <section className={featuredSection}>
        <div className={scrollColumn}>
          <p className={eyebrow}>Featured Project</p>
          <h2 className={featuredTitle}>{featuredProject?.title}</h2>
          <p className={featuredProblem}>{featuredProject?.problem}</p>
          {featuredProject?.externalUrl && (
            <a href={featuredProject.externalUrl} className={featuredLink} target="_blank" rel="noopener noreferrer">
              Visit {featuredProject.title} <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </section>

      {/* ═══ SELECTED WORK ═══ */}
      <div className={scrollColumn}>
        <div className={sectionDivider} />
      </div>
      <section className={workSection}>
        <div className={scrollColumn}>
          <h2 className={sectionHeading}>Selected Work</h2>
          <div>
            {selectedWork.map((project) => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className={`${workRow} ${workRowMobile}`}
              >
                <span className={workTitle}>{project.title}</span>
                <span className={workType}>{project.type}</span>
                <span className={workYear}>{project.year}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPERIMENTS ═══ */}
      <section className={experimentsSection}>
        <div className={scrollColumn}>
          <h2 className={css({
            fontFamily: 'display',
            fontWeight: 800,
            fontSize: 'clamp(22px, 2.5vw, 36px)',
            lineHeight: '1.0',
            letterSpacing: '-0.02em',
            color: 'text',
            marginBottom: '32px',
          })}>
            Experiments
          </h2>
          <div>
            {experiments.map((exp) => (
              <a
                key={exp.slug}
                href={exp.externalUrl || `/work/${exp.slug}`}
                className={expRow}
                {...(exp.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={expTitle}>{exp.title}</span>
                <span className={workType}>{exp.type}</span>
                <span className={workYear}>{exp.year}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SIGNALS ═══ */}
      <section className={signalsFooter}>
        <div className={scrollColumn}>
          <div className={signalsGrid}>
            {/* Golf */}
            <div className={signalBlock}>
              <p className={signalLabel}>PGA Tour</p>
              <p className={signalTournament}>The Memorial Tournament</p>
              <p className={signalValue}>
                J.J. Spaun · Wyndham Clark · Tommy Fleetwood · Ryan Gerard — All –5
              </p>
            </div>

            {/* Lunar */}
            <div className={signalBlock}>
              <p className={signalLabel}>Lunar Phase</p>
              <p className={signalValue}>
                <span className={lunarIcon}>◑</span> Last Quarter · 67.3%
              </p>
            </div>

            {/* Awwwards */}
            <div className={signalBlock}>
              <p className={signalLabel}>Awwwards · 2026</p>
              <p className={signalValue}>21 Hrs On The Moon · Artemis Mission</p>
            </div>

            {/* HN */}
            <div className={signalBlock}>
              <p className={signalLabel}>Hacker News</p>
              <div>
                <p className={hnItem}>
                  Changing How We Develop Ladybird<span className={hnPoints}>↑332</span>
                </p>
                <p className={hnItem}>
                  Meta ADB on deprecated Portal devices<span className={hnPoints}>↑233</span>
                </p>
                <p className={hnItem}>
                  Entanglement Builds Space-Time. Now '<span className={magicText}>Magic</span>' Gives It Gravity.<span className={hnPoints}>↑26</span>
                </p>
              </div>
            </div>
          </div>

          <p className={musicLine}>
            Guided by Voices · Tobin Sprout · Radiohead
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div className={scrollColumn}>
          <div className={footerBar}>
            <span className={footerText}>Doug March · Product Designer & Developer</span>
            <a href="/archive" className={archiveLink}>Archive</a>
          </div>
        </div>
      </footer>
    </div>
  )
}