import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

const heroBand = css({
  width: '100%',
  padding: '120px 6vw 64px',
  '@media (max-width: 768px)': {
    padding: '64px 6vw 40px',
  },
})

const projectTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(2.5rem, 6vw, 7rem)',
  textTransform: 'uppercase',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'text',
  marginBottom: '16px',
})

const projectMeta = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textDim',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  marginBottom: '40px',
})

const rule = css({
  width: '100%',
  height: '1px',
  background: 'borderAccent',
})

const contentBand = css({
  width: '100%',
  padding: '64px 6vw',
  '@media (max-width: 768px)': {
    padding: '40px 6vw',
  },
})

const detailGrid = css({
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  gap: '48px',
  marginBottom: '48px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '12px',
    marginBottom: '32px',
  },
})

const detailLabel = css({
  fontFamily: 'body',
  fontSize: '0.65rem',
  color: 'textDim',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  paddingTop: '4px',
})

const detailValue = css({
  fontFamily: 'body',
  fontSize: '1rem',
  color: 'textSecondary',
  lineHeight: 'normal',
  maxWidth: '65ch',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const stackPill = css({
  fontFamily: 'mono',
  fontSize: '0.75rem',
  color: 'accentLight',
  padding: '4px 12px',
  border: '1px solid',
  borderColor: 'borderAccent',
  borderRadius: 'full',
})

const linkBtn = css({
  fontFamily: 'body',
  fontSize: '0.8rem',
  color: 'accent',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '12px 0',
  marginRight: '32px',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accentLight', outlineOffset: '4px' },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textDim',
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  padding: '12px 0',
  display: 'inline-block',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accentLight', outlineOffset: '4px' },
})

const footerBand = css({
  width: '100%',
  padding: '32px 6vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid',
  borderColor: 'borderAccent',
  '@media (max-width: 640px)': {
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'flex-start',
  },
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '0.7rem',
  color: 'textDim',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '0.7rem',
  color: 'textDim',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  textDecoration: 'none',
  padding: '10px 0',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accentLight', outlineOffset: '4px' },
})

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className={heroBand}>
        <h1 className={projectTitle}>Not Found</h1>
        <a href="/" className={backLink}>← Back to Work</a>
      </section>
    )
  }

  return (
    <>
      <section className={heroBand}>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={projectTitle}>{project.title}</h1>
        <div className={projectMeta}>
          {project.type} · {project.year}
          {project.role && ` · ${project.role}`}
        </div>
        <div className={rule} />
      </section>

      <section className={contentBand}>
        {project.problem && (
          <div className={detailGrid}>
            <div className={detailLabel}>Problem</div>
            <div className={detailValue}>{project.problem}</div>
          </div>
        )}

        {project.approach && (
          <div className={detailGrid}>
            <div className={detailLabel}>Approach</div>
            <div className={detailValue}>{project.approach}</div>
          </div>
        )}

        {project.outcome && (
          <div className={detailGrid}>
            <div className={detailLabel}>Outcome</div>
            <div className={detailValue}>{project.outcome}</div>
          </div>
        )}

        {project.description && (
          <div className={detailGrid}>
            <div className={detailLabel}>Description</div>
            <div className={detailValue}>{project.description}</div>
          </div>
        )}

        {project.stack && project.stack.length > 0 && (
          <div className={detailGrid}>
            <div className={detailLabel}>Stack</div>
            <div className={stackList}>
              {project.stack.map((tech) => (
                <span key={tech} className={stackPill}>{tech}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '48px' }}>
          {project.externalUrl && (
            <a href={project.externalUrl} className={linkBtn}>
              Visit Site →
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className={linkBtn}>
              Live →
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} className={linkBtn}>
              GitHub →
            </a>
          )}
        </div>
      </section>

      <footer className={footerBand}>
        <span className={footerText}>© 2026 Doug March</span>
        <a href="/archive" className={footerLink}>Archive</a>
      </footer>
    </>
  )
}