import { createFileRoute } from '@tanstack/react-router'
import { Grid, Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box bg="panel" color="text" minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <p className={css({ fontFamily: 'body', fontSize: 'lg', color: 'textMuted' })}>Project not found.</p>
      </Box>
    )
  }

  return (
    <Grid gridTemplateColumns={{ base: '1fr', md: '0.7fr 1.3fr' }} minH="100vh">
      {/* LEFT: narrow cobalt identity rail */}
      <Box bg="bg" minH={{ base: '160px', md: '100vh' }} />

      {/* RIGHT: wide indigo ledger, project detail */}
      <Box bg="panel" color="text" paddingX={{ base: '5', md: '8' }} paddingY={{ base: '20', md: '9' }} overflowY="auto">
        <Flex wrap="wrap" gap="2" marginBottom="6">
          {project.role && (
            <Box
              className={css({
                background: 'surface',
                borderRadius: 'sm',
                paddingX: '3',
                paddingY: '2',
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: '2xs',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'text',
              })}
            >
              {project.role}
            </Box>
          )}
          <Box
            className={css({
              background: 'surface',
              borderRadius: 'sm',
              paddingX: '3',
              paddingY: '2',
              fontFamily: 'body',
              fontWeight: 'semibold',
              fontSize: '2xs',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              color: 'text',
            })}
          >
            {project.type}
          </Box>
          <Box
            className={css({
              background: 'surface',
              borderRadius: 'sm',
              paddingX: '3',
              paddingY: '2',
              fontFamily: 'body',
              fontWeight: 'semibold',
              fontSize: '2xs',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              color: 'text',
            })}
          >
            {project.year}
          </Box>
        </Flex>

        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            fontSize: { base: '48px', md: '80px', lg: '104px' },
            lineHeight: 'tight',
            letterSpacing: 'normal',
            textTransform: 'uppercase',
            color: 'text',
            marginBottom: '6',
          })}
        >
          {project.title}
        </h1>

        {project.problem && (
          <p
            className={css({
              fontFamily: 'body',
              fontSize: 'md',
              lineHeight: 'loose',
              color: 'textSecondary',
              maxWidth: '52ch',
              marginBottom: '5',
            })}
          >
            {project.problem}
          </p>
        )}

        {project.approach && (
          <Box marginBottom="5">
            <Box className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: '2xs', letterSpacing: 'wider', textTransform: 'uppercase', color: 'sky.300', marginBottom: '2' })}>
              Approach
            </Box>
            <p className={css({ fontFamily: 'body', fontSize: 'sm', lineHeight: 'loose', color: 'textSecondary', maxWidth: '52ch' })}>
              {project.approach}
            </p>
          </Box>
        )}

        {project.outcome && (
          <Box marginBottom="7">
            <Box className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: '2xs', letterSpacing: 'wider', textTransform: 'uppercase', color: 'sky.300', marginBottom: '2' })}>
              Outcome
            </Box>
            <p className={css({ fontFamily: 'body', fontSize: 'sm', lineHeight: 'loose', color: 'textSecondary', maxWidth: '52ch' })}>
              {project.outcome}
            </p>
          </Box>
        )}

        {project.stack && project.stack.length > 0 && (
          <Flex wrap="wrap" gap="2" marginBottom="7">
            {project.stack.map((tech) => (
              <Box
                key={tech}
                className={css({
                  border: '1px solid',
                  borderColor: 'border',
                  borderRadius: 'sm',
                  paddingX: '3',
                  paddingY: '1',
                  fontFamily: 'body',
                  fontSize: '2xs',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                })}
              >
                {tech}
              </Box>
            ))}
          </Flex>
        )}

        <Flex gap="6" wrap="wrap">
          {(project.liveUrl || project.externalUrl) && (
            <a
              href={project.liveUrl ?? project.externalUrl}
              target="_blank"
              rel="noopener"
              className={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2',
                minHeight: '44px',
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: 'xs',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'accent',
                borderBottom: '1px solid',
                borderColor: 'accent',
                paddingBottom: '1',
                _hover: { color: 'sky.300', borderColor: 'sky.300' },
              })}
            >
              Visit the live site →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener"
              className={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2',
                minHeight: '44px',
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: 'xs',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textMuted',
                borderBottom: '1px solid',
                borderColor: 'border',
                paddingBottom: '1',
                _hover: { color: 'text', borderColor: 'text' },
              })}
            >
              Source →
            </a>
          )}
        </Flex>
      </Box>
    </Grid>
  )
}