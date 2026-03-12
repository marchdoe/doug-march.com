import { styled } from '../../styled-system/jsx'

const Head = styled('div', {
  base: {
    fontSize: '0.55rem',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'text.dim',
    paddingBottom: '2',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'logo.blueDim',
    marginBottom: '0.1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    _before: {
      content: '""',
      flex: '0 0 1rem',
      height: '1px',
      background: 'logo.blue',
      opacity: '0.3',
    },
  },
})

export function SectionHead({ label }: { label: string }) {
  return <Head>// {label}</Head>
}
