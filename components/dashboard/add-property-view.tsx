'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link2, Sparkles, Check, ArrowRight, CheckSquare } from 'lucide-react'
import { EASE } from '@/lib/views'
import { Toggle } from './toggle'
import { useDashboardTheme } from './dashboard-theme-context'
import { DemoGuideBanner } from './demo-guide-banner'

type WizardStep = 'form' | 'loading' | 'success'

const LOADING_PHASES = [
  'Establishing secure connection…',
  'Scraping historical review data…',
  'Connecting OTA APIs & Webhooks…',
  'Running Semantic NLP models…',
  'Calibrating Global Review Index™…',
]

const SOURCES = [
  { id: 'google', label: 'Google Reviews', color: '#b45309' },
  { id: 'booking', label: 'Booking.com', color: '#2563eb' },
  { id: 'tripadvisor', label: 'Tripadvisor', color: '#10b981' },
  { id: 'expedia', label: 'Expedia Group', color: '#eab308' },
  { id: 'agoda', label: 'Agoda', color: '#8b5cf6' },
  { id: 'hotelscom', label: 'Hotels.com', color: '#dc2626' },
  { id: 'surveys', label: 'Direct Guest Surveys', color: '#06b6d4' },
  { id: 'xiaohongshu', label: 'XiaoHongShu (RED)', color: '#f43f5e' },
  { id: 'tablecheck', label: 'OpenTable / Dining', color: '#f97316' },
  { id: 'trustpilot', label: 'Trustpilot', color: '#059669' },
  { id: 'lhw', label: 'LHW Direct Member', color: '#6366f1' },
] as const

type SourceId = (typeof SOURCES)[number]['id']

export function AddPropertyView({ onComplete }: { onComplete: () => void }) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'
  const [step, setStep] = useState<WizardStep>('form')
  const [propertyName, setPropertyName] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [sources, setSources] = useState<Record<SourceId, boolean>>({
    google: true,
    booking: true,
    tripadvisor: true,
    expedia: true,
    agoda: false,
    hotelscom: true,
    surveys: true,
    xiaohongshu: false,
    tablecheck: true,
    trustpilot: false,
    lhw: true,
  })
  const [phaseIndex, setPhaseIndex] = useState(0)

  useEffect(() => {
    if (step !== 'loading') return

    if (phaseIndex >= LOADING_PHASES.length - 1) {
      const timeout = window.setTimeout(() => setStep('success'), 1500)
      return () => window.clearTimeout(timeout)
    }

    const timeout = window.setTimeout(() => setPhaseIndex((i) => i + 1), 1500)
    return () => window.clearTimeout(timeout)
  }, [step, phaseIndex])

  const isValid = propertyName.trim().length > 0 && websiteUrl.trim().length > 0
  const activeSourcesCount = Object.values(sources).filter(Boolean).length

  const toggleAllSources = (enable: boolean) => {
    const next = { ...sources }
    SOURCES.forEach((s) => {
      next[s.id] = enable
    })
    setSources(next)
  }

  const handleInitialize = (e: FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setPhaseIndex(0)
    setStep('loading')
  }

  const handleReset = () => {
    setStep('form')
    setPhaseIndex(0)
  }

  return (
    <div className="mx-auto flex min-h-[calc(100svh-2rem)] max-w-2xl items-center px-6 py-8">
      <div
        className={
          isEditorial
            ? 'w-full overflow-hidden rounded-lg border border-zinc-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] sm:p-8'
            : 'w-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8'
        }
      >
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div
                className={
                  isEditorial
                    ? 'flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-100 text-zinc-900'
                    : 'flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50'
                }
              >
                <Link2 className={isEditorial ? 'h-4 w-4 text-zinc-900' : 'h-5 w-5 text-blue-600'} strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
              </div>
              <p className={isEditorial ? 'mt-4 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400'}>
                Pipeline Integration
              </p>
              <h1 className={isEditorial ? 'mt-1 text-2xl font-light tracking-tight text-zinc-900' : 'mt-1 text-3xl font-light tracking-tight text-gray-900'}>
                Initialize Property
              </h1>
              <p className={isEditorial ? 'mt-1 text-xs leading-relaxed text-zinc-500' : 'mt-1 text-sm leading-relaxed text-gray-500'}>
                Connect a property to the Hotel Intelligence OS to begin AI sentiment aggregation.
              </p>

              {/* Demo Presentation Overlay Banner */}
              <DemoGuideBanner
                className="mt-3"
                icon={Link2}
                moduleTitle="Connect a New Hotel Property"
                tag="Instant Connection"
                description="Add a new hotel property to your account in under 2 minutes. Enter your hotel name and connect to Google, Booking.com, Tripadvisor, and 11 major travel platforms to start gathering feedback immediately."
              />

              <form onSubmit={handleInitialize} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="propertyName"
                      className={isEditorial ? 'mb-1 block text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400'}
                    >
                      Property Name
                    </label>
                    <input
                      id="propertyName"
                      type="text"
                      required
                      value={propertyName}
                      onChange={(e) => setPropertyName(e.target.value)}
                      placeholder="Aman Tokyo"
                      className={
                        isEditorial
                          ? 'w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs text-zinc-900 placeholder:text-zinc-300 outline-none transition-all duration-200 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400'
                          : 'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50'
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="websiteUrl"
                      className={isEditorial ? 'mb-1 block text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400'}
                    >
                      Official Website URL
                    </label>
                    <input
                      id="websiteUrl"
                      type="url"
                      required
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://www.amanresorts.com/tokyo"
                      className={
                        isEditorial
                          ? 'w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs text-zinc-900 placeholder:text-zinc-300 outline-none transition-all duration-200 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400'
                          : 'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50'
                      }
                    />
                  </div>
                </div>

                {/* Data Sources Header & Select All */}
                <div className="border-t border-zinc-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className={isEditorial ? 'text-xs font-semibold text-zinc-900' : 'text-sm font-semibold text-gray-900'}>
                        Connect Data Sources ({activeSourcesCount}/{SOURCES.length})
                      </p>
                      <span className="text-[11px] text-gray-400">Select platforms for real-time indexing</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleAllSources(activeSourcesCount < SOURCES.length)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <CheckSquare className="h-3.5 w-3.5" />
                      {activeSourcesCount === SOURCES.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>

                  {/* Clean 2-column grid without ugly scrollbars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SOURCES.map((source) => (
                      <div
                        key={source.id}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 border transition-colors ${
                          sources[source.id]
                            ? isEditorial
                              ? 'border-zinc-200 bg-zinc-50/60'
                              : 'border-blue-100 bg-blue-50/30'
                            : 'border-gray-100 bg-white opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: source.color }}
                            aria-hidden="true"
                          />
                          <span className={isEditorial ? 'text-xs text-zinc-800 font-medium truncate' : 'text-xs text-gray-800 font-medium truncate'}>
                            {source.label}
                          </span>
                        </div>
                        <Toggle
                          checked={sources[source.id]}
                          onChange={(checked) =>
                            setSources((s) => ({ ...s, [source.id]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className={
                    isEditorial
                      ? 'flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 text-xs font-medium text-zinc-50 shadow-sm transition-all duration-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 mt-6'
                      : 'flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 mt-6'
                  }
                >
                  <Sparkles className="h-4 w-4" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
                  Initialize AI Pipeline
                </button>
              </form>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex flex-col items-center py-6 text-center"
            >
              <div className="relative flex h-16 w-16 items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="h-14 w-14 animate-spin text-zinc-900"
                  style={{ animationDuration: '2s' }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#f4f4f5"
                    strokeWidth="5"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="264"
                    strokeDashoffset="180"
                  />
                </svg>
                <Sparkles
                  className="absolute h-5 w-5 text-zinc-800"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>

              <p className="mt-5 text-xs font-semibold text-zinc-900">
                Initializing {propertyName || 'your property'}
              </p>

              <div className="mt-3 h-5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={phaseIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="text-xs text-zinc-500"
                  >
                    {LOADING_PHASES[phaseIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-5 h-0.5 w-full max-w-[200px] overflow-hidden rounded-full bg-zinc-100">
                <motion.div
                  className="h-full rounded-full bg-zinc-900"
                  animate={{
                    width: `${((phaseIndex + 1) / LOADING_PHASES.length) * 100}%`,
                  }}
                  transition={{ duration: 1.1, ease: EASE }}
                />
              </div>
              <p className="mt-3 text-[10px] font-medium tracking-wider text-zinc-400 uppercase">
                Step {phaseIndex + 1} of {LOADING_PHASES.length}
              </p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex flex-col items-center py-4 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200/60 bg-emerald-50/50"
              >
                <Check
                  className="h-6 w-6 text-emerald-700/80"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </motion.div>

              <h2 className="mt-5 text-xl font-light tracking-tight text-zinc-900">
                Integration Complete
              </h2>
              <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-zinc-500">
                Pipeline is active with {activeSourcesCount} data sources — {propertyName || 'your property'} will
                begin appearing in Overview shortly.
              </p>

              <button
                type="button"
                onClick={onComplete}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 text-xs font-medium text-zinc-50 shadow-sm transition-colors duration-200 hover:bg-zinc-800"
              >
                Go to Overview
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="mt-3 text-xs font-medium text-zinc-400 transition-colors duration-200 hover:text-zinc-700"
              >
                Add another property
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
