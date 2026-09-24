import type { DateRange } from '@/data/mockDashboard'

export interface FilterParams {
  dateRange: DateRange
  property: string
  activeFilters: Set<string>
}

export interface ExecutiveKpi {
  griScore: number
  griChange: string
  npsScore: number
  totalReviews: number
  reviewsTarget: number
  responseRate: number
  responseRateChange: string
  avgResponseTimeHours: number
  sentimentPositivePct: number
  sentimentNeutralPct: number
  sentimentNegativePct: number
  departmentScores: {
    name: string
    score: number
    change: string
  }[]
  griTrend: { label: string; value: number }[]
}

export interface PropertyReportItem {
  id: string
  name: string
  location: string
  griScore: number
  totalReviews: number
  nps: number
  responseRate: number
  topPositiveDriver: string
  topNegativeDriver: string
  platformShare: { booking: number; google: number; tripadvisor: number; other: number }
}

export interface SemanticDriver {
  id: string
  category: string
  impact: number
  mentions: number
  tags: string[]
  insight: string
  type: 'positive' | 'negative'
}

export interface TeamMemberKpi {
  id: string
  name: string
  role: string
  property: string
  reviewsHandled: number
  avgResponseHours: number
  resolutionRatePct: number
  csatScore: number
  slaCompliancePct: number
}

export interface CaseTicketReport {
  id: string
  ticketNumber: string
  roomOrArea: string
  title: string
  category: string
  assignee: string
  priority: 'Urgent' | 'High' | 'Medium' | 'Low'
  status: 'Open' | 'In Progress' | 'Resolved'
  elapsedTime: string
  slaMet: boolean
}

export interface ReviewLogReport {
  id: string
  guestName: string
  property: string
  platform: 'Booking.com' | 'Google' | 'Tripadvisor' | 'Expedia' | 'Direct'
  language: string
  rating: number
  scale: number
  date: string
  sentiment: 'positive' | 'neutral' | 'negative'
  crmBadge?: { label: string; tier: 'vip' | 'returning' }
  reviewText: string
  aiReplyStatus: 'Automated' | 'Pending Review' | 'Sent'
  resolutionStatus: 'Resolved' | 'No Action Needed' | 'Escalated'
}

export interface ComprehensiveReportData {
  metadata: {
    reportId: string
    title: string
    subtitle: string
    generatedAt: string
    dateRange: string
    selectedProperty: string
    activeFiltersList: string[]
    activePlatforms: string[]
    activeLanguages: string[]
    activeSentiments: string[]
  }
  executiveSummary: ExecutiveKpi
  propertyBreakdown: PropertyReportItem[]
  semanticEngine: {
    positiveDrivers: SemanticDriver[]
    negativeDrivers: SemanticDriver[]
    aspectScores: { aspect: string; score: number; mentions: number }[]
  }
  teamKpis: {
    members: TeamMemberKpi[]
    teamGoals: { label: string; target: string; current: string; progress: number }[]
  }
  caseManagement: {
    totalCases: number
    openCases: number
    inProgressCases: number
    resolvedCases: number
    slaCompliancePct: number
    avgResolutionTimeHours: number
    tickets: CaseTicketReport[]
  }
  surveyStudio: {
    preStayCompletionRate: number
    inStayCompletionRate: number
    postStayCompletionRate: number
    totalSurveysSent: number
    avgSurveyNps: number
  }
  benchmarking: {
    marketRank: number
    totalCompetitors: number
    avgMarketGri: number
    platformShare: { platform: string; sharePct: number; reviewCount: number; avgRating: string }[]
  }
  reviewLogs: ReviewLogReport[]
}

// Simple deterministic hash generator from string input
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return Math.abs(hash)
}

const ALL_PROPERTIES_LIST = [
  { id: 'aman-tokyo', name: 'Aman Tokyo', location: 'Tokyo, Japan' },
  { id: 'six-senses-kyoto', name: 'Six Senses Kyoto', location: 'Kyoto, Japan' },
  { id: 'bvlgari-bali', name: 'Bvlgari Bali', location: 'Uluwatu, Bali' },
  { id: 'cheval-blanc-paris', name: 'Cheval Blanc Paris', location: 'Paris, France' },
  { id: 'peninsula-hong-kong', name: 'The Peninsula Hong Kong', location: 'Hong Kong' },
  { id: 'rosewood-sao-paulo', name: 'Rosewood São Paulo', location: 'São Paulo, Brazil' },
  { id: 'explora-patagonia', name: 'Explora Patagonia', location: 'Torres del Paine, Chile' },
  { id: 'ritz-paris', name: 'Ritz Paris', location: 'Paris, France' },
  { id: 'four-seasons-paris', name: 'Four Seasons Hotel George V', location: 'Paris, France' },
  { id: 'st-regis-maldives', name: 'St. Regis Maldives Vommuli', location: 'Dhaalu Atoll, Maldives' },
  { id: 'belmond-cipriani', name: 'Belmond Hotel Cipriani', location: 'Venice, Italy' },
  { id: 'claridges-london', name: 'Claridge’s', location: 'London, UK' },
  { id: 'beverly-hills-hotel', name: 'The Beverly Hills Hotel', location: 'Los Angeles, USA' },
  { id: 'burj-al-arab', name: 'Burj Al Arab', location: 'Dubai, UAE' },
  { id: 'mandarin-bangkok', name: 'Mandarin Oriental Bangkok', location: 'Bangkok, Thailand' },
  { id: 'capella-singapore', name: 'Capella Singapore', location: 'Sentosa, Singapore' },
  { id: 'villa-d-este', name: 'Villa d’Este', location: 'Lake Como, Italy' },
]

export function generateComprehensiveReport(params: FilterParams): ComprehensiveReportData {
  const { dateRange, property, activeFilters } = params

  const activeFiltersArr = Array.from(activeFilters)
  const seedString = `${dateRange}-${property}-${activeFiltersArr.sort().join(',')}`
  const seed = simpleHash(seedString)

  // Categorize active filters
  const platforms = ['Booking.com', 'Google', 'Tripadvisor', 'Expedia', 'Direct'].filter((p) =>
    activeFilters.has(p),
  )
  const languages = ['English', 'Japanese', 'French', 'German', 'Spanish', 'Arabic'].filter((l) =>
    activeFilters.has(l),
  )
  const sentiments = ['Positive', 'Neutral', 'Negative'].filter((s) => activeFilters.has(s))

  // Base numbers dynamic scaling
  let dateScale = 1
  let dateLabel = 'Last 30 Days'
  if (dateRange === 'Last 7 Days') {
    dateScale = 0.22
    dateLabel = 'Last 7 Days'
  } else if (dateRange === 'Last 90 Days') {
    dateScale = 2.9
    dateLabel = 'Last 90 Days'
  } else if (dateRange === 'Year to Date') {
    dateScale = 8.5
    dateLabel = 'Year to Date (YTD)'
  }

  // Sentiment filter skewing
  let sentimentMultiplier = 0
  if (sentiments.includes('Positive') && !sentiments.includes('Negative')) {
    sentimentMultiplier = 6.5
  } else if (sentiments.includes('Negative') && !sentiments.includes('Positive')) {
    sentimentMultiplier = -12.0
  }

  // Property filtering
  const isSingleProperty = property !== 'All Properties (17)'
  const filteredPropertyList = isSingleProperty
    ? ALL_PROPERTIES_LIST.filter((p) => p.name === property || property.includes(p.name))
    : ALL_PROPERTIES_LIST

  const baseReviews = Math.floor((4423 + (seed % 350)) * dateScale)
  const actualReviews = isSingleProperty ? Math.floor(baseReviews / 12) : baseReviews

  const baseGri = Number((85.6 + (seed % 50) / 10 + sentimentMultiplier).toFixed(1))
  const clampedGri = Math.min(99.4, Math.max(62.0, baseGri))

  const npsVal = Math.round((clampedGri - 30) * 1.05)
  const posPct = Math.min(88, Math.max(25, Math.round(clampedGri - 24)))
  const negPct = Math.min(45, Math.max(4, Math.round(100 - posPct - 18)))
  const neuPct = 100 - posPct - negPct

  // Gri Trend array
  const trendPointsCount = dateRange === 'Last 7 Days' ? 7 : dateRange === 'Last 30 Days' ? 4 : dateRange === 'Last 90 Days' ? 6 : 8
  const trendLabels =
    dateRange === 'Last 7 Days'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : dateRange === 'Last 30 Days'
        ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        : dateRange === 'Last 90 Days'
          ? ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6']
          : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

  const griTrend = trendLabels.map((lbl, idx) => {
    const val = clampedGri - 3.5 + (idx * 0.8) + ((seed + idx * 7) % 15) / 10
    return { label: lbl, value: Number(Math.min(99.9, val).toFixed(1)) }
  })

  // Executive Summary
  const executiveSummary: ExecutiveKpi = {
    griScore: clampedGri,
    griChange: `+${((seed % 18) / 10 + 0.4).toFixed(1)} pts vs prev period`,
    npsScore: npsVal,
    totalReviews: actualReviews,
    reviewsTarget: Math.round(actualReviews * 1.15),
    responseRate: Number((69.3 + (seed % 80) / 10).toFixed(1)),
    responseRateChange: `+${((seed % 25) / 10 + 1.2).toFixed(1)}% vs prev period`,
    avgResponseTimeHours: Number((2.4 + (seed % 15) / 10).toFixed(1)),
    sentimentPositivePct: posPct,
    sentimentNeutralPct: neuPct,
    sentimentNegativePct: negPct,
    departmentScores: [
      { name: 'Front Desk & Concierge', score: Number((clampedGri + 4.2).toFixed(1)), change: '+1.8%' },
      { name: 'Spa & Wellness', score: Number((clampedGri + 8.1).toFixed(1)), change: '+2.5%' },
      { name: 'Food & Beverage', score: Number((clampedGri + 2.0).toFixed(1)), change: '+0.9%' },
      { name: 'Housekeeping & Hygiene', score: Number((clampedGri - 1.5).toFixed(1)), change: '-0.4%' },
      { name: 'Room Amenities & Comfort', score: Number((clampedGri - 2.8).toFixed(1)), change: '+1.1%' },
      { name: 'Value & Pricing Transparency', score: Number((clampedGri - 7.4).toFixed(1)), change: '-1.2%' },
    ],
    griTrend,
  }

  // Property Breakdown (17 Properties)
  const propertyBreakdown: PropertyReportItem[] = (filteredPropertyList.length > 0 ? filteredPropertyList : ALL_PROPERTIES_LIST).map((p, idx) => {
    const pSeed = seed + idx * 13
    const pGri = Number((86.0 + ((pSeed % 120) - 40) / 10 + sentimentMultiplier).toFixed(1))
    const finalGri = Math.min(98.8, Math.max(68.0, pGri))
    const pReviews = Math.floor((220 + (pSeed % 180)) * dateScale)

    const positiveDrivers = ['Spa Experience', 'Gastronomy', 'Personalized Concierge', 'Architecture & Views', 'Seamless Check-in', 'Luxe Amenities']
    const negativeDrivers = ['Room Noise', 'Wait Times', 'Resort Fee Pricing', 'Minibar Pricing', 'Housekeeping Timing', 'Valet Delay']

    return {
      id: p.id,
      name: p.name,
      location: p.location,
      griScore: finalGri,
      totalReviews: pReviews,
      nps: Math.round((finalGri - 30) * 1.05),
      responseRate: Number((72.0 + (pSeed % 220) / 10).toFixed(1)),
      topPositiveDriver: positiveDrivers[pSeed % positiveDrivers.length],
      topNegativeDriver: negativeDrivers[pSeed % negativeDrivers.length],
      platformShare: {
        booking: 42 + (pSeed % 10),
        google: 34 - (pSeed % 8),
        tripadvisor: 18 + (pSeed % 5),
        other: 6,
      },
    }
  })

  // Semantic Engine Data
  const semanticEngine = {
    positiveDrivers: [
      {
        id: 'pos-1',
        category: 'Concierge & VIP Service',
        impact: Number((4.9 + (seed % 12) / 10).toFixed(1)),
        mentions: Math.floor(456 * dateScale),
        tags: ['attentive', 'personalized', 'memorable', 'seamless execution'],
        insight: 'Concierge team mentioned by name in 38% of 5-star guest reviews.',
        type: 'positive' as const,
      },
      {
        id: 'pos-2',
        category: 'Spa & Hydrotherapy',
        impact: Number((3.8 + (seed % 8) / 10).toFixed(1)),
        mentions: Math.floor(289 * dateScale),
        tags: ['signature massage', 'tranquil', 'world-class', 'rejuvenating'],
        insight: 'Signature wellness treatments generated highest sentiment score.',
        type: 'positive' as const,
      },
      {
        id: 'pos-3',
        category: 'Prime Location & Scenery',
        impact: Number((3.2 + (seed % 10) / 10).toFixed(1)),
        mentions: Math.floor(340 * dateScale),
        tags: ['panoramic views', 'central', 'walkable', 'iconic backdrop'],
        insight: 'Location cited as key differentiator against local competitors.',
        type: 'positive' as const,
      },
      {
        id: 'pos-4',
        category: 'Fine Dining & Gastronomy',
        impact: Number((2.9 + (seed % 14) / 10).toFixed(1)),
        mentions: Math.floor(310 * dateScale),
        tags: ['michelin quality', 'breakfast spread', 'sommelier selection'],
        insight: 'Breakfast quality boosted overall morning experience rating.',
        type: 'positive' as const,
      },
    ],
    negativeDrivers: [
      {
        id: 'neg-1',
        category: 'Value & Resort Fee Perception',
        impact: Number((-7.0 - (seed % 15) / 10).toFixed(1)),
        mentions: Math.floor(312 * dateScale),
        tags: ['overpriced minibar', 'hidden resort fee', 'valet charge'],
        insight: 'Guests cite resort fees and minibar pricing as unexpected friction.',
        type: 'negative' as const,
      },
      {
        id: 'neg-2',
        category: 'Housekeeping & Linen Care',
        impact: Number((-5.2 - (seed % 10) / 10).toFixed(1)),
        mentions: Math.floor(201 * dateScale),
        tags: ['stained linen', 'late evening service', 'dusty vents'],
        insight: 'Evening turndown service delays flagged in 14% of neutral reviews.',
        type: 'negative' as const,
      },
      {
        id: 'neg-3',
        category: 'Acoustics & Street Noise',
        impact: Number((-4.1 - (seed % 12) / 10).toFixed(1)),
        mentions: Math.floor(178 * dateScale),
        tags: ['thin doors', 'street traffic', 'hallway footsteps'],
        insight: 'Lower floor street-facing suites drive acoustic complaints.',
        type: 'negative' as const,
      },
    ],
    aspectScores: [
      { aspect: 'Staff & Hospitality', score: 94.2, mentions: Math.floor(820 * dateScale) },
      { aspect: 'Cleanliness & Hygiene', score: 88.5, mentions: Math.floor(640 * dateScale) },
      { aspect: 'Food & Culinary', score: 91.0, mentions: Math.floor(590 * dateScale) },
      { aspect: 'Spa & Wellness', score: 96.8, mentions: Math.floor(410 * dateScale) },
      { aspect: 'Room Acoustics & Quiet', score: 81.4, mentions: Math.floor(320 * dateScale) },
      { aspect: 'Pricing & Value Perception', score: 74.6, mentions: Math.floor(480 * dateScale) },
    ],
  }

  // Team KPIs Data
  const teamMembersRaw = [
    { name: 'Sarah Connor', role: 'Head of Guest Experience', property: 'Portfolio Wide' },
    { name: 'Kenji Sato', role: 'Front Office Manager', property: 'Aman Tokyo' },
    { name: 'Jean-Luc Dupont', role: 'Chief Concierge', property: 'Cheval Blanc Paris' },
    { name: 'Elena Rostova', role: 'Quality Assurance Director', property: 'Bvlgari Bali' },
    { name: 'Marco Silva', role: 'Guest Relations Supervisor', property: 'Six Senses Kyoto' },
    { name: 'Aisha Al-Mansoor', role: 'VIP Operations Lead', property: 'Burj Al Arab' },
  ]

  const teamKpis = {
    members: teamMembersRaw.map((m, i) => {
      const mSeed = seed + i * 19
      return {
        id: `tm-${i}`,
        name: m.name,
        role: m.role,
        property: isSingleProperty ? property : m.property,
        reviewsHandled: Math.floor((140 + (mSeed % 90)) * dateScale),
        avgResponseHours: Number((1.2 + (mSeed % 18) / 10).toFixed(1)),
        resolutionRatePct: Number((88 + (mSeed % 11)).toFixed(1)),
        csatScore: Number((4.6 + (mSeed % 4) / 10).toFixed(1)),
        slaCompliancePct: Number((92 + (mSeed % 7)).toFixed(1)),
      }
    }),
    teamGoals: [
      { label: 'Avg Response Time < 2 hours', target: '2.0h', current: `${executiveSummary.avgResponseTimeHours}h`, progress: Math.min(100, Math.round((2.0 / executiveSummary.avgResponseTimeHours) * 85)) },
      { label: 'Front Desk Sentiment > 90%', target: '90.0%', current: `${Number((clampedGri + 4.2).toFixed(1))}%`, progress: Math.min(100, Math.round(clampedGri)) },
      { label: 'Case Resolution Rate > 85%', target: '85.0%', current: '91.4%', progress: 91 },
      { label: 'Survey Response Rate > 40%', target: '40.0%', current: '44.8%', progress: 84 },
    ],
  }

  // Case Management Data
  const rawTickets = [
    { number: 'T-8492', room: 'Suite 302', title: 'AC Temperature Sensor Malfunction', cat: 'Maintenance', assignee: 'Engineering Team', priority: 'Urgent' as const, status: 'Open' as const, elapsed: '1h 45m', sla: false },
    { number: 'T-8501', room: 'Lobby Lounge', title: 'Wi-Fi Signal Drop During Peak Hours', cat: 'IT Infrastructure', assignee: 'IT Support', priority: 'Medium' as const, status: 'Open' as const, elapsed: '25m', sla: true },
    { number: 'T-8488', room: 'Suite 118', title: 'Evening Housekeeping Service Delayed', cat: 'Housekeeping', assignee: 'Housekeeping Dept.', priority: 'High' as const, status: 'In Progress' as const, elapsed: '4h 20m', sla: true },
    { number: 'T-8475', room: 'Restaurant', title: 'Breakfast Order Wait Exceeded 30 Mins', cat: 'Food & Beverage', assignee: 'F&B Operations', priority: 'High' as const, status: 'In Progress' as const, elapsed: '1h 30m', sla: true },
    { number: 'T-8460', room: 'Suite 204', title: 'Street Noise Complaint & Room Transfer Request', cat: 'Front Office', assignee: 'Front Desk Lead', priority: 'Urgent' as const, status: 'Resolved' as const, elapsed: '45m', sla: true },
    { number: 'T-8442', room: 'Spa Pavilion', title: 'Hydrotherapy Booking Time Double Booked', cat: 'Spa & Wellness', assignee: 'Spa Concierge', priority: 'Medium' as const, status: 'Resolved' as const, elapsed: '2h 10m', sla: true },
    { number: 'T-8430', room: 'Villa 12', title: 'Minibar Item Discrepancy on Checkout Invoice', cat: 'Finance & Billing', assignee: 'Guest Accounts', priority: 'Low' as const, status: 'Resolved' as const, elapsed: '35m', sla: true },
    { number: 'T-8419', room: 'Suite 505', title: 'Airport Limousine Pickup Time Miscommunication', cat: 'Concierge', assignee: 'Head Concierge', priority: 'High' as const, status: 'Resolved' as const, elapsed: '1h 15m', sla: true },
  ]

  const caseManagement = {
    totalCases: Math.floor(42 * dateScale),
    openCases: Math.floor(8 * dateScale),
    inProgressCases: Math.floor(14 * dateScale),
    resolvedCases: Math.floor(20 * dateScale),
    slaCompliancePct: 94.8,
    avgResolutionTimeHours: 2.1,
    tickets: rawTickets.map((t, idx) => ({
      id: `ticket-${idx}`,
      ticketNumber: t.number,
      roomOrArea: isSingleProperty ? `${t.room} (${property})` : t.room,
      title: t.title,
      category: t.cat,
      assignee: t.assignee,
      priority: t.priority,
      status: t.status,
      elapsedTime: t.elapsed,
      slaMet: t.sla,
    })),
  }

  // Survey Studio
  const surveyStudio = {
    preStayCompletionRate: 38.4,
    inStayCompletionRate: 64.2,
    postStayCompletionRate: 52.8,
    totalSurveysSent: Math.floor(3200 * dateScale),
    avgSurveyNps: Number((npsVal + 2.4).toFixed(1)),
  }

  // Benchmarking
  const benchmarking = {
    marketRank: 1,
    totalCompetitors: 7,
    avgMarketGri: 91.2,
    platformShare: [
      { platform: 'Booking.com', sharePct: 45, reviewCount: Math.floor(actualReviews * 0.45), avgRating: '8.9 / 10' },
      { platform: 'Google Reviews', sharePct: 35, reviewCount: Math.floor(actualReviews * 0.35), avgRating: '4.7 / 5' },
      { platform: 'Tripadvisor', sharePct: 20, reviewCount: Math.floor(actualReviews * 0.20), avgRating: '4.6 / 5' },
    ],
  }

  // Filtered Guest Review Logs
  const guestNameList = [
    { name: 'Marcus Chen', lang: 'English', tier: 'vip' as const, badge: 'VIP Ambassador' },
    { name: 'Sofia Alvarez', lang: 'Spanish', tier: 'vip' as const, badge: 'VIP Tier 1' },
    { name: 'Kenji Takahashi', lang: 'Japanese', tier: 'returning' as const, badge: '4th Stay' },
    { name: 'Priya Nandakumar', lang: 'English', tier: 'returning' as const, badge: 'High Spender' },
    { name: 'Jean-Pierre Dubois', lang: 'French', tier: 'returning' as const, badge: 'Repeat Guest' },
    { name: 'Elena Rossi', lang: 'Italian', tier: 'returning' as const, badge: '2nd Stay' },
    { name: 'Tom Becker', lang: 'German', tier: 'returning' as const, badge: 'Corporate VIP' },
    { name: 'Tariq Al-Farsi', lang: 'Arabic', tier: 'vip' as const, badge: 'Royal Suite Guest' },
  ]

  const rawReviewTexts = [
    { text: 'The spa experience and private onsen were beyond expectation. Concierge staff remembered our preference from our stay last year!', rating: 10, scale: 10, plat: 'Booking.com' as const, sent: 'positive' as const },
    { text: 'Check-in was delayed by 35 minutes despite notifying them of our flight arrival. Room was impeccable once ready.', rating: 3, scale: 5, plat: 'Google' as const, sent: 'neutral' as const },
    { text: 'Flawless service from arrival to departure. The dining recommendation at the signature restaurant was extraordinary.', rating: 5, scale: 5, plat: 'Tripadvisor' as const, sent: 'positive' as const },
    { text: 'Acoustics in the room could be improved; noise from street traffic woke us early. Outstanding breakfast service though.', rating: 7, scale: 10, plat: 'Booking.com' as const, sent: 'neutral' as const },
    { text: 'Minibar prices were exorbitant and resort fee was not clearly disclosed at checkout. Staff handled complaint professionally.', rating: 2, scale: 5, plat: 'Google' as const, sent: 'negative' as const },
    { text: 'Personalized handwritten welcome note and complimentary champagne in suite. Aman standards are unmatched.', rating: 5, scale: 5, plat: 'Tripadvisor' as const, sent: 'positive' as const },
    { text: 'Housekeeping missed our evening turndown request. When called, they resolved it within 10 minutes with complimentary tea.', rating: 8, scale: 10, plat: 'Booking.com' as const, sent: 'positive' as const },
    { text: 'Breathtaking ocean views and impeccable private villa pool. Will definitely recommend to all our colleagues.', rating: 5, scale: 5, plat: 'Google' as const, sent: 'positive' as const },
  ]

  const reviewLogs: ReviewLogReport[] = rawReviewTexts.map((r, i) => {
    const g = guestNameList[i % guestNameList.length]
    return {
      id: `rev-${i}`,
      guestName: g.name,
      property: isSingleProperty ? property : ALL_PROPERTIES_LIST[i % ALL_PROPERTIES_LIST.length].name,
      platform: r.plat,
      language: g.lang,
      rating: r.rating,
      scale: r.scale,
      date: `${i + 1} day${i > 0 ? 's' : ''} ago`,
      sentiment: r.sent,
      crmBadge: { label: g.badge, tier: g.tier },
      reviewText: r.text,
      aiReplyStatus: i % 2 === 0 ? 'Sent' : 'Automated',
      resolutionStatus: r.sent === 'negative' ? 'Escalated' : 'Resolved',
    }
  })

  // Format active filters summary string
  const activeFiltersList: string[] = []
  if (isSingleProperty) activeFiltersList.push(`Property: ${property}`)
  if (platforms.length) activeFiltersList.push(`Platforms: ${platforms.join(', ')}`)
  if (languages.length) activeFiltersList.push(`Languages: ${languages.join(', ')}`)
  if (sentiments.length) activeFiltersList.push(`Sentiments: ${sentiments.join(', ')}`)
  if (activeFiltersList.length === 0) activeFiltersList.push('All Filter Categories Active')

  const now = new Date()
  const generatedAtStr = `${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`

  return {
    metadata: {
      reportId: `REP-${now.getFullYear()}-${(seed % 89999 + 10000)}`,
      title: 'LUXURY HOTEL AGGREGATOR',
      subtitle: 'Executive Operations, Sentiment & Revenue Intelligence Report',
      generatedAt: generatedAtStr,
      dateRange: dateLabel,
      selectedProperty: property,
      activeFiltersList,
      activePlatforms: platforms,
      activeLanguages: languages,
      activeSentiments: sentiments,
    },
    executiveSummary,
    propertyBreakdown,
    semanticEngine,
    teamKpis,
    caseManagement,
    surveyStudio,
    benchmarking,
    reviewLogs,
  }
}
