import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '128px',
          paddingBottom: '96px',
        })}
      >
        <Box
          className={css({
            fontFamily: 'heading',
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'text',
          })}
        >
          Project not found
        </Box>
        <Box marginTop="16px">
          <a
            href="/"
            className={css({
              fontFamily: 'mono',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'accent',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              padding: '8px 0',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            ← Back to work
          </a>
        </Box>
      </Box>
    )
  }

  return (
    <>
      {/* Hero */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '128px',
          paddingBottom: '80px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '96px',
            paddingBottom: '48px',
          },
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'mono',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'text-muted',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px',
            marginBottom: '48px',
            transition: 'color 180ms ease',
            _hover: { color: 'text-secondary' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          ← Back
        </a>

        <Box
          className={css({
            fontFamily: 'heading',
            fontSize: 'clamp(36px, 6vw, 80px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            fontWeight: 'bold',
            color: 'text',
            marginBottom: '24px',
          })}
        >
          {project.title}
        </Box>

        <Flex
          gap="16px"
          className={css({
            fontFamily: 'mono',
            fontSize: '9px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '32px',
            flexWrap: 'wrap',
          })}
        >
          <span>{project.year}</span>
          <span>·</span>
          <span style={{ color: '#C05828' }}>{project.type}</span>
          {project.role && (
            <>
              <span>·</span>
              <span>{project.role}</span>
            </>
          )}
        </Flex>

        {(project.externalUrl || project.liveUrl) && (
          <a
            href={project.externalUrl || project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              fontFamily: 'mono',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'accent',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: '44px',
              transition: 'color 180ms ease',
              _hover: { color: 'accent-dark' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Visit Project ↗
          </a>
        )}
      </Box>

      {/* Hairline */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          '@media (max-width: 767px)': { paddingLeft: '24px', paddingRight: '24px' },
        })}
      >
        <Box className={css({ height: '1px', background: 'border' })} />
      </Box>

      {/* Content */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '80px',
          paddingBottom: '96px',
          display: 'grid',
          gridTemplateColumns: '7fr 5fr',
          columnGap: '64px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '48px',
            paddingBottom: '56px',
            gridTemplateColumns: '1fr',
            rowGap: '48px',
          },
        })}
      >
        {/* Left: descriptions */}
        <VStack gap="40px" align="stretch">
          {project.problem && (
            <Box>
              <Box
                className={css({
                  fontFamily: 'mono',
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'text-muted',
                  marginBottom: '12px',
                })}
              >
                Problem
              </Box>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'text-secondary',
                  maxWidth: '560px',
                })}
              >
                {project.problem}
              </Box>
            </Box>
          )}

          {project.approach && (
            <Box>
              <Box
                className={css({
                  fontFamily: 'mono',
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'text-muted',
                  marginBottom: '12px',
                })}
              >
                Approach
              </Box>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'text-secondary',
                  maxWidth: '560px',
                })}
              >
                {project.approach}
              </Box>
            </Box>
          )}

          {project.outcome && (
            <Box>
              <Box
                className={css({
                  fontFamily: 'mono',
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'text-muted',
                  marginBottom: '12px',
                })}
              >
                Outcome
              </Box>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'text-secondary',
                  maxWidth: '560px',
                })}
              >
                {project.outcome}
              </Box>
            </Box>
          )}

          {project.description && !project.problem && (
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'text-secondary',
                maxWidth: '560px',
              })}
            >
              {project.description}
            </Box>
          )}
        </VStack>

        {/* Right: metadata */}
        <VStack gap="32px" align="stretch">
          {project.stack && project.stack.length > 0 && (
            <Box>
              <Box
                className={css({
                  fontFamily: 'mono',
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'text-muted',
                  marginBottom: '12px',
                })}
              >
                Stack
              </Box>
              <Flex flexWrap="wrap" gap="8px">
                {project.stack.map((tech) => (
                  <Box
                    key={tech}
                    className={css({
                      fontFamily: 'mono',
                      fontSize: '12px',
                      letterSpacing: '0.04em',
                      color: 'text-secondary',
                      padding: '6px 12px',
                      border: '1px solid',
                      borderColor: 'border',
                      borderRadius: '2px',
                    })}
                  >
                    {tech}
                  </Box>
                ))}
              </Flex>
            </Box>
          )}

          {project.githubUrl && (
            <Box>
              <Box
                className={css({
                  fontFamily: 'mono',
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'text-muted',
                  marginBottom: '12px',
                })}
              >
                Source
              </Box>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  fontFamily: 'mono',
                  fontSize: '12px',
                  color: 'accent',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  padding: '8px 0',
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'color 180ms ease',
                  _hover: { color: 'accent-dark' },
                  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                })}
              >
                GitHub ↗
              </a>
            </Box>
          )}
        </VStack>
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
      </Box>
    </>
  )
}