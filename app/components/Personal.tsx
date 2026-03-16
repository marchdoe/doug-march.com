import { personal } from '../content/about'
import { styled } from '../../styled-system/jsx'

const Wrap = styled('div', {
  base: {
    marginTop: '10',
    paddingTop: '6',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'border',
  },
})

const Facts = styled('div', {
  base: { display: 'flex', flexDirection: 'column', gap: '3' },
})

const Fact = styled('div', {
  base: { fontSize: 'sm', color: 'text.mid', lineHeight: 'normal' },
})

const Label = styled('span', {
  base: {
    fontFamily: 'mono',
    fontSize: '2xs',
    fontWeight: 'bold',
    letterSpacing: 'wider',
    color: 'accent',
    opacity: '0.6',
    marginRight: '3',
  },
})

export function Personal() {
  return (
    <Wrap>
      <Facts>
        <Fact><Label>SPORT</Label>{personal.sport} — {personal.holesInOne} holes in one</Fact>
        <Fact><Label>TEAMS</Label>{personal.teams.join(', ')}</Fact>
        <Fact><Label>CURRENTLY</Label>{personal.currentFocus}</Fact>
      </Facts>
    </Wrap>
  )
}
