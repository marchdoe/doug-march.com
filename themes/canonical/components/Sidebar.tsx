import { Link, useLocation } from '@tanstack/react-router'
import logoUrl from '../assets/logo.svg'
import { styled } from '../../styled-system/jsx'

const SidebarRoot = styled('aside', {
  base: {
    background: 'bg.side',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'logo.blueDim',
    paddingTop: '12',
    paddingBottom: '12',
    paddingLeft: '8',
    paddingRight: '8',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: '0',
    height: '100vh',
    width: '280px',
    _mobile: {
      width: '100%',
      height: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '3',
      paddingBottom: '3',
      paddingLeft: '5',
      paddingRight: '5',
      borderRightWidth: '0',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'logo.blueDim',
      zIndex: '100',
    },
  },
})

const Identity = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    marginBottom: '5',
    paddingBottom: '6',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    _mobile: {
      marginBottom: '0',
      paddingBottom: '0',
      borderBottomWidth: '0',
    },
  },
})

const LogoWrap = styled('div', {
  base: {
    width: '44px',
    height: '44px',
    flexShrink: '0',
    borderRadius: '28%',
    background: '#fff',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': { width: '100%', height: '100%' },
  },
})

const IdName = styled('div', {
  base: {
    fontSize: 'md',
    fontWeight: 'bold',
    letterSpacing: '-0.01em',
    color: 'text',
    lineHeight: 'snug',
  },
})

const IdRole = styled('div', {
  base: {
    fontSize: 'xs',
    color: 'text.dim',
    letterSpacing: '0.04em',
    marginTop: '0.2rem',
    _mobile: { display: 'none' },
  },
})

const Nav = styled('nav', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    _mobile: {
      flexDirection: 'row',
      gap: '4',
      marginLeft: 'auto',
    },
  },
})

// Shared nav link styles — used for both internal (Link) and external (a) links
const navLinkConfig = {
  base: {
    fontSize: 'base',
    fontWeight: 'bold',
    color: 'text.mid',
    paddingTop: '2',
    paddingBottom: '2',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _before: {
      content: '"//"',
      fontSize: 'xs',
      color: 'text.dim',
      transitionProperty: 'color',
      transitionDuration: 'fast',
      transitionTimingFunction: 'default',
    },
    _hover: {
      color: 'accent',
      _before: { color: 'accent' },
    },
    _mobile: {
      borderBottomWidth: '0',
      paddingTop: '0',
      paddingBottom: '0',
      fontSize: 'xs',
    },
  },
  variants: {
    active: {
      true: {
        color: 'accent',
        _before: { color: 'accent' },
      },
    },
    ext: {
      true: {
        color: 'text.dim',
        fontSize: 'sm',
        _mobile: { display: 'none' },
      },
    },
  },
} as const

const NavLinkInternal = styled(Link, navLinkConfig)
const NavLinkExternal = styled('a', navLinkConfig)

const Social = styled('div', {
  base: {
    marginTop: 'auto',
    paddingTop: '6',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'logo.blueDim',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    _mobile: { display: 'none' },
  },
})

const SocialLink = styled('a', {
  base: {
    fontSize: '0.62rem',
    color: 'text.dim',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent' },
  },
})

export function Sidebar() {
  const location = useLocation()

  return (
    <SidebarRoot>
      <Identity>
        <LogoWrap>
          <img src={logoUrl} alt="Doug March logo" />
        </LogoWrap>
        <div>
          <IdName>DOUG MARCH</IdName>
          <IdRole>DESIGNER &amp; DEVELOPER</IdRole>
        </div>
      </Identity>

      <Nav>
        <NavLinkInternal
          to="/"
          active={location.pathname === '/' ? true : undefined}
        >
          work
        </NavLinkInternal>
        <NavLinkInternal
          to="/about"
          active={location.pathname === '/about' ? true : undefined}
        >
          about
        </NavLinkInternal>
        <NavLinkExternal
          href="https://spaceman.llc"
          target="_blank"
          rel="noopener noreferrer"
          ext={true}
        >
          spaceman.llc
        </NavLinkExternal>
        <NavLinkInternal
          to="/elements"
          active={location.pathname === '/elements' ? true : undefined}
          ext={true}
        >
          elements
        </NavLinkInternal>
      </Nav>

      <Social>
        <SocialLink href="https://github.com/dougmarch" target="_blank" rel="noopener noreferrer">GitHub ↗</SocialLink>
        <SocialLink href="https://twitter.com/dougmarch" target="_blank" rel="noopener noreferrer">Twitter / X ↗</SocialLink>
        <SocialLink href="https://linkedin.com/in/dougmarch" target="_blank" rel="noopener noreferrer">LinkedIn ↗</SocialLink>
        <SocialLink href="mailto:doug@doug-march.com">Email →</SocialLink>
      </Social>
    </SidebarRoot>
  )
}
