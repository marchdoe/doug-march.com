import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'

export const Route = createFileRoute('/')({ component: HomePage })

const projectRowClass = css({
  display: 'block',
  textDecoration: 'none',
  borderBottom: '1px solid #E5DFC8',
  transition: 'all 180ms ease',
  _hover: {
    backgroundColor: 'card-bg',
    boxShadow: 'inset 3px 0 0 0 #6A9D51',
  },
})

function SectionLabel({ children }: { children: string }) {
  return (
    <Box
      fontFamily="body"
      fontSize="xs"
      color="text-muted"
      style={{
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: '32px',
      }}
    >
      {children}
    </Box>
  )
}

function HomePage() {
  return (
    <Box>
      {/* ── Beat 1: Hero / Identity ── */}
      <Box
        as="section"
        style={{
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #E5DFC8',
        }}
      >
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '120px 48px 96px',
          }}
        >
          <Box
            fontFamily="body"
            fontSize="xs"
            color="text-muted"
            style={{
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: '600',
              marginBottom: '28px',
            }}
          >
            {identity.role}
          </Box>

          <Box
            fontFamily="serif"
            fontSize="2xl"
            style={{
              fontWeight: '700',
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
              color: '#120D09',
              marginBottom: '32px',
            }}
          >
            {identity.name}
          </Box>

          <Box
            fontFamily="body"
            fontSize="base"
            color="text-secondary"
            style={{
              lineHeight: '1.65',
              letterSpacing: '0.04em',
              maxWidth: '540px',
            }}
          >
            {identity.statement}
          </Box>

          <Box
            style={{
              marginTop: '48px',
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <a
              href="/about"
              style={{ textDecoration: 'none', borderBottom: 'none' }}
            >
              <Box
                fontFamily="body"
                fontSize="xs"
                style={{
                  padding: '10px 24px',
                  borderRadius: '28px',
                  backgroundColor: '#6A9D51',
                  color: 'white',
                  letterSpacing: '0.04em',
                  fontWeight: '600',
                  transition: 'all 140ms ease',
                  display: 'inline-block',
                }}
                className={css({ _hover: { backgroundColor: 'accent-dark' } })}
              >
                About Doug
              </Box>
            </a>
            <Box
              fontFamily="body"
              fontSize="xs"
              color="text-muted"
              style={{ letterSpacing: '0.04em' }}
            >
              ↓ Selected work below
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Beat 2: Featured Work ── */}
      {featuredProject && (
        <Box
          as="section"
          style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #E5DFC8',
          }}
        >
          <Box
            style={{
              width: '100%',
              maxWidth: '720px',
              margin: '0 auto',
              padding: '96px 48px',
            }}
          >
            <SectionLabel>Featured Work</SectionLabel>

            <a
              href={
                featuredProject.liveUrl ||
                featuredProject.externalUrl ||
                `/work/${featuredProject.slug}`
              }
              target={featuredProject.liveUrl || featuredProject.externalUrl ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', borderBottom: 'none', display: 'block' }}
            >
              {/* Image area — warm cream-to-sage gradient placeholder */}
              <Box
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '6px',
                  background:
                    'linear-gradient(135deg, #E5DFC8 0%, #C8BFA0 45%, #BBD4A4 100%)',
                  marginBottom: '24px',
                  border: '1px solid #E5DFC8',
                  boxShadow: '0 1px 4px rgba(33, 28, 20, 0.06)',
                  overflow: 'hidden',
                  transition: 'all 180ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className={css({
                  _hover: {
                    opacity: '0.88',
                    transform: 'scale(1.01)',
                  },
                })}
              >
                <Box
                  fontFamily="serif"
                  style={{
                    fontSize: 'clamp(48px, 7vw, 80px)',
                    fontStyle: 'italic',
                    fontWeight: '400',
                    color: '#C8BFA0',
                    lineHeight: '1',
                    letterSpacing: '-0.02em',
                    userSelect: 'none',
                  }}
                >
                  {featuredProject.title}
                </Box>
              </Box>

              <Box
                fontFamily="serif"
                fontSize="md"
                style={{
                  fontWeight: '700',
                  lineHeight: '1.2',
                  color: '#120D09',
                  marginBottom: '12px',
                }}
              >
                {featuredProject.title}
              </Box>

              {featuredProject.problem && (
                <Box
                  fontFamily="body"
                  fontSize="sm"
                  color="text-secondary"
                  style={{
                    lineHeight: '1.65',
                    letterSpacing: '0.04em',
                    maxWidth: '540px',
                  }}
                >
                  {featuredProject.problem}
                </Box>
              )}
            </a>
          </Box>
        </Box>
      )}

      {/* ── Beat 3: Work List ── */}
      <Box as="section" style={{ borderBottom: '1px solid #E5DFC8' }}>
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '96px 48px',
          }}
        >
          <SectionLabel>Selected Work</SectionLabel>

          {selectedWork.map((project, i) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={projectRowClass}
              style={{ borderBottom: '1px solid #E5DFC8' }}
            >
              <Box
                style={{
                  paddingTop: '28px',
                  paddingBottom: '28px',
                }}
              >
                <Flex
                  align="baseline"
                  style={{ gap: '16px' }}
                >
                  <Box
                    fontFamily="serif"
                    fontSize="md"
                    style={{
                      fontWeight: '700',
                      lineHeight: '1.2',
                      color: '#120D09',
                      flex: '2',
                      minWidth: '0',
                    }}
                  >
                    {project.title}
                  </Box>

                  {project.stack && project.stack.length > 0 && (
                    <Box
                      fontFamily="body"
                      fontSize="xs"
                      style={{
                        flex: '1',
                        letterSpacing: '0.04em',
                        color: i === 0 ? '#6A9D51' : '#7A7060',
                        minWidth: '0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {project.stack.slice(0, 3).join(' · ')}
                    </Box>
                  )}

                  <Box
                    fontFamily="body"
                    fontSize="xs"
                    color="text-muted"
                    style={{
                      fontVariantNumeric: 'tabular-nums',
                      flexShrink: '0',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {project.year}
                  </Box>
                </Flex>

                {project.role && (
                  <Box
                    fontFamily="body"
                    fontSize="xs"
                    color="text-muted"
                    style={{
                      marginTop: '6px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {project.role}
                  </Box>
                )}
              </Box>
            </a>
          ))}
        </Box>
      </Box>

      {/* ── Beat 4: Quote Beat ── */}
      <Box
        as="section"
        backgroundColor="card-bg"
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #E5DFC8',
        }}
      >
        <Box
          style={{
            width: '100%',
            maxWidth: '680px',
            margin: '0 auto',
            padding: '112px 96px',
          }}
        >
          <Box
            fontFamily="serif"
            style={{
              fontSize: 'clamp(64px, 9vw, 110px)',
              fontStyle: 'italic',
              fontWeight: '400',
              color: '#120D09',
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
            }}
          >
            Smile, breathe and go slowly.
          </Box>

          <Box
            style={{
              width: '64px',
              height: '1px',
              backgroundColor: '#6A9D51',
              marginTop: '32px',
              marginBottom: '16px',
            }}
          />

          <Box
            fontFamily="body"
            fontSize="xs"
            color="text-muted"
            style={{ letterSpacing: '0.04em' }}
          >
            — Thich Nhat Hanh
          </Box>
        </Box>
      </Box>

      {/* ── Beat 5: Experiments ── */}
      <Box as="section" style={{ borderBottom: '1px solid #E5DFC8' }}>
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '96px 48px',
          }}
        >
          <SectionLabel>Experiments</SectionLabel>

          {experiments.map((exp) => (
            <Box
              key={exp.slug}
              style={{
                paddingTop: '28px',
                paddingBottom: '28px',
                borderBottom: '1px solid #E5DFC8',
              }}
            >
              <Flex align="baseline" justify="space-between" style={{ gap: '16px' }}>
                <Box
                  fontFamily="serif"
                  fontSize="base"
                  style={{
                    fontWeight: '400',
                    lineHeight: '1.2',
                    color: '#3A3228',
                  }}
                >
                  {exp.title}
                </Box>
                <Box
                  fontFamily="body"
                  fontSize="xs"
                  color="text-muted"
                  style={{
                    fontVariantNumeric: 'tabular-nums',
                    flexShrink: '0',
                    letterSpacing: '0.04em',
                  }}
                >
                  {exp.year}
                </Box>
              </Flex>

              {exp.description && (
                <Box
                  fontFamily="body"
                  fontSize="xs"
                  color="text-muted"
                  style={{
                    marginTop: '8px',
                    lineHeight: '1.65',
                    letterSpacing: '0.04em',
                    maxWidth: '480px',
                  }}
                >
                  {exp.description}
                </Box>
              )}

              {exp.type && (
                <Box
                  fontFamily="body"
                  fontSize="xs"
                  color="text-disabled"
                  style={{
                    marginTop: '6px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontSize: '10px',
                  }}
                >
                  {exp.type}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Beat 6: Footer ── */}
      <Box as="footer">
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '64px 48px',
          }}
        >
          <Flex
            justify="space-between"
            align="center"
            style={{ marginBottom: '20px' }}
          >
            <Box
              fontFamily="body"
              fontSize="xs"
              color="text-secondary"
              style={{ letterSpacing: '0.04em' }}
            >
              Doug March — Product Designer & Developer
            </Box>
            <Flex style={{ gap: '24px' }}>
              <a href="/about" style={{ textDecoration: 'none', borderBottom: 'none' }}>
                <Box fontFamily="body" fontSize="xs" color="text-muted">About</Box>
              </a>
              <a href="/archive" style={{ textDecoration: 'none', borderBottom: 'none' }}>
                <Box fontFamily="body" fontSize="xs" color="text-muted">Archive</Box>
              </a>
            </Flex>
          </Flex>

          <Box style={{ borderTop: '1px solid #E5DFC8', paddingTop: '16px' }}>
            <Flex justify="space-between" align="center">
              <Box
                fontFamily="body"
                fontSize="2xs"
                color="text-muted"
                style={{ letterSpacing: '0.04em' }}
              >
                © 2026 Doug March
              </Box>
              <Box
                fontFamily="body"
                fontSize="2xs"
                color="text-muted"
                style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em' }}
              >
                Valero Texas Open — R. MacIntyre −14
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}