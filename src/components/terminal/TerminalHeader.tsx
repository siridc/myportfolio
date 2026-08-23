import { HelpCircle, X } from 'lucide-react'

type TerminalHeaderProps = {
  onClose: () => void
  onToggleHelp: () => void
}

export function TerminalHeader({ onClose, onToggleHelp }: TerminalHeaderProps) {
  return (
    <div className="flex cursor-grab items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3 active:cursor-grabbing">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[var(--accent-error)] opacity-80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-80" />
          <div className="h-3 w-3 rounded-full bg-[var(--accent-green)] opacity-80" />
        </div>
        <span className="font-mono text-sm font-medium text-[var(--text-strong)]">portfolio-terminal</span>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleHelp}
          className="rounded-md p-1.5 text-[var(--text)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-strong)]"
          aria-label="How to use terminal"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-[var(--text)] transition hover:bg-[var(--accent-error)] hover:text-white"
          aria-label="Close terminal"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
