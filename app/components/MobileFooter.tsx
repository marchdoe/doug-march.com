import { styled } from '../../styled-system/jsx'

const FooterRoot = styled('footer', {
  base: {
    display: 'none',
    _mobile: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '3',
      paddingLeft: '5',
      paddingRight: '5',
      paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: 'logo.blueDim',
      marginTop: 'auto',
    },
  },
})

const Copy = styled('span', {
  base: {
    fontSize: 'xs',
    color: 'text.dim',
  },
})

const Links = styled('div', {
  base: {
    display: 'flex',
    gap: '3',
  },
})

const FooterLink = styled('a', {
  base: {
    fontSize: '0.58rem',
    color: 'text.dim',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent' },
  },
})

export function MobileFooter() {
  return (
    <FooterRoot>
      <Copy>© {new Date().getFullYear()} DOUG MARCH</Copy>
      <Links>
        <FooterLink href="https://github.com/dougmarch" target="_blank" rel="noopener noreferrer">GitHub ↗</FooterLink>
        <FooterLink href="https://twitter.com/dougmarch" target="_blank" rel="noopener noreferrer">Twitter / X ↗</FooterLink>
        <FooterLink href="https://linkedin.com/in/dougmarch" target="_blank" rel="noopener noreferrer">LinkedIn ↗</FooterLink>
        <FooterLink href="mailto:doug@doug-march.com">Email →</FooterLink>
      </Links>
    </FooterRoot>
  )
}
