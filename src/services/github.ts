export type GithubRepository = {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string
  updated_at: string
  archived: boolean
  fork: boolean
}

export async function fetchGithubRepositories(username: string) {
  if (!username) {
    return {
      repositories: [] as GithubRepository[],
      error: null as string | null,
    }
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`GitHub request failed with status ${response.status}`)
    }

    const repositories = (await response.json()) as GithubRepository[]

    const excludedRepositories = ['truehue-website', 'siridc']

    const filteredRepositories = repositories
      .filter(
        (repo) =>
          !excludedRepositories.includes(repo.name.toLowerCase()),
      )
      .slice(0, 6)

    return {
      repositories: filteredRepositories,
      error: null as string | null,
    }
  } catch (error) {
    return {
      repositories: [] as GithubRepository[],
      error:
        error instanceof Error
          ? error.message
          : 'Unable to load GitHub repositories.',
    }
  }
}