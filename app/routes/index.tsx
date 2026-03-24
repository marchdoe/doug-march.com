import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const sectionLabel = css({
  fontFamily: 'body',
  fontSize: '2xs',
  fontWeight: 'bold',
  letterSpacing: 'widest',
  color: 'textMuted',
  textTransform: 'uppercase',
})

function HomePage() {
  return (
    <>
      {/* ── SPECIMEN AREA ─────────────────────────────────────────── */}
      <Box
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 40px)',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '48px 64px 80px 64px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* THE MONUMENT */}
        <Box style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
          <h1
            className={css({
              fontFamily: 'heading',
              fontWeight: 'black',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              color: 'text',
              textTransform: 'uppercase',
              margin: '0',
            })}
            style={{ fontSize: 'clamp(96px, 17vw, 232px)' }}
          >
            WELL
            <br />
            DONE
          </h1>
        </Box>

        {/* ATTRIBUTION */}
        <Box
          style={{
            borderTop: '1px solid #CBD1D8',
            paddingTop: '24px',
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: 'base',
              fontWeight: 'light',
              color: 'textSecondary',
              lineHeight: 'normal',
            })}
            style={{ fontStyle: 'italic' }}
          >
            is better than well said.
          </Box>
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: 'xs',
              fontWeight: 'regular',
              letterSpacing: 'widest',
              color: 'textMuted',
              textTransform: 'uppercase',
            })}
          >
            — Benjamin Franklin
          </Box>
        </Box>

        {/* OPENING DAY BADGE — the only warm element */}
        <Box
          className={css({
            background: 'accentBg',
            _hover: { background: 'accentBgHover', cursor: 'default' },
          })}
          style={{
            position: 'absolute',
            right: '64px',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '20px 24px',
            width: '148px',
          }}
        >
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: '2xs',
              fontWeight: 'bold',
              letterSpacing: 'widest',
              color: 'accentText',
              textTransform: 'uppercase',
            })}
            style={{ marginBottom: '10px' }}
          >
            Opening Day
          </Box>
          <Box
            className={css({
              fontFamily: 'heading',
              fontWeight: 'black',
              color: 'accentText',
              lineHeight: 'snug',
            })}
            style={{ fontSize: '36px', letterSpacing: '-0.02em' }}
          >
            2 DAYS
          </Box>
        </Box>

        {/* SCORES ANNOTATION — bottom left */}
        <Box
          style={{
            position: 'absolute',
            left: '64px',
            bottom: '80px',
            width: '170px',
          }}
        >
          {/* Pistons W */}
          <Box>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '2xs',
                fontWeight: 'bold',
                letterSpacing: 'widest',
                color: 'textSecondary',
                textTransform: 'uppercase',
              })}
              style={{ marginBottom: '3px' }}
            >
              Pistons
            </Box>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: 'sm',
                fontWeight: 'regular',
                color: 'text',
                lineHeight: 'snug',
              })}
            >
              ↑ DET 113 · MIL 110
            </Box>
          </Box>

          {/* Tigers L */}
          <Box style={{ marginTop: '12px' }}>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '2xs',
                fontWeight: 'light',
                letterSpacing: 'widest',
                color: 'textMuted',
                textTransform: 'uppercase',
              })}
              style={{ marginBottom: '3px' }}
            >
              Tigers
            </Box>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: 'xs',
                fontWeight: 'light',
                color: 'textMuted',
                lineHeight: 'snug',
              })}
            >
              DET 5 · OPP 6
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── PORTFOLIO — below the fold ─────────────────────────────── */}
      <Box
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 64px 96px 64px',
          borderTop: '1px solid #CBD1D8',
        }}
      >
        {/* Featured Project */}
        {featuredProject && (
          <Box style={{ marginBottom: '72px' }}>
            <Box className={sectionLabel} style={{ marginBottom: '28px' }}>
              Featured
            </Box>
            <Box style={{ paddingBottom: '32px', borderBottom: '1px solid #CBD1D8' }}>
              <a
                href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                target={featuredProject.externalUrl ? '_blank' : undefined}
                rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
                className={css({
                  textDecoration: 'none',
                  _hover: { '& h2': { color: 'textSecondary' } },
                })}
              >
                <h2
                  className={css({
                    fontFamily: 'heading',
                    fontWeight: 'bold',
                    color: 'text',
                    lineHeight: 'snug',
                    margin: '0',
                    textTransform: 'uppercase',
                  })}
                  style={{ fontSize: 'clamp(48px, 7vw, 81px)', letterSpacing: '-0.03em' }}
                >
                  {featuredProject.title}
                </h2>
              </a>
              {featuredProject.problem && (
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontSize: 'base',
                    fontWeight: 'light',
                    color: 'textSecondary',
                    lineHeight: 'normal',
                  })}
                  style={{ marginTop: '16px', maxWidth: '560px' }}
                >
                  {featuredProject.problem}
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Selected Work */}
        {selectedWork.length > 0 && (
          <Box style={{ marginBottom: '72px' }}>
            <Box className={sectionLabel} style={{ marginBottom: '4px' }}>
              Selected Work
            </Box>
            {selectedWork.map((project) => (
              <Box
                key={project.slug}
                className={css({
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  _hover: { background: 'rgba(217, 76, 20, 0.06)' },
                })}
                style={{ transition: 'background 0.12s ease' }}
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="baseline"
                  style={{ padding: '16px 8px' }}
                >
                  <a
                    href={`/work/${project.slug}`}
                    className={css({
                      fontFamily: 'heading',
                      fontSize: 'md',
                      fontWeight: 'bold',
                      color: 'text',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: 'tight',
                      _hover: { color: 'textSecondary' },
                    })}
                  >
                    {project.title}
                  </a>
                  <Flex gap="5" align="center">
                    <Box
                      className={css({
                        fontFamily: 'body',
                        fontSize: 'xs',
                        fontWeight: 'light',
                        letterSpacing: 'wider',
                        color: 'textMuted',
                        textTransform: 'uppercase',
                      })}
                    >
                      {project.type}
                    </Box>
                    <Box
                      className={css({
                        fontFamily: 'body',
                        fontSize: 'xs',
                        fontWeight: 'light',
                        color: 'textMuted',
                      })}
                    >
                      {project.year}
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Box>
        )}

        {/* Experiments */}
        {experiments.length > 0 && (
          <Box>
            <Box className={sectionLabel} style={{ marginBottom: '4px' }}>
              Experiments
            </Box>
            {experiments.map((exp) => (
              <Box
                key={exp.slug}
                className={css({
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  _hover: { background: 'rgba(217, 76, 20, 0.04)' },
                })}
                style={{ transition: 'background 0.12s ease' }}
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="baseline"
                  style={{ padding: '12px 8px' }}
                >
                  <a
                    href={exp.externalUrl || `/work/${exp.slug}`}
                    target={exp.externalUrl ? '_blank' : undefined}
                    rel={exp.externalUrl ? 'noopener noreferrer' : undefined}
                    className={css({
                      fontFamily: 'body',
                      fontSize: 'base',
                      fontWeight: 'light',
                      color: 'textSecondary',
                      textDecoration: 'none',
                      _hover: { color: 'text' },
                    })}
                  >
                    {exp.title}
                  </a>
                  <Box
                    className={css({
                      fontFamily: 'body',
                      fontSize: 'xs',
                      fontWeight: 'light',
                      color: 'textMuted',
                    })}
                  >
                    {exp.year}
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  )
}