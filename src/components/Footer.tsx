import type { MouseEvent } from 'react'
import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import { profile } from '../data/profile'
import { GitHubMark, LinkedInMark } from './Icons'

const linkClasses =
  'inline-flex items-center gap-2 rounded-sm text-[var(--text)] transition hover:cursor-pointer hover:text-[var(--text-strong)] hover:underline hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]'

function isTouchDevice() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
}

export function Footer() {
  const [emailCopied, setEmailCopied] = useState(false)
  const [phoneCopied, setPhoneCopied] = useState(false)

  async function handleEmailClick() {
    // Let the mailto: link attempt to open as usual; also copy as a fallback
    // in case the browser has no default mail client configured.
    try {
      await navigator.clipboard.writeText(profile.email)
      setEmailCopied(true)
      window.setTimeout(() => setEmailCopied(false), 1800)
    } catch {
      // clipboard unavailable, no-op
    }
  }

  async function handlePhoneClick(event: MouseEvent<HTMLAnchorElement>) {
    if (isTouchDevice()) return // let the tel: link open the dialer as usual

    event.preventDefault()
    try {
      await navigator.clipboard.writeText(profile.phone)
      setPhoneCopied(true)
      window.setTimeout(() => setPhoneCopied(false), 1800)
    } catch {
      // clipboard unavailable, no-op
    }
  }

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 py-8 pb-24 text-center text-sm text-[var(--text)] sm:px-6 lg:px-8 lg:pb-8">

        <div>
          <p className="text-[var(--text-strong)]">© 2026 Dessiree Camille Pasion</p>
          <p className="mt-1 font-mono text-xs">Built with React • TypeScript • Tailwind CSS • Framer Motion</p>
        </div>

        {/* <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs" aria-label="Contact links">
          <a href={`mailto:${profile.email}`} onClick={handleEmailClick} className={linkClasses}>
            <Mail className="h-4 w-4" />
            {emailCopied ? 'Copied!' : 'Email'}
          </a>
          <a
            href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
            onClick={handlePhoneClick}
            className={linkClasses}
          >
            <Phone className="h-4 w-4" />
            {phoneCopied ? 'Copied!' : 'Phone'}
          </a>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className={linkClasses}>
            <GitHubMark className="h-4 w-4" />
            GitHub
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className={linkClasses}>
            <LinkedInMark className="h-4 w-4" />
            LinkedIn
          </a>
        </nav> */}
      </div>
    </footer>
  )
}