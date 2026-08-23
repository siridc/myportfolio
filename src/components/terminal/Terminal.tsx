import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState, useRef } from 'react'
import type { TerminalLine, TerminalState } from '../../types/terminal'
import { parseCommand } from '../../lib/terminal/commandParser'
import { findCommand, getSuggestions } from '../../lib/terminal/commandMatcher'
import { TerminalHeader } from './TerminalHeader'
import { TerminalInput } from './TerminalInput'
import { TerminalOutput } from './TerminalOutput'
import { TerminalHelp } from './TerminalHelp'

type TerminalProps = {
  isOpen: boolean
  onClose: () => void
  onNavigate: (target: string) => void
  onToggleTheme?: () => void
}

const TERMINAL_PROMPT = 'dess ~/portfolio $'

export function Terminal({ isOpen, onClose, onNavigate, onToggleTheme }: TerminalProps) {
  const shouldReduceMotion = useReducedMotion()
  const constraintsRef = useRef<HTMLDivElement>(null)

  const [state, setState] = useState<TerminalState>({
    isOpen: false,
    input: '',
    history: [],
    historyIndex: -1,
    output: [],
    isHelpOpen: false,
    suggestions: [],
    isFirstTime: true,
  })

  // Synchronize internal open state with prop, handle first time session flag
  useEffect(() => {
    if (isOpen) {
      setState(s => {
        // Clean up temporary navigation and opening messages so they don't persist on reopen
        const cleanedOutput = s.output.filter(line => 
          !(typeof line.content === 'string' && (line.content.startsWith('Navigating to ') || line.content.startsWith('Opening ')))
        )
        return { ...s, isOpen: true, isHelpOpen: false, output: cleanedOutput }
      })
    } else {
      setState(s => ({ ...s, isOpen: false, isFirstTime: false }))
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleToggleHelp = useCallback(() => {
    setState(s => ({ ...s, isHelpOpen: !s.isHelpOpen }))
  }, [])

  const appendOutput = (lines: TerminalLine[]) => {
    setState(s => ({ ...s, output: [...s.output, ...lines] }))
  }

  const handleClear = () => {
    setState(s => ({ ...s, output: [] }))
  }

  const executeCommand = async (rawInput: string) => {
    const trimmed = rawInput.trim()
    if (!trimmed) return

    setState(s => {
      // Add to history if it's not the same as the last command
      const newHistory = s.history.length === 0 || s.history[s.history.length - 1] !== trimmed
        ? [...s.history, trimmed]
        : s.history
      return {
        ...s,
        history: newHistory,
        historyIndex: -1,
        output: [
          ...s.output,
          { id: crypto.randomUUID(), type: 'command', content: `${TERMINAL_PROMPT} ${trimmed}` }
        ]
      }
    })

    const parsed = parseCommand(trimmed)
    const cmd = findCommand(parsed.command)

    if (!cmd) {
      const suggestions = getSuggestions(parsed.command)
      const errorLines: TerminalLine[] = [
        { id: crypto.randomUUID(), type: 'error', content: `Command not found: "${parsed.command}"` }
      ]
      
      if (suggestions.length > 0) {
        errorLines.push({ id: crypto.randomUUID(), type: 'system', content: 'Did you mean:' })
        suggestions.forEach(s => {
          errorLines.push({ id: crypto.randomUUID(), type: 'system', content: `→ ${s}` })
        })
      } else {
        errorLines.push({ id: crypto.randomUUID(), type: 'system', content: 'Type "help" to see available commands.' })
      }
      appendOutput(errorLines)
      return
    }

    try {
      // Handle special commands that require external actions not passed in the registry directly
      if (cmd.name === 'theme' && onToggleTheme) {
        onToggleTheme()
        appendOutput([{ id: crypto.randomUUID(), type: 'system', content: 'Theme toggled.' }])
        return
      }
      if (cmd.name === 'history') {
        setState(s => {
          const lines = s.history.map((h, i) => ({ id: crypto.randomUUID(), type: 'output' as const, content: `${i + 1}  ${h}` }))
          return { ...s, output: [...s.output, ...lines] }
        })
        return
      }

      const result = await cmd.execute(parsed.args)

      if (result.clear) {
        handleClear()
      }

      if (result.lines && result.lines.length > 0) {
        appendOutput(result.lines)
      }

      if (result.openExternal) {
        window.open(result.openExternal, '_blank', 'noopener,noreferrer')
      }

      if (result.navigateTo) {
        // Slight delay to show the system navigation message before closing
        setTimeout(() => {
          onNavigate(result.navigateTo!)
          if (cmd.shouldCloseTerminal || result.closeTerminal) {
            handleClose()
          }
        }, 300)
      } else if (cmd.shouldCloseTerminal || result.closeTerminal) {
        setTimeout(() => {
          handleClose()
        }, 300)
      }
    } catch (error) {
      appendOutput([{ id: crypto.randomUUID(), type: 'error', content: 'An unexpected error occurred while executing the command.' }])
    }
  }

  const handleTab = (currentInput: string) => {
    const parsed = parseCommand(currentInput)
    if (!parsed.command || parsed.args.length > 0) return currentInput
    const suggestions = getSuggestions(parsed.command)
    if (suggestions.length > 0) {
      // Auto-complete if there's an exact match or we just want to fill the first
      // A more robust implementation would cycle or show list, for now return first match if one
      if (suggestions.length === 1) return suggestions[0]
      // Or if multiple, we could return the common prefix, but returning the first is simpler for now
      return suggestions[0]
    }
    return currentInput
  }

  // Handle global shortcuts when terminal is open
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      // The app handles escape for global close, but we might want to close help first if open
      if (e.key === 'Escape') {
        if (state.isHelpOpen) {
          e.stopPropagation()
          setState(s => ({ ...s, isHelpOpen: false }))
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, state.isHelpOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none" ref={constraintsRef}>
          {/* Overlay on mobile only */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/45 pointer-events-auto sm:hidden"
            onClick={handleClose}
          />
          
          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragElastic={0.1}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto absolute bottom-0 left-0 right-0 flex h-[75vh] w-full flex-col overflow-hidden border-t border-[var(--border)] bg-[var(--surface-muted)] shadow-2xl sm:bottom-10 sm:left-[10%] sm:right-auto sm:h-[500px] sm:w-[600px] sm:rounded-xl sm:border"
          >
            <TerminalHeader onClose={handleClose} onToggleHelp={handleToggleHelp} />
            
            <AnimatePresence>
              {state.isHelpOpen && (
                <TerminalHelp 
                  onRunQuickCommand={(cmd) => {
                    setState(s => ({ ...s, isHelpOpen: false }))
                    executeCommand(cmd)
                  }}
                />
              )}
            </AnimatePresence>

            <TerminalOutput output={state.output} isFirstTime={state.isFirstTime} />

            <div className="px-4 pb-4">
              <TerminalInput 
                prompt={TERMINAL_PROMPT} 
                onSubmit={executeCommand}
                onTab={handleTab}
                history={state.history}
                historyIndex={state.historyIndex}
                setHistoryIndex={(idx) => setState(s => ({ ...s, historyIndex: idx }))}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
