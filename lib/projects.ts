import fs from 'node:fs'
import path from 'node:path'

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

export interface ProjectMeta {
  slug: string
  title: string
  description: string
}

/** Read all project metadata. */
export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(PROJECTS_DIR)) return []

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => {
      const slug = file.replace('.mdx', '')
      const source = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8')
      const match = source.match(/^---\n([\s\S]*?)\n---/)
      if (!match) return null

      const frontmatter: Record<string, string> = {}
      match[1].split('\n').forEach((line) => {
        const [key, ...rest] = line.split(':')
        if (key && rest.length) {
          frontmatter[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '')
        }
      })

      return {
        slug,
        title: frontmatter.title ?? slug,
        description: frontmatter.description ?? '',
      }
    })
    .filter((p): p is ProjectMeta => p !== null)
}

/** Read MDX source for a single project. Returns null if not found. */
export function getProjectSource(slug: string): string | null {
  const mdxPath = path.join(PROJECTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(mdxPath)) return null
  return fs.readFileSync(mdxPath, 'utf8')
}
