import type { Metadata } from 'next'
import { Inter, Courgette } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const courgette = Courgette({
  variable: '--font-courgette',
  weight: '400',
  subsets: ['latin'],
})

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Vishnu Vardhan Mandala | Software Developer Portfolio',
    template: '%s | Vishnu Vardhan Mandala',
  },
  description: 'Personal portfolio of Vishnu Vardhan Mandala, a student and software developer building high-quality web applications. Explore my projects, work experience, education, and technical skills.',
  keywords: ['Vishnu Vardhan Mandala', 'Software Developer', 'Next.js Portfolio', 'React Developer', 'TypeScript Engineer', 'Full Stack Developer', 'Web Developer portfolio'],
  authors: [{ name: 'Vishnu Vardhan Mandala' }],
  creator: 'Vishnu Vardhan Mandala',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'Vishnu Vardhan Mandala | Software Developer Portfolio',
    description: 'Personal portfolio of Vishnu Vardhan Mandala, a student and software developer building high-quality web applications.',
    siteName: 'Vishnu Vardhan Mandala Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishnu Vardhan Mandala | Software Developer Portfolio',
    description: 'Personal portfolio of Vishnu Vardhan Mandala, a student and software developer building high-quality web applications.',
    creator: '@_.vishnu_.17',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${courgette.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 overflow-x-hidden"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navbar />
          {/* Full-height vertical border lines aligned to the content column */}
          <div className="pointer-events-none fixed inset-0 z-[60] hidden md:flex justify-center px-6" aria-hidden="true">
            <div className="flex w-full max-w-5xl">
              <div className="flex">
                <div className="border-l border-zinc-100 dark:border-zinc-800/80" />
                <div className="border-l border-zinc-100 dark:border-zinc-800/80 ml-px" />
              </div>
              <div className="flex-1" />
              <div className="flex">
                <div className="border-r border-zinc-100 dark:border-zinc-800/80 mr-px" />
                <div className="border-r border-zinc-100 dark:border-zinc-800/80" />
              </div>
            </div>
          </div>
          <main className="flex-1 pt-14">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
