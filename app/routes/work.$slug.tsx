import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const splitGrid = css({
  display: 'grid',
  gridTemplateColumns: '45vw 55vw',
  minHeight: '100vh',
  maxWidth: 'none',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    minHeight: 'auto',
  },
})

const leftPanel = css({
  background: '{colors.neutral.950}',
  padding: 'clamp(24px, 6vw, 96px) clamp(20px, 4vw, 64px) clamp(20px, 5vw, 80px) clamp(20px, 6vw, 96px)',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  '@media (max-width: 768px)': {
    padding: '24px',
    gap: '24px',
  },
})

const rightPanel = css({
  background: '{colors.lime.400}',
  padding: 'clamp(20px, 5vw, 80px) clamp(20px, 6vw, 96px) clamp(20px, 5vw, 80px) clamp(20px, 5vw, 80px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '32px',
  '@media (max-width: 768px)': {
    padding: '24px',
    gap: '24px',
  },
})

const projectTitle = css({
  fontFamily: 'display',
  fontSize: 'clamp(48px, 5.5vw, 88px)',
  lineHeight: '0.92',
  letterSpacing: '0.04em',
  color: '{colors.cream.100}',
  textTransform: 'uppercase',
  fontWeight: 'bold',
})

const metaLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '{colors.neutral.500}',
  marginBottom: '4px',
  lineHeight: 'snug',
})

const metaValue = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: '{colors.cream.100}',
  lineHeight: 'normal',
  maxWidth: '55ch',
})

const metaBlock = css({
  padding: '12px 0',
  borderTop: '1px solid {colors.neutral.700}',
})

const greenLabel = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(8, 14, 7, 0.5)',
  marginBottom: '4px',
  lineHeight: 'snug',
})

const greenValue = css({
  fontFamily: 'body',
  fontSize: '16px',
  color: '{colors.neutral.950}',
  lineHeight: 'normal',
  maxWidth: '55ch',
})

const greenBlock = css({
  padding: '16px 0',
  borderTop: '1px solid rgba(8, 14, 7, 0.2)',
})

const stackTag = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: '{colors.neutral.950}',
  background: 'rgba(8, 14, 7, 0.1)',
  padding: '6px 12px',
  lineHeight: 'snug',
  display: 'inline-block',
})

const extLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'medium',
  color: '{colors.neutral.950}',
  textDecoration: 'underline',
  padding: '8px 0',
  display: 'inline-block',
  _hover: {
    color: '{colors.neutral.700}',
  },
  _focus: {
    outline: '2px solid {colors.neutral.950}',
    outlineOffset: '2px',
  },
})

const backLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: '{colors.neutral.400}',
  textDecoration: 'none',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '8px 0',
  display: 'inline-block',
  transition: 'color 150ms ease',
  _hover: {
    color: '{colors.cream.100}',
    textDecoration: 'none',
  },
  _focus: {
    outline: '2px solid {colors.lime.400}',
    outlineOffset: '2px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={splitGrid}>
        <div className={leftPanel}>
          <Sidebar />
          <div className={projectTitle}>NOT FOUND</div>
          <a href="/" className={backLink}>← Back</a>
        </div>
        <div className={rightPanel} />
      </div>
    )
  }

  return (
    <div className={splitGrid}>
      {/* LEFT — title + metadata */}
      <div className={leftPanel}>
        <Sidebar />

        <div className={projectTitle}>{project.title}</div>

        <div>
          <div className={metaBlock}>
            <div className={metaLabel}>Type</div>
            <div className={metaValue}>{project.type}</div>
          </div>
          <div className={metaBlock}>
            <div className={metaLabel}>Year</div>
            <div className={metaValue}>{project.year}</div>
          </div>
          {project.role && (
            <div className={metaBlock}>
              <div className={metaLabel}>Role</div>
              <div className={metaValue}>{project.role}</div>
            </div>
          )}
          {project.problem && (
            <div className={metaBlock}>
              <div className={metaLabel}>Problem</div>
              <div className={metaValue}>{project.problem}</div>
            </div>
          )}
        </div>

        <a href="/" className={backLink}>← All Work</a>
      </div>

      {/* RIGHT — approach, outcome, stack, links */}
      <div className={rightPanel}>
        {project.approach && (
          <div className={greenBlock}>
            <div className={greenLabel}>Approach</div>
            <div className={greenValue}>{project.approach}</div>
          </div>
        )}
        {project.outcome && (
          <div className={greenBlock}>
            <div className={greenLabel}>Outcome</div>
            <div className={greenValue}>{project.outcome}</div>
          </div>
        )}
        {project.description && (
          <div className={greenBlock}>
            <div className={greenLabel}>Description</div>
            <div className={greenValue}>{project.description}</div>
          </div>
        )}
        {project.stack && project.stack.length > 0 && (
          <div className={greenBlock}>
            <div className={greenLabel}>Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {project.stack.map((s, i) => (
                <span className={stackTag} key={i}>{s}</span>
              ))}
            </div>
          </div>
        )}
        {(project.externalUrl || project.liveUrl || project.githubUrl) && (
          <div className={greenBlock}>
            <div className={greenLabel}>Links</div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {project.externalUrl && (
                <a href={project.externalUrl} className={extLink}>Visit Site →</a>
              )}
              {project.liveUrl && !project.externalUrl && (
                <a href={project.liveUrl} className={extLink}>Live →</a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} className={extLink}>GitHub →</a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}