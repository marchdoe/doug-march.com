import { styled } from '../../styled-system/jsx'

const FooterRoot = styled('footer', {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '6',
    paddingBottom: '6',
    paddingLeft: '8',
    paddingRight: '8',
    maxWidth: '960px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopColor: 'accent.glow',
    _mobile: {
      paddingLeft: '5',
      paddingRight: '5',
      paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
    },
  },
})

const Copy = styled('span', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.25',
    letterSpacing: 'wider',
  },
})

const Links = styled('div', {
  base: {
    display: 'flex',
    gap: '5',
  },
})

const FooterLink = styled('a', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.25',
    letterSpacing: 'wide',
    transitionProperty: 'color, opacity',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent', opacity: '1' },
  },
})

export function MobileFooter() {
  return (
    <FooterRoot>
      <Copy>© {new Date().getFullYear()} DOUG MARCH</Copy>
      <Links>
        <FooterLink href="https://github.com/dougmarch" target="_blank" rel="noopener noreferrer">GITHUB ↗</FooterLink>
        <FooterLink href="https://twitter.com/dougmarch" target="_blank" rel="noopener noreferrer">TWITTER ↗</FooterLink>
        <FooterLink href="https://linkedin.com/in/dougmarch" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</FooterLink>
        <FooterLink href="mailto:doug@doug-march.com">EMAIL →</FooterLink>
      </Links>
    </FooterRoot>
  )
}
