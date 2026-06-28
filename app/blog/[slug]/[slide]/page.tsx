import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { LuArrowLeft, LuArrowRight, LuChevronLeft } from 'react-icons/lu'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { getPostMeta } from '@/lib/blog'
import { mdxComponents } from '@/app/components/mdxComponents'
import { BlogPageUI } from '@/app/components/BlogPageUI'

interface Params {
  slug: string
  slide: string
}

export async function generateStaticParams() {
  const { getAllPosts } = await import('@/lib/blog')
  const posts = getAllPosts()
  return posts.flatMap((post) =>
    Array.from({ length: post.slideCount }, (_, i) => ({
      slug: post.slug,
      slide: String(i + 1),
    })),
  )
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const meta = getPostMeta(slug)
  if (!meta) return {}
  return { title: `${meta.title} — Blog` }
}

export default async function BlogSlidePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug, slide } = await params
  const slideNum = parseInt(slide, 10)

  const meta = getPostMeta(slug)
  if (!meta || isNaN(slideNum) || slideNum < 1 || slideNum > meta.slideCount) {
    notFound()
  }

  // Read the MDX file as a raw string
  const mdxPath = path.join(process.cwd(), 'content', 'blog', slug, `${slideNum}.mdx`)
  if (!fs.existsSync(mdxPath)) notFound()
  const source = fs.readFileSync(mdxPath, 'utf8')

  const hasPrev = slideNum > 1
  const hasNext = slideNum < meta.slideCount
  const isMultiSlide = meta.slideCount > 1

  return (
    <div className="w-full px-6 py-10">
      <BlogPageUI />
      <div className="mx-auto max-w-3xl">

        {/* Top nav bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <LuChevronLeft size={15} aria-hidden="true" />
            Blog
          </Link>
          {isMultiSlide && (
            <span className="text-xs text-zinc-400 dark:text-zinc-600">
              {slideNum} / {meta.slideCount}
            </span>
          )}
        </div>

        {/* MDX rendered via next-mdx-remote with rehype-pretty-code */}
        <article>
          <MDXRemote
            source={source}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        light: 'github-light',
                        dark: 'github-dark',
                      },
                      keepBackground: false,
                      defaultLang: 'plaintext',
                      bypassInlineCode: true,
                    },
                  ],
                ],
              },
            }}
          />
        </article>

        {/* Prev / Next navigation */}
        {isMultiSlide && (
          <nav
            className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800"
            aria-label="Slide navigation"
          >
            {hasPrev ? (
              <Link
                href={`/blog/${slug}/${slideNum - 1}`}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
              >
                <LuArrowLeft size={14} aria-hidden="true" />
                Previous
              </Link>
            ) : (
              <div />
            )}
            {hasNext ? (
              <Link
                href={`/blog/${slug}/${slideNum + 1}`}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Next
                <LuArrowRight size={14} aria-hidden="true" />
              </Link>
            ) : (
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Back to Blog
                <LuArrowLeft size={14} aria-hidden="true" />
              </Link>
            )}
          </nav>
        )}

      </div>
    </div>
  )
}
