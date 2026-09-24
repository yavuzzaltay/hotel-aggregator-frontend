'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  Calendar,
  Building2,
  SlidersHorizontal,
  Download,
  Check,
  Video,
} from 'lucide-react'
import { useDashboardTheme } from './dashboard-theme-context'
import { FilterPill } from './filter-pill'
import { DATE_RANGES, type DateRange } from '@/data/mockDashboard'

const PROPERTY_OPTIONS = [
  'All Properties (17)',
  'Aman Tokyo',
  'Six Senses Kyoto',
  'Bvlgari Bali',
  'Cheval Blanc Paris',
  'The Peninsula Hong Kong',
  'Rosewood São Paulo',
  'Explora Patagonia',
  'Ritz Paris',
  'St. Regis Maldives Vommuli',
]

const FILTER_GROUPS = [
  { label: 'Platform', options: ['Booking.com', 'Google', 'Tripadvisor', 'Expedia', 'Direct'] },
  { label: 'Language', options: ['English', 'Japanese', 'French', 'German', 'Spanish', 'Arabic'] },
  { label: 'Sentiment', options: ['Positive', 'Neutral', 'Negative'] },
]

export function DashboardHeader({
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  property,
  onPropertyChange,
  activeFilters,
  onToggleFilter,
  onOpenExportModal,
}: {
  search: string
  onSearchChange: (value: string) => void
  dateRange: DateRange
  onDateRangeChange: (value: DateRange) => void
  property: string
  onPropertyChange: (value: string) => void
  activeFilters: Set<string>
  onToggleFilter: (option: string) => void
  onOpenExportModal: () => void
}) {
  const { mode, setMode, showDemoGuides, toggleDemoGuides } = useDashboardTheme()
  const isEditorial = mode === 'editorial'

  const toggleGroup = (options: string[]) => {
    const allSelected = options.every((opt) => activeFilters.has(opt))
    options.forEach((opt) => {
      if (allSelected) {
        if (activeFilters.has(opt)) onToggleFilter(opt)
      } else {
        if (!activeFilters.has(opt)) onToggleFilter(opt)
      }
    })
  }

  const filtersValue =
    activeFilters.size > 0
      ? `${activeFilters.size} active`
      : 'Platform, Language, Sentiment'

  const optionRowClass = (active: boolean) =>
    `block w-full rounded-md px-2.5 py-1.5 text-left text-xs transition-colors duration-150 ${
      active
        ? isEditorial
          ? 'bg-zinc-100 font-semibold text-zinc-900'
          : 'bg-blue-50 text-blue-600 font-semibold'
        : isEditorial
          ? 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`

  return (
    <header
      className={
        isEditorial
          ? 'sticky top-0 z-30 flex flex-wrap items-center gap-3 border-b border-zinc-200/60 bg-zinc-50/90 px-8 py-4 backdrop-blur-sm'
          : 'sticky top-0 z-30 flex flex-wrap items-center gap-3 border-b border-gray-100 bg-[#f8f9fa]/90 px-8 py-4 backdrop-blur-sm'
      }
    >
      {/* Search */}
      <div className="relative w-full max-w-[220px] shrink-0">
        <Search
          className={`pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${
            isEditorial ? 'text-zinc-400' : 'text-gray-400'
          }`}
          strokeWidth={isEditorial ? 1.5 : 2}
          aria-hidden="true"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Reviews..."
          title="Searches guest name and review text in Unified Inbox"
          className={
            isEditorial
              ? 'w-full rounded-full border border-zinc-200/80 bg-white py-1.5 pr-3 pl-8 text-xs text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors duration-200 focus:border-zinc-400'
              : 'w-full rounded-full border border-gray-200 bg-white py-1.5 pr-3 pl-8 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors duration-200 focus:border-blue-400'
          }
        />
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterPill icon={Calendar} label="Date" value={dateRange}>
          {(close) => (
            <div className="space-y-0.5">
              {DATE_RANGES.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onDateRangeChange(option)
                    close()
                  }}
                  className={optionRowClass(option === dateRange)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </FilterPill>

        <FilterPill icon={Building2} label="Properties" value={property}>
          {(close) => (
            <div className="space-y-0.5 max-h-60 overflow-y-auto pr-1">
              {PROPERTY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onPropertyChange(option)
                    close()
                  }}
                  className={optionRowClass(option === property)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </FilterPill>

        <FilterPill icon={SlidersHorizontal} label="Filters" value={filtersValue}>
          {() => (
            <div className="w-72 space-y-3 p-1">
              {FILTER_GROUPS.map((group) => {
                const allSelected = group.options.every((opt) => activeFilters.has(opt))
                const someSelected = group.options.some((opt) => activeFilters.has(opt))

                return (
                  <div key={group.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p
                        className={
                          isEditorial
                            ? 'text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400'
                            : 'text-[10px] font-semibold uppercase tracking-wider text-gray-400'
                        }
                      >
                        {group.label}
                      </p>
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.options)}
                        title={`Select or deselect all ${group.label} options`}
                        className="flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <div
                          className={`flex h-3.5 w-3.5 items-center justify-center rounded border transition-colors ${
                            allSelected
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : someSelected
                                ? 'border-blue-400 bg-blue-100 text-blue-700'
                                : 'border-gray-300 bg-white text-transparent hover:border-gray-400'
                          }`}
                        >
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </div>
                        <span className="text-[10px] text-gray-500 hover:text-gray-700">
                          {allSelected ? 'Select All ✓' : 'Select All'}
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {group.options.map((option) => {
                        const active = activeFilters.has(option)
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => onToggleFilter(option)}
                            className={`rounded-md border px-2 py-1 text-[11px] transition-colors duration-150 ${
                              active
                                ? isEditorial
                                  ? 'border-zinc-900 bg-zinc-900 text-zinc-50 font-medium'
                                  : 'border-blue-600 bg-blue-600 text-white font-medium'
                                : isEditorial
                                  ? 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </FilterPill>
      </div>

      {/* Export + Demo Guides + theme switcher */}
      <div className="ml-auto flex items-center gap-2.5">
        <button
          type="button"
          onClick={toggleDemoGuides}
          title="Toggle Demo Presentation Overlay Banners"
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
            showDemoGuides
              ? 'border-amber-300 bg-amber-50/90 text-amber-900 shadow-2xs hover:bg-amber-100/80'
              : isEditorial
                ? 'border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50'
                : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Video className="h-3.5 w-3.5 text-amber-600" />
          <span>Demo Overlay {showDemoGuides ? '✓' : 'OFF'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenExportModal}
          className={
            isEditorial
              ? 'flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:bg-zinc-50 hover:border-zinc-300'
              : 'flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-800'
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key="export"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
              <span>Export Report</span>
            </motion.span>
          </AnimatePresence>
        </button>

        <div
          className={
            isEditorial
              ? 'flex items-center gap-0.5 rounded-full border border-zinc-200/80 bg-white p-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
              : 'flex items-center gap-0.5 rounded-full border border-gray-200 bg-white p-0.5 shadow-sm'
          }
        >
          <button
            type="button"
            onClick={() => setMode('editorial')}
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-200 ${
              isEditorial ? 'bg-zinc-900 text-zinc-50' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            Editorial
          </button>
          <button
            type="button"
            onClick={() => setMode('classic')}
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-200 ${
              !isEditorial ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-zinc-700'
            }`}
          >
            Classic
          </button>
        </div>
      </div>
    </header>
  )
}
