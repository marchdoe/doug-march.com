import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { featuredProject } from '../content/projects'

export function FeaturedProject() {
  return (
    <Box
      className={css({
        bg: 'bg.card',
        borderTop: '3px solid',
        borderTopColor: 'border.accent',
        borderBottom: '1px solid',
        borderBottomColor: 'border.DEFAULT',
        borderLeft: '1px solid',
        borderLeftColor: 'border.DEFAULT',
        borderRight: '1px solid',
        borderRightColor: 'border.DEFAULT',
        p: '6',
        mb: '8',
        position: 'relative',
      })}
    >
      {/* Fern tint overlay */}
      <Box
        className={css({
          position: 'absolute',
          inset: '0',
          bg: 'accent.glow',
          pointerEvents: 'none',
        })}
      />

      <Flex
        className={css({
          flexDirection: 'column',
          gap: '4',
          position: 'relative',
        })}
      >
        {/* Label */}
        <span
          className={css({
            fontFamily: 'mono',
            fontSize: '2xs',
            fontWeight: 'medium',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'accent.DEFAULT',
          })}
        >
          Featured Project
        </span>

        {/* Title */}
        <h2
          className={css({
            fontFamily: 'serif',
            fontSize: 'lg',
            fontWeight: 'bold',
            letterSpacing: 'tight',
            lineHeight: 'snug',
            color: 'text',
          })}
        >
          {featuredProject.title}
        </h2>

        {/* Problem Statement */}
        <p
          className={css({
            fontFamily: 'serif',
            fontSize: 'base',
            fontWeight: 'regular',
            lineHeight: 'normal',
            color: 'text.mid',
            maxWidth: '60ch',
          })}
        >
          {featuredProject.problem}
        </p>

        {/* External Link */}
        <a
          href={featuredProject.link ?? featuredProject.externalUrl ?? featuredProject.url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2',
            fontFamily: 'mono',
            fontSize: 'xs',
            fontWeight: 'medium',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'accent.DEFAULT',
            borderBottom: '1px solid',
            borderBottomColor: 'border.accent',
            pb: '1',
            width: 'fit-content',
            transition: 'color 0.12s ease, border-color 0.12s ease',
            _hover: {
              color: 'text',
              borderBottomColor: 'border.mid',
            },
          })}
        >
          View Project
          <span aria-hidden="true">↗</span>
        </a>
      </Flex>
    </Box>
  )
}