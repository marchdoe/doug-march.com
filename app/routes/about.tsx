import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrap = css({
  padding: '0 6vw 80px',
})

const heroArea = css({
  padding: '48px 0 40px',
  borderBottom: '1px solid',
  borderColor: 'border',
  minHeight: '30vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
})

const nameDisplay = css({
  fontFamily: 'display',
  fontSize: 'clamp(40px, 7vw, 96px)',
  lineHeight: '0.92',
  letterSpacing: '-0.01em',
  color: 'accent',
  fontWeight: 'bold',
  textTransform: 'uppercase',
})

const roleDisplay = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'textSecondary',
  letterSpacing: '0.05em',
  marginTop: '16px',
})

const statementDisplay = css({
  fontFamily: 'body',
  fontSize: '18px',
  color: 'text',
  lineHeight: '1.55',
  maxWidth: '65ch',
  marginTop: '24px',
})

const indexBody = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0',
  borderTop: '1px solid',
  borderColor: 'border',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const columnLeft = css({
  borderRight: '1px solid',
  borderColor: 'border',
  paddingRight: '32px',
  '@media (max-width: 768px)': {
    borderRight: 'none',
    paddingRight: '0',
  },
})

const columnRight = css({
  paddingLeft: '32px',
  '@media (max-width: 768px)': {
    paddingLeft: '0',
    borderTop: '1px solid',
    borderColor: 'border',
  },
})

const sectionBlock = css({
  padding: '48px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  _last: { borderBottom: 'none' },
})

const sectionLabel = css({
  fontFamily: 'display',
  fontSize: '20px',
  fontWeight: 'bold',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: '1.1',
  marginBottom: '24px',
})

const timelineRow = css({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '12px 8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  gap: '24px',
  _last: { borderBottom: 'none' },
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '4px',
  },
})

const timelineYear = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: '0.05em',
  minWidth: '120px',
  flexShrink: 0,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '1.6',
})

const timelineContent = css({
  flex: 1,
})

const timelineRole = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'medium',
  color: 'text',
  letterSpacing: '0.01em',
  lineHeight: '1.6',
})

const timelineCompany = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  letterSpacing: '0.01em',
})

const timelineDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.55',
  marginTop: '4px',
  maxWidth: '65ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0',
})

const capItem = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  letterSpacing: '0.03em',
  padding: '12px 8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  width: '50%',
  '@media (max-width: 768px)': {
    width: '100%',
  },
})

const personalRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '48px',
  padding: '0 8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  _last: { borderBottom: 'none' },
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text',
  textAlign: 'right',
})

const eduRow = css({
  padding: '12px 8px',
})

const eduSchool = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'medium',
  color: 'text',
})

const eduDetail = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.55',
  marginTop: '4px',
})

function AboutPage() {
  return (
    <div className={pageWrap}>
      {/* Hero */}
      <section className={heroArea}>
        <h1 className={nameDisplay}>{identity.name}</h1>
        <p className={roleDisplay}>{identity.role}</p>
        <p className={statementDisplay}>{identity.statement}</p>
      </section>

      {/* Index body */}
      <div className={indexBody}>
        {/* Left — Timeline */}
        <div className={columnLeft}>
          <section className={sectionBlock}>
            <h2 className={sectionLabel}>Timeline</h2>
            {timeline.map((entry, i) => (
              <div key={i} className={timelineRow}>
                <span className={timelineYear}>{entry.year}</span>
                <div className={timelineContent}>
                  <span className={timelineRole}>{entry.role}</span>
                  <span className={timelineCompany}> · {entry.company}</span>
                  <p className={timelineDesc}>{entry.description}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className={sectionBlock}>
            <h2 className={sectionLabel}>Education</h2>
            <div className={eduRow}>
              <div className={eduSchool}>{education.school}</div>
              <div className={eduDetail}>{education.degree} · {education.concentration}</div>
              <div className={eduDetail}>{education.years}</div>
            </div>
          </section>
        </div>

        {/* Right — Capabilities & Personal */}
        <div className={columnRight}>
          <section className={sectionBlock}>
            <h2 className={sectionLabel}>Capabilities</h2>
            <div className={capGrid}>
              {capabilities.map((cap, i) => (
                <div key={i} className={capItem}>{cap}</div>
              ))}
            </div>
          </section>

          <section className={sectionBlock}>
            <h2 className={sectionLabel}>Personal</h2>
            <div className={personalRow}>
              <span className={personalLabel}>Holes in One</span>
              <span className={personalValue}>{personal.holesInOne}</span>
            </div>
            <div className={personalRow}>
              <span className={personalLabel}>Sport</span>
              <span className={personalValue}>{personal.sport}</span>
            </div>
            <div className={personalRow}>
              <span className={personalLabel}>Teams</span>
              <span className={personalValue}>{personal.teams.join(', ')}</span>
            </div>
            <div className={personalRow}>
              <span className={personalLabel}>Current Focus</span>
              <span className={personalValue}>{personal.currentFocus}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}