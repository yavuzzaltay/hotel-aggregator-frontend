'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Radio,
  BrainCircuit,
  Gauge,
  LayoutGrid,
  Sparkles,
  ShieldCheck,
  Languages,
  Zap,
  Webhook,
  ArrowRight,
} from 'lucide-react'
import { RevealText } from '@/components/reveal-text'
import { EASE } from '@/lib/views'

interface Stage {
  icon: ComponentType<{ className?: string }>
  title: string
  detail: string
}

const STAGES: Stage[] = [
  { icon: Radio, title: 'Ingestion', detail: '175+ platforms polled hourly' },
  { icon: BrainCircuit, title: 'NLP Processing', detail: '700+ concepts per review' },
  { icon: Gauge, title: 'Semantic Scoring', detail: 'GRI™ calculated in real time' },
  { icon: LayoutGrid, title: 'Command Center', detail: 'Live on your dashboard' },
  { icon: Sparkles, title: 'Auto-Response', detail: 'Drafted in 45 languages' },
]

interface Capability {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}

const CAPABILITIES: Capability[] = [
  {
    icon: Radio,
    title: 'Real-Time Ingestion',
    description: 'Polling 175+ review platforms every hour, in every language.',
  },
  {
    icon: BrainCircuit,
    title: 'Proprietary Semantic Model',
    description: '700+ hospitality-specific concepts, trained on luxury guest language.',
  },
  {
    icon: Zap,
    title: 'Sub-Second Query Layer',
    description: 'Dashboards update the moment new data lands — no batch jobs.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-Grade Security',
    description: 'SOC 2 Type II certified, end-to-end encrypted, SSO-ready.',
  },
  {
    icon: Languages,
    title: 'Multi-Language NLP',
    description: '17 languages analyzed natively, 45 for auto-response.',
  },
  {
    icon: Webhook,
    title: 'API-First Architecture',
    description: 'Webhook and REST access to every signal we compute.',
  },
]

const stats = [
  { value: '700+', label: 'Hospitality concepts tracked' },
  { value: '45', label: 'Languages for auto-response' },
  { value: '99.9%', label: 'Pipeline uptime' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export function TechnologyView() {
  const router = useRouter()

  return (
    <div className="bg-background">
      {/* Masthead */}
      <section className="mx-auto max-w-5xl px-6 pt-40 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-primary"
        >
          The Platform
        </motion.p>
        <RevealText
          as="h1"
          animateOnMount
          text="The engine behind every insight."
          className="max-w-4xl font-serif text-5xl font-light leading-[1.03] text-foreground sm:text-7xl"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground"
        >
          From raw review to boardroom-ready intelligence in under sixty
          seconds. Here&apos;s exactly how.
        </motion.p>
      </section>

      {/* Live pipeline flow */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={container}
          className="relative"
        >
          {/* Connecting line + traveling pulses (desktop only) */}
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 md:block" />
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden h-px overflow-visible md:block">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_2px_var(--primary)]"
                animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                  delay: i * 1.15,
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
            {STAGES.map((stage) => {
              const Icon = stage.icon
              return (
                <motion.div
                  key={stage.title}
                  variants={fadeUp}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-background">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-foreground">
                    {stage.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stage.detail}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Live processing log */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-primary">
            Watch It Work
          </p>
          <h2 className="mx-auto mt-4 max-w-lg text-balance font-serif text-3xl font-light leading-tight text-foreground sm:text-4xl">
            This is happening right now, on every connected property.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mt-10"
        >
          <LiveTerminal />
        </motion.div>
      </section>

      {/* Capability grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={container}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs uppercase tracking-[0.4em] text-primary"
          >
            What Powers The Pipeline
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-balance font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl"
          >
            Technology built for luxury's margin for error.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CAPABILITIES.map((capability) => {
            const Icon = capability.icon
            return (
              <motion.div
                key={capability.title}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-lg text-card-foreground">
                  {capability.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {capability.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* By the numbers */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className="grid grid-cols-1 gap-10 border-t border-border pt-12 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <p className="font-serif text-5xl font-light text-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-40 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="text-balance font-serif text-3xl font-light leading-tight text-foreground sm:text-5xl">
            See it running on your properties.
          </h2>
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="group mx-auto mt-8 flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-500 hover:gap-3.5 hover:brightness-110"
          >
            Request Pipeline Access
            <ArrowRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      </section>
    </div>
  )
}

const LOG_LINES = [
  'Ingesting review — Booking.com, Zermatt',
  'NLP extracting hospitality concepts…',
  'Recalculating GRI™ — Kyoto property',
  'Auto-drafting response — Tripadvisor, Provence',
  'Sentiment flagged: Cleanliness (negative)',
  'Ingesting review — Google, Santorini',
  'Semantic tag added: [attentive staff]',
  'Cross-referencing regional benchmark',
  'Webhook dispatched: new_review.negative',
  'Response queued for GM approval — Dolomites',
]

interface LogLine {
  id: number
  text: string
}

function LiveTerminal() {
  const [lines, setLines] = useState<LogLine[]>([])
  const counter = useRef(0)

  useEffect(() => {
    const pushLine = () => {
      const template = LOG_LINES[counter.current % LOG_LINES.length]
      const time = new Date().toLocaleTimeString('en-GB', { hour12: false })
      counter.current += 1
      setLines((prev) => [
        ...prev.slice(-4),
        { id: counter.current, text: `[${time}] ${template}` },
      ])
    }
    pushLine()
    const id = window.setInterval(pushLine, 1800)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-white/40">
          pipeline.live
        </span>
      </div>
      <div className="flex h-56 flex-col justify-end gap-1.5 overflow-hidden p-5 font-mono text-xs leading-relaxed sm:text-sm">
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <motion.p
              key={line.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="shrink-0 text-emerald-400/90"
            >
              <span className="text-white/30">$</span> {line.text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
