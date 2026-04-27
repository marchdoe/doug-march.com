import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { Sidebar } from '../components/Sidebar'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <section
          className={css({
            width: '100%',
            minHeight: '100vh',
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
              pt: '8',
            })}
          >
            <Sidebar />
            <Box py="20">
              <h1
                className={css({
                  fontFamily: 'heading',
                  fontSize: '37px',
                  fontWeight: 'semibold',
                  color: 'textOnDark',
                  mb: '4',
                })}
              >
                Project not found
              </h1>
              <a
                href="/"
                className={css({
                  fontFamily: 'body',
                  fontSize: '14px',
                  color: 'accentLight',
                  textDecoration: 'none',
                  _hover: { textDecoration: 'underline' },
                  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                })}
              >
                ← Back to home
              </a>
            </Box>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Band 1: Project Hero */}
      <section
        className={css({
          width: '100%',
          minHeight: { base: '400px', md: '70vh' },
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
            gridTemplateRows: 'auto 1fr',
            pt: '8',
            pb: '16',
          })}
        >
          <Sidebar />

          <Flex alignItems="flex-end" pb="8">
            <div>
              <Flex gap="4" mb="4" alignItems="center">
                <span
                  className={css({
                    fontFamily: 'body',
                    fontSize: '12px',
                    letterSpacing: 'widest',
                    textTransform: 'uppercase',
                    color: 'textMutedOnDark',
                  })}
                >
                  {project.type}
                </span>
                <span
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '12px',
                    color: 'textMutedOnDark',
                  })}
                >
                  {project.year}
                </span>
              </Flex>
              <h1
                className={css({
                  fontFamily: 'heading',
                  fontSize: { base: '37px', md: '50px' },
                  fontWeight: 'semibold',
                  lineHeight: 'snug',
                  letterSpacing: 'tight',
                  color: 'textOnDark',
                  mb: '6',
                })}
              >
                {project.title}
              </h1>
              {project.role && (
                <p
                  className={css({
                    fontFamily: 'body',
                    fontSize: '16px',
                    lineHeight: 'normal',
                    color: 'textSecondaryOnDark',
                    mb: '2',
                  })}
                >
                  Role: {project.role}
                </p>
              )}
              {(project.externalUrl || project.liveUrl) && (
                <a
                  href={project.liveUrl || project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    fontWeight: 'medium',
                    letterSpacing: 'wider',
                    color: 'accentLight',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    _hover: { color: 'textOnDark', textDecoration: 'underline' },
                    _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                  })}
                >
                  Visit site →
                </a>
              )}
            </div>
          </Flex>
        </div>
      </section>

      {/* Band 2: Project Detail */}
      <section
        className={css({
          width: '100%',
          bg: 'bandFeatured',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '1100px',
            px: { base: '6', md: '12' },
            py: { base: '16', md: '24' },
          })}
        >
          {project.problem && (
            <Box mb="12">
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '9px',
                  fontWeight: 'semibold',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                  display: 'block',
                  mb: '4',
                })}
              >
                Problem
              </span>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'text',
                  maxWidth: '640px',
                })}
              >
                {project.problem}
              </p>
            </Box>
          )}

          {project.approach && (
            <Box mb="12">
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '9px',
                  fontWeight: 'semibold',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                  display: 'block',
                  mb: '4',
                })}
              >
                Approach
              </span>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'text',
                  maxWidth: '640px',
                })}
              >
                {project.approach}
              </p>
            </Box>
          )}

          {project.outcome && (
            <Box mb="12">
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '9px',
                  fontWeight: 'semibold',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                  display: 'block',
                  mb: '4',
                })}
              >
                Outcome
              </span>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'text',
                  maxWidth: '640px',
                })}
              >
                {project.outcome}
              </p>
            </Box>
          )}

          {project.description && !project.problem && (
            <Box mb="12">
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'text',
                  maxWidth: '640px',
                })}
              >
                {project.description}
              </p>
            </Box>
          )}

          {project.stack && project.stack.length > 0 && (
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
                  mb: '4',
                })}
              >
                Stack
              </span>
              <Flex gap="2" flexWrap="wrap">
                {project.stack.map((tech) => (
                  <Box
                    key={tech}
                    className={css({
                      px: '3',
                      py: '2',
                      fontFamily: 'mono',
                      fontSize: '12px',
                      color: 'textSecondary',
                      bg: 'bgCard',
                      border: '1px solid',
                      borderColor: 'border',
                      borderRadius: 'sm',
                    })}
                  >
                    {tech}
                  </Box>
                ))}
              </Flex>
            </Box>
          )}
        </div>
      </section>

      {/* Band 3: Back link */}
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
            py: '12',
          })}
        >
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              fontWeight: 'medium',
              letterSpacing: 'wider',
              color: 'accent',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '2',
              _hover: { color: 'accentDark', textDecoration: 'underline' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            ← All projects
          </a>
        </div>
      </section>

      {/* Footer */}
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
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          <Flex gap="6" alignItems="center">
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
        </div>
      </footer>
    </>
  )
}