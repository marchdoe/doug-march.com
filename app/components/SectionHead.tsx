import { styled } from '../../styled-system/jsx'

const Head = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: 'ruled',
    color: 'text.dim',
    marginBottom: '4',
    marginTop: '2',
    paddingBottom: '3',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'border',
    opacity: '0.65',
  },
})

export function SectionHead({ label }: { label: string }) {
  return <Head>{label}</Head>
}
