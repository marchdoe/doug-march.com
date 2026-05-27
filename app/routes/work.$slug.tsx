import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '64px 8vw' })}>
        <h1 className={css({ fontFamily: 'display', fontSize: '32px', fontWeight: 'bold', color: '{colors.ink.50}' })}>
          Project not found
        </h1>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'accent',
            marginTop: '16px',
            display: 'inline-block',
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          ← Back
        </a>
      </div>
    )
  }

  return (
    <div className={css({ padding: '64px 8vw 80px', maxWidth: '1000px' })}>
      {/* Header */}
      <div className={css({ marginBottom: '64px' })}>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '{colors.ink.500}',
            marginBottom: '16px',
          })}
        >
          {project.type} · {project.year}
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: '{colors.ink.50}',
            marginBottom: '24px',
          })}
        >
          {project.title}
        </h1>
        {project.role && (
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              color: 'accent',
              marginBottom: '12px',
            })}
          >
            {project.role}
          </p>
        )}
      </div>

      {/* Content sections */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '48px' })}>
        {project.problem && (
          <section>
            <h2
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                fontWeight: '400',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '{colors.ink.500}',
                marginBottom: '16px',
              })}
            >
              Problem
            </h2>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: '{colors.ink.300}',
                maxWidth: '65ch',
              })}
            >
              {project.problem}
            </p>
          </section>
        )}

        {project.approach && (
          <section>
            <h2
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                fontWeight: '400',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '{colors.ink.500}',
                marginBottom: '16px',
              })}
            >
              Approach
            </h2>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: '{colors.ink.300}',
                maxWidth: '65ch',
              })}
            >
              {project.approach}
            </p>
          </section>
        )}

        {project.outcome && (
          <section>
            <h2
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                fontWeight: '400',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '{colors.ink.500}',
                marginBottom: '16px',
              })}
            >
              Outcome
            </h2>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: '{colors.ink.300}',
                maxWidth: '65ch',
              })}
            >
              {project.outcome}
            </p>
          </section>
        )}

        {project.description && (
          <section>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: '{colors.ink.300}',
                maxWidth: '65ch',
              })}
            >
              {project.description}
            </p>
          </section>
        )}

        {project.stack && project.stack.length > 0 && (
          <section>
            <h2
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                fontWeight: '400',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '{colors.ink.500}',
                marginBottom: '16px',
              })}
            >
              Stack
            </h2>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' })}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '13px',
                    color: '{colors.ink.400}',
                  })}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Links */}
        <div className={css({ display: 'flex', gap: '24px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid', borderColor: 'border' })}>
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'accent',
                textDecoration: 'none',
                padding: '10px 0',
                _hover: { color: '{colors.ink.50}' },
                transition: 'color 200ms ease',
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
              })}
            >
              Visit Site ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'accent',
                textDecoration: 'none',
                padding: '10px 0',
                _hover: { color: '{colors.ink.50}' },
                transition: 'color 200ms ease',
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
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
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'accent',
                textDecoration: 'none',
                padding: '10px 0',
                _hover: { color: '{colors.ink.50}' },
                transition: 'color 200ms ease',
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
              })}
            >
              GitHub ↗
            </a>
          )}
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '{colors.ink.500}',
              textDecoration: 'none',
              padding: '10px 0',
              _hover: { color: '{colors.ink.50}' },
              transition: 'color 200ms ease',
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            ← Back
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={css({
          marginTop: '96px',
          borderTop: '1px solid',
          borderColor: 'border',
          paddingTop: '24px',
          fontFamily: 'body',
          fontSize: '12px',
          color: '{colors.ink.600}',
        })}
      >
        <a
          href="/archive"
          className={css({
            color: '{colors.ink.600}',
            textDecoration: 'none',
            _hover: { color: '{colors.ink.400}' },
            transition: 'color 200ms ease',
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Archive
        </a>
      </footer>
    </div>
  )
}