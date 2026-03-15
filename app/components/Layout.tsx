import { Sidebar } from './Sidebar'
import { MobileFooter } from './MobileFooter'
import { styled } from '../../styled-system/jsx'

const LayoutRoot = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
  },
})

const Main = styled('main', {
  base: {
    maxWidth: '720px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '12',
    paddingBottom: '12',
    paddingLeft: '6',
    paddingRight: '6',
    position: 'relative',
    zIndex: '1',
    _mobile: {
      paddingTop: '8',
      paddingBottom: '8',
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
