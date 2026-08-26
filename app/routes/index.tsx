import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

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

function HomePage() {
  return (
    <>
      {/* HEADLINE BANNER */}
      <section
        className={css({
          minHeight: { base: 'auto', md: '44vh' },
          padding: { base: '5', md: '7' },
          paddingX: { base: '4', md: '8' },
          borderBottom: '3px double',
          borderBottomColor: 'border',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        })}
      >
        <div
          className={css({
            position: 'absolute',
            inset: 0,
            background: 'accent',
            opacity: 0.06,
            pointerEvents: 'none',
          })}
        />
        <div className={kickerCss}>
          <span>The Front Page</span>
          <span className={ruleCss} />
          <span>Vol. MMXXVI · No. 210</span>
        </div>
        <h1
          className={css({
            position: 'relative',
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(2.75rem, 7.5vw, 6.75rem)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            maxWidth: '16ch',
          })}
        >
          <span className={css({ color: 'accentGlow', fontStyle: 'italic' })}>Confidence</span> is
          what you have before you understand the problem.
        </h1>
        <p
          className={css({
            position: 'relative',
            marginTop: { base: '4', md: '5' },
            fontFamily: 'body',
            fontSize: 'sm',
            letterSpacing: 'wide',
            color: 'textMuted',
          })}
        >
          — Woody Allen, quoted this morning on the demolition &amp; rebuild desk
        </p>
      </section>

      {/* BODY */}
      <main
        className={css({
          padding: { base: '5', md: '6' },
          paddingX: { base: '4', md: '8' },
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: 'repeat(12, 1fr)' },
          gap: '8',
        })}
      >
        {/* ABOUT / MANIFESTO */}
        <section className={css({ gridColumn: { base: '1/-1', md: '1 / span 4' } })}>
          <h2 className={sectHeadCss}>The Standfirst</h2>
          <p
            className={css({
              fontSize: 'lg',
              lineHeight: 'snug',
              color: 'text',
              marginBottom: '4',
            })}
          >
            <span className={css({ color: 'accentGlow' })}>Doug March</span> designs and builds
            software, then hands it to a machine that redraws it every night on nerve alone.
          </p>
          <p
            className={css({
              fontSize: 'sm',
              lineHeight: 'loose',
              color: 'plum.200',
              marginBottom: '3',
              maxWidth: '34ch',
            })}
          >
            This portfolio demolishes and rebuilds its own design every single day — new palette,
            new archetype, new composition — with total swagger and zero certainty about what
            tomorrow&rsquo;s page will be. Today it is a front page.
          </p>
          <p
            className={css({
              fontSize: 'sm',
              lineHeight: 'loose',
              color: 'plum.200',
              marginBottom: '3',
              maxWidth: '34ch',
            })}
          >
            The premise runs entirely on the aphorism above it: the confidence to ship precedes the
            understanding of the problem. See the full record on the{' '}
            <a
              href="/about"
              className={css({
                color: 'accentGlow',
                textDecoration: 'underline',
                _hover: { color: 'accent' },
              })}
            >
              About page
            </a>{' '}
            or the Work index below.
          </p>
          <div
            className={css({
              marginTop: '5',
              paddingTop: '3',
              borderTop: '1px solid',
              borderTopColor: 'border',
            })}
          >
            <span
              className={css({
                display: 'block',
                marginBottom: '2',
                fontFamily: 'body',
                fontSize: '2xs',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                fontWeight: 'semibold',
                color: 'textSubtle',
              })}
            >
              Byline
            </span>
            <span className={css({ fontSize: 'sm', color: 'textMuted' })}>
              Doug March — Product designer &amp; engineer, founder, occasional golfer.
            </span>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section
          className={css({
            gridColumn: { base: '1/-1', md: '5 / span 4' },
            paddingX: { base: '0', md: '6' },
            borderLeft: { base: 'none', md: '1px solid' },
            borderRight: { base: 'none', md: '1px solid' },
            borderColor: 'border',
            borderTop: { base: '1px solid', md: 'none' },
            borderBottom: { base: '1px solid', md: 'none' },
            paddingY: { base: '6', md: '0' },
            marginY: { base: '6', md: '0' },
          })}
        >
          <h2 className={sectHeadCss}>Selected Work &amp; The Lab</h2>

          {featuredProject && (
            <article
              className={css({
                background: 'panel',
                border: '1px solid',
                borderColor: 'border',
                padding: '4',
                marginBottom: '6',
              })}
            >
              <span
                className={css({
                  display: 'block',
                  color: 'accent',
                  fontFamily: 'body',
                  fontSize: '2xs',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  marginBottom: '2',
                })}
              >
                Featured · {featuredProject.type} · {featuredProject.year}
              </span>
              <h3
                className={css({
                  fontFamily: 'display',
                  fontWeight: 'bold',
                  fontSize: 'xl',
                  lineHeight: 'snug',
                  marginBottom: '2',
                })}
              >
                {featuredProject.title}
              </h3>
              {featuredProject.problem && (
                <p
                  className={css({
                    fontSize: 'sm',
                    lineHeight: 'loose',
                    color: 'plum.200',
                    marginBottom: '3',
                  })}
                >
                  {featuredProject.problem}
                </p>
              )}
              {featuredProject.externalUrl && (
                <a
                  href={featuredProject.externalUrl}
                  target="_blank"
                  rel="noopener"
                  className={css({
                    fontFamily: 'body',
                    fontSize: 'xs',
                    fontWeight: 'semibold',
                    letterSpacing: 'wide',
                    color: 'accentGlow',
                    textDecoration: 'underline',
                    _hover: { color: 'accent' },
                  })}
                >
                  Read the running story ↗
                </a>
              )}
            </article>
          )}

          <ul className={css({ listStyle: 'none' })}>
            {selectedWork.map((p) => (
              <li
                key={p.slug}
                className={css({ borderBottom: '1px solid', borderColor: 'border' })}
              >
                <a
                  href={`/work/${p.slug}`}
                  className={css({
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'baseline',
                    gap: '3',
                    paddingY: '3',
                    _hover: { color: 'accent' },
                  })}
                >
                  <span className={css({ fontFamily: 'display', fontSize: 'lg', color: 'text' })}>
                    {p.title}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '2xs',
                      letterSpacing: 'wider',
                      textTransform: 'uppercase',
                      color: 'textSubtle',
                      whiteSpace: 'nowrap',
                    })}
                  >
                    {p.type} · {p.year}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <h3
            className={css({
              marginTop: '6',
              marginBottom: '2',
              fontFamily: 'body',
              fontSize: 'xs',
              letterSpacing: 'widest',
              textTransform: 'lowercase',
              fontWeight: 'semibold',
              color: 'textSubtle',
            })}
          >
            From the Lab — Experiments
          </h3>
          <ul className={css({ listStyle: 'none' })}>
            {experiments.map((p) => (
              <li
                key={p.slug}
                className={css({ borderBottom: '1px solid', borderColor: 'border' })}
              >
                <a
                  href={p.externalUrl ?? p.liveUrl ?? `/work/${p.slug}`}
                  target={p.externalUrl || p.liveUrl ? '_blank' : undefined}
                  rel={p.externalUrl || p.liveUrl ? 'noopener' : undefined}
                  className={css({
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'baseline',
                    gap: '3',
                    paddingY: '3',
                    _hover: { color: 'accent' },
                  })}
                >
                  <span className={css({ fontFamily: 'display', fontSize: 'lg', color: 'text' })}>
                    {p.title}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '2xs',
                      letterSpacing: 'wider',
                      textTransform: 'uppercase',
                      color: 'textSubtle',
                      whiteSpace: 'nowrap',
                    })}
                  >
                    {p.type} · {p.year}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* SIGNAL ALMANAC */}
        <aside className={css({ gridColumn: { base: '1/-1', md: '9 / span 4' } })}>
          <h2 className={sectHeadCss}>Standings &amp; Almanac</h2>

          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '4',
              paddingBottom: '3',
              marginBottom: '4',
              borderBottom: '1px solid',
              borderColor: 'border',
            })}
          >
            <div
              className={css({ position: 'relative', width: '46px', height: '46px', flex: 'none' })}
            >
              <div
                className={css({
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'full',
                  background: 'accent',
                })}
              />
              <div
                className={css({
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  width: '70%',
                  height: '70%',
                  borderRadius: 'full',
                  background: 'accentGlow',
                  opacity: 0.7,
                })}
              />
            </div>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '2xs',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                color: 'textMuted',
                lineHeight: 'loose',
              })}
            >
              Tonight&rsquo;s sky
              <br />
              <strong className={css({ color: 'accentGlow', fontWeight: 'semibold' })}>
                Full Moon · 99%
              </strong>{' '}
              illumination
            </span>
          </div>

          <div
            className={css({
              background: 'panel',
              border: '1px solid',
              borderColor: 'border',
              padding: '4',
              marginBottom: '5',
              textAlign: 'center',
            })}
          >
            <span
              className={css({
                display: 'block',
                marginBottom: '2',
                fontFamily: 'body',
                fontSize: '2xs',
                letterSpacing: 'widest',
                textTransform: 'lowercase',
                color: 'textSubtle',
              })}
            >
              The day&rsquo;s loud win · MLB
            </span>
            <span className={css({ fontFamily: 'display', fontSize: 'lg', color: 'text' })}>
              DET{' '}
              <span
                className={css({
                  fontSize: '2xl',
                  fontWeight: 'bold',
                  color: 'accentGlow',
                  display: 'block',
                  lineHeight: 'tight',
                })}
              >
                14
              </span>{' '}
              CWS · 0
            </span>
            <span
              className={css({
                display: 'block',
                marginTop: '2',
                fontFamily: 'body',
                fontSize: 'xs',
                letterSpacing: 'wide',
                textTransform: 'lowercase',
                color: 'text',
              })}
            >
              Shutout
            </span>
          </div>

          {[
            { k: 'On the turntable', v: 'Guided by Voices · My Morning Jacket' },
            { k: 'Golf watch', v: 'Rocket Classic · scheduled' },
            { k: 'Weather of the desk', v: 'Confident. Highs of swagger, lows of understanding.' },
          ].map((item) => (
            <div
              key={item.k}
              className={css({ paddingY: '3', borderBottom: '1px solid', borderColor: 'border' })}
            >
              <span
                className={css({
                  display: 'block',
                  marginBottom: '1',
                  fontFamily: 'body',
                  fontSize: '2xs',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textSubtle',
                })}
              >
                {item.k}
              </span>
              <span
                className={css({
                  fontFamily: 'display',
                  fontSize: 'sm',
                  lineHeight: 'loose',
                  color: 'plum.200',
                })}
              >
                {item.v}
              </span>
            </div>
          ))}
        </aside>
      </main>
    </>
  )
}
