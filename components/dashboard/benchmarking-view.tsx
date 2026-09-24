'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { EASE } from '@/lib/views'
import {
  allBenchmarkProperties,
  defaultBenchmarkPropertyIds,
  type BenchmarkProperty,
} from '@/data/mockDashboard'
import { useDashboardTheme } from './dashboard-theme-context'
import { FilterPill } from './filter-pill'
import { DemoGuideBanner } from './demo-guide-banner'
import { Building2 } from 'lucide-react'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const PLATFORM_SEGMENTS: {
  key: keyof BenchmarkProperty['platformShare']
  label: string
  editorialColor: string
  classicColor: string
}[] = [
  { key: 'booking', label: 'Booking.com', editorialColor: '#3f3f46', classicColor: '#2563eb' },
  { key: 'google', label: 'Google', editorialColor: '#b45309', classicColor: '#f59e0b' },
  { key: 'tripadvisor', label: 'Tripadvisor', editorialColor: '#047857', classicColor: '#10b981' },
]

export function BenchmarkingView() {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'

  const [selectedIds, setSelectedIds] = useState<string[]>(defaultBenchmarkPropertyIds)
  const properties = selectedIds
    .map((id) => allBenchmarkProperties.find((p) => p.id === id))
    .filter((p): p is BenchmarkProperty => Boolean(p))
  const availableToAdd = allBenchmarkProperties.filter((p) => !selectedIds.includes(p.id))

  const addProperty = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const removeProperty = (id: string) => {
    setSelectedIds((prev) => (prev.length > 1 ? prev.filter((p) => p !== id) : prev))
  }

  const rowLabelClass = isEditorial
    ? 'flex items-center border-b border-zinc-200/60 px-4 py-5 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400'
    : 'flex items-center border-b border-gray-100 px-4 py-6 text-xs font-semibold uppercase tracking-wider text-gray-400'

  const cellClass = isEditorial
    ? 'flex flex-col items-center justify-center border-b border-zinc-200/60 px-4 py-5 text-center'
    : 'flex flex-col items-center justify-center border-b border-gray-100 px-4 py-6 text-center'

  const headerCellClass = isEditorial
    ? 'flex items-center justify-center border-b border-zinc-200/60 px-4 py-5 text-center'
    : 'flex items-center justify-center border-b border-gray-100 px-4 py-6 text-center'

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="mx-auto max-w-6xl px-8 py-10"
    >
      <motion.div variants={fadeUp} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            className={
              isEditorial
                ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400'
                : 'text-xs font-semibold uppercase tracking-wider text-gray-400'
            }
          >
            Portfolio Analysis
          </p>
          <h1
            className={
              isEditorial
                ? 'mt-1.5 text-2xl font-light tracking-tight text-zinc-900'
                : 'mt-2 text-3xl font-light tracking-tight text-gray-900'
            }
          >
            Portfolio Benchmarking
          </h1>
          <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
            Compare performance across your selected properties.
          </p>
        </div>

        <FilterPill icon={Plus} label="Add" value={`${properties.length} Properties`}>
          {() => (
            <div className="w-60 space-y-0.5">
              {availableToAdd.length === 0 ? (
                <p
                  className={
                    isEditorial
                      ? 'px-2.5 py-1.5 text-[11px] text-zinc-400'
                      : 'px-2.5 py-1.5 text-xs text-gray-400'
                  }
                >
                  All properties added.
                </p>
              ) : (
                availableToAdd.map((property) => (
                  <button
                    key={property.id}
                    type="button"
                    onClick={() => addProperty(property.id)}
                    className={
                      isEditorial
                        ? 'flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs text-zinc-600 transition-colors duration-150 hover:bg-zinc-50 hover:text-zinc-900'
                        : 'flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-sm text-gray-600 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900'
                    }
                  >
                    {property.name}
                    <Plus className="h-3 w-3 shrink-0 text-zinc-400" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                ))
              )}
            </div>
          )}
        </FilterPill>
      </motion.div>

      {/* Demo Presentation Overlay Banner */}
      <DemoGuideBanner
        className="mt-6"
        icon={Building2}
        moduleTitle="Multi-Hotel & Competitor Performance Comparison"
        tag="Portfolio Analytics"
        description="Compare your properties side-by-side or benchmark against local competitor hotels. See which property leads in guest satisfaction, review volume, and department scores to make smarter executive decisions."
      />

      <motion.div
        variants={fadeUp}
        className={
          isEditorial
            ? 'mt-8 overflow-x-auto rounded-lg border border-zinc-200/60 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
            : 'mt-8 overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
        }
      >
        <div
          className="grid min-w-[720px]"
          style={{ gridTemplateColumns: `160px repeat(${properties.length}, minmax(160px, 1fr))` }}
        >
          {/* Header row */}
          <div className={headerCellClass} />
          {properties.map((property) => (
            <div key={property.id} className={`${headerCellClass} relative gap-1`}>
              {properties.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProperty(property.id)}
                  aria-label={`Remove ${property.name}`}
                  className={
                    isEditorial
                      ? 'absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-zinc-300 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-600'
                      : 'absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-gray-300 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-600'
                  }
                >
                  <X className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                </button>
              )}
              <span
                className={
                  isEditorial
                    ? 'text-sm font-semibold text-zinc-900'
                    : 'text-base font-semibold text-gray-900'
                }
              >
                {property.name}
              </span>
            </div>
          ))}

          {/* GRI Score */}
          <div className={rowLabelClass}>GRI™ Score</div>
          {properties.map((property) => (
            <div key={property.id} className={cellClass}>
              <span
                className={
                  isEditorial
                    ? 'text-4xl font-extralight tracking-tighter text-zinc-900 tabular-nums'
                    : 'text-4xl font-light tracking-tighter text-gray-900 tabular-nums'
                }
              >
                {property.griScore.toFixed(1)}%
              </span>
            </div>
          ))}

          {/* Total Reviews */}
          <div className={rowLabelClass}>Total Reviews</div>
          {properties.map((property) => (
            <div key={property.id} className={cellClass}>
              <span
                className={
                  isEditorial
                    ? 'text-lg font-medium text-zinc-900 tabular-nums'
                    : 'text-xl font-medium text-gray-900 tabular-nums'
                }
              >
                {property.totalReviews.toLocaleString()}
              </span>
            </div>
          ))}

          {/* Top Positive Driver */}
          <div className={rowLabelClass}>Top Positive Driver</div>
          {properties.map((property) => (
            <div key={property.id} className={cellClass}>
              <span
                className={
                  isEditorial
                    ? 'rounded border border-emerald-200/60 bg-emerald-50/50 px-2 py-1 font-mono text-[11px] text-emerald-700/80'
                    : 'rounded-md border border-emerald-100 bg-emerald-50 px-2.5 py-1 font-mono text-xs text-emerald-600'
                }
              >
                [{property.topPositiveDriver}]
              </span>
            </div>
          ))}

          {/* Top Negative Driver */}
          <div className={rowLabelClass}>Top Negative Driver</div>
          {properties.map((property) => (
            <div key={property.id} className={cellClass}>
              <span
                className={
                  isEditorial
                    ? 'rounded border border-rose-200/60 bg-rose-50/50 px-2 py-1 font-mono text-[11px] text-rose-700/80'
                    : 'rounded-md border border-rose-100 bg-rose-50 px-2.5 py-1 font-mono text-xs text-rose-600'
                }
              >
                [{property.topNegativeDriver}]
              </span>
            </div>
          ))}

          {/* Platform Share */}
          <div className={`${rowLabelClass} border-b-0`}>Platform Share</div>
          {properties.map((property) => (
            <div key={property.id} className={`${cellClass} border-b-0`}>
              <div className="w-full max-w-[140px]">
                <div
                  className={
                    isEditorial
                      ? 'flex h-1 w-full overflow-hidden rounded-full bg-zinc-100'
                      : 'flex h-1.5 w-full overflow-hidden rounded-full bg-gray-100'
                  }
                >
                  {PLATFORM_SEGMENTS.map((segment) => (
                    <motion.div
                      key={segment.key}
                      initial={{ width: 0 }}
                      animate={{ width: `${property.platformShare[segment.key]}%` }}
                      transition={{ duration: 0.8, ease: EASE }}
                      style={{
                        backgroundColor: isEditorial
                          ? segment.editorialColor
                          : segment.classicColor,
                      }}
                      className="h-full first:rounded-l-full last:rounded-r-full"
                    />
                  ))}
                </div>
                <p
                  className={
                    isEditorial
                      ? 'mt-2 text-[10px] tabular-nums text-zinc-400'
                      : 'mt-2 text-[11px] tabular-nums text-gray-400'
                  }
                >
                  {property.platformShare.booking}% · {property.platformShare.google}% ·{' '}
                  {property.platformShare.tripadvisor}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-4 flex flex-wrap items-center gap-4"
      >
        {PLATFORM_SEGMENTS.map((segment) => (
          <div key={segment.key} className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: isEditorial ? segment.editorialColor : segment.classicColor,
              }}
              aria-hidden="true"
            />
            <span
              className={
                isEditorial
                  ? 'text-[10px] uppercase tracking-[0.08em] text-zinc-400'
                  : 'text-xs text-gray-400'
              }
            >
              {segment.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
