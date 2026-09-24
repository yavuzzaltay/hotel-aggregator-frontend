'use client'

import { motion } from 'framer-motion'

const STATS = [
  'Processing 10.5M+ Reviews Daily',
  'Analyzing 175+ Platforms',
  '17 Semantic Languages',
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function AuthorityTicker() {
  return (
    <section className="border-b border-border bg-background py-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
        className="mx-auto flex max-w-4xl flex-wrap items-center justify-center divide-x divide-border/60 px-6"
      >
        {STATS.map((stat) => (
          <motion.span
            key={stat}
            variants={item}
            className="px-6 py-1 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground first:pl-0 last:pr-0"
          >
            {stat}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
