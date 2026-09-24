'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Check, BarChart3, MessageSquareText, Star, Smartphone, SlidersHorizontal } from 'lucide-react'
import { EASE } from '@/lib/views'
import {
  surveyBlockLibrary,
  surveyStageDefaults,
  SURVEY_STAGES,
  type SurveyBlockDef,
  type SurveyStage,
} from '@/data/mockDashboard'
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

const BLOCK_ICONS: Record<SurveyBlockDef['type'], typeof BarChart3> = {
  nps: BarChart3,
  text: MessageSquareText,
  rating: Star,
}

let instanceCounter = 0

export function SurveyStudioView() {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'

  const [stage, setStage] = useState<SurveyStage>('Pre-Stay')
  const [blocksByStage, setBlocksByStage] = useState<Record<SurveyStage, { instanceId: string; blockId: string }[]>>(
    () => {
      const initial = {} as Record<SurveyStage, { instanceId: string; blockId: string }[]>
      for (const s of SURVEY_STAGES) {
        initial[s] = surveyStageDefaults[s].map((blockId) => {
          instanceCounter += 1
          return { instanceId: `init-${instanceCounter}`, blockId }
        })
      }
      return initial
    },
  )

  const placedBlocks = blocksByStage[stage]
  const placedBlockIds = new Set(placedBlocks.map((b) => b.blockId))

  const addBlock = (blockId: string) => {
    if (placedBlockIds.has(blockId)) return
    instanceCounter += 1
    const instanceId = `blk-${instanceCounter}`
    setBlocksByStage((prev) => ({
      ...prev,
      [stage]: [...prev[stage], { instanceId, blockId }],
    }))
  }

  const removeBlock = (instanceId: string) => {
    setBlocksByStage((prev) => ({
      ...prev,
      [stage]: prev[stage].filter((b) => b.instanceId !== instanceId),
    }))
  }

  const cardClass = isEditorial
    ? 'rounded-lg border border-zinc-200/60 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
    : 'rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]'

  const labelClass = isEditorial
    ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400'
    : 'text-xs font-semibold uppercase tracking-wider text-gray-400'

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="mx-auto max-w-6xl px-8 py-10"
    >
      <motion.div variants={fadeUp}>
        <p className={labelClass}>Guest Feedback</p>
        <h1
          className={
            isEditorial
              ? 'mt-1.5 text-2xl font-light tracking-tight text-zinc-900'
              : 'mt-2 text-3xl font-light tracking-tight text-gray-900'
          }
        >
          Survey Studio
        </h1>
        <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
          Design and preview targeted guest surveys for every stage of the stay.
        </p>
      </motion.div>

      {/* Demo Presentation Overlay Banner */}
      <DemoGuideBanner
        className="mt-6"
        icon={SlidersHorizontal}
        moduleTitle="Guest Survey Builder (Pre-Stay, In-Stay & Post-Stay)"
        tag="Direct Feedback"
        description="Create automated feedback forms sent via SMS, Email, or QR codes in the guest room. Capture complaints during their stay so your team can fix issues before the guest posts a negative review online."
      />

      {/* Stage tabs */}
      <motion.div
        variants={fadeUp}
        className={
          isEditorial
            ? 'mt-8 inline-flex items-center gap-1 rounded-lg border border-zinc-200/60 bg-white p-1'
            : 'mt-8 inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-sm'
        }
      >
        {SURVEY_STAGES.map((s) => {
          const active = s === stage
          return (
            <button
              key={s}
              type="button"
              onClick={() => setStage(s)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                active
                  ? isEditorial
                    ? 'bg-zinc-900 text-zinc-50'
                    : 'rounded-full bg-blue-600 text-white'
                  : isEditorial
                    ? 'text-zinc-500 hover:text-zinc-900'
                    : 'rounded-full text-gray-500 hover:text-gray-900'
              }`}
            >
              {s}
            </button>
          )
        })}
      </motion.div>

      <motion.div variants={fadeUp} className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        {/* Left: block library */}
        <div className={`${cardClass} p-6`}>
          <p className={labelClass}>Survey Blocks</p>
          <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
            Click a block to add it to the {stage} flow.
          </p>

          <div className="mt-5 space-y-2.5">
            {surveyBlockLibrary.map((block) => {
              const Icon = BLOCK_ICONS[block.type]
              const isPlaced = placedBlockIds.has(block.id)
              return (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => addBlock(block.id)}
                  disabled={isPlaced}
                  title={isPlaced ? 'Already added to this stage' : undefined}
                  className={
                    isEditorial
                      ? `flex w-full items-center gap-3 rounded-lg border p-3.5 text-left transition-colors duration-200 ${
                          isPlaced
                            ? 'cursor-not-allowed border-zinc-200/60 bg-zinc-100/60 opacity-60'
                            : 'border-zinc-200/60 bg-zinc-50/50 hover:border-zinc-300 hover:bg-white'
                        }`
                      : `flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors duration-200 ${
                          isPlaced
                            ? 'cursor-not-allowed border-gray-100 bg-gray-100 opacity-60'
                            : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
                        }`
                  }
                >
                  <span
                    className={
                      isEditorial
                        ? 'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-200/80 bg-white text-zinc-500'
                        : 'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500'
                    }
                  >
                    <Icon className="h-4 w-4" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={isEditorial ? 'block text-xs font-semibold text-zinc-900' : 'block text-sm font-medium text-gray-900'}>
                      {block.label}
                    </span>
                    <span className={isEditorial ? 'mt-0.5 block truncate text-[11px] text-zinc-400' : 'mt-0.5 block truncate text-xs text-gray-400'}>
                      {isPlaced ? 'Already added to this stage' : block.description}
                    </span>
                  </span>
                  {isPlaced ? (
                    <Check
                      className={isEditorial ? 'h-3.5 w-3.5 shrink-0 text-zinc-400' : 'h-4 w-4 shrink-0 text-gray-400'}
                      strokeWidth={isEditorial ? 1.5 : 2}
                      aria-hidden="true"
                    />
                  ) : (
                    <Plus
                      className={isEditorial ? 'h-3.5 w-3.5 shrink-0 text-zinc-400' : 'h-4 w-4 shrink-0 text-gray-400'}
                      strokeWidth={isEditorial ? 1.5 : 2}
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right: phone preview */}
        <div className="flex flex-col items-center">
          <div
            className={
              isEditorial
                ? 'flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400'
                : 'flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400'
            }
          >
            <Smartphone className="h-3.5 w-3.5" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
            Live Preview
          </div>

          <div
            className={
              isEditorial
                ? 'mt-4 w-full max-w-[280px] rounded-[2rem] border border-zinc-200/80 bg-white p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                : 'mt-4 w-full max-w-[280px] rounded-[2.25rem] border border-gray-200 bg-white p-3 shadow-xl shadow-gray-200/60'
            }
          >
            <div
              className={
                isEditorial
                  ? 'flex min-h-[420px] flex-col rounded-[1.5rem] border border-zinc-100 bg-zinc-50/60 p-5'
                  : 'flex min-h-[440px] flex-col rounded-[1.75rem] border border-gray-100 bg-gray-50 p-5'
              }
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-300/60" aria-hidden="true" />
              <p className={isEditorial ? 'text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'text-[10px] font-semibold uppercase tracking-wider text-gray-400'}>
                {stage}
              </p>
              <h3 className={isEditorial ? 'mt-1 font-serif text-lg font-light text-zinc-900' : 'mt-1 text-lg font-semibold text-gray-900'}>
                How was your stay?
              </h3>

              <div className="mt-5 flex-1 space-y-4">
                <AnimatePresence initial={false}>
                  {placedBlocks.length === 0 && (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={isEditorial ? 'text-xs text-zinc-400' : 'text-sm text-gray-400'}
                    >
                      No blocks yet — add one from the library.
                    </motion.p>
                  )}
                  {placedBlocks.map((instance) => {
                    const block = surveyBlockLibrary.find((b) => b.id === instance.blockId)
                    if (!block) return null
                    return (
                      <motion.div
                        key={instance.instanceId}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="group relative"
                      >
                        <button
                          type="button"
                          onClick={() => removeBlock(instance.instanceId)}
                          aria-label={`Remove ${block.label}`}
                          className={
                            isEditorial
                              ? 'absolute -right-1.5 -top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100'
                              : 'absolute -right-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100'
                          }
                        >
                          <X className="h-2.5 w-2.5" strokeWidth={2} aria-hidden="true" />
                        </button>

                        <SurveyBlockPreview block={block} isEditorial={isEditorial} />
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              <button
                type="button"
                className={
                  isEditorial
                    ? 'mt-4 w-full rounded-lg bg-zinc-900 py-2.5 text-xs font-medium text-zinc-50'
                    : 'mt-4 w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white'
                }
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function SurveyBlockPreview({
  block,
  isEditorial,
}: {
  block: SurveyBlockDef
  isEditorial: boolean
}) {
  const questionClass = isEditorial
    ? 'text-xs font-medium text-zinc-800'
    : 'text-sm font-medium text-gray-800'

  if (block.type === 'nps') {
    return (
      <div>
        <p className={questionClass}>{block.description}</p>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className={
                isEditorial
                  ? 'flex h-5 flex-1 items-center justify-center rounded-sm bg-zinc-200/70 text-[9px] text-zinc-500'
                  : 'flex h-6 flex-1 items-center justify-center rounded bg-gray-200 text-[10px] text-gray-500'
              }
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (block.type === 'rating') {
    return (
      <div>
        <p className={questionClass}>{block.description}</p>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={isEditorial ? 'h-4 w-4 text-zinc-300' : 'h-5 w-5 text-gray-300'}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className={questionClass}>{block.description}</p>
      <div
        className={
          isEditorial
            ? 'mt-2 h-12 w-full rounded-md border border-zinc-200 bg-white'
            : 'mt-2 h-14 w-full rounded-lg border border-gray-200 bg-white'
        }
      />
    </div>
  )
}
