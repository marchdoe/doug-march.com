import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageStyle = css({
  padding: '64px 6vw 48px',
  maxWidth: 'none',
  '@media (max-width: 767px)': {
    padding: '40px 5vw 40px',
  },
})

const sectionStyle = css({
  marginBottom: '64px',
})

const headingStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(32px, 4vw, 56px)',
  lineHeight: 'snug',
  color: 'text',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  marginBottom: '24px',
})

const subheadStyle = css({
  fontFamily: 'body',
  fontSize: '10px',
  fontWeight: 'medium',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '16px',
  lineHeight: 'normal',
})

const statementStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(16px, 1.4vw, 20px)',
  fontWeight: 'normal',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '16px',
})

const roleStyle = css({
  fontFamily: 'body',
  fontSize: '15px',
  fontWeight: 'medium',
  color: 'accent',
  marginBottom: '32px',
})

const timelineRowStyle = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: '16px',
  padding: '16px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const yearCellStyle = css({
  fontFamily: 'mono',
  fontSize: '13px',
  fontWeight: 'medium',
  color: 'textMuted',
  minWidth: '120px',
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
})

const contentCellStyle = css({
  fontFamily: 'body',
  fontSize: '15px',
  lineHeight: 'normal',
  color: 'text',
})

const companyStyle = css({
  fontWeight: 'medium',
  color: 'text',
})

const roleTextStyle = css({
  color: 'textSecondary',
  fontWeight: 'normal',
})

const descriptionStyle = css({
  color: 'textSecondary',
  fontSize: '14px',
  marginTop: '4px',
  maxWidth: '65ch',
})

const capsGridStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTagStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'normal',
  color: 'textSecondary',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: 'none',
  lineHeight: 'snug',
})

const personalGridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px',
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

const personalLabelStyle = css({
  fontFamily: 'body',
  fontSize: '9px',
  fontWeight: 'medium',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4px',
})

const personalValueStyle = css({
  fontFamily: 'body',
  fontSize: '15px',
  fontWeight: 'normal',
  color: 'text',
  lineHeight: 'normal',
})

const footerStyle = css({
  padding: '24px 6vw',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
})

const archiveLinkStyle = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: {
    color: 'accent',
    textDecoration: 'underline',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function AboutPage() {
  return (
    <>
      <div className={pageStyle}>
        <section className={sectionStyle}>
          <h1 className={headingStyle}>{identity.name}</h1>
          <div className={roleStyle}>{identity.role}</div>
          <p className={statementStyle}>{identity.statement}</p>
        </section>

        <section className={sectionStyle}>
          <div className={subheadStyle}>Experience</div>
          {timeline.map((entry, i) => (
            <div className={timelineRowStyle} key={i}>
              <div className={yearCellStyle}>{entry.year}</div>
              <div className={contentCellStyle}>
                <div>
                  <span className={companyStyle}>{entry.company}</span>
                  {' — '}
                  <span className={roleTextStyle}>{entry.role}</span>
                </div>
                <div className={descriptionStyle}>{entry.description}</div>
              </div>
            </div>
          ))}
        </section>

        <section className={sectionStyle}>
          <div className={subheadStyle}>Education</div>
          <div className={timelineRowStyle}>
            <div className={yearCellStyle}>{education.years}</div>
            <div className={contentCellStyle}>
              <div>
                <span className={companyStyle}>{education.school}</span>
                {' — '}
                <span className={roleTextStyle}>{education.degree}</span>
              </div>
              <div className={descriptionStyle}>{education.concentration}</div>
            </div>
          </div>
        </section>

        <section className={sectionStyle}>
          <div className={subheadStyle}>Capabilities</div>
          <div className={capsGridStyle}>
            {capabilities.map((cap, i) => (
              <span className={capTagStyle} key={i}>{cap}</span>
            ))}
          </div>
        </section>

        <section className={sectionStyle}>
          <div className={subheadStyle}>Personal</div>
          <div className={personalGridStyle}>
            <div>
              <div className={personalLabelStyle}>Holes in One</div>
              <div className={personalValueStyle}>{personal.holesInOne}</div>
            </div>
            <div>
              <div className={personalLabelStyle}>Sport</div>
              <div className={personalValueStyle}>{personal.sport}</div>
            </div>
            <div>
              <div className={personalLabelStyle}>Teams</div>
              <div className={personalValueStyle}>{personal.teams.join(', ')}</div>
            </div>
            <div>
              <div className={personalLabelStyle}>Current Focus</div>
              <div className={personalValueStyle}>{personal.currentFocus}</div>
            </div>
          </div>
        </section>
      </div>

      <footer className={footerStyle}>
        <span>© 2026 Doug March</span>
        <a href="/archive" className={archiveLinkStyle}>Archive</a>
      </footer>
    </>
  )
}