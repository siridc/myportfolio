import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { commandItems } from '../data/navigation'

type CommandPaletteProps = {
  isOpen: boolean
  onClose: () => void
  onNavigate: (target: string) => void
  onOpenResume: () => void
  onToggleTheme: () => void
}

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
  onToggleTheme,
}: CommandPaletteProps) {
  const shouldReduceMotion = useReducedMotion()
  const [query, setQuery] = useState('')

  const filteredCommands = useMemo(
    () =>
      [
        ...commandItems,
        { label: 'Open Resume', action: onOpenResume },
        { label: 'Toggle Dark Mode', action: onToggleTheme },
      ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    [onOpenResume, onToggleTheme, query],
  )

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-24"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { y: -18, opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { y: -18, opacity: 0 }}
            className="w-full max-w-2xl overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
              <Search className="h-4 w-4 text-[var(--text)]" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-10 flex-1 bg-transparent text-sm text-[var(--text-strong)] outline-none placeholder:text-[var(--text)]"
                placeholder="Type a command or section"
              />
              <button type="button" onClick={onClose} className="rounded-md border border-[var(--border)] px-3 py-2 text-xs text-[var(--text)]">
                Esc
              </button>
            </div>
            <div className="max-h-[24rem] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <p className="px-3 py-6 text-sm text-[var(--text)]">No matching commands.</p>
              ) : (
                filteredCommands.map((item) => {
                  const target = 'target' in item ? item.target : ''
                  const action = 'action' in item ? item.action : () => onNavigate(target)

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        action()
                        onClose()
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm text-[var(--text-strong)] transition hover:bg-[var(--surface-muted)]"
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-[var(--text)]">⌘K</span>
                    </button>
                  )
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}