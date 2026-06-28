'use client'

import { useRef, useState } from 'react'
import { LuCopy, LuCheck } from 'react-icons/lu'

interface CodeBlockWrapperProps {
  children: React.ReactNode
  // rehype-pretty-code injects data-language on the <figure> it wraps,
  // but we receive it forwarded as a prop on our custom <pre>
  'data-language'?: string
  [key: string]: unknown
}

export function CodeBlockWrapper({ children, 'data-language': language, ...rest }: CodeBlockWrapperProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const text = preRef.current?.innerText ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="group relative mb-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      {/* Language label */}
      {language && language !== 'plaintext' && (
        <div className="flex items-center border-b border-zinc-200 px-4 py-1.5 dark:border-zinc-700">
          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
            {language}
          </span>
        </div>
      )}

      {/* Copy button — visible on hover and focus */}
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Copied!' : 'Copy code'}
        className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-400 dark:hover:text-zinc-200 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
      >
        {copied ? (
          <LuCheck size={13} className="text-emerald-500" aria-hidden="true" />
        ) : (
          <LuCopy size={13} aria-hidden="true" />
        )}
      </button>

      {/* pre rendered by rehype-pretty-code — padding handled by CSS */}
      <pre ref={preRef} className="min-w-0 overflow-x-auto" {...rest}>
        {children}
      </pre>
    </div>
  )
}
