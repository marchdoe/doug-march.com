import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { timeline, capabilities } from '../content/timeline'

export const Route = createFileRoute('/')({ component: HomePage })

function DotLeader() {
  return (
    <span
      className={css({
        flex: '1',
        borderBottom: '1px dotted',
        borderColor: '{colors.ink.600}',
        margin: '0 8px',
        minWidth: '16px',
        alignSelf: 'flex-end',
        marginBottom: '4px',
      })}
      aria-hidden="true"
    />
  )
}

function HomePage() {
  const allWork = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
    ...experiments,
  ]

  const signals = [
    { label: 'AN AI MODEL DISPROVES', meta: 'HN #1' },
    { label: '3,800 REPOS BREACHED', meta: 'SECURITY' },
    { label: 'DETROIT TIGERS', meta: '2–3 L' },
    { label: 'CJ CUP BYRON NELSON', meta: 'SCHEDULED' },
    { label: 'GBV · MY MORNING JACKET', meta: 'LISTENING' },
    { label: 'WAXING CRESCENT', meta: 'DAY 5.49' },
    { label: '14.3H DAYLIGHT', meta: 'SPRING' },
    { label: 'MEMORIAL DAY', meta: 'T–4 DAYS' },
  ]

  return (
    <>
      {/* Hero Zone */}
      <section
        className={css({
          paddingTop: '48px',
          paddingBottom: '32px',
          minHeight: '28vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 8.5vw, 122px)',
            lineHeight: 'tight',
            letterSpacing: '0.02em',
            color: 'text',
            textTransform: 'uppercase',
            margin: '0',
            padding: '0',
          })}
        >
          EXCESSIVE KINDNESS
          <br />
          ELIMINATES RESPECT
          <span className={css({ color: 'accent' })}>.</span>
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.14em',
            color: 'accent',
            textTransform: 'uppercase',
            marginTop: '16px',
            textAlign: 'right',
            maxWidth: 'clamp(300px, 60vw, 800px)',
          })}
        >
          — EURIPIDES · 484–406 BC
        </p>
      </section>

      {/* Catalog Section */}
      <section
        className={css({
          borderTop: '1px solid',
          borderColor: 'borderAccent',
        })}
      >
        {/* Column Headers */}
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '0',
            md: {
              gridTemplateColumns: '44fr 31fr 25fr',
            },
          })}
        >
          {/* Column 1: Selected Work */}
          <div
            className={css({
              borderRight: 'none',
              md: {
                borderRight: '1px solid',
                borderColor: 'border',
              },
              paddingRight: '0',
              md: { paddingRight: '16px' },
            })}
          >
            <div
              className={css({
                fontFamily: 'body',
                fontSize: '11px',
                fontWeight: 'medium',
                letterSpacing: 'widest',
                color: 'accent',
                textTransform: 'uppercase',
                padding: '12px 0',
                borderBottom: '1px solid',
                borderColor: 'border',
              })}
            >
              SELECTED WORK
            </div>
            {allWork.map((project, i) => {
              const num = String(i + 1).padStart(2, '0')
              const href = project.depth === 'full'
                ? `/work/${project.slug}`
                : project.externalUrl || `/work/${project.slug}`
              return (
                <a
                  key={project.slug}
                  href={href}
                  className={css({
                    display: 'flex',
                    alignItems: 'baseline',
                    padding: '10px 0',
                    borderBottom: '0.5px solid',
                    borderColor: 'border',
                    textDecoration: 'none',
                    color: 'text',
                    transition: 'color 0.15s ease',
                    _hover: {
                      color: 'accent',
                      textDecoration: 'underline',
                      textDecorationColor: 'accent',
                    },
                    _focus: {
                      outline: '2px solid',
                      outlineColor: 'accent',
                      outlineOffset: '2px',
                    },
                  })}
                >
                  <span
                    className={css({
                      fontFamily: 'mono',
                      fontSize: '12px',
                      color: 'textMuted',
                      fontVariantNumeric: 'tabular-nums',
                      marginRight: '8px',
                      flexShrink: 0,
                    })}
                  >
                    {num}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '14px',
                      fontWeight: 'normal',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    })}
                  >
                    {project.title}
                  </span>
                  <DotLeader />
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '12px',
                      color: 'textSecondary',
                      letterSpacing: 'wide',
                      fontVariantNumeric: 'tabular-nums',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    })}
                  >
                    {project.type} / {project.year}
                  </span>
                </a>
              )
            })}
            {/* Featured project problem statement */}
            {featuredProject && (
              <div
                className={css({
                  padding: '12px 0',
                  borderBottom: '0.5px solid',
                  borderColor: 'border',
                })}
              >
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '13px',
                    color: 'textSecondary',
                    lineHeight: 'normal',
                    maxWidth: '55ch',
                  })}
                >
                  {featuredProject.problem}
                </p>
                {featuredProject.externalUrl && (
                  <a
                    href={featuredProject.externalUrl}
                    className={css({
                      fontFamily: 'body',
                      fontSize: '12px',
                      letterSpacing: 'wide',
                      color: 'accent',
                      textDecoration: 'none',
                      marginTop: '8px',
                      display: 'inline-block',
                      _hover: { textDecoration: 'underline' },
                      _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                    })}
                  >
                    {featuredProject.externalUrl} →
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Timeline */}
          <div
            className={css({
              borderRight: 'none',
              md: {
                borderRight: '1px solid',
                borderColor: 'border',
              },
              paddingLeft: '0',
              paddingRight: '0',
              md: { paddingLeft: '16px', paddingRight: '16px' },
              marginTop: '24px',
              md: { marginTop: '0' },
            })}
          >
            <div
              className={css({
                fontFamily: 'body',
                fontSize: '11px',
                fontWeight: 'medium',
                letterSpacing: 'widest',
                color: 'accent',
                textTransform: 'uppercase',
                padding: '12px 0',
                borderBottom: '1px solid',
                borderColor: 'border',
              })}
            >
              TIMELINE
            </div>
            {timeline.slice(0, 8).map((entry, i) => (
              <div
                key={`${entry.year}-${i}`}
                className={css({
                  display: 'flex',
                  alignItems: 'baseline',
                  padding: '10px 0',
                  borderBottom: '0.5px solid',
                  borderColor: 'border',
                })}
              >
                <span
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '12px',
                    color: 'textMuted',
                    fontVariantNumeric: 'tabular-nums',
                    minWidth: '80px',
                    flexShrink: 0,
                  })}
                >
                  {entry.year}
                </span>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '13px',
                    color: 'textSecondary',
                    lineHeight: '1.35',
                  })}
                >
                  {entry.role}
                  <span className={css({ color: 'textMuted' })}> · </span>
                  {entry.company}
                </span>
              </div>
            ))}
          </div>

          {/* Column 3: Today */}
          <div
            className={css({
              paddingLeft: '0',
              md: { paddingLeft: '16px' },
              marginTop: '24px',
              md: { marginTop: '0' },
            })}
          >
            <div
              className={css({
                fontFamily: 'body',
                fontSize: '11px',
                fontWeight: 'medium',
                letterSpacing: 'widest',
                color: 'accent',
                textTransform: 'uppercase',
                padding: '12px 0',
                borderBottom: '1px solid',
                borderColor: 'border',
              })}
            >
              TODAY
            </div>
            {signals.map((signal, i) => (
              <div
                key={i}
                className={css({
                  display: 'flex',
                  alignItems: 'baseline',
                  padding: '10px 0',
                  borderBottom: '0.5px solid',
                  borderColor: 'border',
                })}
              >
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '13px',
                    color: 'textSecondary',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  })}
                >
                  {signal.label}
                </span>
                <DotLeader />
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '12px',
                    color: 'textSecondary',
                    letterSpacing: 'wide',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  })}
                >
                  {signal.meta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Band */}
      <section
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          padding: '16px 0',
          marginTop: '0',
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: 'textSecondary',
            letterSpacing: 'wide',
            lineHeight: 'normal',
          })}
        >
          {capabilities.map((cap, i) => (
            <span key={cap}>
              {cap}
              {i < capabilities.length - 1 && (
                <span className={css({ color: 'textMuted' })}> · </span>
              )}
            </span>
          ))}
        </p>
      </section>
    </>
  )
}