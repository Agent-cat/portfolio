'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LuArrowUp, LuList, LuX, LuChevronDown } from 'react-icons/lu'

interface Heading {
  id: string
  text: string
  level: number
}

export function BlogPageUI() {
  const [showTop, setShowTop] = useState(false)
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const activeItemRef = useRef<HTMLAnchorElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const article = document.querySelector('article')
    if (!article) return

    const els = article.querySelectorAll('h1, h2, h3')
    const collected: Heading[] = []

    els.forEach((el, i) => {
      if (!el.id) {
        el.id = `h-${i}-${(el.textContent ?? '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
      }
      collected.push({
        id: el.id,
        text: el.textContent ?? '',
        level: parseInt(el.tagName[1], 10),
      })
    })

    setHeadings(collected)
    if (collected.length > 0) setActiveId(collected[0].id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 300)

      if (headings.length > 0) {
        const scrollPos = window.scrollY + 140
        let current = headings[0].id
        for (const h of headings) {
          const el = document.getElementById(h.id)
          if (el && el.offsetTop <= scrollPos) current = h.id
        }
        setActiveId(current)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [headings])

  useEffect(() => {
    if (activeItemRef.current && listRef.current) {
      const list = listRef.current
      const item = activeItemRef.current
      const itemTop = item.offsetTop
      const itemBottom = itemTop + item.offsetHeight
      const listScrollTop = list.scrollTop
      const listHeight = list.clientHeight

      if (itemTop < listScrollTop + 24) {
        list.scrollTo({ top: itemTop - 24, behavior: 'smooth' })
      } else if (itemBottom > listScrollTop + listHeight - 24) {
        list.scrollTo({ top: itemBottom - listHeight + 24, behavior: 'smooth' })
      }
    }
  }, [activeId])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
    setDrawerOpen(false)
  }

  const TocList = ({ onItemClick, className = '' }: { onItemClick?: () => void; className?: string }) => (
    <ul ref={listRef} className={`flex flex-col overflow-y-auto ${className}`} style={{ maxHeight: 'calc(100vh - 160px)' }}>
      {headings.map((h) => {
        const isActive = activeId === h.id
        return (
          <li key={h.id} className="relative">
            {isActive && (
              <motion.span
                layoutId="toc-indicator"
                className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-zinc-800 dark:bg-zinc-200"
              />
            )}
            <a
              ref={isActive ? activeItemRef : null}
              href={`#${h.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(h.id); onItemClick?.() }}
              className={[
                'block truncate py-1 pr-2 text-[11px] leading-5 transition-colors duration-150',
                h.level === 1 ? 'pl-3 font-semibold' : h.level === 2 ? 'pl-5' : 'pl-7',
                isActive
                  ? 'text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300',
              ].join(' ')}
            >
              {h.text}
            </a>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-8 left-8 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-lg transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
          >
            <LuArrowUp size={14} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile TOC — inline at top */}
      {headings.length > 0 && (
        <div className="xl:hidden mb-6">
          <button
            onClick={() => setDrawerOpen(o => !o)}
            className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <span className="flex items-center gap-2">
              <LuList size={13} aria-hidden="true" />
              On this page
            </span>
            <motion.span animate={{ rotate: drawerOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <LuChevronDown size={13} />
            </motion.span>
          </button>
          <AnimatePresence>
            {drawerOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
                  <TocList onItemClick={() => setDrawerOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Desktop TOC — fixed sidebar */}
      {headings.length > 0 && (
        <aside
          aria-label="Table of contents"
          className="fixed right-0 top-16 z-40 hidden xl:flex xl:flex-col"
          style={{ width: '13rem', paddingRight: '1.25rem', paddingTop: '2rem' }}
        >
          <p className="mb-3 pl-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            On this page
          </p>
          <TocList />
        </aside>
      )}
    </>
  )
}
