import { Link } from '@tanstack/react-router'
import type { Project } from '../content/types'
import { styled } from '../../styled-system/jsx'

const RowLink = styled(Link, {
  base: {
    display: 'grid',
    gridTemplateColumns: '1.75rem 1fr auto 4rem',
    gap: '0 1rem',
    alignItems: 'center',
    paddingTop: '0.6rem',
    paddingBottom: '0.6rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    cursor: 'pointer',
    transitionProperty: 'padding-left',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'default',
    _hover: { paddingLeft: '0.35rem' },
  },
})

const RowLinkExt = styled('a', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1.75rem 1fr auto 4rem',
    gap: '0 1rem',
    alignItems: 'center',
    paddingTop: '0.6rem',
    paddingBottom: '0.6rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    cursor: 'pointer',
    transitionProperty: 'padding-left',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'default',
    _hover: { paddingLeft: '0.35rem' },
  },
})

const Num = styled('div', {
  base: {
    fontSize: 'xs',
    color: 'text.dim',
    textAlign: 'right',
  },
})

const Name = styled('div', {
  base: {
    fontSize: 'md',
    fontWeight: 'bold',
    color: 'text.mid',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _groupHover: { color: 'text' },
  },
  variants: {
    experiment: {
      true: {
        fontWeight: 'regular',
        fontStyle: 'italic',
        color: 'text.dim',
        _groupHover: { color: 'text.mid' },
      },
    },
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
    paddingTop: '0.15rem',
    paddingBottom: '0.15rem',
    paddingLeft: '0.4rem',
    paddingRight: '0.4rem',
  },
})

const Year = styled('div', {
  base: {
    fontSize: '0.58rem',
    color: 'text.dim',
    textAlign: 'right',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    _groupHover: { color: 'accent' },
  },
})

type Props = { project: Project; index: number }

export function ProjectRow({ project, index }: Props) {
  const isExperiment = project.depth === 'lightweight'
  const yearLabel = project.externalUrl ? `${project.year} ↗` : `${project.year}`
  const num = String(index + 1).padStart(2, '0')

  const inner = (
    <>
      <Num>{num}</Num>
      <Name experiment={isExperiment ? true : undefined}>{project.title}</Name>
      <Tag>{project.type.toUpperCase()}</Tag>
      <Year>{yearLabel}</Year>
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
