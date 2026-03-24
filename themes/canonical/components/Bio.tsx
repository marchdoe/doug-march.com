import { identity } from '../content/about'
import { styled } from '../../styled-system/jsx'

const Wrap = styled('div', {
  base: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    paddingBottom: '8',
    marginBottom: '10',
  },
})

const Label = styled('div', {
  base: {
    fontSize: 'xs',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'text.dim',
    marginBottom: '3',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    _before: { content: '"//"', color: 'accent' },
  },
})

const Statement = styled('p', {
  base: {
    fontSize: '0.75rem',
    color: 'text.mid',
    lineHeight: '2',
    fontStyle: 'italic',
    maxWidth: '560px',
    '& strong': { color: 'text', fontStyle: 'normal' },
  },
})

export function Bio() {
  return (
    <Wrap>
      <Label>ABOUT</Label>
      <Statement>{identity.statement}</Statement>
    </Wrap>
  )
}
