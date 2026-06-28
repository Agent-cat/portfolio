import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { LuChevronLeft } from 'react-icons/lu'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { getAllProjects, getProjectSource } from '@/lib/projects'
import { mdxComponents } from '@/app/components/mdxComponents'

interface Params {
  slug: string
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const source = getProjectSource(slug)
  if (!source) return {}

  const match = source.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return { title: slug }

  const frontmatter: Record<string, string> = {}
  match[1].split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) {
      frontmatter[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '')
    }
  })

  return { title: `${frontmatter.title ?? slug} — Projects` }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const source = getProjectSource(slug)
  if (!source) notFound()

  // Strip frontmatter
  const content = source.replace(/^---\n[\s\S]*?\n---\n/, '')

  return (
    <div className="w-full px-6 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Top nav bar */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <LuChevronLeft size={15} aria-hidden="true" />
            Projects
          </Link>
        </div>

        {/* MDX rendered via next-mdx-remote with rehype-pretty-code */}
        <article>
          <MDXRemote
            source={content}
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
      </div>
    </div>
  )
}
