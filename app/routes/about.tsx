import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div className={css({
      minHeight: '100vh',
      padding: '96px 5vw 96px',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      columnGap: '16px',
      rowGap: '0',
    })}>
      {/* Identity */}
      <div className={css({
        gridColumn: '1 / 7',
        paddingBottom: '64px',
        '@media (max-width: 768px)': {
          gridColumn: '1 / 13',
          paddingBottom: '40px',
        },
      })}>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: '600',
          color: 'text',
          lineHeight: '1.12',
          marginBottom: '16px',
        })}>{identity.name}</h1>
        <p className={css({
          fontFamily: 'body',
          fontSize: '13px',
          fontWeight: '500',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'textSecondary',
          marginBottom: '24px',
        })}>{identity.role}</p>
        <p className={css({
          fontFamily: 'display',
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          fontStyle: 'italic',
          color: 'text',
          lineHeight: '1.6',
          maxWidth: '55ch',
        })}>{identity.statement}</p>
      </div>

      {/* Personal — upper right */}
      <div className={css({
        gridColumn: '8 / 13',
        paddingTop: '24px',
        paddingBottom: '64px',
        '@media (max-width: 768px)': {
          gridColumn: '1 / 13',
          paddingTop: '0',
          paddingBottom: '40px',
        },
      })}>
        <p className={css({
          fontFamily: 'body',
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '16px',
        })}>Personal</p>
        <div className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        })}>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: '0.05em', textTransform: 'uppercase' })}>Holes in One</p>
            <p className={css({ fontFamily: 'display', fontSize: '24px', fontWeight: '600', color: 'accent', lineHeight: '1.2' })}>{personal.holesInOne}</p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: '0.05em', textTransform: 'uppercase' })}>Sport</p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text', lineHeight: '1.4' })}>{personal.sport}</p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: '0.05em', textTransform: 'uppercase' })}>Teams</p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text', lineHeight: '1.4' })}>{personal.teams.join(', ')}</p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: '0.05em', textTransform: 'uppercase' })}>Current Focus</p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text', lineHeight: '1.4' })}>{personal.currentFocus}</p>
          </div>
        </div>
      </div>

      {/* Timeline — full width */}
      <div className={css({
        gridColumn: '1 / 13',
        paddingBottom: '64px',
      })}>
        <p className={css({
          fontFamily: 'body',
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '24px',
        })}>Experience</p>
        <div className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        })}>
          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: 'grid',
                gridTemplateColumns: '120px 200px 1fr',
                gap: '16px',
                padding: '16px 0',
                borderTop: '1px solid',
                borderColor: 'border',
                alignItems: 'baseline',
                '@media (max-width: 768px)': {
                  gridTemplateColumns: '1fr',
                  gap: '4px',
                },
              })}
            >
              <span className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                color: 'textMuted',
                whiteSpace: 'nowrap',
                minWidth: '120px',
              })}>{entry.year}</span>
              <span className={css({
                fontFamily: 'body',
                fontSize: '14px',
                fontWeight: '600',
                color: 'text',
                lineHeight: '1.4',
              })}>{entry.role} <span className={css({ color: 'textSecondary', fontWeight: '400' })}>· {entry.company}</span></span>
              <span className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textSecondary',
                lineHeight: '1.6',
                maxWidth: '55ch',
              })}>{entry.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className={css({
        gridColumn: '1 / 6',
        paddingBottom: '64px',
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
          marginBottom: '16px',
        })}>Education</p>
        <p className={css({
          fontFamily: 'body',
          fontSize: '16px',
          fontWeight: '600',
          color: 'text',
          lineHeight: '1.4',
        })}>{education.school}</p>
        <p className={css({
          fontFamily: 'body',
          fontSize: '14px',
          color: 'textSecondary',
          lineHeight: '1.5',
        })}>{education.degree}, {education.concentration}</p>
        <p className={css({
          fontFamily: 'mono',
          fontSize: '12px',
          color: 'textMuted',
          marginTop: '4px',
        })}>{education.years}</p>
      </div>

      {/* Capabilities */}
      <div className={css({
        gridColumn: '6 / 13',
        paddingBottom: '64px',
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
          marginBottom: '16px',
        })}>Capabilities</p>
        <div className={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        })}>
          {capabilities.map((cap, i) => (
            <span
              key={i}
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                color: 'textSecondary',
                padding: '6px 12px',
                background: 'bgCard',
                lineHeight: '1.4',
              })}
            >{cap}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={css({
        gridColumn: '1 / 13',
        paddingTop: '32px',
        borderTop: '1px solid',
        borderColor: 'border',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      })}>
        <p className={css({
          fontFamily: 'body',
          fontSize: '12px',
          color: 'textMuted',
        })}>Doug March · Product Designer & Developer</p>
        <a href="/archive" className={css({
          fontFamily: 'body',
          fontSize: '12px',
          color: 'textMuted',
          textDecoration: 'none',
          padding: '10px 0',
          _hover: { color: 'textSecondary' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>Archive</a>
      </div>
    </div>
  )
}