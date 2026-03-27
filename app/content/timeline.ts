export type TimelineEntry = {
  year: string
  role: string
  company: string
  description: string
  current?: boolean
  bullets?: string[]
  technologies?: string[]
}

export type Education = {
  school: string
  degree: string
  concentration: string
  years: string
}

export const timeline: TimelineEntry[] = [
  {
    year: '2025 —',
    role: '',
    company: 'iCapital',
    description: '',
    current: true,
  },
  {
    year: '2022 — 2025',
    role: '',
    company: 'Parallel Markets',
    description: 'Acquired by iCapital in January 2025.',
  },
  {
    year: '2020 — 2022',
    role: '',
    company: 'Mandiant',
    description: '',
  },
  {
    year: '2018 — 2020',
    role: 'Founder & Consultant',
    company: 'Spaceman',
    description: 'Independent design and engineering practice. Clients included Jeffrey Zeldman, Rolex, The Nature Conservancy, Sapient Razorfish, bswift, RTIC Coolers, Framebridge, Intuit, LastPass, WorkAround, and others.',
  },
  {
    year: '2018',
    role: 'Sr. Frontend Engineer',
    company: 'The Atlantic',
    description: 'Led the initiative to build a design system within the product team, encouraging sharing and reuse of code across all Atlantic properties.',
    bullets: [
      'Built and documented a component system via Fractal',
      'Established patterns for code reuse across Atlantic properties',
    ],
    technologies: ['Fractal', 'Nunjucks', 'SCSS', 'JavaScript', 'Python'],
  },
  {
    year: '2017',
    role: 'Sr. Frontend Engineer',
    company: 'Territory Foods',
    description: 'Led the rebrand of the consumer-facing site from Power Supply to Territory Foods, and built a React component library documented via Storybook.',
    bullets: [
      'Responsible for full site rebrand from Power Supply to Territory Foods',
      'Built a React component library shared across applications',
      'Added A/B testing capability via Google Optimize',
    ],
    technologies: ['ReactJS', 'Ruby on Rails', 'SCSS', 'Styled Components', 'Storybook', 'Figma'],
  },
  {
    year: '2014 — 2017',
    role: 'Sr. Frontend Engineer',
    company: 'WellMatch Health / Aetna',
    description: 'Built healthcare technology solutions around transparency and pricing.',
    bullets: [
      'Led React component library initiative shared across applications, documented via Storybook',
      'Worked hand-in-hand with design/UX from concept to delivery',
      'Participated in the rewrite of an Ember app migrating to React',
      'Member of an all-remote team',
    ],
    technologies: ['ReactJS', 'Ruby on Rails', 'SCSS', 'PostCSS', 'Storybook', 'Sketch'],
  },
  {
    year: '2014',
    role: 'Director of Engineering',
    company: 'Interfolio',
    description: 'Responsible for directly managing, supporting, and providing direction and leadership to the engineering team and other members of the product team.',
    bullets: [
      'Member of the leadership team',
      'Worked closely with leadership across multiple business units to initiate and complete new products, features, and infrastructure improvements',
      'Participated in sales meetings with prospects and clients as a technical consultant and subject matter expert',
    ],
  },
  {
    year: '2010 — 2014',
    role: 'Sr. Engineer, Web + Mobile',
    company: 'LivingSocial',
    description: 'Worked across consumer-facing web and mobile applications, owning the full product lifecycle from prototyping through shipping.',
    bullets: [
      'Co-defined and built LivingSocial Escapes on a two-person team in two weeks — $1M revenue in the first week',
      'Built a shared asset library across all LivingSocial consumer apps, removing 50,000 lines of code and reducing CSS payload on the most-trafficked page from 500KB to under 100KB',
      'Initiated responsive redesign of the daily email template — 22% lift in click-throughs, 6% lift in purchases',
      'Successfully recruited and hired 5 frontend developers and 2 interns',
      'First and only employee to win two internal hackathon "People\'s Choice" awards',
    ],
    technologies: ['Ruby on Rails', 'HTML5', 'CSS (SCSS)', 'JavaScript (jQuery)', 'Git'],
  },
  {
    year: '2009 — 2010',
    role: 'Sr. Developer / UI Architect',
    company: 'Logik Systems',
    description: 'Co-developed new solutions in the eDiscovery field to lower cost and scale technology and people.',
    bullets: [
      'Led development and revamp of the internal document processing engine',
      'Managed 2 developers and 3–5 contractors',
      'Developed user experience and front-end code for the project',
    ],
    technologies: ['Ruby on Rails', 'Redis', 'Resque', 'HTML5', 'CSS', 'JavaScript (jQuery)', 'Git'],
  },
  {
    year: '2008 — 2009',
    role: 'Sr. Web Developer',
    company: 'Mixx',
    description: 'Worked closely with product and engineering to define and implement new products and features across the Mixx platform.',
    bullets: [
      'Concepted and defined Mixx\'s second product — tweetmixx, a way to unpack shortened URLs for quick content preview',
      'Teamed up with brands including the NBA, NHL, US Open, WWF, and the UN to spin up partner channels',
      'Implemented SEO best practices to improve rank and user acquisition',
    ],
    technologies: ['Ruby on Rails', 'XHTML', 'CSS', 'JavaScript (jQuery)', 'Subversion'],
  },
  {
    year: '2006 — 2008',
    role: 'Developer / Web UI',
    company: 'Revolution Health Group',
    description: 'Guided the Web UI team from concept through prototype to final build on revolutionhealth.com.',
    bullets: [
      'Implemented and maintained consistent markup standards across the site',
      'Hired and managed an expanded team of 8 engineers, full-time and contract',
    ],
    technologies: ['Ruby on Rails', 'XHTML', 'CSS', 'JavaScript (Prototype & Scriptaculous)', 'Subversion'],
  },
]

export const education: Education = {
  school: 'The University of Dayton',
  degree: 'Bachelor of Fine Arts',
  concentration: 'Visual Communication and Design',
  years: '',
}

export const capabilities = [
  'Product Design',
  'Front-End Engineering',
  'Full-Stack Development',
  'Brand & Identity',
  'System Design',
  'Prototyping',
  'Team Leadership',
  'User Experience',
]
