import { Box, Flex } from '../../styled-system/jsx'
import { SectionHead } from './SectionHead'
import { experiments } from '../content/projects'

export function Experiments() {
  return (
    <Box>
      <SectionHead label="Experiments" />
      <Box>
        {experiments.map((project, index) => {
          const href = project.externalUrl || `/work/${project.slug}`
          const isExternal = !!project.externalUrl
          return (
            <a
              key={project.slug}
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
                <Flex align="baseline" justify="space-between">
                  <Flex align="baseline" gap="3" flex="1">
                    <Box
                      fontSize="2xs"
                      fontFamily="body"
                      fontWeight="semibold"
                      color="textMuted"
                      letterSpacing="widest"
                      style={{ fontVariantNumeric: 'tabular-nums', minWidth: '20px' }}
                    >
                      E{String(index + 1).padStart(2, '0')}
                    </Box>
                    <Box flex="1">
                      <Box
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
                        marginTop="1"
                      >
                        {project.type}
                      </Box>
                    </Box>
                  </Flex>
                  <Flex align="baseline" gap="3">
                    <Box
                      fontSize="2xs"
                      fontFamily="body"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      color="textMuted"
                    >
                      {project.year}
                    </Box>
                    <Box fontSize="xs" fontFamily="body" color="accent">→</Box>
                  </Flex>
                </Flex>
              </Box>
            </a>
          )
        })}
      </Box>
    </Box>
  )
}