'use client'

import type React from 'react'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { EASE } from '@/lib/views'

interface Feature {
  index: string
  title: string
  description: string
  image: string
}

const FEATURES: Feature[] = [
  {
    index: '01',
    title: 'Semantic NLP Engine',
    description:
      'Our AI reads between the lines, categorizing over 700 hospitality concepts to find exactly where you are losing GRI points.',
    image:
      'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1200&q=80',
  },
  {
    index: '02',
    title: 'Unified Command Center',
    description:
      'Booking, Google, Tripadvisor. All platforms consolidated into one real-time dashboard.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    index: '03',
    title: 'Auto-Response AI',
    description:
      'Draft brand-aligned, hyper-personalized review replies in 45 languages instantly.',
    image:
      'https://images.unsplash.com/photo-1541560052-5e137f229371?auto=format&fit=crop&w=1200&q=80',
  },
]

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
    transition: { duration: 0.9, ease: EASE },
  },
}

export function FeatureShowcase() {
  return (
    <section className="relative bg-background py-24 sm:py-32">
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
            The Core AI Engine
          </motion.p>
          <motion.h2
            variants={headingReveal}
            className="text-balance font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl"
          >
            Built for What Humans Miss
          </motion.h2>
          <motion.p
            variants={headingReveal}
            className="mx-auto mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground"
          >
            Three pipelines, working in concert, to surface the blind spots
            in your guest experience before they cost you a star.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.index} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const cardVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
}

function FeatureCard({ feature }: { feature: Feature }) {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 10)
    rotateX.set(py * -10)
  }

  const handlePointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card [transform-style:preserve-3d]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <motion.img
          src={feature.image}
          alt={feature.title}
          crossOrigin="anonymous"
          style={{ y: imageY }}
          className="absolute inset-0 h-[116%] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <span className="absolute right-4 top-4 font-serif text-4xl font-light text-white/25">
          {feature.index}
        </span>

        <div className="absolute inset-x-4 bottom-4">
          <h3 className="font-serif text-2xl leading-tight text-white">
            {feature.title}
          </h3>
          <div className="pointer-events-none mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-32 group-hover:opacity-100">
            <p className="text-sm leading-relaxed text-white/80">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
