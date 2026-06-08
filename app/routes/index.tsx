import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const heroZoneStyle = css({
  width: '100%',
  minHeight: { base: 'auto', md: '32vh' },
  padding: { base: '32px 6vw 28px', md: '48px 6vw 40px' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
})

const heroTextStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontStyle: 'italic',
  fontSize: 'clamp(36px, 5.5vw, 80px)',
  lineHeight: '0.93',
  letterSpacing: '-0.01em',
  color: 'text',
  textWrap: 'balance',
})

const heroBreakStyle = css({
  display: 'block',
})

const attributionStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '13px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginTop: '20px',
})

const dividerStyle = css({
  width: '100%',
  height: '1px',
  background: 'borderStrong',
  border: 'none',
})

const columnsStyle = css({
  display: { base: 'flex', lg: 'grid' },
  flexDirection: { base: 'column', lg: 'unset' },
  gridTemplateColumns: { lg: '28fr 46fr 26fr' },
  minHeight: { base: 'auto', lg: '52vh' },
  borderTop: '1px solid token(colors.neutral.800)',
})

const colLeftStyle = css({
  padding: { base: '24px 6vw', lg: '32px 3vw 40px 6vw' },
  borderRight: { base: 'none', lg: '1px solid token(colors.neutral.800)' },
  borderBottom: { base: '1px solid token(colors.neutral.800)', lg: 'none' },
})

const colCenterStyle = css({
  padding: { base: '24px 6vw', lg: '32px 3vw 40px' },
  borderRight: { base: 'none', lg: '1px solid token(colors.neutral.800)' },
  borderBottom: { base: '1px solid token(colors.neutral.800)', lg: 'none' },
})

const colRightStyle = css({
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

const featuredTitleStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(24px, 3vw, 36px)',
  lineHeight: '1.0',
  color: 'text',
  marginBottom: '12px',
})

const featuredProblemStyle = css({
  fontFamily: 'display',
  fontSize: '16px',
  lineHeight: '1.65',
  color: 'textSecondary',
  marginBottom: '16px',
  maxWidth: '65ch',
})

const featuredLinkStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  _hover: { color: 'text' },
  _focus: {
    outline: '2px solid token(colors.chartreuse.400)',
    outlineOffset: '2px',
  },
})

const projectRowStyle = css({
  padding: '10px 0',
  borderBottom: '1px solid token(colors.neutral.800)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '12px',
  transition: 'border-color 0.15s ease',
  _hover: {
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'accent',
    paddingLeft: '8px',
  },
})

const projectTitleLinkStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '1.2',
  color: 'text',
  textDecoration: 'none',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid token(colors.chartreuse.400)',
    outlineOffset: '2px',
  },
})

const projectMetaStyle = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  whiteSpace: 'nowrap',
  letterSpacing: '0.03em',
  fontVariantNumeric: 'tabular-nums',
})

const navStackStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '28px',
})

const navItemStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'textSecondary',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '4px 0',
  transition: 'color 0.15s ease',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid token(colors.chartreuse.400)',
    outlineOffset: '2px',
  },
})

const bulletStyle = css({
  color: 'accent',
  fontSize: '10px',
})

const signalEyebrowStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '14px',
})

const signalBlockStyle = css({
  marginBottom: '20px',
})

const signalLabelStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4px',
})

const scoreLineStyle = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: '28px',
  fontVariantNumeric: 'tabular-nums',
  letterSpacing: '0.03em',
  color: 'text',
  lineHeight: '1.3',
})

const scoreAccentStyle = css({
  color: 'accent',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  fontSize: '14px',
})

const leaderRowStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.3',
  color: 'textSecondary',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '3px 0',
})

const leaderScoreStyle = css({
  fontVariantNumeric: 'tabular-nums',
  color: 'accent',
  fontWeight: 'medium',
})

const hnStoryStyle = css({
  fontFamily: 'body',
  fontStyle: 'italic',
  fontSize: '14px',
  lineHeight: '1.45',
  color: 'textSecondary',
  marginBottom: '4px',
})

const hnScoreStyle = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'accent',
  fontWeight: 'medium',
})

const musicLineStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'token(colors.neutral.500)',
})

const moonLineStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
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

const experimentsEyebrowStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginTop: '28px',
  marginBottom: '12px',
})

function HomePage() {
  return (
    <>
      {/* Hero Zone */}
      <div className={heroZoneStyle}>
        <h1 className={heroTextStyle}>
          <span className={heroBreakStyle}>The world makes way</span>
          <span className={heroBreakStyle}>for the man who knows</span>
          <span className={heroBreakStyle}>where he is going.</span>
        </h1>
        <p className={attributionStyle}>— Ralph Waldo Emerson</p>
      </div>

      <hr className={dividerStyle} />

      {/* Three-column broadsheet */}
      <div className={columnsStyle}>
        {/* LEFT COLUMN — Nav + Featured */}
        <div className={colLeftStyle}>
          <p className={eyebrowStyle}>Navigate</p>
          <nav className={navStackStyle}>
            <a href="/" className={navItemStyle}>
              <span className={bulletStyle}>●</span> Work
            </a>
            <a href="/about" className={navItemStyle}>
              <span className={bulletStyle}>●</span> About
            </a>
          </nav>

          <p className={eyebrowStyle}>Featured</p>
          {featuredProject && (
            <div>
              <h2 className={featuredTitleStyle}>{featuredProject.title}</h2>
              {featuredProject.problem && (
                <p className={featuredProblemStyle}>{featuredProject.problem}</p>
              )}
              {featuredProject.externalUrl && (
                <a
                  href={featuredProject.externalUrl}
                  className={featuredLinkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {featuredProject.title} →
                </a>
              )}
            </div>
          )}
        </div>

        {/* CENTER COLUMN — Selected Work + Experiments */}
        <div className={colCenterStyle}>
          <p className={eyebrowStyle}>Filed This Year</p>

          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={css({
                textDecoration: 'none',
                display: 'block',
              })}
            >
              <div className={projectRowStyle}>
                <span className={css({
                  fontFamily: 'display',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  lineHeight: '1.2',
                  color: 'text',
                })}>
                  {project.title}
                </span>
                <span className={projectMetaStyle}>
                  {project.type} · {project.year}
                </span>
              </div>
            </a>
          ))}

          <p className={experimentsEyebrowStyle}>Experiments</p>

          {experiments.map((exp) => (
            <a
              key={exp.slug}
              href={exp.externalUrl || `/work/${exp.slug}`}
              className={css({
                textDecoration: 'none',
                display: 'block',
              })}
              {...(exp.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <div className={projectRowStyle}>
                <span className={css({
                  fontFamily: 'display',
                  fontWeight: 'medium',
                  fontSize: '15px',
                  lineHeight: '1.2',
                  color: 'textSecondary',
                })}>
                  {exp.title}
                </span>
                <span className={projectMetaStyle}>
                  {exp.type} · {exp.year}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* RIGHT COLUMN — Signals */}
        <div className={colRightStyle}>
          <p className={signalEyebrowStyle}>Today's Field</p>

          {/* Tigers Score */}
          <div className={signalBlockStyle}>
            <p className={signalLabelStyle}>Detroit Tigers</p>
            <p className={scoreLineStyle}>
              <span className={scoreAccentStyle}>Win</span>{' '}
              5 – 4
            </p>
          </div>

          {/* Memorial Tournament */}
          <div className={signalBlockStyle}>
            <p className={signalLabelStyle}>Memorial Tournament · Final</p>
            <div className={leaderRowStyle}>
              <span>J.T. Poston</span>
              <span className={leaderScoreStyle}>−12</span>
            </div>
            <div className={leaderRowStyle}>
              <span>B. Gerard <span className={css({ color: 'textMuted', fontStyle: 'italic', fontSize: '12px' })}>(T2)</span></span>
              <span className={leaderScoreStyle}>−12</span>
            </div>
            <div className={leaderRowStyle}>
              <span>T. Fleetwood</span>
              <span className={css({ fontVariantNumeric: 'tabular-nums', color: 'textSecondary' })}>−11</span>
            </div>
            <div className={leaderRowStyle}>
              <span>W. Clark</span>
              <span className={css({ fontVariantNumeric: 'tabular-nums', color: 'textSecondary' })}>−10</span>
            </div>
          </div>

          {/* HN Story */}
          <div className={signalBlockStyle}>
            <p className={signalLabelStyle}>From the Wire</p>
            <p className={hnStoryStyle}>
              Building from zero after addiction, prison, and a felony
            </p>
            <span className={hnScoreStyle}>669 pts</span>
          </div>

          {/* Moon */}
          <div className={signalBlockStyle}>
            <p className={moonLineStyle}>🌗 Last Quarter · 35.7%</p>
          </div>

          {/* Music */}
          <div className={signalBlockStyle}>
            <p className={musicLineStyle}>
              The War on Drugs / Guided by Voices
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={footerBandStyle}>
        <span className={footerTextStyle}>© 2026 Doug March</span>
        <span className={footerTextStyle}>Product Designer & Developer</span>
        <a href="/archive" className={footerLinkStyle}>Archive</a>
      </footer>
    </>
  )
}