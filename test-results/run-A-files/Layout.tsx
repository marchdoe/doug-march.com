import { Sidebar } from './Sidebar'
import { styled } from '../../styled-system/jsx'

const LayoutRoot = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
})

const TopBar = styled('header', {
  base: {
    position: 'sticky',
    top: '0',
    zIndex: '10',
    background: 'bg.side',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const ContentWrapper = styled('div', {
  base: {
    flex: '1',
    width: '100%',
    maxWidth: '1080px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '8',
    paddingRight: '8',
    paddingTop: '10',
    paddingBottom: '12',
    _mobile: {
      paddingLeft: '5',
      paddingRight: '5',
      paddingTop: '6',
      paddingBottom: '8',
    },
  },
})

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutRoot>
      <TopBar>
        <Sidebar />
      </TopBar>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </LayoutRoot>
  )
}
