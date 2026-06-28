import Image, { type ImageProps } from 'next/image'
import type { MDXComponents } from 'mdx/types'
import { CodeBlockWrapper } from './CodeBlockWrapper'

export const mdxComponents: MDXComponents = {
  // ── Headings ──────────────────────────────────────────────────────────
  h1: ({ children }) => (
    <h1 className="mt-8 mb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-50">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
      {children}
    </h3>
  ),

  // ── Body ──────────────────────────────────────────────────────────────
  p: ({ children }) => (
    <p className="mb-5 leading-7 text-zinc-700 dark:text-zinc-300">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 ml-6 space-y-1.5 list-none">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 ml-6 space-y-1.5 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" aria-hidden="true" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-5 border-l-2 border-zinc-300 pl-4 italic text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,

  // ── Code ──────────────────────────────────────────────────────────────
  // rehype-pretty-code replaces <pre><code> with highlighted spans and
  // adds data-language / data-theme attributes.
  // CodeBlockWrapper adds the header bar + copy button around it.
  pre: (props) => <CodeBlockWrapper {...props} />,

  // Inline code stays simple
  code: ({ children, ...props }) => (
    <code
      className="inline rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
      {...props}
    >
      {children}
    </code>
  ),

  // ── Inline ────────────────────────────────────────────────────────────
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="underline underline-offset-2 text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-zinc-600 dark:text-zinc-400">{children}</em>
  ),

  // ── Images ────────────────────────────────────────────────────────────
  img: (props) => (
    <span className="my-6 block overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <Image
        sizes="(max-width: 768px) 100vw, 672px"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
        alt={props.alt ?? ''}
      />
    </span>
  ),
}
