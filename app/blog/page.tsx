import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { BlogSearch } from '@/app/components/BlogSearch'

export const metadata: Metadata = {
  title: 'Blog — Portfolio',
  description: 'Writing about code, design, and everything in between.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <p className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">Blog</p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Writing about code, design,
            <br />
            and everything in between.
          </h1>
        </div>

        {/* Search + grid */}
        <BlogSearch posts={posts} />
      </div>
    </section>
  )
}
