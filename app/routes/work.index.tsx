import { createFileRoute } from '@tanstack/react-router'
import { Box, Stack, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/work/')({
  component: WorkIndexPage,
  head: () => ({ meta: [{ title: 'Work' }] }),
})

function WorkIndexPage() {
  return (
    <Box
      as="main"
      className={css({
        paddingX: { base: '6', md: '12', lg: '24' },
        paddingY: { base: '10', md: '14', lg: '20' },
      })}
    >
      <h1
        className={css({
          fontFamily: 'heading',
          fontWeight: 'bold',
          fontSize: 'clamp(32px, 5vw, 72px)',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'text',
          marginBottom: '12',
        })}
      >
        Work
      </h1>

      {featuredProject && (
        <Box
          className={css({
            marginBottom: '16',
            paddingBottom: '10',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '2',
            })}
          >
            Featured
          </Box>
          <h2
            className={css({
              fontFamily: 'heading',
              fontSize: 'xl',
              color: 'text',
              margin: '0 0 4',
            })}
          >
            {featuredProject.title}
          </h2>
          {featuredProject.problem && (
            <p
              className={css({
                fontFamily: 'body',
                fontSize: 'md',
                color: 'textSecondary',
                maxWidth: '65ch',
                marginBottom: '4',
              })}
            >
              {featuredProject.problem}
            </p>
          )}
          {featuredProject.externalUrl && (
            <a
              href={featuredProject.externalUrl}
              className={css({
                display: 'inline-block',
                border: '1px solid',
                borderColor: 'border.accent',
                borderRadius: '0',
                padding: '2',
                fontFamily: 'body',
                fontSize: 'xs',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                color: 'accent',
                _hover: { color: 'accentGlow', borderColor: 'accentGlow' },
              })}
            >
              Visit site ↗
            </a>
          )}
        </Box>
      )}

      <Stack gap="0" className={css({ marginBottom: '16' })}>
        {selectedWork.map((project) => (
          <a
            key={project.slug}
            href={`/work/${project.slug}`}
            className={css({
              display: 'block',
              paddingY: '4',
              borderBottom: '1px solid',
              borderColor: 'border',
              _hover: { color: 'accentGlow' },
            })}
          >
            <Flex align="baseline" gap="4" wrap="wrap">
              <Box
                className={css({
                  fontFamily: 'heading',
                  fontSize: 'lg',
                  color: 'text',
                })}
              >
                {project.title}
              </Box>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: 'xs',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                })}
              >
                {project.type} · {project.year}
              </Box>
            </Flex>
          </a>
        ))}
      </Stack>

      {experiments.length > 0 && (
        <Box>
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '4',
            })}
          >
            Experiments
          </Box>
          <Stack gap="0">
            {experiments.map((project) => (
              <a
                key={project.slug}
                href={project.externalUrl ?? project.liveUrl ?? `/work/${project.slug}`}
                className={css({
                  display: 'block',
                  paddingY: '3',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  _hover: { color: 'accentGlow' },
                })}
              >
                <Flex align="baseline" gap="4" wrap="wrap">
                  <Box
                    className={css({
                      fontFamily: 'heading',
                      fontSize: 'md',
                      color: 'text',
                    })}
                  >
                    {project.title}
                  </Box>
                  <Box
                    className={css({
                      fontFamily: 'body',
                      fontSize: 'xs',
                      letterSpacing: 'wider',
                      textTransform: 'uppercase',
                      color: 'textMuted',
                    })}
                  >
                    {project.type} · {project.year}
                  </Box>
                </Flex>
              </a>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}
