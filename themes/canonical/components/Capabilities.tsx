import { capabilities } from '../content/timeline'
import { styled } from '../../styled-system/jsx'

const Grid = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '2',
    marginTop: '10',
  },
})

const Item = styled('div', {
  base: {
    fontSize: '0.55rem',
    fontWeight: 'bold',
    letterSpacing: '0.07em',
    color: 'text.dim',
    background: 'bg.card',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'logo.blueDim',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
    paddingLeft: '0.6rem',
    paddingRight: '0.6rem',
    textTransform: 'uppercase',
  },
})

export function Capabilities() {
  return (
    <Grid>
      {capabilities.map((skill) => (
        <Item key={skill}>{skill}</Item>
      ))}
    </Grid>
  )
}
