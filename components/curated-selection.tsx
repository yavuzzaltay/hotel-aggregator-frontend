'use client'

import { motion } from 'framer-motion'
import { HotelCard } from './hotel-card'
import { mockHotels } from '@/data/mockHotels'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const headingReveal = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function CuratedSelection() {
  const results = [...mockHotels]
    .sort((a, b) => b.aiScore - a.aiScore)
    .slice(0, 6)

  return (
    <section id="curated-selection" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={container}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={headingReveal}
            className="mb-4 text-xs uppercase tracking-[0.4em] text-primary"
          >
            Live Performance Benchmarks
          </motion.p>
          <motion.h2
            variants={headingReveal}
            className="text-balance font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl"
          >
            Elite Brands Powered By Our Pipeline
          </motion.h2>
          <motion.p
            variants={headingReveal}
            className="mx-auto mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground"
          >
            Real-time GRI™ scores from luxury properties actively running on
            our intelligence pipeline — updated as new reviews are ingested.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {results.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
