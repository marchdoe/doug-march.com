import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { capabilities, timeline } from '../content/timeline'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const allWork = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
  ]

  return (
    <>
      {/* BAND 1 — Hero */}
      <section
        className={css({
          minHeight: '90vh',
          background: 'bg',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          '@media (max-width: 768px)': {
            minHeight: '80vh',
          },
        })}
      >
        <Sidebar />
        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 6vw',
            paddingBottom: '80px',
          })}
        >
          <h1
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              color: 'text',
              maxWidth: '1200px',
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none',
              },
            })}
          >
            What do dreams know
            <br />
            of boundaries?
          </h1>
          <p
            className={css({
              fontFamily: 'body',
              fontSize: 'clamp(12px, 1vw, 15px)',
              fontWeight: 'normal',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'accent',
              marginTop: '48px',
            })}
          >
            — Amelia Earhart, 1928
          </p>
        </div>
      </section>

      {/* BAND 2 — Selected Work */}
      <section
        className={css({
          background: 'bgCard',
          padding: '80px 6vw',
          minHeight: '50vh',
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'border',
            '@media (max-width: 900px)': {
              gridTemplateColumns: '1fr',
            },
          })}
        >
          {allWork.slice(0, 3).map((project) => (
            <a
              key={project.slug}
              href={project.featured && project.externalUrl ? project.externalUrl : `/work/${project.slug}`}
              className={css({
                display: 'block',
                padding: '40px 32px',
                background: 'bgCard',
                textDecoration: 'none',
                color: 'text',
                borderLeft: '3px solid transparent',
                transition: 'background 0.2s ease, border-color 0.2s ease',
                _hover: {
                  background: 'bgSubtle',
                  borderLeftColor: 'accent',
                },
                _focus: {
                  outline: '2px solid',
                  outlineColor: 'accent',
                  outlineOffset: '-2px',
                },
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                },
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '16px',
                })}
              >
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '12px',
                    letterSpacing: 'wider',
                    textTransform: 'uppercase',
                    color: 'textMuted',
                  })}
                >
                  {project.type}
                </span>
                <span
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '12px',
                    color: 'textMuted',
                  })}
                >
                  {project.year}
                </span>
              </div>
              <h3
                className={css({
                  fontFamily: 'display',
                  fontWeight: 'bold',
                  fontSize: 'clamp(22px, 2vw, 32px)',
                  lineHeight: 'snug',
                  marginBottom: '12px',
                })}
              >
                {project.title}
              </h3>
              {project.problem && (
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '15px',
                    lineHeight: 'normal',
                    color: 'textSecondary',
                    maxWidth: '45ch',
                  })}
                >
                  {project.problem}
                </p>
              )}
            </a>
          ))}
        </div>

        {/* Experiments row */}
        <div
          className={css({
            marginTop: '48px',
            borderTop: '1px solid',
            borderColor: 'border',
            paddingTop: '32px',
          })}
        >
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '20px',
            })}
          >
            Experiments
          </p>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
                gap: '16px',
              },
            })}
          >
            {experiments.map((exp) => (
              <a
                key={exp.slug}
                href={exp.externalUrl || `/work/${exp.slug}`}
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '12px 0',
                  textDecoration: 'none',
                  color: 'textSecondary',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  _hover: { color: 'accent' },
                  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                })}
              >
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '15px',
                    fontWeight: 'medium',
                  })}
                >
                  {exp.title}
                </span>
                <span
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '12px',
                    color: 'textMuted',
                    flexShrink: 0,
                    marginLeft: '16px',
                  })}
                >
                  {exp.type} · {exp.year}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BAND 3 — Signals Strip (crimson inversion) */}
      <section
        className={css({
          background: 'bgInverse',
          padding: '0 6vw',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '32px 6vw',
            gap: '24px',
            minHeight: 'auto',
          },
        })}
      >
        {/* Golf */}
        <div
          className={css({
            flexShrink: 0,
            marginRight: '6vw',
            '@media (max-width: 768px)': { marginRight: 0 },
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'textInverse',
              opacity: 0.7,
              display: 'block',
              marginBottom: '6px',
            })}
          >
            Memorial
          </span>
          <span
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: 'clamp(20px, 2vw, 28px)',
              color: 'textInverse',
              fontVariantNumeric: 'tabular-nums',
              whiteSpace: 'nowrap',
            })}
          >
            Gerard −9 · Poston −9 · Burns −8
          </span>
        </div>

        {/* Tigers */}
        <div
          className={css({
            flexShrink: 0,
            marginRight: '6vw',
            '@media (max-width: 768px)': { marginRight: 0 },
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'textInverse',
              opacity: 0.7,
              display: 'block',
              marginBottom: '6px',
            })}
          >
            Tigers ↓
          </span>
          <span
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: 'clamp(18px, 1.8vw, 24px)',
              color: 'textInverse',
              opacity: 0.6,
            })}
          >
            DET 0 · OPP 4
          </span>
        </div>

        {/* Moon */}
        <div
          className={css({
            flexShrink: 0,
            marginRight: '6vw',
            '@media (max-width: 768px)': { marginRight: 0 },
          })}
        >
          <span
            className={css({
              fontSize: '32px',
              color: 'textInverse',
              display: 'block',
              lineHeight: '1',
            })}
          >
            ◑
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textInverse',
              opacity: 0.7,
              marginTop: '4px',
              display: 'block',
            })}
          >
            Last Quarter · 46%
          </span>
        </div>

        {/* Awwwards SOTD */}
        <div
          className={css({
            flexShrink: 0,
            marginRight: '6vw',
            '@media (max-width: 768px)': { marginRight: 0 },
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '13px',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              color: 'textInverse',
              fontStyle: 'italic',
              opacity: 0.8,
            })}
          >
            SOTD: 21 Hrs On The Moon
          </span>
        </div>

        {/* Earhart context */}
        <div
          className={css({
            flexShrink: 0,
            '@media (max-width: 768px)': { marginRight: 0 },
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '13px',
              color: 'textInverse',
              fontStyle: 'italic',
              opacity: 0.7,
              whiteSpace: 'nowrap',
            })}
          >
            "Is it reckless? Maybe."
          </span>
        </div>
      </section>

      {/* BAND 4 — Capabilities & Timeline */}
      <section
        className={css({
          background: 'bg',
          padding: '80px 6vw 120px',
          minHeight: '50vh',
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '6vw',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              gap: '48px',
            },
          })}
        >
          {/* Capabilities */}
          <div>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                color: 'textMuted',
                marginBottom: '24px',
              })}
            >
              Capabilities
            </p>
            <div
              className={css({
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px 24px',
              })}
            >
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className={css({
                    fontFamily: 'body',
                    fontSize: '15px',
                    lineHeight: 'normal',
                    color: 'textSecondary',
                    padding: '8px 0',
                    borderBottom: '1px solid',
                    borderColor: 'border',
                  })}
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline highlights */}
          <div>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                color: 'textMuted',
                marginBottom: '24px',
              })}
            >
              Timeline
            </p>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              })}
            >
              {timeline.slice(0, 5).map((entry, i) => (
                <div
                  key={i}
                  className={css({
                    paddingBottom: '16px',
                    borderBottom: '1px solid',
                    borderColor: 'border',
                  })}
                >
                  <span
                    className={css({
                      fontFamily: 'mono',
                      fontSize: '12px',
                      color: 'textMuted',
                      display: 'block',
                      marginBottom: '4px',
                    })}
                  >
                    {entry.year}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '15px',
                      fontWeight: 'medium',
                      color: 'text',
                    })}
                  >
                    {entry.role}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '14px',
                      color: 'textMuted',
                      marginLeft: '8px',
                    })}
                  >
                    {entry.company}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer band */}
      <footer
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          padding: '24px 6vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-start',
          },
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: 'textMuted',
          })}
        >
          Doug March · Product Designer & Developer
        </span>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: 'textMuted',
            textDecoration: 'none',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Archive
        </a>
      </footer>
    </>
  )
}