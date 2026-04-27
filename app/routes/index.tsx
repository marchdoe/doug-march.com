import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { Sidebar } from '../components/Sidebar'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* Band 1: Hero */}
      <section
        className={css({
          width: '100%',
          minHeight: { base: '500px', md: '100vh' },
          bg: 'bandHero',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '1100px',
            px: { base: '6', md: '12' },
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            pt: '8',
            pb: '16',
          })}
        >
          <Sidebar />

          <Flex
            alignItems="flex-end"
            pb="16"
            className={css({ gridRow: '2' })}
          >
            <div>
              <h1
                className={css({
                  fontFamily: 'heading',
                  fontSize: 'clamp(48px, 9vw, 104px)',
                  fontWeight: 'semibold',
                  lineHeight: 'tight',
                  letterSpacing: 'tight',
                  color: 'textOnDark',
                  mb: '6',
                })}
              >
                Doug
                <br />
                March
              </h1>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: { base: '16px', md: '21px' },
                  fontWeight: 'normal',
                  lineHeight: 'normal',
                  letterSpacing: 'wide',
                  color: 'textSecondaryOnDark',
                  maxWidth: '480px',
                })}
              >
                Product Designer &amp; Developer
              </p>
            </div>
          </Flex>

          <Flex
            justifyContent="space-between"
            alignItems="flex-end"
            className={css({ gridRow: '3', borderTop: '1px solid', borderColor: 'borderOnDark', pt: '4' })}
          >
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'wider',
                color: 'textMutedOnDark',
                textTransform: 'uppercase',
              })}
            >
              Scroll to explore
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'wider',
                color: 'textMutedOnDark',
              })}
            >
              April 2026
            </span>
          </Flex>
        </div>
      </section>

      {/* Band 2: Featured Project */}
      {featuredProject && (
        <section
          className={css({
            width: '100%',
            minHeight: { base: 'auto', md: '75vh' },
            bg: 'bandFeatured',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          <div
            className={css({
              width: '100%',
              maxWidth: '1100px',
              px: { base: '6', md: '12' },
              py: { base: '16', md: '24' },
              display: 'grid',
              gridTemplateColumns: { base: '1fr', md: '1fr 240px' },
              gap: { base: '8', md: '12' },
              alignItems: 'end',
            })}
          >
            <div>
              <div className={css({ borderTop: '2px solid', borderColor: 'accent', pt: '6', mb: '6' })}>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '12px',
                    letterSpacing: 'widest',
                    color: 'textMuted',
                    textTransform: 'uppercase',
                  })}
                >
                  01 / {featuredProject.year}
                </span>
              </div>
              <h2
                className={css({
                  fontFamily: 'heading',
                  fontSize: { base: '37px', md: '50px' },
                  fontWeight: 'semibold',
                  lineHeight: 'snug',
                  letterSpacing: 'tight',
                  color: 'text',
                  mb: '6',
                })}
              >
                {featuredProject.title}
              </h2>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  maxWidth: '560px',
                  mb: '8',
                })}
              >
                {featuredProject.problem}
              </p>
              {featuredProject.externalUrl && (
                <a
                  href={featuredProject.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    fontWeight: 'medium',
                    letterSpacing: 'wider',
                    color: 'accent',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    padding: '2',
                    _hover: { color: 'accentDark', textDecoration: 'underline' },
                    _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                  })}
                >
                  Visit {featuredProject.title} →
                </a>
              )}
            </div>
            <div className={css({ display: { base: 'none', md: 'block' } })}>
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                })}
              >
                {featuredProject.type}
              </span>
              {featuredProject.role && (
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '12px',
                    lineHeight: 'normal',
                    color: 'textMuted',
                    mt: '2',
                  })}
                >
                  {featuredProject.role}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Band 3: Work Index */}
      <section
        className={css({
          width: '100%',
          bg: 'bandIndex',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '1100px',
            px: { base: '6', md: '12' },
            py: { base: '16', md: '20' },
          })}
        >
          {/* Selected Work */}
          <Box mb="16">
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '9px',
                fontWeight: 'semibold',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textMuted',
                display: 'block',
                mb: '6',
              })}
            >
              Selected Work
            </span>

            <VStack gap="0" alignItems="stretch">
              {selectedWork.map((project, i) => (
                <a
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className={css({
                    display: 'grid',
                    gridTemplateColumns: { base: '3ch 1fr auto', md: '3ch 1fr auto 120px 32px' },
                    alignItems: 'center',
                    gap: '4',
                    height: { base: 'auto', md: '56px' },
                    py: { base: '4', md: '0' },
                    borderBottom: '1px solid',
                    borderColor: 'border',
                    textDecoration: 'none',
                    color: 'text',
                    _hover: { bg: 'bandFeatured' },
                    _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '-2px' },
                  })}
                >
                  <span
                    className={css({
                      fontFamily: 'mono',
                      fontSize: '9px',
                      color: 'textMuted',
                      letterSpacing: 'wider',
                    })}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '16px',
                      fontWeight: 'medium',
                      color: 'text',
                    })}
                  >
                    {project.title}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'mono',
                      fontSize: '12px',
                      color: 'textMuted',
                    })}
                  >
                    {project.year}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '12px',
                      letterSpacing: 'wider',
                      textTransform: 'uppercase',
                      color: 'textMuted',
                      display: { base: 'none', md: 'block' },
                    })}
                  >
                    {project.type}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '14px',
                      color: 'textMuted',
                      transition: 'transform 0.1s ease, color 0.1s ease',
                      display: { base: 'none', md: 'block' },
                      _groupHover: { color: 'accent', transform: 'translateX(4px)' },
                    })}
                  >
                    →
                  </span>
                </a>
              ))}
            </VStack>
          </Box>

          {/* Experiments */}
          <Box>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '9px',
                fontWeight: 'semibold',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textMuted',
                display: 'block',
                mb: '6',
              })}
            >
              Experiments
            </span>

            <VStack gap="0" alignItems="stretch">
              {experiments.map((project, i) => (
                <a
                  key={project.slug}
                  href={project.externalUrl || `/work/${project.slug}`}
                  {...(project.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={css({
                    display: 'grid',
                    gridTemplateColumns: { base: '3ch 1fr auto', md: '3ch 1fr auto 120px 32px' },
                    alignItems: 'center',
                    gap: '4',
                    height: { base: 'auto', md: '56px' },
                    py: { base: '4', md: '0' },
                    borderBottom: '1px solid',
                    borderColor: 'border',
                    textDecoration: 'none',
                    color: 'text',
                    _hover: { bg: 'bandFeatured' },
                    _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '-2px' },
                  })}
                >
                  <span
                    className={css({
                      fontFamily: 'mono',
                      fontSize: '9px',
                      color: 'textMuted',
                      letterSpacing: 'wider',
                    })}
                  >
                    E{String(i + 1).padStart(1, '0')}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '16px',
                      fontWeight: 'medium',
                      color: 'text',
                    })}
                  >
                    {project.title}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'mono',
                      fontSize: '12px',
                      color: 'textMuted',
                    })}
                  >
                    {project.year}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '12px',
                      letterSpacing: 'wider',
                      textTransform: 'uppercase',
                      color: 'textMuted',
                      display: { base: 'none', md: 'block' },
                    })}
                  >
                    {project.type}
                  </span>
                  <span
                    className={css({
                      fontFamily: 'body',
                      fontSize: '14px',
                      color: 'textMuted',
                      display: { base: 'none', md: 'block' },
                    })}
                  >
                    →
                  </span>
                </a>
              ))}
            </VStack>
          </Box>
        </div>
      </section>

      {/* Band 4: Editorial */}
      <section
        className={css({
          width: '100%',
          bg: 'bandEditorial',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '1100px',
            px: { base: '6', md: '12' },
            py: { base: '16', md: '20' },
            display: 'grid',
            gridTemplateColumns: { base: '1fr', md: '2fr 1fr' },
            gap: { base: '12', md: '16' },
          })}
        >
          <div>
            <h3
              className={css({
                fontFamily: 'heading',
                fontSize: { base: '21px', md: '28px' },
                fontWeight: 'semibold',
                lineHeight: 'snug',
                color: 'textOnDark',
                mb: '6',
              })}
            >
              Building things that work
            </h3>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'loose',
                letterSpacing: 'wide',
                color: 'textSecondaryOnDark',
                maxWidth: '640px',
                mb: '6',
              })}
            >
              The work here spans design and development — products built from
              first principles, not templates. Each project starts with a
              genuine problem and earns its complexity through use.
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'loose',
                letterSpacing: 'wide',
                color: 'textSecondaryOnDark',
                maxWidth: '640px',
              })}
            >
              Currently focused on the intersection of design systems and
              developer tools — where the craft of visual communication meets
              the rigor of software architecture.
            </p>
          </div>
          <div>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '9px',
                fontWeight: 'semibold',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textMutedOnDark',
                display: 'block',
                mb: '6',
              })}
            >
              What&rsquo;s catching people&rsquo;s attention
            </span>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                lineHeight: 'loose',
                letterSpacing: 'wide',
                color: 'textSecondaryOnDark',
                mb: '4',
              })}
            >
              &ldquo;I bought Friendster for $30k&rdquo;
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                lineHeight: 'loose',
                letterSpacing: 'wide',
                color: 'secondary',
                mb: '6',
              })}
            >
              — Hacker News, this morning
            </p>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                lineHeight: 'loose',
                letterSpacing: 'wide',
                color: 'textSecondaryOnDark',
              })}
            >
              The AI philosophy thread.
              <br />
              Not because it&rsquo;s solved, but because
              <br />
              the same questions keep cycling back.
            </p>
          </div>
        </div>
      </section>

      {/* Band 5: Footer */}
      <footer
        className={css({
          width: '100%',
          bg: 'bandFooter',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '1100px',
            px: { base: '6', md: '12' },
            py: '12',
            display: 'flex',
            flexDirection: { base: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { base: 'flex-start', md: 'center' },
            gap: '4',
          })}
        >
          <Flex gap="6" alignItems="center" flexWrap="wrap">
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'wider',
                color: 'textMutedOnDark',
              })}
            >
              © 2026 Doug March
            </span>
            <a
              href="/archive"
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'wider',
                color: 'textMutedOnDark',
                textDecoration: 'none',
                _hover: { color: 'textSecondaryOnDark', textDecoration: 'underline' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              Archive
            </a>
          </Flex>
          <Flex alignItems="center" gap="4">
            <Box
              className={css({
                width: '1px',
                height: '16px',
                bg: 'borderOnDark',
                display: { base: 'none', md: 'block' },
              })}
            />
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '10px',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                color: 'textMutedOnDark',
              })}
            >
              DET 8 · HOU 3
            </span>
          </Flex>
        </div>
      </footer>
    </>
  )
}