import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/work/')({ component: WorkIndexPage })

const rowClass = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '4',
  padding: '3 4',
  borderBottom: '1px solid',
  borderColor: 'border',
  fontSize: 'base',
  color: 'text',
  _hover: { color: 'accent' },
})

const metaClass = css({
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
})

function WorkIndexPage() {
  return (
    <Box padding={{ base: '6 4', md: '8 6vw' }} display="flex" flexDirection="column" gap="8">
      {featuredProject && (
        <Box>
          <h1
            className={css({
              fontFamily: 'display',
              textTransform: 'uppercase',
              fontSize: 'clamp(40px, 8vw, 100px)',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              color: 'text',
              maxWidth: '18ch',
            })}
          >
            {featuredProject.title}
          </h1>
          {featuredProject.problem && (
            <p className={css({ marginTop: '4', fontSize: 'md', lineHeight: 'normal', color: 'textSecondary', maxWidth: '62ch' })}>
              {featuredProject.problem}
            </p>
          )}
          {featuredProject.externalUrl && (
            <a
              href={featuredProject.externalUrl}
              className={css({
                display: 'inline-block',
                marginTop: '4',
                fontSize: 'xs',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'accent',
                border: '1px solid',
                borderColor: 'border',
                borderRadius: 'sm',
                padding: '2 4',
                _hover: { borderColor: 'accent' },
              })}
            >
              Visit
            </a>
          )}
        </Box>
      )}

      <Box>
        <h2 className={css({ fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '4' })}>
          Selected Work
        </h2>
        <Flex direction="column">
          {selectedWork.map((project) => (
            <a key={project.slug} href={`/work/${project.slug}`} className={rowClass}>
              <span>{project.title}</span>
              <Flex gap="4">
                <span className={metaClass}>{project.type}</span>
                <span className={metaClass}>{project.year}</span>
              </Flex>
            </a>
          ))}
        </Flex>
      </Box>

      <Box>
        <h2 className={css({ fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '4' })}>
          Experiments
        </h2>
        <Flex direction="column">
          {experiments.map((project) => (
            <a
              key={project.slug}
              href={project.externalUrl ?? `/work/${project.slug}`}
              className={rowClass}
            >
              <span>{project.title}</span>
              <Flex gap="4">
                <span className={metaClass}>{project.type}</span>
                <span className={metaClass}>{project.year}</span>
              </Flex>
            </a>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}