import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageHeaderStyle = css({
  padding: '32px 0 20px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const nameStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(28px, 3.5vw, 48px)',
  lineHeight: '1.08',
  letterSpacing: '-0.02em',
  color: 'text',
})

const roleStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.10em',
  fontVariantCaps: 'all-small-caps',
  color: 'textSecondary',
  marginTop: '8px',
})

const columnsStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1.2fr 0.8fr',
  },
})

const colStyle = css({
  padding: '20px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (min-width: 768px)': {
    padding: '20px 24px 20px 0',
    borderBottom: 'none',
    borderRight: '1px solid',
    borderRightColor: 'border',
  },
})

const colLastStyle = css({
  padding: '20px 0',
  '@media (min-width: 768px)': {
    padding: '20px 24px',
  },
})

const sectionHeaderStyle = css({
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'accentText',
  marginBottom: '12px',
  paddingBottom: '8px',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const statementStyle = css({
  fontFamily: 'display',
  fontStyle: 'italic',
  fontSize: 'clamp(18px, 2vw, 24px)',
  lineHeight: '1.3',
  color: 'text',
  marginBottom: '24px',
  maxWidth: '65ch',
})

const bodyStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: 'text',
  maxWidth: '65ch',
})

const timelineRowStyle = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '12px',
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  alignItems: 'start',
})

const yearStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontVariantNumeric: 'tabular-nums',
  color: 'textMuted',
  minWidth: '120px',
  whiteSpace: 'nowrap',
})

const entryRoleStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'semibold',
  color: 'text',
})

const entryCompanyStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
})

const entryDescStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  lineHeight: '1.5',
  color: 'textSecondary',
  marginTop: '4px',
  maxWidth: '60ch',
})

const capListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginBottom: '20px',
})

const capPillStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.04em',
  padding: '4px 10px',
  background: 'bgAccent',
  color: 'accentDeep',
  border: '1px solid',
  borderColor: 'accentLight',
})

const personalRowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  fontFamily: 'body',
  fontSize: '13px',
})

const personalLabelStyle = css({
  color: 'textMuted',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
})

const personalValueStyle = css({
  color: 'text',
  textAlign: 'right',
})

const footerStyle = css({
  padding: '16px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  marginTop: 'auto',
})

const footerLinkStyle = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: {
    color: 'accentDeep',
    textDecoration: 'underline',
  },
})

function AboutPage() {
  return (
    <>
      <section className={pageHeaderStyle}>
        <h1 className={nameStyle}>{identity.name}</h1>
        <p className={roleStyle}>{identity.role}</p>
      </section>

      <div className={columnsStyle}>
        <div className={colStyle}>
          <h2 className={sectionHeaderStyle}>About</h2>
          <p className={statementStyle}>{identity.statement}</p>

          <h2 className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'accentText',
            marginTop: '24px',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '1px solid',
            borderColor: 'borderSubtle',
          })}>
            Career Timeline
          </h2>

          {timeline.map((entry, i) => (
            <div key={i} className={timelineRowStyle}>
              <span className={yearStyle}>{entry.year}</span>
              <div>
                <div className={entryRoleStyle}>{entry.role}</div>
                <div className={entryCompanyStyle}>{entry.company}</div>
                <p className={entryDescStyle}>{entry.description}</p>
              </div>
            </div>
          ))}

          <div className={css({
            marginTop: '24px',
          })}>
            <h2 className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'accentText',
              marginBottom: '12px',
              paddingBottom: '8px',
              borderBottom: '1px solid',
              borderColor: 'borderSubtle',
            })}>
              Education
            </h2>
            <div className={timelineRowStyle}>
              <span className={yearStyle}>{education.years}</span>
              <div>
                <div className={entryRoleStyle}>{education.degree}</div>
                <div className={entryCompanyStyle}>{education.school}</div>
                <p className={entryDescStyle}>{education.concentration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={colLastStyle}>
          <h2 className={sectionHeaderStyle}>Capabilities</h2>
          <div className={capListStyle}>
            {capabilities.map((cap) => (
              <span key={cap} className={capPillStyle}>{cap}</span>
            ))}
          </div>

          <h2 className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'accentText',
            marginTop: '24px',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '1px solid',
            borderColor: 'borderSubtle',
          })}>
            Personal
          </h2>

          <div className={personalRowStyle}>
            <span className={personalLabelStyle}>Holes in One</span>
            <span className={personalValueStyle}>{personal.holesInOne}</span>
          </div>
          <div className={personalRowStyle}>
            <span className={personalLabelStyle}>Sport</span>
            <span className={personalValueStyle}>{personal.sport}</span>
          </div>
          <div className={personalRowStyle}>
            <span className={personalLabelStyle}>Teams</span>
            <span className={personalValueStyle}>{personal.teams.join(', ')}</span>
          </div>
          <div className={personalRowStyle}>
            <span className={personalLabelStyle}>Current Focus</span>
            <span className={personalValueStyle}>{personal.currentFocus}</span>
          </div>
        </div>
      </div>

      <footer className={footerStyle}>
        <span>© 2026 Doug March</span>
        <a href="/archive" className={footerLinkStyle}>Archive</a>
      </footer>
    </>
  )
}