import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className={css({
      maxWidth: '1120px',
      margin: '0 auto',
      padding: { base: '32px 24px 64px', md: '48px 48px 96px' },
    })}>
      {/* Gallery Wall Grid */}
      <div className={css({
        display: 'grid',
        gridTemplateColumns: { base: '1fr', md: 'repeat(12, 1fr)' },
        columnGap: '24px',
        rowGap: '48px',
      })}>

        {/* Featured Project — Large tile */}
        {featuredProject && (
          <div className={css({
            gridColumn: { base: '1', md: '1 / 7' },
            gridRow: { base: 'auto', md: '1' },
            minHeight: { md: '460px' },
            border: '1px solid',
            borderColor: 'border',
            borderTop: '2px solid',
            borderTopColor: 'accent',
            borderRadius: 'none',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            transition: 'background 0.2s',
            _hover: { background: '{colors.sage.glow}' },
          })}>
            <div className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text-muted',
              marginBottom: '16px',
              lineHeight: 'loose',
            })}>
              <span className={css({ display: 'inline-block', width: '40px', borderTop: '1px solid', borderColor: 'border', marginBottom: '8px' })} />
              <br />Featured Project
            </div>
            <a
              href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
              target={featuredProject.externalUrl ? '_blank' : undefined}
              rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
              className={css({
                textDecoration: 'none',
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
              })}
            >
              <h2 className={css({
                fontFamily: 'heading',
                fontSize: { base: '32px', md: 'clamp(32px, 4vw, 48px)' },
                fontWeight: 'bold',
                lineHeight: 'snug',
                letterSpacing: 'tight',
                color: 'text',
                marginBottom: '16px',
              })}>
                {featuredProject.title}
              </h2>
            </a>
            {featuredProject.problem && (
              <p className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'text-secondary',
                maxWidth: '480px',
                letterSpacing: 'wide',
              })}>
                {featuredProject.problem}
              </p>
            )}
          </div>
        )}

        {/* Selected Work — Medium tile */}
        {selectedWork[0] && (
          <div className={css({
            gridColumn: { base: '1', md: '7 / 11' },
            gridRow: { base: 'auto', md: '1' },
            minHeight: { md: '300px' },
            border: '1px solid',
            borderColor: 'border',
            borderTop: '2px solid',
            borderTopColor: 'accent',
            borderRadius: 'none',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            transition: 'background 0.2s',
            _hover: { background: '{colors.sage.glow}' },
          })}>
            <div className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text-muted',
              marginBottom: '16px',
              lineHeight: 'loose',
            })}>
              {selectedWork[0].type} · {selectedWork[0].year}
            </div>
            <a
              href={`/work/${selectedWork[0].slug}`}
              className={css({
                textDecoration: 'none',
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
              })}
            >
              <h3 className={css({
                fontFamily: 'heading',
                fontSize: { base: '24px', md: '28px' },
                fontWeight: 'bold',
                lineHeight: 'snug',
                letterSpacing: 'normal',
                color: 'text',
              })}>
                {selectedWork[0].title}
              </h3>
            </a>
            {selectedWork[0].problem && (
              <p className={css({
                fontFamily: 'body',
                fontSize: '14px',
                lineHeight: 'normal',
                color: 'text-secondary',
                marginTop: '8px',
                letterSpacing: 'wide',
              })}>
                {selectedWork[0].problem}
              </p>
            )}
          </div>
        )}

        {/* Signal Zone — Moon + Sports */}
        <div className={css({
          gridColumn: { base: '1', md: '11 / 13' },
          gridRow: { base: 'auto', md: '1' },
          alignSelf: 'start',
          paddingTop: { md: '8px' },
        })}>
          {/* Moon marker */}
          <div className={css({ marginBottom: '24px' })}>
            <div className={css({
              width: '22px',
              height: '22px',
              border: '1.5px solid',
              borderColor: 'text',
              borderRadius: '50%',
              marginBottom: '8px',
            })} />
            <div className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: 'widest',
              color: 'text-muted',
            })}>
              99.3%
            </div>
          </div>

          {/* Pistons W */}
          <div className={css({ marginBottom: '16px' })}>
            <div className={css({
              width: '20px',
              borderTop: '1px solid',
              borderColor: 'accent-mustard',
              marginBottom: '8px',
            })} />
            <div className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: 'wider',
              color: 'accent-mustard',
              fontVariantNumeric: 'tabular-nums',
            })}>
              DET 116 · OKC 109
            </div>
          </div>

          {/* Tigers L */}
          <div className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'wider',
            color: 'text-secondary',
            fontVariantNumeric: 'tabular-nums',
          })}>
            DET Tigers 3 · Ari 4
          </div>
        </div>

        {/* Row 2: Secondary work items */}
        {selectedWork[1] && (
          <div className={css({
            gridColumn: { base: '1', md: '2 / 6' },
            gridRow: { base: 'auto', md: '2' },
            minHeight: { md: '280px' },
            border: '1px solid',
            borderColor: 'border',
            borderRadius: 'none',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            transition: 'background 0.2s',
            _hover: { background: '{colors.sage.glow}' },
          })}>
            <div className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text-muted',
              marginBottom: '12px',
              lineHeight: 'loose',
            })}>
              {selectedWork[1].type} · {selectedWork[1].year}
            </div>
            <a
              href={`/work/${selectedWork[1].slug}`}
              className={css({
                textDecoration: 'none',
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
              })}
            >
              <h3 className={css({
                fontFamily: 'heading',
                fontSize: { base: '22px', md: '24px' },
                fontWeight: 'bold',
                lineHeight: 'snug',
                letterSpacing: 'normal',
                color: 'text',
              })}>
                {selectedWork[1].title}
              </h3>
            </a>
          </div>
        )}

        {selectedWork[2] && (
          <div className={css({
            gridColumn: { base: '1', md: '6 / 10' },
            gridRow: { base: 'auto', md: '2' },
            minHeight: { md: '280px' },
            border: '1px solid',
            borderColor: 'border',
            borderRadius: 'none',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            transition: 'background 0.2s',
            _hover: { background: '{colors.sage.glow}' },
          })}>
            <div className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text-muted',
              marginBottom: '12px',
              lineHeight: 'loose',
            })}>
              {selectedWork[2].type} · {selectedWork[2].year}
            </div>
            <a
              href={`/work/${selectedWork[2].slug}`}
              className={css({
                textDecoration: 'none',
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
              })}
            >
              <h3 className={css({
                fontFamily: 'heading',
                fontSize: { base: '22px', md: '24px' },
                fontWeight: 'bold',
                lineHeight: 'snug',
                letterSpacing: 'normal',
                color: 'text',
              })}>
                {selectedWork[2].title}
              </h3>
            </a>
          </div>
        )}

        {/* Quote zone */}
        <div className={css({
          gridColumn: { base: '1', md: '10 / 13' },
          gridRow: { base: 'auto', md: '2' },
          alignSelf: 'center',
          paddingLeft: { md: '8px' },
        })}>
          <blockquote className={css({
            fontFamily: 'heading',
            fontSize: '18px',
            fontStyle: 'italic',
            lineHeight: 'snug',
            color: 'text-secondary',
            letterSpacing: 'normal',
            borderLeft: '1.5px solid',
            borderColor: 'border',
            paddingLeft: '16px',
          })}>
            "Design is the body language of your first impression."
          </blockquote>
        </div>

        {/* Row 3: Experiments — full-width dense list */}
        <div className={css({
          gridColumn: { base: '1', md: '1 / 13' },
          gridRow: { base: 'auto', md: '3' },
        })}>
          <div className={css({ marginBottom: '24px' })}>
            <span className={css({
              display: 'inline-block',
              width: '40px',
              borderTop: '1px solid',
              borderColor: 'border',
              marginBottom: '8px',
            })} />
            <div className={css({
              fontFamily: 'body',
              fontSize: '10px',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text-muted',
              lineHeight: 'loose',
            })}>
              Experiments
            </div>
          </div>

          <div>
            {experiments.map((exp) => (
              <a
                key={exp.slug}
                href={exp.externalUrl || `/work/${exp.slug}`}
                target={exp.externalUrl ? '_blank' : undefined}
                rel={exp.externalUrl ? 'noopener noreferrer' : undefined}
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: '44px',
                  padding: '8px 0',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                  _hover: { background: 'bg-card' },
                  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '-2px' },
                })}
              >
                <span className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  color: 'text',
                  letterSpacing: 'wide',
                })}>
                  {exp.title}
                </span>
                <span className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  color: 'text-muted',
                  fontVariantNumeric: 'tabular-nums',
                  flexShrink: 0,
                  marginLeft: '16px',
                })}>
                  {exp.type} · {exp.year}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={css({
        marginTop: '96px',
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