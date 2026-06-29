'use client'

import { useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import {
  LuImage,
  LuArrowUpRight,
  LuBookOpen,
  LuChevronDown,
  LuSearch,
  LuMenu,
  LuX,
  LuChevronRight,
} from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import navData from '@/data/navbar.json'
import profileData from '@/data/profile.json'
import { ThemeSwitcher } from './ThemeSwitcher'
import type { BlogMeta } from '@/lib/blog'

const { nav } = navData
const githubHref = profileData.socials.find((s) => s.icon === 'SiGithub')?.href ?? 'https://github.com'

const linkDescriptions: Record<string, string> = {
  '/': 'Homepage & intro',
  '/work': 'Professional experience',
  '/projects': 'Creations & open-source',
  '/blog': 'Articles & writing',
  '/resume': 'CV & credentials',
}

export function NavbarClient({ pinnedPosts }: { pinnedPosts: BlogMeta[] }) {
  const pathname = usePathname()
  const [blogOpen, setBlogOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const keepOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setBlogOpen(true)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setBlogOpen(false), 150)
  }
  const closeBlog = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setBlogOpen(false)
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setBlogOpen(false)
  }, [pathname])

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 border-b border-zinc-200/80 backdrop-blur-xl dark:border-zinc-800/80">
        <div className="relative flex justify-center">
        <div className="absolute inset-y-0 left-1/2 w-full max-w-5xl -translate-x-1/2 bg-white/90 dark:bg-zinc-950/90" />

        <div className="relative w-full max-w-5xl px-4 sm:px-6">
          <div className="grid h-14 grid-cols-3 items-center">
            {/* Col 1 — Hamburger (mobile) / Logo (desktop) */}
            <div className="flex items-center">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="flex md:hidden h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <LuX size={18} aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <LuMenu size={18} aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              {/* Desktop logo */}
              <Link href="/" className="hidden md:inline text-lg font-bold tracking-tight text-zinc-900 transition-opacity hover:opacity-60 dark:text-zinc-50 whitespace-nowrap" style={{ fontFamily: 'var(--font-courgette)' }}>
                Vishnu Mandala
              </Link>
            </div>

            {/* Col 2 — Logo (mobile) / Nav (desktop) */}
            <div className="flex justify-center">
              {/* Mobile logo */}
              <Link href="/" className="md:hidden text-lg font-bold tracking-tight text-zinc-900 transition-opacity hover:opacity-60 dark:text-zinc-50 whitespace-nowrap" style={{ fontFamily: 'var(--font-courgette)' }}>
                Vishnu Mandala
              </Link>
              {/* Desktop nav */}
              <nav aria-label="Main navigation" className="hidden md:flex">
                <ul className="flex items-center gap-0.5">
                  {nav.map((item) => {
                    const isBlog = item.href === '/blog'
                    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

                    if (isBlog) return (
                      <li key={item.href}>
                        <button
                          onMouseEnter={keepOpen}
                          onMouseLeave={scheduleClose}
                          onClick={() => setBlogOpen(o => !o)}
                          aria-expanded={blogOpen}
                          aria-haspopup="true"
                          className={`flex h-8 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none ${
                            isActive || blogOpen
                              ? 'text-zinc-900 dark:text-zinc-50'
                              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                          }`}
                        >
                          {item.label}
                          <motion.span
                            animate={{ rotate: blogOpen ? 180 : 0 }}
                            transition={{ duration: 0.18, ease: 'easeInOut' }}
                            className="text-zinc-400 dark:text-zinc-600"
                          >
                            <LuChevronDown size={12} aria-hidden="true" />
                          </motion.span>
                        </button>
                      </li>
                    )

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onMouseEnter={closeBlog}
                          className={`flex h-8 items-center rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none ${
                            isActive
                              ? 'text-zinc-900 dark:text-zinc-50'
                              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            {/* Col 3 — Theme toggle (mobile) / Controls (desktop) */}
            <div className="flex items-center justify-end gap-1.5">
              {/* Mobile: just theme toggle */}
              <div className="flex md:hidden">
                <ThemeSwitcher />
              </div>
              {/* Desktop controls */}
              <div className="hidden md:flex items-center gap-1.5">
                <span
                  className="flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 text-xs text-zinc-400 dark:border-zinc-700"
                  aria-hidden="true"
                >
                  <LuSearch size={13} />
                  <span className="text-zinc-400 dark:text-zinc-600">Search</span>
                  <span className="flex items-center gap-0.5">
                    <kbd className="rounded bg-zinc-100 px-1 font-mono text-[10px] text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">Ctrl</kbd>
                    <kbd className="rounded bg-zinc-100 px-1 font-mono text-[10px] text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">K</kbd>
                  </span>
                </span>

                <a
                  href={githubHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                >
                  <SiGithub size={16} aria-hidden="true" />
                </a>

                <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
                <ThemeSwitcher />
              </div>
            </div>
          </div>

          {/* Desktop dropdown */}
          <AnimatePresence>
            {blogOpen && (
              <motion.div
                onMouseEnter={keepOpen}
                onMouseLeave={scheduleClose}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                className="hidden md:block absolute left-[17.5%] right-[17.5%] top-full mt-1 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_48px_-8px_rgba(0,0,0,0.14),0_2px_8px_-2px_rgba(0,0,0,0.06)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_8px_48px_-8px_rgba(0,0,0,0.6)]"
              >
                <div className="flex min-h-[140px]">
                  <div className="flex w-[35%] shrink-0 flex-col border-r border-zinc-100 p-3 dark:border-zinc-800">
                    <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-600">Navigate</p>
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}>
                      <Link href="/blog" onClick={closeBlog} className="group flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                          <LuBookOpen size={14} aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200">All Blog</span>
                          <span className="block text-[11px] text-zinc-400 dark:text-zinc-600">All writing</span>
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                  <div className="flex w-[65%] flex-col p-3">
                    <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-600">Pinned Blogs</p>
                    {pinnedPosts.length === 0 ? (
                      <div className="flex flex-1 items-center justify-center">
                        <p className="text-xs text-zinc-400 dark:text-zinc-600">No pinned blogs yet.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-0.5">
                        {pinnedPosts.slice(0, 2).map((post, i) => (
                          <motion.div key={post.slug} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.14 }}>
                            <Link href={`/blog/${post.slug}/1`} onClick={closeBlog} className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                              <div className="relative h-9 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                {post.cover ? (
                                  <Image src={post.cover} alt={post.title} fill sizes="56px" className="object-cover" />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center">
                                    <LuImage size={12} className="text-zinc-300 dark:text-zinc-700" aria-hidden="true" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-50">{post.title}</p>
                                <p className="text-[11px] text-zinc-400 dark:text-zinc-600">{post.date}</p>
                              </div>
                              <LuArrowUpRight size={12} className="shrink-0 text-zinc-300 opacity-0 transition-all group-hover:opacity-100 group-hover:text-zinc-500 dark:text-zinc-700 dark:group-hover:text-zinc-400" aria-hidden="true" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-t border-zinc-100 px-4 py-2 dark:border-zinc-800">
                  <Link href="/blog" onClick={closeBlog} className="group flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-600 dark:hover:text-zinc-300">
                    View all blogs
                    <LuArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>

    {/* Mobile drawer - full screen slide from left */}
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-white dark:bg-zinc-950 md:hidden"
          >
            {/* Corner border decorations */}
            <Image src="/border.png" alt="" width={48} height={48} className="absolute top-0 left-0 translate-x-[-34%] translate-y-[-34%] pointer-events-none opacity-30 border-flourish z-10" />
            <Image src="/border.png" alt="" width={48} height={48} className="absolute top-0 right-0 translate-x-[34%] translate-y-[-34%] pointer-events-none opacity-30 border-flourish scale-x-[-1] z-10" />
            <Image src="/border.png" alt="" width={48} height={48} className="absolute bottom-0 left-0 translate-x-[-34%] translate-y-[34%] pointer-events-none opacity-30 border-flourish scale-y-[-1] z-10" />
            <Image src="/border.png" alt="" width={48} height={48} className="absolute bottom-0 right-0 translate-x-[34%] translate-y-[34%] pointer-events-none opacity-30 border-flourish scale-[-1] z-10" />

            <div className="flex flex-col h-full relative z-10">
              {/* Header */}
              <div className="relative flex items-center h-16 shrink-0 px-5 border-b border-zinc-100 dark:border-zinc-800/80">
                <Image
                  src="/floral.png"
                  alt=""
                  width={120}
                  height={120}
                  className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 opacity-40 dark:opacity-20 pointer-events-none"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                  aria-label="Close menu"
                >
                  <LuX size={18} />
                </button>
                <Link href="/" onClick={() => setMobileOpen(false)} className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-zinc-900 dark:text-zinc-50 z-10" style={{ fontFamily: 'var(--font-courgette)' }}>
                  Vishnu Mandala
                </Link>
                <Image
                  src="/floral.png"
                  alt=""
                  width={120}
                  height={120}
                  className="absolute -right-16 top-1/2 -translate-y-1/2 rotate-90 opacity-40 dark:opacity-20 pointer-events-none"
                />
              </div>

              {/* Navigation links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <div className="flex flex-col gap-1">
                  {nav.map((item, i) => {
                    const isBlog = item.href === '/blog'
                    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                    const description = linkDescriptions[item.href] || ''

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.25 }}
                      >
                        {isBlog ? (
                          <div className="flex flex-col">
                            <button
                              onClick={() => setBlogOpen(o => !o)}
                              className={`group flex w-full items-center gap-3 rounded-xl p-3 transition-all border ${
                                isActive || blogOpen
                                  ? 'bg-zinc-150 border-zinc-200/80 text-zinc-900 dark:bg-zinc-900/60 dark:border-zinc-800 dark:text-zinc-100'
                                  : 'bg-white/40 border-zinc-100/50 text-zinc-650 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-950/20 dark:border-zinc-900/20 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100'
                              }`}
                            >
                              <div className="flex-1 text-left min-w-0">
                                <span className="block text-sm font-semibold">{item.label}</span>
                                <span className="block text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{description}</span>
                              </div>
                              <motion.span
                                animate={{ rotate: blogOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-zinc-400 dark:text-zinc-600"
                              >
                                <LuChevronDown size={14} />
                              </motion.span>
                            </button>
                            <AnimatePresence>
                              {blogOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-6 pr-4 py-2 flex flex-col gap-1 border-l border-zinc-200 dark:border-zinc-800/80 ml-3.5 mt-1.5">
                                    <Link
                                      href="/blog"
                                      onClick={() => setMobileOpen(false)}
                                      className="flex h-9 items-center rounded-lg px-3 text-xs font-semibold text-zinc-500 hover:bg-zinc-100/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100 transition-colors"
                                    >
                                      All Blogs
                                    </Link>
                                    {pinnedPosts.slice(0, 3).map((post) => (
                                      <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}/1`}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex h-9 items-center rounded-lg px-3 text-xs font-medium text-zinc-400 hover:bg-zinc-100/60 hover:text-zinc-900 dark:text-zinc-550 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100 transition-colors truncate"
                                      >
                                        {post.title}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`group flex items-center gap-3 rounded-xl p-3 transition-all border ${
                              isActive
                                ? 'bg-zinc-150 border-zinc-200/80 text-zinc-900 dark:bg-zinc-900/60 dark:border-zinc-800 dark:text-zinc-100'
                                : 'bg-white/40 border-zinc-100/50 text-zinc-650 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-950/20 dark:border-zinc-900/20 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100'
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <span className="block text-sm font-semibold">{item.label}</span>
                              <span className="block text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{description}</span>
                            </div>
                            <LuChevronRight
                              size={14}
                              className="text-zinc-300 group-hover:text-zinc-500 dark:text-zinc-750 dark:group-hover:text-zinc-550 transition-colors"
                            />
                          </Link>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </nav>

              {/* Footer with GitHub link */}
              <div className="px-4 py-4 shrink-0 border-t border-zinc-100 dark:border-zinc-800/80">
                <a
                  href={githubHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                >
                  <SiGithub size={16} aria-hidden="true" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
)
}
