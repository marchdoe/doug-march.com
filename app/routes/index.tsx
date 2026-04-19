import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <Box display="flex" flexDirection="column" width="100%">
      {/* Beat 1: Identity — full viewport */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingTop="64"
        paddingBottom="48"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        style={{ minHeight: '100vh' }}
      >
        <Box style={{ marginTop: 'auto', marginBottom: 'auto' }}>
          <Box
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(42px, 6vw, 50px)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: '#3E3028',
              marginBottom: '16px',
            }}
          >
            {identity.name}
          </Box>
          <Box
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '21px',
              fontWeight: 400,
              lineHeight: 1.65,
              color: '#5C4A3E',
              maxWidth: '540px',
            }}
          >
            {identity.role}
          </Box>
          <Box
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.65,
              color: '#7A6558',
              maxWidth: '540px',
              marginTop: '24px',
            }}
          >
            {identity.statement}
          </Box>
        </Box>

        {/* Nav at bottom of hero */}
        <Flex
          gap="32"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: '#7A6558',
            paddingBottom: '24px',
          }}
        >
          <a
            href="#work"
            className={css({
              color: 'text-muted',
              textDecoration: 'none',
              padding: '4',
              _hover: { color: 'accent' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Work
          </a>
          <a
            href="/about"
            className={css({
              color: 'text-muted',
              textDecoration: 'none',
              padding: '4',
              _hover: { color: 'accent' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            About
          </a>
        </Flex>
      </Box>

      {/* Beat 2: Featured Work */}
      {featuredProject && (
        <Box
          width="100%"
          maxWidth="760px"
          marginX="auto"
          paddingX="48"
          paddingY="96"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          style={{ minHeight: '72vh' }}
          id="work"
        >
          <Box
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#A89080',
              marginBottom: '32px',
            }}
          >
            Featured Project
          </Box>
          <a
            href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
            target={featuredProject.externalUrl ? '_blank' : undefined}
            rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
            className={css({
              textDecoration: 'none',
              display: 'block',
              _hover: { textDecoration: 'none' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            <Box
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 5vw, 37px)',
                fontWeight: 400,
                lineHeight: 1.15,
                color: '#3E3028',
                marginBottom: '24px',
              }}
            >
              {featuredProject.title}
            </Box>
          </a>
          {featuredProject.problem && (
            <Box
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.65,
                color: '#5C4A3E',
                maxWidth: '600px',
              }}
            >
              {featuredProject.problem}
            </Box>
          )}
          {featuredProject.externalUrl && (
            <Box style={{ marginTop: '32px' }}>
              <a
                href={featuredProject.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  color: 'accent',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  fontSize: '14px',
                  padding: '4',
                  _hover: { color: 'accent-dark' },
                  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                })}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                }}
              >
                Visit Project ↗
              </a>
            </Box>
          )}
        </Box>
      )}

      {/* Beat 3: Work List */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingY="64"
      >
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A89080',
            marginBottom: '32px',
          }}
        >
          Selected Work
        </Box>
        <VStack gap="0" alignItems="stretch">
          {selectedWork.map((project, i) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={css({
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                paddingY: '16',
                transition: 'background-color 180ms ease-out',
                marginX: '-16',
                paddingX: '16',
                borderRadius: 'tight',
                _hover: { backgroundColor: 'bg-card' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
              style={{
                borderBottom: i < selectedWork.length - 1 ? '1px solid rgba(228, 217, 208, 0.6)' : 'none',
              }}
            >
              <Flex gap="16" alignItems="baseline">
                <Box
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#A89080',
                    fontVariantNumeric: 'tabular-nums',
                    minWidth: '32px',
                  }}
                >
                  {String(i + 1).padStart(3, '0')}
                </Box>
                <Box
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#3E3028',
                  }}
                >
                  {project.title}
                </Box>
              </Flex>
              <Flex gap="24" alignItems="baseline">
                <Box
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.09em',
                    color: '#7A6558',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.type}
                </Box>
                <Box
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#A89080',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {project.year}
                </Box>
              </Flex>
            </a>
          ))}
        </VStack>
      </Box>

      {/* Beat 4: Specimen Quote */}
      <Box
        width="100%"
        maxWidth="1100px"
        marginX="auto"
        paddingY="96"
        paddingLeft="72"
        paddingRight="48"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        style={{ minHeight: '56vh' }}
      >
        <Box
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: '#8DBBA0',
            marginBottom: '24px',
          }}
        />
        <Box
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(48px, 6.5vw, 96px)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#3E3028',
            letterSpacing: '-0.03em',
            maxWidth: '960px',
          }}
        >
          "Successful people tend to become more successful because they keep taking action."
        </Box>
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.09em',
            color: '#7A6558',
            marginTop: '32px',
          }}
        >
          — Brian Tracy
        </Box>
      </Box>

      {/* Beat 5: Score */}
      <Box
        width="100%"
        maxWidth="1100px"
        marginX="auto"
        paddingY="64"
        paddingLeft="56"
        paddingRight="48"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        style={{
          minHeight: '40vh',
          borderTop: '1px solid #E4D9D0',
          borderBottom: '1px solid #E4D9D0',
        }}
      >
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A89080',
            marginBottom: '32px',
          }}
        >
          RBC Heritage · In Progress
        </Box>
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(72px, 12vw, 144px)',
            fontWeight: 800,
            lineHeight: 1,
            color: '#3E3028',
            letterSpacing: '-0.03em',
          }}
        >
          -17
        </Box>
        <Box
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '21px',
            fontWeight: 400,
            color: '#5C4A3E',
            marginTop: '16px',
          }}
        >
          Matt Fitzpatrick
        </Box>
        <Flex gap="32" style={{ marginTop: '32px' }}>
          <Box
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
              color: '#7A6558',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            -14 &nbsp;S. Power
          </Box>
          <Box
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
              color: '#7A6558',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            -14 &nbsp;C. Davis
          </Box>
        </Flex>
      </Box>

      {/* Beat 6: Experiments */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingY="96"
      >
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A89080',
            marginBottom: '32px',
          }}
        >
          Experiments
        </Box>
        <VStack gap="0" alignItems="stretch">
          {experiments.map((exp, i) => (
            <a
              key={exp.slug}
              href={exp.externalUrl || `/work/${exp.slug}`}
              target={exp.externalUrl ? '_blank' : undefined}
              rel={exp.externalUrl ? 'noopener noreferrer' : undefined}
              className={css({
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                paddingY: '16',
                transition: 'background-color 180ms ease-out',
                marginX: '-16',
                paddingX: '16',
                borderRadius: 'tight',
                _hover: { backgroundColor: 'bg-card' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
              style={{
                borderBottom: i < experiments.length - 1 ? '1px solid rgba(228, 217, 208, 0.6)' : 'none',
              }}
            >
              <Flex gap="16" alignItems="baseline">
                <Box
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#A89080',
                    fontVariantNumeric: 'tabular-nums',
                    minWidth: '32px',
                  }}
                >
                  E{String(i + 1).padStart(2, '0')}
                </Box>
                <Box
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#3E3028',
                  }}
                >
                  {exp.title}
                </Box>
              </Flex>
              <Flex gap="24" alignItems="baseline">
                <Box
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.09em',
                    color: '#7A6558',
                    textTransform: 'uppercase',
                  }}
                >
                  {exp.type}
                </Box>
                <Box
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#A89080',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {exp.year}
                </Box>
              </Flex>
            </a>
          ))}
        </VStack>
      </Box>

      {/* Beat 7: Footer */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingTop="48"
        paddingBottom="96"
        style={{
          borderTop: '1px solid #E4D9D0',
        }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="baseline"
          flexWrap="wrap"
          gap="16"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A89080',
          }}
        >
          <Flex gap="24" flexWrap="wrap" alignItems="baseline">
            <span>© 2026 Doug March</span>
            <span style={{ color: '#C8B5A8' }}>·</span>
            <span>DET 4 · CHC 1 · Yesterday</span>
          </Flex>
          <Flex gap="24" alignItems="baseline">
            <a
              href="/archive"
              className={css({
                color: 'text-placeholder',
                textDecoration: 'none',
                padding: '4',
                _hover: { color: 'accent' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              Archive
            </a>
            <span>April 19, 2026</span>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}