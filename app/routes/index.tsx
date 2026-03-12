import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <Layout><div style={{ color: 'white' }}>test</div></Layout>
}
