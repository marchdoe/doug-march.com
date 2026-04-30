import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
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

        {/* Identity Statement */}
        <div className={css({
          gridColumn: { base: '1', md: '1 / 8' },
        })}>
          <h1 className={css({
            fontFamily: 'heading',
            fontSize: { base: '28px', md: 'clamp(32px, 4vw, 44px)' },
            fontWeight: 'bold',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'text',
            marginBottom: '24px',
          })}>
            {identity.name}
          </h1>
          <div className={css({
            fontFamily: 'body',
            fontSize: '14px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '24px',
            lineHeight: 'loose',
          })}>
            {identity.role}
          </div>
          <p className={css({
            fontFamily: 'body',
            fontSize: '16px',
            lineHeight: 'normal',
            color: 'text-secondary',
            maxWidth: '560px',
            letterSpacing: 'wide',
          })}>
            {identity.statement}
          </p>
        </div>

        {/* Personal details */}
        <div className={css({
          gridColumn: { base: '1', md: '9 / 13' },
          alignSelf: 'start',
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
              Personal
            </div>
          </div>
          <dl className={css({
            fontFamily: 'body',
            fontSize: '14px',
            lineHeight: 'normal',
            color: 'text-secondary',
            letterSpacing: 'wide',
          })}>
            <div className={css({ marginBottom: '12px' })}>
              <dt className={css({ fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'text-muted', marginBottom: '2px' })}>Holes in One</dt>
              <dd>{personal.holesInOne}</dd>
            </div>
            <div className={css({ marginBottom: '12px' })}>
              <dt className={css({ fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'text-muted', marginBottom: '2px' })}>Sport</dt>
              <dd>{personal.sport}</dd>
            </div>
            <div className={css({ marginBottom: '12px' })}>
              <dt className={css({ fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'text-muted', marginBottom: '2px' })}>Teams</dt>
              <dd>{personal.teams.join(', ')}</dd>
            </div>
            <div>
              <dt className={css({ fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'text-muted', marginBottom: '2px' })}>Current Focus</dt>
              <dd>{personal.currentFocus}</dd>
            </div>
          </dl>
        </div>

        {/* Timeline */}
        <div className={css({
          gridColumn: { base: '1', md: '1 / 9' },
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
              Timeline
            </div>
          </div>

          <div>
            {timeline.map((entry, i) => (
              <div
                key={`${entry.year}-${entry.company}-${i}`}
                className={css({
                  display: 'flex',
                  gap: { base: '16px', md: '24px' },
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                })}
              >
                <div className={css({
                  fontFamily: 'mono',
                  fontSize: '13px',
                  color: 'text-muted',
                  letterSpacing: 'wider',
                  minWidth: '120px',
                  flexShrink: 0,
                  fontVariantNumeric: 'tabular-nums',
                })}>
                  {entry.year}
                </div>
                <div className={css({ flex: 1 })}>
                  <div className={css({
                    fontFamily: 'body',
                    fontSize: '16px',
                    fontWeight: 'medium',
                    color: 'text',
                    letterSpacing: 'wide',
                  })}>
                    {entry.role}
                  </div>
                  <div className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'text-secondary',
                    letterSpacing: 'wide',
                    marginTop: '2px',
                  })}>
                    {entry.company}
                  </div>
                  <div className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'text-muted',
                    lineHeight: 'normal',
                    marginTop: '8px',
                    maxWidth: '520px',
                    letterSpacing: 'wide',
                  })}>
                    {entry.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className={css({
          gridColumn: { base: '1', md: '9 / 13' },
          position: { md: 'sticky' },
          top: { md: '48px' },
          alignSelf: 'start',
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
              Capabilities
            </div>
          </div>

          <div className={css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          })}>
            {capabilities.map(cap => (
              <span
                key={cap}
                className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  color: 'text-secondary',
                  padding: '4px 12px',
                  border: '1px solid',
                  borderColor: 'border',
                  borderRadius: 'sm',
                })}
              >
                {cap}
              </span>
            ))}
          </div>

          {/* Education */}
          <div className={css({ marginTop: '32px' })}>
            <div className={css({ marginBottom: '16px' })}>
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
                Education
              </div>
            </div>
            <div className={css({
              fontFamily: 'body',
              fontSize: '14px',
              color: 'text-secondary',
              lineHeight: 'normal',
              letterSpacing: 'wide',
            })}>
              <div className={css({ fontWeight: 'medium', color: 'text' })}>{education.school}</div>
              <div className={css({ marginTop: '4px' })}>{education.degree}</div>
              <div className={css({ marginTop: '2px' })}>{education.concentration}</div>
              <div className={css({ marginTop: '4px', fontSize: '12px', color: 'text-muted', fontVariantNumeric: 'tabular-nums' })}>{education.years}</div>
            </div>
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