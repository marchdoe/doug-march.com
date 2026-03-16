import React from 'react'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

const footerStyles = css({
  display: { base: 'flex', lg: 'none' },
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  zIndex: '20',
  bg: 'bg.side',
  borderTopWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'border.accent',
  height: '56px',
  alignItems: 'stretch',
})

const linkStyles = css({
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '44px',
  fontFamily: 'mono',
  fontSize: 'xs',
  fontWeight: 'medium',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  color: 'text.mid',
  transition: 'color 0.12s ease, background 0.12s ease',
  _hover: {
    color: 'accent.DEFAULT',
    bg: 'accent.glow',
  },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'accent.DEFAULT',
    outlineOffset: '-2px',
  },
})

const dividerStyles = css({
  width: '1px',
  bg: 'border.DEFAULT',
  alignSelf: 'stretch',
  flexShrink: '0',
})

export function MobileFooter() {
  return (
    <Box
      as="nav"
      aria-label="Mobile navigation"
      className={footerStyles}
    >
      <a href="/" className={linkStyles}>
        Home
      </a>
      <Box className={dividerStyles} />
      <a href="/about" className={linkStyles}>
        About
      </a>
    </Box>
  )
}