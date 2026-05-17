import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const pageClass = css({
  padding: '48px 6vw 96px',
  maxWidth: '960px',
  gridRow: '2 / 4',
})

const backClass = css({
  fontFamily: 'mono',
  fontSize: '12px',
  letterSpacing: '0.1em',
  color: 'textDim',
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '48px',
  padding: '8px 0',
  _hover: { color: 'text' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

const titleClass = css({
  fontFamily: 'display',
  fontSize: 'clamp(40px, 7vw, 96px)',
  fontWeight: '700',
  lineHeight: '0.88',
  letterSpacing: '-0.04em',
  color: 'text',
  marginBottom: '16px',
})

const metaRowClass = css({
  display: 'flex',
  gap: '24px',
  marginBottom: '48px',
  flexWrap: 'wrap',
})

const metaItemClass = css({
  fontFamily: 'mono',
  fontSize: '12px',
  letterSpacing: '0.1em',
  color: 'textDim',
  textTransform: 'uppercase',
})

const sectionLabelClass = css({
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.1em',
  color: 'textDim',
  textTransform: 'uppercase',
  marginBottom: '12px',
})

const bodyClass = css({
  fontFamily: 'body',
  fontSize: '18px',
  lineHeight: '1.5',
  color: 'textMuted',
  maxWidth: '65ch',
  marginBottom: '40px',
})

const stackGridClass = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '40px',
})

const stackTagClass = css({
  fontFamily: 'mono',
  fontSize: '12px',
  letterSpacing: '0.05em',
  color: 'textMuted',
  padding: '6px 12px',
  border: '1px solid',
  borderColor: 'border',
})

const extLinkClass = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'underline',
  textUnderlineOffset: '4px',
  _hover: { color: 'text' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

const archiveLinkClass = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'textDim',
  letterSpacing: '0.1em',
  textDecoration: 'none',
  _hover: { color: 'text' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <main className={pageClass}>
        <a href="/" className={backClass}>← Back</a>
        <h1 className={titleClass}>Not Found</h1>
        <p className={bodyClass}>This project doesn't exist.</p>
      </main>
    )
  }

  return (
    <main className={pageClass}>
      <a href="/" className={backClass}>← Back</a>
      <h1 className={titleClass}>{project.title}</h1>
      <div className={metaRowClass}>
        <span className={metaItemClass}>{project.type}</span>
        <span className={metaItemClass}>{project.year}</span>
        {project.role && <span className={metaItemClass}>{project.role}</span>}
      </div>

      {project.problem && (
        <div>
          <p className={sectionLabelClass}>Problem</p>
          <p className={bodyClass}>{project.problem}</p>
        </div>
      )}

      {project.approach && (
        <div>
          <p className={sectionLabelClass}>Approach</p>
          <p className={bodyClass}>{project.approach}</p>
        </div>
      )}

      {project.outcome && (
        <div>
          <p className={sectionLabelClass}>Outcome</p>
          <p className={bodyClass}>{project.outcome}</p>
        </div>
      )}

      {project.description && (
        <div>
          <p className={sectionLabelClass}>Description</p>
          <p className={bodyClass}>{project.description}</p>
        </div>
      )}

      {project.stack && project.stack.length > 0 && (
        <div>
          <p className={sectionLabelClass}>Stack</p>
          <div className={stackGridClass}>
            {project.stack.map((tech, i) => (
              <span key={i} className={stackTagClass}>{tech}</span>
            ))}
          </div>
        </div>
      )}

      {(project.externalUrl || project.liveUrl || project.githubUrl) && (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {project.externalUrl && (
            <a href={project.externalUrl} className={extLinkClass} target="_blank" rel="noopener noreferrer">
              Visit Project ↗
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className={extLinkClass} target="_blank" rel="noopener noreferrer">
              Live Site ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} className={extLinkClass} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          )}
        </div>
      )}

      <footer style={{ paddingTop: '32px', borderTop: '1px solid', borderColor: 'var(--colors-void-700)' }}>
        <a href="/archive" className={archiveLinkClass}>Archive</a>
      </footer>
    </main>
  )
}