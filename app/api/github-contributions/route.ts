import { NextResponse } from 'next/server'

const GITHUB_API = 'https://api.github.com/graphql'

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Missing username' }, { status: 400 })
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
  }

  const res = await fetch(GITHUB_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { login: username },
    }),
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'GitHub API error' }, { status: res.status })
  }

  const json = await res.json()

  if (json.errors) {
    return NextResponse.json({ error: json.errors[0].message }, { status: 400 })
  }

  const calendar = json.data.user.contributionsCollection.contributionCalendar

  const contributions = calendar.weeks.flatMap(
    (week: { contributionDays: { contributionCount: number; date: string }[] }) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      }))
  )

  return NextResponse.json({
    total: calendar.totalContributions,
    contributions,
  })
}
