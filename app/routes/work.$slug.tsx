import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  const sectionLabel = css({
    fontFamily: 'mono',
    fontSize: '11px',
    letterSpacing: 'widest',
    textTransform: 'uppercase',
    color: '{colors.stone.500}',
    marginBottom: '2',
  })

  const heading = css({
    fontFamily: 'display',
    fontSize: 'clamp(48px, 10vw, 140px)',
    lineHeight: 'tight',
    letterSpacing: 'wide',
    textTransform: 'uppercase',
    color: '{colors.stone.50}',
    marginBottom: '8',
  })

  const bodyText = css({
    fontFamily: 'body',
    fontSize: '16px',
    lineHeight: 'normal',
    color: '{colors.stone.300}',
    maxWidth: '65ch',
    marginBottom: '6',
  })

  const metaLabel = css({
    fontFamily: 'mono',
    fontSize: '12px',
    letterSpacing: 'wider',
    textTransform: 'uppercase',
    color: '{colors.stone.500}',
    marginBottom: '1',
  })

  const metaValue = css({
    fontFamily: 'body',
    fontSize: '16px',
    color: '{colors.stone.300}',
    lineHeight: 'normal',
  })

  const navLink = css({
    fontFamily: 'mono',
    fontSize: '11px',
    letterSpacing: 'widest',
    textTransform: 'uppercase',
    color: '{colors.stone.500}',
    _hover: { color: '{colors.stone.300}' },
    minHeight: '44px',
    minWidth: '44px',
    display: 'inline-flex',
    alignItems: 'center',
  })

  if (!project) {
    return (
      <Box>
        <h1 className={heading}>Not Found</h1>
        <p className={bodyText}>No project matches "{slug}".</p>
        <a href="/" className={navLink}>Home</a>
      </Box>
    )
  }

  return (
    <>
      <Box marginBottom="16">
        <Flex gap="4" alignItems="baseline" marginBottom="6" flexWrap="wrap">
          <span className={css({
            fontFamily: 'mono',
            fontSize: '12px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: '{colors.violet.400}',
          })}>
            {project.type}
          </span>
          <span className={css({
            fontFamily: 'mono',
            fontSize: '12px',
            letterSpacing: 'wider',
            color: '{colors.stone.500}',
            fontVariantNumeric: 'tabular-nums',
          })}>
            {project.year}
          </span>
        </Flex>

        <h1 className={heading}>{project.title}</h1>

        {project.role && (
          <Box marginBottom="8">
            <p className={metaLabel}>Role</p>
            <p className={metaValue}>{project.role}</p>
          </Box>
        )}

        {project.problem && (
          <Box marginBottom="8">
            <p className={metaLabel}>Problem</p>
            <p className={bodyText}>{project.problem}</p>
          </Box>
        )}

        {project.approach && (
          <Box marginBottom="8">
            <p className={metaLabel}>Approach</p>
            <p className={bodyText}>{project.approach}</p>
          </Box>
        )}

        {project.outcome && (
          <Box marginBottom="8">
            <p className={metaLabel}>Outcome</p>
            <p className={bodyText}>{project.outcome}</p>
          </Box>
        )}

        {project.description && (
          <Box marginBottom="8">
            <p className={bodyText}>{project.description}</p>
          </Box>
        )}

        {project.stack && project.stack.length > 0 && (
          <Box marginBottom="8">
            <p className={metaLabel}>Stack</p>
            <Flex gap="2" flexWrap="wrap" marginTop="2">
              {project.stack.map((tech, i) => (
                <span
                  key={i}
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '12px',
                    letterSpacing: 'wider',
                    textTransform: 'uppercase',
                    color: '{colors.stone.300}',
                    padding: '2px 8px',
                    border: '1px solid',
                    borderColor: 'border',
                  })}
                >
                  {tech}
                </span>
              ))}
            </Flex>
          </Box>
        )}

        {(project.externalUrl || project.liveUrl || project.githubUrl) && (
          <Flex gap="6" marginTop="12" flexWrap="wrap">
            {(project.externalUrl || project.liveUrl) && (
              <a
                href={project.externalUrl || project.liveUrl}
                className={css({
                  fontFamily: 'mono',
                  fontSize: '12px',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: '{colors.violet.400}',
                  _hover: { color: '{colors.stone.50}' },
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderBottom: '1px solid',
                  borderColor: '{colors.violet.400}',
                })}
              >
                Visit Site →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className={css({
                  fontFamily: 'mono',
                  fontSize: '12px',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: '{colors.stone.500}',
                  _hover: { color: '{colors.stone.300}' },
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                })}
              >
                GitHub
              </a>
            )}
          </Flex>
        )}
      </Box>

      {/* Footer */}
      <Box
        borderTop="1px solid"
        borderColor="border"
        paddingTop="6"
      >
        <Flex gap="6" alignItems="baseline">
          <a href="/" className={navLink}>Home</a>
          <a href="/about" className={navLink}>About</a>
          <a href="/archive" className={navLink}>Archive</a>
        </Flex>
      </Box>
    </>
  )
}