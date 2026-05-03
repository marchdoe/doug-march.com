import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* Awwwards Rooms */}
      <VStack gap="28px" alignItems="stretch" marginBottom="6xl">
        {/* Room 1: NO-CODE SHADER */}
        <Box
          background="bgDark"
          borderRadius="sm"
          padding="40px 48px"
          minHeight="240px"
          position="relative"
          overflow="hidden"
          transition="transform 0.3s, box-shadow 0.3s"
          className={css({
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
            },
            _hover: {
              transform: 'translateY(-3px)',
              boxShadow: '0 6px 20px rgba(13, 34, 28, 0.12)',
            },
            '@media (max-width: 767px)': {
              padding: '28px 24px',
              minHeight: '200px',
            },
          })}
        >
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            gap="4px"
            marginBottom="xl"
          >
            <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="accent" letterSpacing="widest" textTransform="uppercase">SHADER</Box>
            <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="accent" letterSpacing="widest" textTransform="uppercase">VISUAL</Box>
            <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="accent" letterSpacing="widest" textTransform="uppercase">SYSTEM</Box>
          </Box>
          <Box
            fontSize="xl"
            fontFamily="heading"
            fontWeight="semibold"
            color="accent"
            lineHeight="tight"
            letterSpacing="tight"
            className={css({
              '@media (max-width: 767px)': {
                fontSize: 'lg',
              },
            })}
          >
            NO-CODE SHADER
          </Box>
        </Box>

        {/* Room 2: WFEO */}
        <Box
          background="bgDarkAlt"
          borderRadius="sm"
          padding="48px 48px 40px"
          minHeight="240px"
          position="relative"
          transition="transform 0.3s, box-shadow 0.3s"
          className={css({
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
            },
            _hover: {
              transform: 'translateY(-3px)',
              boxShadow: '0 6px 20px rgba(13, 34, 28, 0.12)',
            },
            '@media (max-width: 767px)': {
              padding: '32px 24px',
              minHeight: '200px',
            },
          })}
        >
          <Box
            fontSize="xl"
            fontFamily="heading"
            fontWeight="bold"
            color="textOnDark"
            lineHeight="tight"
            letterSpacing="tight"
            marginBottom="3xl"
            className={css({
              '@media (max-width: 767px)': {
                fontSize: 'lg',
              },
            })}
          >
            WFEO
          </Box>
          <Box fontSize="sm" fontFamily="heading" letterSpacing="widest" color="borderSubtle" textTransform="uppercase">
            ENGINEERING WEIGHT
          </Box>
        </Box>

        {/* Room 3: The Push */}
        <Box
          background="accentLight"
          borderRadius="sm"
          padding="40px 48px"
          minHeight="240px"
          position="relative"
          overflow="hidden"
          boxShadow="8px 8px 0 0 #1A3D33"
          transition="box-shadow 0.3s"
          className={css({
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
            },
            _hover: {
              boxShadow: '12px 12px 0 0 #0D221C',
            },
            '@media (max-width: 767px)': {
              padding: '28px 24px',
              minHeight: '200px',
            },
          })}
        >
          <Box
            position="absolute"
            right="16px"
            top="50%"
            fontSize="9px"
            fontFamily="heading"
            color="bgDark"
            letterSpacing="widest"
            className={css({
              transform: 'rotate(90deg) translateX(-50%)',
              transformOrigin: 'center',
            })}
          >
            DIMENSIONAL
          </Box>
          <Box flex="1" />
          <Box
            fontSize="xl"
            fontFamily="heading"
            fontWeight="bold"
            color="bgDark"
            lineHeight="tight"
            letterSpacing="tight"
            position="absolute"
            left="64px"
            bottom="32px"
            className={css({
              '@media (max-width: 767px)': {
                fontSize: 'lg',
                left: '24px',
                bottom: '24px',
              },
            })}
          >
            The Push
          </Box>
        </Box>
      </VStack>

      {/* Featured Project */}
      {featuredProject && (
        <Box paddingBottom="3xl" marginBottom="3xl" borderBottom="1px solid" borderColor="border">
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="accent" letterSpacing="widest" textTransform="uppercase" marginBottom="lg">
            Featured
          </Box>
          <a
            href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
            target={featuredProject.externalUrl ? '_blank' : undefined}
            rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
            className={css({
              textDecoration: 'none',
              display: 'block',
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px', borderRadius: 'xs' },
            })}
          >
            <Box
              fontSize="lg"
              fontFamily="heading"
              fontWeight="bold"
              color="text"
              lineHeight="snug"
              marginBottom="md"
              transition="color 0.2s"
              className={css({
                _hover: { color: 'accent' },
                '@media (max-width: 767px)': {
                  fontSize: 'md',
                },
              })}
            >
              {featuredProject.title}
            </Box>
          </a>
          {featuredProject.problem && (
            <Box fontSize="base" fontFamily="body" color="textSecondary" lineHeight="normal" maxWidth="600px">
              {featuredProject.problem}
            </Box>
          )}
        </Box>
      )}

      {/* Selected Work */}
      <Box marginBottom="3xl">
        <Flex alignItems="center" gap="lg" marginBottom="xl">
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="widest" textTransform="uppercase">
            Work
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>
        <VStack gap="0" alignItems="stretch">
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={css({
                textDecoration: 'none',
                display: 'block',
                padding: '20px 0',
                borderBottom: '1px solid',
                borderColor: 'border',
                borderLeft: '2px solid transparent',
                transition: 'background 0.2s, border-color 0.2s',
                _hover: {
                  background: 'stone.100',
                  borderLeftColor: 'accent',
                  paddingLeft: '16px',
                },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'xs' },
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                },
              })}
            >
              <Flex justifyContent="space-between" alignItems="baseline" flexWrap="wrap" gap="sm">
                <Box fontSize="md" fontFamily="heading" fontWeight="medium" color="text" lineHeight="snug">
                  {project.title}
                </Box>
                <Flex gap="lg" fontSize="sm" fontFamily="body" color="textMuted">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </Flex>
              </Flex>
            </a>
          ))}
        </VStack>
      </Box>

      {/* Experiments */}
      <Box marginBottom="3xl">
        <Flex alignItems="center" gap="lg" marginBottom="xl">
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="widest" textTransform="uppercase">
            Experiments
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>
        <VStack gap="0" alignItems="stretch">
          {experiments.map((project) => (
            <a
              key={project.slug}
              href={project.externalUrl || `/work/${project.slug}`}
              target={project.externalUrl ? '_blank' : undefined}
              rel={project.externalUrl ? 'noopener noreferrer' : undefined}
              className={css({
                textDecoration: 'none',
                display: 'block',
                padding: '20px 0',
                borderBottom: '1px solid',
                borderColor: 'border',
                borderLeft: '2px solid transparent',
                transition: 'background 0.2s, border-color 0.2s',
                _hover: {
                  background: 'stone.100',
                  borderLeftColor: 'accent',
                  paddingLeft: '16px',
                },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'xs' },
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                },
              })}
            >
              <Flex justifyContent="space-between" alignItems="baseline" flexWrap="wrap" gap="sm">
                <Box fontSize="md" fontFamily="heading" fontWeight="medium" color="text" lineHeight="snug">
                  {project.title}
                </Box>
                <Flex gap="lg" fontSize="sm" fontFamily="body" color="textMuted">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </Flex>
              </Flex>
            </a>
          ))}
        </VStack>
      </Box>

      {/* Hacker News Signal */}
      <Box marginBottom="3xl">
        <Box fontSize="9px" fontFamily="heading" letterSpacing="widest" color="borderSubtle" textTransform="uppercase" marginBottom="md">
          FOLLOWING
        </Box>
        <VStack gap="xs" alignItems="flex-start">
          <Box fontSize="13px" fontFamily="body" color="textMuted" lineHeight="normal">
            Six Years Perfecting Maps on WatchOS · 296 pts
          </Box>
          <Box fontSize="13px" fontFamily="body" color="textMuted" lineHeight="normal">
            Ladybird – April 2026 · 333 pts
          </Box>
        </VStack>
      </Box>

      {/* Footer */}
      <Box paddingTop="xl" borderTop="1px solid" borderColor="border">
        <Flex justifyContent="space-between" alignItems="baseline">
          <Box fontSize="xs" fontFamily="body" color="textMuted">
            © 2026 Doug March
          </Box>
          <a href="/archive" className={css({
            fontSize: 'xs',
            fontFamily: 'body',
            color: 'textMuted',
            textDecoration: 'none',
            _hover: { color: 'accent', textDecoration: 'underline' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'xs' },
          })}>
            Archive
          </a>
        </Flex>
      </Box>
    </>
  )
}