'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SiteHeader } from '@/components/site-header'
import { HomeView } from '@/components/views/home-view'
import { CollectionsView } from '@/components/views/collections-view'
import { JournalView } from '@/components/views/journal-view'
import { TechnologyView } from '@/components/views/technology-view'
import { EASE, type ViewId } from '@/lib/views'

const views: Record<ViewId, React.ComponentType> = {
  home: HomeView,
  collections: CollectionsView,
  journal: JournalView,
  technology: TechnologyView,
}

export function AppShell() {
  const [activeView, setActiveView] = useState<ViewId>('home')

  const handleNavigate = useCallback(
    (view: ViewId) => {
      if (view === activeView) return
      // Jump to top so the incoming view starts from its beginning.
      window.scrollTo({ top: 0, behavior: 'auto' })
      setActiveView(view)
    },
    [activeView],
  )

  const ActiveComponent = views[activeView]

  return (
    <>
      <SiteHeader activeView={activeView} onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        <motion.main
          key={activeView}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative"
        >
          <ActiveComponent />
        </motion.main>
      </AnimatePresence>
    </>
  )
}
