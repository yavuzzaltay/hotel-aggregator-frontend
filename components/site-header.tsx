'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { NAV_LINKS, type ViewId } from '@/lib/views'
import { cn } from '@/lib/utils'

interface SiteHeaderProps {
  activeView: ViewId
  onNavigate: (view: ViewId) => void
}

export function SiteHeader({ activeView, onNavigate }: SiteHeaderProps) {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="font-serif text-2xl tracking-wide text-white transition-opacity hover:opacity-80"
        >
          Auren
        </button>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              className={cn(
                'group relative text-sm transition-colors',
                activeView === link.id
                  ? 'text-white'
                  : 'text-white/70 hover:text-white',
              )}
            >
              {link.label}
              <span
                className={cn(
                  'absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300',
                  activeView === link.id ? 'w-full' : 'w-0 group-hover:w-full',
                )}
              />
            </button>
          ))}
        </nav>

        <Link
          href="/login"
          className="rounded-full border border-white/25 px-5 py-2 text-sm text-white transition-all duration-300 hover:border-primary hover:bg-white/10"
        >
          Sign In
        </Link>
      </div>
    </motion.header>
  )
}
