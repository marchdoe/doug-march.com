import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const kickerCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4',
  flexWrap: 'wrap',
  color: 'accent',
  fontFamily: 'body',
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'lowercase',
  fontWeight: 'semibold',
  marginBottom: { base: '4', md: '5' },
})

const ruleCss = css({ flex: 1, height: '1px', background: 'border', minWidth: '10' })

const sectHeadCss = css({
  fontFamily: 'body',
  fontSize: 'sm',
  letterSpacing: 'widest',
  textTransform: 'lowercase',
  fontWeight: 'semibold',
  color: 'accentGlow',
  paddingBottom: '2',
  marginBottom: '4',
  borderBottom: '1px solid',
  borderBottomColor: 'border',
})

const almanacItemCss = css({
  paddingY: '3',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const kCss = css({
  display: 'block',
  marginBottom: '1',
  fontFamily: 'body',
  fontSize: '2xs',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textSubtle',
})

const vCss = css({ fontFamily: 'display', fontSize: 'sm', lineHeight: 'loose', color: 'plum.200' })

function AboutPage() {
  return (
    <>
      <section
        className={css({
          minHeight: { base: 'auto', md: '36vh' },
          padding: { base: '5', md: '7' },
          paddingX: { base: '4', md: '8' },
          borderBottom: '3px double',
          borderBottomColor: 'border',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        })}
      >
        <div className={kickerCss}>
          <span>The Masthead</span>
          <span className={ruleCss} />
          <span>{identity.role}</span>
        </div>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'accentGlow',
            maxWidth: '22ch',
          })}
        >
          {identity.statement}
        </h1>
      </section>

      <main
        className={css({
          padding: { base: '5', md: '6' },
          paddingX: { base: '4', md: '8' },
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: 'repeat(12, 1fr)' },
          gap: '8',
        })}
      >
        <section className={css({ gridColumn: { base: '1/-1', md: '1 / span 8' } })}>
          <h2 className={sectHeadCss}>The Record — Timeline</h2>
          {timeline.map((t) => (
            <div
              key={`${t.year}-${t.role}`}
              className={css({ paddingY: '4', borderBottom: '1px solid', borderColor: 'border' })}
            >
              <div
                className={css({
                  display: 'flex',
                  gap: '4',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                })}
              >
                <span
                  className={css({
                    minWidth: '120px',
                    flex: 'none',
                    fontFamily: 'body',
                    fontSize: 'xs',
                    letterSpacing: 'wider',
                    textTransform: 'uppercase',
                    color: t.current ? 'accentGlow' : 'textSubtle',
                  })}
                >
                  {t.year}
                </span>
                <span className={css({ fontFamily: 'display', fontSize: 'lg', color: 'text' })}>
                  {t.role} <span className={css({ color: 'textMuted' })}>— {t.company}</span>
                </span>
              </div>
              <p
                className={css({
                  fontSize: 'sm',
                  lineHeight: 'loose',
                  color: 'plum.200',
                  marginTop: '2',
                  maxWidth: '60ch',
                })}
              >
                {t.description}
              </p>
            </div>
          ))}
        </section>

        <aside className={css({ gridColumn: { base: '1/-1', md: '9 / span 4' } })}>
          <h2 className={sectHeadCss}>Standings &amp; Almanac</h2>

          <div className={css({ marginBottom: '5' })}>
            <span className={kCss}>Capabilities</span>
            <ul className={css({ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '2' })}>
              {capabilities.map((c) => (
                <li
                  key={c}
                  className={css({
                    fontFamily: 'body',
                    fontSize: '2xs',
                    letterSpacing: 'wider',
                    textTransform: 'lowercase',
                    fontWeight: 'semibold',
                    color: 'text',
                    border: '1px solid',
                    borderColor: 'border',
                    paddingX: '2',
                    paddingY: '1',
                  })}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className={almanacItemCss}>
            <span className={kCss}>Education</span>
            <span className={vCss}>
              {education.school} — {education.degree}
              <br />
              {education.concentration} · {education.years}
            </span>
          </div>

          <div className={almanacItemCss}>
            <span className={kCss}>Holes in one</span>
            <span className={vCss}>
              {personal.holesInOne} · {personal.sport}
            </span>
          </div>
          <div className={almanacItemCss}>
            <span className={kCss}>Teams</span>
            <span className={vCss}>{personal.teams.join(' · ')}</span>
          </div>
          <div className={almanacItemCss}>
            <span className={kCss}>Current focus</span>
            <span className={vCss}>{personal.currentFocus}</span>
          </div>
        </aside>
      </main>
    </>
  )
}
