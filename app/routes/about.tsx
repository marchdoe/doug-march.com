import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  const words = identity.statement.split(' ')
  const lastWord = words.pop()

  return (
    <div className={css({ padding: { base: '8 6', md: '12 16', lg: '16 24' } })}>
      <h1
        className={css({
          fontFamily: 'display',
          textTransform: 'uppercase',
          lineHeight: 'tight',
          color: 'text',
          maxWidth: '18ch',
          marginBottom: '6',
        })}
        style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
      >
        {words.join(' ')} <span className={css({ color: 'accent' })}>{lastWord}</span>
      </h1>

      <p
        className={css({
          fontSize: 'xs',
          textTransform: 'uppercase',
          letterSpacing: 'wider',
          color: 'textMuted',
          marginBottom: '12',
        })}
      >
        {identity.name} · {identity.role}
      </p>

      {/* Timeline */}
      <section className={css({ marginBottom: '16' })}>
        <h2
          className={css({
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
            color: 'textMuted',
            marginBottom: '4',
          })}
        >
          Timeline
        </h2>
        <div>
          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: 'flex',
                gap: '6',
                padding: '4 0',
                borderTop: '1px solid',
                borderColor: 'border',
                alignItems: 'baseline',
                flexWrap: { base: 'wrap', md: 'nowrap' },
              })}
            >
              <span
                className={css({
                  flex: '0 0 120px',
                  minWidth: '120px',
                  fontFamily: 'mono',
                  fontVariantNumeric: 'tabular-nums',
                  color: 'accentGlow',
                  fontSize: 'sm',
                })}
              >
                {entry.year}
              </span>
              <div className={css({ flex: '1' })}>
                <span className={css({ color: 'text', fontWeight: 'medium', fontSize: 'md' })}>
                  {entry.role} · {entry.company}
                </span>
                <p className={css({ color: 'textSecondary', fontSize: 'sm', marginTop: '1' })}>
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className={css({ marginBottom: '16' })}>
        <h2
          className={css({
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
            color: 'textMuted',
            marginBottom: '4',
          })}
        >
          Capabilities
        </h2>
        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
          {capabilities.map((cap) => (
            <span
              key={cap}
              className={css({
                border: '1px solid',
                borderColor: 'border',
                borderRadius: 'full',
                padding: '2 4',
                fontSize: 'xs',
                color: 'textSecondary',
              })}
            >
              {cap}
            </span>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className={css({ marginBottom: '16' })}>
        <h2
          className={css({
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
            color: 'textMuted',
            marginBottom: '4',
          })}
        >
          Education
        </h2>
        <div
          className={css({
            display: 'flex',
            gap: '6',
            padding: '4 0',
            borderTop: '1px solid',
            borderColor: 'border',
            alignItems: 'baseline',
            flexWrap: { base: 'wrap', md: 'nowrap' },
          })}
        >
          <span
            className={css({
              flex: '0 0 120px',
              minWidth: '120px',
              fontFamily: 'mono',
              fontVariantNumeric: 'tabular-nums',
              color: 'accentGlow',
              fontSize: 'sm',
            })}
          >
            {education.years}
          </span>
          <div>
            <span className={css({ color: 'text', fontWeight: 'medium', fontSize: 'md' })}>
              {education.school}
            </span>
            <p className={css({ color: 'textSecondary', fontSize: 'sm', marginTop: '1' })}>
              {education.degree} · {education.concentration}
            </p>
          </div>
        </div>
      </section>

      {/* Personal data strip */}
      <section
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
          gap: '6',
          borderTop: '1px solid',
          borderColor: 'border',
          paddingTop: '6',
        })}
      >
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '1' })}>
          <span className={css({ fontSize: '2xs', textTransform: 'uppercase', letterSpacing: 'wider', color: 'textMuted' })}>
            Holes In One
          </span>
          <span className={css({ fontFamily: 'display', fontSize: 'xl', color: 'text' })}>
            {personal.holesInOne} <span className={css({ color: 'textSecondary', fontFamily: 'body', fontSize: 'sm' })}>· {personal.sport}</span>
          </span>
        </div>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '1' })}>
          <span className={css({ fontSize: '2xs', textTransform: 'uppercase', letterSpacing: 'wider', color: 'textMuted' })}>
            Teams
          </span>
          <span className={css({ fontSize: 'sm', color: 'textSecondary' })}>{personal.teams.join(' · ')}</span>
        </div>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '1' })}>
          <span className={css({ fontSize: '2xs', textTransform: 'uppercase', letterSpacing: 'wider', color: 'textMuted' })}>
            Current Focus
          </span>
          <span className={css({ fontSize: 'sm', color: 'textSecondary' })}>{personal.currentFocus}</span>
        </div>
      </section>
    </div>
  )
}