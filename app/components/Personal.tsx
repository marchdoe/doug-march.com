// app/components/Personal.tsx
import { personal } from '../content/about'
import { styled } from '../../styled-system/jsx'

const Wrap = styled('div', {
  base: {
    marginTop: '10',
    paddingTop: '8',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'logo.blueDim',
  },
})

const Facts = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
    marginTop: '4',
  },
})

const Fact = styled('div', {
  base: {
    fontSize: '0.65rem',
    color: 'text.dim',
    lineHeight: '1.6',
  },
})

const Label = styled('span', {
  base: {
    color: 'text.mid',
    fontWeight: 'bold',
    marginRight: '2',
  },
})

export function Personal() {
  return (
    <Wrap>
      <Facts>
        <Fact>
          <Label>Sport:</Label>
          {personal.sport} — {personal.holesInOne} holes in one
        </Fact>
        <Fact>
          <Label>Teams:</Label>
          {personal.teams.join(', ')}
        </Fact>
        <Fact>
          <Label>Currently:</Label>
          {personal.currentFocus}
        </Fact>
      </Facts>
    </Wrap>
  )
}
