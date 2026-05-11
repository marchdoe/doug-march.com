import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const heroBand = css({
  width: '100%',
  minHeight: '50vh',
  background: 'bgBand',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '120px 6vw 64px',
  '@media (max-width: 640px)': {
    padding: '80px 6vw 40px',
    minHeight: '40vh',
  },
})

const projectType = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '12px',
})

const projectTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(36px, 6vw, 72px)',
  fontWeight: '700',
  lineHeight: '1.0',
  letterSpacing: '-0.025em',
  color: '{colors.neutral.50}',
  marginBottom: '8px',
})

const projectYear = css({
  fontFamily: 'mono',
  fontSize: '14px',
  color: '{colors.neutral.400}',
  fontVariantNumeric: 'tabular-nums',
})

const detailBand = css({
  width: '100%',
  padding: '64px 6vw',
  background: 'bg',
  '@media (max-width: 640px)': {
    padding: '40px 6vw',
  },
})

const detailGrid = css({
  display: 'grid',
  gridTemplateColumns: '160px 1fr',
  gap: '24px 40px',
  maxWidth: '800px',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gap: '16px',
  },
})

const detailLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
  paddingTop: '4px',
})

const detailValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.6',
  color: '{colors.neutral.200}',
  maxWidth: '55ch',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const stackTag = css({
  fontFamily: 'mono',
  fontSize: '13px',
  color: '{colors.neutral.300}',
  background: 'bgCard',
  padding: '4px 10px',
  borderRadius: '2px',
})

const linkStyle = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: 'accent',
  textDecoration: 'none',
  _hover: { opacity: '0.8' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: '{colors.neutral.400}',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '12px 0',
  minHeight: '44px',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const footerBand = css({
  width: '100%',
  background: 'bgCard',
  padding: '24px 6vw',
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
})

const footerText = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
})

const footerLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
  textDecoration: 'none',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const notFoundBand = css({
  width: '100%',
  minHeight: '60vh',
  background: 'bg',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '120px 6vw',
  gap: '16px',
})

const notFoundTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(28px, 4vw, 48px)',
  fontWeight: '700',
  color: '{colors.neutral.50}',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={notFoundBand}>
        <h1 className={notFoundTitle}>Project not found</h1>
        <a href="/" className={linkStyle}>← Back home</a>
      </div>
    )
  }

  return (
    <>
      <section className={heroBand}>
        <a href="/" className={backLink}>← Back</a>
        <div className={projectType}>{project.type} · {project.year}</div>
        <h1 className={projectTitle}>{project.title}</h1>
      </section>

      <section className={detailBand}>
        <div className={detailGrid}>
          {project.role && (
            <>
              <span className={detailLabel}>Role</span>
              <span className={detailValue}>{project.role}</span>
            </>
          )}
          {project.problem && (
            <>
              <span className={detailLabel}>Problem</span>
              <span className={detailValue}>{project.problem}</span>
            </>
          )}
          {project.approach && (
            <>
              <span className={detailLabel}>Approach</span>
              <span className={detailValue}>{project.approach}</span>
            </>
          )}
          {project.outcome && (
            <>
              <span className={detailLabel}>Outcome</span>
              <span className={detailValue}>{project.outcome}</span>
            </>
          )}
          {project.description && (
            <>
              <span className={detailLabel}>Description</span>
              <span className={detailValue}>{project.description}</span>
            </>
          )}
          {project.stack && project.stack.length > 0 && (
            <>
              <span className={detailLabel}>Stack</span>
              <div className={stackList}>
                {project.stack.map((tech, i) => (
                  <span key={i} className={stackTag}>{tech}</span>
                ))}
              </div>
            </>
          )}
          {project.externalUrl && (
            <>
              <span className={detailLabel}>Link</span>
              <a href={project.externalUrl} className={linkStyle}>{project.externalUrl}</a>
            </>
          )}
          {project.liveUrl && !project.externalUrl && (
            <>
              <span className={detailLabel}>Live</span>
              <a href={project.liveUrl} className={linkStyle}>{project.liveUrl}</a>
            </>
          )}
          {project.githubUrl && (
            <>
              <span className={detailLabel}>GitHub</span>
              <a href={project.githubUrl} className={linkStyle}>{project.githubUrl}</a>
            </>
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