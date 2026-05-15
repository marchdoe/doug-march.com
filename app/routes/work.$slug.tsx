import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const page = css({
  padding: '4vw',
  paddingTop: 'calc(4vw + 52px)',
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '3vw',
  minHeight: '100vh',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '16px',
    paddingTop: 'calc(16px + 52px)',
  },
})

const backLink = css({
  gridColumn: '1 / 13',
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: '500',
  letterSpacing: '0.05em',
  color: '{colors.neutral.500}',
  textDecoration: 'none',
  padding: '8px 0',
  _hover: {
    color: '{colors.primary.400}',
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.primary.400}',
    outlineOffset: '2px',
  },
})

const heroSection = css({
  gridColumn: '1 / 9',
  paddingTop: '4vw',
  '@media (max-width: 768px)': {
    paddingTop: '0',
  },
})

const projectTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(36px, 6vw, 96px)',
  fontWeight: '700',
  lineHeight: '0.95',
  color: '{colors.neutral.50}',
  textTransform: 'uppercase',
  marginBottom: '16px',
})

const projectType = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.primary.400}',
  marginBottom: '8px',
})

const projectYear = css({
  fontFamily: 'mono',
  fontSize: '14px',
  color: '{colors.neutral.500}',
  fontVariantNumeric: 'tabular-nums',
})

const metaSidebar = css({
  gridColumn: '9 / 13',
  paddingTop: '4vw',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '@media (max-width: 768px)': {
    paddingTop: '0',
  },
})

const metaBlock = css({
  background: '{colors.neutral.800}',
  border: '1px solid {colors.neutral.700}',
  borderRadius: '2px',
  padding: '16px',
})

const metaLabel = css({
  fontFamily: 'body',
  fontSize: '10px',
  fontWeight: '600',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
  marginBottom: '6px',
})

const metaValue = css({
  fontFamily: 'body',
  fontSize: '14px',
  lineHeight: '1.5',
  color: '{colors.neutral.300}',
  maxWidth: '55ch',
})

const bodySection = css({
  gridColumn: '1 / 9',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  '@media (max-width: 768px)': {
    width: '100%',
  },
})

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
  marginBottom: '8px',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: '16px',
  lineHeight: '1.55',
  color: '{colors.neutral.300}',
  maxWidth: '65ch',
})

const stackList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const stackPill = css({
  fontFamily: 'mono',
  fontSize: '12px',
  color: '{colors.neutral.400}',
  background: '{colors.neutral.800}',
  border: '1px solid {colors.neutral.700}',
  borderRadius: '2px',
  padding: '4px 10px',
})

const externalLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: '600',
  color: '{colors.primary.400}',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 0',
  _hover: {
    color: '{colors.primary.200}',
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.primary.400}',
    outlineOffset: '4px',
  },
})

const footerStyle = css({
  gridColumn: '1 / 13',
  marginTop: '4vw',
  paddingTop: '16px',
  borderTop: '1px solid {colors.neutral.700}',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '4vw',
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.500}',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-start',
    marginTop: '32px',
  },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={page}>
        <div className={css({ gridColumn: '1 / 13', paddingTop: '8vw' })}>
          <h1 className={projectTitle}>Not Found</h1>
          <a href="/" className={backLink}>← Back to work</a>
        </div>
      </div>
    )
  }

  return (
    <div className={page}>
      <a href="/" className={backLink}>← Back</a>

      {/* Hero */}
      <div className={heroSection}>
        <p className={projectType}>{project.type} · {project.year}</p>
        <h1 className={projectTitle}>{project.title}</h1>
        {project.problem && <p className={bodyText}>{project.problem}</p>}
      </div>

      {/* Meta sidebar */}
      <div className={metaSidebar}>
        {project.role && (
          <div className={metaBlock}>
            <p className={metaLabel}>Role</p>
            <p className={metaValue}>{project.role}</p>
          </div>
        )}
        {project.externalUrl && (
          <div className={metaBlock}>
            <p className={metaLabel}>Live</p>
            <a href={project.externalUrl} className={externalLink}>
              Visit site ↗
            </a>
          </div>
        )}
        {project.liveUrl && (
          <div className={metaBlock}>
            <p className={metaLabel}>URL</p>
            <a href={project.liveUrl} className={externalLink}>
              {project.liveUrl.replace('https://', '')} ↗
            </a>
          </div>
        )}
        {project.githubUrl && (
          <div className={metaBlock}>
            <p className={metaLabel}>Source</p>
            <a href={project.githubUrl} className={externalLink}>
              GitHub ↗
            </a>
          </div>
        )}
      </div>

      {/* Body content */}
      <div className={bodySection}>
        {project.approach && (
          <div>
            <p className={sectionLabel}>Approach</p>
            <p className={bodyText}>{project.approach}</p>
          </div>
        )}
        {project.outcome && (
          <div>
            <p className={sectionLabel}>Outcome</p>
            <p className={bodyText}>{project.outcome}</p>
          </div>
        )}
        {project.description && (
          <div>
            <p className={sectionLabel}>Description</p>
            <p className={bodyText}>{project.description}</p>
          </div>
        )}
        {project.stack && project.stack.length > 0 && (
          <div>
            <p className={sectionLabel}>Stack</p>
            <div className={stackList}>
              {project.stack.map((s, i) => (
                <span key={i} className={stackPill}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={footerStyle}>
        <span>© 2026 Doug March</span>
        <a href="/archive" className={css({
          color: '{colors.neutral.500}',
          textDecoration: 'none',
          _hover: { color: '{colors.neutral.300}', textDecoration: 'underline' },
          '&:focus-visible': { outline: '2px solid {colors.primary.400}', outlineOffset: '2px' },
        })}>Archive</a>
      </div>
    </div>
  )
}