import { Sidebar } from './Sidebar'
import { MobileFooter } from './MobileFooter'
import { styled } from '../../styled-system/jsx'

const LayoutRoot = styled('div', {
  base: {
    display: 'flex',
    minHeight: '100vh',
    _mobile: {
      flexDirection: 'column',
    },
  },
})

const ContentArea = styled('div', {
  base: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
  },
})

const Main = styled('main', {
  base: {
    flex: '1',
    paddingTop: '10',
    paddingBottom: '12',
    paddingLeft: '8',
    paddingRight: '8',
    maxWidth: '660px',
    _mobile: {
      paddingTop: '5',
      paddingBottom: '8',
      paddingLeft: '5',
      paddingRight: '5',
      maxWidth: '100%',
    },
  },
})

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutRoot>
      <Sidebar />
      <ContentArea>
        <Main>{children}</Main>
        <MobileFooter />
      </ContentArea>
    </LayoutRoot>
  )
}
