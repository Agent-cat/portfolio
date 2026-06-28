import Image from 'next/image'
import {
  SiVercel,
  SiGooglegemini,
  SiUdemy,
  SiNodedotjs,
  SiTypescript,
  SiDocker,
  SiMongodb,
  SiNextdotjs,
  SiReact,
  SiPostgresql,
  SiPython,
  SiGithub,
  SiGit,
  SiTailwindcss,
  SiFramer,
  SiFigma,
  SiGraphql,
  SiRedis,
  SiShadcnui,
  SiSupabase,
  SiTurborepo,
  SiOpenai,
  SiAnthropic,
  SiPosthog,
} from 'react-icons/si'
import { LuBadgeCheck, LuArrowUpRight } from 'react-icons/lu'
import type { IconType } from 'react-icons'
import certificationsData from '@/data/certifications.json'

// ── Icon registry — add more issuers as needed ───────────────────────────────
const iconMap: Record<string, { Icon: IconType; color: string }> = {
  SiVercel:      { Icon: SiVercel,       color: '#000000' },
  SiGooglegemini:{ Icon: SiGooglegemini, color: '#4285F4' },
  SiUdemy:       { Icon: SiUdemy,        color: '#A435F0' },
  SiNodedotjs:   { Icon: SiNodedotjs,    color: '#339933' },
  SiTypescript:  { Icon: SiTypescript,   color: '#3178C6' },
  SiDocker:      { Icon: SiDocker,       color: '#2496ED' },
  SiMongodb:     { Icon: SiMongodb,      color: '#47A248' },
  SiNextdotjs:   { Icon: SiNextdotjs,    color: '#000000' },
  SiReact:       { Icon: SiReact,        color: '#61DAFB' },
  SiPostgresql:  { Icon: SiPostgresql,   color: '#4169E1' },
  SiPython:      { Icon: SiPython,       color: '#3776AB' },
  SiGithub:      { Icon: SiGithub,       color: '#181717' },
  SiGit:         { Icon: SiGit,          color: '#F05032' },
  SiTailwindcss: { Icon: SiTailwindcss,  color: '#06B6D4' },
  SiFramer:      { Icon: SiFramer,       color: '#0055FF' },
  SiFigma:       { Icon: SiFigma,        color: '#F24E1E' },
  SiGraphql:     { Icon: SiGraphql,      color: '#E10098' },
  SiRedis:       { Icon: SiRedis,        color: '#DC382D' },
  SiShadcnui:    { Icon: SiShadcnui,     color: '#18181B' },
  SiSupabase:    { Icon: SiSupabase,     color: '#3ECF8E' },
  SiTurborepo:   { Icon: SiTurborepo,    color: '#EF4444' },
  SiOpenai:      { Icon: SiOpenai,       color: '#412991' },
  SiAnthropic:   { Icon: SiAnthropic,    color: '#D97757' },
  SiPosthog:     { Icon: SiPosthog,      color: '#F54E00' },
}

export function CertificationsSection() {
  const { certifications } = certificationsData
  const count = certifications.length

  return (
    <section aria-label="Certifications" className="w-full px-6 pb-12">
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
          <h2 className="px-16 py-6 text-center text-xl font-bold text-zinc-900 dark:text-zinc-50" style={{ fontFamily: 'var(--font-courgette)' }}>
            Certifications
            <span className="ml-2 text-sm font-normal text-zinc-400 dark:text-zinc-500">
              ({count})
            </span>
          </h2>
          <Image
            src="/floral.png"
            alt=""
            width={120}
            height={120}
            className="absolute -right-16 top-1/2 -translate-y-1/2 rotate-90 opacity-40 dark:opacity-20 pointer-events-none"
          />
        </div>

        <div className="relative border border-zinc-200 dark:border-zinc-800">
          <Image src="/border.png" alt="" width={48} height={48} className="absolute top-0 left-0 -translate-x-[34%] -translate-y-[34%] pointer-events-none opacity-70 border-flourish" />
          <Image src="/border.png" alt="" width={48} height={48} className="absolute top-0 right-0 translate-x-[34%] -translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-x-100" />
          <Image src="/border.png" alt="" width={48} height={48} className="absolute bottom-0 left-0 -translate-x-[34%] translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-y-100" />
          <Image src="/border.png" alt="" width={48} height={48} className="absolute bottom-0 right-0 translate-x-[34%] translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-x-100 -scale-y-100" />
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {certifications.map((cert) => {
              const entry = cert.icon ? iconMap[cert.icon] : undefined

              return (
                <li key={`${cert.name}-${cert.date}`}>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                  >
                    {/* Issuer icon badge */}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
                      {entry ? (
                        <entry.Icon size={16} style={{ color: entry.color }} aria-hidden="true" />
                      ) : (
                        <LuBadgeCheck size={16} className="text-zinc-400" aria-hidden="true" />
                      )}
                    </span>

                    {/* Name + meta */}
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {cert.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                        <span>@ {cert.issuer}</span>
                        <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">|</span>
                        <span>{cert.date}</span>
                      </p>
                    </div>

                    {/* External link arrow */}
                    <LuArrowUpRight
                      size={15}
                      className="shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500 dark:text-zinc-600 dark:group-hover:text-zinc-400"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              )
            })}
          </ul>

        </div>
      </div>
    </section>
  )
}
