'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Video, EyeOff, Sparkles, LucideIcon } from 'lucide-react'
import { useDashboardTheme } from './dashboard-theme-context'
import { EASE } from '@/lib/views'

interface DemoGuideBannerProps {
  icon?: LucideIcon
  moduleTitle: string
  tag: string
  description: string
  className?: string
}

export function DemoGuideBanner({
  icon: Icon = Video,
  moduleTitle,
  tag,
  description,
  className = '',
}: DemoGuideBannerProps) {
  const { showDemoGuides, toggleDemoGuides, mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'

  if (!showDemoGuides) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: EASE }}
        className={`relative overflow-hidden rounded-xl border-2 border-dashed ${
          isEditorial
            ? 'border-amber-300/80 bg-amber-50/40 text-amber-950 p-4'
            : 'border-amber-400/90 bg-gradient-to-r from-amber-50 via-orange-50/40 to-yellow-50/30 text-amber-950 p-4 shadow-sm'
        } ${className}`}
      >
        {/* Top Watermark Badge */}
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded bg-amber-200/80 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-900">
              <Video className="h-3 w-3" />
              🎬 DEMO PRESENTATION OVERLAY
            </span>
            <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800 uppercase">
              {tag}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleDemoGuides}
            title="Hide video demo guides"
            className="flex items-center gap-1.5 rounded-md bg-amber-200/50 hover:bg-amber-200 px-2 py-0.5 text-[10px] font-medium text-amber-900 transition-colors"
          >
            <EyeOff className="h-3 w-3" />
            <span>Hide Overlay</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-amber-200/70 p-2 text-amber-900 shrink-0 mt-0.5">
            <Icon className="h-4 w-4" />
          </div>
          <div className="text-xs space-y-1">
            <h4 className="font-semibold text-amber-950">{moduleTitle}</h4>
            <p className="text-amber-900/80 leading-relaxed font-sans">{description}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
