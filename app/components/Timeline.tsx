import { timeline } from '../content/timeline'
import { styled } from '../../styled-system/jsx'

const Item = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '52px 1fr',
    columnGap: '6',
    paddingTop: '5',
    paddingBottom: '5',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const Year = styled('div', {
  base: {
    fontSize: 'xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'text.dim',
    paddingTop: '0.2rem',
    textAlign: 'right',
    opacity: '0.4',
    letterSpacing: 'wide',
  },
})

const Content = styled('div', { base: {} })

const Role = styled('div', {
  base: {
    fontSize: 'md',
    fontWeight: 'regular',
    fontStyle: 'italic',
    color: 'text',
    marginBottom: '0.25rem',
  },
})

const Company = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'text.dim',
    letterSpacing: 'wider',
    marginBottom: '0.4rem',
  },
  variants: {
    current: { true: { color: 'accent' } },
  },
})

const Description = styled('div', {
  base: {
    fontSize: 'sm',
    color: 'text.dim',
    lineHeight: 'normal',
    opacity: '0.5',
  },
})

export function Timeline() {
  return (
    <div>
      {timeline.map((entry) => (
        <Item key={entry.year}>
          <Year>{entry.year}</Year>
          <Content>
            <Role>{entry.role}</Role>
            <Company current={entry.current ? true : undefined}>{entry.company}</Company>
            <Description>{entry.description}</Description>
          </Content>
        </Item>
      ))}
    </div>
  )
}
