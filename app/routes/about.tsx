import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageWrapStyle = css({
  width: '100%',
})

const heroSectionStyle = css({
  padding: { base: '32px 6vw 28px', md: '48px 6vw 40px' },
  borderBottom: '1px solid token(colors.neutral.800)',
})

const nameStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(32px, 4vw, 56px)',
  lineHeight: '0.95',
  color: 'text',
  marginBottom: '8px',
})

const roleStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '20px',
})

const statementStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(17px, 2vw, 22px)',
  lineHeight: '1.55',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const columnsStyle = css({
  display: { base: 'flex', lg: 'grid' },
  flexDirection: { base: 'column', lg: 'unset' },
  gridTemplateColumns: { lg: '60fr 40fr' },
  borderTop: '1px solid token(colors.neutral.800)',
})

const colMainStyle = css({
  padding: { base: '24px 6vw', lg: '32px 3vw 40px 6vw' },
  borderRight: { base: 'none', lg: '1px solid token(colors.neutral.800)' },
  borderBottom: { base: '1px solid token(colors.neutral.800)', lg: 'none' },
})

const colSideStyle = css({
  padding: { base: '24px 6vw', lg: '32px 4vw 40px 3vw' },
})

const eyebrowStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '16px',
})

const timelineRowStyle = css({
  display: 'flex',
  gap: { base: '12px', md: '24px' },
  padding: '12px 0',
  borderBottom: '1px solid token(colors.neutral.800)',
  alignItems: 'baseline',
})

const yearColStyle = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
  letterSpacing: '0.03em',
  minWidth: '120px',
  flexShrink: 0,
})

const roleCompanyStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '15px',
  color: 'text',
  lineHeight: '1.2',
})

const companyNameStyle = css({
  color: 'textSecondary',
  fontWeight: 'normal',
})

const descStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.55',
  color: 'textSecondary',
  marginTop: '4px',
  maxWidth: '55ch',
})

const capListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '28px',
})

const capItemStyle = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textSecondary',
  letterSpacing: '0.03em',
  padding: '4px 10px',
  border: '1px solid token(colors.neutral.700)',
})

const personalBlockStyle = css({
  marginBottom: '20px',
})

const personalLabelStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4px',
})

const personalValueStyle = css({
  fontFamily: 'display',
  fontSize: '16px',
  color: 'text',
  lineHeight: '1.4',
})

const eduBlockStyle = css({
  marginBottom: '20px',
})

const footerBandStyle = css({
  width: '100%',
  padding: '20px 6vw',
  borderTop: '1px solid token(colors.neutral.800)',
  display: 'flex',
  gap: '48px',
  alignItems: 'center',
  flexWrap: 'wrap',
})

const footerTextStyle = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

const footerLinkStyle = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid token(colors.chartreuse.400)',
    outlineOffset: '2px',
  },
})

function AboutPage() {
  return (
    <div className={pageWrapStyle}>
      {/* Hero Identity */}
      <div className={heroSectionStyle}>
        <h1 className={nameStyle}>{identity.name}</h1>
        <p className={roleStyle}>{identity.role}</p>
        <p className={statementStyle}>{identity.statement}</p>
      </div>

      {/* Two columns */}
      <div className={columnsStyle}>
        {/* Main: Timeline */}
        <div className={colMainStyle}>
          <p className={eyebrowStyle}>Record</p>
          {timeline.map((entry, i) => (
            <div key={i} className={timelineRowStyle}>
              <span className={yearColStyle}>{entry.year}</span>
              <div>
                <p className={roleCompanyStyle}>
                  {entry.role}{' '}
                  <span className={companyNameStyle}>— {entry.company}</span>
                  {entry.current && (
                    <span className={css({ color: 'accent', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', marginLeft: '8px', fontFamily: 'body' })}>
                      Current
                    </span>
                  )}
                </p>
                <p className={descStyle}>{entry.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Side: Capabilities, Education, Personal */}
        <div className={colSideStyle}>
          <p className={eyebrowStyle}>Capabilities</p>
          <div className={capListStyle}>
            {capabilities.map((cap, i) => (
              <span key={i} className={capItemStyle}>{cap}</span>
            ))}
          </div>

          <p className={eyebrowStyle}>Education</p>
          <div className={eduBlockStyle}>
            <p className={personalValueStyle}>{education.school}</p>
            <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'textSecondary', lineHeight: '1.4' })}>
              {education.degree}, {education.concentration}
            </p>
            <p className={css({ fontFamily: 'mono', fontSize: '12px', color: 'textMuted' })}>
              {education.years}
            </p>
          </div>

          <p className={eyebrowStyle}>Personal</p>
          <div className={personalBlockStyle}>
            <p className={personalLabelStyle}>Holes in One</p>
            <p className={personalValueStyle}>{personal.holesInOne}</p>
          </div>
          <div className={personalBlockStyle}>
            <p className={personalLabelStyle}>Sport</p>
            <p className={personalValueStyle}>{personal.sport}</p>
          </div>
          <div className={personalBlockStyle}>
            <p className={personalLabelStyle}>Teams</p>
            <p className={personalValueStyle}>{personal.teams.join(', ')}</p>
          </div>
          <div className={personalBlockStyle}>
            <p className={personalLabelStyle}>Current Focus</p>
            <p className={personalValueStyle}>{personal.currentFocus}</p>
          </div>
        </div>
      </div>

      <footer className={footerBandStyle}>
        <span className={footerTextStyle}>© 2026 Doug March</span>
        <a href="/archive" className={footerLinkStyle}>Archive</a>
      </footer>
    </div>
  )
}