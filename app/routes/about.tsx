import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageBand = css({
  width: '100%',
  padding: '120px 6vw 64px',
  background: 'bg',
  '@media (max-width: 640px)': {
    padding: '80px 6vw 40px',
  },
})

const identityBlock = css({
  marginBottom: '48px',
})

const nameText = css({
  fontFamily: 'display',
  fontSize: 'clamp(36px, 6vw, 72px)',
  fontWeight: '700',
  lineHeight: '1.0',
  letterSpacing: '-0.025em',
  color: '{colors.neutral.50}',
  marginBottom: '8px',
})

const roleText = css({
  fontFamily: 'body',
  fontSize: 'clamp(16px, 2vw, 22px)',
  fontWeight: '400',
  color: 'accent',
  marginBottom: '24px',
})

const statementText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.6',
  color: '{colors.neutral.200}',
  maxWidth: '65ch',
})

const sectionTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(18px, 2vw, 28px)',
  fontWeight: '700',
  color: '{colors.neutral.50}',
  letterSpacing: '-0.025em',
  marginBottom: '32px',
})

const timelineBand = css({
  width: '100%',
  padding: '64px 6vw',
  background: 'bgBand',
  '@media (max-width: 640px)': {
    padding: '40px 6vw',
  },
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: '24px',
  padding: '20px 0',
  borderBottom: '1px solid',
  borderBottomColor: '{colors.neutral.600}',
  _last: { borderBottom: 'none' },
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const timeYear = css({
  fontFamily: 'mono',
  fontSize: '14px',
  fontWeight: '500',
  color: '{colors.neutral.400}',
  fontVariantNumeric: 'tabular-nums',
  minWidth: '120px',
})

const timeContent = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const timeRole = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: '600',
  color: '{colors.neutral.100}',
})

const timeCompany = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
})

const timeDesc = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: '{colors.neutral.300}',
  maxWidth: '55ch',
})

const capBand = css({
  width: '100%',
  padding: '64px 6vw',
  background: 'bgCard',
  '@media (max-width: 640px)': {
    padding: '40px 6vw',
  },
})

const capGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '12px 24px',
})

const capItem = css({
  fontFamily: 'body',
  fontSize: '15px',
  color: '{colors.neutral.200}',
  padding: '8px 0',
  borderBottom: '1px solid',
  borderBottomColor: '{colors.neutral.700}',
})

const eduBand = css({
  width: '100%',
  padding: '64px 6vw',
  background: 'bg',
  '@media (max-width: 640px)': {
    padding: '40px 6vw',
  },
})

const eduBlock = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const eduSchool = css({
  fontFamily: 'body',
  fontSize: '18px',
  fontWeight: '600',
  color: '{colors.neutral.100}',
})

const eduDetail = css({
  fontFamily: 'body',
  fontSize: '15px',
  color: '{colors.neutral.300}',
})

const personalBand = css({
  width: '100%',
  padding: '64px 6vw',
  background: 'bgBand',
  '@media (max-width: 640px)': {
    padding: '40px 6vw',
  },
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '32px',
})

const personalItem = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: '{colors.neutral.100}',
})

const footerBand = css({
  width: '100%',
  background: 'bgCard',
  padding: '24px 6vw',
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
  textDecoration: 'none',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function AboutPage() {
  return (
    <>
      <section className={pageBand}>
        <div className={identityBlock}>
          <h1 className={nameText}>{identity.name}</h1>
          <div className={roleText}>{identity.role}</div>
          <p className={statementText}>{identity.statement}</p>
        </div>
      </section>

      <section className={timelineBand}>
        <h2 className={sectionTitle}>Experience</h2>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={timeYear}>{entry.year}</span>
            <div className={timeContent}>
              <span className={timeRole}>{entry.role}</span>
              <span className={timeCompany}>{entry.company}</span>
              <span className={timeDesc}>{entry.description}</span>
            </div>
          </div>
        ))}
      </section>

      <section className={capBand}>
        <h2 className={sectionTitle}>Capabilities</h2>
        <div className={capGrid}>
          {capabilities.map((cap, i) => (
            <div key={i} className={capItem}>{cap}</div>
          ))}
        </div>
      </section>

      <section className={eduBand}>
        <h2 className={sectionTitle}>Education</h2>
        <div className={eduBlock}>
          <span className={eduSchool}>{education.school}</span>
          <span className={eduDetail}>{education.degree} — {education.concentration}</span>
          <span className={eduDetail}>{education.years}</span>
        </div>
      </section>

      <section className={personalBand}>
        <h2 className={sectionTitle}>Personal</h2>
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
      </section>

      <footer className={footerBand}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}