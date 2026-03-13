import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { MissionCard } from '../components/MissionCard'
import { ProjectRow } from '../components/ProjectRow'
import { SectionHead } from '../components/SectionHead'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { styled } from '../../styled-system/jsx'

export const Route = createFileRoute('/')({
  component: Home,
})

const Gap = styled('div', {
  base: { marginTop: '10' },
})

const Footer = styled('div', {
  base: {
    marginTop: '12',
    paddingTop: '5',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'logo.blueDim',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const FooterText = styled('span', {
  base: {
    fontSize: 'xs',
    color: 'text.dim',
  },
})

const FooterLink = styled('a', {
  base: {
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'logo.green',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.green',
    paddingTop: '0.35rem',
    paddingBottom: '0.35rem',
    paddingLeft: '3',
    paddingRight: '3',
    transitionProperty: 'background',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'default',
    _hover: { background: 'logo.greenDim' },
  },
})

function Home() {
  return (
    <Layout>
      {featuredProject && <MissionCard project={featuredProject} />}

      <SectionHead label="SELECTED WORK" />
      {selectedWork.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}

      <Gap />

      <SectionHead label="EXPERIMENTS &amp; SIDE PROJECTS" />
      {experiments.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}

      <Footer>
        <FooterText>© {new Date().getFullYear()} DOUG MARCH</FooterText>
        <FooterLink href="mailto:doug@doug-march.com">GET IN TOUCH →</FooterLink>
      </Footer>
    </Layout>
  )
}
