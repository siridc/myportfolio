import { ChevronDown, ChevronRight, FileText, Folder, FolderOpen } from 'lucide-react'
import { useState } from 'react'

type RepositoryExplorerProps = {
  onNavigate: (target: string) => void
}

type TreeNode = {
  label: string
  target?: string
  children?: TreeNode[]
}

const tree: TreeNode = {
  label: 'dessiree-portfolio',
  children: [
    { label: 'README.md', target: 'about' },
    { label: 'skills.json', target: 'skills' },
    { label: 'resume.pdf', target: 'contact' },
    {
      label: 'projects',
      children: [
        { label: 'featured-projects', target: 'projects' },
        { label: 'github-repos', target: 'github' },
      ],
    },
    { label: 'experience', target: 'experience' },
    { label: 'education', target: 'education' },
  ],
}

export function RepositoryExplorer({ onNavigate }: RepositoryExplorerProps) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'dessiree-portfolio': true,
    projects: true,
  })

  const renderNode = (node: TreeNode, depth = 0): React.ReactNode => {
    const isFolder = Boolean(node.children?.length)
    const isOpen = node.label === 'dessiree-portfolio' || openFolders[node.label]
    const paddingLeft = `calc(0.5rem + ${depth * 1.1}rem)`

    return (
      <div key={`${node.label}-${depth}`}>
        <button
          type="button"
          onClick={() => {
            if (isFolder) {
              setOpenFolders((current) => ({ ...current, [node.label]: !current[node.label] }))
              return
            }

            if (node.target) {
              onNavigate(node.target)
            }
          }}
          className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-[var(--text-strong)] transition hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]"
          style={{ paddingLeft }}
        >
          {isFolder ? (
            <>
              {isOpen ? <ChevronDown className="h-4 w-4 text-[var(--accent-green)]" /> : <ChevronRight className="h-4 w-4 text-[var(--text)]" />}
              {isOpen ? <FolderOpen className="h-4 w-4 text-[var(--accent-green)]" /> : <Folder className="h-4 w-4 text-[var(--accent-green)]" />}
            </>
          ) : (
            <FileText className="h-4 w-4 text-[var(--accent-blue)]" />
          )}
          <span className="font-mono text-sm">{node.label}</span>
        </button>

        {isFolder && isOpen && node.children ? (
          <div className="mt-1 border-l border-[var(--border)]">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--text)]">Repository Explorer</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--text-strong)]">Navigate the portfolio like a repository</h2>
          </div>
          <p className="hidden font-mono text-xs text-[var(--text)] md:block">click files to jump to sections</p>
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3">{renderNode(tree)}</div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text)]">Quick notes</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--text)]">
              <p> → Use the file tree to jump between sections the same way you would browse a repository.</p>
              <p> → Project entries, GitHub activity, experience, and education all remain separately organized in the UI.</p>
              <p> → The interface is intentionally lightweight, responsive, and easy to navigate across mobile and desktop.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}