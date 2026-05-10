import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const page = css({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '120px 6vw 80px',
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '48px',
  padding: '12px 0',
  _hover: { color: '{colors.amber.300}' },
  _focus: { outline: '2px solid {colors.amber.400}', outlineOffset: '4px' },
})

const title = css({
  fontFamily: 'display',
  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
  lineHeight: 'tight',
  letterSpacing: 'snug',
  color: 'accent',
  textTransform: 'uppercase',
  marginBottom: '16px',
})

const meta = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: 'textMuted',
  marginBottom: '48px',
  fontVariantNumeric: 'tabular-nums',
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '12px',
  marginTop: '40px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: 'normal',
  color: 'text',
  maxWidth: '65ch',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
})

const stackTag = css({
  fontFamily: 'mono',
  fontSize: '12px',
  letterSpacing: 'wide',
  color: 'textSecondary',
  padding: '4px 10px',
  border: '1px solid {colors.stone.700}',
})

const extLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'accent',
  textDecoration: 'underline',
  padding: '12px 0',
  display: 'inline-block',
  _hover: { color: '{colors.amber.300}' },
  _focus: { outline: '2px solid {colors.amber.400}', outlineOffset: '4px' },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={page}>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={title}>Not Found</h1>
        <p className={bodyText}>Project not found.</p>
      </div>
    )
  }

  return (
    <div className={page}>
      <a href="/" className={backLink}>← Back</a>
      <h1 className={title}>{project.title}</h1>
      <div className={meta}>
        {project.type} · {project.year}
        {project.role ? ` · ${project.role}` : ''}
      </div>

      {project.problem && (
        <>
          <h2 className={sectionLabel}>Problem</h2>
          <p className={bodyText}>{project.problem}</p>
        </>
      )}

      {project.approach && (
        <>
          <h2 className={sectionLabel}>Approach</h2>
          <p className={bodyText}>{project.approach}</p>
        </>
      )}

      {project.outcome && (
        <>
          <h2 className={sectionLabel}>Outcome</h2>
          <p className={bodyText}>{project.outcome}</p>
        </>
      )}

      {project.description && (
        <>
          <h2 className={sectionLabel}>Description</h2>
          <p className={bodyText}>{project.description}</p>
        </>
      )}

      {project.stack && project.stack.length > 0 && (
        <>
          <h2 className={sectionLabel}>Stack</h2>
          <div className={stackList}>
            {project.stack.map((t, i) => (
              <span key={i} className={stackTag}>{t}</span>
            ))}
          </div>
        </>
      )}

      {project.externalUrl && (
        <div style={{ marginTop: '40px' }}>
          <a href={project.externalUrl} className={extLink} target="_blank" rel="noopener noreferrer">
            Visit Project ↗
          </a>
        </div>
      )}

      <footer style={{ marginTop: '64px', paddingTop: '24px', borderTop: '1px solid #382E28' }}>
        <a href="/archive" className={css({ fontFamily: 'body', fontSize: '11px', color: '{colors.stone.500}', textDecoration: 'none', letterSpacing: '0.08em', _hover: { color: '{colors.amber.300}' }, _focus: { outline: '2px solid {colors.amber.400}', outlineOffset: '2px' } })}>Archive</a>
      </footer>
    </div>
  )
}