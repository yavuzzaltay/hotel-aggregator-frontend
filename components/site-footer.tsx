'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function SiteFooter() {
  const router = useRouter()

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="max-w-2xl text-balance font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl">
            Stop guessing what your guests think. Start knowing.
          </h2>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Join the luxury hospitality brands already running their guest
            intelligence on our pipeline.
          </p>
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="group mt-9 flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-500 hover:gap-3.5 hover:brightness-110"
          >
            Request Pipeline Access
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </motion.div>

        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-border pt-10 sm:flex-row">
          <span className="font-serif text-xl tracking-wide text-foreground">
            Auren
          </span>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Hotel Intelligence — {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
