import { Link, useLocation } from '@tanstack/react-router'
import logoUrl from '../assets/logo.svg'
import { styled } from '../../styled-system/jsx'

const SidebarRoot = styled('aside', {
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1080px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '3',
    paddingBottom: '3',
    paddingLeft: '8',
    paddingRight: '8',
    _mobile: {
      paddingLeft: '5',
      paddingRight: '5',
    },
  },
})

const Identity = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '3',
  },
})

const LogoWrap = styled('div', {
  base: {
    width: '13px',
    height: '13px',
    flexShrink: '0',
    opacity: '0.07',
    marginRight: '1',
    '& img': { width: '100%', height: '100%', display: 'block' },
    _mobile: { display: 'none' },
  },
})

const IdName = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'wider',
    color: 'text',
    opacity: '0.65',
  },
})

const IdSep = styled('span', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.2',
    _mobile: { display: 'none' },
  },
})

const IdRole = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    letterSpacing: 'wide',
    opacity: '0.3',
    _mobile: { display: 'none' },
  },
})

const NavLinks = styled('nav', {
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5',
  },
})

const navLinkConfig = {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'wider',
    color: 'text.dim',
    opacity: '0.4',
    transitionProperty: 'color, opacity',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent', opacity: '1' },
  },
  variants: {
    active: { true: { color: 'accent', opacity: '0.85' } },
    ext: { true: { opacity: '0.18', _mobile: { display: 'none' } } },
  },
} as const

const NavLinkInternal = styled(Link, navLinkConfig)
const NavLinkExternal = styled('a', navLinkConfig)

export function Sidebar() {
  const location = useLocation()

  return (
    <SidebarRoot>
      <Identity>
        <LogoWrap>
          <img src={logoUrl} alt="Doug March logo" />
        </LogoWrap>
        <IdName>DOUG MARCH</IdName>
        <IdSep>·</IdSep>
        <IdRole>DESIGNER & DEVELOPER</IdRole>
      </Identity>
      <NavLinks>
        <NavLinkInternal to="/" active={location.pathname === '/' ? true : undefined}>
          WORK
        </NavLinkInternal>
        <NavLinkInternal to="/about" active={location.pathname === '/about' ? true : undefined}>
          ABOUT
        </NavLinkInternal>
        <NavLinkExternal href="https://spaceman.llc" target="_blank" rel="noopener noreferrer" ext={true}>
          SPACEMAN.LLC
        </NavLinkExternal>
        <NavLinkInternal to="/elements" active={location.pathname === '/elements' ? true : undefined} ext={true}>
          ELEMENTS
        </NavLinkInternal>
      </NavLinks>
    </SidebarRoot>
  )
}
