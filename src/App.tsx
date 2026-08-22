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
import { Terminal } from './components/Terminal'
import { profile } from './data/profile'
import { useTheme } from './hooks/useTheme'

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '')

  if (!id || id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const element = document.getElementById(id)
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const { isDark, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const scrollToSection = useCallback(
    (target: string) => {
      if (target === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        history.replaceState(null, '', window.location.pathname)
      } else {
        const element = document.getElementById(target)
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        history.pushState(null, '', `#${target}`)
      }

      setMobileOpen(false)
      setPaletteOpen(false)
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
        onOpenResume={openResume}
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

