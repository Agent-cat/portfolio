'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface ContributionDay {
  date: string
  count: number
}

const GREEN = [
  'bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
  'bg-emerald-100 border border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-900',
  'bg-emerald-200 border border-emerald-300 dark:bg-emerald-900/60 dark:border-emerald-800',
  'bg-emerald-400 border border-emerald-500 dark:bg-emerald-700/70 dark:border-emerald-600',
  'bg-emerald-700 border border-emerald-800 dark:bg-emerald-500 dark:border-emerald-400',
]

function getLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

interface GitHubHeatmapProps {
  username: string
  initialData?: {
    total: number
    contributions: ContributionDay[]
  } | null
}

export function GitHubHeatmap({ username, initialData }: GitHubHeatmapProps) {
  const [data, setData] = useState<ContributionDay[]>(initialData?.contributions || [])
  const [total, setTotal] = useState(initialData?.total || 0)
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState(false)
  const [hovered, setHovered] = useState<{ day: ContributionDay; x: number; y: number } | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialData) {
      setData(initialData.contributions)
      setTotal(initialData.total)
      setLoading(false)
      return
    }

    fetch(`/api/github-contributions?username=${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json() as Promise<{ total: number; contributions: ContributionDay[] }>
      })
      .then((json) => {
        setTotal(json.total)
        setData(json.contributions)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [username, initialData])

  // Dismiss tooltip on scroll
  useEffect(() => {
    if (!hovered) return
    const handle = () => setHovered(null)
    window.addEventListener('scroll', handle, true)
    return () => window.removeEventListener('scroll', handle, true)
  }, [hovered])

  // Dismiss tooltip on outside tap (mobile)
  useEffect(() => {
    if (!hovered) return
    const handle = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-heatmap-cell]')) setHovered(null)
    }
    document.addEventListener('touchstart', handle)
    return () => document.removeEventListener('touchstart', handle)
  }, [hovered])

  const showTooltip = useCallback(
    (day: ContributionDay, el: HTMLElement) => {
      const wrap = wrapRef.current?.getBoundingClientRect()
      const rect = el.getBoundingClientRect()
      if (!wrap) return
      setHovered({
        day,
        x: rect.left + rect.width / 2 - wrap.left,
        y: rect.top - wrap.top - 8,
      })
    },
    []
  )

  if (loading) {
    return (
      <div className="mt-6 animate-pulse rounded-lg border border-zinc-200 bg-white p-3 sm:p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="h-3 w-40 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mt-3 flex gap-[3px]">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, j) => (
                <div key={j} className="h-[10px] w-[10px] sm:h-[11px] sm:w-[11px] bg-zinc-100 dark:bg-zinc-800" />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || data.length === 0) return null

  // Trim to today
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const filtered = data.filter((d) => new Date(d.date + 'T00:00:00') <= today)

  // Pad start for weekday alignment
  const firstDow = new Date(filtered[0].date + 'T00:00:00').getDay()
  const padded: (ContributionDay | null)[] = [
    ...Array.from({ length: firstDow }, () => null),
    ...filtered,
  ]

  // Group into weeks
  const weeks: (ContributionDay | null)[][] = []
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7))
  }

  // Month label positions
  const monthPositions: { label: string; week: number }[] = []
  let lastMonth = -1
  weeks.forEach((week, i) => {
    const first = week.find((d) => d !== null)
    if (first) {
      const m = new Date(first.date + 'T00:00:00').getMonth()
      if (m !== lastMonth) {
        monthPositions.push({ label: MONTHS[m], week: i })
        lastMonth = m
      }
    }
  })

  const CELL = 10
  const GAP = 3
  const STEP = CELL + GAP
  const gridWidth = weeks.length * STEP - GAP

  return (
    <div className="mt-6">
      <div
        ref={wrapRef}
        className="relative rounded-lg border border-zinc-200 bg-white p-3 sm:p-4 dark:border-zinc-800 dark:bg-zinc-900"
      >
        {/* Scrollable area */}
        <div className="overflow-x-auto overscroll-x-contain pb-1 -mb-1">
          {/* Month labels */}
          <div className="relative mb-1" style={{ height: 14, minWidth: gridWidth }}>
            {monthPositions.map((m, i) => (
              <span
                key={i}
                className="absolute text-[9px] sm:text-[10px] leading-none text-zinc-400 dark:text-zinc-500"
                style={{ left: m.week * STEP }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Heatmap grid */}
          <div ref={gridRef} className="flex gap-[3px]" style={{ minWidth: gridWidth }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => {
                  if (!day) {
                    return <div key={di} className="h-[10px] w-[10px] sm:h-[11px] sm:w-[11px] bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700" />
                  }
                  const level = getLevel(day.count)
                  return (
                    <div
                      key={di}
                      data-heatmap-cell
                      className={`h-[10px] w-[10px] sm:h-[11px] sm:w-[11px] ${GREEN[level]} touch-manipulation outline-1 outline-offset-1 outline-transparent transition-[outline-color] sm:hover:outline-zinc-300 sm:dark:hover:outline-zinc-600`}
                      onMouseEnter={(e) => showTooltip(day, e.currentTarget)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={(e) => showTooltip(day, e.currentTarget)}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hovered && (
          <div
            className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full rounded-md border border-zinc-200 bg-zinc-900 px-3 py-1.5 text-[11px] leading-tight text-white shadow-lg dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
            style={{ left: hovered.x, top: hovered.y }}
          >
            <span className="font-semibold">{hovered.day.count} contributions</span>
            <br />
            {formatDate(hovered.day.date)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-2 flex flex-col gap-1 text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          <span className="font-medium text-zinc-700 dark:text-zinc-300">{total.toLocaleString()}</span>{' '}
          contributions in the past year
        </span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          {GREEN.map((cls, i) => (
            <div key={i} className={`h-[10px] w-[10px] sm:h-[11px] sm:w-[11px] ${cls}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
