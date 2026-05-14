import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '0 24px',
  padding: '0 6vw',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
    gap: '0',
    padding: '0 16px',
  },
})

const eyebrow = css({
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '20px',
})

const headerZone = css({
  gridColumn: '1 / 9',
  padding: '48px 0 40px 0',
  borderBottom: '2px solid',
  borderColor: 'accent',
  '@media (max-width: 767px)': {
    gridColumn: '1 / -1',
    padding: '32px 0',
  },
})

const headline = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(32px, 4vw, 56px)',
  lineHeight: '1.0',
  letterSpacing: '-0.03em',
  color: 'text',
  marginBottom: '24px',
})

const statement = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.55',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const sideInfo = css({
  gridColumn: '9 / 13',
  padding: '48px 0 40px 24px',
  borderLeft: '1px solid',
  borderColor: 'border',
  borderBottom: '2px solid',
  borderBottomColor: 'accent',
  '@media (max-width: 767px)': {
    gridColumn: '1 / -1',
    borderLeft: 'none',
    paddingLeft: '0',
    paddingTop: '24px',
    borderBottom: '1px solid',
    borderBottomColor: 'border',
  },
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4px',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.55',
  marginBottom: '16px',
})

const timelineSection = css({
  gridColumn: '1 / 8',
  padding: '48px 0',
  '@media (max-width: 767px)': {
    gridColumn: '1 / -1',
    padding: '32px 0',
  },
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  alignItems: 'baseline',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '90px 1fr',
    gap: '12px',
  },
})

const timeYear = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.05em',
  whiteSpace: 'nowrap',
})

const timeContent = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.55',
})

const timeRole = css({
  color: 'text',
  fontWeight: 'medium',
})

const timeCompany = css({
  color: 'accent',
  marginLeft: '4px',
})

const timeDesc = css({
  color: 'textSecondary',
  fontSize: '13px',
  marginTop: '4px',
  maxWidth: '60ch',
})

const capSection = css({
  gridColumn: '8 / 13',
  padding: '48px 0 48px 24px',
  borderLeft: '1px solid',
  borderColor: 'border',
  '@media (max-width: 767px)': {
    gridColumn: '1 / -1',
    borderLeft: 'none',
    paddingLeft: '0',
    paddingTop: '0',
    paddingBottom: '32px',
    borderTop: '1px solid',
    borderTopColor: 'border',
  },
})

const capItem = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.55',
  padding: '6px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '&:last-child': {
    borderBottom: 'none',
  },
})

const eduSection = css({
  gridColumn: '1 / -1',
  borderTop: '2px solid',
  borderColor: 'accent',
  padding: '32px 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '24px',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
    gap: '16px',
    borderTopWidth: '1px',
  },
})

const footerBar = css({
  gridColumn: '1 / -1',
  borderTop: '1px solid',
  borderColor: 'border',
  padding: '16px 0 32px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.05em',
  '@media (max-width: 767px)': {
    flexDirection: 'column',
    gap: '8px',
  },
})

function AboutPage() {
  return (
    <div className={pageGrid}>
      {/* Header */}
      <div className={headerZone}>
        <div className={eyebrow}>About</div>
        <h1 className={headline}>{identity.name}</h1>
        <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'textMuted', letterSpacing: '0.05em', marginBottom: '16px' })}>
          {identity.role}
        </p>
        <p className={statement}>{identity.statement}</p>
      </div>

      {/* Side info */}
      <div className={sideInfo}>
        <div className={eyebrow}>Personal</div>
        <div className={personalLabel}>Holes in One</div>
        <div className={personalValue}>{personal.holesInOne}</div>
        <div className={personalLabel}>Sport</div>
        <div className={personalValue}>{personal.sport}</div>
        <div className={personalLabel}>Teams</div>
        <div className={personalValue}>{personal.teams.join(', ')}</div>
        <div className={personalLabel}>Current Focus</div>
        <div className={personalValue}>{personal.currentFocus}</div>
      </div>

      {/* Timeline */}
      <div className={timelineSection}>
        <div className={eyebrow}>Timeline</div>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={timeYear}>{entry.year}</span>
            <div className={timeContent}>
              <span className={timeRole}>{entry.role}</span>
              <span className={timeCompany}>· {entry.company}</span>
              <div className={timeDesc}>{entry.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Capabilities */}
      <div className={capSection}>
        <div className={eyebrow}>Capabilities</div>
        {capabilities.map((cap) => (
          <div key={cap} className={capItem}>{cap}</div>
        ))}
      </div>

      {/* Education */}
      <div className={eduSection}>
        <div>
          <div className={eyebrow}>Education</div>
          <div className={css({ fontFamily: 'body', fontSize: '14px', color: 'text', lineHeight: '1.55' })}>
            {education.school}
          </div>
          <div className={css({ fontFamily: 'body', fontSize: '13px', color: 'textSecondary', lineHeight: '1.55' })}>
            {education.degree} · {education.concentration}
          </div>
          <div className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', marginTop: '4px' })}>
            {education.years}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={footerBar}>
        <span>© 2026 Doug March · Product Designer & Developer</span>
        <a href="/archive" className={css({ color: 'textMuted', textDecoration: 'none', _hover: { color: 'accent', textDecoration: 'underline', textUnderlineOffset: '3px' }, '&:focus-visible': { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>Archive</a>
      </div>
    </div>
  )
}