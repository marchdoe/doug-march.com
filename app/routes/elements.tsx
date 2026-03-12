import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'

export const Route = createFileRoute('/elements')({
  component: Elements,
})

function Elements() {
  return (
    <Layout>
      <div>elements</div>
    </Layout>
  )
}
