'use client'

import { useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'
import { ChevronDown, Mail, ArrowRight, Loader2 } from 'lucide-react'
import { EASE } from '@/lib/views'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const maskUp = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: EASE },
  },
}

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE },
  },
}

const headline = ['Hotel Intelligence,', 'Elevated.']

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = (e: FormEvent) => {
    e.preventDefault()
    if (isLoading || !email.trim()) return
    setIsLoading(true)
    window.setTimeout(() => {
      router.push('/login')
    }, 1000)
  }

  // Foreground content drifts down and fades as you scroll.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Video moves UP slower than scroll (parallax) and blurs progressively.
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25])
  const blurAmount = useTransform(scrollYProgress, [0, 1], [0, 10])
  const videoFilter = useMotionTemplate`blur(${blurAmount}px)`

  return (
    <section
      ref={ref}
      className="relative h-svh min-h-[640px] w-full overflow-hidden"
    >
      {/* Background video with parallax + blur */}
      <motion.video
        style={{ y: videoY, scale: videoScale, filter: videoFilter }}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover pointer-events-none"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </motion.video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/40 to-black/90" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center"
      >
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p
            variants={fade}
            className="mb-6 text-xs uppercase tracking-[0.4em] text-white/70"
          >
            AI-Powered Guest Intelligence
          </motion.p>

          <h1 className="font-serif text-5xl font-light leading-[1.05] text-white sm:text-7xl md:text-8xl">
            {headline.map((word) => (
              <span
                key={word}
                className="mx-2 inline-block overflow-hidden py-1 align-bottom"
              >
                <motion.span variants={maskUp} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fade}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg"
          >
            The ultimate AI data pipeline for luxury hospitality. Uncover
            blind spots, aggregate global reviews, and dominate your
            reputation.
          </motion.p>

          {/* Glassmorphism lead capture */}
          <motion.div variants={fade} className="mt-12 w-full">
            <form
              onSubmit={handleAnalyze}
              className="mx-auto flex w-full max-w-xl flex-col items-stretch gap-2 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-md sm:flex-row sm:items-center"
            >
              <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Corporate Email"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="group flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-500 hover:gap-3 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:ml-1"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Analyzing…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2"
                    >
                      Analyze My Property
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  )
}
