import { useEffect, useRef } from 'react'
import type { TerminalLine } from '../../types/terminal'
import { motion } from 'framer-motion'
import { TerminalWelcome } from './TerminalWelcome.tsx' // Welcome text component

type TerminalOutputProps = {
  output: TerminalLine[]
  isFirstTime: boolean
}

export function TerminalOutput({ output, isFirstTime }: TerminalOutputProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [output])

  const getLineClass = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command': return 'text-[var(--text-strong)] font-semibold'
      case 'error': return 'text-[var(--accent-error)]'
      case 'success': return 'text-[var(--accent-green)]'
      case 'system': return 'text-[var(--accent-blue)] opacity-90'
      case 'output':
      default: return 'text-[var(--text)]'
    }
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 font-mono text-sm">
      {isFirstTime && <TerminalWelcome />}
      
      {output.map((line) => (
        <motion.div
          key={line.id}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className={`whitespace-pre-wrap leading-relaxed ${getLineClass(line.type)}`}
        >
          {line.content}
        </motion.div>
      ))}
    </div>
  )
}
