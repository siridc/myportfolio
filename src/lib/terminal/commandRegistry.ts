import type { Command } from '../../types/terminal'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'

const navigationCommands = [
  'about', 'education', 'skills', 'projects', 'experience', 'credentials', 'contact'
]

export const commands: Command[] = [
  {
    name: 'help',
    description: 'Display available commands and tips',
    execute: () => {
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'output', content: 'Available Commands:' },
          { id: crypto.randomUUID(), type: 'output', content: '' },
          { id: crypto.randomUUID(), type: 'output', content: 'about        View profile information' },
          { id: crypto.randomUUID(), type: 'output', content: 'skills       View technical skills' },
          { id: crypto.randomUUID(), type: 'output', content: 'projects     Explore portfolio projects' },
          { id: crypto.randomUUID(), type: 'output', content: 'experience   View work experience' },
          { id: crypto.randomUUID(), type: 'output', content: 'education    View educational background' },
          { id: crypto.randomUUID(), type: 'output', content: 'contact      View contact information' },
          { id: crypto.randomUUID(), type: 'output', content: 'resume       Open resume' },
          { id: crypto.randomUUID(), type: 'output', content: 'github       Open GitHub' },
          { id: crypto.randomUUID(), type: 'output', content: 'linkedin     Open LinkedIn' },
          { id: crypto.randomUUID(), type: 'output', content: 'goto <name>  Navigate to a portfolio section' },
          { id: crypto.randomUUID(), type: 'output', content: 'history      Show command history' },
          { id: crypto.randomUUID(), type: 'output', content: 'clear        Clear terminal' },
          { id: crypto.randomUUID(), type: 'output', content: '' },
          { id: crypto.randomUUID(), type: 'system', content: 'Tips:' },
          { id: crypto.randomUUID(), type: 'system', content: '- Use Tab for autocomplete.' },
          { id: crypto.randomUUID(), type: 'system', content: '- Use ↑ / ↓ for command history.' },
        ]
      }
    }
  },
  {
    name: 'about',
    description: 'View profile information',
    shouldCloseTerminal: true,
    execute: () => {
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'system', content: 'Navigating to About...' },
        ],
        navigateTo: 'about'
      }
    }
  },
  {
    name: 'skills',
    aliases: ['tech', 'technologies'],
    description: 'View technical skills',
    shouldCloseTerminal: true,
    execute: () => {
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'system', content: 'Navigating to Skills...' },
        ],
        navigateTo: 'skills'
      }
    }
  },
  {
    name: 'projects',
    aliases: ['project', 'work', 'portfolio'],
    description: 'Explore portfolio projects',
    execute: (args) => {
      if (args.length === 0) {
        return {
          lines: [
            { id: crypto.randomUUID(), type: 'system', content: 'Navigating to Projects...' },
          ],
          navigateTo: 'projects',
          closeTerminal: true
        }
      }

      const query = args.join(' ').toLowerCase()
      const project = projects.find(p => p.name.toLowerCase().includes(query))
      
      if (!project) {
        return {
          lines: [
            { id: crypto.randomUUID(), type: 'error', content: `Project not found matching: "${query}"` },
            { id: crypto.randomUUID(), type: 'system', content: 'Available projects:' },
            ...projects.map((p, i) => ({ id: crypto.randomUUID(), type: 'output' as const, content: `[${i + 1}] ${p.name}` }))
          ]
        }
      }

      return {
        lines: [
          { id: crypto.randomUUID(), type: 'output', content: `--- ${project.name} ---` },
          { id: crypto.randomUUID(), type: 'output', content: project.description },
          { id: crypto.randomUUID(), type: 'output', content: '' },
          { id: crypto.randomUUID(), type: 'output', content: `Technologies: ${project.technologies.join(' • ')}` },
        ],
        closeTerminal: false
      }
    }
  },
  {
    name: 'experience',
    aliases: ['exp'],
    description: 'View work experience',
    shouldCloseTerminal: true,
    execute: () => {
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'system', content: 'Navigating to Experience...' },
        ],
        navigateTo: 'experience'
      }
    }
  },
  {
    name: 'education',
    aliases: ['edu'],
    description: 'View educational background',
    shouldCloseTerminal: true,
    execute: () => {
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'system', content: 'Navigating to Education...' },
        ],
        navigateTo: 'education'
      }
    }
  },
  {
    name: 'contact',
    aliases: ['contacts', 'email'],
    description: 'View contact information',
    shouldCloseTerminal: true,
    execute: () => {
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'system', content: 'Navigating to Contact...' },
        ],
        navigateTo: 'contact'
      }
    }
  },
  {
    name: 'resume',
    description: 'Open resume',
    shouldCloseTerminal: true,
    execute: () => {
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'system', content: 'Opening resume in a new tab...' }
        ],
        openExternal: profile.resumeUrl
      }
    }
  },
  {
    name: 'github',
    description: 'Open GitHub',
    shouldCloseTerminal: true,
    execute: () => {
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'system', content: 'Opening GitHub...' }
        ],
        openExternal: profile.githubUrl
      }
    }
  },
  {
    name: 'linkedin',
    description: 'Open LinkedIn',
    shouldCloseTerminal: true,
    execute: () => {
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'system', content: 'Opening LinkedIn...' }
        ],
        openExternal: profile.linkedinUrl
      }
    }
  },
  {
    name: 'goto',
    description: 'Navigate to a portfolio section',
    usage: 'goto <section>',
    execute: (args) => {
      if (args.length === 0) {
        return {
          lines: [
            { id: crypto.randomUUID(), type: 'error', content: 'Missing argument. Usage: goto <section>' },
            { id: crypto.randomUUID(), type: 'system', content: `Available sections: ${navigationCommands.join(', ')}` }
          ]
        }
      }

      const section = args[0].toLowerCase()
      if (navigationCommands.includes(section)) {
        return {
          lines: [
            { id: crypto.randomUUID(), type: 'system', content: `Navigating to ${section}...` }
          ],
          navigateTo: section,
          closeTerminal: true
        }
      }

      return {
        lines: [
          { id: crypto.randomUUID(), type: 'error', content: `Unknown section: "${section}"` },
          { id: crypto.randomUUID(), type: 'system', content: `Available sections: ${navigationCommands.join(', ')}` }
        ]
      }
    }
  },
  {
    name: 'clear',
    description: 'Clear terminal output',
    execute: () => {
      return { clear: true }
    }
  },
  {
    name: 'history',
    description: 'Show command history',
    execute: () => {
      // History is handled directly in Terminal.tsx execution, we just return empty lines here.
      // But we can return a flag or handle it by passing history as an argument.
      // For now we'll handle this specially in the main executor.
      return { lines: [] } // Handled externally
    }
  },
  {
    name: 'whoami',
    description: 'Who am I?',
    execute: () => {
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'output', content: profile.name },
          { id: crypto.randomUUID(), type: 'output', content: profile.title }
        ]
      }
    }
  },
  {
    name: 'sudo',
    description: 'Super user do',
    execute: (args) => {
      if (args.join(' ') === 'hire-dess') {
        return {
          lines: [
            { id: crypto.randomUUID(), type: 'success', content: 'Permission granted.' },
            { id: crypto.randomUUID(), type: 'output', content: 'Excellent choice. 🚀' }
          ]
        }
      }
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'error', content: 'Sorry, user is not in the sudoers file. This incident will be reported.' }
        ]
      }
    }
  },
  {
    name: 'coffee',
    description: 'Get some coffee',
    execute: () => {
      return {
        lines: [
          { id: crypto.randomUUID(), type: 'success', content: '☕ Developer fuel loaded.' }
        ]
      }
    }
  }
]
