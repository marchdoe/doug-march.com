import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects, featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main
        className={css({
          minHeight: '100vh',
          background: 'bg',
          paddingTop: '96px',
          paddingBottom: '96px',
          paddingX: '6vw',
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: 'warm.400',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          })}
        >
          404 · Not Filed
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: '800',
            fontSize: 'clamp(56px, 18vw, 240px)',
            lineHeight: '0.88',
            letterSpacing: '-0.02em',
            color: 'hero',
            textTransform: 'uppercase',
          })}
        >
          Lost
        </h1>
        <p
          className={css({
            marginTop: '24px',
            fontFamily: 'body',
            fontSize: '16px',
            lineHeight: '1.5',
            color: 'textSecondary',
            maxWidth: '60ch',
          })}
        >
          No project filed under <code className={css({ color: 'accent' })}>/{slug}</code>.
          Try the index of work below.
        </p>
        <ul
          className={css({
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          })}
        >
          {projects.map((p) => (
            <li key={p.slug}>
              <a
                href={`/work/${p.slug}`}
                className={css({
                  fontFamily: 'display',
                  fontWeight: '700',
                  fontSize: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: 'text',
                  textDecoration: 'none',
                  paddingY: '8px',
                  display: 'inline-block',
                  _hover: { color: 'accent' },
                })}
              >
                {p.title}
              </a>
            </li>
          ))}
        </ul>
      </main>
    )
  }

  const isFeatured = featuredProject?.slug === project.slug
  const otherProjects = [...selectedWork, ...experiments].filter((p) => p.slug !== project.slug)

  return (
    <main
      className={css({
        position: 'relative',
        minHeight: '100vh',
        background: 'bg',
        paddingTop: { base: '88px', md: '96px' },
        paddingBottom: { base: '88px', md: '104px' },
        overflow: 'hidden',
      })}
    >
      {/* Eyebrow line — type · year · status */}
      <div
        className={css({
          paddingX: '6vw',
          marginBottom: { base: '20px', md: '28px' },
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontFamily: 'body',
          fontSize: '12px',
          color: 'warm.400',
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
        })}
      >
        <span>
          {project.type} · {project.year}
        </span>
        <span>
          {isFeatured ? 'Featured' : project.depth === 'lightweight' ? 'Experiment' : 'Selected work'}
          {' · '}
          <a
            href="/"
            className={css({
              color: 'warm.400',
              textDecoration: 'none',
              _hover: { color: 'accent' },
            })}
          >
            ← Index
          </a>
        </span>
      </div>

      {/* Title — single dominant word/phrase, cascading split if multi-word */}
      <header
        className={css({
          paddingX: '6vw',
          marginBottom: { base: '40px', md: '72px' },
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: '800',
            color: 'hero',
            fontSize: 'clamp(72px, 20vw, 300px)',
            lineHeight: '0.88',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: '0',
            wordBreak: 'break-word',
          })}
        >
          {project.title}
        </h1>
        {project.role && (
          <p
            className={css({
              marginTop: { base: '20px', md: '28px' },
              fontFamily: 'display',
              fontWeight: '300',
              fontSize: 'clamp(20px, 2.4vw, 30px)',
              lineHeight: '1.2',
              color: 'textSecondary',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              maxWidth: '40ch',
            })}
          >
            <span className={css({ color: 'accent' })}>Role —</span> {project.role}
          </p>
        )}
      </header>

      {/* Body — labeled sections, fixed-width label column */}
      <div
        className={css({
          paddingX: '6vw',
          display: 'flex',
          flexDirection: 'column',
          gap: { base: '40px', md: '56px' },
        })}
      >
        {project.problem && (
          <Section label="Problem">
            <p
              className={css({
                fontFamily: 'display',
                fontWeight: '500',
                fontSize: 'clamp(22px, 3.2vw, 38px)',
                lineHeight: '1.2',
                color: 'text',
                letterSpacing: '-0.005em',
                maxWidth: '32ch',
              })}
            >
              {project.problem}
            </p>
          </Section>
        )}

        {project.approach && (
          <Section label="Approach">
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '17px',
                lineHeight: '1.6',
                color: 'textSecondary',
                maxWidth: '65ch',
              })}
            >
              {project.approach}
            </p>
          </Section>
        )}

        {project.outcome && (
          <Section label="Outcome">
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '17px',
                lineHeight: '1.6',
                color: 'textSecondary',
                maxWidth: '65ch',
              })}
            >
              {project.outcome}
            </p>
          </Section>
        )}

        {project.description && !project.approach && (
          <Section label="Notes">
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '17px',
                lineHeight: '1.6',
                color: 'textSecondary',
                maxWidth: '65ch',
              })}
            >
              {project.description}
            </p>
          </Section>
        )}

        {project.stack && project.stack.length > 0 && (
          <Section label="Stack">
            <ul
              className={css({
                display: 'flex',
                flexWrap: 'wrap',
                gap: { base: '8px', md: '12px' },
                listStyle: 'none',
                margin: '0',
                padding: '0',
              })}
            >
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className={css({
                    fontFamily: 'body',
                    fontSize: '13px',
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: 'textSecondary',
                    border: '1px solid token(colors.border)',
                    paddingY: '8px',
                    paddingX: '14px',
                  })}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {(project.externalUrl || project.liveUrl || project.githubUrl) && (
          <Section label="Visit">
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              })}
            >
              {(project.externalUrl || project.liveUrl) && (
                <a
                  href={project.externalUrl || project.liveUrl}
                  className={css({
                    fontFamily: 'display',
                    fontWeight: '700',
                    fontSize: 'clamp(22px, 3vw, 36px)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.01em',
                    color: 'accent',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    paddingY: '4px',
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    _hover: { color: 'accentDark', textDecoration: 'underline' },
                  })}
                >
                  <span>{(project.externalUrl || project.liveUrl)?.replace(/^https?:\/\//, '')}</span>
                  <span aria-hidden>↗</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'textSecondary',
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    paddingY: '8px',
                    _hover: { color: 'accent' },
                  })}
                >
                  {project.githubUrl.replace(/^https?:\/\//, '')} ↗
                </a>
              )}
            </div>
          </Section>
        )}
      </div>

      {/* Foot — sibling work as compact list */}
      <nav
        aria-label="Other work"
        className={css({
          marginTop: { base: '72px', md: '112px' },
          paddingX: '6vw',
          paddingTop: { base: '32px', md: '40px' },
          borderTop: '1px solid token(colors.border)',
        })}
      >
        <h2
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: 'textMuted',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          })}
        >
          Adjacent files
        </h2>
        <ul
          className={css({
            display: 'flex',
            flexDirection: 'column',
            margin: '0',
            padding: '0',
            listStyle: 'none',
          })}
        >
          {otherProjects.map((p) => (
            <li
              key={p.slug}
              className={css({
                borderBottom: '1px solid token(colors.border)',
                _last: { borderBottom: 'none' },
              })}
            >
              <a
                href={`/work/${p.slug}`}
                className={css({
                  display: 'grid',
                  gridTemplateColumns: { base: '60px 1fr auto', md: '80px 1fr 1fr auto' },
                  alignItems: 'baseline',
                  gap: '16px',
                  paddingY: '18px',
                  textDecoration: 'none',
                  color: 'text',
                  transition: 'color 0.15s ease',
                  _hover: { color: 'accent' },
                })}
              >
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '12px',
                    color: 'textMuted',
                    letterSpacing: '0.10em',
                    fontVariantNumeric: 'tabular-nums',
                  })}
                >
                  {p.year}
                </span>
                <span
                  className={css({
                    fontFamily: 'display',
                    fontWeight: '700',
                    fontSize: { base: '22px', md: '28px' },
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    lineHeight: '1.05',
                  })}
                >
                  {p.title}
                </span>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '12px',
                    color: 'textMuted',
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    display: { base: 'none', md: 'inline' },
                  })}
                >
                  {p.type}
                </span>
                <span className={css({ color: 'accent', fontSize: '14px' })} aria-hidden>
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section
      className={css({
        display: 'grid',
        gridTemplateColumns: { base: '1fr', md: '160px 1fr' },
        gap: { base: '12px', md: '32px' },
        alignItems: 'baseline',
      })}
    >
      <h2
        className={css({
          fontFamily: 'body',
          fontSize: '12px',
          color: 'textMuted',
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          paddingTop: { base: '0', md: '8px' },
          margin: '0',
        })}
      >
        {label}
      </h2>
      <div className={css({ minWidth: 0 })}>{children}</div>
    </section>
  )
}