import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ maxWidth: '1120px', margin: '0 auto', padding: '48px' })}>
        <h1 className={css({ fontFamily: 'heading', fontSize: '24px', color: 'text' })}>Project not found</h1>
        <a href="/" className={css({ fontFamily: 'body', fontSize: '16px', color: 'accent', marginTop: '16px', display: 'inline-block', _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>
          ← Back home
        </a>
      </div>
    )
  }

  return (
    <div className={css({
      maxWidth: '1120px',
      margin: '0 auto',
      padding: { base: '32px 24px 64px', md: '48px 48px 96px' },
    })}>
      <div className={css({
        display: 'grid',
        gridTemplateColumns: { base: '1fr', md: 'repeat(12, 1fr)' },
        columnGap: '24px',
        rowGap: '48px',
      })}>

        {/* Project header */}
        <div className={css({
          gridColumn: { base: '1', md: '1 / 9' },
        })}>
          <div className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '16px',
            lineHeight: 'loose',
          })}>
            {project.type} · {project.year}
          </div>
          <h1 className={css({
            fontFamily: 'heading',
            fontSize: { base: '32px', md: 'clamp(36px, 5vw, 56px)' },
            fontWeight: 'bold',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            marginBottom: '24px',
          })}>
            {project.title}
          </h1>
          {project.problem && (
            <p className={css({
              fontFamily: 'body',
              fontSize: '18px',
              lineHeight: 'normal',
              color: 'text-secondary',
              maxWidth: '600px',
              letterSpacing: 'wide',
            })}>
              {project.problem}
            </p>
          )}
        </div>

        {/* Meta sidebar */}
        <div className={css({
          gridColumn: { base: '1', md: '9 / 13' },
          alignSelf: 'start',
        })}>
          {project.role && (
            <div className={css({ marginBottom: '24px' })}>
              <div className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'text-muted', marginBottom: '4px' })}>Role</div>
              <div className={css({ fontFamily: 'body', fontSize: '14px', color: 'text-secondary', letterSpacing: 'wide' })}>{project.role}</div>
            </div>
          )}
          {project.stack && project.stack.length > 0 && (
            <div className={css({ marginBottom: '24px' })}>
              <div className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'text-muted', marginBottom: '8px' })}>Stack</div>
              <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '8px' })}>
                {project.stack.map(s => (
                  <span key={s} className={css({
                    fontFamily: 'body',
                    fontSize: '12px',
                    letterSpacing: 'wider',
                    color: 'text-secondary',
                    padding: '4px 12px',
                    border: '1px solid',
                    borderColor: 'border',
                    borderRadius: 'sm',
                  })}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {(project.liveUrl || project.externalUrl) && (
            <a
              href={project.liveUrl || project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={css({
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '44px',
                padding: '8px 16px',
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'accent',
                border: '1px solid',
                borderColor: 'accent',
                borderRadius: 'sm',
                textDecoration: 'none',
                transition: 'background 0.15s, color 0.15s',
                _hover: { background: '{colors.sage.glow}' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              Visit Site ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={css({
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '44px',
                padding: '8px 16px',
                marginLeft: '8px',
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'text-muted',
                border: '1px solid',
                borderColor: 'border',
                borderRadius: 'sm',
                textDecoration: 'none',
                transition: 'background 0.15s',
                _hover: { background: 'bg-card' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              GitHub ↗
            </a>
          )}
        </div>

        {/* Approach */}
        {project.approach && (
          <div className={css({
            gridColumn: { base: '1', md: '1 / 8' },
          })}>
            <div className={css({ marginBottom: '16px' })}>
              <span className={css({ display: 'inline-block', width: '40px', borderTop: '1px solid', borderColor: 'border', marginBottom: '8px' })} />
              <div className={css({ fontFamily: 'body', fontSize: '10px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'text-muted', lineHeight: 'loose' })}>
                Approach
              </div>
            </div>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: 'normal',
              color: 'text-secondary',
              maxWidth: '560px',
              letterSpacing: 'wide',
            })}>
              {project.approach}
            </p>
          </div>
        )}

        {/* Outcome */}
        {project.outcome && (
          <div className={css({
            gridColumn: { base: '1', md: '1 / 8' },
          })}>
            <div className={css({ marginBottom: '16px' })}>
              <span className={css({ display: 'inline-block', width: '40px', borderTop: '1px solid', borderColor: 'border', marginBottom: '8px' })} />
              <div className={css({ fontFamily: 'body', fontSize: '10px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'text-muted', lineHeight: 'loose' })}>
                Outcome
              </div>
            </div>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: 'normal',
              color: 'text-secondary',
              maxWidth: '560px',
              letterSpacing: 'wide',
            })}>
              {project.outcome}
            </p>
          </div>
        )}

        {/* Description (for lightweight projects) */}
        {project.description && (
          <div className={css({
            gridColumn: { base: '1', md: '1 / 8' },
          })}>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: 'normal',
              color: 'text-secondary',
              maxWidth: '560px',
              letterSpacing: 'wide',
            })}>
              {project.description}
            </p>
          </div>
        )}
      </div>

      {/* Back + Footer */}
      <div className={css({ marginTop: '64px' })}>
        <a href="/" className={css({
          fontFamily: 'body',
          fontSize: '14px',
          color: 'accent',
          textDecoration: 'none',
          padding: '8px 0',
          minHeight: '44px',
          display: 'inline-flex',
          alignItems: 'center',
          _hover: { textDecoration: 'underline' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>
          ← All Work
        </a>
      </div>

      <footer className={css({
        marginTop: '48px',
        paddingTop: '24px',
        borderTop: '1px solid',
        borderColor: 'border',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      })}>
        <span className={css({
          fontFamily: 'body',
          fontSize: '12px',
          color: 'text-muted',
          letterSpacing: 'wider',
        })}>
          © 2026 Doug March
        </span>
        <a href="/archive" className={css({
          fontFamily: 'body',
          fontSize: '12px',
          color: 'text-muted',
          letterSpacing: 'wider',
          textDecoration: 'none',
          padding: '8px 4px',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          _hover: { color: 'text-secondary' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>
          Archive
        </a>
      </footer>
    </div>
  )
}