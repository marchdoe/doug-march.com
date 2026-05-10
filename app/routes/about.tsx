import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const page = css({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '120px 6vw 80px',
})

const pageTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
  lineHeight: 'tight',
  letterSpacing: 'snug',
  color: 'accent',
  textTransform: 'uppercase',
  marginBottom: '48px',
})

const statement = css({
  fontFamily: 'body',
  fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
  lineHeight: 'normal',
  color: 'text',
  maxWidth: '65ch',
  marginBottom: '64px',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '24px',
  paddingBottom: '12px',
  borderBottom: '1px solid {colors.stone.700}',
})

const section = css({
  marginBottom: '64px',
})

const timelineRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '24px',
  paddingBottom: '20px',
  marginBottom: '20px',
  borderBottom: '1px solid {colors.stone.800}',
  _last: {
    borderBottom: 'none',
  },
})

const yearCol = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  minWidth: '120px',
  flexShrink: '0',
})

const roleText = css({
  fontFamily: 'body',
  fontSize: '16px',
  fontWeight: 'semibold',
  color: 'text',
  lineHeight: 'snug',
})

const companyText = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  marginTop: '4px',
})

const descText = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
  marginTop: '8px',
  lineHeight: 'normal',
  maxWidth: '65ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTag = css({
  fontFamily: 'mono',
  fontSize: '12px',
  letterSpacing: 'wide',
  color: 'textSecondary',
  padding: '6px 12px',
  border: '1px solid {colors.stone.700}',
  textTransform: 'uppercase',
})

const personalGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px',
})

const personalItem = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
  lineHeight: 'normal',
})

const personalLabel = css({
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '6px',
  display: 'block',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text',
})

function AboutPage() {
  return (
    <div className={page}>
      <h1 className={pageTitle}>{identity.name}</h1>
      <p className={statement}>{identity.statement}</p>

      <div className={section}>
        <h2 className={sectionLabel}>Experience</h2>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={yearCol}>{entry.year}</span>
            <div>
              <div className={roleText}>{entry.role}</div>
              <div className={companyText}>{entry.company}</div>
              <div className={descText}>{entry.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={section}>
        <h2 className={sectionLabel}>Education</h2>
        <div className={timelineRow}>
          <span className={yearCol}>{education.years}</span>
          <div>
            <div className={roleText}>{education.degree}</div>
            <div className={companyText}>{education.school}</div>
            <div className={descText}>{education.concentration}</div>
          </div>
        </div>
      </div>

      <div className={section}>
        <h2 className={sectionLabel}>Capabilities</h2>
        <div className={capGrid}>
          {capabilities.map((cap, i) => (
            <span key={i} className={capTag}>{cap}</span>
          ))}
        </div>
      </div>

      <div className={section}>
        <h2 className={sectionLabel}>Personal</h2>
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

      <footer style={{ paddingTop: '48px', borderTop: '1px solid #382E28' }}>
        <a href="/archive" className={css({ fontFamily: 'body', fontSize: '11px', color: '{colors.stone.500}', textDecoration: 'none', letterSpacing: '0.08em', _hover: { color: '{colors.amber.300}' }, _focus: { outline: '2px solid {colors.amber.400}', outlineOffset: '2px' } })}>Archive</a>
      </footer>
    </div>
  )
}