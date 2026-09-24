'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import { RevealText } from '@/components/reveal-text'
import { EASE } from '@/lib/views'
import { cn } from '@/lib/utils'

interface Insight {
  title: string
  category: string
  excerpt: string
  image: string
  readTime: string
  align: 'left' | 'right'
}

const insights: Insight[] = [
  {
    title: 'The Data Behind the Empty Lobby',
    category: 'Design Intelligence',
    excerpt:
      'Our semantic engine analyzed 50,000+ lobby mentions across luxury properties. The verdict: restraint reads as luxury, ornamentation reads as trying too hard.',
    image: '/journal/journal-1.png',
    readTime: '6 min read',
    align: 'left',
  },
  {
    title: 'Why the First Hour Determines Your Rating',
    category: 'Guest Experience',
    excerpt:
      'Sentiment analysis across 2M+ check-in mentions reveals the first sixty minutes carry more weight on GRI™ than any other touchpoint.',
    image: '/journal/journal-2.png',
    readTime: '4 min read',
    align: 'right',
  },
  {
    title: 'The Hidden Cost of a Late Dinner Reservation',
    category: 'Revenue Intelligence',
    excerpt:
      'Cross-referencing 400,000+ F&B reviews against occupancy data, we found a direct correlation between dining service delays and repeat-booking rates.',
    image: '/journal/journal-3.png',
    readTime: '5 min read',
    align: 'left',
  },
]

export function JournalView() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })
  const router = useRouter()

  return (
    <div className="bg-background">
      {/* Reading progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      />

      {/* Masthead */}
      <section className="mx-auto max-w-5xl px-6 pt-40 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-primary"
        >
          Insights
        </motion.p>
        <RevealText
          as="h1"
          animateOnMount
          text="Research from the pipeline."
          className="max-w-4xl font-serif text-5xl font-light leading-[1.03] text-foreground sm:text-7xl"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground"
        >
          Data-backed dispatches on what actually moves guest sentiment —
          drawn from millions of reviews our AI reads every day.
        </motion.p>
      </section>

      {/* Insights */}
      <div className="mx-auto max-w-6xl px-6 pb-40">
        {insights.map((insight, i) => (
          <InsightRow
            key={insight.title}
            insight={insight}
            index={i}
            onNavigate={() => router.push('/login')}
          />
        ))}
      </div>
    </div>
  )
}

function InsightRow({
  insight,
  index,
  onNavigate,
}: {
  insight: Insight
  index: number
  onNavigate: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Image drifts inside its frame as the row scrolls.
  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  const isRight = insight.align === 'right'

  return (
    <article
      ref={ref}
      className={cn(
        'grid grid-cols-1 items-center gap-8 border-b border-border py-16 md:grid-cols-2 md:gap-14 lg:gap-20',
        index === 0 && 'pt-0',
      )}
    >
      {/* Image frame with internal parallax */}
      <div
        className={cn(
          'relative aspect-[4/5] overflow-hidden rounded-2xl',
          isRight ? 'md:order-2' : 'md:order-1',
        )}
      >
        <motion.img
          src={insight.image || '/placeholder.svg'}
          alt={insight.title}
          crossOrigin="anonymous"
          style={{ y: imageY }}
          className="absolute inset-0 h-[124%] w-full object-cover"
        />
      </div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className={cn(isRight ? 'md:order-1' : 'md:order-2')}
      >
        <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
          <span>{insight.category}</span>
          <span className="h-px w-8 bg-border" />
          <span className="text-muted-foreground">{insight.readTime}</span>
        </div>
        <h2 className="text-balance font-serif text-3xl font-light leading-tight text-foreground sm:text-5xl">
          {insight.title}
        </h2>
        <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
          {insight.excerpt}
        </p>
        <button
          type="button"
          onClick={onNavigate}
          className="group mt-8 inline-flex items-center gap-2 text-sm text-foreground"
        >
          Read the research
          <span className="h-px w-8 bg-foreground transition-all duration-300 group-hover:w-12" />
        </button>
      </motion.div>
    </article>
  )
}
