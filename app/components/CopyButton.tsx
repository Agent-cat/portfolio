'use client'

import { useState } from 'react'
import { LuCopy, LuCheck } from 'react-icons/lu'

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md border border-zinc-600 bg-zinc-800 text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-200"
    >
      {copied ? (
        <LuCheck size={13} className="text-emerald-400" aria-hidden="true" />
      ) : (
        <LuCopy size={13} aria-hidden="true" />
      )}
    </button>
  )
}
