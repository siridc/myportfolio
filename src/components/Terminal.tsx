import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Terminal as TerminalIcon, X } from 'lucide-react'
import { useMemo, useState } from 'react'

type TerminalProps = {
  isOpen: boolean
  onClose: () => void
  onNavigate: (target: string) => void
  onOpenResume: () => void
}

const commands = ['about', 'education', 'skills', 'projects', 'experience', 'credentials', 'contact', 'resume', 'clear', 'help']

export function Terminal({ isOpen, onClose, onNavigate, onOpenResume }: TerminalProps) {
  const shouldReduceMotion = useReducedMotion()
  const [history, setHistory] = useState<string[]>(['Type "help" to see available commands.'])
  const [input, setInput] = useState('')

  const prompt = useMemo(() => 'dessiree@portfolio:~$', [])

  const runCommand = (value: string) => {
    const command = value.trim().toLowerCase()

    if (!command) {
      return
    }

    setHistory((current) => [...current, `${prompt} ${command}`])

    switch (command) {
      case 'help':
        setHistory((current) => [
          ...current,
          'Available: about, education, skills, projects, experience, credentials, contact, resume, clear',
        ])
        break
      case 'about':
      case 'education':
      case 'skills':
      case 'projects':
      case 'experience':
      case 'credentials':
      case 'contact':
        onNavigate(command)
        setHistory((current) => [...current, `Navigating to ${command}.`])
        break
      case 'resume':
        onOpenResume()
        setHistory((current) => [...current, 'Opening resume in a new tab.'])
        break
      case 'clear':
        setHistory([])
        break
      default:
        setHistory((current) => [...current, `Unknown command: ${command}. Type help.`])
    }

    setInput('')
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 px-4 py-4 sm:items-center sm:py-8"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { y: 24, opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { y: 24, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:max-h-[calc(100vh-4rem)]"
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-sm text-[var(--text-strong)]">
                <TerminalIcon className="h-4 w-4 text-[var(--accent-green)]" />
                Terminal
              </div>
              <button type="button" onClick={onClose} className="rounded-md p-2 text-[var(--text)] transition hover:text-[var(--text-strong)]" aria-label="Close terminal">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid min-h-0 flex-1 gap-4 overflow-hidden p-4 sm:grid-cols-[1.2fr_0.8fr]">
              <div className="flex min-h-0 flex-col rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                <div className="max-h-72 space-y-2 overflow-y-auto font-mono text-sm text-[var(--text-strong)]">
                  <p>{prompt} help</p>
                  {history.map((line, index) => (
                    <p key={`${line}-${index}`}>{line}</p>
                  ))}
                </div>

                <form
                  className="mt-4 flex items-center gap-2"
                  onSubmit={(event) => {
                    event.preventDefault()
                    runCommand(input)
                  }}
                >
                  <span className="font-mono text-sm text-[var(--accent-green)]">$</span>
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="h-11 flex-1 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 font-mono text-sm text-[var(--text-strong)] outline-none focus:border-[var(--accent-blue)]"
                    placeholder="Type help, projects, or resume"
                    autoFocus
                  />
                  <button type="submit" className="h-11 rounded-md bg-[var(--accent-green)] px-4 text-sm font-semibold text-white">
                    Run
                  </button>
                </form>
              </div>
              <div className="min-h-0 overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4 text-sm leading-7 text-[var(--text)]">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--text)]">Commands</p>
                <div className="mt-3 space-y-2 font-mono">
                  {commands.map((command) => (
                    <button
                      key={command}
                      type="button"
                      onClick={() => runCommand(command)}
                      className="block w-full rounded-md border border-[var(--border)] px-3 py-2 text-left transition hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]"
                    >
                      {command}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-[var(--text)]">The terminal is optional and does not replace the main navigation.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}