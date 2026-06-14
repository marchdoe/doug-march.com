import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const allWork = [...selectedWork, ...experiments]

  return (
    <>
      {/* Band 1 — Hero */}
      <section
        className={css({
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: 'bgHero',
          padding: '96px 6vw',
          position: 'relative',
        })}
      >
        <div className={css({ textAlign: 'center' })}>
          <h1
            className={css({
              fontFamily: 'display',
              fontSize: 'clamp(60px, 12vw, 172px)',
              fontWeight: 'bold',
              lineHeight: 'tight',
              letterSpacing: '-0.03em',
              color: 'bgHeroText',
              whiteSpace: 'nowrap',
            })}
          >
            BAN THE NOISE.
          </h1>
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              letterSpacing: '0.18em',
              color: 'bgHeroText',
              marginTop: '40px',
              textTransform: 'uppercase',
            })}
          >
            HACKER NEWS · JUNE 14 · 829 PTS
          </p>
        </div>
      </section>

      {/* Band 2 — Signal Strip */}
      <section
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          alignItems: 'center',
          height: '108px',
          padding: '0 6vw',
          background: 'bgCard',
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'border',
          '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
            height: 'auto',
            padding: '16px 6vw',
            gap: '0',
          },
        })}
      >
        <SignalCell label="NEW MOON" value="CYCLE 29 ●" dimDot />
        <SignalCell label="DAYLIGHT" value="14.7 HRS" />
        <SignalCell label="RBC OPEN" value="SUBER −13" />
        <SignalCell label="TIGERS" value="L 1–3" />
        <SignalCell label="MUSIC" value="RADIOHEAD · GBV" />
        <SignalCell label="JUNETEENTH" value="5 DAYS" highlight />
      </section>

      {/* Band 3 — Featured + Selected Work */}
      <section
        id="work"
        className={css({
          background: 'bg',
          padding: '96px 6vw',
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'medium',
            letterSpacing: '0.18em',
            color: 'textMuted',
            textTransform: 'uppercase',
            marginBottom: '48px',
          })}
        >
          SELECTED WORK
        </p>

        {/* Featured Project */}
        {featuredProject && (
          <div
            className={css({
              marginBottom: '2px',
              padding: '40px 32px',
              background: 'bgCard',
              borderTop: '1px solid',
              borderColor: 'border',
              transition: 'all 120ms ease-out',
              _hover: {
                borderColor: 'accent',
                background: 'bgSubtle',
              },
              '@media (max-width: 768px)': {
                padding: '24px 16px',
              },
            })}
          >
            <a
              href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
              className={css({
                textDecoration: 'none',
                display: 'block',
                _hover: { textDecoration: 'none' },
                _focus: {
                  outline: '2px solid',
                  outlineColor: 'accent',
                  outlineOffset: '4px',
                },
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                  gap: '8px',
                })}
              >
                <h2
                  className={css({
                    fontFamily: 'display',
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    fontWeight: 'bold',
                    lineHeight: 'snug',
                    color: 'text',
                    transition: 'color 120ms ease-out',
                  })}
                >
                  {featuredProject.title}
                </h2>
                <div
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  })}
                >
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      color: 'accent',
                      textTransform: 'uppercase',
                      fontWeight: 'medium',
                      padding: '4px 8px',
                      border: '1px solid',
                      borderColor: 'borderAccent',
                      borderRadius: 'sm',
                    })}
                  >
                    FEATURED
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '14px',
                      color: 'textMuted',
                    })}
                  >
                    {featuredProject.year}
                  </span>
                </div>
              </div>
              {featuredProject.problem && (
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '16px',
                    lineHeight: 'normal',
                    color: 'textSecondary',
                    maxWidth: '65ch',
                    letterSpacing: '0.01em',
                  })}
                >
                  {featuredProject.problem}
                </p>
              )}
            </a>
          </div>
        )}

        {/* Work Grid */}
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2px',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
            },
          })}
        >
          {selectedWork.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
          {experiments.map((project) => (
            <WorkCard key={project.slug} project={project} isExperiment />
          ))}
        </div>
      </section>

      {/* Band 4 — About Preview / Capabilities */}
      <section
        className={css({
          display: 'grid',
          gridTemplateColumns: '55fr 45fr',
          minHeight: '50vh',
          background: 'bgCard',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
          },
        })}
      >
        <div
          className={css({
            padding: '80px 6vw',
            borderRight: '1px solid',
            borderColor: 'border',
            '@media (max-width: 768px)': {
              borderRight: 'none',
              borderBottom: '1px solid',
              borderColor: 'border',
              padding: '48px 6vw',
            },
          })}
        >
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              letterSpacing: '0.18em',
              color: 'textMuted',
              textTransform: 'uppercase',
              marginBottom: '32px',
            })}
          >
            DOUG MARCH
          </p>
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '18px',
              lineHeight: '1.65',
              color: 'textSecondary',
              maxWidth: '50ch',
              letterSpacing: '0.01em',
              marginBottom: '40px',
            })}
          >
            Product Designer & Developer building tools at the intersection of
            design and engineering. Focused on clarity, precision, and eliminating
            noise from every surface.
          </p>
          <a
            href="/about"
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              fontWeight: 'medium',
              color: 'accent',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              padding: '12px 0',
              _hover: { textDecoration: 'underline' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '4px',
              },
            })}
          >
            FULL BIO →
          </a>
        </div>
        <div
          className={css({
            padding: '80px 6vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            '@media (max-width: 768px)': {
              padding: '48px 6vw',
            },
          })}
        >
          <div
            className={css({
              borderLeft: '2px solid',
              borderColor: 'accent',
              paddingLeft: '24px',
              marginBottom: '48px',
            })}
          >
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '18px',
                fontStyle: 'italic',
                lineHeight: '1.6',
                color: 'accentLight',
                maxWidth: '40ch',
              })}
            >
              Do not be afraid of making mistakes, for there is no other way of
              learning how to live!
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textMuted',
                marginTop: '16px',
              })}
            >
              — Alfred Adler
            </p>
          </div>
        </div>
      </section>

      {/* Band 5 — Footer */}
      <footer
        className={css({
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 6vw',
          background: 'bg',
          borderTop: '1px solid',
          borderColor: 'border',
          flexWrap: 'wrap',
          gap: '8px',
          '@media (max-width: 768px)': {
            height: 'auto',
            padding: '16px 6vw',
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: 'textMuted',
            })}
          >
            © 2026 DOUG MARCH
          </span>
          <a
            href="/archive"
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: 'textMuted',
              textDecoration: 'none',
              _hover: { color: 'textSecondary', textDecoration: 'underline' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '4px',
              },
            })}
          >
            ARCHIVE
          </a>
        </div>
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'textMuted',
          })}
        >
          JUNETEENTH IN 5 · FATHER'S DAY IN 7
        </span>
      </footer>
    </>
  )
}

function SignalCell({
  label,
  value,
  highlight,
  dimDot,
}: {
  label: string
  value: string
  highlight?: boolean
  dimDot?: boolean
}) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '16px 12px',
        borderRight: '1px solid',
        borderColor: 'border',
        _last: { borderRight: 'none' },
        '@media (max-width: 768px)': {
          padding: '12px 8px',
        },
      })}
    >
      <span
        className={css({
          fontFamily: 'body',
          fontSize: '10px',
          fontWeight: 'medium',
          letterSpacing: '0.18em',
          color: 'textMuted',
          textTransform: 'uppercase',
        })}
      >
        {label}
      </span>
      <span
        className={css({
          fontFamily: 'body',
          fontSize: 'clamp(13px, 1.2vw, 17px)',
          fontWeight: 'medium',
          color: highlight ? 'accentLight' : 'text',
          letterSpacing: '0em',
        })}
      >
        {value}
      </span>
    </div>
  )
}

function WorkCard({
  project,
  isExperiment,
}: {
  project: {
    slug: string
    title: string
    type: string
    year: number
    externalUrl?: string
    description?: string
    problem?: string
  }
  isExperiment?: boolean
}) {
  const href = isExperiment
    ? `/work/${project.slug}`
    : project.externalUrl || `/work/${project.slug}`

  return (
    <a
      href={href}
      className={css({
        display: 'block',
        padding: '32px',
        background: 'bgCard',
        borderTop: '1px solid',
        borderColor: 'border',
        textDecoration: 'none',
        transition: 'all 120ms ease-out',
        _hover: {
          borderColor: 'accent',
          background: 'bgSubtle',
          textDecoration: 'none',
          '& h3': { color: 'accent' },
        },
        _focus: {
          outline: '2px solid',
          outlineColor: 'accent',
          outlineOffset: '-2px',
        },
        '@media (max-width: 768px)': {
          padding: '24px 16px',
        },
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '8px',
          gap: '8px',
        })}
      >
        <h3
          className={css({
            fontFamily: 'heading',
            fontSize: 'clamp(18px, 2vw, 24px)',
            fontWeight: 'semibold',
            lineHeight: 'snug',
            color: 'text',
            transition: 'color 120ms ease-out',
          })}
        >
          {project.title}
        </h3>
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: 'textMuted',
            flexShrink: 0,
          })}
        >
          {project.year}
        </span>
      </div>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: '0.1em',
            color: 'textMuted',
            textTransform: 'uppercase',
          })}
        >
          {project.type}
        </span>
        {isExperiment && (
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: '0.14em',
              color: 'textMuted',
              textTransform: 'uppercase',
              padding: '2px 6px',
              border: '1px solid',
              borderColor: 'border',
              borderRadius: 'sm',
            })}
          >
            EXPERIMENT
          </span>
        )}
      </div>
    </a>
  )
}