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
    year: '2024 —',
    role: 'Founder',
    company: 'Spaceman',
    description: 'Building tools for aerospace teams that don\'t hate using software.',
    current: true,
  },
  // 2017-2024 gap — to be filled
  {
    year: '2017',
    role: 'Sr. Frontend Engineer',
    company: 'Territory Foods',
    description: '',
  },
  {
    year: '2014 — 2017',
    role: 'Sr. Frontend Engineer',
    company: 'WellMatch Health / Aetna',
    description: '',
  },
  {
    year: '2014',
    role: 'Director of Engineering',
    company: 'Interfolio',
    description: 'Responsible for directly managing, supporting and providing direction and leadership to the engineering team and other members of the product team.',
    bullets: [
      'Member of the leadership team',
      'Worked closely with leadership across multiple business units to successfully initiate and complete new products, features and improvements to existing products/infrastructure',
      'Participated in sales meetings with prospects and current clients serving as a technical consultant and subject matter expert',
    ],
  },
  {
    year: '2010 — 2014',
    role: 'Lead Frontend Engineer',
    company: 'LivingSocial',
    description: 'Worked in various capacities throughout LivingSocial career focusing on consumer facing web and mobile applications.',
    bullets: [
      'Own and manage technical aspects of the product lifecycle and user experience for a given product',
      'Worked closely with product team to define requirements for current and future products at a technical level',
      'Translate product strategies, market trends, and customer feedback into specific tactical plans and clearly defined phased releases',
      'Create prototypes, mock up interaction designs, including user interaction models, wireframes, screen flows, and dialog copy',
      'Analyze and present hard data and metrics to back up assumptions and feature concepts',
      'Work with legal team on patent and licensing opportunities',
    ],
    technologies: ['Ruby on Rails', 'HTML5', 'CSS (SCSS)', 'JavaScript (JQuery)', 'Git'],
  },
  {
    year: '2009 — 2010',
    role: 'Senior Engineer',
    company: 'Logik',
    description: 'Co-developed new solutions in the eDiscovery field to lower cost and scale technology and people.',
    bullets: [
      'Lead the development and revamp of the internal document processing engine',
      'Managed the efforts of 2 developers along with 3-5 contractors',
      'Developed the user experience and front-end code/visual design of the project',
    ],
    technologies: ['Ruby on Rails', 'Redis', 'Resque', 'HTML5', 'CSS', 'JavaScript (JQuery)', 'Git'],
  },
  {
    year: '2008 — 2009',
    role: 'Senior Frontend Engineer',
    company: 'Mixx',
    description: 'Worked closely with product and engineering to define and implement new products & features across the Mixx platform in an agile web development environment.',
    bullets: [
      'Concepted and defined Mixx\'s second product offering — tweetmixx, a way to "unpack" shortened URLs and allow users a quick view of otherwise hidden content',
      'Implemented Search Engine Optimization (SEO) best practices to improve rank and drive traffic',
    ],
    technologies: ['Ruby on Rails', 'XHTML', 'CSS', 'JavaScript (JQuery)', 'Subversion'],
  },
  {
    year: '2006 — 2008',
    role: 'Engineer',
    company: 'Revolution Health Group',
    description: 'Guided Web UI team from concept through a functional prototype into the final design and build.',
    bullets: [
      'Implemented and maintained consistent XHTML markup across the site',
      'As one of the early front-end leads, assisted in the hiring and management of expanded team of 8 engineers',
    ],
    technologies: ['Ruby on Rails', 'XHTML', 'CSS', 'JavaScript (Prototype & Scriptaculous)', 'Subversion'],
  },
]

export const education: Education = {
  school: 'The University of Dayton',
  degree: 'Bachelor of Fine Arts',
  concentration: 'Digital Imaging',
  years: '1995 — 1999',
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
