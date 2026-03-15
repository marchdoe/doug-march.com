import { styled } from '../../styled-system/jsx'

const Head = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: 'accent',
    marginBottom: '5',
    marginTop: '2',
    opacity: '0.6',
    paddingBottom: '3',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'accent.glow',
  },
})

export function SectionHead({ label }: { label: string }) {
  return <Head>{label}</Head>
}
