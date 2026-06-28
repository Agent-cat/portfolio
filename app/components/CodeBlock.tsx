import { codeToHtml } from 'shiki'
import { CopyButton } from './CopyButton'

// Languages we explicitly support — Shiki will fall back to plain text for others
const SUPPORTED_LANGS = [
  'js', 'javascript',
  'ts', 'typescript',
  'tsx', 'jsx',
  'bash', 'sh', 'shell',
  'python', 'py',
  'java',
  'rust',
  'go',
  'css',
  'html',
  'json',
  'yaml', 'yml',
  'mdx', 'md',
  'sql',
  'c', 'cpp',
  'csharp', 'cs',
  'php',
  'ruby', 'rb',
  'swift',
  'kotlin',
  'dockerfile',
  'graphql',
  'plaintext', 'txt',
] as const

type Lang = typeof SUPPORTED_LANGS[number]

function normalizeLang(raw: string | undefined): Lang {
  const lang = (raw ?? '').toLowerCase().trim()
  return (SUPPORTED_LANGS as readonly string[]).includes(lang)
    ? (lang as Lang)
    : 'plaintext'
}

interface CodeBlockProps {
  // raw code string
  code: string
  // language from the fenced block  e.g. "js", "python"
  lang?: string
}

export async function CodeBlock({ code, lang }: CodeBlockProps) {
  const language = normalizeLang(lang)

  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      // light theme
      light: 'github-light',
      // dark theme
      dark: 'github-dark',
    },
    defaultColor: false, // we control which theme applies via CSS
  })

  return (
    <div className="relative mb-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      {/* Language label */}
      {language !== 'plaintext' && (
        <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-1.5 dark:border-zinc-700 dark:bg-[#0d1117]">
          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
            {language}
          </span>
        </div>
      )}

      {/* Highlighted code — Shiki outputs a full <pre><code> block */}
      <div
        className="shiki-wrapper overflow-x-auto p-4 text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Copy button */}
      <CopyButton code={code} />
    </div>
  )
}
