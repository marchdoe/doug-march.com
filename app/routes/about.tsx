import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrap = css({
  padding: '0 4vw',
  minHeight: 'calc(100vh - 56px)',
})

const masthead = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingBottom: '32px',
  paddingTop: '48px',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
})

const heroName = css({
  fontFamily: 'display',
  fontSize: 'clamp(42px, 8vw, 120px)',
  lineHeight: 'tight',
  letterSpacing: '0.01em',
  color: 'text',
})

const heroRole = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'accent',
  marginTop: '12px',
})

const bodyGrid = css({
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
  },
})

const mainCol = css({
  padding: '24px 24px 48px 0',
  borderRight: '1px solid',
  borderColor: 'border',
  '@media (max-width: 767px)': {
    borderRight: 'none',
    padding: '24px 0 32px',
    borderBottom: '1px solid',
    borderColor: 'border',
  },
})

const sideCol = css({
  padding: '24px 0 48px 24px',
  '@media (max-width: 767px)': {
    padding: '24px 0 32px',
  },
})

const sectionLabel = css({
  fontFamily: 'display',
  fontSize: 'clamp(13px, 1.2vw, 18px)',
  letterSpacing: '0.14em',
  color: 'accent',
  textTransform: 'uppercase',
  lineHeight: '1',
  paddingBottom: '16px',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
  marginBottom: '0',
  marginTop: '32px',
})

const firstSection = css({
  fontFamily: 'display',
  fontSize: 'clamp(13px, 1.2vw, 18px)',
  letterSpacing: '0.14em',
  color: 'accent',
  textTransform: 'uppercase',
  lineHeight: '1',
  paddingBottom: '16px',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
  marginBottom: '0',
  marginTop: '0',
})

const timeRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '0 16px',
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const yearCol = css({
  fontFamily: 'body',
  fontWeight: 'light',
  fontSize: '11px',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  minWidth: '120px',
  paddingTop: '2px',
})

const roleTitle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'text',
  lineHeight: 'normal',
})

const companyName = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'accent',
  lineHeight: 'normal',
})

const descText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  lineHeight: 'normal',
  marginTop: '2px',
  maxWidth: '65ch',
})

const statement = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'textSecondary',
  lineHeight: 'normal',
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  maxWidth: '65ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0',
})

const capItem = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  width: '100%',
})

const personalRow = css({
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '8px',
})

const personalLabel = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  flexShrink: 0,
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  textAlign: 'right',
})

const footerStyle = css({
  padding: '24px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid',
  borderColor: 'border',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
})

function AboutPage() {
  return (
    <div className={pageWrap}>
      <div className={masthead}>
        <h1 className={heroName}>{identity.name.toUpperCase()}</h1>
        <div className={heroRole}>{identity.role}</div>
      </div>

      <div className={bodyGrid}>
        {/* MAIN COLUMN */}
        <div className={mainCol}>
          <div className={firstSection}>STATEMENT</div>
          <p className={statement}>{identity.statement}</p>

          <div className={sectionLabel}>TIMELINE</div>
          {timeline.map((entry, i) => (
            <div className={timeRow} key={i}>
              <span className={yearCol}>{entry.year}</span>
              <div>
                <div className={roleTitle}>{entry.role}</div>
                <div className={companyName}>{entry.company}</div>
                <div className={descText}>{entry.description}</div>
              </div>
            </div>
          ))}

          <div className={sectionLabel}>EDUCATION</div>
          <div className={timeRow}>
            <span className={yearCol}>{education.years}</span>
            <div>
              <div className={roleTitle}>{education.degree}</div>
              <div className={companyName}>{education.school}</div>
              <div className={descText}>{education.concentration}</div>
            </div>
          </div>
        </div>

        {/* SIDE COLUMN */}
        <div className={sideCol}>
          <div className={firstSection}>CAPABILITIES</div>
          <div className={capGrid}>
            {capabilities.map((cap, i) => (
              <div className={capItem} key={i}>{cap}</div>
            ))}
          </div>

          <div className={sectionLabel}>PERSONAL</div>
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
            <span className={personalLabel}>Focus</span>
            <span className={personalValue}>{personal.currentFocus}</span>
          </div>
        </div>
      </div>

      <div className={footerStyle}>
        <span className={footerText}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={css({ fontFamily: 'body', fontSize: '11px', color: 'textMuted', textDecoration: 'none', _hover: { color: 'textSecondary' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>Archive</a>
      </div>
    </div>
  )
}