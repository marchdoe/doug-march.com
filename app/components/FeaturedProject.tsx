import { featuredProject } from '../content/projects'
import { styled } from '../../styled-system/jsx'

const Card = styled('div', {
  base: {
    marginBottom: '12',
    paddingBottom: '12',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'accent.glow',
  },
})

const Eyebrow = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'accent',
    opacity: '0.5',
    marginBottom: '6',
  },
})

const CardName = styled('div', {
  base: {
    fontSize: '2xl',
    fontWeight: 'regular',
    letterSpacing: 'tight',
    color: 'text',
    lineHeight: 'tight',
    marginBottom: '5',
    fontStyle: 'italic',
  },
})

const CardDesc = styled('div', {
  base: {
    fontSize: 'base',
    color: 'text.dim',
    lineHeight: 'normal',
    maxWidth: '480px',
    marginBottom: '8',
  },
})

const CardLink = styled('a', {
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
    _hover: {
      gap: '1rem',
    },
  },
})

export function FeaturedProject() {
  if (!featuredProject) return null

  return (
    <Card>
      <Eyebrow>CURRENT PROJECT</Eyebrow>
      <CardName>{featuredProject.title}</CardName>
      {featuredProject.problem && <CardDesc>{featuredProject.problem}</CardDesc>}
      {featuredProject.externalUrl && (
        <CardLink
          href={featuredProject.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          → {featuredProject.externalUrl.replace(/^https?:\/\//, '')}
        </CardLink>
      )}
    </Card>
  )
}
