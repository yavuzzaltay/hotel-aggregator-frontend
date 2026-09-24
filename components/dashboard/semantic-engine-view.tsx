'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/views'
import {
  negativeCategories,
  positiveCategories,
  type SemanticCategory,
} from '@/data/mockDashboard'
import { DemoGuideBanner } from './demo-guide-banner'
import { useDashboardTheme } from './dashboard-theme-context'
import { Sparkles, Brain, MessageSquareCode } from 'lucide-react'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

interface CloudWord {
  text: string
  weight: number
  tone: 'positive' | 'negative'
  categoryId: string
}

function buildCategoryWords(categories: SemanticCategory[], tone: 'positive' | 'negative'): CloudWord[] {
  const words: CloudWord[] = []
  for (const category of categories) {
    words.push({ text: category.label, weight: category.mentions, tone, categoryId: category.id })
    for (const tag of category.tags) {
      words.push({ text: tag, weight: Math.round(category.mentions * 0.55), tone, categoryId: category.id })
    }
  }
  return words
}

const negativeCloudWords = buildCategoryWords(negativeCategories, 'negative')
const positiveCloudWords = buildCategoryWords(positiveCategories, 'positive')

function wordColor(tone: 'positive' | 'negative', ratio: number) {
  const hue = tone === 'negative' ? 353 : 153
  const saturation = 42 + ratio * 46
  const lightness = 66 - ratio * 32
  return `hsl(${hue} ${saturation}% ${lightness}%)`
}

function WordCloud({
  words,
  isEditorial,
  onHoverCategory,
}: {
  words: CloudWord[]
  isEditorial: boolean
  onHoverCategory: (categoryId: string | null) => void
}) {
  const weights = words.map((w) => w.weight)
  const minWeight = Math.min(...weights)
  const maxWeight = Math.max(...weights)

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 px-2 py-5">
      {words.map((word, i) => {
        const ratio = maxWeight === minWeight ? 1 : (word.weight - minWeight) / (maxWeight - minWeight)
        const fontSize = 13 + ratio * 31
        const color = wordColor(word.tone, ratio)

        return (
          <motion.span
            key={`${word.text}-${i}`}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.08 + i * 0.02 }}
            whileHover={{ scale: 1.16, filter: 'brightness(1.1)', transition: { duration: 0.15, ease: EASE } }}
            onHoverStart={() => onHoverCategory(word.categoryId)}
            onHoverEnd={() => onHoverCategory(null)}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1, color }}
            className={`inline-block cursor-default font-bold capitalize tracking-tight ${
              isEditorial ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.03)]' : ''
            }`}
          >
            {word.text}
          </motion.span>
        )
      })}
    </div>
  )
}

function CategoryRow({
  category,
  maxImpact,
  tone,
  delay,
  isHighlighted,
}: {
  category: SemanticCategory
  maxImpact: number
  tone: 'negative' | 'positive'
  delay: number
  isHighlighted: boolean
}) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'
  const width = (Math.abs(category.impact) / maxImpact) * 100
  const isNegative = tone === 'negative'

  return (
    <motion.div variants={fadeUp} className={isEditorial ? 'py-4.5 first:pt-0 last:pb-0' : 'py-5 first:pt-0 last:pb-0'}>
      <div className="flex items-center justify-between text-xs">
        <span className={isEditorial ? 'font-medium text-zinc-900' : 'text-sm font-medium text-gray-900'}>
          {category.label}
        </span>
        <span
          className={`inline-block transition-all duration-300 ease-out ${isHighlighted ? 'scale-110' : 'scale-100'} ${
            isEditorial
              ? `rounded px-1.5 py-0.5 text-xs font-semibold tabular-nums ${
                  isNegative
                    ? isHighlighted
                      ? 'bg-rose-100 text-rose-900 shadow-[0_0_16px_rgba(244,63,94,0.45)]'
                      : 'bg-rose-50/50 text-rose-700/80'
                    : isHighlighted
                      ? 'bg-emerald-100 text-emerald-900 shadow-[0_0_16px_rgba(16,185,129,0.45)]'
                      : 'bg-emerald-50/50 text-emerald-700/80'
                }`
              : `text-sm font-semibold tabular-nums ${
                  isNegative
                    ? isHighlighted
                      ? 'text-rose-600 drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                      : 'text-rose-500'
                    : isHighlighted
                      ? 'text-emerald-600 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]'
                      : 'text-emerald-500'
                }`
          }`}
        >
          {category.impact > 0 ? '+' : ''}
          {category.impact.toFixed(1)}
        </span>
      </div>

      <div
        className={`transition-shadow duration-300 ${
          isEditorial
            ? `mt-2 h-0.5 w-full overflow-hidden rounded-full bg-zinc-100 ${
                isHighlighted
                  ? isNegative
                    ? 'shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                    : 'shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : ''
              }`
            : `mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 ${
                isHighlighted
                  ? isNegative
                    ? 'shadow-[0_0_12px_rgba(244,63,94,0.55)]'
                    : 'shadow-[0_0_12px_rgba(16,185,129,0.55)]'
                  : ''
              }`
        }`}
      >
        <motion.div
          className={`h-full rounded-full transition-colors duration-300 ${
            isNegative
              ? isHighlighted
                ? 'bg-rose-600'
                : isEditorial ? 'bg-rose-700/70' : 'bg-rose-500'
              : isHighlighted
                ? 'bg-emerald-600'
                : isEditorial ? 'bg-emerald-700/70' : 'bg-emerald-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.8, ease: EASE, delay }}
        />
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className={isEditorial ? 'text-[11px] text-zinc-400' : 'text-xs text-gray-400'}>
          {category.mentions} mentions
        </span>
        {category.tags.map((tag) => (
          <span
            key={tag}
            className={
              isEditorial
                ? 'rounded border border-zinc-200/50 bg-zinc-50 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500'
                : 'rounded-md border border-gray-100 bg-gray-50 px-2 py-0.5 font-mono text-[11px] text-gray-500'
            }
          >
            [{tag}]
          </span>
        ))}
      </div>

      <p className={isEditorial ? 'mt-2 text-xs leading-relaxed text-zinc-400' : 'mt-2.5 text-xs leading-relaxed text-gray-400'}>
        {category.insight}
      </p>
    </motion.div>
  )
}

export function SemanticEngineView() {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'
  const maxNegative = Math.max(...negativeCategories.map((c) => Math.abs(c.impact)))
  const maxPositive = Math.max(...positiveCategories.map((c) => c.impact))
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="mx-auto max-w-6xl px-8 py-10"
    >
      <motion.div variants={fadeUp}>
        <p className={isEditorial ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'text-xs font-semibold uppercase tracking-wider text-gray-400'}>
          Natural Language Processing
        </p>
        <h1 className={isEditorial ? 'mt-1.5 text-2xl font-light tracking-tight text-zinc-900' : 'mt-2 text-3xl font-light tracking-tight text-gray-900'}>
          Semantic Engine
        </h1>
        <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
          Ranked by weighted impact on your Guest Rating Index · hover a word to spotlight its score
        </p>
      </motion.div>

      {/* Demo Presentation Overlay Banner */}
      <DemoGuideBanner
        className="mt-6"
        icon={Brain}
        moduleTitle="AI Guest Feedback Analyzer (What Guests Love & Dislike)"
        tag="Automated Insights"
        description="Our Artificial Intelligence reads every guest comment and groups them into clear categories. Instantly see your biggest selling points (e.g. +Breakfast Quality, +Friendly Staff) and your top operational issues (e.g. -Air Conditioner Noise, -Slow Check-in) so you know exactly what to fix to raise your ratings."
      />

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          className={
            isEditorial
              ? 'rounded-lg border border-zinc-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
              : 'rounded-2xl border border-rose-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
          }
        >
          <div className="flex items-center gap-2">
            <span className={isEditorial ? 'h-1.5 w-1.5 rounded-full bg-rose-700/70' : 'h-1.5 w-1.5 rounded-full bg-rose-500'} aria-hidden="true" />
            <h2 className={isEditorial ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'text-xs font-semibold uppercase tracking-wider text-gray-400'}>
              Detracting from your score (Negative Drivers)
            </h2>
          </div>

          <WordCloud
            words={negativeCloudWords}
            isEditorial={isEditorial}
            onHoverCategory={setHoveredCategoryId}
          />

          <div className={isEditorial ? 'divide-y divide-zinc-100 border-t border-zinc-100 pt-1' : 'divide-y divide-gray-100 border-t border-gray-100 pt-1'}>
            {negativeCategories.map((category, i) => (
              <CategoryRow
                key={category.id}
                category={category}
                maxImpact={maxNegative}
                tone="negative"
                delay={0.2 + i * 0.1}
                isHighlighted={hoveredCategoryId === category.id}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className={
            isEditorial
              ? 'rounded-lg border border-zinc-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
              : 'rounded-2xl border border-emerald-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
          }
        >
          <div className="flex items-center gap-2">
            <span
              className={isEditorial ? 'h-1.5 w-1.5 rounded-full bg-emerald-700/70' : 'h-1.5 w-1.5 rounded-full bg-emerald-500'}
              aria-hidden="true"
            />
            <h2 className={isEditorial ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'text-xs font-semibold uppercase tracking-wider text-gray-400'}>
              Driving your score (Positive Drivers)
            </h2>
          </div>

          <WordCloud
            words={positiveCloudWords}
            isEditorial={isEditorial}
            onHoverCategory={setHoveredCategoryId}
          />

          <div className={isEditorial ? 'divide-y divide-zinc-100 border-t border-zinc-100 pt-1' : 'divide-y divide-gray-100 border-t border-gray-100 pt-1'}>
            {positiveCategories.map((category, i) => (
              <CategoryRow
                key={category.id}
                category={category}
                maxImpact={maxPositive}
                tone="positive"
                delay={0.2 + i * 0.1}
                isHighlighted={hoveredCategoryId === category.id}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
