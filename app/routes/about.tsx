import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div className={css({
      padding: '8 6vw',
      maxWidth: '1200px',
    })}>
      <section className={css({ marginBottom: '16' })}>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: 'clamp(36px, 5vw, 72px)',
          lineHeight: 'tight',
          color: 'textHero',
          textTransform: 'uppercase',
          marginBottom: '6',
        })}>{identity.name}</h1>
        <p className={css({
          fontFamily: 'body',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'textLabel',
          marginBottom: '6',
        })}>{identity.role}</p>
        <p className={css({
          fontFamily: 'body',
          fontSize: '16px',
          lineHeight: 'normal',
          color: 'text',
          maxWidth: '65ch',
        })}>{identity.statement}</p>
      </section>

      <section className={css({ marginBottom: '16' })}>
        <h2 className={css({
          fontFamily: 'body',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '8',
        })}>EXPERIENCE</h2>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '6' })}>
          {timeline.map((entry, i) => (
            <div key={i} className={css({
              display: 'grid',
              gridTemplateColumns: { base: '1fr', md: '140px 1fr' },
              gap: { base: '1', md: '8' },
              paddingBottom: '6',
              borderBottom: '1px solid',
              borderColor: 'border',
            })}>
              <span className={css({
                fontFamily: 'body',
                fontSize: '12px',
                color: 'textLabel',
                letterSpacing: '0.05em',
                minWidth: '120px',
                whiteSpace: 'nowrap',
              })}>{entry.year}</span>
              <div>
                <p className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  fontWeight: 'semibold',
                  color: 'text',
                })}>{entry.role}</p>
                <p className={css({
                  fontFamily: 'body',
                  fontSize: '14px',
                  color: 'textSecondary',
                  marginBottom: '2',
                })}>{entry.company}</p>
                <p className={css({
                  fontFamily: 'body',
                  fontSize: '14px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  maxWidth: '65ch',
                })}>{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={css({ marginBottom: '16' })}>
        <h2 className={css({
          fontFamily: 'body',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '6',
        })}>CAPABILITIES</h2>
        <div className={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3',
        })}>
          {capabilities.map((cap, i) => (
            <span key={i} className={css({
              fontFamily: 'body',
              fontSize: '13px',
              color: 'textSecondary',
              padding: '1 3',
              border: '1px solid',
              borderColor: 'border',
            })}>{cap}</span>
          ))}
        </div>
      </section>

      <section className={css({ marginBottom: '16' })}>
        <h2 className={css({
          fontFamily: 'body',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '6',
        })}>EDUCATION</h2>
        <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text', fontWeight: 'semibold' })}>{education.school}</p>
        <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'textSecondary' })}>{education.degree} — {education.concentration}</p>
        <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textLabel' })}>{education.years}</p>
      </section>

      <section className={css({ marginBottom: '16' })}>
        <h2 className={css({
          fontFamily: 'body',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '6',
        })}>PERSONAL</h2>
        <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: '1fr 1fr' }, gap: '4' })}>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textLabel', letterSpacing: '0.1em', textTransform: 'uppercase' })}>Holes in One</p>
            <p className={css({ fontFamily: 'display', fontSize: '32px', color: 'textHero' })}>{personal.holesInOne}</p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textLabel', letterSpacing: '0.1em', textTransform: 'uppercase' })}>Sport</p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>{personal.sport}</p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textLabel', letterSpacing: '0.1em', textTransform: 'uppercase' })}>Teams</p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>{personal.teams.join(', ')}</p>
          </div>
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textLabel', letterSpacing: '0.1em', textTransform: 'uppercase' })}>Current Focus</p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>{personal.currentFocus}</p>
          </div>
        </div>
      </section>
    </div>
  )
}