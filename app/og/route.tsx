import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Vishnu Vardhan Mandala'
  const desc = searchParams.get('desc') || ''

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
        <div style={{ fontSize: 28, opacity: 0.6 }}>vishnumandaladev.com</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
          {desc && (
            <div style={{ fontSize: 28, opacity: 0.8, lineHeight: 1.4 }}>
              {desc}
            </div>
          )}
        </div>

        <div style={{ fontSize: 28, opacity: 0.7 }}>by Vishnu Vardhan Mandala</div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}