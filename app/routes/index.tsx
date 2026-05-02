import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <Box
      padding={{ base: '32px 24px 64px', md: '64px 56px 96px 56px' }}
      maxWidth="720px"
    >
      {/* Featured Project */}
      {featuredProject && (
        <Box marginBottom="64px">
          <Box
            fontSize="10px"
            fontFamily="heading"
            fontWeight="medium"
            letterSpacing="widest"
            textTransform="uppercase"
            color="text-muted"
            borderTop="1px solid"
            borderColor="border-muted"
            paddingTop="20px"
            marginBottom="24px"
          >
            Featured
          </Box>
          <Box
            borderTop="2px solid"
            borderColor="accent"
            paddingTop="24px"
            background="accent.glow"
            padding="24px"
          >
            <a
              href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
              target={featuredProject.externalUrl ? '_blank' : undefined}
              rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
              className={css({
                textDecoration: 'none',
                display: 'block',
                _hover: { textDecoration: 'underline', textDecorationColor: 'accent' },
                _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
              })}
            >
              <Box
                fontSize="clamp(28px, 3vw, 37px)"
                fontFamily="heading"
                fontWeight="semibold"
                color="text"
                lineHeight="snug"
                marginBottom="16px"
              >
                {featuredProject.title}
              </Box>
            </a>
            {featuredProject.problem && (
              <Box
                fontSize="16px"
                fontFamily="body"
                color="text-secondary"
                lineHeight="normal"
                maxWidth="480px"
              >
                {featuredProject.problem}
              </Box>
            )}
            <Flex gap="8px" marginTop="16px" fontSize="12px" fontFamily="heading" color="text-muted" letterSpacing="wide">
              <span>{featuredProject.type}</span>
              <span>·</span>
              <span>{featuredProject.year}</span>
            </Flex>
          </Box>
        </Box>
      )}

      {/* Selected Work */}
      <Box marginBottom="64px">
        <Box
          fontSize="10px"
          fontFamily="heading"
          fontWeight="medium"
          letterSpacing="widest"
          textTransform="uppercase"
          color="text-muted"
          borderTop="1px solid"
          borderColor="border-muted"
          paddingTop="20px"
          marginBottom="24px"
        >
          Selected Work
        </Box>
        <VStack gap="0" align="stretch">
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={css({
                display: 'block',
                textDecoration: 'none',
                paddingY: '24px',
                borderBottom: '1px solid',
                borderColor: 'border',
                transition: 'background 0.12s ease',
                _hover: { background: 'bg-secondary' },
                _focus: { outline: '2px solid {colors.accent}', outlineOffset: '-2px' },
              })}
            >
              <Flex justify="space-between" align="baseline" gap="16px">
                <Box>
                  <Box
                    fontSize="21px"
                    fontFamily="heading"
                    fontWeight="semibold"
                    color="text"
                    lineHeight="snug"
                    marginBottom="4px"
                  >
                    {project.title}
                  </Box>
                  <Flex gap="16px" align="center">
                    <Box fontSize="14px" fontFamily="body" color="text-muted">
                      {project.type}
                    </Box>
                    {project.stack && project.stack.length > 0 && (
                      <Box
                        fontSize="11px"
                        fontFamily="mono"
                        color="stone.400"
                        textTransform="lowercase"
                      >
                        {project.stack.slice(0, 2).join(' · ')}
                      </Box>
                    )}
                  </Flex>
                </Box>
                <Box
                  fontSize="14px"
                  fontFamily="heading"
                  color="text-muted"
                  flexShrink={0}
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {project.year}
                </Box>
              </Flex>
            </a>
          ))}
        </VStack>
      </Box>

      {/* Experiments */}
      <Box marginBottom="64px">
        <Box
          fontSize="10px"
          fontFamily="heading"
          fontWeight="medium"
          letterSpacing="widest"
          textTransform="uppercase"
          color="text-muted"
          borderTop="1px solid"
          borderColor="border-muted"
          paddingTop="20px"
          marginBottom="24px"
        >
          Experiments
        </Box>
        <VStack gap="0" align="stretch">
          {experiments.map((project) => (
            <a
              key={project.slug}
              href={project.externalUrl || `/work/${project.slug}`}
              target={project.externalUrl ? '_blank' : undefined}
              rel={project.externalUrl ? 'noopener noreferrer' : undefined}
              className={css({
                display: 'block',
                textDecoration: 'none',
                paddingY: '20px',
                borderBottom: '1px solid',
                borderColor: 'border',
                transition: 'background 0.12s ease',
                _hover: { background: 'bg-secondary' },
                _focus: { outline: '2px solid {colors.accent}', outlineOffset: '-2px' },
              })}
            >
              <Flex justify="space-between" align="baseline" gap="16px">
                <Box fontSize="16px" fontFamily="heading" fontWeight="medium" color="text" lineHeight="snug">
                  {project.title}
                </Box>
                <Flex gap="12px" align="baseline" fontSize="14px" fontFamily="body" color="text-muted" flexShrink={0}>
                  <span>{project.type}</span>
                  <Box style={{ fontVariantNumeric: 'tabular-nums' }}>{project.year}</Box>
                </Flex>
              </Flex>
            </a>
          ))}
        </VStack>
      </Box>

      {/* Listening — Wet Leg offset */}
      <Box marginBottom="64px" marginLeft={{ base: '0', md: '13px' }}>
        <Box
          fontSize="10px"
          fontFamily="heading"
          fontWeight="medium"
          letterSpacing="widest"
          textTransform="uppercase"
          color="text-muted"
          borderTop="1px solid"
          borderColor="border-muted"
          paddingTop="20px"
          marginBottom="16px"
        >
          Listening
        </Box>
        <Box fontSize="14px" fontFamily="body" color="text-secondary" lineHeight="normal">
          Radiohead · Wet Leg
        </Box>
      </Box>

      {/* Mandino Quote — Terminal */}
      <Box paddingTop="96px" marginBottom="48px" maxWidth="480px">
        <Box
          fontSize="16px"
          fontFamily="body"
          fontStyle="italic"
          color="text-muted"
          lineHeight="loose"
        >
          I will persist until I succeed. I was not delivered into this world in defeat, nor does failure course in my veins.
        </Box>
        <Box
          fontSize="10px"
          fontFamily="body"
          color="stone.400"
          letterSpacing="wider"
          paddingTop="16px"
        >
          Og Mandino
        </Box>
      </Box>

      {/* Footer */}
      <Box
        borderTop="1px solid"
        borderColor="border"
        paddingTop="24px"
        fontSize="12px"
        fontFamily="body"
        color="text-muted"
      >
        <Flex justify="space-between" align="center">
          <span>© 2026 Doug March</span>
          <a
            href="/archive"
            className={css({
              color: 'text-muted',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline', color: 'accent' },
              _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
              minHeight: '44px',
              minWidth: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            Archive
          </a>
        </Flex>
      </Box>
    </Box>
  )
}