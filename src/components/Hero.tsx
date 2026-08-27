import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { profile } from '../data/profile'

type HeroProps = {
  onNavigate: (target: string) => void
}

export function Hero({ onNavigate }: HeroProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="home" className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(63,185,80,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(88,166,255,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="font-mono text-sm text-[var(--accent-green)]">$ git status</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--text-strong)] sm:text-5xl lg:text-6xl">
            Hi, I&apos;m {profile.name}!
          </h1>
          <p className="mt-4 text-lg font-medium text-[var(--text)] sm:text-xl">{profile.title}</p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text)] text-justify sm:text-lg">{profile.intro}</p>
          <p className="mt-4 max-w-2xl text-sm italic leading-7 text-[var(--text)] sm:text-base">
            Think. Design. Build. Break. Fix. Commit. Push. Ship.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--accent-green)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-green-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={profile.resumeUrl}
              download={profile.resumeDownloadName}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text-strong)] transition hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--text-strong)] transition hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          className="grid gap-4"
        >
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)]">
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3 font-mono text-xs text-[var(--text)]">
              <span className="h-3 w-3 rounded-full bg-[var(--accent-green)]" />
              terminal
            </div>
            <pre className="mt-4 overflow-x-auto font-mono text-sm leading-7 text-[var(--text-strong)]">
{`$ git status

On branch main

✓ portfolio sections ready
✓ responsive layout implemented
✓ API and contact hooks wired`}
            </pre>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-[var(--shadow)]">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--text)]">Now available</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-strong)]">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full aspect-square bg-[var(--accent-green)]" />
                <span className="flex-1">Git-inspired navigation and repository explorer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full aspect-square bg-[var(--accent-blue)]" />
                <span className="flex-1">Theme toggle with persistent preference</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full aspect-square bg-[var(--accent-purple)]" />
                <span className="flex-1">GitHub API-ready activity section</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}