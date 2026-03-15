import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { Bio } from '../components/Bio'
import { Timeline } from '../components/Timeline'
import { Capabilities } from '../components/Capabilities'
import { Personal } from '../components/Personal'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <Layout>
      <Bio />
      <SectionHead label="BACKGROUND" />
      <Timeline />
      <SectionHead label="CAPABILITIES" />
      <Capabilities />
      <Personal />
    </Layout>
  )
}
