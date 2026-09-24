'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/views'
import { useDashboardTheme } from './dashboard-theme-context'

const WIDTH = 100
const HEIGHT = 40
const PADDING = 4

export function TrendLine({ data }: { data: { month: string; value: number }[] }) {
  const { mode } = useDashboardTheme()
  const isEditorial = mode === 'editorial'

  const strokeColor = isEditorial ? '#18181b' : '#2563eb'
  const fillColor = isEditorial ? '#18181b' : '#2563eb'
  const fillOpacity = isEditorial ? '0.08' : '0.35'

  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const points = data.map((d, i) => {
    const x = PADDING + (i / (data.length - 1)) * (WIDTH - PADDING * 2)
    const y =
      HEIGHT - PADDING - ((d.value - min) / range) * (HEIGHT - PADDING * 2)
    return { x, y }
  })

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(' ')

  const areaPath = `${linePath} L${points[points.length - 1].x},${HEIGHT} L${points[0].x},${HEIGHT} Z`

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className="h-44 w-full overflow-visible"
      >
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor} stopOpacity={fillOpacity} />
            <stop offset="100%" stopColor={fillColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath}
          fill="url(#trendFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
        />
        {points.map((p, i) => (
          <motion.circle
            key={data[i].month}
            cx={p.x}
            cy={p.y}
            r="1.2"
            fill={strokeColor}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
          />
        ))}
      </svg>
      <div className="mt-3 flex justify-between text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400">
        {data.map((d) => (
          <span key={d.month}>{d.month}</span>
        ))}
      </div>
    </div>
  )
}
