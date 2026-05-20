import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const splitGrid = css({
  display: 'grid',
  gridTemplateColumns: '45vw 55vw',
  minHeight: '100vh',
  maxWidth: 'none',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    minHeight: 'auto',
  },
})

const leftPanel = css({
  background: '{colors.neutral.950}',
  padding: 'clamp(24px, 6vw, 96px) clamp(20px, 4vw, 64px) clamp(20px, 5vw, 80px) clamp(20px, 6vw, 96px)',
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
  '@media (max-width: 768px)': {
    padding: '24px',
    gap: '32px',
  },
})

const rightPanel = css({
  background: '{colors.lime.400}',
  padding: 'clamp(20px, 5vw, 80px) clamp(20px, 6vw, 96px) clamp(20px, 5vw, 80px) clamp(20px, 5vw, 80px)',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  '@media (max-width: 768px)': {
    padding: '24px',
    gap: '24px',
  },
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
  marginBottom: '16px',
  lineHeight: 'snug',
})

const sectionLabelGreen = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(8, 14, 7, 0.5)',
  marginBottom: '16px',
  lineHeight: 'snug',
})

const heroName = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 5.5vw, 88px)',
  lineHeight: '0.92',
  letterSpacing: '0.04em',
  color: '{colors.cream.100}',
  textTransform: 'uppercase',
  fontWeight: 'bold',
})

const roleText = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: '{colors.neutral.400}',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginTop: '12px',
})

const statement = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: '{colors.cream.100}',
  lineHeight: 'normal',
  maxWidth: '55ch',
  marginTop: '24px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '12px 0',
  borderTop: '1px solid {colors.neutral.700}',
  alignItems: 'baseline',
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const yearCol = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.400}',
  letterSpacing: '0.04em',
  minWidth: '120px',
  whiteSpace: 'nowrap',
})

const roleCol = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: '{colors.cream.100}',
  lineHeight: 'normal',
})

const companyName = css({
  fontWeight: 'medium',
})

const roleDesc = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: '{colors.neutral.300}',
  lineHeight: 'normal',
  marginTop: '4px',
  maxWidth: '50ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.950}',
  background: 'rgba(8, 14, 7, 0.1)',
  padding: '6px 12px',
  lineHeight: 'snug',
  letterSpacing: '0.02em',
})

const personalRow = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: '{colors.neutral.950}',
  lineHeight: 'normal',
  padding: '8px 0',
  borderTop: '1px solid rgba(8, 14, 7, 0.2)',
})

const personalLabel = css({
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(8, 14, 7, 0.5)',
  marginBottom: '2px',
})

const eduBlock = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: '{colors.neutral.950}',
  lineHeight: 'normal',
})

const eduLabel = css({
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(8, 14, 7, 0.5)',
  marginBottom: '4px',
})

const footerArea = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: '{colors.neutral.500}',
  letterSpacing: '0.04em',
  marginTop: 'auto',
  paddingTop: '24px',
})

const footerLink = css({
  color: '{colors.neutral.500}',
  textDecoration: 'none',
  padding: '4px 0',
  _hover: {
    color: '{colors.cream.100}',
  },
  _focus: {
    outline: '2px solid {colors.lime.400}',
    outlineOffset: '2px',
  },
})

function AboutPage() {
  return (
    <div className={splitGrid}>
      {/* LEFT — identity + timeline */}
      <div className={leftPanel}>
        <Sidebar />

        <div>
          <div className={heroName}>{identity.name}</div>
          <div className={roleText}>{identity.role}</div>
          <div className={statement}>{identity.statement}</div>
        </div>

        <div>
          <div className={sectionLabel}>Experience</div>
          {timeline.map((entry, i) => (
            <div className={timelineRow} key={i}>
              <div className={yearCol}>{entry.year}</div>
              <div className={roleCol}>
                <span className={companyName}>{entry.company}</span> — {entry.role}
                <div className={roleDesc}>{entry.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={footerArea}>
          <a href="/archive" className={footerLink}>Archive</a>
        </div>
      </div>

      {/* RIGHT — capabilities, education, personal */}
      <div className={rightPanel}>
        <div>
          <div className={sectionLabelGreen}>Capabilities</div>
          <div className={capGrid}>
            {capabilities.map((c, i) => (
              <span className={capTag} key={i}>{c}</span>
            ))}
          </div>
        </div>

        <div>
          <div className={sectionLabelGreen}>Education</div>
          <div className={eduBlock}>
            <div className={eduLabel}>{education.years}</div>
            <div style={{ fontWeight: 500 }}>{education.school}</div>
            <div style={{ fontSize: '13px', color: 'rgba(8,14,7,0.7)' }}>
              {education.degree} — {education.concentration}
            </div>
          </div>
        </div>

        <div>
          <div className={sectionLabelGreen}>Personal</div>
          <div className={personalRow}>
            <div className={personalLabel}>Holes in One</div>
            <div>{personal.holesInOne}</div>
          </div>
          <div className={personalRow}>
            <div className={personalLabel}>Sport</div>
            <div>{personal.sport}</div>
          </div>
          <div className={personalRow}>
            <div className={personalLabel}>Teams</div>
            <div>{personal.teams.join(', ')}</div>
          </div>
          <div className={personalRow}>
            <div className={personalLabel}>Current Focus</div>
            <div>{personal.currentFocus}</div>
          </div>
        </div>
      </div>
    </div>
  )
}