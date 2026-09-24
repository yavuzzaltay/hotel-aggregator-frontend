'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Loader2, Send, Sparkles, Check, Star, ArrowRight, X } from 'lucide-react'
import { EASE } from '@/lib/views'
import {
  guestReviews,
  replyTones,
  replyLengths,
  generateAiReply,
  type GuestReview,
  type ReplyTone,
  type ReplyLength,
} from '@/data/mockDashboard'
import { InlineSelect } from './inline-select'
import { DemoGuideBanner } from './demo-guide-banner'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

import { useDashboardTheme } from './dashboard-theme-context'

const editorialSentimentClasses: Record<GuestReview['sentiment'], string> = {
  positive: 'bg-emerald-50/50 text-emerald-700/80 border border-emerald-200/50',
  neutral: 'bg-zinc-100/70 text-zinc-600 border border-zinc-200/50',
  negative: 'bg-rose-50/50 text-rose-700/80 border border-rose-200/50',
}

const classicSentimentClasses: Record<GuestReview['sentiment'], string> = {
  positive: 'bg-emerald-50 text-emerald-600',
  neutral: 'bg-gray-100 text-gray-500',
  negative: 'bg-rose-50 text-rose-600',
}

const mutedPlatformColors: Record<string, string> = {
  Google: '#b45309',
  'Booking.com': '#3f3f46',
  Tripadvisor: '#047857',
}

export function InboxView({ searchQuery = '' }: { searchQuery?: string }) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'
  const [expandedId, setExpandedId] = useState<string>(guestReviews[0].id)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const query = searchQuery.trim().toLowerCase()
  const filteredReviews = query
    ? guestReviews.filter(
        (review) =>
          review.guestName.toLowerCase().includes(query) ||
          review.text.toLowerCase().includes(query),
      )
    : guestReviews

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const clearSelection = () => setSelectedIds(new Set())

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="mx-auto max-w-6xl px-8 py-10 pb-28"
    >
      <motion.div variants={fadeUp}>
        <p className={isEditorial ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'text-xs font-semibold uppercase tracking-wider text-gray-400'}>
          Guest Relations
        </p>
        <h1 className={isEditorial ? 'mt-1.5 text-2xl font-light tracking-tight text-zinc-900' : 'mt-2 text-3xl font-light tracking-tight text-gray-900'}>
          Unified Inbox
        </h1>
        <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
          {query
            ? `${filteredReviews.length} of ${guestReviews.length} reviews match "${searchQuery.trim()}"`
            : `Every review, every platform, one queue · ${guestReviews.length} new`}
        </p>
      </motion.div>

      {/* Demo Presentation Overlay Banner */}
      <DemoGuideBanner
        className="mt-6"
        icon={Sparkles}
        moduleTitle="All-in-One Review Inbox & 1-Click AI Reply Engine"
        tag="Time-Saving Inbox"
        description="Stop logging into 10 different websites every morning! All guest reviews from Google, Booking.com, and Tripadvisor appear here in real time. Our AI automatically identifies VIP guests and writes professional, polite response drafts in seconds for your staff to approve."
      />

      {filteredReviews.length > 0 ? (
        <motion.div variants={container} className="mt-8 space-y-3">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isExpanded={expandedId === review.id}
              onToggle={() =>
                setExpandedId((current) => (current === review.id ? '' : review.id))
              }
              isSelected={selectedIds.has(review.id)}
              onToggleSelect={() => toggleSelected(review.id)}
            />
          ))}
        </motion.div>
      ) : (
        <motion.p
          variants={fadeUp}
          className={
            isEditorial
              ? 'mt-16 text-center text-xs text-zinc-400'
              : 'mt-16 text-center text-sm text-gray-400'
          }
        >
          No reviews match your search — try a different name or word.
        </motion.p>
      )}

      {/* Floating bulk-action bar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
          >
            <div
              className={
                isEditorial
                  ? 'flex items-center gap-4 rounded-full border border-zinc-200/80 bg-white/95 py-2 pr-2 pl-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md'
                  : 'flex items-center gap-4 rounded-full border border-gray-100 bg-white/95 py-2.5 pr-2.5 pl-5 shadow-xl shadow-gray-300/30 backdrop-blur-md'
              }
            >
              <span
                className={
                  isEditorial
                    ? 'text-xs font-medium text-zinc-700'
                    : 'text-sm font-medium text-gray-700'
                }
              >
                {selectedIds.size} {selectedIds.size === 1 ? 'Review' : 'Reviews'} Selected
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={clearSelection}
                  aria-label="Clear selection"
                  className={
                    isEditorial
                      ? 'flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-700'
                      : 'flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700'
                  }
                >
                  <X className="h-3.5 w-3.5" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={
                    isEditorial
                      ? 'flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-50 transition-colors duration-200 hover:bg-zinc-800'
                      : 'flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-blue-700'
                  }
                >
                  Bulk Reply
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function CrmBadgePill({
  badge,
  isEditorial,
}: {
  badge: NonNullable<GuestReview['crmBadge']>
  isEditorial: boolean
}) {
  if (badge.tier === 'vip') {
    return (
      <span
        className={
          isEditorial
            ? 'inline-flex shrink-0 items-center gap-1 rounded border border-amber-200/60 bg-amber-50/50 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-amber-700/80'
            : 'inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-amber-600'
        }
      >
        <Star className="h-2.5 w-2.5 fill-current" strokeWidth={0} aria-hidden="true" />
        {badge.label}
      </span>
    )
  }

  return (
    <span
      className={
        isEditorial
          ? 'inline-flex shrink-0 items-center rounded border border-zinc-200/70 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-zinc-500'
          : 'inline-flex shrink-0 items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium tracking-wide text-gray-500'
      }
    >
      {badge.label}
    </span>
  )
}

function ReviewCard({
  review,
  isExpanded,
  onToggle,
  isSelected,
  onToggleSelect,
}: {
  review: GuestReview
  isExpanded: boolean
  onToggle: () => void
  isSelected: boolean
  onToggleSelect: () => void
}) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'
  const [tone, setTone] = useState<ReplyTone>('Professional')
  const [length, setLength] = useState<ReplyLength>('Standard')
  const [aiContext, setAiContext] = useState('')
  const [reply, setReply] = useState(() => generateAiReply(review, 'Professional', 'Standard'))
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setIsSent(false)
    window.setTimeout(() => {
      setReply(generateAiReply(review, tone, length, aiContext))
      setIsGenerating(false)
    }, 700)
  }

  const handleSend = () => {
    setIsSent(true)
    window.setTimeout(() => setIsSent(false), 2500)
  }

  const platformDotColor = isEditorial
    ? (mutedPlatformColors[review.platform] || review.platformColor)
    : review.platformColor

  const sentimentClass = isEditorial
    ? editorialSentimentClasses[review.sentiment]
    : classicSentimentClasses[review.sentiment]

  return (
    <motion.div
      layout
      variants={fadeUp}
      className={
        isEditorial
          ? `overflow-hidden rounded-lg border bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors duration-200 ${
              isSelected ? 'border-zinc-400' : 'border-zinc-200/60'
            }`
          : `overflow-hidden rounded-2xl border bg-white shadow-[0_2px_12px_rgb(0,0,0,0.03)] transition-colors duration-200 ${
              isSelected ? 'border-blue-300' : 'border-gray-100'
            }`
      }
    >
      <div
        className={
          isEditorial
            ? 'flex w-full items-start gap-3 p-5 text-left transition-colors duration-200 hover:bg-zinc-50/60'
            : 'flex w-full items-start gap-3 p-6 text-left transition-colors duration-200 hover:bg-gray-50'
        }
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleSelect()
          }}
          aria-pressed={isSelected}
          aria-label={isSelected ? 'Deselect review' : 'Select review'}
          className={
            isEditorial
              ? `mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors duration-150 ${
                  isSelected ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300 hover:border-zinc-500'
                }`
              : `mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors duration-150 ${
                  isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 hover:border-gray-400'
                }`
          }
        >
          {isSelected && <Check className="h-3 w-3 text-white" strokeWidth={2.5} aria-hidden="true" />}
        </button>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          className="flex min-w-0 flex-1 items-start gap-4 text-left"
        >
          <span
            className={isEditorial ? 'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full' : 'mt-1.5 h-2 w-2 shrink-0 rounded-full'}
            style={{ backgroundColor: platformDotColor }}
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className={isEditorial ? 'text-xs font-semibold text-zinc-900' : 'text-sm font-medium text-gray-900'}>
                {review.guestName}
              </span>
              {review.crmBadge && <CrmBadgePill badge={review.crmBadge} isEditorial={isEditorial} />}
              <span className="text-xs text-zinc-400">via {review.platform}</span>
              <span className="text-xs tabular-nums text-zinc-400">
                · {review.score}/{review.scale}
              </span>
              <span className="text-xs text-zinc-400">· {review.date}</span>
              <span
                className={
                  isEditorial
                    ? `ml-auto hidden shrink-0 rounded px-2 py-0.5 text-[10px] font-medium tracking-wide sm:inline-block ${sentimentClass}`
                    : `ml-auto hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider sm:inline-block ${sentimentClass}`
                }
              >
                {review.sentiment}
              </span>
            </div>
            <p
              className={
                isEditorial
                  ? `mt-1.5 text-xs leading-relaxed text-zinc-500 ${isExpanded ? '' : 'line-clamp-1'}`
                  : `mt-2 text-sm leading-relaxed text-gray-500 ${isExpanded ? '' : 'line-clamp-1'}`
              }
            >
              {review.text}
            </p>
          </div>
          <ChevronDown
            strokeWidth={isEditorial ? 1.5 : 2}
            className={`mt-1 h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div
              className={
                isEditorial
                  ? 'border-t border-zinc-200/60 bg-zinc-50/50 p-5'
                  : 'border-t border-blue-100 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-white p-6'
              }
            >
              <div className="flex items-center gap-2">
                <Sparkles className={isEditorial ? 'h-3.5 w-3.5 text-zinc-600' : 'h-3.5 w-3.5 text-blue-500'} strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
                <span className={isEditorial ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500' : 'text-xs font-semibold uppercase tracking-wider text-blue-600'}>
                  AI Response Module
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-xs">
                <InlineSelect
                  label="Tone"
                  value={tone}
                  options={replyTones}
                  onChange={(v) => setTone(v as ReplyTone)}
                />
                <InlineSelect
                  label="Length"
                  value={length}
                  options={replyLengths}
                  onChange={(v) => setLength(v as ReplyLength)}
                />
              </div>

              <div className="mt-4">
                <label className={isEditorial ? 'mb-1.5 block text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-400'}>
                  Add Context for AI
                </label>
                <input
                  type="text"
                  value={aiContext}
                  onChange={(e) => setAiContext(e.target.value)}
                  placeholder="e.g., 'Mention we gave them a free late checkout'"
                  className={
                    isEditorial
                      ? 'w-full rounded-lg border border-zinc-200/80 bg-white px-3 py-2 text-xs text-zinc-800 placeholder:text-zinc-400 outline-none transition-colors duration-200 focus:border-zinc-400'
                      : 'w-full rounded-lg border border-blue-100 bg-white/80 px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-colors duration-200 focus:border-blue-300 focus:bg-white'
                  }
                />
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between">
                  <label className={isEditorial ? 'text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'text-[10px] font-semibold uppercase tracking-wider text-gray-400'}>
                    Drafted Response
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={
                      isEditorial
                        ? 'flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:bg-zinc-50 disabled:opacity-50'
                        : 'flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-105 disabled:opacity-60'
                    }
                  >
                    {isGenerating ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
                    )}
                    Generate AI Response
                  </button>
                </div>
                <textarea
                  value={isGenerating ? 'Drafting response…' : reply}
                  onChange={(e) => setReply(e.target.value)}
                  readOnly={isGenerating}
                  rows={isEditorial ? 5 : 6}
                  className={
                    isEditorial
                      ? 'w-full resize-none rounded-lg border border-zinc-200/80 bg-white p-3.5 text-xs leading-relaxed text-zinc-800 outline-none transition-colors duration-200 focus:border-zinc-400'
                      : 'w-full resize-none rounded-xl border border-blue-100 bg-white/80 p-4 text-sm leading-relaxed text-gray-700 outline-none transition-colors duration-200 focus:border-blue-300 focus:bg-white'
                  }
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isGenerating || isSent}
                  className={
                    isEditorial
                      ? 'flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-50 shadow-sm transition-all duration-200 hover:bg-zinc-800 disabled:opacity-60'
                      : 'flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-gray-800 disabled:opacity-70'
                  }
                >
                  {isSent ? (
                    <>
                      <Check className="h-3.5 w-3.5" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
                      Sent
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
