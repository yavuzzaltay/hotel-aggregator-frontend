'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '@/lib/views'
import { Sidebar } from './sidebar'
import { DashboardHeader } from './dashboard-header'
import { OverviewView } from './overview-view'
import { SemanticEngineView } from './semantic-engine-view'
import { InboxView } from './inbox-view'
import { BenchmarkingView } from './benchmarking-view'
import { SurveyStudioView } from './survey-studio-view'
import { CaseManagementView } from './case-management-view'
import { TeamKpisView } from './team-kpis-view'
import { AddPropertyView } from './add-property-view'
import { SettingsView } from './settings-view'
import { ExportReportModal } from './export-report-modal'
import type { ViewId } from './types'
import type { DateRange } from '@/data/mockDashboard'

import { DashboardThemeProvider, useDashboardTheme } from './dashboard-theme-context'

export function DashboardShell() {
  return (
    <DashboardThemeProvider>
      <DashboardContent />
    </DashboardThemeProvider>
  )
}

function DashboardContent() {
  const [view, setView] = useState<ViewId>('overview')
  const [search, setSearch] = useState('')
  const [dateRange, setDateRange] = useState<DateRange>('Last 30 Days')
  const [property, setProperty] = useState('All Properties (17)')
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  const { mode } = useDashboardTheme()

  const toggleFilter = (option: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(option)) next.delete(option)
      else next.add(option)
      return next
    })
  }

  // Typing a review search only makes sense inside the Unified Inbox, so
  // jump there automatically instead of leaving the query with no visible effect.
  useEffect(() => {
    if (search.trim() && view !== 'inbox') {
      setView('inbox')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const viewComponents: Record<ViewId, () => React.ReactNode> = {
    overview: () => <OverviewView dateRange={dateRange} />,
    semantic: () => <SemanticEngineView />,
    inbox: () => <InboxView searchQuery={search} />,
    benchmarking: () => <BenchmarkingView />,
    surveyStudio: () => <SurveyStudioView />,
    caseManagement: () => <CaseManagementView />,
    teamKpis: () => <TeamKpisView />,
    addProperty: () => <AddPropertyView onComplete={() => setView('overview')} />,
    settings: () => <SettingsView />,
  }

  const isEditorial = mode === 'editorial'

  return (
    <div
      className={`relative flex h-svh w-full overflow-hidden antialiased transition-colors duration-300 ${
        isEditorial
          ? 'bg-zinc-50 font-sans text-zinc-900 selection:bg-zinc-900 selection:text-zinc-50'
          : 'bg-[#f8f9fa] font-sans text-gray-900'
      }`}
    >
      <Sidebar active={view} onNavigate={setView} />

      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader
          search={search}
          onSearchChange={setSearch}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          property={property}
          onPropertyChange={setProperty}
          activeFilters={activeFilters}
          onToggleFilter={toggleFilter}
          onOpenExportModal={() => setIsExportModalOpen(true)}
        />

        <div className="min-w-0 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${view}-${mode}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {viewComponents[view]()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        dateRange={dateRange}
        property={property}
        activeFilters={activeFilters}
      />
    </div>
  )
}
