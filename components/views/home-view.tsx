'use client'

import { Hero } from '@/components/hero'
import { AuthorityTicker } from '@/components/authority-ticker'
import { FeatureShowcase } from '@/components/feature-showcase'
import { CuratedSelection } from '@/components/curated-selection'
import { SiteFooter } from '@/components/site-footer'

export function HomeView() {
  return (
    <>
      <Hero />
      {/* Content glides up and over the bottom of the video */}
      <div className="relative z-30 -mt-12 overflow-hidden rounded-t-[2.5rem] bg-background shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.6)]">
        <AuthorityTicker />
        <FeatureShowcase />
        <CuratedSelection />
        <SiteFooter />
      </div>
    </>
  )
}
