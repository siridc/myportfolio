/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_USERNAME?: string
  readonly VITE_GITHUB_URL?: string
  readonly VITE_LINKEDIN_URL?: string
  readonly VITE_FORMSPREE_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}