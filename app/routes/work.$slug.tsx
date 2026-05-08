import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const canvasCss = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(12, 1fr)' },
  columnGap: '24px',
  padding: '0 4vw',
  paddingTop: '48px',
  paddingBottom: '48px',
})

const eyebrowCss = css({
  fontFamily: 'body',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.10em',
  color: 'textMuted',
  marginBottom: '16px',
})

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={canvasCss}>
        <div className={css({ gridColumn: '1 / -1' })}>
          <h1 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: '32px', color: 'text', marginBottom: '16px' })}>
            Project not found
          </h1>
          <a href="/" className={css({ color: 'accent', fontFamily: 'mono', fontSize: '14px', _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>← Back to home</a>
        </div>
      </div>
    )
  }

  return (
    <div className={canvasCss}>
      {/* Header zone */}
      <div className={css({ gridColumn: { base: '1 / -1', md: '1 / 9' }, marginBottom: '48px' })}>
        <div className={eyebrowCss}>{project.type} · {project.year}</div>
        <h1 className={css({
          fontFamily: 'display',
          fontWeight: 'bold',
          fontSize: 'clamp(32px, 3.5vw, 52px)',
          lineHeight: 'snug',
          letterSpacing: 'tight',
          color: 'text',
          marginBottom: '16px',
        })}>
          {project.title}
        </h1>
        {project.problem && (
          <p className={css({
            fontFamily: 'body',
            fontSize: '18px',
            lineHeight: 'normal',
            color: 'textSecondary',
            maxWidth: '60ch',
          })}>
            {project.problem}
          </p>
        )}
        {project.description && !project.problem && (
          <p className={css({
            fontFamily: 'body',
            fontSize: '18px',
            lineHeight: 'normal',
            color: 'textSecondary',
            maxWidth: '60ch',
          })}>
            {project.description}
          </p>
        )}
      </div>

      {/* Meta rail */}
      <div className={css({
        gridColumn: { base: '1 / -1', md: '9 / 13' },
        borderLeftWidth: { base: '0', md: '1px' },
        borderLeftStyle: 'solid',
        borderLeftColor: 'border',
        paddingLeft: { base: '0', md: '24px' },
        marginBottom: '48px',
      })}>
        {project.role && (
          <div className={css({ marginBottom: '20px' })}>
            <div className={css({ fontFamily: 'mono', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'textMuted', marginBottom: '4px' })}>Role</div>
            <div className={css({ fontFamily: 'body', fontSize: '14px', color: 'textSecondary' })}>{project.role}</div>
          </div>
        )}
        {project.stack && project.stack.length > 0 && (
          <div className={css({ marginBottom: '20px' })}>
            <div className={css({ fontFamily: 'mono', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'textMuted', marginBottom: '4px' })}>Stack</div>
            <div className={css({ fontFamily: 'mono', fontSize: '12px', color: 'textSecondary', lineHeight: 'normal' })}>
              {project.stack.join(' · ')}
            </div>
          </div>
        )}
        {(project.externalUrl || project.liveUrl) && (
          <div className={css({ marginBottom: '20px' })}>
            <div className={css({ fontFamily: 'mono', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'textMuted', marginBottom: '4px' })}>Link</div>
            <a
              href={project.externalUrl || project.liveUrl}
              className={css({ fontFamily: 'mono', fontSize: '12px', color: 'accent', textDecoration: 'underline', _hover: { color: 'accentSubtle' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}
            >
              {(project.externalUrl || project.liveUrl || '').replace(/^https?:\/\//, '')} ↗
            </a>
          </div>
        )}
        {project.githubUrl && (
          <div className={css({ marginBottom: '20px' })}>
            <div className={css({ fontFamily: 'mono', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'textMuted', marginBottom: '4px' })}>Source</div>
            <a
              href={project.githubUrl}
              className={css({ fontFamily: 'mono', fontSize: '12px', color: 'accent', textDecoration: 'underline', _hover: { color: 'accentSubtle' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}
            >
              GitHub ↗
            </a>
          </div>
        )}
      </div>

      {/* Body — approach & outcome */}
      {(project.approach || project.outcome) && (
        <div className={css({ gridColumn: { base: '1 / -1', md: '1 / 9' }, marginBottom: '48px' })}>
          {project.approach && (
            <div className={css({ marginBottom: '32px' })}>
              <div className={css({ fontFamily: 'body', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'textMuted', marginBottom: '12px', paddingBottom: '8px', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'border' })}>Approach</div>
              <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'textSecondary', maxWidth: '65ch' })}>
                {project.approach}
              </p>
            </div>
          )}
          {project.outcome && (
            <div>
              <div className={css({ fontFamily: 'body', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'textMuted', marginBottom: '12px', paddingBottom: '8px', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'border' })}>Outcome</div>
              <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'textSecondary', maxWidth: '65ch' })}>
                {project.outcome}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer nav */}
      <div className={css({
        gridColumn: '1 / -1',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '16px',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor: 'border',
        flexWrap: 'wrap',
        gap: '8px',
      })}>
        <a href="/" className={css({ fontFamily: 'mono', fontSize: '12px', color: 'accent', textDecoration: 'none', _hover: { textDecoration: 'underline' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' }, padding: '8px 0' })}>
          ← All work
        </a>
        <a href="/archive" className={css({ fontFamily: 'mono', fontSize: '11px', color: 'textMuted', textDecoration: 'none', _hover: { color: 'accent', textDecoration: 'underline' }, _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' }, padding: '8px 0' })}>
          Archive
        </a>
      </div>
    </div>
  )
}