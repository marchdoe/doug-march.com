import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const signalsSection = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  paddingBottom: '32px',
  borderBottom: '1px solid',
  borderColor: 'border',
  marginBottom: '32px',
})

const signalLabel = css({
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: '1.2',
})

const signalValue = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
  lineHeight: '1.4',
})

const signalRow = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const signalInline = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
})

const hnDot = css({
  width: '6px',
  height: '6px',
  borderRadius: '9999px',
  background: '#FF6600',
  display: 'inline-block',
  flexShrink: 0,
})

const sectionTitle = css({
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: '1.2',
  marginBottom: '16px',
})

const featuredBlock = css({
  paddingBottom: '32px',
  borderBottom: '1px solid',
  borderColor: 'border',
  marginBottom: '32px',
})

const featuredTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(24px, 3vw, 36px)',
  fontWeight: 'bold',
  color: 'text',
  lineHeight: 'snug',
  marginBottom: '12px',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: 'base',
  color: 'textSecondary',
  lineHeight: 'normal',
  marginBottom: '16px',
  maxWidth: '55ch',
})

const featuredLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  letterSpacing: '0.02em',
  padding: '4px 0',
  display: 'inline-block',
  transition: 'color 150ms ease',
  _hover: {
    color: 'accentHover',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const workList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  paddingBottom: '32px',
  borderBottom: '1px solid',
  borderColor: 'border',
  marginBottom: '32px',
})

const workRow = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '8px',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  alignItems: 'baseline',
  _last: {
    borderBottom: 'none',
  },
})

const workTitle = css({
  fontFamily: 'body',
  fontSize: 'base',
  color: 'textSecondary',
  textDecoration: 'none',
  transition: 'color 150ms ease',
  _hover: {
    color: 'accent',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const workMeta = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.05em',
  whiteSpace: 'nowrap',
})

const experimentsSection = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  marginBottom: '48px',
})

const expRow = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '8px',
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  alignItems: 'baseline',
  _last: {
    borderBottom: 'none',
  },
})

const footerArea = css({
  marginTop: 'auto',
  paddingTop: '32px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

const footerLink = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: '0.05em',
  _hover: {
    color: 'textSecondary',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const scoreLine = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.4',
})

const scoreTeam = css({
  color: '{colors.stone.400}',
})

const scoreLoss = css({
  color: 'accent',
  fontWeight: 'semibold',
})

const musicLine = css({
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '{colors.stone.400}',
  lineHeight: '1.4',
})

function HomePage() {
  return (
    <>
      {/* Provenance */}
      <div className={css({ marginBottom: '24px' })}>
        <span className={css({
          fontFamily: 'mono',
          fontSize: '12px',
          color: 'textMuted',
        })}>
          signals.quote
        </span>
      </div>

      {/* Signals */}
      <div className={signalsSection}>
        <div className={signalRow}>
          <span className={signalLabel}>MLB · May 12</span>
          <div className={scoreLine}>
            <span className={scoreTeam}>DET</span>
            <span className={scoreLoss}>2–10</span>
            <span className={scoreTeam}>W · STL</span>
          </div>
        </div>

        <div className={signalRow}>
          <span className={signalLabel}>PGA Championship</span>
          <span className={signalValue}>Starts today</span>
        </div>

        <div className={signalRow}>
          <span className={signalLabel}>Lunar</span>
          <span className={signalValue}>◐ waning crescent · 7%</span>
        </div>

        <div className={signalRow}>
          <span className={signalLabel}>Daylight</span>
          <span className={signalValue}>14.1h daylight · 05:04 → 19:08</span>
        </div>

        <div className={signalRow}>
          <span className={signalLabel}>HN Top</span>
          <div className={signalInline}>
            <span className={hnDot} aria-hidden="true" />
            <span className={signalValue}>"Googlebook" · 798 pts</span>
          </div>
        </div>

        <div className={signalRow}>
          <span className={signalLabel}>Awwwards</span>
          <span className={signalValue}>The Power of Storytelling · SOTD</span>
        </div>

        <div className={signalRow}>
          <span className={signalLabel}>Listening</span>
          <span className={musicLine}>Guided by Voices · My Morning Jacket · The War on Drugs</span>
        </div>
      </div>

      {/* Featured Project */}
      {featuredProject && (
        <div className={featuredBlock}>
          <span className={sectionTitle}>Featured</span>
          <h2 className={featuredTitle}>{featuredProject.title}</h2>
          {featuredProject.problem && (
            <p className={featuredProblem}>{featuredProject.problem}</p>
          )}
          {featuredProject.externalUrl && (
            <a href={featuredProject.externalUrl} className={featuredLink}>
              Visit {featuredProject.title} →
            </a>
          )}
        </div>
      )}

      {/* Selected Work */}
      <div className={workList}>
        <span className={sectionTitle}>Selected Work</span>
        {selectedWork.map((p) => (
          <div className={workRow} key={p.slug}>
            <a href={`/work/${p.slug}`} className={workTitle}>{p.title}</a>
            <span className={workMeta}>{p.type} · {p.year}</span>
          </div>
        ))}
      </div>

      {/* Experiments */}
      <div className={experimentsSection}>
        <span className={sectionTitle}>Experiments</span>
        {experiments.map((e) => (
          <div className={expRow} key={e.slug}>
            <a href={e.externalUrl || `/work/${e.slug}`} className={workTitle}>{e.title}</a>
            <span className={workMeta}>{e.type} · {e.year}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={footerArea}>
        <span className={footerText}>Product Designer & Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </div>
    </>
  )
}