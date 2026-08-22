import { useCallback, useEffect, useRef, useState } from 'react'
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

function App() {
  const { isDark, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const registerSection = useCallback((id: string) => (element: HTMLElement | null) => {
    sectionRefs.current[id] = element
  }, [])

  const scrollToSection = useCallback(
    (target: string) => {
      if (target === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      sectionRefs.current[target]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

        <div ref={registerSection('about')}>
          <AboutSection />
        </div>
        <div ref={registerSection('education')}>
          <EducationSection />
        </div>
        <div ref={registerSection('skills')}>
          <SkillsSection />
        </div>
        <div ref={registerSection('projects')}>
          <ProjectsSection />
        </div>
        <div ref={registerSection('experience')}>
          <ExperienceSection />
        </div>
        <div ref={registerSection('credentials')}>
          <CredentialsSection />
        </div>
        <div ref={registerSection('contact')}>
          <ContactSection />
        </div>
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
