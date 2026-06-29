import type { Metadata } from 'next'
import Image from 'next/image'
import { WorkCard } from '@/app/components/WorkCard'
import workData from '@/data/work.json'
import { SectionHeader } from '@/app/components/SectionHeader'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Explore the professional experience and engineering roles of Vishnu Vardhan Mandala in software development.',
}

export default function WorkPage() {
  const { heading, jobs } = workData

  return (
    <section className="w-full px-4 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title={heading} as="h1" />

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
