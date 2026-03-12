export type TimelineEntry = {
  year: string
  role: string
  company: string
  description: string
  current?: boolean
}

export const timeline: TimelineEntry[] = [
  {
    year: '2024 —',
    role: 'Founder',
    company: 'Spaceman',
    description: 'Building tools for aerospace teams that don\'t hate using software.',
    current: true,
  },
  {
    year: '2022 —',
    role: 'Design & Engineering Lead',
    company: 'Previous Company',
    description: 'Led product design and front-end engineering.',
  },
  {
    year: '2019 —',
    role: 'Independent Consultant',
    company: 'Various Clients',
    description: 'Design and build work for early-stage startups.',
  },
]

export const capabilities = [
  'Product Design',
  'Front-End Dev',
  'Full-Stack',
  'Brand & Identity',
  'System Design',
  'Prototyping',
]
