import { SiGithub, SiX, SiInstagram } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'

const socialLinks = [

  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/vishnuvardhan-mandala', label: 'LinkedIn' },
  { icon: SiGithub, href: 'https://github.com/Agent-cat', label: 'GitHub' },
  { icon: SiInstagram, href: 'https://instagram.com/_.vishnu_.17', label: 'Instagram' },
]
export function Footer() {
  return (
    <footer className="w-full mt-auto">
      {/* Full width border line */}
      <div className="border-t border-zinc-200 dark:border-zinc-800" />

      {/* Social links */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 py-6 sm:py-8">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition-all hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
          >
            <social.icon size={14} className="sm:hidden" aria-hidden="true" />
            <social.icon size={16} className="hidden sm:block" aria-hidden="true" />
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-center text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-600 pb-6 sm:pb-8">
        &copy; 2026 Vishnu Mandala. All rights reserved.
      </p>
    </footer>
  )
}
