'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/views'
import { dashboardSnapshots, type DateRange } from '@/data/mockDashboard'
import { DonutStat } from './donut-stat'
import { TrendLine } from './trend-line'
import { DemoGuideBanner } from './demo-guide-banner'
import { useDashboardTheme } from './dashboard-theme-context'
import { Info, Sparkles, Activity, Layers, TrendingUp } from 'lucide-react'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const mutedSourceColors: Record<string, string> = {
  booking: '#3f3f46',
  google: '#b45309',
  tripadvisor: '#047857',
}

export function OverviewView({
  dateRange = 'Last 30 Days',
}: {
  dateRange?: DateRange
}) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'
  const { donutStats, sources, griTrend } = dashboardSnapshots[dateRange]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="mx-auto max-w-6xl px-8 py-10"
    >
      <motion.div variants={fadeUp}>
        <p
          className={
            isEditorial
              ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400'
              : 'text-xs font-semibold uppercase tracking-wider text-gray-400'
          }
        >
          Executive Command Center
        </p>
        <h1
          className={
            isEditorial
              ? 'mt-1.5 text-2xl font-light tracking-tight text-zinc-900'
              : 'mt-2 text-3xl font-light tracking-tight text-gray-900'
          }
        >
          Overview
        </h1>
        <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
          Live pipeline metrics across every connected source · {dateRange}
        </p>
      </motion.div>

      {/* Demo Presentation Overlay Banner */}
      <DemoGuideBanner
        className="mt-6"
        icon={Activity}
        moduleTitle="Executive Overview & Hotel Command Center"
        tag="Live Portfolio Health"
        description="Welcome to your central hotel control panel! This dashboard automatically connects to your Booking.com, Google Reviews, Tripadvisor, and Expedia accounts. It tracks your overall Guest Rating Index™ (GRI), monitors how fast your team responds to reviews, and gives you a single 24/7 score for your entire hotel portfolio."
      />

      {/* Donut stats */}
      <motion.div
        variants={container}
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {donutStats.map((stat, i) => (
          <DonutStat key={stat.id} stat={stat} delay={i * 0.08} />
        ))}
      </motion.div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Sources Overview */}
        <motion.div
          variants={fadeUp}
          className={
            isEditorial
              ? 'rounded-lg border border-zinc-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] lg:col-span-2'
              : 'rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:col-span-2'
          }
        >
          <div className="flex items-center justify-between">
            <h2
              className={
                isEditorial
                  ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400'
                  : 'text-xs font-semibold uppercase tracking-wider text-gray-400'
              }
            >
              Sources Overview
            </h2>
            <Layers className="h-4 w-4 text-gray-400" />
          </div>
          <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
            Distribution of indexed reviews by platform
          </p>

          <div className="mt-3 rounded-lg bg-gray-50/80 p-2.5 text-[11px] text-gray-600 border border-gray-100">
            💡 <strong>Channel Breakdown:</strong> Shows which review websites your guests use most and your average star rating on each platform.
          </div>

          <div className="mt-5 space-y-5">
            {sources.map((source, i) => {
              const color = isEditorial
                ? (mutedSourceColors[source.id] || source.color)
                : source.color
              return (
                <div key={source.id}>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={isEditorial ? 'h-1.5 w-1.5 rounded-full' : 'h-2 w-2 rounded-full'}
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                      <span
                        className={
                          isEditorial
                            ? 'font-medium text-zinc-900'
                            : 'font-medium text-gray-900 text-sm'
                        }
                      >
                        {source.name}
                      </span>
                    </div>
                    <span
                      className={
                        isEditorial
                          ? 'tabular-nums text-zinc-400 text-xs'
                          : 'text-xs tabular-nums text-gray-400'
                      }
                    >
                      {source.reviews.toLocaleString()} · {source.rating}/{source.scale}
                    </span>
                  </div>
                  <div
                    className={
                      isEditorial
                        ? 'mt-2 h-0.5 w-full overflow-hidden rounded-full bg-zinc-100'
                        : 'mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100'
                    }
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${source.share}%` }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Index Evolution */}
        <motion.div
          variants={fadeUp}
          className={
            isEditorial
              ? 'rounded-lg border border-zinc-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] lg:col-span-3'
              : 'rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:col-span-3'
          }
        >
          <div className="flex items-center justify-between">
            <h2
              className={
                isEditorial
                  ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400'
                  : 'text-xs font-semibold uppercase tracking-wider text-gray-400'
              }
            >
              Index Evolution
            </h2>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
            GRI™ trend for {dateRange.toLowerCase()}
          </p>

          <div className="mt-3 rounded-lg bg-gray-50/80 p-2.5 text-[11px] text-gray-600 border border-gray-100">
            📈 <strong>GRI™ Trendline:</strong> Visualizes whether your hotel's overall guest satisfaction score is going up or down over time.
          </div>

          <div className="mt-5">
            <TrendLine data={griTrend} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
