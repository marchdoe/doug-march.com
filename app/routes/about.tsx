import { createFileRoute } from '@tanstack/react-router'
import { Sidebar } from '../components/Sidebar'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const splitGrid = css({
  display: 'grid',
  gridTemplateColumns: '42fr 58fr',
  minHeight: '100vh',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const leftPanel = css({
  background: '{colors.neutral.900}',
  padding: '0 6vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',
  position: 'sticky',
  top: 0,
  '@media (max-width: 768px)': {
    position: 'relative',
    minHeight: 'auto',
    padding: '32px 6vw',
  },
})

const rightPanel = css({
  background: '{colors.neutral.800}',
  borderLeft: '1px solid',
  borderColor: 'border',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 768px)': {
    borderLeft: 'none',
    borderTop: '1px solid',
    minHeight: 'auto',
  },
})

const nameDisplay = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 8vw, 96px)',
  fontWeight: '800',
  lineHeight: '0.92',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '24px',
})

const roleLabel = css({
  fontFamily: 'body',
  fontSize: '14px',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '24px',
})

const statementText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.65',
  color: '{colors.neutral.300}',
  maxWidth: '45ch',
})

const contentArea = css({
  padding: '24px 32px',
  flex: 1,
  overflowY: 'auto',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '10px',
  fontWeight: '400',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textMuted',
  paddingBottom: '8px',
  borderBottom: '1px solid',
  borderColor: 'border',
  marginBottom: '16px',
  marginTop: '32px',
})

const firstSection = css({
  marginTop: '0',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: '{colors.neutral.700}/30',
  '@media (max-width: 500px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const yearCol = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: '0.05em',
  minWidth: '120px',
  fontVariantNumeric: 'tabular-nums',
})

const roleCol = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
})

const roleName = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: '{colors.neutral.200}',
  fontWeight: '500',
})

const companyName = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
})

const descText = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  lineHeight: '1.5',
  marginTop: '4px',
  maxWidth: '55ch',
})

const capsGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capsPill = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  letterSpacing: '0.05em',
  padding: '4px 10px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '2px',
})

const personalBlock = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.6',
  color: '{colors.neutral.300}',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

const personalLabel = css({
  color: 'textMuted',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
})

const eduBlock = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: '{colors.neutral.300}',
  lineHeight: '1.5',
})

const eduMeta = css({
  fontSize: '13px',
  color: 'textMuted',
})

const footerBar = css({
  padding: '0 32px',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '48px',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: '{colors.neutral.600}',
  textDecoration: 'none',
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function AboutPage() {
  return (
    <div className={splitGrid}>
      <div className={leftPanel}>
        <div className={nameDisplay}>
          {identity.name.split(' ').map((w, i) => (
            <div key={i}>{w}</div>
          ))}
        </div>
        <div className={roleLabel}>{identity.role}</div>
        <p className={statementText}>{identity.statement}</p>
      </div>

      <div className={rightPanel}>
        <Sidebar />

        <div className={contentArea}>
          <div className={`${sectionLabel} ${firstSection}`}>Experience</div>
          {timeline.map((entry, i) => (
            <div key={i} className={timelineRow}>
              <div className={yearCol}>{entry.year}</div>
              <div className={roleCol}>
                <div className={roleName}>{entry.role}</div>
                <div className={companyName}>{entry.company}</div>
                <div className={descText}>{entry.description}</div>
              </div>
            </div>
          ))}

          <div className={sectionLabel}>Education</div>
          <div className={eduBlock}>
            <div>{education.school}</div>
            <div className={eduMeta}>
              {education.degree} — {education.concentration} · {education.years}
            </div>
          </div>

          <div className={sectionLabel}>Capabilities</div>
          <div className={capsGrid}>
            {capabilities.map((cap, i) => (
              <span key={i} className={capsPill}>{cap}</span>
            ))}
          </div>

          <div className={sectionLabel}>Personal</div>
          <div className={personalBlock}>
            <div>
              <span className={personalLabel}>Holes in One: </span>
              {personal.holesInOne}
            </div>
            <div>
              <span className={personalLabel}>Sport: </span>
              {personal.sport}
            </div>
            <div>
              <span className={personalLabel}>Teams: </span>
              {personal.teams.join(', ')}
            </div>
            <div>
              <span className={personalLabel}>Current Focus: </span>
              {personal.currentFocus}
            </div>
          </div>
        </div>

        <div className={footerBar}>
          <a href="/archive" className={footerLink}>Archive</a>
          <span className={css({ fontFamily: 'body', fontSize: '11px', color: '{colors.neutral.600}' })}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  )
}