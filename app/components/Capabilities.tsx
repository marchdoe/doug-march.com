import { capabilities } from '../content/timeline'
import { styled } from '../../styled-system/jsx'

const Grid = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2',
    marginTop: '10',
  },
})

const Item = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'wider',
    color: 'text.dim',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'accent',
    borderRadius: '0',
    opacity: '0.4',
    transitionProperty: 'opacity, color, background',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: { opacity: '1', background: 'accent.glow', color: 'accent' },
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
