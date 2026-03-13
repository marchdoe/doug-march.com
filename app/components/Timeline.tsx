import { timeline } from '../content/timeline'
import { styled } from '../../styled-system/jsx'

const Item = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '80px 16px 1fr',
    gap: '0 6',
  },
})

const Year = styled('div', {
  base: {
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'text.dim',
    paddingTop: '4',
    paddingBottom: '4',
    textAlign: 'right',
  },
})

const LineWrap = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Dot = styled('div', {
  base: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'logo.blueDim',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blue',
    marginTop: '1.1rem',
    flexShrink: '0',
  },
  variants: {
    current: {
      true: {
        background: 'logo.green',
        borderColor: 'logo.green',
        boxShadow: '0 0 8px var(--colors-logo-green)',
      },
    },
  },
})

const Rule = styled('div', {
  base: {
    flex: '1',
    width: '1px',
    background: 'logo.blueDim',
  },
})

const Content = styled('div', {
  base: {
    paddingTop: '0.85rem',
    paddingBottom: '5',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const Role = styled('div', {
  base: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    letterSpacing: '-0.01em',
    color: 'text',
    marginBottom: '0.2rem',
  },
})

const Company = styled('div', {
  base: {
    fontSize: 'sm',
    color: 'accent.dim',
    marginBottom: '0.4rem',
  },
  variants: {
    current: {
      true: { color: 'logo.green' },
    },
  },
})

const Description = styled('div', {
  base: {
    fontSize: '0.62rem',
    color: 'text.dim',
    lineHeight: '1.7',
    fontStyle: 'italic',
  },
})

export function Timeline() {
  return (
    <div>
      {timeline.map((entry) => (
        <Item key={entry.year}>
          <Year>{entry.year}</Year>
          <LineWrap>
            <Dot current={entry.current ? true : undefined} />
            <Rule />
          </LineWrap>
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
