export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 py-8 pb-24 text-center text-sm text-[var(--text)] sm:px-6 lg:px-8 lg:pb-8">
        <div>
          <p className="text-[var(--text-strong)]">© 2026 Dessiree Camille Pasion</p>
          <p className="mt-1 font-mono text-xs">Built with React • TypeScript • Tailwind CSS • Framer Motion</p>
        </div>
      </div>
    </footer>
  )
} 