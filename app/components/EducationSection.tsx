import Image from 'next/image'
import { LuGraduationCap } from 'react-icons/lu'
import educationData from '@/data/education.json'

export function EducationSection() {
  const { entries } = educationData

  return (
    <section aria-label="Education" className="w-full px-4 sm:px-6 pb-12">
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
          <h2
            className="px-16 py-6 text-center text-xl font-bold text-zinc-900 dark:text-zinc-50"
            style={{ fontFamily: 'var(--font-courgette)' }}
          >
            Education
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
