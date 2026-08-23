import type { ParsedCommand } from '../../types/terminal'

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim()
  if (!trimmed) {
    return { command: '', args: [] }
  }

  // Handle multiple spaces between arguments
  const parts = trimmed.split(/\s+/)
  
  return {
    command: parts[0].toLowerCase(),
    args: parts.slice(1).map(arg => arg.toLowerCase())
  }
}
