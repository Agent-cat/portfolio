export interface ContributionDay {
  date: string
  count: number
}

export interface GitHubContributions {
  total: number;
  contributions: ContributionDay[];
}

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

export async function getGitHubContributions(username: string): Promise<GitHubContributions | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    console.error('GITHUB_TOKEN not configured')
    return null
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
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
      next: { revalidate: 43200 }, // Cache for 12 hours (twice a day)
      signal: controller.signal,
    })

    if (!res.ok) {
      console.error('GitHub API error:', res.statusText)
      return null
    }

    const json = await res.json()
    if (json.errors || !json.data?.user) {
      console.error('GitHub API query error:', json.errors || 'User not found')
      return null
    }

    const calendar = json.data.user.contributionsCollection.contributionCalendar
    const contributions = calendar.weeks.flatMap(
      (week: { contributionDays: { contributionCount: number; date: string }[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }))
    )

    return {
      total: calendar.totalContributions,
      contributions,
    }
  } catch (err) {
    console.error('Failed to fetch GitHub contributions:', err)
    return null
  } finally {
    clearTimeout(timeout)
  }
}
