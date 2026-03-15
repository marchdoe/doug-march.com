import { Link, useLocation } from '@tanstack/react-router'
import logoUrl from '../assets/logo.svg'
import { styled } from '../../styled-system/jsx'

const SidebarRoot = styled('aside', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '6',
    paddingBottom: '6',
    paddingLeft: '8',
    paddingRight: '8',
    maxWidth: '960px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'accent.glow',
    _mobile: {
      paddingTop: '3',
      paddingBottom: '3',
      paddingLeft: '5',
      paddingRight: '5',
      zIndex: '100',
    },
  },
})

const Identity = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
  },
})

const LogoWrap = styled('div', {
  base: {
    width: '24px',
    height: '24px',
    flexShrink: '0',
    borderRadius: '0',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0.4',
    '& img': { width: '100%', height: '100%' },
  },
})

const IdText = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const IdName = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'text',
    lineHeight: 'snug',
  },
})

const IdRole = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    letterSpacing: 'wider',
    _mobile: { display: 'none' },
  },
})

const Nav = styled('nav', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '6',
    _mobile: {
      gap: '4',
    },
  },
})

const navLinkConfig = {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'text.dim',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 'wider',
    transitionProperty: 'color',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: {
      color: 'accent',
    },
    _mobile: {
      fontSize: '2xs',
    },
  },
  variants: {
    active: {
      true: {
        color: 'accent',
      },
    },
    ext: {
      true: {
        color: 'text.dim',
        fontSize: '2xs',
        opacity: '0.35',
        _mobile: { display: 'none' },
      },
    },
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
        <IdText>
          <IdName>DOUG MARCH</IdName>
          <IdRole>DESIGNER & DEVELOPER</IdRole>
        </IdText>
      </Identity>

      <Nav>
        <NavLinkInternal
          to="/"
          active={location.pathname === '/' ? true : undefined}
        >
          WORK
        </NavLinkInternal>
        <NavLinkInternal
          to="/about"
          active={location.pathname === '/about' ? true : undefined}
        >
          ABOUT
        </NavLinkInternal>
        <NavLinkExternal
          href="https://spaceman.llc"
          target="_blank"
          rel="noopener noreferrer"
          ext={true}
        >
          SPACEMAN.LLC
        </NavLinkExternal>
        <NavLinkInternal
          to="/elements"
          active={location.pathname === '/elements' ? true : undefined}
          ext={true}
        >
          ELEMENTS
        </NavLinkInternal>
      </Nav>
    </SidebarRoot>
  )
}
