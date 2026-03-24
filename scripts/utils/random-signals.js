/**
 * Random signal sets for mock mode testing.
 * Each set has signals + a matching theme directory name.
 */

const SIGNAL_SETS = [
  {
    theme: 'mock-blizzard',
    designBrief: 'Whiteout protocol: stark ice-white backgrounds, desaturated blues, wide frozen typography',
    rationale: 'The Chicago blizzard stripped everything to bone — 8 inches of snow, 22°F, brutal and isolating. Desaturated ice blues replace the dark void, everything goes light and stark like a frozen landscape. Wider letter-spacing creates that cold, sparse feeling. The Bulls lost again, the Bears are dormant — nothing moves, everything is frozen.',
    signals: {
      date: '2026-03-14',
      weather: { location: 'Chicago', conditions: 'Heavy snowstorm, 8 inches overnight, 22°F', feel: 'brutal, isolating' },
      sports: [
        { team: 'Chicago Bulls', result: 'Lost 89-102 to Celtics', notes: 'Third loss in a row' },
        { team: 'Chicago Bears', result: 'Off season', notes: 'New QB signing rumored' },
      ],
      golf: ['Scottie Scheffler leads Masters by 4 strokes after round 2', 'Rory McIlroy struggles with putting'],
      github_trending: [{ repo: 'vercel/ai', description: 'AI SDK for streaming', stars: 45000, why_interesting: 'New streaming UI primitives' }],
      news: ['Federal Reserve holds interest rates steady', 'Major blizzard hits Midwest, travel disruptions'],
      mood_override: null,
    },
  },
  {
    theme: 'mock-sunny',
    designBrief: 'Golden hour warmth: amber tones, expansive spacing, celebration of a perfect spring day',
    rationale: 'Chicago hit 78°F in March — impossible, electric, everyone outside. The Bulls snapped their losing streak with a buzzer-beater, the golf news is all birdies and aces. Even the tech world feels optimistic with a new open-source AI framework trending. The design radiates that golden-hour warmth: deep ambers, generous white space, everything breathing.',
    signals: {
      date: '2026-03-14',
      weather: { location: 'Chicago', conditions: 'Sunny, 78°F, light breeze from the lake', feel: 'electric, impossible for March' },
      sports: [
        { team: 'Chicago Bulls', result: 'Won 112-110 on buzzer-beater', notes: 'Coby White 38 points' },
        { team: 'Chicago Cubs', result: 'Spring training W 7-3', notes: 'Opening day in 2 weeks' },
      ],
      golf: ['Tiger Woods makes cut at Players Championship', 'Amateur golfer aces back-to-back par 3s in local tournament'],
      github_trending: [{ repo: 'huggingface/transformers', description: 'State-of-the-art ML for PyTorch and TensorFlow', stars: 120000, why_interesting: 'New multimodal architecture released' }],
      news: ['Record warm temperatures across Midwest break 100-year-old records', 'NASA announces successful Mars soil sample return mission'],
      mood_override: null,
    },
  },
  {
    theme: 'mock-tense',
    designBrief: 'Red alert: high-contrast black and crimson, compressed layout, urgency in every pixel',
    rationale: 'Everything is on edge. Markets crashed 800 points, severe weather warnings across the region, the Bears traded their star player in a shocking move. The GitHub trending is all security vulnerability disclosures. Even the golf world has drama — a rules controversy at a major. The design compresses and darkens, red accents pulse like warning lights, tight spacing creates claustrophobia.',
    signals: {
      date: '2026-03-14',
      weather: { location: 'Chicago', conditions: 'Severe thunderstorm warning, 45°F, 60mph gusts', feel: 'menacing, unsettled' },
      sports: [
        { team: 'Chicago Bears', result: 'Traded DJ Moore to Ravens', notes: 'Fans furious, #FirePoles trending' },
        { team: 'Chicago Bulls', result: 'Lost 78-115 to Warriors', notes: 'Worst loss of the season' },
      ],
      golf: ['Rules controversy at Arnold Palmer Invitational — Rahm penalized 2 strokes', 'PGA Tour announces major schedule changes, players push back'],
      github_trending: [{ repo: 'advisories/GHSA-critical', description: 'Critical RCE in popular npm package affects millions', stars: 0, why_interesting: 'Supply chain security incident' }],
      news: ['Stock market drops 800 points amid banking concerns', 'Severe weather outbreak expected across Great Lakes region', 'Government shutdown looms as budget talks stall'],
      mood_override: null,
    },
  },
  {
    theme: 'mock-playful',
    designBrief: 'Electric playground: neon purples and magentas, bouncy spacing, pure creative energy',
    rationale: 'The world is buzzing with creative energy. A viral AI art tool just dropped, the weather is that perfect crisp spring afternoon, and the Bulls rookie just had a career game that had the arena dancing. GitHub is full of creative coding projects. The design channels that electricity — deep purples, hot pinks, bouncy proportions. Nothing serious, everything alive.',
    signals: {
      date: '2026-03-14',
      weather: { location: 'Chicago', conditions: 'Partly cloudy, 62°F, cherry blossoms starting', feel: 'crisp, alive, spring finally here' },
      sports: [
        { team: 'Chicago Bulls', result: 'Won 128-119', notes: 'Rookie drops 42 points, arena goes wild' },
        { team: 'Chicago Fire', result: 'Won 3-1', notes: 'Spectacular bicycle kick goal goes viral' },
      ],
      golf: ['Phil Mickelson wears neon pink outfit at Valspar, internet loses it', 'New golf ball technology allows 400-yard drives, USGA considers ban'],
      github_trending: [{ repo: 'p5js/p5.js', description: 'Creative coding library for the browser', stars: 21000, why_interesting: 'New WebGPU shader support' }, { repo: 'theatre-js/theatre', description: 'Animation tooling for the web', stars: 11000, why_interesting: 'Visual timeline editor' }],
      news: ['Viral AI art tool generates 10M images in first 24 hours', 'Chicago named "Most Creative City" by Design Week Global'],
      mood_override: null,
    },
  },
]

/**
 * Pick a random signal set. Returns { theme, signals, designBrief, rationale }.
 */
export function getRandomSignalSet() {
  const idx = Math.floor(Math.random() * SIGNAL_SETS.length)
  return SIGNAL_SETS[idx]
}

export { SIGNAL_SETS }
