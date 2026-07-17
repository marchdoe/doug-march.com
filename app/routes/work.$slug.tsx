import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { HeroNav } from '../components/HeroNav'
import { Chip } from '../components/Chip'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

const label = css({
  fontSize: '2xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  fontWeight: 'bold',
})

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box paddingY="8">
        <p className={css({ fontSize: 'lg', color: 'text' })}>Project not found.</p>
      </Box>
    )
  }

  return (
    <Box display="flex" flexDirection="column" gap={{ base: '8', md: '12' }} paddingY={{ base: '6', md: '8' }}>
      <Box>
        <span className={css({ ...label._important, display: 'block', marginBottom: '4' })}>
          01 · Work / {project.type}
        </span>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: '900',
            textTransform: 'uppercase',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            fontSize: 'clamp(40px, 6vw, 88px)',
            color: 'text',
          })}
        >
          {project.title}
        </h1>
        <Flex gap="4" marginTop="4" wrap="wrap">
          <Chip>{project.type}</Chip>
          <Chip>{project.year}</Chip>
          {project.role && <Chip>{project.role}</Chip>}
        </Flex>
        <Box marginTop="6">
          <HeroNav active="work" />
        </Box>
      </Box>

      <Box maxWidth="90%" display="flex" flexDirection="column" gap="6">
        {project.problem && (
          <Box>
            <span className={label}>Problem</span>
            <p className={css({ fontSize: 'base', color: 'textSecondary', marginTop: '2', maxWidth: '75ch' })}>
              {project.problem}
            </p>
          </Box>
        )}
        {project.approach && (
          <Box>
            <span className={label}>Approach</span>
            <p className={css({ fontSize: 'base', color: 'textSecondary', marginTop: '2', maxWidth: '75ch' })}>
              {project.approach}
            </p>
          </Box>
        )}
        {project.outcome && (
          <Box>
            <span className={label}>Outcome</span>
            <p className={css({ fontSize: 'base', color: 'textSecondary', marginTop: '2', maxWidth: '75ch' })}>
              {project.outcome}
            </p>
          </Box>
        )}
        {project.stack && project.stack.length > 0 && (
          <Box>
            <span className={label}>Stack</span>
            <Flex wrap="wrap" gap="2" marginTop="2">
              {project.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </Flex>
          </Box>
        )}
        <Flex gap="6" wrap="wrap" marginTop="2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className={css({
                fontSize: 'sm',
                fontWeight: 'bold',
                color: 'accent',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              })}
            >
              Live site ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className={css({
                fontSize: 'sm',
                fontWeight: 'bold',
                color: 'accent',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              })}
            >
              Source ↗
            </a>
          )}
        </Flex>
      </Box>
    </Box>
  )
}