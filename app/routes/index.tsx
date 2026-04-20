import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* Hero Zone */}
      <Box
        className={css({
          minHeight: '72vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '80px',
          paddingTop: '128px',
          paddingLeft: '64px',
          paddingRight: '64px',
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '96px',
            paddingBottom: '48px',
            minHeight: '60vh',
          },
        })}
      >
        <Box
          className={css({
            fontFamily: 'heading',
            fontSize: 'clamp(52px, 9vw, 128px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            fontWeight: 'bold',
            color: 'text',
            marginBottom: '24px',
          })}
        >
          Doug
          <br />
          March
        </Box>
        <Flex
          className={css({
            gap: '32px',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            '@media (max-width: 767px)': {
              gap: '16px',
              flexDirection: 'column',
            },
          })}
        >
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: 'normal',
              color: 'text-secondary',
              maxWidth: '480px',
            })}
          >
            {identity.role}
          </Box>
          <Box
            className={css({
              fontFamily: 'mono',
              fontSize: '9px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'text-muted',
            })}
          >
            Portfolio · 2026
          </Box>
        </Flex>
      </Box>

      {/* Hairline rule */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        })}
      >
        <Box className={css({ height: '1px', background: 'border' })} />
      </Box>

      {/* Featured Project */}
      {featuredProject && (
        <Box
          className={css({
            maxWidth: '1228px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '64px',
            paddingRight: '64px',
            paddingTop: '96px',
            paddingBottom: '96px',
            '@media (max-width: 767px)': {
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '56px',
              paddingBottom: '56px',
            },
          })}
        >
          <Box
            className={css({
              fontFamily: 'mono',
              fontSize: '9px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'accent',
              marginBottom: '24px',
            })}
          >
            Featured Project
          </Box>
          <a
            href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
            target={featuredProject.externalUrl ? '_blank' : undefined}
            rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
            className={css({
              textDecoration: 'none',
              display: 'block',
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            <Box
              className={css({
                fontFamily: 'heading',
                fontSize: 'clamp(28px, 4vw, 50px)',
                lineHeight: 'snug',
                letterSpacing: 'normal',
                fontWeight: 'semibold',
                color: 'text',
                marginBottom: '16px',
                transition: 'color 180ms ease',
                _hover: { color: 'accent' },
              })}
            >
              {featuredProject.title}
            </Box>
          </a>
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: 'normal',
              color: 'text-secondary',
              maxWidth: '600px',
              marginBottom: '16px',
            })}
          >
            {featuredProject.problem}
          </Box>
          <Flex
            gap="16px"
            className={css({
              fontFamily: 'mono',
              fontSize: '9px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'text-muted',
            })}
          >
            <span>{featuredProject.year}</span>
            <span>·</span>
            <span style={{ color: '#C05828' }}>{featuredProject.type}</span>
            {featuredProject.role && (
              <>
                <span>·</span>
                <span>{featuredProject.role}</span>
              </>
            )}
          </Flex>
        </Box>
      )}

      {/* Hairline rule */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        })}
      >
        <Box className={css({ height: '1px', background: 'border' })} />
      </Box>

      {/* Selected Work - Asymmetric Grid */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '96px',
          paddingBottom: '96px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '56px',
            paddingBottom: '56px',
          },
        })}
      >
        <Box
          className={css({
            fontFamily: 'heading',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '56px',
          })}
        >
          Selected Work
        </Box>

        <Box
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            columnGap: '32px',
            rowGap: '56px',
            '@media (max-width: 767px)': {
              gridTemplateColumns: '1fr',
              rowGap: '40px',
            },
          })}
        >
          {selectedWork.map((project, i) => {
            const colSpans = [
              '1 / 9',   // 8 cols left-anchored
              '5 / 13',  // 8 cols right-anchored offset
              '1 / 7',   // 6 cols left
            ]
            const colSpan = colSpans[i % colSpans.length]

            return (
              <Box
                key={project.slug}
                className={css({
                  gridColumn: colSpan,
                  paddingTop: '24px',
                  borderTop: '1px solid',
                  borderColor: 'border',
                  transition: 'background 180ms ease',
                  '@media (max-width: 767px)': {
                    gridColumn: '1 / -1',
                  },
                })}
              >
                <a
                  href={`/work/${project.slug}`}
                  className={css({
                    textDecoration: 'none',
                    display: 'block',
                    _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
                  })}
                >
                  <Box
                    className={css({
                      fontFamily: 'heading',
                      fontSize: '21px',
                      lineHeight: 'snug',
                      letterSpacing: 'normal',
                      fontWeight: 'semibold',
                      color: 'text',
                      marginBottom: '8px',
                      transition: 'color 180ms ease',
                      _hover: { color: 'accent' },
                    })}
                  >
                    {project.title}
                  </Box>
                </a>
                <Flex
                  gap="16px"
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '9px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'text-muted',
                    height: '28px',
                    alignItems: 'center',
                  })}
                >
                  <span>{project.year}</span>
                  <span>·</span>
                  <span>{project.type}</span>
                  {project.role && (
                    <>
                      <span>·</span>
                      <span>{project.role}</span>
                    </>
                  )}
                </Flex>
                {project.problem && (
                  <Box
                    className={css({
                      fontFamily: 'body',
                      fontSize: '16px',
                      lineHeight: 'normal',
                      color: 'text-secondary',
                      maxWidth: '520px',
                      marginTop: '12px',
                    })}
                  >
                    {project.problem}
                  </Box>
                )}
              </Box>
            )
          })}
        </Box>
      </Box>

      {/* Hairline rule */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        })}
      >
        <Box className={css({ height: '1px', background: 'border' })} />
      </Box>

      {/* Experiments */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '96px',
          paddingBottom: '48px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '56px',
            paddingBottom: '32px',
          },
        })}
      >
        <Box
          className={css({
            fontFamily: 'heading',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '40px',
          })}
        >
          Experiments
        </Box>

        <VStack gap="0" align="stretch">
          {experiments.map((exp) => (
            <a
              key={exp.slug}
              href={exp.externalUrl || `/work/${exp.slug}`}
              target={exp.externalUrl ? '_blank' : undefined}
              rel={exp.externalUrl ? 'noopener noreferrer' : undefined}
              className={css({
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                paddingTop: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid',
                borderColor: 'border',
                transition: 'background 180ms ease',
                minHeight: '44px',
                flexWrap: 'wrap',
                gap: '8px',
                _hover: { background: 'accent-glow' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              <Box
                className={css({
                  fontFamily: 'heading',
                  fontSize: '16px',
                  lineHeight: 'snug',
                  fontWeight: 'semibold',
                  color: 'text',
                  transition: 'color 180ms ease',
                })}
              >
                {exp.title}
              </Box>
              <Flex
                gap="16px"
                className={css({
                  fontFamily: 'mono',
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'text-muted',
                })}
              >
                <span>{exp.type}</span>
                <span>{exp.year}</span>
              </Flex>
            </a>
          ))}
        </VStack>
      </Box>

      {/* Golf editorial footnote */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '48px',
          paddingBottom: '48px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        })}
      >
        <Box className={css({ height: '1px', background: 'border', marginBottom: '16px' })} />
        <Flex
          justify="space-between"
          align="baseline"
          className={css({
            fontFamily: 'body',
            fontSize: '9px',
            letterSpacing: '0.08em',
            color: '{colors.sage.300}',
            flexWrap: 'wrap',
            gap: '8px',
          })}
        >
          <span>RBC Heritage — M. Fitzpatrick −19 · Harbour Town</span>
          <span className={css({ fontStyle: 'italic' })}>precision over power</span>
        </Flex>
      </Box>

      {/* Footer */}
      <Box
        className={css({
          background: 'bg-footer',
          padding: '48px 64px',
          marginTop: '48px',
          '@media (max-width: 767px)': {
            padding: '32px 24px',
          },
        })}
      >
        <Flex
          justify="space-between"
          align="baseline"
          className={css({
            maxWidth: '1100px',
            marginLeft: 'auto',
            marginRight: 'auto',
            flexWrap: 'wrap',
            gap: '16px',
          })}
        >
          <Box
            className={css({
              fontFamily: 'mono',
              fontSize: '9px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'text-footer',
            })}
          >
            © 2026 Doug March
          </Box>
          <Flex gap="24px" align="center">
            <a
              href="/archive"
              className={css({
                fontFamily: 'mono',
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '{colors.sage.400}',
                textDecoration: 'none',
                padding: '8px 0',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 180ms ease',
                _hover: { color: 'text-footer' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              Archive
            </a>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}