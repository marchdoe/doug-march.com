import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const heroStyle = css({
  padding: '40px 0 28px',
  borderBottom: '2px solid',
  borderColor: 'accent',
})

const pageEyebrowStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '12px',
})

const pageTitleStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
  fontWeight: 'bold',
  color: 'text',
  lineHeight: '0.88',
  letterSpacing: '-0.02em',
})

const statementStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
  fontWeight: 'normal',
  color: 'textSecondary',
  lineHeight: '1.5',
  marginTop: '20px',
  maxWidth: '70ch',
})

const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '2fr 1fr',
  },
})

const mainColStyle = css({
  padding: '28px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (min-width: 768px)': {
    padding: '28px 20px 28px 0',
    borderRight: '1px solid',
    borderColor: 'border',
    borderBottom: 'none',
  },
})

const sideColStyle = css({
  padding: '28px 0',
  '@media (min-width: 768px)': {
    padding: '28px 0 28px 20px',
  },
})

const eyebrowStyle = css({
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '8px',
})

const sectionHeadStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
  fontWeight: 'semibold',
  color: 'text',
  letterSpacing: '-0.01em',
  lineHeight: '1.1',
  marginBottom: '16px',
})

const timelineRowStyle = css({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '16px',
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  '&:last-child': {
    borderBottom: 'none',
  },
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const timelineYearStyle = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.04em',
  lineHeight: '1.4',
  whiteSpace: 'nowrap',
  minWidth: '120px',
})

const timelineContentStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text',
  lineHeight: '1.55',
})

const timelineRoleStyle = css({
  fontWeight: 'semibold',
  color: 'text',
})

const timelineCompanyStyle = css({
  color: 'textSecondary',
})

const timelineDescStyle = css({
  color: 'textSecondary',
  marginTop: '4px',
  fontSize: '13px',
})

const capListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
})

const capItemStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.04em',
  color: 'textSecondary',
  padding: '4px 10px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '2px',
  lineHeight: '1.4',
})

const personalItemStyle = css({
  padding: '8px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  '&:last-child': {
    borderBottom: 'none',
  },
})

const personalLabelStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '2px',
})

const personalValueStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text',
  lineHeight: '1.4',
})

function AboutPage() {
  return (
    <>
      <div className={heroStyle}>
        <p className={pageEyebrowStyle}>About</p>
        <h1 className={pageTitleStyle}>{identity.name}</h1>
        <p className={css({
          fontFamily: 'body',
          fontSize: '14px',
          color: 'accent',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginTop: '8px',
        })}>
          {identity.role}
        </p>
        <p className={statementStyle}>{identity.statement}</p>
      </div>

      <div className={gridStyle}>
        <div className={mainColStyle}>
          <p className={eyebrowStyle}>Experience</p>
          <h2 className={sectionHeadStyle}>Timeline</h2>
          <div>
            {timeline.map((entry, i) => (
              <div key={i} className={timelineRowStyle}>
                <span className={timelineYearStyle}>{entry.year}</span>
                <div className={timelineContentStyle}>
                  <span className={timelineRoleStyle}>{entry.role}</span>
                  {' — '}
                  <span className={timelineCompanyStyle}>{entry.company}</span>
                  <p className={timelineDescStyle}>{entry.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={css({ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid', borderColor: 'border' })}>
            <p className={eyebrowStyle}>Education</p>
            <div className={timelineRowStyle}>
              <span className={timelineYearStyle}>{education.years}</span>
              <div className={timelineContentStyle}>
                <span className={timelineRoleStyle}>{education.degree}</span>
                {' — '}
                <span className={timelineCompanyStyle}>{education.school}</span>
                <p className={timelineDescStyle}>{education.concentration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={sideColStyle}>
          <p className={eyebrowStyle}>Capabilities</p>
          <h2 className={sectionHeadStyle}>Skills</h2>
          <div className={capListStyle}>
            {capabilities.map((cap) => (
              <span key={cap} className={capItemStyle}>{cap}</span>
            ))}
          </div>

          <div className={css({ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid', borderColor: 'border' })}>
            <p className={eyebrowStyle}>Personal</p>
            <div className={personalItemStyle}>
              <p className={personalLabelStyle}>Sport</p>
              <p className={personalValueStyle}>{personal.sport}</p>
            </div>
            <div className={personalItemStyle}>
              <p className={personalLabelStyle}>Holes in One</p>
              <p className={personalValueStyle}>{personal.holesInOne}</p>
            </div>
            <div className={personalItemStyle}>
              <p className={personalLabelStyle}>Teams</p>
              <p className={personalValueStyle}>{personal.teams.join(', ')}</p>
            </div>
            <div className={personalItemStyle}>
              <p className={personalLabelStyle}>Current Focus</p>
              <p className={personalValueStyle}>{personal.currentFocus}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}