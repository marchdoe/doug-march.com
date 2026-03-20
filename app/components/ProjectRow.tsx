import { Box, Flex } from '../../styled-system/jsx'
import type { Project } from '../content/projects'

interface ProjectRowProps {
  project: Project
  index: number
}

export function ProjectRow({ project, index }: ProjectRowProps) {
  const href = project.externalUrl || `/work/${project.slug}`
  const isExternal = !!project.externalUrl

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <Box
        paddingTop="3"
        paddingBottom="3"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="border"
        style={{ transition: 'background 0.15s ease' }}
      >
        <Flex align="baseline" gap="3" marginBottom="1">
          <Box
            fontSize="2xs"
            fontFamily="body"
            fontWeight="semibold"
            color="textMuted"
            letterSpacing="widest"
            style={{ fontVariantNumeric: 'tabular-nums', minWidth: '20px' }}
          >
            {String(index + 1).padStart(2, '0')}
          </Box>
          <Box
            flex="1"
            fontSize="sm"
            fontFamily="body"
            fontWeight="semibold"
            color="text"
            lineHeight="snug"
          >
            {project.title}
          </Box>
          <Box
            fontSize="2xs"
            fontFamily="body"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
            color="textMuted"
          >
            {project.year}
          </Box>
          <Box
            fontSize="xs"
            fontFamily="body"
            color="accent"
          >
            →
          </Box>
        </Flex>
        <Box paddingLeft="8">
          <Box
            fontSize="2xs"
            fontFamily="body"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
            color="textMuted"
          >
            {project.type}
          </Box>
        </Box>
      </Box>
    </a>
  )
}