import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const heroStyle = css({
  padding: '40px 0 28px',
  borderBottom: '2px solid',
  borderColor: 'accent',
})

const eyebrowStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '12px',
})

const titleStyle = css({
  fontFamily: 'display',
  fontSize: 'clamp(2rem, 5vw, 5rem)',
  fontWeight: 'bold',
  color: 'text',
  lineHeight: '0.88',
  letterSpacing: '-0.02em',
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
  '@media (min-width: 768px)': {
    padding: '28px 20px 28px 0',
    borderRight: '1px solid',
    borderColor: 'border',
  },
})

const sideColStyle = css({
  padding: '28px 0',
  '@media (min-width: 768px)': {
    padding: '28px 0 28px 20px',
  },
})

const sectionLabelStyle = css({
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '8px',
})

const bodyTextStyle = css({
  fontFamily: 'body',
  fontSize: '15px',
  color: 'textSecondary',
  lineHeight: '1.55',
  maxWidth: '65ch',
  marginBottom: '24px',
})

const metaRowStyle = css({
  padding: '10px 0',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  '&:last-child': {
    borderBottom: 'none',
  },
})

const metaLabelStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '2px',
})

const metaValueStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text',
  lineHeight: '1.4',
})

const stackListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginTop: '4px',
})

const stackItemStyle = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textSecondary',
  padding: '3px 8px',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '2px',
  letterSpacing: '0.02em',
})

const linkStyle = css({
  display: 'inline-block',
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  padding: '8px 0',
  _hover: {
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const notFoundStyle = css({
  padding: '80px 0',
  textAlign: 'center',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={notFoundStyle}>
        <h1 className={css({ fontFamily: 'display', fontSize: '2rem', fontWeight: 'bold', color: 'text', marginBottom: '16px' })}>
          Project not found
        </h1>
        <a href="/" className={linkStyle}>← Back to work</a>
      </div>
    )
  }

  return (
    <>
      <div className={heroStyle}>
        <p className={eyebrowStyle}>
          {project.type} · {project.year}
        </p>
        <h1 className={titleStyle}>{project.title}</h1>
      </div>

      <div className={gridStyle}>
        <div className={mainColStyle}>
          {project.problem && (
            <>
              <p className={sectionLabelStyle}>Problem</p>
              <p className={bodyTextStyle}>{project.problem}</p>
            </>
          )}
          {project.approach && (
            <>
              <p className={sectionLabelStyle}>Approach</p>
              <p className={bodyTextStyle}>{project.approach}</p>
            </>
          )}
          {project.outcome && (
            <>
              <p className={sectionLabelStyle}>Outcome</p>
              <p className={bodyTextStyle}>{project.outcome}</p>
            </>
          )}
          {project.description && (
            <>
              <p className={sectionLabelStyle}>Description</p>
              <p className={bodyTextStyle}>{project.description}</p>
            </>
          )}

          <div className={css({ marginTop: '12px', display: 'flex', gap: '20px', flexWrap: 'wrap' })}>
            {project.externalUrl && (
              <a href={project.externalUrl} className={linkStyle}>Visit Live →</a>
            )}
            {project.liveUrl && !project.externalUrl && (
              <a href={project.liveUrl} className={linkStyle}>Visit Live →</a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className={linkStyle}>Source →</a>
            )}
            <a href="/" className={linkStyle}>← All Work</a>
          </div>
        </div>

        <div className={sideColStyle}>
          <div className={metaRowStyle}>
            <p className={metaLabelStyle}>Type</p>
            <p className={metaValueStyle}>{project.type}</p>
          </div>
          <div className={metaRowStyle}>
            <p className={metaLabelStyle}>Year</p>
            <p className={metaValueStyle}>{project.year}</p>
          </div>
          {project.role && (
            <div className={metaRowStyle}>
              <p className={metaLabelStyle}>Role</p>
              <p className={metaValueStyle}>{project.role}</p>
            </div>
          )}
          {project.stack && project.stack.length > 0 && (
            <div className={metaRowStyle}>
              <p className={metaLabelStyle}>Stack</p>
              <div className={stackListStyle}>
                {project.stack.map((tech) => (
                  <span key={tech} className={stackItemStyle}>{tech}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}