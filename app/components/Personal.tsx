import { personal } from '../content/about'
import { styled } from '../../styled-system/jsx'

const Wrap = styled('div', {
  base: {
    marginTop: '12',
    paddingTop: '8',
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopColor: 'accent.glow',
  },
})

const Facts = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3',
  },
})

const Fact = styled('div', {
  base: {
    fontSize: 'sm',
    color: 'text.dim',
    lineHeight: 'normal',
  },
})

const Label = styled('span', {
  base: {
    fontFamily: 'mono',
    fontSize: '2xs',
    fontWeight: 'bold',
    letterSpacing: 'wider',
    color: 'accent',
    opacity: '0.5',
    marginRight: '3',
  },
})

export function Personal() {
  return (
    <Wrap>
      <Facts>
        <Fact>
          <Label>SPORT</Label>
          {personal.sport} — {personal.holesInOne} holes in one
        </Fact>
        <Fact>
          <Label>TEAMS</Label>
          {personal.teams.join(', ')}
        </Fact>
        <Fact>
          <Label>CURRENTLY</Label>
          {personal.currentFocus}
        </Fact>
      </Facts>
    </Wrap>
  )
}
