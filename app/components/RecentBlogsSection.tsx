import Image from 'next/image'
import Link from 'next/link'
import { LuImage, LuArrowRight } from 'react-icons/lu'
import { getAllPosts } from '@/lib/blog'

export function RecentBlogsSection() {
  const posts = getAllPosts().slice(0, 4)
  if (posts.length === 0) return null

  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-16">
      {/* Section header — spans between vertical lines */}
      <div
        className="mx-auto max-w-5xl border-y border-zinc-200 dark:border-zinc-800 mb-6 relative z-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 4px, rgba(200,200,200,0.15) 4px, rgba(200,200,200,0.15) 5px)',
        }}
      >
        <Image
          src="/floral.png"
          alt=""
          width={120}
          height={120}
          className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 opacity-40 dark:opacity-20 pointer-events-none"
        />
        <h2 className="px-16 py-6 text-center text-xl font-bold text-zinc-900 dark:text-zinc-50" style={{ fontFamily: 'var(--font-courgette)' }}>
          Recent posts
        </h2>
        <Image
          src="/floral.png"
          alt=""
          width={120}
          height={120}
          className="absolute -right-16 top-1/2 -translate-y-1/2 rotate-90 opacity-40 dark:opacity-20 pointer-events-none"
        />
      </div>

      {/* 2-col grid */}
      <div className="relative grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 sm:grid-cols-2">
        <Image src="/border.png" alt="" width={48} height={48} className="absolute top-0 left-0 -translate-x-[34%] -translate-y-[34%] pointer-events-none opacity-70 border-flourish" />
        <Image src="/border.png" alt="" width={48} height={48} className="absolute top-0 right-0 translate-x-[34%] -translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-x-100" />
        <Image src="/border.png" alt="" width={48} height={48} className="absolute bottom-0 left-0 -translate-x-[34%] translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-y-100" />
        <Image src="/border.png" alt="" width={48} height={48} className="absolute bottom-0 right-0 translate-x-[34%] translate-y-[34%] pointer-events-none opacity-70 border-flourish -scale-x-100 -scale-y-100" />
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/1`}
            className="group flex flex-col bg-white p-5 transition-colors hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            {/* Thumbnail */}
            <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
              {post.cover ? (
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 336px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <LuImage size={28} className="text-zinc-300 dark:text-zinc-700" aria-hidden="true" />
                </div>
              )}
            </div>

            {/* Text */}
            <p className="text-sm font-semibold leading-snug text-zinc-900 group-hover:underline group-hover:underline-offset-2 dark:text-zinc-50">
              {post.title}
            </p>
            <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-600">
              {post.date}
            </p>
          </Link>
        ))}
        {posts.length < 4 && (
          <div className="bg-white dark:bg-zinc-950" />
        )}
      </div>

      {/* All posts link */}
      <div className="mt-6 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
        >
          All posts
          <LuArrowRight size={12} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
