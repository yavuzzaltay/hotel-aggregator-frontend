'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  FileSpreadsheet,
  Download,
  Printer,
  X,
  Sparkles,
  CheckCircle2,
  Building2,
  Calendar,
  Filter,
  Eye,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Users,
  AlertCircle,
  MessageSquare,
} from 'lucide-react'
import { useDashboardTheme } from './dashboard-theme-context'
import type { DateRange } from '@/data/mockDashboard'
import { generateComprehensiveReport, type ComprehensiveReportData } from '@/lib/dynamic-data'
import { downloadExcelReport, triggerPdfPrint } from '@/lib/pdf-excel-exporter'

export function ExportReportModal({
  isOpen,
  onClose,
  dateRange,
  property,
  activeFilters,
}: {
  isOpen: boolean
  onClose: () => void
  dateRange: DateRange
  property: string
  activeFilters: Set<string>
}) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'

  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf')
  const [showLivePreview, setShowLivePreview] = useState(false)
  const [exportingState, setExportingState] = useState<'idle' | 'exporting' | 'success'>('idle')

  if (!isOpen) return null

  // Generate dynamic report data tailored to exact active filters
  const report: ComprehensiveReportData = generateComprehensiveReport({
    dateRange,
    property,
    activeFilters,
  })

  const handleExport = (format: 'pdf' | 'excel') => {
    setExportingState('exporting')
    setTimeout(() => {
      if (format === 'pdf') {
        triggerPdfPrint(report)
      } else {
        downloadExcelReport(report)
      }
      setExportingState('success')
      setTimeout(() => {
        setExportingState('idle')
      }, 2000)
    }, 600)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`relative my-8 w-full max-w-4xl rounded-2xl shadow-2xl ${
            isEditorial
              ? 'border border-zinc-200/80 bg-zinc-50 text-zinc-900'
              : 'border border-gray-100 bg-white text-gray-900'
          }`}
        >
          {/* Modal Header */}
          <div
            className={`flex items-center justify-between border-b px-6 py-4 ${
              isEditorial ? 'border-zinc-200/80 bg-white' : 'border-gray-100 bg-gray-50/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  isEditorial ? 'bg-zinc-900 text-zinc-50' : 'bg-blue-600 text-white'
                }`}
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2
                  className={
                    isEditorial
                      ? 'text-lg font-light tracking-tight text-zinc-900'
                      : 'text-xl font-semibold text-gray-900'
                  }
                >
                  Export Operations &amp; Intelligence Report
                </h2>
                <p className="text-xs text-gray-500">
                  Choose format to download comprehensive portfolio data
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Active Scope Summary Banner */}
            <div
              className={`rounded-xl p-4 text-xs ${
                isEditorial
                  ? 'border border-zinc-200 bg-white shadow-xs'
                  : 'border border-blue-100 bg-blue-50/60 text-blue-950'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold uppercase tracking-wider text-[10px] text-gray-500">
                  Target Scope &amp; Filter Parameters
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                  ID: {report.metadata.reportId}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 font-medium">
                <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-gray-200/80">
                  <Calendar className="h-3.5 w-3.5 text-blue-600" />
                  <span>Date: {dateRange}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-gray-200/80">
                  <Building2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Property: {property}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-gray-200/80">
                  <Filter className="h-3.5 w-3.5 text-purple-600" />
                  <span>Filters: {report.metadata.activeFiltersList.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Choose Format Grid */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Select Export Format
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* PDF Option Card */}
                <div
                  onClick={() => setSelectedFormat('pdf')}
                  className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 relative overflow-hidden ${
                    selectedFormat === 'pdf'
                      ? isEditorial
                        ? 'border-zinc-900 bg-zinc-900/5 shadow-md ring-1 ring-zinc-900'
                        : 'border-blue-600 bg-blue-50/40 shadow-md ring-1 ring-blue-600'
                      : isEditorial
                        ? 'border-zinc-200 bg-white hover:border-zinc-400'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-rose-100 p-2.5 text-rose-600">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">PDF Document</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Visual Executive Report (.pdf)
                        </p>
                      </div>
                    </div>
                    {selectedFormat === 'pdf' && (
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <ul className="mt-4 space-y-1.5 text-xs text-gray-600">
                    <li className="flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3 text-gray-400" /> Executive GRI™ Scorecard &amp; NPS Gauge
                    </li>
                    <li className="flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3 text-gray-400" /> 17-Property Performance Matrix
                    </li>
                    <li className="flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3 text-gray-400" /> Team KPIs &amp; SLA Compliance Table
                    </li>
                    <li className="flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3 text-gray-400" /> Print &amp; PDF Export Ready
                    </li>
                  </ul>
                </div>

                {/* Excel Option Card */}
                <div
                  onClick={() => setSelectedFormat('excel')}
                  className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 relative overflow-hidden ${
                    selectedFormat === 'excel'
                      ? isEditorial
                        ? 'border-zinc-900 bg-zinc-900/5 shadow-md ring-1 ring-zinc-900'
                        : 'border-emerald-600 bg-emerald-50/40 shadow-md ring-1 ring-emerald-600'
                      : isEditorial
                        ? 'border-zinc-200 bg-white hover:border-zinc-400'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-emerald-100 p-2.5 text-emerald-600">
                        <FileSpreadsheet className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">Excel Workbook</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Raw Data Spreadsheet (.csv / .xlsx)
                        </p>
                      </div>
                    </div>
                    {selectedFormat === 'excel' && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    )}
                  </div>
                  <ul className="mt-4 space-y-1.5 text-xs text-gray-600">
                    <li className="flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3 text-gray-400" /> Complete Raw Datasets &amp; Metrics
                    </li>
                    <li className="flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3 text-gray-400" /> Structured Tables for Excel / Sheets
                    </li>
                    <li className="flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3 text-gray-400" /> All Case Tickets &amp; Review Logs
                    </li>
                    <li className="flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3 text-gray-400" /> Instant CSV Download
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Toggle Live Preview */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowLivePreview(!showLivePreview)}
                className="flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Eye className="h-4 w-4" />
                {showLivePreview ? 'Hide Full Live Report Preview' : '👁️ Preview Full Report Document On-Screen'}
              </button>
            </div>

            {/* Live Interactive Preview Drawer */}
            <AnimatePresence>
              {showLivePreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl border border-gray-200 bg-zinc-900 text-white p-5 space-y-6 overflow-hidden max-h-[400px] overflow-y-auto text-xs"
                >
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
                    <div>
                      <h4 className="font-bold text-sm text-zinc-100 uppercase tracking-widest">
                        {report.metadata.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400">{report.metadata.subtitle}</p>
                    </div>
                    <span className="rounded bg-zinc-800 px-2 py-1 text-[10px] text-zinc-300 font-mono">
                      {report.metadata.reportId}
                    </span>
                  </div>

                  {/* Executive Scorecard */}
                  <div>
                    <h5 className="font-semibold text-zinc-400 uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> Executive Scorecard
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="rounded-lg bg-zinc-800 p-3 border border-zinc-700">
                        <span className="text-[10px] text-zinc-400 block">GRI™ Index</span>
                        <span className="text-xl font-bold text-emerald-400">{report.executiveSummary.griScore}%</span>
                        <span className="text-[9px] text-emerald-300 block">{report.executiveSummary.griChange}</span>
                      </div>
                      <div className="rounded-lg bg-zinc-800 p-3 border border-zinc-700">
                        <span className="text-[10px] text-zinc-400 block">Net Promoter Score</span>
                        <span className="text-xl font-bold text-blue-400">+{report.executiveSummary.npsScore}</span>
                        <span className="text-[9px] text-zinc-400 block">Promoters {report.executiveSummary.sentimentPositivePct}%</span>
                      </div>
                      <div className="rounded-lg bg-zinc-800 p-3 border border-zinc-700">
                        <span className="text-[10px] text-zinc-400 block">Indexed Reviews</span>
                        <span className="text-xl font-bold text-amber-400">{report.executiveSummary.totalReviews.toLocaleString()}</span>
                        <span className="text-[9px] text-zinc-400 block">Target: {report.executiveSummary.reviewsTarget.toLocaleString()}</span>
                      </div>
                      <div className="rounded-lg bg-zinc-800 p-3 border border-zinc-700">
                        <span className="text-[10px] text-zinc-400 block">Response Rate</span>
                        <span className="text-xl font-bold text-purple-400">{report.executiveSummary.responseRate}%</span>
                        <span className="text-[9px] text-purple-300 block">{report.executiveSummary.avgResponseTimeHours}h avg time</span>
                      </div>
                    </div>
                  </div>

                  {/* Property Breakdown */}
                  <div>
                    <h5 className="font-semibold text-zinc-400 uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-blue-400" /> Portfolio Properties (17 Total)
                    </h5>
                    <div className="space-y-1.5">
                      {report.propertyBreakdown.slice(0, 5).map((p) => (
                        <div key={p.id} className="flex items-center justify-between bg-zinc-800/80 px-3 py-2 rounded border border-zinc-700/60 text-[11px]">
                          <div>
                            <span className="font-medium text-zinc-100">{p.name}</span>
                            <span className="text-[10px] text-zinc-400 ml-2">({p.location})</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-zinc-400">{p.totalReviews} reviews</span>
                            <span className="font-bold text-emerald-400">{p.griScore}% GRI</span>
                          </div>
                        </div>
                      ))}
                      {report.propertyBreakdown.length > 5 && (
                        <p className="text-[10px] text-zinc-500 italic text-center pt-1">
                          + {report.propertyBreakdown.length - 5} more properties included in export...
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Team KPIs */}
                  <div>
                    <h5 className="font-semibold text-zinc-400 uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-purple-400" /> Team KPIs &amp; Staff Performance
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {report.teamKpis.members.map((m) => (
                        <div key={m.id} className="bg-zinc-800 p-2.5 rounded border border-zinc-700">
                          <div className="flex justify-between">
                            <span className="font-semibold text-zinc-200">{m.name}</span>
                            <span className="text-emerald-400 font-bold">{m.csatScore}/5.0 CSAT</span>
                          </div>
                          <p className="text-[10px] text-zinc-400">{m.role} · {m.reviewsHandled} reviews</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Case Management */}
                  <div>
                    <h5 className="font-semibold text-zinc-400 uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5 text-rose-400" /> Case Tickets &amp; Incident SLA
                    </h5>
                    <div className="space-y-1">
                      {report.caseManagement.tickets.slice(0, 3).map((t) => (
                        <div key={t.id} className="flex justify-between items-center bg-zinc-800 px-3 py-1.5 rounded text-[11px]">
                          <div>
                            <span className="font-mono text-rose-400">{t.ticketNumber}</span>
                            <span className="ml-2 text-zinc-200">{t.title}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-zinc-700 text-zinc-200">{t.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Modal Footer */}
          <div
            className={`flex items-center justify-between border-t px-6 py-4 ${
              isEditorial ? 'border-zinc-200/80 bg-white' : 'border-gray-100 bg-gray-50'
            }`}
          >
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Full Portfolio Security &amp; Compliance Verified</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleExport(selectedFormat)}
                disabled={exportingState === 'exporting'}
                className={`flex items-center gap-2 rounded-lg px-5 py-2 text-xs font-semibold text-white shadow-md transition-all ${
                  selectedFormat === 'pdf'
                    ? isEditorial
                      ? 'bg-zinc-900 hover:bg-zinc-800'
                      : 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                } disabled:opacity-50`}
              >
                {exportingState === 'exporting' ? (
                  <>
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Generating {selectedFormat.toUpperCase()}...</span>
                  </>
                ) : exportingState === 'success' ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{selectedFormat.toUpperCase()} Downloaded!</span>
                  </>
                ) : (
                  <>
                    {selectedFormat === 'pdf' ? <Printer className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                    <span>Export {selectedFormat.toUpperCase()} Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
