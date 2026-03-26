import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'spaceman',
    title: 'Spaceman',
    type: 'Founder',
    year: 2018,
    depth: 'full',
    featured: true,
    role: 'Founder',
    timeline: '2018 — Present',
    status: 'Active',
    problem:
      'Independent design and engineering work doesn\'t always fit neatly inside a company. Some of the best work happens at the edges — between studios, between disciplines, between what a client thinks they need and what they actually need.',
    approach:
      'Spaceman is the LLC I\'ve operated under for the past decade, partnering with companies and studios across industries. The work spans product design, frontend engineering, design systems, and brand — sometimes as a solo contributor, sometimes embedded in a larger team. Clients have included Jeffrey Zeldman, Rolex, The Nature Conservancy, Sapient Razorfish, bswift, RTIC Coolers, Framebridge, Intuit, LastPass, and WorkAround, among others.',
    outcome:
      'Ten years in, Spaceman is still the vehicle for independent work and new experiments. The practice has shaped how I think about the gap between design and engineering — and made me better at closing it.',
    liveUrl: 'https://spaceman.llc',
  },
  {
    slug: 'fishsticks',
    title: 'FishSticks',
    type: 'SaaS',
    year: 2025,
    depth: 'full',
    role: 'Founder & Builder',
    timeline: 'Ongoing',
    status: 'Live',
    problem: 'Kids struggle to practice spelling lists from school — the tools that exist are either boring, require a parent to quiz them, or don\'t work with the actual word lists teachers send home.',
    approach: 'Built a simple import flow that reads PDFs from school (automatically finding the bold words teachers typically use), paired with voice pronunciation and adaptive quiz modes so kids can practice independently.',
    outcome: 'Live product with free and one-time $10 premium tier. Thousands of kids practicing daily.',
    stack: ['SvelteKit', 'TypeScript', 'Vercel'],
    liveUrl: 'https://getfishsticks.com',
  },
  {
    slug: '15th-club',
    title: '15th Club',
    type: 'AI',
    year: 2025,
    depth: 'full',
    role: 'Founder & Builder',
    timeline: 'Ongoing',
    status: 'In Development',
    problem: 'Golf is full of data, ritual, and decision-making — and almost none of it has been meaningfully touched by AI. Most golf apps are just digital scorecards.',
    approach: 'A platform for AI experiments through the lens of golf. The scorecard is the first experiment — shareable, real-time, no app install required. More experiments to follow.',
    outcome: 'In active development.',
    stack: ['React', 'TypeScript', 'Supabase', 'Vercel'],
    liveUrl: 'https://15th.club',
  },
  {
    slug: 'doug-march-dot-com',
    title: 'doug-march.com',
    type: 'AI',
    year: 2026,
    depth: 'full',
    role: 'Designer & Builder',
    timeline: 'Ongoing',
    status: 'Live',
    problem:
      'Most portfolio sites are static — built once, then abandoned. The design decisions are invisible, the process is hidden, and the whole thing slowly drifts out of date.',
    approach:
      'A daily redesign pipeline powered by Claude. Each morning, a multi-agent system reads live signals — golf leaderboard, Hacker News, sports scores — and generates a fresh visual design from scratch. A design director agent sets the creative direction, a token designer defines the type and spacing scale, and a layout engineer assembles the final output. The design is archived automatically with a brief explaining what changed and why. The entire pipeline runs in CI.',
    outcome:
      'A portfolio that is never the same two days in a row. Every design is saved to an archive. The stack is TanStack Start in SPA mode, PandaCSS for tokens, and Vercel for hosting and CI.',
    stack: ['TanStack Start', 'PandaCSS', 'TypeScript', 'Claude', 'GitHub Actions', 'Vercel'],
    liveUrl: 'https://doug-march.com',
  },
  {
    slug: 'teeturn',
    title: 'TeeTurn',
    type: 'Experiment',
    year: 2020,
    depth: 'lightweight',
    description: 'A mobile-first cross-platform golf app that lets players track the progress of a round in real-time. Responsible for product direction and strategy.',
  },
  {
    slug: 'politweets',
    title: 'Politweets',
    type: 'Experiment',
    year: 2008,
    depth: 'lightweight',
    description: 'Built over a weekend with the Character140 collective — a group of DC-area developers and designers. Politweets scraped Twitter\'s public timeline for presidential candidate mentions and displayed them in real time, homepage styled like a digital newspaper. Went live just before the New Hampshire primaries. Covered by HuffPost, Mashable, ZDNet, and ReadWriteWeb. Six to nine months later, Twitter shipped their own version at election.twitter.com.',
  },
  {
    slug: 'twittertale',
    title: 'Twittertale',
    type: 'Experiment',
    year: 2008,
    depth: 'lightweight',
    description: 'One of the earliest experiments using the Twitter API to track keywords across the public timeline — built with Jason Garber and the Character140 crew initially just to entertain friends. Twittertale scanned every public tweet for swear words and ranked which users had the biggest potty mouth. Covered by Mashable. The same keyword-tracking mechanic became the foundation for Politweets a few weeks later.',
  },
]

export const featuredProject = projects.find((p) => p.featured)
export const selectedWork = projects.filter((p) => !p.featured && p.depth === 'full')
export const experiments = projects.filter((p) => p.depth === 'lightweight')
