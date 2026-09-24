'use client'

import { motion } from 'framer-motion'

/**
 * Massive, very faint, slow-moving blurred orbs that drift behind dark
 * sections to create a sense of depth while scrolling. Purely decorative.
 */
export function FloatingOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
    >
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="absolute -left-32 top-[10%] h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 32, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="absolute right-[-10%] top-[40%] h-[30rem] w-[30rem] rounded-full bg-primary/[0.07] blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 38, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] left-[30%] h-[28rem] w-[28rem] rounded-full bg-foreground/[0.04] blur-[120px]"
      />
    </div>
  )
}
