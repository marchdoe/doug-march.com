import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* Featured Project */}
      {featuredProject && (
        <Box pb="12" mb="12" borderBottom="1px solid" borderColor="border">
          <Box
            fontSize="2xs"
            fontFamily="body"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="text-disabled"
            mb="4"
          >
            Featured
          </Box>
          <a
            href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
            target={featuredProject.externalUrl ? '_blank' : undefined}
            rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
            className={css({
              textDecoration: 'none',
              display: 'block',
              _hover: { '& .title': { color: 'accent' } },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            <Box
              className="title"
              fontSize="clamp(28px, 4vw, 42px)"
              fontFamily="heading"
              fontWeight="bold"
              lineHeight="snug"
              letterSpacing="tight"
              color="text"
              mb="4"
              style={{ transition: 'color 0.15s ease' }}
            >
              {featuredProject.title}
            </Box>
          </a>
          {featuredProject.problem && (
            <Box
              fontSize="base"
              fontFamily="body"
              color="text-secondary"
              lineHeight="normal"
              maxW="600px"
            >
              {featuredProject.problem}
            </Box>
          )}
          <Flex gap="2" mt="4" flexWrap="wrap">
            <Box fontSize="xs" fontFamily="body" color="text-muted">{featuredProject.type}</Box>
            <Box fontSize="xs" color="text-disabled">·</Box>
            <Box fontSize="xs" fontFamily="body" color="text-muted">{featuredProject.year}</Box>
          </Flex>
        </Box>
      )}

      {/* Selected Work */}
      <Box mb="12">
        <Flex align="center" gap="4" mb="6">
          <Box
            fontSize="2xs"
            fontFamily="heading"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="text-disabled"
            whiteSpace="nowrap"
          >
            Selected Work
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>

        <VStack gap="0" align="stretch">
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={css({
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: '5',
                px: '3',
                borderBottom: '1px solid',
                borderColor: 'border',
                borderRadius: 'base',
                minHeight: '64px',
                _hover: { background: 'accent-glow' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '-2px' },
                '@media (max-width: 767px)': {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '4px',
                },
              })}
            >
              <Box fontSize="base" fontFamily="heading" fontWeight="medium" color="text">
                {project.title}
              </Box>
              <Flex gap="4" fontSize="xs" fontFamily="body" color="text-muted" flexShrink={0}>
                <span>{project.type}</span>
                <span>{project.year}</span>
              </Flex>
            </a>
          ))}
        </VStack>
      </Box>

      {/* Experiments */}
      <Box mb="12">
        <Flex align="center" gap="4" mb="6">
          <Box
            fontSize="2xs"
            fontFamily="heading"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="text-disabled"
            whiteSpace="nowrap"
          >
            Experiments
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>

        <VStack gap="0" align="stretch">
          {experiments.map((project) => (
            <a
              key={project.slug}
              href={project.externalUrl || `/work/${project.slug}`}
              target={project.externalUrl ? '_blank' : undefined}
              rel={project.externalUrl ? 'noopener noreferrer' : undefined}
              className={css({
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: '5',
                px: '3',
                borderBottom: '1px solid',
                borderColor: 'border',
                borderRadius: 'base',
                minHeight: '64px',
                _hover: { background: 'accent-glow' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '-2px' },
                '@media (max-width: 767px)': {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '4px',
                },
              })}
            >
              <Box fontSize="base" fontFamily="heading" fontWeight="medium" color="text">
                {project.title}
              </Box>
              <Flex gap="4" fontSize="xs" fontFamily="body" color="text-muted" flexShrink={0}>
                <span>{project.type}</span>
                <span>{project.year}</span>
              </Flex>
            </a>
          ))}
        </VStack>
      </Box>

      {/* Quote */}
      <Box py="12" maxW="480px" mx="auto" textAlign="center">
        <Box height="1px" background="accent-secondary" mb="12" />
        <Box
          fontSize="md"
          fontFamily="heading"
          fontWeight="normal"
          color="text-muted"
          lineHeight="normal"
          px="4"
        >
          The mind turned inward finds the still-point of peace.
        </Box>
        <Box
          fontSize="xs"
          fontFamily="body"
          color="text-disabled"
          mt="4"
        >
          Ming-Dao Deng
        </Box>
        <Box height="1px" background="accent-secondary" mt="12" />
      </Box>

      {/* Footer */}
      <Box mt="12" pt="6" borderTop="1px solid" borderColor="border">
        <Flex justify="space-between" align="center">
          <Box fontSize="xs" fontFamily="body" color="text-disabled">
            © 2026
          </Box>
          <a
            href="/archive"
            className={css({
              fontSize: 'xs',
              fontFamily: 'body',
              color: 'text-disabled',
              textDecoration: 'none',
              _hover: { color: 'text-muted' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Archive
          </a>
        </Flex>
      </Box>
    </>
  )
}