import { identity } from '../content/about'
import { styled } from '../../styled-system/jsx'

const Wrap = styled('div', {
  base: {
    paddingBottom: '12',
    marginBottom: '10',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'accent.glow',
  },
})

const Statement = styled('p', {
  base: {
    fontSize: 'xl',
    color: 'text',
    lineHeight: 'snug',
    fontStyle: 'italic',
    maxWidth: '580px',
    letterSpacing: 'tight',
    '& strong': { color: 'accent', fontStyle: 'normal' },
  },
})

export function Bio() {
  return (
    <Wrap>
      <Statement>{identity.statement}</Statement>
    </Wrap>
  )
}
