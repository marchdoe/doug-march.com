import { createFileRoute } from '@tanstack/react-router'
import { Sidebar } from '../components/Sidebar'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const splitGrid = css({
  display: 'grid',
  gridTemplateColumns: '62fr 38fr',
  minHeight: '100vh',
  maxWidth: 'none',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const heroPanel = css({
  background: '{colors.neutral.900}',
  padding: '0 8% 0 6vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',
  position: 'relative',
  '@media (max-width: 768px)': {
    minHeight: '70vh',
    padding: '24px 6vw',
  },
})

const signalPanel = css({
  background: '{colors.neutral.800}',
  borderLeft: '1px solid',
  borderColor: 'border',
  display: 'grid',
  gridTemplateRows: '60px 1fr auto 48px',
  minHeight: '100vh',
  overflowY: 'auto',
  '@media (max-width: 768px)': {
    borderLeft: 'none',
    borderTop: '1px solid',
    minHeight: 'auto',
    gridTemplateRows: '60px auto auto 48px',
  },
})

const heroPhrase = css({
  fontFamily: 'display',
  fontSize: 'clamp(64px, 12vw, 172px)',
  fontWeight: '800',
  lineHeight: '0.88',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  color: 'accent',
  textWrap: 'balance',
  '@media (max-width: 768px)': {
    fontSize: 'clamp(48px, 14vw, 88px)',
  },
})

const grassWord = css({
  color: '{colors.grass.400}',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: '400',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginTop: '32px',
})

const contextBlock = css({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

const dateLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '400',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const daylightLine = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

const scoreLine = css({
  fontFamily: 'body',
  fontSize: '18px',
  color: 'textSecondary',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

const lossBadge = css({
  fontFamily: 'body',
  fontSize: '10px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  background: '{colors.neutral.600}',
  color: '{colors.neutral.300}',
  padding: '2px 6px',
  borderRadius: '2px',
})

const mothersDayPill = css({
  fontFamily: 'body',
  fontSize: '10px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  background: '{colors.primary.700}',
  color: '{colors.primary.300}',
  padding: '3px 8px',
  borderRadius: '2px',
  display: 'inline-block',
  width: 'fit-content',
})

const quoteBlock = css({
  padding: '24px',
})

const quoteInner = css({
  borderLeft: '3px solid',
  borderColor: 'borderAccent',
  paddingLeft: '20px',
  paddingTop: '4px',
  paddingBottom: '4px',
})

const quoteText = css({
  fontFamily: 'body',
  fontSize: '15px',
  lineHeight: '1.65',
  color: '{colors.neutral.300}',
  fontStyle: 'italic',
  maxWidth: '50ch',
})

const quoteAttrib = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginTop: '12px',
})

const workSection = css({
  padding: '24px',
})

const workHeading = css({
  fontFamily: 'body',
  fontSize: '10px',
  fontWeight: '400',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textMuted',
  paddingBottom: '8px',
  borderBottom: '1px solid',
  borderColor: 'border',
  marginBottom: '12px',
})

const workList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
})

const workItem = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: '{colors.neutral.200}',
  textDecoration: 'none',
  padding: '8px 0 8px 12px',
  borderLeft: '1px solid transparent',
  transition: 'border-color 0.2s ease, color 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  _hover: {
    borderLeftColor: '{colors.grass.400}',
    color: '{colors.neutral.100}',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const grassBullet = css({
  color: '{colors.grass.400}',
  fontSize: '10px',
  flexShrink: 0,
})

const footer = css({
  padding: '0 24px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '48px',
  alignSelf: 'end',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: '{colors.neutral.600}',
  letterSpacing: '0.05em',
  textDecoration: 'none',
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const signalContent = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  overflowY: 'auto',
})

function HomePage() {
  const allWork = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
    ...experiments.slice(0, 1),
  ]

  return (
    <div className={splitGrid}>
      <div className={heroPanel}>
        <div className={heroPhrase}>
          <div>Take</div>
          <div>Care</div>
          <div>Of Your</div>
          <div className={grassWord}>Grass.</div>
        </div>
        <div className={attribution}>— Unknown</div>
      </div>

      <div className={signalPanel}>
        <Sidebar />

        <div className={signalContent}>
          <div className={contextBlock}>
            <div className={dateLabel}>Thursday, May 7</div>
            <div className={daylightLine}>13.9h daylight · Last quarter moon · Spring Day 127</div>
            <div className={scoreLine}>
              <span>DET 0 — OAK 4</span>
              <span className={lossBadge}>Loss</span>
            </div>
            <div className={mothersDayPill}>Mother's Day in 3 Days</div>
          </div>

          <div className={quoteBlock}>
            <div className={quoteInner}>
              <p className={quoteText}>
                "If the grass is greener on the other side, maybe that's because you're not taking good care of your grass."
              </p>
              <div className={quoteAttrib}>— Unknown</div>
            </div>
          </div>

          <div className={workSection}>
            <div className={workHeading}>Selected Work</div>
            <div className={workList}>
              {featuredProject && (
                <a
                  href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                  className={workItem}
                >
                  <span className={grassBullet} aria-hidden="true">●</span>
                  <span>{featuredProject.title}</span>
                </a>
              )}
              {selectedWork.map((p) => (
                <a
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className={workItem}
                >
                  <span className={grassBullet} aria-hidden="true">●</span>
                  <span>{p.title}</span>
                </a>
              ))}
              {experiments.map((p) => (
                <a
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className={workItem}
                >
                  <span className={grassBullet} aria-hidden="true">●</span>
                  <span>{p.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <div className={footer}>
          <a href="/archive" className={footerText}>Archive</a>
          <span className={css({ fontFamily: 'body', fontSize: '11px', color: '{colors.neutral.600}' })}>
            Permacomputing Principles ↑
          </span>
        </div>
      </div>
    </div>
  )
}