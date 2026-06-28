import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      // Allow any https image — covers external blog cover URLs
      { protocol: 'https', hostname: '**' },
    ],
  },
}

// No rehype plugins here — Turbopack can't serialize function objects.
// rehype-pretty-code is applied at render time via next-mdx-remote in the
// blog slide page, which processes MDX strings outside the Turbopack loader.
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
