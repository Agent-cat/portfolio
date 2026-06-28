'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  SiTypescript,
  SiJavascript,
  SiRust,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiRadixui,
  SiFramer,
  SiGsap,
  SiNodedotjs,
  SiBun,
  SiActix,
  SiTrpc,
  SiSocket,
  SiRsocket,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiGithubactions,
  SiCloudflareworkers,
  SiApachekafka,
  SiRabbitmq,
  SiVitest,
  SiJunit5,
  SiPrometheus,
  SiGrafana,
} from 'react-icons/si'
import { BiLogoJava } from 'react-icons/bi'
import { TbLambda } from 'react-icons/tb'
import type { IconType } from 'react-icons'
import skillsData from '@/data/skills.json'

// ── Icon registry ────────────────────────────────────────────────────────────
const iconMap: Record<string, { Icon: IconType; color: string; darkColor: string }> = {
  SiTypescript:      { Icon: SiTypescript,      color: '#3178C6', darkColor: '#3178C6' },
  SiJavascript:      { Icon: SiJavascript,      color: '#F7DF1E', darkColor: '#F7DF1E' },
  BiLogoJava:        { Icon: BiLogoJava,        color: '#ED8B00', darkColor: '#ED8B00' },
  SiRust:            { Icon: SiRust,            color: '#CE422B', darkColor: '#CE422B' },
  SiReact:           { Icon: SiReact,           color: '#61DAFB', darkColor: '#61DAFB' },
  SiNextdotjs:       { Icon: SiNextdotjs,       color: '#000000', darkColor: '#FFFFFF' },
  SiTailwindcss:     { Icon: SiTailwindcss,     color: '#06B6D4', darkColor: '#06B6D4' },
  SiShadcnui:        { Icon: SiShadcnui,        color: '#18181B', darkColor: '#FAFAFA' },
  SiRadixui:         { Icon: SiRadixui,         color: '#1D4ED8', darkColor: '#60A5FA' },
  SiFramer:          { Icon: SiFramer,          color: '#0055FF', darkColor: '#3B82F6' },
  SiGsap:            { Icon: SiGsap,            color: '#08CE00', darkColor: '#22C55E' },
  SiNodedotjs:       { Icon: SiNodedotjs,       color: '#339933', darkColor: '#4ADE80' },
  SiBun:             { Icon: SiBun,             color: '#FBF0DF', darkColor: '#FBBF24' },
  SiActix:           { Icon: SiActix,           color: '#000000', darkColor: '#FAFAFA' },
  SiTrpc:            { Icon: SiTrpc,            color: '#398CCB', darkColor: '#38BDF8' },
  SiSocket:          { Icon: SiSocket,          color: '#0364B8', darkColor: '#60A5FA' },
  SiRsocket:         { Icon: SiRsocket,         color: '#EC7600', darkColor: '#FB923C' },
  SiPostgresql:      { Icon: SiPostgresql,      color: '#4169E1', darkColor: '#60A5FA' },
  SiMysql:           { Icon: SiMysql,           color: '#4479A1', darkColor: '#38BDF8' },
  SiMongodb:         { Icon: SiMongodb,         color: '#47A248', darkColor: '#4ADE80' },
  SiRedis:           { Icon: SiRedis,           color: '#DC382D', darkColor: '#F87171' },
  SiDocker:          { Icon: SiDocker,          color: '#2496ED', darkColor: '#38BDF8' },
  SiKubernetes:      { Icon: SiKubernetes,      color: '#326CE5', darkColor: '#60A5FA' },
  SiJenkins:         { Icon: SiJenkins,         color: '#D33833', darkColor: '#F87171' },
  SiGithubactions:   { Icon: SiGithubactions,   color: '#2088FF', darkColor: '#60A5FA' },
  TbLambda:          { Icon: TbLambda,          color: '#FF9900', darkColor: '#FB923C' },
  SiCloudflareworkers:{ Icon: SiCloudflareworkers, color: '#F48120', darkColor: '#FB923C' },
  SiApachekafka:     { Icon: SiApachekafka,     color: '#231F20', darkColor: '#FAFAFA' },
  SiRabbitmq:        { Icon: SiRabbitmq,        color: '#FF6600', darkColor: '#FB923C' },
  SiVitest:          { Icon: SiVitest,          color: '#729B1B', darkColor: '#A3E635' },
  SiJunit5:          { Icon: SiJunit5,          color: '#E51428', darkColor: '#F87171' },
  SiPrometheus:      { Icon: SiPrometheus,      color: '#E6522C', darkColor: '#FB923C' },
  SiGrafana:         { Icon: SiGrafana,         color: '#F46800', darkColor: '#FB923C' },
}

// ── Skill card ───────────────────────────────────────────────────────────────
function SkillCard({ name, icon }: { name: string; icon: string }) {
  const entry = iconMap[icon]
  if (!entry) return null
  const { Icon, color, darkColor } = entry

  return (
    <li className="w-full sm:w-auto">
      <span className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-2 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-zinc-600">
        <Icon
          size={14}
          className="light-icon"
          style={{ '--icon-light': color, '--icon-dark': darkColor } as React.CSSProperties}
          aria-hidden="true"
        />
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{name}</span>
      </span>
    </li>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────
export function SkillsSection() {
  const { heading, categories } = skillsData
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  return (
    <section aria-label="Skills" className="w-full px-4 sm:px-6 pb-12">
      <div className="mx-auto max-w-3xl">
        <div
          className="mx-auto max-w-5xl border-y border-zinc-200 dark:border-zinc-800 mb-6 relative z-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, transparent, transparent 4px, rgba(200,200,200,0.15) 4px, rgba(200,200,200,0.15) 5px)',
          }}
        >
          <Image
            src="/floral.png"
            alt=""
            width={120}
            height={120}
            className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 opacity-40 dark:opacity-20 pointer-events-none"
          />
          <h2 className="px-16 py-6 text-center text-xl font-bold text-zinc-900 dark:text-zinc-50" style={{ fontFamily: 'var(--font-courgette)' }}>{heading}</h2>
          <Image
            src="/floral.png"
            alt=""
            width={120}
            height={120}
            className="absolute -right-16 top-1/2 -translate-y-1/2 rotate-90 opacity-40 dark:opacity-20 pointer-events-none"
          />
        </div>

        {/* Categories */}
        <div className="space-y-7">
          {categories.map((cat) => {
            const isExpanded = expanded[cat.label] ?? false
            const skillsToShow = isExpanded ? cat.skills : cat.skills.slice(0, 6)
            const hasMore = cat.skills.length > 6

            return (
              <div key={cat.label}>
                {/* Category label */}
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {cat.label}
                </h3>

                {/* Skills */}
                <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2">
                  {skillsToShow.map((skill) => (
                    <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
                  ))}
                </ul>

                {/* Show more button — mobile only */}
                {hasMore && (
                  <button
                    onClick={() => setExpanded((prev) => ({ ...prev, [cat.label]: !prev[cat.label] }))}
                    className="mt-2 text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 sm:hidden"
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
