import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const heroKickerStyle = css({
  fontFamily: 'display',
  fontSize: '13px',
  color: 'accent',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  marginBottom: '12px',
})

const heroStyle = css({
  padding: '32px 4vw 24px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const heroTextStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(42px, 6.5vw, 96px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'text',
  textTransform: 'uppercase',
  maxWidth: '100%',
})

const heroAccentLine = css({
  color: 'accent',
})

const heroAttrStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: 'wide',
  marginTop: '16px',
})

const contentGridStyle = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 300px' },
  gap: '0',
  padding: '0 4vw',
  minHeight: '60vh',
})

const col1Style = css({
  padding: { base: '24px 0', md: '32px 32px 32px 0' },
  borderRight: { base: 'none', md: '1px solid' },
  borderBottom: { base: '1px solid', md: 'none' },
  borderColor: 'border',
})

const col2Style = css({
  padding: { base: '24px 0', md: '32px', lg: '32px' },
  borderRight: { base: 'none', lg: '1px solid' },
  borderBottom: { base: '1px solid', lg: 'none' },
  borderColor: 'border',
})

const sidebarColStyle = css({
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

const featuredTitleStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(28px, 3vw, 42px)',
  lineHeight: 'snug',
  letterSpacing: 'tight',
  textTransform: 'uppercase',
  color: 'text',
  marginBottom: '12px',
})

const bodyTextStyle = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'text',
  marginBottom: '16px',
  maxWidth: '65ch',
})

const linkStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  transition: 'color 0.15s ease',
  padding: '4px 0',
  display: 'inline-block',
  _hover: { textDecoration: 'underline', opacity: 1 },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const projectRowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '14px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'background 0.15s ease',
  gap: '12px',
  _hover: { background: 'surface' },
})

const projectTitleLink = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'text',
  textDecoration: 'none',
  fontWeight: 'medium',
  _hover: { color: 'accent', opacity: 1 },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const projectMetaStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textMuted',
  letterSpacing: 'wide',
  whiteSpace: 'nowrap',
})

const signalRowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  gap: '8px',
})

const signalName = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text',
  lineHeight: 'snug',
})

const signalScore = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  whiteSpace: 'nowrap',
})

const signalDim = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textMuted',
})

const quoteStyle = css({
  borderLeft: '2px solid',
  borderColor: 'accent',
  paddingLeft: '16px',
  marginTop: '32px',
})

const quoteTextStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontStyle: 'italic',
  color: 'textSecondary',
  lineHeight: 'normal',
  marginBottom: '8px',
})

const quoteAttrStyle = css({
  fontFamily: 'display',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
})

const sectionSpaceStyle = css({
  marginTop: '32px',
})

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

const archiveLinkStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: 'wide',
  textDecoration: 'none',
  _hover: { color: 'accent', textDecoration: 'underline', opacity: 1 },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function HomePage() {
  return (
    <>
      {/* Headline Band */}
      <div className={heroStyle}>
        <div className={heroKickerStyle}>HN Today — 605 Pts</div>
        <h1 className={heroTextStyle}>
          Domain expertise<br />
          has always been<br />
          <span className={heroAccentLine}>the real moat.</span>
        </h1>
        <div className={heroAttrStyle}>— Hacker News, 605 Pts</div>
      </div>

      {/* Content Grid */}
      <div className={contentGridStyle}>
        {/* Column 1: Featured + Selected Work */}
        <div className={col1Style}>
          <div className={eyebrowStyle}>Featured</div>
          {featuredProject && (
            <>
              <h2 className={featuredTitleStyle}>{featuredProject.title}</h2>
              {featuredProject.problem && (
                <p className={bodyTextStyle}>{featuredProject.problem}</p>
              )}
              {featuredProject.externalUrl && (
                <a
                  href={featuredProject.externalUrl}
                  className={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {featuredProject.title} →
                </a>
              )}
            </>
          )}

          <div className={sectionSpaceStyle}>
            <div className={eyebrowStyle}>Selected Work</div>
            {selectedWork.map((p) => (
              <div key={p.slug} className={projectRowStyle}>
                <a href={`/work/${p.slug}`} className={projectTitleLink}>
                  {p.title}
                </a>
                <span className={projectMetaStyle}>
                  {p.type} · {p.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Experiments + About teaser */}
        <div className={col2Style}>
          <div className={eyebrowStyle}>Experiments</div>
          {experiments.map((e) => (
            <div key={e.slug} className={projectRowStyle}>
              <a
                href={e.externalUrl || `/work/${e.slug}`}
                className={projectTitleLink}
                {...(e.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {e.title}
              </a>
              <span className={projectMetaStyle}>
                {e.type} · {e.year}
              </span>
            </div>
          ))}

          <div className={sectionSpaceStyle}>
            <div className={eyebrowStyle}>About</div>
            <p className={bodyTextStyle}>
              Doug March is a Product Designer & Developer building at the intersection of design and engineering.
            </p>
            <a href="/about" className={linkStyle}>Read more →</a>
          </div>

          <div className={sectionSpaceStyle}>
            <div className={eyebrowStyle}>Now Playing</div>
            <div className={signalRowStyle}>
              <span className={signalName}>The War on Drugs</span>
            </div>
            <div className={signalRowStyle}>
              <span className={signalName}>My Morning Jacket</span>
            </div>
          </div>
        </div>

        {/* Sidebar Column: Signals */}
        <div className={sidebarColStyle}>
          <div className={eyebrowStyle}>● Signals</div>

          <div className={css({ marginBottom: '24px' })}>
            <div className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: 'wider', textTransform: 'uppercase', marginBottom: '8px' })}>
              Charles Schwab Challenge
            </div>
            <div className={signalRowStyle}>
              <span className={signalName}>Eric Cole</span>
              <span className={signalScore}>–12</span>
            </div>
            <div className={signalRowStyle}>
              <span className={signalName}>Ryan Gerard</span>
              <span className={signalScore}>–11</span>
            </div>
            <div className={signalRowStyle}>
              <span className={signalName}>Mac Meissner</span>
              <span className={signalScore}>–10</span>
            </div>
          </div>

          <div className={css({ marginBottom: '24px' })}>
            <div className={signalRowStyle}>
              <span className={signalName}>DET Tigers</span>
              <span className={signalDim}>L 1–7</span>
            </div>
          </div>

          <div className={quoteStyle}>
            <p className={quoteTextStyle}>
              "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind."
            </p>
            <span className={quoteAttrStyle}>— Dr. Seuss</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={footerStyle}>
        <span className={footerTextStyle}>© 2026 Doug March</span>
        <a href="/archive" className={archiveLinkStyle}>Archive</a>
      </footer>
    </>
  )
}