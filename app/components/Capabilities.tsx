import { capabilities } from '../content/timeline'
import { styled } from '../../styled-system/jsx'

const Grid = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2',
    marginTop: '5',
  },
})

const Item = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'wider',
    color: 'text.dim',
    paddingTop: '0.45rem',
    paddingBottom: '0.45rem',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'border',
    opacity: '0.55',
    transitionProperty: 'opacity, color, background, border-color',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: { opacity: '1', background: 'accent.glow', color: 'accent', borderColor: 'accent' },
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
