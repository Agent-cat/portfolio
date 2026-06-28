import type { Metadata } from 'next'
import Image from 'next/image'
import { WorkCard } from '@/app/components/WorkCard'
import workData from '@/data/work.json'

export const metadata: Metadata = {
  title: 'Work — Portfolio',
  description: 'My work experiences across different companies and roles.',
}

export default function WorkPage() {
  const { heading, jobs } = workData

  return (
    <section className="w-full px-4 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
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
          <h1
            className="px-16 py-6 text-center text-xl font-bold text-zinc-900 dark:text-zinc-50"
            style={{ fontFamily: 'var(--font-courgette)' }}
          >
            {heading}
          </h1>
          <Image
            src="/floral.png"
            alt=""
            width={120}
            height={120}
            className="absolute -right-16 top-1/2 -translate-y-1/2 rotate-90 opacity-40 dark:opacity-20 pointer-events-none"
          />
        </div>

        {/* Job list */}
        <div className="space-y-6">
          {jobs.map((job, i) => (
            <WorkCard key={`${job.company}-${i}`} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}
