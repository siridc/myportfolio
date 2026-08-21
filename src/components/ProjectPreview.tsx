import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react'
import type { ProjectShowcaseItem } from '../data/projects'

type ProjectPreviewProps = {
  projectName: string
  slides: readonly ProjectShowcaseItem[]
  presentation: 'mobile-app' | 'landing-page'
  onOpen: (trigger: HTMLButtonElement) => void
}

const cycleInterval = 1800
const mobileOpenDelay = 260

export function ProjectPreview({ projectName, slides, presentation, onOpen }: ProjectPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInteractive, setIsInteractive] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const lastPointerType = useRef<string>('')
  const openTimer = useRef<number | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isInteractive || shouldReduceMotion || slides.length < 2) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, cycleInterval)

    return () => window.clearInterval(timer)
  }, [isInteractive, shouldReduceMotion, slides.length])

  useEffect(() => () => {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current)
  }, [])

  const openProject = (event: MouseEvent<HTMLButtonElement>) => {
    if (openTimer.current !== null) return

    const isTouchActivation = lastPointerType.current === 'touch'
      || lastPointerType.current === 'pen'
      || (lastPointerType.current === '' && window.matchMedia('(hover: none)').matches)

    if (!isTouchActivation || shouldReduceMotion) {
      onOpen(event.currentTarget)
      return
    }

    const trigger = event.currentTarget
    setIsPressed(true)
    setActiveIndex((current) => (current + 1) % slides.length)
    openTimer.current = window.setTimeout(() => {
      openTimer.current = null
      setIsPressed(false)
      onOpen(trigger)
    }, mobileOpenDelay)
  }

  const recordPointerType = (event: PointerEvent<HTMLButtonElement>) => {
    lastPointerType.current = event.pointerType
  }

  const recordKeyboardActivation = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') lastPointerType.current = 'keyboard'
  }

  return (
    <motion.button
      type="button"
      onClick={openProject}
      onPointerDown={recordPointerType}
      onKeyDown={recordKeyboardActivation}
      onHoverStart={() => setIsInteractive(true)}
      onHoverEnd={() => setIsInteractive(false)}
      onFocus={() => setIsInteractive(true)}
      onBlur={() => setIsInteractive(false)}
      animate={shouldReduceMotion ? undefined : {
        y: isInteractive || isPressed ? -5 : 0,
        scale: isPressed ? 1.025 : isInteractive ? 1.015 : 1,
      }}
      transition={{ type: 'spring', stiffness: 240, damping: 24, mass: 0.8 }}
      className="group relative mt-4 block aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--surface)_92%,var(--accent-blue)),var(--surface-muted))] text-left shadow-[0_12px_35px_rgba(0,0,0,0.16)] focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
      aria-label={`View ${projectName} project showcase`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,color-mix(in_srgb,var(--accent-green)_18%,transparent),transparent_36%),radial-gradient(circle_at_82%_75%,color-mix(in_srgb,var(--accent-purple)_18%,transparent),transparent_38%)]" />
      <div className="absolute inset-x-4 top-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text)] sm:inset-x-5 sm:top-4 sm:text-[10px]">
        <span>Interactive preview</span>
        <span>{activeIndex + 1} / {slides.length}</span>
      </div>

      <div className="absolute inset-x-3 bottom-3 top-9 sm:inset-x-5 sm:bottom-4 sm:top-11">
        {slides.map((slide, index) => {
          const offset = (index - activeIndex + slides.length) % slides.length
          const isLeaving = offset === slides.length - 1
          const isVisible = offset <= 2 || isLeaving
          const x = isLeaving ? -34 : offset * (presentation === 'mobile-app' ? 22 : 16)
          const y = isLeaving ? 8 : offset * 7
          const scale = isLeaving ? 0.96 : 1 - offset * 0.045
          const opacity = offset === 0 ? 1 : offset <= 2 ? 0.72 - offset * 0.18 : 0

          return (
            <motion.div
              key={slide.image}
              className={`absolute inset-y-0 left-1/2 overflow-hidden rounded-lg border border-white/20 bg-[#090b2d] shadow-[0_16px_35px_rgba(3,6,35,0.4)] ${presentation === 'mobile-app' ? 'w-[68%] sm:w-[62%]' : 'w-[88%]'}`}
              initial={false}
              animate={{
                x: `calc(-50% + ${x}px)`,
                y,
                scale,
                opacity: isVisible ? opacity : 0,
                zIndex: slides.length - offset,
              }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={offset !== 0}
            >
              <img
                src={slide.image}
                alt={offset === 0 ? `${projectName}: ${slide.title}` : ''}
                className="h-full w-full select-none object-contain"
                loading={index < 3 ? 'eager' : 'lazy'}
                draggable={false}
              />
              {offset === 0 ? (
                <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-8 text-center text-[10px] font-medium text-white sm:text-xs">
                  {slide.title}
                </span>
              ) : null}
            </motion.div>
          )
        })}
      </div>

      <motion.span
        className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur sm:bottom-4 sm:right-4 sm:text-[10px]"
        animate={shouldReduceMotion ? undefined : { x: isInteractive || isPressed ? -3 : 0, opacity: isInteractive || isPressed ? 1 : 0.82 }}
      >
        Tap to explore
      </motion.span>
    </motion.button>
  )
}
