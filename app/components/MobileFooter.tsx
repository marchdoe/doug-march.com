import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

const mobileLinkClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1',
  minHeight: '44px',
  fontSize: 'xs',
  color: 'textMuted',
  letterSpacing: 'wider',
  fontFamily: 'mono',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color 0.15s ease',
  _hover: {
    color: 'accentLight',
  },
  _focusVisible: {
    outline: '1px solid',
    outlineColor: 'accentLight',
    outlineOffset: '-2px',
  },
})

export function MobileFooter() {
  return (
    <Box
      display={{ base: 'flex', md: 'none' }}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      background="bgHeader"
      borderTop="1px solid"
      borderColor="border"
      zIndex={50}
    >
      <Flex align="stretch" width="100%">
        <a href="/" className={mobileLinkClass}>Home</a>
        <Box width="1px" background="border" flexShrink={0} />
        <a href="/about" className={mobileLinkClass}>About</a>
      </Flex>
    </Box>
  )
}