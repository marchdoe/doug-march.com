import { Link } from '@tanstack/react-router'
import type { Project } from '../content/types'
import { styled } from '../../styled-system/jsx'

const RowLink = styled(Link, {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: '1.2rem',
    paddingBottom: '1.2rem',
    cursor: 'pointer',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'accent.glow',
    transitionProperty: 'padding-left, background',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'default',
    _hover: { paddingLeft: '1rem', background: 'accent.glow' },
  },
})

const RowLinkExt = styled('a', {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: '1.2rem',
    paddingBottom: '1.2rem',
    cursor: 'pointer',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'accent.glow',
    transitionProperty: 'padding-left, background',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'default',
    _hover: { paddingLeft: '1rem', background: 'accent.glow' },
  },
})

const Left = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4',
  },
})

const Name = styled('div', {
  base: {
    fontSize: 'md',
    fontWeight: 'regular',
    color: 'text',
    fontStyle: 'italic',
    transitionProperty: 'color',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _groupHover: { color: 'accent' },
  },
  variants: {
    experiment: {
      true: {
        fontWeight: 'regular',
        fontSize: 'base',
        color: 'text.mid',
        _groupHover: { color: 'accent' },
      },
    },
  },
})

const Tag = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    letterSpacing: 'wider',
    color: 'text.dim',
    opacity: '0.3',
    fontWeight: 'bold',
  },
})

const Right = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '3',
  },
})

const Year = styled('div', {
  base: {
    fontSize: 'xs',
    fontFamily: 'mono',
    color: 'text.dim',
    opacity: '0.25',
    transitionProperty: 'opacity, color',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _groupHover: { opacity: '1', color: 'accent' },
  },
})

type Props = { project: Project; index: number }

export function ProjectRow({ project, index }: Props) {
  const isExperiment = project.depth === 'lightweight'
  const yearLabel = project.externalUrl ? `${project.year} ↗` : `${project.year}`

  const inner = (
    <>
      <Left>
        <Name experiment={isExperiment ? true : undefined}>{project.title}</Name>
        <Tag>{project.type}</Tag>
      </Left>
      <Right>
        <Year>{yearLabel}</Year>
      </Right>
    </>
  )

  if (project.externalUrl && isExperiment) {
    return (
      <RowLinkExt href={project.externalUrl} target="_blank" rel="noopener noreferrer" data-group>
        {inner}
      </RowLinkExt>
    )
  }

  return (
    <RowLink to="/work/$slug" params={{ slug: project.slug } as any} data-group>
      {inner}
    </RowLink>
  )
}
