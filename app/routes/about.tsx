import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const heroBand = css({
  width: '100%',
  minHeight: '50dvh',
  background: '{colors.ink.900}',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 6vw',
  paddingTop: '56px',
  position: 'relative',
})

const heroTitle = css({
  fontFamily: 'display',
  fontWeight: 'extrabold',
  fontSize: 'clamp(36px, 5vw, 72px)',
  lineHeight: '0.95',
  letterSpacing: '-0.03em',
  color: '{colors.stone.50}',
  marginBottom: '16px',
})

const heroRole = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '20px',
  color: '{colors.seafoam.400}',
  marginBottom: '24px',
})

const heroStatement = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '18px',
  color: '{colors.stone.300}',
  lineHeight: '1.6',
  maxWidth: '60ch',
})

const timelineBand = css({
  width: '100%',
  background: '{colors.stone.50}',
  padding: '96px 6vw',
})

const sectionTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(24px, 3vw, 36px)',
  color: '{colors.stone.900}',
  marginBottom: '48px',
  letterSpacing: '-0.02em',
  lineHeight: '1.1',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: '24px',
  paddingBottom: '32px',
  marginBottom: '32px',
  borderBottom: '1px solid {colors.stone.200}',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '8px',
  },
})

const timelineYear = css({
  fontFamily: 'mono',
  fontWeight: 'normal',
  fontSize: '14px',
  color: '{colors.stone.500}',
  letterSpacing: '0',
  minWidth: '120px',
  lineHeight: '1.6',
})

const timelineContent = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const timelineRole = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '{colors.stone.900}',
  lineHeight: '1.3',
})

const timelineCompany = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '16px',
  color: '{colors.seafoam.600}',
  lineHeight: '1.4',
})

const timelineDesc = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  color: '{colors.stone.600}',
  lineHeight: '1.6',
  maxWidth: '65ch',
  marginTop: '4px',
})

const capBand = css({
  width: '100%',
  background: '{colors.stone.800}',
  padding: '80px 6vw',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '48px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '40px',
  },
})

const capTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(24px, 3vw, 36px)',
  color: '{colors.stone.50}',
  marginBottom: '24px',
  lineHeight: '1.1',
})

const capList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTag = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: '{colors.stone.50}',
  background: 'rgba(255,255,255,0.08)',
  borderRadius: 'sm',
  padding: '8px 14px',
  lineHeight: '1.4',
})

const personalBand = css({
  width: '100%',
  background: '{colors.ink.900}',
  padding: '64px 6vw',
})

const personalTitle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '24px',
  color: '{colors.stone.50}',
  marginBottom: '24px',
  lineHeight: '1.1',
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '32px',
})

const personalItem = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const personalLabel = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '{colors.stone.500}',
})

const personalValue = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  color: '{colors.stone.300}',
  lineHeight: '1.5',
})

const footer = css({
  width: '100%',
  background: '{colors.ink.900}',
  borderTop: '1px solid {colors.stone.800}',
  padding: '32px 6vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: '{colors.stone.500}',
})

const footerLink = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: '{colors.stone.500}',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  _hover: { color: '{colors.stone.300}' },
  _focus: { outline: '2px solid {colors.seafoam.400}', outlineOffset: '2px', borderRadius: 'sm' },
})

function AboutPage() {
  return (
    <>
      {/* Hero Band */}
      <section className={heroBand}>
        <Sidebar />
        <h1 className={heroTitle}>{identity.name}</h1>
        <p className={heroRole}>{identity.role}</p>
        <p className={heroStatement}>{identity.statement}</p>
      </section>

      {/* Timeline Band */}
      <section className={timelineBand}>
        <h2 className={sectionTitle}>Experience</h2>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={timelineYear}>{entry.year}</span>
            <div className={timelineContent}>
              <span className={timelineRole}>{entry.role}</span>
              <span className={timelineCompany}>{entry.company}</span>
              <p className={timelineDesc}>{entry.description}</p>
            </div>
          </div>
        ))}

        {/* Education */}
        <h2 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: '24px', color: '{colors.stone.900}', marginTop: '64px', marginBottom: '24px', lineHeight: '1.1' })}>Education</h2>
        <div className={timelineRow}>
          <span className={timelineYear}>{education.years}</span>
          <div className={timelineContent}>
            <span className={timelineRole}>{education.degree}</span>
            <span className={timelineCompany}>{education.school}</span>
            <p className={timelineDesc}>{education.concentration}</p>
          </div>
        </div>
      </section>

      {/* Capabilities Band */}
      <section className={capBand}>
        <div>
          <h2 className={capTitle}>Capabilities</h2>
          <div className={capList}>
            {capabilities.map((cap) => (
              <span key={cap} className={capTag}>{cap}</span>
            ))}
          </div>
        </div>
        <div>
          <h2 className={capTitle}>Personal</h2>
          <div className={personalGrid}>
            <div className={personalItem}>
              <span className={personalLabel}>Holes in One</span>
              <span className={personalValue}>{personal.holesInOne}</span>
            </div>
            <div className={personalItem}>
              <span className={personalLabel}>Sport</span>
              <span className={personalValue}>{personal.sport}</span>
            </div>
            <div className={personalItem}>
              <span className={personalLabel}>Teams</span>
              <span className={personalValue}>{personal.teams.join(', ')}</span>
            </div>
            <div className={personalItem}>
              <span className={personalLabel}>Current Focus</span>
              <span className={personalValue}>{personal.currentFocus}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={footer}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}