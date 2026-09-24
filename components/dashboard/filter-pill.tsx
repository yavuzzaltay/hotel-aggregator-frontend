'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { EASE } from '@/lib/views'
import { useDashboardTheme } from './dashboard-theme-context'

export function FilterPill({
  icon: Icon,
  label,
  value,
  children,
}: {
  icon: LucideIcon
  label: string
  value: string
  children: (close: () => void) => ReactNode
}) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className={
          isEditorial
            ? 'flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-xs text-zinc-700 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors duration-200 hover:bg-zinc-50'
            : 'flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50'
        }
      >
        <Icon
          className={isEditorial ? 'h-3.5 w-3.5 shrink-0 text-zinc-400' : 'h-3.5 w-3.5 shrink-0 text-gray-400'}
          strokeWidth={isEditorial ? 1.5 : 2}
          aria-hidden="true"
        />
        <span className="hidden items-baseline gap-1.5 sm:inline-flex">
          <span
            className={
              isEditorial
                ? 'text-[10px] font-medium uppercase tracking-[0.06em] text-zinc-400'
                : 'text-xs text-gray-400'
            }
          >
            {label}
          </span>
          <span
            className={
              isEditorial
                ? 'max-w-[160px] truncate text-xs font-medium text-zinc-900'
                : 'max-w-[160px] truncate text-sm font-medium text-gray-900'
            }
          >
            {value}
          </span>
        </span>
        <span
          className={
            isEditorial
              ? 'max-w-[160px] truncate text-xs font-medium text-zinc-900 sm:hidden'
              : 'max-w-[160px] truncate text-sm font-medium text-gray-900 sm:hidden'
          }
        >
          {value}
        </span>
        <ChevronDown
          strokeWidth={isEditorial ? 1.5 : 2}
          className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
            isEditorial ? 'text-zinc-400' : 'text-gray-400'
          } ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: EASE }}
            className={
              isEditorial
                ? 'absolute left-0 top-[calc(100%+0.5rem)] z-30 min-w-[220px] overflow-hidden rounded-lg border border-zinc-200/80 bg-white p-1.5 shadow-md shadow-zinc-900/5'
                : 'absolute left-0 top-[calc(100%+0.5rem)] z-30 min-w-[220px] overflow-hidden rounded-lg border border-gray-100 bg-white p-1.5 shadow-xl shadow-gray-200/50'
            }
          >
            {children(close)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
