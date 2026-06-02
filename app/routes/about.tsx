import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const pageStyle = css({
  width: '100vw',
  maxWidth: 'none',
  background: 'bg',
  minHeight: '100vh',
})

const navBarStyle = css({
  padding: '52px 6vw 0',
  '@media (max-width: 768px)': {
    padding: '24px 24px 0',
  },
})

const heroSectionStyle = css({
  padding: '96px 6vw 64px',
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '64px',
  '@media (max-width: 768px)': {
    padding: '48px 24px 40px',
    gridTemplateColumns: '1fr',
    gap: '32px',
  },
})

const nameStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(36px, 4vw, 56px)',
  lineHeight: 'snug',
  letterSpacing: 'tight',
  color: 'text',
  marginBottom: '8px',
})

const roleStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '32px',
})

const statementStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '18px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '55ch',
})

const personalCardStyle = css({
  background: 'bgCard',
  padding: '40px 32px',
  alignSelf: 'start',
  '@media (max-width: 768px)': {
    padding: '32px 24px',
  },
})

const personalLabelStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '10px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '16px',
})

const personalItemStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '1.7',
  color: 'textSecondary',
})

const personalHighlightStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '32px',
  lineHeight: '1.0',
  color: 'accentStrong',
  marginBottom: '4px',
})

const sectionStyle = css({
  padding: '0 6vw 64px',
  '@media (max-width: 768px)': {
    padding: '0 24px 48px',
  },
})

const sectionLabelStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '32px',
})

const timelineGridStyle = css({
  display: 'flex',
  flexDirection: 'column',
})

const timelineRowStyle = css({
  display: 'grid',
  gridTemplateColumns: '140px 200px 1fr',
  gap: '24px',
  padding: '16px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  alignItems: 'baseline',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
    padding: '20px 0',
  },
})

const timelineYearStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '13px',
  color: 'textMuted',
  minWidth: '120px',
  whiteSpace: 'nowrap',
})

const timelineRoleStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '16px',
  color: 'text',
})

const timelineCompanyStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '14px',
  color: 'textSecondary',
  '@media (max-width: 768px)': {
    marginBottom: '4px',
  },
})

const timelineDescStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '55ch',
})

const capGridStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const capTagStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textSecondary',
  padding: '6px 16px',
  background: 'bgCard',
  whiteSpace: 'nowrap',
})

const eduRowStyle = css({
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: '24px',
  alignItems: 'baseline',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
})

const eduDetailStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'text',
})

const eduSubStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '14px',
  color: 'textSecondary',
})

const footerStyle = css({
  padding: '24px 6vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid',
  borderColor: 'border',
  '@media (max-width: 768px)': {
    padding: '24px',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'flex-start',
  },
})

const footerTextStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '12px',
  color: 'textMuted',
})

const footerLinkStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '12px',
  color: 'textMuted',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function AboutPage() {
  return (
    <div className={pageStyle}>
      <div className={navBarStyle}>
        <Sidebar />
      </div>

      <div className={heroSectionStyle}>
        <div>
          <h1 className={nameStyle}>{identity.name}</h1>
          <div className={roleStyle}>{identity.role}</div>
          <p className={statementStyle}>{identity.statement}</p>
        </div>
        <div className={personalCardStyle}>
          <div className={personalLabelStyle}>Personal</div>
          <div className={personalHighlightStyle}>{personal.holesInOne}</div>
          <div className={personalItemStyle} style={{ marginBottom: '16px' }}>Holes in one</div>
          <div className={personalItemStyle}>Sport: {personal.sport}</div>
          <div className={personalItemStyle}>Teams: {personal.teams.join(', ')}</div>
          <div className={personalItemStyle} style={{ marginTop: '16px' }}>Focus: {personal.currentFocus}</div>
        </div>
      </div>

      <div className={sectionStyle}>
        <div className={sectionLabelStyle}>Experience</div>
        <div className={timelineGridStyle}>
          {timeline.map((entry, i) => (
            <div key={i} className={timelineRowStyle}>
              <span className={timelineYearStyle}>{entry.year}</span>
              <div>
                <div className={timelineRoleStyle}>{entry.role}</div>
                <div className={timelineCompanyStyle}>{entry.company}</div>
              </div>
              <div className={timelineDescStyle}>{entry.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={sectionStyle}>
        <div className={sectionLabelStyle}>Education</div>
        <div className={eduRowStyle}>
          <span className={timelineYearStyle}>{education.years}</span>
          <div>
            <div className={eduDetailStyle}>{education.degree}, {education.concentration}</div>
            <div className={eduSubStyle}>{education.school}</div>
          </div>
        </div>
      </div>

      <div className={sectionStyle}>
        <div className={sectionLabelStyle}>Capabilities</div>
        <div className={capGridStyle}>
          {capabilities.map((cap, i) => (
            <span key={i} className={capTagStyle}>{cap}</span>
          ))}
        </div>
      </div>

      <footer className={footerStyle}>
        <span className={footerTextStyle}>Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerLinkStyle}>Archive</a>
      </footer>
    </div>
  )
}