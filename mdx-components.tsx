import type { MDXComponents } from 'mdx/types'
import { mdxComponents } from '@/app/components/mdxComponents'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxComponents, ...components }
}
