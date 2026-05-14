import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const pageGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '0 24px',
  padding: '0 6vw',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
    gap: '0',
    padding: '0 16px',
  },
})

const heroZone = css({
  gridColumn: '1 / 9',
  padding: '48px 0 40px 0',
  minHeight: '52vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media (max-width: 767px)': {
    gridColumn: '1 / -1',
    minHeight: '40vh',
    padding: '32px 0',
  },
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(48px, 6vw, 92px)',
  lineHeight: '0.92',
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  color: 'text',
  textWrap: 'balance',
  '@media (max-width: 767px)': {
    fontSize: 'clamp(36px, 10vw, 56px)',
  },
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'accent',
  marginTop: '24px',
})

const signalColumn = css({
  gridColumn: '9 / 13',
  padding: '48px 0 40px 0',
  borderLeft: '1px solid',
  borderColor: 'border',
  paddingLeft: '24px',
  '@media (max-width: 767px)': {
    gridColumn: '1 / -1',
    borderLeft: 'none',
    borderTop: '1px solid',
    borderColor: 'border',
    paddingLeft: '0',
    paddingTop: '24px',
    paddingBottom: '32px',
  },
})

const eyebrow = css({
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '16px',
})

const signalBlock = css({
  marginBottom: '24px',
  paddingBottom: '24px',
  borderBottom: '1px solid',
  borderColor: 'border',
  '&:last-child': {
    borderBottom: 'none',
    marginBottom: '0',
  },
})

const scoreLine = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  marginBottom: '8px',
})

const teamName = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textSecondary',
})

const scoreValue = css({
  fontFamily: 'display',
  fontSize: '20px',
  color: 'text',
})

const lossBadge = css({
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.1em',
  color: 'textMuted',
  background: '{colors.neutral.700}',
  padding: '2px 6px',
  marginLeft: '8px',
  display: 'inline-block',
})

const metaLine = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.05em',
  color: 'textMuted',
  lineHeight: '1.6',
  marginBottom: '4px',
})

const metaLineItalic = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.400}',
  fontStyle: 'italic',
  lineHeight: '1.4',
  marginBottom: '4px',
})

const musicLine = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.05em',
  color: '{colors.neutral.400}',
  lineHeight: '1.6',
  marginTop: '16px',
})

const hnEntry = css({
  marginBottom: '12px',
})

const hnTitle = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: '{colors.neutral.200}',
  lineHeight: '1.4',
})

const hnScore = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'accentDark',
  marginTop: '2px',
})

const dividerRule = css({
  gridColumn: '1 / -1',
  height: '2px',
  background: 'accent',
  '@media (max-width: 767px)': {
    height: '1px',
  },
})

const belowFold = css({
  gridColumn: '1 / -1',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0 24px',
  padding: '48px 0',
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr',
    gap: '32px 0',
    padding: '32px 0',
  },
})

const sectionCol = css({
  '&:not(:last-child)': {
    borderRight: '1px solid',
    borderColor: 'border',
    paddingRight: '24px',
    '@media (max-width: 767px)': {
      borderRight: 'none',
      paddingRight: '0',
      borderBottom: '1px solid',
      borderBottomColor: 'border',
      paddingBottom: '24px',
    },
  },
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '20px',
})

const projectEntry = css({
  padding: '8px 0',
  borderLeft: '4px solid transparent',
  paddingLeft: '12px',
  transition: 'border-color 0.2s',
  marginBottom: '4px',
  _hover: {
    borderLeftColor: 'accent',
  },
})

const projectTitle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text',
  lineHeight: '1.55',
  textDecoration: 'none',
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const projectMeta = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

const capItem = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.55',
  padding: '4px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '&:last-child': {
    borderBottom: 'none',
  },
})

const timelineRow = css({
  display: 'flex',
  gap: '12px',
  marginBottom: '12px',
  alignItems: 'baseline',
})

const timeYear = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.05em',
  minWidth: '40px',
  flexShrink: 0,
})

const timeRole = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.4',
})

const footerBar = css({
  gridColumn: '1 / -1',
  borderTop: '1px solid',
  borderColor: 'border',
  padding: '16px 0 32px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.05em',
  '@media (max-width: 767px)': {
    flexDirection: 'column',
    gap: '8px',
  },
})

const archiveLink = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: {
    color: 'accent',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

function HomePage() {
  const featured = featuredProject
  const works = selectedWork
  const exps = experiments

  return (
    <div className={pageGrid}>
      {/* Hero story zone */}
      <div className={heroZone}>
        <h1 className={heroPhrase}>
          No defeat<br />
          except<br />
          from within.
        </h1>
        <p className={attribution}>— Elbert Hubbard</p>
      </div>

      {/* Signal column */}
      <aside className={signalColumn} aria-label="Daily signals">
        <div className={signalBlock}>
          <div className={eyebrow}>Signals Brief</div>
          <div className={scoreLine}>
            <span className={teamName}>Pistons</span>
            <span>
              <span className={scoreValue}>113 – 117</span>
              <span className={lossBadge}>L</span>
            </span>
          </div>
          <div className={scoreLine}>
            <span className={teamName}>Tigers</span>
            <span>
              <span className={scoreValue}>2 – 3</span>
              <span className={lossBadge}>L</span>
            </span>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div className={metaLine}>PGA CHAMPIONSHIP · SCHEDULED</div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <div className={metaLineItalic}>New Moon · 0.026 illumination · Day 28</div>
          </div>
          <div style={{ marginTop: '8px' }}>
            <div className={metaLine}>SUNRISE 05:03 · SUNSET 19:09 · 14.1H</div>
          </div>
          <div className={musicLine}>
            WET LEG · GUIDED BY VOICES · MY MORNING JACKET
          </div>
        </div>

        <div className={signalBlock}>
          <div className={eyebrow}>HN Today</div>
          <div className={hnEntry}>
            <div className={hnTitle}>Show HN: A visual debugger for CSS Grid</div>
            <div className={hnScore}>342 pts</div>
          </div>
          <div className={hnEntry}>
            <div className={hnTitle}>Why SQLite is the only database you need</div>
            <div className={hnScore}>287 pts</div>
          </div>
          <div className={hnEntry}>
            <div className={hnTitle}>Designing for the terminal in 2026</div>
            <div className={hnScore}>198 pts</div>
          </div>
        </div>
      </aside>

      {/* Divider */}
      <div className={dividerRule} />

      {/* Below-fold sections */}
      <div className={belowFold}>
        {/* Selected Work */}
        <div className={sectionCol}>
          <div className={sectionLabel}>Selected Work</div>
          {featured && (
            <div className={projectEntry}>
              <a
                href={featured.externalUrl || `/work/${featured.slug}`}
                className={projectTitle}
              >
                {featured.title}
              </a>
              <div className={projectMeta}>{featured.type} · {featured.year}</div>
              {featured.problem && (
                <div className={css({ fontFamily: 'body', fontSize: '13px', color: 'textSecondary', lineHeight: '1.55', marginTop: '4px' })}>
                  {featured.problem}
                </div>
              )}
            </div>
          )}
          {works.map((w) => (
            <div key={w.slug} className={projectEntry}>
              <a href={`/work/${w.slug}`} className={projectTitle}>
                {w.title}
              </a>
              <div className={projectMeta}>{w.type} · {w.year}</div>
            </div>
          ))}
        </div>

        {/* Experiments */}
        <div className={sectionCol}>
          <div className={sectionLabel}>Experiments</div>
          {exps.map((e) => (
            <div key={e.slug} className={projectEntry}>
              <a
                href={e.externalUrl || `/work/${e.slug}`}
                className={projectTitle}
              >
                {e.title}
              </a>
              <div className={projectMeta}>{e.type} · {e.year}</div>
            </div>
          ))}

          <div style={{ marginTop: '32px' }}>
            <div className={sectionLabel}>Featured</div>
            {featured && (
              <div className={css({ fontFamily: 'body', fontSize: '13px', color: 'textSecondary', lineHeight: '1.55' })}>
                <span className={css({ color: 'text', fontWeight: 'medium' })}>{featured.title}</span> — {featured.problem}
                {featured.externalUrl && (
                  <span>
                    {' '}
                    <a
                      href={featured.externalUrl}
                      className={css({
                        color: 'accent',
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        '&:focus-visible': { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                      })}
                    >
                      Visit →
                    </a>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Capabilities snapshot */}
        <div className={sectionCol}>
          <div className={sectionLabel}>Capabilities</div>
          <div>
            {['Product Design', 'Front-End Development', 'Design Systems', 'Prototyping', 'User Research', 'Information Architecture'].map((cap) => (
              <div key={cap} className={capItem}>{cap}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={footerBar}>
        <span>© 2026 Doug March · Product Designer & Developer</span>
        <a href="/archive" className={archiveLink}>Archive</a>
      </div>
    </div>
  )
}