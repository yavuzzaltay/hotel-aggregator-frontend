'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Timer, Wrench, FileQuestion, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { EASE } from '@/lib/views'
import { caseTickets, CASE_COLUMNS, type CaseTicket, type CaseStatus } from '@/data/mockDashboard'
import { useDashboardTheme } from './dashboard-theme-context'
import { DemoGuideBanner } from './demo-guide-banner'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const COLUMN_IDS = CASE_COLUMNS.map((c) => c.id)
const MINUTE_MS = 60 * 1000
const HOUR_MS = 60 * MINUTE_MS

function formatElapsed(sinceMs: number, now: number): string {
  const diff = Math.max(0, now - sinceMs)
  const minutes = Math.floor(diff / MINUTE_MS)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  const remMinutes = minutes % 60
  if (hours < 24) return remMinutes > 0 ? `${hours}h ${remMinutes}m ago` : `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

// Urgency is derived automatically from how long a ticket has sat in its
// current status — no manual flag to keep in sync.
function isTicketUrgent(ticket: CaseTicket, now: number): boolean {
  if (ticket.status === 'resolved') return false
  const elapsed = now - ticket.statusUpdatedAt
  const threshold = ticket.status === 'open' ? HOUR_MS : 4 * HOUR_MS
  return elapsed > threshold
}

export function CaseManagementView() {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'
  const [tickets, setTickets] = useState<CaseTicket[]>(caseTickets)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60 * 1000)
    return () => window.clearInterval(id)
  }, [])

  const labelClass = isEditorial
    ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400'
    : 'text-xs font-semibold uppercase tracking-wider text-gray-400'

  const cardClass = isEditorial
    ? 'rounded-lg border border-zinc-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
    : 'rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'

  const moveTicketTo = (id: string, status: CaseStatus) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status, statusUpdatedAt: Date.now() } : t)))
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="mx-auto max-w-6xl px-8 py-10"
    >
      <motion.div variants={fadeUp}>
        <p className={labelClass}>Automated Ticketing</p>
        <h1
          className={
            isEditorial
              ? 'mt-1.5 text-2xl font-light tracking-tight text-zinc-900'
              : 'mt-2 text-3xl font-light tracking-tight text-gray-900'
          }
        >
          Case Management
        </h1>
        <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
          Negative feedback, routed to the right department the moment it&apos;s detected.
        </p>
      </motion.div>

      {/* Demo Presentation Overlay Banner */}
      <DemoGuideBanner
        className="mt-6"
        icon={Wrench}
        moduleTitle="Automated Staff Task Routing & Complaint Prevention"
        tag="Issue Resolution"
        description="When a guest leaves a negative review about a broken shower or missing towels, our system automatically creates a task ticket and sends it directly to your Maintenance or Housekeeping team. Track resolution progress live on this board to prevent repeat complaints."
      />

      <motion.div
        variants={fadeUp}
        className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        {CASE_COLUMNS.map((column, columnIndex) => {
          const columnTickets = tickets.filter((t) => t.status === column.id)
          return (
            <div key={column.id}>
              <div className="mb-3 flex items-center justify-between">
                <p className={labelClass}>{column.label}</p>
                <span
                  className={
                    isEditorial
                      ? 'rounded-full border border-zinc-200/70 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400'
                      : 'rounded-full border border-gray-200 px-1.5 py-0.5 text-[10px] font-semibold text-gray-400'
                  }
                >
                  {columnTickets.length}
                </span>
              </div>

              <div
                className={
                  isEditorial
                    ? 'flex min-h-[200px] flex-col gap-2.5 rounded-lg border border-zinc-200/60 bg-zinc-50/50 p-2.5'
                    : 'flex min-h-[200px] flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3'
                }
              >
                {columnTickets.length === 0 ? (
                  <p className={isEditorial ? 'p-3 text-center text-[11px] text-zinc-400' : 'p-3 text-center text-xs text-gray-400'}>
                    No tickets
                  </p>
                ) : (
                  columnTickets.map((ticket, i) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      isEditorial={isEditorial}
                      delay={i * 0.06}
                      columnIndex={columnIndex}
                      now={now}
                      onMoveTo={(status) => moveTicketTo(ticket.id, status)}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </motion.div>

      <motion.div variants={fadeUp} className={`mt-5 ${cardClass}`}>
        <p className={labelClass}>Issues by Department</p>
        <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
          Every ticket ever raised, grouped by the team responsible.
        </p>
        <IssuesByDepartmentChart tickets={tickets} isEditorial={isEditorial} />
      </motion.div>
    </motion.div>
  )
}

function TicketCard({
  ticket,
  isEditorial,
  delay,
  columnIndex,
  now,
  onMoveTo,
}: {
  ticket: CaseTicket
  isEditorial: boolean
  delay: number
  columnIndex: number
  now: number
  onMoveTo: (status: CaseStatus) => void
}) {
  const isResolved = ticket.status === 'resolved'
  const urgent = isTicketUrgent(ticket, now)
  const elapsedText = isResolved ? `Resolved ${formatElapsed(ticket.statusUpdatedAt, now)}` : formatElapsed(ticket.statusUpdatedAt, now)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay }}
      className={
        isEditorial
          ? 'rounded-lg border border-zinc-200/60 bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
          : 'rounded-xl border border-gray-100 bg-white p-4 shadow-sm'
      }
    >
      <div className="flex items-start gap-2">
        <span
          className={
            isEditorial
              ? 'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-200/70 bg-zinc-50 text-zinc-500'
              : 'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500'
          }
        >
          <Wrench className="h-3 w-3" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
        </span>
        <p className={isEditorial ? 'text-xs font-semibold leading-snug text-zinc-900' : 'text-sm font-medium leading-snug text-gray-900'}>
          {ticket.title}
        </p>
      </div>

      <div className={isEditorial ? 'mt-2.5 flex items-center gap-1 pl-8 text-[10px] text-zinc-400' : 'mt-3 flex items-center gap-1 pl-9 text-xs text-gray-400'}>
        <FileQuestion className="h-3 w-3 shrink-0" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
        Extracted from {ticket.sourceReview}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span
          className={
            isEditorial
              ? 'rounded border border-zinc-200/70 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600'
              : 'rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold text-gray-600'
          }
        >
          {ticket.assignee}
        </span>

        <span
          className={`flex items-center gap-1 text-[10px] font-medium ${
            urgent
              ? isEditorial
                ? 'text-rose-700/70'
                : 'text-rose-500'
              : isResolved
                ? isEditorial
                  ? 'text-emerald-700/70'
                  : 'text-emerald-500'
                : 'text-zinc-400'
          }`}
        >
          {!isResolved && <Timer className="h-3 w-3" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />}
          {elapsedText}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-end border-t border-zinc-100 pt-2.5">
        {ticket.status === 'open' ? (
          <MoveMenu
            isEditorial={isEditorial}
            menuTitle="Move to"
            options={[
              { status: 'inProgress', label: 'In Progress' },
              { status: 'resolved', label: 'Resolved' },
            ]}
            onSelect={onMoveTo}
          />
        ) : isResolved ? (
          <MoveMenu
            isEditorial={isEditorial}
            menuTitle="Move back to"
            options={[
              { status: 'inProgress', label: 'In Progress' },
              { status: 'open', label: 'Open Issues' },
            ]}
            onSelect={onMoveTo}
          />
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onMoveTo(COLUMN_IDS[columnIndex - 1])}
              aria-label={`Move "${ticket.title}" to the previous status`}
              className={
                isEditorial
                  ? 'flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors duration-150 hover:border-zinc-900 hover:bg-zinc-900 hover:text-zinc-50'
                  : 'flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-600 transition-colors duration-150 hover:border-gray-900 hover:bg-gray-900 hover:text-white'
              }
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </button>
            <span className={isEditorial ? 'text-[9px] font-medium uppercase tracking-wider text-zinc-400' : 'text-[10px] font-semibold uppercase tracking-wider text-gray-400'}>
              Move
            </span>
            <button
              type="button"
              onClick={() => onMoveTo(COLUMN_IDS[columnIndex + 1])}
              aria-label={`Move "${ticket.title}" to the next status`}
              className={
                isEditorial
                  ? 'flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors duration-150 hover:border-zinc-900 hover:bg-zinc-900 hover:text-zinc-50'
                  : 'flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-600 transition-colors duration-150 hover:border-gray-900 hover:bg-gray-900 hover:text-white'
              }
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Both edge columns (Open and Resolved) have two plausible destinations
// once you leave them, so instead of silently picking one, ask which
// status the ticket should move to.
function MoveMenu({
  isEditorial,
  menuTitle,
  options,
  onSelect,
}: {
  isEditorial: boolean
  menuTitle: string
  options: { status: CaseStatus; label: string }[]
  onSelect: (status: CaseStatus) => void
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
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

  const optionClass = isEditorial
    ? 'block w-full rounded-md px-2.5 py-1.5 text-left text-xs text-zinc-600 transition-colors duration-150 hover:bg-zinc-50 hover:text-zinc-900'
    : 'block w-full rounded-md px-2.5 py-1.5 text-left text-sm text-gray-600 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900'

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className={
          isEditorial
            ? 'flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-600 transition-colors duration-150 hover:border-zinc-900 hover:bg-zinc-900 hover:text-zinc-50'
            : 'flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-600 transition-colors duration-150 hover:border-gray-900 hover:bg-gray-900 hover:text-white'
        }
      >
        <RotateCcw className="h-3.5 w-3.5" strokeWidth={isEditorial ? 1.5 : 2} aria-hidden="true" />
        Move
      </button>

      {open && (
        <div
          className={
            isEditorial
              ? 'absolute right-0 top-[calc(100%+0.375rem)] z-20 min-w-[150px] overflow-hidden rounded-lg border border-zinc-200/80 bg-white p-1 shadow-md shadow-zinc-900/5'
              : 'absolute right-0 top-[calc(100%+0.375rem)] z-20 min-w-[150px] overflow-hidden rounded-lg border border-gray-100 bg-white p-1 shadow-xl shadow-gray-200/50'
          }
        >
          <p className={isEditorial ? 'px-2.5 pb-1 pt-1 text-[9px] uppercase tracking-wider text-zinc-300' : 'px-2.5 pb-1 pt-1 text-[9px] uppercase tracking-wider text-gray-300'}>
            {menuTitle}
          </p>
          {options.map((option) => (
            <button
              key={option.status}
              type="button"
              onClick={() => {
                onSelect(option.status)
                setOpen(false)
              }}
              className={optionClass}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const STATUS_META: Record<CaseStatus, { label: string; editorialColor: string; classicColor: string }> = {
  open: { label: 'Open', editorialColor: 'bg-rose-700/70', classicColor: 'bg-rose-500' },
  inProgress: { label: 'In Progress', editorialColor: 'bg-amber-500/80', classicColor: 'bg-amber-400' },
  resolved: { label: 'Resolved', editorialColor: 'bg-emerald-700/70', classicColor: 'bg-emerald-500' },
}

function IssuesByDepartmentChart({ tickets, isEditorial }: { tickets: CaseTicket[]; isEditorial: boolean }) {
  const departments = Array.from(new Set(tickets.map((t) => t.assignee)))
  const rows = departments
    .map((dep) => {
      const deptTickets = tickets.filter((t) => t.assignee === dep)
      return {
        dep,
        open: deptTickets.filter((t) => t.status === 'open').length,
        inProgress: deptTickets.filter((t) => t.status === 'inProgress').length,
        resolved: deptTickets.filter((t) => t.status === 'resolved').length,
        total: deptTickets.length,
      }
    })
    .sort((a, b) => b.total - a.total)

  const maxTotal = Math.max(...rows.map((r) => r.total), 1)

  return (
    <div>
      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.dep}>
            <div className="flex items-center justify-between text-xs">
              <span className={isEditorial ? 'font-medium text-zinc-900' : 'font-medium text-gray-900'}>
                {row.dep}
              </span>
              <span className={isEditorial ? 'tabular-nums text-zinc-400' : 'tabular-nums text-gray-400'}>
                {row.total} {row.total === 1 ? 'issue' : 'issues'}
              </span>
            </div>
            <div
              className={
                isEditorial
                  ? 'mt-1.5 flex h-1.5 w-full overflow-hidden rounded-full bg-zinc-100'
                  : 'mt-1.5 flex h-2 w-full overflow-hidden rounded-full bg-gray-100'
              }
            >
              {(['open', 'inProgress', 'resolved'] as CaseStatus[]).map((status) =>
                row[status] > 0 ? (
                  <motion.div
                    key={status}
                    initial={{ width: 0 }}
                    animate={{ width: `${(row[status] / maxTotal) * 100}%` }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className={`h-full first:rounded-l-full last:rounded-r-full ${
                      isEditorial ? STATUS_META[status].editorialColor : STATUS_META[status].classicColor
                    }`}
                  />
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-zinc-100 pt-4">
        {(['open', 'inProgress', 'resolved'] as CaseStatus[]).map((status) => (
          <div key={status} className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isEditorial ? STATUS_META[status].editorialColor : STATUS_META[status].classicColor
              }`}
              aria-hidden="true"
            />
            <span className={isEditorial ? 'text-[10px] uppercase tracking-[0.08em] text-zinc-400' : 'text-xs text-gray-400'}>
              {STATUS_META[status].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
