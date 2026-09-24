export interface DonutStatData {
  id: string
  label: string
  value: number
  displayValue: string
  caption: string
  color: string
}

export interface SourceData {
  id: string
  name: string
  reviews: number
  share: number
  rating: number
  scale: number
  color: string
}

export interface DashboardSnapshot {
  donutStats: DonutStatData[]
  sources: SourceData[]
  griTrend: { month: string; value: number }[]
}

export const DATE_RANGES = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Year to Date'] as const
export type DateRange = (typeof DATE_RANGES)[number]

export const dashboardSnapshots: Record<DateRange, DashboardSnapshot> = {
  'Last 7 Days': {
    donutStats: [
      {
        id: 'gri',
        label: 'Guest Rating Index (GRI™)',
        value: 86.4,
        displayValue: '86.4%',
        caption: '+0.3 pts vs last week',
        color: '#10b981',
      },
      {
        id: 'reviews',
        label: 'Reviews Indexed',
        value: 68,
        displayValue: '512',
        caption: 'of 750 weekly target',
        color: '#f59e0b',
      },
      {
        id: 'sentiment',
        label: 'Sentiment Score',
        value: 60.8,
        displayValue: '60.8%',
        caption: 'Below 75% target threshold',
        color: '#f43f5e',
      },
      {
        id: 'response',
        label: 'Response Rate',
        value: 71.2,
        displayValue: '71.2%',
        caption: '+1.1 pts vs last week',
        color: '#3b82f6',
      },
    ],
    sources: [
      { id: 'booking', name: 'Booking.com', reviews: 230, share: 45, rating: 8.9, scale: 10, color: '#2563eb' },
      { id: 'google', name: 'Google', reviews: 178, share: 35, rating: 4.4, scale: 5, color: '#f59e0b' },
      { id: 'tripadvisor', name: 'Tripadvisor', reviews: 104, share: 20, rating: 4.5, scale: 5, color: '#10b981' },
    ],
    griTrend: [
      { month: 'Mon', value: 84.9 },
      { month: 'Tue', value: 85.2 },
      { month: 'Wed', value: 85.8 },
      { month: 'Thu', value: 86.0 },
      { month: 'Fri', value: 85.7 },
      { month: 'Sat', value: 86.2 },
      { month: 'Sun', value: 86.4 },
    ],
  },
  'Last 30 Days': {
    donutStats: [
      {
        id: 'gri',
        label: 'Guest Rating Index (GRI™)',
        value: 85.6,
        displayValue: '85.6%',
        caption: '+2.1 pts vs last month',
        color: '#10b981',
      },
      {
        id: 'reviews',
        label: 'Reviews Indexed',
        value: 88,
        displayValue: '4,423',
        caption: 'of 5,000 monthly target',
        color: '#f59e0b',
      },
      {
        id: 'sentiment',
        label: 'Sentiment Score',
        value: 57.5,
        displayValue: '57.5%',
        caption: 'Below 75% target threshold',
        color: '#f43f5e',
      },
      {
        id: 'response',
        label: 'Response Rate',
        value: 69.3,
        displayValue: '69.3%',
        caption: '+4.8 pts vs last month',
        color: '#3b82f6',
      },
    ],
    sources: [
      { id: 'booking', name: 'Booking.com', reviews: 1988, share: 45, rating: 8.9, scale: 10, color: '#2563eb' },
      { id: 'google', name: 'Google', reviews: 1547, share: 35, rating: 4.4, scale: 5, color: '#f59e0b' },
      { id: 'tripadvisor', name: 'Tripadvisor', reviews: 888, share: 20, rating: 4.5, scale: 5, color: '#10b981' },
    ],
    griTrend: [
      { month: 'Week 1', value: 82.1 },
      { month: 'Week 2', value: 83.4 },
      { month: 'Week 3', value: 84.5 },
      { month: 'Week 4', value: 85.6 },
    ],
  },
  'Last 90 Days': {
    donutStats: [
      {
        id: 'gri',
        label: 'Guest Rating Index (GRI™)',
        value: 83.9,
        displayValue: '83.9%',
        caption: '+3.8 pts vs 90 days ago',
        color: '#10b981',
      },
      {
        id: 'reviews',
        label: 'Reviews Indexed',
        value: 86,
        displayValue: '12,845',
        caption: 'of 15,000 quarterly target',
        color: '#f59e0b',
      },
      {
        id: 'sentiment',
        label: 'Sentiment Score',
        value: 54.2,
        displayValue: '54.2%',
        caption: 'Below 75% target threshold',
        color: '#f43f5e',
      },
      {
        id: 'response',
        label: 'Response Rate',
        value: 66.7,
        displayValue: '66.7%',
        caption: '+6.4 pts vs 90 days ago',
        color: '#3b82f6',
      },
    ],
    sources: [
      { id: 'booking', name: 'Booking.com', reviews: 5680, share: 44, rating: 8.8, scale: 10, color: '#2563eb' },
      { id: 'google', name: 'Google', reviews: 4490, share: 35, rating: 4.3, scale: 5, color: '#f59e0b' },
      { id: 'tripadvisor', name: 'Tripadvisor', reviews: 2675, share: 21, rating: 4.4, scale: 5, color: '#10b981' },
    ],
    griTrend: [
      { month: 'Wk 1', value: 80.1 },
      { month: 'Wk 2', value: 81.0 },
      { month: 'Wk 3', value: 82.2 },
      { month: 'Wk 4', value: 82.9 },
      { month: 'Wk 5', value: 83.5 },
      { month: 'Wk 6', value: 83.9 },
    ],
  },
  'Year to Date': {
    donutStats: [
      {
        id: 'gri',
        label: 'Guest Rating Index (GRI™)',
        value: 82.7,
        displayValue: '82.7%',
        caption: '+5.1 pts since January',
        color: '#10b981',
      },
      {
        id: 'reviews',
        label: 'Reviews Indexed',
        value: 85,
        displayValue: '38,204',
        caption: 'of 45,000 annual target',
        color: '#f59e0b',
      },
      {
        id: 'sentiment',
        label: 'Sentiment Score',
        value: 51.9,
        displayValue: '51.9%',
        caption: 'Below 75% target threshold',
        color: '#f43f5e',
      },
      {
        id: 'response',
        label: 'Response Rate',
        value: 64.1,
        displayValue: '64.1%',
        caption: '+9.6 pts since January',
        color: '#3b82f6',
      },
    ],
    sources: [
      { id: 'booking', name: 'Booking.com', reviews: 17190, share: 45, rating: 8.7, scale: 10, color: '#2563eb' },
      { id: 'google', name: 'Google', reviews: 13372, share: 35, rating: 4.3, scale: 5, color: '#f59e0b' },
      { id: 'tripadvisor', name: 'Tripadvisor', reviews: 7642, share: 20, rating: 4.4, scale: 5, color: '#10b981' },
    ],
    griTrend: [
      { month: 'Jan', value: 76.8 },
      { month: 'Feb', value: 77.5 },
      { month: 'Mar', value: 78.9 },
      { month: 'Apr', value: 79.6 },
      { month: 'May', value: 80.2 },
      { month: 'Jun', value: 81.0 },
      { month: 'Jul', value: 81.9 },
      { month: 'Aug', value: 82.7 },
    ],
  },
}

export const donutStats: DonutStatData[] = dashboardSnapshots['Last 30 Days'].donutStats
export const sources: SourceData[] = dashboardSnapshots['Last 30 Days'].sources
export const griTrend: { month: string; value: number }[] = dashboardSnapshots['Last 30 Days'].griTrend

export interface SemanticCategory {
  id: string
  label: string
  impact: number
  mentions: number
  tags: string[]
  insight: string
}

export const negativeCategories: SemanticCategory[] = [
  {
    id: 'value',
    label: 'Value',
    impact: -7.0,
    mentions: 312,
    tags: ['overpriced', 'hidden fees', 'resort fee', 'minibar pricing'],
    insight: 'Guests cite resort fees and minibar pricing most often.',
  },
  {
    id: 'cleanliness',
    label: 'Cleanliness',
    impact: -5.2,
    mentions: 201,
    tags: ['dirty', 'stained linen', 'dusty vents', 'bathroom mold'],
    insight: 'Bathroom cleanliness flagged in 1 of 6 negative reviews.',
  },
  {
    id: 'room',
    label: 'Room',
    impact: -4.1,
    mentions: 178,
    tags: ['small', 'noisy', 'thin walls', 'street-facing'],
    insight: 'Street-facing rooms drive most noise complaints.',
  },
]

export const positiveCategories: SemanticCategory[] = [
  {
    id: 'staff',
    label: 'Staff',
    impact: 4.9,
    mentions: 456,
    tags: ['attentive', 'welcoming', 'friendly', 'personalized'],
    insight: 'Concierge team named directly in 38% of 5-star reviews.',
  },
  {
    id: 'spa',
    label: 'Spa',
    impact: 3.8,
    mentions: 289,
    tags: ['massage', 'relaxing', 'rejuvenating', 'tranquil'],
    insight: 'The signature massage is the most-mentioned amenity.',
  },
  {
    id: 'location',
    label: 'Location',
    impact: 3.2,
    mentions: 340,
    tags: ['central', 'walkable', 'scenic', 'convenient'],
    insight: 'Proximity to the old town cited as a key differentiator.',
  },
]

export type Sentiment = 'positive' | 'neutral' | 'negative'

export interface CrmBadge {
  label: string
  tier: 'vip' | 'returning'
}

export interface GuestReview {
  id: string
  platform: 'Booking.com' | 'Google' | 'Tripadvisor'
  platformColor: string
  guestName: string
  score: number
  scale: number
  date: string
  text: string
  sentiment: Sentiment
  crmBadge?: CrmBadge
}

export const guestReviews: GuestReview[] = [
  {
    id: 'r1',
    platform: 'Google',
    platformColor: '#f59e0b',
    guestName: 'Marcus Chen',
    score: 3,
    scale: 5,
    date: '2 hours ago',
    text: 'Beautiful property and the spa was incredible, but we waited 40 minutes for check-in and the room wasn’t ready until 6pm. For the price point, that’s hard to overlook.',
    sentiment: 'neutral',
  },
  {
    id: 'r2',
    platform: 'Booking.com',
    platformColor: '#2563eb',
    guestName: 'Sofia Alvarez',
    score: 9,
    scale: 10,
    date: '6 hours ago',
    text: 'Every member of staff remembered our names by day two. The massage at the spa was the best I’ve had anywhere. We are already planning our return.',
    sentiment: 'positive',
    crmBadge: { label: 'VIP', tier: 'vip' },
  },
  {
    id: 'r3',
    platform: 'Tripadvisor',
    platformColor: '#10b981',
    guestName: 'James Whitfield',
    score: 2,
    scale: 5,
    date: '1 day ago',
    text: 'Room was smaller than pictured and noisy from the street. Found what looked like stained linen on arrival. Had to ask twice for it to be changed.',
    sentiment: 'negative',
  },
  {
    id: 'r4',
    platform: 'Google',
    platformColor: '#f59e0b',
    guestName: 'Priya Nandakumar',
    score: 5,
    scale: 5,
    date: '1 day ago',
    text: 'Walkable to everything in the old town, and the concierge team planned our entire anniversary evening without being asked twice. Flawless.',
    sentiment: 'positive',
    crmBadge: { label: '3rd Stay · High Spender', tier: 'returning' },
  },
  {
    id: 'r5',
    platform: 'Booking.com',
    platformColor: '#2563eb',
    guestName: 'Tom Becker',
    score: 4,
    scale: 10,
    date: '2 days ago',
    text: 'Nightly resort fee wasn’t made clear at booking and the minibar prices are frankly overpriced for what you get. Room itself was fine.',
    sentiment: 'negative',
  },
  {
    id: 'r6',
    platform: 'Tripadvisor',
    platformColor: '#10b981',
    guestName: 'Elena Rossi',
    score: 4,
    scale: 5,
    date: '3 days ago',
    text: 'The signature massage alone is worth the trip back. Relaxing, quiet, exactly what we needed after a long year.',
    sentiment: 'positive',
    crmBadge: { label: '2nd Stay', tier: 'returning' },
  },
]

export const replyTones = ['Professional', 'Warm', 'Formal', 'Apologetic'] as const
export const replyLengths = ['Concise', 'Standard', 'Detailed'] as const

export type ReplyTone = (typeof replyTones)[number]
export type ReplyLength = (typeof replyLengths)[number]

export function generateAiReply(
  review: GuestReview,
  tone: ReplyTone,
  length: ReplyLength,
  context?: string,
): string {
  const greeting = `Dear ${review.guestName},`
  const contextLine = context?.trim() ? ` We also wanted to mention: ${context.trim()}.` : ''

  const openLine: Record<ReplyTone, string> = {
    Professional: 'Thank you for taking the time to share your detailed feedback with us.',
    Warm: 'It truly meant a lot to read your note about your stay with us.',
    Formal: 'We appreciate you taking the time to share your experience.',
    Apologetic: 'We are sorry to hear that parts of your stay fell short of what you deserved.',
  }

  const body: Record<Sentiment, string> = {
    negative:
      'We have shared your comments directly with our General Manager and the relevant department heads, and we are already reviewing the specific points you raised.',
    neutral:
      'We are glad the highlights stood out, and we have noted the areas where we can do better.',
    positive:
      'Comments like yours are exactly why our team does what they do, and we have passed your kind words along to them directly.',
  }

  const closing: Record<ReplyTone, string> = {
    Professional: 'We hope to welcome you back soon.\n\nWarm regards,\nGuest Relations Team',
    Warm: 'We cannot wait to host you again.\n\nWith warmth,\nThe Guest Relations Team',
    Formal: 'We look forward to the opportunity to serve you again.\n\nSincerely,\nGuest Relations',
    Apologetic: 'We hope you will give us the chance to make this right.\n\nWith apologies,\nGuest Relations Team',
  }

  if (length === 'Concise') {
    return `${greeting} ${openLine[tone]}${contextLine} ${closing[tone]}`
  }

  if (length === 'Detailed') {
    return `${greeting}\n\n${openLine[tone]} ${body[review.sentiment]}${contextLine} We take every piece of feedback seriously as part of how we continuously refine the guest experience here.\n\n${closing[tone]}`
  }

  return `${greeting}\n\n${openLine[tone]} ${body[review.sentiment]}${contextLine}\n\n${closing[tone]}`
}

export interface PlatformShare {
  booking: number
  google: number
  tripadvisor: number
}

export interface BenchmarkProperty {
  id: string
  name: string
  griScore: number
  totalReviews: number
  topPositiveDriver: string
  topNegativeDriver: string
  platformShare: PlatformShare
}

export interface SurveyBlockDef {
  id: string
  type: 'nps' | 'text' | 'rating'
  label: string
  description: string
}

export const surveyBlockLibrary: SurveyBlockDef[] = [
  {
    id: 'nps',
    type: 'nps',
    label: 'NPS Score',
    description: 'How likely are you to recommend us to a friend?',
  },
  {
    id: 'text',
    type: 'text',
    label: 'Open Text',
    description: 'Tell us more about your experience, in your own words.',
  },
  {
    id: 'rating',
    type: 'rating',
    label: 'Rate Department',
    description: 'Rate a specific department from 1 to 5.',
  },
]

export const SURVEY_STAGES = ['Pre-Stay', 'In-Stay (QR/SMS)', 'Post-Stay'] as const
export type SurveyStage = (typeof SURVEY_STAGES)[number]

export const surveyStageDefaults: Record<SurveyStage, string[]> = {
  'Pre-Stay': ['nps', 'text'],
  'In-Stay (QR/SMS)': ['rating', 'text'],
  'Post-Stay': ['nps', 'rating', 'text'],
}

export type CaseStatus = 'open' | 'inProgress' | 'resolved'

export interface CaseTicket {
  id: string
  title: string
  sourceReview: string
  assignee: string
  status: CaseStatus
  // Timestamp (ms) of the last status change — elapsed time is derived
  // from this at render time instead of being a manually-set field.
  statusUpdatedAt: number
}

export const CASE_COLUMNS: { id: CaseStatus; label: string }[] = [
  { id: 'open', label: 'Open Issues' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' },
]

const MINUTE_MS = 60 * 1000
const HOUR_MS = 60 * MINUTE_MS

export const caseTickets: CaseTicket[] = [
  {
    id: 't1',
    title: 'Room 302: AC Malfunction',
    sourceReview: 'Review #8492',
    assignee: 'Maintenance Dept.',
    status: 'open',
    statusUpdatedAt: Date.now() - (1 * HOUR_MS + 45 * MINUTE_MS),
  },
  {
    id: 't2',
    title: 'Lobby: Wi-Fi Connectivity',
    sourceReview: 'Review #8501',
    assignee: 'IT Dept.',
    status: 'open',
    statusUpdatedAt: Date.now() - 25 * MINUTE_MS,
  },
  {
    id: 't3',
    title: 'Room 118: Late Housekeeping',
    sourceReview: 'Review #8488',
    assignee: 'Housekeeping',
    status: 'inProgress',
    statusUpdatedAt: Date.now() - (4 * HOUR_MS + 20 * MINUTE_MS),
  },
  {
    id: 't4',
    title: 'Restaurant: Order Delay',
    sourceReview: 'Review #8475',
    assignee: 'F&B Dept.',
    status: 'inProgress',
    statusUpdatedAt: Date.now() - (1 * HOUR_MS + 30 * MINUTE_MS),
  },
  {
    id: 't5',
    title: 'Room 204: Noise Complaint',
    sourceReview: 'Review #8460',
    assignee: 'Front Desk',
    status: 'resolved',
    statusUpdatedAt: Date.now() - 2 * HOUR_MS,
  },
  {
    id: 't6',
    title: 'Spa: Booking Conflict',
    sourceReview: 'Review #8442',
    assignee: 'Spa Dept.',
    status: 'resolved',
    statusUpdatedAt: Date.now() - 24 * HOUR_MS,
  },
]

export const npsScore = 54.2

export interface TeamGoal {
  id: string
  label: string
  progress: number
}

export const teamGoals: TeamGoal[] = [
  { id: 'response-time', label: 'Avg Response Time < 24h', progress: 80 },
  { id: 'front-desk-sentiment', label: 'Front Desk Sentiment > 90%', progress: 95 },
  { id: 'resolution-rate', label: 'Case Resolution Rate > 85%', progress: 91 },
  { id: 'survey-response', label: 'Survey Response Rate > 40%', progress: 62 },
]

export const allBenchmarkProperties: BenchmarkProperty[] = [
  {
    id: 'aman-tokyo',
    name: 'Aman Tokyo',
    griScore: 94.2,
    totalReviews: 1204,
    topPositiveDriver: 'Spa Experience',
    topNegativeDriver: 'Room Noise',
    platformShare: { booking: 45, google: 35, tripadvisor: 20 },
  },
  {
    id: 'six-senses-kyoto',
    name: 'Six Senses Kyoto',
    griScore: 91.8,
    totalReviews: 840,
    topPositiveDriver: 'Gastronomy',
    topNegativeDriver: 'Wait Times',
    platformShare: { booking: 38, google: 42, tripadvisor: 20 },
  },
  {
    id: 'bvlgari-bali',
    name: 'Bvlgari Bali',
    griScore: 95.0,
    totalReviews: 2100,
    topPositiveDriver: 'Architecture',
    topNegativeDriver: 'Location',
    platformShare: { booking: 50, google: 30, tripadvisor: 20 },
  },
  {
    id: 'cheval-blanc-paris',
    name: 'Cheval Blanc Paris',
    griScore: 93.4,
    totalReviews: 690,
    topPositiveDriver: 'Service',
    topNegativeDriver: 'Pricing',
    platformShare: { booking: 40, google: 38, tripadvisor: 22 },
  },
  {
    id: 'peninsula-hong-kong',
    name: 'The Peninsula Hong Kong',
    griScore: 92.6,
    totalReviews: 1580,
    topPositiveDriver: 'Views',
    topNegativeDriver: 'Wait Times',
    platformShare: { booking: 44, google: 33, tripadvisor: 23 },
  },
  {
    id: 'rosewood-sao-paulo',
    name: 'Rosewood São Paulo',
    griScore: 90.3,
    totalReviews: 512,
    topPositiveDriver: 'Design',
    topNegativeDriver: 'Room Noise',
    platformShare: { booking: 36, google: 41, tripadvisor: 23 },
  },
  {
    id: 'explora-patagonia',
    name: 'Explora Patagonia',
    griScore: 96.1,
    totalReviews: 340,
    topPositiveDriver: 'Excursions',
    topNegativeDriver: 'Connectivity',
    platformShare: { booking: 30, google: 28, tripadvisor: 42 },
  },
]

export const defaultBenchmarkPropertyIds = ['aman-tokyo', 'six-senses-kyoto', 'bvlgari-bali']
