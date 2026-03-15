import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { FeaturedProject } from '../components/FeaturedProject'
import { SelectedWork } from '../components/SelectedWork'
import { Experiments } from '../components/Experiments'
import { SectionHead } from '../components/SectionHead'
import { styled } from '../../styled-system/jsx'

export const Route = createFileRoute('/')({
  component: Home,
})

const Gap = styled('div', {
  base: { marginTop: '12' },
})

const Footer = styled('div', {
  base: {
    marginTop: '12',
    paddingTop: '8',
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopColor: 'accent.glow',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const FooterLink = styled('a', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'accent',
    letterSpacing: 'widest',
    transitionProperty: 'opacity',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'default',
    opacity: '0.5',
    _hover: { opacity: '1' },
  },
})

function Home() {
  return (
    <Layout>
      <FeaturedProject />

      <SectionHead label="SELECTED WORK" />
      <SelectedWork />

      <Gap />

      <SectionHead label="EXPERIMENTS" />
      <Experiments />

      <Footer>
        <FooterLink href="mailto:doug@doug-march.com">GET IN TOUCH →</FooterLink>
      </Footer>
    </Layout>
  )
}
