export function TerminalWelcome() {
  return (
    <div className="mb-4">
      <p className="text-[var(--text-strong)]">Welcome to Dess's Portfolio Terminal.</p>
      <p className="mt-1 text-[var(--text)]">Type "help" to view available commands.</p>
      <p className="text-[var(--text)]">Type "tour" for a guided portfolio experience.</p>
      <p className="mt-2 text-[var(--accent-blue)] opacity-90">💡 New to terminals? Click ? for a quick guide.</p>
    </div>
  )
}
