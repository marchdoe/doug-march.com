import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

function LangTag({ label }: { label: string }) {
  return (
    <Box
      as="span"
      className={css({
        fontFamily: 'space-grotesk',
        fontSize: '11px',
        fontWeight: 'semibold',
        letterSpacing: 'widest',
        color: 'secondary',
        background: 'rgba(126, 175, 196, 0.20)',
        borderRadius: 'sm',
        padding: '2px 6px',
        display: 'inline-block',
      })}
    >
      {label}
    </Box>
  )
}

function HomePage() {
  return (
    <>
      {/* Featured Project */}
      {featuredProject && (
        <Box
          className={css({
            minHeight: '280px',
            paddingBottom: '64px',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          <Box
            className={css({
              fontFamily: 'space-grotesk',
              fontSize: '11px',
              fontWeight: 'semibold',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'accent',
              marginBottom: '16px',
            })}
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
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '4px',
              },
            })}
          >
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: 'clamp(24px, 3vw, 28px)',
                fontWeight: 'bold',
                lineHeight: 'snug',
                letterSpacing: 'tight',
                color: 'text-heading',
                marginBottom: '16px',
              })}
            >
              {featuredProject.title}
            </Box>
          </a>
          {featuredProject.problem && (
            <Box
              className={css({
                fontFamily: 'work-sans',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'text-secondary',
                maxWidth: '560px',
                marginBottom: '16px',
              })}
            >
              {featuredProject.problem}
            </Box>
          )}
          {featuredProject.stack && (
            <Flex gap="6px" flexWrap="wrap">
              {featuredProject.stack.map((t) => (
                <LangTag key={t} label={t} />
              ))}
            </Flex>
          )}
        </Box>
      )}

      {/* Selected Work */}
      <Box mt="64px">
        <Box
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: '11px',
            fontWeight: 'semibold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '24px',
          })}
        >
          Selected Work
        </Box>
        {selectedWork.map((project) => (
          <a
            key={project.slug}
            href={`/work/${project.slug}`}
            className={css({
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              alignItems: 'center',
              height: '56px',
              borderBottom: '1px solid',
              borderColor: 'border',
              textDecoration: 'none',
              borderLeft: '2px solid transparent',
              paddingLeft: '12px',
              transition: 'background 180ms ease, border-color 180ms ease',
              _hover: {
                background: 'bg-card',
                borderLeftColor: 'accent',
              },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '-2px',
              },
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
              },
            })}
          >
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: 'clamp(16px, 2vw, 21px)',
                fontWeight: 'medium',
                color: 'text-secondary',
                lineHeight: 'snug',
                transition: 'color 180ms ease',
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                },
              })}
            >
              {project.title}
            </Box>
            <Flex gap="8px" align="center" mr="16px">
              <Box
                className={css({
                  fontFamily: 'space-grotesk',
                  fontSize: '13px',
                  color: 'text-muted',
                  fontVariantNumeric: 'tabular-nums',
                })}
              >
                {project.year}
              </Box>
              <Box
                className={css({
                  fontFamily: 'space-grotesk',
                  fontSize: '12px',
                  color: 'text-light',
                  letterSpacing: 'wide',
                })}
              >
                {project.type}
              </Box>
            </Flex>
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: '14px',
                color: 'text-light',
              })}
            >
              →
            </Box>
          </a>
        ))}
      </Box>

      {/* Experiments */}
      <Box mt="64px">
        <Box
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: '11px',
            fontWeight: 'semibold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '24px',
          })}
        >
          Experiments
        </Box>
        {experiments.map((project) => (
          <a
            key={project.slug}
            href={project.externalUrl || `/work/${project.slug}`}
            target={project.externalUrl ? '_blank' : undefined}
            rel={project.externalUrl ? 'noopener noreferrer' : undefined}
            className={css({
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              alignItems: 'center',
              height: '56px',
              borderBottom: '1px solid',
              borderColor: 'border',
              textDecoration: 'none',
              borderLeft: '2px solid transparent',
              paddingLeft: '12px',
              transition: 'background 180ms ease, border-color 180ms ease',
              _hover: {
                background: 'bg-card',
                borderLeftColor: 'accent',
              },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '-2px',
              },
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
              },
            })}
          >
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: 'clamp(16px, 2vw, 21px)',
                fontWeight: 'medium',
                color: 'text-secondary',
                lineHeight: 'snug',
              })}
            >
              {project.title}
            </Box>
            <Flex gap="8px" align="center" mr="16px">
              <Box
                className={css({
                  fontFamily: 'space-grotesk',
                  fontSize: '13px',
                  color: 'text-muted',
                  fontVariantNumeric: 'tabular-nums',
                })}
              >
                {project.year}
              </Box>
              <Box
                className={css({
                  fontFamily: 'space-grotesk',
                  fontSize: '12px',
                  color: 'text-light',
                  letterSpacing: 'wide',
                })}
              >
                {project.type}
              </Box>
            </Flex>
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: '14px',
                color: 'text-light',
              })}
            >
              →
            </Box>
          </a>
        ))}
      </Box>
    </>
  )
}