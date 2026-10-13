import { useEffect, useRef, useState, type ComponentProps, type PointerEvent, type ReactNode } from 'react'
import {
  animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue,
} from 'motion/react'

export const EASE = [0.16, 1, 0.3, 1] as const

/** Fades and lifts its children into place the first time they enter the viewport. */
export function Reveal({ children, delay = 0, y = 28, className, ...rest }: { children: ReactNode; delay?: number; y?: number; className?: string } & Omit<ComponentProps<typeof motion.div>, 'children'>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/**
 * Headline that rises word by word out of a mask. Pass segments so parts of the
 * line can carry their own styling (e.g. a serif accent).
 */
export function WordRise({ segments, className, delay = 0, stagger = 0.06, as = 'h2', id }: {
  segments: { text: string; className?: string; br?: boolean }[]
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p'
  id?: string
}) {
  const Tag = motion[as]
  let index = 0
  return (
    <Tag id={id} className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }}>
      {segments.map((seg, s) => (
        <span key={s} className={seg.br ? 'block' : undefined}>
          {seg.text.split(' ').filter(Boolean).map((word, w) => {
            const i = index++
            return (
              <span key={w} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                <motion.span
                  className={`inline-block ${seg.className ?? ''}`}
                  variants={{ hidden: { y: '105%', rotate: 4 }, show: { y: '0%', rotate: 0 } }}
                  transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
                >
                  {word}
                </motion.span>
                {' '}
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

/** Paragraph whose words light up one after another as it scrolls through the viewport. */
export function ScrollWords({ text, className, highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={highlight.includes(word.replace(/[.,–:!?]/g, ''))}>
          {word}
        </ScrollWord>
      ))}
    </p>
  )
}

function ScrollWord({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const reduce = useReducedMotion()
  return (
    <>
      <motion.span style={{ opacity: reduce ? 1 : opacity }} className={accent ? 'font-display text-brand-600' : undefined}>
        {children}
      </motion.span>{' '}
    </>
  )
}

/** Animated number that counts up when it becomes visible. */
export function Counter({ to, suffix = '', prefix = '', duration = 1.6, className }: { to: number; suffix?: string; prefix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to, duration, reduce])
  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}

/** Wrapper that pulls its child slightly towards the pointer (desktop only). */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div className={`inline-block ${className ?? ''}`} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  )
}

/** Card with a soft light that follows the pointer, used for the bento grid and pricing. */
export function SpotlightCard({ children, className = '', glow = 'rgb(20 184 166 / 0.14)' }: { children: ReactNode; className?: string; glow?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onPointerMove={onMove} className={`group/spot relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: `radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 45%)` }}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  )
}

/** Thin progress bar at the very top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brand-400 via-brand-300 to-ember-400" style={{ scaleX }} />
}
