export interface AIScoreBreakdown {
  service: number
  architecture: number
  gastronomy: number
}

export interface Hotel {
  id: string
  name: string
  country: string
  city: string
  region: string
  coordinates: { lat: number; lng: number }
  aiScore: number
  scoreBreakdown: AIScoreBreakdown
  editorialSummary: string
  tags: string[]
  startingPrice: string
  startingPriceValue: number
  highResImage: string
}

export const mockHotels: Hotel[] = [
  {
    id: 'cervin-eyrie',
    name: 'Cervin Eyrie',
    country: 'Switzerland',
    city: 'Zermatt',
    region: 'Swiss Alps',
    coordinates: { lat: 46.0207, lng: 7.7491 },
    aiScore: 9.7,
    scoreBreakdown: { service: 9.8, architecture: 9.9, gastronomy: 9.3 },
    editorialSummary:
      'A glass-and-timber eyrie where the Matterhorn fills every window and service anticipates before you ask.',
    tags: [
      'Architectural Masterpiece',
      'Ski-in Ski-out',
      'Private Helipad',
      'Zero-Light Pollution',
      'Alpine Spa',
    ],
    startingPrice: '$2,150 / night',
    startingPriceValue: 2150,
    highResImage:
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'glacier-house-reserve',
    name: 'Glacier House Reserve',
    country: 'Switzerland',
    city: 'Zermatt',
    region: 'Swiss Alps',
    coordinates: { lat: 46.0184, lng: 7.7515 },
    aiScore: 9.4,
    scoreBreakdown: { service: 9.5, architecture: 9.2, gastronomy: 9.5 },
    editorialSummary:
      'Stone-walled intimacy at 1,900 metres, where the tasting menu changes with the snowline.',
    tags: [
      'Michelin Starred',
      'Wine Cellar Access',
      'Ski-in Ski-out',
      'Ultra-Private',
    ],
    startingPrice: '$1,680 / night',
    startingPriceValue: 1680,
    highResImage:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'aman-sanctuary',
    name: 'Aman Sanctuary',
    country: 'Japan',
    city: 'Kyoto',
    region: 'Kansai',
    coordinates: { lat: 35.0116, lng: 135.7681 },
    aiScore: 9.6,
    scoreBreakdown: { service: 9.8, architecture: 9.5, gastronomy: 9.4 },
    editorialSummary:
      'Cedar-scented stillness inside a moss forest, where service moves like practiced ritual.',
    tags: [
      'Ryokan Heritage',
      'Zen Garden',
      'Onsen Access',
      'Zero-Light Pollution',
    ],
    startingPrice: '$1,450 / night',
    startingPriceValue: 1450,
    highResImage:
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'higashiyama-machiya-retreat',
    name: 'Higashiyama Machiya Retreat',
    country: 'Japan',
    city: 'Kyoto',
    region: 'Kansai',
    coordinates: { lat: 35.0038, lng: 135.7773 },
    aiScore: 9.3,
    scoreBreakdown: { service: 9.6, architecture: 9.4, gastronomy: 8.9 },
    editorialSummary:
      'A restored merchant house in the geisha quarter — six rooms, one kaiseki chef, zero compromises.',
    tags: [
      'Heritage Villa',
      'Onsen Access',
      'Ultra-Private',
      'Butler Service',
    ],
    startingPrice: '$1,120 / night',
    startingPriceValue: 1120,
    highResImage:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'baa-atoll-reef-sanctuary',
    name: 'Baa Atoll Reef Sanctuary',
    country: 'Maldives',
    city: 'Baa Atoll',
    region: 'Indian Ocean',
    coordinates: { lat: 5.12, lng: 73.07 },
    aiScore: 9.7,
    scoreBreakdown: { service: 9.9, architecture: 9.6, gastronomy: 9.7 },
    editorialSummary:
      'Overwater villas suspended above a UNESCO biosphere reserve, reef sharks visible from the plunge pool.',
    tags: [
      'Overwater Villa',
      'Private Helipad',
      'Underwater Restaurant',
      'Zero-Light Pollution',
    ],
    startingPrice: '$3,200 / night',
    startingPriceValue: 3200,
    highResImage:
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'dhoni-horizon-villas',
    name: 'Dhoni Horizon Villas',
    country: 'Maldives',
    city: 'Baa Atoll',
    region: 'Indian Ocean',
    coordinates: { lat: 5.1346, lng: 73.0631 },
    aiScore: 9.5,
    scoreBreakdown: { service: 9.7, architecture: 9.3, gastronomy: 9.4 },
    editorialSummary:
      'Sail-shaded pavilions on stilts, where breakfast arrives by traditional dhoni before sunrise.',
    tags: [
      'Overwater Villa',
      'Ocean-to-Table Dining',
      'Butler Service',
      'Ultra-Private',
    ],
    startingPrice: '$2,780 / night',
    startingPriceValue: 2780,
    highResImage:
      'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'rifugio-cristallo-estate',
    name: 'Rifugio Cristallo Estate',
    country: 'Italy',
    city: 'Dolomites',
    region: 'South Tyrol',
    coordinates: { lat: 46.5369, lng: 12.1357 },
    aiScore: 9.6,
    scoreBreakdown: { service: 9.5, architecture: 9.8, gastronomy: 9.5 },
    editorialSummary:
      'A converted alpine rifugio beneath jagged dolomite spires, where every terrace faces the sunset wall.',
    tags: [
      'Architectural Masterpiece',
      'Dolomite Panorama',
      'Via Ferrata Access',
      'Alpine Spa',
    ],
    startingPrice: '$1,890 / night',
    startingPriceValue: 1890,
    highResImage:
      'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cortina-pietra-lodge',
    name: 'Cortina Pietra Lodge',
    country: 'Italy',
    city: 'Dolomites',
    region: 'South Tyrol',
    coordinates: { lat: 46.5405, lng: 12.1357 },
    aiScore: 9.2,
    scoreBreakdown: { service: 9.3, architecture: 9.4, gastronomy: 8.8 },
    editorialSummary:
      'Larch and limestone in equal measure — ten suites, and a fire that never quite goes out.',
    tags: ['Ski-in Ski-out', 'Wine Cellar Access', 'Ultra-Private'],
    startingPrice: '$1,340 / night',
    startingPriceValue: 1340,
    highResImage:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'domaine-des-lavandes',
    name: 'Domaine des Lavandes',
    country: 'France',
    city: 'Provence',
    region: 'Provence-Alpes-Côte d’Azur',
    coordinates: { lat: 43.9111, lng: 5.2 },
    aiScore: 9.5,
    scoreBreakdown: { service: 9.6, architecture: 9.3, gastronomy: 9.6 },
    editorialSummary:
      'A restored mas among lavender rows, where the chef forages the same hills the wine comes from.',
    tags: [
      'Vineyard Estate',
      'Lavender Terrace',
      'Michelin Starred',
      'Truffle Tasting Menu',
    ],
    startingPrice: '$1,580 / night',
    startingPriceValue: 1580,
    highResImage:
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'clos-des-vignes',
    name: 'Clos des Vignes',
    country: 'France',
    city: 'Provence',
    region: 'Provence-Alpes-Côte d’Azur',
    coordinates: { lat: 43.935, lng: 5.05 },
    aiScore: 9.3,
    scoreBreakdown: { service: 9.3, architecture: 9.1, gastronomy: 9.5 },
    editorialSummary:
      'Nine rows of Grenache lead straight to the door, and dinner is whatever the harvest allows.',
    tags: ['Vineyard Estate', 'Wine Cellar Access', 'Michelin Starred'],
    startingPrice: '$1,150 / night',
    startingPriceValue: 1150,
    highResImage:
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'sommet-sky-suite',
    name: 'Sommet Sky Suite',
    country: 'Switzerland',
    city: 'Zermatt',
    region: 'Swiss Alps',
    coordinates: { lat: 46.025, lng: 7.745 },
    aiScore: 9.5,
    scoreBreakdown: { service: 9.4, architecture: 9.7, gastronomy: 9.3 },
    editorialSummary:
      'A single glass-walled suite cantilevered above the valley, where the bed faces nothing but peaks and sky.',
    tags: ['Architectural Masterpiece', 'Ultra-Private', 'Zero-Light Pollution'],
    startingPrice: '$2,450 / night',
    startingPriceValue: 2450,
    highResImage:
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'twilight-reef-pavilions',
    name: 'Twilight Reef Pavilions',
    country: 'Maldives',
    city: 'Baa Atoll',
    region: 'Indian Ocean',
    coordinates: { lat: 5.15, lng: 73.05 },
    aiScore: 9.5,
    scoreBreakdown: { service: 9.6, architecture: 9.4, gastronomy: 9.5 },
    editorialSummary:
      'Draped daybeds float above a lagoon that turns violet at dusk, one pavilion per reef.',
    tags: ['Overwater Villa', 'Sunset Terrace', 'Butler Service'],
    startingPrice: '$2,950 / night',
    startingPriceValue: 2950,
    highResImage:
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'yokocho-lantern-house',
    name: 'Yokocho Lantern House',
    country: 'Japan',
    city: 'Kyoto',
    region: 'Kansai',
    coordinates: { lat: 35.005, lng: 135.77 },
    aiScore: 9.4,
    scoreBreakdown: { service: 9.5, architecture: 9.2, gastronomy: 9.6 },
    editorialSummary:
      "Five rooms above a lantern-lit alley of century-old izakaya, where the chef's counter seats six.",
    tags: ['Heritage Villa', 'Ultra-Private', 'Butler Service'],
    startingPrice: '$980 / night',
    startingPriceValue: 980,
    highResImage:
      'https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'lago-di-braies-refuge',
    name: 'Lago di Braies Refuge',
    country: 'Italy',
    city: 'Dolomites',
    region: 'South Tyrol',
    coordinates: { lat: 46.695, lng: 12.085 },
    aiScore: 9.3,
    scoreBreakdown: { service: 9.3, architecture: 9.6, gastronomy: 9.1 },
    editorialSummary:
      'A timber boathouse turned five-suite refuge on an emerald alpine lake, silent but for oars.',
    tags: [
      'Architectural Masterpiece',
      'Dolomite Panorama',
      'Zero-Light Pollution',
    ],
    startingPrice: '$1,240 / night',
    startingPriceValue: 1240,
    highResImage:
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'caldera-sky-villas',
    name: 'Caldera Sky Villas',
    country: 'Greece',
    city: 'Santorini',
    region: 'Cyclades',
    coordinates: { lat: 36.4618, lng: 25.3753 },
    aiScore: 9.6,
    scoreBreakdown: { service: 9.7, architecture: 9.8, gastronomy: 9.2 },
    editorialSummary:
      'Whitewashed suites carved into the caldera rim, where every infinity pool seems to spill into the Aegean.',
    tags: [
      'Cliffside Infinity Edge',
      'Architectural Masterpiece',
      'Sunset Terrace',
      'Private Helipad',
    ],
    startingPrice: '$1,720 / night',
    startingPriceValue: 1720,
    highResImage:
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'villa-aegeana',
    name: 'Villa Aegeana',
    country: 'Greece',
    city: 'Santorini',
    region: 'Cyclades',
    coordinates: { lat: 36.462, lng: 25.372 },
    aiScore: 9.3,
    scoreBreakdown: { service: 9.4, architecture: 9.5, gastronomy: 8.9 },
    editorialSummary:
      'A private cliffside escape with golden-hour sea views and quiet elegance, ten steps from the caldera path.',
    tags: ['Cliffside Infinity Edge', 'Ultra-Private', 'Sunset Terrace'],
    startingPrice: '$1,380 / night',
    startingPriceValue: 1380,
    highResImage:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'bastide-saint-remy',
    name: 'Bastide Saint-Rémy',
    country: 'France',
    city: 'Provence',
    region: 'Provence-Alpes-Côte d’Azur',
    coordinates: { lat: 43.7903, lng: 4.8306 },
    aiScore: 9.1,
    scoreBreakdown: { service: 9.2, architecture: 9.0, gastronomy: 9.2 },
    editorialSummary:
      'Ivy-covered stone and cypress shade — a village bastide turned nine-room hideaway.',
    tags: [
      'Ivy-Covered Facade',
      'Heritage Villa',
      'Wine Cellar Access',
      'Ultra-Private',
    ],
    startingPrice: '$980 / night',
    startingPriceValue: 980,
    highResImage:
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1600&q=80',
  },
]

export const countries: string[] = Array.from(
  new Set(mockHotels.map((hotel) => hotel.country)),
).sort()

export function citiesForCountry(country?: string): string[] {
  const source = country
    ? mockHotels.filter((hotel) => hotel.country === country)
    : mockHotels
  return Array.from(new Set(source.map((hotel) => hotel.city))).sort()
}
