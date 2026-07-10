import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className={css({
      minHeight: '100vh',
      padding: '72px 5vw 96px',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridTemplateRows: 'auto',
      columnGap: '0',
      rowGap: '0',
      maxWidth: 'none',
    })}>
      {/* Hero Quote — columns 1-7, row 1 */}
      <div className={css({
        gridColumn: '1 / 8',
        gridRow: '1 / 2',
        paddingRight: '5vw',
        '@media (max-width: 768px)': {
          gridColumn: '1 / 13',
          paddingRight: '0',
          paddingTop: '48px',
        },
      })}>
        <blockquote className={css({
          fontFamily: 'display',
          fontStyle: 'italic',
          fontSize: 'clamp(2.25rem, 4.2vw, 5rem)',
          lineHeight: '1.12',
          color: 'text',
          letterSpacing: '0em',
          margin: '0',
          textWrap: 'balance',
          '@media (max-width: 768px)': {
            fontSize: 'clamp(1.75rem, 7vw, 2.5rem)',
          },
        })}>
          "The moment you stop to think about whether you love someone, you've already stopped loving that person forever.
        </blockquote>
      </div>

      {/* Attribution — columns 1-5, row 2 */}
      <div className={css({
        gridColumn: '1 / 6',
        gridRow: '2 / 3',
        paddingTop: '24px',
        borderLeft: '1px solid',
        borderColor: 'accent',
        paddingLeft: '16px',
        '@media (max-width: 768px)': {
          gridColumn: '1 / 13',
        },
      })}>
        <p className={css({
          fontFamily: 'body',
          fontSize: '11px',
          fontWeight: '500',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'textSecondary',
          lineHeight: '1.4',
        })}>
          — Carlos Ruiz Zafón · The Shadow of the Wind
        </p>
      </div>

      {/* Signals zone — columns 9-12, rows 1-2 */}
      <div className={css({
        gridColumn: '9 / 13',
        gridRow: '1 / 3',
        paddingTop: '120px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        '@media (max-width: 768px)': {
          gridColumn: '1 / 13',
          gridRow: '3 / 4',
          paddingTop: '48px',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '24px',
        },
      })}>
        {/* Tigers */}
        <div className={css({ borderLeft: '1px solid', borderColor: 'border', paddingLeft: '12px' })}>
          <p className={css({
            fontFamily: 'body',
            fontSize: '10px',
            fontWeight: '500',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'textMuted',
            lineHeight: '1.2',
            marginBottom: '4px',
          })}>Tigers</p>
          <p className={css({
            fontFamily: 'body',
            fontSize: '18px',
            fontWeight: '600',
            color: 'text',
            lineHeight: '1.2',
          })}>
            4 · 1 <span className={css({ color: 'accent', fontWeight: '700' })}>W</span>
          </p>
          <p className={css({
            fontFamily: 'body',
            fontSize: '11px',
            color: 'textSecondary',
            lineHeight: '1.4',
            marginTop: '2px',
          })}>vs. Kansas City · Jul 9</p>
        </div>

        {/* Scottish Open */}
        <div className={css({ borderLeft: '1px solid', borderColor: 'border', paddingLeft: '12px' })}>
          <p className={css({
            fontFamily: 'body',
            fontSize: '10px',
            fontWeight: '500',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'textMuted',
            lineHeight: '1.2',
            marginBottom: '6px',
          })}>Scottish Open</p>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '2px' })}>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textSecondary', lineHeight: '1.4' })}>
              Jordan Smith <span className={css({ color: 'accent', fontWeight: '600' })}>−8</span>
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textSecondary', lineHeight: '1.4' })}>
              Willett <span className={css({ fontWeight: '500' })}>−6</span>
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textSecondary', lineHeight: '1.4' })}>
              Fitzpatrick <span className={css({ fontWeight: '500' })}>−6</span>
            </p>
          </div>
        </div>

        {/* Moon */}
        <p className={css({
          fontFamily: 'body',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'textMuted',
          lineHeight: '1.2',
        })}>
          🌒 Waning Crescent 14%
        </p>

        {/* Music */}
        <p className={css({
          fontFamily: 'body',
          fontSize: '11px',
          fontStyle: 'italic',
          color: 'textMuted',
          lineHeight: '1.2',
        })}>
          GBV · Tobin Sprout
        </p>

        {/* Chat Control */}
        <p className={css({
          fontFamily: 'body',
          fontSize: '11px',
          color: 'textMuted',
          lineHeight: '1.2',
        })}>
          EU: Chat Control 1.0 — Parliament
        </p>
      </div>

      {/* Projects zone — columns 1-12, row 3 */}
      <div className={css({
        gridColumn: '1 / 13',
        gridRow: '3 / 4',
        paddingTop: '80px',
        '@media (max-width: 768px)': {
          gridRow: '4 / 5',
          paddingTop: '48px',
        },
      })}>
        {/* Featured */}
        {featuredProject && (
          <div className={css({
            marginBottom: '64px',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            '@media (max-width: 768px)': {
              display: 'block',
            },
          })}>
            <div className={css({
              gridColumn: '1 / 7',
              '@media (max-width: 768px)': {
                gridColumn: '1 / 13',
              },
            })}>
              <p className={css({
                fontFamily: 'body',
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'textMuted',
                marginBottom: '12px',
              })}>Featured</p>
              <h2 className={css({
                fontFamily: 'display',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '600',
                color: 'text',
                lineHeight: '1.15',
                marginBottom: '12px',
              })}>{featuredProject.title}</h2>
              {featuredProject.problem && (
                <p className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  color: 'textSecondary',
                  lineHeight: '1.6',
                  maxWidth: '55ch',
                  marginBottom: '16px',
                })}>{featuredProject.problem}</p>
              )}
              {featuredProject.externalUrl && (
                <a
                  href={featuredProject.externalUrl}
                  className={css({
                    fontFamily: 'body',
                    fontSize: '12px',
                    fontWeight: '500',
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: 'accent',
                    textDecoration: 'none',
                    borderBottom: '1px solid transparent',
                    padding: '10px 0',
                    display: 'inline-block',
                    _hover: {
                      borderBottomColor: 'accent',
                    },
                    _focus: {
                      outline: '2px solid',
                      outlineColor: 'accent',
                      outlineOffset: '2px',
                    },
                  })}
                >
                  Visit {featuredProject.title} →
                </a>
              )}
            </div>
          </div>
        )}

        {/* Selected Work — masonry-ish irregular grid */}
        <div className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '16px',
          marginBottom: '48px',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gap: '12px',
          },
        })}>
          {selectedWork.map((project, i) => {
            const spans = [
              { col: '1 / 5', aspectRatio: '3 / 4' },
              { col: '5 / 9', aspectRatio: '1 / 1' },
              { col: '9 / 13', aspectRatio: '2 / 3' },
            ]
            const span = spans[i % 3]
            return (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className={css({
                  gridColumn: span.col,
                  background: 'bgCard',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  minHeight: '200px',
                  textDecoration: 'none',
                  borderLeft: '1px solid transparent',
                  transition: 'none',
                  _hover: {
                    borderLeftColor: 'accent',
                  },
                  _focus: {
                    outline: '2px solid',
                    outlineColor: 'accent',
                    outlineOffset: '-2px',
                  },
                  '@media (max-width: 768px)': {
                    gridColumn: '1 / -1',
                    minHeight: '140px',
                  },
                })}
              >
                <p className={css({
                  fontFamily: 'body',
                  fontSize: '10px',
                  fontWeight: '500',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                  marginBottom: '8px',
                })}>{project.type} · {project.year}</p>
                <h3 className={css({
                  fontFamily: 'display',
                  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                  fontWeight: '600',
                  color: 'text',
                  lineHeight: '1.2',
                })}>{project.title}</h3>
              </a>
            )
          })}
        </div>

        {/* Experiments */}
        <div className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '16px',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gap: '12px',
          },
        })}>
          {experiments.map((exp, i) => {
            const expSpans = [
              { col: '1 / 4' },
              { col: '4 / 8' },
              { col: '8 / 11' },
            ]
            const span = expSpans[i % 3]
            return (
              <a
                key={exp.slug}
                href={exp.externalUrl || `/work/${exp.slug}`}
                className={css({
                  gridColumn: span.col,
                  padding: '20px',
                  display: 'block',
                  textDecoration: 'none',
                  borderLeft: '1px solid transparent',
                  _hover: {
                    borderLeftColor: 'accent',
                  },
                  _focus: {
                    outline: '2px solid',
                    outlineColor: 'accent',
                    outlineOffset: '2px',
                  },
                  '@media (max-width: 768px)': {
                    gridColumn: '1 / -1',
                  },
                })}
              >
                <p className={css({
                  fontFamily: 'body',
                  fontSize: '10px',
                  fontWeight: '500',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                  marginBottom: '4px',
                })}>{exp.type} · {exp.year}</p>
                <h3 className={css({
                  fontFamily: 'display',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'text',
                  lineHeight: '1.3',
                })}>{exp.title}</h3>
              </a>
            )
          })}
        </div>

        {/* Awwwards whisper */}
        <p className={css({
          fontFamily: 'body',
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '{colors.stone.600}',
          textAlign: 'right',
          marginTop: '32px',
        })}>
          21 Hrs on the Moon
        </p>
      </div>

      {/* Identity zone — columns 1-4, row 4 */}
      <div className={css({
        gridColumn: '1 / 5',
        gridRow: '4 / 5',
        paddingTop: '80px',
        '@media (max-width: 768px)': {
          gridColumn: '1 / 13',
          gridRow: '5 / 6',
          paddingTop: '48px',
        },
      })}>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
          fontWeight: '600',
          color: 'text',
          lineHeight: '1.2',
          marginBottom: '4px',
        })}>Doug March</h1>
        <p className={css({
          fontFamily: 'body',
          fontSize: '13px',
          color: 'textSecondary',
          letterSpacing: '0.05em',
          marginBottom: '24px',
        })}>Product Designer &amp; Developer</p>
        <div className={css({ display: 'flex', gap: '16px', flexWrap: 'wrap' })}>
          <a href="/" className={css({
            fontFamily: 'body',
            fontSize: '12px',
            fontWeight: '500',
            color: 'textSecondary',
            textDecoration: 'none',
            padding: '10px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}>Home</a>
          <a href="/about" className={css({
            fontFamily: 'body',
            fontSize: '12px',
            fontWeight: '500',
            color: 'textSecondary',
            textDecoration: 'none',
            padding: '10px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}>About</a>
          <a href="/archive" className={css({
            fontFamily: 'body',
            fontSize: '12px',
            fontWeight: '500',
            color: 'textMuted',
            textDecoration: 'none',
            padding: '10px 0',
            _hover: { color: 'textSecondary' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}>Archive</a>
        </div>
      </div>

      {/* Capabilities zone — columns 6-12, row 4 (footer-like) */}
      <div className={css({
        gridColumn: '6 / 13',
        gridRow: '4 / 5',
        paddingTop: '80px',
        '@media (max-width: 768px)': {
          gridColumn: '1 / 13',
          gridRow: '6 / 7',
          paddingTop: '32px',
        },
      })}>
        <p className={css({
          fontFamily: 'body',
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '12px',
        })}>Capabilities</p>
        <p className={css({
          fontFamily: 'body',
          fontSize: '13px',
          color: 'textSecondary',
          lineHeight: '1.6',
          maxWidth: '65ch',
        })}>
          Product Design · Frontend Development · Design Systems · Prototyping · User Research · Information Architecture
        </p>
      </div>
    </div>
  )
}