import { NextResponse } from 'next/server'
import { getGitHubContributions } from '@/lib/github'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Missing username' }, { status: 400 })
  }

  const data = await getGitHubContributions(username)
  if (!data) {
    return NextResponse.json({ error: 'Failed to fetch GitHub contributions' }, { status: 500 })
  }

  return NextResponse.json(data)
}

