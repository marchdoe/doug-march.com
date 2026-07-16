import { Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

const navLink = css({
  fontSize: 'sm',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'text',
  fontWeight: 'medium',
  padding: '2 1',
  lineHeight: 'tight',
  _hover: { color: 'accent' },
})

const metaText = css({
  fontSize: 'sm',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  fontWeight: 'medium',
  whiteSpace: 'nowrap',
})

const onAir = css({ color: 'textSecondary' })

export function Sidebar() {
  return (
    <Flex
      as="footer"
      bg="bgRail"
      minHeight="64px"
      align="center"
      justify="space-between"
      gap="4"
      padding={{ base: '3 4', md: '3 6vw' }}
      wrap="wrap"
    >
      <nav
        aria-label="Primary"
        className={css({ display: 'flex', gap: '6', alignItems: 'center', flexWrap: 'wrap' })}
      >
        <a href="/work" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
        <a href="/experiments" className={navLink}>Experiments</a>
      </nav>
      <Flex align="center" gap="4" wrap="wrap" justify="flex-end">
        <span className={metaText}>
          <span className={onAir}>On Air ·</span> My Morning Jacket / The War on Drugs
        </span>
        <span className={metaText}>Summer · Sunset 19:30 · Build 2026-07-16</span>
      </Flex>
    </Flex>
  )
}