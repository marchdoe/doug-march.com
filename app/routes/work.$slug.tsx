import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'
import logoSvg from '../assets/logo.svg'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '96px 6vw' })}>
        <h1 className={css({ fontFamily: 'display', fontSize: '2rem', color: 'text' })}>Project not found</h1>
        <a href="/" className={css({ color: 'accent', fontSize: '1rem', marginTop: '16px', display: 'inline-block', padding: '8px 0', minHeight: '44px' })}>
          ← Back home
        </a>
      </div>
    )
  }

  return (
    <>
      {/* Nav */}
      <nav
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 6vw',
          background: 'bg',
          borderBottom: '1px solid {colors.forest.700}',
        })}
      >
        <a
          href="/"
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'text',
            _focus: { outline: '2px solid {colors.green.400}', outlineOffset: '4px', borderRadius: 'sm' },
          })}
        >
          <img src={logoSvg} alt="Doug March logo" className={css({ width: '28px', height: '28px' })} />
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'semibold',
              fontSize: '0.875rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            })}
          >
            Doug March
          </span>
        </a>
        <div className={css({ display: 'flex', gap: '32px' })}>
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontSize: '0.8125rem',
              fontWeight: 'medium',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'textSecondary',
              textDecoration: 'none',
              padding: '8px 4px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              _hover: { color: 'text' },
              _focus: { outline: '2px solid {colors.green.400}', outlineOffset: '4px', borderRadius: 'sm' },
            })}
          >
            Work
          </a>
          <a
            href="/about"
            className={css({
              fontFamily: 'body',
              fontSize: '0.8125rem',
              fontWeight: 'medium',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'textSecondary',
              textDecoration: 'none',
              padding: '8px 4px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              _hover: { color: 'text' },
              _focus: { outline: '2px solid {colors.green.400}', outlineOffset: '4px', borderRadius: 'sm' },
            })}
          >
            About
          </a>
        </div>
      </nav>

      {/* Project header band */}
      <section
        className={css({
          background: 'bgHero',
          padding: '80px 6vw',
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '0.8125rem',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'textInverse',
            opacity: '0.6',
            display: 'block',
            marginBottom: '16px',
          })}
        >
          {project.type} · {project.year}
        </span>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 'bold',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'textInverse',
            textTransform: 'uppercase',
          })}
        >
          {project.title}
        </h1>
      </section>

      {/* Detail band */}
      <section
        className={css({
          background: 'bg',
          padding: '80px 6vw',
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '48px',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              gap: '32px',
            },
          })}
        >
          {/* Sidebar meta */}
          <div>
            {project.role && (
              <div className={css({ marginBottom: '24px' })}>
                <span className={css({ fontFamily: 'body', fontSize: '0.75rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'textMuted', display: 'block', marginBottom: '4px' })}>
                  Role
                </span>
                <span className={css({ fontFamily: 'body', fontSize: '1rem', color: 'text' })}>
                  {project.role}
                </span>
              </div>
            )}
            {project.stack && project.stack.length > 0 && (
              <div className={css({ marginBottom: '24px' })}>
                <span className={css({ fontFamily: 'body', fontSize: '0.75rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'textMuted', display: 'block', marginBottom: '8px' })}>
                  Stack
                </span>
                <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '6px' })}>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={css({
                        fontFamily: 'mono',
                        fontSize: '0.8125rem',
                        color: 'textSecondary',
                        padding: '4px 8px',
                        border: '1px solid {colors.forest.700}',
                        borderRadius: 'sm',
                      })}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                className={css({
                  fontFamily: 'body',
                  fontSize: '0.875rem',
                  color: 'accent',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 0',
                  minHeight: '44px',
                  _hover: { textDecoration: 'underline' },
                  _focus: { outline: '2px solid {colors.green.400}', outlineOffset: '4px', borderRadius: 'sm' },
                })}
              >
                Visit ↗
              </a>
            )}
            {project.liveUrl && !project.externalUrl && (
              <a
                href={project.liveUrl}
                className={css({
                  fontFamily: 'body',
                  fontSize: '0.875rem',
                  color: 'accent',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 0',
                  minHeight: '44px',
                  _hover: { textDecoration: 'underline' },
                  _focus: { outline: '2px solid {colors.green.400}', outlineOffset: '4px', borderRadius: 'sm' },
                })}
              >
                Live site ↗
              </a>
            )}
          </div>

          {/* Main content */}
          <div>
            {project.problem && (
              <div className={css({ marginBottom: '40px' })}>
                <span className={css({ fontFamily: 'body', fontSize: '0.75rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'textMuted', display: 'block', marginBottom: '12px' })}>
                  Problem
                </span>
                <p className={css({ fontFamily: 'body', fontSize: '1.0625rem', lineHeight: 'normal', color: 'text', maxWidth: '60ch' })}>
                  {project.problem}
                </p>
              </div>
            )}
            {project.approach && (
              <div className={css({ marginBottom: '40px' })}>
                <span className={css({ fontFamily: 'body', fontSize: '0.75rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'textMuted', display: 'block', marginBottom: '12px' })}>
                  Approach
                </span>
                <p className={css({ fontFamily: 'body', fontSize: '1.0625rem', lineHeight: 'normal', color: 'text', maxWidth: '60ch' })}>
                  {project.approach}
                </p>
              </div>
            )}
            {project.outcome && (
              <div className={css({ marginBottom: '40px' })}>
                <span className={css({ fontFamily: 'body', fontSize: '0.75rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'textMuted', display: 'block', marginBottom: '12px' })}>
                  Outcome
                </span>
                <p className={css({ fontFamily: 'body', fontSize: '1.0625rem', lineHeight: 'normal', color: 'text', maxWidth: '60ch' })}>
                  {project.outcome}
                </p>
              </div>
            )}
            {project.description && !project.problem && (
              <p className={css({ fontFamily: 'body', fontSize: '1.0625rem', lineHeight: 'normal', color: 'text', maxWidth: '60ch' })}>
                {project.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Back link */}
      <div
        className={css({
          background: 'bg',
          padding: '0 6vw 64px',
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '0.875rem',
            color: 'accent',
            padding: '12px 0',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            _hover: { textDecoration: 'underline' },
            _focus: { outline: '2px solid {colors.green.400}', outlineOffset: '4px', borderRadius: 'sm' },
          })}
        >
          ← All Work
        </a>
      </div>

      {/* Footer */}
      <footer
        className={css({
          background: 'bg',
          padding: '32px 6vw',
          borderTop: '1px solid {colors.forest.700}',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        })}
      >
        <span className={css({ fontFamily: 'body', fontSize: '0.8125rem', color: 'textMuted' })}>
          © 2026 Doug March
        </span>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '0.8125rem',
            color: 'textMuted',
            textDecoration: 'none',
            padding: '8px 0',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid {colors.green.400}', outlineOffset: '4px', borderRadius: 'sm' },
          })}
        >
          Archive
        </a>
      </footer>
    </>
  )
}