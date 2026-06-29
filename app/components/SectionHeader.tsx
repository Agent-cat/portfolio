import Image from 'next/image'

interface SectionHeaderProps {
  title: React.ReactNode
  as?: 'h1' | 'h2'
}

export function SectionHeader({ title, as: Component = 'h2' }: SectionHeaderProps) {
  return (
    <div className="relative mb-6 z-10 w-full">
      {/* Horizontal divider line spanning full width of the viewport, vertically centered */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-zinc-200/80 dark:bg-zinc-800/80 w-screen left-1/2 right-1/2 -translate-x-1/2 pointer-events-none" />

      {/* The original title container, with solid bg-white/bg-zinc-950 under the stripes to mask the line */}
      <div
        className="relative z-10 mx-auto max-w-5xl border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 4px, rgba(200,200,200,0.15) 4px, rgba(200,200,200,0.15) 5px)',
        }}
      >
        {/* Left and right masks to stop the divider line exactly at the outer tips of the floral images (offset to touch the tip) */}
        <div className="absolute left-[-35px] w-[35px] inset-y-0 bg-white dark:bg-zinc-950 pointer-events-none" />
        <div className="absolute right-[-35px] w-[35px] inset-y-0 bg-white dark:bg-zinc-950 pointer-events-none" />

        <Image
          src="/floral.png"
          alt=""
          width={120}
          height={120}
          className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 opacity-40 dark:opacity-20 pointer-events-none"
        />
        <Component
          className="px-16 py-6 text-center text-xl font-bold text-zinc-900 dark:text-zinc-50"
          style={{ fontFamily: 'var(--font-courgette)' }}
        >
          {title}
        </Component>
        <Image
          src="/floral.png"
          alt=""
          width={120}
          height={120}
          className="absolute -right-16 top-1/2 -translate-y-1/2 rotate-90 opacity-40 dark:opacity-20 pointer-events-none"
        />
      </div>
    </div>
  )
}


