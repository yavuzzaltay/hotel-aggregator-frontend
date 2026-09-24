'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Gauge,
  Inbox,
  BrainCircuit,
  GitCompare,
  ClipboardList,
  KanbanSquare,
  Target,
  Plus,
  Settings,
  LogOut,
  Workflow,
} from 'lucide-react'
import { EASE } from '@/lib/views'
import type { ViewId } from './types'

import { useDashboardTheme } from './dashboard-theme-context'

const NAV_ITEMS: { id: ViewId; label: string; icon: typeof Gauge }[] = [
  { id: 'overview', label: 'Overview', icon: Gauge },
  { id: 'inbox', label: 'Unified Inbox', icon: Inbox },
  { id: 'semantic', label: 'Semantic Engine', icon: BrainCircuit },
  { id: 'benchmarking', label: 'Benchmarking', icon: GitCompare },
  { id: 'surveyStudio', label: 'Survey Studio', icon: ClipboardList },
  { id: 'caseManagement', label: 'Case Management', icon: KanbanSquare },
  { id: 'teamKpis', label: 'Team KPIs', icon: Target },
  { id: 'addProperty', label: 'Add Property', icon: Plus },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar({
  active,
  onNavigate,
}: {
  active: ViewId
  onNavigate: (view: ViewId) => void
}) {
  const router = useRouter()
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'

  return (
    <aside
      className={`flex h-svh w-60 shrink-0 flex-col px-4 py-6 transition-colors ${
        isEditorial ? 'border-r border-zinc-200/70 bg-white' : 'border-r border-gray-100 bg-white'
      }`}
    >
      <div className="flex items-center gap-2.5 px-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            isEditorial
              ? 'border border-zinc-200/80 bg-zinc-100 text-zinc-900'
              : 'border border-gray-100 bg-gray-50 text-blue-600'
          }`}
        >
          <Workflow
            className={`h-4 w-4 ${isEditorial ? 'text-zinc-900' : 'text-blue-600'}`}
            strokeWidth={isEditorial ? 1.5 : 2}
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-tight text-zinc-900">
            Hotel Intelligence
          </p>
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-zinc-400">
            {isEditorial ? 'Editorial Mode' : 'Classic Mode'}
          </p>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200"
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-pill"
                  transition={{ duration: 0.35, ease: EASE }}
                  className={`absolute inset-0 rounded-lg ${
                    isEditorial
                      ? 'border border-zinc-200/80 bg-zinc-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
                      : 'border border-blue-100 bg-blue-50'
                  }`}
                />
              )}
              <Icon
                strokeWidth={isEditorial ? 1.5 : 2}
                className={`relative z-10 h-4 w-4 shrink-0 transition-colors ${
                  isActive
                    ? isEditorial ? 'text-zinc-900' : 'text-blue-600'
                    : 'text-zinc-400 group-hover:text-zinc-700'
                }`}
                aria-hidden="true"
              />
              <span
                className={`relative z-10 text-xs font-medium tracking-wide transition-colors ${
                  isActive
                    ? isEditorial ? 'font-semibold text-zinc-900' : 'font-semibold text-blue-700'
                    : 'text-zinc-500 group-hover:text-zinc-900'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto border-t border-zinc-200/70 pt-4">
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-medium text-zinc-400 transition-colors duration-200 hover:bg-zinc-100/60 hover:text-zinc-900"
        >
          <LogOut className="h-4 w-4 shrink-0 text-zinc-400" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
