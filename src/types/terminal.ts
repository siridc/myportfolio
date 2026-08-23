export type TerminalLineType = 'command' | 'output' | 'error' | 'success' | 'system'

export interface TerminalLine {
  id: string
  type: TerminalLineType
  content: string | React.ReactNode
}

export interface CommandResult {
  lines?: TerminalLine[]
  navigateTo?: string
  openExternal?: string
  closeTerminal?: boolean
  clear?: boolean
}

export interface Command {
  name: string
  aliases?: string[]
  description: string
  usage?: string
  shouldCloseTerminal?: boolean
  execute: (args: string[]) => CommandResult | Promise<CommandResult>
}

export interface ParsedCommand {
  command: string
  args: string[]
}

export interface TerminalState {
  isOpen: boolean
  input: string
  history: string[]
  historyIndex: number
  output: TerminalLine[]
  isHelpOpen: boolean
  suggestions: string[]
  isFirstTime: boolean
}
