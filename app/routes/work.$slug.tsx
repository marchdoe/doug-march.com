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
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'text.dim',
    letterSpacing: 'wide',
    marginBottom: '8',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent' },
  },
})

const Header = styled('div', {
  base: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    paddingBottom: '8',
    marginBottom: '8',
  },
})

const TypeLabel = styled('div', {
  base: {
    fontSize: 'xs',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'text.dim',
    marginBottom: '3',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    _before: { content: '"//"', color: 'accent' },
  },
})

const Title = styled('div', {
  base: {
    fontSize: '2xl',
    fontWeight: 'bold',
    letterSpacing: '-0.04em',
    color: 'accent',
    textShadow: '0 0 24px rgba(0, 229, 255, 0.2)',
    lineHeight: 'tight',
    marginBottom: '3',
  },
})

const Meta = styled('div', {
  base: {
    display: 'flex',
    gap: '6',
    flexWrap: 'wrap',
  },
})

const MetaItem = styled('div', {
  base: { display: 'flex', flexDirection: 'column', gap: '0.2rem' },
})

const MetaLabel = styled('div', {
  base: { fontSize: '2xs', letterSpacing: 'wider', color: 'text.dim' },
})

const MetaValue = styled('div', {
  base: { fontSize: '0.65rem', fontWeight: 'bold', color: 'text.mid' },
})

const Section = styled('div', {
  base: { marginBottom: '8' },
})

const SectionTitle = styled('div', {
  base: {
    fontSize: '0.55rem',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'accent.dim',
    marginBottom: '0.6rem',
  },
})

const Body = styled('div', {
  base: {
    fontSize: '0.72rem',
    color: 'text.mid',
    lineHeight: '1.9',
    fontStyle: 'italic',
  },
})

const Tags = styled('div', {
  base: {
    display: 'flex',
    gap: '2',
    flexWrap: 'wrap',
    marginTop: '3',
  },
})

const Tag = styled('div', {
  base: {
    fontSize: '0.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.07em',
    color: 'text.dim',
    background: 'bg.card',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    paddingTop: '0.2rem',
    paddingBottom: '0.2rem',
    paddingLeft: '2',
    paddingRight: '2',
  },
})

const Ctas = styled('div', {
  base: { display: 'flex', gap: '3', marginTop: '8' },
})

const BtnGreen = styled('a', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2',
    fontSize: '0.62rem',
    fontWeight: 'bold',
    color: 'logo.green',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.green',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
    paddingLeft: '0.85rem',
    paddingRight: '0.85rem',
    transitionProperty: 'background, gap',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'default',
    _hover: { background: 'logo.greenDim', gap: '0.75rem' },
  },
})

const BtnGhost = styled('a', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2',
    fontSize: '0.62rem',
    fontWeight: 'bold',
    color: 'text.mid',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'border.mid',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
    paddingLeft: '0.85rem',
    paddingRight: '0.85rem',
    transitionProperty: 'color, border-color, gap',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent', borderColor: 'accent.dim', gap: '0.75rem' },
  },
})

const LightCard = styled('div', {
  base: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    background: 'bg.card',
    paddingTop: '1.75rem',
    paddingBottom: '1.75rem',
    paddingLeft: '8',
    paddingRight: '8',
    marginBottom: '10',
    position: 'relative',
    _before: {
      content: 'attr(data-label)',
      position: 'absolute',
      top: '-0.55rem',
      left: '6',
      background: 'bg',
      paddingLeft: '2',
      paddingRight: '2',
      fontSize: 'xs',
      fontWeight: 'bold',
      letterSpacing: 'widest',
      color: 'text.dim',
    },
  },
})

const LightTitle = styled('div', {
  base: {
    fontSize: 'xl',
    fontWeight: 'bold',
    letterSpacing: 'tight',
    color: 'text',
    lineHeight: 'tight',
    marginBottom: '2',
  },
})

const LightDesc = styled('div', {
  base: {
    fontSize: 'base',
    color: 'text.mid',
    lineHeight: '1.85',
    fontStyle: 'italic',
    marginBottom: '5',
  },
})

const QuickFacts = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    marginBottom: '8',
  },
})

const Fact = styled('div', {
  base: {
    paddingTop: '0.85rem',
    paddingBottom: '0.85rem',
    paddingLeft: '4',
    paddingRight: '4',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'logo.blueDim',
    '&:last-child': { borderRightWidth: '0' },
  },
})

const FactLabel = styled('div', {
  base: { fontSize: '2xs', letterSpacing: 'wider', color: 'text.dim', marginBottom: '0.3rem' },
})

const FactValue = styled('div', {
  base: { fontSize: '0.72rem', fontWeight: 'bold', color: 'text.mid' },
})

function ProjectPage() {
  const project = Route.useLoaderData()

  if (project.depth === 'lightweight') {
    return (
      <Layout>
        <BackLink to={'/' as any}>← BACK TO WORK</BackLink>
        <LightCard data-label={project.type.toUpperCase()}>
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
      <BackLink to={'/' as any}>← BACK TO WORK</BackLink>
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
        <Section><SectionTitle>// PROBLEM</SectionTitle><Body>{project.problem}</Body></Section>
      )}
      {project.approach && (
        <Section><SectionTitle>// APPROACH</SectionTitle><Body>{project.approach}</Body></Section>
      )}
      {project.outcome && (
        <Section><SectionTitle>// OUTCOME</SectionTitle><Body>{project.outcome}</Body></Section>
      )}
      {project.stack && (
        <Section>
          <SectionTitle>// STACK</SectionTitle>
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
