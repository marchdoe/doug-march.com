import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingTop="160"
        paddingBottom="96"
      >
        <Box
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '37px',
            fontWeight: 400,
            lineHeight: 1.15,
            color: '#3E3028',
          }}
        >
          Project not found
        </Box>
        <Box style={{ marginTop: '24px' }}>
          <a
            href="/"
            className={css({
              color: 'accent',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              padding: '4',
              _hover: { color: 'accent-dark' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: '16px' }}
          >
            ← Back to work
          </a>
        </Box>
      </Box>
    )
  }

  return (
    <Box display="flex" flexDirection="column" width="100%">
      {/* Hero */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingTop="160"
        paddingBottom="64"
      >
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A89080',
            marginBottom: '24px',
          }}
        >
          {project.type} · {project.year}
        </Box>
        <Box
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 5vw, 50px)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#3E3028',
            marginBottom: '24px',
          }}
        >
          {project.title}
        </Box>
        {project.role && (
          <Box
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
              color: '#7A6558',
            }}
          >
            {project.role}
          </Box>
        )}
      </Box>

      {/* Problem / Approach / Outcome */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingY="48"
      >
        {project.problem && (
          <Box marginBottom="48">
            <Box
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A89080',
                marginBottom: '16px',
              }}
            >
              Problem
            </Box>
            <Box
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.65,
                color: '#5C4A3E',
                maxWidth: '600px',
              }}
            >
              {project.problem}
            </Box>
          </Box>
        )}

        {project.approach && (
          <Box marginBottom="48">
            <Box
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A89080',
                marginBottom: '16px',
              }}
            >
              Approach
            </Box>
            <Box
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.65,
                color: '#5C4A3E',
                maxWidth: '600px',
              }}
            >
              {project.approach}
            </Box>
          </Box>
        )}

        {project.outcome && (
          <Box marginBottom="48">
            <Box
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A89080',
                marginBottom: '16px',
              }}
            >
              Outcome
            </Box>
            <Box
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.65,
                color: '#5C4A3E',
                maxWidth: '600px',
              }}
            >
              {project.outcome}
            </Box>
          </Box>
        )}

        {project.description && !project.problem && (
          <Box marginBottom="48">
            <Box
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.65,
                color: '#5C4A3E',
                maxWidth: '600px',
              }}
            >
              {project.description}
            </Box>
          </Box>
        )}
      </Box>

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <Box
          width="100%"
          maxWidth="760px"
          marginX="auto"
          paddingX="48"
          paddingY="48"
        >
          <Box
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#A89080',
              marginBottom: '16px',
            }}
          >
            Stack
          </Box>
          <Flex gap="8" flexWrap="wrap">
            {project.stack.map(tech => (
              <Box
                key={tech}
                paddingX="16"
                paddingY="8"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#7A6558',
                  letterSpacing: '0.05em',
                  backgroundColor: '#F3EDE8',
                  borderRadius: '3px',
                  border: '1px solid #E4D9D0',
                }}
              >
                {tech}
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {/* Links */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingY="48"
      >
        <Flex gap="24" flexWrap="wrap">
          {(project.liveUrl || project.externalUrl) && (
            <a
              href={project.liveUrl || project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={css({
                color: 'accent',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                padding: '4',
                _hover: { color: 'accent-dark' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}
            >
              Visit Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={css({
                color: 'accent',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                padding: '4',
                _hover: { color: 'accent-dark' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}
            >
              GitHub ↗
            </a>
          )}
        </Flex>
      </Box>

      {/* Back link */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingTop="48"
        paddingBottom="96"
        style={{ borderTop: '1px solid #E4D9D0', marginTop: '48px' }}
      >
        <a
          href="/"
          className={css({
            color: 'text-muted',
            textDecoration: 'none',
            padding: '8',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.09em',
          }}
        >
          ← Back to Work
        </a>
      </Box>
    </Box>
  )
}