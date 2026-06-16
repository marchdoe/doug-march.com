import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { timeline, capabilities } from '../content/timeline'

export const Route = createFileRoute('/')({ component: HomePage })

const bannerStyle = css({
  padding: '32px 0 20px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const heroStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontStyle: 'italic',
  fontSize: 'clamp(30px, 4.2vw, 56px)',
  lineHeight: '1.08',
  letterSpacing: '-0.02em',
  color: 'text',
  textWrap: 'balance',
  maxWidth: '100%',
})

const attrRuleStyle = css({
  width: '60px',
  height: '1px',
  background: 'accent',
  margin: '12px 0',
  border: 'none',
})

const attrStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.10em',
  fontVariantCaps: 'all-small-caps',
  color: 'textSecondary',
})

const columnsStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  minHeight: 'auto',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1.15fr 1fr 0.85fr',
    minHeight: 'calc(100vh - 380px)',
  },
})

const colStyle = css({
  padding: '20px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (min-width: 768px)': {
    padding: '20px 24px',
    borderBottom: 'none',
    borderRight: '1px solid',
    borderRightColor: 'border',
  },
})

const colLastStyle = css({
  padding: '20px 0',
  borderBottom: 'none',
  '@media (min-width: 768px)': {
    padding: '20px 24px',
    borderRight: 'none',
  },
})

const colFirstStyle = css({
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

const projectEntryStyle = css({
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const projectTitleStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '17px',
  lineHeight: '1.2',
  color: 'text',
  textDecoration: 'none',
  transition: 'color 0.15s',
  _hover: {
    color: 'accentDeep',
  },
})

const projectMetaStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  marginTop: '4px',
  fontVariantNumeric: 'tabular-nums',
})

const projectDescStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: 'text',
  marginTop: '6px',
  maxWidth: '65ch',
})

const scoreBoxStyle = css({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 12px',
  border: '1px solid',
  borderColor: 'border',
  borderLeft: '3px solid',
  borderLeftColor: 'accent',
  marginBottom: '12px',
  fontFamily: 'body',
  fontSize: '12px',
  fontVariantNumeric: 'tabular-nums',
  color: 'text',
  gap: '8px',
  justifyContent: 'space-between',
})

const winBadgeStyle = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: '11px',
  color: 'accentText',
})

const golfTableStyle = css({
  width: '100%',
  fontFamily: 'body',
  fontSize: '12px',
  fontVariantNumeric: 'tabular-nums',
  borderCollapse: 'collapse',
  marginBottom: '16px',
})

const golfRowStyle = css({
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const golfCellStyle = css({
  padding: '6px 8px 6px 0',
  color: 'text',
})

const golfScoreStyle = css({
  padding: '6px 0',
  textAlign: 'right',
  fontWeight: 'bold',
})

const golfWinnerStyle = css({
  fontWeight: 'bold',
  color: 'accentText',
})

const hnEntryStyle = css({
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const hnTitleStyle = css({
  fontFamily: 'display',
  fontStyle: 'italic',
  fontSize: '15px',
  lineHeight: '1.3',
  color: 'text',
})

const hnMetaStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  marginTop: '4px',
})

const capListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginBottom: '16px',
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
  whiteSpace: 'nowrap',
})

const timelineEntryStyle = css({
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
})

const timelineYearStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontVariantNumeric: 'tabular-nums',
  color: 'textMuted',
  minWidth: '90px',
  display: 'inline-block',
})

const timelineRoleStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'semibold',
  color: 'text',
})

const timelineCompanyStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textSecondary',
})

const footerStyle = css({
  padding: '16px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

function HomePage() {
  return (
    <>
      <section className={bannerStyle}>
        <h1 className={heroStyle}>
          We can see through others only when we can see through ourselves.
        </h1>
        <hr className={attrRuleStyle} />
        <p className={attrStyle}>— Bruce Lee</p>
      </section>

      <div className={columnsStyle}>
        {/* Column 1: Work */}
        <div className={colFirstStyle}>
          <h2 className={sectionHeaderStyle}>Filed This Year</h2>

          {featuredProject && (
            <div className={projectEntryStyle}>
              <a
                href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                className={projectTitleStyle}
              >
                {featuredProject.title}
              </a>
              <div className={projectMetaStyle}>
                {featuredProject.type} · {featuredProject.year}
                {featuredProject.featured && ' · Featured'}
              </div>
              {featuredProject.problem && (
                <p className={projectDescStyle}>{featuredProject.problem}</p>
              )}
            </div>
          )}

          <h2 className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'accentText',
            marginTop: '20px',
            marginBottom: '8px',
          })}>
            Selected Work
          </h2>

          {selectedWork.map((project) => (
            <div key={project.slug} className={projectEntryStyle}>
              <a href={`/work/${project.slug}`} className={projectTitleStyle}>
                {project.title}
              </a>
              <div className={projectMetaStyle}>
                {project.type} · {project.year}
              </div>
            </div>
          ))}

          <h2 className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'accentText',
            marginTop: '20px',
            marginBottom: '8px',
          })}>
            Experiments
          </h2>

          {experiments.map((exp) => (
            <div key={exp.slug} className={projectEntryStyle}>
              <a
                href={exp.externalUrl || `/work/${exp.slug}`}
                className={projectTitleStyle}
              >
                {exp.title}
              </a>
              <div className={projectMetaStyle}>
                {exp.type} · {exp.year}
              </div>
            </div>
          ))}
        </div>

        {/* Column 2: Signals / News */}
        <div className={colStyle}>
          <h2 className={sectionHeaderStyle}>Today's Signals</h2>

          {/* Tigers score */}
          <div className={scoreBoxStyle}>
            <span>DET &nbsp;9 · 3&nbsp; OPP</span>
            <span className={winBadgeStyle}>W</span>
          </div>

          {/* Golf leaderboard */}
          <div className={css({ marginBottom: '16px' })}>
            <div className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '8px',
            })}>
              RBC Canadian Open · Final
            </div>
            <table className={golfTableStyle}>
              <tbody>
                <tr className={golfRowStyle}>
                  <td className={css({ ...Object.assign({}, { padding: '6px 8px 6px 0', fontWeight: 'bold', color: '{colors.lime.700}' }) })}>
                    <span className={golfWinnerStyle}>🏆 Bud Cauley</span>
                  </td>
                  <td className={css({ padding: '6px 0', textAlign: 'right', fontWeight: 'bold', color: 'accentText' })}>−17</td>
                </tr>
                <tr className={golfRowStyle}>
                  <td className={golfCellStyle}>Matt Fitzpatrick</td>
                  <td className={golfScoreStyle}>−15</td>
                </tr>
                <tr className={golfRowStyle}>
                  <td className={golfCellStyle}>Viktor Hovland</td>
                  <td className={golfScoreStyle}>−14</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* HN stories */}
          <h2 className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'accentText',
            marginBottom: '8px',
          })}>
            From the Wire
          </h2>

          <div className={hnEntryStyle}>
            <div className={hnTitleStyle}>
              A backdoor in a LinkedIn job offer
            </div>
            <div className={hnMetaStyle}>
              1,265 pts · devblogs
            </div>
          </div>

          <div className={hnEntryStyle}>
            <div className={css({
              fontFamily: 'body',
              fontSize: '13px',
              lineHeight: '1.3',
              color: 'text',
            })}>
              Carmack on Bellard
            </div>
            <div className={hnMetaStyle}>
              Hacker News
            </div>
          </div>
        </div>

        {/* Column 3: Person / Capabilities */}
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
            marginTop: '20px',
            marginBottom: '8px',
          })}>
            Timeline
          </h2>

          {timeline.slice(0, 6).map((entry, i) => (
            <div key={i} className={timelineEntryStyle}>
              <span className={timelineYearStyle}>{entry.year}</span>
              <div className={timelineRoleStyle}>{entry.role}</div>
              <div className={timelineCompanyStyle}>{entry.company}</div>
            </div>
          ))}

          <div className={css({
            fontFamily: 'body',
            fontSize: '11px',
            color: 'textMuted',
            marginTop: '12px',
          })}>
            <a href="/about" className={footerLinkStyle}>Full timeline →</a>
          </div>

          <div className={css({
            fontFamily: 'body',
            fontSize: '11px',
            color: 'textMuted',
            marginTop: '24px',
            paddingTop: '12px',
            borderTop: '1px solid',
            borderColor: 'borderSubtle',
          })}>
            Father's Day · Sunday
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