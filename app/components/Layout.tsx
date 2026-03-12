import { Sidebar } from './Sidebar'
import { MobileFooter } from './MobileFooter'
import { styled } from '../../styled-system/jsx'

const LayoutRoot = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    minHeight: '100vh',
    position: 'relative',
    _before: {
      content: '""',
      position: 'fixed',
      inset: '0',
      backgroundImage: [
        'linear-gradient(rgba(74, 143, 212, 0.02) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(74, 143, 212, 0.02) 1px, transparent 1px)',
      ].join(', '),
      backgroundSize: '40px 40px',
      pointerEvents: 'none',
      zIndex: '0',
    },
    _mobile: {
      gridTemplateColumns: '1fr',
    },
  },
})

const Main = styled('main', {
  base: {
    paddingTop: '12',
    paddingBottom: '12',
    paddingLeft: '10',
    paddingRight: '10',
    maxWidth: '780px',
    position: 'relative',
    zIndex: '1',
    _mobile: {
      paddingTop: '6',
      paddingBottom: '6',
      paddingLeft: '5',
      paddingRight: '5',
    },
  },
})

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutRoot>
      <Sidebar />
      <Main>{children}</Main>
      <MobileFooter />
    </LayoutRoot>
  )
}
