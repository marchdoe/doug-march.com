import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'spaceman',
    title: 'Spaceman',
    type: 'SaaS',
    year: 2024,
    depth: 'full',
    featured: true,
    externalUrl: 'https://spaceman.llc',
    role: 'Founder & Builder',
    timeline: 'Ongoing',
    status: 'Live',
    problem: 'Aerospace teams were stuck using generic tools that didn\'t fit their workflows.',
    approach: 'Talked to 20+ aerospace engineers before writing a line of code. Built around their actual processes.',
    outcome: 'Currently in active development with early users.',
    stack: ['TanStack Start', 'TypeScript', 'PostgreSQL', 'Vercel'],
    liveUrl: 'https://spaceman.llc',
  },
  {
    slug: 'project-alpha',
    title: 'Project Alpha',
    type: 'SaaS',
    year: 2023,
    depth: 'full',
    role: 'Design & Engineering',
    timeline: '6 months',
    status: 'Live',
    problem: 'Placeholder — add your real project details.',
    approach: 'Placeholder — add your real project details.',
    outcome: 'Placeholder — add your real project details.',
    stack: ['React', 'TypeScript', 'Postgres', 'Vercel'],
    liveUrl: '#',
  },
  {
    slug: 'ai-experiment',
    title: 'AI Side Project',
    type: 'AI',
    year: 2024,
    depth: 'lightweight',
    externalUrl: '#',
    description: 'A short description of what this experiment does and why you built it.',
  },
]

export const featuredProject = projects.find((p) => p.featured)
export const selectedWork = projects.filter((p) => !p.featured && p.depth === 'full')
export const experiments = projects.filter((p) => p.depth === 'lightweight')
