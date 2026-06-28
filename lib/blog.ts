import fs from 'node:fs'
import path from 'node:path'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogMeta {
  slug: string
  title: string
  date: string
  description: string
  cover: string | null
  slideCount: number
  pinned: boolean
  hidden: boolean
}

/** Read all visible posts — pinned first, then sorted by date descending. */
export function getAllPosts(): BlogMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const slugs = fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  return slugs
    .map((slug) => getPostMeta(slug))
    .filter((p): p is BlogMeta => p !== null && !p.hidden)
    .sort((a, b) => {
      // Pinned posts always float to the top
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return parseDate(b.date) - parseDate(a.date)
    })
}

/** Read metadata for a single post. Returns null if the post doesn't exist. */
export function getPostMeta(slug: string): BlogMeta | null {
  const dir = path.join(BLOG_DIR, slug)
  const metaFile = path.join(dir, 'meta.json')

  if (!fs.existsSync(metaFile)) return null

  let meta: {
    title: string
    date: string
    description: string
    cover?: string
    pinned?: boolean
    hidden?: boolean
  }
  try {
    meta = JSON.parse(fs.readFileSync(metaFile, 'utf8').trim())
  } catch {
    return null
  }

  // Count .mdx slide files (1.mdx, 2.mdx, …)
  const slideCount = fs
    .readdirSync(dir)
    .filter((f) => /^\d+\.mdx$/.test(f)).length

  return {
    slug,
    title: meta.title,
    date: meta.date,
    description: meta.description,
    cover: meta.cover ?? null,
    slideCount,
    pinned: meta.pinned ?? false,
    hidden: meta.hidden ?? false,
  }
}

/** Parse DD.MM.YYYY into a timestamp for sorting. */
function parseDate(date: string): number {
  const [d, m, y] = date.split('.').map(Number)
  return new Date(y, m - 1, d).getTime()
}
