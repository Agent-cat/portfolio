import Image from 'next/image'
import { LuGraduationCap } from 'react-icons/lu'
import educationData from '@/data/education.json'
import { SectionHeader } from './SectionHeader'

export function EducationSection() {
  const { entries } = educationData

  return (
    <section aria-label="Education" className="w-full px-4 sm:px-6 pb-12">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title="Education" />

        <div className="relative border border-zinc-200 dark:border-zinc-800">
          <Image src="/border.png" alt="" width={48} height={48} className="absolute top-0 left-0 -translate-x-[34%] -translate-y-[34%] pointer-events-none opacity-70 border-flourish" />
          <Image src="/border.png" alt="" width={48} height={48} className="absolute top-0 right-0 translate-x-[34%] -translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-x-100" />
          <Image src="/border.png" alt="" width={48} height={48} className="absolute bottom-0 left-0 -translate-x-[34%] translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-y-100" />
          <Image src="/border.png" alt="" width={48} height={48} className="absolute bottom-0 right-0 translate-x-[34%] translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-x-100 -scale-y-100" />
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {entries.map((entry) => (
              <li key={entry.degree}>
                <div className="flex items-start gap-4 px-6 py-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
                    <LuGraduationCap size={16} className="text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {entry.degree}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                      {entry.institution} &middot; {entry.location}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                        CGPA: {entry.gpa}
                      </span>
                      {entry.period && (
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                          {entry.period}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
