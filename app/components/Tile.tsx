import { styled } from '../../styled-system/jsx'

export const SmallCaps = styled('span', {
  base: {
    fontSize: '2xs',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    textTransform: 'uppercase',
    color: 'textMuted',
  },
})

export const TileBox = styled('div', {
  base: {
    background: 'surface',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'md',
    padding: { base: '5', md: '7' },
  },
})

export const LinkArrow = styled('a', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2',
    minHeight: '44px',
    fontWeight: 'bold',
    fontSize: 'sm',
    letterSpacing: 'wide',
    color: 'accentGlow',
    transition: 'color 0.2s ease',
    _hover: { color: 'accent' },
  },
})

export const Chip = styled('span', {
  base: {
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'full',
    paddingBlock: '2',
    paddingInline: '4',
    fontSize: 'xs',
    fontWeight: 'medium',
    color: 'textSecondary',
  },
})

export const WRow = styled('a', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'baseline',
    gap: '3',
    padding: '3',
    marginInline: '-3',
    borderRadius: 'sm',
    minHeight: '44px',
    borderTop: '1px solid',
    borderColor: 'border',
    transition: 'background 0.2s ease',
    _hover: { background: 'brand.600' },
  },
})
