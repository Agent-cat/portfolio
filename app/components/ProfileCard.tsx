import { Fragment } from 'react'
import Image from 'next/image'
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

  // Filter to show only these socials
  const showSocials = ['SiX', 'FaLinkedin', 'SiGithub', 'SiInstagram', 'SiGmail', 'SiMedium']
  const filteredSocials = socials.filter((s) => showSocials.includes(s.icon))

  return (
    <section aria-label="Profile card" className="w-full pt-4 pb-12 px-6">
      <div className="mx-auto max-w-3xl">

        {/* Banner — full width between vertical lines */}
        <div className="relative h-40 w-[calc(100%+3rem)] -ml-6 overflow-hidden rounded-b-xl border border-zinc-200 border-t-0 dark:border-zinc-800">
          {banner && <Image src={banner} alt="" fill className="object-cover" priority />}
        </div>

        {/* Avatar + name / title row */}
        <div className="flex items-end gap-4 -mt-8 relative z-10">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-white dark:ring-zinc-950">
            <Image
              src={avatar}
              alt={`${name} avatar`}
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
          </div>

          <div className="pb-0.5">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {name}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {title}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          {bio}
        </p>

        {/* Social links — icons */}
        <div className="mt-5 flex items-center gap-2">
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition-all hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              </Fragment>
            )
          })}
        </div>

        {/* GitHub Heatmap */}
        <GitHubHeatmap username="Agent-cat" />

      </div>
    </section>
  )
}
