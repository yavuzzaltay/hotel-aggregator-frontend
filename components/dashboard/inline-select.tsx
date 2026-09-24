'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { EASE } from '@/lib/views'

import { useDashboardTheme } from './dashboard-theme-context'

export function InlineSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
      <label className={isEditorial ? 'mb-1 block text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-400'}>
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={
          isEditorial
            ? 'flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-200/80 bg-white px-3 py-1.5 text-xs text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors duration-200 hover:bg-zinc-50'
            : 'flex w-full items-center justify-between gap-2 rounded-lg border border-blue-100 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-colors duration-200 hover:bg-blue-50/50'
        }
      >
        <span>{value}</span>
        <ChevronDown
          strokeWidth={isEditorial ? 1.5 : 2}
          className={`h-3.5 w-3.5 ${isEditorial ? 'text-zinc-400' : 'text-blue-400'} transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
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
            role="listbox"
            aria-label={label}
            className={
              isEditorial
                ? 'absolute left-0 top-[calc(100%+0.375rem)] z-30 w-full overflow-hidden rounded-lg border border-zinc-200/80 bg-white p-1 shadow-md shadow-zinc-900/5'
                : 'absolute left-0 top-[calc(100%+0.375rem)] z-30 w-full overflow-hidden rounded-lg border border-gray-100 bg-white p-1 shadow-xl shadow-gray-200/50'
            }
          >
            {options.map((option) => {
              const selected = option === value
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                  className={`block w-full rounded-md px-2.5 py-1.5 text-left text-xs transition-colors duration-150 ${
                    selected
                      ? isEditorial ? 'bg-zinc-100 font-semibold text-zinc-900' : 'bg-blue-50 text-blue-600'
                      : isEditorial ? 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
