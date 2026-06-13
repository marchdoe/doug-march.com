import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const splitLayout = css({
  display: 'grid',
  gridTemplateColumns: '58fr 42fr',
  minHeight: '100vh',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
    minHeight: 'auto',
  },
})

const leftPanel = css({
  position: 'sticky',
  top: 0,
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 6vw',
  background: 'bg',
  '@media (max-width: 767px)': {
    position: 'relative',
    height: 'auto',
    minHeight: '50vh',
    padding: '60px 24px 40px',
  },
})

const rightPanel = css({
  background: '{colors.void.100}',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 767px)': {
    minHeight: 'auto',
  },
})

const rightContent = css({
  flex: 1,
  padding: '48px 40px',
  '@media (max-width: 767px)': {
    padding: '32px 20px',
  },
})

const nameDisplay = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 7vw, 96px)',
  fontWeight: 'bold',
  letterSpacing: '-0.04em',
  lineHeight: '0.88',
  color: 'accent',
  textTransform: 'uppercase',
  marginBottom: '16px',
})

const roleDisplay = css({
  fontFamily: 'body',
  fontSize: 'clamp(16px, 1.8vw, 22px)',
  color: 'textSecondary',
  lineHeight: '1.5',
  maxWidth: '40ch',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: 'semibold',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '20px',
  marginTop: '40px',
  '&:first-of-type': {
    marginTop: 0,
  },
})

const statementText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'text',
  maxWidth: '60ch',
  marginBottom: '32px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const yearCol = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  whiteSpace: 'nowrap',
  minWidth: '120px',
})

const roleCol = css({
  fontFamily: 'body',
  fontSize: '15px',
  color: 'text',
  lineHeight: '1.5',
})

const companyName = css({
  fontWeight: 'medium',
})

const roleTitle = css({
  color: 'textSecondary',
  fontSize: '13px',
})

const descText = css({
  fontSize: '13px',
  color: 'textMuted',
  marginTop: '4px',
  maxWidth: '55ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '32px',
})

const capPill = css({
  display: 'inline-flex',
  alignItems: 'center',
  background: '{colors.void.200}',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '9999px',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  padding: '6px 14px',
})

const eduBlock = css({
  fontFamily: 'body',
  fontSize: '15px',
  color: 'text',
  lineHeight: '1.5',
  marginBottom: '32px',
})

const eduDetail = css({
  fontSize: '13px',
  color: 'textMuted',
})

const personalBlock = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.6',
  marginBottom: '8px',
})

const accentVal = css({
  color: 'accent',
  fontWeight: 'medium',
})

const footerArea = css({
  padding: '24px 40px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  '@media (max-width: 767px)': {
    padding: '20px',
    flexDirection: 'column',
    gap: '8px',
  },
})

const archiveLink = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'textSecondary' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function AboutPage() {
  return (
    <div className={splitLayout}>
      <div className={leftPanel}>
        <div>
          <div className={nameDisplay}>{identity.name}</div>
          <div className={roleDisplay}>{identity.role}</div>
        </div>
      </div>

      <div className={rightPanel}>
        <Sidebar />
        <div className={rightContent}>
          <div className={sectionLabel}>About</div>
          <p className={statementText}>{identity.statement}</p>

          <div className={sectionLabel}>Experience</div>
          <div className={css({ marginBottom: '32px' })}>
            {timeline.map((entry, i) => (
              <div key={i} className={timelineRow}>
                <span className={yearCol}>{entry.year}</span>
                <div>
                  <div className={roleCol}>
                    <span className={companyName}>{entry.company}</span>
                    {' · '}
                    <span className={roleTitle}>{entry.role}</span>
                  </div>
                  <div className={descText}>{entry.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={sectionLabel}>Education</div>
          <div className={eduBlock}>
            <div>{education.school}</div>
            <div className={eduDetail}>
              {education.degree} · {education.concentration} · {education.years}
            </div>
          </div>

          <div className={sectionLabel}>Capabilities</div>
          <div className={capGrid}>
            {capabilities.map((cap) => (
              <span key={cap} className={capPill}>{cap}</span>
            ))}
          </div>

          <div className={sectionLabel}>Personal</div>
          <p className={personalBlock}>
            Holes in one: <span className={accentVal}>{personal.holesInOne}</span>
          </p>
          <p className={personalBlock}>
            Sport: {personal.sport}
          </p>
          <p className={personalBlock}>
            Teams: {personal.teams.join(', ')}
          </p>
          <p className={personalBlock}>
            Current focus: {personal.currentFocus}
          </p>
        </div>

        <footer className={footerArea}>
          <span>© Doug March</span>
          <a href="/archive" className={archiveLink}>Archive</a>
        </footer>
      </div>
    </div>
  )
}