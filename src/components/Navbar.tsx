import { Menu, NotebookTabs, X } from 'lucide-react'
import { sections } from '../data/navigation'
import { profile } from '../data/profile'
import { ThemeToggle } from './ThemeToggle'

type NavbarProps = {
  onNavigate: (target: string) => void
  isDark: boolean
  onToggleTheme: () => void
  mobileOpen: boolean
  onToggleMobile: () => void
}

export function Navbar({
  onNavigate,
  isDark,
  onToggleTheme,
  mobileOpen,
  onToggleMobile,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
          aria-label="Go to top of portfolio"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] font-mono text-sm font-semibold text-[var(--accent-green)]">
            &lt;/&gt;
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-[var(--text-strong)]">Dessiree Camille Pasion</span>
            <span className="block font-mono text-xs text-[var(--text)]">portfolio</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => onNavigate(section.id)}
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-elevated)] hover:text-[var(--text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={profile.resumeUrl}
            download={profile.resumeDownloadName}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-[var(--accent-green)] px-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-green-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
            style={{ color: 'white' }}
          >
            <NotebookTabs className="h-4 w-4" />
            Resume
          </a>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>

        <button
          type="button"
          onClick={onToggleMobile}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition hover:text-[var(--text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] lg:hidden"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 lg:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-2" aria-label="Mobile navigation">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => onNavigate(section.id)}
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left text-sm font-medium text-[var(--text-strong)]"
              >
                {section.label}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={profile.resumeUrl}
                download={profile.resumeDownloadName}
                className="col-span-1 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--accent-green)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-green-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
                style={{ color: 'white' }}
              >
                <NotebookTabs className="h-4 w-4 shrink-0" />
                Resume
              </a>
              <ThemeToggle
                isDark={isDark}
                onToggle={onToggleTheme}
                showLabel
                className="col-span-1 inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text-strong)] transition hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
              />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}