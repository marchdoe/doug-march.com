import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const dateStamp = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textMuted',
  marginBottom: '12',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textMuted',
  marginBottom: '4',
})

const sectionDivider = css({
  borderTop: '1px solid',
  borderColor: 'border',
  paddingTop: '12',
  marginBottom: '12',
})

const projectRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '8px 0',
  textDecoration: 'none',
  color: 'textSecondary',
  transition: 'color 0.2s ease, background 0.15s ease',
  marginLeft: '-8px',
  marginRight: '-8px',
  paddingLeft: '8px',
  paddingRight: '8px',
  borderRadius: '0',
  _hover: {
    color: 'accentBright',
  },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const projectTitle = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  fontWeight: 'medium',
  lineHeight: '1.6',
})

const projectMeta = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'textMuted',
  whiteSpace: 'nowrap',
  marginLeft: '4',
})

const featuredBlock = css({
  marginBottom: '12',
})

const featuredTitle = css({
  fontFamily: 'body',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  lineHeight: '1.3',
  color: 'text',
  marginBottom: '2',
})

const featuredProblem = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  lineHeight: '1.6',
  color: 'textSecondary',
  marginBottom: '4',
  maxWidth: '55ch',
})

const featuredLink = css({
  fontFamily: 'body',
  fontSize: '0.8125rem',
  fontWeight: 'medium',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '4px 0',
  _hover: {
    color: 'accentBright',
  },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const signalBlock = css({
  marginBottom: '12',
})

const scoreRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '3px 0',
  fontFamily: 'body',
  fontSize: '0.8125rem',
  lineHeight: '1.5',
  fontVariantNumeric: 'tabular-nums',
})

const tigersScore = css({
  fontFamily: 'body',
  fontSize: '0.9375rem',
  fontWeight: 'bold',
  color: 'accentBright',
  fontVariantNumeric: 'tabular-nums',
  marginBottom: '1',
})

const tigersCaption = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
})

const listeningLine = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  fontStyle: 'italic',
  color: 'textSecondary',
  lineHeight: '1.6',
})

const footerStyle = css({
  borderTop: '1px solid',
  borderColor: 'border',
  paddingTop: '6',
  marginTop: '12',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  color: 'textMuted',
  letterSpacing: '0.05em',
})

function HomePage() {
  const golfLeaders = [
    { rank: 'T1', name: 'Lee Hodges', score: '−16', highlight: true },
    { rank: 'T1', name: 'Lucas Glover', score: '−16', highlight: true },
    { rank: '3', name: 'Denny McCarthy', score: '−14', highlight: false },
    { rank: 'T4', name: 'Patrick Rodgers', score: '−13', highlight: false },
    { rank: 'T4', name: 'Adam Schenk', score: '−13', highlight: false },
  ]

  return (
    <>
      <div className={dateStamp}>Sunday, July 5, 2026</div>

      {/* Featured Project */}
      {featuredProject && (
        <div className={featuredBlock}>
          <div className={sectionLabel}>Featured</div>
          <h2 className={featuredTitle}>{featuredProject.title}</h2>
          {featuredProject.problem && (
            <p className={featuredProblem}>{featuredProject.problem}</p>
          )}
          {featuredProject.externalUrl && (
            <a href={featuredProject.externalUrl} className={featuredLink}>
              Visit {featuredProject.title} →
            </a>
          )}
        </div>
      )}

      {/* Selected Work */}
      <div className={sectionDivider}>
        <div className={sectionLabel}>Selected Work</div>
        {selectedWork.map((project) => (
          <a
            key={project.slug}
            href={`/work/${project.slug}`}
            className={projectRow}
          >
            <span className={projectTitle}>{project.title}</span>
            <span className={projectMeta}>
              {project.type} · {project.year}
            </span>
          </a>
        ))}
      </div>

      {/* Experiments */}
      <div className={sectionDivider}>
        <div className={sectionLabel}>Experiments</div>
        {experiments.map((project) => (
          <a
            key={project.slug}
            href={project.externalUrl || `/work/${project.slug}`}
            className={projectRow}
          >
            <span className={projectTitle}>{project.title}</span>
            <span className={projectMeta}>
              {project.type} · {project.year}
            </span>
          </a>
        ))}
      </div>

      {/* Signals */}
      <div className={sectionDivider}>
        {/* Golf */}
        <div className={signalBlock}>
          <div className={sectionLabel}>John Deere Classic</div>
          {golfLeaders.map((leader, i) => (
            <div key={i} className={scoreRow}>
              <span style={{ 
                color: leader.highlight ? 'var(--colors-primary-300)' : 'var(--colors-neutral-300)',
                minWidth: '28px',
                fontWeight: leader.highlight ? 700 : 400,
              }}>
                {leader.rank}
              </span>
              <span style={{ 
                flex: 1, 
                color: leader.highlight ? 'var(--colors-primary-300)' : 'var(--colors-neutral-300)',
                fontWeight: leader.highlight ? 700 : 400,
              }}>
                {leader.name}
              </span>
              <span style={{ 
                color: leader.highlight ? 'var(--colors-primary-300)' : 'var(--colors-neutral-400)',
                fontWeight: 700,
              }}>
                {leader.score}
              </span>
            </div>
          ))}
        </div>

        {/* Tigers */}
        <div className={signalBlock}>
          <div className={tigersScore}>⚾ DET 3 — 0 W</div>
          <div className={tigersCaption}>Yesterday · Independence Day</div>
        </div>

        {/* Listening */}
        <div className={signalBlock}>
          <div className={sectionLabel}>Listening</div>
          <div className={listeningLine}>
            Wet Leg, Tobin Sprout, Radiohead
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={footerStyle}>
        <div className={footerText}>
          Doug March · Product Designer & Developer · <a href="/archive" style={{ color: 'inherit', textDecoration: 'none' }}>Archive</a>
        </div>
      </footer>
    </>
  )
}