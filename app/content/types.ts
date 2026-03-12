export type ProjectType =
  | 'SaaS'
  | 'Design'
  | 'Product'
  | 'Founder'
  | 'AI'
  | 'OSS'
  | 'Experiment'

export type Project = {
  slug: string
  title: string
  type: ProjectType
  year: number
  depth: 'full' | 'lightweight'
  featured?: boolean
  externalUrl?: string
  // Full case study fields
  role?: string
  timeline?: string
  status?: string
  problem?: string
  approach?: string
  outcome?: string
  stack?: string[]
  liveUrl?: string
  githubUrl?: string
  // Lightweight fields
  description?: string
}
