import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { timeline } from '../content/timeline'

export const Route = createFileRoute('/')({ component: HomePage })

const pageWrap = css({
  padding: '0 5vw',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 58px)',
})

const mastheadZone = css({
  padding: '32px 0 16px 0',
  minHeight: '180px',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontStyle: 'italic',
  fontSize: 'clamp(28px, 4.5vw, 64px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'accent',
  maxWidth: '100%',
  textWrap: 'balance',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textMuted',
  paddingTop: '12px',
})

const mainRule = css({
  border: 'none',
  borderTop: '1px solid',
  borderColor: 'border',
  margin: '0',
})

const columnsGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  padding: '24px 0 64px 0',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1.25fr 1fr',
  },
  '@media (min-width: 1024px)': {
    gridTemplateColumns: '1.25fr 1fr 0.85fr',
  },
})

const sectionHeader = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: 'snug',
  paddingBottom: '8px',
  borderBottom: '2px solid',
  borderColor: 'borderAccent',
  marginBottom: '16px',
})

const projectRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'background 0.12s ease',
  _hover: {
    background: 'bgCard',
  },
})

const projectTitle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'text',
  letterSpacing: 'wide',
  lineHeight: 'normal',
})

const projectMeta = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  letterSpacing: 'wide',
  whiteSpace: 'nowrap',
  marginLeft: '12px',
})

const projectLink = css({
  textDecoration: 'none',
  color: 'accent',
  _hover: {
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    color: 'accentHover',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const featuredBlock = css({
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  marginBottom: '16px',
})

const featuredTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(20px, 2.5vw, 32px)',
  lineHeight: 'snug',
  color: 'text',
  letterSpacing: 'tight',
  marginBottom: '8px',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '12px',
})

const featuredLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  _hover: {
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    color: 'accentHover',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '90px 1fr',
  gap: '12px',
  padding: '6px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  fontSize: '12px',
  lineHeight: 'normal',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '120px 1fr',
  },
})

const timelineYear = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: 'wide',
  whiteSpace: 'nowrap',
  minWidth: '90px',
  '@media (min-width: 768px)': {
    minWidth: '120px',
  },
})

const timelineInfo = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
  lineHeight: 'normal',
})

const timelineRole = css({
  color: 'text',
  fontWeight: 'medium',
})

const signalSection = css({
  marginBottom: '16px',
})

const signalRow = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  letterSpacing: 'wide',
  lineHeight: 'loose',
  padding: '2px 0',
})

const signalMuted = css({
  color: 'textMuted',
})

const leaderRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'wide',
  padding: '3px 0',
})

const leaderName = css({
  color: 'text',
  fontWeight: 'medium',
})

const leaderNameAccent = css({
  color: 'accent',
  fontWeight: 'medium',
})

const leaderScore = css({
  fontVariantNumeric: 'tabular-nums',
  color: 'textSecondary',
  textAlign: 'right',
})

const leaderScoreAccent = css({
  fontVariantNumeric: 'tabular-nums',
  color: 'accent',
  textAlign: 'right',
})

const microRule = css({
  border: 'none',
  borderTop: '1px solid',
  borderColor: 'border',
  margin: '12px 0',
})

const footerWrap = css({
  padding: '24px 5vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  textDecoration: 'none',
  _hover: {
    color: 'textSecondary',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function HomePage() {
  return (
    <>
      <div className={pageWrap}>
        {/* Masthead / Hero */}
        <div className={mastheadZone}>
          <h1 className={heroPhrase}>
            You talk when you cease to be at peace with your thoughts.
          </h1>
          <p className={attribution}>— Kahlil Gibran</p>
        </div>

        <hr className={mainRule} />

        {/* Three-column content */}
        <div className={columnsGrid}>
          {/* Column 1: Featured + Selected Work */}
          <div>
            {featuredProject && (
              <>
                <div className={sectionHeader}>Lead Story</div>
                <div className={featuredBlock}>
                  <h2 className={featuredTitle}>{featuredProject.title}</h2>
                  {featuredProject.problem && (
                    <p className={featuredProblem}>{featuredProject.problem}</p>
                  )}
                  {featuredProject.externalUrl && (
                    <a href={featuredProject.externalUrl} className={featuredLink}>
                      Visit Project →
                    </a>
                  )}
                </div>
              </>
            )}

            <div className={sectionHeader}>Selected Work</div>
            {selectedWork.map((p) => (
              <a href={`/work/${p.slug}`} key={p.slug} className={projectLink} style={{ display: 'block' }}>
                <div className={projectRow}>
                  <span className={projectTitle}>{p.title}</span>
                  <span className={projectMeta}>{p.type} · {p.year}</span>
                </div>
              </a>
            ))}

            <div style={{ marginTop: '24px' }}>
              <div className={sectionHeader}>Experiments</div>
              {experiments.map((p) => (
                <a
                  href={p.externalUrl || `/work/${p.slug}`}
                  key={p.slug}
                  className={projectLink}
                  style={{ display: 'block' }}
                >
                  <div className={projectRow}>
                    <span className={projectTitle}>{p.title}</span>
                    <span className={projectMeta}>{p.type} · {p.year}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Timeline (recent) */}
          <div>
            <div className={sectionHeader}>Career Filed</div>
            {timeline.slice(0, 8).map((entry, i) => (
              <div className={timelineRow} key={i}>
                <span className={timelineYear}>{entry.year}</span>
                <div className={timelineInfo}>
                  <span className={timelineRole}>{entry.role}</span>
                  {' — '}
                  {entry.company}
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Today's signals */}
          <div>
            <div className={sectionHeader}>Today</div>

            {/* Golf */}
            <div className={signalSection}>
              <div className={css({
                fontFamily: 'body',
                fontSize: '11px',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textMuted',
                marginBottom: '8px',
                fontWeight: 'medium',
              })}>
                CJ Cup Byron Nelson
              </div>
              <div className={leaderRow}>
                <span className={leaderNameAccent}>T. Moore</span>
                <span className={leaderScoreAccent}>−9</span>
              </div>
              <div className={leaderRow}>
                <span className={leaderName}>B. Koepka</span>
                <span className={leaderScore}>−8</span>
              </div>
              <div className={leaderRow}>
                <span className={leaderName}>J. Svensson</span>
                <span className={leaderScore}>−8</span>
              </div>
            </div>

            <hr className={microRule} />

            {/* Tigers */}
            <div className={signalSection}>
              <span className={css({
                fontFamily: 'body',
                fontSize: '12px',
                color: 'textMuted',
                letterSpacing: 'wide',
              })}>
                Detroit Tigers · L 1–3
              </span>
            </div>

            <hr className={microRule} />

            {/* Environmental signals */}
            <div className={signalSection}>
              <div className={signalRow}>◑ First Quarter — 40.5%</div>
              <div className={signalRow}>☀ 14.3 Hours Daylight</div>
              <div className={css({ ...signalRowBase, color: '{colors.ink.500}' })}>
                <span className={signalMuted}>♫ Wet Leg · Radiohead</span>
              </div>
              <div className={signalRow}>⚑ Memorial Day in 3 Days</div>
            </div>

            <hr className={microRule} />

            {/* HN */}
            <div className={signalSection}>
              <div className={css({
                fontFamily: 'body',
                fontSize: '11px',
                color: 'textMuted',
                letterSpacing: 'wide',
                lineHeight: 'normal',
              })}>
                HN: Project Hail Mary — Stellar Navigation Chart
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={footerWrap}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}

const signalRowBase = {
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'wide',
  lineHeight: 'loose',
  padding: '2px 0',
}