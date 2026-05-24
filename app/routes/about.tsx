import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div className={css({
      display: 'grid',
      gridTemplateColumns: '2fr 3fr',
      gap: '16px',
      padding: '0 16px 16px 16px',
      minHeight: 'calc(100vh - 52px)',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        padding: '0 12px 12px 12px',
      },
    })}>
      {/* Identity Block — Left */}
      <div className={css({
        background: 'bgHero',
        padding: '64px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '50vh',
        '@media (max-width: 768px)': {
          padding: '48px 24px',
          minHeight: '40vh',
        },
      })}>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: 'clamp(36px, 5vw, 72px)',
          fontWeight: 'bold',
          lineHeight: '0.88',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: 'textOnHero',
          marginBottom: '24px',
        })}>
          {identity.name}
        </h1>
        <p className={css({
          fontFamily: 'body',
          fontSize: '14px',
          fontWeight: 'medium',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'textOnHeroMuted',
          marginBottom: '32px',
        })}>
          {identity.role}
        </p>
        <p className={css({
          fontFamily: 'body',
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'textOnHero',
          maxWidth: '45ch',
          fontWeight: 'light',
        })}>
          {identity.statement}
        </p>
      </div>

      {/* Right column — stacked blocks */}
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      })}>
        {/* Timeline Block */}
        <div className={css({
          background: 'bgCard',
          padding: '32px 28px',
          '@media (max-width: 768px)': {
            padding: '24px 20px',
          },
        })}>
          <div className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
          })}>
            TIMELINE
          </div>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '4px' })}>
            {timeline.map((entry, i) => (
              <div
                key={i}
                className={css({
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '16px',
                  padding: '10px 0',
                  borderBottom: '1px solid',
                  borderColor: 'borderSubtle',
                  alignItems: 'baseline',
                  '@media (max-width: 480px)': {
                    gridTemplateColumns: '1fr',
                    gap: '4px',
                  },
                })}
              >
                <span className={css({
                  fontFamily: 'mono',
                  fontSize: '12px',
                  color: 'textMuted',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                  minWidth: '120px',
                })}>
                  {entry.year}
                </span>
                <div>
                  <span className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    fontWeight: 'medium',
                    color: 'text',
                  })}>
                    {entry.role}
                  </span>
                  <span className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'textMuted',
                  })}>
                    {' '}· {entry.company}
                  </span>
                  <p className={css({
                    fontFamily: 'body',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    color: 'textSecondary',
                    marginTop: '4px',
                    maxWidth: '55ch',
                  })}>
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Block */}
        <div className={css({
          background: 'bgCard',
          padding: '28px',
          '@media (max-width: 768px)': {
            padding: '24px 20px',
          },
        })}>
          <div className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '16px',
          })}>
            CAPABILITIES
          </div>
          <div className={css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          })}>
            {capabilities.map((cap) => (
              <span
                key={cap}
                className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  color: 'textSecondary',
                  padding: '6px 12px',
                  border: '1px solid',
                  borderColor: 'border',
                })}
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        {/* Education Block */}
        <div className={css({
          background: 'bgCard',
          padding: '28px',
          '@media (max-width: 768px)': {
            padding: '24px 20px',
          },
        })}>
          <div className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '16px',
          })}>
            EDUCATION
          </div>
          <div>
            <p className={css({
              fontFamily: 'body',
              fontSize: '14px',
              fontWeight: 'medium',
              color: 'text',
            })}>
              {education.school}
            </p>
            <p className={css({
              fontFamily: 'body',
              fontSize: '13px',
              color: 'textSecondary',
              marginTop: '4px',
            })}>
              {education.degree} · {education.concentration}
            </p>
            <p className={css({
              fontFamily: 'body',
              fontSize: '12px',
              color: 'textMuted',
              marginTop: '4px',
            })}>
              {education.years}
            </p>
          </div>
        </div>

        {/* Personal Block */}
        <div className={css({
          background: 'bg',
          border: '1px solid',
          borderColor: 'border',
          padding: '28px',
          '@media (max-width: 768px)': {
            padding: '24px 20px',
          },
        })}>
          <div className={css({
            fontFamily: 'body',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '16px',
          })}>
            PERSONAL
          </div>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '10px' })}>
            <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' })}>
              <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'textMuted' })}>Holes in One</span>
              <span className={css({ fontFamily: 'display', fontSize: '24px', fontWeight: 'bold', color: 'accentBright' })}>
                {personal.holesInOne}
              </span>
            </div>
            <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' })}>
              <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'textMuted' })}>Sport</span>
              <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'textSecondary' })}>{personal.sport}</span>
            </div>
            <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' })}>
              <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'textMuted' })}>Teams</span>
              <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'textSecondary', textAlign: 'right' })}>
                {personal.teams.join(' · ')}
              </span>
            </div>
            <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' })}>
              <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'textMuted' })}>Current Focus</span>
              <span className={css({ fontFamily: 'body', fontSize: '13px', color: 'textSecondary', textAlign: 'right' })}>
                {personal.currentFocus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}