import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const page = css({
  padding: '4vw',
  paddingTop: 'calc(4vw + 52px)',
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '3vw',
  minHeight: '100vh',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    padding: '16px',
    paddingTop: 'calc(16px + 52px)',
  },
})

const identityBlock = css({
  gridColumn: '1 / 8',
  gridRow: '1',
  paddingTop: '8vw',
  paddingBottom: '4vw',
  '@media (max-width: 768px)': {
    paddingTop: '24px',
    paddingBottom: '0',
  },
})

const nameDisplay = css({
  fontFamily: 'display',
  fontSize: 'clamp(36px, 5vw, 80px)',
  fontWeight: '700',
  lineHeight: '0.95',
  color: '{colors.neutral.50}',
  textTransform: 'uppercase',
  marginBottom: '8px',
})

const roleDisplay = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.primary.400}',
  marginBottom: '24px',
})

const statementText = css({
  fontFamily: 'body',
  fontSize: '18px',
  lineHeight: '1.55',
  color: '{colors.neutral.300}',
  maxWidth: '60ch',
})

const personalBlock = css({
  gridColumn: '9 / 13',
  gridRow: '1',
  paddingTop: '8vw',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '@media (max-width: 768px)': {
    paddingTop: '0',
  },
})

const personalItem = css({
  background: '{colors.neutral.800}',
  border: '1px solid {colors.neutral.700}',
  borderRadius: '2px',
  padding: '16px',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '10px',
  fontWeight: '600',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
  marginBottom: '4px',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: '600',
  color: '{colors.neutral.50}',
})

const personalValueSmall = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: '{colors.neutral.300}',
})

const timelineSection = css({
  gridColumn: '1 / 9',
  gridRow: '2',
  '@media (max-width: 768px)': {
    width: '100%',
  },
})

const sectionEyebrow = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
  marginBottom: '24px',
  paddingBottom: '8px',
  borderBottom: '1px solid {colors.neutral.700}',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: '24px',
  padding: '12px 0',
  borderBottom: '1px solid {colors.neutral.800}',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const yearCol = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: '{colors.neutral.500}',
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  minWidth: '120px',
})

const roleCol = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
})

const roleName = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: '600',
  color: '{colors.neutral.50}',
})

const companyName = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: '{colors.primary.400}',
})

const roleDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: '{colors.neutral.400}',
  marginTop: '4px',
  maxWidth: '60ch',
})

const capabilitiesSection = css({
  gridColumn: '9 / 13',
  gridRow: '2',
  '@media (max-width: 768px)': {
    width: '100%',
  },
})

const capList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capPill = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: '500',
  color: '{colors.neutral.300}',
  background: '{colors.neutral.800}',
  border: '1px solid {colors.neutral.700}',
  borderRadius: '2px',
  padding: '6px 12px',
})

const educationSection = css({
  gridColumn: '1 / 7',
  gridRow: '3',
  '@media (max-width: 768px)': {
    width: '100%',
  },
})

const eduBlock = css({
  background: '{colors.neutral.800}',
  border: '1px solid {colors.neutral.700}',
  borderRadius: '2px',
  padding: '24px',
})

const eduTitle = css({
  fontFamily: 'body',
  fontSize: '18px',
  fontWeight: '600',
  color: '{colors.neutral.50}',
})

const eduDetail = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: '{colors.neutral.400}',
  marginTop: '4px',
})

const footerStyle = css({
  gridColumn: '1 / 13',
  gridRow: '4',
  marginTop: '4vw',
  paddingTop: '16px',
  borderTop: '1px solid {colors.neutral.700}',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '4vw',
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-start',
    marginTop: '32px',
  },
})

function AboutPage() {
  return (
    <div className={page}>
      {/* Identity */}
      <div className={identityBlock}>
        <h1 className={nameDisplay}>{identity.name}</h1>
        <p className={roleDisplay}>{identity.role}</p>
        <p className={statementText}>{identity.statement}</p>
      </div>

      {/* Personal signals */}
      <div className={personalBlock}>
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
          <p className={personalValueSmall}>{personal.teams.join(', ')}</p>
        </div>
        <div className={personalItem}>
          <p className={personalLabel}>Current Focus</p>
          <p className={personalValueSmall}>{personal.currentFocus}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className={timelineSection}>
        <p className={sectionEyebrow}>Experience</p>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={yearCol}>{entry.year}</span>
            <div className={roleCol}>
              <span className={roleName}>{entry.role}</span>
              <span className={companyName}>{entry.company}</span>
              <p className={roleDesc}>{entry.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Capabilities */}
      <div className={capabilitiesSection}>
        <p className={sectionEyebrow}>Capabilities</p>
        <div className={capList}>
          {capabilities.map((cap, i) => (
            <span key={i} className={capPill}>{cap}</span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className={educationSection}>
        <p className={sectionEyebrow}>Education</p>
        <div className={eduBlock}>
          <p className={eduTitle}>{education.school}</p>
          <p className={eduDetail}>{education.degree} — {education.concentration}</p>
          <p className={eduDetail}>{education.years}</p>
        </div>
      </div>

      {/* Footer */}
      <div className={footerStyle}>
        <span>© 2026 Doug March</span>
        <a href="/archive" className={css({
          color: '{colors.neutral.500}',
          textDecoration: 'none',
          _hover: { color: '{colors.neutral.300}', textDecoration: 'underline' },
          '&:focus-visible': { outline: '2px solid {colors.primary.400}', outlineOffset: '2px' },
        })}>Archive</a>
      </div>
    </div>
  )
}