import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'
import type { Project } from '../../content/projects'

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Box
      borderTop="1px solid"
      borderColor="fieldBorder"
      pt="6"
      display="flex"
      flexDirection="column"
      gap="4"
      maxW="60ch"
    >
      <Box as="h3" fontFamily="display" fontWeight="700" fontSize="2xl" letterSpacing="tight">
        {project.title}
      </Box>
      {project.problem && (
        <Box fontFamily="body" fontSize="sm" lineHeight="loose" color="fieldInkMuted">
          {project.problem}
        </Box>
      )}
      {project.externalUrl && (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener"
          className={css({
            fontFamily: 'display',
            fontSize: 'xs',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'fieldInk',
            borderBottom: '1px solid',
            borderColor: 'fieldInk',
            alignSelf: 'flex-start',
            pb: '1',
            minH: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            _hover: { color: 'fieldInkMuted', borderColor: 'fieldInkMuted' },
          })}
        >
          Visit the live build ↗
        </a>
      )}
      <Box
        fontFamily="display"
        fontSize="2xs"
        letterSpacing="wide"
        color="fieldInkMuted"
        textTransform="uppercase"
      >
        {project.type} · {project.year}
      </Box>
    </Box>
  )
}
