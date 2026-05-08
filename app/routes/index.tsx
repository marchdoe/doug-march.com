import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const canvasCss = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(12, 1fr)' },
  columnGap: '24px',
  rowGap: '0',
  padding: '0 4vw',
  maxWidth: 'none',
})

const heroZoneCss = css({
  gridColumn: { base: '1 / -1', md: '1 / 9' },
  minHeight: { base: 'auto', md: '44vh' },
  paddingTop: { base: '32px', md: '48px' },
  paddingBottom: '32px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'border',
})

const heroHeadlineCss = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(36px, 3.8vw, 58px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: { base: '{colors.teal.50}' },
  maxWidth: '14ch',
  marginBottom: '24px',
  textWrap: 'balance',
})

const dekCss = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
  letterSpacing: '0.04em',
  marginBottom: '16px',
})

const bylineCss = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.04em',
  paddingTop: '12px',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: 'border',
})

const rightRailCss = css({
  gridColumn: { base: '1 / -1', md: '9 / 13' },
  minHeight: { base: 'auto', md: '44vh' },
  borderLeftWidth: { base: '0', md: '1px' },
  borderLeftStyle: 'solid',
  borderLeftColor: 'border',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'border',
  paddingTop: { base: '24px', md: '48px' },
  paddingBottom: '32px',
  paddingLeft: { base: '0', md: '24px' },
})

const eyebrowCss = css({
  fontFamily: 'body',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.10em',
  color: 'textMuted',
  marginBottom: '12px',
})

const leaderRowCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'mono',
  fontSize: '13px',
  paddingTop: '6px',
  paddingBottom: '6px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'border',
  color: 'textSecondary',
})

const storyGridCss = css({
  gridColumn: '1 / -1',
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
  columnGap: '0',
  paddingTop: '32px',
  paddingBottom: '32px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'border',
})

const storyColCss = css({
  paddingRight: { base: '0', md: '24px' },
  paddingLeft: { base: '0', md: '24px' },
  paddingBottom: { base: '24px', md: '0' },
  borderRightWidth: { base: '0', md: '1px' },
  borderRightStyle: 'solid',
  borderRightColor: 'border',
  borderBottomWidth: { base: '1px', md: '0' },
  borderBottomStyle: 'solid',
  borderBottomColor: 'border',
  _first: { paddingLeft: '0' },
  _last: { borderRightWidth: '0', borderBottomWidth: '0' },
})

const storyHeadlineCss = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: { base: '20px', md: '22px' },
  lineHeight: 'snug',
  letterSpacing: 'tight',
  color: 'text',
  marginBottom: '12px',
})

const storyBodyCss = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
})

const alertBadgeCss = css({
  background: 'alertDim',
  color: 'alert',
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '10px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '2px 6px',
  display: 'inline',
})

const portfolioGridCss = css({
  gridColumn: '1 / -1',
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(12, 1fr)' },
  columnGap: '24px',
  paddingTop: '32px',
  paddingBottom: '48px',
})

const sectionEyebrowCss = css({
  fontFamily: 'body',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.10em',
  color: 'textMuted',
  marginBottom: '20px',
  paddingBottom: '8px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'border',
})

const projectRowCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  paddingTop: '8px',
  paddingBottom: '8px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'border',
  gap: '16px',
  flexWrap: 'wrap',
})

const projectTitleCss = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: 'snug',
  color: 'text',
  textDecoration: 'none',
  _hover: { color: 'accent', textDecoration: 'underline' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const projectMetaCss = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: 'textMuted',
  whiteSpace: 'nowrap',
})

const pullQuoteCss = css({
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
  borderLeftColor: 'accent',
  paddingLeft: '16px',
  fontFamily: 'display',
  fontStyle: 'italic',
  fontSize: '18px',
  lineHeight: 'loose',
  color: 'textSecondary',
  marginBottom: '16px',
})

const pullAttrCss = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  paddingLeft: '20px',
  marginBottom: '24px',
})

const scoreBigCss = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '28px',
  lineHeight: 'snug',
  color: 'text',
  marginBottom: '4px',
})

const winBadgeCss = css({
  background: 'alertDim',
  color: 'alert',
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '10px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '2px 8px',
  marginLeft: '8px',
  display: 'inline',
})

const boxNoteCss = css({
  background: 'bgCard',
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
  borderLeftColor: 'accent',
  padding: '12px',
  fontFamily: 'body',
  fontSize: '11px',
  lineHeight: 'normal',
  color: 'textSecondary',
  marginTop: '24px',
})

const footerCss = css({
  gridColumn: '1 / -1',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '16px',
  paddingBottom: '32px',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: 'border',
  flexWrap: 'wrap',
  gap: '8px',
})

const footerTextCss = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
})

const lunarStripCss = css({
  gridColumn: '1 / -1',
  textAlign: 'center',
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textMuted',
  paddingTop: '8px',
  paddingBottom: '8px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'border',
})

function HomePage() {
  const golfLeaderboard = [
    { name: 'Matt McCarty', score: '-8', leader: true },
    { name: 'Sungjae Im', score: '-6', leader: false },
    { name: 'Sahith Theegala', score: '-5', leader: false },
    { name: 'Scottie Scheffler', score: '-5', leader: false },
    { name: 'Collin Morikawa', score: '-4', leader: false },
  ]

  return (
    <>
      {/* Lunar strip */}
      <div className={css({ padding: '0 4vw' })}>
        <div className={lunarStripCss}>
          ☽ Last Quarter · 51.6% · Day 22 of cycle · ☀ 13.9h daylight
        </div>
      </div>

      <div className={canvasCss}>
        {/* HERO ZONE */}
        <div className={heroZoneCss}>
          <h1 className={heroHeadlineCss}>
            Maybe you shouldn't install new software for a bit
          </h1>
          <p className={dekCss}>
            Trending on Hacker News · 766 points · Security advisory
          </p>
          <div className={bylineCss}>
            From heisx.zone · xeiaso.net · May 8, 2026
          </div>
        </div>

        {/* RIGHT RAIL */}
        <aside className={rightRailCss}>
          {/* Golf */}
          <div className={eyebrowCss}>Golf · Truist Championship · In Progress</div>
          <div>
            {golfLeaderboard.map((g, i) => (
              <div key={i} className={leaderRowCss} style={g.leader ? { color: 'var(--colors-text)' } : undefined}>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{g.name}</span>
                <span style={g.leader ? { color: 'var(--colors-alert)' } : undefined}>{g.score}</span>
              </div>
            ))}
          </div>

          {/* Pistons */}
          <div className={css({ marginTop: '32px' })}>
            <div className={eyebrowCss}>NBA · DET Pistons</div>
            <div className={scoreBigCss}>
              107–97
              <span className={winBadgeCss}>Win</span>
            </div>
            <div className={css({ fontFamily: 'mono', fontSize: '11px', color: 'textMuted' })}>
              vs. Opponent · Final
            </div>
          </div>

          {/* Mother's Day */}
          <div className={boxNoteCss}>
            <strong style={{ color: 'var(--colors-text)' }}>Upcoming:</strong> Mother's Day — Sunday, May 10
          </div>

          {/* Kesey Signal */}
          <div className={css({ marginTop: '16px', ...Object.fromEntries(Object.entries({
            background: 'bgCard',
            padding: '12px',
            fontFamily: 'body',
            fontSize: '11px',
            lineHeight: 'normal',
            color: 'textMuted',
          })) })} className={css({
            background: 'bgCard',
            padding: '12px',
            fontFamily: 'body',
            fontSize: '11px',
            lineHeight: 'normal',
            color: 'textMuted',
            marginTop: '16px',
          })}>
            <div className={css({ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: '4px', color: 'textMuted' })}>Inspiration</div>
            Kesey Signal: 1999 cyber-noir terminal archive by Rob Ford
          </div>
        </aside>

        {/* STORY GRID — HN stories as newspaper columns */}
        <div className={storyGridCss}>
          <div className={storyColCss}>
            <div className={eyebrowCss}>Tech · Layoffs · 766 pts</div>
            <h2 className={storyHeadlineCss}>Cloudflare Cuts 20% of Workforce</h2>
            <p className={storyBodyCss}>
              The infrastructure giant announced it would eliminate roughly{' '}
              <span className={alertBadgeCss}>1,100 jobs</span>{' '}
              across engineering and operations teams. The move follows a broader contraction 
              in cloud services spending and growing pressure on margins from competitors.
            </p>
          </div>
          <div className={storyColCss}>
            <div className={eyebrowCss}>Security · Breach · 658 pts</div>
            <h2 className={storyHeadlineCss}>Schools' Data Held Hostage</h2>
            <p className={storyBodyCss}>
              ShinyHunters claims access to Canvas education platform data affecting millions of students. 
              The group is threatening to release{' '}
              <span className={alertBadgeCss}>student records</span>{' '}
              unless Instructure pays an undisclosed ransom. Districts scramble to assess exposure.
            </p>
          </div>
          <div className={storyColCss}>
            <div className={pullQuoteCss}>
              "Wisdom is letting go of something everyday"
            </div>
            <div className={pullAttrCss}>— attributed</div>
            <div className={eyebrowCss}>Security · Linux · 649 pts</div>
            <p className={storyBodyCss}>
              Dirtyfrag: a universal Linux local privilege escalation exploit disclosed today. 
              Patch your kernels.
            </p>
          </div>
        </div>

        {/* PORTFOLIO SECTION */}
        <div className={portfolioGridCss}>
          {/* Featured project — spans 8 cols */}
          <div className={css({ gridColumn: { base: '1 / -1', md: '1 / 9' } })}>
            <div className={sectionEyebrowCss}>Featured Project</div>
            {featuredProject && (
              <div>
                <a
                  href={`/work/${featuredProject.slug}`}
                  className={css({
                    fontFamily: 'display',
                    fontWeight: 'bold',
                    fontSize: { base: '28px', md: '36px' },
                    lineHeight: 'snug',
                    letterSpacing: 'tight',
                    color: 'text',
                    textDecoration: 'none',
                    _hover: { color: 'accent', textDecoration: 'underline' },
                    _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                    display: 'block',
                    marginBottom: '12px',
                  })}
                >
                  {featuredProject.title}
                </a>
                <p className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  maxWidth: '60ch',
                  marginBottom: '12px',
                })}>
                  {featuredProject.problem}
                </p>
                {featuredProject.externalUrl && (
                  <a
                    href={featuredProject.externalUrl}
                    className={css({
                      fontFamily: 'mono',
                      fontSize: '12px',
                      color: 'accent',
                      textDecoration: 'underline',
                      _hover: { color: 'accentSubtle' },
                      _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                    })}
                  >
                    {featuredProject.externalUrl.replace(/^https?:\/\//, '')} ↗
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right col: quick index */}
          <div className={css({ gridColumn: { base: '1 / -1', md: '9 / 13' }, borderLeftWidth: { base: '0', md: '1px' }, borderLeftStyle: 'solid', borderLeftColor: 'border', paddingLeft: { base: '0', md: '24px' }, marginTop: { base: '24px', md: '0' } })}>
            <div className={sectionEyebrowCss}>Selected Work</div>
            {selectedWork.map((p) => (
              <div key={p.slug} className={projectRowCss}>
                <a href={`/work/${p.slug}`} className={projectTitleCss}>{p.title}</a>
                <span className={projectMetaCss}>{p.type} · {p.year}</span>
              </div>
            ))}
          </div>

          {/* Experiments — full width, 3 cols */}
          <div className={css({ gridColumn: '1 / -1', marginTop: '32px' })}>
            <div className={sectionEyebrowCss}>Experiments</div>
            <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' }, columnGap: '24px', rowGap: '16px' })}>
              {experiments.map((e) => (
                <div key={e.slug} className={css({ paddingBottom: '12px', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'border' })}>
                  <a href={e.externalUrl || `/work/${e.slug}`} className={projectTitleCss}>{e.title}</a>
                  <div className={projectMetaCss}>{e.type} · {e.year}</div>
                  {e.description && (
                    <p className={css({ fontFamily: 'body', fontSize: '13px', lineHeight: 'normal', color: 'textMuted', marginTop: '4px', maxWidth: '65ch' })}>
                      {e.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className={footerCss}>
          <span className={footerTextCss}>© 2026 Doug March · Product Designer & Developer</span>
          <a href="/archive" className={css({ fontFamily: 'mono', fontSize: '11px', color: 'textMuted', textDecoration: 'none', _hover: { color: 'accent', textDecoration: 'underline' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' }, padding: '8px 0' })}>
            Archive
          </a>
        </div>
      </div>
    </>
  )
}