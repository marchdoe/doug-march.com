import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Fold, FoldGrid, RailTitle } from '../components/FoldGrid'
import { Gloss } from '../components/Gloss'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section
        id="top"
        className={css({
          minHeight: { base: '60vh', md: 'calc(88vh - 60px)' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingY: { base: '8', md: '10' },
        })}
      >
        <div
          className={css({
            fontFamily: 'body',
            fontSize: 'xs',
            fontWeight: 'semibold',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '6',
          })}
        >
          The site rewrites itself by hand each morning ·{' '}
          <b className={css({ color: 'paper.800' })}>Friday 24 July 2026</b>
        </div>
        <h1
          className={css({
            fontFamily: 'heading',
            fontWeight: 'medium',
            fontSize: { base: '40px', md: '80px', lg: '128px' },
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            maxWidth: '14ch',
          })}
        >
          Writing{' '}
          <span
            className={css({
              fontStyle: 'italic',
              fontWeight: 'medium',
              color: 'accent',
              position: 'relative',
              whiteSpace: 'nowrap',
              borderBottom: '0.07em solid',
              borderColor: 'accent',
            })}
          >
            by hand
          </span>{' '}
          is good for your brain
        </h1>
        <div
          className={css({
            marginTop: { base: '6', md: '8' },
            fontFamily: 'body',
            fontSize: 'sm',
            fontWeight: 'semibold',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3',
            alignItems: 'baseline',
          })}
        >
          <span>Neal Stephenson</span>
          <span className={css({ color: 'paper.400' })}>·</span>
          <span>Hacker News</span>
          <span className={css({ color: 'paper.400' })}>·</span>
          <span className={css({ color: 'accent' })}>1,329&#8593;</span>
        </div>
      </section>

      {/* MANIFESTO */}
      <Fold id="manifesto">
        <FoldGrid
          main={
            <div className={css({ maxWidth: '66ch' })}>
              <div
                className={css({
                  fontFamily: 'body',
                  fontSize: 'xs',
                  fontWeight: 'semibold',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'accent',
                  marginBottom: '5',
                })}
              >
                Colophon — today&rsquo;s argument
              </div>
              <h2
                className={css({
                  fontFamily: 'heading',
                  fontWeight: 'medium',
                  fontSize: { base: '28px', md: '44px' },
                  lineHeight: 'snug',
                  letterSpacing: 'tight',
                  color: 'text',
                  marginBottom: '8',
                })}
              >
                A portfolio that tears itself down and re-writes itself every morning has no
                business defending the analog mind. So it does anyway.
              </h2>
              <p
                className={css({
                  fontFamily: 'heading',
                  fontSize: 'md',
                  lineHeight: 'normal',
                  color: 'paper.800',
                  marginBottom: '6',
                  maxWidth: '64ch',
                })}
              >
                <span
                  className={css({
                    float: 'left',
                    fontFamily: 'heading',
                    fontWeight: 'bold',
                    fontSize: '64px',
                    lineHeight: '0.78',
                    padding: '1 3 0 0',
                    color: 'accent',
                  })}
                >
                  T
                </span>
                oday&rsquo;s number-one story argues that moving a pen across paper wires the
                brain in ways typing never will — the slow, deliberate placing of one word after
                another. One slot below it sits{' '}
                <span
                  className={css({
                    color: 'accent',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    textDecorationColor: 'border',
                  })}
                >
                  Flux 3
                </span>
                , a model that automates the moving image. The two headlines are quietly arguing
                with each other, and this page picks a side.
              </p>
              <p
                className={css({
                  fontFamily: 'heading',
                  fontSize: 'md',
                  lineHeight: 'normal',
                  color: 'paper.800',
                  maxWidth: '64ch',
                })}
              >
                Doug March is a founder and designer who builds software the way you&rsquo;d
                hand-set a page: one considered decision at a time. This site is the running
                experiment — every build, a fresh manuscript in a different hand.
              </p>
            </div>
          }
          rail={
            <>
              <RailTitle>In the margin</RailTitle>
              <Gloss label="Day">Friday</Gloss>
              <Gloss label="Sun">05:08 → 19:24</Gloss>
              <Gloss label="Moon">
                Waxing gibbous <span className={css({ color: 'accent', fontWeight: 'semibold' })}>80%</span>
              </Gloss>
            </>
          }
        />
      </Fold>

      {/* FEATURED — vermillion drench */}
      {featuredProject && (
        <section
          id="featured"
          className={css({
            background: 'accent',
            color: 'paper.50',
            marginX: { base: '-6', md: '-6vw' },
            paddingX: { base: '6', md: '6vw' },
            paddingY: { base: '8', md: '10' },
            borderTop: '1px solid',
            borderColor: 'ink.600',
          })}
        >
          <FoldGrid
            main={
              <div>
                <div
                  className={css({
                    fontFamily: 'body',
                    fontSize: 'xs',
                    fontWeight: 'semibold',
                    letterSpacing: 'wider',
                    textTransform: 'uppercase',
                    color: 'paper.200',
                    marginBottom: '5',
                  })}
                >
                  Featured work
                </div>
                <h2
                  className={css({
                    fontFamily: 'heading',
                    fontWeight: 'medium',
                    fontSize: { base: '40px', md: '84px' },
                    lineHeight: 'tight',
                    letterSpacing: 'tight',
                    marginBottom: '7',
                  })}
                >
                  {featuredProject.title}
                </h2>
                <p
                  className={css({
                    fontFamily: 'heading',
                    fontSize: { base: '19px', md: '24px' },
                    lineHeight: 'snug',
                    maxWidth: '52ch',
                    color: 'paper.100',
                    marginBottom: '8',
                  })}
                >
                  {featuredProject.problem}
                </p>
                <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '6', alignItems: 'center' })}>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '2xs',
                      fontWeight: 'semibold',
                      letterSpacing: 'wider',
                      textTransform: 'uppercase',
                      color: 'paper.200',
                      border: '1px solid',
                      borderColor: 'ink.400',
                      paddingX: '3',
                      paddingY: '2',
                    })}
                  >
                    {featuredProject.type} · {featuredProject.year}
                  </span>
                  {featuredProject.externalUrl && (
                    <a
                      href={featuredProject.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={css({
                        fontFamily: 'body',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2',
                        fontSize: 'sm',
                        fontWeight: 'semibold',
                        color: 'paper.50',
                        textDecoration: 'underline',
                        textUnderlineOffset: '5px',
                        textDecorationColor: 'ink.400',
                        _hover: { textDecorationColor: 'paper.50' },
                      })}
                    >
                      Visit the project →
                    </a>
                  )}
                </div>
              </div>
            }
            rail={
              <>
                <div
                  className={css({
                    fontFamily: 'body',
                    fontSize: 'xs',
                    fontWeight: 'semibold',
                    letterSpacing: 'wider',
                    textTransform: 'uppercase',
                    color: 'paper.200',
                    marginBottom: '4',
                  })}
                >
                  Penciled today
                </div>
                <Gloss label="Tigers" tone="inverse">
                  TIGERS 4–3 <span className={css({ fontWeight: 'semibold', borderBottom: '2px solid', borderColor: 'paper.50' })}>W</span>
                </Gloss>
                <Gloss label="3M Open" tone="inverse">
                  Kohles −9
                </Gloss>
              </>
            }
          />
        </section>
      )}

      {/* SELECTED WORK */}
      <Fold id="work">
        <FoldGrid
          main={
            <div>
              <h1
                className={css({
                  fontFamily: 'heading',
                  fontWeight: 'medium',
                  fontSize: { base: '30px', md: '52px' },
                  lineHeight: 'snug',
                  letterSpacing: 'tight',
                  color: 'text',
                  marginBottom: '8',
                  maxWidth: '16ch',
                })}
              >
                Selected work
              </h1>
              <div className={css({ borderTop: '1px solid', borderColor: 'border' })}>
                {selectedWork.map((project) => (
                  <a
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className={css({
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      alignItems: 'baseline',
                      gap: '4',
                      paddingY: '6',
                      paddingLeft: '4',
                      borderBottom: '1px solid',
                      borderLeft: '1px solid',
                      borderColor: 'border',
                      minHeight: '64px',
                      transition: 'border-left-color 140ms ease, padding-left 140ms ease',
                      _hover: { borderLeftColor: 'accent', borderLeftWidth: '3px', paddingLeft: '5' },
                    })}
                  >
                    <span
                      className={css({
                        fontFamily: 'heading',
                        fontWeight: 'medium',
                        fontSize: { base: '26px', md: '40px' },
                        lineHeight: 'snug',
                        letterSpacing: 'tight',
                        color: 'text',
                        _groupHover: { color: 'accent' },
                      })}
                    >
                      {project.title}
                    </span>
                    <span
                      className={css({
                        display: 'flex',
                        gap: '5',
                        alignItems: 'baseline',
                        fontFamily: 'body',
                        fontSize: '2xs',
                        fontWeight: 'semibold',
                        letterSpacing: 'wide',
                        textTransform: 'uppercase',
                        color: 'textMuted',
                        fontVariantNumeric: 'tabular-nums',
                      })}
                    >
                      <span>{project.type}</span>
                      <span className={css({ color: 'paper.800' })}>{project.year}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          }
          rail={
            <>
              <RailTitle>Playing while I write</RailTitle>
              <Gloss label="On rotation">Guided by Voices / Wet Leg / Radiohead</Gloss>
              <Gloss label="Marginal note" note>
                &ldquo;on the same page: Flux 3&rdquo;
              </Gloss>
            </>
          }
        />
      </Fold>

      {/* EXPERIMENTS */}
      <Fold id="experiments">
        <FoldGrid
          main={
            <div>
              <h1
                className={css({
                  fontFamily: 'heading',
                  fontWeight: 'medium',
                  fontSize: { base: '30px', md: '52px' },
                  lineHeight: 'snug',
                  letterSpacing: 'tight',
                  color: 'text',
                  marginBottom: '8',
                  maxWidth: '16ch',
                })}
              >
                Experiments
              </h1>
              <div className={css({ borderTop: '1px solid', borderColor: 'border' })}>
                {experiments.map((project) => (
                  <a
                    key={project.slug}
                    href={project.liveUrl || project.externalUrl || `/work/${project.slug}`}
                    target={project.liveUrl || project.externalUrl ? '_blank' : undefined}
                    rel={project.liveUrl || project.externalUrl ? 'noopener noreferrer' : undefined}
                    className={css({
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      alignItems: 'baseline',
                      gap: '4',
                      paddingY: '6',
                      paddingLeft: '4',
                      borderBottom: '1px solid',
                      borderLeft: '1px solid',
                      borderColor: 'border',
                      minHeight: '64px',
                      transition: 'border-left-color 140ms ease, padding-left 140ms ease',
                      _hover: { borderLeftColor: 'accent', borderLeftWidth: '3px', paddingLeft: '5' },
                    })}
                  >
                    <span
                      className={css({
                        fontFamily: 'heading',
                        fontWeight: 'medium',
                        fontSize: { base: '26px', md: '40px' },
                        lineHeight: 'snug',
                        letterSpacing: 'tight',
                        color: 'text',
                      })}
                    >
                      {project.title}
                    </span>
                    <span
                      className={css({
                        display: 'flex',
                        gap: '5',
                        alignItems: 'baseline',
                        fontFamily: 'body',
                        fontSize: '2xs',
                        fontWeight: 'semibold',
                        letterSpacing: 'wide',
                        textTransform: 'uppercase',
                        color: 'textMuted',
                        fontVariantNumeric: 'tabular-nums',
                      })}
                    >
                      <span>{project.type}</span>
                      <span className={css({ color: 'paper.800' })}>{project.year}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          }
          rail={
            <>
              <RailTitle>Errata</RailTitle>
              <Gloss label="Hand of the day" note>
                Set in Spectral, glossed in Albert Sans — one committed vermillion ink.
              </Gloss>
            </>
          }
        />
      </Fold>
    </>
  )
}