import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" width="100%">
      {/* Beat 1: Hero */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        className={css({
          minHeight: 'calc(100vh - 56px)',
          backgroundColor: '#FAFAF6',
          padding: '96px 32px',
          '@media (max-width: 767px)': {
            padding: '64px 24px',
            minHeight: 'calc(100vh - 56px)',
          },
        })}
      >
        <Box maxWidth="760px" width="100%">
          <Box
            className={css({
              fontFamily: 'display',
              fontWeight: 'semibold',
              fontSize: 'clamp(2rem, 5vw, 3.125rem)',
              lineHeight: '1.10',
              color: '{colors.neutral.700}',
              marginBottom: '24px',
            })}
          >
            Doug March
          </Box>
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'medium',
              fontSize: '1rem',
              letterSpacing: '0.08em',
              color: '{colors.neutral.500}',
              marginBottom: '48px',
              textTransform: 'uppercase',
            })}
          >
            Product Designer &amp; Developer
          </Box>
          <Box
            className={css({
              fontFamily: 'display',
              fontWeight: 'normal',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.313rem)',
              lineHeight: '1.60',
              color: '{colors.neutral.600}',
              maxWidth: '560px',
            })}
          >
            Designing and building digital products at the intersection of craft and code. Focused on the details that make software feel considered.
          </Box>
        </Box>
      </Box>

      {/* Beat 2: Featured Project */}
      {featuredProject && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          className={css({
            minHeight: '80vh',
            justifyContent: 'center',
            padding: '96px 32px',
            backgroundColor: '{colors.neutral.50}',
            '@media (max-width: 767px)': {
              padding: '64px 24px',
              minHeight: '60vh',
            },
          })}
        >
          <Box maxWidth="760px" width="100%">
            <Box
              className={css({
                fontFamily: 'body',
                fontWeight: 'bold',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                color: '{colors.celadon.default}',
                textTransform: 'uppercase',
                marginBottom: '32px',
              })}
            >
              Featured
            </Box>
            <a
              href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
              target={featuredProject.externalUrl ? '_blank' : undefined}
              rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
              className={css({
                textDecoration: 'none',
                display: 'block',
                _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '4px', borderRadius: 'md' },
              })}
            >
              <Box
                className={css({
                  fontFamily: 'display',
                  fontWeight: 'semibold',
                  fontSize: 'clamp(1.75rem, 4vw, 3.125rem)',
                  lineHeight: '1.10',
                  color: '{colors.neutral.700}',
                  marginBottom: '24px',
                  transition: 'color 200ms ease',
                  _hover: { color: '{colors.celadon.default}' },
                })}
              >
                {featuredProject.title}
              </Box>
            </a>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: 'clamp(1rem, 2vw, 1.313rem)',
                lineHeight: '1.60',
                color: '{colors.neutral.500}',
                maxWidth: '600px',
              })}
            >
              {featuredProject.problem}
            </Box>
            <a
              href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
              target={featuredProject.externalUrl ? '_blank' : undefined}
              rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
              className={css({
                display: 'inline-block',
                marginTop: '32px',
                fontFamily: 'body',
                fontSize: '0.875rem',
                fontWeight: 'medium',
                color: '{colors.celadon.default}',
                textDecoration: 'none',
                padding: '12px 24px',
                border: '1px solid {colors.celadon.default}',
                borderRadius: '3px',
                minHeight: '44px',
                transition: 'background-color 200ms ease, color 200ms ease',
                _hover: { backgroundColor: '{colors.celadon.default}', color: '#FAFAF6' },
                _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '2px' },
              })}
            >
              View Project ↗
            </a>
          </Box>
        </Box>
      )}

      {/* Beat 3: Work Index */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        className={css({
          padding: '96px 48px',
          backgroundColor: '{colors.neutral.50}',
          '@media (max-width: 767px)': {
            padding: '64px 24px',
          },
        })}
      >
        <Box maxWidth="1040px" width="100%">
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '{colors.neutral.400}',
              textTransform: 'uppercase',
              marginBottom: '48px',
            })}
          >
            Selected Work
          </Box>
          <VStack gap="0" width="100%" alignItems="stretch">
            {selectedWork.map((project) => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className={css({
                  textDecoration: 'none',
                  display: 'block',
                  padding: '32px 0',
                  borderBottom: '1px solid {colors.neutral.200}',
                  transition: 'background-color 200ms ease',
                  _hover: { backgroundColor: 'rgba(90, 173, 165, 0.06)' },
                  _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '-2px', borderRadius: 'md' },
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                  },
                })}
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="baseline"
                  flexWrap="wrap"
                  gap="16"
                >
                  <Box
                    className={css({
                      fontFamily: 'display',
                      fontWeight: 'semibold',
                      fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                      lineHeight: '1.10',
                      color: '{colors.neutral.700}',
                      transition: 'color 200ms ease',
                      'a:hover &': { color: '{colors.celadon.default}' },
                    })}
                  >
                    {project.title}
                  </Box>
                  <Flex gap="16" alignItems="baseline">
                    <Box
                      className={css({
                        fontFamily: 'body',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        color: '{colors.neutral.400}',
                        textTransform: 'uppercase',
                      })}
                    >
                      {project.type}
                    </Box>
                    <Box
                      className={css({
                        fontFamily: 'body',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        color: '{colors.neutral.400}',
                        fontVariantNumeric: 'tabular-nums',
                      })}
                    >
                      {project.year}
                    </Box>
                  </Flex>
                </Flex>
              </a>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* Beat 4: Pistons Score Band */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        className={css({
          minHeight: '60vh',
          backgroundColor: '{colors.neutral.800}',
          padding: '80px 48px',
          '@media (max-width: 767px)': {
            padding: '64px 24px',
            minHeight: '50vh',
          },
        })}
      >
        <Box textAlign="center">
          <Box
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: 'clamp(72px, 14vw, 168px)',
              lineHeight: '0.92',
              letterSpacing: '-0.03em',
              marginBottom: '32px',
              '@media (max-width: 480px)': {
                fontSize: 'clamp(48px, 12vw, 72px)',
              },
            })}
          >
            <span className={css({ color: '{colors.gold.default}' })}>DET 88</span>
            <span className={css({ color: '{colors.neutral.600}' })}> — </span>
            <span className={css({ color: '{colors.neutral.100}' })}>94</span>
          </Box>
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: '0.875rem',
              letterSpacing: '0.12em',
              color: '{colors.neutral.400}',
              textTransform: 'uppercase',
            })}
          >
            APR 27 · Close game. Wrong outcome. Moving on.
          </Box>
        </Box>
      </Box>

      {/* Beat 5: Experiments */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        className={css({
          padding: '96px 48px',
          backgroundColor: '{colors.neutral.50}',
          '@media (max-width: 767px)': {
            padding: '64px 24px',
          },
        })}
      >
        <Box maxWidth="1040px" width="100%">
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '{colors.neutral.400}',
              textTransform: 'uppercase',
              marginBottom: '48px',
            })}
          >
            Experiments
          </Box>
          <VStack gap="0" width="100%" alignItems="stretch">
            {experiments.map((project) => (
              <a
                key={project.slug}
                href={project.externalUrl || `/work/${project.slug}`}
                target={project.externalUrl ? '_blank' : undefined}
                rel={project.externalUrl ? 'noopener noreferrer' : undefined}
                className={css({
                  textDecoration: 'none',
                  display: 'block',
                  padding: '24px 0',
                  borderBottom: '1px solid {colors.neutral.200}',
                  transition: 'background-color 200ms ease',
                  _hover: { backgroundColor: 'rgba(90, 173, 165, 0.06)' },
                  _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '-2px', borderRadius: 'md' },
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                  },
                })}
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="baseline"
                  flexWrap="wrap"
                  gap="16"
                >
                  <Box
                    className={css({
                      fontFamily: 'display',
                      fontWeight: 'semibold',
                      fontSize: 'clamp(1rem, 2vw, 1.313rem)',
                      lineHeight: '1.10',
                      color: '{colors.neutral.700}',
                    })}
                  >
                    {project.title}
                  </Box>
                  <Flex gap="16" alignItems="baseline">
                    <Box
                      className={css({
                        fontFamily: 'body',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        color: '{colors.neutral.400}',
                        textTransform: 'uppercase',
                      })}
                    >
                      {project.type}
                    </Box>
                    <Box
                      className={css({
                        fontFamily: 'body',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        color: '{colors.neutral.400}',
                        fontVariantNumeric: 'tabular-nums',
                      })}
                    >
                      {project.year}
                    </Box>
                  </Flex>
                </Flex>
              </a>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* Beat 6: Marley Quote */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        className={css({
          minHeight: '50vh',
          backgroundColor: '{colors.neutral.50}',
          padding: '120px 48px',
          '@media (max-width: 767px)': {
            padding: '80px 24px',
          },
        })}
      >
        <Box textAlign="center" maxWidth="640px">
          <Box
            className={css({
              width: '80px',
              height: '1px',
              backgroundColor: '{colors.gold.default}',
              margin: '0 auto 48px auto',
            })}
          />
          <Box
            className={css({
              fontFamily: 'display',
              fontWeight: 'normal',
              fontStyle: 'italic',
              fontSize: 'clamp(1.5rem, 4.5vw, 3.25rem)',
              lineHeight: '1.35',
              color: '{colors.neutral.700}',
              marginBottom: '32px',
            })}
          >
            "Just because you are happy it does not mean that the day is perfect but that you have looked beyond its imperfections."
          </Box>
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: '{colors.neutral.400}',
              textTransform: 'uppercase',
            })}
          >
            — Bob Marley
          </Box>
        </Box>
      </Box>

      {/* Beat 7: Footer */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        className={css({
          padding: '64px 48px',
          backgroundColor: '{colors.neutral.900}',
          '@media (max-width: 767px)': {
            padding: '48px 24px',
          },
        })}
      >
        <Flex
          maxWidth="1040px"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap="16"
        >
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: '{colors.neutral.400}',
            })}
          >
            © 2026 Doug March
          </Box>
          <Flex gap="24" alignItems="center">
            <a
              href="/about"
              className={css({
                fontFamily: 'body',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                color: '{colors.neutral.400}',
                textDecoration: 'none',
                padding: '8px 4px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                _hover: { color: '{colors.neutral.200}' },
                _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '2px' },
              })}
            >
              About
            </a>
            <a
              href="/archive"
              className={css({
                fontFamily: 'body',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                color: '{colors.neutral.400}',
                textDecoration: 'none',
                padding: '8px 4px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                _hover: { color: '{colors.neutral.200}' },
                _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '2px' },
              })}
            >
              Archive
            </a>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}