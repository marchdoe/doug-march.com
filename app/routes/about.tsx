import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Grid } from '../../styled-system/jsx'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      {/* IDENTITY */}
      <section
        className={css({
          bg: 'bg',
          padding: { base: '12 6', md: '16 7vw' },
          minHeight: { base: 'auto', md: '60vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        })}
      >
        <p
          className={css({
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            color: 'textMuted',
            fontWeight: 'bold',
            marginBottom: { base: '5', md: '8' },
          })}
        >
          {identity.name} · {identity.role}
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            textTransform: 'lowercase',
            fontSize: 'clamp(32px, 5vw, 64px)',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'text',
            maxWidth: '46ch',
            margin: 0,
          })}
        >
          {identity.statement}
        </h1>
      </section>

      {/* TIMELINE */}
      <section className={css({ bg: 'bg', padding: { base: '0 6', md: '0 7vw' } })}>
        <div className={css({ display: 'grid' })}>
          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: 'grid',
                gridTemplateColumns: { base: '96px 1fr', md: '120px 1fr' },
                gap: '5',
                padding: { base: '6 0', md: '8 0' },
                borderBottom: '1px solid',
                borderColor: 'border',
                alignItems: 'baseline',
              })}
            >
              <span
                className={css({
                  fontFamily: 'display',
                  fontWeight: 'semibold',
                  fontVariantNumeric: 'tabular-nums',
                  fontSize: 'md',
                  color: entry.current ? 'accent' : 'textSecondary',
                })}
              >
                {entry.year}
              </span>
              <div>
                <div
                  className={css({
                    fontFamily: 'display',
                    fontWeight: 'bold',
                    fontSize: 'lg',
                    color: 'text',
                    letterSpacing: 'tight',
                  })}
                >
                  {entry.role} <span className={css({ color: 'textMuted', fontWeight: 'normal' })}>· {entry.company}</span>
                </div>
                <p className={css({ fontSize: 'sm', color: 'textSecondary', marginTop: '2', maxWidth: '64ch' })}>
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section
        className={css({
          bg: 'cyan.200',
          padding: { base: '10 6', md: '12 7vw' },
        })}
      >
        <p
          className={css({
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            color: 'cyan.800',
            fontWeight: 'bold',
            marginBottom: '6',
          })}
        >
          Capabilities
        </p>
        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
          {capabilities.map((cap) => (
            <span
              key={cap}
              className={css({
                fontSize: '2xs',
                textTransform: 'uppercase',
                letterSpacing: 'widest',
                fontWeight: 'bold',
                color: 'cyan.800',
                bg: 'cardBg',
                padding: '2 4',
                borderRadius: 'full',
                border: '1px solid',
                borderColor: 'cyan.500',
              })}
            >
              {cap}
            </span>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className={css({ bg: 'bg', padding: { base: '10 6', md: '12 7vw' } })}>
        <div
          className={css({
            bg: 'cardBg',
            borderRadius: 'md',
            padding: '6',
            boxShadow: '0 20px 60px -24px rgba(16,107,118,0.28)',
            maxWidth: '52ch',
          })}
        >
          <p className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: 'lg', color: 'text', margin: 0 })}>
            {education.school} — {education.degree}
          </p>
          <p className={css({ fontSize: 'sm', color: 'textSecondary', marginTop: '2' })}>
            {education.concentration} · {education.years}
          </p>
        </div>
      </section>

      {/* PERSONAL EVIDENCE */}
      <section
        className={css({
          bg: 'spineBg',
          color: 'textOnSpine',
          padding: { base: '12 6', md: '16 7vw' },
        })}
      >
        <Grid gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="4">
          <article className={statCardClass}>
            <span className={statTagClass}>Holes in one</span>
            <div className={statScoreClass}>{personal.holesInOne}</div>
            <span className={statCaptionClass}>{personal.sport}</span>
          </article>
          <article className={statCardClass}>
            <span className={statTagClass}>Teams</span>
            <div className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: 'lg', color: 'text' })}>
              {personal.teams.join(' · ')}
            </div>
            <span className={statCaptionClass}>fandom</span>
          </article>
          <article className={statCardClass}>
            <span className={statTagClass}>Current focus</span>
            <div className={css({ fontSize: 'sm', color: 'textSecondary', marginTop: 'auto' })}>
              {personal.currentFocus}
            </div>
          </article>
        </Grid>
      </section>
    </>
  )
}

const statCardClass = css({
  bg: 'cardBg',
  color: 'text',
  borderRadius: 'md',
  padding: '6',
  boxShadow: '0 20px 60px -24px rgba(16,107,118,0.28)',
  display: 'flex',
  flexDirection: 'column',
  gap: '3',
  minHeight: '180px',
})

const statTagClass = css({
  fontSize: '2xs',
  textTransform: 'uppercase',
  letterSpacing: 'widest',
  color: 'textMuted',
  fontWeight: 'bold',
})

const statScoreClass = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  letterSpacing: 'tight',
  fontSize: 'clamp(48px, 7vw, 88px)',
  lineHeight: '0.86',
  color: 'accent',
})

const statCaptionClass = css({
  fontSize: 'xs',
  textTransform: 'uppercase',
  letterSpacing: 'wide',
  color: 'textMuted',
  fontWeight: 'bold',
  marginTop: 'auto',
})