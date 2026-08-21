import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ProjectShowcaseItem } from '../data/projects'

type ProjectShowcaseProps = {
  projectName: string
  slides: readonly ProjectShowcaseItem[]
  onClose: () => void
}

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ProjectShowcase({ projectName, slides, onClose }: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goToPrevious()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goToNext()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [goToNext, goToPrevious, onClose])

  const activeSlide = slides[activeIndex]

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070921]/90 p-2 backdrop-blur-md sm:p-5"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-showcase-title"
        className="relative flex max-h-[96dvh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-cyan-200/25 bg-[#11134b] text-white shadow-[0_30px_100px_rgba(3,6,35,0.72)]"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-cyan-100/15 bg-[linear-gradient(90deg,rgba(103,232,249,0.12),rgba(129,140,248,0.10),rgba(232,121,249,0.10))] px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">Project showcase</p>
            <h2 id="project-showcase-title" className="truncate text-sm font-semibold text-cyan-50 sm:text-base">{projectName}</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cyan-100/20 bg-white/5 text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-200/10 focus-visible:ring-2 focus-visible:ring-cyan-200"
            aria-label="Close project showcase"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.12),transparent_38%),#080a2b] p-3 sm:p-5"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return
            const distance = event.changedTouches[0].clientX - touchStartX.current
            touchStartX.current = null
            if (Math.abs(distance) < 50) return
            if (distance > 0) goToPrevious()
            else goToNext()
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={activeSlide.image}
              src={activeSlide.image}
              alt={`${projectName}: ${activeSlide.title}`}
              className="max-h-[calc(96dvh-13rem)] max-w-full select-none object-contain sm:max-h-[calc(96dvh-15rem)]"
              draggable={false}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            />
          </AnimatePresence>

          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-2 grid h-11 w-11 place-items-center rounded-full border border-cyan-100/25 bg-[#11134b]/85 text-cyan-50 shadow-lg backdrop-blur transition hover:border-cyan-200 hover:bg-cyan-300/15 focus-visible:ring-2 focus-visible:ring-cyan-200 sm:left-4"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-2 grid h-11 w-11 place-items-center rounded-full border border-cyan-100/25 bg-[#11134b]/85 text-cyan-50 shadow-lg backdrop-blur transition hover:border-cyan-200 hover:bg-cyan-300/15 focus-visible:ring-2 focus-visible:ring-cyan-200 sm:right-4"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="border-t border-cyan-100/15 bg-[#0d0f3e] px-3 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <p className="truncate text-sm font-semibold text-cyan-50">{activeSlide.title}</p>
            <p className="shrink-0 font-mono text-xs text-cyan-100/70">{activeIndex + 1} / {slides.length}</p>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#67e8f9,#818cf8,#e879f9)]"
              animate={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Showcase slides">
            {slides.map((slide, index) => (
              <button
                key={`${slide.image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-black/30 transition sm:h-16 sm:w-24 ${index === activeIndex ? 'border-cyan-300 ring-2 ring-cyan-300/25' : 'border-white/10 opacity-65 hover:border-cyan-200/60 hover:opacity-100'}`}
                aria-label={`View slide ${index + 1}: ${slide.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              >
                <img src={slide.image} alt="" className="h-full w-full object-contain" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
