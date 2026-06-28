'use client'

import { useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiReact,
  SiFigma,
  SiVercel,
  SiPrisma,
  SiTurborepo,
  SiNodedotjs,
  SiBun,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiGraphql,
  SiRedis,
  SiMongodb,
  SiSupabase,
  SiShadcnui,
  SiFramer,
  SiVitest,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

// ── Icon registry — add more here as needed ─────────────────────────────────
const iconMap: Record<string, { Icon: IconType; color: string; darkColor: string }> = {
  SiNextdotjs:    { Icon: SiNextdotjs,    color: '#000000', darkColor: '#FFFFFF' },
  SiTailwindcss:  { Icon: SiTailwindcss,  color: '#06B6D4', darkColor: '#06B6D4' },
  SiTypescript:   { Icon: SiTypescript,   color: '#3178C6', darkColor: '#3178C6' },
  SiReact:        { Icon: SiReact,        color: '#61DAFB', darkColor: '#61DAFB' },
  SiFigma:        { Icon: SiFigma,        color: '#F24E1E', darkColor: '#F24E1E' },
  SiVercel:       { Icon: SiVercel,       color: '#000000', darkColor: '#FFFFFF' },
  SiPrisma:       { Icon: SiPrisma,       color: '#2D3748', darkColor: '#94A3B8' },
  SiTurborepo:    { Icon: SiTurborepo,    color: '#EF4444', darkColor: '#EF4444' },
  SiNodedotjs:    { Icon: SiNodedotjs,    color: '#339933', darkColor: '#4ADE80' },
  SiBun:          { Icon: SiBun,          color: '#FBF0DF', darkColor: '#FBBF24' },
  SiPostgresql:   { Icon: SiPostgresql,   color: '#4169E1', darkColor: '#60A5FA' },
  SiDocker:       { Icon: SiDocker,       color: '#2496ED', darkColor: '#38BDF8' },
  SiKubernetes:   { Icon: SiKubernetes,   color: '#326CE5', darkColor: '#60A5FA' },
  SiGithubactions:{ Icon: SiGithubactions,color: '#2088FF', darkColor: '#60A5FA' },
  SiGraphql:      { Icon: SiGraphql,      color: '#E10098', darkColor: '#F472B6' },
  SiRedis:        { Icon: SiRedis,        color: '#DC382D', darkColor: '#F87171' },
  SiMongodb:      { Icon: SiMongodb,      color: '#47A248', darkColor: '#4ADE80' },
  SiSupabase:     { Icon: SiSupabase,     color: '#3ECF8E', darkColor: '#34D399' },
  SiShadcnui:     { Icon: SiShadcnui,     color: '#000000', darkColor: '#FAFAFA' },
  SiFramer:       { Icon: SiFramer,       color: '#0055FF', darkColor: '#3B82F6' },
  SiVitest:       { Icon: SiVitest,       color: '#729B1B', darkColor: '#A3E635' },
}

// ── Types mirroring work.json ────────────────────────────────────────────────
interface Technology {
  name: string
  icon: string
}

interface Job {
  company: string
  role: string
  startDate: string
  endDate: string
  location: string
  workType: string
  status: string | null
  image?: string
  technologies: Technology[]
  highlights: string[]
}

// ── Date helpers ─────────────────────────────────────────────────────────────
const monthMap: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
}

function parseDate(str: string): Date | null {
  const [month, year] = str.split(' ')
  const m = monthMap[month]
  const y = parseInt(year)
  if (m === undefined || isNaN(y)) return null
  return new Date(y, m)
}

const monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatShort(date: Date): string {
  return `${monthAbbr[date.getMonth()]} ${date.getFullYear()}`
}

function getDuration(start: string, end: string): string {
  const s = parseDate(start)
  const e = end.toLowerCase() === 'present' ? new Date() : parseDate(end)
  if (!s || !e) return ''
  const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
  if (months < 1) return '<1m'
  const y = Math.floor(months / 12)
  const m = months % 12
  if (y > 0 && m > 0) return `${y}y ${m}m`
  if (y > 0) return `${y}y`
  return `${m}m`
}

// ── Tree connector branch ────────────────────────────────────────────────────
function TreeBranch({ isLast = false }: { isLast?: boolean }) {
  return (
    <div className="absolute left-0 top-0 flex h-full" aria-hidden="true">
      <div className={`w-px bg-zinc-200 dark:bg-zinc-700 ${isLast ? 'h-[14px]' : 'h-full'}`} />
      <div className="absolute top-[14px] h-px w-4 bg-zinc-200 dark:bg-zinc-700" />
    </div>
  )
}

// ── Component ────────────────────────────────────────────────────────────────
export function WorkCard({ job }: { job: Job }) {
  const { company, role, startDate, endDate, location, workType, status, image, technologies, highlights } = job
  const [highlightsOpen, setHighlightsOpen] = useState(true)

  const s = parseDate(startDate)
  const e = endDate.toLowerCase() === 'present' ? null : parseDate(endDate)
  const dateRange = s ? `${formatShort(s)}–${e ? formatShort(e) : '∞'}` : `${startDate}–${endDate}`
  const duration = getDuration(startDate, endDate)

  return (
    <article className="relative p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-start gap-2.5 sm:gap-3">
        {image && (
          <img
            src={image}
            alt={`${company} logo`}
            className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full object-cover"
          />
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50">{company}</h2>
            {status && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[9px] sm:text-[10px] font-medium text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <span className="h-1 w-1 rounded-full bg-emerald-500" aria-hidden="true" />
                {status}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{role}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-1 sm:gap-x-1.5 text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500">
            <span>{workType}</span>
            <span aria-hidden="true">|</span>
            <span>{dateRange}</span>
            <span aria-hidden="true">|</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>

      {/* Branch: What I've done */}
      <div className="relative mt-4 sm:mt-6 pl-6 sm:pl-8">
        <TreeBranch />
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            What I&apos;ve done
          </h3>
          <button
            type="button"
            onClick={() => setHighlightsOpen(!highlightsOpen)}
            className="shrink-0 flex flex-col items-center gap-0.5 rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label={highlightsOpen ? 'Collapse highlights' : 'Expand highlights'}
          >
            <HiChevronUp className={`h-3 w-3 ${highlightsOpen ? 'text-zinc-900 dark:text-zinc-100' : ''}`} />
            <HiChevronDown className={`h-3 w-3 ${!highlightsOpen ? 'text-zinc-900 dark:text-zinc-100' : ''}`} />
          </button>
        </div>
        {highlightsOpen && (
          <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
            {highlights.map((point, i) => (
              <li key={i} className="flex gap-2 sm:gap-2.5 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Branch: Technologies & Tools */}
      <div className="relative mt-4 sm:mt-6 pl-6 sm:pl-8">
        <TreeBranch isLast />
        <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Technologies &amp; Tools
        </h3>
        <ul className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2" aria-label="Technologies used">
          {technologies.map((tech) => {
            const entry = iconMap[tech.icon]
            if (!entry) return null
            const { Icon, color, darkColor } = entry
            return (
              <li key={tech.icon}>
                <span className="inline-flex h-7 sm:h-8 items-center gap-1 sm:gap-1.5 rounded-lg border border-zinc-200 bg-white pl-1.5 pr-2 sm:pl-2 sm:pr-3 dark:border-zinc-700 dark:bg-zinc-800">
                  <Icon
                    size={12}
                    className="shrink-0 light-icon sm:hidden"
                    style={{ '--icon-light': color, '--icon-dark': darkColor } as React.CSSProperties}
                    aria-hidden="true"
                  />
                  <Icon
                    size={14}
                    className="shrink-0 light-icon hidden sm:block"
                    style={{ '--icon-light': color, '--icon-dark': darkColor } as React.CSSProperties}
                    aria-hidden="true"
                  />
                  <span className="text-[10px] sm:text-xs font-medium text-zinc-600 dark:text-zinc-300">
                    {tech.name}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}
