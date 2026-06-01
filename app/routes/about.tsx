import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrap = css({
  padding: '0 5vw',
  flex: 1,
})

const pageMasthead = css({
  background: '{colors.stone.900}',
  padding: '36px 5vw 40px',
  margin: '0 -5vw',
  marginBottom: '0',
})

const pageTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(36px, 4vw, 64px)',
  letterSpacing: '0.06em',
  lineHeight: '0.95',
  color: '{colors.stone.50}',
})

const sectionHeader = css({
  fontFamily: 'display',
  fontSize: '13px',
  letterSpacing: '0.15em',
  color: '{colors.stone.500}',
  textTransform: 'uppercase',
  padding: '8px 0',
  borderBottom: '2px solid',
  borderColor: '{colors.stone.900}',
  marginTop: '32px',
})

const statementBlock = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.5',
  color: '{colors.stone.700}',
  maxWidth: '65ch',
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: '{colors.stone.200}',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '140px 200px 1fr',
  alignItems: 'baseline',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: '{colors.stone.200}',
  gap: '16px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
    padding: '12px 0',
  },
})

const yearCell = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '{colors.stone.500}',
  minWidth: '120px',
})

const roleCell = css({
  fontFamily: 'display',
  fontSize: '16px',
  letterSpacing: '0.08em',
  color: '{colors.stone.900}',
  lineHeight: '1.25',
})

const companyCell = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: '{colors.stone.700}',
  lineHeight: '1.5',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0',
})

const capItem = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '{colors.stone.700}',
  padding: '10px 16px',
  borderBottom: '1px solid',
  borderRight: '1px solid',
  borderColor: '{colors.stone.200}',
  '@media (max-width: 768px)': {
    width: '50%',
  },
})

const eduRow = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: '{colors.stone.200}',
  gap: '16px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const personalRow = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '12px',
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: '{colors.stone.200}',
  flexWrap: 'wrap',
})

const personalLabel = css({
  fontFamily: 'display',
  fontSize: '13px',
  letterSpacing: '0.15em',
  color: '{colors.stone.500}',
  textTransform: 'uppercase',
  flexShrink: 0,
  minWidth: '120px',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: '{colors.stone.700}',
  lineHeight: '1.5',
})

const footerWrap = css({
  padding: '16px 5vw',
  borderTop: '1px solid',
  borderColor: '{colors.stone.200}',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.stone.500}',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.stone.500}',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textDecoration: 'none !important',
  '&:hover': {
    color: '{colors.magenta.500} !important',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: '{colors.magenta.400}',
    outlineOffset: '2px',
  },
})

function AboutPage() {
  return (
    <>
      <div className={pageMasthead} style={{ margin: '0', padding: '36px 5vw 40px' }}>
        <h1 className={pageTitle}>{identity.name.toUpperCase()}</h1>
        <p style={{
          fontFamily: 'var(--fonts-body)',
          fontSize: '13px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#B09EC3',
          marginTop: '8px',
        }}>{identity.role}</p>
      </div>

      <div className={pageWrap}>
        <div className={sectionHeader}>Statement</div>
        <p className={statementBlock}>{identity.statement}</p>

        <div className={sectionHeader}>Experience</div>
        {timeline.map((t, i) => (
          <div key={i} className={timelineRow}>
            <span className={yearCell}>{t.year}</span>
            <span className={roleCell}>{t.role.toUpperCase()}</span>
            <span className={companyCell}>{t.company} — {t.description}</span>
          </div>
        ))}

        <div className={sectionHeader}>Capabilities</div>
        <div className={capGrid}>
          {capabilities.map((c, i) => (
            <div key={i} className={capItem}>{c}</div>
          ))}
        </div>

        <div className={sectionHeader}>Education</div>
        <div className={eduRow}>
          <span className={yearCell}>{education.years}</span>
          <span className={companyCell}>
            {education.school} — {education.degree}, {education.concentration}
          </span>
        </div>

        <div className={sectionHeader}>Personal</div>
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
      </div>

      <footer className={footerWrap}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}