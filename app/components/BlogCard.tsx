import Image from 'next/image'
import Link from 'next/link'
import { LuImage, LuPin } from 'react-icons/lu'
import type { BlogMeta } from '@/lib/blog'

export function BlogCard({ post }: { post: BlogMeta }) {
  const { slug, title, date, cover, pinned } = post

  return (
    <Link
      href={`/blog/${slug}/1`}
      className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
    >
      {/* Cover image */}
      <div className="relative h-44 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 336px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <LuImage size={32} className="text-zinc-300 dark:text-zinc-700" aria-hidden="true" />
          </div>
        )}

        {/* Pinned badge — sits in the top-right corner of the image */}
        {pinned && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-zinc-900/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm dark:bg-zinc-50/80 dark:text-zinc-900">
            <LuPin size={10} aria-hidden="true" />
            Pinned
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="p-4">
        <h2 className="text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-50 group-hover:underline group-hover:underline-offset-2">
          {title}
        </h2>
        <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-600">{date}</p>
      </div>
    </Link>
  )
}
