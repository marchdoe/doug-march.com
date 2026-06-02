import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const galleryWallStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridTemplateRows: 'auto auto',
  width: '100vw',
  maxWidth: 'none',
  minHeight: '100vh',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
  },
})

const heroBlockStyle = css({
  gridColumn: '1 / 9',
  gridRow: '1',
  minHeight: '80vh',
  background: 'bg',
  padding: '52px 72px 64px 6vw',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 1024px)': {
    padding: '40px 48px 48px 5vw',
  },
  '@media (max-width: 768px)': {
    padding: '24px 24px 48px 24px',
    minHeight: '70vh',
    gridColumn: '1 / -1',
  },
})

const heroNavSpacerStyle = css({
  marginBottom: '96px',
  '@media (max-width: 768px)': {
    marginBottom: '48px',
  },
})

const heroPhraseWrapperStyle = css({
  marginTop: 'auto',
  marginBottom: 'auto',
  maxWidth: '90%',
  '@media (max-width: 768px)': {
    maxWidth: '100%',
  },
})

const heroPhraseStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(48px, 6.5vw, 96px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'text',
  textWrap: 'balance',
  margin: 0,
})

const wonderWordStyle = css({
  color: 'accentStrong',
})

const attributionStyle = css({
  fontFamily: 'body',
  fontWeight: 'light',
  fontStyle: 'italic',
  fontSize: '14px',
  color: 'textMuted',
  letterSpacing: '0.02em',
  marginTop: '32px',
})

const signalPanelStyle = css({
  gridColumn: '9 / 13',
  gridRow: '1 / 3',
  background: 'bgInverse',
  color: 'textInverse',
  padding: '52px 40px 64px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
  minHeight: '100vh',
  '@media (max-width: 1024px)': {
    padding: '40px 32px 48px 24px',
    gap: '36px',
  },
  '@media (max-width: 768px)': {
    gridColumn: '1 / -1',
    gridRow: 'auto',
    minHeight: 'auto',
    padding: '40px 24px',
    gap: '32px',
  },
})

const signalLabelStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '10px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textInverseSecondary',
  marginBottom: '8px',
})

const signalScoreStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(28px, 2.5vw, 36px)',
  lineHeight: '1.0',
  color: 'accentOnDark',
})

const signalDetailStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '11px',
  color: 'textInverseSecondary',
  marginTop: '6px',
})

const signalMediumStyle = css({
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '20px',
  lineHeight: '1.2',
  color: 'accentOnDark',
})

const signalSmallListStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '12px',
  color: 'textInverseSecondary',
  marginTop: '4px',
})

const musicArtistStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '13px',
  color: 'textInverseSecondary',
  lineHeight: '1.6',
})

const hnStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontStyle: 'italic',
  fontSize: '11px',
  color: 'textInverseSecondary',
  lineHeight: '1.5',
})

const daylightStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '10px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textInverseSecondary',
  opacity: 0.7,
})

const projectsBlockStyle = css({
  gridColumn: '1 / 7',
  gridRow: '2',
  background: 'bg',
  padding: '48px 72px 56px 6vw',
  minHeight: '320px',
  '@media (max-width: 1024px)': {
    padding: '40px 48px 48px 5vw',
  },
  '@media (max-width: 768px)': {
    gridColumn: '1 / -1',
    padding: '40px 24px',
  },
})

const quoteBlockStyle = css({
  gridColumn: '7 / 9',
  gridRow: '2',
  background: 'bgCard',
  padding: '48px 40px',
  minHeight: '320px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    gridColumn: '1 / -1',
    padding: '40px 24px',
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

const featuredTitleStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(28px, 3vw, 42px)',
  lineHeight: 'snug',
  letterSpacing: 'tight',
  color: 'text',
  marginBottom: '12px',
})

const featuredProblemStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'textSecondary',
  marginBottom: '20px',
  maxWidth: '60ch',
})

const featuredLinkStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 0',
  minHeight: '44px',
  _hover: {
    textDecoration: 'underline',
    textDecorationColor: 'accent',
    textUnderlineOffset: '4px',
    textDecorationThickness: '2px',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const projectListStyle = css({
  marginTop: '40px',
  display: 'flex',
  flexDirection: 'column',
})

const projectRowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '16px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  gap: '16px',
  _hover: {
    '& a': {
      color: 'accent',
    },
  },
})

const projectNameStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '16px',
  color: 'text',
  textDecoration: 'none',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  _hover: {
    color: 'accent',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    textDecorationThickness: '2px',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const projectMetaStyle = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: '12px',
  color: 'textMuted',
  whiteSpace: 'nowrap',
})

const quoteTextStyle = css({
  fontFamily: 'body',
  fontWeight: 'light',
  fontStyle: 'italic',
  fontSize: '15px',
  lineHeight: '1.6',
  color: 'textSecondary',
  maxWidth: '35ch',
})

const quoteAttributionStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginTop: '24px',
})

const footerStyle = css({
  gridColumn: '1 / -1',
  padding: '24px 6vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid',
  borderColor: 'border',
  background: 'bg',
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
  _hover: {
    color: 'accent',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const signalBlockStyle = css({
  display: 'flex',
  flexDirection: 'column',
})

const signalFooterZone = css({
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

const moonGlyphStyle = css({
  fontSize: '18px',
  color: 'accentOnDark',
  display: 'inline',
  marginRight: '8px',
})

function HomePage() {
  return (
    <>
      <div className={galleryWallStyle}>
        {/* HERO BLOCK — cols 1-8 */}
        <div className={heroBlockStyle}>
          <div className={heroNavSpacerStyle}>
            <Sidebar />
          </div>
          <div className={heroPhraseWrapperStyle}>
            <h1 className={heroPhraseStyle}>
              Stuff your eyes<br />
              with <span className={wonderWordStyle}>wonder</span>
            </h1>
            <p className={attributionStyle}>— Ray Bradbury</p>
          </div>
        </div>

        {/* SIGNAL PANEL — cols 9-12, spans 2 rows */}
        <aside className={signalPanelStyle} aria-label="Daily signals">
          {/* Tigers */}
          <div className={signalBlockStyle}>
            <div className={signalLabelStyle}>Detroit Tigers</div>
            <div className={signalScoreStyle}>10 – 9</div>
            <div className={signalDetailStyle}>W · Jun 1</div>
          </div>

          {/* Golf */}
          <div className={signalBlockStyle}>
            <div className={signalLabelStyle}>Schwab Challenge</div>
            <div className={signalMediumStyle}>R. Henley −13</div>
            <div className={signalSmallListStyle}>Cole −12 · Griffin −11</div>
          </div>

          {/* Moon */}
          <div className={signalBlockStyle}>
            <div className={signalLabelStyle}>Waning Gibbous · Day 17.5</div>
            <div>
              <span className={moonGlyphStyle}>◐</span>
              <span className={signalMediumStyle}>91.7%</span>
            </div>
          </div>

          {/* Music */}
          <div className={signalBlockStyle}>
            <div className={signalLabelStyle}>Now Listening</div>
            <div className={musicArtistStyle}>
              Guided by Voices<br />
              Wet Leg<br />
              Tobin Sprout
            </div>
          </div>

          {/* Footer zone */}
          <div className={signalFooterZone}>
            <div className={hnStyle}>
              HN #1: Instagram exploit, 1,874pts
            </div>
            <div className={daylightStyle}>
              ☀ 14.6h daylight
            </div>
          </div>
        </aside>

        {/* PROJECTS BLOCK — cols 1-6, row 2 */}
        <div className={projectsBlockStyle}>
          <div className={sectionLabelStyle}>Featured</div>
          {featuredProject && (
            <div>
              <h2 className={featuredTitleStyle}>{featuredProject.title}</h2>
              <p className={featuredProblemStyle}>{featuredProject.problem}</p>
              {featuredProject.externalUrl && (
                <a href={featuredProject.externalUrl} className={featuredLinkStyle}>
                  Visit {featuredProject.title} →
                </a>
              )}
            </div>
          )}

          <div className={projectListStyle}>
            <div className={sectionLabelStyle} style={{ marginBottom: '0', paddingBottom: '0' }}>Selected Work</div>
            {selectedWork.map((project) => (
              <div key={project.slug} className={projectRowStyle}>
                <a href={`/work/${project.slug}`} className={projectNameStyle}>
                  {project.title}
                </a>
                <span className={projectMetaStyle}>
                  {project.type} · {project.year}
                </span>
              </div>
            ))}
          </div>

          <div className={projectListStyle} style={{ marginTop: '32px' }}>
            <div className={sectionLabelStyle} style={{ marginBottom: '0', paddingBottom: '0' }}>Experiments</div>
            {experiments.map((project) => (
              <div key={project.slug} className={projectRowStyle}>
                <a
                  href={project.externalUrl || `/work/${project.slug}`}
                  className={projectNameStyle}
                >
                  {project.title}
                </a>
                <span className={projectMetaStyle}>
                  {project.type} · {project.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* QUOTE CONTEXT BLOCK — cols 7-8, row 2 */}
        <div className={quoteBlockStyle}>
          <blockquote>
            <p className={quoteTextStyle}>
              "Stuff your eyes with wonder, live as if you'd drop dead in ten seconds.
              See the world. It's more fantastic than any dream made or paid for in factories.
              Ask no guarantees, ask for no security, there never was such an animal.
              And if there were, it would be related to the great sloth which hangs upside down
              in a tree all day every day, sleeping its life away."
            </p>
            <footer className={quoteAttributionStyle}>— Ray Bradbury</footer>
          </blockquote>
        </div>

        {/* FOOTER */}
        <footer className={footerStyle}>
          <span className={footerTextStyle}>Doug March · Product Designer & Developer</span>
          <a href="/archive" className={footerLinkStyle}>Archive</a>
        </footer>
      </div>
    </>
  )
}