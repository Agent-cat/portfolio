'use client'

import Image from 'next/image'
import Link from 'next/link'
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
  SiPostgresql,
  SiDocker,
  SiGraphql,
  SiRedis,
  SiMongodb,
  SiSupabase,
  SiShadcnui,
  SiFramer,
  SiBun,
  SiPython,
  SiGit,
  SiGithub,
  SiKubernetes,
  SiRabbitmq,
  SiMongoose,
  SiTwilio,
} from 'react-icons/si'
import { LuGithub, LuExternalLink, LuImage } from 'react-icons/lu'
import type { IconType } from 'react-icons'

// ── Icon registry ─────────────────────────────────────────────────────────────
const iconMap: Record<string, { Icon: IconType; color: string; darkColor: string }> = {
  SiNextdotjs:   { Icon: SiNextdotjs,   color: '#000000', darkColor: '#FFFFFF' },
  SiTailwindcss: { Icon: SiTailwindcss,  color: '#06B6D4', darkColor: '#06B6D4' },
  SiTypescript:  { Icon: SiTypescript,   color: '#3178C6', darkColor: '#3178C6' },
  SiReact:       { Icon: SiReact,        color: '#61DAFB', darkColor: '#61DAFB' },
  SiFigma:       { Icon: SiFigma,        color: '#F24E1E', darkColor: '#F24E1E' },
  SiVercel:      { Icon: SiVercel,       color: '#000000', darkColor: '#FFFFFF' },
  SiPrisma:      { Icon: SiPrisma,       color: '#2D3748', darkColor: '#94A3B8' },
  SiTurborepo:   { Icon: SiTurborepo,    color: '#EF4444', darkColor: '#EF4444' },
  SiNodedotjs:   { Icon: SiNodedotjs,    color: '#339933', darkColor: '#4ADE80' },
  SiPostgresql:  { Icon: SiPostgresql,   color: '#4169E1', darkColor: '#60A5FA' },
  SiDocker:      { Icon: SiDocker,       color: '#2496ED', darkColor: '#38BDF8' },
  SiGraphql:     { Icon: SiGraphql,      color: '#E10098', darkColor: '#F472B6' },
  SiRedis:       { Icon: SiRedis,        color: '#DC382D', darkColor: '#F87171' },
  SiMongodb:     { Icon: SiMongodb,      color: '#47A248', darkColor: '#4ADE80' },
  SiSupabase:    { Icon: SiSupabase,     color: '#3ECF8E', darkColor: '#34D399' },
  SiShadcnui:    { Icon: SiShadcnui,     color: '#18181B', darkColor: '#FAFAFA' },
  SiFramer:      { Icon: SiFramer,       color: '#0055FF', darkColor: '#3B82F6' },
  SiBun:         { Icon: SiBun,          color: '#FBF0DF', darkColor: '#FBBF24' },
  SiPython:      { Icon: SiPython,       color: '#3776AB', darkColor: '#60A5FA' },
  SiGit:         { Icon: SiGit,          color: '#F05032', darkColor: '#F87171' },
  SiGithub:      { Icon: SiGithub,       color: '#181717', darkColor: '#FAFAFA' },
  SiKubernetes:  { Icon: SiKubernetes,   color: '#326CE5', darkColor: '#326CE5' },
  SiRabbitmq:    { Icon: SiRabbitmq,     color: '#FF6600', darkColor: '#FF6600' },
  SiMongoose:    { Icon: SiMongoose,     color: '#880000', darkColor: '#F05032' },
  SiTwilio:      { Icon: SiTwilio,       color: '#F22F46', darkColor: '#F22F46' },
}

// ── Status badge style map ───────────────────────────────────────────────────
const statusStyles: Record<string, string> = {
  Live:     'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400',
  WIP:      'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400',
  Archived: 'border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400',
}

const statusDot: Record<string, string> = {
  Live:     'bg-emerald-500',
  WIP:      'bg-amber-500',
  Archived: 'bg-zinc-400',
}

// ── Types ────────────────────────────────────────────────────────────────────
interface Technology {
  name: string
  icon: string
}

export interface Project {
  name: string
  description: string
  image: string | null
  status: string
  year: string
  githubUrl: string | null
  liveUrl: string | null
  technologies: Technology[]
}

// ── Component ────────────────────────────────────────────────────────────────
function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function ProjectCard({ project }: { project: Project }) {
  const { name, description, image, status, year, githubUrl, liveUrl, technologies } = project
  const slug = toSlug(name)

  return (
    <article className="group relative flex items-start gap-4 px-6 py-5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
      {/* Invisible overlay link for the entire card */}
      <Link href={`/projects/${slug}`} className="absolute inset-0 z-10" aria-label={`View project ${name}`} />

      {/* Thumbnail */}
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        {image ? (
          <Image
            src={image}
            alt={`${name} screenshot`}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <LuImage size={20} className="text-zinc-300 dark:text-zinc-600" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{name}</h2>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusStyles[status] ?? statusStyles.Archived}`}
              >
                <span className={`h-1 w-1 rounded-full ${statusDot[status] ?? statusDot.Archived}`} aria-hidden="true" />
                {status}
              </span>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">{year}</span>
            </div>
            <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>

          {/* Links — right side */}
          {(githubUrl || liveUrl) && (
            <div className="relative flex shrink-0 items-center gap-1.5 z-20">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View source on GitHub"
                  className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                >
                  <LuGithub size={12} aria-hidden="true" />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View live site"
                  className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                >
                  <LuExternalLink size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Tech icons */}
        <ul className="mt-2.5 flex flex-wrap items-center gap-1.5" aria-label="Technologies used">
          {technologies.map((tech) => {
            const entry = iconMap[tech.icon]
            if (!entry) return null
            const { Icon, color, darkColor } = entry
            return (
              <li key={tech.icon}>
                <span
                  className="inline-flex h-6 items-center gap-1 rounded-md border border-zinc-200 bg-white pl-1 pr-2 dark:border-zinc-700 dark:bg-zinc-800"
                  style={{ '--icon-light': color, '--icon-dark': darkColor } as React.CSSProperties}
                >
                  <Icon size={12} className="shrink-0 light-icon" aria-hidden="true" />
                  <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400">{tech.name}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}
