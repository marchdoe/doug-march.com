import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const page = css({
  paddingTop: '96px',
  paddingBottom: '80px',
  paddingLeft: '5vw',
  paddingRight: '5vw',
})

const pageTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 8vw, 120px)',
  fontWeight: 'bold',
  lineHeight: 'tight',
  letterSpacing: '-0.02em',
  color: 'text',
  textTransform: 'uppercase',
  marginBottom: '48px',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '16px',
  borderBottom: '1px solid',
  borderColor: 'border',
  paddingBottom: '8px',
})

const statement = css({
  fontFamily: 'body',
  fontSize: 'clamp(16px, 2vw, 20px)',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '64px',
})

const sectionWrap = css({
  marginBottom: '64px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '24px',
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  _hover: {
    borderColor: 'border',
  },
})

const timelineYear = css({
  fontFamily: 'display',
  fontSize: '14px',
  letterSpacing: '0.10em',
  color: 'textMuted',
  textTransform: 'uppercase',
  minWidth: '120px',
  whiteSpace: 'nowrap',
})

const timelineContent = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const timelineRole = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'medium',
  color: 'text',
  lineHeight: 'normal',
})

const timelineCompany = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  lineHeight: 'normal',
})

const timelineDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: 'normal',
  maxWidth: '60ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capItem = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.05em',
  color: 'textSecondary',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '0',
  lineHeight: 'normal',
})

const eduBlock = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'textSecondary',
  lineHeight: 'normal',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const eduBold = css({
  fontWeight: 'medium',
  color: 'text',
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px',
})

const personalCard = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text',
  lineHeight: 'normal',
})

const footerStrip = css({
  padding: '24px 5vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: '1px solid',
  borderColor: 'border',
  flexWrap: 'wrap',
  gap: '12px',
  marginTop: 'auto',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
})

function AboutPage() {
  return (
    <>
      <main className={page}>
        <h1 className={pageTitle}>{identity.name}</h1>

        <div className={sectionLabel}>{identity.role}</div>
        <p className={statement}>{identity.statement}</p>

        <div className={sectionWrap}>
          <div className={sectionLabel}>Experience</div>
          {timeline.map((entry, i) => (
            <div key={i} className={timelineRow}>
              <span className={timelineYear}>{entry.year}</span>
              <div className={timelineContent}>
                <span className={timelineRole}>{entry.role}</span>
                <span className={timelineCompany}>{entry.company}</span>
                <span className={timelineDesc}>{entry.description}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={sectionWrap}>
          <div className={sectionLabel}>Education</div>
          <div className={eduBlock}>
            <span className={eduBold}>{education.school}</span>
            <span>{education.degree} — {education.concentration}</span>
            <span>{education.years}</span>
          </div>
        </div>

        <div className={sectionWrap}>
          <div className={sectionLabel}>Capabilities</div>
          <div className={capGrid}>
            {capabilities.map((cap, i) => (
              <span key={i} className={capItem}>{cap}</span>
            ))}
          </div>
        </div>

        <div className={sectionWrap}>
          <div className={sectionLabel}>Personal</div>
          <div className={personalGrid}>
            <div className={personalCard}>
              <span className={personalLabel}>Holes in One</span>
              <span className={personalValue}>{personal.holesInOne}</span>
            </div>
            <div className={personalCard}>
              <span className={personalLabel}>Sport</span>
              <span className={personalValue}>{personal.sport}</span>
            </div>
            <div className={personalCard}>
              <span className={personalLabel}>Teams</span>
              <span className={personalValue}>{personal.teams.join(', ')}</span>
            </div>
            <div className={personalCard}>
              <span className={personalLabel}>Current Focus</span>
              <span className={personalValue}>{personal.currentFocus}</span>
            </div>
          </div>
        </div>
      </main>

      <footer className={footerStrip}>
        <span className={footerText}>Doug March — Product Designer &amp; Developer</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}