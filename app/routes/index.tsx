import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const pageGrid = css({
  display: 'grid',
  gridTemplateColumns: '58fr 42fr',
  gridTemplateRows: 'min-content min-content 1fr min-content',
  minHeight: '100vh',
  padding: '0 5vw',
  columnGap: '4vw',
  rowGap: '0',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    padding: '0 5vw',
    gap: '0',
  },
})

const heroZone = css({
  gridColumn: '1',
  gridRow: '1 / 4',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '78vh',
  paddingTop: 'clamp(32px, 4vw, 64px)',
  '@media (max-width: 768px)': {
    gridColumn: '1',
    gridRow: 'auto',
    minHeight: '60vh',
  },
})

const heroNumber = css({
  fontFamily: 'display',
  fontSize: 'clamp(100px, 14vw, 210px)',
  fontWeight: '800',
  lineHeight: '0.88',
  letterSpacing: '-0.04em',
  color: 'text',
  textWrap: 'balance',
})

const heroPhrase = css({
  fontFamily: 'display',
  fontSize: 'clamp(40px, 5.2vw, 80px)',
  fontWeight: '700',
  lineHeight: '1.0',
  letterSpacing: '0.02em',
  color: 'textSecondary',
  marginTop: 'clamp(16px, 2vw, 32px)',
  position: 'relative',
  paddingTop: 'clamp(12px, 1.5vw, 24px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '80px',
    height: '1px',
    background: 'accent',
  },
})

const rightTop = css({
  gridColumn: '2',
  gridRow: '1',
  paddingTop: 'clamp(24px, 3vw, 48px)',
  '@media (max-width: 768px)': {
    gridColumn: '1',
    gridRow: 'auto',
    paddingTop: '32px',
  },
})

const rightMid = css({
  gridColumn: '2',
  gridRow: '2 / 4',
  paddingTop: 'clamp(24px, 3vw, 48px)',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 768px)': {
    gridColumn: '1',
    gridRow: 'auto',
    paddingTop: '24px',
  },
})

const scoreBlock = css({
  background: 'bgCard',
  borderTop: '2px solid',
  borderTopColor: 'accent',
  padding: 'clamp(16px, 2vw, 24px)',
})

const scoreTitle = css({
  fontFamily: 'body',
  fontSize: '18px',
  fontWeight: '700',
  letterSpacing: '0.02em',
  color: 'text',
  fontVariantNumeric: 'tabular-nums',
})

const scoreMeta = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginTop: '2',
})

const scoreResult = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: '700',
  color: 'accent',
  marginTop: '2',
})

const golfTag = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginTop: '4',
  paddingTop: '3',
  borderTop: '1px solid',
  borderTopColor: 'border',
})

const projectsSection = css({
  marginTop: 'clamp(24px, 3vw, 48px)',
  flex: '1',
})

const eyebrow = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4',
})

const projectRow = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  height: 'clamp(36px, 4vh, 52px)',
  borderBottom: '1px solid',
  borderBottomColor: 'border',
  '&:first-of-type': {
    borderTop: '1px solid',
    borderTopColor: 'border',
  },
})

const projectName = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: '500',
  color: 'text',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  _hover: { color: 'accentLight' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const projectMeta = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '3',
})

const projectYear = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
})

const projectType = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'accent',
  letterSpacing: '0.05em',
})

const signalsStrip = css({
  gridColumn: '1 / -1',
  gridRow: '4',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  minHeight: '12vh',
  borderTop: '1px solid',
  borderTopColor: 'border',
  marginTop: 'auto',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    minHeight: 'auto',
  },
})

const signalCell = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.02em',
  color: 'textMuted',
  padding: 'clamp(16px, 2vw, 24px)',
  display: 'flex',
  alignItems: 'center',
  borderRight: '1px solid',
  borderRightColor: 'border',
  '&:last-child': {
    borderRight: 'none',
  },
  '@media (max-width: 768px)': {
    borderRight: 'none',
    borderBottom: '1px solid',
    borderBottomColor: 'border',
    padding: '16px',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
})

const hnRef = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  marginTop: '4',
  paddingTop: '3',
})

const hnArrow = css({
  color: 'accent',
  marginRight: '1',
})

const footerArea = css({
  gridColumn: '1 / -1',
  padding: '4 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid',
  borderTopColor: 'border',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

function HomePage() {
  const allWork = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
    ...experiments,
  ]

  return (
    <div className={pageGrid}>
      {/* LEFT COLUMN — Hero */}
      <div className={heroZone}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={heroNumber}>10-4,</div>
          <div className={heroPhrase}>loud and clear.</div>
          {featuredProject && (
            <div className={css({
              marginTop: 'clamp(32px, 4vw, 64px)',
              maxWidth: '520px',
            })}>
              <div className={eyebrow}>Featured Transmission</div>
              <a
                href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                className={css({
                  fontFamily: 'display',
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: '700',
                  lineHeight: '1.1',
                  color: 'text',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'color 0.15s ease',
                  _hover: { color: 'accentLight' },
                  _focus: {
                    outline: '2px solid',
                    outlineColor: 'accent',
                    outlineOffset: '4px',
                  },
                })}
              >
                {featuredProject.title}
              </a>
              {featuredProject.problem && (
                <p className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: '1.55',
                  color: 'textSecondary',
                  marginTop: '3',
                  letterSpacing: '0.01em',
                  maxWidth: '65ch',
                })}>
                  {featuredProject.problem}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT TOP — Scoreboard */}
      <div className={rightTop}>
        <div className={scoreBlock}>
          <div className={scoreTitle}>DET 10 — OAK 4</div>
          <div className={scoreMeta}>TUE JUN 9</div>
          <div className={scoreResult}>WIN</div>
        </div>
        <div className={golfTag}>RBC Canadian Open · Scheduled</div>
      </div>

      {/* RIGHT MID — Projects + HN */}
      <div className={rightMid}>
        <div className={projectsSection}>
          <div className={eyebrow}>Selected Work</div>
          {selectedWork.map((p) => (
            <div key={p.slug} className={projectRow}>
              <a href={`/work/${p.slug}`} className={projectName}>
                {p.title}
              </a>
              <div className={projectMeta}>
                <span className={projectType}>{p.type}</span>
                <span className={projectYear}>{p.year}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={css({ marginTop: '6' })}>
          <div className={eyebrow}>Experiments</div>
          {experiments.map((e) => (
            <div key={e.slug} className={projectRow}>
              <a
                href={e.externalUrl || `/work/${e.slug}`}
                className={projectName}
              >
                {e.title}
              </a>
              <div className={projectMeta}>
                <span className={projectType}>{e.type}</span>
                <span className={projectYear}>{e.year}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={hnRef}>
          <span className={hnArrow}>↑</span>
          <span>2280 Claude Fable 5</span>
        </div>
      </div>

      {/* BOTTOM SIGNALS STRIP */}
      <div className={signalsStrip}>
        <div className={signalCell}>
          ☽ Waning Crescent · 17% Illumination · Day 25 of 28
        </div>
        <div className={signalCell}>
          Guided by Voices · My Morning Jacket · The War on Drugs
        </div>
        <div className={signalCell}>
          Sunrise 04:49 · Sunset 19:30 · 14.7 hrs light
        </div>
      </div>

      {/* FOOTER */}
      <div className={footerArea}>
        <span className={footerText}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerText} style={{ textDecoration: 'none' }}>Archive</a>
      </div>
    </div>
  )
}