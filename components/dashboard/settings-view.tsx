'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/views'
import { Toggle } from './toggle'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

import { useDashboardTheme } from './dashboard-theme-context'
import { DemoGuideBanner } from './demo-guide-banner'
import { SlidersHorizontal } from 'lucide-react'

function SettingsRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'

  return (
    <div className={isEditorial ? 'flex items-center justify-between gap-6 py-4' : 'flex items-center justify-between gap-6 py-5'}>
      <div>
        <p className={isEditorial ? 'text-xs font-semibold text-zinc-900' : 'text-sm font-medium text-gray-900'}>{label}</p>
        <p className={isEditorial ? 'mt-0.5 text-xs text-zinc-400' : 'mt-0.5 text-xs text-gray-400'}>{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

export function SettingsView() {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'
  const [emailReviews, setEmailReviews] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [negativeAlerts, setNegativeAlerts] = useState(true)
  const [betaFeatures, setBetaFeatures] = useState(false)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="mx-auto max-w-3xl px-8 py-10"
    >
      <motion.div variants={fadeUp}>
        <p className={isEditorial ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'text-xs font-semibold uppercase tracking-wider text-gray-400'}>
          Workspace
        </p>
        <h1 className={isEditorial ? 'mt-1.5 text-2xl font-light tracking-tight text-zinc-900' : 'mt-2 text-3xl font-light tracking-tight text-gray-900'}>
          Settings
        </h1>
        <p className={isEditorial ? 'mt-1 text-xs text-zinc-500' : 'mt-1.5 text-sm text-gray-500'}>
          Manage your account, alerts, and integrations
        </p>
      </motion.div>

      {/* Demo Presentation Overlay Banner */}
      <DemoGuideBanner
        className="mt-6"
        icon={SlidersHorizontal}
        moduleTitle="Alerts, Email Notifications & Platform Settings"
        tag="Custom Setup"
        description="Set up instant email or SMS alerts whenever a guest posts a low rating (under 3 stars), schedule weekly summary reports for your executive board, and customize your AI reply tone settings."
      />

      <motion.div
        variants={fadeUp}
        className={
          isEditorial
            ? 'mt-8 rounded-lg border border-zinc-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
            : 'mt-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
        }
      >
        <h2 className={isEditorial ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'text-xs font-semibold uppercase tracking-wider text-gray-400'}>
          Account
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={isEditorial ? 'mb-1.5 block text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-400'}>
              Company
            </label>
            <div className={isEditorial ? 'rounded-lg border border-zinc-200/60 bg-zinc-50/70 px-3 py-2 text-xs text-zinc-700' : 'rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-700'}>
              Auren Hospitality Group
            </div>
          </div>
          <div>
            <label className={isEditorial ? 'mb-1.5 block text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-400'}>
              Corporate Email
            </label>
            <div className={isEditorial ? 'rounded-lg border border-zinc-200/60 bg-zinc-50/70 px-3 py-2 text-xs text-zinc-700' : 'rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-700'}>
              ops@aurenhospitality.com
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className={
          isEditorial
            ? 'mt-4 rounded-lg border border-zinc-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
            : 'mt-5 rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
        }
      >
        <h2 className={isEditorial ? 'text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400' : 'text-xs font-semibold uppercase tracking-wider text-gray-400'}>
          Notifications
        </h2>
        <div className="mt-2 divide-y divide-zinc-100">
          <SettingsRow
            label="New review alerts"
            description="Email me when a new review is indexed from any source"
            checked={emailReviews}
            onChange={setEmailReviews}
          />
          <SettingsRow
            label="Weekly GRI digest"
            description="A summary of your Guest Rating Index sent every Monday"
            checked={weeklyDigest}
            onChange={setWeeklyDigest}
          />
          <SettingsRow
            label="Negative sentiment alerts"
            description="Immediate notification for reviews scoring below 3/5"
            checked={negativeAlerts}
            onChange={setNegativeAlerts}
          />
          <SettingsRow
            label="Early access features"
            description="Opt in to beta features from the Semantic Engine team"
            checked={betaFeatures}
            onChange={setBetaFeatures}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
