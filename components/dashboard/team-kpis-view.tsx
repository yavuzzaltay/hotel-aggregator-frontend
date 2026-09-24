'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { EASE } from '@/lib/views'
import { npsScore, teamGoals } from '@/data/mockDashboard'
import { useDashboardTheme } from './dashboard-theme-context'
import { DemoGuideBanner } from './demo-guide-banner'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export function TeamKpisView() {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'

  const labelClass = isEditorial
    ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400'
    : 'text-xs font-semibold uppercase tracking-wider text-gray-400'

  const cardClass = isEditorial
    ? 'rounded-lg border border-zinc-200/60 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
    : 'rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'

  const npsPosition = ((npsScore + 100) / 200) * 100

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="mx-auto max-w-6xl px-8 py-10"
    >
      <motion.div variants={fadeUp}>
        <p className={labelClass}>Executive Oversight</p>
        <h1
          className={
            isEditorial
              ? 'mt-1.5 text-2xl font-light tracking-tight text-zinc-900'
              : 'mt-2 text-3xl font-light tracking-tight text-gray-900'
          }
        >
          Team KPIs &amp; NPS
        </h1>
        <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
          Portfolio-wide loyalty and staff performance, tracked against goal.
        </p>
      </motion.div>

      {/* Demo Presentation Overlay Banner */}
      <DemoGuideBanner
        className="mt-6"
        icon={Award}
        moduleTitle="Staff Performance, Customer Satisfaction & Guest Loyalty"
        tag="Staff & Loyalty"
        description="Track your hotel's Net Promoter Score (NPS) to measure guest loyalty. Monitor key staff metrics such as response speed, guest relation scores, and task resolution rates to keep your team accountable and motivated."
      />

      {/* NPS gauge */}
      <motion.div variants={fadeUp} className={`mt-8 ${cardClass}`}>
        <p className={labelClass}>Net Promoter Score (NPS)</p>

        <div className="mt-6 flex items-end gap-4">
          <span
            className={
              isEditorial
                ? 'text-6xl font-extralight tracking-tighter text-zinc-900 tabular-nums'
                : 'text-6xl font-light tracking-tighter text-gray-900 tabular-nums'
            }
          >
            {npsScore > 0 ? '+' : ''}
            {npsScore.toFixed(1)}
          </span>
          <span
            className={
              isEditorial
                ? 'mb-2 rounded border border-emerald-200/60 bg-emerald-50/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-700/80'
                : 'mb-2 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600'
            }
          >
            Excellent
          </span>
        </div>

        <div className="relative mt-8">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-zinc-200 to-emerald-300" />
          <motion.div
            initial={{ left: '50%', opacity: 0 }}
            animate={{ left: `${npsPosition}%`, opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className={
              isEditorial
                ? 'absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-zinc-900 shadow-[0_1px_4px_rgba(0,0,0,0.25)]'
                : 'absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-blue-600 shadow-md'
            }
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className={isEditorial ? 'text-[10px] uppercase tracking-wider text-zinc-400' : 'text-xs text-gray-400'}>
            −100 · Detractor
          </span>
          <span className={isEditorial ? 'text-[10px] uppercase tracking-wider text-zinc-400' : 'text-xs text-gray-400'}>
            0
          </span>
          <span className={isEditorial ? 'text-[10px] uppercase tracking-wider text-zinc-400' : 'text-xs text-gray-400'}>
            +100 · Promoter
          </span>
        </div>
      </motion.div>

      {/* Goal cards */}
      <motion.div variants={fadeUp} className="mt-5">
        <p className={labelClass}>Staff Goals</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {teamGoals.map((goal, i) => (
            <motion.div
              key={goal.id}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
              className={
                isEditorial
                  ? 'rounded-lg border border-zinc-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
                  : 'rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
              }
            >
              <div className="flex items-center justify-between">
                <p className={isEditorial ? 'text-xs font-medium text-zinc-700' : 'text-sm font-medium text-gray-700'}>
                  {goal.label}
                </p>
                <span
                  className={
                    isEditorial
                      ? 'text-sm font-semibold tabular-nums text-zinc-900'
                      : 'text-base font-semibold tabular-nums text-gray-900'
                  }
                >
                  {goal.progress}%
                </span>
              </div>
              <div
                className={
                  isEditorial
                    ? 'mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-100'
                    : 'mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100'
                }
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.08 }}
                  className={
                    goal.progress >= 90
                      ? isEditorial
                        ? 'h-full rounded-full bg-emerald-700/70'
                        : 'h-full rounded-full bg-emerald-500'
                      : isEditorial
                        ? 'h-full rounded-full bg-zinc-900'
                        : 'h-full rounded-full bg-blue-600'
                  }
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
