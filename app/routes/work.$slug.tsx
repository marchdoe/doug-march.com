import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const pageStyles = css({
  padding: '48px 6vw 80px',
  gridRow: '2 / 4',
  maxWidth: '900px',
})

const backLinkStyles = css({
  fontSize: '0.875rem',
  fontWeight: '500',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  fontFamily: 'body',
  display: 'inline-block',
  marginBottom: '32px',
  padding: '10px 0',
  _hover: { color: 'text' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
  transition: 'color 0.15s ease',
})

const titleStyles = css({
  fontSize: 'clamp(2rem, 6vw, 4rem)',
  fontWeight: '800',
  lineHeight: '0.88',
  letterSpacing: '-0.02em',
  color: 'text',
  fontFamily: 'display',
  textTransform: 'uppercase',
  marginBottom: '16px',
})

const metaRowStyles = css({
  display: 'flex',
  gap: '24px',
  marginBottom: '48px',
  flexWrap: 'wrap',
})

const metaTagStyles = css({
  fontSize: '0.875rem',
  fontWeight: '500',
  color: 'textMuted',
  fontFamily: 'body',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  lineHeight: '1.4',
})

const sectionLabelStyles = css({
  fontSize: '0.75rem',
  fontWeight: '500',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'textMuted',
  fontFamily: 'body',
  marginBottom: '8px',
  lineHeight: '1.4',
})

const sectionTextStyles = css({
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.55',
  color: 'text',
  fontFamily: 'body',
  maxWidth: '65ch',
  marginBottom: '32px',
})

const stackListStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  listStyle: 'none',
  padding: '0',
  margin: '0 0 32px',
})

const stackItemStyles = css({
  fontSize: '0.8125rem',
  fontWeight: '500',
  color: 'textSecondary',
  fontFamily: 'body',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
  lineHeight: '1.4',
})

const extLinkStyles = css({
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'accent',
  textDecoration: 'none',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  fontFamily: 'body',
  padding: '12px 24px',
  border: '1px solid',
  borderColor: 'accent',
  display: 'inline-block',
  _hover: { color: 'accentHover', borderColor: 'accentHover' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
  transition: 'color 0.15s ease, border-color 0.15s ease',
  lineHeight: '1.4',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className={pageStyles}>
        <a href="/" className={backLinkStyles}>← Back</a>
        <h1 className={titleStyles}>Not Found</h1>
        <p className={sectionTextStyles}>This project doesn't exist.</p>
      </main>
    )
  }

  return (
    <main className={pageStyles}>
      <a href="/" className={backLinkStyles}>← Back</a>
      <h1 className={titleStyles}>{project.title}</h1>
      <div className={metaRowStyles}>
        <span className={metaTagStyles}>{project.type}</span>
        <span className={metaTagStyles}>{project.year}</span>
        {project.role && <span className={metaTagStyles}>{project.role}</span>}
      </div>

      {project.problem && (
        <div>
          <p className={sectionLabelStyles}>Problem</p>
          <p className={sectionTextStyles}>{project.problem}</p>
        </div>
      )}

      {project.approach && (
        <div>
          <p className={sectionLabelStyles}>Approach</p>
          <p className={sectionTextStyles}>{project.approach}</p>
        </div>
      )}

      {project.outcome && (
        <div>
          <p className={sectionLabelStyles}>Outcome</p>
          <p className={sectionTextStyles}>{project.outcome}</p>
        </div>
      )}

      {project.description && (
        <div>
          <p className={sectionLabelStyles}>Description</p>
          <p className={sectionTextStyles}>{project.description}</p>
        </div>
      )}

      {project.stack && project.stack.length > 0 && (
        <div>
          <p className={sectionLabelStyles}>Stack</p>
          <ul className={stackListStyles}>
            {project.stack.map((tech, i) => (
              <li key={i} className={stackItemStyles}>{tech}</li>
            ))}
          </ul>
        </div>
      )}

      {(project.externalUrl || project.liveUrl || project.githubUrl) && (
        <div className={css({ display: 'flex', gap: '16px', flexWrap: 'wrap' })}>
          {project.externalUrl && (
            <a href={project.externalUrl} className={extLinkStyles} target="_blank" rel="noopener noreferrer">
              Visit Site →
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className={extLinkStyles} target="_blank" rel="noopener noreferrer">
              Live →
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} className={extLinkStyles} target="_blank" rel="noopener noreferrer">
              GitHub →
            </a>
          )}
        </div>
      )}
    </main>
  )
}