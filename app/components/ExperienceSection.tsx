'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SectionHeader } from './SectionHeader'
import { LuChevronsUpDown, LuArrowRight } from 'react-icons/lu'
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
  SiStrapi,
  SiAuth0,
  SiNginx,
  SiGooglecloud,
  SiDocusaurus,
  SiVitest,
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import workData from '@/data/work.json'

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
  SiStrapi:       { Icon: SiStrapi,       color: '#2F2E8B', darkColor: '#818CF8' },
  SiAuth0:        { Icon: SiAuth0,        color: '#EB5424', darkColor: '#FB923C' },
  SiNginx:        { Icon: SiNginx,        color: '#009639', darkColor: '#4ADE80' },
  SiGooglecloud:  { Icon: SiGooglecloud,  color: '#4285F4', darkColor: '#60A5FA' },
  SiDocusaurus:   { Icon: SiDocusaurus,   color: '#3ECC5F', darkColor: '#4ADE80' },
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

// ── Date parsing & formatting helper ──────────────────────────────────────────
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

function formatMonthYear(str: string): string {
  if (str.toLowerCase() === 'present') return '∞'
  const parsed = parseDate(str)
  if (!parsed) return str
  const mm = String(parsed.getMonth() + 1).padStart(2, '0')
  return `${mm}.${parsed.getFullYear()}`
}

function getDuration(start: string, end: string): string {
  const s = parseDate(start)
  const e = end.toLowerCase() === 'present' ? new Date() : parseDate(end)
  if (!s || !e) return ''
  // Calculate inclusive month count
  const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()) + 1
  if (months < 1) return '<1m'
  const y = Math.floor(months / 12)
  const m = months % 12
  if (y > 0 && m > 0) return `${y}y ${m}m`
  if (y > 0) return `${y}y`
  return `${m}m`
}

// ── Main Component ───────────────────────────────────────────────────────────
export function ExperienceSection() {
  const hasMore = workData.jobs.length > 3
  const topJobs = workData.jobs.slice(0, 3)

  // Group jobs by company to maintain layout structure (multi-role friendly)
  interface GroupedCompany {
    company: string
    location: string
    workType: string
    status: string | null
    image?: string
    roles: {
      role: string
      startDate: string
      endDate: string
      technologies: Technology[]
      highlights: string[]
    }[]
  }

  const groupedCompanies: GroupedCompany[] = []

  topJobs.forEach((job) => {
    const j = job as Job
    let existing = groupedCompanies.find((c) => c.company === j.company)
    if (!existing) {
      existing = {
        company: j.company,
        location: j.location,
        workType: j.workType,
        status: j.status,
        image: j.image,
        roles: [],
      }
      groupedCompanies.push(existing)
    }
    existing.roles.push({
      role: job.role,
      startDate: job.startDate,
      endDate: job.endDate,
      technologies: job.technologies,
      highlights: job.highlights,
    })
  })

  // State to track expanded highlights for each role: "companyIndex-roleIndex"
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({
    // Expand the first role of the first company by default
    '0-0': true,
  })

  const toggleRole = (key: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <section aria-label="Work Experience" className="mx-auto w-full max-w-3xl px-6 pb-16">
      <SectionHeader title="Experience" />

      {/* Timeline Companies List */}
      <div className="space-y-10">
        {groupedCompanies.map((comp, compIdx) => {
          const isCurrentCompany = comp.status === 'Working'

          return (
            <div key={comp.company} className="group/company">
              {/* Company Header Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Company Logo or Fallback Letter */}
                  {comp.image ? (
                    <img
                      src={comp.image}
                      alt={`${comp.company} logo`}
                      className="h-9 w-9 shrink-0 rounded-full object-cover border border-zinc-100 dark:border-zinc-800 shadow-sm"
                    />
                  ) : (
                    <div className="h-9 w-9 shrink-0 rounded-full bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-200 font-bold flex items-center justify-center text-sm border border-zinc-200 dark:border-zinc-700 shadow-sm">
                      {comp.company.charAt(0)}
                    </div>
                  )}
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {comp.company}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-normal text-zinc-400 dark:text-zinc-500">
                  <span>
                    {comp.location} ({comp.workType})
                  </span>
                  {isCurrentCompany && (
                    <span className="relative flex h-2 w-2" title="Current Position">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                  )}
                </div>
              </div>

              {/* Roles list inside this company */}
              <div className="relative ml-2">
                {comp.roles.map((roleInfo, roleIdx) => {
                  const roleKey = `${compIdx}-${roleIdx}`
                  const isExpanded = !!expandedRoles[roleKey]
                  const isFirst = roleIdx === 0
                  const isLast = roleIdx === comp.roles.length - 1

                  const dateRange = `${formatMonthYear(roleInfo.startDate)}–${formatMonthYear(roleInfo.endDate)}`
                  const duration = getDuration(roleInfo.startDate, roleInfo.endDate)

                  // Gather sub-items to render as individual rows in the tree structure
                  interface SubRow {
                    type: 'highlights' | 'skills'
                    hasBranch: boolean
                    isLastRow: boolean
                    content: React.ReactNode
                  }

                  const subRows: SubRow[] = []

                  if (isExpanded && roleInfo.highlights.length > 0) {
                    subRows.push({
                      type: 'highlights',
                      hasBranch: false, // Bypass Highlights (do not connect line)
                      isLastRow: false,
                      content: (
                        <ul className="space-y-2.5">
                          {roleInfo.highlights.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-2.5 text-[13px] leading-relaxed text-zinc-650 dark:text-zinc-400 font-normal"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ),
                    })
                  }

                  subRows.push({
                    type: 'skills',
                    hasBranch: true, // Connect branch line to Skills/Technologies
                    isLastRow: true,
                    content: (
                      <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
                        {roleInfo.technologies.map((tech) => {
                          const entry = iconMap[tech.icon]
                          const Icon = entry?.Icon
                          const color = entry?.color
                          const darkColor = entry?.darkColor
                          return (
                            <li key={tech.name}>
                              <span
                                className="inline-flex items-center gap-1.5 px-2.5 py-0.75 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-xs"
                              >
                                {Icon && (
                                  <Icon
                                    size={12}
                                    className="shrink-0 light-icon"
                                    style={{ '--icon-light': color, '--icon-dark': darkColor } as React.CSSProperties}
                                    aria-hidden="true"
                                  />
                                )}
                                <span>{tech.name}</span>
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    ),
                  })

                  return (
                    <div key={roleInfo.role} className="flex flex-col pb-6 last:pb-2">
                      {/* 1. Role Header Row */}
                      <div className="flex items-start gap-3 relative">
                        {/* Left Gutter for Role Connector (Branches to Role Title) */}
                        <div className="shrink-0 w-6 self-stretch relative min-h-[28px]">
                          {/* Vertical timeline line segment */}
                          <div
                            className={`w-px bg-zinc-200 dark:bg-zinc-800 absolute left-1/2 -translate-x-1/2 bottom-0 ${
                              isFirst ? 'top-[-16px]' : 'top-0'
                            }`}
                          />
                          {/* Horizontal branch line directly to Role Title */}
                          <div className="h-px w-3 bg-zinc-200 dark:bg-zinc-800 absolute left-1/2 right-0 top-[14px]" />
                        </div>

                        {/* Role Details */}
                        <div className="flex-1 min-w-0 pb-2">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                              {roleInfo.role}
                            </h4>
                            <button
                              type="button"
                              onClick={() => toggleRole(roleKey)}
                              className="shrink-0 flex items-center justify-center p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800/60 transition-all duration-200"
                              aria-label={isExpanded ? 'Collapse description' : 'Expand description'}
                            >
                              <LuChevronsUpDown size={14} className="text-zinc-400 dark:text-zinc-500" />
                            </button>
                          </div>

                          <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                            <span>{comp.workType}</span>
                            <span>•</span>
                            <span>{dateRange}</span>
                            <span>•</span>
                            <span>{duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* 2. Sub-rows (Highlights & Skills with selective branching) */}
                      <div className="flex flex-col">
                        {subRows.map((row) => {
                          const terminatesHere = isLast && row.isLastRow

                          return (
                            <div key={row.type} className="flex items-start gap-3 relative">
                              {/* Left Gutter for Sub-connector lines */}
                              <div className="shrink-0 w-6 self-stretch relative min-h-[32px] flex items-center justify-center">
                                {/* Vertical line */}
                                <div
                                  className={`w-px bg-zinc-200 dark:bg-zinc-800 absolute left-1/2 -translate-x-1/2 top-0 ${
                                    terminatesHere ? 'h-[14px]' : 'bottom-0'
                                  }`}
                                />
                                {/* Optional branch (only for Skills/Technologies) */}
                                {row.hasBranch && (
                                  <div className="h-px bg-zinc-200 dark:bg-zinc-800 absolute left-1/2 right-0 top-[14px]" />
                                )}
                              </div>

                              {/* Content Column */}
                              <div className={`flex-1 min-w-0 pt-1 ${row.isLastRow ? '' : 'pb-6'}`}>
                                {row.content}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* See more link */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
          >
            See more
            <LuArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>
      )}
    </section>
  )
}
