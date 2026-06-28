import type { Metadata } from 'next'
import Image from 'next/image'
import { LuDownload } from 'react-icons/lu'
import { SectionHeader } from '@/app/components/SectionHeader'

export const metadata: Metadata = {
  title: 'Resume — Portfolio',
  description: 'Download my resume.',
}

export default function ResumePage() {
  return (
    <section className="w-full px-4 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title="Resume" as="h1" />

        {/* Resume download */}
        <div className="relative border border-zinc-200 dark:border-zinc-800">
          <Image src="/border.png" alt="" width={48} height={48} className="absolute top-0 left-0 -translate-x-[34%] -translate-y-[34%] pointer-events-none opacity-70 border-flourish" />
          <Image src="/border.png" alt="" width={48} height={48} className="absolute top-0 right-0 translate-x-[34%] -translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-x-100" />
          <Image src="/border.png" alt="" width={48} height={48} className="absolute bottom-0 left-0 -translate-x-[34%] translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-y-100" />
          <Image src="/border.png" alt="" width={48} height={48} className="absolute bottom-0 right-0 translate-x-[34%] translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-x-100 -scale-y-100" />

          <a
            href="/resume/VishnuResume.pdf"
            download="VishnuResume.pdf"
            className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
              <LuDownload size={16} className="text-zinc-400" aria-hidden="true" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Download Resume
              </p>
              <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                Save PDF to your device
              </p>
            </div>
            <LuDownload
              size={15}
              className="shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500 dark:text-zinc-600 dark:group-hover:text-zinc-400"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
