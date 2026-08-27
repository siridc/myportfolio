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
  homepage?: string | null
}

const fallbackRepositories: GithubRepository[] = [
  {
    name: 'Gourmet-Discoveries',
    description: 'A recipe and restaurant discovery web application built with React and Vite.',
    html_url: 'https://github.com/siridc/Gourmet-Discoveries',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '',
    updated_at: '',
    archived: false,
    fork: false,
    homepage: 'https://gourmet-discoveries.vercel.app/',
  },
  {
    name: 'Simple-Calculator',
    description: 'A clean and responsive web calculator built with HTML, CSS, and JavaScript.',
    html_url: 'https://github.com/siridc/Simple-Calculator',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '',
    updated_at: '',
    archived: false,
    fork: false,
    homepage: 'https://siridc.github.io/Simple-Calculator/',
  },
  {
    name: 'myportfolio',
    description: 'Modern developer portfolio built with React, TypeScript, Tailwind CSS, Vite, and Framer Motion.',
    html_url: 'https://github.com/siridc/myportfolio',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '',
    updated_at: '',
    archived: false,
    fork: false,
    homepage: null,
  },
  {
    name: 'StudentRecord',
    description: 'Student record management system built with PHP and MySQL.',
    html_url: 'https://github.com/siridc/StudentRecord',
    language: 'PHP',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '',
    updated_at: '',
    archived: false,
    fork: false,
    homepage: null,
  },
]

export async function fetchGithubRepositories(username: string) {
  if (!username) {
    return {
      repositories: fallbackRepositories,
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

    const excludedRepositories = ['truehue-website', 'siridc', 'ob-gyn-clinic_copy', 'Qualifiying-Project--website-']

    const filteredRepositories = repositories
      .filter(
        (repo) =>
          !excludedRepositories.includes(repo.name.toLowerCase()),
      )
      .slice(0, 4)

    return {
      repositories: filteredRepositories.length > 0 ? filteredRepositories : fallbackRepositories,
      error: null as string | null,
    }
  } catch {
    return {
      repositories: fallbackRepositories,
      error: null as string | null,
    }
  }
}