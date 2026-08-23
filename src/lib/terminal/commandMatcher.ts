import type { Command } from '../../types/terminal'
import { commands } from './commandRegistry'

export function findCommand(commandName: string): Command | undefined {
  return commands.find(
    (c) => c.name === commandName || c.aliases?.includes(commandName)
  )
}

export function getSuggestions(input: string): string[] {
  const trimmed = input.trim().toLowerCase()
  if (!trimmed) return []

  const suggestions: string[] = []
  
  for (const cmd of commands) {
    if (cmd.name.startsWith(trimmed)) {
      suggestions.push(cmd.name)
    }
    
    if (cmd.aliases) {
      for (const alias of cmd.aliases) {
        if (alias.startsWith(trimmed)) {
          suggestions.push(alias)
        }
      }
    }
  }

  return suggestions
}
