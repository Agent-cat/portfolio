import { ImageResponse } from 'next/og'
import { getPostMeta } from '@/lib/blog'

export const runtime = 'nodejs'
export const alt = 'Blog post preview'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = getPostMeta(slug)

  if (!meta) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '80px',
            background: '#0a0a0a',
            color: '#fafafa',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ fontSize: 28, opacity: 0.6 }}>vishnumandaladev.com</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            Post not found
          </div>
          <div style={{ fontSize: 32, opacity: 0.7 }}>by Vishnu Vardhan Mandala</div>
        </div>
      ),
      { ...size },
    )
  }

  const formattedDate = new Date(meta.date.split('.').reverse().join('-')).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontSize: 28, opacity: 0.6 }}>vishnumandaladev.com</div>
          {meta.slideCount > 1 && (
            <div
              style={{
                fontSize: 20,
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                opacity: 0.8,
              }}
            >
              Slide 1 of {meta.slideCount}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            {meta.title}
          </div>
          {meta.description && (
            <div style={{ fontSize: 28, opacity: 0.8, lineHeight: 1.4 }}>
              {meta.description}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 24, opacity: 0.6 }}>{formattedDate}</div>
          <div style={{ fontSize: 28, opacity: 0.7 }}>by Vishnu Vardhan Mandala</div>
        </div>
      </div>
    ),
    { ...size },
  )
}