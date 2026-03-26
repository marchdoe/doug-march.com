export type Client = {
  name: string
  domain?: string // used for logo via clearbit; omit for name-only display
  url?: string
  description?: string
}

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
  // Client list (e.g. Spaceman)
  clients?: Client[]
}
