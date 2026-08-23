import { motion } from 'framer-motion'

type TerminalHelpProps = {
  onRunQuickCommand: (command: string) => void
}

export function TerminalHelp({ onRunQuickCommand }: TerminalHelpProps) {
  const quickCommands = [
    { label: '👤 About Me', command: 'about' },
    { label: '🛠 Skills', command: 'skills' },
    { label: '💼 Projects', command: 'projects' },
    { label: '💻 Experience', command: 'experience' },
    { label: '🎓 Education', command: 'education' },
    { label: '✉ Contact', command: 'contact' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-4 top-14 z-10 w-72 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl"
    >
      <h3 className="mb-2 font-semibold text-[var(--text-strong)]">How to Use the Terminal</h3>
      <ol className="mb-4 space-y-1 text-sm text-[var(--text)]">
        <li>1. Type a command.</li>
        <li>2. Press Enter.</li>
        <li>3. Use Tab for suggestions.</li>
        <li>4. Use ↑ and ↓ for history.</li>
      </ol>

      <p className="mb-2 text-sm text-[var(--text)]">Try a quick command:</p>
      <div className="grid grid-cols-2 gap-2">
        {quickCommands.map((btn) => (
          <button
            key={btn.command}
            type="button"
            onClick={() => onRunQuickCommand(btn.command)}
            className="flex items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-muted)] py-1.5 text-xs text-[var(--text-strong)] transition hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
