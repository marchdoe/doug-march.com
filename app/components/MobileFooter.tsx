import { Link, useLocation } from '@tanstack/react-router'
import { styled } from '../../styled-system/jsx'

const FooterRoot = styled('footer', {
  base: {
    paddingTop: '5',
    paddingBottom: '5',
    paddingLeft: '8',
    paddingRight: '8',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'border',
    _mobile: {
      paddingLeft: '5',
      paddingRight: '5',
      paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
    },
  },
})

const MobileNav = styled('nav', {
  base: {
    display: 'none',
    gap: '1',
    flexDirection: 'column',
    marginBottom: '5',
    paddingBottom: '5',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
    _mobile: {
      display: 'flex',
    },
  },
})

const mobileNavLinkConfig = {
  base: {
    display: 'block',
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'ruled',
    color: 'text.dim',
    paddingTop: '2',
    paddingBottom: '2',
    paddingLeft: '3',
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'border',
    transitionProperty: 'color, border-color',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent', borderLeftColor: 'accent.dim' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'accent',
      outlineOffset: '2px',
    },
  },
  variants: {
    active: {
      true: { color: 'accent', borderLeftColor: 'accent' },
    },
    ext: {
      true: { opacity: '0.38' },
    },
  },
} as const

const MobileNavLinkInternal = styled(Link, mobileNavLinkConfig)
const MobileNavLinkExternal = styled('a', mobileNavLinkConfig)

const FooterBottom = styled('div', {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '3',
    _mobile: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
})

const Copy = styled('span', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.3',
    letterSpacing: 'wide',
  },
})

const SocialLinks = styled('div', {
  base: { display: 'flex', gap: '4', flexWrap: 'wrap' },
})

const FooterLink = styled('a', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.28',
    letterSpacing: 'wide',
    transitionProperty: 'color, opacity',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent', opacity: '1' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'accent',
      outlineOffset: '2px',
      opacity: '1',
    },
  },
})

export function MobileFooter() {
  const location = useLocation()
  return (
    <FooterRoot>
      <MobileNav aria-label="Primary navigation">
        <MobileNavLinkInternal
          to="/"
          active={location.pathname === '/' ? true : undefined}
        >
          WORK
        </MobileNavLinkInternal>
        <MobileNavLinkInternal
          to="/about"
          active={location.pathname === '/about' ? true : undefined}
        >
          ABOUT
        </MobileNavLinkInternal>
        <MobileNavLinkExternal
          href="https://spaceman.llc"
          target="_blank"
          rel="noopener noreferrer"
          ext={true}
        >
          SPACEMAN.LLC ↗
        </MobileNavLinkExternal>
        <MobileNavLinkInternal
          to="/elements"
          active={location.pathname === '/elements' ? true : undefined}
          ext={true}
        >
          ELEMENTS
        </MobileNavLinkInternal>
      </MobileNav>
      <FooterBottom>
        <Copy>© {new Date().getFullYear()} DOUG MARCH</Copy>
        <SocialLinks>
          <FooterLink href="https://github.com/dougmarch" target="_blank" rel="noopener noreferrer">GITHUB ↗</FooterLink>
          <FooterLink href="https://twitter.com/dougmarch" target="_blank" rel="noopener noreferrer">TWITTER ↗</FooterLink>
          <FooterLink href="https://linkedin.com/in/dougmarch" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</FooterLink>
          <FooterLink href="mailto:doug@doug-march.com">EMAIL →</FooterLink>
        </SocialLinks>
      </FooterBottom>
    </FooterRoot>
  )
}
