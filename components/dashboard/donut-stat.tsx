'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/views'
import type { DonutStatData } from '@/data/mockDashboard'

const RADIUS = 44
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

import { useDashboardTheme } from './dashboard-theme-context'

const mutedStatColors: Record<string, string> = {
  gri: '#047857',       // Muted Sage
  reviews: '#3f3f46',   // Muted Charcoal
  sentiment: '#be123c', // Muted Rose
  response: '#475569',  // Muted Slate
}

export function DonutStat({ stat, delay = 0 }: { stat: DonutStatData; delay?: number }) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'
  const offset = CIRCUMFERENCE - (Math.min(stat.value, 100) / 100) * CIRCUMFERENCE
  const strokeColor = isEditorial ? (mutedStatColors[stat.id] || stat.color) : stat.color

  if (!isEditorial) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay }}
        className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              className="stroke-gray-100"
              strokeWidth="6"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke={strokeColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.1, ease: EASE, delay: delay + 0.15 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-medium tracking-tight text-gray-900 tabular-nums">
              {stat.displayValue}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {stat.label}
          </p>
          <p className="mt-1.5 truncate text-xs text-gray-500">{stat.caption}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className="flex flex-col justify-between rounded-lg border border-zinc-200/60 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
          {stat.label}
        </p>
        <div className="relative h-12 w-12 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              className="stroke-zinc-100"
              strokeWidth="5"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke={strokeColor}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.1, ease: EASE, delay: delay + 0.15 }}
            />
          </svg>
        </div>
      </div>

      <div className="mt-4">
        <span className="text-3xl font-extralight tracking-tighter text-zinc-900 tabular-nums">
          {stat.displayValue}
        </span>
        <p className="mt-1 text-xs text-zinc-500">{stat.caption}</p>
      </div>
    </motion.div>
  )
}
