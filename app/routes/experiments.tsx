import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { experiments } from '../content/projects'

export const Route = createFileRoute('/experiments')({
  component: ExperimentsPage,
  head: () => ({ meta: [{ title: 'Experiments' }] }),
})

const rowClass = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '4',
  padding: '3 4',
  borderBottom: '1px solid',
  borderColor: 'border',
  fontSize: 'base',
  color: 'text',
  _hover: { color: 'accent' },
})

const metaClass = css({
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
})

/**
 * Type here is sized against the container, not the viewport.
 *
 * This page sits inside Layout.tsx, which the React Engineer rewrites every
 * night and which may give the content column any fraction of the screen it
 * likes. On 2026-08-30 it chose a `1.35fr 1fr` split, so `clamp(40px, 8vw,
 * 100px)` measured 1440px and rendered into ~600px: the headline read
 * "EXPERI", the nav and every row's metadata sat off-screen. See #215.
 */
function ExperimentsPage() {
  return (
    <Box
      containerType="inline-size"
      padding={{ base: '6 4', md: '8 6vw' }}
      display="flex"
      flexDirection="column"
      gap="6"
    >
      <h1
        className={css({
          fontFamily: 'display',
          textTransform: 'uppercase',
          fontSize: 'clamp(32px, 12cqi, 100px)',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'text',
        })}
      >
        Experi<span className={css({ color: 'accent' })}>ments</span>
      </h1>
      <Flex direction="column">
        {experiments.map((project) => (
          <a
            key={project.slug}
            href={project.externalUrl ?? `/work/${project.slug}`}
            className={rowClass}
          >
            <span>{project.title}</span>
            <Flex gap="4">
              <span className={metaClass}>{project.type}</span>
              <span className={metaClass}>{project.year}</span>
            </Flex>
          </a>
        ))}
      </Flex>
    </Box>
  )
}
