import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

export default function Home() {
  return <div>hello</div>
}
