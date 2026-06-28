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

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${courgette.variable} h-full antialiased`}
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
