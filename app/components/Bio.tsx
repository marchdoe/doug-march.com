import { identity } from '../content/about'
import { styled } from '../../styled-system/jsx'

const Wrap = styled('div', {
  base: {
    paddingBottom: '8',
    marginBottom: '8',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
  },
})

const Statement = styled('p', {
  base: {
    fontSize: 'xl',
    color: 'text',
    lineHeight: 'snug',
    fontStyle: 'italic',
    maxWidth: '560px',
    letterSpacing: 'tight',
    '& strong': { color: 'accent', fontStyle: 'normal', fontWeight: 'bold' },
  },
})

export function Bio() {
  return (
    <Wrap>
      <Statement>{identity.statement}</Statement>
    </Wrap>
  )
}
