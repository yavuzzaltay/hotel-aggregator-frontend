export type ViewId = 'home' | 'collections' | 'journal' | 'technology'

export const NAV_LINKS: { id: ViewId; label: string }[] = [
  { id: 'technology', label: 'Technology' },
  { id: 'collections', label: 'Solutions' },
  { id: 'journal', label: 'Insights' },
]

// Shared premium easing curve
export const EASE = [0.16, 1, 0.3, 1] as const
