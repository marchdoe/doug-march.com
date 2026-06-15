import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const column = css({
  width: '88vw',
  maxWidth: '1440px',
  margin: '0 auto',
})

function AboutPage() {
  return (
    <div className={column}>
      {/* Identity */}
      <section className={css({
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '96px',
        paddingBottom: '96px',
      })}>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: 'clamp(36px, 4.5vw, 72px)',
          fontWeight: 'bold',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'text',
          maxWidth: '900px',
          textWrap: 'balance',
        })}>{identity.name}</h1>
        <p className={css({
          fontFamily: 'body',
          fontSize: '14px',
          fontWeight: 'medium',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginTop: '16px',
        })}>{identity.role}</p>
        <p className={css({
          fontFamily: 'body',
          fontSize: '18px',
          lineHeight: 'normal',
          color: 'textSecondary',
          marginTop: '32px',
          maxWidth: '65ch',
        })}>{identity.statement}</p>
      </section>

      {/* Timeline */}
      <section className={css({
        paddingTop: '64px',
        paddingBottom: '96px',
        borderTop: '1px solid',
        borderColor: 'border',
      })}>
        <span className={css({
          fontFamily: 'body',
          fontSize: '11px',
          fontWeight: 'medium',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          display: 'block',
          marginBottom: '48px',
        })}>Experience</span>

        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0' })}>
          {timeline.map((entry, i) => (
            <div key={i} className={css({
              display: 'grid',
              gridTemplateColumns: '140px 1fr',
              gap: '24px',
              padding: '24px 0',
              borderBottom: '1px solid',
              borderColor: 'border',
              '@media (max-width: 640px)': {
                gridTemplateColumns: '1fr',
                gap: '4px',
              },
            })}>
              <span className={css({
                fontFamily: 'body',
                fontSize: '13px',
                fontWeight: 'medium',
                color: 'textMuted',
                fontVariantNumeric: 'tabular-nums',
                whiteSpace: 'nowrap',
                minWidth: '120px',
              })}>{entry.year}</span>
              <div>
                <div className={css({ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' })}>
                  <span className={css({
                    fontFamily: 'display',
                    fontSize: '16px',
                    fontWeight: 'semibold',
                    color: 'text',
                  })}>{entry.role}</span>
                  <span className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'textSecondary',
                  })}>· {entry.company}</span>
                </div>
                <p className={css({
                  fontFamily: 'body',
                  fontSize: '14px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  marginTop: '6px',
                  maxWidth: '65ch',
                })}>{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className={css({
        paddingTop: '64px',
        paddingBottom: '64px',
        borderTop: '1px solid',
        borderColor: 'border',
      })}>
        <span className={css({
          fontFamily: 'body',
          fontSize: '11px',
          fontWeight: 'medium',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          display: 'block',
          marginBottom: '24px',
        })}>Education</span>
        <div className={css({
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gap: '24px',
          '@media (max-width: 640px)': {
            gridTemplateColumns: '1fr',
            gap: '4px',
          },
        })}>
          <span className={css({
            fontFamily: 'body',
            fontSize: '13px',
            fontWeight: 'medium',
            color: 'textMuted',
            minWidth: '120px',
          })}>{education.years}</span>
          <div>
            <span className={css({
              fontFamily: 'display',
              fontSize: '16px',
              fontWeight: 'semibold',
              color: 'text',
            })}>{education.degree}</span>
            <span className={css({
              fontFamily: 'body',
              fontSize: '14px',
              color: 'textSecondary',
              marginLeft: '8px',
            })}>· {education.concentration}</span>
            <p className={css({
              fontFamily: 'body',
              fontSize: '14px',
              color: 'textSecondary',
              marginTop: '4px',
            })}>{education.school}</p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className={css({
        paddingTop: '64px',
        paddingBottom: '64px',
        borderTop: '1px solid',
        borderColor: 'border',
      })}>
        <span className={css({
          fontFamily: 'body',
          fontSize: '11px',
          fontWeight: 'medium',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          display: 'block',
          marginBottom: '32px',
        })}>Capabilities</span>
        <div className={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        })}>
          {capabilities.map((cap) => (
            <span key={cap} className={css({
              fontFamily: 'body',
              fontSize: '13px',
              fontWeight: 'medium',
              color: 'text',
              padding: '8px 16px',
              border: '1px solid',
              borderColor: 'border',
              borderRadius: 'sm',
              letterSpacing: 'wide',
            })}>{cap}</span>
          ))}
        </div>
      </section>

      {/* Personal */}
      <section className={css({
        paddingTop: '64px',
        paddingBottom: '96px',
        borderTop: '1px solid',
        borderColor: 'border',
      })}>
        <span className={css({
          fontFamily: 'body',
          fontSize: '11px',
          fontWeight: 'medium',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          display: 'block',
          marginBottom: '32px',
        })}>Personal</span>
        <div className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
        })}>
          <div>
            <span className={css({
              fontFamily: 'display',
              fontSize: 'clamp(36px, 3vw, 52px)',
              fontWeight: 'bold',
              color: 'accent',
              lineHeight: 'snug',
              display: 'block',
            })}>{personal.holesInOne}</span>
            <span className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginTop: '4px',
              display: 'block',
            })}>Holes in One</span>
          </div>
          <div>
            <span className={css({
              fontFamily: 'display',
              fontSize: '20px',
              fontWeight: 'semibold',
              color: 'text',
              display: 'block',
            })}>{personal.sport}</span>
            <span className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginTop: '4px',
              display: 'block',
            })}>Sport</span>
          </div>
          <div>
            <span className={css({
              fontFamily: 'body',
              fontSize: '16px',
              color: 'text',
              display: 'block',
              lineHeight: 'normal',
            })}>{personal.teams.join(', ')}</span>
            <span className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginTop: '4px',
              display: 'block',
            })}>Teams</span>
          </div>
          <div>
            <span className={css({
              fontFamily: 'body',
              fontSize: '16px',
              color: 'text',
              display: 'block',
              lineHeight: 'normal',
            })}>{personal.currentFocus}</span>
            <span className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginTop: '4px',
              display: 'block',
            })}>Current Focus</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={css({
        paddingTop: '32px',
        paddingBottom: '48px',
        borderTop: '1px solid',
        borderColor: 'border',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      })}>
        <p className={css({
          fontFamily: 'body',
          fontSize: '12px',
          color: 'textMuted',
        })}>↪ Currently: Guided by Voices, My Morning Jacket</p>
        <a href="/archive" className={css({
          fontFamily: 'body',
          fontSize: '12px',
          color: 'textMuted',
          textDecoration: 'none',
          _hover: { color: 'accent' },
          _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>Archive</a>
      </footer>
    </div>
  )
}