'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/views'
import { useDashboardTheme } from './dashboard-theme-context'

export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (value: boolean) => void
}) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
        checked
          ? isEditorial ? 'bg-zinc-900' : 'bg-blue-600'
          : 'bg-zinc-200'
      }`}
    >
      <motion.span
        className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
        animate={{ x: checked ? 16 : 0 }}
        transition={{ duration: 0.2, ease: EASE }}
      />
    </button>
  )
}
