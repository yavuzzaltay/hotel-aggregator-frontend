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
import { MapPin, Sparkles } from 'lucide-react'
import { EASE } from '@/lib/views'
import type { Hotel } from '@/data/mockHotels'

const cardVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
}

function topConcept(breakdown: Hotel['scoreBreakdown']) {
  const entries = Object.entries(breakdown) as [
    keyof Hotel['scoreBreakdown'],
    number,
  ][]
  const [label] = entries.sort((a, b) => b[1] - a[1])[0]
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const ref = useRef<HTMLElement>(null)

  // Internal image parallax as the card moves through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  // 3D pointer tilt.
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
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <motion.img
          src={hotel.highResImage || '/placeholder.svg'}
          alt={`${hotel.name} in ${hotel.city}, ${hotel.country}`}
          crossOrigin="anonymous"
          style={{ y: imageY }}
          className="absolute inset-0 h-[116%] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Permanent gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* AI Analyzed badge */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          <span className="text-xs font-medium tracking-wide text-white">
            AI Analyzed
          </span>
        </div>

        {/* GRI badge */}
        <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-md">
          <span className="text-xs font-medium tracking-wide text-white">
            GRI {(hotel.aiScore * 10).toFixed(1)}%
          </span>
        </div>

        {/* Sliding glassmorphism summary on hover */}
        <div className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-sm leading-relaxed text-white/90">
              {hotel.editorialSummary}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {hotel.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wide text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-[10px] uppercase tracking-wide text-white/60">
              <span>Service {hotel.scoreBreakdown.service.toFixed(1)}</span>
              <span>
                Architecture {hotel.scoreBreakdown.architecture.toFixed(1)}
              </span>
              <span>
                Gastronomy {hotel.scoreBreakdown.gastronomy.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <h3 className="font-serif text-xl leading-tight text-card-foreground">
            {hotel.name}
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {hotel.city}, {hotel.country}
          </p>
        </div>
        <div className="mt-1 shrink-0 text-right">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Top Concept
          </p>
          <p className="text-sm font-medium text-primary">
            {topConcept(hotel.scoreBreakdown)}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
