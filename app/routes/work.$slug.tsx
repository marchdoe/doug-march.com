import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const pageHeader = css({
  padding: '40px 5vw 28px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const projectTitle = css({
  fontFamily: 'heading',
  fontWeight: 'bold',
  fontSize: 'clamp(28px, 4vw, 56px)',
  lineHeight: '0.95',
  letterSpacing: '-0.01em',
  color: 'accent',
})

const projectMeta = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: 'clamp(11px, 0.8vw, 13px)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginTop: '12px',
})

const contentGrid = css({
  display: { base: 'flex', md: 'grid' },
  flexDirection: { base: 'column', md: 'unset' },
  gridTemplateColumns: { md: '2fr 1fr' },
  gap: '0',
  padding: '0 5vw',
})

const mainCol = css({
  padding: { base: '24px 0 32px', md: '24px 20px 32px 0' },
  borderRight: { base: 'none', md: '1px solid' },
  borderBottom: { base: '1px solid', md: 'none' },
  borderColor: 'border',
})

const sideCol = css({
  padding: { base: '24px 0 32px', md: '24px 0 32px 20px' },
})

const sectionHead = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: 'clamp(11px, 0.9vw, 13px)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'accentDim',
  marginBottom: '12px',
  lineHeight: '1.2',
})

const bodyText = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(14px, 1vw, 16px)',
  lineHeight: '1.55',
  color: 'textSecondary',
  maxWidth: '65ch',
  marginBottom: '20px',
})

const detailLabel = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  marginBottom: '4px',
})

const detailValue = css({
  fontFamily: 'body',
  fontWeight: 'normal',
  fontSize: 'clamp(13px, 0.95vw, 15px)',
  color: 'textSecondary',
  lineHeight: '1.55',
  marginBottom: '16px',
})

const linkStyle = css({
  color: 'accent',
  textDecoration: 'none',
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'clamp(13px, 0.95vw, 15px)',
  padding: '8px 0',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'color 0.15s ease',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const tagStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '{colors.chartreuse.600}',
  display: 'inline-block',
  marginRight: '8px',
  marginBottom: '4px',
})

const backLink = css({
  color: 'textMuted',
  textDecoration: 'none',
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '12px 0',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'color 0.15s ease',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '40px 5vw' })}>
        <h1 className={projectTitle}>Project not found</h1>
        <a href="/" className={backLink}>← Back to work</a>
      </div>
    )
  }

  return (
    <>
      <section className={pageHeader}>
        <a href="/" className={backLink}>← Back</a>
        <h1 className={projectTitle}>{project.title}</h1>
        <div className={projectMeta}>
          {project.type} · {project.year}
          {project.role && <> · {project.role}</>}
        </div>
      </section>

      <div className={contentGrid}>
        <div className={mainCol}>
          {project.problem && (
            <>
              <h2 className={sectionHead}>Problem</h2>
              <p className={bodyText}>{project.problem}</p>
            </>
          )}

          {project.approach && (
            <>
              <h2 className={sectionHead}>Approach</h2>
              <p className={bodyText}>{project.approach}</p>
            </>
          )}

          {project.outcome && (
            <>
              <h2 className={sectionHead}>Outcome</h2>
              <p className={bodyText}>{project.outcome}</p>
            </>
          )}

          {project.description && !project.problem && (
            <p className={bodyText}>{project.description}</p>
          )}
        </div>

        <div className={sideCol}>
          {project.stack && project.stack.length > 0 && (
            <>
              <h2 className={sectionHead}>Stack</h2>
              <div className={css({ marginBottom: '20px' })}>
                {project.stack.map((tech) => (
                  <span key={tech} className={tagStyle}>{tech}</span>
                ))}
              </div>
            </>
          )}

          {(project.liveUrl || project.externalUrl) && (
            <>
              <div className={detailLabel}>Live Site</div>
              <a
                href={project.liveUrl || project.externalUrl}
                className={linkStyle}
              >
                Visit →
              </a>
            </>
          )}

          {project.githubUrl && (
            <div className={css({ marginTop: '16px' })}>
              <div className={detailLabel}>Source</div>
              <a href={project.githubUrl} className={linkStyle}>
                GitHub →
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  )
}