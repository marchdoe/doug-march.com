import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrap = css({
  padding: '80px 6vw',
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
})

const inner = css({
  width: '88vw',
  maxWidth: '88vw',
  margin: '0 auto',
})

const heroSection = css({
  marginBottom: '80px',
})

const heroName = css({
  fontFamily: 'display',
  fontWeight: 'black',
  fontSize: 'clamp(36px, 5vw, 72px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'text',
})

const heroRole = css({
  fontFamily: 'body',
  fontSize: 'clamp(16px, 1.5vw, 20px)',
  color: 'textMuted',
  marginTop: '8px',
  letterSpacing: 'wide',
})

const statement = css({
  fontFamily: 'body',
  fontSize: 'clamp(18px, 1.5vw, 22px)',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginTop: '32px',
})

const sectionEyebrow = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'semibold',
  color: 'accent',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  marginBottom: '32px',
})

const timelineSection = css({
  padding: '64px 0',
  borderTop: '1px solid',
  borderColor: 'borderStrong',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '4px',
  padding: '20px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '140px 1fr',
    gap: '32px',
  },
})

const timelineYear = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'semibold',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  minWidth: '120px',
  flexShrink: 0,
})

const timelineContent = css({})

const timelineRole = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '16px',
  color: 'text',
  lineHeight: 'snug',
})

const timelineCompany = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  marginTop: '2px',
})

const timelineDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: 'normal',
  color: 'textMuted',
  maxWidth: '65ch',
  marginTop: '8px',
})

const capSection = css({
  padding: '64px 0',
  borderTop: '1px solid',
  borderColor: 'borderStrong',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'medium',
  color: 'textSecondary',
  padding: '8px 16px',
  background: 'bgCard',
  borderRadius: 'sm',
  lineHeight: '1.3',
})

const eduSection = css({
  padding: '64px 0',
  borderTop: '1px solid',
  borderColor: 'borderStrong',
})

const eduTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '18px',
  color: 'text',
})

const eduDetail = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
  marginTop: '4px',
})

const personalSection = css({
  padding: '64px 0',
  borderTop: '1px solid',
  borderColor: 'borderStrong',
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '24px',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

const personalItem = css({
  borderLeft: '2px solid',
  borderColor: 'borderAccent',
  paddingLeft: '16px',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'semibold',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  marginBottom: '4px',
})

const personalValue = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '16px',
  color: 'text',
  lineHeight: 'snug',
})

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
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    borderRadius: 'sm',
  },
})

function AboutPage() {
  return (
    <>
      <div className={pageWrap}>
        <div className={inner}>
          {/* Hero */}
          <div className={heroSection}>
            <h1 className={heroName}>{identity.name}</h1>
            <p className={heroRole}>{identity.role}</p>
            <p className={statement}>{identity.statement}</p>
          </div>

          {/* Timeline */}
          <div className={timelineSection}>
            <p className={sectionEyebrow}>Experience</p>
            {timeline.map((entry, i) => (
              <div key={i} className={timelineRow}>
                <span className={timelineYear}>{entry.year}</span>
                <div className={timelineContent}>
                  <p className={timelineRole}>{entry.role}</p>
                  <p className={timelineCompany}>{entry.company}</p>
                  <p className={timelineDesc}>{entry.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Capabilities */}
          <div className={capSection}>
            <p className={sectionEyebrow}>Capabilities</p>
            <div className={capGrid}>
              {capabilities.map((cap) => (
                <span key={cap} className={capTag}>{cap}</span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className={eduSection}>
            <p className={sectionEyebrow}>Education</p>
            <p className={eduTitle}>{education.school}</p>
            <p className={eduDetail}>{education.degree} · {education.concentration}</p>
            <p className={eduDetail}>{education.years}</p>
          </div>

          {/* Personal */}
          <div className={personalSection}>
            <p className={sectionEyebrow}>Personal</p>
            <div className={personalGrid}>
              <div className={personalItem}>
                <p className={personalLabel}>Holes in One</p>
                <p className={personalValue}>{personal.holesInOne}</p>
              </div>
              <div className={personalItem}>
                <p className={personalLabel}>Sport</p>
                <p className={personalValue}>{personal.sport}</p>
              </div>
              <div className={personalItem}>
                <p className={personalLabel}>Teams</p>
                <p className={personalValue}>{personal.teams.join(', ')}</p>
              </div>
              <div className={personalItem}>
                <p className={personalLabel}>Current Focus</p>
                <p className={personalValue}>{personal.currentFocus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className={footerWrap}>
        <span className={footerText}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}