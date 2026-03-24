import { featuredProject } from '../content/projects'
import { styled } from '../../styled-system/jsx'

const Card = styled('div', {
  base: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    background: 'bg.card',
    paddingTop: '6',
    paddingBottom: '6',
    paddingLeft: '8',
    paddingRight: '8',
    marginBottom: '12',
    position: 'relative',
    boxShadow: '0 0 30px rgba(0, 229, 255, 0.04), inset 0 0 20px rgba(0, 229, 255, 0.01)',
    _before: {
      content: '"ACTIVE MISSION"',
      position: 'absolute',
      top: '-0.55rem',
      left: '6',
      background: 'bg',
      paddingLeft: '2',
      paddingRight: '2',
      fontSize: 'xs',
      fontWeight: 'bold',
      letterSpacing: 'widest',
      color: 'accent',
    },
    _after: {
      content: '""',
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      width: '2px',
      background: 'linear-gradient(to bottom, transparent, var(--colors-accent), transparent)',
      opacity: '0.3',
    },
  },
})

const CardName = styled('div', {
  base: {
    fontSize: 'xl',
    fontWeight: 'bold',
    letterSpacing: 'tight',
    color: 'accent',
    textShadow: '0 0 24px rgba(0, 229, 255, 0.25)',
    marginBottom: '0.4rem',
    lineHeight: 'tight',
  },
})

const CardDesc = styled('div', {
  base: {
    fontSize: '0.65rem',
    color: 'text.dim',
    lineHeight: 'normal',
    fontStyle: 'italic',
    marginBottom: '5',
  },
})

const CardLink = styled('a', {
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
    _hover: {
      background: 'logo.greenDim',
      gap: '0.75rem',
    },
  },
})

export function FeaturedProject() {
  if (!featuredProject) return null

  return (
    <Card>
      <CardName>{featuredProject.title.toUpperCase()}</CardName>
      {featuredProject.problem && <CardDesc>{featuredProject.problem}</CardDesc>}
      {featuredProject.externalUrl && (
        <CardLink
          href={featuredProject.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          → VISIT {featuredProject.externalUrl.replace(/^https?:\/\//, '').toUpperCase()}
        </CardLink>
      )}
    </Card>
  )
}
