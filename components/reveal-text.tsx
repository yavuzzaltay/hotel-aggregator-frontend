'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/views'
import { cn } from '@/lib/utils'

interface RevealTextProps {
  text: string
  className?: string
  /** delay before the first word animates in */
  delay?: number
  /** animate on mount instead of on scroll into view */
  animateOnMount?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

/**
 * Word-by-word mask reveal. Each word sits inside an overflow-hidden wrapper
 * and slides up from below, creating an elegant editorial reveal.
 */
export function RevealText({
  text,
  className,
  delay = 0,
  animateOnMount = false,
  as = 'h2',
}: RevealTextProps) {
  const words = text.split(' ')
  const Tag = motion[as]

  const trigger = animateOnMount
    ? { animate: 'visible' as const }
    : {
        whileInView: 'visible' as const,
        viewport: { once: true, margin: '-80px' },
      }

  return (
    <Tag
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      className={cn('flex flex-wrap', className)}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.25em] inline-block overflow-hidden py-[0.08em] align-bottom"
        >
          <motion.span
            variants={{
              hidden: { y: '110%' },
              visible: {
                y: 0,
                transition: { duration: 1, ease: EASE },
              },
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
