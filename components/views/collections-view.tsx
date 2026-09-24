'use client'

import { useRouter } from 'next/navigation'
import { RevealText } from '@/components/reveal-text'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/views'

interface Segment {
  title: string
  tagline: string
  count: string
  image: string
}

const segments: Segment[] = [
  {
    title: 'Mountain & Ski Resorts',
    tagline:
      'Semantic models tuned for alpine expectations — from lift access to après-ski service.',
    count: '18 properties tracked',
    image: '/collections/winter.png',
  },
  {
    title: 'Desert & Wellness Retreats',
    tagline:
      'Spa and wellness sentiment isolated from the noise of general reviews.',
    count: '12 properties tracked',
    image: '/collections/desert.png',
  },
  {
    title: 'Coastal & Resort Properties',
    tagline:
      'Seasonal review volume cross-referenced against RevPAR and occupancy.',
    count: '24 properties tracked',
    image: '/collections/coastal.png',
  },
  {
    title: 'Urban & Business Hotels',
    tagline:
      'Business-traveler sentiment separated from leisure guest expectations.',
    count: '16 properties tracked',
    image: '/collections/urban.png',
  },
]

export function CollectionsView() {
  const router = useRouter()

  return (
    <div className="bg-background">
      {/* Intro */}
      <section className="relative px-6 pt-40 pb-16">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-6 text-xs uppercase tracking-[0.4em] text-primary"
          >
            Solutions By Property Type
          </motion.p>
          <RevealText
            as="h1"
            animateOnMount
            text="Intelligence tuned to your portfolio."
            className="max-w-4xl font-serif text-5xl font-light leading-[1.05] text-foreground sm:text-7xl"
          />
        </div>
      </section>

      {/* Sticky stacking cards */}
      <section className="relative px-4 pb-[10vh] sm:px-6">
        {segments.map((segment, i) => (
          <div
            key={segment.title}
            className="sticky top-[12vh]"
            style={{ paddingTop: `${i * 2.5}rem` }}
          >
            <SegmentCard
              segment={segment}
              index={i}
              onNavigate={() => router.push('/login')}
            />
          </div>
        ))}
      </section>

      {/* Spacer so the final card can settle before the section ends */}
      <div className="h-[30vh]" />
    </div>
  )
}

function SegmentCard({
  segment,
  index,
  onNavigate,
}: {
  segment: Segment
  index: number
  onNavigate: () => void
}) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative mx-auto flex h-[74svh] max-w-6xl items-end overflow-hidden rounded-[2rem] border border-white/10"
    >
      <img
        src={segment.image || '/placeholder.svg'}
        alt={segment.title}
        crossOrigin="anonymous"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      <div className="relative z-10 w-full p-8 text-center sm:p-14">
        <span className="mb-4 inline-block text-xs uppercase tracking-[0.35em] text-white/70">
          {String(index + 1).padStart(2, '0')} — {segment.count}
        </span>
        <h2 className="font-serif text-4xl font-light text-white sm:text-6xl md:text-7xl">
          {segment.title}
        </h2>
        <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-white/80">
          {segment.tagline}
        </p>
        <button
          type="button"
          onClick={onNavigate}
          className="mt-8 rounded-full border border-white/30 px-7 py-3 text-sm text-white backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-white/10"
        >
          View Segment Benchmarks
        </button>
      </div>
    </motion.article>
  )
}
