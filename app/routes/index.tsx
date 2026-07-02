import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const heroZoneStyle = css({
  padding: '40px 0 28px',
  borderBottom: '2px solid',
  borderColor: 'accent',
})

const overlineStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '12px',
  lineHeight: '1',
})

const heroHeadlineStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(2.5rem, 6vw, 7.5rem)',
  fontWeight: 'bold',
  color: 'accent',
  lineHeight: '0.88',
  letterSpacing: '-0.02em',
  margin: '0',
  textWrap: 'balance',
})

const datelineStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  marginTop: '16px',
  lineHeight: '1',
})

const contentGridStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '2fr 1.5fr 1fr',
  },
})

const columnStyle = css({
  padding: '28px 0',
  '@media (min-width: 768px)': {
    padding: '28px 20px',
    borderRight: '1px solid',
    borderColor: 'border',
    '&:first-child': {
      paddingLeft: '0',
    },
    '&:last-child': {
      borderRight: 'none',
      paddingRight: '0',
    },
  },
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (min-width: 768px)': {
    borderBottom: 'none',
    padding: '28px 20px',
    borderRight: '1px solid',
    borderColor: 'border',
    '&:first-child': {
      paddingLeft: '0',
    },
    '&:last-child': {
      borderRight: 'none',
      paddingRight: '0',
    },
  },
})

const col1Style = css({
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

const col2Style = css({
  padding: '28px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (min-width: 768px)': {
    padding: '28px 20px',
    borderRight: '1px solid',
    borderColor: 'border',
    borderBottom: 'none',
  },
})

const col3Style = css({
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
  lineHeight: '1.4',
})

const sectionHeadingStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
  fontWeight: 'semibold',
  color: 'text',
  letterSpacing: '-0.01em',
  lineHeight: '1.1',
  marginBottom: '16px',
})

const projectItemStyle = css({
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  '&:last-child': {
    borderBottom: 'none',
  },
})

const projectTitleLinkStyle = css({
  fontFamily: 'display',
  fontSize: '16px',
  fontWeight: 'semibold',
  color: 'text',
  textDecoration: 'none',
  lineHeight: '1.2',
  transition: 'color 120ms ease',
  display: 'inline-block',
  padding: '2px 0',
  _hover: {
    color: 'accent',
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const projectMetaStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.04em',
  marginTop: '4px',
  lineHeight: '1.4',
})

const projectDescStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'textSecondary',
  lineHeight: '1.55',
  marginTop: '8px',
  maxWidth: '65ch',
})

const featuredBlockStyle = css({
  marginBottom: '24px',
  paddingBottom: '24px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const featuredTitleStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
  fontWeight: 'bold',
  color: 'text',
  letterSpacing: '-0.02em',
  lineHeight: '1.1',
  marginBottom: '12px',
})

const featuredLinkStyle = css({
  color: 'text',
  textDecoration: 'none',
  transition: 'color 120ms ease',
  _hover: {
    color: 'accent',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const scoreBoxStyle = css({
  border: '1px solid',
  borderColor: 'border',
  padding: '16px',
  marginBottom: '20px',
})

const scoreValueStyle = css({
  fontFamily: 'display',
  fontSize: '1.6rem',
  fontWeight: 'bold',
  color: 'accent',
  lineHeight: '1',
})

const scoreLabelStyle = css({
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '8px',
  lineHeight: '1.4',
})

const briefItemStyle = css({
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  '&:last-child': {
    borderBottom: 'none',
  },
})

const briefTitleStyle = css({
  fontFamily: 'display',
  fontSize: '14px',
  fontStyle: 'italic',
  color: 'textSecondary',
  lineHeight: '1.4',
})

const briefMetaStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  color: 'textMuted',
  letterSpacing: '0.04em',
  marginTop: '2px',
})

const golfItemStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  marginTop: '16px',
})

function HomePage() {
  return (
    <>
      <div className={heroZoneStyle}>
        <p className={overlineStyle}>Incident — HN #1 — 638 Pts</p>
        <h1 className={heroHeadlineStyle}>Google ships the malware.</h1>
        <p className={datelineStyle}>Thursday 02 July 2026 — Doug March</p>
      </div>

      <div className={contentGridStyle}>
        {/* Column 1: Featured + Selected Work */}
        <div className={col1Style}>
          <p className={eyebrowStyle}>Featured Project</p>
          {featuredProject && (
            <div className={featuredBlockStyle}>
              <h2 className={featuredTitleStyle}>
                {featuredProject.externalUrl ? (
                  <a href={featuredProject.externalUrl} className={featuredLinkStyle}>
                    {featuredProject.title}
                  </a>
                ) : (
                  featuredProject.title
                )}
              </h2>
              {featuredProject.problem && (
                <p className={projectDescStyle}>{featuredProject.problem}</p>
              )}
              {featuredProject.externalUrl && (
                <p className={css({ marginTop: '12px' })}>
                  <a
                    href={featuredProject.externalUrl}
                    className={css({
                      fontFamily: 'body',
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'accent',
                      textDecoration: 'none',
                      _hover: { textDecoration: 'underline' },
                      '&:focus-visible': {
                        outline: '2px solid',
                        outlineColor: 'accent',
                        outlineOffset: '2px',
                      },
                    })}
                  >
                    Visit Project →
                  </a>
                </p>
              )}
            </div>
          )}

          <p className={eyebrowStyle}>Selected Work</p>
          <div>
            {selectedWork.map((project) => (
              <div key={project.slug} className={projectItemStyle}>
                <a href={`/work/${project.slug}`} className={projectTitleLinkStyle}>
                  {project.title}
                </a>
                <p className={projectMetaStyle}>
                  {project.type} · {project.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Experiments + About teaser */}
        <div className={col2Style}>
          <p className={eyebrowStyle}>Experiments & Lab</p>
          <div>
            {experiments.map((exp) => (
              <div key={exp.slug} className={projectItemStyle}>
                <a
                  href={exp.externalUrl || `/work/${exp.slug}`}
                  className={projectTitleLinkStyle}
                >
                  {exp.title}
                </a>
                <p className={projectMetaStyle}>
                  {exp.type} · {exp.year}
                </p>
                {exp.description && (
                  <p className={css({
                    fontFamily: 'body',
                    fontSize: '13px',
                    color: 'textSecondary',
                    lineHeight: '1.5',
                    marginTop: '6px',
                  })}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className={css({ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid', borderColor: 'border' })}>
            <p className={eyebrowStyle}>Colophon</p>
            <p className={css({
              fontFamily: 'body',
              fontSize: '14px',
              color: 'textSecondary',
              lineHeight: '1.55',
              maxWidth: '55ch',
            })}>
              Product Designer & Developer. This site redesigns itself daily — new layout, new palette, new typography. Today's edition is a broadsheet in acid chartreuse on void-moss.
            </p>
          </div>
        </div>

        {/* Column 3: Signals */}
        <div className={col3Style}>
          {/* Tigers Score */}
          <div className={scoreBoxStyle}>
            <p className={scoreLabelStyle}>MLB · 01 Jul</p>
            <p className={scoreValueStyle}>DET 6 · 2</p>
          </div>

          {/* HN Briefs */}
          <p className={eyebrowStyle}>Also Trending</p>
          <div className={briefItemStyle}>
            <p className={briefTitleStyle}>The Fall of the Theorem Economy</p>
            <p className={briefMetaStyle}>Hacker News</p>
          </div>
          <div className={briefItemStyle}>
            <p className={briefTitleStyle}>Oomwoo robot vacuum</p>
            <p className={briefMetaStyle}>Hacker News</p>
          </div>

          {/* Golf */}
          <p className={golfItemStyle}>John Deere Classic · Scheduled</p>
        </div>
      </div>
    </>
  )
}