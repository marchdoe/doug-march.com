import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '64px 40px' })}>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 'bold',
          color: 'text',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
        })}>
          Project not found
        </h1>
        <a href="/" className={css({
          fontFamily: 'body',
          fontSize: '14px',
          color: 'accent',
          marginTop: '24px',
          display: 'inline-block',
          padding: '12px 0',
          _hover: { color: 'accentBright' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>
          ← Back to work
        </a>
      </div>
    )
  }

  return (
    <div className={css({
      display: 'grid',
      gridTemplateColumns: '2fr 3fr',
      gap: '16px',
      padding: '0 16px 16px 16px',
      minHeight: 'calc(100vh - 52px)',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        padding: '0 12px 12px 12px',
      },
    })}>
      {/* Hero — Left */}
      <div className={css({
        background: 'bgHero',
        padding: '64px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '60vh',
        '@media (max-width: 768px)': {
          padding: '48px 24px',
          minHeight: '40vh',
        },
      })}>
        <div className={css({
          fontFamily: 'body',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'textOnHeroMuted',
          marginBottom: '16px',
        })}>
          {project.type} · {project.year}
        </div>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: 'clamp(40px, 6vw, 84px)',
          fontWeight: 'bold',
          lineHeight: '0.88',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: 'textOnHero',
          marginBottom: '24px',
        })}>
          {project.title}
        </h1>
        {project.role && (
          <p className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'textOnHeroMuted',
            fontWeight: 'light',
          })}>
            {project.role}
          </p>
        )}
      </div>

      {/* Details — Right */}
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      })}>
        {/* Problem */}
        {project.problem && (
          <div className={css({
            background: 'bgCard',
            padding: '32px 28px',
            '@media (max-width: 768px)': { padding: '24px 20px' },
          })}>
            <div className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '16px',
            })}>
              PROBLEM
            </div>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'textSecondary',
              maxWidth: '60ch',
            })}>
              {project.problem}
            </p>
          </div>
        )}

        {/* Approach */}
        {project.approach && (
          <div className={css({
            background: 'bgCard',
            padding: '32px 28px',
            '@media (max-width: 768px)': { padding: '24px 20px' },
          })}>
            <div className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '16px',
            })}>
              APPROACH
            </div>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'textSecondary',
              maxWidth: '60ch',
            })}>
              {project.approach}
            </p>
          </div>
        )}

        {/* Outcome */}
        {project.outcome && (
          <div className={css({
            background: 'bgCard',
            padding: '32px 28px',
            '@media (max-width: 768px)': { padding: '24px 20px' },
          })}>
            <div className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '16px',
            })}>
              OUTCOME
            </div>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'textSecondary',
              maxWidth: '60ch',
            })}>
              {project.outcome}
            </p>
          </div>
        )}

        {/* Description (for experiments) */}
        {project.description && !project.problem && (
          <div className={css({
            background: 'bgCard',
            padding: '32px 28px',
            '@media (max-width: 768px)': { padding: '24px 20px' },
          })}>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'textSecondary',
              maxWidth: '60ch',
            })}>
              {project.description}
            </p>
          </div>
        )}

        {/* Stack */}
        {project.stack && project.stack.length > 0 && (
          <div className={css({
            background: 'bgCard',
            padding: '28px',
            '@media (max-width: 768px)': { padding: '24px 20px' },
          })}>
            <div className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '16px',
            })}>
              STACK
            </div>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '8px' })}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className={css({
                    fontFamily: 'body',
                    fontSize: '12px',
                    color: 'textSecondary',
                    letterSpacing: '0.05em',
                    padding: '6px 12px',
                    border: '1px solid',
                    borderColor: 'border',
                  })}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className={css({
          background: 'bg',
          border: '1px solid',
          borderColor: 'border',
          padding: '28px',
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          '@media (max-width: 768px)': { padding: '24px 20px' },
        })}>
          <a href="/" className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'accent',
            textDecoration: 'none',
            padding: '12px 0',
            _hover: { color: 'accentBright', textDecoration: 'underline' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}>
            ← All Work
          </a>
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'accent',
                textDecoration: 'none',
                padding: '12px 0',
                _hover: { color: 'accentBright', textDecoration: 'underline' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              Visit Site ↗
            </a>
          )}
          {project.liveUrl && !project.externalUrl && (
            <a
              href={project.liveUrl}
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'accent',
                textDecoration: 'none',
                padding: '12px 0',
                _hover: { color: 'accentBright', textDecoration: 'underline' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'accent',
                textDecoration: 'none',
                padding: '12px 0',
                _hover: { color: 'accentBright', textDecoration: 'underline' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}