import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'

type TerminalInputProps = {
  prompt: string
  onSubmit: (command: string) => void
  onTab: (currentInput: string) => string
  history: string[]
  historyIndex: number
  setHistoryIndex: (index: number) => void
}

export function TerminalInput({
  prompt,
  onSubmit,
  onTab,
  history,
  historyIndex,
  setHistoryIndex,
}: TerminalInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input automatically and ensure it remains visible on mobile
  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus()
      // Helps iOS Safari bring the input into the visual viewport if covered by keyboard
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 150)
    
    return () => clearTimeout(timeout)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(input)
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const suggestion = onTab(input)
      if (suggestion) {
        setInput(suggestion)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIndex = historyIndex + 1
        setHistoryIndex(nextIndex)
        setInput(history[history.length - 1 - nextIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1
        setHistoryIndex(nextIndex)
        setInput(history[history.length - 1 - nextIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 py-1">
      <span className="shrink-0 font-mono text-sm text-[var(--accent-green)]">{prompt}</span>
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent font-mono text-base sm:text-sm text-[var(--text-strong)] outline-none placeholder:text-[var(--text)]/50"
        placeholder="Type command here..."
        autoFocus
        autoComplete="off"
        spellCheck={false}
        aria-label="Terminal input"
      />
    </form>
  )
}
