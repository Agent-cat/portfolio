import Image from 'next/image'
import {
  SiSalesforce,
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
import { SectionHeader } from './SectionHeader'

const CambridgeIcon = ({ size = 16, color = '#003366' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M12 6L7 9V15L12 18L17 15V9L12 6Z" fill={color} />
    <path d="M12 8L9 10V14L12 16L15 14V10L12 8Z" fill="white" />
    <path d="M12 10L10.5 11V13L12 14L13.5 13V11L12 10Z" fill={color} />
  </svg>
)

// ── Icon registry — add more issuers as needed ───────────────────────────────
const iconMap: Record<string, { Icon: IconType | React.FC<{ size?: number; color?: string }>; color: string }> = {
  SiSalesforce:  { Icon: SiSalesforce,   color: '#00A1E0' },
  CambridgeIcon: { Icon: CambridgeIcon,  color: '#003366' },
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
        <SectionHeader
          title={
            <>
              Certifications
              <span className="ml-2 text-sm font-normal text-zinc-400 dark:text-zinc-500">
                ({count})
              </span>
            </>
          }
        />

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
                      {cert.image ? (
                        <Image
                          src={cert.image}
                          alt={`${cert.issuer} logo`}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                      ) : entry ? (
                        'size' in entry.Icon ? (
                          <entry.Icon size={16} color={entry.color} aria-hidden="true" />
                        ) : (
                          <entry.Icon size={16} style={{ color: entry.color }} aria-hidden="true" />
                        )
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
                        {cert.credentialId && (
                          <>
                            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">|</span>
                            <span>ID: {cert.credentialId}</span>
                          </>
                        )}
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
