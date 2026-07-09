import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const page = css({
  padding: '80px 5vw 48px',
  maxWidth: '960px',
  margin: '0 auto',
  width: '100%',
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '48px',
  padding: '12px 0',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const title = css({
  fontFamily: 'display',
  fontWeight: 'black',
  fontSize: 'clamp(2rem, 5vw, 5rem)',
  lineHeight: 'tight',
  textTransform: 'uppercase',
  color: 'text',
  marginBottom: '16px',
  letterSpacing: '0.01em',
})

const meta = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '48px',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '12px',
  marginTop: '48px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '1rem',
  lineHeight: 'normal',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '24px',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '48px',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'text',
  border: '1px solid',
  borderColor: 'border',
  padding: '8px 16px',
})

const extLink = css({
  fontFamily: 'body',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '12px 24px',
  border: '1px solid',
  borderColor: 'accent',
  marginTop: '24px',
  _hover: { color: 'accentLight', borderColor: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className={page}>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={title}>Not Found</h1>
        <p className={bodyText}>This project doesn't exist.</p>
      </main>
    )
  }

  return (
    <main className={page}>
      <a href="/" className={backLink}>← Back</a>
      <h1 className={title}>{project.title}</h1>
      <p className={meta}>{project.type} · {project.year}</p>

      {project.role && (
        <>
          <p className={sectionLabel}>Role</p>
          <p className={bodyText}>{project.role}</p>
        </>
      )}

      {project.problem && (
        <>
          <p className={sectionLabel}>Problem</p>
          <p className={bodyText}>{project.problem}</p>
        </>
      )}

      {project.approach && (
        <>
          <p className={sectionLabel}>Approach</p>
          <p className={bodyText}>{project.approach}</p>
        </>
      )}

      {project.outcome && (
        <>
          <p className={sectionLabel}>Outcome</p>
          <p className={bodyText}>{project.outcome}</p>
        </>
      )}

      {project.description && (
        <>
          <p className={sectionLabel}>Description</p>
          <p className={bodyText}>{project.description}</p>
        </>
      )}

      {project.stack && project.stack.length > 0 && (
        <>
          <p className={sectionLabel}>Stack</p>
          <div className={stackList}>
            {project.stack.map((s, i) => (
              <span key={i} className={stackTag}>{s}</span>
            ))}
          </div>
        </>
      )}

      {project.externalUrl && (
        <a href={project.externalUrl} className={extLink} target="_blank" rel="noopener noreferrer">
          Visit Project ↗
        </a>
      )}
      {project.liveUrl && !project.externalUrl && (
        <a href={project.liveUrl} className={extLink} target="_blank" rel="noopener noreferrer">
          View Live ↗
        </a>
      )}

      <footer className={css({ borderTop: '1px solid', borderColor: 'border', paddingTop: '24px', marginTop: '64px' })}>
        <a href="/archive" className={css({ fontSize: '0.75rem', color: 'textMuted', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', _hover: { color: 'accentLight' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>Archive</a>
      </footer>
    </main>
  )
}