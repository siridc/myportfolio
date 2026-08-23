import { useCallback, useEffect, useState } from 'react'
import { CommandPalette } from './components/CommandPalette'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { RepositoryExplorer } from './components/RepositoryExplorer'
import {
  AboutSection,
  ContactSection,
  CredentialsSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
} from './components/Sections'
import { Terminal } from './components/terminal/Terminal'
import { profile } from './data/profile'
import { useTheme } from './hooks/useTheme'

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '')

  if (!id || id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const element = document.getElementById(id)
  if (!element) return

  const header = document.querySelector('header')
  const offset = header ? header.offsetHeight + 16 : 96
  const top = element.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

function App() {
  const { isDark, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const scrollToSection = useCallback(
    (target: string) => {
      // Close menus FIRST — the mobile menu is inline in the sticky header
      // and adds ~440px of height. We must wait for it to collapse before
      // calculating scroll positions, otherwise the target is off by that amount.
      setMobileOpen(false)
      setPaletteOpen(false)

      // Update URL
      if (target === 'home') {
        history.replaceState(null, '', window.location.pathname)
      } else {
        history.pushState(null, '', `#${target}`)
      }

      // Double rAF waits for React to commit the DOM update (menu collapse)
      // before we measure positions. Without this, getBoundingClientRect
      // returns the position with the menu still open.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (target === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
          }

          const element = document.getElementById(target)
          if (!element) return

          // Dynamically measure the (now-collapsed) navbar height + breathing room
          const header = document.querySelector('header')
          const offset = header ? header.offsetHeight + 16 : 96

          const top = element.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
        })
      })
    },
    [],
  )

  const openResume = useCallback(() => {
    window.open(profile.resumeUrl, '_blank', 'noopener,noreferrer')
  }, [])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((current) => !current)
      }

      if (event.key === 'Escape') {
        setPaletteOpen(false)
        setTerminalOpen(false)
        setMobileOpen(false)
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      scrollToHash(window.location.hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Scroll to hash on initial page load
  useEffect(() => {
    if (window.location.hash) {
      // Small delay to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        scrollToHash(window.location.hash)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar
        onNavigate={scrollToSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((current) => !current)}
      />

      <main>
        <Hero onNavigate={scrollToSection} />
        <RepositoryExplorer onNavigate={scrollToSection} />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CredentialsSection />
        <ContactSection />
      </main>

      <Footer />

      <button
        type="button"
        onClick={() => setTerminalOpen(true)}
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text-strong)] shadow-[var(--shadow)] transition hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
        aria-label="Open terminal"
      >
        <span className="font-mono text-[var(--accent-green)]">&gt;_</span>
        Terminal
      </button>

      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onNavigate={scrollToSection}
        onToggleTheme={toggleTheme}
      />

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={scrollToSection}
        onOpenResume={openResume}
        onToggleTheme={toggleTheme}
      />
    </div>
  )
}

export default App

