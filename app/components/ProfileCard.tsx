'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { LuX } from 'react-icons/lu'
import {
  SiX,
  SiGithub,
  SiYoutube,
  SiInstagram,
  SiPinterest,
  SiMedium,
  SiGmail,
} from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import profileData from '@/data/profile.json'
import { GitHubHeatmap } from './GitHubHeatmap'

// Map icon key from profile.json → react-icons component
const iconMap: Record<string, IconType> = {
  SiX,
  FaLinkedin,
  SiGithub,
  SiYoutube,
  SiInstagram,
  SiPinterest,
  SiMedium,
  SiGmail,
}

export function ProfileCard() {
  const { name, title, avatar, banner, bio, socials } = profileData
  const [viewerOpen, setViewerOpen] = useState(false)

  // Filter to show only these socials
  const showSocials = ['SiX', 'FaLinkedin', 'SiGithub', 'SiInstagram', 'SiGmail', 'SiMedium']
  const filteredSocials = socials.filter((s) => showSocials.includes(s.icon))

  return (
    <>
      <section aria-label="Profile card" className="w-full pt-4 pb-12 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">

          {/* Quote banner */}
          <div className="relative h-40 sm:h-56 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] -ml-4 sm:-ml-6 overflow-hidden rounded-b-xl border border-zinc-200 border-t-0 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 sm:px-16 text-center">
              <span className="text-4xl sm:text-6xl text-zinc-200 dark:text-zinc-800 leading-none mb-2">&ldquo;</span>
              <p className="text-sm sm:text-lg font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-xl" style={{ fontFamily: 'var(--font-courgette)' }}>
                Build things that matter, learn relentlessly, and never stop curiousty.
              </p>
              <span className="text-4xl sm:text-6xl text-zinc-200 dark:text-zinc-800 leading-none mt-2">&rdquo;</span>
            </div>
            {/* Decorative corner accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-zinc-200 dark:border-zinc-700 rounded-tl-lg opacity-60" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-zinc-200 dark:border-zinc-700 rounded-br-lg opacity-60" />
          </div>

          {/* Avatar + name / title row */}
          <div className="flex items-end gap-3 sm:gap-4 -mt-10 sm:-mt-12 relative z-10">
            <button
              onClick={() => setViewerOpen(true)}
              className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-white dark:ring-zinc-950 cursor-pointer transition-transform hover:scale-105"
            >
              <Image
                src={avatar}
                alt={`${name} avatar`}
                fill
                sizes="96px"
                className="object-cover"
                priority
              />
            </button>

            <div className="pb-0.5">
              <h1 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {name}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                {title}
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {bio}
          </p>

        {/* Social links — icons */}
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          {filteredSocials.map((social) => {
            const Icon = iconMap[social.icon]
            if (!Icon) return null
            const isMedium = social.icon === 'SiMedium'
            return (
              <Fragment key={social.icon}>
                {isMedium && (
                  <div className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
                )}
                <a
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition-all hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                >
                  <Icon size={14} className="sm:hidden" aria-hidden="true" />
                  <Icon size={16} className="hidden sm:block" aria-hidden="true" />
                </a>
              </Fragment>
            )
          })}
        </div>

          {/* GitHub Heatmap */}
          <GitHubHeatmap username="Agent-cat" />

        </div>
      </section>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setViewerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setViewerOpen(false)}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <LuX size={20} />
              </button>
              <Image
                src={avatar}
                alt={name}
                width={800}
                height={800}
                className="rounded-lg object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
