import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, Grid } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const frameBase = css({
  background: '#EDEFD9',
  border: '1px solid',
  borderColor: '{colors.neutral.200}',
  borderRadius: '16px',
  boxShadow: '0 2px 14px rgba(38, 43, 29, 0.06)',
  transition: 'background-color 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out',
  _hover: {
    background: '#E4E6CC',
    borderColor: '{colors.neutral.300}',
    boxShadow: '0 4px 24px rgba(38, 43, 29, 0.10)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const frameMd = css({
  background: '#EDEFD9',
  border: '1px solid',
  borderColor: '{colors.neutral.200}',
  borderRadius: '12px',
  boxShadow: '0 2px 14px rgba(38, 43, 29, 0.06)',
  transition: 'background-color 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out',
  _hover: {
    background: '#E4E6CC',
    borderColor: '{colors.neutral.300}',
    boxShadow: '0 4px 24px rgba(38, 43, 29, 0.10)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const frameSm = css({
  background: '#F4F5EE',
  border: '1px solid',
  borderColor: '{colors.neutral.200}',
  borderRadius: '8px',
  boxShadow: '0 2px 14px rgba(38, 43, 29, 0.06)',
  transition: 'background-color 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out',
  _hover: {
    background: '#E4E6CC',
    borderColor: '{colors.neutral.300}',
    boxShadow: '0 4px 24px rgba(38, 43, 29, 0.10)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const rowHover = css({
  padding: '12px 0',
  borderBottom: '1px solid',
  borderColor: '{colors.neutral.200}',
  transition: 'background-color 200ms ease-out',
  _hover: {
    background: 'rgba(110, 158, 42, 0.09)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const galleryGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '24px',
  padding: '48px',
  maxWidth: '1320px',
  margin: '0 auto',
  alignItems: 'start',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: 'repeat(6, 1fr)',
    padding: '24px',
    gap: '16px',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    padding: '16px',
    gap: '16px',
  },
})

function HomePage() {
  return (
    <div className={galleryGrid}>
      {/* Identity Frame */}
      <div
        className={css({
          gridColumn: '1 / 8',
          gridRow: '1',
          minHeight: '420px',
          '@media (max-width: 1024px)': {
            gridColumn: '1 / -1',
            minHeight: '320px',
          },
        })}
      >
        <Box className={frameBase} padding="48px" height="100%" display="flex" flexDirection="column" justifyContent="flex-end">
          <Box
            fontSize="50px"
            fontFamily="Fraunces, serif"
            fontWeight="400"
            lineHeight="1.0"
            letterSpacing="-0.03em"
            color="{colors.neutral.700}"
            marginBottom="16px"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Doug March
          </Box>
          <Box
            fontSize="21px"
            fontFamily="Outfit, sans-serif"
            fontWeight="400"
            lineHeight="1.15"
            color="{colors.neutral.500}"
            marginBottom="16px"
          >
            Product Designer & Developer
          </Box>
          <Box
            width="48px"
            height="1px"
            background="{colors.accent.DEFAULT}"
            marginBottom="24px"
          />
          <Box
            fontSize="16px"
            fontFamily="Outfit, sans-serif"
            fontWeight="400"
            lineHeight="1.58"
            color="{colors.neutral.500}"
            maxWidth="60ch"
          >
            Building digital products at the intersection of design and engineering. Currently focused on AI-native tools and interfaces that feel human.
          </Box>
        </Box>
      </div>

      {/* Featured Work Frame */}
      {featuredProject && (
        <div
          className={css({
            gridColumn: '8 / 13',
            gridRow: '1',
            minHeight: '420px',
            '@media (max-width: 1024px)': {
              gridColumn: '1 / -1',
              minHeight: '300px',
            },
          })}
        >
          <Box className={frameBase} padding="32px" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
            <Box>
              <Box
                fontSize="12px"
                fontFamily="Outfit, sans-serif"
                fontWeight="500"
                letterSpacing="0.13em"
                textTransform="uppercase"
                color="{colors.neutral.400}"
                marginBottom="24px"
              >
                Featured · {featuredProject.year}
              </Box>
              <Box
                fontSize="37px"
                fontFamily="Fraunces, serif"
                fontWeight="400"
                lineHeight="1.0"
                letterSpacing="0.04em"
                color="{colors.neutral.700}"
                marginBottom="24px"
                style={{ fontVariationSettings: "'opsz' 72" }}
              >
                {featuredProject.title}
              </Box>
              <Box
                fontSize="16px"
                fontFamily="Outfit, sans-serif"
                lineHeight="1.58"
                color="{colors.neutral.500}"
                maxWidth="60ch"
              >
                {featuredProject.problem}
              </Box>
            </Box>
            <Box marginTop="32px">
              <a
                href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                target={featuredProject.externalUrl ? '_blank' : undefined}
                rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
                className={css({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: '500',
                  color: '{colors.neutral.50}',
                  background: '{colors.accent.DEFAULT}',
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textDecoration: 'none',
                  transition: 'background-color 200ms ease-out',
                  _hover: {
                    background: '{colors.accent.dark}',
                  },
                  _focus: {
                    outline: '2px solid',
                    outlineColor: 'accent',
                    outlineOffset: '2px',
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                  },
                })}
              >
                View project →
              </a>
            </Box>
          </Box>
        </div>
      )}

      {/* Breathing Void */}
      <div
        className={css({
          gridColumn: '1 / 4',
          gridRow: '2',
          minHeight: '80px',
          '@media (max-width: 1024px)': {
            display: 'none',
          },
        })}
      />

      {/* Work List Frame */}
      <div
        className={css({
          gridColumn: '4 / 8',
          gridRow: '2',
          minHeight: '320px',
          '@media (max-width: 1024px)': {
            gridColumn: '1 / 4',
            gridRow: '2',
          },
          '@media (max-width: 640px)': {
            gridColumn: '1 / -1',
          },
        })}
      >
        <Box className={frameBase} padding="32px" height="100%">
          <Box
            fontSize="12px"
            fontFamily="Outfit, sans-serif"
            fontWeight="500"
            letterSpacing="0.13em"
            textTransform="uppercase"
            color="{colors.neutral.400}"
            marginBottom="24px"
          >
            Selected Work
          </Box>
          {selectedWork.map((project, i) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={css({
                display: 'block',
                textDecoration: 'none',
                _focus: {
                  outline: '2px solid',
                  outlineColor: 'accent',
                  outlineOffset: '2px',
                  borderRadius: '4px',
                },
              })}
            >
              <div className={rowHover}>
                <Box
                  fontSize="28px"
                  fontFamily="Fraunces, serif"
                  fontWeight="400"
                  lineHeight="1.15"
                  letterSpacing="0.04em"
                  color="{colors.neutral.700}"
                  marginBottom="4px"
                  style={{ fontVariationSettings: "'opsz' 36" }}
                >
                  {project.title}
                </Box>
                <Flex gap="16px" fontSize="12px" fontFamily="Outfit, sans-serif" letterSpacing="0.08em" color="{colors.neutral.400}">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </Flex>
              </div>
            </a>
          ))}
        </Box>
      </div>

      {/* Experiments Frame */}
      <div
        className={css({
          gridColumn: '8 / 11',
          gridRow: '2',
          minHeight: '320px',
          '@media (max-width: 1024px)': {
            gridColumn: '4 / -1',
            gridRow: '2',
          },
          '@media (max-width: 640px)': {
            gridColumn: '1 / -1',
          },
        })}
      >
        <Box className={frameMd} padding="28px" height="100%">
          <Box
            fontSize="21px"
            fontFamily="Fraunces, serif"
            fontWeight="400"
            lineHeight="1.15"
            color="{colors.neutral.700}"
            marginBottom="24px"
          >
            Thinking out loud.
          </Box>
          {experiments.map((exp) => (
            <Box
              key={exp.slug}
              marginBottom="20px"
              paddingLeft="12px"
              borderLeft="2px solid"
              borderColor="{colors.accent.DEFAULT}"
            >
              <a
                href={exp.externalUrl || `/work/${exp.slug}`}
                target={exp.externalUrl ? '_blank' : undefined}
                rel={exp.externalUrl ? 'noopener noreferrer' : undefined}
                className={css({
                  textDecoration: 'none',
                  display: 'block',
                  _focus: {
                    outline: '2px solid',
                    outlineColor: 'accent',
                    outlineOffset: '2px',
                    borderRadius: '4px',
                  },
                })}
              >
                <Box
                  fontSize="16px"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="500"
                  color="{colors.neutral.700}"
                  marginBottom="4px"
                >
                  {exp.title}
                </Box>
                <Flex gap="8px" fontSize="12px" fontFamily="Outfit, sans-serif" letterSpacing="0.08em" color="{colors.neutral.400}">
                  <span>{exp.type}</span>
                  <span>·</span>
                  <span>{exp.year}</span>
                </Flex>
                {exp.description && (
                  <Box
                    fontSize="14px"
                    fontFamily="Outfit, sans-serif"
                    lineHeight="1.58"
                    color="{colors.neutral.500}"
                    marginTop="8px"
                  >
                    {exp.description}
                  </Box>
                )}
              </a>
            </Box>
          ))}
        </Box>
      </div>

      {/* Tigers Frame */}
      <div
        className={css({
          gridColumn: '11 / 13',
          gridRow: '2',
          minHeight: '120px',
          '@media (max-width: 1024px)': {
            gridColumn: '1 / 3',
            gridRow: '3',
          },
          '@media (max-width: 640px)': {
            gridColumn: '1 / -1',
          },
        })}
      >
        <Box className={frameSm} padding="20px" height="100%">
          <Box
            fontSize="28px"
            fontFamily="Fraunces, serif"
            fontWeight="400"
            lineHeight="1.15"
            color="{colors.signal.amber}"
            marginBottom="8px"
            style={{ fontVariationSettings: "'opsz' 36" }}
          >
            0–1.
          </Box>
          <Box
            fontSize="12px"
            fontFamily="Outfit, sans-serif"
            letterSpacing="0.08em"
            color="{colors.neutral.400}"
            lineHeight="1.85"
          >
            Yesterday happened.
          </Box>
        </Box>
      </div>

      {/* Footer Row */}
      <div
        className={css({
          gridColumn: '1 / 13',
          gridRow: '4',
          '@media (max-width: 1024px)': {
            gridColumn: '1 / -1',
            gridRow: '4',
          },
        })}
      >
        <Flex
          justify="space-between"
          align="center"
          paddingTop="48px"
          paddingBottom="32px"
          fontSize="12px"
          fontFamily="Outfit, sans-serif"
          letterSpacing="0.08em"
          color="{colors.neutral.400}"
          flexWrap="wrap"
          gap="16px"
        >
          <Box>© 2026 Doug March</Box>
          <Flex gap="24px">
            <a
              href="/archive"
              className={css({
                color: '{colors.neutral.400}',
                textDecoration: 'none',
                fontSize: '12px',
                padding: '4px',
                _hover: { color: '{colors.accent.DEFAULT}' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: '4px' },
              })}
            >
              Archive
            </a>
          </Flex>
        </Flex>
      </div>
    </div>
  )
}