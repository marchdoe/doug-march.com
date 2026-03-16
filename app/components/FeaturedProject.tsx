import { featuredProject } from '../content/projects'
import { styled } from '../../styled-system/jsx'

const Card = styled('div', {
  base: {
    marginBottom: '8',
    paddingBottom: '8',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const Dateline = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '3',
    marginBottom: '5',
  },
})

const DatelineLabel = styled('span', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'ruled',
    color: 'accent',
    opacity: '0.6',
  },
})

const DatelineLine = styled('span', {
  base: {
    flex: '1',
    height: '1px',
    background: 'border',
    display: 'block',
  },
})

const CardName = styled('div', {
  base: {
    fontSize: '2xl',
    fontWeight: 'regular',
    letterSpacing: 'tight',
    color: 'text',
    lineHeight: 'tight',
    marginBottom: '4',
    fontStyle: 'italic',
  },
})

const CardDesc = styled('div', {
  base: {
    fontSize: 'base',
    color: 'text.mid',
    lineHeight: 'normal',
    maxWidth: '520px',
    marginBottom: '6',
  },
})

const CardLink = styled('a', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2',
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'accent',
    letterSpacing: 'wider',
    paddingTop: '2',
    paddingBottom: '2',
    paddingLeft: '3',
    paddingRight: '3',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'accent',
    opacity: '0.7',
    transitionProperty: 'opacity, gap',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: { opacity: '1', gap: '0.75rem' },
  },
})

export function FeaturedProject() {
  if (!featuredProject) return null
  return (
    <Card>
      <Dateline>
        <DatelineLabel>CURRENT PROJECT</DatelineLabel>
        <DatelineLine />
      </Dateline>
      <CardName>{featuredProject.title}</CardName>
      {featuredProject.problem && <CardDesc>{featuredProject.problem}</CardDesc>}
      {featuredProject.externalUrl && (
        <CardLink href={featuredProject.externalUrl} target="_blank" rel="noopener noreferrer">
          {featuredProject.externalUrl.replace(/^https?:\/\//, '')} ↗
        </CardLink>
      )}
    </Card>
  )
}
