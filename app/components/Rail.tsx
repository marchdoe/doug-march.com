import { Flex, HStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

const navLinkClass = css({
  fontSize: 'sm',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'text',
  fontWeight: 'medium',
  padding: '2',
  paddingInline: '1',
  fontFamily: 'body',
  _hover: { color: 'accent' },
})

const metaClass = css({
  fontSize: 'sm',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  fontWeight: 'medium',
  whiteSpace: 'nowrap',
  fontFamily: 'body',
})

export function Rail() {
  return (
    <Flex
      as="footer"
      bg="bgRail"
      minH="64px"
      align="center"
      justify="space-between"
      gap="4"
      wrap="wrap"
      paddingBlock="3"
      css={{ paddingInline: '6vw' }}
    >
      <HStack as="nav" aria-label="Primary" gap="7">
        <a href="/work" className={navLinkClass}>
          Work
        </a>
        <a href="/about" className={navLinkClass}>
          About
        </a>
        <a href="/experiments" className={navLinkClass}>
          Experiments
        </a>
      </HStack>
      <Flex align="center" gap="4" wrap="wrap" justify="flex-end">
        <span className={metaClass}>
          <span className={css({ color: 'textSecondary' })}>On Air ·</span> My Morning Jacket / The
          War on Drugs
        </span>
        <span className={metaClass}>Summer · Sunset 19:30 · Build 2026-07-16</span>
      </Flex>
    </Flex>
  )
}
