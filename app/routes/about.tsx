import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageStyle = css({
  padding: '0 4vw',
})

const headlineBandStyle = css({
  padding: '32px 4vw 24px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const pageTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(36px, 5vw, 72px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  textTransform: 'uppercase',
  color: 'text',
})

const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', lg: '2fr 1fr' },
  gap: '0',
  padding: '0 4vw',
  minHeight: '60vh',
})

const mainCol = css({
  padding: { base: '24px 0', lg: '32px 32px 32px 0' },
  borderRight: { base: 'none', lg: '1px solid' },
  borderColor: 'border',
})

const sideCol = css({
  padding: { base: '24px 0', lg: '32px 0 32px 32px' },
})

const eyebrowStyle = css({
  fontFamily: 'display',
  fontSize: '13px',
  color: 'accent',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  marginBottom: '16px',
})

const bodyStyle = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'text',
  marginBottom: '24px',
  maxWidth: '65ch',
})

const timelineRowStyle = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', sm: '120px 1fr' },
  gap: { base: '4px', sm: '24px' },
  padding: '14px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  alignItems: 'baseline',
})

const yearStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: 'wide',
  minWidth: '120px',
  whiteSpace: 'nowrap',
})

const roleStyle = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text',
  fontWeight: 'medium',
})

const companyStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  marginTop: '2px',
})

const descStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: 'normal',
  marginTop: '4px',
  maxWidth: '60ch',
})

const capGrid = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '24px',
})

const capTag = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'text',
  letterSpacing: 'wide',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
  whiteSpace: 'nowrap',
})

const personalRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  gap: '12px',
})

const personalLabel = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
})

const personalValue = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text',
  textAlign: 'right',
})

const sectionSpace = css({ marginTop: '32px' })

const footerStyle = css({
  padding: '24px 4vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '8px',
})

const footerTextStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: 'wide',
})

function AboutPage() {
  return (
    <>
      <div className={headlineBandStyle}>
        <h1 className={pageTitle}>{identity.name}</h1>
        <div className={css({ fontFamily: 'body', fontSize: '16px', color: 'textSecondary', marginTop: '8px' })}>
          {identity.role}
        </div>
      </div>

      <div className={gridStyle}>
        <div className={mainCol}>
          <div className={eyebrowStyle}>About</div>
          <p className={bodyStyle}>{identity.statement}</p>

          <div className={sectionSpace}>
            <div className={eyebrowStyle}>Experience</div>
            {timeline.map((entry, i) => (
              <div key={i} className={timelineRowStyle}>
                <span className={yearStyle}>{entry.year}</span>
                <div>
                  <div className={roleStyle}>{entry.role}</div>
                  <div className={companyStyle}>{entry.company}</div>
                  <div className={descStyle}>{entry.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={sectionSpace}>
            <div className={eyebrowStyle}>Education</div>
            <div className={timelineRowStyle}>
              <span className={yearStyle}>{education.years}</span>
              <div>
                <div className={roleStyle}>{education.degree}</div>
                <div className={companyStyle}>{education.school}</div>
                <div className={descStyle}>{education.concentration}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={sideCol}>
          <div className={eyebrowStyle}>Capabilities</div>
          <div className={capGrid}>
            {capabilities.map((cap, i) => (
              <span key={i} className={capTag}>{cap}</span>
            ))}
          </div>

          <div className={sectionSpace}>
            <div className={eyebrowStyle}>Personal</div>
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
        </div>
      </div>

      <footer className={footerStyle}>
        <span className={footerTextStyle}>© 2026 Doug March</span>
        <a href="/archive" className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: 'wide', textDecoration: 'none', _hover: { color: 'accent', textDecoration: 'underline', opacity: 1 }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>Archive</a>
      </footer>
    </>
  )
}