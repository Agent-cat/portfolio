import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import { BlogSearch } from '@/app/components/BlogSearch'
import { SectionHeader } from '@/app/components/SectionHeader'

export const metadata: Metadata = {
  title: 'Blog — Portfolio',
  description: 'Writing about code, design, and everything in between.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section className="w-full px-4 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title="Blog" as="h1" />

        {/* Search + grid */}
        <BlogSearch posts={posts} />
      </div>
    </section>
  )
}
