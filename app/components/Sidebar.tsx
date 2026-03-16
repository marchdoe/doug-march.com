import { Link, useLocation } from '@tanstack/react-router'
import logoUrl from '../assets/logo.svg'
import { styled } from '../../styled-system/jsx'

const SidebarRoot = styled('aside', {
  base: {
    width: '196px',
    flexShrink: '0',
    position: 'sticky',
    top: '0',
    height: '100vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '8',
    paddingLeft: '5',
    paddingRight: '5',
    paddingBottom: '8',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'border',
    background: 'bg.side',
    _mobile: {
      width: '100%',
      height: 'auto',
      position: 'static',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '4',
      paddingBottom: '4',
      paddingLeft: '5',
      paddingRight: '5',
      borderRightWidth: '0',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'border',
      overflowY: 'visible',
    },
  },
})

const Identity = styled('div', {
  base: {
    marginBottom: '8',
    _mobile: {
      display: 'flex',
      alignItems: 'center',
      gap: '3',
      marginBottom: '0',
    },
  },
})

const LogoWrap = styled('div', {
  base: {
    width: '18px',
    height: '18px',
    flexShrink: '0',
    opacity: '0.22',
    marginBottom: '5',
    '& img': { width: '100%', height: '100%' },
    _mobile: {
      marginBottom: '0',
    },
  },
})

const IdTextBlock = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1',
  },
})

const IdName = styled('div', {
  base: {
    fontSize: 'xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'wider',
    color: 'text',
    lineHeight: 'tight',
  },
})

const IdRole = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'text.dim',
    letterSpacing: 'wide',
    opacity: '0.45',
    _mobile: { display: 'none' },
  },
})

const Nav = styled('nav', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1',
    _mobile: { display: 'none' },
  },
})

const navLinkConfig = {
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
      true: {
        color: 'accent',
        borderLeftColor: 'accent',
      },
    },
    ext: {
      true: {
        opacity: '0.38',
      },
    },
  },
} as const

const NavLinkInternal = styled(Link, navLinkConfig)
const NavLinkExternal = styled('a', navLinkConfig)

const FlexSpacer = styled('div', { base: { flex: '1' } })

const EveSignal = styled('div', {
  base: {
    paddingTop: '5',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'border',
    _mobile: { display: 'none' },
  },
})

const EveDot = styled('div', {
  base: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'accent',
    opacity: '0.45',
    marginBottom: '3',
  },
})

const EveLabel = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    color: 'accent',
    opacity: '0.38',
    letterSpacing: 'wide',
    lineHeight: 'snug',
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
        <IdTextBlock>
          <IdName>DOUG MARCH</IdName>
          <IdRole>DESIGNER &amp; DEVELOPER</IdRole>
        </IdTextBlock>
      </Identity>

      <Nav aria-label="Primary navigation">
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
          SPACEMAN.LLC ↗
        </NavLinkExternal>
        <NavLinkInternal
          to="/elements"
          active={location.pathname === '/elements' ? true : undefined}
          ext={true}
        >
          ELEMENTS
        </NavLinkInternal>
      </Nav>

      <FlexSpacer />

      <EveSignal aria-hidden="true">
        <EveDot />
        <EveLabel>ST. PATRICK'S<br />EVE</EveLabel>
      </EveSignal>
    </SidebarRoot>
  )
}
