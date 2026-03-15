import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { projects } from '../content/projects'
import { styled } from '../../styled-system/jsx'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug)
    if (!project) throw notFound()
    return project
  },
  component: ProjectPage,
})

const BackLink = styled(Link, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'text.dim',
    letterSpacing: 'wider',
    marginBottom: '10',
    transitionProperty: 'color',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent' },
  },
})

const Header = styled('div', {
  base: {
    paddingBottom: '10',
    marginBottom: '10',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'accent.glow',
  },
})

const TypeLabel = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'accent',
    opacity: '0.4',
    marginBottom: '5',
  },
})

const Title = styled('div', {
  base: {
    fontSize: '2xl',
    fontWeight: 'regular',
    fontStyle: 'italic',
    letterSpacing: 'tight',
    color: 'text',
    lineHeight: 'tight',
    marginBottom: '6',
  },
})

const Meta = styled('div', {
  base: {
    display: 'flex',
    gap: '10',
    flexWrap: 'wrap',
  },
})

const MetaItem = styled('div', {
  base: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
})

const MetaLabel = styled('div', {
  base: { fontSize: '2xs', fontFamily: 'mono', fontWeight: 'bold', letterSpacing: 'widest', color: 'text.dim', opacity: '0.35' },
})

const MetaValue = styled('div', {
  base: { fontSize: 'sm', color: 'text.mid', fontStyle: 'italic' },
})

const Section = styled('div', {
  base: { marginBottom: '10' },
})

const SectionTitle = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'accent',
    opacity: '0.35',
    marginBottom: '4',
  },
})

const Body = styled('div', {
  base: {
    fontSize: 'base',
    color: 'text.mid',
    lineHeight: 'normal',
  },
})

const Tags = styled('div', {
  base: {
    display: 'flex',
    gap: '2',
    flexWrap: 'wrap',
    marginTop: '2',
  },
})

const Tag = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'wider',
    color: 'text.dim',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
    paddingLeft: '0.7rem',
    paddingRight: '0.7rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'accent',
    borderRadius: '0',
    opacity: '0.4',
  },
})

const Ctas = styled('div', {
  base: { display: 'flex', gap: '6', marginTop: '12' },
})

const BtnGreen = styled('a', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3',
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'accent',
    letterSpacing: 'wider',
    transitionProperty: 'gap',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'default',
    _hover: { gap: '1rem' },
  },
})

const BtnGhost = styled('a', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3',
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'text.dim',
    letterSpacing: 'wider',
    transitionProperty: 'color, gap',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent', gap: '1rem' },
  },
})

const LightCard = styled('div', {
  base: {
    marginBottom: '10',
  },
})

const LightTitle = styled('div', {
  base: {
    fontSize: 'xl',
    fontWeight: 'regular',
    fontStyle: 'italic',
    letterSpacing: 'tight',
    color: 'text',
    lineHeight: 'tight',
    marginBottom: '4',
  },
})

const LightDesc = styled('div', {
  base: {
    fontSize: 'base',
    color: 'text.mid',
    lineHeight: 'normal',
    marginBottom: '8',
  },
})

const QuickFacts = styled('div', {
  base: {
    display: 'flex',
    gap: '10',
    marginBottom: '10',
  },
})

const Fact = styled('div', {
  base: {},
})

const FactLabel = styled('div', {
  base: { fontSize: '2xs', fontFamily: 'mono', fontWeight: 'bold', letterSpacing: 'widest', color: 'text.dim', opacity: '0.35', marginBottom: '0.4rem' },
})

const FactValue = styled('div', {
  base: { fontSize: 'sm', color: 'text.mid', fontStyle: 'italic' },
})

function ProjectPage() {
  const project = Route.useLoaderData()

  if (project.depth === 'lightweight') {
    return (
      <Layout>
        <BackLink to={'/' as any}>← BACK</BackLink>
        <LightCard>
          <TypeLabel>{project.type.toUpperCase()}</TypeLabel>
          <LightTitle>{project.title}</LightTitle>
          <LightDesc>{project.description}</LightDesc>
          {project.externalUrl && (
            <BtnGreen href={project.externalUrl} target="_blank" rel="noopener noreferrer">
              VIEW PROJECT ↗
            </BtnGreen>
          )}
        </LightCard>
        <SectionHead label="QUICK FACTS" />
        <QuickFacts>
          <Fact><FactLabel>TYPE</FactLabel><FactValue>{project.type}</FactValue></Fact>
          <Fact><FactLabel>YEAR</FactLabel><FactValue>{project.year}</FactValue></Fact>
          <Fact><FactLabel>STATUS</FactLabel><FactValue>{project.status ?? 'Complete'}</FactValue></Fact>
        </QuickFacts>
        {project.stack && (
          <>
            <SectionHead label="STACK" />
            <Tags style={{ marginTop: '0.5rem' }}>
              {project.stack.map((s) => <Tag key={s}>{s.toUpperCase()}</Tag>)}
            </Tags>
          </>
        )}
      </Layout>
    )
  }

  return (
    <Layout>
      <BackLink to={'/' as any}>← BACK</BackLink>
      <Header>
        <TypeLabel>{project.type} · {project.year}</TypeLabel>
        <Title>{project.title}</Title>
        <Meta>
          {project.role && (
            <MetaItem><MetaLabel>ROLE</MetaLabel><MetaValue>{project.role}</MetaValue></MetaItem>
          )}
          {project.timeline && (
            <MetaItem><MetaLabel>TIMELINE</MetaLabel><MetaValue>{project.timeline}</MetaValue></MetaItem>
          )}
          {project.status && (
            <MetaItem><MetaLabel>STATUS</MetaLabel><MetaValue>{project.status}</MetaValue></MetaItem>
          )}
        </Meta>
      </Header>

      {project.problem && (
        <Section><SectionTitle>PROBLEM</SectionTitle><Body>{project.problem}</Body></Section>
      )}
      {project.approach && (
        <Section><SectionTitle>APPROACH</SectionTitle><Body>{project.approach}</Body></Section>
      )}
      {project.outcome && (
        <Section><SectionTitle>OUTCOME</SectionTitle><Body>{project.outcome}</Body></Section>
      )}
      {project.stack && (
        <Section>
          <SectionTitle>STACK</SectionTitle>
          <Tags>{project.stack.map((s) => <Tag key={s}>{s.toUpperCase()}</Tag>)}</Tags>
        </Section>
      )}

      <Ctas>
        {project.liveUrl && (
          <BtnGreen href={project.liveUrl} target="_blank" rel="noopener noreferrer">VIEW LIVE SITE →</BtnGreen>
        )}
        {project.githubUrl && (
          <BtnGhost href={project.githubUrl} target="_blank" rel="noopener noreferrer">VIEW ON GITHUB ↗</BtnGhost>
        )}
      </Ctas>
    </Layout>
  )
}
