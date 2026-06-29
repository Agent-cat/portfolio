import type { Metadata } from 'next'
import Image from 'next/image'
import { ProjectCard } from '@/app/components/ProjectCard'
import projectsData from '@/data/projects.json'
import { SectionHeader } from '@/app/components/SectionHeader'

export const metadata: Metadata = {
  title: 'Projects',
  description: "Explore the side projects, open-source work, and software creations built by Vishnu Vardhan Mandala, using modern web technologies.",
}

export default function ProjectsPage() {
  const { heading, projects } = projectsData

  return (
    <section className="w-full px-4 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title={heading} as="h1" />

        {/* Project list */}
        <div className="space-y-1">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
